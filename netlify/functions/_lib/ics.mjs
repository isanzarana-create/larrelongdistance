// Genera un .ics (evento de día completo, sin hora porque no está confirmada) y el enlace
// equivalente de Google Calendar, para que el corredor pueda guardar la apertura de la
// inscripción con pago (2 de enero de 2027) en su calendario desde el correo.
const pad = (n) => String(n).padStart(2, '0');
const stamp = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
// Pliegue de línea a 75 octetos (RFC 5545 §3.1); nuestro contenido es ASCII, así que basta con longitud.
const fold = (line) => {
  if (line.length <= 75) return line;
  const out = [line.slice(0, 75)];
  for (let i = 75; i < line.length; i += 74) out.push(' ' + line.slice(i, i + 74));
  return out.join('\r\n');
};
const nextDay = (iso) => { const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + 1); return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`; };

/** dateISO: 'YYYY-MM-DD' (evento de día completo). Devuelve el .ics como texto. */
export function buildIcs({ uid, dateISO, summary, description, url }) {
  const start = dateISO.replace(/-/g, '');
  const end = nextDay(dateISO);
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Ultra Trail Larre//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${esc(summary)}`,
    `DESCRIPTION:${esc(description)}`,
    url ? `URL:${url}` : null,
    'END:VEVENT', 'END:VCALENDAR'
  ].filter(Boolean);
  return lines.map(fold).join('\r\n') + '\r\n';
}

/** Enlace "Añadir a Google Calendar" equivalente, como respaldo si el cliente de correo no reconoce el adjunto. */
export function gcalUrl({ dateISO, summary, description, url }) {
  const start = dateISO.replace(/-/g, '');
  const end = nextDay(dateISO);
  const p = new URLSearchParams({ action: 'TEMPLATE', text: summary, dates: `${start}/${end}`, details: description + (url ? `\n\n${url}` : '') });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
