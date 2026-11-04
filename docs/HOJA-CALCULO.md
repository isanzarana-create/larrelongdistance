# Preinscripciones en una hoja de cálculo de Google

Cada preinscripción se añade como una fila nueva (mejor esfuerzo: si la hoja falla, la preinscripción y los correos funcionan igual).

1. Abre la hoja «Preinscripciones Ultra Trail Larre» (Google Drive). Fila 1 = cabeceras.
2. Menú **Extensiones → Apps Script**, borra lo que haya y pega:

```js
const TOKEN = 'ESCRIBE_AQUI_UNA_CLAVE_LARGA_INVENTADA';
function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.token !== TOKEN) return out({ ok: false });
  SpreadsheetApp.getActiveSheet().appendRow(d.row);
  return out({ ok: true });
}
const out = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
```
3. **Implementar → Nueva implementación → Aplicación web**: ejecutar como *Yo*, acceso *Cualquier usuario*. Copia la URL que acaba en `/exec`.
4. En Netlify → Site configuration → Environment variables, añade:
   - `SHEETS_WEBHOOK_URL` = la URL `/exec`
   - `SHEETS_WEBHOOK_TOKEN` = la misma clave que pusiste en `TOKEN`
5. Redeploy. Sin estas dos variables la función simplemente no envía nada.
