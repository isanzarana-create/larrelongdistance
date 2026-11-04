/**
 * Comprobaciones en vivo (ejecútalas desde tu ordenador, con acceso normal a internet).
 *   node tools/check-live.mjs https://<tu-deploy-preview>.netlify.app   → cabeceras, 404, API, caché, enlaces externos
 *   node tools/check-live.mjs --redirects                                → 301 desde los dominios antiguos (cuando estén como aliases)
 */
const arg = process.argv[2];
let ok = 0, ko = 0;
const t = (name, cond, extra = '') => { cond ? ok++ : ko++; console.log(`${cond ? '  OK ' : ' FALLA'}  ${name}${extra ? ' · ' + extra : ''}`); };
const get = (u, o = {}) => fetch(u, { redirect: 'manual', headers: { 'User-Agent': 'larre-check' }, ...o })
  .catch((e) => ({ status: 0, ok: false, headers: new Headers(), text: async () => '', error: String((e && e.cause && e.cause.code) || e.message || e) }));

if (arg === '--redirects') {
  const N = 'https://ultratraillarre.org';
  const cases = [
    ['https://larrelongdistance.org/', N + '/'], ['https://www.larrelongdistance.org/ruta', N + '/#ruta'], ['https://larrelongdistance.com/en/route/', N + '/en/#ruta'],
    ['https://larrelongdistance.org/reglamento/', N + '/#descargas'], ['https://larrelongdistance.org/aviso-legal/', N + '/aviso-legal/'], ['https://larrelongdistance.org/en/privacy-policy/', N + '/en/privacy-policy/'],
    ['http://larrelongdistance.org/', N + '/'], ['https://www.ultratraillarre.org/eu/', N + '/eu/']
  ];
  for (const [from, to] of cases) {
    const r = await get(from).catch((e) => ({ status: 0, headers: new Headers(), err: e }));
    const loc = r.headers.get('location') || '';
    t(`${from} → ${to}`, r.status === 301 && (loc === to || loc === to.replace('/#', '/') ), `estado ${r.status}, destino ${loc || '—'}`);
    if (loc && loc.startsWith('http')) { const r2 = await get(loc.split('#')[0]).catch(() => ({ status: 0 })); t('   el destino responde sin más saltos', r2.status === 200, `estado ${r2.status}`); }
  }
} else if (arg) {
  const B = arg.replace(/\/$/, '');
  for (const p of ['/', '/eu/', '/en/']) {
    const r = await get(B + p); const h = r.headers;
    t(`${p} 200`, r.status === 200, String(r.status));
    t(`${p} Content-Security-Policy`, /default-src 'self'/.test(h.get('content-security-policy') || ''));
    t(`${p} Strict-Transport-Security`, /max-age=31536000/.test(h.get('strict-transport-security') || ''));
    t(`${p} X-Content-Type-Options`, h.get('x-content-type-options') === 'nosniff');
    t(`${p} X-Frame-Options`, h.get('x-frame-options') === 'DENY');
    t(`${p} Referrer-Policy`, !!h.get('referrer-policy'));
    t(`${p} Cache-Control revalidable`, /max-age=0|must-revalidate/.test(h.get('cache-control') || ''), h.get('cache-control') || '');
  }
  const home = await (await get(B + '/')).text();
  const css = (home.match(/\/assets\/larre\.css\?v=\w+/) || [])[0];
  if (css) { const r = await get(B + css); t('CSS inmutable (1 año)', /immutable/.test(r.headers.get('cache-control') || ''), r.headers.get('cache-control')); }
  const nf = await get(B + '/no-existe-' + Date.now()); t('404 propio con estado 404', nf.status === 404, String(nf.status));
  const api = await get(B + '/api/preinscripcion'); const j = await api.json().catch(() => null);
  t('API preinscripción responde JSON {open,opens}', api.status === 200 && j && 'open' in j, JSON.stringify(j));
  const pdf = await get(B + '/descargas/ultra-trail-larre-guia-es.pdf'); t('PDF guía 200 y application/pdf', pdf.status === 200 && /pdf/.test(pdf.headers.get('content-type') || ''));
  console.log('\nEnlaces externos:');
  for (const u of ['https://www.instagram.com/ultratraillarre/', 'https://wa.me/34620463558', 'https://www.google.com/maps/search/?api=1&query=42.843865%2C-2.676552', 'https://musubigara.org/', 'https://www.aepd.es/']) {
    const r = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' }, redirect: 'follow' }).catch(() => ({ status: 0 }));
    t(u, r.status >= 200 && r.status < 400, String(r.status));
  }
} else { console.log('Uso: node tools/check-live.mjs <URL> | --redirects'); process.exit(1); }
console.log(`\n${ok} correctas · ${ko} con fallo`); process.exit(ko ? 1 : 0);
