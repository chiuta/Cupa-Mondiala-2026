# Jurnal de modificări — Simulator Cupa Mondială 2026

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
