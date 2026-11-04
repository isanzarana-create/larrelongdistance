/**
 * Genera las variantes AVIF de las fotos de public/fotos a partir de los WebP.
 * Uso: node tools/optimize-images.mjs   (desde la raíz del repo)
 * Entrada:  public/fotos/<id>.webp (900 px) y <id>-400.webp
 * Salida:   public/fotos/<id>.avif y <id>-400.avif
 */
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../public/fotos');
for (const f of readdirSync(DIR).filter((x) => x.endsWith('.webp'))) {
  const out = resolve(DIR, f.replace(/\.webp$/, '.avif'));
  const info = await sharp(resolve(DIR, f)).avif({ quality: 52, effort: 6 }).toFile(out);
  console.log(f.replace('.webp', '.avif'), Math.round(info.size / 1024) + ' KB');
}
