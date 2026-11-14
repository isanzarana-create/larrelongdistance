// Validación en servidor (la del navegador es solo comodidad).
const EMAIL = /^[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[^\s@<>()"',;:]{2,}$/;
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/[\r\n]+/g, (m) => (m.length > 2 ? '\n\n' : m)).trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/\s*\n\s*/g, ' ');

export function validatePre(raw) {
  const f = {}; const bad = {};
  f.modalidad = String(raw.modalidad || ''); if (!['individual', 'relevos'].includes(f.modalidad)) bad.modalidad = 'required';
  f.equipo = f.modalidad === 'relevos' ? oneLine(raw.equipo, 80) : ''; if (f.modalidad === 'relevos' && !f.equipo) bad.equipo = 'required';
  f.nombre = oneLine(raw.nombre, 80); if (!f.nombre) bad.nombre = 'required';
  f.apellidos = oneLine(raw.apellidos, 120); if (!f.apellidos) bad.apellidos = 'required';
  const edad = Number(raw.edad); f.edad = edad;
  if (raw.edad === '' || raw.edad == null) bad.edad = 'required'; else if (!Number.isInteger(edad) || edad < 18 || edad > 99) bad.edad = 'age';
  f.sexo = String(raw.sexo || ''); if (!['mujer', 'hombre', 'otro'].includes(f.sexo)) bad.sexo = 'required';
  f.email = oneLine(raw.email, 160).toLowerCase(); if (!f.email) bad.email = 'required'; else if (!EMAIL.test(f.email)) bad.email = 'email';
  f.referencias = clean(raw.referencias, 1200);
  f.federado = String(raw.federado || ''); if (!['si', 'no'].includes(f.federado)) bad.federado = 'required';
  f.federacion = f.federado === 'si' ? oneLine(raw.federacion, 120) : ''; if (f.federado === 'si' && !f.federacion) bad.federacion = 'required';
  f.descripcion = clean(raw.descripcion, 1000); if (!f.descripcion) bad.descripcion = 'required'; else if (f.descripcion.length < 20) bad.descripcion = 'min';
  f.observaciones = clean(raw.observaciones, 1000);
  if (raw.consentimiento !== 'si' && raw.consentimiento !== true) bad.consentimiento = 'consent';
  return { f, bad };
}

export function validateCol(raw) {
  const f = {}; const bad = {};
  f.empresa = oneLine(raw.empresa, 140); if (!f.empresa) bad.empresa = 'required';
  f.persona = oneLine(raw.persona, 120); if (!f.persona) bad.persona = 'required';
  f.cargo = oneLine(raw.cargo, 120); if (!f.cargo) bad.cargo = 'required';
  f.email = oneLine(raw.email, 160).toLowerCase(); if (!f.email) bad.email = 'required'; else if (!EMAIL.test(f.email)) bad.email = 'email';
  f.tipo = String(raw.tipo || ''); if (!['marca', 'institucion', 'medio', 'operador', 'otro'].includes(f.tipo)) bad.tipo = 'required';
  f.mensaje = clean(raw.mensaje, 2000); if (!f.mensaje) bad.mensaje = 'required'; else if (f.mensaje.length < 20) bad.mensaje = 'min';
  if (raw.consentimiento !== 'si' && raw.consentimiento !== true) bad.consentimiento = 'consent';
  return { f, bad };
}
