# ultratraillarre.org

Web de Ultra Trail Larre® (ES/EU/EN). HTML estático generado con Python; Netlify publica `site/` sin paso de build.

- `tools/build_all.sh` regenera todo (páginas, SEO, sitemap, llms, cabeceras). Requiere Python 3 y Pillow.
- `site/` es lo único que se publica. `netlify/functions/` contiene la preinscripción (doble confirmación), `/api/lista` y la purga.
- `scripts/instagram-sync.mjs` + `.github/workflows/instagram-ultratraillarre.yml`: robot diario de la galería. Textos a mano en `tools/galeria-pies.json`.
- Variables en Netlify: `SIGNING_SECRET`, `RESEND_API_KEY`, `ADMIN_TOKEN`, `NETLIFY_AUTH_TOKEN` (opcional), `MAIL_FROM` (opcional), `OPEN_AT`/`ALLOW_EARLY` (solo pruebas).
- El GPX oficial no está en el repositorio: se publica 30 días antes de la salida (`site/larre-2027.gpx` + enlace en los generadores).
