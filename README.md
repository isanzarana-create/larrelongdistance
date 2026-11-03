# Ultra Trail Larre® · ultratraillarre.org

Web estática trilingüe (ES · EU · EN) + dos funciones de Netlify (preinscripción y colaboración). Sin build en Netlify: se publica la carpeta `public/`.

```
public/            Sitio ya generado (lo que se publica)
netlify/functions/ preinscripcion.mjs · colabora.mjs · _lib/ (validación, códigos, correos, Resend)
tools/             Generador y utilidades (no se despliegan). Ver tools/README.md
tests/             Pruebas de las funciones (node --test tests/functions.test.mjs)
docs/              Puesta en marcha, SEM e informe de verificación
netlify.toml       Publicación, cabeceras de seguridad/caché y redirecciones (generado: tools/make-netlify.mjs)
```

## Editar contenido
1. Textos: `tools/i18n/{es,eu,en}.mjs` · cifras y hechos: `tools/data/hechos.json` · galería: `tools/data/galeria.json`.
2. `node tools/build.mjs` regenera `public/` · si cambias PDF: `node tools/make-pdfs.mjs`.
3. Vista previa con formularios: `node tools/dev-server.mjs` → http://localhost:8081
4. `git commit` y `git push`: Netlify publica solo.

Cambiar la apertura de la preinscripción sin tocar código: variable `PREINSCRIPCION_ABRE` en Netlify (ISO 8601, p. ej. `2026-12-01T00:00:00+01:00`).
