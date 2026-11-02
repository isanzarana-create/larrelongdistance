// Exportación para la organización: CSV de preinscripciones confirmadas por número de orden. Requiere ADMIN_TOKEN.
import { getStore } from "@netlify/blobs";
import { csvCell } from "./lib/core.mjs";
import { timingSafeEqual } from "node:crypto";

export default async (req) => {
  const given = Buffer.from(req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || ""), want = Buffer.from(process.env.ADMIN_TOKEN || "\0");
  if (!process.env.ADMIN_TOKEN || given.length !== want.length || !timingSafeEqual(given, want)) return new Response("no autorizado", { status: 401 });
  const store = getStore({ name: "preinscripciones", consistency: "strong" });
  const { blobs } = await store.list({ prefix: "reg/" });
  const rows = (await Promise.all(blobs.map(async (b) => JSON.parse(await store.get(b.key))))).sort((a, b) => a.seq - b.seq);
  const all = new URL(req.url).searchParams.get("todas") === "1";
  const head = ["orden", "fecha_preinscripcion", "confirmada", "nombre", "email", "pais", "descripcion", "experiencia", "novedades", "idioma", "version_consentimiento"];
  const lines = [head.join(",")].concat(rows.filter((r) => all || r.confirmedAt).map((r) => [r.seq, r.createdAt, r.confirmedAt || "", r.name, r.email, r.country, r.description, r.experience, r.news ? "si" : "no", r.lang, r.consentVersion].map(csvCell).join(",")));
  return new Response(lines.join("\n"), { headers: { "content-type": "text/csv; charset=utf-8", "cache-control": "no-store" } });
};
export const config = { path: "/api/lista" };
