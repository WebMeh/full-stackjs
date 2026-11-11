export const teachingMethod = [
  {
    number: '01',
    title: 'Comprendre',
    description: 'Des cours qui ressemblent à une documentation claire : concepts, schémas, exemples et vocabulaire utile.',
  },
  {
    number: '02',
    title: 'Pratiquer',
    description: 'Chaque notion devient une action. À partir de CSS, les étudiants codent dans VS Code et testent dans leur navigateur.',
  },
  {
    number: '03',
    title: 'Construire',
    description: 'Les notions se rejoignent dans un atelier final : un projet personnel à expliquer et à améliorer.',
  },
];

export const heroCode = `function getFormationAchievements(progress) {
  const achievements = [];

  if (progress.html >= 100) achievements.push('HTML maîtrisé');
  if (progress.css >= 100) achievements.push('CSS en place');
  if (progress.projects >= 1) achievements.push('Premier projet');
  if (progress.fullStack >= 100) achievements.push('Prêt pour le Full Stack');

  return achievements;
}`;

export const trainingCatalog = [
  {
    id: 'fullstack-js',
    title: 'Full Stack JavaScript',
    description: 'De la première balise HTML aux applications web complètes avec JavaScript.',
    meta: 'Parcours disponible',
    level: 'Débutant → avancé',
    accent: 'lime',
    available: true,
  },
  {
    id: 'frontend-react',
    title: 'Frontend React',
    description: 'Construire des interfaces réactives, accessibles et maintenables.',
    meta: 'Bientôt disponible',
    level: 'Intermédiaire',
    accent: 'blue',
    available: false,
  },
  {
    id: 'backend-node',
    title: 'Backend Node.js & APIs',
    description: 'Créer des serveurs solides, des API et des services qui tiennent la charge.',
    meta: 'Bientôt disponible',
    level: 'Intermédiaire',
    accent: 'orange',
    available: false,
  },
  {
    id: 'data-devops',
    title: 'Données & mise en production',
    description: 'Bases de données, Git et déploiement pour donner vie aux projets.',
    meta: 'Bientôt disponible',
    level: 'Avancé',
    accent: 'violet',
    available: false,
  },
];
