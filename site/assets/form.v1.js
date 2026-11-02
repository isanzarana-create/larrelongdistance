/* Preinscripción: contador, validación accesible y bloqueo antes de la apertura. Sin JS el formulario sigue funcionando con validación nativa. */
(function () {
  var f = document.getElementById('pre-form'); if (!f) return;
  var d = document.getElementById('descripcion'), c = document.getElementById('cnt'), D = f.dataset, MIN = 300, MAX = 600;
  var btn = f.querySelector('button[type=submit]'), live = document.getElementById('form-live');
  function count() {
    var n = d.value.length, ok = n >= MIN && n <= MAX;
    c.textContent = n + ' / ' + MAX + ' · ' + (n < MIN ? D.min.replace('{n}', MIN - n) : n > MAX ? D.max : D.okc);
    c.classList.toggle('bad', !ok && n > 0);
    d.setCustomValidity(ok ? '' : D.errDesc);
  }
  d.addEventListener('input', count); count();
  var open = Date.parse(D.open), test = /[?&]prueba=1/.test(location.search);
  if (Date.now() < open && !test) {
    f.querySelector('fieldset').disabled = true; btn.disabled = true;
    var m = document.getElementById('closed'); if (m) m.hidden = false;
  }
  // La validación nativa bloquea el envío y dispara 'invalid' en cada campo: lo marcamos y avisamos una vez.
  f.addEventListener('invalid', function (e) {
    e.target.setAttribute('aria-invalid', 'true');
    live.textContent = ''; setTimeout(function () { live.textContent = D.errGen; }, 50);
  }, true);
  f.addEventListener('input', function (e) { e.target.removeAttribute('aria-invalid'); });
})();
