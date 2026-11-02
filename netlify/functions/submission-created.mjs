// Se ejecuta tras cada envío de Netlify Forms. Valida, reserva número de orden y envía el correo de doble confirmación.
import { getStore } from "@netlify/blobs";
import { validate, sign, confirmEmail, claimSeq, CONSENT_VERSION, OPEN_AT } from "./lib/core.mjs";

export default async (req) => {
  const { payload } = await req.json();
  if (!payload || payload.form_name !== "preinscripcion") return new Response("ignored", { status: 200 });
  const secret = process.env.SIGNING_SECRET, key = process.env.RESEND_API_KEY, site = process.env.SITE_URL || "https://ultratraillarre.org";
  if (!secret || !key) { console.error("config incompleta"); return new Response("config", { status: 500 }); }
  const { ok, errors, value } = validate(payload.data || {});
  if (!ok) { console.log("descartada", errors.join(",")); return new Response("invalid", { status: 200 }); }
  const created = Date.parse(payload.created_at || new Date().toISOString());
  if (created < OPEN_AT && process.env.ALLOW_EARLY !== "1") { console.log("antes de apertura"); return new Response("early", { status: 200 }); }
  const store = getStore({ name: "preinscripciones", consistency: "strong" });
  const id = payload.id;
  if (await store.get(`reg/${id}`)) return new Response("dup", { status: 200 });
  const seq = await claimSeq(store, id, Number(await store.get("seq-hint") || 0));
  await store.set("seq-hint", String(seq));
  const rec = { id, seq, ...value, createdAt: new Date(created).toISOString(), consentVersion: value.consentVersion || CONSENT_VERSION, confirmedAt: null };
  await store.set(`reg/${id}`, JSON.stringify(rec));
  const link = `${site}/api/confirmar?id=${encodeURIComponent(id)}&e=${encodeURIComponent(value.email)}&t=${sign(secret, id, value.email)}`;
  const mail = confirmEmail(value.lang, value.name, link, seq);
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.MAIL_FROM || "Ultra Trail Larre <preinscripcion@ultratraillarre.org>", to: [value.email], reply_to: "ignacio@musubigara.org", subject: mail.subject, text: mail.text }),
  });
  if (!r.ok) { console.error("correo", r.status); return new Response("mail", { status: 502 }); }
  return new Response("ok", { status: 200 });
};
