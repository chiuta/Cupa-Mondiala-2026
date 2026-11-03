# Jurnal de modificări — Simulator Cupa Mondială 2026

## 8.3.1 — 2026-11-03

- Corectat (accesibilitate): bannerul arhivei era în afara oricărui reper (axe: `region`, 4 scenarii); acum are rolul `region` și etichetă. axe: 0 violări.

## 8.3.0 — 2026-11-03 (mod arhivă)

Anterior: v8.2.0. Etapa 6 a planului „fără frontiere” (arhivarea Cupei Mondiale după eveniment).

- Nou: **mod „arhivă”**. Din 20 iulie 2026 (finala reală a fost pe 19 iulie) pagina se deschide pe tabul „📖 Arhivă reală” (rezultatele reale, din datele deja existente în pagină; nu s-a inventat nimic). Un banner („Turneul s-a încheiat pe 19 iulie 2026: se afișează arhiva”) are butoanele „Deschide simulatorul” / „Înapoi la arhivă”; alegerea se memorează local, iar `?mode=sim` forțează simulatorul. Înainte de 20 iulie 2026 comportamentul e cel vechi (simulatorul). Decizia se ia după data dispozitivului.
- Bannerul e tradus în cele 8 limbi (ro, en, fr, it, es, pt, de, hu).
- Teste: `tests/arhiva-mod.test.mjs` (17 verificări: dată înainte/după, comutare, memorare, 8 limbi, 0 cereri de rețea, 0 erori); `arhiva` (44) și `a11y-label` (24) trec.

## 8.2.0 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

## 8.2.0 — 2026-10-27

Anterior: v8.1.0. Recenzie 2 (2026-10-27).

- Grupa F din tabul „Arhivă reală” nu mai este „de verificat”: cele 6 scoruri (Țările de Jos 2–2 Japonia, Suedia 5–1 Tunisia, Țările de Jos 5–1 Suedia, Tunisia 0–4 Japonia, Japonia 1–1 Suedia, Tunisia 1–3 Țările de Jos) și clasamentul final sunt confirmate de patru surse (Wikipedia, CBS Sports, foot-africa.com, martincid.com).
- Grupa F: se afișează data (14, 14, 20, 21, 25, 25 iunie) și stadionul fiecărui meci (Dallas – AT&T Stadium; Monterrey – Estadio BBVA; Houston – NRG Stadium; Kansas City – Arrowhead Stadium), confirmate din ≥2 surse (date: Wikipedia, martincid.com, wego.com; stadioane: martincid.com, wego.com).
- Textul „Surse și verificare” (RO/EN) actualizat; testul `arhiva` actualizat (grupa F confirmată + date/stadioane).

Rămâne de verificat / nu s-a implementat:
- Datele și stadioanele meciurilor din grupele A–E și G–L: neconfirmate din ≥2 surse accesibile, deci nu sunt afișate.
- Marcatori, cartonașe, statistici: neconfirmate de ≥2 surse pentru cele 72 de meciuri, deci omise.
- Eliminatoriile 1/16–semifinale: aceeași stare ca în 8.1.0 (agregator confruntat parțial cu Wikipedia).

## 8.1.0 — 2026-10-27

Anterior: v8.0.0. Recenzie 2026-10-27.

- Nou: tabul **📖 Arhivă reală** cu rezultatele REALE ale turneului încheiat pe 19 iulie 2026: 12 clasamente de grupă (calculate din cele 72 de scoruri, ordinea oficială), 1/16, optimi, sferturi, semifinale, locul 3 și finala (Spania – Argentina 1–0 după prelungiri). Etichetat ✅ REAL, cu data verificării (2026-10-27) și sursele în pagină; echipe calificate marcate (primele două / cele mai bune 8 locuri 3).
- Simulatorul „ce-ar fi fost dacă” rămâne neschimbat; avertismentul din pagină spune acum explicit că doar tabul „Arhivă reală” conține rezultate reale, iar arhiva compară campioana reală cu simularea curentă (etichetat REAL vs. FICTIV).
- Stare: stabil; Offline: complet (README EN/RO, `app.json`, `fff-info`).
- Teste: `tests/arhiva.test.mjs` (43 de verificări: clasamentele calculate = totalurile oficiale, 32 de echipe în 1/16, nume traduse, 8 limbi, 0 cereri de rețea). `a11y-label` trece (24/24); `turneu-multiplu` eșuează la pasul axe (axe-core absent din mediu), la fel ca înainte de modificare.
- Hash-urile CSP recalculate; versiunea aliniată (`app.json`, `fff-info`, `sw.js`, subsol).

Nu s-a implementat / de verificat:
- Grupa F: o singură sursă (CBS Sports; pagina Wikipedia nu a fost accesibilă) — marcată „de verificat” în aplicație.
- Marcatori, cartonașe, stadioane și statistici ale meciurilor reale: nu au fost verificate, deci nu sunt incluse.
- Datele meciurilor de grupă reale nu sunt afișate (nu toate au putut fi verificate).
- Textele arhivei sunt în română și engleză; celelalte 6 limbi folosesc engleza (traducere nativă neverificată). README-urile FR/IT/ES/PT/DE/HU nu au fost actualizate.
