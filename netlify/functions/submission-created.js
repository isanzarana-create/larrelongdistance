/* Ultra Trail Larre ® — aviso de preinscripcion
 * Funcion de Netlify disparada por cada envio del formulario (event: submission-created).
 * Manda dos correos con Resend (sin dependencias, fetch nativo):
 *   1. confirmacion a la persona que se apunta (ES / EU / EN segun el campo "idioma")
 *   2. aviso interno a Ignacio con todos los datos del envio
 * Variables de entorno: RESEND_API_KEY (obligatoria), SITE_URL (opcional), AVISO_TO (opcional).
 */

const FORM_NAME = 'larre-preinscripcion';
const FROM = 'Ultra Trail Larre ® <hola@ultratraillarre.org>';
const REPLY_TO = 'ignacio@musubigara.org';
const AVISO_TO = process.env.AVISO_TO || 'ignacio@musubigara.org';

const PAPER = '#EDE5D2';
const INK = '#1C1614';
const INK_3 = '#4A3F38';
const GRANATE = '#8E351E';
const LINE = '#D9CFB6';

const esc = (v) =>
  String(v == null ? '' : v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const siteUrl = () => (process.env.SITE_URL || process.env.URL || 'https://larrelongdistance.org').replace(/\/+$/, '');

const COPY = {
  es: {
    subject: 'Estás en la lista de aviso — Ultra Trail Larre ®',
    kicker: 'Lista de aviso',
    title: 'Te hemos apuntado',
    lead: (n) => `${n}, gracias por dejarnos tu nombre. Ya estás en la lista de aviso de la I Edición.`,
    body: [
      'Ultra Trail Larre es una ultra en autosuficiencia por las sierras de Álava: salida y meta en el quiosco del Parque de La Florida, en Vitoria-Gasteiz, en otoño de 2027. Solo tú, un tracker y tu brevet.',
      'Te escribiremos en cuanto se abra la preinscripción, antes de anunciarlo en público. Las plazas se asignan por orden de llegada, así que ese correo es tu ventaja.',
      'Mientras tanto, la guía de autosuficiencia es la mejor forma de empezar a prepararte.'
    ],
    cta: 'Leer la guía de autosuficiencia',
    ctaPath: '/guia-autosuficiencia/',
    foot: `Recibes este correo porque te apuntaste en ${'{host}'}. Si quieres que borremos tus datos, responde a este mensaje o escribe a ${REPLY_TO}.`
  },
  eu: {
    subject: 'Abisu-zerrendan zaude — Ultra Trail Larre ®',
    kicker: 'Abisu-zerrenda',
    title: 'Izena hartu dugu',
    lead: (n) => `${n}, eskerrik asko zure izena uzteagatik. I. Edizioaren abisu-zerrendan zaude jada.`,
    body: [
      'Ultra Trail Larre autohornikuntzan egiten den ultra bat da, Arabako mendilerroetan: irteera eta helmuga La Florida parkeko kioskoan, Gasteizen, 2027ko udazkenean. Zu, tracker bat eta zure brevet-a, besterik ez.',
      'Aurreizena irekitzen den unean idatziko dizugu, publikoki iragarri aurretik. Plazak eskaera-hurrenkeran ematen dira, beraz, posta hori zure abantaila da.',
      'Bitartean, autohornikuntzaren gida da prestatzen hasteko modurik onena.'
    ],
    cta: 'Autohornikuntzaren gida irakurri',
    ctaPath: '/guia-autosuficiencia/',
    foot: `Posta hau jasotzen duzu ${'{host}'} webgunean izena eman zenuelako. Zure datuak ezabatzea nahi baduzu, erantzun mezu honi edo idatzi ${REPLY_TO} helbidera.`
  },
  en: {
    subject: "You're on the waiting list — Ultra Trail Larre ®",
    kicker: 'Waiting list',
    title: "You're on the list",
    lead: (n) => `${n}, thanks for leaving us your name. You're on the waiting list for the first edition.`,
    body: [
      'Ultra Trail Larre is a self-supported ultra across the mountain ranges of Álava: start and finish at the bandstand in La Florida Park, Vitoria-Gasteiz, in autumn 2027. Just you, a tracker and your brevet.',
      "We'll write to you the moment pre-registration opens, before it is announced publicly. Places are allocated in order of arrival, so that email is your head start.",
      'In the meantime, the self-supported guide is the best way to start preparing.'
    ],
    cta: 'Read the self-supported guide',
    ctaPath: '/en/self-supported-ultra-guide/',
    foot: `You are receiving this email because you signed up at ${'{host}'}. If you want your data deleted, reply to this message or write to ${REPLY_TO}.`
  }
};

function pickLang(data) {
  const raw = String(data.idioma || data.lang || 'es').toLowerCase().slice(0, 2);
  return COPY[raw] ? raw : 'es';
}

function firstName(nombre) {
  const n = String(nombre || '').trim().split(/\s+/)[0];
  return n || 'Hola';
}

function confirmationHtml(lang, data) {
  const t = COPY[lang];
  const base = siteUrl();
  const host = base.replace(/^https?:\/\//, '');
  const paragraphs = t.body
    .map((p) => `<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:${INK_3}">${esc(p)}</p>`)
    .join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(t.subject)}</title></head>
<body style="margin:0;padding:0;background:${PAPER}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:32px 16px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid ${LINE}">
<tr><td style="padding:40px 36px 8px">
<p style="margin:0 0 20px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${GRANATE}">${esc(t.kicker)}</p>
<h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.15;color:${INK};font-weight:400">${esc(t.title)}</h1>
<p style="margin:0 0 24px;font-size:17px;line-height:1.6;color:${INK}">${esc(t.lead(firstName(data.nombre)))}</p>
${paragraphs}
<p style="margin:28px 0 36px"><a href="${base}${t.ctaPath}" style="display:inline-block;background:${GRANATE};color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;padding:14px 26px;border-radius:999px">${esc(t.cta)} &rarr;</a></p>
</td></tr>
<tr><td style="padding:0 36px 36px">
<p style="margin:0;border-top:1px solid ${LINE};padding-top:18px;font-size:12px;line-height:1.6;color:#8B7E6A">${esc(t.foot.replace('{host}', host))}<br>Ultra Trail Larre ® · ${esc(host)} · Musubigara ®</p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function confirmationText(lang, data) {
  const t = COPY[lang];
  const base = siteUrl();
  const host = base.replace(/^https?:\/\//, '');
  return [
    t.kicker.toUpperCase(),
    '',
    t.lead(firstName(data.nombre)),
    '',
    ...t.body,
    '',
    `${t.cta}: ${base}${t.ctaPath}`,
    '',
    t.foot.replace('{host}', host),
    `Ultra Trail Larre (R) - ${host} - Musubigara (R)`
  ].join('\n');
}

const FIELDS = [
  ['nombre', 'Nombre'],
  ['email', 'Correo'],
  ['pais', 'País y ciudad'],
  ['experiencia', 'Referencia más larga'],
  ['descripcion', 'Descripción personal'],
  ['idioma', 'Idioma'],
  ['consentimiento', 'Consentimiento']
];

function internalHtml(data, meta) {
  const rows = FIELDS.filter(([k]) => String(data[k] || '').trim() !== '')
    .map(
      ([k, label]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid ${LINE};font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8B7E6A;vertical-align:top;white-space:nowrap">${esc(label)}</td><td style="padding:8px 12px;border-bottom:1px solid ${LINE};font-size:15px;color:${INK};white-space:pre-wrap">${esc(data[k])}</td></tr>`
    )
    .join('');
  const extra = Object.keys(data)
    .filter((k) => !FIELDS.some(([f]) => f === k) && k !== 'bot-field' && k !== 'form-name' && String(data[k] || '').trim() !== '')
    .map(
      (k) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid ${LINE};font-size:12px;color:#8B7E6A;vertical-align:top">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid ${LINE};font-size:15px;color:${INK};white-space:pre-wrap">${esc(data[k])}</td></tr>`
    )
    .join('');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:24px;background:${PAPER};font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid ${LINE}">
<tr><td style="padding:24px 24px 4px">
<p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${GRANATE}">Lista de aviso · alta nueva</p>
<h1 style="margin:0 0 16px;font-size:20px;color:${INK}">${esc(data.nombre || 'Sin nombre')}</h1>
</td></tr>
<tr><td style="padding:0 12px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}${extra}</table>
</td></tr>
<tr><td style="padding:0 24px 24px">
<p style="margin:0;font-size:12px;color:#8B7E6A">${esc(meta)}</p>
</td></tr>
</table></body></html>`;
}

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${text}`);
  return text;
}

exports.handler = async (event) => {
  const apiKey = process.env.RESEND_API_KEY;
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    console.log('submission-created: cuerpo no es JSON', err.message);
    return { statusCode: 200, body: 'ignored' };
  }

  const submission = body.payload || body;
  const formName = submission.form_name || submission.formName || '';
  const data = submission.data || {};

  if (formName && formName !== FORM_NAME) {
    console.log(`submission-created: formulario "${formName}" ignorado`);
    return { statusCode: 200, body: 'ignored' };
  }
  if (!apiKey) {
    console.log('submission-created: falta RESEND_API_KEY, no se envia nada');
    return { statusCode: 200, body: 'no key' };
  }

  const lang = pickLang(data);
  const t = COPY[lang];
  const nombre = String(data.nombre || '').trim();
  const email = String(data.email || '').trim();
  const meta = [
    submission.created_at ? `Recibido: ${submission.created_at}` : null,
    submission.id ? `ID: ${submission.id}` : null,
    `Formulario: ${formName || FORM_NAME}`
  ]
    .filter(Boolean)
    .join(' · ');

  const jobs = [];

  if (email && /.+@.+\..+/.test(email)) {
    jobs.push(
      sendEmail(apiKey, {
        from: FROM,
        to: [email],
        reply_to: REPLY_TO,
        subject: t.subject,
        html: confirmationHtml(lang, data),
        text: confirmationText(lang, data)
      }).then(
        () => console.log(`confirmacion enviada a ${email} (${lang})`),
        (err) => {
          console.error('fallo la confirmacion:', err.message);
          throw err;
        }
      )
    );
  } else {
    console.log('submission-created: envio sin email valido, solo aviso interno');
  }

  jobs.push(
    sendEmail(apiKey, {
      from: FROM,
      to: AVISO_TO.split(',').map((a) => a.trim()).filter(Boolean),
      reply_to: email && /.+@.+\..+/.test(email) ? email : REPLY_TO,
      subject: `Nueva alta en la lista de aviso — ${nombre || email || 'sin nombre'}`,
      html: internalHtml(data, meta),
      text: FIELDS.filter(([k]) => String(data[k] || '').trim() !== '')
        .map(([k, label]) => `${label}: ${data[k]}`)
        .concat([''], [meta])
        .join('\n')
    }).then(
      () => console.log('aviso interno enviado'),
      (err) => {
        console.error('fallo el aviso interno:', err.message);
        throw err;
      }
    )
  );

  const results = await Promise.allSettled(jobs);
  const failed = results.filter((r) => r.status === 'rejected').length;
  return {
    statusCode: 200,
    body: JSON.stringify({ sent: results.length - failed, failed })
  };
};
