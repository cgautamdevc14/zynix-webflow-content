// Pre-deploy smoke test. Loads real production pages in headless Chrome and swaps in THIS checkout's bundle and
// stylesheet, so a change is exercised against the live Webflow HTML before it can reach visitors.
// Read-only: analytics are blocked, no form is submitted, HubSpot is never contacted.
// Exit codes: 0 = pass, 1 = the bundle or stylesheet is broken, 2 = inconclusive (production could not be loaded).
// Deploy build (final QA round 2): requests for the dist/ URLs (ci/build.mjs DIST, what the Webflow head loads once it is
// switched to the build) are answered with this checkout's build, made in memory; the source URLs keep getting the sources.
// `node ci/smoke.mjs --built` (or ZX_SMOKE_BUILT=1) answers the source URLs with the build too, to exercise the build
// against the live HTML before the switch. `node ci/smoke.mjs --dist` goes one step further and rewrites every page's HTML
// to load the dist/ URLs, i.e. the site as it will be after the Webflow switch (launch item "build"), including the bundle's
// background revalidation of dist/zynix-site-styles.deployed.css.
import { spawn } from 'node:child_process'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
const BASE = process.env.SITE || 'https://www.zynix.ai'; const PORT = 9400 + Math.floor(Math.random() * 400); const sleep = ms => new Promise(r => setTimeout(r, ms));
const CHROME = process.env.CHROME_BIN || (process.platform === 'darwin' ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' : '/usr/bin/google-chrome');
const JS = fs.readFileSync('zynix-site-scripts-unminified.js'), CSS = fs.readFileSync('zynix-site-styles.deployed.css');
const { buildJs, buildCss } = await import('./build.mjs');
const JS_BUILT = Buffer.from(buildJs(JS.toString('utf8')), 'utf8'), CSS_BUILT = Buffer.from(buildCss(CSS.toString('utf8')), 'utf8');
const DIST_SIM = process.argv.includes('--dist');
const BUILT = DIST_SIM || process.argv.includes('--built') || process.env.ZX_SMOKE_BUILT === '1';
const toDist = html => html.replace(/(zynix-webflow-content@[^/"'\s]+\/)zynix-site-scripts-unminified\.js/g, '$1dist/zynix-site-scripts.deployed.js').replace(/(zynix-webflow-content@[^/"'\s]+\/)zynix-site-styles\.deployed\.css/g, '$1dist/zynix-site-styles.deployed.css');
if (DIST_SIM) console.log('INFO  --dist: every page loads the dist/ URLs (the Webflow head after the switch)');
if (BUILT) console.log('INFO  --built: the source URLs are answered with the deploy build (ci/build.mjs)');
const results = []; const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };

const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'zx-smoke-'));
const chrome = spawn(CHROME, ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--no-first-run', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
// Remove the throwaway Chrome profile on every exit (final QA polish round, 2026-09-30: every run used to leave its profile in
// the OS temp dir; 2,000+ of them, about 126 GB, filled the disk). SIGINT/SIGTERM exit through process.exit so this runs.
process.on('exit', () => { try { if (chrome) chrome.kill('SIGKILL'); } catch {} try { fs.rmSync(prof, { recursive: true, force: true, maxRetries: 3 }); } catch {}
  // Chrome's helper processes can still write for a moment after the browser dies: finish the job from a detached shell
  try { if (fs.existsSync(prof)) spawn('/bin/sh', ['-c', 'sleep 3; rm -rf -- "$0"', prof], { detached: true, stdio: 'ignore' }).unref(); } catch {} });
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => process.exit(130));
let wsUrl; for (let i = 0; i < 80; i++) { try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; break; } catch { await sleep(250); } }
if (!wsUrl) { console.log('INCONCLUSIVE: Chrome did not start (' + CHROME + ')'); process.exit(2); }
const ws = new WebSocket(wsUrl); await new Promise(r => ws.addEventListener('open', r)); let id = 0; const pend = new Map(); const hs = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result || {}); pend.delete(m.id); } else if (m.method && hs.has(m.sessionId)) hs.get(m.sessionId)(m.method, m.params); });
// Every CDP call has a deadline: a request left paused or a wedged renderer must fail a check, never hang the job.
const send = (method, params = {}, sessionId) => new Promise(res => { const i = ++id; const t = setTimeout(() => { if (pend.has(i)) { pend.delete(i); console.log(`WARN  CDP ${method} gave no answer in 45 s`); res({}); } }, 45000); pend.set(i, r => { clearTimeout(t); res(r); }); ws.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) })); });
const WATCHDOG = setTimeout(() => { console.log('\nFAIL  smoke test watchdog: the run did not finish within 15 minutes'); try { chrome.kill(); } catch {} process.exit(1); }, 15 * 60 * 1000);

async function open(pathname, opts = {}) {
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' }); const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true }); const S = (m, p) => send(m, p, sessionId);
  const st = { js: 0, css: 0, built: 0, errors: [], docStatus: 0, hubspot: 0 };
  hs.set(sessionId, async (method, prm) => {
    if (method === 'Runtime.exceptionThrown') st.errors.push(((prm.exceptionDetails.exception && prm.exceptionDetails.exception.description) || prm.exceptionDetails.text || '').slice(0, 220));
    if (method !== 'Fetch.requestPaused') return; const url = prm.request.url; const ok = (type, body) => S('Fetch.fulfillRequest', { requestId: prm.requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: type }, { name: 'Access-Control-Allow-Origin', value: '*' }, { name: 'ETag', value: '"smoke"' }], body: body.toString('base64') });
    try {
      if (/\/dist\/zynix-site-scripts\.deployed\.js/.test(url)) { st.js++; st.built++; await ok('application/javascript; charset=utf-8', JS_BUILT); }
      else if (/\/dist\/zynix-site-styles\.deployed\.css/.test(url)) { st.css++; st.built++; await ok('text/css; charset=utf-8', CSS_BUILT); }
      else if (/zynix-site-scripts-unminified\.js/.test(url)) { st.js++; await ok('application/javascript; charset=utf-8', BUILT ? JS_BUILT : JS); }
      else if (/zynix-site-styles\.deployed\.css/.test(url)) { st.css++; await ok('text/css; charset=utf-8', BUILT ? CSS_BUILT : CSS); }
      else if (/api\.hsforms\.com/.test(url)) { st.hubspot++; await S('Fetch.failRequest', { requestId: prm.requestId, errorReason: 'BlockedByClient' }); }
      else if (prm.responseStatusCode !== undefined) {           // the main document, at response stage
        st.docStatus = prm.responseStatusCode;
        if ((!opts.asMain && !DIST_SIM) || prm.responseStatusCode !== 200) { await S('Fetch.continueRequest', { requestId: prm.requestId }); return; }
        const b = await S('Fetch.getResponseBody', { requestId: prm.requestId }); let html = Buffer.from(b.body, b.base64Encoded ? 'base64' : 'utf8').toString('utf8');
        if (opts.asMain) html = html.replace(/zynix-webflow-content@[0-9a-f]{7,40}\//g, 'zynix-webflow-content@main/');   // what the page will look like once Webflow points at @main
        if (DIST_SIM) { html = toDist(html); if (html.includes('/dist/zynix-site-scripts.deployed.js')) st.distHtml = true; }
        await S('Fetch.fulfillRequest', { requestId: prm.requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: 'text/html; charset=utf-8' }], body: Buffer.from(html, 'utf8').toString('base64') });
      } else await S('Fetch.continueRequest', { requestId: prm.requestId });
    } catch (e) { try { await S('Fetch.continueRequest', { requestId: prm.requestId }); } catch {} }
  });
  await S('Page.enable'); await S('Runtime.enable'); await S('Network.enable');
  await S('Network.setBlockedURLs', { urls: ['*google-analytics.com*', '*googletagmanager.com*', '*facebook.net*', '*facebook.com/tr*', '*claydar.com*', '*/ag/g/c*', '*snap.licdn.com*', '*doubleclick.net*', '*hs-analytics*', '*hs-scripts.com*'] });
  await S('Fetch.enable', { patterns: [{ urlPattern: '*zynix-site-scripts-unminified.js*' }, { urlPattern: '*dist/zynix-site-scripts.deployed.js*' }, { urlPattern: '*zynix-site-styles.deployed.css*' }, { urlPattern: '*api.hsforms.com*' }, { urlPattern: BASE + '/*', resourceType: 'Document', requestStage: 'Response' }] });
  await S('Emulation.setDeviceMetricsOverride', opts.mobile ? { width: 390, height: 844, deviceScaleFactor: 2, mobile: true } : { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  // Production itself loads @main now, so every earlier page in this run already set the bundle's 10-minute
  // re-validation throttle in localStorage. Clear it for the check that needs a first visit.
  if (opts.firstVisit) await S('Page.addScriptToEvaluateOnNewDocument', { source: "try{localStorage.removeItem('zx_asset_check')}catch(e){}" });
  await S('Page.navigate', { url: BASE + pathname }); await sleep(opts.wait || 6500);
  const ev = async expr => { const r = await S('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); return r.result ? r.result.value : undefined; };
  return { ev, st, close: async () => { hs.delete(sessionId); await send('Target.closeTarget', { targetId }); } };
}

// 0. can we see production at all?
{ const pg = await open('/'); const swapped = pg.st.js >= 1 && pg.st.css >= 1;
  if (pg.st.docStatus !== 200 || !swapped) { console.log(`INCONCLUSIVE: ${BASE}/ answered HTTP ${pg.st.docStatus}; bundle swapped ${pg.st.js}x, stylesheet ${pg.st.css}x. Production could not be exercised from this machine.`); try { await send('Browser.close'); } catch {} chrome.kill(); process.exit(2); }
  const r = await pg.ev(`(()=>{const vis=e=>!!(e.offsetWidth||e.offsetHeight);const f=document.querySelector('.zynix-footer-bottom a');return {words:document.body.innerText.split(/\\s+/).length,h1:[...document.querySelectorAll('h1')].filter(vis).length,nav:!!document.querySelector('.zynix-nav-hamburger'),footer:f?getComputedStyle(f).color:null,injected:!!document.querySelector('.zynix-injected')}})()`);
  check('/ renders with this bundle (content, one visible H1, nav, footer)', r && r.words > 1200 && r.h1 >= 1 && r.nav && r.footer, JSON.stringify(r)); check('/ no uncaught exceptions', pg.st.errors.length === 0, pg.st.errors.join(' | '));
  // chat panel keeps its designed width on desktop (an orphaned CSS rule once forced it to the full viewport)
  const w = await pg.ev(`(()=>{const b=document.querySelector('#zynix-chat-widget button, #zynix-chat-toggle, #zynix-chat-widget [role=button]');if(b)b.click();const p=document.querySelector('#zynix-chat-panel');if(!p)return null;p.style.display='block';return Math.round(p.getBoundingClientRect().width)})()`);
  check('chat panel is its designed width on desktop (<= 420px)', w === null || (w > 200 && w <= 420), String(w)); await pg.close(); }

// 1. a spread of routes: must render and must not throw
const ROUTES = [['/contact', 250], ['/sms-consent', 400], ['/sms-program', 400], ['/privacy-policy', 800], ['/terms-of-service', 800], ['/platform', 500], ['/zynix-ai-agents', 500], ['/use-cases', 600], ['/use-cases/post-discharge-follow-up', 600], ['/audience-segments/health-plans', 600], ['/compare-zynix-vs-innovaccer', 500], ['/alternatives', 500], ['/resources-faq', 400], ['/resources-glossary', 800], ['/resources-case-studies', 250], ['/about', 400], ['/blog-posts/best-ai-medical-scribes-comparison-2026', 500]];
for (const [p, min] of ROUTES) { const pg = await open(p); const r = await pg.ev(`({words:document.body.innerText.split(/\\s+/).length,undef:/\\bundefined\\b/.test(document.body.innerText),nf:/page not found/i.test((document.querySelector('h1')||{}).innerText||'')})`);
  check(`${p} renders (${r && r.words} words), no "undefined", no exceptions`, pg.st.docStatus === 200 && r && r.words >= min && !r.undef && !r.nf && pg.st.errors.length === 0, pg.st.errors.join(' | ') || JSON.stringify(r)); await pg.close(); }

// 2. forms exist and are wired, but are never submitted here
{ const pg = await open('/contact'); const r = await pg.ev(`(()=>{const f=document.querySelector('#zynix-demo-form');return f?{fields:f.querySelectorAll('input,select,textarea').length,submit:!!f.querySelector('[type=submit]')}:null})()`); check('/contact demo form present', r && r.fields >= 6 && r.submit, JSON.stringify(r)); check('no request went to HubSpot during the smoke test', pg.st.hubspot === 0); await pg.close(); }
{ const pg = await open('/sms-consent'); const r = await pg.ev(`(()=>{const f=document.querySelector('#zynix-sms-form');const c=f&&f.querySelector('[name=sms_consent]');return f?{checkbox:!!c,checkedByDefault:!!(c&&c.checked)}:null})()`); check('/sms-consent form present; consent box unchecked by default', r && r.checkbox && !r.checkedByDefault, JSON.stringify(r)); await pg.close(); }
{ const pg = await open('/use-cases'); const n = await pg.ev(`[...new Set([...document.querySelectorAll('.zynix-injected a[href^="/use-cases/"]')].map(a=>a.getAttribute('href').split(/[?#]/)[0].replace(/\\/$/,'')).filter(h=>/^\\/use-cases\\/[a-z0-9-]+$/.test(h)))].length`); check('/use-cases links 30 distinct /use-cases/<slug> pages', n === 30, String(n)); await pg.close(); }

// 2b. every case-study link the bundle renders must exist on the server (a 404 document is not a page, even if JS paints over it)
{ const pg = await open('/resources-case-studies'); const hrefs = await pg.ev(`[...new Set([...document.querySelectorAll('a[href^="/case-stud"]')].map(a=>a.getAttribute('href').split('#')[0]))]`); await pg.close();
  const bad = []; for (const h of hrefs || []) { try { const r = await fetch(BASE + h, { method: 'GET', redirect: 'manual', headers: { 'User-Agent': 'Mozilla/5.0 (zynix-ci-smoke)' } }); if (r.status !== 200) bad.push(`${h} -> ${r.status}`); } catch (e) { bad.push(`${h} -> ${e.message}`); } }
  check(`case-study hub: all ${hrefs ? hrefs.length : 0} case-study links answer HTTP 200`, hrefs && hrefs.length >= 8 && bad.length === 0, bad.join(', ')); }


// 2c. A2P 10DLC checklist (Twilio "A2P 10DLC Campaign Onboarding Guide": web form, Privacy policy, Terms & Conditions).
//     The T&C URL registered with Twilio is /sms-program; the privacy URL is /privacy-policy; the opt-in is /sms-consent.
const A2P = `(()=>{const vis=e=>!!(e.offsetWidth||e.offsetHeight);const main=document.querySelector('.zynix-injected')||document.body;const t=main.innerText.replace(/\\s+/g,' ');
 const kw=[];const it=document.createTreeWalker(main,NodeFilter.SHOW_TEXT);let n;while(n=it.nextNode()){const el=n.parentElement;if(!el||!vis(el))continue;const re=/\\b(STOP|HELP)\\b/g;let m;while(m=re.exec(n.nodeValue)){kw.push(parseInt(getComputedStyle(el).fontWeight,10))}}
 const nums=[...main.querySelectorAll('h2')].filter(vis).map(h=>(h.innerText.match(/^(\\d+)\\./)||[])[1]).filter(Boolean);
 return {title:document.title,h1:[...document.querySelectorAll('h1')].filter(vis).map(h=>h.innerText.trim()),robots:[...document.querySelectorAll('meta[name=robots]')].map(m=>m.content).join('|'),forms:[...document.querySelectorAll('form')].filter(vis).map(f=>f.id||f.className),
  kwTotal:kw.length,kwNotBold:kw.filter(w=>w<600).length,dupNumbers:nums.filter((x,i)=>nums.indexOf(x)!==i),
  quotedReplies:/Zynix AI: For help, email|You are unsubscribed and will receive|you will receive support contact info/.test(t),
  rates:/Msg & data rates may apply|Message and data rates may apply/i.test(t),freq:/up to 8 messages per month/i.test(t),contact:/info@zynix\\.ai/.test(t)&&/\\(727\\) 261-1297|727-261-1297/.test(t),
  carrier:/Carriers are not liable for any delayed or undelivered messages\\./.test(t),privacyLink:[...main.querySelectorAll('a[href]')].some(a=>/\\/privacy-policy$/.test(a.getAttribute('href'))&&vis(a)),
  termsLink:[...main.querySelectorAll('a[href]')].some(a=>/\\/sms-program$/.test(a.getAttribute('href'))&&vis(a)),program:/Zynix AI Customer Care & Account Notifications/.test(t),brand:/Zynix Inc\\./.test(t),
  twilioPrivacy:/We do not sell or share your SMS opt-in data or personal information with third parties for marketing purposes\\./.test(t),
  consentBox:(()=>{const c=document.querySelector('#zynix-sms-form [name=sms_consent]');return c?{checked:c.checked,required:c.required}:null})()}})()`;
{ const pg = await open('/sms-program'); const r = await pg.ev(A2P); await pg.close();
  check('A2P T&C /sms-program: titled "SMS Program Terms & Conditions" (title and H1)', r && /SMS Program Terms & Conditions/.test(r.title) && r.h1.includes('SMS Program Terms & Conditions'), r && JSON.stringify({ title: r.title, h1: r.h1 }));
  check('A2P T&C /sms-program: program name, frequency, "Msg & data rates may apply", support contact, privacy link, carrier sentence', r && r.program && r.freq && r.rates && r.contact && r.privacyLink && r.carrier, r && JSON.stringify({ program: r.program, freq: r.freq, rates: r.rates, contact: r.contact, privacyLink: r.privacyLink, carrier: r.carrier }));
  check('A2P T&C /sms-program: every STOP and HELP is displayed in bold', r && r.kwTotal >= 6 && r.kwNotBold === 0, r && `${r.kwTotal} occurrences, ${r.kwNotBold} not bold`);
  check('A2P T&C /sms-program: a terms document only (no form), indexable, no quoted reply texts that differ from the registration', r && r.forms.length === 0 && !/noindex/.test(r.robots) && !r.quotedReplies, r && JSON.stringify({ forms: r.forms, robots: r.robots, quotedReplies: r.quotedReplies })); }
{ const pg = await open('/privacy-policy'); const r = await pg.ev(A2P); await pg.close();
  check('A2P privacy /privacy-policy: page titled "Privacy Policy" (title and H1), names Zynix Inc., carries Twilio\'s sentence', r && /^Privacy Policy/.test(r.title) && r.h1.includes('Privacy Policy') && r.brand && r.twilioPrivacy, r && JSON.stringify({ title: r.title, h1: r.h1, brand: r.brand, twilioPrivacy: r.twilioPrivacy }));
  check('A2P privacy /privacy-policy: section numbers unique, no quoted reply texts', r && r.dupNumbers.length === 0 && !r.quotedReplies, r && JSON.stringify({ dup: r.dupNumbers, quotedReplies: r.quotedReplies })); }
{ const pg = await open('/sms-consent'); const r = await pg.ev(A2P); await pg.close();
  check('A2P opt-in /sms-consent: one form (the SMS form), consent box unchecked and OPTIONAL (carriers: required phone + required box = forced opt-in), links to /sms-program and /privacy-policy', r && r.forms.length === 1 && r.forms[0] === 'zynix-sms-form' && r.consentBox && !r.consentBox.checked && !r.consentBox.required && r.termsLink && r.privacyLink, r && JSON.stringify({ forms: r.forms, box: r.consentBox, termsLink: r.termsLink, privacyLink: r.privacyLink }));
  check('A2P opt-in /sms-consent: frequency, rates, STOP/HELP, support contact; indexable; no reply promises that differ from the registration', r && r.freq && r.rates && r.kwTotal >= 2 && r.contact && !/noindex/.test(r.robots) && !r.quotedReplies, r && JSON.stringify({ freq: r.freq, rates: r.rates, kw: r.kwTotal, contact: r.contact, robots: r.robots, quotedReplies: r.quotedReplies })); }
{ const pg = await open('/terms-of-service'); const r = await pg.ev(A2P); await pg.close();
  check('A2P /terms-of-service: carrier sentence, no quoted reply texts', r && r.carrier && !r.quotedReplies, r && JSON.stringify({ carrier: r.carrier, quotedReplies: r.quotedReplies })); }

// 3. mobile: no horizontal overflow, menu opens.
// Rect-based overflow at 390 (DESIGN_SPEC §1.3, §7.3, §8.2 Q; the rule of redesign-2026-09/tools/rd_checks.mjs): a visible element in
// the bundle regions whose right edge passes the 390px viewport is an offender WHATEVER scrollWidth says (an overflow-x:clip
// ancestor, or a mobile layout viewport widened by the overflow, hides it from scrollWidth - innerWidth). Interim ratchet: the
// outermost offenders inside .zynix-injected may not exceed ci/baseline.json smokeOverflow390[path] (c95cc03 counts); from
// baseline phase 3 on (launch precondition 6) any offender anywhere in the bundle regions fails.
const OVF = (() => { try { const b = JSON.parse(fs.readFileSync('ci/baseline.json', 'utf8')); return { counts: b.smokeOverflow390 || {}, launch: (+b.phase || 0) >= 3 }; } catch { return { counts: {}, launch: false }; } })();
const RECT390 = `(async()=>{const W=390;const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=Math.round(innerHeight*0.8)){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0);await new Promise(r=>setTimeout(r,400));
 const REG='.zynix-injected, .zynix-mega-nav, .zynix-mobile-menu, .zynix-announcement-bar, #zynix-chat-widget';
 const vis=e=>{const r=e.getBoundingClientRect();if(r.width<=1||r.height<=1)return false;return e.checkVisibility?e.checkVisibility({opacityProperty:true,visibilityProperty:true}):getComputedStyle(e).visibility!=='hidden'};
 const seen=new Set(),all=[];document.querySelectorAll(REG).forEach(x=>{if(!seen.has(x)){seen.add(x);all.push(x)}x.querySelectorAll('*').forEach(e=>{if(!seen.has(e)){seen.add(e);all.push(e)}})});
 const off=all.filter(e=>{const r=e.getBoundingClientRect();if(r.right<=W+1)return false;if(e.closest('[data-zx-allow-overflow], .zx-visually-hidden'))return false;if(!vis(e))return false;return getComputedStyle(e).position!=='fixed'});
 const s=new Set(off);const outer=off.filter(e=>!s.has(e.parentElement));const content=outer.filter(e=>e.closest('.zynix-injected')).sort((a,b)=>b.getBoundingClientRect().right-a.getBoundingClientRect().right);
 const d=e=>e.tagName.toLowerCase()+(typeof e.className==='string'&&e.className.trim()?'.'+e.className.trim().split(/\\s+/).slice(0,2).join('.'):'')+' right='+Math.round(e.getBoundingClientRect().right);
 return {outerAll:outer.length,outerContent:content.length,scrollWidth:document.documentElement.scrollWidth,sample:content.concat(outer.filter(e=>!content.includes(e))).slice(0,4).map(d)}})()`;
const rect390 = (p, r) => { if (!r) return [false, 'rect probe failed']; const allowed = OVF.launch ? 0 : (OVF.counts[p] || 0), n = OVF.launch ? r.outerAll : r.outerContent;
  return [n <= allowed, `${n} outermost offender(s) ${OVF.launch ? 'in the bundle regions' : 'in .zynix-injected'}, allowed ${allowed} (${OVF.launch ? 'launch' : 'c95cc03 ratchet'}); scrollWidth ${r.scrollWidth}${r.sample.length ? '; ' + r.sample.join(' | ') : ''}`]; };
{ const pg = await open('/', { mobile: true }); const rect = await pg.ev(RECT390); const r = await pg.ev(`(()=>{const b=document.querySelector('.zynix-nav-hamburger');if(b)b.click();const m=document.querySelector('.zynix-mobile-menu');return {overflow:document.documentElement.scrollWidth-window.innerWidth,menu:!!(m&&m.classList.contains('open'))}})()`);
  const [rok, rdet] = rect390('/', rect); check('mobile home: no horizontal overflow (scrollWidth and rect ratchet), menu opens', r && r.overflow <= 2 && r.menu && rok, JSON.stringify(r) + '; rect: ' + rdet); check('mobile home: no exceptions', pg.st.errors.length === 0, pg.st.errors.join(' | ')); await pg.close(); }
for (const p of ['/platform', '/agents', '/case-studies/pbaco', '/compare-zynix-vs-navina']) { const pg = await open(p, { mobile: true }); const rect = await pg.ev(RECT390); await pg.close(); const [ok, det] = rect390(p, rect); check(`${p} @390: no rect overflow beyond the c95cc03 ratchet`, ok, det); }

// 4. the page as it will be once Webflow loads @main: background cache revalidation fires and nothing throws
{ const pg = await open('/', { asMain: true, firstVisit: true, wait: 16000 }); const r = await pg.ev(`({main:[...document.scripts].some(s=>/@main\\/(dist\\/zynix-site-scripts\\.deployed|zynix-site-scripts-unminified)\\.js/.test(s.src)),words:document.body.innerText.split(/\\s+/).length,stamp:(()=>{try{return !!localStorage.getItem('zx_asset_check')}catch(e){return null}})()})`);
  check('@main simulation: page renders from the @main URLs', r && r.main && r.words > 1200, JSON.stringify(r)); check('@main simulation: bundle and stylesheet are re-validated in the background (2 requests each)', pg.st.js >= 2 && pg.st.css >= 2, `bundle ${pg.st.js}x, stylesheet ${pg.st.css}x`);
  if (DIST_SIM) check('--dist: the page loaded the deploy build from the dist/ URLs, and revalidated both', pg.st.distHtml && pg.st.built >= 4, `dist HTML ${!!pg.st.distHtml}, dist requests ${pg.st.built}`); check('@main simulation: no exceptions', pg.st.errors.length === 0, pg.st.errors.join(' | ')); await pg.close(); }

const failed = results.filter(r => !r.ok); console.log(`\n${results.length - failed.length}/${results.length} smoke checks passed`);
try { await send('Browser.close'); } catch {} chrome.kill(); process.exit(failed.length ? 1 : 0);
