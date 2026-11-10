# Herramientas

Requisitos: Node 20+. Una vez: `cd tools && npm install` (instala `sharp`). Los PDF, iconos e imágenes OG necesitan además Playwright con Chromium.

| Orden | Qué hace |
|---|---|
| `node tools/build.mjs` | Genera todo `public/` (3 portadas, legales, 404, sitemap, robots, manifest, llms.txt) |
| `node tools/prepare-route.mjs track.gpx` | Limpia el GPX y recalcula mapa, perfil y cifras medidas |
| `node tools/make-pdfs.mjs` | PDF de Guía y Reglamento × ES/EU/EN (contenido en `tools/docs/`) |
| `node tools/make-icons.mjs` | Favicon, iconos de app e imágenes OG (1200×630) |
| `node tools/optimize-images.mjs` | AVIF de las fotos de `public/fotos/` |
| `node tools/make-netlify.mjs` | Regenera `netlify.toml` |
| `node tools/dev-server.mjs` | Servidor local con las funciones `/api` |
| `python3 tools/check-links.py URL` | Rastreo de enlaces, anclas, hreflang y canonical |

## Actualizar la galería de Instagram (5 pasos, sin cuenta de Facebook ni API de Meta)
1. En Instagram: **Configuración → Centro de cuentas → Tu información y permisos → Descargar tu información** → *Descargar o transferir información* → tu cuenta → **Publicaciones** → formato **JSON** → calidad alta. Te llega un enlace por correo.
2. Descarga el ZIP y descomprímelo en una carpeta.
3. `node tools/import-instagram.mjs <carpeta-descomprimida>` copia las fotos nuevas, crea WebP y AVIF y las añade (ocultas) a `tools/data/galeria.json`.
4. En `tools/data/galeria.json` escribe para cada foto nueva el `alt` en `es`, `eu` y `en`, pon `"oculta": false` y, si quieres que enlace a su publicación, pega la URL en `permalink` (si está vacío, enlaza al perfil). El generador se niega a publicar una foto visible sin alt en los tres idiomas.
5. `node tools/build.mjs`, `git commit`, `git push`. Para retirar una foto: `"oculta": true`.

Las imágenes se sirven desde el propio sitio (no desde el CDN de Instagram).

## Control SEO (desde el 10 nov 2026)
`node tools/check-seo.mjs --root public` comprueba que todo el JSON-LD es válido, que cada imagen
(ImageObject) lleva creator, creditText, copyrightNotice, license y acquireLicensePage, y que los
`<lastmod>` del sitemap no van por detrás del último cambio de cada página. Lo ejecuta la Action
«Control SEO» en cada push y a diario. `tools/build.mjs` ya genera los `<lastmod>` reales por página
y los campos de licencia (función `imgLicense`): cualquier imagen nueva en JSON-LD debe usarla.
