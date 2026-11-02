#!/usr/bin/env python3
"""Páginas interiores ES. Uso: python3 tools/pages.py  ->  escribe /ruta/index.html, /reglamento/index.html, ..."""
import os, re, sys, html as _h
sys.path.insert(0, os.path.dirname(__file__))
import legacy
from build import ICONS, H, route_module, FAQ  # noqa
ROOT = os.path.join(os.path.dirname(__file__), "..", "site")
import gallery
OLD = "/home/claude/isanzarana-create/larrelongdistance"
SITE = "https://ultratraillarre.org"

# plan de URLs (aprobado): clave -> (es, eu, en)
URLS = {
 "home": ("/", "/eu/", "/en/"), "ruta": ("/ruta/", "/eu/ibilbidea/", "/en/route/"),
 "filosofia": ("/filosofia/", "/eu/filosofia/", "/en/philosophy/"), "reglamento": ("/reglamento/", "/eu/araudia/", "/en/rules/"),
 "preinscripcion": ("/preinscripcion/", "/eu/aurrez-izena-eman/", "/en/pre-registration/"),
 "como-llegar": ("/como-llegar/", "/eu/nola-iritsi/", "/en/getting-there/"), "galeria": ("/galeria/", "/eu/argazkiak/", "/en/gallery/"),
 "guia": ("/guia-autosuficiencia/", "/eu/autosufizientzia-gida/", "/en/self-supported-ultra-guide/"),
}

UI = {
 "es": dict(htmlang="es", idx=0, skip="Saltar al contenido", home="Inicio", brand_aria="Ultra Trail Larre, inicio", lang_aria="Idioma", nav_aria="Secciones", foot_aria="Pie de página",
   nav=[("ruta","Ruta"),("reglamento","Reglamento"),("filosofia","Filosofía"),("preinscripcion","Preinscripción")],
   foot=[("ruta","Ruta"),("reglamento","Reglamento"),("guia","Guía de autosuficiencia"),("preinscripcion","Preinscripción"),("como-llegar","Cómo llegar"),("filosofia","Filosofía"),("galeria","Imágenes"),("aviso","Aviso legal"),("privacidad","Política de privacidad")],
   org="Organiza Musubigara® · Vitoria-Gasteiz", cta_pre="Preinscripción · 1 dic 2026",
   icons=["Correo: ignacio@musubigara.org","Mapa: salida en el Parque de la Florida","Instagram: @ultratraillarre","WhatsApp: +34 620 46 35 58"], wa="Hola%20Ignacio%2C%20quiero%20hablar%20sobre%20Ultra%20Trail%20Larre"),
 "en": dict(htmlang="en", idx=2, skip="Skip to content", home="Home", brand_aria="Ultra Trail Larre, home", lang_aria="Language", nav_aria="Sections", foot_aria="Footer",
   nav=[("ruta","Route"),("reglamento","Rules"),("filosofia","Philosophy"),("preinscripcion","Pre-registration")],
   foot=[("ruta","Route"),("reglamento","Rules"),("guia","Self-supported guide"),("preinscripcion","Pre-registration"),("como-llegar","Getting there"),("filosofia","Philosophy"),("galeria","Images"),("aviso","Legal notice"),("privacidad","Privacy policy")],
   org="Organised by Musubigara® · Vitoria-Gasteiz", cta_pre="Pre-registration · 1 Dec 2026",
   icons=["Email: ignacio@musubigara.org","Map: start at Parque de la Florida","Instagram: @ultratraillarre","WhatsApp: +34 620 46 35 58"], wa="Hi%20Ignacio%2C%20I%27d%20like%20to%20talk%20about%20Ultra%20Trail%20Larre"),
 "eu": dict(htmlang="eu", idx=1, skip="Joan edukira", home="Hasiera", brand_aria="Ultra Trail Larre, hasiera", lang_aria="Hizkuntza", nav_aria="Atalak", foot_aria="Orri-oina",
   nav=[("ruta","Ibilbidea"),("reglamento","Araudia"),("filosofia","Filosofia"),("preinscripcion","Aurrez-izena")],
   foot=[("ruta","Ibilbidea"),("reglamento","Araudia"),("guia","Autosufizientzia gida"),("preinscripcion","Aurrez-izena eman"),("como-llegar","Nola iritsi"),("filosofia","Filosofia"),("galeria","Argazkiak"),("aviso","Lege-oharra"),("privacidad","Pribatutasun-politika")],
   org="Antolatzailea: Musubigara® · Gasteiz", cta_pre="Aurrez-izena · 2026ko abenduaren 1a",
   icons=["Posta: ignacio@musubigara.org","Mapa: irteera Florida parkean","Instagram: @ultratraillarre","WhatsApp: +34 620 46 35 58"], wa="Kaixo%20Ignacio%2C%20Ultra%20Trail%20Larreri%20buruz%20hitz%20egin%20nahi%20dut"),
}
URLS["aviso"] = ("/aviso-legal/", "/eu/lege-oharra/", "/en/legal-notice/")
URLS["privacidad"] = ("/politica-privacidad/", "/eu/pribatutasun-politika/", "/en/privacy-policy/")
LANG = "es"
def U(): return UI[LANG]

NAV = [("ruta", "Ruta"), ("reglamento", "Reglamento"), ("filosofia", "Filosofía"), ("preinscripcion", "Preinscripción")]

def fix(t):
    """Corrige datos de la web antigua. Cualquier cifra distinta de la ficha canónica se sustituye aquí."""
    for a, b in [("LARRE Long Distance ®", "Ultra Trail Larre®"), ("LARRE Long Distance®", "Ultra Trail Larre®"), ("Larre Long Distance ®", "Ultra Trail Larre®"),
                 ("Larre Long Distance<sup>®</sup>", "Ultra Trail Larre<sup>®</sup>"), ("LARRE LONG DISTANCE ®", "ULTRA TRAIL LARRE®"),
                 ("214 km · 6.020 m D+", "226,9 km · 4.644 m D+"), ("214 km y 6.020 m D+", "226,9 km y 4.644 m D+"), ("214 kilómetros", "226,9 kilómetros"),
                 ("214 km", "226,9 km"), ("6.020 m", "4.644 m"), ("@larrelongdistance", "@ultratraillarre"), ("instagram.com/larrelongdistance", "instagram.com/ultratraillarre"),
                 ("lista de aviso de preinscripción", "lista de preinscripción"), ("aviso de preinscripción", "lista de preinscripción"),
                 ("Plaza de los Fueros", "Parque de la Florida")]:
        t = t.replace(a, b)
    return t

def head(key, title, desc, noindex=False):
    es, eu, en = URLS[key]; me = URLS[key][U()['idx']]
    alts = f'<link rel="alternate" hreflang="es" href="{SITE}{es}">\n<link rel="alternate" hreflang="eu" href="{SITE}{eu}">\n<link rel="alternate" hreflang="en" href="{SITE}{en}">\n<link rel="alternate" hreflang="x-default" href="{SITE}{es}">'
    robots = "noindex,follow" if noindex else "index,follow,max-image-preview:large"
    return f'''<!doctype html>
<html lang="{U()['htmlang']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{H(title)}</title>
<meta name="description" content="{H(desc)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{SITE}{me}">
{alts}
<link rel="preload" href="/fonts/anton-latin.woff2" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.className+=" js"</script>
<link rel="stylesheet" href="/assets/ultratraillarre.v2.css">
</head>'''

def header(key):
    es, eu, en = URLS[key]; u = U(); cur = lambda c: ' aria-current="page"' if c == u["htmlang"] else ""
    nav = "".join(f'<a href="{URLS[k][u["idx"]]}"{" aria-current=\"page\"" if k == key else ""}><b>{i+1:02d}</b>{H(l)}</a>' for i, (k, l) in enumerate(u["nav"]))
    ics = [(ICONS[n][0].replace("Hola%20Ignacio%2C%20quiero%20hablar%20sobre%20Ultra%20Trail%20Larre", u["wa"]), u["icons"][n], ICONS[n][2], ICONS[n][3]) for n in range(4)]
    icons = "".join(f'<a href="{H(a)}" aria-label="{H(l)}"' + (' target="_blank" rel="noopener"' if ext else '') + f'><svg viewBox="0 0 24 24" aria-hidden="true">{d}</svg></a>' for a, l, d, ext in ics)
    return f'''<body>
<a class="skip" href="#contenido">{H(u["skip"])}</a>
<header class="top"><div class="wrap">
<a class="brand" href="{URLS["home"][u["idx"]]}" aria-label="{H(u["brand_aria"])}">Ultra Trail Larre<sup>®</sup></a>
<div class="icons">{icons}</div>
<div class="row2"><div class="lang" role="group" aria-label="{H(u["lang_aria"])}"><a href="{es}" lang="es" hreflang="es"{cur("es")}>ES</a><a href="{eu}" lang="eu" hreflang="eu"{cur("eu")}>EU</a><a href="{en}" lang="en" hreflang="en"{cur("en")}>EN</a></div>
<nav class="nav" aria-label="{H(u["nav_aria"])}">{nav}</nav></div>
</div></header>'''

def FOOT():
    u = U(); links = "".join(f'<li><a href="{URLS[k][u["idx"]]}">{H(l)}</a></li>' for k, l in u["foot"])
    return f'''<footer><div class="wrap">
<p class="brand">Ultra Trail Larre<sup>®</sup></p>
<nav aria-label="{H(u["foot_aria"])}"><ul class="flinks">{links}</ul></nav>
<p class="legal mono">{H(u["org"])} · <a href="https://www.instagram.com/ultratraillarre/" rel="noopener">@ultratraillarre</a> · <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a></p>
</div></footer>'''

def page(key, title, desc, kicker, h1, lead, body, extra_js=False, noindex=False, compact=False):
    return (head(key, title, desc, noindex) + "\n" + header(key) + f'''
<main id="contenido" class="inner">
<section class="phead{' compact' if compact else ''}"><div class="wrap">
<p class="crumbs mono"><a href="{URLS["home"][U()["idx"]]}">{H(U()["home"])}</a> / {H(kicker)}</p>
<h1 class="ph1">{h1}</h1>
<p class="lead plead">{lead}</p>
</div></section>
{body}
</main>
''' + FOOT() + ("\n<script src=\"/assets/route.v2.js\" defer></script>" if extra_js else "") + "\n</body>\n</html>\n")

def dl(rows, ident=None):
    r = "".join(f"<div><dt>{a}</dt><dd>{b}</dd></div>" for a, b in rows)
    return f'<dl class="ficha"{f" id=\"{ident}\"" if ident else ""}>{r}</dl>'

def sec(inner, cls=""):
    return f'<section class="{cls}"><div class="wrap prose">{inner}</div></section>'

def write(path, s):
    p = os.path.join(ROOT, path.strip("/"), "index.html") if path != "/" else os.path.join(ROOT, "index.html")
    os.makedirs(os.path.dirname(p), exist_ok=True); open(p, "w", encoding="utf8").write(s)

LAYOUT = {}

# ---------- RUTA ----------
def p_ruta():
    data, map_svg, prof_svg, rd = route_module(); rmax = round(rd["km_total"] * 10)
    mod = f'''<div class="rmod" id="rmod" data-src="/datos/larre-2027.json" {data}>
<figure class="rprof">{prof_svg}<input id="rscrub" class="scrub" type="range" min="0" max="{rmax}" step="1" value="0" aria-label="Recorrer la ruta por kilómetros" aria-controls="rread" hidden></figure>
<p class="rread mono" id="rread" data-default="Punto más alto: 1.383 m · km 152,5">Punto más alto: 1.383 m · km 152,5</p>
<p class="visually-hidden" id="rlive" aria-live="polite"></p>
<figure class="rmap">{map_svg}</figure></div>'''
    ficha = dl([("Distancia", "226,9 km"), ("Desnivel positivo", "4.644 m"), ("Altitud", "De 515 m a 1.383 m (máximo en el km 152,5)"),
                ("Formato", "Una sola etapa non-stop, circular"), ("Salida y meta", "Parque de la Florida, Vitoria-Gasteiz"), ("Hora de salida", "16:00 h"),
                ("Tiempo límite", "50 horas (cierre de control a las 18:00 h)"), ("Zonas", "Sierras de Entzia, Toloño, Cantabria e Izki, y Rioja Alavesa"), ("Plazas", "300 corredores")], "ficha")
    b = sec('<h2 class="h2s">Datos del recorrido</h2>' + ficha + '<p class="note">Distancia medida sobre el track oficial. El desnivel positivo se calcula con la altitud suavizada del GPS; sin suavizar, el ruido del GPS lo inflaría hasta cerca de 5.000 m.</p>')
    b += sec('<h2 class="h2s">Mapa y perfil</h2><p>Mueve el deslizador sobre el perfil para recorrer la ruta kilómetro a kilómetro.</p>' + mod + '<p class="mono" style="margin-top:var(--s3)">Track oficial · <span>larre-2027.gpx</span> · se publica 30 días antes de la salida</p>', "alt")
    b += sec('<h2 class="h2s">Checkpoints de sellado</h2><p>El recorrido incluye 6 checkpoints de sellado, que no son avituallamientos: Ultra Trail Larre se corre en autosuficiencia. Su ubicación se confirmará antes de abrir las inscripciones.</p>')
    b += sec('<h2 class="h2s">Navegación</h2><p>El track GPS oficial es obligatorio. Cada corredor lleva un tracker GPS con botón SOS, y la organización dispone de un centro de control en Vitoria-Gasteiz.</p><p>Cómo se planifican el agua, la comida, el sueño y el material en un recorrido así está explicado en la <a href="/guia-autosuficiencia/">guía de autosuficiencia</a>.</p><p style="margin-top:var(--s4)"><a class="cta" href="/preinscripcion/">Preinscripción · 1 dic 2026</a></p>', "alt")
    write("/ruta/", page("ruta", "Ruta · Ultra Trail Larre® · 226,9 km por las cuatro Álavas", "Ultra-trail circular de 226,9 km y 4.644 m D+ por las cuatro Álavas, en una sola etapa y en autosuficiencia. Mapa, perfil, datos y checkpoints.",
        "Ruta", "La ruta de<br>226,9 km", "Ultra Trail Larre® es un ultra-trail non-stop: una sola etapa, circular, que sale y llega al Parque de la Florida de Vitoria-Gasteiz y recorre las cuatro Álavas.", b, extra_js=True))

# ---------- REGLAMENTO ----------
RULES = [("Cero residuos en monte.", "Toda la basura sale en la mochila del corredor hasta el siguiente núcleo habitado.", "Descalificación"),
 ("Envases reutilizables obligatorios.", "Bidones o soft flasks. Botellas de un solo uso prohibidas en el material de salida.", "Descalificación"),
 ("Geles y barritas: envoltorio en mochila.", "Cada envoltorio que entra debe salir. Verificable a la llegada y en CP.", "Descalificación"),
 ("Off-track prohibido.", "No se puede salir del trazado fuera de los desvíos autorizados, ni para foto, ni para atajo, ni para vivac.", "Descalificación"),
 ("Vivac sin huella.", "Si descansas en monte, te marchas sin dejar señal. Cero hoguera. Cero residuos orgánicos visibles.", "Descalificación"),
 ("Acceso al evento en transporte público.", "Promovemos tren sobre coche.", "Compromiso"),
 ("Pack reutilizable, sin plástico de un solo uso.", "Algodón orgánico, cartulina FSC, tela técnica reciclada. Cero blísters, cero bolsas individuales.", "Producción"),
 ("Trackers en alquiler perpetuo.", "El parque de electrónica se alquila año tras año. No compramos GPS desechables. Las correas y fundas se reutilizan.", "Producción"),
 ("Avituallamiento de meta a km 0.", "70 % mínimo de producto local en un radio de menos de 30 km del recorrido. Sin packaging individual.", "Producción"),
 ("Auditoría pública anual.", "Cálculo y publicación de la huella del evento (transporte, producción, logística). Reducción real medida en primer lugar y compensación simbólica de las emisiones residuales a través de Retree the Planet.", "Transparencia")]
def p_reglamento():
    ess = dl([("Formato", "Una sola etapa non-stop de 226,9 km y 4.644 m D+."), ("Autosuficiencia", "Sin asistencia ni avituallamientos clásicos: cada corredor lleva consigo lo que necesita."),
        ("Navegación", "Track GPS oficial obligatorio y sellado en los 6 checkpoints."), ("Tiempo límite", "50 horas desde la salida, con cierre de control a las 18:00 h."),
        ("Participación", "300 plazas por orden de llegada de la preinscripción, que incluye una breve descripción personal obligatoria. Inscripciones en enero de 2027."),
        ("Seguridad", "Tracker GPS con botón SOS, centro de control en Vitoria-Gasteiz y seguro específico de ultra-trail con cobertura de rescate, incluido helicóptero, y responsabilidad civil internacional."),
        ("Derechos de imagen", "El corredor cede los derechos de imagen para uso editorial y promocional del evento; el uso comercial directo requiere autorización escrita individual."),
        ("Material obligatorio", "Se publicará junto con el reglamento definitivo de la I Edición.")])
    rules = "".join(f'<li><span class="rt"><strong>{H(a)}</strong> {H(c)}</span><span class="tag mono">{H(t)}</span></li>' for a, c, t in RULES)
    b = '<section><div class="wrap two"><div><h2 class="h2s">Normas esenciales</h2>' + ess + '<p class="note">Resumen de las normas esenciales de la I Edición publicadas hasta ahora. Dudas: <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a>.</p><p style="margin-top:var(--s4)"><a class="cta" style="margin-top:0" href="/reglamento-ultratraillarre-2027.pdf" download>Descargar reglamento · PDF</a></p><p style="margin-top:var(--s3)">Qué implica correr en autosuficiencia está en la <a href="/guia-autosuficiencia/">guía de autosuficiencia</a>. La <a href="/preinscripcion/">preinscripción</a> abre el 1 de diciembre de 2026.</p></div>'
    b += '<div><h2 class="h2s">Código Cero · 10 normas</h2><p><strong class="acc">Tirar un solo envase en el recorrido supone descalificación inmediata y veto en futuras ediciones. Es la única regla sin apelación.</strong></p><ol class="rules">' + rules + '</ol></div></div></section>'
    write("/reglamento/", page("reglamento", "Reglamento · Ultra Trail Larre® · Normas esenciales y Código Cero", "Normas esenciales de la I Edición de Ultra Trail Larre® y las 10 normas del Código Cero: autosuficiencia, cero residuos y descalificación inmediata.",
        "Reglamento", "Las reglas<br>del juego", "Lo esencial del reglamento de la I Edición, en una página.", b, compact=True))

# ---------- FILOSOFÍA ----------
NOHACEMOS = [("avituallamientos calientes en monte", "No es autosuficiencia con un cocido a media ruta. O lo cocinas tú, o lo compras en un bar abierto al público."),
 ("arco de salida hinchable", "PVC, generador, transporte, residuo. La salida está donde están los corredores, no donde está el inflable patrocinado."),
 ("música y locutor en zona de salida", "Esto no es una romería. El monte no necesita altavoces. El silencio antes del primer paso es parte del rito."),
 ("medalla de plástico ni serigrafía retrosoldada", "La medalla finisher es de metal sólido reciclado, troquelada en proveedor del País Vasco. Pesa, dura, se hereda. No es una chapa."),
 ("premio en metálico al primero", "No hay prima a la velocidad. Cada finisher recibe el mismo obsequio. El privilegio del primero es ser el primero — nada más."),
 ("camiseta poliéster de «regalo»", "Microplástico al lavado, lo tiras en dos años. La camiseta de Larre es algodón orgánico certificado, modelo único cada edición. Si no la querrías comprar, no te la damos."),
 ("ampliar las plazas si «se queda gente fuera»", "300 son 300. La II Edición serán 300. La X Edición serán 300. El número es identidad, no un parámetro de mercado. Si no entras, vuelves al año siguiente."),
 ("vallas, moqueta ni alfombra roja en pueblos", "Pasamos por pueblos que viven todo el año. El paso del corredor debe ser visible pero discreto. Cero infraestructura efímera en plazas y calles.")]
TERR = [("Pack reducido a 4 esenciales", "Gorra y camiseta de algodón orgánico (modelo único anual · objeto coleccionable), roadbook-brevet fusionado en cartulina FSC, medalla finisher en metal reciclado. Dorsal técnico aparte como elemento operativo. Cero plásticos de un solo uso, cero merchandising decorativo."),
 ("Producción local", "Pack producido en Álava cuando es posible: serigrafía local, costura en talleres del territorio, vinos y conservas para meta de productores a menos de 30 km del recorrido."),
 ("Trackers reutilizables", "Dispositivos GPS alquilados año tras año, no fungibles. Fundas y correas reutilizadas. Toda la electrónica del evento se gestiona en circuito de alquiler, no de compra."),
 ("Movilidad limpia", "Comunicación insistente para fomentar el tren sobre el coche. Vehículos de staff compartidos y eléctricos cuando es posible."),
 ("Huella de carbono", "Cálculo anual de emisiones del evento (transporte, producción, alojamiento staff) y compensación mediante reforestación en colaboración con Retree the Planet y plantación local con HAZI / proyectos de la Diputación."),
 ("Durabilidad ante todo", "Cada material del pack se diseña para durar años, no horas. La gorra debe seguir usándose en 2032. El roadbook-brevet debe enmarcarse, no tirarse. La camiseta de algodón orgánico —modelo único cada edición— se convierte en objeto coleccionable: quien repite Larre acumula una pieza distinta cada año. Es la antítesis del kit-evento.")]
def p_filosofia():
    b = sec('''<h2 class="h2s" id="etimologia">Etimología</h2><p class="mono">larre [ ˈla.re ] · euskera · sustantivo</p>
<p>En su acepción más literal, <em>larre</em> nombra la pradera y el pastizal de altura: el terreno abierto, sin cultivar, donde pasta el ganado en libertad. Pero también designa el monte abierto y el paraje sin caminos marcados —por extensión, todo terreno salvaje y agreste— y, en sentido figurado, lo no domesticado, aquello que aún es de todos y de nadie.</p>
<p>La palabra encierra, en una sola sílaba, el mapa entero de Álava: los hayedos del Parque Natural de Izki y los robledales del Parque Natural de Valderejo; los viñedos en bancal de la Rioja Alavesa bajo la sierra de Toloño; el terreno calizo y los desfiladeros de Okina; la llanura cerealista de la Llanada Alavesa; las sendas pastoriles de altura en la Sierra de Entzia; y el inmenso embalse de Ullíbarri-Gamboa, espejo interior del territorio.</p>
<p>El sustantivo elegido evoca la cultura pastoril alavesa: rebaños trashumantes que durante siglos cosieron las cuatro Álavas en un mismo movimiento estacional, atravesando bosque, viña, sierra y llanura. Larre es esa misma travesía, ahora <strong>a pie</strong>.</p>''')
    b += sec('''<h2 class="h2s" id="manifiesto">Manifiesto</h2>
<p>Salimos de Vitoria-Gasteiz rumbo al sur y llegamos a Peñacerrada-Urizaharra y a los viñedos de Laguardia, bajo la Sierra de Toloño, frente al valle del Ebro y las primeras tierras de Rioja.</p>
<p>Atravesamos los pueblos de la Rioja Alavesa, ascendemos hacia Santa Cruz de Campezo y subimos a la Sierra de Entzia, donde aún pastan los rebaños de los últimos trashumantes alaveses, antes de retornar por Agurain a Vitoria-Gasteiz.</p>
<p class="big">226,9 km que cosen las cuatro Álavas en una sola línea.</p>
<p>El bosque, la viña, la sierra y la llanura. Sin asistencia, sin avituallamientos clásicos, sin descanso obligatorio. Con un track GPS, un brevet card y la certeza de que <strong>el monte se gana paso a paso</strong>.</p>
<ul class="premisas mono"><li>Autosuficiencia total</li><li>Sin avituallamientos clásicos</li><li>Cero residuos en monte</li><li>Tracker GPS obligatorio</li><li>Roadbook-brevet fusionado</li><li>Material obligatorio revisado</li><li>Producción audiovisual de autor</li><li>Comunidad pequeña y exigente</li><li>Materiales duraderos · cero kit-evento</li><li>Respeto absoluto al territorio</li></ul>''', "alt")
    b += sec('''<h2 class="h2s" id="es-una-carrera">¿Es una carrera?</h2><p class="big">No.</p>
<p>Aunque algunos se lo tomarán como tal, Larre es un <strong>reto personal</strong>. Para muchos, su reto será simplemente finalizar.</p>
<p>Habrá una clasificación final por orden de llegada. Pero, siguiendo las tradiciones del ultraciclismo, el bikepacking y los grandes recorridos en autosuficiencia, no habrá ningún premio para el participante más rápido salvo el honor de llegar el primero.</p>
<p>Aquí no se reparten trofeos por la velocidad. Se reparte el privilegio de haber estado.</p>
<p>La cultura de la autosuficiencia entiende que la victoria no está en superar al de al lado, sino en sostener el ritmo durante 226,9 kilómetros de monte sin que nadie te resuelva ni el agua, ni la cena, ni el sueño. Esa es la única competición que importa.</p>''')
    b += sec('<h2 class="h2s" id="codigo-cero">Código Cero</h2><p class="big">La única huella que dejamos en monte es la pisada.</p>' + "".join(f"<p>{x}</p>" for x in [
        "Ningún envoltorio, ninguna pegatina, ningún gel, ninguna tira de tape. Lo que entra al monte con el corredor, sale del monte con el corredor.",
        "No es un eslogan. Es la condición de inscripción. Cada brevet card lleva un protocolo de basura cero firmado en el briefing. Tirar un solo envase en el recorrido —documentado por foto, organizador, voluntario, otro corredor o cámara de scouting— supone <strong>descalificación inmediata y veto en futuras ediciones</strong>. Sin matices, sin advertencia previa, sin segunda oportunidad.",
        "Esa dureza es deliberada. Solo así se construye una comunidad que entiende el privilegio de poder cruzar Toloño y Entzia. La mayoría de los corredores que ya hacen autosuficiencia lo viven así de forma natural; lo escribimos para que nadie llegue sin saberlo.",
        "El segundo eje es la durabilidad de la materia. Producimos pocos objetos, los hacemos para que duren años, y diseñamos cada uno pensando en cómo se va a reparar antes que en cómo se va a tirar. La gorra de la I Edición debe seguir usándose en 2032. El brevet card no es un papel: es cartulina FSC pensada para enmarcarse. El dorsal es tela técnica con costura reforzada, no un trozo de tyvek que dura una mañana.",
        "Lo más sostenible que producimos es lo que no producimos. Cada año revisamos el pack completo y eliminamos lo que no aporta. No regalamos por regalar. Si una camiseta no es la mejor camiseta que vas vas a tener este año, no te la damos.".replace("vas vas", "vas")]) + '<p><a href="/reglamento/">Las 10 normas del Código Cero →</a></p>', "alt")
    nh = "".join(f'<li><span class="num">/ {i+1:02d}</span><div><h3>No {H(a)}</h3><p>{H(c)}</p></div></li>' for i, (a, c) in enumerate(NOHACEMOS))
    b += sec('<h2 class="h2s" id="no-hacemos">Decimos NO mucho antes de decir SÍ</h2><p>Casi todo lo que define a Larre es una lista de cosas que no haremos. Cada NO de esta página es una decisión consciente: algo que la inercia del mercado del trail nos empujaría a hacer y que hemos descartado por incoherente con el proyecto.</p><p>Decir NO es la única forma de proteger lo que importa. Esta lista no es exhaustiva ni definitiva: crece cada año conforme aprendemos qué erosiona la prueba y qué la sostiene.</p><ul class="nolist">' + nh + '</ul><p>Esta lista crecerá cada año. Si una decisión que tomamos hoy resulta incoherente con el proyecto, el año siguiente entra en NO HACEMOS y se queda ahí. Es la única vía honesta de mejorar: documentar lo que descartamos, no solo lo que defendemos.</p>')
    tr = "".join(f'<li><span class="num">{chr(65+i)}</span><div><h3>{H(a)}</h3><p>{H(c)}</p></div></li>' for i, (a, c) in enumerate(TERR))
    b += sec('<h2 class="h2s" id="territorio">Territorio · cero impacto, honesto</h2><p>La sostenibilidad de Larre no es un sello en una web: es una serie de decisiones técnicas en cada etapa del proyecto. Sin greenwashing ni marketing verde: reducción real medida y compensación simbólica de lo inevitable a través de Retree the Planet.</p><ul class="nolist">' + tr + '</ul>', "alt")
    write("/filosofia/", page("filosofia", "Filosofía · Ultra Trail Larre® · Etimología, manifiesto y Código Cero", "Qué significa «larre», el manifiesto de Ultra Trail Larre®, por qué no es una carrera, el Código Cero y todo lo que no hacemos.",
        "Filosofía", "Qué es<br>Larre", "Etimología, manifiesto y la lista de cosas que nunca haremos.", b))

# ---------- CÓMO LLEGAR ----------
def p_llegar():
    f = dl([("Lugar", "Parque de la Florida"), ("Ciudad", "Vitoria-Gasteiz, Álava (Euskadi)"), ("Salida", "16:00 h · otoño de 2027 (I Edición; la fecha exacta se anunciará más adelante)"), ("Meta", "El mismo parque, hasta 50 horas después de la salida")])
    b = sec('<h2 class="h2s">Salida y meta</h2>' + f + '<p style="margin-top:var(--s4)"><a class="cta" href="https://www.google.com/maps/search/?api=1&amp;query=Parque+de+la+Florida+Vitoria-Gasteiz" target="_blank" rel="noopener">Ver el Parque de la Florida en Google Maps</a></p>')
    b += sec('<h2 class="h2s">Cómo llegar a Vitoria-Gasteiz</h2><p><strong>En tren o autobús:</strong> la ciudad cuenta con estación de tren y estación de autobuses, ambas a pocos minutos del centro.</p><p><strong>En avión:</strong> Vitoria-Gasteiz tiene aeropuerto propio (Foronda). El aeropuerto de Bilbao queda a poco más de una hora por carretera.</p><p><strong>En coche:</strong> la ciudad está bien comunicada por autovía con Bilbao, Donostia-San Sebastián, Pamplona y Burgos.</p><p>Promovemos el tren sobre el coche: es una de las normas del <a href="/reglamento/">Código Cero</a>.</p>', "alt")
    b += sec('<h2 class="h2s">¿Dudas de logística?</h2><p>Escríbenos a <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> o por <a href="https://wa.me/34620463558?text=Hola%20Ignacio%2C%20quiero%20hablar%20sobre%20Ultra%20Trail%20Larre" target="_blank" rel="noopener">WhatsApp</a>.</p>')
    write("/como-llegar/", page("como-llegar", "Cómo llegar · Ultra Trail Larre® · Parque de la Florida, Vitoria-Gasteiz", "Cómo llegar a la salida de Ultra Trail Larre®: Parque de la Florida, en Vitoria-Gasteiz, en tren, autobús, avión o coche.",
        "Cómo llegar", "Cómo llegar<br>a la salida", "Ultra Trail Larre® sale y llega al mismo sitio: el Parque de la Florida, en el centro de Vitoria-Gasteiz, capital de Euskadi.", b))

# ---------- GUÍA ----------
def p_guia():
    bl = legacy.blocks(f"{OLD}/guia-autosuficiencia/index.html", "<h2>Qué es un ultra-trail", "<h2><span>I. Edición")
    out = []; skip = False
    for x in bl:
        if "Lo que esto significa en LARRE" in x:
            out.append("<h2>Lo que esto significa en Ultra Trail Larre</h2>"); continue
        if x.startswith("<ul>") and "<b>Distancia y desnivel</b>" in x:
            x = '<dl class="ficha">' + "".join(f"<div><dt>{a}</dt><dd>{c}</dd></div>" for a, c in [("Distancia y desnivel", "226,9 km · 4.644 m D+"), ("Formato", "Una sola etapa non-stop, circular, en autosuficiencia"), ("Tiempo límite", "50 horas"), ("Hora de salida", "16:00 h"), ("Checkpoints de sellado", "6, con brevet"), ("Track GPS oficial", "Se entrega 30 días antes de la salida"), ("Seguridad", "Tracker GPS con botón SOS y centro de control en Vitoria-Gasteiz")]) + "</dl>"
        out.append(x)
    body = fix("\n".join(out))
    body = body.replace("LARRE", "Ultra Trail Larre").replace("Ultra Trail Larre es", "Ultra Trail Larre es")
    body = body.replace("Ultra Trail Larre® ", "Ultra Trail Larre® ")
    # cortar el bloque de contacto residual
    body = re.sub(r"<h2><span>.*", "", body, flags=re.S)
    body = body.replace("<table>", '<div class="tablew"><table>').replace("</table>", "</table></div>")
    b = f'<section><div class="wrap prose">{body}<p style="margin-top:var(--s4)"><a class="cta" href="/preinscripcion/">Preinscripción · 1 dic 2026</a></p></div></section>'
    write("/guia-autosuficiencia/", page("guia", "Guía de autosuficiencia · Cómo preparar un ultra-trail de 200 km", "Qué significa correr un ultra-trail sin asistencia: agua, comida, sueño, material, navegación con GPS y cómo preparar una distancia de 200 km.",
        "Guía de autosuficiencia", "Correr en<br>autosuficiencia", "Qué significa correr un ultra-trail sin asistencia, cuánta agua y comida hace falta, cuándo dormir y cómo se prepara una distancia de 200 km.", b))

# ---------- GALERÍA ----------
def p_galeria():
    li = "".join(f'<li><figure><a href="/fotos/{f}.webp"><img src="/fotos/{f}-400.webp" width="400" height="400" loading="lazy" decoding="async" alt="{H(c)}"></a><figcaption><strong class="ft">{H(t)}</strong>{H(c)}</figcaption></figure></li>' for f, t, c in gallery.titled('es'))
    b = f'<section><div class="wrap"><ul class="grid4">{li}</ul><p style="margin-top:var(--s4)">Más en <a href="https://www.instagram.com/ultratraillarre/" target="_blank" rel="noopener">@ultratraillarre</a> en Instagram.</p></div></section>'
    write("/galeria/", page("galeria", "Imágenes · Ultra Trail Larre® · Desde el terreno", "Fotografías de reconocimientos, tramos de la ruta y el monte tal y como está, publicadas en @ultratraillarre.",
        "Imágenes", "Desde<br>el terreno", "Lo último publicado en @ultratraillarre: reconocimientos, tramos de la ruta y el monte tal y como está.", b))

if __name__ == "__main__":
    for f in (p_ruta, p_reglamento, p_filosofia, p_llegar, p_guia, p_galeria): f()
    print("páginas ES generadas")
