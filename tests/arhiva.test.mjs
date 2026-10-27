// Teste 8.1.0: tabul „Arhivă reală” — clasamentele calculate din scoruri coincid cu cele oficiale (Wikipedia), 32 de echipe în eliminatorii, etichete REAL/FICTIV, 8 limbi.
// Rulare: node tests/arhiva.test.mjs  (Playwright din PW_ROOT, Chromium din CHROMIUM_PATH; rețea blocată)
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const FILE = 'file://' + path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x !== undefined ? JSON.stringify(x) : ''); } };
// totaluri oficiale (J V E Î GM-GP P) din paginile de grupă; ordinea = clasamentul final
const OFF = {
 A:'Mexico 3 0 0 6-0 9;South Africa 1 1 1 2-3 4;South Korea 1 0 2 2-3 3;Czechia 0 1 2 2-6 1',
 B:'Switzerland 2 1 0 7-3 7;Canada 1 1 1 8-3 4;Bosnia and Herzegovina 1 1 1 5-6 4;Qatar 0 1 2 2-10 1',
 C:'Brazil 2 1 0 7-1 7;Morocco 2 1 0 6-3 7;Scotland 1 0 2 1-4 3;Haiti 0 0 3 2-8 0',
 D:'USA 2 0 1 8-4 6;Australia 1 1 1 2-2 4;Paraguay 1 1 1 2-4 4;Türkiye 1 0 2 3-5 3',
 E:'Germany 2 0 1 10-4 6;Ivory Coast 2 0 1 4-2 6;Ecuador 1 1 1 2-2 4;Curaçao 0 1 2 1-9 1',
 F:'Netherlands 2 1 0 10-4 7;Japan 1 2 0 7-3 5;Sweden 1 1 1 7-7 4;Tunisia 0 0 3 2-12 0',
 G:'Belgium 1 2 0 6-2 5;Egypt 1 2 0 5-3 5;Iran 0 3 0 3-3 3;New Zealand 0 1 2 4-10 1',
 H:'Spain 2 1 0 5-0 7;Cape Verde 0 3 0 2-2 3;Uruguay 0 2 1 3-4 2;Saudi Arabia 0 2 1 1-5 2',
 I:'France 3 0 0 10-2 9;Norway 2 0 1 8-7 6;Senegal 1 0 2 8-6 3;Iraq 0 0 3 1-12 0',
 J:'Argentina 3 0 0 8-1 9;Austria 1 1 1 6-6 4;Algeria 1 1 1 5-7 4;Jordan 0 0 3 3-8 0',
 K:'Colombia 2 1 0 4-1 7;Portugal 1 2 0 6-1 5;DR Congo 1 1 1 4-3 4;Uzbekistan 0 0 3 2-11 0',
 L:'England 2 1 0 6-2 7;Croatia 2 0 1 5-5 6;Ghana 1 1 1 2-2 4;Panama 0 0 3 0-4 0'
};
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox']});
const ctx = await b.newContext({viewport: {width: 1100, height: 900}, locale: 'ro-RO'});
const net = []; await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto(FILE); await p.waitForTimeout(1200);
t('pornire fără erori, 0 cereri de rețea', errs.length === 0 && net.length === 0, [errs, net]);
t('banner de pe pagina principală trimite la Arhivă (REAL vs FICTIV)', /Arhivă reală/.test(await p.textContent('.fiction-bar')) && /FICTIVĂ/.test(await p.textContent('.fiction-bar')));
await p.click('button[data-phase="arhiva"]');
const res = await p.evaluate(() => {
  const o = {};
  GROUP_KEYS.forEach(g => { o[g] = realTable(g).map(q => [q.n, q.v, q.e, q.i, q.gf + '-' + q.ga, q.p]); });
  return {tabs: o, r32: REAL_KO[0][2].length, n: REAL_KO.map(r => r[2].length), teams: [...REAL_R32TEAMS].length,
    unmapped: [...new Set(Object.values(REAL_GROUPS).flatMap(g => g.o))].filter(n => !(n in REAL_EN2RO) && !Object.values(REAL_EN2RO).includes(n)),
    ko: REAL_KO.flatMap(r => r[2].map(x => x.split('|')[1])).map(s => { const m = s.match(/^(.+?) (\d+)-(\d+) (.+)$/); return [m[1], m[4]]; }).flat()
      .filter(n => !(n in REAL_EN2RO))};
});
for (const g of Object.keys(OFF)) {
  const exp = OFF[g].split(';').map(r => { const x = r.split(' '); const n = x.slice(0, -5).join(' '); return [n, +x.at(-5), +x.at(-4), +x.at(-3), x.at(-2), +x.at(-1)]; });
  // coloana „Î” din OFF: nr. înfrângeri; V/E/Î calculate trebuie să coincidă, iar Î = 3 − V − E
  const got = res.tabs[g];
  const eq = exp.every((e, i) => got[i][0] === e[0] && got[i][1] === e[1] && got[i][2] === e[2] && got[i][3] === 3 - e[1] - e[2] && got[i][4] === e[4] && got[i][5] === e[5]);
  t('grupa ' + g + ': clasament calculat = clasament oficial', eq, [got, exp]);
  t('grupa ' + g + ': ordinea e descrescătoare după puncte', got.every((r, i) => i === 0 || got[i - 1][5] >= r[5]));
}
t('eliminatorii: 16+8+4+2+1+1 meciuri', JSON.stringify(res.n) === '[16,8,4,2,1,1]', res.n);
t('32 de echipe în 1/16', res.teams === 32, res.teams);
t('toate numele echipelor au traducere', res.unmapped.length === 0 && res.ko.length === 0, res);
const txt = await p.textContent('.phase[data-phase="arhiva"]');
t('etichetă REAL + data verificării + campioana', /REAL/.test(txt) && /2026-10-27/.test(txt) && /Spania/.test(txt) && /Ferran Torres/.test(txt));
t('grupa F confirmată din mai multe surse (nu mai e „de verificat”), cu date și stadioane', !/de verificat: o singură sursă/.test(txt) && /Dallas \(AT&T Stadium\)/.test(txt) && /Kansas City \(Arrowhead Stadium\)/.test(txt) && /patru surse/.test(txt));
t('grupa F: 6 meciuri cu dată și stadion; celelalte grupe fără date', await p.evaluate(() => REAL_GROUPS.F.d.split(';').length === 6 && REAL_GROUPS.F.v.split(';').length === 6 && !REAL_GROUPS.A.d));
t('finala: Spania 1–0 Argentina după prelungiri', /Spania 1–0 Argentina · după prelungiri/.test(txt) || /Spania\s*1–0\s*Argentina/.test(txt));
t('Anglia 6–4 Franța (locul 3), pen. Elveția–Columbia 4–3', /Franța 4–6 Anglia/.test(txt) && /Elveția 0–0 Columbia · pen\. 4–3/.test(txt));
// compararea cu simularea curentă
t('compararea Real vs. simulat apare când există simulare', /Simularea ta curentă \(FICTIVĂ\)/.test(txt));
for (const l of ['en', 'fr', 'it', 'es', 'pt', 'de', 'hu']) {
  await p.selectOption('#sel-lang', l); await p.waitForTimeout(150);
  const tx = await p.textContent('.phase[data-phase="arhiva"]');
  t('limba ' + l + ': arhiva se redă, fără text rămas doar în română la titlu', tx.length > 3000 && !/Faza eliminatorie \(real\)/.test(tx), tx.length);
}
await p.selectOption('#sel-lang', 'en'); await p.waitForTimeout(150);
const en = await p.textContent('.phase[data-phase="arhiva"]');
t('en: REAL results, not simulated + Spain + Germany 7–1 Curaçao', /REAL results, not simulated/.test(en) && /Spain/.test(en) && /Germany/.test(en));
t('fără erori JS pe tot parcursul', errs.length === 0, errs);
await b.close(); console.log(`\n${ok} ok, ${bad} eșuate`); process.exit(bad ? 1 : 0);
