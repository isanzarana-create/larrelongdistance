/**
 * Genera netlify.toml (publicación, funciones, cabeceras de seguridad/caché y redirecciones 301).
 * Uso: node tools/make-netlify.mjs
 * Los antiguos dominios y rutas redirigen DIRECTAMENTE al destino final (sin cadenas de redirecciones).
 */
import { writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const NEW = 'https://ultratraillarre.org';
const OLD_HOSTS = ['larrelongdistance.org', 'www.larrelongdistance.org', 'larrelongdistance.com', 'www.larrelongdistance.com'];

// Rutas de la web anterior → ancla equivalente de la nueva.
const MAP = [
  ['/ruta', '/#ruta'], ['/reglamento', '/descargas/ultra-trail-larre-reglamento-es.pdf'], ['/guia-autosuficiencia', '/#la-carrera'], ['/como-llegar', '/#contacto'],
  ['/galeria', '/#instagram'], ['/preinscripcion', '/#preinscripcion'], ['/gracias', '/'],
  ['/en/route', '/en/#ruta'], ['/en/rules', '/descargas/ultra-trail-larre-reglamento-en.pdf'], ['/en/self-supported-ultra-guide', '/en/#la-carrera'], ['/en/getting-there', '/en/#contacto'],
  ['/en/gallery', '/en/#instagram'], ['/en/pre-registration', '/en/#preinscripcion'], ['/en/thanks', '/en/'],
  ['/og-larre.jpg', '/assets/og-es.png'], ['/sitemap.xml', '/sitemap.xml']
];
const R = (from, to, extra = '') => `[[redirects]]\n  from = "${from}"\n  to = "${to}"\n  status = 301\n  force = true${extra}\n`;
let redirects = '';
for (const h of OLD_HOSTS) for (const [a, b] of MAP) for (const slash of ['', '/']) redirects += R(`https://${h}${a}${slash}`, NEW + b) + '\n';
for (const h of OLD_HOSTS) redirects += R(`https://${h}/*`, `${NEW}/:splat`) + '\n' + R(`http://${h}/*`, `${NEW}/:splat`) + '\n';
redirects += R('https://www.ultratraillarre.org/*', `${NEW}/:splat`) + '\n' + R('http://www.ultratraillarre.org/*', `${NEW}/:splat`) + '\n';

const bootHash = createHash('sha256').update("document.documentElement.className='js'").digest('base64');
const CSP = [
  "default-src 'self'", `script-src 'self' 'sha256-${bootHash}'`, "style-src 'self'", "img-src 'self' data:", "font-src 'self'",
  "connect-src 'self'", "form-action 'self'", "frame-ancestors 'none'", "base-uri 'self'", "object-src 'none'", 'upgrade-insecure-requests'
].join('; ');

const toml = `# Generado por tools/make-netlify.mjs · no editar a mano (edita el script y vuelve a ejecutarlo).
[build]
  publish = "public"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"

[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"
    Cross-Origin-Opener-Policy = "same-origin"
    Content-Security-Policy = "${CSP}"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
[[headers]]
  for = "/"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
[[headers]]
  for = "/fotos/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
[[headers]]
  for = "/descargas/*"
  [headers.values]
    Cache-Control = "public, max-age=3600, must-revalidate"
[[headers]]
  for = "/api/*"
  [headers.values]
    Cache-Control = "no-store"
[[headers]]
  for = "/descargas/*.gpx"
  [headers.values]
    Content-Type = "application/gpx+xml"
[[headers]]
  for = "/llms.txt"
  [headers.values]
    Content-Type = "text/plain; charset=utf-8"
[[headers]]
  for = "/site.webmanifest"
  [headers.values]
    Content-Type = "application/manifest+json"

# ── Redirecciones ──────────────────────────────────────────────
${redirects}`;
writeFileSync(resolve(ROOT, 'netlify.toml'), toml);
console.log('netlify.toml escrito · hash CSP del script de arranque:', bootHash);
