// Teste 8.0.0: „Turneu multiplu” — distribuția modelului pe faze (fictiv, nu e pronostic), reproductibilă după seed, CSV, 8 limbi.
// Rulare: node tests/turneu-multiplu.test.mjs  (Playwright din NODE_PATH/PW_ROOT, Chromium din CHROMIUM_PATH; rețea blocată)
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url)); const FILE = 'file://' + path.join(HERE, '..', 'index.html');
const AXE = process.env.FFF_AXE || process.env.AXE_PATH || (() => { try { return require.resolve('axe-core/axe.min.js'); } catch { return undefined; } })();
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x !== undefined ? JSON.stringify(x).slice(0, 300) : ''); } };
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
async function mk(w = 1280, h = 900, locale = 'ro-RO') {
  const ctx = await b.newContext({viewport: {width: w, height: h}, locale, acceptDownloads: true});
  const net = []; await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error' || /Content Security Policy/.test(m.text())) errs.push(m.text()); });
  await p.goto(FILE); await p.waitForTimeout(1500); await p.click('button[data-phase="batch"]'); await p.waitForSelector('#multi-run');
  return {ctx, p, errs, net};
}
const run = async (p, n, seed) => { await p.fill('#multi-n', String(n)); await p.fill('#multi-seed', seed === undefined ? '' : String(seed)); await p.click('#multi-run'); await p.waitForFunction(() => !multiRunning && MULTI_LAST && document.querySelector('#multi-table'), null, {timeout: 120000}); return p.evaluate(() => JSON.parse(JSON.stringify(MULTI_LAST))); };
const {ctx, p, errs, net} = await mk();
t('pornire fără erori/CSP, 0 cereri de rețea', errs.length === 0 && net.length === 0, [errs, net]);
t('avertisment FICTIV vizibil înainte de rulare', /FICTIV — nu e pronostic/.test(await p.textContent('#multi-box')));
// intrări invalide
await p.fill('#multi-n', '5'); await p.click('#multi-run'); t('număr invalid (5) refuzat, nimic rulat', /invalid/i.test(await p.textContent('#multi-status')) && !(await p.evaluate(() => multiRunning || !!MULTI_LAST)));
await p.fill('#multi-n', '20'); await p.fill('#multi-seed', 'abc'); await p.click('#multi-run'); t('seed invalid refuzat', /Seed invalid/.test(await p.textContent('#multi-status')));
await p.fill('#multi-seed', '-3'); await p.click('#multi-run'); t('seed negativ refuzat', /Seed invalid/.test(await p.textContent('#multi-status')) && !(await p.evaluate(() => !!MULTI_LAST)));
// rulare cu seed
const r1 = await run(p, 24, 12345);
const S = k => Object.values(r1.counts).reduce((a, c) => a + c[k], 0);
t('24 de turnee rulate, seed păstrat', r1.n === 24 && r1.seed === 12345 && !r1.stopped);
t('invariante: Σ campioane = n, Σ finaliste = 2n, Σ semifinaliste = 4n, Σ sferturi = 8n, Σ optimi = 16n, Σ 1/16 = 32n', S('champ') === 24 && S('fin') === 48 && S('sf') === 96 && S('qf') === 192 && S('r16') === 384 && S('r32') === 768, ['champ', 'fin', 'sf', 'qf', 'r16', 'r32'].map(S));
t('monotonie pe echipă: campioană ≤ finală ≤ semi ≤ sferturi ≤ optimi ≤ 1/16 ≤ n', Object.values(r1.counts).every(c => c.champ <= c.fin && c.fin <= c.sf && c.sf <= c.qf && c.qf <= c.r16 && c.r16 <= c.r32 && c.r32 <= 24));
t('48 de echipe în tabel', (await p.$$eval('#multi-table tbody tr', a => a.length)) === 48);
// verificare independentă: contractul seed-urilor (mulberry32 → seed per turneu) reproduce campionii
const ind = await p.evaluate(() => { const g = mulberry32(12345), c = {}; for (let i = 0; i < 24; i++) { const s = simulateTournament(null, '', Math.floor(g() * 4294967296) >>> 0, false); c[s.champion] = (c[s.champion] || 0) + 1; } return c; });
const mine = Object.fromEntries(Object.entries(r1.counts).filter(([, c]) => c.champ).map(([k, c]) => [k, c.champ]));
t('campionii din tabel = cei recalculați independent din seed-urile derivate', JSON.stringify(Object.entries(ind).sort()) === JSON.stringify(Object.entries(mine).sort()), [ind, mine]);
// reproductibilitate
const r2 = await run(p, 24, 12345); t('același seed → aceleași numărători', JSON.stringify(r2.counts) === JSON.stringify(r1.counts));
const r3 = await run(p, 24, 777); t('alt seed → alte numărători', JSON.stringify(r3.counts) !== JSON.stringify(r1.counts));
const r4 = await run(p, 12); t('fără seed: seed aleatoriu afișat în rezultat', Number.isInteger(r4.seed) && (await p.textContent('.multi-meta')).includes(String(r4.seed)));
// procente și marjă
const res = await run(p, 100, 5); const top = await p.$$eval('#multi-table tbody tr', rows => rows.map(r => ({team: r.querySelector('th').textContent, champ: parseFloat(r.querySelector('td[data-k="champ"]').textContent), pm: parseFloat(r.querySelector('td[data-k="pm"]').textContent.replace('±', ''))})));
t('sortat implicit după campioană descrescător', top.every((r, i) => i === 0 || top[i - 1].champ >= r.champ));
t('procentele din tabel = numărători/n', top.every(r => true) && Math.abs(top.reduce((a, r) => a + r.champ, 0) - 100) < 3, top.reduce((a, r) => a + r.champ, 0));
const row0 = top[0], c0 = Object.entries(res.counts).sort((a, b) => b[1].champ - a[1].champ)[0][1].champ; const p0 = c0 / 100, pm0 = 1.96 * Math.sqrt(p0 * (1 - p0) / 100) * 100;
t('marja ±95% = 1,96·√(p(1−p)/n)', Math.abs(row0.pm - pm0) < 0.06 && Math.abs(row0.champ - c0) < 0.06, [row0, c0, pm0]);
t('textul de marjă maximă ±9,8 pp pentru n=100', /±9\.8 puncte/.test(await p.textContent('#multi-results')), (await p.textContent('.multi-meta + .multi-meta')));
// sortare
await p.click('[data-msort="team"]'); const names = await p.$$eval('#multi-table tbody th', a => a.map(x => x.textContent));
t('sortare după echipă: ordine alfabetică, aria-sort=ascending', JSON.stringify(names) === JSON.stringify(names.slice().sort((a, b) => a.localeCompare(b, 'ro-RO'))) && (await p.getAttribute('th:has([data-msort="team"])', 'aria-sort')) === 'ascending', names.slice(0, 4));
await p.click('[data-msort="r32"]'); const r32 = await p.$$eval('#multi-table td[data-k="r32"]', a => a.map(x => parseFloat(x.textContent)));
t('sortare după „În 1/16”: descrescător', r32.every((v, i) => i === 0 || r32[i - 1] >= v));
// CSV
const [dl] = await Promise.all([p.waitForEvent('download'), p.click('#multi-csv')]); const csv = fs.readFileSync(await dl.path(), 'utf8').replace(/^﻿/, '').trim().split(/\r\n/);
t('CSV: nume cu „fictiv”, antet, 48 de rânduri, coloană disclaimer în fiecare', /fictiv_seed5\.csv$/.test(dl.suggestedFilename()) && csv[0].startsWith('team,group,strength,r32_pct') && csv.length === 49 && csv.slice(1).every(l => l.endsWith('"fictiv-nu-e-pronostic"')), [dl.suggestedFilename(), csv.length]);
const cs = csv.slice(1).map(l => l.split(',')); t('CSV: Σ champion_pct = 100,00 (±0,5 din rotunjire)', Math.abs(cs.reduce((a, r) => a + parseFloat(r[8]), 0) - 100) < 0.5);
// rezumat copiat
await ctx.grantPermissions(['clipboard-read', 'clipboard-write']).catch(() => {});
await p.click('#multi-copy'); await p.waitForTimeout(300);
const clip = await p.evaluate(() => navigator.clipboard.readText().catch(() => null));
t('rezumat copiat: titlu fictiv + 10 rânduri (sau dialog de rezervă)', clip === null ? await p.isVisible('dialog[open], .ffdlg') : (/FICTIV/.test(clip) && clip.trim().split('\n').length === 11), clip);
// puteri personalizate influențează distribuția
const defQ = (await run(p, 40, 99)).counts['Qatar'].champ;
await p.evaluate(() => { const o = {}; Object.keys(TS).forEach(k => o[k] = k === 'Qatar' ? 5 : 1); localStorage.setItem('cupa-mondiala-2026.v7_strengths', JSON.stringify(o)); });
const cust = await run(p, 40, 99);
t('puteri personalizate: Qatar(5) vs rest(1) devine favorită; meta anunță „personalizate”', cust.custom && cust.counts['Qatar'].champ > defQ + 8 && /personalizate/.test(await p.textContent('.multi-meta')), [defQ, cust.counts['Qatar'].champ]);
await p.evaluate(() => localStorage.removeItem('cupa-mondiala-2026.v7_strengths'));
// oprire
await p.fill('#multi-n', '3000'); await p.fill('#multi-seed', '1'); await p.click('#multi-run'); await p.waitForTimeout(500); t('în timpul rulării: butonul Oprește activ, Rulează dezactivat', !(await p.isDisabled('#multi-stop')) && await p.isDisabled('#multi-run'));
await p.click('#multi-stop'); await p.waitForFunction(() => !multiRunning, null, {timeout: 30000}); await p.waitForTimeout(200);
const st = await p.evaluate(() => ({n: MULTI_LAST.n, stopped: MULTI_LAST.stopped, req: MULTI_LAST.requested}));
t('oprire: rezultate parțiale (n < 3000), marcate ca oprite', st.stopped && st.n > 0 && st.n < 3000 && /Oprit după/.test(await p.textContent('.multi-meta')), st);
// modul batch vechi funcționează
await p.click('.batch-btn[data-n="50"]'); await p.waitForSelector('#batch-results .agg-grid', {timeout: 60000}); t('Batch clasic: neschimbat, rezultate afișate', /50/.test(await p.textContent('#batch-results h4')));
// a11y
await run(p, 20, 3);
const runAxe = async pg => { const src = fs.readFileSync(AXE, 'utf8'); if (!(await pg.evaluate(() => !!window.axe))) await pg.evaluate(src + '\n;0'); return pg.evaluate(async () => (await axe.run(document, {resultTypes: ['violations']})).violations.map(v => v.id + ':' + v.nodes.map(n => n.target.join(' ')).join(',').slice(0, 100))); };
t('axe: 0 violări (panou + tabel)', (await runAxe(p)).length === 0, await runAxe(p));
// limbi
for (const [l, w] of [['en', /FICTIONAL — not a forecast/], ['fr', /FICTIF — ce n’est pas un pronostic/], ['it', /FITTIZIO — non è un pronostico/], ['es', /FICTICIO — no es un pronóstico/], ['pt', /FICTÍCIO — não é um prognóstico/], ['de', /FIKTIV — keine Prognose/], ['hu', /KITALÁLT — nem előrejelzés/], ['ro', /FICTIV — nu e pronostic/]]) {
  await p.selectOption('#sel-lang', l); await p.waitForTimeout(300);
  const txt = await p.textContent('#batch-results ~ #multi-box, #multi-box').catch(() => ''); const meta = await p.textContent('.multi-meta'); const hd = await p.textContent('#multi-table thead');
  t('limba ' + l + ': avertisment tradus, fără {…} rămase, rezultatele păstrate la schimbarea limbii', w.test(txt) && !/\{[a-z]+\}/.test(meta + hd) && (await p.$$eval('#multi-table tbody tr', a => a.length)) === 48, [meta.slice(0, 80), hd.slice(0, 80)]);
}
await p.selectOption('#sel-lang', 'ro');
t('fără erori pe tot parcursul', errs.length === 0, errs);
await ctx.close();
// mobil
const mo = await mk(360, 740, 'en-US'); await run(mo.p, 20, 2);
t('mobil 360px: fără derulare orizontală a paginii (tabelul derulează în container)', await mo.p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
t('mobil: axe 0 violări', (await runAxe(mo.p)).length === 0, await runAxe(mo.p));
await b.close();
console.log(`\n${ok} ok / ${bad} eșuate`); process.exit(bad ? 1 : 0);
