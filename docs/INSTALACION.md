# Puesta en marcha (acciones que solo puede hacer Ignacio)

Nada de esto está hecho: requiere acceso a Netlify, al registrador del dominio y a Resend.

## 1. Netlify
1. Site → **Domain management** → añadir `ultratraillarre.org` como dominio principal y `www.ultratraillarre.org` (redirige solo al apex). Añadir como **domain aliases** `larrelongdistance.org`, `www.larrelongdistance.org`, `larrelongdistance.com`, `www.larrelongdistance.com`: las redirecciones 301 (directas, sin cadenas) ya están en `netlify.toml`.
2. DNS: o bien delegar el dominio a Netlify DNS, o bien en el registrador apuntar `ultratraillarre.org` (A/ALIAS) y `www` (CNAME) a Netlify, según indique el panel. HTTPS se activa solo (Let's Encrypt).
3. **Build settings**: *Build command* vacío · *Publish directory* `public` · *Functions* `netlify/functions` (ya lo fija `netlify.toml`). Rama de producción: `main` (la web nueva está en la rama `rediseno-ultratraillarre`; revisa el *Deploy Preview* antes de fusionar).
4. **Environment variables** (Site configuration → Environment variables):
   - `RESEND_API_KEY` (obligatoria) · clave de Resend con permiso de envío.
   - `MAIL_FROM` = `Ultra Trail Larre <hola@ultratraillarre.org>` (debe ser del dominio verificado).
   - `NOTIFY_TO` = `ignacio@musubigara.org` (opcional, es el valor por defecto).
   - `PREINSCRIPCION_ABRE` (opcional; por defecto 1 dic 2026 00:00 hora de Madrid). Para probar antes, en el *Deploy Preview*: una fecha pasada.
5. Netlify Forms: se detectan solos `larre-preinscripcion` y `larre-colabora` (copia de seguridad). Las inscripciones también se guardan en Netlify Blobs.

## 2. Resend: verificar `ultratraillarre.org` (SPF, DKIM, DMARC)
Resend → **Domains → Add domain** → `ultratraillarre.org` (región UE si está disponible). Resend muestra los registros **exactos**; cópialos tal cual en el DNS del dominio. Tienen esta forma (los valores los da Resend, no los inventes):

| Tipo | Nombre | Contenido |
|---|---|---|
| MX | `send` | `feedback-smtp.<región>.amazonses.com` · prioridad 10 |
| TXT (SPF) | `send` | `v=spf1 include:amazonses.com ~all` |
| TXT (DKIM) | `resend._domainkey` | `p=MIGf…` (clave larga que da Resend) |
| TXT (DMARC) | `_dmarc` | `v=DMARC1; p=none; rua=mailto:ignacio@musubigara.org` (tras unas semanas sin incidencias: `p=quarantine`) |

Pulsa **Verify**; cuando los tres estén en verde, haz la prueba real (punto 3). Si el dominio no está verificado, Resend rechaza el envío (error 403/422) y la web **no pierde la inscripción**: queda guardada y el aviso a Ignacio se intenta igualmente; el corredor ve el mensaje «guardada, pero no hemos podido enviar el correo».

## 3. Prueba real extremo a extremo (cuando haya clave y dominio verificado)
1. En el *Deploy Preview* pon `PREINSCRIPCION_ABRE` en una fecha pasada.
2. Rellena la preinscripción en ES, EU y EN con un correo tuyo de prueba (p. ej. `i.sanz.arana+es@gmail.com`).
3. Comprueba: llega el correo al corredor (bandeja, no spam; código, fecha de pago en marzo, enlaces) y el aviso a ignacio@musubigara.org con todos los datos; al responder, el destinatario es el corredor.
4. Mira la cabecera del correo (*Mostrar original* en Gmail): `SPF: PASS`, `DKIM: PASS`, `DMARC: PASS`.
5. Repite con el formulario de colaboración. Revisa en Netlify → Logs → Functions las líneas `[preinscripcion]` / `[colabora]`.
6. Restablece `PREINSCRIPCION_ABRE`.

## 4. Buscadores
- **Search Console**: añadir propiedad de dominio `ultratraillarre.org` (verificación por DNS TXT) o, alternativa, pegar el código de la etiqueta meta en `tools/data/site.json` (`googleVerification`) y regenerar. Enviar `https://ultratraillarre.org/sitemap.xml`. Usar *Cambio de dirección* desde `larrelongdistance.org`.
- **Bing Webmaster**: importar desde Search Console o pegar el código en `bingVerification`.
- **Analítica**: no hay ninguna activa (sin cookies). Si decides usar Plausible, hay que añadir el script y actualizar la política de privacidad.

## 5. Cómo comprobar cabeceras, redirecciones y enlaces externos (desde tu ordenador)
1. Sube la rama y abre el *Deploy Preview* / *Branch deploy* de `rediseno-ultratraillarre` en Netlify (Site → Deploys).
2. `node tools/check-live.mjs https://<tu-preview>.netlify.app` comprueba CSP, HSTS, nosniff, X-Frame-Options, caché, 404 propio, la API y los enlaces externos (Instagram, WhatsApp, Maps, AEPD). Alternativa manual: DevTools → Network → clic en el documento → *Response headers*; y consola sin errores de CSP.
3. Tras añadir los dominios antiguos como aliases y fusionar a `main`: `node tools/check-live.mjs --redirects` (cada URL antigua debe dar **un único 301** al destino final; sin cadenas). Alternativa: `curl -sI https://larrelongdistance.org/ruta` → `301` y `location: https://ultratraillarre.org/#ruta`.
4. Si falta algún enlace externo por bloqueo del sitio (Instagram suele responder 200 con navegador y 429/403 con scripts), ábrelo a mano una vez.
5. Si la CSP bloquea algo, el error aparece en la consola; ajusta `tools/make-netlify.mjs` y regenera `netlify.toml`.
