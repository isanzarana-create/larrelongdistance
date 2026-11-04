import { cfg } from './config.mjs';
// Envío con la API HTTP de Resend (sin dependencias). Devuelve {ok, id?, status, error?}.
export async function sendMail({ to, subject, html, text, replyTo, tags }) {
  const c = cfg();
  if (!c.resendKey) return { ok: false, status: 0, error: 'RESEND_API_KEY no configurada' };
  try {
    const res = await fetch(process.env.RESEND_API_URL || 'https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${c.resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: c.from, to: Array.isArray(to) ? to : [to], subject, html, text, reply_to: replyTo || c.replyTo, tags }),
      signal: AbortSignal.timeout(12000)
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, status: res.status, error: body.message || body.name || 'error de Resend' };
    return { ok: true, status: res.status, id: body.id };
  } catch (e) {
    return { ok: false, status: 0, error: String(e && e.message || e) };
  }
}
