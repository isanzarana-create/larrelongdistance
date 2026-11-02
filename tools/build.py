#!/usr/bin/env python3
"""Genera index.html (ES) desde una única lista de secciones. La numeración DOC y el menú salen de SECTIONS."""
import html, re, sys
H = html.escape

SECTIONS = [  # (id, etiqueta de menú)
    ("reto", "El reto"), ("ruta", "La ruta"), ("codigo-cero", "Código Cero"),
    ("preinscripcion", "Preinscripción"), ("faq", "FAQ"),
]
FAQ = [
 ("¿Cuándo es y dónde sale?",
  "La I Edición de Ultra Trail Larre se celebra en otoño de 2027, con salida única a las 16:00 horas desde el Parque de la Florida de Vitoria-Gasteiz, y termina en el mismo punto.",
  "La fecha exacta se anunciará en esta web y en @ultratraillarre."),
 ("¿Cuánto mide el recorrido?",
  "Ultra Trail Larre mide 226,9 km con 4.644 m de desnivel positivo, en circuito cerrado que sale y llega al Parque de la Florida, con un tiempo máximo de 50 horas en una sola etapa.",
  "Es non-stop: el cronómetro no se detiene nunca y parar a dormir es una decisión táctica del corredor."),
 ("¿Cómo consigo una plaza?",
  "Hay 300 plazas, que se asignan por orden de llegada de la preinscripción, la cual incluye una breve descripción personal obligatoria; las inscripciones se abren en enero de 2027.",
  "La lista de preinscripción abre el 1 de diciembre de 2026. La descripción no decide la plaza: el orden de llegada sí."),
 ("¿Hay avituallamientos?",
  "No hay avituallamientos de la organización ni asistencia externa: cada corredor lleva su comida y su agua, se abastece en los pueblos del recorrido y sella un brevet en seis puntos de control.",
  "El único respaldo es un tracker GPS con botón SOS conectado al centro de control."),
 ("¿Qué es el Código Cero?",
  "El Código Cero es la única regla sin excepciones: tirar un solo envase en el recorrido supone descalificación inmediata y veto en futuras ediciones, sin advertencia previa ni segunda oportunidad.",
  "Lo que entra al monte con el corredor, sale del monte con el corredor."),
 ("¿Es una carrera?",
  "Hay clasificación final por orden de llegada, pero Ultra Trail Larre se plantea como un reto personal, al estilo del ultraciclismo y los grandes recorridos en autosuficiencia, sin premios por la velocidad.",
  "Para muchos, el reto será simplemente finalizar."),
]
ICONS = [
 ("mailto:ignacio@musubigara.org","Correo: ignacio@musubigara.org",'<rect x="3" y="5" width="18" height="14"/><path d="M3 7l9 6 9-6"/>',False),
 ("https://www.google.com/maps/search/?api=1&query=Parque+de+la+Florida+Vitoria-Gasteiz","Mapa: salida en el Parque de la Florida",'<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',True),
 ("https://www.instagram.com/ultratraillarre/","Instagram: @ultratraillarre",'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6"/>',True),
 ("https://wa.me/34620463558?text=Hola%20Ignacio%2C%20quiero%20hablar%20sobre%20Ultra%20Trail%20Larre","WhatsApp: +34 620 46 35 58",'<path d="M3.5 20.5l1.4-4.3A8.5 8.5 0 1 1 8 19.3z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2.2-1-.9.8a4 4 0 0 1-1.9-1.9l.8-.9-1-2.2z"/>',True),
]
CPS = ["Agurain", "Santa Cruz de Campezo", "Laguardia", "Peñacerrada", "Por confirmar", "Por confirmar"]


import json, math, os
RT = {"es": dict(map_t="Mapa del circuito de Ultra Trail Larre, salida y meta en el Parque de la Florida", prof_t="Perfil de elevación, de 515 a 1.383 metros, a lo largo de {km} km", start="SALIDA · META", slope="pendiente", dec=","),
      "en": dict(map_t="Map of the Ultra Trail Larre loop, start and finish at Parque de la Florida", prof_t="Elevation profile, from 515 to 1,383 metres, over {km} km", start="START · FINISH", slope="gradient", dec="."),
      "eu": dict(map_t="Ultra Trail Larre ibilbide zirkularraren mapa; irteera eta helmuga Florida parkean", prof_t="Garaiera-profila, 515 m-tik 1.383 m-ra, {km} km-tan zehar", start="IRTEERA · HELMUGA", slope="malda", dec=",")}
def route_module(lang="es"):
    R_ = RT[lang]
    d = json.load(open(os.path.join(os.path.dirname(__file__), "..", "site", "datos", "larre-2027.json"), encoding="utf8"))
    pts = d["puntos"]; total = d["km_total"]
    lat0 = sum(p[1] for p in pts) / len(pts); kx = math.cos(math.radians(lat0))
    lons = [p[0] for p in pts]; lats = [p[1] for p in pts]
    lon0, lat1 = min(lons), max(lats)
    wdeg = (max(lons) - lon0) * kx; hdeg = lat1 - min(lats)
    PAD = 24; W = 600; sc = (W - 2 * PAD) / wdeg; Hm = round(hdeg * sc + 2 * PAD)
    mx = lambda lon: PAD + (lon - lon0) * kx * sc
    my = lambda lat: PAD + (lat1 - lat) * sc
    mp = "M" + "L".join(f"{mx(p[0]):.1f} {my(p[1]):.1f}" for p in pts)
    hi = d["punto_mas_alto"]
    # perfil: eje km compartido con el mapa
    PW, PH, L, Rr, T, Bt = 600, 300, 52, 10, 14, 34
    emin, emax = 500, 1400
    px = lambda km: L + km / total * (PW - L - Rr)
    py = lambda e: T + (emax - e) / (emax - emin) * (PH - T - Bt)
    line = "M" + "L".join(f"{px(p[3]):.1f} {py(p[2]):.1f}" for p in pts)
    area = line + f"L{px(total):.1f} {py(emin):.1f}L{px(0):.1f} {py(emin):.1f}Z"
    grid = "".join(f'<line x1="{L}" x2="{PW-Rr}" y1="{py(e):.1f}" y2="{py(e):.1f}"/><text x="{L-8}" y="{py(e)+5:.1f}" text-anchor="end">{e:,}'.replace(",", "§").replace("§", "," if lang == "en" else ".") + "</text>" for e in (600, 800, 1000, 1200, 1400))
    ticks = "".join(f'<line class="tk" x1="{px(k):.1f}" x2="{px(k):.1f}" y1="{PH-Bt}" y2="{PH-Bt+5}"/><text x="{px(k):.1f}" y="{PH-10}" text-anchor="middle">{k}</text>' for k in (0, 50, 100, 150, 200))
    data = (f'data-total="{total}" data-mlon0="{lon0}" data-mlat1="{lat1}" data-mkx="{kx:.6f}" data-msc="{sc:.4f}" data-mpad="{PAD}" '
            f'data-lang="{lang}" data-slope="{R_["slope"]}" data-pl="{L}" data-pr="{Rr}" data-pw="{PW}" data-pt="{T}" data-pb="{Bt}" data-pph="{PH}" data-emin="{emin}" data-emax="{emax}"')
    map_svg = (f'<svg class="rmap-svg" viewBox="0 0 {W} {Hm}" role="img" aria-labelledby="map-t"><title id="map-t">{R_["map_t"]}</title>'
               f'<path class="route" pathLength="1" d="{mp}"/>'
               f'<circle class="mk-start" cx="{mx(pts[0][0]):.1f}" cy="{my(pts[0][1]):.1f}" r="7"/><text class="lb" x="{mx(pts[0][0])+12:.1f}" y="{my(pts[0][1])+5:.1f}">{R_["start"]}</text>'
               f'<path class="mk-max" d="M{mx(hi["lon"]):.1f} {my(hi["lat"])-9:.1f}l8 14h-16z"/>'
               f'<circle class="cur" id="cur-map" r="9" cx="0" cy="0" hidden/></svg>')
    prof_svg = (f'<svg class="rprof-svg" viewBox="0 0 {PW} {PH}" role="img" aria-labelledby="prof-t"><title id="prof-t">{R_["prof_t"].format(km=str(total).replace(".", R_["dec"]))}</title>'
                f'<g class="grid">{grid}{ticks}</g><text class="ax" x="{L}" y="{PH-1}" text-anchor="start"></text>'
                f'<path class="area" d="{area}"/><path class="prof" d="{line}"/>'
                f'<path class="mk-max" d="M{px(hi["km"]):.1f} {py(1383)-12:.1f}l7 12h-14z"/>'
                f'<g id="cur-prof" hidden><line class="cl" y1="{T}" y2="{PH-Bt}" x1="0" x2="0"/><circle class="cur" r="7" cx="0" cy="0"/></g></svg>')
    return data, map_svg, prof_svg, d

def doc(i, label):  # numeración DOC generada, no escrita a mano
    return f'<span class="doc mono acc">DOC · {i:02d} — {H(label.upper())}</span>'

def build():
    n = {sid: i + 1 for i, (sid, _) in enumerate(SECTIONS)}
    lab = dict(SECTIONS)
    nav = "".join(f'<a href="#{s}"><b>{i+1:02d}</b>{H(l)}</a>' for i, (s, l) in enumerate(SECTIONS))
    faq = "".join(f'<details><summary>{H(q)}</summary><p>{H(a)} {H(b)}</p></details>' for q, a, b in FAQ)
    icons = "".join(f'<a href="{H(u)}" aria-label="{H(l)}"' + (' target="_blank" rel="noopener"' if ext else '') + f'><svg viewBox="0 0 24 24" aria-hidden="true">{d}</svg></a>' for u,l,d,ext in ICONS)
    rdata, map_svg, prof_svg, rd = route_module(); rmax = round(rd["km_total"] * 10)
    PH = [("472998", "Sendero entre hayas con la palabra RUN escrita en el suelo"), ("371749", "Viñedos de la Rioja Alavesa al pie de la sierra"), ("083279", "Corredor en solitario con chaleco de autosuficiencia en la sierra"), ("020833", "Dos corredores cruzan la niebla de la sierra")]
    import glob as _g
    photos = "".join(f'<li><img src="/fotos/{os.path.basename(_g.glob(os.path.join(os.path.dirname(__file__), "..", "fotos", "ig-*-" + i + "-400.webp"))[0])}" width="400" height="400" loading="lazy" decoding="async" alt="{H(a)}"></li>' for i, a in PH)
    cps = "".join(f'<li><span class="n">{c}</span><span class="tbd mono">{"" if c.startswith("Por") else "km por confirmar"}</span></li>' for c in CPS)
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ultra Trail Larre® · Ultra-trail de 226,9 km en Álava · Otoño de 2027</title>
<meta name="description" content="Ultra-trail non-stop de 226,9 km y 4.644 m D+ en una sola etapa, en autosuficiencia y con cero residuos, por las cuatro Álavas. 300 plazas. I Edición, otoño de 2027.">
<link rel="preload" href="/fonts/anton-latin.woff2" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.className+=" js"</script>
<link rel="stylesheet" href="/assets/ultratraillarre.v2.css">
</head>
<body>
<a class="skip" href="#reto">Saltar al contenido</a>
<header class="top"><div class="wrap">
<a class="brand" href="/" aria-label="Ultra Trail Larre, inicio">Ultra Trail Larre<sup>®</sup></a>
<div class="icons">{icons}</div>
<div class="row2"><div class="lang" role="group" aria-label="Idioma"><a href="/" lang="es" aria-current="page">ES</a><a href="/eu/" lang="eu" hreflang="eu">EU</a><a href="/en/" lang="en" hreflang="en">EN</a></div>
<nav class="nav" aria-label="Secciones">{nav}</nav></div>
</div></header>
<main>
<div class="strip mono">43°N · 2°W &nbsp;·&nbsp; Araba · Euskadi &nbsp;·&nbsp; Est. 2026</div>
<section class="hero">
<svg class="contours" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 700"><path d="M0 90 Q180 50 360 90T720 90T1080 90T1440 90"/><path d="M0 170 Q180 130 360 170T720 170T1080 170T1440 170"/><path d="M0 250 Q180 210 360 250T720 250T1080 250T1440 250"/><path d="M0 330 Q180 290 360 330T720 330T1080 330T1440 330"/><path d="M0 410 Q180 370 360 410T720 410T1080 410T1440 410"/><path d="M0 490 Q180 450 360 490T720 490T1080 490T1440 490"/><path d="M0 570 Q180 530 360 570T720 570T1080 570T1440 570"/><path d="M0 650 Q180 610 360 650T720 650T1080 650T1440 650"/></svg>
<div class="wrap">
<h1><span>Ultra Trail</span> <span class="acc">Larre<sup class="r">®</sup></span></h1>
<p class="lead">Un <em>ultra-trail non-stop</em> que se corre en una sola etapa, en <em>autosuficiencia</em>, sin asistencia y sin avituallamientos clásicos, por las cuatro Álavas: <em>el bosque, la viña, la sierra y la llanura.</em></p>
<div class="facts">
<div class="fact"><b>226,9<small>KM</small></b><span>Distancia</span></div>
<div class="fact"><b>4.644<small>D+</small></b><span>Desnivel</span></div>
<div class="fact"><b>300<small>PAX</small></b><span>Plazas</span></div>
<div class="fact"><b>50<small>H</small></b><span>Tiempo de corte</span></div>
<div class="fact"><b>16:00</b><span>Salida · Parque de la Florida</span></div>
</div>
<a class="cta" href="#preinscripcion">Preinscripción · 1 dic 2026</a>
</div></section>
<div class="strip mono">Ultra Trail Larre® · Non-stop &nbsp;·&nbsp; I Edición · Otoño de 2027</div>

<section id="reto"><div class="wrap">
{doc(n["reto"], lab["reto"])}
<h2>Una salida.<br>Una meta.<br>Nadie en medio.</h2>
<p>Sales a las 16:00 del Parque de la Florida de Vitoria-Gasteiz y tienes 50 horas para volver al mismo punto. Lo que ocurra entre medias lo resuelves tú: la comida, el agua, el sueño, la noche y el camino.</p>
<div class="cards">
<div><span class="num">01</span><h3>Autosuficiencia real</h3><p>Sin avituallamientos de la organización ni asistencia externa. Planificas la carrera como una expedición, no como un circuito con mesas cada 15 km.</p></div>
<div><span class="num">02</span><h3>Non-stop · 50 horas</h3><p>El crono no se detiene nunca. Una sola etapa, dos noches sobre el terreno y cierre de control a las 18:00 h, 50 horas después de la salida.</p></div>
<div><span class="num">03</span><h3>Navegas tú</h3><p>Track GPS oficial obligatorio, seis checkpoints con brevet y tracker con botón SOS. Sin cintas cada doscientos metros: aquí el recorrido se lee, no se sigue.</p></div>
</div>
<div class="land" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<div class="land-l mono" aria-label="Los cuatro paisajes"><span>Bosque</span><span>Viña</span><span>Sierra</span><span>Llanura</span></div>
</div></section>

<section id="ruta"><div class="wrap">
{doc(n["ruta"], lab["ruta"])}
<h2>226,9 km en círculo</h2>
<p>Una circular que sale y llega al Parque de la Florida y cose la Llanada Alavesa con la Rioja Alavesa, atravesando las sierras de Entzia, Toloño, Cantabria e Izki.</p>
<div class="rmod" id="rmod" data-src="/datos/larre-2027.json" {rdata}>
<figure class="rprof">{prof_svg}<input id="rscrub" class="scrub" type="range" min="0" max="{rmax}" step="1" value="0" aria-label="Recorrer la ruta por kilómetros" aria-controls="rread" hidden></figure>
<p class="rread mono" id="rread" data-default="Punto más alto: 1.383 m · km 152,5">Punto más alto: 1.383 m · km 152,5</p>
<p class="visually-hidden" id="rlive" aria-live="polite"></p>
<figure class="rmap">{map_svg}</figure>
</div>
<ol class="cps" aria-label="Puntos de control">{cps}</ol>
<p class="mono" style="margin-top:var(--s3)">Track oficial · <a href="/larre-2027.gpx" download>larre-2027.gpx</a> · se publica 30 días antes de la salida</p>
<div class="photos"><p class="mono">Desde el terreno · <a href="/galeria/">Ver todas →</a></p><ul>{photos}</ul></div>
<p style="margin-top:var(--s4)"><a href="/ruta/">Ver la ruta completa →</a></p>
</div></section>

<section id="codigo-cero" class="zero"><div class="wrap">
{doc(n["codigo-cero"], lab["codigo-cero"])}
<blockquote>La única huella que dejamos en monte es <em>la pisada.</em></blockquote>
<p>Ningún envoltorio, ninguna pegatina, ningún gel, ninguna tira de tape. Lo que entra al monte con el corredor, sale del monte con el corredor.</p>
<p>No es un eslogan: es la condición de inscripción. Tirar un solo envase en el recorrido supone descalificación inmediata y veto en futuras ediciones. Sin matices, sin advertencia previa, sin segunda oportunidad.</p>
<p style="margin-top:var(--s4)"><a href="/reglamento/">Reglamento →</a> · <a href="/filosofia/">Filosofía →</a></p>
</div></section>

<section id="preinscripcion"><div class="wrap">
{doc(n["preinscripcion"], lab["preinscripcion"])}
<h2>300 plazas, por orden de llegada</h2>
<p>La lista de preinscripción abre el 1 de diciembre de 2026 y pide una breve descripción personal: sin ella no se valida, pero no decide la plaza. El orden de llegada, sí. Las inscripciones se abren en enero de 2027.</p>
<div class="pre-box"><span class="state">● Abre el 1 de diciembre de 2026</span><p>Escribe a <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> si tienes dudas antes de que abra la lista.</p></div>
</div></section>

<section id="faq"><div class="wrap">
{doc(n["faq"], lab["faq"])}
<h2>Preguntas frecuentes</h2>
{faq}
<p style="margin-top:var(--s4)"><a href="/reglamento/">Reglamento completo →</a></p>
</div></section>
</main>

<footer><div class="wrap">
<p class="brand">Ultra Trail Larre<sup>®</sup></p>
<nav aria-label="Pie de página"><ul class="flinks">
<li><a href="/ruta/">Ruta</a></li><li><a href="/reglamento/">Reglamento</a></li><li><a href="/guia-autosuficiencia/">Guía de autosuficiencia</a></li><li><a href="/preinscripcion/">Preinscripción</a></li><li><a href="/como-llegar/">Cómo llegar</a></li><li><a href="/filosofia/">Filosofía</a></li><li><a href="/galeria/">Imágenes</a></li><li><a href="/aviso-legal/">Aviso legal</a></li><li><a href="/politica-privacidad/">Política de privacidad</a></li>
</ul></nav>
<p class="legal mono">Organiza Ignacio Sanz Arana · Musubigara® · Vitoria-Gasteiz · <a href="https://www.instagram.com/ultratraillarre/" rel="noopener">@ultratraillarre</a> · <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a></p>
</div></footer>
<script src="/assets/route.v2.js" defer></script>
</body>
</html>
'''
if __name__ == "__main__":
    open(sys.argv[1] if len(sys.argv) > 1 else "index.html", "w", encoding="utf8").write(build())
    # comprobación de las respuestas FAQ: primera frase 25–40 palabras
    for q, a, _ in FAQ:
        w = len(a.split()); print(("OK " if 25 <= w <= 40 else "!! "), w, q)
