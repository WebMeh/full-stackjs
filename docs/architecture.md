# Architecture et interfaces

## Landing page et navigation

La route sans hash (`/`) rend `Landing.jsx`. Elle présente le contexte Azilal, la méthode « Comprendre / Pratiquer / Construire », le catalogue de formations et le mode de pratique locale à partir de CSS. `src/content/landing.js` garde les textes de méthode et les cartes séparés de l’affichage. La carte Full Stack JavaScript est la seule formation interactive : son action mène à `#sommaire`, le sommaire déjà développé. Les autres cartes restent des articles verrouillés sans route inactive.

Le logo revient toujours vers `#accueil`. Depuis le parcours, le fil d’Ariane et « Vue d’ensemble » reviennent à `#sommaire`. Les liens de la landing vers `#methode` et `#formations` servent au défilement interne.

## Registre et navigation

`src/content/index.js` déclare les chapitres publiés et leur mode de pratique. `createCurriculum` produit un parcours ordonné. Sidebar, Overview et App en déduisent les pages et les compteurs. Les notions conservent une séquence cours → exemple → application ; chaque chapitre se termine par un atelier.

Les fragments historiques HTML (`#structure`, `#atelier`…) restent valides. Les nouveaux fragments sont qualifiés par chapitre (`#css/poste-local`, `#css/atelier`). Retour et avance du navigateur mettent à jour la page ; le focus rejoint le titre. Les chapitres sont repliables dans le parcours.

## Deux modes pédagogiques

- `embedded` pour le HTML existant : code édité dans une textarea, aperçu isolé et vérification DOM.
- `local` pour le CSS et les chapitres suivants : documentation et blocs de code colorés uniquement ; l’activité présente les fichiers, étapes, résultat attendu, indice et cases d’autoévaluation. Aucun code de l’étudiant n’est exécuté dans la plateforme.

Application sélectionne EmbeddedApplication ou LocalApplication. Atelier réutilise ce choix. Exemple affiche soit l’aperçu HTML, soit des extraits nommés à reproduire localement. CoursSection prend en charge HTML, CSS, arborescences, images et liens de référence.

## Wireframe d’une notion CSS

```text
En-tête : logo / thème / parcours mobile
┌ Parcours fixe ──────┬ Notion CSS ────────────────────────┐
│ Progression globale │ Titre, objectif, durée             │
│ HTML : progression  │ Repère « VS Code + navigateur »   │
│ CSS : progression   │ Cours → Exemple → Pratique locale │
│  Notions / statuts   │ Documentation et code coloré      │
│  Atelier local      │ Exemple avec noms des fichiers    │
│                     │ Consignes à réaliser sur sa machine│
│                     │ Résultat attendu / indice         │
│                     │ Cases « Je vérifie mon travail »  │
│                     │ Déclarer le travail terminé       │
│                     │ Précédent / Continuer             │
└─────────────────────┴────────────────────────────────────┘
```

## Wireframe de la landing page

```text
┌ azicode62 ─ La méthode ─ Formations ─ Commencer ─ thème ┐
│                                                          │
│  École de codage · Azilal     Illustration d’un codeur   │
│  Apprendre à coder.            achievements.js           │
│  Construire pour de vrai.      fonction → tableau        │
│  [Découvrir le parcours] [Notre méthode]                │
│  ✓ français  ✓ projets  ✓ rythme libre                  │
│                                                          │
│  La méthode : Comprendre · Pratiquer · Construire         │
│  Les formations : [Full Stack JS] [React verrouillée]     │
│                      [Node verrouillée] [Données verrouillée]
│  Votre code vous appartient · pratique 100 % locale       │
└──────────────────────────────────────────────────────────┘
```

Sur mobile, le parcours est accessible dans l’en-tête fixe et s’ouvre en panneau. Le contenu reprend la même séquence sur une colonne. L’atelier ajoute les objectifs et livrables : index.html, css/styles.css et README.txt.

## État persistant

Les acquis et brouillons HTML gardent leurs clés `v1`. Les nouveaux acquis CSS sont préfixés par leur route. Les cases locales utilisent un stockage distinct et versionné, avec identifiants stables. Décocher un critère invalide uniquement la déclaration de fin de l’exercice local, pas le cours ni l’exemple.

Les compteurs sont calculés sur les données publiées : 16 étapes HTML et 31 CSS, soit 47. Ajouter un chapitre change le dénominateur sans supprimer les acquis.

## Limites explicites

Pas d’accès automatique au disque étudiant, pas d’ouverture automatique de VS Code, pas de correction distante, de notation ou de synchronisation de compte. Les fichiers restent dans le dossier de l’étudiant. La plateforme conserve seulement les cases et déclarations ; le formateur peut demander une démonstration du projet.
