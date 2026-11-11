import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, Code2, Menu, Moon, Sun, Trophy, X, Clock, Layers, Monitor } from 'lucide-react';
import { createCurriculum, isStepDone, learningSteps } from './lib/curriculum';
import { usePersistedState, isRecord } from './hooks/usePersistedState';
import { CoursSection } from './components/CoursSection';
import { Exemple } from './components/Exemple';
import { Application } from './components/Application';
import { Atelier } from './components/Atelier';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/Overview';
import { Landing } from './components/Landing';
import { chapters as publishedChapters } from './content';

const LANDING_ROUTE = 'accueil';
function readPage() {
  const value = location.hash.slice(1);
  return value || LANDING_ROUTE;
}
function scrollToStep(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [mobile, setMobile] = useState(false);
  const [progress, setProgress, progressError] = usePersistedState('azicode62.progress.v1', {}, isRecord);
  const [drafts, setDrafts, draftError] = usePersistedState('azicode62.drafts.v1', {}, isRecord);
  const [localChecks, setLocalChecks, checksError] = usePersistedState('azicode62.local-checks.v1', {}, isRecord);
  const [theme, setTheme] = usePersistedState('azicode62.theme.v1', 'light', v => ['light', 'dark'].includes(v));
  const [notice, setNotice] = useState('');
  const chapters = publishedChapters;
  const heading = useRef(null);
  const items = createCurriculum(chapters);
  const index = items.findIndex(item => item.route === page);
  const notion = items[index];
  const chapter = chapters.find(value => value.id === notion?.chapterId) || chapters[0];
  const local = chapter?.practiceMode === 'local';
  const isLanding = page === LANDING_ROUTE;
  const isWorkshop = notion?.isWorkshop;
  const currentProgress = progress;
  const currentDrafts = drafts;
  const currentChecks = localChecks;
  const done = step => isStepDone(currentProgress, page, step);
  const code = notion && !local ? (typeof currentDrafts[page] === 'string' ? currentDrafts[page] : (notion.exercise || notion).starter) : '';

  useEffect(() => {
    const handler = () => { setPage(readPage()); setMobile(false); };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  useEffect(() => {
    if (!chapters.length || page === LANDING_ROUTE || page === 'sommaire') return;
    if (!items.some(item => item.route === page)) navigate('sommaire');
  }, [chapters, items, page]);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => {
    window.scrollTo(0, 0);
    heading.current?.focus();
    document.title = `Azicode62 · ${isLanding ? 'Documentation Full Stack JavaScript' : items.find(item => item.route === page)?.title || 'Mon parcours'}`;
  }, [page]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (!mobile) return;
    const close = event => { if (event.key === 'Escape') setMobile(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [mobile]);

  function mark(step) {
    if (done(step)) return;
    setProgress(value => ({ ...value, [`${page}.${step}`]: true }));
    setNotice(local && step === 'application' ? 'Travail local déclaré terminé. Bravo pour votre pratique !' : 'Un pas de plus dans votre parcours. Continuez comme ça !');
  }
  function navigate(id) { location.hash = id; setMobile(false); }
  function onCheck(id, checked) {
    setLocalChecks(value => ({ ...value, [page]: { ...(isRecord(value[page]) ? value[page] : {}), [id]: checked } }));
    if (!checked && done('application')) {
      setProgress(value => ({ ...value, [`${page}.application`]: false }));
    }
  }
  const practiceProps = {
    mode: chapter?.practiceMode || 'embedded', code,
    onCode: value => {
      setDrafts(current => ({ ...current, [page]: value }));
    },
    checks: isRecord(currentChecks[page]) ? currentChecks[page] : {}, onCheck,
    onComplete: () => mark('application'), completed: done('application'),
  };

  return <div className={`app ${isLanding ? 'landing-app' : ''}`}>
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); heading.current?.focus(); }}>Aller au contenu</a>
    <header className="topbar">
      <a className="brand" href="#accueil"><span className="brand-mark"><Code2 size={25}/></span>azicode<span>62</span></a>
      <div className="top-navigation">{isLanding ? <span className="active">Documentation Full Stack JavaScript</span> : <span className="active">Mon apprentissage</span>}<span className="school">École de codage · Azilal</span></div>
      <div className="top-actions"><span className="learning">Parcours libre · progression enregistrée dans ce navigateur</span><button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={theme === 'light' ? 'Activer le thème sombre' : 'Activer le thème clair'}>{theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}</button><button className="icon-button mobile-toggle" onClick={() => setMobile(!mobile)} aria-label="Afficher le parcours" aria-expanded={mobile}>{mobile ? <X/> : <Menu/>}</button></div>
    </header>
    {mobile && <button className="scrim" aria-label="Fermer le parcours" onClick={() => setMobile(false)}/>}
    {!isLanding && <Sidebar chapters={chapters} items={items} page={page} activeChapter={chapter.id} mobile={mobile} progress={currentProgress} localChecks={currentChecks} navigate={navigate}/>} 
    <main id="main-content">
      {(progressError || draftError || checksError) && <div role="alert" className="storage-warning">Le stockage du navigateur est indisponible : la progression et les cases ne seront pas conservées après fermeture. Vos fichiers dans VS Code ne sont pas concernés.</div>}
      {isLanding ? <Landing navigate={navigate} headingRef={heading}/> : page === 'sommaire' ? <Overview chapters={chapters} items={items} progress={currentProgress} navigate={navigate} headingRef={heading}/> : <>
        <div className="breadcrumb"><button onClick={() => navigate('sommaire')}>Mon parcours</button><span>/</span>{chapter.title}<span>/</span><strong>{isWorkshop ? 'Atelier' : `Notion ${notion.index + 1}`}</strong></div>
        <div className="lesson-layout"><div className="lesson">
          <div className="page-intro">
            <div className="intro-meta"><span className={`pill ${isWorkshop ? 'gold' : ''}`}>{isWorkshop ? <Trophy size={14}/> : <Code2 size={14}/>} {isWorkshop ? 'ATELIER FINAL' : `CHAPITRE ${chapter.number} · NOTION ${String(notion.index + 1).padStart(2, '0')}`}</span><span><Clock size={14}/>{notion.duration} min</span><span>Débutant</span></div>
            <h1 tabIndex="-1" ref={heading}>{notion.title}</h1><p>{notion.intro}</p>
          </div>
          {local && <aside className="local-banner"><Monitor size={23}/><div><strong>Votre atelier : VS Code + votre navigateur</strong><p>Suivez les consignes ici. Créez, modifiez et testez vos fichiers sur votre ordinateur. Revenez ensuite cocher vos vérifications.</p></div></aside>}
          {!isWorkshop && <nav className="steps" aria-label="Étapes de cette notion">{learningSteps.map((step, i) => <button key={step} onClick={() => scrollToStep(step)}><span className={done(step) ? 'step-done' : ''}>{done(step) ? <Check size={14}/> : i + 1}</span>{['Cours', 'Exemple', local ? 'Pratique locale' : 'Application'][i]}{i < 2 && <span className="step-line"/>}</button>)}</nav>}
          {isWorkshop ? <Atelier key={page} workshop={notion} {...practiceProps}/> : <>
            <CoursSection notion={notion} completed={done('cours')} onComplete={() => mark('cours')}/>
            <Exemple example={notion.example} mode={chapter.practiceMode} completed={done('exemple')} onComplete={() => mark('exemple')}/>
            <Application key={page} exercise={notion.exercise} {...practiceProps}/>
          </>}
          <footer className="lesson-footer"><button className="secondary" onClick={() => navigate(index > 0 ? items[index - 1].route : 'sommaire')}><ArrowLeft size={17}/>{index > 0 ? 'Précédent' : 'Sommaire'}</button><button className="primary" onClick={() => navigate(index < items.length - 1 ? items[index + 1].route : 'sommaire')}>{index < items.length - 1 ? items[index + 1].chapterId !== chapter.id ? 'Passer au chapitre suivant' : 'Continuer le parcours' : 'Retour au sommaire'}<ArrowRight size={17}/></button></footer>
        </div>
        <aside className="page-rail"><span className="eyebrow">{isWorkshop ? 'DANS CET ATELIER' : 'DANS CETTE NOTION'}</span>{!isWorkshop ? <><button onClick={() => scrollToStep('cours')}><BookOpen size={15}/>Le cours</button>{notion.sections.map((section, i) => <span className="rail-section" key={section.title}>{String(i + 1).padStart(2, '0')} {section.title}</span>)}<button onClick={() => scrollToStep('exemple')}>L’exemple</button><button onClick={() => scrollToStep('application')}>{local ? 'Pratique dans VS Code' : 'À vous de jouer'}</button></> : <p>Objectifs → consignes → {local ? 'fichiers locaux → autoévaluation' : 'code → vérification'}</p>}<div className="rail-card"><Layers size={25}/><strong>La pratique fait<br/>la différence.</strong><p>{local ? 'Écrivez dans VS Code. Enregistrez. Actualisez votre navigateur.' : 'Lisez, expérimentez, recommencez. C’est comme ça qu’on apprend.'}</p></div></aside>
        </div>
      </>}
      <div className="bottom-note">FAIT POUR APPRENDRE, DEPUIS AZILAL. <span>⟨ / ⟩</span></div>
    </main>
    <div className="toast" role="status">{notice && <span><Check size={19}/>{notice}</span>}</div>
  </div>;
}

