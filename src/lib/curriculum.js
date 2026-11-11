export const learningSteps = ['cours', 'exemple', 'application'];

export function createCurriculum(chapters) {
  return chapters.flatMap(chapter => [...chapter.notions, chapter.workshop].map((notion, index) => ({
    ...notion,
    chapterId: chapter.id,
    // Conserver les anciens liens et acquis HTML, sans migration destructive.
    route: chapter.id === 'html' ? notion.id : `${chapter.id}/${notion.id}`,
    isWorkshop: index === chapter.notions.length,
    index,
  })));
}

export function isStepDone(progress, route, step) {
  return progress[`${route}.${step}`] === true;
}

export function isItemComplete(progress, item) {
  return (item.isWorkshop ? ['application'] : learningSteps).every(step => isStepDone(progress, item.route, step));
}

export function getProgress(items, progress) {
  let total = 0;
  let count = 0;
  for (const item of items) {
    const steps = item.isWorkshop ? ['application'] : learningSteps;
    total += steps.length;
    count += steps.filter(step => isStepDone(progress, item.route, step)).length;
  }
  return { count, total, percent: total ? Math.round(count / total * 100) : 0 };
}

export function localChecklistComplete(checks, values) {
  return checks.length > 0 && checks.every(check => values?.[check.id] === true);
}
