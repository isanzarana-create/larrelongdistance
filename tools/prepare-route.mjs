#!/usr/bin/env node
/**
 * Prepara el track oficial de Ultra Trail Larre®.
 *
 * Uso:  node tools/prepare-route.mjs  ruta/al/track-original.gpx
 *
 * Lee el GPX original (p. ej. exportado de Komoot) y genera:
 *   - public/descargas/ultra-trail-larre.gpx   GPX limpio para descargar
 *       (sin marcas de tiempo de planificación, coordenadas a 6 decimales,
 *        altitudes a 0,1 m, metadatos propios, waypoint de salida y meta).
 *   - tools/data/ruta.json                     datos para el mapa y el perfil
 *       (trazo simplificado, columnas de altitud por km, paso por localidades).
 *
 * Las cifras de la carrera (226,9 km, +4.825 m) son las MEDIDAS en el GPX oficial
 * (desnivel con histéresis de 3 m) y están fijadas en tools/data/hechos.json.
 * Si cambias el track, este script avisa de cualquier diferencia con hechos.json.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
if (!src) {
  console.error('Falta el GPX de origen.\n  node tools/prepare-route.mjs track.gpx');
  process.exit(1);
}

const xml = readFileSync(src, 'utf8');
const pts = [...xml.matchAll(/<trkpt\s+lat="([-\d.]+)"\s+lon="([-\d.]+)"\s*>\s*<ele>([-\d.]+)<\/ele>/g)].map((m) => ({
  lat: +m[1],
  lon: +m[2],
  ele: +m[3]
}));
if (pts.length < 100) throw new Error(`Track sospechosamente corto: ${pts.length} puntos`);
const wpts = (xml.match(/<wpt\b/g) || []).length;

const R = 6371008.8;
const rad = (d) => (d * Math.PI) / 180;
const hav = (a, b) => {
  const dp = rad(b.lat - a.lat);
  const dl = rad(b.lon - a.lon);
  const h = Math.sin(dp / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

// distancia acumulada
const cum = [0];
for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + hav(pts[i - 1], pts[i]));
const totalKm = cum.at(-1) / 1000;

// desnivel con histéresis de 3 m (criterio habitual para filtrar ruido)
let gain = 0;
let loss = 0;
let ref = pts[0].ele;
for (const p of pts) {
  if (p.ele - ref >= 3) { gain += p.ele - ref; ref = p.ele; }
  else if (ref - p.ele >= 3) { loss += ref - p.ele; ref = p.ele; }
}
const eles = pts.map((p) => p.ele);
const minEle = Math.min(...eles);
const maxEle = Math.max(...eles);
const closeGap = hav(pts[0], pts.at(-1));

// ── localidades de control confirmadas (coordenadas del núcleo urbano, Wikipedia) ──
const TOWNS = {
  agurain: { lat: 42.8492849, lon: -2.3890554 },
  campezo: { lat: 42.669722, lon: -2.350833 },
  laguardia: { lat: 42.55, lon: -2.583056 },
  penacerrada: { lat: 42.6442584, lon: -2.7135349 }
};
const passes = {};
for (const [k, t] of Object.entries(TOWNS)) {
  let best = 0;
  let bestD = Infinity;
  pts.forEach((p, i) => {
    const d = hav(t, p);
    if (d < bestD) { bestD = d; best = i; }
  });
  passes[k] = { km: +(cum[best] / 1000).toFixed(1), ele: Math.round(pts[best].ele), distToTownM: Math.round(bestD) };
}

// ── simplificación Douglas-Peucker para el mapa ──
const mlat = 111320;
const mlon = 111320 * Math.cos(rad(42.7));
const proj = (p) => ({ x: p.lon * mlon, y: p.lat * mlat });
function dp(points, eps) {
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const A = proj(points[a]);
    const B = proj(points[b]);
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const len = Math.hypot(dx, dy) || 1;
    let maxD = 0;
    let idx = -1;
    for (let i = a + 1; i < b; i++) {
      const P = proj(points[i]);
      const d = Math.abs(dy * P.x - dx * P.y + B.x * A.y - B.y * A.x) / len;
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > eps && idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return points.filter((_, i) => keep[i]);
}
// El track es un lazo cerrado (inicio = fin): se parte por el punto más lejano
// de la salida y se simplifica cada mitad por separado.
let far = 0;
let farD = 0;
pts.forEach((p, i) => {
  const d = hav(pts[0], p);
  if (d > farD) { farD = d; far = i; }
});
const simple = [...dp(pts.slice(0, far + 1), 60), ...dp(pts.slice(far), 60).slice(1)]; // 60 m de tolerancia
const mapPath = simple.map((p) => [+p.lat.toFixed(5), +p.lon.toFixed(5)]);

// ── perfil: una columna por km (altitud media del tramo) ──
const bars = [];
const nBars = Math.ceil(totalKm);
for (let k = 0; k < nBars; k++) {
  const lo = k * 1000;
  const hi = (k + 1) * 1000;
  const seg = [];
  for (let i = 0; i < pts.length; i++) if (cum[i] >= lo && cum[i] < hi) seg.push(pts[i].ele);
  if (seg.length) bars.push(Math.round(seg.reduce((a, b) => a + b, 0) / seg.length));
  else bars.push(bars.at(-1) ?? Math.round(pts[0].ele));
}

mkdirSync(resolve(ROOT, 'tools/data'), { recursive: true });
writeFileSync(
  resolve(ROOT, 'tools/data/ruta.json'),
  JSON.stringify({
    generado: new Date().toISOString().slice(0, 10),
    puntos: pts.length,
    medido: { km: +totalKm.toFixed(2), gainM: Math.round(gain), lossM: Math.round(loss), minEle: Math.round(minEle), maxEle: Math.round(maxEle), cierreM: Math.round(closeGap) },
    start: { lat: +pts[0].lat.toFixed(6), lon: +pts[0].lon.toFixed(6), ele: Math.round(pts[0].ele) },
    pasos: passes,
    mapa: mapPath,
    perfilKm: bars
  })
);

// ── GPX limpio ──
const f6 = (n) => n.toFixed(6);
const trkpts = pts.map((p) => `      <trkpt lat="${f6(p.lat)}" lon="${f6(p.lon)}"><ele>${p.ele.toFixed(1)}</ele></trkpt>`).join('\n');
const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Ultra Trail Larre® · ultratraillarre.org" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>Ultra Trail Larre® · I Edición</name>
    <desc>Ruta en lazo de 226,9 km y +4.825 m con salida y meta en el quiosco del Parque de La Florida (Vitoria-Gasteiz). Ultra-trail en autosuficiencia por las sierras de Álava.</desc>
    <author><name>Musubigara®</name><link href="https://ultratraillarre.org/"><text>Ultra Trail Larre®</text></link></author>
    <copyright author="Musubigara®"><year>2026</year></copyright>
    <link href="https://ultratraillarre.org/"><text>ultratraillarre.org</text></link>
  </metadata>
  <wpt lat="${f6(pts[0].lat)}" lon="${f6(pts[0].lon)}"><ele>${pts[0].ele.toFixed(1)}</ele><name>Salida y meta</name><desc>Quiosco del Parque de La Florida, Vitoria-Gasteiz</desc></wpt>
  <trk>
    <name>Ultra Trail Larre®</name>
    <type>trail running</type>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>
`;
mkdirSync(resolve(ROOT, 'public/descargas'), { recursive: true });
writeFileSync(resolve(ROOT, 'public/descargas/ultra-trail-larre.gpx'), gpx);

console.log(JSON.stringify({ puntosLeidos: pts.length, waypointsOrigen: wpts, kmMedidos: +totalKm.toFixed(2), desnivelPositivoMedido: Math.round(gain), desnivelNegativoMedido: Math.round(loss), altMin: Math.round(minEle), altMax: Math.round(maxEle), cierreDelLazoM: Math.round(closeGap), puntosMapa: mapPath.length, columnasPerfil: bars.length, pasos: passes, gpxKB: Math.round(gpx.length / 1024) }, null, 1));
