/**
 * Importa fotos desde la exportación oficial de Instagram (formato JSON) a la galería de la web.
 * Uso:  node tools/import-instagram.mjs <carpeta-de-la-exportación-descomprimida>
 * - Busca posts_*.json (your_instagram_activity/media/ o content/), copia cada imagen nueva,
 *   genera WebP y AVIF (900 y 400 px) en public/fotos/ y las añade a tools/data/galeria.json.
 * - Las fotos nuevas quedan con "oculta": true y alt vacío hasta que escribas el texto alternativo en es/eu/en.
 * - No usa la API de Meta ni necesita cuenta de desarrollador.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GAL = resolve(ROOT, 'tools/data/galeria.json');
const OUT = resolve(ROOT, 'public/fotos');
const src = process.argv[2];
if (!src || !existsSync(src)) { console.error('Uso: node tools/import-instagram.mjs <carpeta-de-la-exportación>'); process.exit(1); }

const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const fixText = (s) => { try { return Buffer.from(String(s || ''), 'latin1').toString('utf8'); } catch { return String(s || ''); } }; // Instagram guarda UTF-8 mal codificado
const jsons = walk(src).filter((f) => /posts_\d+\.json$/.test(f));
if (!jsons.length) { console.error('No encuentro posts_*.json. ¿Pediste la exportación en formato JSON y con «Publicaciones»?'); process.exit(1); }

const data = JSON.parse(readFileSync(GAL, 'utf8'));
const known = new Set(data.fotos.map((f) => f.file));
let added = 0;
for (const j of jsons) {
  for (const post of JSON.parse(readFileSync(j, 'utf8'))) {
    for (const m of post.media || []) {
      if (!/\.(jpe?g|png|webp|heic)$/i.test(m.uri)) continue;
      const file = resolve(src, m.uri);
      if (!existsSync(file)) continue;
      const ts = m.creation_timestamp || post.creation_timestamp;
      const date = new Date(ts * 1000).toISOString().slice(0, 10);
      const id = `ig-${date}-${createHash('sha1').update(basename(m.uri)).digest('hex').slice(0, 6)}`;
      if (known.has(id)) continue;
      const img = sharp(file).rotate().resize({ width: 900, height: 900, fit: 'cover' });
      await img.clone().webp({ quality: 78 }).toFile(join(OUT, `${id}.webp`));
      await img.clone().avif({ quality: 52, effort: 6 }).toFile(join(OUT, `${id}.avif`));
      const sm = img.clone().resize(400, 400);
      await sm.clone().webp({ quality: 74 }).toFile(join(OUT, `${id}-400.webp`));
      await sm.clone().avif({ quality: 50, effort: 6 }).toFile(join(OUT, `${id}-400.avif`));
      data.fotos.push({ file: id, date, permalink: '', oculta: true, pie_original: fixText(m.title || post.title), alt: { es: '', eu: '', en: '' } });
      known.add(id); added++; console.log('+', id);
    }
  }
}
data.fotos.sort((a, b) => b.date.localeCompare(a.date));
writeFileSync(GAL, JSON.stringify(data, null, 2) + '\n');
console.log(`\n${added} foto(s) nueva(s). Ahora, en tools/data/galeria.json: escribe el alt en es/eu/en y cambia "oculta" a false (y, si quieres, pega el enlace de la publicación en "permalink").`);
