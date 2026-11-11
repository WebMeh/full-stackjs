import { Trophy, Target, CheckCircle2 } from 'lucide-react';
import { Application } from './Application';

export function Atelier({ workshop, mode = 'embedded', ...props }) {
  const local = mode === 'local';
  return <>
    <div className="workshop-banner"><Trophy size={32}/><div><span>ATELIER DE FIN DE CHAPITRE</span><h2>Une page. Toutes vos nouvelles compétences.</h2><p>{local ? 'Réalisez le projet dans VS Code et présentez le résultat dans votre navigateur.' : 'Construisez, testez, puis prenez un instant pour mesurer le chemin parcouru.'}</p></div></div>
    <section className="content-section">
      <div className="section-label"><Target size={18}/> OBJECTIFS</div>
      <ul className="objectives">{workshop.objectives.map(x => <li key={x}><CheckCircle2 size={19}/>{x}</li>)}</ul>
      <h2>Critères de réussite</h2>
      <ul>{workshop.checks.map(c => <li key={c.id || c.label}>{c.label}</li>)}</ul>
      <p className="small">{local ? 'Préparez les fichiers demandés et une démonstration pour votre formateur. Les cases ci-dessous enregistrent votre autoévaluation, pas une validation du formateur.' : 'Après validation technique, vérifiez manuellement la pertinence des textes, le plan des titres et la description de l’image.'}</p>
    </section>
    <Application {...props} mode={mode} exercise={workshop} workshop/>
  </>;
}
