// Static guards for the two files that production loads. Fails the build on anything that would break or embarrass the site.
import fs from 'node:fs';
const JS = 'zynix-site-scripts-unminified.js', CSS = 'zynix-site-styles.deployed.css';
const js = fs.readFileSync(JS, 'utf8'), css = fs.readFileSync(CSS, 'utf8');
let failed = 0; const check = (name, ok, detail = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); if (!ok) failed++; };

for (const [n, t] of [[JS, js], [CSS, css]]) check(`${n}: no merge-conflict markers`, !/^(<<<<<<<|=======|>>>>>>>)( |$)/m.test(t));
check(`${JS}: size is plausible (1.0–2.6 MB)`, js.length > 1.0e6 && js.length < 2.6e6, `${js.length} bytes`);
check(`${CSS}: size is plausible (40–400 KB)`, css.length > 4e4 && css.length < 4e5, `${css.length} bytes`);
const strip = c => c.replace(/\/\*[\s\S]*?\*\//g, '').replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '""');
const c2 = strip(css); check(`${CSS}: braces balance`, (c2.match(/{/g) || []).length === (c2.match(/}/g) || []).length, `${(c2.match(/{/g) || []).length} { vs ${(c2.match(/}/g) || []).length} }`);
for (const bad of ['[CONFIRM', 'DRAFT \u2014', 'PDF_URL', 'lorem ipsum', 'Powered by ZynixLLM</div>']) check(`${JS}: no "${bad}"`, !js.toLowerCase().includes(bad.toLowerCase()));
check(`${JS}: the retired sender brand "Zyncare" does not come back`, !/zyncare/i.test(js));
check(`${JS}: old support address support@zynix.ai / hello@zynix.ai not used`, !/(support|hello)@zynix\.ai/i.test(js));

// A2P 10DLC: these strings are quoted verbatim in the registered campaign. Change them only together with the campaign and the native Webflow pages.
const LABEL = 'By checking this box, I agree to receive text messages from Zynix AI at the mobile number provided, including appointment reminders, care coordination updates, scheduling notifications, and account service alerts.';
check(`${JS}: SMS consent checkbox label is verbatim`, js.includes(LABEL));
check(`${JS}: Twilio no-sharing sentence present`, js.includes('No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.'));
check(`${JS}: forms check the HubSpot response before saying thank you`, (js.match(/if\(!r\.ok\)\{throw new Error\(r\.status\)\}/g) || []).length >= 2 && js.includes("if (!r.ok) throw new Error('HubSpot '"));
check(`${JS}: newsletter no longer fakes a subscription`, !js.includes('Check your inbox for a confirmation'));

console.log(`\n${failed ? failed + ' static check(s) FAILED' : 'all static checks passed'}`); process.exit(failed ? 1 : 0);
