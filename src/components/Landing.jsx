import { ArrowRight, BookOpen, Check, Code2, Layers, Monitor, Sparkles } from 'lucide-react';
import { teachingMethod } from '../content/landing';

const documentationChapters = [
  { number: '01', title: 'HTML', description: 'Structurer des pages web claires, sémantiques et accessibles.' },
  { number: '02', title: 'CSS', description: 'Mettre en page, adapter aux écrans et construire une identité visuelle.' },
  { number: '03', title: 'JavaScript', description: 'Rendre les interfaces interactives et comprendre la logique du langage.' },
  { number: '04', title: 'Full Stack', description: 'Relier interface, serveur et données dans une application complète.' },
];

export function Landing({ navigate, headingRef }) {
  return <div className="landing-page">
    <section className="landing-hero" id="accueil" aria-labelledby="landing-title">
      <div className="landing-hero-grid" aria-hidden="true"/>
      <div className="landing-hero-inner">
        <div className="landing-copy">
          <span className="landing-kicker"><span className="live-dot"/> DOCUMENTATION · ÉCOLE DE CODAGE AZICODE62</span>
          <h1 id="landing-title" tabIndex="-1" ref={headingRef}>De zéro au<br/><em>Full Stack JavaScript.</em></h1>
          <p>Une documentation progressive en français pour apprendre le développement web, pratiquer chaque notion et construire des applications complètes.</p>
          <div className="landing-actions"><button className="landing-primary" onClick={() => navigate('sommaire')}>Accéder au contenu <ArrowRight size={17}/></button></div>
          <div className="landing-proof"><span><Check size={15}/> Explications structurées</span><span><Check size={15}/> Exercices guidés</span><span><Check size={15}/> Projets concrets</span></div>
        </div>
        <div className="hero-illustration" aria-label="Illustration d’un développeur qui code sur son ordinateur">
          <span className="hero-illustration-glow" aria-hidden="true" />
          <img src="/developer-activity.svg" alt="Un développeur travaille sur son ordinateur, entouré d’éléments de code." />
          <div className="hero-float-card"><span className="float-icon"><Sparkles size={16}/></span><div><strong>Chaque étape compte</strong><span>Progression · réussites</span></div><span className="float-check"><Check size={15}/></span></div>
        </div>
      </div>
    </section>

    <section className="landing-section method-section" aria-labelledby="method-title">
      <div className="section-heading-row"><div><span className="landing-eyebrow">UNE DOCUMENTATION PÉDAGOGIQUE</span><h2 id="method-title">Comprendre. Pratiquer.<br/><em>Construire.</em></h2></div><p>Chaque page va à l’essentiel : une notion expliquée, un exemple lisible et une mise en pratique pour vérifier ce que vous avez compris.</p></div>
      <div className="method-grid">{teachingMethod.map(step => <article className="method-card" key={step.number}><span className="method-number">{step.number}</span><div className="method-icon">{step.number === '01' ? <BookOpen size={21}/> : step.number === '02' ? <Code2 size={21}/> : <Layers size={21}/>}</div><h3>{step.title}</h3><p>{step.description}</p><span className="method-arrow">↘</span></article>)}</div>
    </section>

    <section className="landing-section documentation-section" aria-labelledby="documentation-title">
      <div className="section-heading-row documentation-heading"><div><span className="landing-eyebrow">LE PARCOURS DOCUMENTAIRE</span><h2 id="documentation-title">Un chemin clair vers<br/><em>le développement complet.</em></h2></div><p>Les chapitres suivent l’ordre naturel de construction d’une application web et réutilisent les acquis précédents.</p></div>
      <div className="documentation-grid">{documentationChapters.map(chapter => <article className="documentation-card" key={chapter.number}><span>{chapter.number}</span><h3>{chapter.title}</h3><p>{chapter.description}</p></article>)}</div>
    </section>

    <section className="landing-section local-section" aria-labelledby="local-title"><div className="local-card"><div className="local-card-icon"><Monitor size={28}/></div><div><span className="landing-eyebrow">APPRENDRE COMME UN DÉVELOPPEUR</span><h2 id="local-title">La documentation guide. Vous écrivez le code.</h2><p>Vous créez vos fichiers, testez dans le navigateur et apprenez à corriger vos erreurs. Les explications restent à portée de main pendant que votre projet prend forme.</p></div><div className="local-stat"><strong>100%</strong><span>orienté pratique</span></div></div></section>

    <footer className="landing-footer"><a className="brand landing-brand" href="#accueil"><span className="brand-mark"><Code2 size={23}/></span>azicode<span>62</span></a><span>Une école de codage, depuis Azilal.</span></footer>
  </div>;
}
