// Launch checklist and weight budget (final QA round 1, 2026-09-29; owner Q). Used by ci/static-checks.mjs; also a CLI:
//
//   node ci/launch.mjs                  print the checklist (the LAUNCH lines ci/static-checks.mjs prints) and the weights
//   node ci/launch.mjs --json           the same as JSON
//   node ci/launch.mjs --write-weight   ratchet the weight ceilings in ci/baseline.json DOWN to measured + headroom (never raises)
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
//   weight           the weight targets below are not met (bundle + stylesheet brotli, stylesheet brotli, @import)
// Sign-off: the orchestrator records a decision in ci/baseline.json `launchSignoffs`, e.g.
//   "launchSignoffs": { "dead-code": { "by": "orchestrator", "date": "2026-09-30", "note": "unreachable; delete in Phase 4" } }
// A signed-off item still prints (with the sign-off) but no longer fails --launch. An item that is fixed disappears by itself.
//
// Weight (finding "no weight budget"): brotli quality 4 (what jsDelivr serves) of the two files production loads, and the
// stylesheet's @import rules. ci/baseline.json `weight` holds ratchet CEILINGS (a failing check in every run: the files may not
// grow past them; Q lowers them after each merge with --write-weight) and TARGETS (the launch item: production's total at
// c95cc03 and an agreed stylesheet size). Headroom for --write-weight: 2,048 bytes over the measured brotli size.
import fs from 'node:fs';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { extractFunction } from './extract-function.mjs';

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
  return { jsRaw: jb.length, cssRaw: cb.length, jsBr4, cssBr4, totalBr4: jsBr4 + cssBr4, cssImports: imports };
}

// The failing weight checks (ceilings) for ci/redesign-checks.mjs.
export function weightChecks(w, baseline, check) {
  const W = baseline.weight; if (!W || !W.ceilings) { check('weight: ci/baseline.json has weight ceilings', false, 'missing weight.ceilings'); return; }
  const C = W.ceilings;
  const row = (name, got, max, unit) => check(`weight: ${name} ${fmt(got)}${unit} <= ceiling ${fmt(max)}${unit}`, got <= max, got <= max ? (max - got > HEADROOM + 1024 && unit ? `${fmt(max - got)} bytes under; lower it with node ci/launch.mjs --write-weight` : '') : `grew ${fmt(got - max)}${unit} past the ceiling: cut the growth, or raise the ceiling in the same PR with a reason (DESIGN_SPEC §7.4)`);
  row('stylesheet brotli-4', w.cssBr4, C.cssBr4, ' B');
  row('bundle + stylesheet brotli-4', w.totalBr4, C.totalBr4, ' B');
  row('stylesheet @import rules', w.cssImports, C.cssImports, '');
}

export function writeWeight(baseline, w) {
  const C = (baseline.weight && baseline.weight.ceilings) || {}; const next = { ...C };
  const want = { cssBr4: w.cssBr4 + HEADROOM, totalBr4: w.totalBr4 + HEADROOM, cssImports: w.cssImports };
  for (const [k, v] of Object.entries(want)) if (C[k] === undefined || v < C[k]) next[k] = v;
  baseline.weight = { ...(baseline.weight || {}), ceilings: next }; return next;
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
  // weight targets
  const T = (baseline.weight && baseline.weight.targets) || null;
  if (T && weight) {
    const miss = [];
    if (T.totalBr4 !== undefined && weight.totalBr4 > T.totalBr4) miss.push(`bundle + stylesheet ${fmt(weight.totalBr4)} B brotli-4 vs production ${fmt(T.totalBr4)} B (+${fmt(weight.totalBr4 - T.totalBr4)}, +${((weight.totalBr4 / T.totalBr4 - 1) * 100).toFixed(1)}%)`);
    if (T.cssBr4 !== undefined && weight.cssBr4 > T.cssBr4) miss.push(`stylesheet ${fmt(weight.cssBr4)} B brotli-4 vs target ${fmt(T.cssBr4)} B (${(weight.cssBr4 / T.cssBr4).toFixed(1)}x; ${fmt(weight.cssRaw)} B raw)`);
    if (T.cssImports !== undefined && weight.cssImports > T.cssImports) miss.push(`${weight.cssImports} @import rule(s) in the stylesheet (the Funnel Sans request chains behind the render-blocking CSS; production has the same one) vs ${T.cssImports}`);
    if (miss.length) add('weight', 'performance', 'S1 (stylesheet), S2 (bundle); orchestrator agrees the budget',
      'weight targets not met: ' + miss.join('; '), 'S1 cuts the stylesheet (dead legacy rules, duplicated blocks) and moves the Funnel Sans request to a <link> in the Webflow head (dashboard job) so the @import can go; or the orchestrator agrees different targets in ci/baseline.json weight.targets or signs off launchSignoffs["weight"]');
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
  const items = launchChecklist({ js, css, baseline, judged: judge(js, baseline), weight: w });
  if (process.argv.includes('--json')) console.log(JSON.stringify({ weight: w, items }, null, 1));
  else { console.log(`weight: bundle ${fmt(w.jsRaw)} B raw / ${fmt(w.jsBr4)} B br4; stylesheet ${fmt(w.cssRaw)} B raw / ${fmt(w.cssBr4)} B br4; total br4 ${fmt(w.totalBr4)} B; @import ${w.cssImports}`); printChecklist(items, false); }
}
