import { FlaskConical, Check, Monitor } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { previewDocument } from '../lib/html';

export function Exemple({ example, mode = 'embedded', completed, onComplete }) {
  const local = mode === 'local';
  return (
    <section className="content-section example" id="exemple">
      <div className="section-label"><FlaskConical size={17}/> EXEMPLE <span>{local ? 'À reproduire sur votre ordinateur' : 'Voir la notion en action'}</span></div>
      <h2>{example.title || 'Du code au navigateur'}</h2>
      <p>{example.explanation}</p>
      {local ? <>
        {example.files.map(file => <CodeBlock key={file.filename} {...file}/>)}
        <div className="local-result"><Monitor size={22}/><div><strong>À observer dans votre navigateur</strong><p>{example.expected}</p></div></div>
        <p className="small">{example.run || 'Dans VS Code, enregistrez les fichiers modifiés. Dans votre navigateur, ouvrez votre index.html local et actualisez la page.'}</p>
      </> : <>
        <CodeBlock code={example.code}/>
        <div className="preview-label">APERÇU DU RÉSULTAT</div>
        <iframe title="Résultat de l’exemple" sandbox="" srcDoc={previewDocument(example.code, location.origin)}/>
      </>}
      <button className="secondary" onClick={onComplete} disabled={completed}><Check size={17}/>{completed ? 'Exemple exploré' : local ? 'J’ai reproduit et compris cet exemple' : 'J’ai compris cet exemple'}</button>
    </section>
  );
}
