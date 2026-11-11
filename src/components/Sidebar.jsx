import { useEffect, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, Code2, Compass, Trophy } from 'lucide-react';
import { getProgress, isItemComplete, isStepDone, learningSteps } from '../lib/curriculum';

export function Sidebar({ chapters, items, page, activeChapter, mobile, progress, localChecks, navigate }) {
  const [expanded, setExpanded] = useState([activeChapter]);
  useEffect(() => { setExpanded([activeChapter]); }, [activeChapter]);
  const global = getProgress(items, progress);
  function toggle(id) { setExpanded(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]); }
  return (
    <aside className={`sidebar ${mobile ? 'open' : ''}`} aria-label="Parcours de formation">
      <button className="back-link" onClick={() => navigate('sommaire')}><ArrowLeft size={16}/> Vue d’ensemble</button>
      <div className="course-name"><span className="course-symbol"><Code2/></span><div><span className="eyebrow">VOTRE FORMATION</span><h2>Développeur Full Stack<br/>JavaScript</h2></div></div>
      <div className="progress-heading"><span>Progression du parcours publié</span><strong>{global.percent}%</strong></div>
      <progress value={global.percent} max="100" aria-label="Progression globale"/>
      <span className="small">{global.count} / {global.total} étapes franchies</span>
      <div className="sidebar-divider"/>
      {chapters.map(chapter => {
        const chapterItems = items.filter(item => item.chapterId === chapter.id);
        const stats = getProgress(chapterItems, progress);
        const open = expanded.includes(chapter.id);
        return <section className="sidebar-chapter" key={chapter.id}>
          <button className="chapter-heading chapter-toggle" onClick={() => toggle(chapter.id)} aria-expanded={open} aria-controls={`chapter-${chapter.id}`}>
            <span className="chapter-index">{chapter.number}</span><strong>{chapter.title}</strong><ChevronDown className={open ? '' : 'collapsed-chevron'} size={16}/>
          </button>
          <div className="chapter-progress"><progress value={stats.percent} max="100" aria-label={`Progression du chapitre ${chapter.id.toUpperCase()}`}/><span>{stats.percent}%</span></div>
          <nav className="notion-nav" id={`chapter-${chapter.id}`} hidden={!open} aria-label={chapter.title}>
            {chapterItems.map(item => {
              const complete = isItemComplete(progress, item);
              const started = page === item.route || learningSteps.some(step => isStepDone(progress, item.route, step)) || Object.values(localChecks[item.route] || {}).some(value => value === true);
              return <button key={item.route} className={`${page === item.route ? 'selected' : ''} ${item.isWorkshop ? 'atelier-link' : ''}`} onClick={() => navigate(item.route)} aria-current={page === item.route ? 'page' : undefined}>
                <span className={`status ${complete ? 'done' : ''}`}>{complete ? <Check size={13}/> : item.isWorkshop ? <Trophy size={15}/> : String(item.index + 1).padStart(2, '0')}</span>
                <span>{item.title}<small>{complete ? 'Terminé' : started ? 'En cours' : 'À faire'}</small></span>
              </button>;
            })}
          </nav>
        </section>;
      })}
      <div className="coming"><span>03</span><div>JavaScript & interactions<small>À venir · pratique locale</small></div></div>
      <div className="coming"><span>04</span><div>Le développement Full Stack<small>À venir · pratique locale</small></div></div>
      <div className="sidebar-note"><Compass size={21}/><div><strong>Votre rythme, votre parcours.</strong><p>La navigation est libre. À partir de CSS, vous pratiquez dans VS Code.</p></div></div>
    </aside>
  );
}
