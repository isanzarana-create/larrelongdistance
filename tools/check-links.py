#!/usr/bin/env python3
"""Rastreo de enlaces del sitio construido. Uso: python3 tools/check-links.py [http://localhost:8080]
Comprueba: enlaces, imágenes, srcset, anclas, hreflang/canonical, sitemap. Sin redirecciones en destinos internos."""
import sys, re, urllib.request, urllib.error, urllib.parse
from html.parser import HTMLParser
BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8080').rstrip('/')
ORIGIN = 'https://ultratraillarre.org'
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k): return None
op = urllib.request.build_opener(NoRedirect)
cache = {}
def get(url):
    if url in cache: return cache[url]
    try:
        r = op.open(urllib.request.Request(url, headers={'User-Agent': 'larre-check'}), timeout=15); res = (r.status, r.read(), r.headers)
    except urllib.error.HTTPError as e: res = (e.code, b'', e.headers)
    except Exception as e: res = (0, b'', {})
    cache[url] = res; return res
class P(HTMLParser):
    def __init__(s): super().__init__(); s.links = []; s.ids = set(); s.hl = []; s.can = None; s.h1 = 0
    def handle_starttag(s, tag, a):
        a = dict(a)
        if 'id' in a: s.ids.add(a['id'])
        if tag == 'h1': s.h1 += 1
        if tag == 'a' and a.get('href'): s.links.append(('a', a['href']))
        if tag == 'link' and a.get('rel') == 'alternate' and a.get('hreflang'): s.hl.append((a['hreflang'], a['href']))
        if tag == 'link' and a.get('rel') == 'canonical': s.can = a['href']
        if tag == 'link' and a.get('href') and a.get('rel') in ('stylesheet', 'icon', 'apple-touch-icon', 'manifest', 'preload'): s.links.append(('res', a['href']))
        if tag in ('script', 'img', 'source') and a.get('src'): s.links.append(('res', a['src']))
        for k in ('srcset',):
            if a.get(k):
                for part in a[k].split(','): s.links.append(('res', part.strip().split(' ')[0]))
        if a.get('data-full'): s.links.append(('res', a['data-full']))
        if a.get('data-avif'): s.links.append(('res', a['data-avif']))
pages = {}
sm = get(BASE + '/sitemap.xml')[1].decode()
urls = [u.replace(ORIGIN, '') for u in re.findall(r'<loc>([^<]+)</loc>', sm)]
urls.append('/404.html')
bad = []; ext = set(); total = 0
def parse(path):
    if path in pages: return pages[path]
    st, body, h = get(BASE + path)
    p = P(); p.feed(body.decode('utf8', 'replace')); pages[path] = (st, p); return pages[path]
for path in urls:
    st, p = parse(path)
    if st != 200: bad.append((path, 'página', st))
    if path != '/404.html':
        if p.h1 != 1: bad.append((path, 'H1 distintos de 1', p.h1))
        if p.can != ORIGIN + path: bad.append((path, 'canonical', p.can))
        langs = {l for l, _ in p.hl}
        if langs != {'es', 'eu', 'en', 'x-default'}: bad.append((path, 'hreflang', sorted(langs)))
        for l, h in p.hl:
            tgt = h.replace(ORIGIN, '')
            if get(BASE + tgt)[0] != 200: bad.append((path, 'hreflang roto', h))
            # reciprocidad
            _, q = parse(tgt)
            if (dict(p.hl).get('es') and ORIGIN + path not in [x for _, x in q.hl]): bad.append((path, 'hreflang no recíproco', tgt))
    for kind, href in p.links:
        total += 1
        if href.startswith(('mailto:', 'tel:', 'javascript:')): continue
        u = urllib.parse.urljoin(ORIGIN + path, href)
        if u.startswith('http') and not u.startswith(ORIGIN): ext.add(u); continue
        path2 = u.replace(ORIGIN, ''); frag = ''
        if '#' in path2: path2, frag = path2.split('#', 1)
        path2 = path2.split('?')[0] or '/'
        st2 = get(BASE + path2)[0]
        if st2 != 200: bad.append((path, f'{kind} roto/redirige', f'{href} → {st2}')); continue
        if frag and path2.endswith(('/', '.html')):
            _, q = parse(path2)
            if frag not in q.ids: bad.append((path, 'ancla inexistente', href))
print(f'Páginas: {len(urls)} · referencias internas comprobadas: {total} · externas únicas: {len(ext)}')
for e in sorted(ext): print('  externa:', e)
print('PROBLEMAS:' if bad else 'OK: 0 enlaces rotos, 0 redirecciones, 0 anclas rotas, 0 imágenes 404')
for b in bad: print('  ', b)
sys.exit(1 if bad else 0)
