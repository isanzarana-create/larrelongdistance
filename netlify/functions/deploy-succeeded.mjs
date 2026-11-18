// Aviso IndexNow tras cada despliegue de producción (Bing, Yandex, Seznam, Naver, Yep…).
// Netlify ejecuta esta función sola cuando un deploy termina bien («deploy-succeeded»).
// Envía las URLs del sitemap cuyo <lastmod> es de hoy o de ayer (lo que acaba de cambiar).
// No necesita cuentas ni claves secretas: la clave pública está en /KEY.txt.
const HOST = 'ultratraillarre.org';
const KEY = 'fdadaf79e45527589cacf97933cc9eb3';

export const handler = async (event) => {
  try {
    const payload = JSON.parse(event.body || '{}').payload || {};
    if (payload.context && payload.context !== 'production') return { statusCode: 200, body: 'skip: not production' };
    const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
    const fmt = (d) => d.toISOString().slice(0, 10);
    const now = new Date();
    const recent = new Set([fmt(now), fmt(new Date(now - 864e5))]);
    const urls = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
      .filter(([, , lm]) => recent.has(lm.slice(0, 10)))
      .map(([, loc]) => loc);
    if (!urls.length) return { statusCode: 200, body: 'nothing new' };
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 1000) })
    });
    console.log('[indexnow]', res.status, urls.length, 'URLs');
    return { statusCode: 200, body: `indexnow ${res.status}` };
  } catch (e) {
    console.log('[indexnow] error', e.message);
    return { statusCode: 200, body: 'error (no bloquea el deploy)' };
  }
};
