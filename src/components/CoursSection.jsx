import { BookOpen, Lightbulb, Check } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { TextContent } from './TextContent';

export function CoursSection({ notion, completed, onComplete }) {
  return (
    <section className="content-section" id="cours">
      <div className="section-label"><BookOpen size={17}/> COURS <span>Comprendre les fondamentaux</span></div>
      {notion.sections.map((section, i) => <article key={section.title}>
        <h2><span className="section-number">{String(i + 1).padStart(2, '0')}</span>{section.title}</h2>
        <TextContent text={section.text} points={section.points}/>
        {section.code && <CodeBlock code={section.code} language={section.language} filename={section.filename}/>}
        {section.image && <figure className="content-figure"><img className="content-image" src={section.image.src} alt={section.image.alt}/>{section.image.caption && <figcaption>{section.image.caption}</figcaption>}</figure>}
      </article>)}
      <aside className="tip"><Lightbulb size={22}/><div><strong>Le réflexe développeur</strong><p>{notion.tip}</p></div></aside>
      {notion.resources && <div className="lesson-resources"><h3>Pour aller plus loin</h3><ul>{notion.resources.map(resource => <li key={resource.url}><a href={resource.url} target="_blank" rel="noreferrer">{resource.title} ↗</a></li>)}</ul></div>}
      <button className="secondary" onClick={onComplete} disabled={completed}><Check size={17}/>{completed ? 'Cours lu' : 'J’ai terminé la lecture'}</button>
    </section>
  );
}
