/**
 * Sincroniza la galería de la web con Instagram (@ultratraillarre), una vez por
 * semana y sin intervención. Hermano del importador manual import-instagram.mjs:
 * hace lo mismo, pero las fotos las pide a Meta en vez de a un ZIP descargado.
 *
 * Qué hace, por orden:
 *   1. Renueva la clave de acceso (Meta las caduca a los 60 días).
 *   2. Pide las últimas publicaciones a graph.instagram.com.
 *   3. Descarga las fotos nuevas y genera WebP y AVIF (900 y 400 px).
 *   4. Las apunta en tools/data/galeria.json OCULTAS y sin texto alternativo.
 *
 * Las fotos nuevas NO salen en la web hasta que alguien les escribe el alt en
 * es/eu/en y pone "oculta": false (tools/build.mjs se niega a publicar una foto
 * visible sin alt en los tres idiomas). Así el robot nunca publica solo un texto
 * mal escrito, y la web se mantiene accesible.
 *
 * Variables:
 *   IG_TOKEN        clave de acceso de Instagram (obligatoria)
 *   IG_API_BASE     dirección de la API (para pruebas en seco)
 *   IG_API_VERSION  versión de la API (por defecto v23.0)
 *   IG_LIMIT        cuántas publicaciones pedir (por defecto 24)
 *   IG_ACCOUNT      nombre de la cuenta, solo para los mensajes
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GAL = path.join(ROOT, 'tools/data/galeria.json');
const OUT = path.join(ROOT, 'public/fotos');

const TOKEN = process.env.IG_TOKEN;
const API_BASE = (process.env.IG_API_BASE || 'https://graph.instagram.com').replace(/\/$/, '');
const VERSION = process.env.IG_API_VERSION || 'v23.0';
const LIMIT = Number(process.env.IG_LIMIT || 24);
const CUENTA = process.env.IG_ACCOUNT || 'ultratraillarre';

const avisos = [];
const log = (m) => console.log('·', m);
const warn = (m) => { avisos.push(m); console.log('⚠', m); };

/* ── 1. Clave ──────────────────────────────────────────────── */
async function renovarClave() {
  const url = `${API_BASE}/refresh_access_token`
            + `?grant_type=ig_refresh_token&access_token=${encodeURIComponent(TOKEN)}`;
  let r;
  try { r = await fetch(url); }
  catch (e) { warn(`No se pudo contactar con Meta para renovar la clave: ${e.message}`); return; }
  const body = await r.json().catch(() => ({}));
  if (!r.ok || !body.access_token) {
    warn(`Meta no renovó la clave (${r.status}): ${body?.error?.message || 'sin detalle'}. `
       + 'La clave actual sigue valiendo, pero conviene revisarlo.');
    return;
  }
  log(`Clave renovada por Meta · vigencia ${Math.round((body.expires_in || 0) / 86400)} días`);
  // La clave nueva nunca entra en el repositorio: la recoge el workflow.
  if (process.env.RUNNER_TEMP) {
    await fs.writeFile(path.join(process.env.RUNNER_TEMP, 'ig_token_new.txt'), body.access_token, 'utf8');
  }
}

/* ── 2. Publicaciones ──────────────────────────────────────── */
const CAMPOS_TODO = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url}';
const CAMPOS_MIN  = 'id,caption,media_type,media_url,permalink,timestamp';

async function pedirPublicaciones() {
  for (const campos of [CAMPOS_TODO, CAMPOS_MIN]) {
    const url = `${API_BASE}/${VERSION}/me/media`
              + `?fields=${encodeURIComponent(campos)}&limit=${LIMIT}`
              + `&access_token=${encodeURIComponent(TOKEN)}`;
    let r;
    try { r = await fetch(url); } catch (e) { warn(`Meta no responde: ${e.message}`); continue; }
    const body = await r.json().catch(() => ({}));
    if (r.ok && Array.isArray(body.data)) { log(`Instagram devolvió ${body.data.length} publicaciones`); return body.data; }
    warn(`Instagram rechazó la petición (${r.status}): ${body?.error?.message || 'sin detalle'}`
       + (campos === CAMPOS_TODO ? ' · reintento con campos mínimos' : ''));
  }
  throw new Error('Instagram no devolvió ninguna publicación. Revisa la clave y el permiso instagram_business_basic.');
}

/* De un vídeo o un reel se guarda su portada; de un carrusel, la primera foto. */
function urlDeImagen(item) {
  if (item.media_type === 'IMAGE') return item.media_url || null;
  if (item.media_type === 'CAROUSEL_ALBUM') {
    const hijos = item.children?.data || [];
    return hijos.find((k) => k.media_type === 'IMAGE' && k.media_url)?.media_url || item.media_url || null;
  }
  return item.thumbnail_url || null;
}

/* El nombre sale del código de la publicación, no de un contador: así no cambia
   nunca y el alt escrito a mano sigue apuntando a su foto. */
function nombreDe(item, fecha) {
  const code = (item.permalink || '').match(/\/(?:p|reel|tv)\/([^/?#]+)/)?.[1] || String(item.id || '');
  return `ig-${fecha}-${code.slice(-6)}`;
}

/* ── 3. Descarga y conversión ──────────────────────────────── */
async function guardarFoto(file, url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`descarga ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  const img = sharp(buf).rotate().resize({ width: 900, height: 900, fit: 'cover' });
  await img.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${file}.webp`));
  await img.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT, `${file}.avif`));
  const sm = img.clone().resize(400, 400);
  await sm.clone().webp({ quality: 74 }).toFile(path.join(OUT, `${file}-400.webp`));
  await sm.clone().avif({ quality: 50, effort: 6 }).toFile(path.join(OUT, `${file}-400.avif`));
}

/* ── Principal ─────────────────────────────────────────────── */
async function main() {
  if (!TOKEN) throw new Error('Falta la clave: define el secret IG_TOKEN en el repositorio.');
  await fs.mkdir(OUT, { recursive: true });
  await renovarClave();

  const data = JSON.parse(await fs.readFile(GAL, 'utf8'));
  const conocidas = new Set(data.fotos.map((f) => f.file));
  const items = await pedirPublicaciones();

  let nuevas = 0;
  for (const item of items) {
    const url = urlDeImagen(item);
    if (!url) { log(`Sin imagen utilizable: ${item.id}`); continue; }
    const fecha = (item.timestamp || new Date().toISOString()).slice(0, 10);
    const file = nombreDe(item, fecha);
    if (conocidas.has(file)) continue;          // ya estaba, con o sin alt

    try { await guardarFoto(file, url); }
    catch (e) { warn(`No se pudo procesar ${file}: ${e.message}`); continue; }

    data.fotos.push({
      file,
      date: fecha,
      permalink: item.permalink || '',
      oculta: true,
      motivo: 'Pendiente de texto alternativo en es/eu/en',
      pie_original: (item.caption || '').trim(),
      alt: { es: '', eu: '', en: '' },
    });
    conocidas.add(file);
    nuevas++;
    log(`Foto nueva (oculta hasta tener alt): ${file}`);
  }

  if (!nuevas) {
    console.log(`\n✓ Sin novedades en @${CUENTA} · la galería ya estaba al día · ${avisos.length} avisos`);
    return;
  }

  data.fotos.sort((a, b) => b.date.localeCompare(a.date));
  await fs.writeFile(GAL, JSON.stringify(data, null, 2) + '\n', 'utf8');

  console.log(`\n✓ ${nuevas} foto(s) nueva(s) de @${CUENTA}, guardadas OCULTAS.`);
  console.log('  Para publicarlas: escribe el alt en es/eu/en en tools/data/galeria.json,');
  console.log('  pon "oculta": false y ejecuta node tools/build.mjs.');
  if (avisos.length) { console.log('\nAvisos:'); avisos.forEach((a) => console.log(' -', a)); }
}

main().catch((e) => { console.error('\n✗', e.message); process.exit(1); });
