# Azicode62 — parcours HTML et CSS

Plateforme React + Vite en français, avec une landing page éditoriale pour présenter Azicode62 et un parcours d’apprentissage libre. La version actuelle est statique, sans authentification ni worker, et prête à être déployée sur Vercel.

## Démarrer la plateforme

```sh
npm install
npm run dev
npm run build
npm run preview
```

Le build produit `dist/`. Vercel détecte la configuration de `vercel.json` et sert ce dossier comme site statique. La navigation utilise des fragments : `/` ou `#accueil` ouvre la landing page, `#sommaire` ouvre le sommaire Full Stack JavaScript, puis `#structure`, `#atelier`, `#css/poste-local` et `#css/atelier` ouvrent les contenus. Aucune API ni configuration de secrets n’est requise.

## Accueil et parcours publié

La page d’accueil présente la promesse pédagogique, la méthode « comprendre → pratiquer → construire » et un catalogue de formations. Le héros associe une illustration locale de développeur à un extrait JavaScript `getFormationAchievements(progress)` qui retourne les réussites selon la progression. Full Stack JavaScript est la carte disponible : son bouton mène au sommaire HTML/CSS existant. React, Backend Node.js et Données & mise en production sont affichés comme cartes verrouillées avec une indication « Bientôt disponible » ; elles ne sont pas des routes fictives.

## Parcours publié

- HTML : 5 notions, un atelier portfolio, 16 étapes. Code et aperçu dans la plateforme.
- CSS : 10 notions, un atelier portfolio responsive, 31 étapes. Toute la pratique dans VS Code et le navigateur de l’étudiant, environ 7 h 25 à titre indicatif.
- Total : 47 étapes. Le pourcentage global est calculé sur les chapitres publiés ; ajouter du contenu augmente le dénominateur sans effacer les acquis.

Le CSS commence volontairement par la création et le test de `index.html` seul. La deuxième notion introduit `css/styles.css` et le lien externe. Le même dossier évolue ensuite jusqu’au portfolio. Aucun Node.js, Vite ou serveur local n’est requis pour ces exercices HTML/CSS statiques : les étudiants ouvrent leurs fichiers dans le navigateur. Les commandes ci-dessus concernent la plateforme, pas leur projet.

## Architecture

```text
src/
  App.jsx                         # composition, navigation et état persistant
  content/
    index.js                      # registre des chapitres et modes de pratique
    landing.js                    # méthode pédagogique et cartes de formations
    html.json                     # cours et exercices HTML intégrés
    css.json                      # cours CSS et consignes de pratique locale
  components/
    Sidebar.jsx                   # chapitres repliables et progression
    Overview.jsx                  # sommaire généré depuis les données
    Landing.jsx                   # accueil éditorial, illustration et catalogue
    CoursSection.jsx              # texte, code coloré, images, ressources
    Exemple.jsx                   # aperçu HTML ou fichiers à reproduire localement
    Application.jsx               # sélection de l’activité locale ou intégrée
    LocalApplication.jsx          # consignes, fichiers, indices, autoévaluation
    Atelier.jsx                   # objectifs, critères et activité adaptée
    CodeBlock.jsx                 # coloration HTML/CSS et nom du fichier
  hooks/usePersistedState.js       # stockage navigateur avec repli en mémoire
  lib/
    curriculum.js                 # routes, compteurs et critères locaux
    curriculum.test.js            # compatibilité et cohérence du parcours
    html.js                       # validation HTML et aperçu isolé
    html.test.js                  # tests des exercices HTML
public/
  coder-hero.svg                  # illustration du codeur dans le héros
```

## Ajouter une notion ou un chapitre

Une notion contient `id`, `title`, `duration`, `intro`, `sections`, `tip`, `example`, `exercise`. Une section accepte `text`, `code`, `language`, `filename`, et une image facultative (`src`, `alt`, `caption`). `resources` ajoute des liens de documentation.

Pour une activité locale, `example.files` contient des blocs `{ filename, language, code }`, avec `expected` et éventuellement `run`. L’exercice contient `files`, `tasks`, `expected`, `hint` et `checks` (identifiants stables et libellés), sans validateur DOM ni éditeur. L’atelier ajoute `objectives` au même modèle.

Ajoutez le JSON d’un nouveau chapitre au registre `src/content/index.js`, avec son numéro et `practiceMode: 'local'` pour respecter le fonctionnement retenu à partir de CSS. Le sommaire, les routes, les compteurs et la navigation utilisent ce registre. Retirez l’entrée « À venir » correspondante de Sidebar lors de la publication du chapitre.

## Persistance et validation

- Les anciens fragments et clés HTML sont conservés. Les nouvelles routes et clés CSS sont préfixées par `css/` : les deux ateliers ne partagent pas leur progression.
- Cours et exemples sont marqués volontairement. Les exercices HTML utilisent leurs critères DOM existants.
- En CSS, l’étudiant coche les critères qu’il a contrôlés sur sa machine, puis déclare son travail terminé. Ce n’est ni une correction automatique ni une validation du formateur.
- Les cases sont persistées dans `azicode62.local-checks.v1`. Décocher un critère retire la déclaration de fin de cette activité ; les étapes cours/exemple restent acquises.
- La plateforme n’ouvre pas VS Code automatiquement, ne lit pas les fichiers locaux et ne les envoie nulle part. Les instructions expliquent comment ouvrir VS Code et le dossier de travail.
- Progression, brouillons HTML, cases et thème restent dans le navigateur. Pas de compte ni synchronisation entre appareils.
- Les exemples CSS sont colorés mais sans iframe ni zone de saisie. L’aperçu HTML reste isolé et sans JavaScript.

Voir `docs/chapitre-css.md` pour le déroulé et les livrables du chapitre.
