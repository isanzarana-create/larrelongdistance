// Preinscripción de Ultra Trail Larre®. GET → estado (abierta/cerrada). POST → registra y envía los correos.
import { cfg, json, rateLimited, get, set, sha, readBody, clientIp, pickLang } from './_lib/handler.mjs';
import { validatePre } from './_lib/validate.mjs';
import { newCode } from './_lib/code.mjs';
import { sendMail } from './_lib/mail.mjs';
import { runnerEmail, internalPre } from './_lib/emails.mjs';

export const config = { path: '/api/preinscripcion' };
const isOpen = () => Date.now() >= new Date(cfg().opens).getTime();
const log = (...a) => console.log('[preinscripcion]', ...a);

export default async (req, ctx) => {
  const c = cfg();
  if (req.method === 'GET') return json(200, { open: isOpen(), opens: c.opens });
  if (req.method !== 'POST') return json(405, { ok: false, error: 'server' }, { Allow: 'GET, POST' });

  let body;
  try { body = (await readBody(req)).data; } catch { return json(400, { ok: false, error: 'server' }); }
  const lang = pickLang(body.idioma);

  // Antispam: honeypot (respuesta falsa para no dar pistas) y tiempo mínimo de rellenado.
  if (body['bot-field']) { log('honeypot'); return json(200, { ok: true, code: newCode(), mailSent: true }); }
  const t = Number(body.t);
  if (!Number.isFinite(t) || t < 3000) { log('time-trap', body.t); return json(400, { ok: false, error: 'spam' }); }
  if (!isOpen()) return json(403, { ok: false, error: 'closed' });
  if (await rateLimited('pre', clientIp(req, ctx))) return json(429, { ok: false, error: 'rate' });

  const { f, bad } = validatePre(body);
  if (Object.keys(bad).length) return json(422, { ok: false, error: 'validation', fields: bad });

  // Un correo, una preinscripción: si ya existe devolvemos su código sin reenviar nada.
  const key = sha(f.email);
  const prev = await get('preinscripciones', key);
  if (prev && prev.code) { log('duplicado', prev.code); return json(200, { ok: true, code: prev.code, already: true }); }

  const code = newCode();
  const when = new Date().toISOString();
  const record = { code, when, lang, ...f };
  const persisted = await set('preinscripciones', key, record);
  await set('preinscripciones-codigo', code, { key, when });

  // Copia de seguridad en Netlify Forms (mejor esfuerzo).
  let formsOk = false;
  if (c.siteUrl) {
    try {
      const params = new URLSearchParams({ 'form-name': 'larre-preinscripcion', idioma: lang, codigo: code, nombre: f.nombre, apellidos: f.apellidos, edad: String(f.edad), sexo: f.sexo, email: f.email, referencias: f.referencias, federado: f.federado, federacion: f.federacion, descripcion: f.descripcion, observaciones: f.observaciones, consentimiento: 'si', enviado: when });
      const r = await fetch(c.siteUrl + '/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params, signal: AbortSignal.timeout(8000) });
      formsOk = r.ok || r.status === 303 || r.status === 302;
    } catch (e) { log('forms backup falló', String(e)); }
  }

  const [toRunner, toOrg] = await Promise.all([
    sendMail({ to: f.email, ...runnerEmail(lang, f, code), tags: [{ name: 'tipo', value: 'preinscripcion-corredor' }] }),
    sendMail({ to: c.notifyTo, replyTo: f.email, ...internalPre(f, code, lang, { when }), tags: [{ name: 'tipo', value: 'preinscripcion-aviso' }] })
  ]);
  log(code, { persisted, formsOk, runnerMail: toRunner.ok, orgMail: toOrg.ok, err: toRunner.error || toOrg.error || '' });

  // Éxito si el registro quedó guardado en algún sitio.
  if (!persisted && !formsOk && !toOrg.ok) return json(500, { ok: false, error: 'server' });
  return json(200, { ok: true, code, mailSent: toRunner.ok });
};
