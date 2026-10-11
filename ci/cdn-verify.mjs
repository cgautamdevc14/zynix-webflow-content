// Deploy proof (deploy job of .github/workflows/site-bundle.yml): does jsDelivr serve THIS checkout's bytes in every encoding?
// jsDelivr caches each Content-Encoding separately. On 2026-10-09 (PR #31, run 37996687958) the purge refreshed the gzip and
// identity copies, but Accept-Encoding: br (what every browser sends) kept returning the old brotli copy until a second purge.
// So each file is fetched with Accept-Encoding br, gzip and identity; node:https hands over the raw bytes, which are decoded by
// the response's Content-Encoding (zlib brotliDecompressSync / gunzipSync) and compared by sha256 with the local file.
// No Cache-Control on the request: the point is to see the edge's cached copy, as a browser does. Read-only.
//   node ci/cdn-verify.mjs <cdn base> <file>...   e.g. node ci/cdn-verify.mjs https://cdn.jsdelivr.net/gh/cgautamdevc14/zynix-webflow-content@main dist/zynix-site-scripts.deployed.js
// Exit codes: 0 = every file current in every encoding, 1 = at least one STALE or FAIL line, 2 = usage.
import fs from 'node:fs'; import https from 'node:https'; import crypto from 'node:crypto'; import zlib from 'node:zlib';
const [base, ...files] = process.argv.slice(2);
if (!base || !files.length) { console.error('usage: node ci/cdn-verify.mjs <cdn base> <file>...'); process.exit(2); }
const ENCODINGS = ['br', 'gzip', 'identity'];
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const get = (url, enc) => new Promise((resolve, reject) => {
  const req = https.get(url, { headers: { 'Accept-Encoding': enc, 'User-Agent': 'zynix-deploy-verify' }, timeout: 30000 }, res => {
    const chunks = []; res.on('data', c => chunks.push(c)); res.on('error', reject);
    res.on('end', () => resolve({ status: res.statusCode, served: (res.headers['content-encoding'] || 'identity').trim().toLowerCase(), raw: Buffer.concat(chunks) }));
  });
  req.on('timeout', () => req.destroy(new Error('timeout after 30 s'))); req.on('error', reject);
});
const decode = (served, raw) => served === 'br' ? zlib.brotliDecompressSync(raw) : served === 'gzip' || served === 'x-gzip' ? zlib.gunzipSync(raw) : served === 'identity' ? raw : null;

let bad = 0;
for (const f of files) {
  let want; try { want = sha(fs.readFileSync(f)); } catch (e) { bad++; console.log(`FAIL   ${f}  local file: ${e.message}`); continue; }
  for (const enc of ENCODINGS) {
    const tag = `${enc.padEnd(8)} ${f}`;
    try {
      const r = await get(`${base.replace(/\/$/, '')}/${f}`, enc);
      if (r.status !== 200) { bad++; console.log(`FAIL   ${tag}  HTTP ${r.status}`); continue; }
      const body = decode(r.served, r.raw);
      if (!body) { bad++; console.log(`FAIL   ${tag}  unexpected Content-Encoding "${r.served}"`); continue; }
      const got = sha(body), how = `served ${r.served}, ${r.raw.length} B -> ${body.length} B`;
      if (got === want) console.log(`OK     ${tag}  ${how}, sha256 ${got.slice(0, 12)}`);
      else { bad++; console.log(`STALE  ${tag}  ${how}, sha256 ${got.slice(0, 12)}, want ${want.slice(0, 12)} (${fs.statSync(f).size} B)`); }
    } catch (e) { bad++; console.log(`FAIL   ${tag}  ${e.message}`); }
  }
}
process.exit(bad ? 1 : 0);
