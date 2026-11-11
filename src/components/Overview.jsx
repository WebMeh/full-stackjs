import { ArrowRight, Code2, GraduationCap, Monitor } from 'lucide-react';
import { getProgress, isItemComplete } from '../lib/curriculum';

export function Overview({ chapters, items, progress, navigate, headingRef }) {
  return <>
    <div className="breadcrumb">Ma formation <span>/</span> Mon parcours</div>
    <div className="page-intro"><span className="pill"><GraduationCap size={14}/> APPRENDRE EN CONSTRUISANT</span><h1 tabIndex="-1" ref={headingRef}>Votre prochaine ligne<br/>commence ici.</h1><p>De votre première balise à votre première application.<br/>Un parcours Full Stack JavaScript, depuis Azilal.</p></div>
    {chapters.map(chapter => {
      const chapterItems = items.filter(item => item.chapterId === chapter.id);
      const stats = getProgress(chapterItems, progress);
      const minutes = chapterItems.reduce((sum, item) => sum + item.duration, 0);
      return <section key={chapter.id} className="overview-chapter">
        <div className="overview-card">
          <div className="overview-icon">{chapter.practiceMode === 'local' ? <Monitor size={40}/> : <Code2 size={40}/>}</div>
          <div><span className="eyebrow">CHAPITRE {chapter.number} · DÉBUTANT</span><h2>{chapter.title}</h2><p>{chapter.description}</p><span className="small">{chapter.notions.length} notions · 1 atelier · environ {Math.floor(minutes / 60)} h {minutes % 60 || ''} · {chapter.practiceMode === 'local' ? 'VS Code + navigateur' : 'Pratique dans la plateforme'}</span></div>
          <button className="primary" onClick={() => navigate(chapterItems.find(item => !isItemComplete(progress, item))?.route || chapterItems[0].route)}>{stats.count ? 'Reprendre' : 'Commencer'}<ArrowRight size={16}/></button>
        </div>
        <div className="overview-progress"><span>{stats.count} / {stats.total} étapes</span><progress value={stats.percent} max="100" aria-label={`Avancement ${chapter.title}`}/><strong>{stats.percent}%</strong></div>
        <div className="overview-list">{chapterItems.map(item => <button key={item.route} onClick={() => navigate(item.route)}><span className="section-number">{String(item.index + 1).padStart(2, '0')}</span><span>{item.title}<small>{item.duration} min · {isItemComplete(progress, item) ? 'Terminé' : 'Accessible'}</small></span><ArrowRight size={18}/></button>)}</div>
      </section>;
    })}
    <p className="small">Les chapitres JavaScript et Full Stack seront ajoutés ensuite. Leur pratique se déroulera également sur votre ordinateur.</p>
  </>;
}
