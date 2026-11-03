// Propuestas de colaboración. POST → registra y envía confirmación + aviso interno.
import { cfg, json, rateLimited, set, readBody, clientIp, pickLang, classicReply } from './_lib/handler.mjs';
import { validateCol } from './_lib/validate.mjs';
import { sendMail } from './_lib/mail.mjs';
import { partnerEmail, internalCol } from './_lib/emails.mjs';
import { randomUUID } from 'node:crypto';

export const config = { path: '/api/colabora' };
const log = (...a) => console.log('[colabora]', ...a);

export default async (req, ctx) => {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'server' }, { Allow: 'POST' });
  const c = cfg();
  let body, classic;
  try { ({ data: body, classic } = await readBody(req)); } catch { return json(400, { ok: false, error: 'server' }); }
  const lang = pickLang(body.idioma);
  const reply = (status, payload) => (classic ? classicReply(lang, payload.ok) : json(status, payload));

  if (body['bot-field']) { log('honeypot'); return reply(200, { ok: true, mailSent: true }); }
  const t = Number(body.t);
  if (!classic && (!Number.isFinite(t) || t < 3000)) { log('time-trap', body.t); return reply(400, { ok: false, error: 'spam' }); }
  if (await rateLimited('col', clientIp(req, ctx))) return reply(429, { ok: false, error: 'rate' });

  const { f, bad } = validateCol(body);
  if (Object.keys(bad).length) return reply(422, { ok: false, error: 'validation', fields: bad });

  const when = new Date().toISOString();
  const id = randomUUID();
  const persisted = await set('colaboraciones', id, { id, when, lang, ...f });

  let formsOk = false;
  if (c.siteUrl) {
    try {
      const params = new URLSearchParams({ 'form-name': 'larre-colabora', idioma: lang, empresa: f.empresa, persona: f.persona, cargo: f.cargo, email: f.email, tipo: f.tipo, mensaje: f.mensaje, consentimiento: 'si', enviado: when });
      const r = await fetch(c.siteUrl + '/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params, signal: AbortSignal.timeout(8000) });
      formsOk = r.ok || r.status === 303 || r.status === 302;
    } catch (e) { log('forms backup falló', String(e)); }
  }
  const [toPartner, toOrg] = await Promise.all([
    sendMail({ to: f.email, ...partnerEmail(lang, f), tags: [{ name: 'tipo', value: 'colabora-confirmacion' }] }),
    sendMail({ to: c.notifyTo, replyTo: f.email, ...internalCol(f, lang, { when }), tags: [{ name: 'tipo', value: 'colabora-aviso' }] })
  ]);
  log(id, { persisted, formsOk, partnerMail: toPartner.ok, orgMail: toOrg.ok, err: toPartner.error || toOrg.error || '' });
  if (!persisted && !formsOk && !toOrg.ok) return reply(500, { ok: false, error: 'server' });
  return reply(200, { ok: true, mailSent: toPartner.ok });
};
