#!/usr/bin/env python3
"""Capa SEO/AEO sobre las páginas ya generadas: meta social, JSON-LD, sitemap, robots, llms, _headers, _redirects, netlify.toml.
Uso (después de home.py, pages*.py y forms.py):  python3 -I tools/seo.py"""
import os, sys, re, json, hashlib, base64, datetime, html as _h
sys.path.insert(0, os.path.dirname(__file__))
import gallery
import pages as P, pages_en, pages_eu, forms  # noqa: forms añade gracias/confirmado a P.URLS
from home import HOME
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ROOT = os.path.join(REPO, "site")
SITE = "https://ultratraillarre.org"
LANGS = ("es", "eu", "en"); IDX = {"es": 0, "eu": 1, "en": 2}
NOINDEX = {"gracias", "confirmado"}
TODAY = datetime.date.today().isoformat()
LM = os.path.join(REPO, "tools", "lastmod.json")
lastmod = json.load(open(LM)) if os.path.exists(LM) else {}
OGL = {"es": "es_ES", "eu": "eu_ES", "en": "en_GB"}
ORG = {"@type": "Organization", "@id": SITE + "/#organization", "name": "Ultra Trail Larre®", "url": SITE + "/", "logo": SITE + "/favicon.svg",
       "email": "ignacio@musubigara.org", "telephone": "+34620463558", "sameAs": ["https://www.instagram.com/ultratraillarre/"],
       "founder": {"@type": "Person", "name": "Ignacio Sanz Arana"}, "address": {"@type": "PostalAddress", "addressLocality": "Vitoria-Gasteiz", "addressRegion": "Álava", "addressCountry": "ES"}}
EVD = {"es": "Ultra-trail non-stop de 226,9 km y 4.644 m D+ en una sola etapa, en autosuficiencia y con cero residuos, por las cuatro Álavas. 300 plazas. Salida a las 16:00 desde el Parque de la Florida de Vitoria-Gasteiz.",
       "en": "Non-stop 226.9 km ultra-trail with 4,644 m of climbing in a single self-supported stage, zero waste, across the four Álavas. 300 places. Start at 16:00 from Parque de la Florida, Vitoria-Gasteiz.",
       "eu": "226,9 km eta 4.644 m D+ dituen non-stop ultra-traila, etapa bakarrean, autosufizientzian eta hondakinik gabe, Arabako lau aurpegietan zehar. 300 plaza. Irteera 16:00etan Gasteizko Florida parketik."}
JS_INLINE = 'document.documentElement.className+=" js"'

def reg():
    out = []
    for key, urls in P.URLS.items():
        for lang in LANGS: out.append(dict(key=key, lang=lang, url=urls[IDX[lang]], noindex=key in NOINDEX))
    return out
def fpath(url): return os.path.join(ROOT, url.strip("/"), "index.html") if url != "/" else os.path.join(ROOT, "index.html")
def meta(s, pat): m = re.search(pat, s); return _h.unescape(m.group(1)) if m else ""

def lm_for(url, s):
    h = hashlib.sha256(re.sub(r"<!--seo-->.*?<!--/seo-->", "", s, flags=re.S).encode()).hexdigest()[:16]
    e = lastmod.get(url)
    if not e: e = lastmod[url] = {"hash": h, "first": TODAY, "lastmod": TODAY}
    elif e["hash"] != h: e.update(hash=h, lastmod=TODAY)
    return e

def graph(r, s, e):
    key, lang, url = r["key"], r["lang"], r["url"]; full = SITE + url; title = meta(s, r"<title>(.*?)</title>"); desc = meta(s, r'<meta name="description" content="(.*?)">')
    h1 = re.sub(r"<[^>]+>", " ", meta(s, r"<h1[^>]*>(.*?)</h1>") or title); h1 = re.sub(r"\s+", " ", h1).strip()
    g = [ORG]; home = SITE + P.URLS["home"][IDX[lang]]
    if key == "home":
        g.append({"@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "Ultra Trail Larre®", "inLanguage": ["es", "eu", "en"], "publisher": {"@id": SITE + "/#organization"}})
        g.append({"@type": "WebPage", "@id": full + "#webpage", "url": full, "name": title, "description": desc, "inLanguage": lang, "isPartOf": {"@id": SITE + "/#website"}, "primaryImageOfPage": {"@id": SITE + "/#image"}})
        g.append({"@type": "FAQPage", "inLanguage": lang, "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": f"{a} {b}"}} for q, a, b in HOME[lang]["faq"]]})
    else:
        crumbs = [{"@type": "ListItem", "position": 1, "name": P.UI[lang]["home"], "item": home}, {"@type": "ListItem", "position": 2, "name": re.sub(r"\s+", " ", meta(s, r'<p class="crumbs mono"><a [^>]*>.*?</a> / (.*?)</p>')), "item": full}]
        g.append({"@type": "BreadcrumbList", "itemListElement": crumbs})
    if key in ("home", "ruta", "preinscripcion"):
        g.append({"@type": "SportsEvent", "@id": SITE + "/#event", "name": "Ultra Trail Larre® · " + {"es": "I Edición", "en": "1st Edition", "eu": "I. edizioa"}[lang], "description": EVD[lang], "sport": "Ultra-trail", "startDate": "2027-10",
            "eventStatus": "https://schema.org/EventScheduled", "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode", "maximumAttendeeCapacity": 300, "inLanguage": ["es", "eu", "en"],
            "image": SITE + "/og-larre.jpg", "url": SITE + P.URLS["home"][0],
            "location": {"@type": "Place", "name": "Parque de la Florida", "address": {"@type": "PostalAddress", "addressLocality": "Vitoria-Gasteiz", "addressRegion": "Álava", "addressCountry": "ES"}},
            "organizer": {"@id": SITE + "/#organization"},
            "offers": {"@type": "Offer", "url": SITE + P.URLS["preinscripcion"][IDX[lang]], "availability": "https://schema.org/PreOrder", "validFrom": "2027-01-01"}})
    if key in ("filosofia", "guia"):
        g.append({"@type": "Article", "headline": h1, "description": desc, "inLanguage": lang, "datePublished": e["first"], "dateModified": e["lastmod"], "image": SITE + "/og-larre.jpg",
                  "author": {"@type": "Person", "name": "Ignacio Sanz Arana"}, "publisher": {"@id": SITE + "/#organization"}, "mainEntityOfPage": full})
    if key == "galeria":
        from PIL import Image
        for f, cap in gallery.photos(lang):
            fp = os.path.join(ROOT, "fotos", f + ".webp"); w, hh = Image.open(fp).size if os.path.exists(fp) else (None, None)
            g.append({"@type": "ImageObject", "contentUrl": f"{SITE}/fotos/{f}.webp", "thumbnailUrl": f"{SITE}/fotos/{f}-400.webp", "caption": cap, "width": w, "height": hh, "creditText": "@ultratraillarre", "creator": {"@id": SITE + "/#organization"}, "inLanguage": lang})
    return {"@context": "https://schema.org", "@graph": g}

def inject(r, s, e):
    full = SITE + r["url"]; title = meta(s, r"<title>(.*?)</title>"); desc = meta(s, r'<meta name="description" content="(.*?)">'); L = r["lang"]
    art = r["key"] in ("filosofia", "guia")
    alt = {"es": "Ultra Trail Larre®: ultra-trail non-stop de 226,9 km por Álava", "en": "Ultra Trail Larre®: 226.9 km non-stop ultra-trail in Álava", "eu": "Ultra Trail Larre®: 226,9 km-ko non-stop ultra-trail Araban"}[L]
    q = lambda x: _h.escape(x, quote=True)
    tags = [f'<link rel="icon" href="/favicon.svg" type="image/svg+xml">', '<meta name="theme-color" content="#EDE5D2">',
        f'<meta property="og:type" content="{"article" if art else "website"}">', '<meta property="og:site_name" content="Ultra Trail Larre®">', f'<meta property="og:title" content="{q(title)}">',
        f'<meta property="og:description" content="{q(desc)}">', f'<meta property="og:url" content="{full}">', f'<meta property="og:locale" content="{OGL[L]}">']
    tags += [f'<meta property="og:locale:alternate" content="{OGL[x]}">' for x in LANGS if x != L]
    tags += [f'<meta property="og:image" content="{SITE}/og-larre.jpg">', '<meta property="og:image:width" content="1200">', '<meta property="og:image:height" content="630">', f'<meta property="og:image:alt" content="{q(alt)}">',
        '<meta name="twitter:card" content="summary_large_image">', f'<meta name="twitter:title" content="{q(title)}">', f'<meta name="twitter:description" content="{q(desc)}">', f'<meta name="twitter:image" content="{SITE}/og-larre.jpg">']
    if not r["noindex"]: tags.append('<script type="application/ld+json">' + json.dumps(graph(r, s, e), ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/") + "</script>")
    block = "<!--seo-->\n" + "\n".join(tags) + "\n<!--/seo-->"
    s = re.sub(r"<!--seo-->.*?<!--/seo-->\n?", "", s, flags=re.S)
    return s.replace("</head>", block + "\n</head>", 1)

def text_of(s):
    m = re.search(r"<main.*?</main>", s, re.S); t = m.group(0) if m else s
    t = re.sub(r"<(script|style|svg|nav|button|form)\b.*?</\1>", "", t, flags=re.S)
    t = re.sub(r"<h1[^>]*>", "\n# ", t); t = re.sub(r"<h2[^>]*>", "\n## ", t); t = re.sub(r"<h3[^>]*>|<summary[^>]*>", "\n### ", t)
    t = re.sub(r"<li[^>]*>", "\n- ", t); t = re.sub(r"<(/p|/div|/tr|/dd|/dt|br|/h\d|/summary|/li)[^>]*>", "\n", t); t = re.sub(r"<[^>]+>", " ", t)
    t = _h.unescape(t); t = re.sub(r"[ \t]+", " ", t); t = re.sub(r" *\n *", "\n", t); return re.sub(r"\n{3,}", "\n\n", t).strip()

LLMS = {"es": ("Ultra Trail Larre®", "Ultra-trail non-stop de 226,9 km y 4.644 m de desnivel positivo que se corre en una sola etapa, en autosuficiencia y con cero residuos, por las cuatro Álavas (Euskadi). Máximo 300 corredores. I Edición en otoño de 2027, con salida a las 16:00 desde el Parque de la Florida de Vitoria-Gasteiz.",
  ["Distancia y desnivel: 226,9 km, 4.644 m D+ (altitud 515–1.383 m), circular desde y hasta Vitoria-Gasteiz.", "Zonas: sierras de Entzia, Toloño, Cantabria e Izki, Rioja Alavesa.", "Formato: una sola etapa non-stop, autosuficiencia real, sin asistencia ni avituallamientos clásicos. Track GPS oficial obligatorio y 6 checkpoints de sellado.", "Tiempo límite: 50 horas.", "Plazas: 300, por orden de llegada de la preinscripción (incluye una breve descripción personal obligatoria). La lista de preinscripción abre el 1 de diciembre de 2026; las inscripciones se abren en enero de 2027.", "Código Cero: tirar un solo envase en el recorrido supone descalificación inmediata.", "Seguridad: tracker GPS con botón SOS y centro de control en Vitoria-Gasteiz."], "Datos clave", "Páginas", "Contacto", "Organiza Ignacio Sanz Arana (Musubigara®)."),
 "en": ("Ultra Trail Larre®", "Non-stop 226.9 km ultra-trail with 4,644 m of positive elevation gain, run in a single self-supported, zero-waste stage across the four Álavas (Basque Country). Limited to 300 runners. 1st Edition in autumn 2027, starting at 16:00 from Parque de la Florida, Vitoria-Gasteiz.",
  ["Distance and elevation: 226.9 km, 4,644 m D+ (altitude 515–1,383 m), a loop from and to Vitoria-Gasteiz.", "Areas: Entzia, Toloño, Cantabria and Izki ranges, Rioja Alavesa.", "Format: a single non-stop stage, true self-sufficiency, no assistance or classic aid stations. Official GPS track required and 6 stamping checkpoints.", "Time limit: 50 hours.", "Places: 300, in order of arrival of the pre-registration (a short personal description is mandatory). The pre-registration list opens on 1 December 2026; registrations open in January 2027.", "Zero Code: dropping a single piece of litter on the course means immediate disqualification.", "Safety: GPS tracker with SOS button and a control centre in Vitoria-Gasteiz."], "Key facts", "Pages", "Contact", "Organised by Ignacio Sanz Arana (Musubigara®)."),
 "eu": ("Ultra Trail Larre®", "226,9 km eta 4.644 m-ko igoera positiboa dituen non-stop ultra-traila, etapa bakarrean, autosufizientzian eta hondakinik gabe korritzen dena, Arabako lau aurpegietan zehar (Euskadi). Gehienez 300 korrikalari. I. edizioa 2027ko udazkenean, 16:00etan Gasteizko Florida parketik irtenda.",
  ["Distantzia eta desnibela: 226,9 km, 4.644 m D+ (altitudea 515–1.383 m), Gasteiztik eta Gasteizera ibilbide zirkularra.", "Eremuak: Entzia, Toloño, Kantabria eta Izki mendilerroak, Arabako Errioxa.", "Formatua: non-stop etapa bakarra, benetako autosufizientzia, laguntzarik eta ohiko janari-posturik gabe. GPS track ofiziala nahitaezkoa eta 6 zigilatze-checkpoint.", "Denbora-muga: 50 ordu.", "Plazak: 300, aurrez-izenaren iristeko ordenan (deskribapen pertsonal labur bat nahitaezkoa da). Aurrez-izenen zerrenda 2026ko abenduaren 1ean irekiko da; izen-emateak 2027ko urtarrilean.", "Zero Kodea: ibilbidean ontzi bakar bat botatzeak berehalako deskalifikazioa dakar.", "Segurtasuna: SOS botoia duen GPS tracker-a eta kontrol-zentroa Gasteizen."], "Datu nagusiak", "Orriak", "Harremanetarako", "Antolatzailea: Ignacio Sanz Arana (Musubigara®).")}

def main():
    pages = reg(); entries = []
    for r in pages:
        fp = fpath(r["url"]); s = open(fp, encoding="utf8").read()
        e = lm_for(r["url"], s); s = inject(r, s, e); open(fp, "w", encoding="utf8").write(s)
        r["lastmod"] = e["lastmod"]; r["html"] = s
    json.dump(lastmod, open(LM, "w"), indent=1, sort_keys=True)
    # sitemap
    byk = {}
    for r in pages: byk.setdefault(r["key"], {})[r["lang"]] = r
    x = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for key, d in byk.items():
        if key in NOINDEX: continue
        for lang in LANGS:
            r = d[lang]; alts = "".join(f'<xhtml:link rel="alternate" hreflang="{l}" href="{SITE}{d[l]["url"]}"/>' for l in LANGS) + f'<xhtml:link rel="alternate" hreflang="x-default" href="{SITE}{d["es"]["url"]}"/>'
            x.append(f'<url><loc>{SITE}{r["url"]}</loc><lastmod>{r["lastmod"]}</lastmod>{alts}</url>')
    x.append("</urlset>"); open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf8").write("\n".join(x) + "\n")
    # robots
    bots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "Bingbot", "Googlebot"]
    rb = ["User-agent: *", "Allow: /", "Disallow: /api/", "Disallow: /.netlify/", ""] + sum([[f"User-agent: {b}", "Allow: /", "Disallow: /api/", "Disallow: /.netlify/", ""] for b in bots], []) + [f"Sitemap: {SITE}/sitemap.xml", ""]
    open(os.path.join(ROOT, "robots.txt"), "w").write("\n".join(rb))
    # llms
    for lang in LANGS:
        name, summ, facts, hf, hp, hc, org = LLMS[lang]; pre = "" if lang == "es" else f"/{lang}"
        lst = [f"- [{meta(r['html'], r'<title>(.*?)</title>').split(' · ')[0]}]({SITE}{r['url']}): {meta(r['html'], r'<meta name=\"description\" content=\"(.*?)\">')}" for k, d in byk.items() if k not in NOINDEX for r in [d[lang]]]
        lst = [re.sub(r"<[^>]+>", " ", l) for l in lst]; lst = [re.sub(r"\s+", " ", l) for l in lst]
        head = f"# {name}\n\n> {summ}\n\n## {hf}\n\n" + "\n".join("- " + f for f in facts) + f"\n\n## {hp}\n\n" + "\n".join(lst) + f"\n\n## {hc}\n\n- {org}\n- Email: ignacio@musubigara.org\n- WhatsApp: +34 620 46 35 58\n- Instagram: https://www.instagram.com/ultratraillarre/\n"
        d = os.path.join(ROOT, lang) if lang != "es" else ROOT; os.makedirs(d, exist_ok=True)
        open(os.path.join(d, "llms.txt"), "w", encoding="utf8").write(head)
        full = head + "\n---\n\n" + "\n\n---\n\n".join(f"<!-- {SITE}{d2[lang]['url']} -->\n" + text_of(d2[lang]["html"]) for k, d2 in byk.items() if k not in NOINDEX)
        open(os.path.join(d, "llms-full.txt"), "w", encoding="utf8").write(full + "\n")
    # headers + redirects + toml
    hsh = "sha256-" + base64.b64encode(hashlib.sha256(JS_INLINE.encode()).digest()).decode()
    csp = f"default-src 'self'; script-src 'self' '{hsh}'; style-src 'self'; style-src-attr 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; upgrade-insecure-requests"
    hdr = f"""/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: {csp}

/fotos/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/assets/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
/datos/*
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
/og-larre.jpg
  Cache-Control: public, max-age=604800
/favicon.svg
  Cache-Control: public, max-age=604800
/*.pdf
  Cache-Control: public, max-age=86400, stale-while-revalidate=604800
/api/*
  Cache-Control: no-store
  X-Robots-Tag: noindex
/gracias/
  X-Robots-Tag: noindex
/eu/eskerrik-asko/
  X-Robots-Tag: noindex
/en/thanks/
  X-Robots-Tag: noindex
/confirmado/
  X-Robots-Tag: noindex
/eu/baieztatuta/
  X-Robots-Tag: noindex
/en/confirmed/
  X-Robots-Tag: noindex
"""
    open(os.path.join(ROOT, "_headers"), "w").write(hdr)
    red = "\n".join(f"{sch}://{h}/*  https://ultratraillarre.org/:splat  301!" for h in ("larrelongdistance.org", "www.larrelongdistance.org", "www.ultratraillarre.org") for sch in ("http", "https")) + "\n"
    open(os.path.join(ROOT, "_redirects"), "w").write("# Dominio antiguo y www -> dominio canónico (301, conserva la ruta)\n" + red)
    open(os.path.join(REPO, "netlify.toml"), "w").write('[build]\n  publish = "site"\n\n[functions]\n  directory = "netlify/functions"\n  node_bundler = "esbuild"\n')
    print(len(pages), "páginas con capa SEO; CSP hash", hsh)
main()
