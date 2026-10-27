# larrelongdistance.org · galería de Instagram

Esto es el contenido completo de la web, listo para subir a un repositorio de GitHub,
con la galería de @larrelongdistance integrada y el robot que la mantiene al día.

---

## Qué tienes que hacer tú

### Paso 1 · Crear el repositorio

En GitHub: **New repository** → nombre `larrelongdistance` → **público** → crear.
Luego **uploading an existing file** y arrastras todo el contenido de este paquete
(las carpetas incluidas: `en`, `galeria`, `scripts`, `.github`).

Si GitHub no te deja arrastrar las carpetas ocultas (`.github`), súbelas después
creando el fichero a mano: **Add file → Create new file**, y escribes como nombre
`.github/workflows/instagram-larre.yml` — al poner las barras, GitHub crea las carpetas solo.

### Paso 2 · Conectar Netlify al repositorio

En Netlify, proyecto `larrelongdistance` → **Project configuration → Developer settings →
Link repository** → eliges el repositorio.

Cuando te pregunte por la configuración de compilación:

- **Build command:** déjalo **vacío**
- **Publish directory:** pon un punto: `.`

La web es HTML estático: no hay nada que compilar.

> A partir de ese momento se acabó arrastrar carpetas, y se acabó el problema de subir
> solo el `index.html` y dejar la web coja. Lo que esté en el repositorio es lo que se publica.

### Paso 3 · Dar permiso en Meta y guardar las claves

1. En **developers.facebook.com**, en la app que ya tienes, conecta la cuenta profesional
   **@larrelongdistance** y genera su clave de acceso (permiso `instagram_business_basic`).
2. En el repositorio: **Settings → Secrets and variables → Actions → New repository secret**
   - Nombre: `IG_TOKEN` → pegas la clave de Meta.
   - Y un segundo: `GH_PAT` → un *personal access token* de GitHub con permiso para
     escribir secrets en este repositorio.

**Por qué el segundo:** la clave de Meta caduca a los 60 días. Con `GH_PAT`, el robot la
renueva él solo cada noche y esto no vuelve a caducar. Sin él todo funciona igual…
hasta que un día de diciembre la galería se queda congelada sin avisar.

### Paso 4 · Lanzarlo

Pestaña **Actions → Galería de Instagram (LARRE) → Run workflow**.
En un par de minutos tendrás las fotos en la web.

---

## Qué hay dentro

```
index.html              portada en castellano
en/index.html           portada en inglés
galeria/index.html      página de galería en castellano   (nueva)
en/gallery/index.html   página de galería en inglés       (nueva)
larre.css               TODO el CSS del sitio, ahora en un único fichero
larre-gallery.css      componente de galería
larre-gallery.js       componente de galería
gallery-data.js         datos de las fotos (lo reescribe el robot)
gallery-captions.json   tus textos a mano, si quieres cambiar algún pie
og-larre.jpg            imagen para redes
robots.txt · sitemap.xml
scripts/instagram-sync.mjs                 el robot
.github/workflows/instagram-larre.yml      lo lanza cada día a las 08:17
```

La carpeta `fotos/` no está: la crea el robot con la primera ejecución.

---

## Lo que he cambiado en la web

**La sección nueva.** `DOC · 11 — IMÁGENES`, justo antes de la FAQ, con el titular
«Desde el terreno». La FAQ pasa a ser `DOC · 12`, y el índice y el menú se han
renumerado en consecuencia (el menú tiene ahora 8 entradas, con *Imágenes* la sexta).

**La identidad.** El componente de galería es el mismo fichero que usa mugarri.org,
sin tocar una línea. Lo único propio de LARRE son cuatro variables que le presta la web:
el terra `#B84A2C` como color de marca, el gris `#8B7E6A`, JetBrains Mono y Manrope.
Misma pieza, vestida de LARRE. Si algún día cambias el terra, la galería cambia con él.

**Los pies de foto van bilingües**, con el mismo mecanismo que el resto del sitio
(`.l-es` / `.l-en` y los atributos `data-es-alt` / `data-en-alt`), así que el botón ES/EN
también los conmuta.

**El CSS está ahora en un fichero.** Antes iban 97 KB de estilos dentro de cada página.
Al haber cuatro páginas, eso serían 390 KB duplicados. Ahora hay un solo `larre.css`
que las cuatro comparten y que el navegador se guarda en caché: las portadas han bajado
de 225 KB a 130 KB.

**Un fallo que venía de antes, arreglado.** El JavaScript del menú busca cada sección con
`querySelector(href)`. Los enlaces se habían convertido en absolutos
(`https://larrelongdistance.org/#faq`), y eso hace que la búsqueda falle y el menú deje
de resaltar la sección por la que vas. He devuelto las 16 anclas a su forma corta (`#faq`)
y vuelve a funcionar.

**Si todavía no hay fotos**, la sección, su entrada de menú y su línea del índice no se
muestran: nadie ve un hueco vacío. Las páginas de galería avisan en los dos idiomas de
que las imágenes llegarán en cuanto se publiquen.

---

## Posicionamiento

- `/galeria/` y `/en/gallery/` son dos URL nuevas indexables, con su título, su
  descripción, su `canonical` y su `hreflang` recíproco en los dos sentidos.
- Las dos están dadas de alta en el `sitemap.xml`, con `changefreq: daily`.
- El robot escribe en cada página de galería un bloque de **datos estructurados**
  (`ImageGallery` con una ficha `ImageObject` por foto: URL, miniatura, medidas, fecha,
  pie y lugar). Es lo que permite que las fotos aparezcan en Google Imágenes con texto.
- Las fotos se sirven **desde tu dominio** en WebP y en dos tamaños (900 px y 400 px),
  con `width`, `height`, `loading="lazy"` y `sizes` ajustado a la rejilla real.
  El texto alternativo de cada foto es su pie, en el idioma de la página.
- Las imágenes no van en un widget de JavaScript: están escritas en el HTML, que es
  lo que Google lee.

---

## Comprobaciones hechas antes de entregar

| Prueba | Resultado |
|---|---|
| Enlaces de ancla dentro de cada página | 36 · todos resuelven |
| Enlaces internos a otras páginas | 82 · todos existen |
| Anclas entre páginas (`/#contacto`, etc.) | 22 · todas apuntan a un destino real |
| Referencias externas | 112 · formato correcto |
| Estructura HTML de las 4 páginas | 0 etiquetas sin cerrar, 0 errores |
| Las 4 páginas × escritorio y móvil | sin errores de consola, sin recursos caídos |
| Desbordamiento horizontal en móvil (390 px) | 0 px en las cuatro |
| Fotos | cuadradas, con alt, cargando las 6 |
| Zona pulsable en móvil | 171 × 171 px |
| Visor de fotos | abre la foto pulsada, flechas y Escape |
| Menú de móvil | abre y cierra |
| Resaltado de la sección activa | funciona, también en la sección nueva |
| Sacar el CSS a un fichero | comparación píxel a píxel: idéntico |
| Estado sin fotos | la sección y sus enlaces se ocultan, nada se rompe |
| Robot: carrusel, reel, publicación sin imagen | coge lo correcto de cada tipo |
| Robot: segunda pasada sin novedades | no modifica ni un fichero |
| Robot: Instagram devuelve error | avisa y no toca la web |
| Robot: comillas y `&` en los pies | se escapan, no rompen el HTML |
| Claves | nunca se escriben en el repositorio; hay un paso que lo verifica |

Dos enlaces externos no he podido comprobarlos desde aquí porque bloquean el acceso
automático: tu perfil de **LinkedIn** y el de **Instagram**. Son los mismos que ya tenías
y el formato es correcto. **aepd.es** responden 200.

---

## Dos cosas que quizá quieras cambiar

**Las fotos se ven en blanco y negro y toman color al pasar el ratón.** Es como está
hecho el componente, y en LARRE queda bien. Si las prefieres a color desde el principio,
es quitar una línea de `larre-gallery.css` — dilo y te la quito.

**El titular es «Desde el terreno» / «From the ground».** Si prefieres otro, se cambia
en un minuto.
