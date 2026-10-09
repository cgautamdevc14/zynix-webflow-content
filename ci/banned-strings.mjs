// Banned-string ratchet for the redesign (DESIGN_SPEC §8.2 Q item 3). Used by ci/static-checks.mjs; also a CLI:
//
//   node ci/banned-strings.mjs                    counts per scope vs ci/baseline.json (non-zero scopes only)
//   node ci/banned-strings.mjs --hits [scope]     every hit with line number, pattern and context (optionally one scope)
//   node ci/banned-strings.mjs --exempt           every EXEMPT hit with its reason (facts data, dead code, URL slug, dated)
//   node ci/banned-strings.mjs --review           every REVIEW-list hit in the bundle (warnings only; SEO audit ZX-18 action b)
//   node ci/banned-strings.mjs --dead             the reachability report: routes, the dead list, and every unreachable function
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
// Exempt hits are not counted in any scope. They are listed by --exempt and summed in the static check's output. Four kinds:
//   facts  (DECISIONS 16, §8.2 Q): inside the facts block, the `metrics: [ … ]` arrays of CUSTOMERS, the `governance: { … }`
//          object of SITE_FACTS and the `held: [ … ]` arrays of NAMES.agentFamilies.
//   dead   (Phase 3 integration, finding 1, 2026-09-29): the functions in DEAD_FUNCTIONS below (and the comment lines directly
//          above each). DESIGN_SPEC §6 forbids editing dead functions and §8.1 the routes table, so no stream can clear them.
//          The list is VERIFIED on every run: a listed function must be unreachable from the router (the routes table after
//          later-key override and REDIRECTS) and from every reachable function or top-level statement (see reachability()).
//          A listed function that is reachable fails the static check, so this list can never hide copy a visitor can see.
//          Deleting the functions with their dead routes keys is the alternative (needs an ownership exception to §6/§8.1).
//   url    a hit inside a lower-case URL or path token that starts with "/" or "http(s)://", with the hit joined to the rest
//          of the token by "/", "-", "_", "." or "#" ('/blog/autonomous-ai-agents-…' in routes, REDIRECTS and CROSS_LINKS keys,
//          zxSeo path arguments, hrefs and JSON-LD urls). URLs do not change in the redesign (DECISIONS 2, 9); link text does.
//   dated  DATED_EXEMPTIONS below: one named string in one A2P-frozen function, pinned to that function's SHA-256. It lapses
//          by itself the moment the function changes (the A2P workstream then fixes the string in the same PR).
//   verify VERIFY_EXEMPTIONS below (final QA round 1, 2026-09-29): one named string that a reviewer escalated to Gautamdev
//          ([VERIFY]), pinned to the exact sentence it sits in. It lapses the moment that sentence changes or disappears.
// Every dated and verify exemption, and the dead-code exemption as a whole, is ALSO printed by ci/static-checks.mjs as a
// LAUNCH line (text, owner, fix; ci/launch.mjs), and `node ci/static-checks.mjs --launch` fails while any of them is open,
// so launch precondition 6 ("whole bundle zero", DESIGN_SPEC §8.0) is never signed off without naming them.
// Rule (enforced by ci/static-checks.mjs): a scope fails if its count is above its ci/baseline.json count (absent = 0),
// or if it is on the must-be-zero list of the current phase (baseline.phase; "*" = every scope) and has any hit.
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';

// Dead renderers (finding 1 of the Phase 3 integration review, 2026-09-29). Each one is shadowed in the routes table by a
// later key for the same path, redirected away by REDIRECTS, or never referenced; reachability() proves it on every run.
// Empty since 2026-09-30: all 35 unreachable functions (the 13 listed here and 22 legacy helpers and pages) were deleted
// together with their 26 shadowed or redirected routes keys (ownership exception to DESIGN_SPEC §6/§8.1).
export const DEAD_FUNCTIONS = [];

// Dated exemptions: a banned string that is visible on the site but may not be edited yet. Each entry names the function, the
// claims label, the exact text, the function's pinned SHA-256 (ci/a2p-freeze.json at the time of the entry), the date, the
// owner and the fix. The exemption applies only while the function hashes to `sha256`.
export const DATED_EXEMPTIONS = [
  { fn: 'renderPrivacyV7', label: 'SOC 2 ... certified', text: 'including our SOC 2 Type II certification',
    sha256: '564abd893045071f60fc604fe2d2a292386b63436f6a01f3d14691dbb48f131f', since: '2026-09-29', owner: 'A2P workstream',
    why: 'renderPrivacyV7 is hash-frozen (ci/a2p-freeze.json) while the A2P campaign is decided; DECISIONS 17 says SOC 2 is audited, never certified',
    fix: "reword to 'including our SOC 2 Type II audit' in renderPrivacyV7 and the native Webflow /privacy-policy page together, after the campaign decision; then delete this entry" }
];

// Verify exemptions: a banned string a reviewer escalated to Gautamdev ([VERIFY]) instead of assigning a rewrite. Each entry
// names the claims label, the exact text, the exact sentence around it (`context`: the exemption applies only while the bundle
// contains that sentence verbatim, so any edit to it ends the exemption), where it renders, the owner, the decision and the fix.
export const VERIFY_EXEMPTIONS = [
  { label: '$936M', text: '$936,988,750', page: '/press', where: 'PRESS_RELEASES (the PBACO release body that renderPressV7 reprints)',
    context: 'PBACO Holding, LLC is the largest ACO in 2026 by participant count and has generated $936,988,750 in savings for the Medicare Shared Savings Program, the highest in program history.',
    since: '2026-09-29', owner: 'P4; Gautamdev decides ([VERIFY], final QA claims issue 6)',
    why: 'verbatim "About PBACO" boilerplate of the Apr 14 2026 Business Wire release; not a quote (DECISIONS 15), and COPY_DECK #67/#101 removed the same superlative and dollar figure elsewhere',
    fix: 'Gautamdev chooses: keep the release verbatim under a "Full text of the Business Wire release" label (then record the decision here), or trim the About-PBACO paragraph and link to Business Wire (then delete this entry)' }
];

// A negation within a few words before a match (same clause): 'no', 'not', 'never', 'nothing', 'none', 'without', 'cannot'
// and any "n't" / "n’t" contraction. Used as a lookbehind prefix by the extended patterns below.
export const ZX_NEG = String.raw`(?<!\b(?:no|not|never|nothing|none|without|cannot|\w+n['’]t)\b[^.;:!?\n]{0,30})`;
export const CLAIMS = [
  ['HIPAA Compliant', /\bHIPAA[\s ]+compliant\b/gi],
  ['HIPAA-compliant', /\bHIPAA-compliant\b/gi],
  ['GDPR', /\bGDPR\b/gi],
  ['SOC 2 ... certified', /SOC ?2[^.]{0,40}certif/gi],
  ['97.3%', /(?<![\w.])97\.3%/gi],
  ['2.5x', /(?<![\w.])2\.5x\b/gi],
  ['85%+', /(?<![\w.])85%\+/gi],
  ['73%', /(?<![\w.])73%/gi],
  ['40%', /(?<![\w.])40%(?=[\s.,;:)]|$)/gi],         // also '40%.' / '40%,' at a clause end (SEO audit 2026-10-08, ZX-18)
  ['Twelve', /\btwelve\b/gi],
  ['12 agents', /\b12 agents\b/gi],
  ['12 purpose-built', /\b12 purpose-built\b/gi],
  ['7 specialized', /\b7 specialized\b/gi],
  ['seven specialized', /\bseven specialized\b/gi],
  ['LIVE', /\bLIVE\b/g],
  ['Zynix OS', /\bZynix OS\b/gi],
  ['operating system', /\boperating system\b/gi],
  ['autonomous', /\bautonomous(?:ly)?\b/gi],         // 'autonomously' too (ZX-18)
  ['$936M', /\$936(?:M\b|,\d{3})/gi],               // "$936M" and the spelled-out "$936,988,750" (final QA round 1)
  ['$150M', /\$150M\b/gi],
  ['10+ ACOs', /(?<![\w.])10\+ ACOs\b/gi],
  ['documented back to the EHR', /\bdocumented back to the EHR\b/gi],
  ['self-care guidance', /\bself-care guidance\b/gi],
  ['NHS (not a client)', /\bNHS\b/g],
  ['Union (never named)', /\bUnion (Health|Hospital)\b/gi],
  // Extended patterns (SEO audit 2026-10-08, ZX-18; narrowed in review): wording the audit found in the no-JS layer and
  // llms.txt that the list above missed, in the forms that are never compliant. Each one has 0 hits in the bundle and the
  // tracked text files. A negation a few words before the match is not a hit (ZX_NEG: 'does not write notes back to your
  // EHR', 'not yet HITRUST certified'). Wording that compliant safety copy also uses ('agents never do clinical triage',
  // 'nothing is filed to the EHR until a physician approves it', 'no symptom assessment') is on REVIEW below: printed as a
  // warning, never a failure (ZX-18 action b). Left out entirely (they would flag compliant or industry copy, or need a copy
  // decision first): bare 'certified' ('board-certified radiologists'), 'autonomy', 'HIPAA compliance' as a topic heading,
  // bare 'triage', 'real-time' (ZX-36) and generic percentages.
  ['Union (bare)', /(?<!\b(?:[Ee]uropean|[Cc]redit|[Ll]abou?r|[Tt]rade) )\bUnion\b/g],   // not 'European Union', 'credit union'
  ['integrated OS', /\bintegrated OS\b/gi],
  ['EHR write-back', new RegExp(ZX_NEG + String.raw`\b(?:writes? (?:(?:documentation|notes?|data) )?back\b|write[- ]back (?:to|into)\b)`, 'gi')],
  ['HITRUST/HIPAA certified', new RegExp(ZX_NEG + String.raw`\b(?:HITRUST|HIPAA)\b[^.\n]{0,40}\bcertified\b`, 'gi')],
  ['HITRUST Ready', /\bHITRUST(?: CSF)? Ready\b/gi],
  // A Zynix founding year other than 2024, in Zynix's own context only ('Olive AI, founded in 2012, shut down in 2023' and
  // other companies' dates pass): 'Zynix was founded in 2023', 'Zynix AI, founded in 2023', 'We were founded in 2023', a
  // 'Founded: 2023' facts line, a sentence opening 'Founded in 2023', and foundingDate "2023" in JSON-LD.
  ['founded 2023 (Zynix)', new RegExp([
    String.raw`\b(?:Zynix(?: AI| Inc\.?)?|we)(?: (?:was|were|is|are|has been|have been))? (?:founded|established|started)\b[^.,;\n]{0,12}\b2023\b`,
    String.raw`\bZynix(?: AI| Inc\.?)?, (?:founded|established)\b[^.,;\n]{0,12}\b2023\b`,
    String.raw`^[ \t>*-]*(?:year )?found(?:ed|ing year):?[ \t]+(?:in[ \t]+)?2023\b`,
    String.raw`(?<=[.!?][ \t]+)founded (?:in )?2023\b`,
    String.raw`\bfoundingDate['"]?\s*:\s*['"]2023`
  ].join('|'), 'gim')],
  ['Zyncare (retired brand)', /\bzyncare\b/gi]
];
// Review list (ZX-18 action b): wording that is a banned claim in one sentence and compliant safety copy in the next. Never a
// failure; ci/static-checks.mjs prints every hit (bundle and tracked text files) as a WARN line for a person to read, and
// `node ci/banned-strings.mjs --review` lists them with context.
export const REVIEW = [
  ['clinical triage', /\bclinical(?:ly)?[ -]triag\w*|\btriage logic\b/gi],
  ['symptom assessment', /\bsymptom[ -]assess\w*/gi],
  ['EHR filing', /\bwritten back\b|\b(?:uploaded|pushed|written|filed|synced) (?:directly )?(?:back )?(?:in)?to (?:the|your|their) EHR\b/gi]
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

// Review-list hits (REVIEW above): same shape as findHits, never counted in any scope.
export function findReview(src) {
  const hits = [];
  for (const [label, re] of REVIEW) { re.lastIndex = 0; let m; while ((m = re.exec(src))) { hits.push({ index: m.index, label, text: m[0] }); if (!m[0].length) re.lastIndex++; } }
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

// ── Lexer: comment and literal ranges (strings, template text, regex literals), template ${…} expressions as code ──
export function lex(src) {
  const comments = [], literals = []; const n = src.length; const stack = []; let depth = 0, mode = 'code', litStart = -1;
  const rxPrev = /[(,=:[!&|?{};+\-*%<>~^]$|\b(return|typeof|case|in|of|delete|void|throw|new)$/;
  for (let i = 0; i < n; i++) {
    const c = src[i], d = src[i + 1];
    if (mode === 'tpl') {
      if (c === '\\') { i++; continue; }
      if (c === '`') { literals.push([litStart, i]); mode = 'code'; continue; }
      if (c === '$' && d === '{') { literals.push([litStart, i]); stack.push(depth); depth++; i++; mode = 'code'; continue; }
      continue;
    }
    if (c === '/' && d === '/') { let e = src.indexOf('\n', i); if (e < 0) e = n; comments.push([i, e]); i = e - 1; continue; }
    if (c === '/' && d === '*') { let e = src.indexOf('*/', i + 2); e = e < 0 ? n : e + 2; comments.push([i, e]); i = e - 1; continue; }
    if (c === "'" || c === '"') { let j = i + 1; while (j < n && src[j] !== c && src[j] !== '\n') { if (src[j] === '\\') j++; j++; } literals.push([i + 1, j]); i = j; continue; }
    if (c === '`') { mode = 'tpl'; litStart = i + 1; continue; }
    if (c === '/') {
      const before = src.slice(Math.max(0, i - 12), i).replace(/\s+$/, '');
      if (!before || rxPrev.test(before)) { let j = i + 1, cls = false; while (j < n) { const x = src[j]; if (x === '\\') { j += 2; continue; } if (x === '\n') break; if (cls) { if (x === ']') cls = false; } else if (x === '[') cls = true; else if (x === '/') break; j++; } literals.push([i + 1, j]); i = j; continue; }
    }
    if (c === '{') { depth++; continue; }
    if (c === '}') { depth--; if (stack.length && depth === stack[stack.length - 1]) { stack.pop(); mode = 'tpl'; litStart = i + 1; } continue; }
  }
  return { comments, literals };
}
// Replace the given ranges with spaces (newlines kept, so line numbers and ASI do not change).
export function blank(src, ranges) {
  let out = '', at = 0;
  for (const [s, e] of [...ranges].sort((a, b) => a[0] - b[0])) { if (s < at) continue; out += src.slice(at, s) + src.slice(s, e).replace(/[^\n]/g, ' '); at = e; }
  return out + src.slice(at);
}

// Top-level entries of an object literal: [{ key, start, end, valueStart }] (key = the string key, or null). `src` should
// have its comments blanked; `codeOnly` has comments and literals blanked (for bracket depth and commas).
function objectEntries(src, codeOnly, open) {
  const close = matchBrace(src, open); if (close < 0) return { close: -1, entries: [] };
  const entries = []; let d = 0, s = open + 1;
  const push = e => { const text = src.slice(s, e); const m = text.match(/^\s*(?:(['"])((?:\\.|(?!\1)[^\\])*)\1|([A-Za-z_$][\w$]*))\s*:/); if (codeOnly.slice(s, e).trim()) entries.push({ key: m ? (m[2] !== undefined ? m[2] : m[3]) : null, start: s, end: e, valueStart: m ? s + m[0].length : s }); };
  for (let k = open + 1; k < close; k++) { const c = codeOnly[k]; if (c === '{' || c === '[' || c === '(') d++; else if (c === '}' || c === ']' || c === ')') d--; else if (c === ',' && d === 0) { push(k); s = k + 1; } }
  push(close);
  return { close, entries };
}

// Reachability of every declared function from the router (DESIGN_SPEC §6: later routes keys override earlier ones; REDIRECTS
// is applied once, before the lookup) and from top-level code. Conservative: an identifier anywhere in reachable code outside
// comments (string contents included) counts as a reference, so a function is only called dead when nothing can reach it.
export function reachability(src) {
  const { comments, literals } = lex(src);
  const noComments = blank(src, comments), codeOnly = blank(noComments, literals);
  const { scopes } = scopesOf(src);
  const fns = scopes.filter(s => !s.name.startsWith('block:') && s.name !== '(bundle)' && s.name !== 'PAGE_SEO');
  const outer = fns.filter(f => !fns.some(g => g !== f && g.start <= f.start && g.end >= f.end));
  const base = name => name.replace(/#\d+$/, ''); const names = new Set(fns.map(f => base(f.name)));
  const idsIn = (a, b) => { const out = new Set(); const re = /[A-Za-z_$][\w$]*/g; re.lastIndex = a; let m; const t = noComments; while ((m = re.exec(t)) && m.index < b) { if (names.has(m[0]) && !/[\w$]/.test(t[m.index - 1] || '')) out.add(m[0]); } return out; };
  const find = re => { const m = re.exec(codeOnly); return m ? codeOnly.indexOf('{', m.index + m[0].length - 1) : -1; };
  const rOpen = find(/\bvar routes\s*=\s*\{/g), xOpen = find(/\bvar REDIRECTS\s*=\s*\{/g);
  if (rOpen < 0 || xOpen < 0) return { ok: false, error: 'routes or REDIRECTS object literal not found' };
  const R = objectEntries(noComments, codeOnly, rOpen), X = objectEntries(noComments, codeOnly, xOpen);
  const redirects = new Map(); for (const e of X.entries) if (e.key !== null) { const v = noComments.slice(e.valueStart, e.end).trim().match(/^(['"])(.*)\1$/); if (v) redirects.set(e.key, v[2]); }
  const targets = new Set(redirects.values());
  const last = new Map(); for (const e of R.entries) if (e.key !== null) last.set(e.key, e);
  const routeInfo = []; const roots = new Map();   // name -> why
  for (const e of R.entries) {
    const eff = last.get(e.key) === e; const redirected = redirects.has(e.key) && !targets.has(e.key);
    const live = e.key !== null && eff && !redirected;
    const ids = [...idsIn(e.valueStart, e.end)];
    routeInfo.push({ key: e.key, ids, live, why: e.key === null ? 'unparsed entry' : !eff ? 'overridden by a later key' : redirected ? 'redirected to ' + redirects.get(e.key) : 'live' });
    if (live || e.key === null) for (const id of ids) if (!roots.has(id)) roots.set(id, `routes['${e.key}']`);
  }
  // top-level code: everything outside the outermost functions, the routes literal and the REDIRECTS literal
  const holes = outer.map(f => [f.start, f.end]).concat([[rOpen, R.close + 1], [xOpen, X.close + 1]]).sort((a, b) => a[0] - b[0]);
  let at = 0; for (const [s, e] of holes) { if (s > at) for (const id of idsIn(at, s)) if (!roots.has(id)) roots.set(id, 'top-level code near line ' + (src.slice(0, at).split('\n').length)); at = Math.max(at, e); }
  for (const id of idsIn(at, src.length)) if (!roots.has(id)) roots.set(id, 'top-level code (end)');
  const edges = new Map(); for (const f of fns) { const k = base(f.name); if (!edges.has(k)) edges.set(k, new Set()); for (const id of idsIn(f.start, f.end)) if (id !== k) edges.get(k).add(id); }
  const via = new Map(roots); const queue = [...roots.keys()];
  while (queue.length) { const k = queue.shift(); for (const id of edges.get(k) || []) if (!via.has(id)) { via.set(id, k); queue.push(id); } }
  const chain = k => { const out = [k]; let x = k; for (let i = 0; i < 12 && via.has(x) && names.has(via.get(x)); i++) { x = via.get(x); out.push(x); } out.push(via.get(x)); return out.join(' <- '); };
  const unreachable = [...names].filter(k => !via.has(k)).sort();
  return { ok: true, reachable: via, chain, unreachable, routes: routeInfo, redirects, fns, outer };
}

// Is the hit at [i, i+len) inside a lower-case URL/path token? (see the header: kind "url")
export function inUrlToken(src, i, len) {
  const ok = ch => /[a-z0-9\-._~/:#?=&%+]/.test(ch);
  const hit = src.slice(i, i + len); if (hit !== hit.toLowerCase()) return false;
  let a = i, b = i + len; while (a > 0 && ok(src[a - 1])) a--; while (b < src.length && ok(src[b])) b++;
  const tok = src.slice(a, b);
  if (!(tok.startsWith('/') || /^https?:\/\//.test(tok))) return false;
  const pre = src[i - 1] || '', post = src[i + len] || '';
  return (i > a && /[\/\-_.#]/.test(pre)) || (i + len < b && /[\/\-_.#]/.test(post));
}

const sha = t => crypto.createHash('sha256').update(t).digest('hex');
// All exemptions with their reasons; problems = exemptions that are no longer valid (fail the static check).
export function exemptions(src, scopes) {
  const out = []; const problems = []; const notes = [];
  for (const [a, b] of exemptRanges(src)) out.push({ start: a, end: b, kind: 'facts', why: 'facts data (DECISIONS 16)' });
  const R = reachability(src);
  if (!R.ok) problems.push('dead-code verification could not run: ' + R.error);
  else for (const name of DEAD_FUNCTIONS) {
    const decl = scopes.filter(s => s.name === name || s.name.startsWith(name + '#'));
    if (!decl.length) { notes.push(`${name} is no longer in the bundle: remove it from DEAD_FUNCTIONS`); continue; }
    if (R.reachable.has(name)) { problems.push(`${name} is listed as dead but is reachable: ${R.chain(name)}`); continue; }
    for (const s of decl) {
      // include the comment-only lines directly above the declaration (its header comment)
      let a = s.start; for (;;) { const prevEnd = src.lastIndexOf('\n', a - 1); if (prevEnd < 0) break; const prevStart = src.lastIndexOf('\n', prevEnd - 1) + 1; const line = src.slice(prevStart, prevEnd); if (/^\s*\/\/.*$/.test(line)) a = prevStart; else break; }
      out.push({ start: a, end: s.end, kind: 'dead', entry: { fn: s.name }, why: `dead function ${s.name} (not reachable from the router or live code)` });
    }
  }
  for (const x of DATED_EXEMPTIONS) {
    const s = scopes.find(q => q.name === x.fn); if (!s) { notes.push(`dated exemption ${x.fn}: function not found (remove the entry)`); continue; }
    let text = null; try { text = extractFunction(src, x.fn); } catch (e) { problems.push(`dated exemption ${x.fn}: ${e.message}`); continue; }
    if (sha(text) !== x.sha256) { notes.push(`dated exemption for ${x.fn} (since ${x.since}) LAPSED: the function changed (sha256 ${sha(text).slice(0, 12)}… != pinned ${x.sha256.slice(0, 12)}…), so "${x.text}" counts again. Fix: ${x.fix}`); continue; }
    const at = src.indexOf(x.text, s.start);
    if (at < 0 || at >= s.end) { notes.push(`dated exemption for ${x.fn}: "${x.text}" is no longer in the function (remove the entry)`); continue; }
    out.push({ start: at, end: at + x.text.length, kind: 'dated', label: x.label, entry: x, why: `dated exemption since ${x.since} (${x.owner}): ${x.why}. Fix: ${x.fix}` });
  }
  for (const x of VERIFY_EXEMPTIONS) {
    const c = src.indexOf(x.context); const i = c < 0 ? -1 : x.context.indexOf(x.text);
    if (c < 0) { notes.push(`verify exemption "${x.text}" (${x.where}): the pinned sentence is no longer in the bundle, so the exemption ended; if the string is gone, delete the entry`); continue; }
    if (i < 0) { problems.push(`verify exemption "${x.text}": its context sentence does not contain the text (fix the entry)`); continue; }
    if (src.indexOf(x.context, c + 1) > -1) notes.push(`verify exemption "${x.text}": the pinned sentence occurs more than once; only the first is exempt`);
    out.push({ start: c + i, end: c + i + x.text.length, kind: 'verify', label: x.label, entry: x, why: `verify exemption since ${x.since} (${x.owner}): ${x.why}. Fix: ${x.fix}` });
  }
  return { ranges: out, problems, notes, reach: R };
}

// Same algorithm as ci/extract-function.mjs (kept here so this module has no other local import).
function extractFunction(src, name) {
  const start = src.search(new RegExp('(^|\\n)[ \\t]*function ' + name + '\\s*\\(')); if (start < 0) throw new Error('not found: ' + name);
  const i = src.indexOf('function ' + name, start), open = src.indexOf('{', src.indexOf(')', i));
  let depth = 0, k = open, st = null;
  for (; k < src.length; k++) {
    const c = src[k], n = src[k + 1];
    if (st === 'line') { if (c === '\n') st = null; continue; }
    if (st === 'block') { if (c === '*' && n === '/') { st = null; k++; } continue; }
    if (st === "'" || st === '"' || st === '`') { if (c === '\\') { k++; continue; } if (c === st) st = null; continue; }
    if (c === '/' && n === '/') { st = 'line'; k++; continue; }
    if (c === '/' && n === '*') { st = 'block'; k++; continue; }
    if (c === "'" || c === '"' || c === '`') { st = c; continue; }
    if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) break; }
  }
  return src.slice(i, k + 1);
}

// Every other tracked text file (SEO audit 2026-10-08, ZX-01/ZX-06/ZX-18): llms.txt, robots.txt, sitemap.xml, the redirect
// lists, docs and any legacy asset still in the repo are public on GitHub and jsDelivr and read by crawlers, so they carry
// no banned string either. Same CLAIMS list and the same URL-token exemption; no scopes, no exemption lists, no baseline:
// any hit fails. Not scanned here: the bundle (scoped above), dist/ (its deploy build, which ci/static-checks.mjs proves
// equal to a fresh build of the bundle), ci/ (these patterns) and binary assets.
export const TEXT_FILE_EXT = /\.(?:txt|md|xml|csv|html?|js|mjs|cjs|css|json|ya?ml|svg)$/i;
export const TEXT_FILE_SKIP = [/^ci\//, /^dist\//, /^\.github\//, /^images\/(?!.*\.svg$)/, /^zynix-site-scripts-unminified\.js$/];
export function textFileHits(files, read) {
  const out = []; out.scanned = 0; out.review = [];
  for (const f of files) {
    if (!TEXT_FILE_EXT.test(f) || TEXT_FILE_SKIP.some(re => re.test(f))) continue;
    const src = read(f); out.scanned++;
    for (const h of findHits(src)) { if (inUrlToken(src, h.index, h.text.length)) continue; out.push({ file: f, line: src.slice(0, h.index).split('\n').length, label: h.label, text: h.text }); }
    for (const h of findReview(src)) { if (inUrlToken(src, h.index, h.text.length)) continue; out.review.push({ file: f, line: src.slice(0, h.index).split('\n').length, label: h.label, text: h.text }); }
  }
  return out;
}
// Review-list hits in the bundle (URL tokens skipped; comments included, like the claims scan): [{ line, label, text }].
export function bundleReviewHits(src) {
  return findReview(src).filter(h => !inUrlToken(src, h.index, h.text.length)).map(h => ({ line: src.slice(0, h.index).split('\n').length, label: h.label, text: h.text }));
}

export function countScopes(src) {
  const hits = findHits(src), { scopes, warnings } = scopesOf(src);
  const ex = exemptions(src, scopes);
  const live = [], exempt = [];
  for (const h of hits) {
    const r = ex.ranges.find(x => h.index >= x.start && h.index < x.end && (!x.label || x.label === h.label));
    if (r) { exempt.push({ ...h, kind: r.kind, why: r.why, entry: r.entry || null }); continue; }
    if (inUrlToken(src, h.index, h.text.length)) { exempt.push({ ...h, kind: 'url', why: 'URL or path token (URLs are unchanged, DECISIONS 2, 9)' }); continue; }
    live.push(h);
  }
  const counts = {};
  for (const s of scopes) { const n = live.filter(h => h.index >= s.start && h.index < s.end).length; if (n) counts[s.name] = n; }
  const byKind = {}; for (const h of exempt) byKind[h.kind] = (byKind[h.kind] || 0) + 1;
  return { counts, hits: live, scopes, warnings, exempted: exempt.length, exempt, exemptByKind: byKind, exemptProblems: ex.problems, exemptNotes: ex.notes, reach: ex.reach };
}

// The ratchet decision. baseline = ci/baseline.json object; phase overrides baseline.phase.
export function judge(src, baseline, phase) {
  const { counts, hits, scopes, warnings, exempted, exempt, exemptByKind, exemptProblems, exemptNotes, reach } = countScopes(src);
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
  return { phase: ph, counts, hits, scopes, warnings, exempted, exempt, exemptByKind, exemptProblems, exemptNotes, reach, rises, zeroFails, lower, mustZero: all ? ['*'] : [...mustZero] };
}

const lineOf = (src, i) => src.slice(0, i).split('\n').length;
const innermost = (scopes, i) => scopes.filter(s => s.name !== '(bundle)' && i >= s.start && i < s.end).sort((a, b) => (a.end - a.start) - (b.end - b.start))[0];

// ── CLI ──────────────────────────────────────────────────────────────────────────────────────────────────────
if (process.argv[1] && process.argv[1].endsWith('banned-strings.mjs')) {
  const argv = process.argv.slice(2); const arg = (k, d) => { const i = argv.indexOf(k); return i > -1 ? argv[i + 1] : d; };
  const JS = 'zynix-site-scripts-unminified.js', BL = 'ci/baseline.json';
  const src = fs.readFileSync(JS, 'utf8'); const baseline = JSON.parse(fs.readFileSync(BL, 'utf8'));
  const r = judge(src, baseline, arg('--phase'));
  const ctx = i => src.slice(Math.max(0, i - 50), i + 50).replace(/\s+/g, ' ');
  if (argv.includes('--hits')) {
    const only = arg('--hits'); const sc = only && !only.startsWith('--') ? r.scopes.find(s => s.name === only) : null;
    for (const h of r.hits) { if (sc && !(h.index >= sc.start && h.index < sc.end)) continue; const s = innermost(r.scopes, h.index); console.log(`L${lineOf(src, h.index)}\t${h.label}\t${s ? s.name : '(top level)'}\t${ctx(h.index)}`); }
  } else if (argv.includes('--review')) {
    const rv = bundleReviewHits(src);
    for (const h of rv) { const at = src.split('\n').slice(0, h.line - 1).join('\n').length + 1; const i = src.indexOf(h.text, at); const s = innermost(r.scopes, i); console.log(`L${h.line}\treview\t${h.label}\t${s ? s.name : '(top level)'}\t${ctx(i)}`); }
    console.log(`\n${rv.length} review-list hit(s) in the bundle (warnings, not failures; ci/static-checks.mjs also lists the tracked text files)`);
  } else if (argv.includes('--exempt')) {
    for (const h of r.exempt) { const s = innermost(r.scopes, h.index); console.log(`L${lineOf(src, h.index)}\t${h.kind}\t${h.label}\t${s ? s.name : '(top level)'}\t${ctx(h.index)}`); }
    console.log(`\n${r.exempted} exempt hit(s): ` + Object.entries(r.exemptByKind).map(([k, n]) => `${k} ${n}`).join(', '));
    for (const p of r.exemptProblems) console.log('PROBLEM  ' + p); for (const n of r.exemptNotes) console.log('NOTE  ' + n);
  } else if (argv.includes('--dead')) {
    const R = countScopes(src).reach; if (!R.ok) { console.log('reachability failed: ' + R.error); process.exit(1); }
    console.log(`routes: ${R.routes.length} entries, ${R.routes.filter(x => x.live).length} live; REDIRECTS: ${R.redirects.size}`);
    for (const x of R.routes.filter(x => !x.live)) console.log(`  not live  '${x.key}' -> ${x.ids.join(', ') || '(no function)'}  (${x.why})`);
    console.log(`\nDEAD_FUNCTIONS (${DEAD_FUNCTIONS.length}):`); for (const n of DEAD_FUNCTIONS) console.log(`  ${R.reachable.has(n) ? 'REACHABLE ' + R.chain(n) : 'dead      ' + n}`);
    console.log(`\nall unreachable functions (${R.unreachable.length}): ${R.unreachable.join(', ')}`);
  } else if (argv.includes('--write-baseline') || argv.includes('--init-baseline')) {
    const init = argv.includes('--init-baseline'); const names = new Set(r.scopes.map(s => s.name)); const next = {};
    for (const s of [...names].sort()) { const n = r.counts[s] || 0; const b = (baseline.bannedStrings || {})[s] || 0; const v = init ? n : Math.min(n, b); if (v) next[s] = v; }
    const risen = init ? [] : r.rises; if (risen.length) console.log('NOT raised (fix these instead): ' + risen.map(x => `${x.scope} ${x.baseline}->${x.count}`).join(', '));
    baseline.bannedStrings = next; fs.writeFileSync(BL, JSON.stringify(baseline, null, 2) + '\n'); console.log(`wrote ${Object.keys(next).length} non-zero scope counts to ${BL} (${init ? 'init' : 'ratchet down'})`);
  } else {
    const rows = Object.entries(r.counts).sort((a, b) => b[1] - a[1]);
    for (const [s, n] of rows) { const b = (baseline.bannedStrings || {})[s] || 0; console.log(`${String(n).padStart(5)}  baseline ${String(b).padStart(5)}  ${n > b ? 'RISE ' : n < b ? 'lower' : '     '}  ${r.mustZero.includes('*') || r.mustZero.includes(s) ? 'MUST-BE-ZERO ' : ''}${s}`); }
    console.log(`\n${r.hits.length} hit(s) (${r.exempted} exempt: ${Object.entries(r.exemptByKind).map(([k, n]) => `${k} ${n}`).join(', ') || 'none'}) in ${r.scopes.length} scopes; phase ${r.phase}; rises ${r.rises.length}; must-be-zero failures ${r.zeroFails.length}` + (r.zeroFails.length ? ': ' + r.zeroFails.map(z => `${z.scope} (${z.count})`).join(', ') : ''));
    for (const p of r.exemptProblems) console.log('PROBLEM  ' + p); for (const n of r.exemptNotes) console.log('NOTE  ' + n);
    if (r.warnings.length) console.log('warnings: ' + r.warnings.join(' | '));
  }
}
