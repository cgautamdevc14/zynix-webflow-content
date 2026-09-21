// Extract a function declaration's full source by brace matching (skips strings, templates, comments), then prove it parses.
import vm from 'node:vm';
export function extractFunction(src, name) {
  const start = src.search(new RegExp('(^|\\n)[ \\t]*function ' + name + '\\s*\\('));
  if (start < 0) throw new Error('not found: ' + name);
  let i = src.indexOf('function ' + name, start), open = src.indexOf('{', src.indexOf(')', i));
  let depth = 0, k = open, st = null;
  for (; k < src.length; k++) {
    const c = src[k], n = src[k + 1];
    if (st === 'line') { if (c === '\n') st = null; continue; }
    if (st === 'block') { if (c === '*' && n === '/') { st = null; k++; } continue; }
    if (st === "'" || st === '"' || st === '`') { if (c === '\\') { k++; continue; } if (c === st) st = null; continue; }
    if (c === '/' && n === '/') { st = 'line'; k++; continue; }
    if (c === '/' && n === '*') { st = 'block'; k++; continue; }
    if (c === "'" || c === '"' || c === '`') { st = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) break; }
  }
  const text = src.slice(i, k + 1);
  new vm.Script('(' + text + ')');          // throws if the slice is not exactly one function
  return text;
}
