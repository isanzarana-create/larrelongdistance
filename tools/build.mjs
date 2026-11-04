#!/usr/bin/env node
/**
 * Generador del sitio de Ultra Trail Larre®.
 *   node tools/build.mjs
 * Lee tools/i18n/*.mjs + tools/data/*.json y escribe el HTML final en public/.
 * Sin dependencias. El HTML generado se versiona: Netlify publica public/ tal cual.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import es from './i18n/es.mjs';
import eu from './i18n/eu.mjs';
import en from './i18n/en.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = resolve(ROOT, 'public');
const H = JSON.parse(readFileSync(resolve(ROOT, 'tools/data/hechos.json'), 'utf8'));
const RUTA = JSON.parse(readFileSync(resolve(ROOT, 'tools/data/ruta.json'), 'utf8'));
const FIRMES = JSON.parse(readFileSync(resolve(ROOT, 'tools/data/firmes.json'), 'utf8'));
const DETALLE = JSON.parse(readFileSync(resolve(ROOT, 'public/assets/ruta.json'), 'utf8'));
const GAL = JSON.parse(readFileSync(resolve(ROOT, 'tools/data/galeria.json'), 'utf8'));
for (const ph of GAL.fotos.filter((x) => !x.oculta)) {
  for (const l of ['es', 'eu', 'en']) if (!ph.alt || !String(ph.alt[l] || '').trim()) throw new Error(`Galería: la foto ${ph.file} no tiene texto alternativo en «${l}». Complétalo en tools/data/galeria.json o márcala "oculta": true.`);
}
const SITE = JSON.parse(readFileSync(resolve(ROOT, 'tools/data/site.json'), 'utf8'));
const LANGS = { es, eu, en };
const ORDER = ['es', 'eu', 'en'];
const ORIGIN = H.origen;

// ───────────── utilidades ─────────────
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (html) => String(html).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const fmt = (n, lang) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'en' ? ',' : '.');
const fill = (s, map) => String(s).replace(/\{(\w+)\}/g, (_, k) => (k in map ? map[k] : `{${k}}`));
const hash = (file) => createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 8);
const write = (rel, content) => {
  const p = resolve(PUB, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
};
const kb = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1048576).toFixed(1)} MB`);
const MONTHS = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  eu: ['urtarrila', 'otsaila', 'martxoa', 'apirila', 'maiatza', 'ekaina', 'uztaila', 'abuztua', 'iraila', 'urria', 'azaroa', 'abendua'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
const longDate = (iso, lang) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (lang === 'es') return `${d} de ${MONTHS.es[m - 1]} de ${y}`;
  if (lang === 'eu') return `${y}ko ${MONTHS.eu[m - 1]}ren ${d}a`;
  return `${d} ${MONTHS.en[m - 1]} ${y}`;
};

const assetV = { css: hash(resolve(PUB, 'assets/larre.css')), js: hash(resolve(PUB, 'assets/app.js')) };

// PDF disponibles (los genera tools/make-pdfs.mjs)
const pdfPath = (kind, lang) => `/descargas/ultra-trail-larre-${kind}-${lang}.pdf`;
const pdfInfo = (kind, lang) => {
  const f = resolve(PUB, pdfPath(kind, lang).slice(1));
  if (!existsSync(f)) throw new Error(`Falta ${f}. Ejecuta: node tools/make-pdfs.mjs`);
  return { href: pdfPath(kind, lang), size: kb(statSync(f).size) };
};
const gpxFile = resolve(PUB, 'descargas/ultra-trail-larre.gpx');
const GPX = { href: '/descargas/ultra-trail-larre.gpx', size: kb(statSync(gpxFile).size) };

// ───────────── iconos (trazo, sin olas) ─────────────
const ICON = {
  ig: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  wa: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 20.5 11.7z"/><path d="M9.4 8.5c.2 0 .4.1.5.3l.7 1.5c.1.2 0 .4-.1.5l-.5.5c-.1.1-.1.2-.1.3.3.9 1.5 2.1 2.4 2.4.1 0 .2 0 .3-.1l.5-.5c.1-.1.3-.2.5-.1l1.5.7c.2.1.3.3.3.5 0 1-.8 1.7-1.7 1.7-2.9 0-5.9-3-5.9-5.9 0-.9.7-1.7 1.6-1.8z"/></svg>',
  map: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10.4c0 5.4-8 12.1-8 12.1s-8-6.7-8-12.1a8 8 0 0 1 16 0z"/><circle cx="12" cy="10.2" r="2.9"/></svg>',
  mail: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
  dl: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="M7 11l5 5 5-5"/><path d="M5 20h14"/></svg>',
  arrow: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>'
};

// ───────────── mapa y perfil (SVG a partir del GPX) ─────────────
function mapSvg(t, lang) {
  const pts = RUTA.mapa;
  const lat0 = 42.7;
  const kx = Math.cos((lat0 * Math.PI) / 180);
  const lats = pts.map((p) => p[0]);
  const lons = pts.map((p) => p[1]);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats), minLon = Math.min(...lons), maxLon = Math.max(...lons);
  const padL = 210, padR = 330, padY = 60, W = 900;
  const spanX = (maxLon - minLon) * kx, spanY = maxLat - minLat;
  const scale = (W - padL - padR) / spanX;
  const Hh = Math.round(spanY * scale + padY * 2);
  const X = (lon) => (lon - minLon) * kx * scale + padL;
  const Y = (lat) => (maxLat - lat) * scale + padY;
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${X(p[1]).toFixed(1)} ${Y(p[0]).toFixed(1)}`).join('');
  const place = {
    penacerrada: { lat: 42.6442584, lon: -2.7135349, side: 'l' },
    laguardia: { lat: 42.55, lon: -2.583056, side: 'l' },
    campezo: { lat: 42.669722, lon: -2.350833, side: 'r' },
    agurain: { lat: 42.8492849, lon: -2.3890554, side: 'r' }
  };
  const marks = Object.entries(place).map(([k, p]) => {
    const x = X(p.lon), y = Y(p.lat);
    const name = t.route.towns[k].replace(/ \(.*\)$/, '');
    const anchor = p.side === 'l' ? 'end' : 'start';
    const tx = p.side === 'l' ? x - 20 : x + 20;
    return `<g><circle class="m-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9"/><text class="m-txt" x="${tx.toFixed(1)}" y="${(y + 7).toFixed(1)}" text-anchor="${anchor}">${esc(name)}</text></g>`;
  });
  const sx = X(RUTA.start.lon), sy = Y(RUTA.start.lat);
  const start = `<g><circle class="m-start-ring" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="17"/><circle class="m-start" cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="8"/><text class="m-txt m-txt-b" x="${(sx - 28).toFixed(1)}" y="${(sy + 8).toFixed(1)}" text-anchor="end">${esc(t.route.startLabel)}</text></g>`;
  const anchors = [[X(RUTA.start.lon), Y(RUTA.start.lat)], ...Object.values(place).map((o) => [X(o.lon), Y(o.lat)])];
  const kmMarks = DETALLE.p.filter((q) => q[0] > 0 && Math.abs(q[0] / 25 - Math.round(q[0] / 25)) < 1e-6 && q[0] < DETALLE.total - 5 && anchors.every((a) => Math.hypot(a[0] - X(q[2]), a[1] - Y(q[1])) > 60)).map((q) => `<g class="m-km"><circle cx="${X(q[2]).toFixed(1)}" cy="${Y(q[1]).toFixed(1)}" r="5"/><text x="${(X(q[2]) + 9).toFixed(1)}" y="${(Y(q[1]) - 8).toFixed(1)}">${Math.round(q[0])}</text></g>`).join('');
  const proj = [minLon, maxLat, kx, scale, padL, padY].map((v) => +v.toFixed(6)).join(',');
  return `<svg class="map-svg" viewBox="0 0 ${W} ${Hh}" role="img" aria-labelledby="mapT" focusable="false" data-proj="${proj}"><title id="mapT">${esc(t.route.mapAlt)}</title><path class="m-line" d="${d}"/>${kmMarks}${marks.join('')}${start}<circle class="m-cur" r="12" cx="0" cy="0"/></svg>`;
}

function profileSvg(t, lang) {
  const bars = RUTA.perfilKm;
  const W = 720, Hh = 310, pl = 64, pr = 12, pt = 34, pb = 44;
  const lo = 400, hi = 1400;
  const iw = W - pl - pr, ih = Hh - pt - pb;
  const bw = iw / bars.length;
  const Y = (v) => pt + ih - ((v - lo) / (hi - lo)) * ih;
  const grid = [600, 800, 1000, 1200, 1400].map((v) => `<line class="p-grid" x1="${pl}" x2="${W - pr}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text class="p-txt" x="${pl - 10}" y="${(Y(v) + 7).toFixed(1)}" text-anchor="end">${fmt(v, lang)}</text>`).join('');
  const rects = bars.map((v, i) => `<rect class="p-bar" x="${(pl + i * bw + 0.5).toFixed(2)}" y="${Y(v).toFixed(1)}" width="${Math.max(bw - 1, 0.8).toFixed(2)}" height="${(pt + ih - Y(v)).toFixed(1)}"/>`).join('');
  const ticks = [0, 50, 100, 150, 200].map((k) => `<text class="p-txt" x="${(pl + k * bw).toFixed(1)}" y="${Hh - 14}" text-anchor="middle">${k}</text>`).join('');
  const unit = `<text class="p-txt" x="${W - pr}" y="${Hh - 14}" text-anchor="end">${esc(t.route.kmAxis)}</text><text class="p-txt" x="${pl - 10}" y="14" text-anchor="end">m</text>`;
  const alt = fill(t.route.profileAlt, { min: fmt(RUTA.medido.minEle, lang), max: fmt(RUTA.medido.maxEle, lang) });
  const ctrlMarks = Object.entries(RUTA.pasos).map(([k, v]) => `<line class="p-ctrl" x1="${(pl + (v.km / 1) * bw).toFixed(1)}" x2="${(pl + v.km * bw).toFixed(1)}" y1="${pt}" y2="${pt + ih}"/>`).join('');
  return `<svg class="prof-svg" viewBox="0 0 ${W} ${Hh}" role="img" aria-labelledby="profT" focusable="false" data-prof="${pl},${pr},${pt},${pb},${W},${Hh},${bars.length},${lo},${hi}"><title id="profT">${esc(alt)}</title>${grid}${rects}${ctrlMarks}${ticks}${unit}<line class="p-cur" x1="0" x2="0" y1="${pt}" y2="${pt + ih}"/><circle class="p-cur-dot" r="6" cx="0" cy="0"/></svg>`;
}


function firmeBlock(t, lang, kind, title, sub) {
  const rows = FIRMES[kind];
  const names = kind === 'superficies' ? t.route.surfaces : t.route.ways;
  const total = rows.reduce((a, r) => a + r[1], 0);
  const num = (v) => (v >= 10 ? v.toFixed(1) : v >= 1 ? v.toFixed(2) : String(Math.round(v * 1000))).replace('.', lang === 'en' ? '.' : ',');
  const label = (v) => (v < 1 ? `${num(v)} m` : `${num(v)} km`);
  const pct = (v) => { const x = (v / total) * 100; return (x < 1 ? '<1' : String(Math.round(x))) + ' %'; };
  const bar = rows.map((r, i) => `<span class="fb-seg c${i}" style="flex:${r[1]}" title="${esc(names[r[0]])}: ${label(r[1])}"></span>`).join('');
  const list = rows.map((r, i) => `<li><i class="fb-sw c${i}" aria-hidden="true"></i><span class="fb-n">${esc(names[r[0]])}</span><span class="fb-v">${label(r[1])} · ${pct(r[1])}</span></li>`).join('');
  return `<div class="firme"><h3>${esc(title)}</h3>${sub ? `<p class="hint">${esc(sub)}</p>` : ''}<div class="fb-bar" aria-hidden="true">${bar}</div><ul class="fb-list">${list}</ul></div>`;
}

// ───────────── piezas de página ─────────────
const sectionHtml = (id, n, h2, inner, cls = '', back = '') =>
  `<section class="sec ${cls}" id="${id}" aria-labelledby="${id}-t"><div class="wrap"><header class="sec-head"><button class="back-to-menu" type="button" data-back hidden>${ICON.arrow}<span>${esc(back)}</span></button><h2 id="${id}-t"><span class="sec-num" aria-hidden="true">${String(n).padStart(2, '0')}</span>${esc(h2)}</h2></header><div class="sec-body">${inner}</div></div></section>`;

function head(t, o) {
  const alt = o.alternates;
  const links = ORDER.map((l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN}${alt[l]}">`).join('\n') + `\n<link rel="alternate" hreflang="x-default" href="${ORIGIN}${alt.es}">`;
  const og = o.og ? `<meta property="og:image" content="${ORIGIN}${o.og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(t.meta.ogAlt)}"><meta name="twitter:image" content="${ORIGIN}${o.og}"><meta name="twitter:image:alt" content="${esc(t.meta.ogAlt)}">` : '';
  const others = ORDER.filter((l) => l !== t.lang).map((l) => `<meta property="og:locale:alternate" content="${LANGS[l].locale}">`).join('');
  return `<!doctype html>
<html lang="${t.lang}" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
<meta name="robots" content="${o.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">
<link rel="canonical" href="${ORIGIN}${o.path}">
${links}
<meta name="theme-color" content="#0B0908">
<meta name="color-scheme" content="dark light">
<meta property="og:type" content="website"><meta property="og:site_name" content="Ultra Trail Larre®"><meta property="og:title" content="${esc(o.title)}"><meta property="og:description" content="${esc(o.description)}"><meta property="og:url" content="${ORIGIN}${o.path}"><meta property="og:locale" content="${t.locale}">${others}
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(o.title)}"><meta name="twitter:description" content="${esc(o.description)}">
${og}
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png"><link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">
${SITE.googleVerification ? `<meta name="google-site-verification" content="${esc(SITE.googleVerification)}">` : ''}${SITE.bingVerification ? `<meta name="msvalidate.01" content="${esc(SITE.bingVerification)}">` : ''}
<link rel="preload" href="/fonts/inter-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/ibm-plex-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/larre.css?v=${assetV.css}">
<script>document.documentElement.className='js'</script>
${o.jsonld ? `<script type="application/ld+json">${JSON.stringify(o.jsonld)}</script>` : ''}
</head>`;
}

const socials = (t, cls) => `<ul class="icons ${cls}" aria-label="${esc(t.aria.social)}">
<li><a href="${H.instagramUrl}" target="_blank" rel="noopener" aria-label="${esc(t.aria.ig)} (${esc(t.ui.new)})">${ICON.ig}</a></li>
<li><a href="https://wa.me/${H.whatsapp}?text=${encodeURIComponent(t.contact.waMsg)}" target="_blank" rel="noopener" aria-label="${esc(t.aria.wa)} (${esc(t.ui.new)})">${ICON.wa}</a></li>
<li><a href="${H.mapsSalida}" target="_blank" rel="noopener" aria-label="${esc(t.aria.map)} (${esc(t.ui.new)})">${ICON.map}</a></li>
</ul>`;

function header(t, o) {
  const langs = ORDER.map((l) => {
    const cur = l === t.lang;
    return `<a href="${o.alternates[l]}" hreflang="${l}" lang="${l}"${cur ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`;
  }).join('<span aria-hidden="true">/</span>');
  const home = t.paths.home;
  const items = t.nav.map(([id, label], i) => `<li><a href="${o.isHome ? '' : home}#${id}"><span class="n">${String(i).padStart(2, '0')}</span><span class="t">${esc(label)}</span></a></li>`).join('');
  const coords = `${H.salida.lat.toFixed(4)}° N · ${Math.abs(H.salida.lon).toFixed(4)}° ${t.lang === 'en' ? 'W' : t.lang === 'eu' ? 'M' : 'O'}`;
  return `<a class="skip" href="#main">${esc(t.ui.skip)}</a>
<header class="top" id="top-bar"><div class="wrap top-in">
<a class="logo" href="${home}" aria-label="${esc(t.ui.home)}">ULTRA<span class="knot" aria-hidden="true">·</span>TRAIL<span class="knot" aria-hidden="true">·</span>LARRE<span class="reg">®</span></a>
<span class="coords" aria-hidden="true">${coords}</span>
<div class="top-r">
${socials(t, 'icons-top')}
<nav class="lang" aria-label="${esc(t.ui.langNav)}">${langs}</nav>
<button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="menuPanel" aria-label="${esc(t.ui.menuOpen)}" data-open="${esc(t.ui.menuOpen)}" data-close="${esc(t.ui.menuClose)}"><span class="bars" aria-hidden="true"><i></i><i></i></span><span class="menu-lbl">${esc(t.ui.menu)}</span></button>
</div></div>
<nav class="menu" id="menuPanel" aria-label="${esc(t.ui.index)}"><ol>${items}</ol></nav>
</header>`;
}

function footer(t, isHome = false) {
  const c = H;
  const home = isHome ? '' : t.paths.home;
  return `<footer class="foot"><div class="wrap foot-in">
<div class="foot-l"><p>© 2026 Ultra Trail Larre®</p>
<nav class="foot-r" aria-label="Legal"><a href="${t.routePage.path}">${esc(t.routePage.eyebrow)}</a><a href="${t.paths.aviso}">${esc(t.ui.legal)}</a><a href="${t.paths.priv}">${esc(t.ui.privacy)}</a></nav></div>
${socials(t, 'icons-foot')}
</div>
<div class="float-cta"><a class="pill" href="${home}#preinscripcion">${esc(t.ui.ctaPre)}</a><a class="pill" href="https://wa.me/${c.whatsapp}?text=${encodeURIComponent(t.contact.waMsg)}" target="_blank" rel="noopener">${ICON.wa}<span>${esc(t.ui.ctaWa)}</span><span class="sr"> (${esc(t.ui.new)})</span></a></div>
</footer>`;
}

// ───────────── galería ─────────────
function gallery(t) {
  const lang = t.lang;
  const photos = GAL.fotos.filter((p) => !p.oculta);
  const total = photos.length;
  const items = photos.map((p, i) => {
    const alt = p.alt[lang];
    const base = `/fotos/${p.file}`;
    return `<li class="g-item"><a class="g-link" href="${esc(p.permalink || H.instagramUrl)}" data-i="${i}" data-full="${base}.webp" data-avif="${base}.avif" data-alt="${esc(alt)}" aria-label="${esc(fill(t.ig.open, { n: i + 1, total }))}"><picture><source type="image/avif" srcset="${base}-400.avif 400w, ${base}.avif 900w" sizes="(min-width:1100px) 280px, (min-width:700px) 30vw, 46vw"><img src="${base}-400.webp" srcset="${base}-400.webp 400w, ${base}.webp 900w" sizes="(min-width:1100px) 280px, (min-width:700px) 30vw, 46vw" width="900" height="900" loading="lazy" decoding="async" alt="${esc(alt)}"></picture></a></li>`;
  }).join('');
  return `<ul class="gallery" aria-label="${esc(t.ig.gallery)}">${items}</ul>
<p class="sec-cta"><a class="btn btn-line" href="${H.instagramUrl}" target="_blank" rel="noopener">${ICON.ig}<span>${esc(t.ig.lead.match(/@\w+/)?.[0] || '@ultratraillarre')}</span><span class="sr"> (${esc(t.ui.new)})</span></a></p>
<dialog class="lb" id="lightbox" aria-label="${esc(t.ig.dialog)}">
<div class="lb-in"><button class="lb-x" type="button" data-lb="close" aria-label="${esc(t.ui.close)}">×</button>
<button class="lb-nav lb-prev" type="button" data-lb="prev" aria-label="${esc(t.ui.prev)}">‹</button>
<figure class="lb-fig"><img id="lbImg" alt="" width="900" height="900"><figcaption><p id="lbCap"></p><p class="lb-meta"><span id="lbCount" data-tpl="${esc(t.ig.counter)}"></span> · <a id="lbLink" href="${H.instagramUrl}" target="_blank" rel="noopener">${esc(t.ui.viewPost)}</a></p></figcaption></figure>
<button class="lb-nav lb-next" type="button" data-lb="next" aria-label="${esc(t.ui.next)}">›</button></div>
</dialog>`;
}

// ───────────── formularios ─────────────
const hiddenFields = (formName, t) => `<input type="hidden" name="form-name" value="${formName}"><input type="hidden" name="idioma" value="${t.lang}"><input type="hidden" name="t" value=""><p class="hp" aria-hidden="true"><label>No rellenar<input type="text" name="bot-field" tabindex="-1" autocomplete="off"></label></p>`;

function preForm(t) {
  const f = t.pre.form;
  const sexo = f.sexoOpts.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('');
  const req = `<span class="req" aria-hidden="true">*</span>`;
  return `<form class="form" id="preForm" method="post" action="/api/preinscripcion" novalidate hidden>
${hiddenFields('larre-preinscripcion', t)}
<div class="f-grid">
<div class="f"><label for="p-nombre">${esc(f.nombre)} ${req}</label><input id="p-nombre" name="nombre" type="text" autocomplete="given-name" required maxlength="80"></div>
<div class="f"><label for="p-apellidos">${esc(f.apellidos)} ${req}</label><input id="p-apellidos" name="apellidos" type="text" autocomplete="family-name" required maxlength="120"></div>
<div class="f"><label for="p-edad">${esc(f.edad)} ${req}</label><input id="p-edad" name="edad" type="number" inputmode="numeric" min="18" max="99" required></div>
<div class="f"><label for="p-sexo">${esc(f.sexo)} ${req}</label><select id="p-sexo" name="sexo" required><option value="">${esc(f.sexoPh)}</option>${sexo}</select></div>
<div class="f f-wide"><label for="p-email">${esc(f.email)} ${req}</label><input id="p-email" name="email" type="email" autocomplete="email" required maxlength="160"></div>
<div class="f f-wide"><label for="p-ref">${esc(f.referencias)}</label><textarea id="p-ref" name="referencias" rows="3" maxlength="1200" aria-describedby="p-ref-h"></textarea><p class="hint" id="p-ref-h">${esc(f.referenciasHint)}</p></div>
<fieldset class="f f-wide f-radio"><legend>${esc(f.federado)} ${req}</legend><label class="radio"><input type="radio" name="federado" value="si" required> <span>${esc(f.si)}</span></label><label class="radio"><input type="radio" name="federado" value="no"> <span>${esc(f.no)}</span></label></fieldset>
<div class="f f-wide" id="p-fed-wrap" hidden><label for="p-fed">${esc(f.federacion)} ${req}</label><input id="p-fed" name="federacion" type="text" maxlength="120"></div>
<div class="f f-wide"><label for="p-desc">${esc(f.descripcion)} ${req}</label><textarea id="p-desc" name="descripcion" rows="5" required minlength="20" maxlength="1000" aria-describedby="p-desc-h p-desc-c"></textarea><p class="hint" id="p-desc-h">${esc(f.descripcionHint)}</p><p class="hint count" id="p-desc-c" data-tpl="${esc(f.count)}" data-max="1000" aria-live="off"></p></div>
<div class="f f-wide"><label for="p-obs">${esc(f.observaciones)}</label><textarea id="p-obs" name="observaciones" rows="3" maxlength="1000" aria-describedby="p-obs-h"></textarea><p class="hint" id="p-obs-h">${esc(f.observacionesHint)}</p></div>
</div>
<div class="f f-check"><label class="check"><input type="checkbox" name="consentimiento" value="si" required><span>${fill(f.consent, { priv: t.paths.priv })} ${req}</span></label></div>
<div class="f-err" id="preErr" role="alert" tabindex="-1" hidden></div>
<div class="f-act"><button class="btn btn-main" type="submit" data-sending="${esc(f.sending)}"><span class="lbl">${esc(f.submit)}</span></button><p class="hint">* ${esc(f.required)}</p></div>
</form>`;
}

function partnerForm(t) {
  const f = t.partners.form;
  const tipo = f.tipoOpts.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('');
  const req = `<span class="req" aria-hidden="true">*</span>`;
  return `<form class="form" id="colForm" method="post" action="/api/colabora" novalidate>
${hiddenFields('larre-colabora', t)}
<div class="f-grid">
<div class="f"><label for="c-empresa">${esc(f.empresa)} ${req}</label><input id="c-empresa" name="empresa" type="text" autocomplete="organization" required maxlength="140"></div>
<div class="f"><label for="c-persona">${esc(f.persona)} ${req}</label><input id="c-persona" name="persona" type="text" autocomplete="name" required maxlength="120"></div>
<div class="f"><label for="c-cargo">${esc(f.cargo)} ${req}</label><input id="c-cargo" name="cargo" type="text" autocomplete="organization-title" required maxlength="120"></div>
<div class="f"><label for="c-email">${esc(f.email)} ${req}</label><input id="c-email" name="email" type="email" autocomplete="email" required maxlength="160"></div>
<div class="f f-wide"><label for="c-tipo">${esc(f.tipo)} ${req}</label><select id="c-tipo" name="tipo" required><option value="">${esc(f.tipoPh)}</option>${tipo}</select></div>
<div class="f f-wide"><label for="c-msg">${esc(f.mensaje)} ${req}</label><textarea id="c-msg" name="mensaje" rows="5" required minlength="20" maxlength="2000" aria-describedby="c-msg-h"></textarea><p class="hint" id="c-msg-h">${esc(f.mensajeHint)}</p></div>
</div>
<div class="f f-check"><label class="check"><input type="checkbox" name="consentimiento" value="si" required><span>${fill(f.consent, { priv: t.paths.priv })} ${req}</span></label></div>
<div class="f-err" id="colErr" role="alert" tabindex="-1" hidden></div>
<div class="f-act"><button class="btn btn-main" type="submit" data-sending="${esc(f.sending)}"><span class="lbl">${esc(f.submit)}</span></button><p class="hint">* ${esc(t.pre.form.required)}</p></div>
</form>`;
}

// formularios estáticos ocultos, para que Netlify Forms los detecte (copia de seguridad)
const netlifyForms = () => `<div hidden aria-hidden="true">
<form name="larre-preinscripcion" data-netlify="true" netlify-honeypot="bot-field"><input name="form-name"><input name="idioma"><input name="codigo"><input name="nombre"><input name="apellidos"><input name="edad"><input name="sexo"><input name="email"><input name="referencias"><input name="federado"><input name="federacion"><input name="descripcion"><input name="observaciones"><input name="consentimiento"><input name="enviado"><input name="bot-field"></form>
<form name="larre-colabora" data-netlify="true" netlify-honeypot="bot-field"><input name="form-name"><input name="idioma"><input name="empresa"><input name="persona"><input name="cargo"><input name="email"><input name="tipo"><input name="mensaje"><input name="consentimiento"><input name="enviado"><input name="bot-field"></form>
</div>`;

// Cuerpo de la ruta (mapa, perfil, controles y firmes): lo comparten la sección de la home y la página /ruta/.
function routeBody(t, lang, withLead) {
  const towns = Object.entries(RUTA.pasos).sort((a, b) => a[1].km - b[1].km);
  const R = t.route;
  return `${withLead ? `<p class="lead">${esc(R.lead)}</p>
<dl class="figs">${R.figs.map(([l, v]) => `<div><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
<div class="route-live" data-route data-src="/assets/ruta.json" data-lang="${lang}">
<figure class="map"><figcaption class="cap">${esc(R.mapTitle)}</figcaption>${mapSvg(t, lang)}</figure>
<p class="readout" data-readout aria-live="off"><span><b>${esc(R.rKm)}</b> <i data-r="km">—</i></span><span><b>${esc(R.rEle)}</b> <i data-r="ele">—</i></span><span><b>${esc(R.rSlope)}</b> <i data-r="slope">—</i></span></p>
<figure class="prof"><figcaption class="cap">${esc(R.profileTitle)}</figcaption><div class="prof-wrap" data-prof-wrap tabindex="0" role="slider" aria-label="${esc(R.sliderLabel)}" aria-valuemin="0" aria-valuemax="${Math.round(RUTA.medido.km)}" aria-valuenow="0">${profileSvg(t, lang)}</div><p class="hint">${esc(fill(R.profileSub, { min: fmt(RUTA.medido.minEle, lang), max: fmt(RUTA.medido.maxEle, lang) }))} ${esc(R.interactHint)}</p></figure>
</div>
<div class="ctrl"><h3>${esc(R.ctrlTitle)}</h3>
<table><thead><tr><th scope="col">${esc(R.ctrlHead[0])}</th><th scope="col" class="num">${esc(R.ctrlHead[1])}</th></tr></thead><tbody>${towns.map(([k, v]) => `<tr><th scope="row" data-km="${v.km}">${esc(R.towns[k])}</th><td class="num">≈ ${Math.round(v.km)}</td></tr>`).join('')}</tbody></table>
<p class="hint">${esc(R.ctrlNote)}</p></div>
<div class="firmes">${firmeBlock(t, lang, 'superficies', R.surfTitle, R.surfSub)}${firmeBlock(t, lang, 'caminos', R.wayTitle, '')}</div>
<p class="sec-cta"><a class="btn btn-main" href="${GPX.href}" download>${ICON.dl}<span>${esc(R.gpx)}</span></a>${withLead ? `<a class="link-arrow" href="${t.routePage.path}">${esc(t.routePage.more)} ${ICON.arrow}</a>` : ''}<a class="link-arrow" href="${H.mapsSalida}" target="_blank" rel="noopener">${esc(R.mapsStart)} ${ICON.arrow}<span class="sr"> (${esc(t.ui.new)})</span></a></p>`;
}

// ───────────── página principal ─────────────
function homePage(t) {
  const lang = t.lang;
  const sec = (id, n, h2, inner, cls = '') => sectionHtml(id, n, h2, inner, cls, t.ui.backMenu);
  const alternates = { es: '/', eu: '/eu/', en: '/en/' };
  const reg = pdfInfo('reglamento', lang);
  const links = { reglamento: reg.href };
  const ver = longDate(H.docsVersion, lang);
  const verGpx = longDate(H.gpxVersion, lang);

  const hero = `<section class="hero" aria-labelledby="h1"><div class="wrap hero-top"><div class="hero-claim"><p class="hero-tagline"><strong>${esc(t.hero.eyebrow)}</strong></p><p class="hero-tagline">${esc(t.hero.claim)}</p><a class="hero-arrow" href="#${t.nav[0][0]}" aria-label="${esc(t.nav[0][1])}">${ICON.arrow}</a></div></div>
<h1 id="h1" class="hero-giant"><span>ULTRA TRAIL LARRE<span class="reg">®</span></span></h1></section>`;

  const race = sec('la-carrera', 1, t.race.h2, `<p class="lead">${esc(t.race.lead)}</p>
<div class="blocks">${t.race.blocks.map(([h, p]) => `<article class="block"><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div>
<aside class="callout"><h3>${esc(t.race.forYouH)}</h3><p>${esc(t.race.forYou)}</p></aside>`);

  const route = sec('ruta', 2, t.route.h2, routeBody(t, lang, true), 'sec-wide');

  const zero = sec('codigo-cero', 3, t.zero.h2, `<p class="lead">${esc(t.zero.lead)}</p>
<div class="blocks blocks-3">${t.zero.blocks.map(([h, p]) => `<article class="block"><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div>
<p class="hint">${fill(t.zero.note, links)}</p>`);

  const ig = sec('instagram', 6, t.ig.h2, `<p class="lead">${esc(t.ig.lead)}</p>${gallery(t)}`);

  const pre = sec('preinscripcion', 0, t.pre.h2, `<p class="lead">${esc(t.pre.lead)}</p>
<ul class="points">${t.pre.points.map((p) => `<li>${p}</li>`).join('')}</ul>
<div class="pre-box" id="preBox">
<div class="notice" id="preClosed" role="status" hidden><h3>${esc(t.pre.closedTitle)}</h3><p>${esc(t.pre.closedText)}</p></div>
<div class="notice notice-warn" id="preUnavailable" role="status" hidden><p>${esc(fill(t.pre.unavailable, { email: H.email }))}</p></div>
${preForm(t)}
<noscript><p class="notice notice-warn">${esc(t.pre.unavailable.replace('{email}', H.email))}</p></noscript>
<div class="notice notice-ok" id="preOk" role="status" tabindex="-1" hidden></div>
</div>`, 'sec-pre');

  const dl = sec('descargas', 4, t.dl.h2, `<p class="lead">${esc(t.dl.lead)}</p>
<ul class="dl">
${[['gpx', GPX, t.dl.items.gpx, false]].map(([k, f, [title, desc], isPdf]) => `<li><a class="btn btn-main" href="${f.href}" download>${ICON.dl}<span>${esc(title)}</span></a><p>${esc(desc)}</p><p class="meta">${isPdf ? t.dl.pdf : 'GPX'} · ${f.size} · ${esc(t.dl.version)} ${esc(isPdf ? ver : verGpx)}</p></li>`).join('')}
</ul>`);

  const faq = sec('faq', 7, t.faq.h2, `<p class="lead">${esc(t.faq.lead)}</p>
<div class="faq">${t.faq.items.map(([q, a]) => `<details><summary><span>${esc(q)}</span><i aria-hidden="true"></i></summary><div class="ans"><p>${fill(a, links)}</p></div></details>`).join('')}</div>`);

  const partners = sec('colabora', 5, t.partners.h2, `<p class="lead">${esc(t.partners.lead)}</p>
<div class="blocks blocks-4">${t.partners.types.map(([h, p]) => `<article class="block"><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div>
<div class="col-form">${partnerForm(t)}<div class="notice notice-ok" id="colOk" role="status" tabindex="-1" hidden></div></div>`);

  const contact = sec('contacto', 8, t.contact.h2, `<p class="lead">${esc(t.contact.lead)}</p>
<ul class="contact">
<li><span class="k">${ICON.mail}${esc(t.contact.labels.email)}</span><a href="mailto:${H.email}">${H.email}</a></li>
<li><span class="k">${ICON.ig}${esc(t.contact.labels.ig)}</span><a href="${H.instagramUrl}" target="_blank" rel="noopener">@${H.instagram}<span class="sr"> (${esc(t.ui.new)})</span></a></li>
<li><span class="k">${ICON.wa}${esc(t.contact.labels.wa)}</span><a href="https://wa.me/${H.whatsapp}?text=${encodeURIComponent(t.contact.waMsg)}" target="_blank" rel="noopener">${esc(t.contact.waText)}<span class="sr"> (${esc(t.ui.new)})</span></a></li>
<li><span class="k">${ICON.map}${esc(t.contact.labels.map)}</span><a href="${H.mapsSalida}" target="_blank" rel="noopener">${esc(t.contact.mapText)}<span class="sr"> (${esc(t.ui.new)})</span></a></li>
</ul><p class="org">${t.contact.org}</p>`);

  const i18n = {
    lang,
    email: H.email,
    opens: H.preinscripcionAbre,
    pre: { errors: t.pre.errors, ok: t.pre.ok, count: t.pre.form.count, copy: t.ui.copy, copied: t.ui.copied },
    col: { errors: t.partners.errors, ok: t.partners.ok },
    sending: { pre: t.pre.form.sending, col: t.partners.form.sending },
    gallery: { total: GAL.fotos.filter((p) => !p.oculta).length }
  };

  const jsonld = homeJsonLd(t, alternates[lang]);
  return (
    head(t, { title: t.meta.title, description: t.meta.description, path: alternates[lang], alternates, og: `/assets/og-${lang}.png`, jsonld }) +
    `\n<body data-page="home">\n${header(t, { alternates, isHome: true })}\n<main id="main" tabindex="-1">\n${hero}\n${pre}\n${race}\n${route}\n${zero}\n${dl}\n${partners}\n${ig}\n${faq}\n${contact}\n</main>\n${footer(t, true)}\n${netlifyForms()}\n<script type="application/json" id="i18n">${JSON.stringify(i18n).replace(/</g, '\\u003c')}</script>\n<script src="/assets/app.js?v=${assetV.js}" defer></script>\n</body>\n</html>\n`
  );
}

function homeJsonLd(t, path) {
  const url = `${ORIGIN}${path}`;
  const org = `${ORIGIN}/#organization`;
  const site = `${ORIGIN}/#website`;
  const faq = t.faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(fill(a, { reglamento: `${ORIGIN}${pdfPath('reglamento', t.lang)}` })) } }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': org, name: 'Ultra Trail Larre®', url: `${ORIGIN}/`, logo: { '@type': 'ImageObject', url: `${ORIGIN}/icon-512.png`, width: 512, height: 512 }, email: H.email, sameAs: [H.instagramUrl], parentOrganization: { '@type': 'Organization', name: 'Musubigara®', url: `${H.organizaUrl}/` }, contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: H.email, availableLanguage: ['es', 'eu', 'en'] } },
      { '@type': 'WebSite', '@id': site, url: `${ORIGIN}/`, name: 'Ultra Trail Larre®', inLanguage: ['es', 'eu', 'en'], publisher: { '@id': org } },
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: t.meta.title, description: t.meta.description, inLanguage: t.lang, isPartOf: { '@id': site }, about: { '@id': `${url}#event` }, breadcrumb: { '@id': `${url}#breadcrumb` }, primaryImageOfPage: { '@type': 'ImageObject', url: `${ORIGIN}/assets/og-${t.lang}.png` } },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ultra Trail Larre®', item: url }] },
      {
        '@type': 'SportsEvent',
        '@id': `${url}#event`,
        name: `Ultra Trail Larre® · ${t.lang === 'en' ? 'First edition' : t.lang === 'eu' ? 'I. edizioa' : 'I Edición'}`,
        description: t.meta.description,
        sport: 'Trail running',
        url,
        image: `${ORIGIN}/assets/og-${t.lang}.png`,
        inLanguage: t.lang,
        // Solo se conoce la temporada (otoño de 2027): se publica únicamente el año.
        startDate: '2027',
        endDate: '2027',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        maximumAttendeeCapacity: H.plazas,
        location: { '@type': 'Place', name: H.salida.lugar, address: { '@type': 'PostalAddress', addressLocality: H.salida.ciudad, addressRegion: 'Álava', addressCountry: 'ES' }, geo: { '@type': 'GeoCoordinates', latitude: H.salida.lat, longitude: H.salida.lon } },
        organizer: { '@id': org },
        performer: { '@type': 'PerformingGroup', name: t.lang === 'en' ? 'Ultra Trail Larre® runners' : t.lang === 'eu' ? 'Ultra Trail Larre®-ko korrikalariak' : 'Corredoras y corredores de Ultra Trail Larre®' },
        offers: { '@type': 'Offer', url: `${ORIGIN}${t.paths.home}#preinscripcion`, availability: 'https://schema.org/PreOrder', validFrom: H.preinscripcionAbre.slice(0, 10), priceCurrency: 'EUR' }
      },
      { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: faq }
    ]
  };
}

// ───────────── páginas legales y 404 ─────────────
function legalPage(t, key) {
  const L = t.legal[key];
  const alternates = ORDER.reduce((a, l) => ((a[l] = LANGS[l].paths[key === 'aviso' ? 'aviso' : 'priv']), a), {});
  const path = t.paths[key === 'aviso' ? 'aviso' : 'priv'];
  const body = L.sections.map(([h, paras]) => `<h2>${esc(h)}</h2>${paras.map((p) => `<p>${fill(p, { priv: t.paths.priv })}</p>`).join('')}`).join('');
  const title = `${L.title} · Ultra Trail Larre®`;
  const jsonld = { '@context': 'https://schema.org', '@graph': [{ '@type': 'WebPage', '@id': `${ORIGIN}${path}#webpage`, url: `${ORIGIN}${path}`, name: title, description: L.metaDesc, inLanguage: t.lang, isPartOf: { '@id': `${ORIGIN}/#website` }, breadcrumb: { '@id': `${ORIGIN}${path}#breadcrumb` } }, { '@type': 'BreadcrumbList', '@id': `${ORIGIN}${path}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ultra Trail Larre®', item: `${ORIGIN}${t.paths.home}` }, { '@type': 'ListItem', position: 2, name: L.title, item: `${ORIGIN}${path}` }] }] };
  return (
    head(t, { title, description: L.metaDesc, path, alternates, og: `/assets/og-${t.lang}.png`, jsonld }) +
    `\n<body data-page="legal">\n${header(t, { alternates, isHome: false })}\n<main id="main" tabindex="-1"><article class="wrap legal"><p class="eyebrow">${esc(L.title === t.legal.priv.title ? t.ui.privacy : t.ui.legal)}</p><h1>${esc(L.title)}</h1><p class="hint">${esc(t.legal.updated)}: ${esc(L.date)}</p>${body}<p class="back"><a class="link-arrow" href="${t.paths.home}">${esc(t.ui.back)} ${ICON.arrow}</a></p></article></main>\n${footer(t)}\n<script src="/assets/app.js?v=${assetV.js}" defer></script>\n</body>\n</html>\n`
  );
}

function routePage(t) {
  const lang = t.lang, P = t.routePage, path = P.path;
  const alternates = ORDER.reduce((a, l) => ((a[l] = LANGS[l].routePage.path), a), {});
  const mm = { min: fmt(RUTA.medido.minEle, lang), max: fmt(RUTA.medido.maxEle, lang) };
  const sum = (ks) => FIRMES.superficies.filter((r) => ks.includes(r[0])).reduce((a, r) => a + r[1], 0);
  const tot = FIRMES.superficies.reduce((a, r) => a + r[1], 0);
  const np = Math.round((sum(['pistaNoPav', 'caminoNatural', 'grava', 'pistaAlpina']) / tot) * 100), pv = Math.round((sum(['pistaPav', 'asfalto']) / tot) * 100);
  const figs = [...t.route.figs, ...P.extraFigs.map(([l, v]) => [l, fill(v, mm)])];
  const home = t.paths.home, reg = pdfInfo('reglamento', lang);
  const url = `${ORIGIN}${path}`;
  const jsonld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: P.metaTitle, description: P.metaDesc, inLanguage: lang, isPartOf: { '@id': `${ORIGIN}/#website` }, about: { '@id': `${ORIGIN}${home}#event` }, breadcrumb: { '@id': `${url}#breadcrumb` }, primaryImageOfPage: { '@type': 'ImageObject', url: `${ORIGIN}/assets/og-${lang}.png` } },
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ultra Trail Larre®', item: `${ORIGIN}${home}` }, { '@type': 'ListItem', position: 2, name: P.eyebrow, item: url }] }
  ] };
  const i18n = { lang, email: H.email };
  return (
    head(t, { title: P.metaTitle, description: P.metaDesc, path, alternates, og: `/assets/og-${lang}.png`, jsonld }) +
    `\n<body data-page="ruta">\n${header(t, { alternates, isHome: false })}\n<main id="main" tabindex="-1"><article class="wrap route-page"><p class="eyebrow">${esc(P.eyebrow)}</p><h1>${esc(P.h1)}</h1><p class="lead">${esc(P.lead)}</p>
<h2>${esc(P.figsTitle)}</h2><dl class="figs">${figs.map(([l, v]) => `<div><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
${routeBody(t, lang, false)}
<h2>${esc(P.terrainTitle)}</h2><p>${esc(fill(P.terrain, { np, pv }))}</p>
<h2>${esc(P.nextTitle)}</h2><ul class="points">${P.next.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
<p class="sec-cta"><a class="btn btn-main" href="${home}#preinscripcion">${esc(P.ctaPre)}</a><a class="btn btn-line" href="${reg.href}" download>${esc(P.ctaRules)}</a><a class="link-arrow" href="${home}">${esc(t.ui.back)} ${ICON.arrow}</a></p>
</article></main>\n${footer(t)}\n<script type="application/json" id="i18n">${JSON.stringify(i18n).replace(/</g, '\\u003c')}</script>\n<script src="/assets/app.js?v=${assetV.js}" defer></script>\n</body>\n</html>\n`
  );
}

function notFoundPage() {
  const t = es;
  const alternates = { es: '/', eu: '/eu/', en: '/en/' };
  const items = ORDER.map((l) => `<p><a class="btn ${l === 'es' ? 'btn-main' : 'btn-line'}" href="${LANGS[l].paths.home}" hreflang="${l}" lang="${l}">${esc(LANGS[l].notFound.home)} · ${LANGS[l].label}</a></p>`).join('');
  const msgs = ORDER.map((l) => `<div lang="${l}"><h2>${esc(LANGS[l].notFound.title)}</h2><p>${esc(LANGS[l].notFound.text)}</p></div>`).join('');
  return (
    head(t, { title: 'Ultra Trail Larre® · 404', description: t.notFound.text, path: '/404.html', alternates, noindex: true }) +
    `\n<body data-page="404">\n${header(t, { alternates, isHome: false })}\n<main id="main" tabindex="-1"><section class="wrap nf"><h1>404</h1>${msgs}<div class="nf-links">${items}</div></section></main>\n${footer(t)}\n<script src="/assets/app.js?v=${assetV.js}" defer></script>\n</body>\n</html>\n`
  );
}

// ───────────── ficheros de sitio ─────────────
function sitemap() {
  const pages = [
    { key: 'home', prio: '1.0', freq: 'weekly', alts: { es: '/', eu: '/eu/', en: '/en/' } },
    { key: 'ruta', prio: '0.8', freq: 'monthly', alts: { es: es.routePage.path, eu: eu.routePage.path, en: en.routePage.path } },
    { key: 'aviso', prio: '0.2', freq: 'yearly', alts: { es: es.paths.aviso, eu: eu.paths.aviso, en: en.paths.aviso } },
    { key: 'priv', prio: '0.2', freq: 'yearly', alts: { es: es.paths.priv, eu: eu.paths.priv, en: en.paths.priv } }
  ];
  const last = H.docsVersion;
  const xml = pages.flatMap((p) => ORDER.map((l) => `  <url>\n    <loc>${ORIGIN}${p.alts[l]}</loc>\n    <lastmod>${last}</lastmod>\n    <changefreq>${p.freq}</changefreq>\n    <priority>${p.prio}</priority>\n${ORDER.map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${ORIGIN}${p.alts[a]}"/>`).join('\n')}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${p.alts.es}"/>\n  </url>`)).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${xml}\n</urlset>\n`;
}

const robots = () => `User-agent: *\nAllow: /\nDisallow: /.netlify/\nDisallow: /api/\n\n# Rastreadores de buscadores de IA, declarados uno a uno\n${['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended'].map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /api/`).join('\n\n')}\n\nSitemap: ${ORIGIN}/sitemap.xml\n`;

const manifest = () => JSON.stringify({ name: 'Ultra Trail Larre®', short_name: 'Larre', description: es.meta.description, lang: 'es', start_url: '/', scope: '/', display: 'browser', background_color: '#0B0908', theme_color: '#0B0908', icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }] }, null, 2) + '\n';

function llms() {
  const r = (l) => `${ORIGIN}${pdfPath('reglamento', l)}`;
  return `# Ultra Trail Larre®

> Ultra-trail en autosuficiencia por las sierras de Álava (Euskadi). Lazo de 227 km y +5.290 m con salida y meta en el quiosco del Parque de La Florida, Vitoria-Gasteiz. 300 plazas, asignadas por orden de llegada de la preinscripción. I Edición: otoño de 2027. Organiza Musubigara®.

## Datos clave
- Distancia y desnivel: 227 km y +5.290 m de desnivel positivo, en lazo.
- Formato: autosuficiencia, sin asistencia externa ni avituallamientos de organización. Un tracker y un brevet.
- Controles: seis; confirmados Agurain, Santa Cruz de Campezo, Laguardia y Peñacerrada (dos por definir).
- Modalidades: en solitario o por relevos (los detalles de los relevos se publicarán más adelante).
- Plazas: 300, por orden de llegada de la preinscripción. La preinscripción no garantiza plaza.
- Preinscripción: la lista se abre el 1 de diciembre de 2026. La fecha de pago se comunica por email en marzo.
- Contacto: ${H.email} · Instagram @${H.instagram}

## Páginas
- [Castellano](${ORIGIN}/)
- [Euskara](${ORIGIN}/eu/)
- [English](${ORIGIN}/en/)
- [Ruta y desnivel](${ORIGIN}${es.routePage.path}) · [Ibilbidea](${ORIGIN}${eu.routePage.path}) · [Route](${ORIGIN}${en.routePage.path})

## Documentos
- [Reglamento (ES)](${r('es')}) · [EU](${r('eu')}) · [EN](${r('en')})
- [Track GPX](${ORIGIN}/descargas/ultra-trail-larre.gpx)
`;
}

// ───────────── ejecución ─────────────
for (const l of ORDER) {
  const t = LANGS[l];
  write(l === 'es' ? 'index.html' : `${l}/index.html`, homePage(t));
  write(`${t.routePage.path.slice(1)}index.html`, routePage(t));
  for (const k of ['aviso', 'priv']) write(`${t.paths[k].slice(1)}index.html`, legalPage(t, k));
}
write('404.html', notFoundPage());
write('sitemap.xml', sitemap());
write('robots.txt', robots());
write('site.webmanifest', manifest());
write('llms.txt', llms());
write('google3a0db1a1af306c80.html', 'google-site-verification: google3a0db1a1af306c80.html');
console.log('Sitio generado en public/');
