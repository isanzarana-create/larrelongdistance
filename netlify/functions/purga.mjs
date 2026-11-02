// Diaria: borra las preinscripciones no confirmadas a los 30 días (almacén propio y envío en Netlify Forms).
import { getStore } from "@netlify/blobs";
import { PURGE_UNCONFIRMED_MS } from "./lib/core.mjs";

export default async () => {
  const store = getStore({ name: "preinscripciones", consistency: "strong" });
  const { blobs } = await store.list({ prefix: "reg/" });
  for (const b of blobs) {
    const r = JSON.parse(await store.get(b.key));
    if (r.confirmedAt || Date.now() - Date.parse(r.createdAt) < PURGE_UNCONFIRMED_MS) continue;
    await store.delete(b.key);
    if (process.env.NETLIFY_AUTH_TOKEN) await fetch(`https://api.netlify.com/api/v1/submissions/${r.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` } }).catch(() => {});
  }
};
export const config = { schedule: "@daily" };
