# 2026 World Cup Simulator (unofficial)

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version:** 7.6.0 · **Last updated:** 2026-10-19

Interface languages: **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

A fictional simulator of the 2026 World Cup (48 teams, 104 matches) in a single HTML file, with no server and no account. **It is not affiliated with FIFA, contains no real results and is not a prediction.**

**Live app:** https://chiuta.github.io/Cupa-Mondiala-2026/

![Screenshot](screenshot.png)

## What it is

A simulation game/experiment: the app randomly generates a complete tournament (groups, third places, round of 32, round of 16, quarter-finals, semi-finals, third-place match and final), with scores, scorers with the minute, cards, suspensions and match statistics. The format (12 groups of 4, the top two plus the best 8 third-placed teams, 32 teams in the knockout stage) and the groups follow the real tournament of 11 June – 19 July 2026; **the results are invented by a simple model** (subjective strengths 1–5 for each team, goals following the Poisson distribution, a seed). The real tournament has ended; nothing in the app reflects what actually happened on the pitch.

## Features

Verified in the code and in the browser (headless Chromium):
- Complete simulation in one click ("Run" button or the R key), with the seed displayed; "Replay" from the history redoes the same simulation (same seed and same strengths).
- "Force": you choose a team that must win the simulated tournament (it receives a strength bonus, and its knockout results are arranged). It is a "what-if" scenario, with no statistical value.
- Summary of the current simulation (champion, runner-up, third place, top scorer) in the banner of "Groups" and "Finals", with the "📋 Copy summary" button: it copies a plain text that states that the simulation is fictional (the page address is added only when the page is served over http/https).
- Groups with standings and tiebreakers (points, head-to-head, goal difference, goals, fair play from the simulated cards, then a draw of lots with the seed), ranking of third places, knockout bracket with the official match numbering (M73–M104) and an SVG diagram.
- Allocation of third places in the round of 32 according to the table of 495 combinations (Annex C of the regulations), transcribed from public sources (see "Limits").
- Scorers with the minute (including extra time, penalty, free kick, own goal), yellow/red cards, suspensions (2 yellows = 1 match; red = 1 match; yellows are cleared after the groups and after the quarter-finals), top scorers ranking.
- Probabilities shown for knockout matches: computed from the same Poisson model used by the simulation (they are not predictions).
- History (maximum 50 simulations, in the browser) with filtering, labels, comparison of 2–4 simulations, aggregate statistics, per-team and head-to-head statistics, per-stadium statistics.
- Batch: 50 / 200 / 500 / 1000 simulations; shows the model's frequencies (not real tournament probabilities).
- Strengths editor (1–5 for each team) with presets and custom presets saved locally.
- JSON export / import of the history; sharing link `#s=…` (the simulation compressed into the address).
- Match times in ET and in Romanian time (ET + 7 hours), compact mode, achievements, printing, keyboard shortcuts (can be disabled from the guide).

## How to use

1. Open the page; on first load a simulation is generated automatically.
2. Press "🎲 Run" (or R) for a new one; optionally choose a team first under "Force".
3. Go through the stages in the tab bar: Groups, 3rd place, R32, Round of 16, Quarter-finals, Semi-finals, Finals.
4. In "History" you can view, redo (Replay), label, share (🔗 Share), compare or delete simulations.
5. In "Batch" choose the number of simulations and read the result frequencies.
6. "🎚️ Strengths" opens the strengths editor; changes affect future simulations.
7. "⬇️ Export" saves the history to a JSON file; "⬆️ Import" reloads it.
8. The "?" key opens the guide with the shortcuts; Esc closes the windows.

## Privacy and network

- There are no network requests: I found no external `fetch`, XHR, WebSocket, scripts, fonts, images or iframes in the code. The page contains a CSP policy (`connect-src 'none'`, `default-src 'none'`) that blocks them; the only URL in the file is the SVG namespace, which is not accessed.
- External hosts contacted: **none**. There is no telemetry, account or cookies.
- Local storage (`localStorage`, keys with the prefix `wc2026_`): the simulation history, the custom strengths and presets, the tabs visited, the compact mode, the shortcuts setting and a few achievement markers. If `localStorage` is blocked (for example in private mode), the app works, and the history stays only in the session. If the space fills up, the oldest simulations are removed and you are notified.
- Note: on GitHub Pages all `chiuta.github.io/...` pages share the same `localStorage` (same origin); this app's keys are prefixed, but other pages on the same domain could read or modify them.
- `#s=…` links and imported JSON files are treated as untrusted data: limited sizes (including after decompression), strictly validated JSON, fields rebuilt from allowed values and displayed as text (protection against XSS, "zip bombs" and prototype pollution). A received link asks for your confirmation before import.
- It asks for no browser permissions (camera, location, notifications, etc.). Link sharing uses the clipboard only on your action.
- The app is not an installable PWA: it has no service worker; it works offline only if you save the file or the browser keeps it in cache.

## Limits and warnings

- **Fictional simulation.** The scores, goals, cards and statistics are random. They are not the real results of the tournament and are not predictions. The values in "Batch" reflect the subjective strengths chosen, not real probabilities.
- **Real players.** Player names are used only as labels; the goals, cards and suspensions attributed to them are invented. The squads in the app are not the official ones and have not been verified.
- **Simplified model.** Since v7.4 the model's average is ≈2.7 goals per match (measured over 300 simulations: 2.69, including extra time; in recent World Cups ≈2.6–2.8); before it was ≈3.7. Old simulations remain marked in the app and "Replay" reproduces them exactly with their own model. There are no injuries, form or real squads; penalties, free kicks, own goals and extra time have fixed percentages.
- **Calendar.** The groups correspond to the real draw (verified on the tournament's Wikipedia page). The dates, stadiums and times (ET) come from third-party public calendars (one for the groups, another for the round of 32, another for the round of 16 to the final); the times from the round of 16 onward are those from the app's initial version and have not been independently confirmed. There may be errors.
- **Third places (Annex C).** The table of 495 combinations was transcribed from Wikipedia (including a mirror of it) and automatically validated: completeness, eligible groups for each match, agreement with the documented real case (row 67). It has not been compared row by row with the official FIFA PDF.
- **Tiebreakers.** For a complete tie, lots are drawn with the simulation's seed; the FIFA ranking is not used.
- **Seed.** The mulberry32 generator has a 32-bit seed: reproducible, but not cryptographic. An identical replay assumes the same engine; simulations created with earlier versions (marked in the app) used an approximated knockout bracket and do not reproduce exactly.
- Not affiliated with FIFA; "FIFA", "World Cup" and the names of teams, stadiums and players belong to their owners and are used only descriptively.

## Running locally / offline

Download `index.html` and open it in a browser; it needs no server or internet. Sharing links use the address of the opened file (on `file://` they may be long and unusable in other browsers).

## License

MIT — see the `LICENSE` file.

## Author

Alexio — Alexandru-Ionuț Chiuță, contact: alexio@trom.tf

## Summary

An unofficial, fictional simulator of the 2026 FIFA World Cup format (48 teams, 104 matches) in one offline HTML file. All scores, scorers, cards and statistics are random output of a simple Poisson model with subjective team strengths; they are not real results or predictions, and player names are mere labels. Group tiebreakers, the official knockout bracket and the third-place allocation (Annex C table, transcribed from public sources) are implemented; imports and shared links are strictly validated. No network requests, no telemetry; data stays in localStorage. Not affiliated with FIFA.

## History / Changelog

### 7.5.0 — 2026-10-14
- Backup and data labelling (fff-kit).

### 12 October 2026 (v7.4.1)
- 7.4.1 — 2026-10-12: the version and the date of the last update are displayed in the app

### 11 October 2026 (v7.4)
- The goal model was recalibrated: the Poisson intensities are scaled by 0.72, from ≈3.7 to ≈2.7 goals/match (the probabilities shown use the same scaling).
- Each simulation now has the `gm` field (goal model); those created earlier (`gm` missing) are displayed with a note and "Replay" reproduces them identically with the old model (verified: same seed, same scores as in v7.3). Export/import preserves `gm`.

### 11 October 2026 (v7.3)
- Copyable summary of the simulation (champion, runner-up, third place, top scorer) in the "Groups" and "Finals" banners.
- CSP: `script-src` on a SHA-256 hash, without `'unsafe-inline'`.

### 11 October 2026 (v7.2)
- The warning bar and the controls panel are now landmarks (`section` with a name): axe 0 violations, including `region`.
- The "Force" list is grouped by groups (A–L) instead of a flat block of 48 entries; without the repeated "⚡" prefix.
- On screens ≤520 px the header and the warning are more compact, and the controls panel is a single horizontally scrollable row (it takes up much less of the screen).
- The knockout bracket diagram is keyboard-focusable; version v7.2.
