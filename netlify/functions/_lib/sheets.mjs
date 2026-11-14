// Copia de cada preinscripción en una hoja de cálculo de Google (mejor esfuerzo, nunca bloquea al corredor).
// Se activa solo si existen SHEETS_WEBHOOK_URL (URL de la app web de Apps Script) y SHEETS_WEBHOOK_TOKEN.
import { cfg } from './config.mjs';

export const HEADERS = ['Fecha', 'Código', 'Nombre', 'Apellidos', 'Edad', 'Sexo', 'Correo', 'Referencias', 'Federado', 'Federación', 'Descripción', 'Observaciones', 'Idioma', 'Modalidad', 'Equipo'];

export const rowOf = (code, when, lang, f) => [when, code, f.nombre, f.apellidos, f.edad, f.sexo, f.email, f.referencias, f.federado === 'si' ? 'Sí' : 'No', f.federacion || '', f.descripcion, f.observaciones || '', lang, f.modalidad === 'relevos' ? 'Relevos' : 'Individual', f.equipo || ''];

export async function appendRow(row) {
  const c = cfg();
  if (!c.sheetsUrl || !c.sheetsToken) return { ok: false, skipped: true };
  try {
    const r = await fetch(c.sheetsUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ token: c.sheetsToken, row }), signal: AbortSignal.timeout(8000) });
    const t = await r.text();
    return { ok: r.ok && /"ok":\s*true/.test(t), status: r.status };
  } catch (e) { return { ok: false, error: String(e) }; }
}
