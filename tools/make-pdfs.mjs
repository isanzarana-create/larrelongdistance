/**
 * Genera los PDF de descarga (guía y reglamento × es/eu/en) en public/descargas/.
 * Uso: node tools/make-pdfs.mjs   (necesita Playwright con Chromium)
 * Edita el contenido en tools/docs/*.mjs y la fecha de versión en tools/data/hechos.json (docsVersion).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import guia from './docs/guia.mjs';
import reglamento from './docs/reglamento.mjs';
import es from './i18n/es.mjs'; import eu from './i18n/eu.mjs'; import en from './i18n/en.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = resolve(ROOT, 'public');
const H = JSON.parse(readFileSync(resolve(ROOT, 'tools/data/hechos.json'), 'utf8'));
const LANGS = { es, eu, en };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const MONTHS = { es: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'], eu: ['urtarrila','otsaila','martxoa','apirila','maiatza','ekaina','uztaila','abuztua','iraila','urria','azaroa','abendua'], en: ['January','February','March','April','May','June','July','August','September','October','November','December'] };
const date = (iso, l) => { const [y, m, d] = iso.split('-').map(Number); return l === 'es' ? `${d} de ${MONTHS.es[m-1]} de ${y}` : l === 'eu' ? `${y}ko ${MONTHS.eu[m-1]}ren ${d}a` : `${d} ${MONTHS.en[m-1]} ${y}`; };
const LBL = { es: { ed: 'I Edición · otoño de 2027', ver: 'Versión', pg: 'Página' }, eu: { ed: 'I. Edizioa · 2027ko udazkena', ver: 'Bertsioa', pg: 'Orria' }, en: { ed: '1st Edition · autumn 2027', ver: 'Version', pg: 'Page' } };

const CSS = `
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-800-normal.woff2);font-weight:700 900}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-500-normal.woff2);font-weight:500}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-700-normal.woff2);font-weight:700 800}
@page{size:A4;margin:20mm 18mm 22mm}
*{box-sizing:border-box}html{background:#EFE6D2;-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font:400 8.8pt/1.7 M,'Courier New',monospace;color:#1F1915;background:#EFE6D2}
.cover{padding:6mm 0 8mm;border-bottom:1.5pt solid #7A1F2B;margin-bottom:8mm}
.brand{font:700 8pt/1 M;letter-spacing:.18em;text-transform:uppercase;color:#7A1F2B}
h1{font:800 30pt/1.02 F;letter-spacing:-.03em;text-transform:uppercase;margin:7mm 0 4mm}
.sub{font:400 10.5pt/1.6 M;max-width:150mm;margin:0 0 6mm}
.meta{font:600 8.5pt/1.4 M;color:#4B4036}
h2{font:600 11pt/1.3 M;letter-spacing:.06em;text-transform:uppercase;margin:9mm 0 3mm;color:#1F1915;break-after:avoid}
p{margin:0 0 3mm;orphans:3;widows:3}
ul,ol{margin:0 0 3mm;padding-left:5mm}li{margin-bottom:1.6mm}
table{width:100%;border-collapse:collapse;margin:3mm 0 4mm;font-size:8.6pt;break-inside:avoid}
th,td{text-align:left;vertical-align:top;padding:2.2mm 2mm;border-bottom:.6pt solid #CDBE9C}
th{font:700 8pt/1.3 M;letter-spacing:.08em;text-transform:uppercase;color:#4B4036;border-bottom:1pt solid #7A6D57}
td:first-child,tbody th{font-weight:700;width:34%}
.step{border-left:2.5pt solid #7A1F2B;padding:1mm 0 1mm 4mm;margin:0 0 3.5mm;break-inside:avoid}
.step b{display:block;font:600 9.5pt/1.4 M;margin-bottom:1mm}
.box{background:#F9F4E7;border:.6pt solid #CDBE9C;border-left:2.5pt solid #7A1F2B;border-radius:2mm;padding:4mm 5mm;margin:6mm 0;break-inside:avoid}
.box h2{margin-top:0}
.foot{margin-top:10mm;padding-top:4mm;border-top:.6pt solid #CDBE9C;font-size:9pt;color:#4B4036}
a{color:#7A1F2B}
`;

const table = (t) => `<table><thead><tr>${t.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${t.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row" style="text-transform:none;letter-spacing:0;font-size:9.8pt;color:#1F1915">${esc(c)}</th>` : `<td>${esc(c)}</td>`)).join('')}</tr>`).join('')}</tbody></table>`;

function render(kind, lang, d) {
  const L = LBL[lang];
  const ver = `${L.ver}: ${date(H.docsVersion, lang)}`;
  let body = '';
  if (kind === 'guia') {
    body = d.sections.map((s) => `<section><h2>${esc(s.h)}</h2>${(s.p || []).map((p) => `<p>${esc(p)}</p>`).join('')}${s.table ? table(s.table) : ''}${s.list ? `<${s.ordered ? 'ol' : 'ul'}>${s.list.map((i) => `<li>${esc(i)}</li>`).join('')}</${s.ordered ? 'ol' : 'ul'}>` : ''}${(s.steps || []).map(([a, b]) => `<div class="step"><b>${esc(a)}</b>${esc(b)}</div>`).join('')}${(s.after || []).map((p) => `<p>${esc(p)}</p>`).join('')}</section>`).join('');
  } else {
    body = `<table><tbody>${d.rows.map(([a, b]) => `<tr><th scope="row" style="text-transform:none;letter-spacing:0;font-size:10pt;color:#1F1915;width:34%">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table>
<div class="box"><h2>${esc(d.pendingTitle)}</h2><ul>${d.pending.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>
<p>${esc(d.contact)} <a href="mailto:${H.email}">${H.email}</a>.</p>`;
  }
  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>Ultra Trail Larre® · ${esc(d.title)}</title><style>${CSS}</style><body>
<div class="cover"><div class="brand">Ultra Trail Larre®</div><h1>${esc(d.title)}</h1><p class="sub">${esc(d.sub)}</p><div class="meta">${esc(L.ed)} · ${esc(ver)}</div></div>
${body}
<div class="foot">${H.origen.replace('https://', '')} · <a href="mailto:${H.email}">${H.email}</a> · Instagram @${H.instagram} · ${esc(LANGS[lang].ui.footerOrg)} Musubigara®</div></body></html>`;
}

const { chromium } = createRequire(import.meta.url)('playwright');
mkdirSync(resolve(PUB, 'descargas'), { recursive: true });
const b = await chromium.launch();
const p = await b.newPage();
for (const [kind, src] of [['guia', guia], ['reglamento', reglamento]]) {
  for (const lang of ['es', 'eu', 'en']) {
    const tmp = `/tmp/doc-${kind}-${lang}.html`;
    writeFileSync(tmp, render(kind, lang, src[lang]));
    await p.goto('file://' + tmp);
    await p.evaluate(() => document.fonts.ready);
    const out = resolve(PUB, `descargas/ultra-trail-larre-${kind === 'guia' ? 'guia' : 'reglamento'}-${lang}.pdf`);
    await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(out.replace(ROOT + '/', ''));
  }
}
await b.close();
