// Launch checklist and weight budget (final QA round 1, 2026-09-29; owner Q). Used by ci/static-checks.mjs; also a CLI:
//
//   node ci/launch.mjs                  print the checklist (the LAUNCH lines ci/static-checks.mjs prints) and the weights
//   node ci/launch.mjs --json           the same as JSON
//   node ci/launch.mjs --write-weight   ratchet the weight ceilings in ci/baseline.json DOWN to measured + headroom, and styleAttributes
//                                       down to the measured style=" count (never raises; logged in weight.log; optional --reason)
//   node ci/launch.mjs --build-plan     the ordered steps of launch item "build" (final QA round 3) with this tree's state, and
//                                       the workflow edit of step A as a diff (printed for the orchestrator, never applied)
//   node ci/launch.mjs --verify-build-live [--base https://www.zynix.ai] [--cdn <jsDelivr @main URL>] [--pages /,/platform]
//                                       step C, read-only: the live pages load only the dist/ URLs and jsDelivr @main serves
//                                       dist/ files equal to a fresh build of the @main sources (exit 0 = verified); add
//                                       --checklist to print the checklist with that result
//   node ci/launch.mjs --remeasure-weight --reason "<why>"
//                                       set every ceiling (sources and deploy build) to measured + headroom, UP or down, and log
//                                       the change with its reason in weight.log (final QA round 2). For the orchestrator's run
//                                       after the LAST merge of a round, when that round's accepted growth passed the ceilings;
//                                       refuses without a reason or while the deploy build fails its self-checks.
//
// Why: launch precondition 6 (DESIGN_SPEC §8.0) says Q's banned-string check reports zero across the whole bundle. The check
// reaches zero only through exemptions (ci/banned-strings.mjs: dead code, A2P-frozen text, a [VERIFY] item), and the frozen
// A2P renderers carry visible defects no string list catches. Each of them is an item a person must close or sign off, so
// each prints as one LAUNCH line with its text, owner and fix, and `node ci/static-checks.mjs --launch` FAILS while any item
// is open and not signed off. CI runs static-checks without --launch, so an open item never blocks a normal PR.
//
// Items (each has a stable id):
//   dated:<fn>       a DATED_EXEMPTIONS entry that is in force (banned string in an A2P-frozen renderer)
//   verify:<text>    a VERIFY_EXEMPTIONS entry that is in force (banned string escalated to Gautamdev)
//   dead-code        banned strings inside DEAD_FUNCTIONS: they ship in the public bundle although no visitor can reach them
//   a2p:<id>         A2P_ITEMS below: visible defects in the frozen renderers that are not banned strings
//   weight           the weight targets below are not met by the deploy build (bundle + stylesheet brotli, stylesheet brotli, @import)
//   build            production does not load the deploy build yet (ci/build.mjs; final QA round 2). Final QA round 3: the
//                    ORDER is part of the item (A: dist/ of the current production sources + the workflow on main; B: Webflow
//                    head and footer switched; C: verified live; D: the redesign merge with its dist/ as the last commit), and
//                    the item closes itself only when `node ci/static-checks.mjs --launch` verifies C live (verifyBuildLive)
//                    with this tree's workflow purging dist/ and a current dist/. A sign-off is honored only when it records
//                    the decision to ship the sources unminified ({"shipSources": true}).
// Sign-off: the orchestrator records a decision in ci/baseline.json `launchSignoffs`, e.g.
//   "launchSignoffs": { "dead-code": { "by": "orchestrator", "date": "2026-09-30", "note": "unreachable; delete in Phase 4" } }
// A signed-off item still prints (with the sign-off) but no longer fails --launch. An item that is fixed disappears by itself.
//
// Weight (finding "no weight budget"): brotli quality 4 (what jsDelivr serves) of the two files production loads, and the
// stylesheet's @import rules. ci/baseline.json `weight` holds ratchet CEILINGS (a failing check in every run: the files may not
// grow past them; Q lowers them with --write-weight after the LAST merge of a round, never on the base while other branches
// are in flight) and TARGETS (the launch item: production's total at c95cc03 and an agreed stylesheet size). Headroom for
// --write-weight: 2,048 bytes over the measured brotli size.
// Final QA round 2 (2026-09-29): the deploy build (ci/build.mjs, whitespace-only minification) is measured on every run too.
// `weight.ceilings` stay on the sources (what production loads today); `weight.builtCeilings` ratchet the build; the TARGETS
// are compared with the build, which is what visitors download once launch item "build" is closed.
import fs from 'node:fs';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { extractFunction } from './extract-function.mjs';
import { build, distState, DIST, SRC } from './build.mjs';
import { reachability, lex, matchBrace, DEAD_FUNCTIONS } from './banned-strings.mjs';

// Visible defects in the A2P-frozen renderers (ci/a2p-freeze.json) that are not banned strings. An entry applies while every
// listed function still hashes to its pinned SHA-256; when one changes, the item says so (verify the fix, then delete the entry).
export const A2P_ITEMS = [
  { id: 'carrier-sprint', text: 'Sprint', pages: ['/sms-program', '/privacy-policy', '/terms-of-service'],
    fns: { renderSMSProgram: 'fc361125b8d4cccefa9867b928b051aa6239adb5e8f2fac86f04a2b3eeb8a88e', renderPrivacyV7: '564abd893045071f60fc604fe2d2a292386b63436f6a01f3d14691dbb48f131f', renderTermsV7: 'c578f5d5771ef575ad97a20df4dc6abd9fd1ff0992832e11803f3330642af226' },
    since: '2026-09-29', owner: 'A2P workstream',
    problem: 'the supported-carrier lists name "Sprint", which merged into T-Mobile in 2020 (final QA claims issue 11)',
    fix: 'drop "Sprint" from the carrier lists in the bundle renderers and the native Webflow pages together, after the campaign decision; re-pin ci/a2p-freeze.json; in the same session apply the A2P-held section (`held`) of the dashboard job list (tools/rd_checks.mjs --jobs), which the one-publish job leaves out during carrier review; then delete this entry' },
  { id: 'sms-consent-fine-print', text: 'By checking the box above and submitting', pages: ['/sms-consent'],
    fns: { renderSMSConsent: '3dc0b6c16d9d7abcb29a800638c8f50341011b3c1cbbb96802d6b2b5bdcc52c2' },
    since: '2026-09-29', owner: 'A2P workstream',
    problem: 'the SMS fine print and its Privacy Policy link are #94A3B8 on white at 11px (2.56:1), and the bold STOP and HELP are 11px: below WCAG AA contrast and the 12px floor (DESIGN_SPEC §7.2, §7.3). tools/gate.mjs exempts it as "sms-consent-fine-print"',
    fix: 'darken the fine print to at least --zx-text-muted (#646C7E) at 12px or more in renderSMSConsent and the native /sms-consent page together, after the campaign decision; re-pin ci/a2p-freeze.json; in the same session apply the A2P-held section (`held`) of the dashboard job list (tools/rd_checks.mjs --jobs); then delete this entry and the gate exemption' }
];

// Claim figures and extended claim patterns in the copy of unreachable functions (the dead-code item; final QA polish round).
// The patterns follow the EXT list of redesign-2026-09/tools/rd_checks.mjs (numbers: N%, Nx, N+, N million, $N, numeric ranges;
// plus agent counts, triage, hallucination, real-time and superlatives). Only string literals and template text are scanned, with
// HTML tags and style attributes removed (so "width:100%" is not a figure), and numbers that appear in SITE_FACTS strings
// (registry facts: 30+, 300+, 1M+ …) are allowed, as in rd_checks.
const FIGURES = [
  /(?<![\w.#-])\d+(?:\.\d+)?\s?%\+?/gi, /(?<![\w.$#])\d+(?:\.\d+)?x\b/gi, /(?<![\w.])\d[\d,]*\+/g, /\b\d+(?:\.\d+)?\s*(?:million|billion)\b/gi,
  /\$\d[\d,.]*(?:\s?(?:[MBK]\b|million|billion))?\+?/gi, /\b\d[\d,]*\s?[-–]\s?\d[\d,]*\s?(?:hours?|days?|weeks?|months?)\b/gi
];
const PATTERNS = [
  /\b(?:\d+|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\s+(?:more\s+)?(?:AI\s+|purpose-built\s+|specialized\s+|autonomous\s+)?agents\b/gi,
  /\btriage\b/gi, /\bhallucinat\w*/gi, /\breal[- ]time\b/gi, /\b(?:the only|industry[- ]leading|best[- ]in[- ]class|world[- ]class|unmatched)\b/gi
];
const normFig = t => t.replace(/\s+/g, '').toLowerCase();
export function deadFigures(js, reach) {
  let R = reach; if (!R) { try { R = reachability(js); } catch { R = null; } }
  if (!R || !R.ok) return { unreachable: 0, rows: [], error: R ? R.error : 'reachability failed' };
  const { literals } = lex(js); const text = (a, b) => literals.filter(([s, e]) => s >= a && e <= b).map(([s, e]) => js.slice(s, e)).join('\n');
  const visible = t => t.replace(/\bstyle\s*=\s*\\?(["'])[\s\S]*?\\?\1/g, ' ').replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;|&#\d+;/gi, ' ');
  const allow = new Set(); const f0 = js.search(/\bvar SITE_FACTS\s*=\s*\{/);
  if (f0 > -1) { const open = js.indexOf('{', f0), close = matchBrace(js, open); const facts = visible(text(open, close + 1)); for (const re of FIGURES) for (const m of facts.matchAll(re)) allow.add(normFig(m[0])); }
  const rows = [];
  for (const fn of R.unreachable) {
    const decl = R.fns.filter(f => f.name === fn || f.name.startsWith(fn + '#')); if (!decl.length) continue;
    const t = visible(decl.map(d => text(d.start, d.end)).join('\n')); const hits = [];
    for (const re of FIGURES) for (const m of t.matchAll(re)) if (!allow.has(normFig(m[0]))) hits.push(m[0].trim());
    for (const re of PATTERNS) for (const m of t.matchAll(re)) hits.push(m[0].trim());
    const uniq = [...new Set(hits)]; if (uniq.length) rows.push({ fn, listed: DEAD_FUNCTIONS.includes(fn), hits: uniq });
  }
  rows.sort((a, b) => (a.listed - b.listed) || (b.hits.length - a.hits.length));
  return { unreachable: R.unreachable.length, rows };
}

const brotli4 = buf => zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buf.length } }).length;
const sha = t => crypto.createHash('sha256').update(t).digest('hex');
const fmt = n => Number(n).toLocaleString('en-US');
export const HEADROOM = 2048;

export function measureWeight(js, css) {
  const jb = Buffer.from(js, 'utf8'), cb = Buffer.from(css, 'utf8');
  const jsBr4 = brotli4(jb), cssBr4 = brotli4(cb);
  const imports = (css.replace(/\/\*[\s\S]*?\*\//g, ' ').match(/@import\b/gi) || []).length;
  // the deploy build (ci/build.mjs): its sizes, its self-check problems and whether a committed dist/ matches it
  let b; try { b = build({ js, css }); } catch (e) { b = { js: '', css: '', problems: ['ci/build.mjs could not build the sources: ' + e.message] }; }
  const bj = Buffer.from(b.js, 'utf8'), bc = Buffer.from(b.css, 'utf8');
  const built = b.js ? { jsRaw: bj.length, cssRaw: bc.length, jsBr4: brotli4(bj), cssBr4: brotli4(bc) } : { jsRaw: 0, cssRaw: 0, jsBr4: 0, cssBr4: 0 };
  built.totalBr4 = built.jsBr4 + built.cssBr4; built.problems = b.problems; built.dist = b.js ? distState(b) : { present: false, fresh: false, stale: [] };
  return { jsRaw: jb.length, cssRaw: cb.length, jsBr4, cssBr4, totalBr4: jsBr4 + cssBr4, cssImports: imports, built };
}

// The failing weight checks (ceilings) for ci/redesign-checks.mjs.
export function weightChecks(w, baseline, check) {
  const W = baseline.weight; if (!W || !W.ceilings) { check('weight: ci/baseline.json has weight ceilings', false, 'missing weight.ceilings'); return; }
  const C = W.ceilings;
  const row = (name, got, max, unit) => check(`weight: ${name} ${fmt(got)}${unit} <= ceiling ${fmt(max)}${unit}`, got <= max, got <= max ? (max - got > HEADROOM + 1024 && unit ? `${fmt(max - got)} bytes under; lower it with node ci/launch.mjs --write-weight after the last merge of the round` : '') : `grew ${fmt(got - max)}${unit} past the ceiling: cut the growth, or raise the ceiling in the same PR with a reason (DESIGN_SPEC §7.4): node ci/launch.mjs --remeasure-weight --reason "…"`);
  row('stylesheet brotli-4', w.cssBr4, C.cssBr4, ' B');
  row('bundle + stylesheet brotli-4', w.totalBr4, C.totalBr4, ' B');
  row('stylesheet @import rules', w.cssImports, C.cssImports, '');
  // the deploy build (final QA round 2): it must build and pass its self-checks, a committed dist/ must be current, and it
  // may not grow past weight.builtCeilings (keys absent there are not checked yet; --write-weight adds them)
  const B = w.built || { problems: ['not measured'], dist: {} };
  check('deploy build (ci/build.mjs): builds; JS compiles; same tokens and kept line breaks as the source; CSS same tokens', !B.problems.length, B.problems.join(' | '));
  check(`deploy build: committed ${DIST.js} and ${DIST.css} match a fresh build`, !B.dist.present || B.dist.fresh,
    !B.dist.present ? 'dist/ not committed (launch item "build")' : B.dist.fresh ? 'current' : `STALE: ${B.dist.stale.join(', ')} — run node ci/build.mjs and commit dist/ (production would load old code once the head points at dist/)`);
  const BC = W.builtCeilings || {};
  if (BC.cssBr4 !== undefined) row('deploy build stylesheet brotli-4', B.cssBr4, BC.cssBr4, ' B');
  if (BC.totalBr4 !== undefined) row('deploy build bundle + stylesheet brotli-4', B.totalBr4, BC.totalBr4, ' B');
}

// --remeasure-weight: both directions, logged. The log entry keeps the old and new ceilings, the commit and the reason.
export function remeasureWeight(baseline, w, reason, commit) {
  const W = baseline.weight || {};
  const ceilings = { ...(W.ceilings || {}), cssBr4: w.cssBr4 + HEADROOM, totalBr4: w.totalBr4 + HEADROOM, cssImports: w.cssImports };
  const builtCeilings = { ...(W.builtCeilings || {}), cssBr4: w.built.cssBr4 + HEADROOM, totalBr4: w.built.totalBr4 + HEADROOM };
  const entry = { date: new Date().toISOString().slice(0, 10), commit, from: { ceilings: W.ceilings || {}, builtCeilings: W.builtCeilings || {} }, to: { ceilings, builtCeilings }, reason };
  baseline.weight = { ...W, ceilings, builtCeilings, log: [...(W.log || []), entry] }; return entry;
}

// --write-weight (final QA polish round): also ratchets styleAttributes (the style=" count, ci/redesign-checks.mjs check 3) down to
// the measured count, and logs every run that changed something in weight.log (date, commit, from, to, reason), so one command
// after the LAST merge of a round locks in both ratchets. Never raises anything.
export const styleCount = js => (js.match(/style="/g) || []).length;
export function writeWeight(baseline, w, { styles, commit = null, reason = 'ratchet down after the last merge of the round (node ci/launch.mjs --write-weight)' } = {}) {
  const lower = (C, want) => { const next = { ...C }; for (const [k, v] of Object.entries(want)) if (C[k] === undefined || v < C[k]) next[k] = v; return next; };
  const W = baseline.weight || {};
  const next = lower(W.ceilings || {}, { cssBr4: w.cssBr4 + HEADROOM, totalBr4: w.totalBr4 + HEADROOM, cssImports: w.cssImports });
  const nextBuilt = w.built && !w.built.problems.length ? lower(W.builtCeilings || {}, { cssBr4: w.built.cssBr4 + HEADROOM, totalBr4: w.built.totalBr4 + HEADROOM }) : (W.builtCeilings || {});
  const fromStyles = baseline.styleAttributes, toStyles = typeof styles === 'number' && (fromStyles === undefined || styles < fromStyles) ? styles : fromStyles;
  const same = JSON.stringify([W.ceilings || {}, W.builtCeilings || {}, fromStyles]) === JSON.stringify([next, nextBuilt, toStyles]);
  const log = same ? (W.log || []) : [...(W.log || []), { date: new Date().toISOString().slice(0, 10), commit, from: { ceilings: W.ceilings || {}, builtCeilings: W.builtCeilings || {}, styleAttributes: fromStyles }, to: { ceilings: next, builtCeilings: nextBuilt, styleAttributes: toStyles }, reason }];
  baseline.weight = { ...W, ceilings: next, builtCeilings: nextBuilt, log }; baseline.styleAttributes = toStyles;
  return { ceilings: next, builtCeilings: nextBuilt, styleAttributes: toStyles, changed: !same };
}

// Every open item. `judged` = judge() from ci/banned-strings.mjs on the same source.
// `workflow` = the text of .github/workflows/site-bundle.yml in this tree (or null); `live` = verifyBuildLive() when the caller
// ran it (node ci/static-checks.mjs --launch, node ci/launch.mjs --verify-build-live), else undefined.
export function launchChecklist({ js, css, baseline, judged, weight, workflow = null, live }) {
  const signoffs = baseline.launchSignoffs || {}; const items = [];
  const add = (id, area, owner, text, fix) => items.push({ id, area, owner, text, fix, signoff: signoffs[id] || null });
  const lineOf = i => js.slice(0, i).split('\n').length;
  // exemptions in force (banned strings the ratchet does not count)
  const scopeAt = i => { const s = judged.scopes.filter(q => q.name !== '(bundle)' && i >= q.start && i < q.end).sort((a, b) => (a.end - a.start) - (b.end - b.start))[0]; return s ? s.name : '(top level)'; };
  for (const h of judged.exempt.filter(x => x.kind === 'dated' && x.entry)) { const e = h.entry;
    add(`dated:${e.fn}`, 'claims (precondition 6)', e.owner,
      `"${e.text}" [${e.label}] renders in ${e.fn} (JS:${lineOf(h.index)}), not counted since ${e.since} only while that A2P-frozen function keeps its pinned hash: ${e.why}`, e.fix); }
  for (const h of judged.exempt.filter(x => x.kind === 'verify' && x.entry)) { const e = h.entry;
    add(`verify:${e.text}`, 'claims (precondition 6)', e.owner,
      `"${e.text}" [${e.label}] renders on ${e.page} from ${e.where} (JS:${lineOf(h.index)}), not counted since ${e.since} only while its pinned sentence is unchanged: ${e.why}`, e.fix); }
  const dead = judged.exempt.filter(x => x.kind === 'dead');
  // final QA polish round (claims r3 #8): the banned list alone named 13 functions, but every unreachable function ships in the
  // public bundle (and dist/), and several carry claim figures that were never registered (renderZynScribe "40%", renderZynFax
  // "90%+" …). The item now names EVERY unreachable function whose copy carries a claim figure or an extended claim pattern.
  const figs = deadFigures(js, judged.reach);
  if (dead.length || figs.rows.length) {
    const per = new Map();
    for (const h of dead) { const n = (h.entry && h.entry.fn) || '(unknown)'; const e = per.get(n) || { n: 0, labels: new Set() }; e.n++; e.labels.add(h.label); per.set(n, e); }
    const list = [...per].sort((a, b) => b[1].n - a[1].n).map(([n, e]) => `${n} ${e.n} (${[...e.labels].slice(0, 3).join(', ')})`).join('; ');
    const figList = figs.rows.map(r => `${r.fn}${r.listed ? '' : ' [not in DEAD_FUNCTIONS]'} (${r.hits.slice(0, 6).join(', ')}${r.hits.length > 6 ? `, +${r.hits.length - 6}` : ''})`).join('; ');
    add('dead-code', 'claims (precondition 6)', 'orchestrator (sign-off) or an ownership exception to DESIGN_SPEC §6/§8.1',
      `${figs.unreachable} functions are unreachable (reachability verified on every run, so no visitor sees them) but ship in the public bundle and dist/, where anyone reading the source does. ` +
      (dead.length ? `${dead.length} banned-claim hits sit inside ${per.size} of them (DEAD_FUNCTIONS, exempt from the ratchet): ${list}. ` : '') +
      (figs.rows.length ? `${figs.rows.length} of them carry claim figures or extended claim patterns that are not registry facts (${figs.rows.filter(r => !r.listed).length} not in DEAD_FUNCTIONS, so no other check names them): ${figList}` : ''),
      `either record an explicit sign-off in ci/baseline.json launchSignoffs["dead-code"] that covers all ${figs.unreachable} unreachable functions and the figures listed here, or grant the ownership exception to delete all ${figs.unreachable} (node ci/banned-strings.mjs --dead lists them) together with their shadowed routes keys (also shrinks the bundle); then remove them from DEAD_FUNCTIONS`);
  }
  // A2P-frozen visible defects that are not banned strings
  for (const x of A2P_ITEMS) {
    const changed = [], missing = [];
    for (const [fn, want] of Object.entries(x.fns)) { let t = null; try { t = extractFunction(js, fn); } catch { missing.push(fn); continue; } if (sha(t) !== want) changed.push(fn); else if (!t.includes(x.text)) missing.push(fn); }
    const live = Object.keys(x.fns).filter(f => !changed.includes(f) && !missing.includes(f));
    if (!live.length && !changed.length) continue;   // fixed everywhere and the entry is stale: nothing to show
    add(`a2p:${x.id}`, 'A2P-frozen content', x.owner,
      `${x.problem}; on ${x.pages.join(', ')}` + (changed.length ? `. CHANGED since the pin: ${changed.join(', ')} (verify the fix there, then narrow or delete this entry)` : ''), x.fix);
  }
  // weight targets, compared with the deploy build (ci/build.mjs; final QA round 2), which is what visitors download once
  // launch item "build" is closed; the sources' numbers are printed for context
  const T = (baseline.weight && baseline.weight.targets) || null;
  const B = weight && weight.built && !weight.built.problems.length ? weight.built : null;
  if (T && weight) {
    const m = B || weight, what = B ? 'deploy build' : 'sources (the build failed)'; const miss = [];
    if (T.totalBr4 !== undefined && m.totalBr4 > T.totalBr4) miss.push(`${what}: bundle + stylesheet ${fmt(m.totalBr4)} B brotli-4 vs production ${fmt(T.totalBr4)} B (+${fmt(m.totalBr4 - T.totalBr4)}, +${((m.totalBr4 / T.totalBr4 - 1) * 100).toFixed(1)}%)`);
    if (T.cssBr4 !== undefined && m.cssBr4 > T.cssBr4) miss.push(`${what}: stylesheet ${fmt(m.cssBr4)} B brotli-4 vs target ${fmt(T.cssBr4)} B (${(m.cssBr4 / T.cssBr4).toFixed(1)}x; ${fmt(m.cssRaw)} B raw)`);
    if (T.cssImports !== undefined && weight.cssImports > T.cssImports) miss.push(`${weight.cssImports} @import rule(s) in the stylesheet (the Funnel Sans request chains behind the render-blocking CSS; production has the same one) vs ${T.cssImports}`);
    const ctx = B ? ` (the deploy build is ${fmt(B.totalBr4)} B brotli-4${B.totalBr4 <= T.totalBr4 ? `, ${fmt(T.totalBr4 - B.totalBr4)} B under production's total` : ''}; the sources are ${fmt(weight.totalBr4)} B, stylesheet ${fmt(weight.cssBr4)} B; production loads the sources until launch item "build" is closed)` : '';
    if (miss.length) add('weight', 'performance', 'S1 (stylesheet), S2 (bundle); orchestrator agrees the budget',
      'weight targets not met: ' + miss.join('; ') + ctx, 'S1 cuts the stylesheet (dead legacy rules, duplicated blocks); or the orchestrator agrees different targets in ci/baseline.json weight.targets or signs off launchSignoffs["weight"]');
  }
  // the deploy build is not what production loads until dist/ is on main, purged by the workflow and loaded by Webflow
  if (weight && weight.built) buildItem({ add, weight, B, workflow, live, signoff: signoffs.build || null, items });
  return items;
}

// ── launch item "build" (final QA round 3): the ORDER of the switch, the workflow state, the live proof ─────────────
// Final QA round 3 measured (390 px, Slow 4G + 4x CPU, 104 pages): the sources are slower than production on every page
// (FCP +208/+220/+312 ms quartiles), the build is faster (median -124 ms). The round-2 order (commit dist/ last, merge, THEN
// switch the Webflow head) therefore guaranteed a window after the CD merge in which every visitor got the slower sources.
// The order below switches production to a build of its CURRENT sources first, so the redesign merge goes live minified.
export const WORKFLOW = '.github/workflows/site-bundle.yml';
export const CDN_MAIN = 'https://cdn.jsdelivr.net/gh/cgautamdevc14/zynix-webflow-content@main';
export const LIVE_BASE = 'https://www.zynix.ai';
// bundle pages of each template family plus one native blog post (the footer script and the stylesheet load there too)
export const LIVE_PAGES = ['/', '/platform', '/agents', '/case-studies/pbaco', '/contact', '/sms-consent', '/blog-posts/best-ai-medical-scribes-comparison-2026'];
const SRC_LOOP = 'for f in zynix-site-scripts-unminified.js zynix-site-styles.deployed.css; do';
const DIST_LOOP = `for f in zynix-site-scripts-unminified.js zynix-site-styles.deployed.css ${DIST.js} ${DIST.css}; do`;
const BUILD_STEP = `      - name: Deploy build is current (dist/ = node ci/build.mjs of this commit's sources; production loads dist/)\n        run: node ci/build.mjs --check\n`;

// What the workflow in this tree does with dist/ (read-only; the workflow belongs to the orchestrator, DESIGN_SPEC §8.2 Q).
export function workflowState(text) {
  if (!text) return { ok: false, missing: [`${WORKFLOW} is missing`] };
  const lines = text.split('\n'), missing = [];
  const blockAfter = (re, indent) => { const i = lines.findIndex(l => re.test(l)); if (i < 0) return null; const out = []; for (let k = i + 1; k < lines.length; k++) { const l = lines[k]; if (l.trim() && (l.length - l.trimStart().length) <= indent) break; out.push(l); } return out.join('\n'); };
  const push = blockAfter(/^  push:\s*$/, 2);
  if (!push || !(/['"]?dist\/\*\*['"]?/.test(push) || (push.includes(DIST.js) && push.includes(DIST.css)))) missing.push("'dist/**' in the push paths (else a dist/-only commit is never purged)");
  const steps = []; lines.forEach((l, i) => { const m = l.match(/^(\s*)- name:\s*(.+)$/); if (m) steps.push({ i, indent: m[1].length, name: m[2] }); });
  const body = s => { const out = []; for (let k = s.i + 1; k < lines.length; k++) { const l = lines[k]; if (l.trim() && (l.length - l.trimStart().length) <= s.indent) break; out.push(l); } return out.join('\n'); };
  const loopsOk = s => { const loops = [...body(s).matchAll(/for f in ([^;\n]+);\s*do/g)].map(m => m[1]); return loops.length > 0 && loops.every(x => x.includes(DIST.js) && x.includes(DIST.css)); };
  const purge = steps.filter(s => /purge/i.test(s.name)), prove = steps.filter(s => /prove the CDN/i.test(s.name));
  if (!purge.length || !purge.every(loopsOk)) missing.push('both dist/ files in the "Purge jsDelivr @main" loop');
  if (!prove.length || !prove.every(loopsOk)) missing.push('both dist/ files in every loop of "Prove the CDN serves this commit"');
  const deployAt = text.search(/\n  deploy:\s*\n/);
  if (!/node ci\/build\.mjs --check/.test(deployAt > -1 ? text.slice(0, deployAt) : text)) missing.push('a checks-job step "node ci/build.mjs --check" (no PR may change the sources without rebuilding dist/)');
  return { ok: missing.length === 0, missing };
}

// The workflow edit the orchestrator applies in step A (printed by --build-plan and tools/prelaunch_dist.mjs; never applied by Q).
export function proposedWorkflow(text) {
  const done = [], problems = []; let t = text;
  if (!/['"]dist\/\*\*['"]/.test(t)) {
    const re = /(\n  push:\n(?:(?: {4,}.*|\s*)\n)*? {6}- 'zynix-site-styles\.deployed\.css'\n)/;
    if (re.test(t)) { t = t.replace(re, `$1      - 'dist/**'\n`); done.push("push paths: + 'dist/**'"); } else problems.push("push paths: anchor \"- 'zynix-site-styles.deployed.css'\" under push: not found");
  }
  if (!/node ci\/build\.mjs --check/.test(t)) {
    const re = /( {6}- name: Static checks\n {8}run: node ci\/static-checks\.mjs\n)/;
    if (re.test(t)) { t = t.replace(re, `$1${BUILD_STEP}`); done.push('checks job: + step "node ci/build.mjs --check"'); } else problems.push('checks job: anchor "- name: Static checks / run: node ci/static-checks.mjs" not found');
  }
  const n = t.split(SRC_LOOP).length - 1;
  if (n) { t = t.split(SRC_LOOP).join(DIST_LOOP); done.push(`purge, prove, re-purge and summary loops: + ${DIST.js} ${DIST.css} (${n} loop(s))`); }
  else if (!t.includes(DIST_LOOP)) problems.push(`no "${SRC_LOOP}" loop found`);
  const head = '#   zynix-site-scripts-unminified.js   and   zynix-site-styles.deployed.css\n';
  if (t.includes(head) && !t.includes('dist/zynix-site-scripts.deployed.js   and')) { t = t.replace(head, head + `#   or, once the Webflow head and footer point at them, their deploy build (ci/build.mjs):\n#   ${DIST.js}   and   ${DIST.css}\n`); done.push('header comment'); }
  const after = workflowState(t);
  if (!after.ok) problems.push('after the edit, still missing: ' + after.missing.join('; '));
  return { text: t, done, problems };
}

// Step C, read-only: every checked page loads the bundle and the stylesheet ONLY from the …@main/dist/ URLs (script, stylesheet
// link and any preload of either file), and jsDelivr @main serves dist/ files that equal a fresh build (ci/build.mjs) of the
// @main sources, i.e. the deploy job purged and proved them. Returns { checked, ok, problems, notes }.
export async function verifyBuildLive({ base = LIVE_BASE, cdn = CDN_MAIN, pages = LIVE_PAGES, timeoutMs = 30000 } = {}) {
  const problems = [], notes = []; base = base.replace(/\/$/, ''); cdn = cdn.replace(/\/$/, '');
  const get = async u => { const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), timeoutMs);
    try { const r = await fetch(u, { signal: ctl.signal, redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (zynix launch check: read-only)', 'Cache-Control': 'no-cache' } }); return { status: r.status, type: r.headers.get('content-type') || '', text: r.ok ? await r.text() : '' }; }
    catch (e) { return { status: 0, error: e.name === 'AbortError' ? 'timeout' : e.message, text: '' }; } finally { clearTimeout(t); } };
  const attr = (tag, a) => (tag.match(new RegExp('\\b' + a + '\\s*=\\s*["\']([^"\']*)["\']', 'i')) || [])[1] || '';
  const isDist = (u, f) => u === `${cdn}/${f}`;
  let reached = 0;
  for (const p of pages) {
    const r = await get(base + p); if (r.status !== 200) { problems.push(`${p}: HTTP ${r.status || r.error}`); continue; } reached++;
    const html = r.text;
    const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map(m => attr(m[0], 'src')).filter(u => /zynix-site-scripts(?:-unminified|\.deployed)\.js/.test(u));
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => ({ rel: attr(m[0], 'rel').toLowerCase(), href: attr(m[0], 'href') })).filter(l => /zynix-site-(?:styles|scripts)[\w.-]*\.(?:css|js)/.test(l.href));
    const sheets = links.filter(l => /\bstylesheet\b/.test(l.rel)), preloads = links.filter(l => /preload|prefetch/.test(l.rel));
    const bad = [];
    if (!scripts.length) bad.push('no bundle <script>'); for (const u of scripts) if (!isDist(u, DIST.js)) bad.push(`script ${u}`);
    if (!sheets.length) bad.push('no stylesheet <link>'); for (const l of sheets) if (!isDist(l.href, DIST.css)) bad.push(`stylesheet ${l.href}`);
    for (const l of preloads) if (!isDist(l.href, /\.css$/.test(l.href) ? DIST.css : DIST.js)) bad.push(`${l.rel} ${l.href}`);
    const stray = [...new Set([...html.matchAll(/zynix-webflow-content@[^/"'\s]+\/(zynix-site-scripts-unminified\.js|zynix-site-styles\.deployed\.css)/g)].map(m => m[0]))];
    for (const s of stray) if (!bad.some(b => b.includes(s))) bad.push(`other reference ${s}`);
    if (bad.length) problems.push(`${p}: not on the deploy build: ${bad.join('; ')}`); else notes.push(`${p}: dist/ only (${scripts.length} script, ${sheets.length} stylesheet, ${preloads.length} preload)`);
  }
  if (reached) {
    const [dj, dc, sj, sc] = await Promise.all([get(`${cdn}/${DIST.js}`), get(`${cdn}/${DIST.css}`), get(`${cdn}/${SRC.js}`), get(`${cdn}/${SRC.css}`)]);
    if (dj.status !== 200 || !/javascript/.test(dj.type)) problems.push(`${cdn}/${DIST.js}: HTTP ${dj.status || dj.error} ${dj.type}`);
    if (dc.status !== 200 || !/css/.test(dc.type)) problems.push(`${cdn}/${DIST.css}: HTTP ${dc.status || dc.error} ${dc.type}`);
    if (dj.text && dc.text && sj.text && sc.text) {
      const b = build({ js: sj.text, css: sc.text });
      if (b.problems.length) problems.push('ci/build.mjs cannot build the @main sources: ' + b.problems.join(' | '));
      else { const stale = [dj.text !== b.js ? DIST.js : null, dc.text !== b.css ? DIST.css : null].filter(Boolean);
        if (stale.length) problems.push(`jsDelivr @main serves ${stale.join(' and ')} that do NOT equal a fresh build of the @main sources (a stale dist/ commit, or a CDN cache the deploy job did not purge)`);
        else notes.push(`jsDelivr @main: dist/ = a fresh build of the @main sources (sha256 ${sha(dj.text).slice(0, 12)}… / ${sha(dc.text).slice(0, 12)}…)`); }
    } else if (!problems.some(x => x.startsWith(cdn))) problems.push('could not fetch the @main sources from jsDelivr to compare');
  }
  return { checked: reached > 0, ok: reached > 0 && problems.length === 0, base, cdn, pages, problems, notes };
}

function buildItem({ add, weight, B, workflow, live, signoff, items }) {
  const d = weight.built.dist || {}, wf = workflowState(workflow);
  const save = B ? `the build is ${fmt(B.totalBr4)} B brotli-4 against ${fmt(weight.totalBr4)} B for the sources (${fmt(weight.totalBr4 - B.totalBr4)} B, ${((1 - B.totalBr4 / weight.totalBr4) * 100).toFixed(1)}% less)` : 'the build currently fails (see the static check)';
  const distOk = d.present && d.fresh, liveOk = !!(live && live.ok);
  if (B && wf.ok && distOk && liveOk) return;   // closed: verified live in this run (node ci/static-checks.mjs --launch)
  const state = [
    `(A) the workflow in this tree ${wf.ok ? 'purges, proves and checks dist/' : 'lacks ' + wf.missing.join(', ')}`,
    `(B/C) live head ${!live ? 'not checked in this run (node ci/launch.mjs --verify-build-live, or node ci/static-checks.mjs --launch)' : live.ok ? 'verified on dist/' : (live.checked ? 'NOT verified: ' : 'could not be checked: ') + live.problems.slice(0, 2).map(x => x.split(live.cdn + '/').join('…@main/')).join(' | ') + (live.problems.length > 2 ? ` (+${live.problems.length - 2} more; node ci/launch.mjs --verify-build-live lists them)` : '')}`,
    `(D) dist/ in this tree ${d.present ? (d.fresh ? 'committed and current' : 'committed but STALE') : 'not committed'}`];
  const next = !wf.ok ? 'A' : !liveOk ? (live && live.checked ? 'B, then C' : 'C (or B first)') : 'D';
  const honored = signoff && signoff.shipSources === true;
  const note = signoff && !honored ? ` A launchSignoffs["build"] entry is recorded but NOT honored: this item closes itself only when C is verified live in the --launch run; a sign-off can only record the decision to ship the sources unminified ({"shipSources": true}).` : '';
  add('build', 'performance', 'orchestrator (A, D: main PR, workflow, release-branch merge) and Gautamdev (B: Webflow head and footer, dashboard job)',
    `production loads the unminified sources; ${save}. State: ${state.join('; ')}. Next step: ${next}.${note}`,
    `ORDER (final QA round 3): switch production to the build BEFORE the redesign merge, never after it: merging first and switching the head later gives every visitor in between the slower sources (the sources measured slower than production on 104/104 pages, the build faster). ` +
    `(A) Now, on main, one PR that changes nothing live: ci/build.mjs; ${DIST.js} and ${DIST.css} built from main's CURRENT sources (node ci/build.mjs in that checkout); ci/smoke.mjs answering the dist/ URLs; and in ${WORKFLOW}: 'dist/**' in the push paths, both dist/ files in the purge loop and in every "prove the CDN serves this commit" loop, and a checks step "node ci/build.mjs --check" (no later PR can change the sources without rebuilding dist/). node tools/prelaunch_dist.mjs --main <a branch of main> prepares everything except the workflow, whose edit it prints (as does node ci/launch.mjs --build-plan) for the orchestrator to apply. Merge it; the deploy job purges and proves the dist/ files. ` +
    `(B) Gautamdev points the Webflow footer script at ${CDN_MAIN}/${DIST.js} and the head stylesheet and its preload at ${CDN_MAIN}/${DIST.css} (keep that file name: the bundle's CD revalidation finds the stylesheet by "zynix-site-styles.deployed.css"), and publishes. Same code, about 110–120 ms faster on bundle pages. ` +
    `(C) Verify live: node ci/launch.mjs --verify-build-live (every checked page loads only the dist/ URLs; jsDelivr serves dist/ files equal to a fresh build of the @main sources) and BASE=https://www.zynix.ai node tools/verify_preview.mjs. ` +
    `(D) Merge main into the release branch (keep the release branch's ci/smoke.mjs and ci/build.mjs), rebuild dist/ as its LAST commit (ZX_ESBUILD=<node_modules/esbuild> node ci/build.mjs), run node ci/static-checks.mjs --launch, then merge it to main: the redesign goes live already minified. ` +
    `(E) This item closes itself when node ci/static-checks.mjs --launch verifies C live with this tree's workflow and a current dist/; record launchSignoffs["build"] only after that. Shipping the sources unminified instead is a decision recorded as launchSignoffs["build"] = {"shipSources": true, …}`);
  const it = items[items.length - 1]; if (!honored) it.signoff = null;
}

export const printChecklist = (items, launch) => {
  for (const x of items) console.log(`LAUNCH  ${x.signoff ? `[signed off by ${x.signoff.by || '?'}${x.signoff.date ? ' on ' + x.signoff.date : ''}${x.signoff.note ? ': ' + x.signoff.note : ''}]` : launch ? '[OPEN, fails --launch]' : '[open]'} ${x.id} (${x.area}; owner: ${x.owner}): ${x.text}${x.fix ? ' — fix: ' + x.fix : ''}`);
  const open = items.filter(x => !x.signoff).length;
  console.log(`LAUNCH  ${items.length} item(s), ${open} open${open ? `; node ci/static-checks.mjs --launch fails until each is fixed or signed off (ci/baseline.json launchSignoffs)` : ''}`);
  return open;
};

// ── CLI ──────────────────────────────────────────────────────────────────────────────────────────────────────
if (process.argv[1] && process.argv[1].endsWith('launch.mjs')) {
  const { judge } = await import('./banned-strings.mjs');
  const js = fs.readFileSync('zynix-site-scripts-unminified.js', 'utf8'), css = fs.readFileSync('zynix-site-styles.deployed.css', 'utf8');
  const baseline = JSON.parse(fs.readFileSync('ci/baseline.json', 'utf8'));
  const w = measureWeight(js, css);
  if (process.argv.includes('--write-weight')) {
    let commit = null; try { const { execSync } = await import('node:child_process'); commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch {}
    const at = process.argv.indexOf('--reason'), reason = at > -1 ? String(process.argv[at + 1] || '').trim() : undefined;
    const next = writeWeight(baseline, w, { styles: styleCount(js), commit, ...(reason ? { reason } : {}) });
    fs.writeFileSync('ci/baseline.json', JSON.stringify(baseline, null, 2) + '\n');
    console.log('weight ceilings (and styleAttributes): ' + JSON.stringify(next) + (next.changed ? ' (logged in ci/baseline.json weight.log)' : ' (nothing to lower)')); process.exit(0); }
  if (process.argv.includes('--remeasure-weight')) {
    const at = process.argv.indexOf('--reason'), reason = at > -1 ? String(process.argv[at + 1] || '').trim() : '';
    if (reason.length < 20) { console.log('refused: --remeasure-weight needs --reason "<why the growth is accepted, per stream>" (20+ characters)'); process.exit(1); }
    if (w.built.problems.length) { console.log('refused: the deploy build fails its self-checks: ' + w.built.problems.join(' | ')); process.exit(1); }
    let commit = null; try { const { execSync } = await import('node:child_process'); commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch {}
    const e = remeasureWeight(baseline, w, reason, commit); fs.writeFileSync('ci/baseline.json', JSON.stringify(baseline, null, 2) + '\n');
    console.log('weight ceilings re-measured: ' + JSON.stringify(e.to) + ' (logged in ci/baseline.json weight.log)'); process.exit(0);
  }
  const workflow = fs.existsSync(WORKFLOW) ? fs.readFileSync(WORKFLOW, 'utf8') : null;
  const opt = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d; };
  // --build-plan: the ordered steps of launch item "build" and the workflow edit of step A (printed, never applied)
  if (process.argv.includes('--build-plan')) {
    const it = launchChecklist({ js, css, baseline, judged: judge(js, baseline), weight: w, workflow }).find(x => x.id === 'build');
    console.log(it ? it.text + '\n\n' + it.fix.replace(/ \(([A-E])\) /g, '\n($1) ').replace(/^ORDER/, 'ORDER') : 'launch item "build" is closed');
    const pw = proposedWorkflow(workflow || '');
    console.log(`\nstep A, ${WORKFLOW} (the orchestrator applies this; Q never edits the workflow): ${pw.done.length ? pw.done.join('; ') : 'nothing to change'}${pw.problems.length ? '\nPROBLEMS: ' + pw.problems.join(' | ') : ''}`);
    if (pw.done.length && workflow) {
      const os = await import('node:os'); const path = await import('node:path'); const { spawnSync } = await import('node:child_process');
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'zx-wf-'));
      for (const [k, t] of [['old', workflow], ['new', pw.text]]) { fs.mkdirSync(path.join(dir, k, path.dirname(WORKFLOW)), { recursive: true }); fs.writeFileSync(path.join(dir, k, WORKFLOW), t); }
      const d = spawnSync('git', ['diff', '--no-index', '--no-color', 'old/' + WORKFLOW, 'new/' + WORKFLOW], { cwd: dir, encoding: 'utf8' });
      const patch = (d.stdout || '').split('a/old/').join('a/').split('b/new/').join('b/');
      fs.writeFileSync(path.join(dir, 'site-bundle.patch'), patch);
      console.log(patch || '(git diff unavailable)');
      console.log(`patch: ${path.join(dir, 'site-bundle.patch')} (git apply it at the root of a checkout of main); proposed file: ${path.join(dir, 'new', WORKFLOW)}`);
    }
    process.exit(0);
  }
  // --verify-build-live [--base URL] [--cdn URL] [--pages /,/platform]: step C, read-only
  let live;
  if (process.argv.includes('--verify-build-live')) {
    live = await verifyBuildLive({ base: opt('--base', LIVE_BASE), cdn: opt('--cdn', CDN_MAIN), pages: opt('--pages') ? opt('--pages').split(',') : LIVE_PAGES });
    for (const n of live.notes) console.log('PASS  ' + n);
    for (const p of live.problems) console.log('FAIL  ' + p);
    console.log(live.ok ? `build live: VERIFIED on ${live.base} (${live.pages.length} pages) and ${live.cdn}` : `build live: NOT verified (${live.problems.length} problem(s))`);
    if (!process.argv.includes('--json') && !process.argv.includes('--checklist')) process.exit(live.ok ? 0 : 1);
  }
  const Bw = w.built;
  const items = launchChecklist({ js, css, baseline, judged: judge(js, baseline), weight: w, workflow, live });
  if (process.argv.includes('--json')) console.log(JSON.stringify({ weight: w, items }, null, 1));
  else { console.log(`weight: bundle ${fmt(w.jsRaw)} B raw / ${fmt(w.jsBr4)} B br4; stylesheet ${fmt(w.cssRaw)} B raw / ${fmt(w.cssBr4)} B br4; total br4 ${fmt(w.totalBr4)} B; @import ${w.cssImports}`);
    console.log(`deploy build (ci/build.mjs): bundle ${fmt(Bw.jsRaw)} B raw / ${fmt(Bw.jsBr4)} B br4; stylesheet ${fmt(Bw.cssRaw)} B raw / ${fmt(Bw.cssBr4)} B br4; total br4 ${fmt(Bw.totalBr4)} B; ${Bw.problems.length ? 'self-checks FAILED' : 'self-checks passed'}`);
    printChecklist(items, false); }
}
