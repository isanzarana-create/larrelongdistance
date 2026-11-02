#!/usr/bin/env python3
"""Home trilingüe. Uso: python3 -I tools/home.py  ->  index.html, en/index.html (y eu/ cuando exista el texto)."""
import os, sys, glob
sys.path.insert(0, os.path.dirname(__file__))
import pages as P
from build import H, route_module, ICONS, doc
ROOT = os.path.join(os.path.dirname(__file__), "..", "site")
import gallery

HOME = {
"es": dict(
 title="Ultra Trail Larre® · Ultra-trail de 226,9 km en Álava · Otoño de 2027",
 desc="Ultra-trail non-stop de 226,9 km y 4.644 m D+ en una sola etapa, en autosuficiencia y con cero residuos, por las cuatro Álavas. 300 plazas. I Edición, otoño de 2027.",
 sections=[("reto","El reto"),("ruta","La ruta"),("codigo-cero","Código Cero"),("preinscripcion","Preinscripción"),("faq","FAQ")],
 strip1="43°N · 2°W &nbsp;·&nbsp; Araba · Euskadi &nbsp;·&nbsp; Est. 2026", strip2="Ultra Trail Larre® · Non-stop &nbsp;·&nbsp; I Edición · Otoño de 2027",
 lead="Un <em>ultra-trail non-stop</em> que se corre en una sola etapa, en <em>autosuficiencia</em>, sin asistencia y sin avituallamientos clásicos, por las cuatro Álavas: <em>el bosque, la viña, la sierra y la llanura.</em>",
 facts=[("226,9","KM","Distancia"),("4.644","D+","Desnivel"),("300","PAX","Plazas"),("50","H","Tiempo de corte"),("16:00","","Salida · Parque de la Florida")],
 reto_h2="Una salida.<br>Una meta.<br>Nadie en medio.",
 reto_p="Sales a las 16:00 del Parque de la Florida de Vitoria-Gasteiz y tienes 50 horas para volver al mismo punto. Lo que ocurra entre medias lo resuelves tú: la comida, el agua, el sueño, la noche y el camino.",
 cards=[("Autosuficiencia real","Sin avituallamientos de la organización ni asistencia externa. Planificas la carrera como una expedición, no como un circuito con mesas cada 15 km."),
        ("Non-stop · 50 horas","El crono no se detiene nunca. Una sola etapa, dos noches sobre el terreno y cierre de control a las 18:00 h, 50 horas después de la salida."),
        ("Navegas tú","Track GPS oficial obligatorio, seis checkpoints con brevet y tracker con botón SOS. Sin cintas cada doscientos metros: aquí el recorrido se lee, no se sigue.")],
 land_aria="Los cuatro paisajes", land=["Bosque","Viña","Sierra","Llanura"],
 ruta_h2="226,9 km en círculo",
 ruta_p="Una circular que sale y llega al Parque de la Florida y cose la Llanada Alavesa con la Rioja Alavesa, atravesando las sierras de Entzia, Toloño, Cantabria e Izki.",
 scrub_aria="Recorrer la ruta por kilómetros", default="Punto más alto: 1.383 m · km 152,5", cps_aria="Puntos de control",
 cps=["Agurain","Santa Cruz de Campezo","Laguardia","Peñacerrada","Por confirmar","Por confirmar"], tbd="Por", kmtbd="km por confirmar",
 track="Track oficial", gpx_note="se publica 30 días antes de la salida",
 photos_lead="Desde el terreno", photos_all="Ver todas →", photos_alt=["Sendero entre hayas con la palabra RUN escrita en el suelo","Viñedos de la Rioja Alavesa al pie de la sierra","Corredor en solitario con chaleco de autosuficiencia en la sierra","Dos corredores cruzan la niebla de la sierra"],
 ruta_more="Ver la ruta completa →",
 zero_q="La única huella que dejamos en monte es <em>la pisada.</em>",
 zero_p=["Ningún envoltorio, ninguna pegatina, ningún gel, ninguna tira de tape. Lo que entra al monte con el corredor, sale del monte con el corredor.",
         "No es un eslogan: es la condición de inscripción. Tirar un solo envase en el recorrido supone descalificación inmediata y veto en futuras ediciones. Sin matices, sin advertencia previa, sin segunda oportunidad."],
 zero_links=("Reglamento →","Filosofía →"),
 pre_h2="300 plazas, por orden de llegada",
 pre_p="La lista de preinscripción abre el 1 de diciembre de 2026 y pide una breve descripción personal: sin ella no se valida, pero no decide la plaza. El orden de llegada, sí. Las inscripciones se abren en enero de 2027.",
 pre_state="● Abre el 1 de diciembre de 2026", pre_box='Escribe a <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> si tienes dudas antes de que abra la lista.',
 faq_h2="Preguntas frecuentes", faq_more="Reglamento completo →",
 faq=[("¿Cuándo es y dónde sale?","La I Edición de Ultra Trail Larre se celebra en otoño de 2027, con salida única a las 16:00 horas desde el Parque de la Florida de Vitoria-Gasteiz, y termina en el mismo punto.","La fecha exacta se anunciará en esta web y en @ultratraillarre."),
 ("¿Cuánto mide el recorrido?","Ultra Trail Larre mide 226,9 km con 4.644 m de desnivel positivo, en circuito cerrado que sale y llega al Parque de la Florida, con un tiempo máximo de 50 horas en una sola etapa.","Es non-stop: el cronómetro no se detiene nunca y parar a dormir es una decisión táctica del corredor."),
 ("¿Cómo consigo una plaza?","Hay 300 plazas, que se asignan por orden de llegada de la preinscripción, la cual incluye una breve descripción personal obligatoria; las inscripciones se abren en enero de 2027.","La lista de preinscripción abre el 1 de diciembre de 2026. La descripción no decide la plaza: el orden de llegada sí."),
 ("¿Hay avituallamientos?","No hay avituallamientos de la organización ni asistencia externa: cada corredor lleva su comida y su agua, se abastece en los pueblos del recorrido y sella un brevet en seis puntos de control.","El único respaldo es un tracker GPS con botón SOS conectado al centro de control."),
 ("¿Qué es el Código Cero?","El Código Cero es la única regla sin excepciones: tirar un solo envase en el recorrido supone descalificación inmediata y veto en futuras ediciones, sin advertencia previa ni segunda oportunidad.","Lo que entra al monte con el corredor, sale del monte con el corredor."),
 ("¿Es una carrera?","Hay clasificación final por orden de llegada, pero Ultra Trail Larre se plantea como un reto personal, al estilo del ultraciclismo y los grandes recorridos en autosuficiencia, sin premios por la velocidad.","Para muchos, el reto será simplemente finalizar.")]),
"en": dict(
 title="Ultra Trail Larre® · 226.9 km ultra-trail in Álava · Autumn 2027",
 desc="Non-stop 226.9 km ultra-trail with 4,644 m of climbing in a single stage, fully self-supported and zero waste, across the four Álavas. 300 places. First edition, autumn 2027.",
 sections=[("reto","The challenge"),("ruta","The route"),("codigo-cero","Zero Code"),("preinscripcion","Pre-registration"),("faq","FAQ")],
 strip1="43°N · 2°W &nbsp;·&nbsp; Araba · Euskadi &nbsp;·&nbsp; Est. 2026", strip2="Ultra Trail Larre® · Non-stop &nbsp;·&nbsp; 1st Edition · Autumn 2027",
 lead="A <em>non-stop ultra-trail</em> run in a single stage, <em>fully self-supported</em>, with no assistance and no classic aid stations, across the four Álavas: <em>forest, vineyard, mountain range and plain.</em>",
 facts=[("226.9","KM","Distance"),("4,644","D+","Elevation gain"),("300","PAX","Places"),("50","H","Cut-off time"),("16:00","","Start · Parque de la Florida")],
 reto_h2="One start.<br>One finish.<br>Nobody in between.",
 reto_p="You set off at 16:00 from Parque de la Florida in Vitoria-Gasteiz and have 50 hours to come back to the same spot. What happens in between is yours to solve: food, water, sleep, the night and the way.",
 cards=[("Real self-sufficiency","No aid stations from the organisation and no outside assistance. You plan the race like an expedition, not like a circuit with a table every 15 km."),
        ("Non-stop · 50 hours","The clock never stops. A single stage, two nights out on the terrain, and a control closing at 18:00, 50 hours after the start."),
        ("You navigate","Official GPS track required, six checkpoints with a brevet card and a tracker with an SOS button. No ribbons every two hundred metres: here the route is read, not followed.")],
 land_aria="The four landscapes", land=["Forest","Vineyard","Mountains","Plain"],
 ruta_h2="226.9 km in a loop",
 ruta_p="A loop that starts and finishes at Parque de la Florida and stitches the Llanada Alavesa to the Rioja Alavesa, crossing the Entzia, Toloño, Cantabria and Izki ranges.",
 scrub_aria="Move along the route by kilometre", default="Highest point: 1,383 m · km 152.5", cps_aria="Checkpoints",
 cps=["Agurain","Santa Cruz de Campezo","Laguardia","Peñacerrada","To be confirmed","To be confirmed"], tbd="To", kmtbd="km to be confirmed",
 track="Official track", gpx_note="published 30 days before the start",
 photos_lead="From the ground", photos_all="See all →", photos_alt=["Beech-lined trail with the word RUN written on the ground","Rioja Alavesa vineyards at the foot of the mountains","A lone runner in a self-sufficiency vest in the mountains","Two runners cross the mountain fog"],
 ruta_more="See the full route →",
 zero_q="The only trace we leave in the mountains is <em>our footprints.</em>",
 zero_p=["No wrappers, no stickers, no gels, no strips of tape. What goes into the mountains with the runner leaves the mountains with the runner.",
         "It is not a slogan: it is a condition of entry. Dropping a single piece of litter on the course means immediate disqualification and a ban from future editions. No nuances, no prior warning, no second chance."],
 zero_links=("Rules →","Philosophy →"),
 pre_h2="300 places, in order of arrival",
 pre_p="The pre-registration list opens on 1 December 2026 and asks for a short personal description: without it the entry is not validated, but it does not decide your place. Order of arrival does. Registrations open in January 2027.",
 pre_state="● Opens on 1 December 2026", pre_box='Write to <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> if you have questions before the list opens.',
 faq_h2="Frequently asked questions", faq_more="Full rules →",
 faq=[("When is it and where does it start?","The 1st edition of Ultra Trail Larre takes place in autumn 2027, with a single start at 16:00 from Parque de la Florida in Vitoria-Gasteiz, and finishes at the same spot.","The exact date will be announced on this website and on @ultratraillarre."),
 ("How long is the route?","Ultra Trail Larre is 226.9 km long with 4,644 m of positive elevation gain, a closed loop starting and finishing at Parque de la Florida, with a maximum time of 50 hours in a single stage.","It is non-stop: the clock never stops, and stopping to sleep is a tactical decision for the runner."),
 ("How do I get a place?","There are 300 places, allocated strictly in order of arrival of each pre-registration, which includes a mandatory short personal description; registrations open in January 2027.","The pre-registration list opens on 1 December 2026. The description does not decide the place: order of arrival does."),
 ("Are there aid stations?","There are no organiser aid stations and no outside assistance: each runner carries their own food and water, resupplies in the villages along the route and stamps a brevet card at six checkpoints.","The only backup is a GPS tracker with an SOS button connected to the control centre."),
 ("What is the Zero Code?","The Zero Code is the only rule with no exceptions: dropping a single piece of litter on the course means immediate disqualification and a ban from future editions, with no warning and no second chance.","What goes into the mountains with the runner leaves the mountains with the runner."),
 ("Is it a race?","There is a final ranking by order of arrival, but Ultra Trail Larre is conceived as a personal challenge, in the spirit of ultra-cycling and long self-supported routes, with no prizes for speed.","For many, the challenge will simply be to finish.")]),
"eu": dict(
 title="Ultra Trail Larre® · 226,9 km-ko ultra-trail Araban · 2027ko udazkena",
 desc="226,9 km eta 4.644 m-ko igoera positiboa dituen non-stop ultra-traila, etapa bakarrean, autosufizientzian eta hondakinik gabe, Arabako lau aurpegietan zehar. 300 plaza. I. edizioa, 2027ko udazkena.",
 sections=[("reto","Erronka"),("ruta","Ibilbidea"),("codigo-cero","Zero Kodea"),("preinscripcion","Aurrez-izena"),("faq","Ohiko galderak")],
 strip1="43°N · 2°W &nbsp;·&nbsp; Araba · Euskadi &nbsp;·&nbsp; Est. 2026", strip2="Ultra Trail Larre® · Non-stop &nbsp;·&nbsp; I. edizioa · 2027ko udazkena",
 lead="<em>Non-stop ultra-trail</em> bat, etapa bakarrean korritzen dena, <em>autosufizientzian</em>, laguntzarik eta ohiko janari-postuen gabe, Arabako lau aurpegietan zehar: <em>basoa, mahastia, mendilerroa eta lautada.</em>",
 facts=[("226,9","KM","Distantzia"),("4.644","D+","Igoera positiboa"),("300","PAX","Plazak"),("50","H","Mozte-denbora"),("16:00","","Irteera · Florida parkea")],
 reto_h2="Irteera bat.<br>Helmuga bat.<br>Tartean, inor ez.",
 reto_p="16:00etan irtengo zara Gasteizko Florida parketik, eta 50 ordu dituzu leku berera itzultzeko. Tartean gertatzen dena zuk konpontzen duzu: janaria, ura, lo egitea, gaua eta bidea.",
 cards=[("Benetako autosufizientzia","Antolakuntzaren janari-posturik eta kanpoko laguntzarik ez. Lasterketa espedizio gisa planifikatzen duzu, ez 15 km-ro mahaiak dituen zirkuitu gisa."),
        ("Non-stop · 50 ordu","Kronometroak ez du inoiz gelditzen. Etapa bakarra, bi gau lurrean eta kontrolaren itxiera 18:00etan, irteeratik 50 ordura."),
        ("Zuk nabigatzen duzu","GPS track ofiziala nahitaezkoa, brevet-a duten sei checkpoint eta SOS botoia duen tracker-a. Berrehun metrotik behin zinta gabe: hemen ibilbidea irakurri egiten da, ez jarraitu.")],
 land_aria="Lau paisaiak", land=["Basoa","Mahastia","Mendilerroa","Lautada"],
 ruta_h2="226,9 km biribilean",
 ruta_p="Florida parkean hasi eta amaitzen den ibilbide zirkularra, Arabako Lautada eta Arabako Errioxa lotzen dituena, Entzia, Toloño, Kantabria eta Izki mendilerroak zeharkatuz.",
 scrub_aria="Ibilbidea kilometroz kilometro egin", default="Punturik garaiena: 1.383 m · 152,5. km", cps_aria="Kontrol-puntuak",
 cps=["Agurain","Santikurutze Kanpezu","Biasteri","Urizaharra","Zehazteko","Zehazteko"], tbd="Zehazteko", kmtbd="km zehazteko",
 track="Track ofiziala", gpx_note="irteera baino 30 egun lehenago argitaratuko da",
 photos_lead="Lurretik", photos_all="Guztiak ikusi →", photos_alt=["Pagoen arteko bidea, lurrean RUN hitza idatzita","Arabako Errioxako mahastiak mendilerroaren oinean","Korrikalari bakartia autosufizientziako txalekoarekin mendilerroan","Bi korrikalari mendilerroko lainoa zeharkatzen"],
 ruta_more="Ibilbide osoa ikusi →",
 zero_q="Mendian uzten dugun arrasto bakarra <em>oinatza da.</em>",
 zero_p=["Inolako bilgarririk, inolako pegatinarik, inolako gelik, inolako zinta-zatirik ez. Korrikalariarekin mendira sartzen dena, korrikalariarekin ateratzen da mendi hartatik.",
         "Ez da leloa: izena emateko baldintza da. Ibilbidean ontzi bakar bat botatzeak berehalako deskalifikazioa dakar, eta hurrengo edizioetan debekua. Ñabardurarik gabe, aurretiko ohartarazpenik gabe, bigarren aukerarik gabe."],
 zero_links=("Araudia →","Filosofia →"),
 pre_h2="300 plaza, iristeko ordenan",
 pre_p="Aurrez-izenen zerrenda 2026ko abenduaren 1ean irekiko da, eta deskribapen pertsonal labur bat eskatzen du: hori gabe ez da baliozkotzen, baina ez du plaza erabakitzen. Iristeko ordenak, bai. Izen-emateak 2027ko urtarrilean irekiko dira.",
 pre_state="● 2026ko abenduaren 1ean irekiko da", pre_box='Idatzi <a href="mailto:ignacio@musubigara.org">ignacio@musubigara.org</a> helbidera, zerrenda ireki aurretik zalantzarik baduzu.',
 faq_h2="Ohiko galderak", faq_more="Araudi osoa →",
 faq=[("Noiz da eta nondik irteten da?","Ultra Trail Larre-ren I. edizioa 2027ko udazkenean izango da, irteera bakarrarekin 16:00etan Gasteizko Florida parketik, eta leku berean amaituko da.","Data zehatza web honetan eta @ultratraillarre kontuan iragarriko da."),
 ("Zenbat neurtzen du ibilbideak?","Ultra Trail Larre-k 226,9 km neurtzen ditu, 4.644 m-ko igoera positiboarekin, Florida parkean hasi eta amaitzen den zirkuitu itxian, gehienez 50 orduko denborarekin etapa bakarrean.","Non-stop da: kronometroak ez du inoiz gelditzen, eta lo egiteko gelditzea korrikalariaren erabaki taktikoa da."),
 ("Nola lortzen dut plaza bat?","300 plaza daude, aurrez-izenak iristeko ordenaren arabera esleitzen dira, eta aurrez-izenak nahitaezko deskribapen pertsonal labur bat barne hartzen du; izen-emateak 2027ko urtarrilean irekiko dira.","Aurrez-izenen zerrenda 2026ko abenduaren 1ean irekiko da. Deskribapenak ez du plaza erabakitzen: iristeko ordenak bai."),
 ("Badago janari-postua?","Ez dago antolakuntzaren janari-posturik ez kanpoko laguntzarik: korrikalari bakoitzak bere janaria eta ura darama, ibilbideko herrietan hornitzen da eta sei kontrol-puntutan brevet-a zigilatzen du.","Bermatzeko bakarra SOS botoia duen GPS tracker-a da, kontrol-zentroarekin konektatuta."),
 ("Zer da Zero Kodea?","Zero Kodea salbuespenik gabeko arau bakarra da: ibilbidean ontzi bakar bat botatzeak berehalako deskalifikazioa dakar eta hurrengo edizioetan debekua, aurretik ohartarazi gabe eta bigarren aukerarik gabe.","Korrikalariarekin mendira sartzen dena, korrikalariarekin ateratzen da."),
 ("Lasterketa al da?","Iristeko ordenaren araberako azken sailkapena dago, baina Ultra Trail Larre erronka pertsonal gisa planteatzen da, ultraziklismoaren eta autosufizientziako ibilbide handien erara, abiaduragatiko sarik gabe.","Askorentzat, erronka amaitzea besterik ez da izango.")]),
}

def build_home(lang):
    P.LANG = lang; u = P.U(); C = HOME[lang]; sec = C["sections"]
    n = {sid: i + 1 for i, (sid, _) in enumerate(sec)}; lab = dict(sec)
    nav = "".join(f'<a href="#{s}"><b>{i+1:02d}</b>{H(l)}</a>' for i, (s, l) in enumerate(sec))
    faq = "".join(f'<details><summary>{H(q)}</summary><p>{H(a)} {H(b)}</p></details>' for q, a, b in C["faq"])
    ics = [(ICONS[k][0].replace("Hola%20Ignacio%2C%20quiero%20hablar%20sobre%20Ultra%20Trail%20Larre", u["wa"]), u["icons"][k], ICONS[k][2], ICONS[k][3]) for k in range(4)]
    icons = "".join(f'<a href="{H(a)}" aria-label="{H(l)}"' + (' target="_blank" rel="noopener"' if ext else '') + f'><svg viewBox="0 0 24 24" aria-hidden="true">{d}</svg></a>' for a, l, d, ext in ics)
    rdata, map_svg, prof_svg, rd = route_module(lang); rmax = round(rd["km_total"] * 10)
    photos = "".join(f'<li><img src="/fotos/{f}-400.webp" width="400" height="400" loading="lazy" decoding="async" alt="{H(a)}"></li>' for f, a in gallery.photos(lang, 4))
    cps = "".join(f'<li><span class="n">{H(c)}</span><span class="tbd mono">{"" if c.startswith(C["tbd"]) else H(C["kmtbd"])}</span></li>' for c in C["cps"])
    facts = "".join(f'<div class="fact"><b>{a}' + (f'<small>{b}</small>' if b else '') + f'</b><span>{H(c)}</span></div>' for a, b, c in C["facts"])
    cards = "".join(f'<div><span class="num">{i+1:02d}</span><h3>{H(a)}</h3><p>{H(b)}</p></div>' for i, (a, b) in enumerate(C["cards"]))
    land = "".join(f"<span>{H(x)}</span>" for x in C["land"])
    zp = "".join(f"<p>{x}</p>" for x in C["zero_p"])
    head = P.head("home", C["title"], C["desc"]).replace("</head>", "</head>")
    hdr = f'''<body>
<a class="skip" href="#reto">{H(u["skip"])}</a>
<header class="top"><div class="wrap">
<a class="brand" href="{P.URLS["home"][u["idx"]]}" aria-label="{H(u["brand_aria"])}">Ultra Trail Larre<sup>®</sup></a>
<div class="icons">{icons}</div>
<div class="row2"><div class="lang" role="group" aria-label="{H(u["lang_aria"])}">{"".join(f'<a href="{P.URLS["home"][i]}" lang="{c}" hreflang="{c}"' + (' aria-current="page"' if c == lang else '') + f'>{c.upper()}</a>' for i, c in ((0, "es"), (1, "eu"), (2, "en")))}</div>
<nav class="nav" aria-label="{H(u["nav_aria"])}">{nav}</nav></div>
</div></header>'''
    contours = "".join(f'<path d="M0 {y} Q180 {y-40} 360 {y}T720 {y}T1080 {y}T1440 {y}"/>' for y in range(90, 651, 80))
    L = lambda k: P.URLS[k][u["idx"]]
    main = f'''
<main>
<div class="strip mono">{C["strip1"]}</div>
<section class="hero">
<svg class="contours" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 700">{contours}</svg>
<div class="wrap">
<h1><span>Ultra Trail</span> <span class="acc">Larre<sup class="r">®</sup></span></h1>
<p class="lead">{C["lead"]}</p>
<div class="facts">{facts}</div>
<a class="cta" href="#preinscripcion">{H(u["cta_pre"])}</a>
</div></section>
<div class="strip mono">{C["strip2"]}</div>

<section id="reto"><div class="wrap">
{doc(n["reto"], lab["reto"])}
<h2>{C["reto_h2"]}</h2>
<p>{H(C["reto_p"])}</p>
<div class="cards">{cards}</div>
<div class="land" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<div class="land-l mono" aria-label="{H(C["land_aria"])}">{land}</div>
</div></section>

<section id="ruta"><div class="wrap">
{doc(n["ruta"], lab["ruta"])}
<h2>{H(C["ruta_h2"])}</h2>
<p>{H(C["ruta_p"])}</p>
<div class="rmod" id="rmod" data-src="/datos/larre-2027.json" {rdata}>
<figure class="rprof">{prof_svg}<input id="rscrub" class="scrub" type="range" min="0" max="{rmax}" step="1" value="0" aria-label="{H(C["scrub_aria"])}" aria-controls="rread" hidden></figure>
<p class="rread mono" id="rread" data-default="{H(C["default"])}">{H(C["default"])}</p>
<p class="visually-hidden" id="rlive" aria-live="polite"></p>
<figure class="rmap">{map_svg}</figure>
</div>
<ol class="cps" aria-label="{H(C["cps_aria"])}">{cps}</ol>
<p class="mono" style="margin-top:var(--s3)">{H(C["track"])} · <span>larre-2027.gpx</span> · {H(C["gpx_note"])}</p>
<div class="photos"><p class="mono">{H(C["photos_lead"])} · <a href="{L("galeria")}">{H(C["photos_all"])}</a></p><ul>{photos}</ul></div>
<p style="margin-top:var(--s4)"><a href="{L("ruta")}">{H(C["ruta_more"])}</a></p>
</div></section>

<section id="codigo-cero" class="zero"><div class="wrap">
{doc(n["codigo-cero"], lab["codigo-cero"])}
<blockquote>{C["zero_q"]}</blockquote>
{zp}
<p style="margin-top:var(--s4)"><a href="{L("reglamento")}">{H(C["zero_links"][0])}</a> · <a href="{L("filosofia")}">{H(C["zero_links"][1])}</a></p>
</div></section>

<section id="preinscripcion"><div class="wrap">
{doc(n["preinscripcion"], lab["preinscripcion"])}
<h2>{H(C["pre_h2"])}</h2>
<p>{H(C["pre_p"])}</p>
<div class="pre-box"><span class="state">{H(C["pre_state"])}</span><p>{C["pre_box"]}</p></div>
</div></section>

<section id="faq"><div class="wrap">
{doc(n["faq"], lab["faq"])}
<h2>{H(C["faq_h2"])}</h2>
{faq}
<p style="margin-top:var(--s4)"><a href="{L("reglamento")}">{H(C["faq_more"])}</a></p>
</div></section>
</main>
'''
    return head + "\n" + hdr + main + P.FOOT() + '\n<script src="/assets/route.v1.js" defer></script>\n</body>\n</html>\n'

if __name__ == "__main__":
    for lang in [l for l in ("es", "en", "eu") if l in HOME]:
        path = {"es": "index.html", "en": "en/index.html", "eu": "eu/index.html"}[lang]
        os.makedirs(os.path.dirname(os.path.join(ROOT, path)) or ROOT, exist_ok=True)
        open(os.path.join(ROOT, path), "w", encoding="utf8").write(build_home(lang))
        for q, a, _ in HOME[lang]["faq"]:
            w = len(a.split()); print(lang, "OK" if (lang == "eu" or 25 <= w <= 40) else "!!", w)
    print("home generada")
