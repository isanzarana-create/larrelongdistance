"""Extrae bloques (h2/h3/p/ul/ol/table) de una página antigua y los limpia de clases y de la capa EN."""
import re, html
def blocks(path, start_marker, end_marker=None):
    s = open(path, encoding="utf8").read()
    i = s.index(start_marker); s = s[i:]
    if end_marker and end_marker in s: s = s[:s.index(end_marker)]
    s = re.sub(r'<span class="l-en">.*?</span>', '', s, flags=re.S)
    s = re.sub(r'<span class="l-es">(.*?)</span>', r'\1', s, flags=re.S)
    out = []
    for m in re.finditer(r'<(h2|h3|p|ul|ol|table)\b[^>]*>.*?</\1>', s, flags=re.S):
        b = m.group(0)
        b = re.sub(r'\s(class|style|id|data-[\w-]+)="[^"]*"', '', b)
        b = re.sub(r'<(\w+)\s+>', r'<\1>', b)
        out.append(b)
    return out
