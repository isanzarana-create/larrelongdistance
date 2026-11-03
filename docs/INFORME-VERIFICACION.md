# Informe de verificación · 3 nov 2026

Entorno: sitio construido (`public/`) servido en local + funciones ejecutadas con un **Resend simulado**. No se ha probado nada contra el Resend real, el dominio real ni Netlify (ver «No verificado»).

## Verificado (con evidencia)
| Comprobación | Resultado | Evidencia |
|---|---|---|
| Rastreo de enlaces ES/EU/EN (10 páginas, 505 referencias internas: enlaces, imágenes, `srcset`, AVIF/WebP, fuentes, anclas) | **0 rotos, 0 redirecciones, 0 anclas inexistentes, 0 imágenes 404** | `python3 tools/check-links.py` |
| hreflang es/eu/en + x-default, recíprocos; canonical propio; 1 solo H1 por página | OK en todas | mismo script |
| Lighthouse móvil (simulado) ES / EU / EN | Rendimiento 99 / 98 / 99 · Accesibilidad 100 · Buenas prácticas 96 · SEO 100 · CLS 0 · LCP 2,0–2,1 s · TBT 70 ms | `docs/verificacion/lighthouse-*.json` |
| Contraste (AAA en todos los pares) | texto 14,0:1 · texto secundario 7,3–8,1:1 · granate 7,4–9,3:1 · botón 9,5:1 · error 7,8:1 | cálculo WCAG |
| Datos estructurados | JSON-LD válido (parseado): Organization, WebSite, WebPage, BreadcrumbList, SportsEvent (`startDate: "2027"`, sin precio/ofertas), FAQPage (12) en las 3 lenguas | — |
| Funciones: 11 pruebas (código único, 2 correos por envío, idioma del corredor, duplicado, validación servidor, honeypot, time-trap, límite por IP, apertura 1 dic, fallo de Resend, escape de HTML) | 11/11 OK | `node --test tests/functions.test.mjs` |
| Formulario en navegador real (Playwright, móvil 390 px): errores accesibles, envío, código, copiar, formulario de colaboración, visor de fotos (flechas/Esc), menú (Esc) | OK, sin errores de consola | `verificacion/preinscripcion-ok-movil.png` |
| Correos del corredor (HTML + texto) en ES/EU/EN, 600 y 360 px | Maquetación correcta; código en una línea | `verificacion/correo-corredor-*.png` |
| Sin olas / QR / precio / «Doc.» / cifras antiguas (214 km, 6.020 m, 16:00, 9 oct, 322,50 €, LARRE Long Distance) | 0 coincidencias en `public/` (HTML, CSS, JS, SVG, PDF) | búsqueda por patrón |
| Sin desbordamiento horizontal en 320 (reflow WCAG 1.4.10), 360, 768 y 1440 px; zoom 200 % sin pérdida de contenido | OK (en 320 había 46 px de desborde en la cabecera: corregido) | `verificacion/portada-*.jpg` |

| Teclado: orden de foco lógico, foco visible (granate/tinta, 3 px), objetivos táctiles ≥44 px en cabecera, menú, botones y miniaturas | OK | revisión con Playwright |

## No verificado / requiere acción tuya
1. **Envío real con Resend y SPF/DKIM/DMARC**: no hay `RESEND_API_KEY` aquí ni acceso al DNS. Pasos exactos en `docs/INSTALACION.md` (§2 y §3). Hasta no verificar el dominio en Resend, los correos reales **no saldrán**.
2. Que Netlify use `public/` y `netlify.toml`, aliases de dominio y 301 desde `larrelongdistance.org/.com`: las reglas están escritas pero no probadas en Netlify (¡pruébalas en el *Deploy Preview*!). Cabeceras (CSP, HSTS…) también pendientes de ver en producción: si algo se bloquea, la consola del navegador lo indicará.
3. Compresión Brotli/caché: Lighthouse local penaliza su ausencia; Netlify la aplica.
4. Enlaces externos que el entorno no puede abrir: Instagram, WhatsApp (`wa.me/34620463558`), Google Maps y aepd.es. Los de musubigara.org (3) responden 200.
5. Validadores externos (Rich Results Test, Search Console, Bing): no accesibles desde aquí. Solo he validado el JSON-LD sintácticamente.
6. Euskera: primera pasada técnica; necesita tu revisión.

## Decisiones y datos a confirmar (lista corta)
1. **Medidas (resuelto)**: la web usa las cifras medidas en el GPX oficial: **226,9 km y +4.825 m** (desnivel con histéresis de 3 m), en web, PDF, JSON-LD, imágenes OG y GPX. Los km de los controles son aproximados («≈»).
2. **Organizador (resuelto)**: Musubigara®.
3. **Fecha**: «otoño de 2027»; JSON-LD con `startDate: 2027`. Dos controles aún por definir.
4. **Enlaces a publicaciones de Instagram**: no se pueden obtener desde aquí; cada foto enlaza al perfil hasta que pegues el `permalink`. Dos láminas con el nombre antiguo («LARRE Long Distance®») están **ocultas** (reversible).
4. **Reglamento y Guía**: solo lo confirmado + «pendiente de publicar» (tiempo límite, material, seguros, abandono, derechos de imagen, reposición, sanciones). «Código Cero» es ahora la sección 03 del índice, como principio **sin sanción** (la descalificación inmediata de la web antigua no está confirmada). Los textos de «La carrera / ¿Es para ti?» y la Guía son tuyos, adaptados; revísalos.
6. **Legal**: aviso y privacidad reutilizan titular, NIF y domicilio de la web antigua y mencionan Netlify, Resend, Google y Meta: revisar antes de publicar.
7. **WhatsApp** 34 620 463 558 (heredado): confirmar. **DNI**: no se pide (se pedirá al confirmar plaza).
8. **Search Console / Bing**: pega los códigos en `tools/data/site.json`. **Analítica**: ninguna activa.
