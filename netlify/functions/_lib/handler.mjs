import { cfg, json, LANGS } from './config.mjs';
import { rateLimited, get, set, sha } from './store.mjs';

/** Lee el cuerpo, ya sea JSON (fetch) o formulario clásico (sin JavaScript). */
export async function readBody(req) {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) return { data: await req.json(), classic: false };
  const fd = await req.formData();
  const data = {}; fd.forEach((v, k) => { data[k] = typeof v === 'string' ? v : ''; });
  return { data, classic: true };
}
export const clientIp = (req, ctx) => (ctx && ctx.ip) || (req.headers.get('x-nf-client-connection-ip') || (req.headers.get('x-forwarded-for') || '').split(',')[0] || '').trim();
export const pickLang = (v) => (LANGS.includes(v) ? v : 'es');

const CLASSIC = {
  es: { ok: 'Mensaje recibido', okP: 'Gracias. Te responderemos en persona.', ko: 'No hemos podido enviarlo', koP: 'Inténtalo de nuevo o escríbenos a ignacio@musubigara.org.', back: 'Volver a la web', home: '/' },
  eu: { ok: 'Mezua jasota', okP: 'Eskerrik asko. Pertsonalki erantzungo dizugu.', ko: 'Ezin izan dugu bidali', koP: 'Saiatu berriro edo idatzi hona: ignacio@musubigara.org.', back: 'Webgunera itzuli', home: '/eu/' },
  en: { ok: 'Message received', okP: 'Thank you. We will reply in person.', ko: 'We could not send it', koP: 'Please try again or write to ignacio@musubigara.org.', back: 'Back to the website', home: '/en/' }
};
/** Respuesta HTML mínima para envíos sin JavaScript. */
export function classicReply(lang, ok) {
  const c = CLASSIC[lang];
  const html = `<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${ok ? c.ok : c.ko} · Ultra Trail Larre®</title><body style="margin:0;background:#EFE6D2;color:#1F1915;font:18px/1.6 Georgia,serif;padding:12vh 24px;text-align:center"><h1 style="font-weight:400">${ok ? c.ok : c.ko}</h1><p>${ok ? c.okP : c.koP}</p><p><a style="color:#7A1F2B" href="${c.home}">${c.back}</a></p></body></html>`;
  return new Response(html, { status: ok ? 200 : 400, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
}
export { cfg, json, rateLimited, get, set, sha };
