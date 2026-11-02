#!/usr/bin/env python3
"""GPX -> datos/larre-2027.json (Douglas-Peucker 3D, [lon,lat,ele,km]) y trazados SVG para la portada y la página de ruta."""
import re, math, json, sys
R = 6371008.8
src = sys.argv[1] if len(sys.argv) > 1 else "larre-2027.gpx"
s = open(src, encoding="utf8").read()
P = [(float(a), float(b), float(c)) for a, b, c in re.findall(r'<trkpt lat="([-\d.]+)" lon="([-\d.]+)">\s*<ele>([-\d.]+)</ele>', s)]
def hv(p, q):
    f1, f2 = math.radians(p[0]), math.radians(q[0]); dl = math.radians(q[1]-p[1]); df = f2-f1
    a = math.sin(df/2)**2 + math.cos(f1)*math.cos(f2)*math.sin(dl/2)**2
    return 2*R*math.asin(math.sqrt(a))
km = [0.0]
for i in range(1, len(P)): km.append(km[-1] + hv(P[i-1], P[i]))
lat0 = sum(p[0] for p in P)/len(P); kx = math.cos(math.radians(lat0))
# coordenadas en metros (equirrectangular corregida por cos(lat media)); z escalada x3 para respetar el perfil
XY = [(math.radians(p[1])*R*kx, math.radians(p[0])*R, p[2]*3) for p in P]
def dp(tol):
    keep = {0, len(P)-1, max(range(len(P)), key=lambda i: P[i][2]), min(range(len(P)), key=lambda i: P[i][2])}
    st = [(0, len(P)-1)]
    while st:
        a, b = st.pop()
        A, B = XY[a], XY[b]; v = [B[k]-A[k] for k in range(3)]; vv = sum(c*c for c in v) or 1e-9
        md, mi = -1, -1
        for i in range(a+1, b):
            w = [XY[i][k]-A[k] for k in range(3)]; t = max(0, min(1, sum(w[k]*v[k] for k in range(3))/vv))
            d = math.sqrt(sum((w[k]-t*v[k])**2 for k in range(3)))
            if d > md: md, mi = d, i
        if md > tol: keep.add(mi); st += [(a, mi), (mi, b)]
    return sorted(keep)
lo, hi = 2.0, 60.0
for _ in range(14):
    mid = (lo+hi)/2; k = dp(mid)
    if len(k) > 2300: lo = mid
    else: hi = mid
K = dp(hi)
pts = [[round(P[i][1], 5), round(P[i][0], 5), round(P[i][2]), round(km[i]/1000, 2)] for i in K]
total = km[-1]/1000
imax = max(range(len(P)), key=lambda i: P[i][2])
out = {
  "nombre": "Ultra Trail Larre",
  "fuente": "larre-2027.gpx (Komoot, exportado 2026-11-01)",
  "km_total": round(total, 1), "d_pos_m": 4644, "alt_min_m": round(min(p[2] for p in P)), "alt_max_m": round(P[imax][2]),
  "punto_mas_alto": {"km": round(km[imax]/1000, 1), "lat": round(P[imax][0], 6), "lon": round(P[imax][1], 6)},
  "puntos": pts,
  "municipios": None, "paisajes": None,
}
json.dump(out, open("datos/larre-2027.json", "w"), separators=(",", ":"), ensure_ascii=False)
print(len(P), "->", len(pts), "puntos; tolerancia", round(hi, 1), "m;", round(total, 3), "km")
