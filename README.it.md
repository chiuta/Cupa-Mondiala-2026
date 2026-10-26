# Simulatore della Coppa del Mondo 2026 (non ufficiale)

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Versione:** 8.0.0 · **Ultimo aggiornamento:** 2026-10-26

Lingue dell'interfaccia: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Simulatore fittizio della Coppa del Mondo 2026 (48 squadre, 104 partite) in un unico file HTML, senza server e senza account. **Non è affiliato alla FIFA, non contiene risultati reali e non è un pronostico.**

**Applicazione online:** https://chiuta.github.io/Cupa-Mondiala-2026/

![Schermata](screenshot.it.png)

## Che cos'è

Un gioco/esperimento di simulazione: l'app genera casualmente un torneo completo (gironi, terze classificate, sedicesimi, ottavi, quarti, semifinali, finale per il terzo posto e finale), con punteggi, marcatori con il minuto, cartellini, squalifiche e statistiche di partita. Il formato (12 gironi da 4, le prime due più le migliori 8 terze, 32 squadre nella fase a eliminazione diretta) e i gironi seguono il torneo reale dall'11 giugno al 19 luglio 2026; **i risultati sono inventati da un modello semplice** (forze soggettive da 1 a 5 per ogni squadra, gol secondo la distribuzione di Poisson, seme). Il torneo reale si è concluso; nulla nell'app riflette ciò che è successo realmente in campo.

## Funzioni

Verificate nel codice e nel browser (Chromium headless):
- Simulazione completa con un clic (pulsante «Avvia» o tasto R), con il seme mostrato; «Replay» dalla cronologia rifà la stessa simulazione (stesso seme e stesse forze).
- «Forza»: scegli una squadra che deve obbligatoriamente vincere il torneo simulato (riceve un bonus di forza, e i suoi risultati nella fase a eliminazione diretta vengono sistemati). È uno scenario «e se», senza valore statistico.
- Riepilogo della simulazione corrente (campione, finalista, terzo posto, capocannoniere) nel banner di «Gironi» e «Finali», con il pulsante «📋 Copia il riepilogo»: copia un testo semplice che precisa che la simulazione è fittizia (l'indirizzo della pagina viene aggiunto solo quando la pagina è servita via http/https).
- Gironi con classifiche e criteri di spareggio (punti, scontri diretti, differenza reti, gol, fair play dai cartellini simulati, poi sorteggio con il seme), classifica delle terze, tabellone a eliminazione diretta con la numerazione ufficiale delle partite (M73–M104) e diagramma SVG.
- Assegnazione delle terze nei sedicesimi secondo la tabella di 495 combinazioni (Allegato C del regolamento), trascritta da fonti pubbliche (vedi «Limiti»).
- Marcatori con il minuto (inclusi supplementari, rigore, punizione, autogol), cartellini gialli/rossi, squalifiche (2 gialli = 1 partita; rosso = 1 partita; i gialli vengono cancellati dopo i gironi e dopo i quarti), classifica marcatori.
- Probabilità mostrate per le partite a eliminazione diretta: calcolate dallo stesso modello di Poisson usato dalla simulazione (non sono pronostici).
- Cronologia (massimo 50 simulazioni, nel browser) con filtri, etichette, confronto di 2–4 simulazioni, statistiche aggregate, statistiche per squadra e scontri diretti, statistiche per stadio.
- Batch: 50 / 200 / 500 / 1000 simulazioni; mostra le frequenze del modello (non le probabilità reali del torneo).
- Editor delle forze (1–5 per ogni squadra) con preimpostazioni e preimpostazioni personalizzate salvate in locale.
- Esportazione / importazione JSON della cronologia; link di condivisione `#s=…` (la simulazione compressa nell'indirizzo).
- Orari delle partite in ET e in ora della Romania (ET + 7 ore), modalità compatta, traguardi, stampa, scorciatoie da tastiera (si possono disattivare dalla guida).

## Come si usa

1. Apri la pagina; al primo caricamento viene generata automaticamente una simulazione.
2. Premi «🎲 Avvia» (o R) per una nuova; facoltativamente scegli prima una squadra in «Forza».
3. Scorri le fasi nella barra delle schede: Gironi, 3° posto, Sedicesimi, Ottavi, Quarti, Semifinali, Finali.
4. In «Cronologia» puoi vedere, rifare (Replay), etichettare, condividere (🔗 Share), confrontare o eliminare le simulazioni.
5. In «Batch» scegli il numero di simulazioni e leggi le frequenze dei risultati.
6. «🎚️ Strengths» apre l'editor delle forze; le modifiche influenzano le simulazioni future.
7. «⬇️ Export» salva la cronologia in un file JSON; «⬆️ Import» la ricarica.
8. Il tasto «?» apre la guida con le scorciatoie; Esc chiude le finestre.

## Riservatezza e rete

- Non ci sono richieste di rete: nel codice non ho trovato `fetch`, XHR, WebSocket, script, font, immagini o iframe esterni. La pagina contiene una politica CSP (`connect-src 'none'`, `default-src 'none'`) che li blocca; l'unico URL nel file è lo spazio dei nomi SVG, al quale non si accede.
- Host esterni contattati: **nessuno**. Non ci sono telemetria, account né cookie.
- Archiviazione locale (`localStorage`, chiavi con il prefisso `cupa-mondiala-2026.`): la cronologia delle simulazioni, le forze personalizzate e le preimpostazioni, le schede visitate, la modalità compatta, l'impostazione delle scorciatoie e alcuni indicatori dei traguardi. Se `localStorage` è bloccato (ad esempio in modalità privata), l'app funziona e la cronologia resta solo nella sessione. Se lo spazio si riempie, le simulazioni più vecchie vengono rimosse e ne sei avvisato.
- Attenzione: su GitHub Pages tutte le pagine `chiuta.github.io/...` condividono lo stesso `localStorage` (stessa origine); le chiavi di questa app hanno un prefisso, ma altre pagine dello stesso dominio potrebbero leggerle o modificarle.
- I link `#s=…` e i file JSON importati sono trattati come dati non attendibili: dimensioni limitate (anche dopo la decompressione), JSON validato rigorosamente, campi ricostruiti da valori consentiti e mostrati come testo (protezione contro XSS, «zip bomb» e inquinamento dei prototipi). Un link ricevuto chiede la tua conferma prima dell'importazione.
- Non richiede permessi del browser (fotocamera, posizione, notifiche ecc.). La condivisione tramite link usa gli appunti solo su tua azione.
- L'app non è una PWA installabile: non ha service worker; funziona offline solo se salvi il file o se il browser lo tiene in cache.

## Limiti e avvertenze

- **Simulazione fittizia.** Punteggi, gol, cartellini e statistiche sono casuali. Non sono i risultati reali del torneo e non sono pronostici. I valori in «Batch» riflettono le forze soggettive scelte, non probabilità reali.
- **Giocatori reali.** I nomi dei giocatori sono usati solo come etichette; i gol, i cartellini e le squalifiche loro attribuiti sono inventati. Le rose nell'app non sono quelle ufficiali e non sono state verificate.
- **Modello semplificato.** Dalla v7.4 la media di gol del modello è ≈2,7 a partita (misurata su 300 simulazioni: 2,69, inclusi i supplementari; nelle recenti Coppe del Mondo ≈2,6–2,8); prima era ≈3,7. Le vecchie simulazioni restano contrassegnate nell'app e «Replay» le riproduce esattamente con il loro modello. Non ci sono infortuni, forma né rose reali; rigori, punizioni, autogol e supplementari hanno percentuali fisse.
- **Calendario.** I gironi corrispondono al sorteggio reale (verificati sulla pagina Wikipedia del torneo). Date, stadi e orari (ET) provengono da calendari pubblici di terzi (uno solo per i gironi, un altro per i sedicesimi, un altro per gli ottavi fino alla finale); gli orari dagli ottavi in poi sono quelli della versione iniziale dell'app e non sono stati confermati in modo indipendente. Possono esserci errori.
- **Terze (Allegato C).** La tabella di 495 combinazioni è stata trascritta da Wikipedia (inclusa una sua copia speculare) e validata automaticamente: completezza, gironi ammissibili per ogni partita, concordanza con il caso reale documentato (riga 67). Non è stata confrontata riga per riga con il PDF ufficiale della FIFA.
- **Spareggio.** Per la parità totale si sorteggia con il seme della simulazione; il ranking FIFA non viene usato.
- **Seme.** Il generatore mulberry32 ha un seme a 32 bit: riproducibile, ma non crittografico. Un replay identico presuppone lo stesso motore; le simulazioni create con versioni precedenti (contrassegnate nell'app) hanno usato un tabellone a eliminazione diretta approssimato e non si riproducono esattamente.
- Non affiliato alla FIFA; «FIFA», «World Cup» e i nomi di squadre, stadi e giocatori appartengono ai rispettivi proprietari e sono usati solo a scopo descrittivo.

## Esecuzione locale / offline

Scarica `index.html` e aprilo in un browser; non richiede server né internet. I link di condivisione usano l'indirizzo del file aperto (su `file://` possono essere lunghi e inutilizzabili in altri browser).

## Licenza

MIT — vedi il file `LICENSE`.

## Autore

Alexio — Alexandru-Ionuț Chiuță, contatto: alexio@trom.tf

## Riepilogo

Un simulatore fittizio e non ufficiale del formato della Coppa del Mondo FIFA 2026 (48 squadre, 104 partite) in un unico file HTML offline. Tutti i punteggi, i marcatori, i cartellini e le statistiche sono output casuale di un semplice modello di Poisson con forze soggettive delle squadre; non sono risultati reali né pronostici, e i nomi dei giocatori sono semplici etichette. Sono implementati i criteri di spareggio dei gironi, il tabellone ufficiale a eliminazione diretta e l'assegnazione delle terze (tabella dell'Allegato C, trascritta da fonti pubbliche); le importazioni e i link condivisi sono validati rigorosamente. Nessuna richiesta di rete, nessuna telemetria; i dati restano in localStorage. Non affiliato alla FIFA.

## Cronologia / Changelog

### 7.6.6 — 2026-10-23

- Accessibility: the “Copy summary” button no longer has an aria-label that differs from its visible text (WCAG 2.5.3 label in name) in non-Romanian languages; the explanation stays as a title; CSP hash recalculated.

### 7.6.5 — 2026-10-23
- Le chiavi di archiviazione hanno ora il prefisso dell'app (`cupa-mondiala-2026.*`); i dati esistenti (cronologia, forze, preimpostazioni, lingua, impostazioni) vengono migrati automaticamente all'avvio e le vecchie copie `.fff.json` si possono ancora importare.
- fff-kit 1.2.0: archiviazione senza prefisso corretta
- Le finestre native alert/confirm/prompt sono sostituite da dialoghi FFF.dialog accessibili e tradotti (fff-kit 1.2.0).

### 7.6.3 — 2026-10-22
- fff-kit 1.1.4: target touch e dimensione minima del testo; target touch/testo corretti

### 7.6.2 — 2026-10-22
- fff-kit 1.1.2: PBKDF2 600.000 iterazioni, protezione anti-clickjacking

### 7.6.1 — 2026-10-22
- Accessibilità e mobile: le finestre di dialogo bloccanti del browser (avvisi, conferme, richieste di testo) sono sostituite da notifiche non bloccanti e finestre modali tradotte (8 lingue), compresa l'alternativa di copia per il riepilogo e il link di condivisione.
- Mobile: il testo è di almeno 12 px sugli schermi stretti e il riepilogo dell'avviso di finzione ha un'area tattile più grande.
- L'etichetta tecnica elenca ora le 8 lingue dell'interfaccia (opzioni statiche nel selettore della lingua).

### 7.5.0 — 2026-10-14
- Copia di sicurezza ed etichettatura dei dati (fff-kit).

### 12 ottobre 2026 (v7.4.1)
- 7.4.1 — 2026-10-12: la versione e la data dell'ultimo aggiornamento sono mostrate nell'app

### 11 ottobre 2026 (v7.4)
- Il modello dei gol è stato ricalibrato: le intensità di Poisson sono scalate di 0,72, da ≈3,7 a ≈2,7 gol/partita (le probabilità mostrate usano la stessa scalatura).
- Ogni simulazione ha ora il campo `gm` (modello dei gol); quelle create prima (`gm` mancante) sono mostrate con una nota e «Replay» le riproduce in modo identico con il vecchio modello (verificato: stesso seme, stessi punteggi della v7.3). L'esportazione/importazione conserva `gm`.

### 11 ottobre 2026 (v7.3)
- Riepilogo copiabile della simulazione (campione, finalista, terzo posto, capocannoniere) nei banner «Gironi» e «Finali».
- CSP: `script-src` su hash SHA-256, senza `'unsafe-inline'`.

### 11 ottobre 2026 (v7.2)
- La barra di avviso e il pannello dei comandi sono ora riferimenti (`section` con nome): axe 0 violazioni, incluso `region`.
- L'elenco «Forza» è raggruppato per gironi (A–L) invece di un blocco piatto di 48 voci; senza il prefisso «⚡» ripetuto.
- Su schermi ≤520 px l'intestazione e l'avviso sono più compatti e il pannello dei comandi è una sola riga scorrevole in orizzontale (occupa molto meno schermo).
- Il diagramma del tabellone a eliminazione diretta è focalizzabile da tastiera; versione v7.2.
