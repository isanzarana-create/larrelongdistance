/**
 * Iconos (favicon, apple-touch, manifest) e imágenes Open Graph.
 * Uso: node tools/make-icons.mjs   (necesita rsvg-convert, ImageMagick y Playwright)
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import es from './i18n/es.mjs'; import eu from './i18n/eu.mjs'; import en from './i18n/en.mjs';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = resolve(ROOT, 'public');
const G = '#7A1F2B', S = '#EFE6D2';
mkdirSync(resolve(PUB, 'assets'), { recursive: true });

// Marca: una «L» geométrica sobre granate. Sin curvas onduladas.
const L = (fill) => `<path fill="${fill}" d="M36 24h14v52h30v14H36z"/>`;
const svg = (bg, r, inner = L(S)) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="${r}" fill="${bg}"/>${inner}</svg>`;
writeFileSync(resolve(PUB, 'favicon.svg'), svg(G, 28));
const png = (name, size, s) => { writeFileSync(`/tmp/${name}.svg`, s); execFileSync('rsvg-convert', ['-w', String(size), '-h', String(size), `/tmp/${name}.svg`, '-o', resolve(PUB, `${name}.png`)]); };
png('favicon-32', 32, svg(G, 28));
png('apple-touch-icon', 180, svg(G, 0));
png('icon-192', 192, svg(G, 28));
png('icon-512', 512, svg(G, 28));
// maskable: contenido en la zona segura central (80 %)
png('icon-512-maskable', 512, svg(G, 0, `<g transform="translate(64 64) scale(.78) translate(-64 -64)">${L(S)}</g>`));
png('fav48', 48, svg(G, 28)); png('fav16', 16, svg(G, 28));
execFileSync('convert', [resolve(PUB, 'fav16.png'), resolve(PUB, 'favicon-32.png'), resolve(PUB, 'fav48.png'), resolve(PUB, 'favicon.ico')]);
execFileSync('rm', ['-f', resolve(PUB, 'fav16.png'), resolve(PUB, 'fav48.png')]);

// Open Graph 1200×630
const { chromium } = createRequire(import.meta.url)('playwright');
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const t of [es, eu, en]) {
  const facts = t.hero.facts.slice(0, 3).map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join('');
  const html = `<!doctype html><meta charset=utf-8><style>
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:F;src:url(file://${PUB}/fonts/inter-latin-800-normal.woff2);font-weight:700 900}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-400-normal.woff2);font-weight:400}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-500-normal.woff2);font-weight:500}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-600-normal.woff2);font-weight:600}
@font-face{font-family:M;src:url(file://${PUB}/fonts/ibm-plex-mono-latin-700-normal.woff2);font-weight:700 800}
*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;background:${S};color:#1F1915;font-family:M;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
.bar{position:absolute;left:0;top:0;bottom:0;width:18px;background:${G}}
.ey{font-weight:700;font-size:22px;letter-spacing:.18em;text-transform:uppercase;color:${G}}
h1{font-family:F;font-weight:800;font-size:124px;line-height:.95;letter-spacing:-.035em;text-transform:uppercase;margin:22px 0 26px}
h1 sup{font-size:.4em;vertical-align:super;line-height:0}
p{font-family:M;font-size:28px;line-height:1.35;max-width:960px}
ul{list-style:none;padding:0;display:flex;gap:64px;border-top:1px solid #CDBE9C;padding-top:26px}
li{display:flex;flex-direction:column;gap:6px}b{font-family:M;font-weight:600;font-size:44px;line-height:1}span{font-size:20px;color:#4B4036}
</style><div class=bar></div><div><div class=ey>${t.hero.eyebrow}</div><h1>Ultra Trail Larre<sup>®</sup></h1><p>${t.hero.claim}</p></div><ul>${facts}</ul>`;
  writeFileSync('/tmp/og.html', html); await p.goto('file:///tmp/og.html');
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: resolve(PUB, `assets/og-${t.lang}.png`) });
}
await b.close();
console.log('ok');
