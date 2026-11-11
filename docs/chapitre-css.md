# Chapitre CSS — pratique locale dans VS Code

## Intention pédagogique

L’étudiant passe du bac à sable HTML à son propre environnement. La plateforme fournit documentation, exemples et consignes. Les fichiers sont créés et testés sur son ordinateur. La navigation reste libre, mais les notions sont conçues pour être suivies dans l’ordre sur un même projet.

## Déroulé (durées indicatives)

| Notion | Pratique dans le dossier local | Durée |
|---|---|---|
| 1. Mon premier projet dans VS Code | Créer index.html, personnaliser les contenus, ouvrir et actualiser dans le navigateur ; aucun CSS | 30 min |
| 2. Créer et relier la feuille CSS | Créer css/styles.css, écrire link dans head, tester la liaison | 25 min |
| 3. Sélecteurs, cascade et héritage | Cibler les cartes et observer les règles concurrentes | 35 min |
| 4. Couleurs, typographie et unités | Définir police, couleurs, tailles et interlignage ; tester le zoom | 30 min |
| 5. Le modèle de boîte et les fonds | Espacer les cartes, centrer la page et inspecter les dimensions | 35 min |
| 6. Flux, affichage et positionnement | Mettre en forme un lien d’action et positionner un badge | 30 min |
| 7. Aligner avec Flexbox | Organiser la navigation et vérifier le retour à la ligne | 35 min |
| 8. Organiser les projets avec Grid | Comparer une et trois colonnes, préparer la base mobile | 30 min |
| 9. Adapter la page aux petits écrans | Media queries, largeurs intermédiaires, textes longs et zoom | 40 min |
| 10. États interactifs et débogage | Focus clavier, hover, transitions limitées, corrections enregistrées | 35 min |
| Atelier final | Portfolio responsive et présentation au formateur | 120 min |

Chaque notion suit cours → exemple à reproduire → mini-exercice local. Les extraits indiquent le fichier concerné et précisent s’il faut ajouter une règle ou la fusionner avec une règle existante.

## Dossier attendu

Au début :

```text
azicode62-css/
└── index.html
```

À partir de la deuxième notion :

```text
azicode62-css/
├── index.html
└── css/
    └── styles.css
```

À l’atelier, ajouter `README.txt` : ouverture de la page, largeurs testées, problème corrigé et explication de deux choix techniques. L’étudiant présente le dossier complet et le navigateur au formateur. Aucun téléversement n’est implémenté ; le canal de remise éventuel relève des consignes du formateur.

## Autoévaluation

Les vérifications sont explicites : fichiers réellement créés, changement observé après sauvegarde et actualisation, liens fonctionnels, adaptation des colonnes, absence de chevauchement, focus visible. Les cases cochées et la déclaration de fin sont enregistrées dans le navigateur de la plateforme. Elles ne constituent pas une inspection des fichiers ni une notation.

## Références de préparation

Le contenu est propre à Azicode62. Les procédures d’ouverture de dossier et de liaison HTML/CSS s’appuient sur les documentations officielles :

- [Prise en main de VS Code](https://code.visualstudio.com/docs/editing/getting-started/editor-tutorial)
- [Commencer avec CSS — MDN](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Styling_basics/Getting_started)
- [Bases de la mise en forme CSS — MDN](https://developer.mozilla.org/fr/docs/Learn_web_development/Core/Styling_basics)
