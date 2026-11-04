#!/usr/bin/env node
/**
 * Genera el detalle del recorrido para el mapa interactivo:
 *   public/assets/ruta.json  -> muestras cada 200 m: [km, lat, lon, altitud]
 * a partir del GPX publicado (public/descargas/ultra-trail-larre.gpx).

 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const xml = readFileSync(resolve(ROOT, 'public/descargas/ultra-trail-larre.gpx'), 'utf8');
const pts = [...xml.matchAll(/<trkpt\s+lat="([-\d.]+)"\s+lon="([-\d.]+)"\s*>\s*<ele>([-\d.]+)<\/ele>/g)].map((m) => ({ lat: +m[1], lon: +m[2], ele: +m[3] }));
const R = 6371008.8, rad = (d) => (d * Math.PI) / 180;
const hav = (a, b) => { const dp = rad(b.lat - a.lat), dl = rad(b.lon - a.lon); const h = Math.sin(dp / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dl / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + hav(pts[i - 1], pts[i]));
const STEP = 200, out = []; let j = 0;
for (let d = 0; d <= cum.at(-1); d += STEP) {
  while (j < pts.length - 2 && cum[j + 1] < d) j++;
  const f = (d - cum[j]) / Math.max(cum[j + 1] - cum[j], 1e-9), a = pts[j], b = pts[j + 1];
  out.push([+(d / 1000).toFixed(1), +(a.lat + (b.lat - a.lat) * f).toFixed(5), +(a.lon + (b.lon - a.lon) * f).toFixed(5), Math.round(a.ele + (b.ele - a.ele) * f)]);
}
const fp = resolve(ROOT, 'tools/data/firmes.json');
const firmes = null;
const doc = { step: STEP, total: +(cum.at(-1) / 1000).toFixed(2), p: out };

writeFileSync(resolve(ROOT, 'public/assets/ruta.json'), JSON.stringify(doc));
console.log("muestras", out.length);
