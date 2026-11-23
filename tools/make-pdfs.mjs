/**
 * Genera el PDF del reglamento (es/eu/en) en public/descargas/, a partir del
 * MISMO contenido que la página web (tools/i18n/*.mjs → legal.reg), para que
 * la web y el PDF nunca puedan desincronizarse.
 * Uso: node tools/make-pdfs.mjs   (necesita Playwright con Chromium; en un
 * entorno sin Chromium descargable, exporta CHROME_PATH=/ruta/a/chrome)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import es from './i18n/es.mjs'; import eu from './i18n/eu.mjs'; import en from './i18n/en.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = resolve(ROOT, 'public');
const H = JSON.parse(readFileSync(resolve(ROOT, 'tools/data/hechos.json'), 'utf8'));
const LANGS = { es, eu, en };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const fill = (s, map) => String(s).replace(/\{(\w+)\}/g, (_, k) => (k in map ? map[k] : `{${k}}`));
const LBL = { es: { ed: 'I Edición · 29–31 de octubre de 2027', ver: 'Versión', pg: 'Página' }, eu: { ed: 'I. Edizioa · 2027ko urriaren 29–31', ver: 'Bertsioa', pg: 'Orria' }, en: { ed: '1st Edition · 29–31 October 2027', ver: 'Version', pg: 'Page' } };

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
body{margin:0;font:400 8.8pt/1.65 M,'Courier New',monospace;color:#F3EBDA;background:#0B0908;text-align:justify;hyphens:auto}
.cover{padding:6mm 0 8mm;margin-bottom:4mm}
.brand{font:500 8pt/1 M;letter-spacing:.18em;text-transform:uppercase;color:#F3EBDA}
h1{font:800 26pt/1.05 F;letter-spacing:-.03em;text-transform:uppercase;margin:7mm 0 4mm;text-align:left}
.sub{font:400 10.5pt/1.6 M;max-width:150mm;margin:0 0 6mm}
.meta{font:500 8.5pt/1.4 M;color:#A89F8E}
h2{font:600 10.3pt/1.3 M;letter-spacing:.04em;text-transform:uppercase;margin:6mm 0 2mm;color:#F3EBDA;break-after:avoid;text-align:left}
p{margin:0 0 2.6mm;orphans:3;widows:3}
.foot{margin-top:8mm;padding-top:4mm;font-size:8.5pt;color:#A89F8E;text-align:left}
a{color:#F3EBDA}
strong{color:#F3EBDA}
`;

function render(lang, L) {
  const l = LBL[lang];
  const linkMap = { priv: `${H.origen}${LANGS[lang].paths.priv}`, aviso: `${H.origen}${LANGS[lang].paths.aviso}` };
  const body = L.sections.map(([h, paras]) => `<h2>${esc(h)}</h2>${paras.map((p) => `<p>${fill(p, linkMap)}</p>`).join('')}`).join('');
  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>Ultra Trail Larre® · ${esc(L.title)}</title><style>${CSS}</style><body>
<div class="cover"><div class="brand">Ultra Trail Larre®</div><h1>${esc(L.title)}</h1><div class="meta">${esc(l.ed)} · ${esc(LANGS[lang].legal.updated)}: ${esc(L.date)}</div></div>
${body}
<div class="foot">${H.origen.replace('https://', '')} · <a href="mailto:${H.email}">${H.email}</a> · Instagram @${H.instagram}</div></body></html>`;
}

const { chromium } = createRequire(import.meta.url)('playwright');
mkdirSync(resolve(PUB, 'descargas'), { recursive: true });
const b = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const p = await b.newPage();
for (const lang of ['es', 'eu', 'en']) {
  const L = LANGS[lang].legal.reg;
  const tmp = `/tmp/doc-reglamento-${lang}.html`;
  writeFileSync(tmp, render(lang, L));
  await p.goto('file://' + tmp);
  await p.evaluate(() => document.fonts.ready);
  const out = resolve(PUB, `descargas/ultra-trail-larre-reglamento-${lang}.pdf`);
  await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log(out.replace(ROOT + '/', ''));
}
await b.close();
