import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { createCurriculum, getProgress, isItemComplete, localChecklistComplete } from './curriculum.js';
const readChapter = name => JSON.parse(readFileSync(new URL(`../content/${name}.json`, import.meta.url), 'utf8').replace(/^\uFEFF/, ''));
const html = readChapter('html');
const css = readChapter('css');
const items = createCurriculum([html, css]);

test('anciens liens et acquis HTML conservés, ateliers indépendants', () => {
  assert.equal(items[0].route, 'structure');
  const htmlWorkshop = items.find(item => item.route === 'atelier');
  const cssWorkshop = items.find(item => item.route === 'css/atelier');
  const progress = { 'atelier.application': true, 'structure.cours': true };
  assert.equal(isItemComplete(progress, htmlWorkshop), true);
  assert.equal(isItemComplete(progress, cssWorkshop), false);
  assert.equal(new Set(items.map(item => item.route)).size, items.length);
  assert.deepEqual(getProgress(items.filter(item => item.chapterId === 'html'), progress), { count: 2, total: 16, percent: 13 });
});

test('progression globale calculée sur les deux chapitres', () => {
  const progress = { 'css/atelier.application': true, 'css/poste-local.cours': true, 'structure.exemple': true, 'unknown.cours': true };
  assert.deepEqual(getProgress(items, progress), { count: 3, total: 47, percent: 6 });
  assert.deepEqual(getProgress([], progress), { count: 0, total: 0, percent: 0 });
});

test('chaque activité CSS est locale, guidée et autoévaluée', () => {
  assert.equal(css.notions.length, 10);
  for (const notion of css.notions) {
    assert.ok(notion.sections.length >= 3, notion.id);
    assert.ok(notion.example.files.length > 0, notion.id);
    assert.ok(notion.example.expected, notion.id);
  }
  for (const exercise of [...css.notions.map(notion => notion.exercise), css.workshop]) {
    assert.ok(exercise.tasks.length >= 3, exercise.title);
    assert.ok(exercise.files.length > 0 && exercise.expected && exercise.hint, exercise.title);
    assert.ok(exercise.checks.every(check => check.id && check.label && !check.selector), exercise.title);
    assert.equal(new Set(exercise.checks.map(check => check.id)).size, exercise.checks.length);
    assert.equal(exercise.starter, undefined);
    assert.equal(localChecklistComplete(exercise.checks, {}), false);
    const values = Object.fromEntries(exercise.checks.map(check => [check.id, true]));
    assert.equal(localChecklistComplete(exercise.checks, values), true);
    values[exercise.checks[0].id] = false;
    assert.equal(localChecklistComplete(exercise.checks, values), false);
  }
  assert.equal(localChecklistComplete([], {}), false);
});

test('le parcours crée le HTML avant la feuille CSS et fournit un document autonome', () => {
  const first = css.notions[0];
  assert.deepEqual(first.exercise.files, ['azicode62-css/index.html']);
  const doc = new JSDOM(first.example.files[0].code).window.document;
  assert.equal(doc.querySelector('style, link[rel=stylesheet], [style]'), null);
  assert.equal(doc.documentElement.lang, 'fr');
  assert.equal(doc.querySelectorAll('.projets > .carte').length, 3);
  for (const link of doc.querySelectorAll('a[href^="#"]')) assert.ok(doc.querySelector(link.getAttribute('href')));
  assert.ok(css.notions[1].example.files.some(file => file.filename === 'css/styles.css'));
  assert.ok(css.notions[1].example.files[0].code.includes('href="css/styles.css"'));
});
