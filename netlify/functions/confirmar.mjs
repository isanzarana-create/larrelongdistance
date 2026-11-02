// Enlace del correo: valida la firma, comprueba el plazo y marca la preinscripción como confirmada.
import { getStore } from "@netlify/blobs";
import { verify, CONFIRM_TTL_MS } from "./lib/core.mjs";

const PAGES = { es: ["/confirmado/", "/preinscripcion/"], eu: ["/eu/baieztatuta/", "/eu/aurrez-izena-eman/"], en: ["/en/confirmed/", "/en/pre-registration/"] };
const MSG = { es: "El enlace no es válido o ha caducado. Vuelve a preinscribirte.", eu: "Esteka ez da baliozkoa edo iraungi da. Egin berriro aurrez-izena.", en: "The link is not valid or has expired. Please pre-register again." };

export default async (req) => {
  const u = new URL(req.url), id = u.searchParams.get("id") || "", email = u.searchParams.get("e") || "", t = u.searchParams.get("t") || "";
  const store = getStore({ name: "preinscripciones", consistency: "strong" });
  const raw = id && (await store.get(`reg/${id}`));
  const rec = raw ? JSON.parse(raw) : null;
  const lang = rec?.lang || "es";
  const fail = () => new Response(`<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Ultra Trail Larre®</title><p style="font:16px monospace;margin:2rem">${MSG[lang]} <a href="${PAGES[lang][1]}">→</a></p>`, { status: 400, headers: { "content-type": "text/html; charset=utf-8" } });
  if (!rec || !process.env.SIGNING_SECRET || rec.email !== email.toLowerCase() || !verify(process.env.SIGNING_SECRET, id, email, t)) return fail();
  if (!rec.confirmedAt) {
    if (Date.now() - Date.parse(rec.createdAt) > CONFIRM_TTL_MS) return fail();
    rec.confirmedAt = new Date().toISOString();
    await store.set(`reg/${id}`, JSON.stringify(rec));
  }
  return Response.redirect(new URL(PAGES[lang][0], u.origin).toString(), 303);
};
export const config = { path: "/api/confirmar" };
