// Teste 7.6.7: „Copiază rezumatul” — numele accesibil conține textul vizibil în cele 8 limbi (WCAG 2.5.3).
// Rulare: node tests/a11y-label.test.mjs  (Playwright din /opt/node-tools, Chromium local; rețea blocată)
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const FILE = 'file://' + path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let ok = 0, bad = 0;
const check = (n, c, x) => { if (c) { ok++; console.log('  ok   ' + n); } else { bad++; console.log('  FAIL ' + n + (x !== undefined ? '  → ' + JSON.stringify(x) : '')); } };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
for (const loc of ['ro-RO', 'en-US', 'fr-FR', 'it-IT', 'es-ES', 'pt-PT', 'hu-HU', 'de-DE']) {
  const ctx = await b.newContext({viewport: {width: 360, height: 740}, locale: loc});
  await ctx.route(/^https?:/, (r) => r.abort());
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(FILE); await p.waitForTimeout(1200);
  const r = await p.evaluate(() => { const e = document.querySelector('.sum-copy'); if (!e) return null; return {txt: e.textContent.replace(/[^\p{L}\p{N} ]/gu, '').trim().toLowerCase(), al: (e.getAttribute('aria-label') || '').toLowerCase(), title: e.getAttribute('title') || ''}; });
  check(loc + ': buton prezent', !!r);
  if (r) check(loc + ': numele accesibil conține textul vizibil', r.al === '' || r.al.includes(r.txt), r);
  check(loc + ': fără pageerror', errs.length === 0, errs);
  await ctx.close();
}
await b.close();
console.log(`Cupa-Mondiala-2026 a11y-label: ${ok} ok, ${bad} eșuate`); process.exit(bad ? 1 : 0);
