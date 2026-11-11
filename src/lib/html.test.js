import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import { validateHTML, previewDocument } from './html.js';
const window = new JSDOM('').window;
globalThis.DOMParser = window.DOMParser;
const chapter = JSON.parse(readFileSync(new URL('../content/html.json', import.meta.url),'utf8').replace(/^\uFEFF/,''));
const solution = `<!doctype html><html lang="fr"><head><title>Portfolio</title></head><body><header><h1>Amal</h1></header><main><section><h2>À propos</h2><p>Je deviens <strong>développeuse</strong>.</p></section><section><h2>Objectifs</h2><p>Créer des outils utiles.</p></section><ul><li>HTML</li><li>CSS</li><li>JS</li></ul><ol><li>Lire</li><li>Coder</li><li>Tester</li></ol><img src="/mountains.svg" alt="Deux sommets"><a href="https://example.com">Ma ressource</a></main><footer>Azilal</footer></body></html>`;
test('le portfolio complet satisfait les critères de chaque notion et de l’atelier',()=>{
 for (const exercise of [...chapter.notions.map(n=>n.exercise),chapter.workshop]) {
  assert.ok(validateHTML(solution, exercise.checks).every(r=>r.passed),exercise.title);
 }
});
test('aucun exercice ne valide une réponse vide ou le point de départ',()=>{
 for (const exercise of [...chapter.notions.map(n=>n.exercise),chapter.workshop]) {
  assert.ok(validateHTML('',exercise.checks).some(r=>!r.passed),exercise.title);
  assert.ok(validateHTML(exercise.starter,exercise.checks).some(r=>!r.passed),exercise.title);
 }
});
test('détecte les textes vides et les main multiples',()=>{
 assert.equal(validateHTML('<h1> </h1>',[{selector:'h1',text:true}])[0].passed,false);
 assert.equal(validateHTML('<main>A</main><main>B</main>',[{selector:'main',exact:1}])[0].passed,false);
});
test('aperçu : supprime contenu actif et ressources externes',()=>{
 const output = previewDocument('<script>alert(1)</script><img src="https://example.com/a" onerror="alert(1)"><iframe src="https://example.com"></iframe><a href="https://example.com">Lien</a><img src="/mountains.svg" alt="Montagnes">','http://localhost:5173');
 const doc = new window.DOMParser().parseFromString(output,'text/html');
 assert.equal(doc.querySelector('script,iframe,[onerror],a[href]'),null);
 assert.equal(doc.querySelector('img').getAttribute('src'),null);
 assert.equal(doc.querySelectorAll('img')[1].getAttribute('src'),'http://localhost:5173/mountains.svg');
 assert.ok(doc.querySelector('meta[http-equiv="Content-Security-Policy"]'));
});
