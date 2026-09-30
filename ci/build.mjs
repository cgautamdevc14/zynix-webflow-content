// Deploy build (final QA round 2, 2026-09-29; owner Q). Whitespace-only minification of the two files production loads,
// with no dependencies, so CI (which installs nothing) can rebuild and measure it on every run.
//
//   node ci/build.mjs               build and write dist/ (the deploy files, see DIST), after the self-checks below
//   node ci/build.mjs --check       exit 1 when dist/ is missing or differs from a fresh build of the sources (no writes)
//   node ci/build.mjs --stats       print raw and brotli-4 sizes of the sources and the build (no writes)
//   node ci/build.mjs --out <dir>   write the build to <dir> under the SOURCE file names (a scratch root for a preview)
//   ZX_ESBUILD=<path to node_modules/esbuild> node ci/build.mjs ...   also prove the build is AST-identical to the sources
//
// Why (final QA round 2, finding "nothing minifies the deploy files"): production ships the linted sources as they are.
// This build takes bundle + stylesheet from 410,650 to 347,120 B brotli-4 at 851218d (production at c95cc03: 362,039), and
// renders identically (tools/build_equiv.mjs; audit/final_perf_r1.md §5 measured the same kind of build 96–216 ms faster
// to first paint than production on a throttled phone).
//
// What the build does, and what it never does:
//   JS   comments and indentation are removed and the spaces between tokens dropped wherever the two tokens cannot fuse.
//        Line breaks between tokens are KEPT (as one "\n") except after ; { , and before }, where no line break can change
//        the parse, so automatic semicolon insertion sees the line breaks it saw in the source and needs no parser to be
//        right. Identifiers are never renamed and nothing is rewritten: string, template and regex literals are copied byte
//        for byte, so the A2P-frozen renderers (ci/a2p-freeze.json) and every rendered string are identical; the hash pins
//        stay on the source file.
//   CSS  comments are removed, whitespace runs collapse to one space, the space is dropped next to { } ; , > : ( ) ! where
//        CSS never needs it (never before "(", after ")", or around + - * / ~, which calc() and selectors need), and the
//        last ";" of a block goes. Strings and url(…) are copied byte for byte; custom property values, var() and at-rule
//        preludes keep every space (collapsed to one).
// Self-checks on every build (and in ci/static-checks.mjs): the JS output compiles, and re-tokenizing the output gives
// exactly the source's token sequence and its kept line breaks (no two tokens fused, none split); the CSS output has the
// source's token sequence (comments and whitespace aside). With ZX_ESBUILD set, esbuild parses source and build and must
// print the same program and the same stylesheet (the strongest proof; the orchestrator's release run should set it).
//
// Deploy files (DIST): dist/zynix-site-scripts.deployed.js and dist/zynix-site-styles.deployed.css. The stylesheet keeps
// the name "zynix-site-styles.deployed.css" on purpose: the frozen CD revalidation IIFE at the top of the bundle finds the
// stylesheet with link[href*="zynix-site-styles.deployed.css"]; a ".min.css" name would silently stop revalidating the
// stylesheet, and returning visitors would pair a new bundle with a 7-day-old stylesheet (jsDelivr's browser cache).
// Going live needs three steps outside this file (launch item "build", ci/launch.mjs): commit dist/ as the last commit
// before main (ci/static-checks.mjs fails while a committed dist/ is stale), add the dist/ paths to the purge-and-verify
// loop of .github/workflows/site-bundle.yml (orchestrator), and point the Webflow head and footer at the dist/ URLs
// (dashboard job for Gautamdev). Until then production keeps loading the sources and nothing changes.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

export const SRC = { js: 'zynix-site-scripts-unminified.js', css: 'zynix-site-styles.deployed.css' };
export const DIST = { js: 'dist/zynix-site-scripts.deployed.js', css: 'dist/zynix-site-styles.deployed.css' };
export const BUILD_VERSION = 1;

const sha = t => crypto.createHash('sha256').update(t).digest('hex');
const banner = (name, src) => `/* BUILT by ci/build.mjs v${BUILD_VERSION} from ${name} (sha256 ${sha(src).slice(0, 16)}): whitespace-only minification. Do not edit; edit ${name} and run node ci/build.mjs. */\n`;

// ── JS ─────────────────────────────────────────────────────────────────────────────────────────────────────────
// A tokenizer that knows exactly what whitespace minification needs: comments, strings, templates (with nested
// substitutions), regex literals (by the previous significant token), numbers, identifiers and punctuators by maximal
// munch. Each token records whether a line break (in whitespace or inside a block comment) preceded it, and whether any
// whitespace or comment did.
const PUNCT = ['>>>=', '...', '===', '!==', '**=', '<<=', '>>=', '>>>', '&&=', '||=', '??=',
  '=>', '==', '!=', '<=', '>=', '&&', '||', '??', '?.', '++', '--', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<', '>>', '**',
  '{', '}', '(', ')', '[', ']', ';', ',', '<', '>', '+', '-', '*', '/', '%', '&', '|', '^', '!', '~', '?', ':', '=', '.', '@'];
const RE_AFTER_WORD = new Set(['return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void', 'throw', 'case', 'do', 'else', 'yield', 'await']);
const isLT = c => c === '\n' || c === '\r' || c === '\u2028' || c === '\u2029';
const isWS = c => c === ' ' || c === '\t' || c === '\v' || c === '\f' || c === '\u00a0' || c === '\ufeff' || (c > '\u007f' && /\s/.test(c) && !isLT(c));
const isWord = c => !!c && (/[A-Za-z0-9_$\\]/.test(c) || (c > '\u007f' && !isWS(c) && !isLT(c)));
const isDigit = c => c >= '0' && c <= '9';

export function tokenizeJs(src) {
  const toks = []; const stack = []; let i = 0, nl = false, ws = false; const n = src.length;
  const fail = msg => { const line = src.slice(0, i).split('\n').length; throw new Error(`ci/build.mjs tokenizer: ${msg} at line ${line}`); };
  const push = (t, v) => { toks.push({ t, v, nl, ws }); nl = false; ws = false; };
  const regexAllowed = () => {
    for (let k = toks.length - 1; k >= 0; k--) {
      const p = toks[k];
      if (p.t === 'num' || p.t === 'str' || p.t === 're' || p.t === 'tpl' || p.t === 'tplTail') return false;
      if (p.t === 'id') return RE_AFTER_WORD.has(p.v);
      if (p.t === 'p') return !(p.v === ')' || p.v === ']' || p.v === '}' || p.v === '++' || p.v === '--');
      return true;   // tplHead / tplMid: a substitution starts here
    }
    return true;
  };
  // scan template characters from i (just after ` or after the } closing a substitution); returns [text, endsWithSubst]
  const scanTemplate = start => {
    let k = i;
    for (; k < n; k++) {
      const c = src[k];
      if (c === '\\') { k++; continue; }
      if (c === '`') { k++; i = k; return [src.slice(start, k), false]; }
      if (c === '$' && src[k + 1] === '{') { k += 2; i = k; return [src.slice(start, k), true]; }
    }
    i = k; fail('unterminated template literal');
  };
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (isLT(c)) { nl = true; ws = true; i++; continue; }
    if (isWS(c)) { ws = true; i++; continue; }
    if (c === '/' && d === '/') { ws = true; i += 2; while (i < n && !isLT(src[i])) i++; continue; }
    if (c === '/' && d === '*') { ws = true; const e = src.indexOf('*/', i + 2); if (e < 0) fail('unterminated comment'); for (let k = i + 2; k < e; k++) if (isLT(src[k])) { nl = true; break; } i = e + 2; continue; }
    if (c === '<' && src.startsWith('<!--', i)) fail('HTML-like comment "<!--" in code');
    if (c === '-' && d === '-' && src[i + 2] === '>' && (nl || toks.length === 0)) fail('HTML-like comment "-->" at the start of a line');
    if (c === "'" || c === '"') {
      let k = i + 1;
      for (; k < n; k++) { const x = src[k]; if (x === '\\') { k++; continue; } if (x === c) break; if (x === '\n' || x === '\r') fail('unterminated string'); }
      if (k >= n) fail('unterminated string');
      push('str', src.slice(i, k + 1)); i = k + 1; continue;
    }
    if (c === '`') { const s = i; i++; const [text, subst] = scanTemplate(s); if (subst) { push('tplHead', text); stack.push('tpl'); } else push('tpl', text); continue; }
    if (c === '}' && stack.length && stack[stack.length - 1] === 'tpl') { stack.pop(); const s = i; i++; const [text, subst] = scanTemplate(s); if (subst) { push('tplMid', text); stack.push('tpl'); } else push('tplTail', text); continue; }
    if (c === '/' && regexAllowed()) {
      let k = i + 1, cls = false;
      for (; k < n; k++) { const x = src[k]; if (x === '\\') { k++; continue; } if (isLT(x)) fail('unterminated regex'); if (cls) { if (x === ']') cls = false; continue; } if (x === '[') cls = true; else if (x === '/') break; }
      k++; while (k < n && isWord(src[k]) && src[k] !== '\\') k++;
      push('re', src.slice(i, k)); i = k; continue;
    }
    if (isDigit(c) || (c === '.' && isDigit(d))) {
      let k = i;
      if (c === '0' && /[xXoObB]/.test(d || '')) { k += 2; while (k < n && /[0-9a-fA-F_n]/.test(src[k])) k++; }
      else {
        while (k < n && /[0-9_]/.test(src[k])) k++;
        if (src[k] === '.') { k++; while (k < n && /[0-9_]/.test(src[k])) k++; }
        if (/[eE]/.test(src[k] || '')) { k++; if (src[k] === '+' || src[k] === '-') k++; while (k < n && /[0-9_]/.test(src[k])) k++; }
        if (src[k] === 'n') k++;
      }
      if (isWord(src[k])) fail('identifier directly after a number');
      push('num', src.slice(i, k)); i = k; continue;
    }
    if (isWord(c) || (c === '#' && isWord(d))) {
      let k = i + 1;
      while (k < n) { const x = src[k]; if (x === '\\') { k += 2; continue; } if (isWord(x)) { k++; continue; } break; }
      push('id', src.slice(i, k)); i = k; continue;
    }
    let p = null;
    for (const q of PUNCT) if (src.startsWith(q, i)) { if (q === '?.' && isDigit(src[i + 2])) continue; p = q; break; }
    if (!p) fail(`unexpected character ${JSON.stringify(c)}`);
    if (p === '{') stack.push('{'); else if (p === '}') { if (!stack.length) fail('unbalanced }'); stack.pop(); }
    push('p', p); i += p.length;
  }
  if (stack.length) fail(`unclosed ${stack[stack.length - 1]} at end of file`);
  return toks;
}

// Would the two texts, written with nothing between them, still read as these two tokens?
function mustSeparate(a, b) {
  const x = a.v[a.v.length - 1], y = b.v[0];
  if (isWord(x) && isWord(y)) return true;                       // return x, typeof y, 1 in, /re/g in
  if (a.t === 're' && isWord(y)) return true;                     // /re/ instanceof (would read as flags)
  if (a.t === 'num' && y === '.') return true;                    // 1 .toString()
  if (x === '/' && (y === '/' || y === '*')) return true;         // a / /re/ (would start a comment)
  if (x === '<' && y === '!') return true;                        // a < !--b (would start "<!--")
  if (x === '-' && y === '>') return true;                        // a-- > b ("-->")
  if (a.t === 'p' && b.t === 'p') { const s = a.v + b.v; let first = null; for (const q of PUNCT) if (s.startsWith(q)) { first = q; break; } return first !== a.v; }   // + +, - --, = >
  return false;
}

// A line break can go only where it can never matter: after ; { , (no statement or operand ends there, so no restricted
// production applies, and a semicolon inserted there would be an empty statement or a syntax error either way) and before }
// (ASI inserts a semicolon before } with or without one). Every other line break stays.
const dropsLineBreak = (a, b) => (a.t === 'p' && (a.v === ';' || a.v === '{' || a.v === ',')) || (b.t === 'p' && b.v === '}');
export function minifyJs(src) {
  const toks = tokenizeJs(src); let out = '';
  for (let k = 0; k < toks.length; k++) {
    const t = toks[k];
    if (k > 0) { if (t.nl && !dropsLineBreak(toks[k - 1], t)) out += '\n'; else if (t.ws && mustSeparate(toks[k - 1], t)) out += ' '; }
    out += t.v;
  }
  return out + '\n';
}

// ── CSS ────────────────────────────────────────────────────────────────────────────────────────────────────────
export function tokenizeCss(src) {
  const toks = []; let i = 0; const n = src.length;
  const fail = msg => { const line = src.slice(0, i).split('\n').length; throw new Error(`ci/build.mjs css tokenizer: ${msg} at line ${line}`); };
  while (i < n) {
    const c = src[i];
    if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i + 2); if (e < 0) fail('unterminated comment'); toks.push({ t: 'c', v: src.slice(i, e + 2) }); i = e + 2; continue; }
    if (/\s/.test(c)) { let k = i; while (k < n && /\s/.test(src[k])) k++; toks.push({ t: 'ws', v: src.slice(i, k) }); i = k; continue; }
    if (c === '"' || c === "'") { let k = i + 1; for (; k < n; k++) { if (src[k] === '\\') { k++; continue; } if (src[k] === c) break; if (src[k] === '\n') fail('unterminated string'); } if (k >= n) fail('unterminated string'); toks.push({ t: 's', v: src.slice(i, k + 1) }); i = k + 1; continue; }
    if (/^url\(/i.test(src.slice(i, i + 4)) && (i === 0 || !/[\w-]/.test(src[i - 1]))) {
      let k = i + 4; while (k < n && /\s/.test(src[k])) k++;
      if (src[k] !== '"' && src[k] !== "'") { const e = src.indexOf(')', k); if (e < 0) fail('unterminated url('); toks.push({ t: 's', v: src.slice(i, e + 1) }); i = e + 1; continue; }
    }
    if (c === '\\') { toks.push({ t: 'x', v: src.slice(i, i + 2) }); i += 2; continue; }
    toks.push({ t: 'x', v: c }); i++;
  }
  return toks;
}
const CSS_TIGHT_AFTER = new Set(['{', '}', ';', ',', '>', ':', '(']);
const CSS_TIGHT_BEFORE = new Set(['{', '}', ';', ',', '>', ')', '!']);
// A custom property's value, a var() (its fallback is a custom-property value) and an at-rule's prelude
// (@media (max-width: 991px)) are kept as written apart from collapsing
// whitespace runs: engines keep a custom property's value as written (getPropertyValue returns " #FFF"), and esbuild's
// proof compares both verbatim, so inside them no space is dropped.
const customPropertyColon = out => { let k = out.length - 2, name = ''; while (k >= 0 && !(out[k].t === 'x' && (out[k].v === '{' || out[k].v === ';' || out[k].v === '}'))) { name = out[k].v + name; k--; } return /^\s*--/.test(name); };
export function minifyCss(src) {
  const all = tokenizeCss(src), toks = [];
  for (let k = 0; k < all.length; k++) {
    const t = all[k];
    if (t.t !== 'c') { toks.push(t); continue; }
    // a comment directly between two tokens separates them (a/**/b is two tokens): keep an empty one there
    const prev = toks[toks.length - 1], next = all[k + 1];
    if (prev && next && prev.t !== 'ws' && next.t !== 'ws' && next.t !== 'c') toks.push({ t: 'x', v: '/**/' });
  }
  const out = []; let custom = false, depth = 0, prelude = false; const parens = [];   // parens: one entry per open "(", true for var(
  for (let k = 0; k < toks.length; k++) {
    const t = toks[k];
    if (t.t === 'ws') {
      const prev = out.length ? out[out.length - 1] : null; const next = toks[k + 1];
      if (!prev || !next || next.t === 'ws') continue;
      if (custom || parens.includes(true)) { out.push({ t: 'ws', v: ' ' }); continue; }
      if (prelude && !(next.t === 'x' && (next.v === '{' || next.v === ';'))) { out.push({ t: 'ws', v: ' ' }); continue; }
      const pc = prev.v[prev.v.length - 1], nc = next.v[0];
      if (prev.t === 'x' && CSS_TIGHT_AFTER.has(pc)) continue;
      if (next.t === 'x' && CSS_TIGHT_BEFORE.has(nc)) continue;
      out.push({ t: 'ws', v: ' ' }); continue;
    }
    if (custom && t.t === 'x') {
      if (t.v === '(' || t.v === '[') depth++; else if (t.v === ')' || t.v === ']') depth--;
      else if ((t.v === ';' || t.v === '}') && depth <= 0) { custom = false; depth = 0; }
    }
    if (t.t === 'x' && t.v === '(') parens.push(/(^|[^\w-])var$/i.test(out.slice(-4).map(x => x.v).join(''))); else if (t.t === 'x' && t.v === ')') parens.pop();
    if (t.t === 'x' && t.v === '@') prelude = true; else if (t.t === 'x' && (t.v === '{' || t.v === ';')) prelude = false;
    if (t.v === '}' && out.length && out[out.length - 1].v === ';') out.pop();   // the last ";" of a block
    out.push(t);
    if (!custom && t.t === 'x' && t.v === ':' && customPropertyColon(out)) { custom = true; depth = 0; }
  }
  return out.map(t => t.v).join('') + '\n';
}

// ── build + self-checks ────────────────────────────────────────────────────────────────────────────────────────
const sameJsTokens = (a, b) => {
  if (a.length !== b.length) return `token count ${a.length} vs ${b.length}`;
  for (let k = 0; k < a.length; k++) if (a[k].t !== b[k].t || a[k].v !== b[k].v || (k > 0 && (a[k].nl && !dropsLineBreak(a[k - 1], a[k])) !== b[k].nl)) return `token ${k} differs: ${JSON.stringify(a[k])} vs ${JSON.stringify(b[k])}`;
  return '';
};
const cssSig = s => tokenizeCss(s).filter(t => t.t !== 'c' && t.t !== 'ws').map(t => t.v);
export function selfCheck({ js, css, jsOut, cssOut }) {
  const problems = [];
  try { new vm.Script(jsOut, { filename: DIST.js }); } catch (e) { problems.push('JS build does not compile: ' + e.message); }
  const d = sameJsTokens(tokenizeJs(js), tokenizeJs(jsOut)); if (d) problems.push('JS build changed the token stream: ' + d);
  // CSS: same tokens apart from comments, whitespace and the dropped last ";" of each block
  const a = cssSig(css), b = cssSig(cssOut); const dropSemi = arr => arr.filter((v, k) => !(v === ';' && arr[k + 1] === '}'));
  const A = dropSemi(a), B = dropSemi(b);
  if (A.length !== B.length || A.some((v, k) => v !== B[k])) { let k = 0; while (k < A.length && A[k] === B[k]) k++; problems.push(`CSS build changed the token stream at token ${k}: ${JSON.stringify(A.slice(k, k + 5))} vs ${JSON.stringify(B.slice(k, k + 5))}`); }
  return problems;
}

// buildJs / buildCss: the deploy file for one source (banner + minified); build: both, with the self-checks.
export const buildJs = js => banner(SRC.js, js) + minifyJs(js);
export const buildCss = css => banner(SRC.css, css) + minifyCss(css);
export function build({ js, css }) {
  const jsOut = minifyJs(js), cssOut = minifyCss(css);
  const problems = selfCheck({ js, css, jsOut, cssOut });
  return { js: banner(SRC.js, js) + jsOut, css: banner(SRC.css, css) + cssOut, problems };
}

// Optional proof with esbuild (not a dependency of this repo; pass its package directory in ZX_ESBUILD):
// esbuild parses the source and the build, and must print the same program / stylesheet from both.
export async function esbuildProof({ js, css, built }, esbuildPath = process.env.ZX_ESBUILD) {
  if (!esbuildPath) return { ran: false, problems: [] };
  const { createRequire } = await import('node:module'); const require = createRequire(import.meta.url);
  const esb = require(path.resolve(esbuildPath)); const problems = [];
  const pj = s => esb.transformSync(s, { loader: 'js', minifyWhitespace: true, legalComments: 'none', charset: 'utf8', logLevel: 'silent' }).code;
  const pc = s => esb.transformSync(s, { loader: 'css', minifyWhitespace: true, legalComments: 'none', charset: 'utf8', logLevel: 'silent' }).code;
  if (pj(js) !== pj(built.js)) problems.push(`esbuild ${esb.version}: the JS build parses to a different program than the source`);
  if (pc(css) !== pc(built.css)) problems.push(`esbuild ${esb.version}: the CSS build parses to a different stylesheet than the source`);
  return { ran: true, version: esb.version, problems };
}

export const brotli4 = buf => zlib.brotliCompressSync(Buffer.from(buf), { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: Buffer.byteLength(buf) } }).length;

// dist/ state for ci/static-checks.mjs and ci/launch.mjs: absent, or present and equal (or not) to a fresh build
export function distState(built, root = '.') {
  const f = { js: path.join(root, DIST.js), css: path.join(root, DIST.css) };
  const have = { js: fs.existsSync(f.js), css: fs.existsSync(f.css) };
  if (!have.js && !have.css) return { present: false, fresh: false, stale: [] };
  const stale = [];
  if (!have.js || fs.readFileSync(f.js, 'utf8') !== built.js) stale.push(DIST.js);
  if (!have.css || fs.readFileSync(f.css, 'utf8') !== built.css) stale.push(DIST.css);
  return { present: true, fresh: stale.length === 0, stale };
}

// ── CLI ──────────────────────────────────────────────────────────────────────────────────────────────────────
if (process.argv[1] && process.argv[1].endsWith('build.mjs')) {
  const fmt = x => Number(x).toLocaleString('en-US');
  const js = fs.readFileSync(SRC.js, 'utf8'), css = fs.readFileSync(SRC.css, 'utf8');
  const t0 = Date.now(); const built = build({ js, css });
  const proof = await esbuildProof({ js, css, built });
  const problems = [...built.problems, ...proof.problems];
  const w = { srcJs: brotli4(js), srcCss: brotli4(css), jsOut: brotli4(built.js), cssOut: brotli4(built.css) };
  const raw = t => Buffer.byteLength(t);
  console.log(`build v${BUILD_VERSION} in ${Date.now() - t0} ms: bundle ${fmt(raw(js))} -> ${fmt(raw(built.js))} B raw, ${fmt(w.srcJs)} -> ${fmt(w.jsOut)} B br4; stylesheet ${fmt(raw(css))} -> ${fmt(raw(built.css))} B raw, ${fmt(w.srcCss)} -> ${fmt(w.cssOut)} B br4; total br4 ${fmt(w.srcJs + w.srcCss)} -> ${fmt(w.jsOut + w.cssOut)} B`);
  console.log(`self-checks: ${built.problems.length ? 'FAILED' : 'passed (JS compiles; same tokens and kept line breaks)'}; esbuild proof: ${proof.ran ? (proof.problems.length ? 'FAILED' : `passed (esbuild ${proof.version}: same program, same stylesheet)`) : 'skipped (set ZX_ESBUILD=<path to node_modules/esbuild>)'}`);
  for (const p of problems) console.log('FAIL  ' + p);
  if (process.argv.includes('--stats')) process.exit(problems.length ? 1 : 0);
  if (process.argv.includes('--check')) {
    const st = distState(built);
    console.log(st.present ? (st.fresh ? 'dist/ is current' : `dist/ is STALE: ${st.stale.join(', ')} (run node ci/build.mjs)`) : 'dist/ is not committed (launch item "build")');
    process.exit(problems.length || !st.present || !st.fresh ? 1 : 0);
  }
  if (problems.length) { console.log('nothing written'); process.exit(1); }
  const outAt = process.argv.indexOf('--out');
  const targets = outAt > -1 ? { js: path.join(process.argv[outAt + 1], SRC.js), css: path.join(process.argv[outAt + 1], SRC.css) } : DIST;
  for (const k of ['js', 'css']) { fs.mkdirSync(path.dirname(targets[k]), { recursive: true }); fs.writeFileSync(targets[k], built[k]); console.log('wrote ' + targets[k]); }
}
