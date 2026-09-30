// Redesign guards (DESIGN_SPEC §8.2 Q item 3), run by ci/static-checks.mjs after its own checks:
//   1. CSS lint: every selector inside a stylesheet `/* ════ ZX:BEGIN <name> (owner …) ════ */ … /* ════ ZX:END <name> ════ */`
//      block contains .zynix-, .zx-, #zynix-, html:not(.wf-native) or html.zx- outside any other :not() (§1.8 rule 1);
//      every BEGIN has a matching END. (No blocks exist before S1's first commit: the check then passes with 0 blocks.)
//   2. Tokens: every var(--zx-*) / var(--z-*) used in the stylesheet or the bundle without a fallback is declared somewhere
//      (a `--name:` declaration in the stylesheet, or set by the bundle through setProperty('--name' or an inline
//      `--name:` style). The names that were already undefined at c95cc03 are listed in ci/baseline.json
//      `undefinedVars`; any other undefined name fails. Baselined names that become defined are reported (ratchet down).
//   3. Inline styles: the count of `style="` in the bundle is at most ci/baseline.json `styleAttributes` (2,196 at c95cc03;
//      the orchestrator lowers it after each phase).
//   4. The /contact demo form still carries the SMS disclosure sentence (JS:3008 at c95cc03) and its links, verbatim apart
//      from styling attributes, and still sends sms_consent 'No'.
//   5. Banned-string ratchet (ci/banned-strings.mjs): no scope's count rises above ci/baseline.json, and no scope on the
//      must-be-zero list of the current phase (ci/baseline.json `phase`, or `--phase N` / env ZX_PHASE) has a hit.
//      Exempt hits (facts data, dead functions, URL slugs, dated) are not counted; a separate check fails when an exemption
//      is no longer valid (a DEAD_FUNCTIONS entry became reachable). List them: node ci/banned-strings.mjs --exempt
//   6. Weight (ci/launch.mjs; final QA round 1): brotli-4 bytes of the stylesheet and of bundle + stylesheet, and the stylesheet's
//      @import rules, may not exceed ci/baseline.json weight.ceilings. The weight TARGETS are a launch item, not a check.
//      Final QA round 2: the deploy build (ci/build.mjs, whitespace-only minification, no dependencies) is built on every run;
//      it must pass its self-checks, a committed dist/ must equal it, and it may not exceed weight.builtCeilings.
// Returns { judged, weight } so ci/static-checks.mjs can print the launch checklist (ci/launch.mjs) from the same run.
// ci/baseline.json documents its own fields. Try a phase without changing it: node ci/static-checks.mjs --phase 1
import { judge } from './banned-strings.mjs';
import { measureWeight, weightChecks } from './launch.mjs';

const stripCss = c => c.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '""');

export function cssBlocks(css) {
  const marks = [...css.matchAll(/\/\*[^*]*?ZX:(BEGIN|END)\s+([\w:-]+)[^*]*\*\//g)].map(m => ({ kind: m[1], name: m[2], start: m.index, end: m.index + m[0].length }));
  const blocks = [], problems = []; let open = null;
  for (const mk of marks) {
    if (mk.kind === 'BEGIN') { if (open) problems.push(`ZX:BEGIN ${mk.name} opens inside ZX:BEGIN ${open.name}`); open = mk; }
    else if (!open) problems.push(`ZX:END ${mk.name} without a ZX:BEGIN`);
    else if (open.name !== mk.name) { problems.push(`ZX:END ${mk.name} closes ZX:BEGIN ${open.name}`); open = null; }
    else { blocks.push({ name: open.name, text: css.slice(open.end, mk.start), offset: open.end }); open = null; }
  }
  if (open) problems.push(`ZX:BEGIN ${open.name} has no ZX:END`);
  return { blocks, problems };
}

// Style-rule selector lists of a CSS text (at-rules with nested rules are descended; keyframes and font-face skipped).
export function selectorsOf(cssText) {
  const t = stripCss(cssText); const out = [];
  const walk = (s, from, to) => {
    let i = from, pre = '';
    while (i < to) {
      const c = s[i];
      if (c === '{') {
        let d = 1, k = i + 1; for (; k < to && d; k++) { if (s[k] === '{') d++; else if (s[k] === '}') d--; }
        const p = pre.trim(); pre = '';
        if (p.startsWith('@')) { if (/^@(media|supports|container|layer|document|scope)\b/i.test(p)) walk(s, i + 1, k - 1); }
        else if (p) out.push(p.replace(/\s+/g, ' '));
        i = k; continue;
      }
      if (c === ';' || c === '}') { pre = ''; i++; continue; }
      pre += c; i++;
    }
  };
  walk(t, 0, t.length);
  return out;
}
export function splitSelectors(list) {
  const parts = []; let d = 0, cur = '';
  for (const c of list) { if (c === '(' || c === '[') d++; else if (c === ')' || c === ']') d--; if (c === ',' && d === 0) { parts.push(cur.trim()); cur = ''; } else cur += c; }
  if (cur.trim()) parts.push(cur.trim()); return parts;
}
export function scoped(sel) {
  let s = sel.replace(/html:not\(\s*\.wf-native\s*\)/g, '§HTMLNOTWF§');
  for (let guard = 0; guard < 50; guard++) {   // drop every other :not(…) (balanced), so ":not(.zynix-x)" alone does not count
    const i = s.indexOf(':not('); if (i < 0) break; let d = 0, k = i + 4; for (; k < s.length; k++) { if (s[k] === '(') d++; else if (s[k] === ')') { d--; if (!d) break; } } s = s.slice(0, i) + s.slice(k + 1);
  }
  return /\.zynix-|\.zx-|#zynix-|§HTMLNOTWF§|html\.zx-/.test(s);
}

export function runRedesignChecks({ js, css, baseline, phase, check }) {
  // 1. CSS lint
  const { blocks, problems } = cssBlocks(css);
  const bad = [];
  for (const b of blocks) for (const list of selectorsOf(b.text)) for (const sel of splitSelectors(list)) if (!scoped(sel)) bad.push(`[${b.name}] ${sel}`);
  check(`CSS lint: ZX blocks are paired and every selector in them is scoped to bundle pages (§1.8 rule 1)`, !problems.length && !bad.length,
    `${blocks.length} block(s)` + (problems.length ? '; ' + problems.join('; ') : '') + (bad.length ? `; ${bad.length} unscoped selector(s): ${bad.slice(0, 6).join(' | ')}` : ''));

  // 2. token definitions
  const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const defined = new Set();
  for (const m of cssNoComments.matchAll(/(?:^|[;{\s])(--[\w-]+)\s*:/g)) defined.add(m[1]);
  for (const m of js.matchAll(/setProperty\(\s*['"](--[\w-]+)['"]/g)) defined.add(m[1]);
  for (const m of js.matchAll(/(?:style=\\?["']|;)\s*(--z[\w-]*)\s*:/g)) defined.add(m[1]);
  const undef = new Map();
  for (const [where, text] of [['css', cssNoComments], ['js', js]]) for (const m of text.matchAll(/var\(\s*(--zx?-[\w-]+)\s*([,)])/g)) if (m[2] === ')' && !defined.has(m[1])) undef.set(m[1], (undef.get(m[1]) || new Set()).add(where));
  const known = new Set(baseline.undefinedVars || []);
  const fresh = [...undef.keys()].filter(v => !known.has(v)).sort();
  const nowDefined = [...known].filter(v => !undef.has(v));
  check(`tokens: every var(--zx-*)/var(--z-*) without a fallback is defined (baseline: ${known.size} known undefined at c95cc03)`, fresh.length === 0,
    (fresh.length ? `undefined: ${fresh.map(v => v + ' (' + [...undef.get(v)].join('+') + ')').join(', ')}` : `${undef.size} undefined, all baselined`) + (nowDefined.length ? `; now defined, remove from ci/baseline.json undefinedVars: ${nowDefined.join(', ')}` : ''));

  // 3. inline style ratchet
  const styles = (js.match(/style="/g) || []).length;
  check(`inline styles: style=" count ${styles} <= baseline ${baseline.styleAttributes}`, styles <= baseline.styleAttributes, styles < baseline.styleAttributes ? `down ${baseline.styleAttributes - styles}; lower it with node ci/launch.mjs --write-weight after the last merge of the round` : '');

  // 4. contact SMS disclosure
  const at = js.indexOf('id="zynix-demo-form"'); const form = at < 0 ? '' : js.slice(at, js.indexOf('</form>', at) + 7);
  const sentence = /We use your details only to respond to your demo request\. This form does not sign you up for text messages; to receive SMS notifications, use our <a href="\/sms-consent"[^>]*>SMS opt-in form<\/a>\. <a href="\/privacy-policy"[^>]*>Privacy Policy<\/a>/.test(form);
  const noConsent = /name:\\?'sms_consent\\?',\s*value:\\?'No\\?'/.test(form) || /name:\s*\\?["']sms_consent\\?["']\s*,\s*value:\s*\\?["']No\\?["']/.test(form);
  check(`/contact demo form keeps the SMS disclosure sentence and links verbatim and sends sms_consent 'No'`, at > -1 && sentence && noConsent, at < 0 ? 'no id="zynix-demo-form" in the bundle' : `sentence ${sentence ? 'ok' : 'CHANGED'}, sms_consent No ${noConsent ? 'ok' : 'MISSING'}`);

  // 5. banned-string ratchet (exemptions: ci/banned-strings.mjs header; each one is verified here)
  const r = judge(js, baseline, phase);
  const tot = r.counts['(bundle)'] || 0;
  const kinds = Object.entries(r.exemptByKind || {}).map(([k, n]) => `${k} ${n}`).join(', ') || 'none';
  check(`banned strings: exemptions are valid (every DEAD_FUNCTIONS entry unreachable from the router and live code; dated exemptions pinned)`, !(r.exemptProblems || []).length,
    ((r.exemptProblems || []).join(' | ') || `${r.exempted} exempt hit(s): ${kinds}`) + ((r.exemptNotes || []).length ? '; notes: ' + r.exemptNotes.join(' | ') : ''));
  check(`banned strings: no scope above its ci/baseline.json count (phase ${r.phase}; ${r.hits.length} hits in the bundle, ${r.exempted} exempt)`, r.rises.length === 0,
    r.rises.length ? 'rose: ' + r.rises.map(x => `${x.scope} ${x.baseline}->${x.count}`).slice(0, 8).join(', ') + ' (node ci/banned-strings.mjs --hits <scope>)' : (r.lower.length ? `${r.lower.length} scope(s) below baseline; ratchet down with node ci/banned-strings.mjs --write-baseline` : `whole bundle ${tot}`));
  check(`banned strings: must-be-zero scopes are clean (phase ${r.phase}: ${r.mustZero.length ? r.mustZero.join(', ') : 'none yet'})`, r.zeroFails.length === 0,
    r.zeroFails.map(z => `${z.scope} (${z.count})`).join(', '));
  if (r.warnings.length) console.log('WARN  banned strings: ' + r.warnings.join(' | '));

  // 6. weight ceilings (ratchet); the targets are the launch item 'weight'
  const weight = measureWeight(js, css);
  weightChecks(weight, baseline, check);
  return { judged: r, weight };
}
