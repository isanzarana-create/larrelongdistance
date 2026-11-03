/* Ultra Trail Larre® · script único, sin dependencias. Todo funciona sin él (mejora progresiva). */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let I = {};
  try { I = JSON.parse(($('#i18n') || {}).textContent || '{}'); } catch (e) { I = {}; }

  /* ── barra superior ── */
  const bar = $('#top-bar');
  const onScroll = () => bar && bar.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  /* ── menú ── */
  const btn = $('#menuBtn'), panel = $('#menuPanel');
  if (btn && panel) {
    const set = (open) => {
      panel.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', btn.dataset[open ? 'close' : 'open']);
    };
    btn.addEventListener('click', () => set(!panel.classList.contains('open')));
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('open')) { set(false); btn.focus(); } });
    document.addEventListener('click', (e) => { if (panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) set(false); });
  }

  /* ── aparición suave de bloques ── */
  const rv = $$('.sec-body, .hero-copy, .facts');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    rv.forEach((n) => n.classList.add('rv'));
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rv.forEach((n) => io.observe(n));
    setTimeout(() => rv.forEach((n) => n.classList.add('in')), 2500);
  }

  /* ── galería: visor accesible sobre <dialog> ── */
  const lb = $('#lightbox');
  const tiles = $$('.g-link');
  if (lb && typeof lb.showModal === 'function' && tiles.length) {
    const img = $('#lbImg'), cap = $('#lbCap'), cnt = $('#lbCount'), lnk = $('#lbLink');
    let cur = 0, opener = null;
    const show = (i) => {
      cur = (i + tiles.length) % tiles.length;
      const a = tiles[cur];
      img.src = a.dataset.full; img.alt = a.dataset.alt;
      cap.textContent = a.dataset.alt;
      cnt.textContent = fill(cnt.dataset.tpl, { n: cur + 1, total: tiles.length });
      lnk.href = a.href;
    };
    tiles.forEach((a, i) => a.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault(); opener = a; show(i); lb.showModal();
    }));
    lb.addEventListener('click', (e) => {
      const d = e.target.closest('[data-lb]');
      if (d) { const k = d.dataset.lb; if (k === 'close') lb.close(); else show(cur + (k === 'next' ? 1 : -1)); }
      else if (e.target === lb) lb.close();
    });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') show(cur + 1);
      if (e.key === 'ArrowLeft') show(cur - 1);
    });
    lb.addEventListener('close', () => { if (opener) opener.focus(); });
  }

  /* ── formularios ── */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const T0 = Date.now();
  const labelOf = (el) => {
    const l = el.closest('.f') && ($('label', el.closest('.f')) || $('legend', el.closest('.f')));
    return l ? l.textContent.replace(/\*/g, '').trim() : el.name;
  };
  const clearErrors = (form) => $$('[aria-invalid]', form).forEach((n) => n.removeAttribute('aria-invalid'));

  function validate(form, E) {
    const errs = [];
    const bad = (el, msg) => { el.setAttribute('aria-invalid', 'true'); errs.push({ el, msg }); };
    $$('input,select,textarea', form).forEach((el) => {
      if (el.type === 'hidden' || el.closest('.hp') || el.closest('[hidden]')) return;
      if (el.type === 'radio') return;
      const v = (el.value || '').trim();
      if (el.type === 'checkbox') { if (el.required && !el.checked) bad(el, E.consent); return; }
      if (el.required && !v) return bad(el, E.required);
      if (el.type === 'email' && v && !emailRe.test(v)) return bad(el, E.email);
      if (el.type === 'number' && v) { const n = Number(v); if (!Number.isInteger(n) || n < +el.min || n > +el.max) return bad(el, E.age); }
      if (el.minLength > 0 && v && v.length < el.minLength) bad(el, fill(E.min, { min: el.minLength }));
    });
    const fed = $$('input[name=federado]', form);
    if (fed.length && !fed.some((r) => r.checked)) { fed[0].setAttribute('aria-invalid', 'true'); errs.push({ el: fed[0], msg: E.required, label: $('legend', fed[0].closest('fieldset')).textContent.replace(/\*/g, '').trim() }); }
    return errs;
  }

  function showErrors(box, E, errs) {
    box.innerHTML = `<p>${esc(E.title)}</p><ul>${errs.map((x, i) => `<li><a href="#" data-i="${i}">${esc(x.el.type === 'checkbox' ? x.msg : (x.label || labelOf(x.el)))}</a>${x.el.type === 'checkbox' ? '' : ': ' + esc(x.msg)}</li>`).join('')}</ul>`;
    box.hidden = false;
    box.addEventListener('click', (e) => { const a = e.target.closest('a[data-i]'); if (a) { e.preventDefault(); errs[+a.dataset.i].el.focus(); } }, { once: true });
    box.focus();
  }
  function showMessage(box, text) { box.innerHTML = `<p>${esc(text)}</p>`; box.hidden = false; box.focus(); }

  function wire(form, kind, onOk) {
    if (!form) return;
    const E = I[kind].errors;
    const err = $('.f-err', form);
    const submit = $('button[type=submit]', form);
    const lbl = $('.lbl', submit);
    const orig = lbl.textContent;
    form.addEventListener('input', (e) => e.target.removeAttribute && e.target.removeAttribute('aria-invalid'));
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.hidden = true; clearErrors(form);
      const errs = validate(form, E);
      if (errs.length) { showErrors(err, E, errs); return; }
      const fd = new FormData(form);
      fd.set('t', String(Date.now() - T0));
      const data = {};
      fd.forEach((v, k) => { data[k] = typeof v === 'string' ? v.trim() : v; });
      submit.disabled = true; submit.setAttribute('aria-busy', 'true'); lbl.textContent = I.sending[kind === 'pre' ? 'pre' : 'col'];
      try {
        const res = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        let j = null;
        try { j = await res.json(); } catch (x) { j = null; }
        if (res.ok && j && j.ok) { onOk(j, data); return; }
        if (j && j.error === 'validation' && j.fields) {
          const list = [];
          Object.keys(j.fields).forEach((k) => { const el = form.elements[k]; if (el) { const first = el.length ? el[0] : el; first.setAttribute('aria-invalid', 'true'); list.push({ el: first, msg: E[j.fields[k]] || E.required }); } });
          if (list.length) { showErrors(err, E, list); return; }
        }
        const key = (j && j.error && E[j.error]) ? j.error : (res.status === 429 ? 'rate' : 'server');
        showMessage(err, fill(E[key], { email: I.email }));
      } catch (x) {
        showMessage(err, fill(E.network, { email: I.email }));
      } finally {
        submit.disabled = false; submit.removeAttribute('aria-busy'); lbl.textContent = orig;
      }
    });
  }

  /* contador de caracteres */
  const counter = $('#p-desc-c'), desc = $('#p-desc');
  if (counter && desc) {
    const up = () => { counter.textContent = fill(counter.dataset.tpl, { n: desc.value.length, max: counter.dataset.max }); };
    desc.addEventListener('input', up); up();
  }
  /* federación: campo condicional */
  const fedWrap = $('#p-fed-wrap'), fedIn = $('#p-fed');
  $$('input[name=federado]').forEach((r) => r.addEventListener('change', () => {
    const yes = $('input[name=federado]:checked').value === 'si';
    fedWrap.hidden = !yes; fedIn.required = yes; if (!yes) { fedIn.value = ''; fedIn.removeAttribute('aria-invalid'); }
  }));

  /* preinscripción: estado según el servidor */
  const preForm = $('#preForm');
  if (preForm) {
    const closed = $('#preClosed'), unavailable = $('#preUnavailable'), ok = $('#preOk');
    const O = I.pre.ok;
    wire(preForm, 'pre', (j, d) => {
      const code = esc(j.code);
      ok.innerHTML = `<h3>${esc(O.title)}</h3><p>${esc(fill(j.already ? O.already : O.lead, { nombre: d.nombre }))}</p>
<div class="code"><output id="refCode" aria-label="${esc(I.pre.copy)}">${code}</output><button class="btn btn-line" type="button" id="copyBtn">${esc(I.pre.copy)}</button></div>
<p>${j.mailSent === false ? esc(fill(O.mailFailed, { email: I.email })) : fill(O.next, { email: esc(d.email) })}</p>
<ol>${O.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`;
      preForm.hidden = true; ok.hidden = false; ok.focus();
      ok.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' });
      const cb = $('#copyBtn');
      cb.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(j.code); cb.textContent = I.pre.copied; setTimeout(() => { cb.textContent = I.pre.copy; }, 2200); }
        catch (x) { const r = document.createRange(); r.selectNodeContents($('#refCode')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      });
    });
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 8000);
    fetch('/api/preinscripcion', { headers: { Accept: 'application/json' }, signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('status'))))
      .then((s) => { if (s && s.open) preForm.hidden = false; else closed.hidden = false; })
      .catch(() => { unavailable.hidden = false; })
      .finally(() => clearTimeout(to));
  }

  /* colaboración */
  const colForm = $('#colForm'), colOk = $('#colOk');
  if (colForm) {
    wire(colForm, 'col', (j, d) => {
      const O = I.col.ok;
      colOk.innerHTML = `<h3>${esc(O.title)}</h3><p>${j.mailSent === false ? esc(O.mailFailed) : fill(O.lead, { nombre: esc(d.persona), email: esc(d.email) })}</p>`;
      colForm.hidden = true; colOk.hidden = false; colOk.focus();
    });
  }
})();
