import { createHash } from 'node:crypto';
// Almacén en Netlify Blobs; si no está disponible (p. ej. en local o pruebas) usa memoria.
const mem = new Map();
let blobs = null;
async function store(name) {
  if (process.env.LARRE_STORE === 'memory') return null;
  try { if (!blobs) blobs = await import('@netlify/blobs'); return blobs.getStore({ name, consistency: 'strong' }); } catch { return null; }
}
export const sha = (s) => createHash('sha256').update(String(s)).digest('hex').slice(0, 40);

export async function get(name, key) {
  const s = await store(name);
  if (s) { try { return await s.get(key, { type: 'json' }); } catch { /* cae a memoria */ } }
  return mem.get(`${name}/${key}`) ?? null;
}
/** Devuelve true si se guardó en el almacén persistente. */
export async function set(name, key, value) {
  const s = await store(name);
  if (s) { try { await s.setJSON(key, value); return true; } catch { /* cae a memoria */ } }
  mem.set(`${name}/${key}`, value); return false;
}

/** Límite de envíos por IP: máx. `max` en `windowMs`. */
export async function rateLimited(kind, ip, max = 5, windowMs = 15 * 60 * 1000) {
  const key = `${kind}-${sha(ip || 'unknown')}`;
  const now = Date.now();
  const list = ((await get('ratelimit', key)) || []).filter((t) => now - t < windowMs);
  if (list.length >= max) return true;
  list.push(now); await set('ratelimit', key, list); return false;
}
