/**
 * Genera los PDF de descarga (reglamento × es/eu/en) en public/descargas/.
 * Uso: node tools/make-pdfs.mjs   (necesita Playwright con Chromium)
 * Edita el contenido en tools/docs/*.mjs y la fecha de versión en tools/data/hechos.json (docsVersion).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import reglamento from './docs/reglamento.mjs';
import es from './i18n/es.mjs'; import eu from './i18n/eu.mjs'; import en from './i18n/en.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = resolve(ROOT, 'public');
const H = JSON.parse(readFileSync(resolve(ROOT, 'tools/data/hechos.json'), 'utf8'));
const LANGS = { es, eu, en };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MONTHS = { es: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'], eu: ['urtarrila','otsaila','martxoa','apirila','maiatza','ekaina','uztaila','abuztua','iraila','urria','azaroa','abendua'], en: ['January','February','March','April','May','June','July','August','September','October','November','December'] };
const date = (iso, l) => { const [y, m, d] = iso.split('-').map(Number); return l === 'es' ? `${d} de ${MONTHS.es[m-1]} de ${y}` : l === 'eu' ? `${y}ko ${MONTHS.eu[m-1]}ren ${d}a` : `${d} ${MONTHS.en[m-1]} ${y}`; };
const LBL = { es: { ed: 'I Edición · 20–31 de octubre de 2027', ver: 'Versión', pg: 'Página' }, eu: { ed: 'I. Edizioa · 2027ko urriaren 20–31', ver: 'Bertsioa', pg: 'Orria' }, en: { ed: '1st Edition · 20–31 October 2027', ver: 'Version', pg: 'Page' } };

const CSS = `
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-800-normal.woff2);font-weight:700 900}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-500-normal.woff2);font-weight:500}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-700-normal.woff2);font-weight:700 800}
@page{size:A4;margin:20mm 18mm 22mm}
*{box-sizing:border-box}html{background:#0B0908;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font:400 8.8pt/1.7 M,'Courier New',monospace;color:#F3EBDA;background:#0B0908;text-align:justify;hyphens:auto}
.cover{padding:6mm 0 8mm;margin-bottom:8mm}
.brand{font:500 8pt/1 M;letter-spacing:.18em;text-transform:uppercase;color:#F3EBDA}
h1{font:800 30pt/1.02 F;letter-spacing:-.03em;text-transform:uppercase;margin:7mm 0 4mm;text-align:left}
.sub{font:400 10.5pt/1.6 M;max-width:150mm;margin:0 0 6mm}
.meta{font:500 8.5pt/1.4 M;color:#A89F8E}
h2{font:600 11pt/1.3 M;letter-spacing:.06em;text-transform:uppercase;margin:9mm 0 3mm;color:#F3EBDA;break-after:avoid;text-align:left}
p{margin:0 0 3mm;orphans:3;widows:3}
table{width:100%;border-collapse:collapse;margin:3mm 0 4mm;font-size:8.6pt}
th,td{text-align:left;vertical-align:top;padding:3mm 2mm;border-bottom:.6pt solid #3A3430;break-inside:avoid}
tbody th{font:600 8pt/1.5 M;letter-spacing:.08em;text-transform:uppercase;color:#A89F8E;width:34%}
td{text-align:justify}
.foot{margin-top:10mm;padding-top:4mm;font-size:8.5pt;color:#A89F8E;text-align:left}
a{color:#F3EBDA}
`;

function render(kind, lang, d) {
  const L = LBL[lang];
  const ver = `${L.ver}: ${date(H.docsVersion, lang)}`;
  const body = `<table><tbody>${d.rows.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table>
<p>${esc(d.contact)} <a href="mailto:${H.email}">${H.email}</a>.</p>`;
  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>Ultra Trail Larre® · ${esc(d.title)}</title><style>${CSS}</style><body>
<div class="cover"><div class="brand">Ultra Trail Larre®</div><h1>${esc(d.title)}</h1><p class="sub">${esc(d.sub)}</p><div class="meta">${esc(L.ed)} · ${esc(ver)}</div></div>
${body}
<div class="foot">${H.origen.replace('https://', '')} · <a href="mailto:${H.email}">${H.email}</a> · Instagram @${H.instagram}</div></body></html>`;
}

const { chromium } = createRequire(import.meta.url)('playwright');
mkdirSync(resolve(PUB, 'descargas'), { recursive: true });
const b = await chromium.launch();
const p = await b.newPage();
for (const [kind, src] of [['reglamento', reglamento]]) {
  for (const lang of ['es', 'eu', 'en']) {
    const tmp = `/tmp/doc-${kind}-${lang}.html`;
    writeFileSync(tmp, render(kind, lang, src[lang]));
    await p.goto('file://' + tmp);
    await p.evaluate(() => document.fonts.ready);
    const out = resolve(PUB, `descargas/ultra-trail-larre-${kind}-${lang}.pdf`);
    await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(out.replace(ROOT + '/', ''));
  }
}
await b.close();
