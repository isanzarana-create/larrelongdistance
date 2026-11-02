// Lógica pura de la preinscripción (sin dependencias): firma, validación, correos y número de orden.
import { createHmac, timingSafeEqual } from "node:crypto";

export const CONSENT_VERSION = "2026-11-v1";
export const OPEN_AT = Date.parse(process.env.OPEN_AT || "2026-12-01T00:00:00+01:00");
export const CONFIRM_TTL_MS = 7 * 24 * 3600 * 1000;      // plazo para confirmar el correo
export const PURGE_UNCONFIRMED_MS = 30 * 24 * 3600 * 1000; // borrado de no confirmadas

export const sign = (secret, id, email) =>
  createHmac("sha256", secret).update(`${id}.${email.toLowerCase()}`).digest("hex").slice(0, 40);

export const verify = (secret, id, email, token) => {
  const a = Buffer.from(sign(secret, id, email)), b = Buffer.from(String(token || ""));
  return a.length === b.length && timingSafeEqual(a, b);
};

const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Devuelve { ok, errors, value }. La misma regla que el navegador: 300–600 caracteres de descripción.
export function validate(d) {
  const v = {
    name: clean(d.nombre, 120), email: clean(d.email, 254).toLowerCase(), country: clean(d.pais, 80),
    description: clean(d.descripcion, 700), experience: clean(d.experiencia, 600),
    lang: ["es", "eu", "en"].includes(d.lang) ? d.lang : "es", consent: d.privacidad === "on" || d.privacidad === "si",
    news: d.novedades === "on" || d.novedades === "si", consentVersion: clean(d.consent_version, 40),
  };
  const errors = [];
  if (d["bot-field"]) errors.push("honeypot");
  if (v.name.length < 2) errors.push("nombre");
  if (!EMAIL.test(v.email)) errors.push("email");
  if (v.country.length < 2) errors.push("pais");
  if (v.description.length < 300 || v.description.length > 600) errors.push("descripcion");
  if (!v.consent) errors.push("consentimiento");
  return { ok: errors.length === 0, errors, value: v };
}

const T = {
  es: { subject: "Confirma tu preinscripción · Ultra Trail Larre®", hi: "Hola", l1: "Hemos recibido tu preinscripción en Ultra Trail Larre®. Para validarla, confirma tu correo en el plazo de 7 días:", l2: "Si no has sido tú, ignora este mensaje: no se guardará nada más y tus datos se borrarán a los 30 días.", l3: "El orden de llegada de la preinscripción es el que fija la plaza. Las inscripciones se abren en enero de 2027.", ok: "Tu número de orden provisional", by: "Responsable: ver política de privacidad · ignacio@musubigara.org · https://ultratraillarre.org/politica-privacidad/" },
  en: { subject: "Confirm your pre-registration · Ultra Trail Larre®", hi: "Hello", l1: "We have received your pre-registration for Ultra Trail Larre®. To validate it, please confirm your email within 7 days:", l2: "If this was not you, ignore this message: nothing else will be stored and your data will be deleted after 30 days.", l3: "Order of arrival of the pre-registration determines your place. Registrations open in January 2027.", ok: "Your provisional order number", by: "Controller: see privacy policy · ignacio@musubigara.org · https://ultratraillarre.org/en/privacy-policy/" },
  eu: { subject: "Berretsi zure aurrez-izena · Ultra Trail Larre®", hi: "Kaixo", l1: "Ultra Trail Larre®-rako zure aurrez-izena jaso dugu. Baliozkotzeko, berretsi zure posta elektronikoa 7 eguneko epean:", l2: "Zu ez bazara izan, ez egin kasurik mezu honi: ez da besterik gordeko eta zure datuak 30 egunera ezabatuko dira.", l3: "Aurrez-izenaren iristeko ordenak finkatzen du plaza. Izen-emateak 2027ko urtarrilean irekiko dira.", ok: "Zure behin-behineko ordena-zenbakia", by: "Arduraduna: ikus pribatutasun-politika · ignacio@musubigara.org · https://ultratraillarre.org/eu/pribatutasun-politika/" },
};
export function confirmEmail(lang, name, link, seq) {
  const t = T[lang] || T.es;
  const text = `${t.hi} ${name},\n\n${t.l1}\n${link}\n\n${t.ok}: ${seq}\n${t.l3}\n\n${t.l2}\n\n--\n${t.by}\n`;
  return { subject: t.subject, text };
}

// Número de orden correlativo y atómico: se reclama la primera clave seq/000001, 000002… libre (onlyIfNew).
export async function claimSeq(store, id, hint = 0) {
  for (let n = hint + 1; n < hint + 100000; n++) {
    const r = await store.set(`seq/${String(n).padStart(6, "0")}`, id, { onlyIfNew: true });
    if (r.modified) return n;
  }
  throw new Error("seq exhausted");
}

export const esc = (s) => String(s ?? "").replace(/"/g, '""');
export const csvCell = (s) => { let t = String(s ?? ""); if (/^[=+\-@\t\r]/.test(t)) t = "'" + t; return `"${esc(t)}"`; };
