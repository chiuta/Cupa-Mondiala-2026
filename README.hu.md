# 2026-os labdarúgó-világbajnokság szimulátor (nem hivatalos)

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

**Verzió:** 7.5.0 · **Utolsó frissítés:** 2026-10-14

A 2026-os labdarúgó-világbajnokság fiktív szimulátora (48 csapat, 104 mérkőzés) egyetlen HTML-fájlban, szerver és fiók nélkül. **Nem áll kapcsolatban a FIFA-val, nem tartalmaz valódi eredményeket, és nem jóslat.**

**Online alkalmazás:** https://chiuta.github.io/Cupa-Mondiala-2026/

![Képernyőkép](screenshot.png)

## Mi ez

Szimulációs játék/kísérlet: az alkalmazás véletlenszerűen létrehoz egy teljes tornát (csoportok, harmadik helyezettek, nyolcaddöntő előtti kör, nyolcaddöntő, negyeddöntő, elődöntő, bronzmérkőzés és döntő), eredményekkel, gólszerzőkkel a perccel, lapokkal, eltiltásokkal és mérkőzésstatisztikákkal. A formátum (12 négycsapatos csoport, az első kettő plusz a legjobb 8 harmadik helyezett, 32 csapat a kieséses szakaszban) és a csoportok a valódi, 2026. június 11. – július 19. közötti torna szerintiek; **az eredményeket egy egyszerű modell találja ki** (minden csapatnak szubjektív 1–5 közötti erősség, a gólok Poisson-eloszlás szerint, seed). A valódi torna véget ért; az alkalmazásban semmi nem tükrözi, mi történt valójában a pályán.

## Funkciók

Ellenőrizve a kódban és a böngészőben (fej nélküli Chromium):
- Teljes szimuláció egy kattintással („Futtatás” gomb vagy az R billentyű), a seed megjelenítésével; az előzményekből a „Replay” ugyanazt a szimulációt ismétli meg (azonos seed és azonos erősségek).
- „Kényszerítés”: kiválasztasz egy csapatot, amelynek kötelezően meg kell nyernie a szimulált tornát (erősségbónuszt kap, és a kieséses eredményei elrendezésre kerülnek). Ez „mi lenne, ha” forgatókönyv, statisztikai érték nélkül.
- Az aktuális szimuláció összefoglalója (bajnok, döntős, harmadik hely, gólkirály) a „Csoportok” és a „Döntők” szalagjában, a „📋 Összefoglaló másolása” gombbal: egyszerű szöveget másol, amely közli, hogy a szimuláció fiktív (az oldal címe csak akkor kerül hozzá, ha az oldalt http/https-en keresztül szolgálják ki).
- Csoportok tabellákkal és holtverseny-feloldással (pontok, egymás elleni eredmények, gólkülönbség, gólok, fair play a szimulált lapok alapján, majd sorsolás a seeddel), a harmadik helyezettek rangsora, kieséses ág a hivatalos mérkőzésszámozással (M73–M104) és SVG-diagram.
- A harmadik helyezettek beosztása a nyolcaddöntő előtti körben a 495 kombinációt tartalmazó táblázat szerint (a szabályzat C melléklete), nyilvános forrásokból átírva (lásd „Korlátok”).
- Gólszerzők a perccel (hosszabbítással, tizenegyessel, szabadrúgással, öngóllal együtt), sárga/piros lapok, eltiltások (2 sárga = 1 mérkőzés; piros = 1 mérkőzés; a sárgák a csoportkör után és a negyeddöntők után törlődnek), gólkirály-rangsor.
- A kieséses mérkőzéseknél megjelenített valószínűségek: ugyanabból a Poisson-modellből számolva, amelyet a szimuláció használ (nem jóslatok).
- Előzmények (legfeljebb 50 szimuláció, a böngészőben) szűréssel, címkékkel, 2–4 szimuláció összehasonlításával, összesített statisztikákkal, csapatonkénti és egymás elleni statisztikákkal, stadiononkénti statisztikákkal.
- Batch: 50 / 200 / 500 / 1000 szimuláció; a modell gyakoriságait mutatja (nem a torna valódi valószínűségeit).
- Erősségszerkesztő (minden csapatnak 1–5) előbeállításokkal és helyben mentett saját előbeállításokkal.
- Az előzmények JSON-exportja / -importja; megosztási hivatkozás `#s=…` (a szimuláció tömörítve a címben).
- Mérkőzésidők ET szerint és romániai idő szerint (ET + 7 óra), kompakt mód, teljesítmények, nyomtatás, billentyűparancsok (az útmutatóból kikapcsolhatók).

## Használat

1. Nyisd meg az oldalt; az első betöltéskor automatikusan létrejön egy szimuláció.
2. Nyomd meg a „🎲 Futtatás” gombot (vagy az R-t) egy újhoz; igény szerint előtte válassz egy csapatot a „Kényszerítés” alatt.
3. Járd végig a szakaszokat a fülsávban: Csoportok, 3. hely, Nyolcaddöntő előtti kör, Nyolcaddöntő, Negyeddöntő, Elődöntő, Döntők.
4. Az „Előzmények” között megtekintheted, megismételheted (Replay), címkézheted, megoszthatod (🔗 Share), összehasonlíthatod vagy törölheted a szimulációkat.
5. A „Batch” részben válaszd ki a szimulációk számát, és olvasd le az eredmények gyakoriságát.
6. A „🎚️ Strengths” megnyitja az erősségszerkesztőt; a módosítások a jövőbeli szimulációkat érintik.
7. Az „⬇️ Export” JSON-fájlba menti az előzményeket; az „⬆️ Import” újra betölti.
8. A „?” billentyű megnyitja a billentyűparancsokat tartalmazó útmutatót; az Esc bezárja az ablakokat.

## Adatvédelem és hálózat

- Nincsenek hálózati kérések: a kódban nem találtam külső `fetch`-et, XHR-t, WebSocketet, szkriptet, betűtípust, képet vagy iframe-et. Az oldal CSP-szabályzatot tartalmaz (`connect-src 'none'`, `default-src 'none'`), amely ezeket blokkolja; a fájlban az egyetlen URL az SVG névtere, amelyet nem érnek el.
- Felvett kapcsolatú külső gazdagépek: **nincs**. Nincs telemetria, fiók vagy süti.
- Helyi tárolás (`localStorage`, `wc2026_` előtagú kulcsok): a szimulációk előzményei, az egyéni erősségek és előbeállítások, a meglátogatott fülek, a kompakt mód, a billentyűparancsok beállítása és néhány teljesítményjelölő. Ha a `localStorage` le van tiltva (például privát módban), az alkalmazás működik, az előzmények pedig csak a munkamenetben maradnak. Ha betelik a hely, a legrégebbi szimulációk törlődnek, és értesítést kapsz.
- Figyelem: a GitHub Pagesen az összes `chiuta.github.io/...` oldal ugyanazt a `localStorage`-et használja (azonos eredet); ennek az alkalmazásnak a kulcsai előtaggal rendelkeznek, de ugyanazon domain más oldalai elolvashatják vagy módosíthatják őket.
- A `#s=…` hivatkozásokat és az importált JSON-fájlokat megbízhatatlan adatként kezeli: korlátozott méretek (kicsomagolás után is), szigorúan ellenőrzött JSON, megengedett értékekből újraépített és szövegként megjelenített mezők (védelem az XSS, a „zip bombák” és a prototípus-szennyezés ellen). A kapott hivatkozás import előtt megerősítést kér tőled.
- Nem kér böngészőengedélyeket (kamera, helymeghatározás, értesítések stb.). A hivatkozással való megosztás a vágólapot csak a te műveletedre használja.
- Az alkalmazás nem telepíthető PWA: nincs service workere; offline csak akkor működik, ha elmented a fájlt, vagy a böngésző gyorsítótárban tartja.

## Korlátok és figyelmeztetések

- **Fiktív szimuláció.** Az eredmények, gólok, lapok és statisztikák véletlenszerűek. Nem a torna valódi eredményei, és nem jóslatok. A „Batch” értékei a választott szubjektív erősségeket tükrözik, nem valódi valószínűségeket.
- **Valódi játékosok.** A játékosok nevei csak címkék; a nekik tulajdonított gólok, lapok és eltiltások kitaláltak. Az alkalmazás keretei nem a hivatalosak, és nem lettek ellenőrizve.
- **Egyszerűsített modell.** A v7.4 óta a modell gólátlaga ≈2,7 mérkőzésenként (300 szimuláción mérve: 2,69, a hosszabbításokkal együtt; a közelmúlt világbajnokságain ≈2,6–2,8); korábban ≈3,7 volt. A régi szimulációk az alkalmazásban megjelöltek maradnak, és a „Replay” pontosan a saját modelljükkel reprodukálja őket. Nincsenek sérülések, formaidőszak vagy valódi keretek; a tizenegyesek, szabadrúgások, öngólok és hosszabbítások aránya rögzített.
- **Naptár.** A csoportok a valódi sorsolásnak felelnek meg (a torna Wikipedia-oldalán ellenőrizve). A dátumok, stadionok és időpontok (ET) harmadik felek nyilvános naptáraiból származnak (egyetlen a csoportokhoz, egy másik a nyolcaddöntő előtti körhöz, egy harmadik a nyolcaddöntőtől a döntőig); a nyolcaddöntőtől kezdődő időpontok az alkalmazás kezdeti verziójából valók, és nem lettek függetlenül megerősítve. Lehetnek hibák.
- **Harmadik helyezettek (C melléklet).** A 495 kombinációt tartalmazó táblázatot a Wikipediáról írtuk át (egy tükrével együtt), és automatikusan ellenőriztük: teljesség, az egyes mérkőzésekhez jogosult csoportok, egyezés a dokumentált valódi esettel (67. sor). Soronként nem lett összevetve a hivatalos FIFA PDF-fel.
- **Holtverseny-feloldás.** Teljes egyenlőség esetén a szimuláció seedjével sorsolnak; a FIFA-világranglistát nem használja.
- **Seed.** A mulberry32 generátor 32 bites seeddel rendelkezik: reprodukálható, de nem kriptográfiai. Az azonos replay ugyanazt a motort feltételezi; a korábbi verziókkal készült szimulációk (az alkalmazásban megjelölve) közelített kieséses ágat használtak, és nem reprodukálhatók pontosan.
- Nem áll kapcsolatban a FIFA-val; a „FIFA”, a „World Cup” és a csapatok, stadionok és játékosok nevei tulajdonosaikat illetik, és csak leíró jelleggel szerepelnek.

## Helyi / offline futtatás

Töltsd le az `index.html` fájlt, és nyisd meg egy böngészőben; nincs szüksége szerverre vagy internetre. A megosztási hivatkozások a megnyitott fájl címét használják (`file://` alatt hosszúak lehetnek, és más böngészőkben használhatatlanok).

## Licenc

MIT — lásd a `LICENSE` fájlt.

## Szerző

Alexio — Alexandru-Ionuț Chiuță, kapcsolat: alexio@trom.tf

## Összefoglaló

A 2026-os FIFA-világbajnokság formátumának nem hivatalos, fiktív szimulátora (48 csapat, 104 mérkőzés) egyetlen offline HTML-fájlban. Minden eredmény, gólszerző, lap és statisztika egy egyszerű Poisson-modell véletlenszerű kimenete szubjektív csapaterősségekkel; nem valódi eredmények vagy jóslatok, a játékosnevek pedig puszta címkék. Megvalósítottak a csoportok holtverseny-szabályai, a hivatalos kieséses ág és a harmadik helyezettek beosztása (a C melléklet táblázata, nyilvános forrásokból átírva); az importokat és a megosztott hivatkozásokat szigorúan ellenőrzi. Nincsenek hálózati kérések, nincs telemetria; az adatok a localStorage-ben maradnak. Nem áll kapcsolatban a FIFA-val.

## Előzmények / Changelog

### 7.5.0 — 2026-10-14
- Biztonsági mentés és adatcímkézés (fff-kit).

### 2026. október 12. (v7.4.1)
- 7.4.1 — 2026-10-12: a verzió és az utolsó frissítés dátuma megjelenik az alkalmazásban

### 2026. október 11. (v7.4)
- A gólmodellt újrakalibráltuk: a Poisson-intenzitásokat 0,72-del skáláztuk, ≈3,7-ről ≈2,7 gól/mérkőzésre (a megjelenített valószínűségek ugyanezt a skálázást használják).
- Minden szimulációnak mostantól van `gm` mezője (gólmodell); a korábban létrehozottak (hiányzó `gm`) megjegyzéssel jelennek meg, és a „Replay” azonosan reprodukálja őket a régi modellel (ellenőrizve: azonos seed, azonos eredmények, mint a v7.3-ban). Az export/import megőrzi a `gm`-et.

### 2026. október 11. (v7.3)
- Másolható összefoglaló a szimulációról (bajnok, döntős, harmadik hely, gólkirály) a „Csoportok” és a „Döntők” szalagjában.
- CSP: a `script-src` SHA-256-hasht használ, `'unsafe-inline'` nélkül.

### 2026. október 11. (v7.2)
- A figyelmeztető sáv és a vezérlőpanel mostantól landmark (nevesített `section`): axe 0 szabálysértés, a `region`-nel együtt.
- A „Kényszerítés” lista csoportok (A–L) szerint tagolt a 48 bejegyzésből álló lapos blokk helyett; az ismétlődő „⚡” előtag nélkül.
- ≤520 px-es képernyőkön a fejléc és a figyelmeztetés kompaktabb, a vezérlőpanel pedig egyetlen vízszintesen görgethető sor (sokkal kevesebb helyet foglal a képernyőn).
- A kieséses ág diagramja billentyűzettel fókuszálható; v7.2 verzió.
