// Plantillas de correo (HTML con tablas e estilos en línea para Gmail/Outlook/móvil + texto plano).
// EU: primera pasada técnica, pendiente de revisión.
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SAND = '#000000', PAPER = '#000000', INK = '#FFFFFF', INK2 = '#BDBDBD', LINE = '#4A4A4A', GRANATE = '#FFFFFF'; // blanco y negro, como la web
const SERIF = "'IBM Plex Mono','Courier New',Courier,monospace", SANS = SERIF;

const T = {
  es: {
    preSubject: (c) => `Preinscripción recibida · ${c} · Ultra Trail Larre®`, preheader: 'Guarda tu código de referencia. La preinscripción no garantiza plaza.',
    hello: (n) => `Hola, ${n}:`, preTitle: 'Preinscripción recibida',
    preIntro: 'Hemos recibido tu preinscripción para la I Edición de Ultra Trail Larre® (del 29 al 31 de octubre de 2027). Este es tu código de referencia:',
    nextTitle: 'Qué pasa ahora',
    next: ['Las 300 plazas se asignan por orden de llegada de la preinscripción.', 'La preinscripción no garantiza plaza.', 'Te comunicaremos la fecha de pago por email en marzo.', 'Si necesitas cambiar o consultar algo, responde a este correo citando tu código.'],
    contact: 'Contacto', sign: 'Un abrazo,', team: 'Ultra Trail Larre®', visit: 'Ver la web', legal: 'Recibes este correo porque alguien (esperamos que tú) rellenó el formulario de preinscripción con esta dirección. Tratamos tus datos según nuestra política de privacidad:',
    colSubject: 'Hemos recibido tu mensaje · Ultra Trail Larre®', colPre: 'Te responderemos lo antes posible.', colTitle: 'Mensaje recibido',
    colIntro: 'Hemos recibido tu mensaje y te responderemos lo antes posible. Esto es lo que nos has facilitado:', colLegal: 'Recibes este correo porque rellenaste el formulario de colaboración con esta dirección. Política de privacidad:',
    priv: '/politica-privacidad/', home: '/'
  },
  eu: {
    preSubject: (c) => `Aurre-izen-ematea jasota · ${c} · Ultra Trail Larre®`, preheader: 'Gorde zure erreferentzia-kodea. Aurre-izen-emateak ez du plaza bermatzen.',
    hello: (n) => `Kaixo, ${n}:`, preTitle: 'Aurre-izen-ematea jasota',
    preIntro: 'Ultra Trail Larre®-ren I. Edizioko (2027ko urriaren 29tik 31ra) aurre-izen-ematea jaso dugu. Hau da zure erreferentzia-kodea:',
    nextTitle: 'Zer gertatzen da orain',
    next: ['300 plazak aurre-izen-ematearen iritsiera-ordenaren arabera esleitzen dira.', 'Aurre-izen-emateak ez du plaza bermatzen.', 'Ordainketa-data posta elektronikoz jakinaraziko dizugu martxoan.', 'Zerbait aldatu edo galdetu behar baduzu, erantzun mezu honi zure kodea aipatuz.'],
    contact: 'Kontaktua', sign: 'Besarkada bat,', team: 'Ultra Trail Larre®', visit: 'Webgunea ikusi', legal: 'Mezu hau jasotzen duzu norbaitek (zuk espero dugu) helbide honekin aurre-izen-emateko formularioa bete duelako. Zure datuak gure pribatutasun-politikaren arabera tratatzen ditugu:',
    colSubject: 'Zure mezua jaso dugu · Ultra Trail Larre®', colPre: 'Ahalik eta lasterren erantzungo dizugu.', colTitle: 'Mezua jasota',
    colIntro: 'Zure mezua jaso dugu eta ahalik eta lasterren erantzungo dizugu. Hau da eman diguzun informazioa:', colLegal: 'Mezu hau jasotzen duzu helbide honekin lankidetza-formularioa bete duzulako. Pribatutasun-politika:',
    priv: '/eu/pribatutasun-politika/', home: '/eu/'
  },
  en: {
    preSubject: (c) => `Pre-registration received · ${c} · Ultra Trail Larre®`, preheader: 'Keep your reference code. Pre-registration does not guarantee a place.',
    hello: (n) => `Hi ${n},`, preTitle: 'Pre-registration received',
    preIntro: 'We have received your pre-registration for the 1st Edition of Ultra Trail Larre® (29–31 October 2027). This is your reference code:',
    nextTitle: 'What happens now',
    next: ['The 300 places are assigned by order of arrival of the pre-registration.', 'Pre-registration does not guarantee a place.', 'We will let you know the payment date by email in March.', 'If you need to change or ask something, reply to this email quoting your code.'],
    contact: 'Contact', sign: 'Warm regards,', team: 'Ultra Trail Larre®', visit: 'Visit the website', legal: 'You are receiving this email because someone (we hope you) filled in the pre-registration form with this address. We process your data according to our privacy policy:',
    colSubject: 'We have received your message · Ultra Trail Larre®', colPre: 'We will reply as soon as possible.', colTitle: 'Message received',
    colIntro: 'We have received your message and will reply as soon as possible. This is what you have given us:', colLegal: 'You are receiving this email because you filled in the collaboration form with this address. Privacy policy:',
    priv: '/en/privacy-policy/', home: '/en/'
  }
};
const DATA = {
  es: { mode: 'Modalidad', solo: 'Individual', relay: 'Relevos', team: 'equipo', name: 'Nombre y apellido', age: 'Edad', fed: 'Federado', msg: 'Mensaje', yes: 'Sí', no: 'No', given: 'Esto es lo que nos has facilitado' },
  eu: { mode: 'Modalitatea', solo: 'Bakarka', relay: 'Erreleboka', team: 'taldea', name: 'Izen-abizenak', age: 'Adina', fed: 'Federatua', msg: 'Mezua', yes: 'Bai', no: 'Ez', given: 'Hau da eman diguzun informazioa' },
  en: { mode: 'Category', solo: 'Solo', relay: 'Relay', team: 'team', name: 'Full name', age: 'Age', fed: 'Federated', msg: 'Message', yes: 'Yes', no: 'No', given: 'This is what you have given us' }
};
const TIPO = { es: { marca: 'Marca', institucion: 'Institución', medio: 'Medio de comunicación', operador: 'Operador de eventos', otro: 'Otro' }, eu: { marca: 'Marka', institucion: 'Erakundea', medio: 'Komunikabidea', operador: 'Ekitaldi-operadorea', otro: 'Beste bat' }, en: { marca: 'Brand', institucion: 'Institution', medio: 'Media', operador: 'Event operator', otro: 'Other' } };

function shell(lang, o) {
  const t = T[lang];
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark light"><meta name="supported-color-schemes" content="dark light"><title>${esc(o.title)}</title></head>
<body style="margin:0;padding:0;background:${SAND};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${SAND}">${esc(o.pre)}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${SAND}"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${PAPER}">
<tr><td style="padding:28px 32px 0;font:400 14px/1.7 ${SANS};color:${INK}">Ultra Trail Larre®</td></tr>
<tr><td style="padding:14px 32px 0;font:700 14px/1.7 ${SERIF};letter-spacing:1px;text-transform:uppercase;color:${INK}">${esc(o.title)}</td></tr>
<tr><td style="padding:18px 32px 0;font:400 14px/1.7 ${SANS};color:${INK}">${o.body}</td></tr>
<tr><td style="padding:26px 32px 30px;font:400 14px/1.7 ${SANS};color:${INK}">${esc(t.sign)}<br>${esc(t.team)}<br><a href="https://ultratraillarre.org${t.home}" style="color:${GRANATE}">ultratraillarre.org</a></td></tr>
</table>
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px"><tr><td style="padding:16px 32px;font:400 12px/1.5 ${SANS};color:${INK2}">${esc(o.legal)} <a href="https://ultratraillarre.org${t.priv}" style="color:${GRANATE}">ultratraillarre.org${esc(t.priv)}</a></td></tr></table>
</td></tr></table></body></html>`;
}
const rowsHtml = (rows) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 0">${rows.map(([k, v]) => `<tr><td valign="top" style="padding:8px 12px 8px 0;border-top:1px solid ${LINE};width:34%;font:400 12px/1.5 ${SANS};letter-spacing:1px;text-transform:uppercase;color:${INK2}">${esc(k)}</td><td valign="top" style="padding:8px 0;border-top:1px solid ${LINE};font:400 14px/1.6 ${SANS};color:${INK}">${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`;

export function runnerEmail(lang, f, code) {
  const t = T[lang];
  const D = DATA[lang];
  const given = [[D.mode, f.modalidad === 'relevos' ? `${D.relay} · ${D.team} «${f.equipo}»` : D.solo], [D.name, `${f.nombre} ${f.apellidos}`], [D.age, String(f.edad)], [D.fed, f.federado === 'si' ? `${D.yes} · ${f.federacion}` : D.no], [D.msg, f.descripcion]];
  const body = `<p style="margin:0 0 14px">${esc(t.hello(f.nombre))}</p><p style="margin:0 0 18px">${esc(t.preIntro)}</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 22px"><tr><td align="center" style="background:${SAND};border:2px dashed ${GRANATE};padding:12px 16px;white-space:nowrap;font:700 20px ${SANS};letter-spacing:2px;color:${INK}">${esc(code)}</td></tr></table>
<p style="margin:0 0 8px;font:700 14px ${SERIF};text-transform:uppercase;letter-spacing:1px">${esc(t.nextTitle)}</p><ol style="margin:0 0 22px;padding-left:20px">${t.next.map((x) => `<li style="margin:0 0 8px">${esc(x)}</li>`).join('')}</ol>
<p style="margin:0 0 8px;font:700 14px ${SERIF};text-transform:uppercase;letter-spacing:1px">${esc(D.given)}</p>${rowsHtml(given)}`;
  const text = [t.hello(f.nombre), '', t.preIntro, '', `    ${code}`, '', t.nextTitle, ...t.next.map((x, i) => `${i + 1}. ${x}`), '', D.given + ':', ...given.map(([k, v]) => `${k}: ${v}`), '', t.sign, t.team, 'https://ultratraillarre.org' + t.home, '', `${t.legal} https://ultratraillarre.org${t.priv}`].join('\n');
  return { subject: t.preSubject(code), html: shell(lang, { title: t.preTitle, pre: t.preheader, body, legal: t.legal }), text };
}

export function partnerEmail(lang, f) {
  const t = T[lang];
  const D = DATA[lang];
  const rows = [[D.name, f.persona], [D.msg, f.mensaje]];
  const body = `<p style="margin:0 0 14px">${esc(t.hello(f.persona))}</p><p style="margin:0 0 14px">${esc(t.colIntro)}</p>${rowsHtml(rows)}`;
  const text = [t.hello(f.persona), '', t.colIntro, '', ...rows.map(([k, v]) => `${k}: ${v}`), '', t.sign, t.team, 'https://ultratraillarre.org' + t.home, '', `${t.colLegal} https://ultratraillarre.org${t.priv}`].join('\n');
  return { subject: t.colSubject, html: shell(lang, { title: t.colTitle, pre: t.colPre, body, legal: t.colLegal }), text };
}

// Avisos internos (para Ignacio): siempre en castellano, con todos los datos.
export function internalPre(f, code, lang, meta) {
  const rows = [['Código', code], ['Idioma', lang.toUpperCase()], ['Modalidad', f.modalidad === 'relevos' ? `Relevos · equipo «${f.equipo}»` : 'Individual'], ['Nombre', f.nombre], ['Apellidos', f.apellidos], ['Edad', String(f.edad)], ['Sexo', f.sexo], ['Correo', f.email], ['Referencias en otras pruebas', f.referencias || '—'], ['Federado en montaña', f.federado === 'si' ? `Sí · ${f.federacion}` : 'No'], ['Descripción personal', f.descripcion], ['Observaciones', f.observaciones || '—'], ['Recibida', meta.when]];
  const html = shell('es', { title: `Nueva preinscripción · ${code}`, pre: `${f.nombre} ${f.apellidos}`, body: `<p style="margin:0 0 10px">Responde a este correo para escribir directamente a ${esc(f.nombre)}.</p>${rowsHtml(rows)}`, legal: 'Aviso interno de ultratraillarre.org.' });
  return { subject: `Nueva preinscripción · ${code} · ${f.nombre} ${f.apellidos}`, html, text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') };
}
export function internalCol(f, lang, meta) {
  const rows = [['Idioma', lang.toUpperCase()], ['Empresa', f.empresa], ['Persona', f.persona], ['Cargo', f.cargo], ['Correo', f.email], ['Tipo', TIPO.es[f.tipo]], ['Mensaje', f.mensaje], ['Recibido', meta.when]];
  const html = shell('es', { title: `Nueva propuesta de colaboración`, pre: `${f.empresa} · ${f.persona}`, body: `<p style="margin:0 0 10px">Responde a este correo para escribir directamente a ${esc(f.persona)}.</p>${rowsHtml(rows)}`, legal: 'Aviso interno de ultratraillarre.org.' });
  return { subject: `Colaboración · ${f.empresa} · ${TIPO.es[f.tipo]}`, html, text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') };
}
