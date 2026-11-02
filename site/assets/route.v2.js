/* Secciones desplegables de la portada: abrir la que se enlaza por ancla. */
(function () {
  function open(id) { var e = id && document.getElementById(id), d = e && e.querySelector('details.sec-acc'); if (d && !d.open) d.open = true; return e; }
  function fromHash() { var e = open(location.hash.slice(1)); if (e && e.scrollIntoView) e.scrollIntoView(); }
  addEventListener('hashchange', fromHash); fromHash();
  document.addEventListener('click', function (ev) { var a = ev.target.closest && ev.target.closest('a[href^="#"]'); if (a) open(a.getAttribute('href').slice(1)); });
})();
/* Módulo de ruta: deslizador único sobre perfil y mapa. Mejora progresiva: sin JS, mapa y perfil ya están dibujados. */
(function () {
  var m = document.getElementById('rmod'); if (!m) return;
  var nf = new Intl.NumberFormat(m.dataset.lang || 'es', { maximumFractionDigits: 1 }), ni = new Intl.NumberFormat(m.dataset.lang || 'es', { maximumFractionDigits: 0, useGrouping: 'always' });
  var D = m.dataset, total = +D.total, PL = +D.pl, PR = +D.pr, PW = +D.pw, PT = +D.pt, PB = +D.pb, PPH = +D.pph, EMIN = +D.emin, EMAX = +D.emax;
  var lon0 = +D.mlon0, lat1 = +D.mlat1, kx = +D.mkx, sc = +D.msc, pad = +D.mpad;
  var input = document.getElementById('rscrub'), read = document.getElementById('rread'), live = document.getElementById('rlive');
  var curP = document.getElementById('cur-prof'), curM = document.getElementById('cur-map');
  var pts = null, timer = null;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { m.classList.add('drawn'); o.disconnect(); } }, { threshold: 0.25 }).observe(m);
  } else m.classList.add('drawn');
  function at(km) { // interpolación lineal sobre los puntos simplificados [lon,lat,ele,km]
    var lo = 0, hi = pts.length - 1;
    while (hi - lo > 1) { var mid = (lo + hi) >> 1; if (pts[mid][3] <= km) lo = mid; else hi = mid; }
    var a = pts[lo], b = pts[hi], t = b[3] === a[3] ? 0 : (km - a[3]) / (b[3] - a[3]);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }
  function text(km) {
    var p = at(km), q = at(Math.min(total, km + 0.5)), r = at(Math.max(0, km - 0.5)), dk = Math.min(total, km + 0.5) - Math.max(0, km - 0.5);
    var g = dk > 0 ? (q[2] - r[2]) / (dk * 1000) * 100 : 0;
    return 'km ' + nf.format(km) + ' · ' + ni.format(p[2]) + ' m · ' + (D.slope || 'pendiente') + ' ' + (g >= 0 ? '+' : '−') + nf.format(Math.abs(g)) + ' %';
  }
  function move(km) {
    var p = at(km), x = PL + km / total * (PW - PL - PR), y = PT + (EMAX - p[2]) / (EMAX - EMIN) * (PPH - PT - PB);
    curP.hidden = false; curP.setAttribute('transform', 'translate(' + x.toFixed(1) + ' 0)');
    curP.querySelector('circle').setAttribute('cy', y.toFixed(1));
    curM.hidden = false; curM.setAttribute('cx', (pad + (p[0] - lon0) * kx * sc).toFixed(1)); curM.setAttribute('cy', (pad + (lat1 - p[1]) * sc).toFixed(1));
    var t = text(km); read.textContent = t; input.setAttribute('aria-valuetext', t);
    clearTimeout(timer); timer = setTimeout(function () { live.textContent = t; }, 500);
  }
  fetch(D.src).then(function (r) { return r.json(); }).then(function (d) {
    pts = d.puntos; input.hidden = false;
    input.addEventListener('input', function () { move(input.value / 10); });
    input.addEventListener('blur', function () { read.textContent = read.dataset.default; });
  }).catch(function () { /* degradación honesta: se queda el mapa y el perfil estáticos */ });
})();
