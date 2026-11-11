import html from './html.json';
import css from './css.json';

// Ajouter un chapitre ici suffit pour alimenter le parcours et ses compteurs.
export const chapters = [
  { ...html, number: '01', practiceMode: 'embedded' },
  { ...css, number: '02', practiceMode: 'local' },
];
