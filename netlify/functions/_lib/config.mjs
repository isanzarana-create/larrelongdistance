// Configuración común. Todo lo secreto viene de variables de entorno de Netlify (nunca del repo).
export const cfg = () => ({
  resendKey: process.env.RESEND_API_KEY || '',
  from: process.env.MAIL_FROM || 'Ultra Trail Larre <hola@ultratraillarre.org>',
  replyTo: process.env.MAIL_REPLY_TO || 'ignacio@musubigara.org',
  notifyTo: process.env.NOTIFY_TO || 'ignacio@musubigara.org',
  opens: process.env.PREINSCRIPCION_ABRE || '2026-12-01T00:00:00+01:00',
  origin: process.env.SITE_ORIGIN || 'https://ultratraillarre.org',
  siteUrl: process.env.URL || '',
  sheetsUrl: process.env.SHEETS_WEBHOOK_URL || '',
  sheetsToken: process.env.SHEETS_WEBHOOK_TOKEN || ''
});
export const LANGS = ['es', 'eu', 'en'];
export const json = (status, body, extra = {}) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra } });
