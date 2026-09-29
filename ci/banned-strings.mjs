// Banned-string ratchet for the redesign (DESIGN_SPEC §8.2 Q item 3). Used by ci/static-checks.mjs; also a CLI:
//
//   node ci/banned-strings.mjs                    counts per scope vs ci/baseline.json (non-zero scopes only)
//   node ci/banned-strings.mjs --hits [scope]     every hit with line number, pattern and context (optionally one scope)
//   node ci/banned-strings.mjs --phase 1          also show which scopes would fail if that phase's must-be-zero list applied
//   node ci/banned-strings.mjs --write-baseline   ratchet DOWN: lower each scope's baseline to its current count (never raises;
//                                                 drops scopes that no longer exist). Owning streams run this in their PR.
//   node ci/banned-strings.mjs --init-baseline    (Q only) write the current counts as the baseline, raising if needed
//
// Scopes (§8.2 Q item 3): every function declaration in the bundle (brace-matched like ci/extract-function.mjs; a name
// declared more than once gets #2, #3 …), the PAGE_SEO object literal, every `// ==== ZX:BEGIN <name> (owner …) ====` …
// `// ==== ZX:END <name> ====` block (block:facts, block:components, block:home, …) and "(bundle)" = the whole file.
// A hit counts in every scope that contains it (a nested function's hits also count in its parent).
// Strings: the claims list below (the same list as redesign-2026-09/tools/rd_checks.mjs) plus emoji (literal characters,
// \uD83x\uDxxx and \u{…} escapes, and numeric HTML entities). Held governance texts are NOT in this list: they are data
// that only zxGovernance() reads, and rd_checks checks them in the rendered DOM.
// Exempt (DECISIONS 16, §8.2 Q): inside the facts block, the `metrics: [ … ]` arrays of CUSTOMERS, the
// `governance: { … }` object of SITE_FACTS and the `held: [ … ]` arrays of NAMES.agentFamilies.
// Rule (enforced by ci/static-checks.mjs): a scope fails if its count is above its ci/baseline.json count (absent = 0),
// or if it is on the must-be-zero list of the current phase (baseline.phase; "*" = every scope) and has any hit.
import fs from 'node:fs';
import vm from 'node:vm';

export const CLAIMS = [
  ['HIPAA Compliant', /\bHIPAA[\s ]+compliant\b/gi],
  ['HIPAA-compliant', /\bHIPAA-compliant\b/gi],
  ['GDPR', /\bGDPR\b/gi],
  ['SOC 2 ... certified', /SOC ?2[^.]{0,40}certif/gi],
  ['97.3%', /(?<![\w.])97\.3%/gi],
  ['2.5x', /(?<![\w.])2\.5x\b/gi],
  ['85%+', /(?<![\w.])85%\+/gi],
  ['73%', /(?<![\w.])73%/gi],
  ['40% ', /(?<![\w.])40%\s/gi],
  ['Twelve', /\btwelve\b/gi],
  ['12 agents', /\b12 agents\b/gi],
  ['12 purpose-built', /\b12 purpose-built\b/gi],
  ['7 specialized', /\b7 specialized\b/gi],
  ['seven specialized', /\bseven specialized\b/gi],
  ['LIVE', /\bLIVE\b/g],
  ['Zynix OS', /\bZynix OS\b/gi],
  ['operating system', /\boperating system\b/gi],
  ['autonomous', /\bautonomous\b/gi],
  ['$936M', /\$936M\b/gi],
  ['$150M', /\$150M\b/gi],
  ['10+ ACOs', /(?<![\w.])10\+ ACOs\b/gi],
  ['documented back to the EHR', /\bdocumented back to the EHR\b/gi],
  ['self-care guidance', /\bself-care guidance\b/gi]
];
// Extended_Pictographic minus typographic symbols that share the property (© ® ‼ ⁉ ™ ℹ ↔–↙ ↩ ↪).
const NOT_EMOJI = new Set([0xA9, 0xAE, 0x203C, 0x2049, 0x2122, 0x2139, 0x2194, 0x2195, 0x2196, 0x2197, 0x2198, 0x2199, 0x21A9, 0x21AA]);
const isEmoji = cp => !NOT_EMOJI.has(cp) && /\p{Extended_Pictographic}/u.test(String.fromCodePoint(cp));

export function findHits(src) {
  const hits = [];
  for (const [label, re] of CLAIMS) { re.lastIndex = 0; let m; while ((m = re.exec(src))) { hits.push({ index: m.index, label, text: m[0] }); if (!m[0].length) re.lastIndex++; } }
  let m;
  const lit = /\p{Extended_Pictographic}/gu; while ((m = lit.exec(src))) { const cp = m[0].codePointAt(0); if (isEmoji(cp)) hits.push({ index: m.index, label: 'emoji', text: m[0] }); }
  const sur = /\\u([dD]83[c-fC-F])\\u([dD][c-fC-F][0-9a-fA-F]{2})/g; while ((m = sur.exec(src))) { const cp = (parseInt(m[1], 16) - 0xD800) * 0x400 + (parseInt(m[2], 16) - 0xDC00) + 0x10000; if (isEmoji(cp)) hits.push({ index: m.index, label: 'emoji (escape)', text: m[0] }); }
  const cur = /\\u\{([0-9a-fA-F]{4,6})\}/g; while ((m = cur.exec(src))) { const cp = parseInt(m[1], 16); if (cp <= 0x10FFFF && isEmoji(cp)) hits.push({ index: m.index, label: 'emoji (escape)', text: m[0] }); }
  const bmp = /\\u(2[0-9a-fA-F]{3})/g; while ((m = bmp.exec(src))) { const cp = parseInt(m[1], 16); if (isEmoji(cp)) hits.push({ index: m.index, label: 'emoji (escape)', text: m[0] }); }
  const ent = /&#(?:x([0-9a-fA-F]{2,6})|(\d{2,7}));/g; while ((m = ent.exec(src))) { const cp = m[1] ? parseInt(m[1], 16) : parseInt(m[2], 10); if (cp <= 0x10FFFF && isEmoji(cp)) hits.push({ index: m.index, label: 'emoji (entity)', text: m[0] }); }
  return hits.sort((a, b) => a.index - b.index);
}

// Brace matching from an opening { or [ (skips strings, template literals, comments and regex literals).
export function matchBrace(src, open) {
  const pairs = { '{': '}', '[': ']', '(': ')' };
  const stack = [src[open]]; let st = null;
  const rxPrev = /[(,=:[!&|?{};+\-*%<>~^]$|\b(return|typeof|case|in|of|delete|void|throw|new)$/;
  for (let k = open + 1; k < src.length; k++) {
    const c = src[k], n = src[k + 1];
    if (st === 'line') { if (c === '\n') st = null; continue; }
    if (st === 'block') { if (c === '*' && n === '/') { st = null; k++; } continue; }
    if (st === "'" || st === '"' || st === '`') { if (c === '\\') { k++; continue; } if (c === st) st = null; continue; }
    if (st === 'rx') { if (c === '\\') { k++; continue; } if (c === '[') st = 'rxc'; else if (c === '/') st = null; else if (c === '\n') st = null; continue; }
    if (st === 'rxc') { if (c === '\\') { k++; continue; } if (c === ']') st = 'rx'; continue; }
    if (c === '/' && n === '/') { st = 'line'; k++; continue; }
    if (c === '/' && n === '*') { st = 'block'; k++; continue; }
    if (c === "'" || c === '"' || c === '`') { st = c; continue; }
    if (c === '/') { const before = src.slice(Math.max(0, k - 12), k).replace(/\s+$/, ''); if (!before || rxPrev.test(before)) { st = 'rx'; continue; } }
    if (c === '{' || c === '[' || c === '(') stack.push(c);
    else if (c === '}' || c === ']' || c === ')') { const o = stack.pop(); if (pairs[o] !== c) return -1; if (!stack.length) return k; }
  }
  return -1;
}

export function scopesOf(src) {
  const out = [], names = new Map(), warnings = [];
  const fnRe = /(^|\n)[ \t]*(?:async[ \t]+)?function[ \t]+([A-Za-z_$][\w$]*)[ \t]*\(/g; let m;
  while ((m = fnRe.exec(src))) {
    const name = m[2], at = m.index + m[1].length;
    const paren = m.index + m[0].length - 1;
    const closeParen = matchBrace(src, paren); if (closeParen < 0) { warnings.push(name + ': parameter list not matched'); continue; }
    const open = src.indexOf('{', closeParen); const end = open < 0 ? -1 : matchBrace(src, open);
    if (end < 0) { warnings.push(name + ': body not matched'); continue; }
    const n = (names.get(name) || 0) + 1; names.set(name, n);
    const text = src.slice(src.indexOf('function', at), end + 1);
    try { new vm.Script('(' + text + ')'); } catch (e) { warnings.push(`${name}${n > 1 ? '#' + n : ''}: extracted text does not parse (${e.message})`); }
    out.push({ name: n > 1 ? `${name}#${n}` : name, start: at, end: end + 1 });
  }
  const seo = src.search(/\bvar PAGE_SEO\s*=\s*\{/);
  if (seo > -1) { const open = src.indexOf('{', seo); const end = matchBrace(src, open); if (end > -1) out.push({ name: 'PAGE_SEO', start: seo, end: end + 1 }); else warnings.push('PAGE_SEO: not matched'); }
  const blockRe = /\/\/ ={3,} ZX:BEGIN ([\w:-]+) \(owner ([^)]*)\) ={3,}/g; const bnames = new Map(); const blocks = [];
  while ((m = blockRe.exec(src))) {
    const endMark = src.indexOf(`// ==== ZX:END ${m[1]} ====`, m.index);
    if (endMark < 0) { warnings.push(`block ${m[1]} (owner ${m[2]}): no matching ZX:END marker`); continue; }
    blocks.push({ base: m[1], owner: m[2], start: m.index, end: endMark + `// ==== ZX:END ${m[1]} ====`.length });
    bnames.set(m[1], (bnames.get(m[1]) || 0) + 1);
  }
  for (const b of blocks) out.push({ name: 'block:' + b.base + (bnames.get(b.base) > 1 ? ':' + b.owner : ''), start: b.start, end: b.end });
  out.push({ name: '(bundle)', start: 0, end: src.length });
  return { scopes: out, warnings };
}

// Exempt ranges inside the facts block: CUSTOMERS metrics arrays, SITE_FACTS.governance, NAMES.agentFamilies[*].held.
export function exemptRanges(src) {
  const r = [];
  const b = src.indexOf('// ==== ZX:BEGIN facts'); if (b < 0) return r;
  const e = src.indexOf('// ==== ZX:END facts', b); const end = e < 0 ? src.length : e;
  const re = /\b(metrics|governance|held)\s*:\s*([[{])/g; re.lastIndex = b; let m;
  while ((m = re.exec(src)) && m.index < end) { const open = m.index + m[0].length - 1; const close = matchBrace(src, open); if (close > open) { r.push([open, close + 1]); re.lastIndex = close + 1; } }
  return r;
}

export function countScopes(src) {
  const hits = findHits(src), ex = exemptRanges(src), { scopes, warnings } = scopesOf(src);
  const live = hits.filter(h => !ex.some(([a, b]) => h.index >= a && h.index < b));
  const counts = {};
  for (const s of scopes) { const n = live.filter(h => h.index >= s.start && h.index < s.end).length; if (n) counts[s.name] = n; }
  return { counts, hits: live, scopes, warnings, exempted: hits.length - live.length };
}

// The ratchet decision. baseline = ci/baseline.json object; phase overrides baseline.phase.
export function judge(src, baseline, phase) {
  const { counts, hits, scopes, warnings, exempted } = countScopes(src);
  const base = baseline.bannedStrings || {}; const ph = phase === undefined || phase === null || phase === '' ? (+baseline.phase || 0) : +phase;
  const zeroLists = baseline.mustBeZeroByPhase || {};
  const mustZero = new Set(); let all = false;
  for (const [p, list] of Object.entries(zeroLists)) if (+p <= ph) for (const s of list) { if (s === '*') all = true; else mustZero.add(s); }
  const rises = [], zeroFails = [], lower = [];
  for (const [s, n] of Object.entries(counts)) {
    const b = base[s] || 0;
    if (n > b) rises.push({ scope: s, count: n, baseline: b });
    if ((all || mustZero.has(s)) && n > 0) zeroFails.push({ scope: s, count: n });
  }
  for (const [s, b] of Object.entries(base)) { const n = counts[s] || 0; if (n < b) lower.push({ scope: s, count: n, baseline: b }); }
  return { phase: ph, counts, hits, scopes, warnings, exempted, rises, zeroFails, lower, mustZero: all ? ['*'] : [...mustZero] };
}

const lineOf = (src, i) => src.slice(0, i).split('\n').length;
const innermost = (scopes, i) => scopes.filter(s => s.name !== '(bundle)' && i >= s.start && i < s.end).sort((a, b) => (a.end - a.start) - (b.end - b.start))[0];

// ── CLI ──────────────────────────────────────────────────────────────────────────────────────────────────────
if (process.argv[1] && process.argv[1].endsWith('banned-strings.mjs')) {
  const argv = process.argv.slice(2); const arg = (k, d) => { const i = argv.indexOf(k); return i > -1 ? argv[i + 1] : d; };
  const JS = 'zynix-site-scripts-unminified.js', BL = 'ci/baseline.json';
  const src = fs.readFileSync(JS, 'utf8'); const baseline = JSON.parse(fs.readFileSync(BL, 'utf8'));
  const r = judge(src, baseline, arg('--phase'));
  if (argv.includes('--hits')) {
    const only = arg('--hits'); const sc = only && !only.startsWith('--') ? r.scopes.find(s => s.name === only) : null;
    for (const h of r.hits) { if (sc && !(h.index >= sc.start && h.index < sc.end)) continue; const s = innermost(r.scopes, h.index); console.log(`L${lineOf(src, h.index)}\t${h.label}\t${s ? s.name : '(top level)'}\t${src.slice(Math.max(0, h.index - 50), h.index + 50).replace(/\s+/g, ' ')}`); }
  } else if (argv.includes('--write-baseline') || argv.includes('--init-baseline')) {
    const init = argv.includes('--init-baseline'); const names = new Set(r.scopes.map(s => s.name)); const next = {};
    for (const s of [...names].sort()) { const n = r.counts[s] || 0; const b = (baseline.bannedStrings || {})[s] || 0; const v = init ? n : Math.min(n, b); if (v) next[s] = v; }
    const risen = init ? [] : r.rises; if (risen.length) console.log('NOT raised (fix these instead): ' + risen.map(x => `${x.scope} ${x.baseline}->${x.count}`).join(', '));
    baseline.bannedStrings = next; fs.writeFileSync(BL, JSON.stringify(baseline, null, 2) + '\n'); console.log(`wrote ${Object.keys(next).length} non-zero scope counts to ${BL} (${init ? 'init' : 'ratchet down'})`);
  } else {
    const rows = Object.entries(r.counts).sort((a, b) => b[1] - a[1]);
    for (const [s, n] of rows) { const b = (baseline.bannedStrings || {})[s] || 0; console.log(`${String(n).padStart(5)}  baseline ${String(b).padStart(5)}  ${n > b ? 'RISE ' : n < b ? 'lower' : '     '}  ${r.mustZero.includes('*') || r.mustZero.includes(s) ? 'MUST-BE-ZERO ' : ''}${s}`); }
    console.log(`\n${r.hits.length} hit(s) (${r.exempted} exempt) in ${r.scopes.length} scopes; phase ${r.phase}; rises ${r.rises.length}; must-be-zero failures ${r.zeroFails.length}` + (r.zeroFails.length ? ': ' + r.zeroFails.map(z => `${z.scope} (${z.count})`).join(', ') : ''));
    if (r.warnings.length) console.log('warnings: ' + r.warnings.join(' | '));
  }
}
