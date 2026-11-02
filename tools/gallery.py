"""Lee site/datos/galeria.json (lo escribe el robot de Instagram) y devuelve fotos con pie por idioma."""
import json, os
SITE_DIR = os.path.join(os.path.dirname(__file__), "..", "site")
FALL = {"es": "Fotografía de @ultratraillarre", "en": "Photograph from @ultratraillarre", "eu": "@ultratraillarre-ren argazkia"}
def load():
    try: return json.load(open(os.path.join(SITE_DIR, "datos", "galeria.json"), encoding="utf8"))["photos"]
    except Exception: return []
def photos(lang, limit=None):
    out = []
    for p in load():
        cap = p.get(lang) or ""
        if not cap: cap = f"{FALL[lang]} · {p['date']}" if lang != "es" or not p.get("es") else p["es"]
        out.append((p["file"], cap))
    return out[:limit] if limit else out
