# Simulateur de la Coupe du monde 2026 (non officiel)

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version :** 7.6.5 · **Dernière mise à jour :** 2026-10-23

Langues de l'interface : **Română, English, Français, Italiano, Español, Português (PT), Deutsch, Magyar**

Simulateur fictif de la Coupe du monde 2026 (48 équipes, 104 matchs) dans un seul fichier HTML, sans serveur et sans compte. **Il n'est pas affilié à la FIFA, ne contient aucun résultat réel et n'est pas un pronostic.**

**Application en ligne :** https://chiuta.github.io/Cupa-Mondiala-2026/

![Capture d'écran](screenshot.fr.png)

## De quoi s'agit-il

Un jeu/expérience de simulation : l'application génère aléatoirement un tournoi complet (groupes, troisièmes places, seizièmes, huitièmes, quarts, demi-finales, petite finale et finale), avec scores, buteurs avec la minute, cartons, suspensions et statistiques de match. Le format (12 groupes de 4, les deux premiers plus les 8 meilleurs troisièmes, 32 équipes en phase à élimination directe) et les groupes suivent le tournoi réel du 11 juin au 19 juillet 2026 ; **les résultats sont inventés par un modèle simple** (forces subjectives de 1 à 5 pour chaque équipe, buts selon la loi de Poisson, graine). Le tournoi réel est terminé ; rien dans l'application ne reflète ce qui s'est réellement passé sur le terrain.

## Fonctions

Vérifiées dans le code et dans le navigateur (Chromium sans interface) :
- Simulation complète en un clic (bouton « Lancer » ou touche R), avec la graine affichée ; « Replay » depuis l'historique refait la même simulation (même graine et mêmes forces).
- « Forcer » : vous choisissez une équipe qui doit obligatoirement gagner le tournoi simulé (elle reçoit un bonus de force, et ses résultats en phase à élimination directe sont arrangés). C'est un scénario « et si », sans valeur statistique.
- Résumé de la simulation en cours (championne, finaliste, troisième place, meilleur buteur) dans la bannière de « Groupes » et « Finales », avec le bouton « 📋 Copier le résumé » : il copie un texte simple précisant que la simulation est fictive (l'adresse de la page n'est ajoutée que lorsque la page est servie en http/https).
- Groupes avec classements et critères de départage (points, confrontations directes, différence de buts, buts, fair-play d'après les cartons simulés, puis tirage au sort avec la graine), classement des troisièmes, tableau à élimination directe avec la numérotation officielle des matchs (M73–M104) et diagramme SVG.
- Attribution des troisièmes en seizièmes d'après le tableau de 495 combinaisons (annexe C du règlement), transcrit à partir de sources publiques (voir « Limites »).
- Buteurs avec la minute (y compris prolongations, penalty, coup franc, but contre son camp), cartons jaunes/rouges, suspensions (2 jaunes = 1 match ; rouge = 1 match ; les jaunes sont effacés après les groupes et après les quarts), classement des buteurs.
- Probabilités affichées pour les matchs à élimination directe : calculées à partir du même modèle de Poisson que celui de la simulation (ce ne sont pas des pronostics).
- Historique (50 simulations au maximum, dans le navigateur) avec filtrage, étiquettes, comparaison de 2 à 4 simulations, statistiques agrégées, statistiques par équipe et en confrontation directe, statistiques par stade.
- Batch : 50 / 200 / 500 / 1000 simulations ; affiche les fréquences du modèle (et non les probabilités réelles du tournoi).
- Éditeur de forces (1 à 5 pour chaque équipe) avec préréglages et préréglages personnalisés enregistrés localement.
- Export / import JSON de l'historique ; lien de partage `#s=…` (la simulation compressée dans l'adresse).
- Heures de match en ET et en heure de Roumanie (ET + 7 heures), mode compact, succès, impression, raccourcis clavier (désactivables depuis le guide).

## Mode d'emploi

1. Ouvrez la page ; au premier chargement, une simulation est générée automatiquement.
2. Appuyez sur « 🎲 Lancer » (ou R) pour en obtenir une nouvelle ; en option, choisissez d'abord une équipe sous « Forcer ».
3. Parcourez les phases dans la barre d'onglets : Groupes, 3e place, 16es, Huitièmes, Quarts, Demi-finales, Finales.
4. Dans « Historique », vous pouvez voir, refaire (Replay), étiqueter, partager (🔗 Share), comparer ou supprimer les simulations.
5. Dans « Batch », choisissez le nombre de simulations et lisez les fréquences des résultats.
6. « 🎚️ Strengths » ouvre l'éditeur de forces ; les modifications affectent les simulations futures.
7. « ⬇️ Export » enregistre l'historique dans un fichier JSON ; « ⬆️ Import » le recharge.
8. La touche « ? » ouvre le guide avec les raccourcis ; Échap ferme les fenêtres.

## Confidentialité et réseau

- Il n'y a aucune requête réseau : je n'ai trouvé dans le code aucun `fetch`, XHR, WebSocket, script, police, image ou iframe externe. La page contient une politique CSP (`connect-src 'none'`, `default-src 'none'`) qui les bloque ; la seule URL du fichier est l'espace de noms SVG, qui n'est pas consulté.
- Hôtes externes contactés : **aucun**. Il n'y a ni télémétrie, ni compte, ni cookies.
- Stockage local (`localStorage`, clés avec le préfixe `cupa-mondiala-2026.`) : l'historique des simulations, les forces personnalisées et les préréglages, les onglets visités, le mode compact, le réglage des raccourcis et quelques marqueurs de succès. Si `localStorage` est bloqué (par exemple en navigation privée), l'application fonctionne et l'historique ne reste que pour la session. Si l'espace se remplit, les plus anciennes simulations sont supprimées et vous en êtes informé.
- Attention : sur GitHub Pages, toutes les pages `chiuta.github.io/...` partagent le même `localStorage` (même origine) ; les clés de cette application sont préfixées, mais d'autres pages du même domaine pourraient les lire ou les modifier.
- Les liens `#s=…` et les fichiers JSON importés sont traités comme des données non fiables : tailles limitées (y compris après décompression), JSON validé strictement, champs reconstruits à partir de valeurs autorisées et affichés comme texte (protection contre le XSS, les « bombes zip » et la pollution de prototype). Un lien reçu demande votre confirmation avant l'import.
- Elle ne demande aucune autorisation au navigateur (caméra, localisation, notifications, etc.). Le partage par lien n'utilise le presse-papiers que sur votre action.
- L'application n'est pas une PWA installable : elle n'a pas de service worker ; elle ne fonctionne hors ligne que si vous enregistrez le fichier ou si le navigateur le garde en cache.

## Limites et avertissements

- **Simulation fictive.** Les scores, buts, cartons et statistiques sont aléatoires. Ce ne sont pas les résultats réels du tournoi et ce ne sont pas des pronostics. Les valeurs de « Batch » reflètent les forces subjectives choisies, pas des probabilités réelles.
- **Joueurs réels.** Les noms de joueurs ne sont utilisés que comme étiquettes ; les buts, cartons et suspensions qui leur sont attribués sont inventés. Les effectifs de l'application ne sont pas les effectifs officiels et n'ont pas été vérifiés.
- **Modèle simplifié.** Depuis la v7.4, la moyenne de buts du modèle est d'environ 2,7 par match (mesurée sur 300 simulations : 2,69, prolongations comprises ; dans les Coupes du monde récentes, environ 2,6–2,8) ; auparavant elle était d'environ 3,7. Les anciennes simulations restent signalées dans l'application et « Replay » les reproduit exactement avec leur propre modèle. Il n'y a ni blessures, ni forme, ni effectifs réels ; les penaltys, coups francs, buts contre son camp et prolongations ont des pourcentages fixes.
- **Calendrier.** Les groupes correspondent au tirage au sort réel (vérifiés sur la page Wikipédia du tournoi). Les dates, stades et heures (ET) proviennent de calendriers publics tiers (un seul pour les groupes, un autre pour les seizièmes, un autre pour les huitièmes jusqu'à la finale) ; les heures à partir des huitièmes sont celles de la version initiale de l'application et n'ont pas été confirmées indépendamment. Des erreurs sont possibles.
- **Troisièmes (annexe C).** Le tableau de 495 combinaisons a été transcrit à partir de Wikipédia (y compris un miroir de celle-ci) et validé automatiquement : exhaustivité, groupes éligibles pour chaque match, concordance avec le cas réel documenté (ligne 67). Il n'a pas été comparé ligne à ligne avec le PDF officiel de la FIFA.
- **Départage.** En cas d'égalité totale, on tire au sort avec la graine de la simulation ; le classement FIFA n'est pas utilisé.
- **Graine.** Le générateur mulberry32 a une graine de 32 bits : reproductible, mais non cryptographique. Un replay identique suppose le même moteur ; les simulations créées avec des versions antérieures (signalées dans l'application) ont utilisé un tableau à élimination directe approximé et ne se reproduisent pas exactement.
- Non affilié à la FIFA ; « FIFA », « World Cup » et les noms des équipes, stades et joueurs appartiennent à leurs propriétaires et ne sont utilisés qu'à titre descriptif.

## Exécution locale / hors ligne

Téléchargez `index.html` et ouvrez-le dans un navigateur ; il n'a besoin ni de serveur ni d'internet. Les liens de partage utilisent l'adresse du fichier ouvert (sur `file://`, ils peuvent être longs et inutilisables dans d'autres navigateurs).

## Licence

MIT — voir le fichier `LICENSE`.

## Auteur

Alexio — Alexandru-Ionuț Chiuță, contact : alexio@trom.tf

## Résumé

Un simulateur fictif et non officiel du format de la Coupe du monde 2026 de la FIFA (48 équipes, 104 matchs) dans un seul fichier HTML hors ligne. Tous les scores, buteurs, cartons et statistiques sont le résultat aléatoire d'un simple modèle de Poisson avec des forces d'équipe subjectives ; ce ne sont ni des résultats réels ni des pronostics, et les noms des joueurs ne sont que des étiquettes. Les critères de départage des groupes, le tableau officiel à élimination directe et l'attribution des troisièmes (tableau de l'annexe C, transcrit de sources publiques) sont implémentés ; les imports et les liens partagés sont strictement validés. Aucune requête réseau, aucune télémétrie ; les données restent dans localStorage. Non affilié à la FIFA.

## Historique / Changelog

### 7.6.5 — 2026-10-23
- Les clés de stockage portent désormais le préfixe de l'application (`cupa-mondiala-2026.*`) ; les données existantes (historique, forces, préréglages, langue, réglages) sont migrées automatiquement au démarrage, et les anciennes copies `.fff.json` restent importables.
- fff-kit 1.2.0 : stockage sans préfixe corrigé
- Les boîtes natives alert/confirm/prompt sont remplacées par des dialogues FFF.dialog accessibles et traduits (fff-kit 1.2.0).

### 7.6.3 — 2026-10-22
- fff-kit 1.1.4 : cibles tactiles et taille de texte minimale ; cibles tactiles/texte corrigés

### 7.6.2 — 2026-10-22
- fff-kit 1.1.2 : PBKDF2 600 000 itérations, protection anti-clickjacking

### 7.6.1 — 2026-10-22
- Accessibilité et mobile : les boîtes de dialogue bloquantes du navigateur (alertes, confirmations, saisies de texte) sont remplacées par des notifications non bloquantes et des dialogues modaux traduits (8 langues), y compris la solution de repli de copie pour le résumé et le lien de partage.
- Mobile : le texte fait au moins 12 px sur les écrans étroits et le résumé de l'avis de fiction a une cible tactile plus grande.
- L'étiquette technique indique désormais les 8 langues de l'interface (options statiques dans le sélecteur de langue).

### 7.5.0 — 2026-10-14
- Sauvegarde et étiquetage des données (fff-kit).

### 12 octobre 2026 (v7.4.1)
- 7.4.1 — 2026-10-12 : la version et la date de dernière mise à jour sont affichées dans l'application

### 11 octobre 2026 (v7.4)
- Le modèle de buts a été recalibré : les intensités de Poisson sont multipliées par 0,72, de ≈3,7 à ≈2,7 buts/match (les probabilités affichées utilisent la même mise à l'échelle).
- Chaque simulation possède désormais le champ `gm` (modèle de buts) ; celles créées auparavant (`gm` absent) s'affichent avec une note et « Replay » les reproduit à l'identique avec l'ancien modèle (vérifié : même graine, mêmes scores qu'en v7.3). L'export/import conserve `gm`.

### 11 octobre 2026 (v7.3)
- Résumé copiable de la simulation (championne, finaliste, troisième place, meilleur buteur) dans les bannières « Groupes » et « Finales ».
- CSP : `script-src` sur hash SHA-256, sans `'unsafe-inline'`.

### 11 octobre 2026 (v7.2)
- La barre d'avertissement et le panneau de commandes sont désormais des repères (`section` nommée) : axe 0 violation, y compris `region`.
- La liste « Forcer » est regroupée par groupes (A–L) au lieu d'un bloc plat de 48 entrées ; sans le préfixe « ⚡ » répété.
- Sur les écrans ≤520 px, l'en-tête et l'avertissement sont plus compacts, et le panneau de commandes tient sur une seule ligne défilable horizontalement (il occupe beaucoup moins d'écran).
- Le diagramme du tableau à élimination directe est focalisable au clavier ; version v7.2.
