// Launch checklist and weight budget (final QA round 1, 2026-09-29; owner Q). Used by ci/static-checks.mjs; also a CLI:
//
//   node ci/launch.mjs                  print the checklist (the LAUNCH lines ci/static-checks.mjs prints) and the weights
//   node ci/launch.mjs --json           the same as JSON
//   node ci/launch.mjs --write-weight   ratchet the weight ceilings in ci/baseline.json DOWN to measured + headroom (never raises)
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
//   build            production does not load the deploy build yet (ci/build.mjs; final QA round 2): dist/ committed, the
//                    workflow purging it, the Webflow head and footer pointing at it; open until signed off
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
import { build, distState, DIST } from './build.mjs';

// Visible defects in the A2P-frozen renderers (ci/a2p-freeze.json) that are not banned strings. An entry applies while every
// listed function still hashes to its pinned SHA-256; when one changes, the item says so (verify the fix, then delete the entry).
export const A2P_ITEMS = [
  { id: 'carrier-sprint', text: 'Sprint', pages: ['/sms-program', '/privacy-policy', '/terms-of-service'],
    fns: { renderSMSProgram: 'fc361125b8d4cccefa9867b928b051aa6239adb5e8f2fac86f04a2b3eeb8a88e', renderPrivacyV7: '564abd893045071f60fc604fe2d2a292386b63436f6a01f3d14691dbb48f131f', renderTermsV7: 'c578f5d5771ef575ad97a20df4dc6abd9fd1ff0992832e11803f3330642af226' },
    since: '2026-09-29', owner: 'A2P workstream',
    problem: 'the supported-carrier lists name "Sprint", which merged into T-Mobile in 2020 (final QA claims issue 11)',
    fix: 'drop "Sprint" from the carrier lists in the bundle renderers and the native Webflow pages together, after the campaign decision; re-pin ci/a2p-freeze.json; then delete this entry' },
  { id: 'sms-consent-fine-print', text: 'By checking the box above and submitting', pages: ['/sms-consent'],
    fns: { renderSMSConsent: '3dc0b6c16d9d7abcb29a800638c8f50341011b3c1cbbb96802d6b2b5bdcc52c2' },
    since: '2026-09-29', owner: 'A2P workstream',
    problem: 'the SMS fine print and its Privacy Policy link are #94A3B8 on white at 11px (2.56:1), and the bold STOP and HELP are 11px: below WCAG AA contrast and the 12px floor (DESIGN_SPEC §7.2, §7.3). tools/gate.mjs exempts it as "sms-consent-fine-print"',
    fix: 'darken the fine print to at least --zx-text-muted (#646C7E) at 12px or more in renderSMSConsent and the native /sms-consent page together, after the campaign decision; re-pin ci/a2p-freeze.json; then delete this entry and the gate exemption' }
];

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

export function writeWeight(baseline, w) {
  const lower = (C, want) => { const next = { ...C }; for (const [k, v] of Object.entries(want)) if (C[k] === undefined || v < C[k]) next[k] = v; return next; };
  const W = baseline.weight || {};
  const next = lower(W.ceilings || {}, { cssBr4: w.cssBr4 + HEADROOM, totalBr4: w.totalBr4 + HEADROOM, cssImports: w.cssImports });
  const nextBuilt = w.built && !w.built.problems.length ? lower(W.builtCeilings || {}, { cssBr4: w.built.cssBr4 + HEADROOM, totalBr4: w.built.totalBr4 + HEADROOM }) : (W.builtCeilings || {});
  baseline.weight = { ...W, ceilings: next, builtCeilings: nextBuilt }; return { ceilings: next, builtCeilings: nextBuilt };
}

// Every open item. `judged` = judge() from ci/banned-strings.mjs on the same source.
export function launchChecklist({ js, css, baseline, judged, weight }) {
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
  if (dead.length) {
    const per = new Map();
    for (const h of dead) { const n = (h.entry && h.entry.fn) || '(unknown)'; const e = per.get(n) || { n: 0, labels: new Set() }; e.n++; e.labels.add(h.label); per.set(n, e); }
    const list = [...per].sort((a, b) => b[1].n - a[1].n).map(([n, e]) => `${n} ${e.n} (${[...e.labels].slice(0, 3).join(', ')})`).join('; ');
    add('dead-code', 'claims (precondition 6)', 'orchestrator (sign-off) or an ownership exception to DESIGN_SPEC §6/§8.1',
      `${dead.length} banned-claim hits ship in the public bundle inside ${per.size} unreachable functions (reachability verified on every run, so no visitor sees them, but anyone reading the bundle does): ${list}`,
      'either record an explicit sign-off of the dead-code exemption in ci/baseline.json launchSignoffs["dead-code"], or grant the ownership exception to delete these functions together with their shadowed routes keys (also shrinks the bundle); then remove them from DEAD_FUNCTIONS');
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
  // the deploy build is not what production loads until dist/ is committed, purged by the workflow and loaded by Webflow
  if (weight && weight.built) {
    const d = weight.built.dist || {}; const save = B ? `the build is ${fmt(B.totalBr4)} B brotli-4 against ${fmt(weight.totalBr4)} B for the sources (${fmt(weight.totalBr4 - B.totalBr4)} B, ${((1 - B.totalBr4 / weight.totalBr4) * 100).toFixed(1)}% less)` : 'the build currently fails (see the static check)';
    add('build', 'performance', 'orchestrator (commit dist/, workflow purge list) and Gautamdev (Webflow head and footer, dashboard job)',
      `production loads the unminified sources; ${save}. dist/ is ${d.present ? (d.fresh ? 'committed and current' : 'committed but STALE') : 'not committed'}`,
      `(1) as the last commit before main, run ZX_ESBUILD=<node_modules/esbuild> node ci/build.mjs (writes ${DIST.js} and ${DIST.css} after the self-checks and the esbuild proof) and commit dist/; ` +
      `(2) add both dist/ paths to the purge and "prove the CDN serves this commit" loops of .github/workflows/site-bundle.yml, and dist/** to its push paths; ` +
      `(3) after that merge is live, point the Webflow footer script at https://cdn.jsdelivr.net/gh/cgautamdevc14/zynix-webflow-content@main/${DIST.js} and the head stylesheet (and its preload) at …@main/${DIST.css} (keep that file name: the bundle's CD revalidation finds the stylesheet by "zynix-site-styles.deployed.css"); ` +
      `(4) confirm with node ci/smoke.mjs (it serves the build for dist/ URLs) and record launchSignoffs["build"]. Or sign off shipping the sources unminified`);
  }
  return items;
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
  if (process.argv.includes('--write-weight')) { const next = writeWeight(baseline, w); fs.writeFileSync('ci/baseline.json', JSON.stringify(baseline, null, 2) + '\n'); console.log('weight ceilings: ' + JSON.stringify(next)); process.exit(0); }
  if (process.argv.includes('--remeasure-weight')) {
    const at = process.argv.indexOf('--reason'), reason = at > -1 ? String(process.argv[at + 1] || '').trim() : '';
    if (reason.length < 20) { console.log('refused: --remeasure-weight needs --reason "<why the growth is accepted, per stream>" (20+ characters)'); process.exit(1); }
    if (w.built.problems.length) { console.log('refused: the deploy build fails its self-checks: ' + w.built.problems.join(' | ')); process.exit(1); }
    let commit = null; try { const { execSync } = await import('node:child_process'); commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch {}
    const e = remeasureWeight(baseline, w, reason, commit); fs.writeFileSync('ci/baseline.json', JSON.stringify(baseline, null, 2) + '\n');
    console.log('weight ceilings re-measured: ' + JSON.stringify(e.to) + ' (logged in ci/baseline.json weight.log)'); process.exit(0);
  }
  const Bw = w.built;
  const items = launchChecklist({ js, css, baseline, judged: judge(js, baseline), weight: w });
  if (process.argv.includes('--json')) console.log(JSON.stringify({ weight: w, items }, null, 1));
  else { console.log(`weight: bundle ${fmt(w.jsRaw)} B raw / ${fmt(w.jsBr4)} B br4; stylesheet ${fmt(w.cssRaw)} B raw / ${fmt(w.cssBr4)} B br4; total br4 ${fmt(w.totalBr4)} B; @import ${w.cssImports}`);
    console.log(`deploy build (ci/build.mjs): bundle ${fmt(Bw.jsRaw)} B raw / ${fmt(Bw.jsBr4)} B br4; stylesheet ${fmt(Bw.cssRaw)} B raw / ${fmt(Bw.cssBr4)} B br4; total br4 ${fmt(Bw.totalBr4)} B; ${Bw.problems.length ? 'self-checks FAILED' : 'self-checks passed'}`);
    printChecklist(items, false); }
}
