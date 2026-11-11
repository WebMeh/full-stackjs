import Prism from 'prismjs';
import 'prismjs/components/prism-css';

export function CodeBlock({ code, language = 'html', filename }) {
  const grammar = language === 'html' ? Prism.languages.markup : Prism.languages[language];
  const highlighted = grammar ? Prism.highlight(code, grammar, language) : null;
  const label = filename || (language === 'css' ? 'css/styles.css' : language === 'html' ? 'index.html' : 'Arborescence');
  return (
    <div className="codebox">
      <div className="codebar"><span><i/><i/><i/></span><span>{label} <b>{language === 'text' ? 'FICHIERS' : language.toUpperCase()}</b></span></div>
      <pre>{highlighted === null ? <code>{code}</code> : <code dangerouslySetInnerHTML={{ __html: highlighted }}/>}</pre>
    </div>
  );
}
