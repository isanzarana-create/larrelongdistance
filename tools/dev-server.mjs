/**
 * Servidor local de prueba: sirve public/ y monta las funciones de /api.
 * Uso: node tools/dev-server.mjs [puerto]
 * Variables útiles: RESEND_API_KEY (envío real), RESEND_API_URL (simulador), PREINSCRIPCION_ABRE.
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = resolve(ROOT, 'public');
process.env.LARRE_STORE ||= 'memory';
const pre = (await import('../netlify/functions/preinscripcion.mjs')).default;
const col = (await import('../netlify/functions/colabora.mjs')).default;
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.gpx': 'application/gpx+xml', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };
const port = Number(process.argv[2] || 8081);
http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (url.pathname.startsWith('/api/')) {
    const chunks = []; for await (const c of req) chunks.push(c);
    const fn = url.pathname === '/api/preinscripcion' ? pre : url.pathname === '/api/colabora' ? col : null;
    if (!fn) { res.writeHead(404); return res.end(); }
    const r = await fn(new Request(url, { method: req.method, headers: req.headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks) }), { ip: req.socket.remoteAddress });
    res.writeHead(r.status, Object.fromEntries(r.headers)); return res.end(Buffer.from(await r.arrayBuffer()));
  }
  let p = join(PUB, decodeURIComponent(url.pathname));
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); } catch { /* 404 */ }
  try { const b = await readFile(p); res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' }); res.end(b); }
  catch { const b = await readFile(join(PUB, '404.html')); res.writeHead(404, { 'content-type': MIME['.html'] }); res.end(b); }
}).listen(port, () => console.log(`http://localhost:${port}`));
