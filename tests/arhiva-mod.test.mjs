// Teste 8.3.0: modul „arhivă” — după 19 iulie 2026 pagina se deschide pe „Arhivă reală”; înainte, pe simulator; comutare, memorare, 8 limbi, rețea blocată.
// Rulare: node tests/arhiva-mod.test.mjs  (Playwright din PW_ROOT sau /opt/node-tools; Chromium din CHROMIUM_PATH)
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require = createRequire(process.env.PW_ROOT || '/opt/node-tools/package.json');
const {chromium} = require('playwright');
const FILE = 'file://' + path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x !== undefined ? JSON.stringify(x) : ''); } };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium', args: ['--no-sandbox']});
async function open(now, query = '', lang = 'ro-RO') {
  const ctx = await b.newContext({locale: lang, serviceWorkers: 'block'}); const net = [];
  await ctx.route(/^https?:/, (r) => { net.push(r.request().url()); r.abort(); });
  await ctx.addInitScript(({t}) => { const R = Date, off = t - R.now(); class D extends R { constructor(...a) { if (a.length === 0) super(R.now() + off); else super(...a); } static now() { return R.now() + off; } } window.Date = D; }, {t: now});
  const p = await ctx.newPage(), errs = []; p.on('pageerror', (e) => errs.push(e.message)); await p.goto(FILE + query); await p.waitForTimeout(1500); return {ctx, p, errs, net};
}
const active = (p) => p.evaluate(() => document.querySelector('nav.tabs button.active').dataset.phase);
{ const {ctx, p, errs, net} = await open(Date.UTC(2026, 10, 3, 9));
  t('după turneu (3 nov 2026): se deschide pe „arhiva”', await active(p) === 'arhiva');
  t('banner de arhivă vizibil, cu buton „Deschide simulatorul”', await p.locator('#archBanner').count() === 1 && /simulatorul/.test(await p.locator('#archToggle').textContent()));
  t('arhiva conține rezultatele reale (finala Spania–Argentina) și etichetă REAL', /Spania/.test(await p.locator('.phase[data-phase="arhiva"]').textContent()) && /REAL/.test(await p.locator('.phase[data-phase="arhiva"]').textContent()));
  await p.click('#archToggle'); t('„Deschide simulatorul” → faza „groups”, butonul devine „Înapoi la arhivă”', await active(p) === 'groups' && /arhivă/.test(await p.locator('#archToggle').textContent()));
  await p.reload(); await p.waitForTimeout(1200); t('alegerea simulatorului se memorează la reîncărcare', await active(p) === 'groups');
  await p.click('#archToggle'); t('„Înapoi la arhivă” → arhiva', await active(p) === 'arhiva');
  for (const l of ['en', 'fr', 'it', 'es', 'pt', 'de', 'hu']) { await p.evaluate((x) => setLang(x, false), l); await p.waitForTimeout(100); const tx = await p.locator('#archBanner').textContent(); t('banner tradus în ' + l, !/Turneul s-a încheiat/.test(tx) && /19/.test(tx), tx); }
  t('0 cereri de rețea, 0 erori de pagină', net.length === 0 && errs.length === 0, {net, errs}); await ctx.close(); }
{ const {ctx, p} = await open(Date.UTC(2026, 6, 19, 20, 0));
  t('în ziua finalei (19 iulie 2026): rămâne simulatorul, fără banner', await active(p) === 'groups' && await p.locator('#archBanner').count() === 0); await ctx.close(); }
{ const {ctx, p} = await open(Date.UTC(2026, 6, 20, 0, 1));
  t('din 20 iulie 2026 00:00 UTC: arhiva', await active(p) === 'arhiva'); await ctx.close(); }
{ const {ctx, p} = await open(Date.UTC(2026, 10, 3, 9), '?mode=sim');
  t('?mode=sim forțează simulatorul', await active(p) === 'groups'); await ctx.close(); }
await b.close(); console.log(`${ok} ok, ${bad} eșuate`); process.exit(bad ? 1 : 0);
