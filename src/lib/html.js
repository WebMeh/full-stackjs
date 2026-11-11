export function validateHTML(code, checks, Parser = DOMParser) {
  const doc = new Parser().parseFromString(code, 'text/html');
  return checks.map(check => {
    if (check.type === 'doctype') return { ...check, passed: doc.doctype?.name.toLowerCase() === 'html' };
    const elements = [...doc.querySelectorAll(check.selector)];
    const matching = elements.filter(element => (!check.text || element.textContent.trim()) && (!check.attribute || element.getAttribute(check.attribute)?.trim()));
    return { ...check, passed: check.exact !== undefined ? matching.length === check.exact : matching.length >= (check.min || 1) };
  });
}
export function previewDocument(code, origin) {
  const doc = new DOMParser().parseFromString(code, 'text/html');
  doc.querySelectorAll('script,iframe,object,embed,base,meta[http-equiv],link,style').forEach(el => el.remove());
  doc.querySelectorAll('*').forEach(el => [...el.attributes].forEach(attr => { if (/^on/i.test(attr.name) || ['style','srcset'].includes(attr.name)) el.removeAttribute(attr.name); }));
  doc.querySelectorAll('img').forEach(el => { if (el.getAttribute('src') === '/mountains.svg') el.setAttribute('src', `${origin}/mountains.svg`); else el.removeAttribute('src'); });
  doc.querySelectorAll('a,form').forEach(el => { el.removeAttribute('href'); el.removeAttribute('action'); });
  return `<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${origin}; style-src 'unsafe-inline'; form-action 'none';"><style>body{font:16px/1.6 system-ui;color:#172b23;padding:18px}img{max-width:100%;height:auto}a{color:#286953;text-decoration:underline}h1{line-height:1.2}</style></head><body>${doc.body.innerHTML}</body></html>`;
}
