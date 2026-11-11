import { useState } from 'react';
import { Check, FolderOpen, Monitor, Terminal } from 'lucide-react';
import { localChecklistComplete } from '../lib/curriculum';

export function LocalApplication({ exercise, checks = {}, onCheck, completed, onComplete, readOnly = false, workshop = false }) {
  const [showHint, setShowHint] = useState(false);
  const ready = localChecklistComplete(exercise.checks, checks);
  return (
    <section className="content-section application" id="application">
        <div className="section-label"><Terminal size={17}/>{workshop ? 'PROJET LOCAL' : 'APPLICATION LOCALE'}<span>{readOnly ? 'Consultation invitée' : 'Dans VS Code et votre navigateur'}</span></div>
      <h2>{exercise.title}</h2>
      <p>{exercise.instructions}</p>
      <div className="local-files"><FolderOpen size={20}/><div><strong>Fichiers sur votre ordinateur</strong><ul>{exercise.files.map(file => <li key={file}><code>{file}</code></li>)}</ul></div></div>
      <h3>Votre feuille de route</h3>
      <ol className="local-tasks">{exercise.tasks.map(task => <li key={task}>{task}</li>)}</ol>
      <div className="local-result"><Monitor size={22}/><div><strong>Résultat attendu dans votre navigateur</strong><p>{exercise.expected}</p></div></div>
      <button className="text-button" onClick={() => setShowHint(!showHint)} aria-expanded={showHint}> {showHint ? 'Masquer l’indice' : 'Besoin d’un indice ?'}</button>
      {showHint && <p className="tip">{exercise.hint}</p>}
      <fieldset className="local-checklist">
        <legend>Je vérifie mon travail</legend>
        {exercise.checks.map(check => <label key={check.id}><input type="checkbox" checked={checks[check.id] === true} disabled={readOnly} onChange={event => onCheck(check.id, event.target.checked)}/><span>{check.label}</span></label>)}
      </fieldset>
      <p className="small">{readOnly ? 'Les invités peuvent lire les consignes. Une clé étudiant est nécessaire pour renseigner ces critères et déclarer le travail terminé.' : 'Ces cases sont une autoévaluation. Azicode62 n’accède pas à vos fichiers et ne les corrige pas automatiquement. Votre formateur peut vous demander de présenter votre dossier et votre page.'}</p>
      <button className="primary" disabled={readOnly || !ready || completed} onClick={onComplete}><Check size={17}/>{readOnly ? 'Pratique réservée aux étudiants' : completed ? 'Travail local déclaré terminé' : 'J’ai réalisé et vérifié cet exercice'}</button>
      <div role="status">{completed ? <p className="success">✓ Travail déclaré terminé. Vos fichiers restent sur votre ordinateur.</p> : !ready && <p className="small">Vérifiez chaque critère avant de déclarer le travail terminé.</p>}</div>
    </section>
  );
}
