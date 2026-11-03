import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

const sent = [];
let failMail = false; let failTo = '';
const srv = http.createServer((req, res) => {
  let b = ''; req.on('data', (d) => (b += d)); req.on('end', () => {
    const parsed = JSON.parse(b);
    if (failMail || (failTo && parsed.to.includes(failTo))) { res.writeHead(422, { 'content-type': 'application/json' }); return res.end(JSON.stringify({ message: 'domain not verified' })); }
    sent.push({ auth: req.headers.authorization, ...JSON.parse(b) });
    res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ id: 'mock-' + sent.length }));
  });
});
await new Promise((r) => srv.listen(0, r));
process.env.RESEND_API_URL = `http://127.0.0.1:${srv.address().port}/emails`;
process.env.RESEND_API_KEY = 're_test_key';
process.env.LARRE_STORE = 'memory';
process.env.PREINSCRIPCION_ABRE = '2020-01-01T00:00:00+01:00';
delete process.env.URL;

const pre = (await import('../netlify/functions/preinscripcion.mjs')).default;
const col = (await import('../netlify/functions/colabora.mjs')).default;
const post = (fn, data, ip = '10.0.0.1') => fn(new Request('http://x/api', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) }), { ip });
const base = (o = {}) => ({ idioma: 'es', t: 9000, nombre: 'Ane', apellidos: 'Etxeberria Ruiz', edad: 37, sexo: 'mujer', email: 'ane@example.com', referencias: 'UTMB 100K', federado: 'si', federacion: 'FEDME', descripcion: 'Corro por montaña desde hace diez años y me gustan las distancias largas.', observaciones: '', consentimiento: 'si', 'bot-field': '', ...o });

test('GET estado: abierta', async () => {
  const r = await pre(new Request('http://x/api/preinscripcion'), {});
  assert.deepEqual(await r.json(), { open: true, opens: '2020-01-01T00:00:00+01:00' });
});
test('preinscripción válida: código, 2 correos, idioma y datos', async () => {
  sent.length = 0;
  const r = await post(pre, base({ idioma: 'eu', email: 'Aitor@Example.com', nombre: 'Aitor' }));
  const j = await r.json();
  assert.equal(r.status, 200); assert.equal(j.ok, true); assert.equal(j.mailSent, true);
  assert.match(j.code, /^LARRE-[0-9A-HJKMNP-TV-Z]{4}-[0-9A-HJKMNP-TV-Z]{4}$/);
  assert.equal(sent.length, 2);
  const runner = sent.find((m) => m.to[0] === 'aitor@example.com'); const org = sent.find((m) => m.to[0] === 'ignacio@musubigara.org');
  assert.ok(runner && org);
  assert.equal(runner.auth, 'Bearer re_test_key');
  assert.match(runner.subject, /Aurre-izen-ematea jasota/); assert.ok(runner.html.includes(j.code)); assert.ok(runner.text.includes(j.code));
  assert.ok(runner.text.includes('martxoan'));
  assert.equal(org.reply_to, 'aitor@example.com'); assert.ok(org.html.includes('UTMB 100K')); assert.ok(org.text.includes('FEDME'));
});
test('duplicado: mismo correo devuelve el mismo código sin reenviar', async () => {
  sent.length = 0;
  const a = await (await post(pre, base({ email: 'dup@example.com' }), '10.0.0.2')).json();
  const n = sent.length;
  const b = await (await post(pre, base({ email: 'DUP@example.com' }), '10.0.0.2')).json();
  assert.equal(a.code, b.code); assert.equal(b.already, true); assert.equal(sent.length, n);
});
test('validación servidor: campos y códigos de error', async () => {
  const r = await post(pre, base({ email: 'mal', edad: 12, descripcion: 'corta', federado: 'si', federacion: '', consentimiento: '' }), '10.0.0.3');
  const j = await r.json();
  assert.equal(r.status, 422); assert.equal(j.error, 'validation');
  assert.deepEqual(j.fields, { edad: 'age', email: 'email', federacion: 'required', descripcion: 'min', consentimiento: 'consent' });
});
test('antispam: honeypot y time-trap', async () => {
  sent.length = 0;
  const h = await post(pre, base({ 'bot-field': 'x', email: 'bot@example.com' }), '10.0.0.4');
  assert.equal(h.status, 200); assert.equal(sent.length, 0);
  const t = await post(pre, base({ t: 300, email: 'fast@example.com' }), '10.0.0.4');
  assert.equal(t.status, 400); assert.equal((await t.json()).error, 'spam');
});
test('límite de envíos por IP', async () => {
  let last;
  for (let i = 0; i < 7; i++) last = await post(pre, base({ email: `rl${i}@example.com` }), '10.9.9.9');
  assert.equal(last.status, 429); assert.equal((await last.json()).error, 'rate');
});
test('cerrada antes del 1 de diciembre', async () => {
  process.env.PREINSCRIPCION_ABRE = '2999-01-01T00:00:00+01:00';
  const r = await post(pre, base({ email: 'early@example.com' }), '10.0.0.5');
  assert.equal(r.status, 403); assert.equal((await r.json()).error, 'closed');
  const g = await pre(new Request('http://x/api/preinscripcion'), {});
  assert.equal((await g.json()).open, false);
  process.env.PREINSCRIPCION_ABRE = '2020-01-01T00:00:00+01:00';
});
test('Resend caído y sin almacén duradero: error 500 (nada se pierde en silencio)', async () => {
  failMail = true;
  const r = await post(pre, base({ email: 'nomail@example.com' }), '10.0.0.6'); const j = await r.json();
  failMail = false;
  assert.equal(r.status, 500); assert.equal(j.error, 'server');
});
test('Falla solo el correo al corredor: ok con mailSent=false', async () => {
  failTo = 'soft@example.com';
  const r = await post(pre, base({ email: 'soft@example.com' }), '10.0.0.7'); const j = await r.json();
  failTo = '';
  assert.equal(r.status, 200); assert.equal(j.mailSent, false); assert.ok(j.code);
});
test('colaboración: 2 correos en inglés', async () => {
  sent.length = 0;
  const r = await post(col, { idioma: 'en', t: 9000, empresa: 'Acme Outdoor', persona: 'Jo Smith', cargo: 'Brand manager', email: 'jo@acme.test', tipo: 'marca', mensaje: 'We would like to talk about supporting the race with durable gear.', consentimiento: 'si', 'bot-field': '' }, '10.0.1.1');
  assert.equal(r.status, 200); assert.equal((await r.json()).mailSent, true); assert.equal(sent.length, 2);
  assert.match(sent.find((m) => m.to[0] === 'jo@acme.test').subject, /We have received your message/);
  assert.equal(sent.find((m) => m.to[0] === 'ignacio@musubigara.org').reply_to, 'jo@acme.test');
});
test('escape HTML en correos', async () => {
  sent.length = 0;
  await post(pre, base({ email: 'xss@example.com', nombre: '<script>alert(1)</script>' }), '10.0.2.1');
  assert.ok(sent.every((m) => !m.html.includes('<script>alert')));
});
test.after(() => srv.close());
