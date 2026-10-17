#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────
   MUSUBI GALLERY · robot de sincronización con Instagram
   Sistema Musubigara® — mismo robot para todas las webs del grupo.

   Qué hace, en orden:
     1. renueva la clave de Meta (caduca a 60 días) y deja constancia
     2. pide las últimas publicaciones de la cuenta profesional
     3. descarga cada foto nueva en su resolución máxima
     4. la convierte a WebP 900 y 400 dentro de /fotos/
     5. reescribe gallery-data.js
     6. reescribe el bloque marcado de cada página (ES / EN)
     7. actualiza la fecha del sitemap

   Lo que NUNCA toca: los textos escritos a mano en
   gallery-captions.json. Esos mandan siempre sobre el pie que
   venga de Instagram.
   ───────────────────────────────────────────────────────────── */

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/* ── Configuración ─────────────────────────────────────────── */
const CFG = {
  account:    process.env.IG_ACCOUNT    || 'larrelongdistance',
  profileUrl: process.env.IG_PROFILE    || 'https://www.instagram.com/larrelongdistance/',
  root:       process.env.SITE_DIR      || '.',
  fotosDir:   process.env.FOTOS_DIR     || 'fotos',
  apiVersion: process.env.IG_API_VERSION || 'v23.0',
  fetchLimit: Number(process.env.IG_LIMIT || 24),   // cuántas pide a Instagram
  bakeCount:  Number(process.env.IG_BAKE  || 6),    // cuántas se escriben en la sección
  sizesAttr:  process.env.IG_SIZES || '(max-width: 640px) 50vw, (max-width: 1180px) 32vw, 360px',
  // páginas a reescribir: ruta → marca, idioma inicial y si lleva los dos idiomas
  // (en LARRE cada página contiene ES y EN: los pies van con .l-es / .l-en)
  targets: [
    { file: 'index.html',             lang: 'es', marker: 'ES', bilingual: true },
    { file: 'en/index.html',          lang: 'en', marker: 'EN', bilingual: true },
    { file: 'galeria/index.html',     lang: 'es', marker: 'ES', bilingual: true, variant: 'page', all: true,
      jsonld: 'https://larrelongdistance.org/galeria/' },
    { file: 'en/gallery/index.html',  lang: 'en', marker: 'EN', bilingual: true, variant: 'page', all: true,
      jsonld: 'https://larrelongdistance.org/en/gallery/' },
  ],
};

const TOKEN = process.env.IG_TOKEN;
const STATE_FILE = path.join(CFG.root, '.instagram-state.json'); // solo fechas, nunca la clave
const CAPTIONS_FILE = path.join(CFG.root, 'gallery-captions.json');

let warnings = [];
const log  = (...a) => console.log('·', ...a);
const warn = (m) => { warnings.push(m); console.log('⚠', m); };

/* ── Utilidades ────────────────────────────────────────────── */
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

async function readJSON(p, fallback) {
  try { return JSON.parse(await fs.readFile(p, 'utf8')); } catch { return fallback; }
}

function shortcodeFrom(permalink, id) {
  const m = /instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/.exec(permalink || '');
  return m ? m[1] : String(id || '');
}

/* El pie de LARRE va trilingüe (ES / EU / EN), un bloque por idioma
   separado por línea en blanco. Si llegan tres bloques, se reparten.
   Si no, todo va al idioma principal y el inglés se deja vacío
   para escribirlo a mano. */
function arreglarCodificacion(s) {
  // Las exportaciones de Meta escriben los acentos como bytes UTF-8
  // interpretados en latin-1: "AquÃ­" en vez de "Aquí". Se deshace así.
  if (!/[ÃÂ]/.test(s)) return s;
  try {
    const bytes = Uint8Array.from([...s].map((c) => c.charCodeAt(0) & 0xff));
    const vuelta = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return vuelta;
  } catch { return s; }
}

/* Un pie de Instagram trae, además del texto, las menciones, la web y las
   etiquetas. Aquí se queda solo el texto. Si el pie lleva varios idiomas
   separados por líneas en blanco, se reparten; si no, todo al principal. */
function parseCaption(raw) {
  const limpio = arreglarCodificacion(String(raw || ''))
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => !/^[@#]/.test(l))                       // menciones y etiquetas
    .filter((l) => !/^(https?:\/\/)?[\w.-]+\.(org|com|eus|net)\/?$/i.test(l))  // webs sueltas
    .join('\n')
    .replace(/#[\p{L}\p{N}_]+/gu, '')
    .replace(/[ \t]+/g, ' ')
    .trim();

  const bloques = limpio.split(/\n\s*\n/).map((b) => b.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const cut = (x) => {
    if (!x) return '';
    if (x.length <= 180) return x;
    const t = x.slice(0, 180);
    return t.slice(0, t.lastIndexOf(' ')).replace(/[,;:·—-]$/, '') + '…';
  };
  if (bloques.length >= 3) return { es: cut(bloques[0]), eu: cut(bloques[1]), en: cut(bloques[2]) };
  return { es: cut(bloques[0] || ''), eu: '', en: '' };
}

/* ── 1. Clave de Meta ──────────────────────────────────────── */
async function refreshToken() {
  const url = `https://graph.instagram.com/refresh_access_token`
            + `?grant_type=ig_refresh_token&access_token=${encodeURIComponent(TOKEN)}`;
  let r;
  try { r = await fetch(url); } catch (e) { warn(`No se pudo contactar con Meta para renovar la clave: ${e.message}`); return null; }
  const body = await r.json().catch(() => ({}));
  if (!r.ok || !body.access_token) {
    warn(`Meta no renovó la clave (${r.status}): ${body?.error?.message || 'sin detalle'}. `
       + `La clave actual sigue valiendo, pero conviene revisarlo.`);
    return null;
  }
  const days = Math.round((body.expires_in || 0) / 86400);
  log(`Clave renovada por Meta · vigencia ${days} días`);
  // El token nuevo se deja fuera del repositorio; lo recoge el workflow.
  if (process.env.RUNNER_TEMP) {
    await fs.writeFile(path.join(process.env.RUNNER_TEMP, 'ig_token_new.txt'), body.access_token, 'utf8');
  }
  return { refreshed_at: new Date().toISOString(), expires_in_days: days };
}

/* ── 2. Publicaciones ──────────────────────────────────────── */
const FIELDS_FULL = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url}';
const FIELDS_MIN  = 'id,caption,media_type,media_url,permalink,timestamp';

async function fetchMedia() {
  for (const fields of [FIELDS_FULL, FIELDS_MIN]) {
    const url = `https://graph.instagram.com/${CFG.apiVersion}/me/media`
              + `?fields=${encodeURIComponent(fields)}&limit=${CFG.fetchLimit}`
              + `&access_token=${encodeURIComponent(TOKEN)}`;
    const r = await fetch(url);
    const body = await r.json().catch(() => ({}));
    if (r.ok && Array.isArray(body.data)) {
      log(`Instagram devolvió ${body.data.length} publicaciones`);
      return body.data;
    }
    warn(`Instagram rechazó la petición (${r.status}): ${body?.error?.message || 'sin detalle'}`
       + (fields === FIELDS_FULL ? ' · reintento con campos mínimos' : ''));
  }
  throw new Error('Instagram no devolvió ninguna publicación. Revisa la clave y el permiso instagram_business_basic.');
}

function imageUrlOf(item) {
  if (item.media_type === 'IMAGE') return item.media_url || null;
  if (item.media_type === 'CAROUSEL_ALBUM') {
    const kids = item.children?.data || [];
    const img = kids.find((k) => k.media_type === 'IMAGE' && k.media_url);
    return img?.media_url || item.media_url || null;
  }
  return item.thumbnail_url || null;   // VIDEO y REELS: su portada
}

/* ── 3-4. Descarga y conversión ────────────────────────────── */
async function ensurePhoto(fileBase, url) {
  const dir = path.join(CFG.root, CFG.fotosDir);
  await fs.mkdir(dir, { recursive: true });
  const big = path.join(dir, `${fileBase}.webp`);
  const small = path.join(dir, `${fileBase}-400.webp`);
  if (await exists(big) && await exists(small)) return false;

  const r = await fetch(url);
  if (!r.ok) { warn(`No se pudo descargar la imagen de ${fileBase} (${r.status})`); return false; }
  const buf = Buffer.from(await r.arrayBuffer());

  await sharp(buf).rotate().resize(900, 900, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 }).toFile(big);
  await sharp(buf).rotate().resize(400, 400, { fit: 'cover', position: 'centre' })
    .webp({ quality: 80 }).toFile(small);
  log(`Foto nueva: ${fileBase}`);
  return true;
}

/* ── 5-6. Escritura ────────────────────────────────────────── */
function fecha(p, lang) {
  return new Date(`${p.date}T12:00:00`).toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES',
    { day: '2-digit', month: 'short', year: 'numeric' });
}

function itemHTML(p, i, target) {
  const lang = target.lang, variant = target.variant || 'panel', bi = !!target.bilingual;
  const base = `/${CFG.fotosDir}/`;
  const es = p.es || '';
  const en = p.en || p.es || '';
  const txt = lang === 'en' ? en : es;
  const a = (s) => esc(s);

  // Atributos traducibles: el propio JS de la web los conmuta (alt, aria-label)
  const altAttrs = bi
    ? ` alt="${a(txt)}" data-es-alt="${a(es)}" data-en-alt="${a(en)}"`
    : ` alt="${a(txt)}"`;
  const ariaAttrs = bi
    ? ` aria-label="${a(txt)}" data-es-aria-label="${a(es)}" data-en-aria-label="${a(en)}"`
    : ` aria-label="${a(txt)}"`;

  const img =
    `<img src="${base}${p.file}-400.webp"`
    + ` srcset="${base}${p.file}-400.webp 400w, ${base}${p.file}.webp 900w"`
    + ` sizes="${CFG.sizesAttr}" width="900" height="900"`
    + ` loading="lazy" decoding="async"${altAttrs}>`;

  if (variant === 'page') {
    const metaEs = p.place ? `${a(p.place)} · ${fecha(p, 'es')}` : fecha(p, 'es');
    const metaEn = p.place ? `${a(p.place)} · ${fecha(p, 'en')}` : fecha(p, 'en');
    const cap = bi
      ? `<span class="l-es">${a(es)}<span class="mg-meta">${metaEs}</span></span>`
        + `<span class="l-en">${a(en)}<span class="mg-meta">${metaEn}</span></span>`
      : `${a(txt)}<span class="mg-meta">${lang === 'en' ? metaEn : metaEs}</span>`;
    return `<figure><a class="mg-item" href="${base}${p.file}.webp" data-mg-index="${i}"${ariaAttrs}>`
         + `${img}</a><figcaption class="mg-figcap">${cap}</figcaption></figure>`;
  }

  const cap = bi
    ? `<span class="l-es">${a(es)}</span><span class="l-en">${a(en)}</span>`
    : a(txt);
  return `<figure class="mg-item" data-mg-index="${i}" tabindex="0" role="button"${ariaAttrs}>`
       + `${img}<figcaption>${cap}</figcaption></figure>`;
}

function gridHTML(photos, target) {
  return `<div class="mg-grid">`
       + photos.map((p, i) => itemHTML(p, i, target)).join('')
       + `</div>`;
}

async function writeBlock(target, photos) {
  const file = path.join(CFG.root, target.file);
  if (!await exists(file)) { log(`(no existe ${target.file}, se omite)`); return 'absent'; }
  const html = await fs.readFile(file, 'utf8');
  const start = `<!-- MUSUBI-GALLERY:${target.marker}:START -->`;
  const end   = `<!-- MUSUBI-GALLERY:${target.marker}:END -->`;
  const i = html.indexOf(start), j = html.indexOf(end);
  if (i === -1 || j === -1 || j < i) {
    warn(`${target.file} no tiene las marcas ${target.marker}. No se ha tocado el fichero.`);
    return 'missing';
  }
  const list = target.all ? photos : photos.slice(0, CFG.bakeCount);
  const next = html.slice(0, i + start.length)
             + gridHTML(list, target)
             + html.slice(j);
  if (next === html) { log(`${target.file} ya estaba al día`); return 'nochange'; }
  await fs.writeFile(file, next, 'utf8');
  log(`Actualizado ${target.file} (${list.length} fotos)`);
  return 'written';
}

/* Datos estructurados de la galería: una ficha por foto, con su pie como
   descripción. Es lo que permite que las imágenes se indexen con texto. */
async function writeJsonLd(target, photos) {
  if (!target.jsonld) return 'absent';
  const file = path.join(CFG.root, target.file);
  if (!await exists(file)) return 'absent';
  const html = await fs.readFile(file, 'utf8');
  const start = '<!-- MUSUBI-GALLERY:JSONLD:START -->';
  const end = '<!-- MUSUBI-GALLERY:JSONLD:END -->';
  const i = html.indexOf(start), j = html.indexOf(end);
  if (i === -1 || j === -1 || j < i) {
    warn(`${target.file} no tiene las marcas JSONLD.`);
    return 'missing';
  }
  const site = 'https://larrelongdistance.org';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: target.lang === 'en' ? 'Images · LARRE Long Distance ®' : 'Imágenes · LARRE Long Distance ®',
    url: target.jsonld,
    inLanguage: target.lang === 'en' ? 'en-GB' : 'es-ES',
    isPartOf: { '@type': 'WebSite', name: 'LARRE Long Distance ®', url: site + '/' },
    associatedMedia: photos.map((p) => ({
      '@type': 'ImageObject',
      contentUrl: `${site}/${CFG.fotosDir}/${p.file}.webp`,
      thumbnailUrl: `${site}/${CFG.fotosDir}/${p.file}-400.webp`,
      width: 900, height: 900,
      datePublished: p.date,
      caption: (target.lang === 'en' ? (p.en || p.es) : p.es) || '',
      ...(p.place ? { contentLocation: { '@type': 'Place', name: p.place } } : {}),
      creditText: 'LARRE Long Distance ®',
      license: site + '/',
      acquireLicensePage: site + '/#contacto',
    })),
  };
  const tag = `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
  const next = html.slice(0, i + start.length) + tag + html.slice(j);
  if (next === html) return 'nochange';
  await fs.writeFile(file, next, 'utf8');
  log(`Datos estructurados actualizados en ${target.file}`);
  return 'written';
}

async function writeData(photos) {
  const file = path.join(CFG.root, 'gallery-data.js');
  let prevData = null;
  if (await exists(file)) {
    try {
      const raw = await fs.readFile(file, 'utf8');
      prevData = JSON.parse(raw.replace(/^\s*window\.MUSUBI_GALLERY\s*=\s*/, '').replace(/;\s*$/, ''));
    } catch { prevData = null; }
  }
  const same = prevData && JSON.stringify(prevData.photos) === JSON.stringify(photos);
  const data = {
    account: CFG.account,
    profileUrl: CFG.profileUrl,
    // si no hay cambio real, se conserva el sello anterior: así no se
    // generan commits ni republicaciones diarias sin motivo
    updated: same ? prevData.updated : new Date().toISOString(),
    photos,
  };
  if (same) { log('gallery-data.js sin cambios'); return false; }
  await fs.writeFile(file, `window.MUSUBI_GALLERY=${JSON.stringify(data)};\n`, 'utf8');
  log(`gallery-data.js escrito con ${photos.length} fotos`);
  return true;
}

async function touchSitemap(changed) {
  if (!changed) return false;
  const f = path.join(CFG.root, 'sitemap.xml');
  if (!await exists(f)) return false;
  const today = new Date().toISOString().slice(0, 10);
  const xml = await fs.readFile(f, 'utf8');
  const next = xml.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  if (next !== xml) { await fs.writeFile(f, next, 'utf8'); log('sitemap.xml actualizado'); return true; }
  return false;
}


/* ── Modo importación ──────────────────────────────────────────
   Con IG_IMPORT=<carpeta> el robot NO llama a Instagram: lee una
   exportación oficial («Exportar tu información») ya descomprimida.
   Sirve para arrancar la galería antes de tener la clave de Meta, y
   deja los ficheros exactamente en el mismo formato, de modo que el
   día que la clave exista el robot continúa sin rehacer nada.      */
async function leerExportacion(dir) {
  const candidatos = [];
  async function buscar(d, prof = 0) {
    if (prof > 4) return;
    let entradas = [];
    try { entradas = await fs.readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entradas) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await buscar(p, prof + 1);
      else if (/^posts.*\.json$/i.test(e.name) || /^posts_\d+\.json$/i.test(e.name)) candidatos.push(p);
    }
  }
  await buscar(dir);
  if (!candidatos.length) throw new Error(`No encuentro ningún posts_*.json dentro de ${dir}. ¿Es la carpeta de la exportación?`);
  log(`Exportación: ${candidatos.length} fichero(s) de publicaciones`);

  const items = [];
  for (const f of candidatos) {
    let datos;
    try { datos = JSON.parse(await fs.readFile(f, 'utf8')); }
    catch (e) { warn(`No pude leer ${path.basename(f)}: ${e.message}`); continue; }
    const lista = Array.isArray(datos) ? datos : (datos.photos || datos.posts || []);
    for (const post of lista) {
      const medios = post.media || [];
      const primero = medios.find((m) => /\.(jpe?g|png|webp|heic)$/i.test(m.uri || '')) || medios[0];
      if (!primero || !primero.uri) continue;
      // El pie puede estar en el post o en el primer medio
      const pie = post.title || primero.title || '';
      const ts = post.creation_timestamp || primero.creation_timestamp || 0;
      items.push({
        rutaRelativa: primero.uri,
        caption: pie,
        timestamp: ts ? new Date(ts * 1000).toISOString() : new Date().toISOString(),
        raizExport: dir,
      });
    }
  }
  if (!items.length) throw new Error('La exportación no contiene publicaciones con imagen.');
  items.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  log(`Publicaciones con imagen encontradas: ${items.length}`);
  return items;
}

/* Localiza el fichero de imagen dentro de la exportación: las rutas del
   JSON son relativas a la raíz del zip, pero no siempre coinciden. */
async function localizarMedio(item) {
  const directo = path.join(item.raizExport, item.rutaRelativa);
  if (await exists(directo)) return directo;
  const base = path.basename(item.rutaRelativa);
  let encontrado = null;
  async function buscar(d, prof = 0) {
    if (encontrado || prof > 5) return;
    let entradas = [];
    try { entradas = await fs.readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entradas) {
      if (encontrado) return;
      const p = path.join(d, e.name);
      if (e.isDirectory()) await buscar(p, prof + 1);
      else if (e.name === base) encontrado = p;
    }
  }
  await buscar(item.raizExport);
  return encontrado;
}

/* ── Principal ─────────────────────────────────────────────── */
async function main() {
  const IMPORT = process.env.IG_IMPORT;
  if (!IMPORT && !TOKEN) throw new Error('Falta la clave: define el secret IG_TOKEN en el repositorio.');

  const state = await readJSON(STATE_FILE, {});
  const refreshed = IMPORT ? null : await refreshToken();
  if (refreshed) Object.assign(state, refreshed);

  // Aviso temprano: si la clave lleva demasiado sin renovarse, avisa antes de morir
  if (state.refreshed_at) {
    const days = (Date.now() - Date.parse(state.refreshed_at)) / 86400000;
    if (days > 45) warn(`La clave de Meta lleva ${Math.round(days)} días sin renovarse (caduca a los 60). Hay que regenerarla.`);
  }

  const manual = await readJSON(CAPTIONS_FILE, {});
  const photos = [];

  if (IMPORT) {
    const items = await leerExportacion(IMPORT);
    let n = 0;
    for (const item of items) {
      const origen = await localizarMedio(item);
      if (!origen) { warn(`No encuentro el fichero ${item.rutaRelativa}`); continue; }
      const date = item.timestamp.slice(0, 10);
      const code = 'IM' + String(++n).padStart(4, '0');
      const file = `ig-${date}-${code.slice(-6)}`;
      try {
        const dir = path.join(CFG.root, CFG.fotosDir);
        await fs.mkdir(dir, { recursive: true });
        const buf = await fs.readFile(origen);
        await sharp(buf).rotate().resize(900, 900, { fit: 'cover', position: 'centre' })
          .webp({ quality: 82 }).toFile(path.join(dir, `${file}.webp`));
        await sharp(buf).rotate().resize(400, 400, { fit: 'cover', position: 'centre' })
          .webp({ quality: 80 }).toFile(path.join(dir, `${file}-400.webp`));
        log(`Foto importada: ${file}  ←  ${path.basename(origen)}`);
      } catch (e) { warn(`Fallo al convertir ${item.rutaRelativa}: ${e.message}`); continue; }
      const auto = parseCaption(item.caption);
      const over = manual[file] || {};
      photos.push({
        id: code, file, date,
        place: over.place ?? '',
        permalink: CFG.profileUrl,
        es: over.es ?? auto.es, eu: over.eu ?? auto.eu, en: over.en ?? auto.en ?? '',
      });
    }
  } else {

  const media = await fetchMedia();
  for (const item of media) {
    const url = imageUrlOf(item);
    if (!url) { log(`(sin imagen utilizable: ${item.id})`); continue; }
    const code = shortcodeFrom(item.permalink, item.id);
    const date = (item.timestamp || new Date().toISOString()).slice(0, 10);
    const file = `ig-${date}-${code.slice(-6)}`;

    try { await ensurePhoto(file, url); }
    catch (e) { warn(`Fallo al procesar ${file}: ${e.message}`); continue; }

    const auto = parseCaption(item.caption);
    const over = manual[file] || manual[code] || {};
    photos.push({
      id: code,
      file,
      date,
      place: over.place ?? '',
      permalink: item.permalink || `${CFG.profileUrl}`,
      es: over.es ?? auto.es,
      eu: over.eu ?? auto.eu,
      en: over.en ?? auto.en ?? '',
    });
  }
  }

  if (!photos.length) throw new Error('Ninguna publicación utilizable. Nada se ha modificado.');
  photos.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  let changed = await writeData(photos);
  let withMarkers = 0;
  for (const t of CFG.targets) {
    const r = await writeBlock(t, photos);
    if (r === 'written') { changed = true; withMarkers++; }
    if (r === 'nochange') withMarkers++;
    const j = await writeJsonLd(t, photos);
    if (j === 'written') changed = true;
  }
  // Si ninguna página tiene las marcas, el robot no pinta en ningún sitio:
  // eso es un fallo de montaje y debe avisar a gritos, no callar.
  if (withMarkers === 0) {
    throw new Error('Ninguna página tiene las marcas MUSUBI-GALLERY. '
      + 'Revisa que index.html lleve <!-- MUSUBI-GALLERY:ES:START --> y su :END.');
  }
  await touchSitemap(changed);
  if (!changed) log('Nada que publicar: la web ya estaba al día');
  await fs.writeFile(STATE_FILE, JSON.stringify(state, null, 2) + '\n', 'utf8');

  console.log(`\n✓ Sincronización terminada · ${photos.length} fotos · `
    + `${changed ? 'web actualizada' : 'sin cambios'} · ${warnings.length} avisos`);
  if (warnings.length) { console.log('\nAvisos:'); warnings.forEach((w) => console.log(' -', w)); }
}

main().catch((e) => { console.error('\n✗', e.message); process.exit(1); });
