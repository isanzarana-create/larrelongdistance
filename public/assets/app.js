/* Ultra Trail Larre® · script único, sin dependencias. Todo funciona sin él (mejora progresiva). */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in o ? o[k] : m));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let I = {};
  try { I = JSON.parse(($('#i18n') || {}).textContent || '{}'); } catch (e) { I = {}; }

  /* ── tema: negro por defecto; ?tema=claro muestra la variante arena ── */
  try {
    const q = new URLSearchParams(location.search).get('tema');
    if (q === 'negro' || q === 'claro') sessionStorage.setItem('tema', q);
    if (sessionStorage.getItem('tema') === 'claro') {
      document.documentElement.dataset.theme = 'light';
      const m = $('meta[name=theme-color]'); if (m) m.content = '#EFE6D2';
    }
  } catch (e) { /* sin almacenamiento: no pasa nada */ }

  /* ── menú ── */
  const btn = $('#menuBtn'), panel = $('#menuPanel');
  const setMenu = (open) => {
    if (!btn || !panel) return;
    panel.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', btn.dataset[open ? 'close' : 'open']);
  };
  if (btn && panel) {
    btn.addEventListener('click', () => setMenu(!panel.classList.contains('open')));
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('open')) { setMenu(false); btn.focus(); } });
    document.addEventListener('click', (e) => { if (panel.classList.contains('open') && !panel.contains(e.target) && !btn.contains(e.target)) setMenu(false); });
  }

  /* ── navegación: la portada muestra solo el nombre y cada punto del menú abre su sección ── */
  const sections = $$('main > .sec');
  if (sections.length && $('.hero')) {
    const goHome = () => {
      document.body.classList.remove('section-view');
      sections.forEach((s) => s.classList.remove('is-active'));
      scrollTo(0, 0);
    };
    const openSection = (id) => {
      const t = id && document.getElementById(id);
      if (!t || !t.classList.contains('sec')) return false;
      sections.forEach((s) => s.classList.toggle('is-active', s === t));
      document.body.classList.add('section-view');
      scrollTo(0, 0);
      const h = $('h2', t);
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
      return true;
    };
    const route = () => {
      let id = '';
      try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { id = ''; }
      if (!openSection(id)) goHome();
    };
    route();
    addEventListener('hashchange', route);
    addEventListener('popstate', route);
    $$('[data-back]').forEach((b) => {
      b.hidden = false;
      b.addEventListener('click', () => {
        try { history.pushState(null, '', location.pathname + location.search); } catch (e) { /* sin historial: se queda el hash */ }
        goHome();
        setMenu(true);
        if (btn) btn.focus();
      });
    });
    const logo = $('.logo');
    if (logo) logo.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      try { history.pushState(null, '', location.pathname + location.search); } catch (x) { /* nada */ }
      goHome(); setMenu(false);
    });
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
    ['modalidad', 'federado'].forEach((n) => {
      const g = $$(`input[name=${n}]`, form);
      if (g.length && !g.some((r) => r.checked)) { g[0].setAttribute('aria-invalid', 'true'); errs.push({ el: g[0], msg: E.required, label: $('legend', g[0].closest('fieldset')).textContent.replace(/\*/g, '').trim() }); }
    });
    errs.sort((x, y) => (x.el.compareDocumentPosition(y.el) & 4 ? -1 : 1));
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

  /* modalidad: nombre del equipo solo en relevos */
  const teamWrap = $('#p-team-wrap'), teamIn = $('#p-team');
  $$('input[name=modalidad]').forEach((r) => r.addEventListener('change', () => {
    const relay = $('input[name=modalidad]:checked').value === 'relevos';
    teamWrap.hidden = !relay; teamIn.required = relay; if (!relay) { teamIn.value = ''; teamIn.removeAttribute('aria-invalid'); }
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
    const cd = $('#preCountdown'), cdVal = $('#preCountdownVal');
    function startCountdown(opensAt) {
      const target = new Date(opensAt).getTime();
      if (!Number.isFinite(target)) return;
      const tick = () => {
        const ms = target - Date.now();
        if (ms <= 0) { clearInterval(timer); cd.hidden = true; return; }
        const d = Math.floor(ms / 86400000), h = Math.floor(ms % 86400000 / 3600000), m = Math.floor(ms % 3600000 / 60000);
        cdVal.textContent = `${d} d · ${h} h · ${m} min`;
        cd.hidden = false;
      };
      tick();
      const timer = setInterval(tick, 30000);
    }
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 8000);
    fetch('/api/preinscripcion', { headers: { Accept: 'application/json' }, signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('status'))))
      .then((s) => { if (s && s.open) preForm.hidden = false; else { closed.hidden = false; startCountdown((s && s.opens) || I.opens); } })
      .catch(() => { unavailable.hidden = false; })
      .finally(() => clearTimeout(to));
  }

  /* colaboración */
  const colForm = $('#colForm'), colOk = $('#colOk');
  if (colForm) {
    wire(colForm, 'col', (j, d) => {
      if (j.mailSent === false) { colOk.innerHTML = `<p>${esc(I.col.ok.mailFailed)}</p>`; colOk.hidden = false; }
      colForm.reset();
    });
  }

  /* ── recorrido interactivo: mapa y perfil enlazados, con trazado animado ── */
  const live = $('[data-route]');
  if (live) {
    const fig = $('.map', live), mapSvg = $('.map-svg', live), profSvg = $('.prof-svg', live), wrap = $('[data-prof-wrap]', live);
    const out = { km: $('[data-r=km]', live), ele: $('[data-r=ele]', live), slope: $('[data-r=slope]', live) };
    const en = live.dataset.lang === 'en';
    const nf = (v, d) => v.toFixed(d).replace('.', en ? '.' : ',');
    const th = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, en ? ',' : '.');
    const pj = mapSvg.dataset.proj.split(',').map(Number); // minLon,maxLat,kx,scale,padL,padY
    const pf = profSvg.dataset.prof.split(',').map(Number); // pl,pr,pt,pb,W,H,n,lo,hi
    const cdot = $('.m-cur', mapSvg), halo = $('.m-halo', mapSvg), pline = $('.p-cur', profSvg), pdot = $('.p-cur-dot', profSvg);
    const trail = $('.m-trail', mapSvg), trailG = $('.m-trail-glow', mapSvg), veil = $('.p-veil', profSvg);
    const alt = $('.m-alt', mapSvg), maskPath = $('.m-mask', mapSvg);
    const cKm = $('[data-count-km]', live), cUp = $('[data-count-up]', live), skipBtn = $('.map-skip', live);
    const finalKm = cKm ? +cKm.textContent : 0, finalUp = cUp ? +cUp.textContent.replace(/\D/g, '') : 0;
    const marks = $$('[data-km]', mapSvg).map((el) => ({ el, km: +el.dataset.km }));
    let P = null, MX = [], MY = [], UP = [], cur = 0, loading = false, anim = null;
    const mx = (lon) => (lon - pj[0]) * pj[2] * pj[3] + pj[4];
    const my = (lat) => (pj[1] - lat) * pj[3] + pj[5];
    const iw = pf[4] - pf[0] - pf[1], ih = pf[5] - pf[2] - pf[3];
    const set = (i) => {
      if (!P) return;
      cur = Math.max(0, Math.min(P.p.length - 1, i));
      const q = P.p[cur];
      const a = P.p[Math.max(0, cur - 2)], b = P.p[Math.min(P.p.length - 1, cur + 2)];
      const slope = b[0] > a[0] ? ((b[3] - a[3]) / ((b[0] - a[0]) * 1000)) * 100 : 0;
      live.classList.add('is-live');
      cdot.setAttribute('cx', MX[cur].toFixed(1)); cdot.setAttribute('cy', MY[cur].toFixed(1));
      halo.setAttribute('cx', MX[cur].toFixed(1)); halo.setAttribute('cy', MY[cur].toFixed(1));
      const x = pf[0] + (q[0] / pf[6]) * iw, y = pf[2] + ih - ((Math.max(pf[7], Math.min(pf[8], q[3])) - pf[7]) / (pf[8] - pf[7])) * ih;
      pline.setAttribute('x1', x.toFixed(1)); pline.setAttribute('x2', x.toFixed(1));
      pdot.setAttribute('cx', x.toFixed(1)); pdot.setAttribute('cy', y.toFixed(1));
      out.km.textContent = nf(q[0], 1) + ' km';
      out.ele.textContent = q[3] + ' m';
      out.slope.textContent = (slope > 0 ? '+' : '') + nf(slope, 1) + ' %';
      wrap.setAttribute('aria-valuenow', Math.round(q[0]));
      wrap.setAttribute('aria-valuetext', out.km.textContent + ', ' + out.ele.textContent + ', ' + out.slope.textContent);
    };
    const svgPt = (svg, e) => {
      const m = svg.getScreenCTM();
      if (!m) return null;
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(m.inverse());
    };
    const byKm = (km) => Math.round((km * 1000) / P.step);

    /* animación: el trazo se dibuja en ~9 s y un punto con estela recorre el lazo */
    const DUR = 9000;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let maskLen = 0;
    const ease = (u) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
    const drawTo = (f) => {
      const n = P.p.length - 1, i = Math.max(0, Math.min(n, Math.floor(f * n)));
      maskPath.style.strokeDashoffset = (maskLen * (1 - f)).toFixed(1);
      const km = P.p[i][0];
      marks.forEach((m) => m.el.classList.toggle('on', m.km <= km + 0.05));
      const from = Math.max(0, i - 28);
      let d = '';
      for (let k = from; k <= i; k++) d += (k === from ? 'M' : 'L') + MX[k].toFixed(1) + ' ' + MY[k].toFixed(1);
      trail.setAttribute('d', d); trailG.setAttribute('d', d);
      set(i);
      const xv = pf[0] + (km / pf[6]) * iw;
      veil.setAttribute('x', xv.toFixed(1)); veil.setAttribute('width', Math.max(0, pf[0] + iw - xv).toFixed(1));
      if (cKm) cKm.textContent = String(Math.round((km / P.total) * finalKm));
      if (cUp) cUp.textContent = th((UP[i] / UP[n]) * finalUp);
    };
    const finish = () => {
      if (anim) cancelAnimationFrame(anim.raf);
      anim = null;
      fig.classList.remove('is-anim');
      alt.removeAttribute('mask');
      marks.forEach((m) => m.el.classList.add('on'));
      veil.setAttribute('width', '0');
      if (cKm) cKm.textContent = String(finalKm);
      if (cUp) cUp.textContent = th(finalUp);
      if (skipBtn) { skipBtn.textContent = skipBtn.dataset.replay; skipBtn.hidden = reduce.matches; }
    };
    const play = () => {
      if (!P || reduce.matches) { finish(); return; }
      if (anim) cancelAnimationFrame(anim.raf);
      maskLen = maskPath.getTotalLength();
      maskPath.style.strokeDasharray = maskLen.toFixed(1) + ' ' + (maskLen + 50).toFixed(1);
      alt.setAttribute('mask', 'url(#mDraw)');
      fig.classList.add('is-anim');
      marks.forEach((m) => m.el.classList.remove('on'));
      if (skipBtn) { skipBtn.textContent = skipBtn.dataset.skip; skipBtn.hidden = false; }
      const t0 = performance.now();
      anim = { raf: 0 };
      const step = (now) => {
        const u = Math.max(0, Math.min(1, (now - t0) / DUR));
        drawTo(ease(u));
        if (u < 1) anim.raf = requestAnimationFrame(step);
        else finish();
      };
      drawTo(0);
      anim.raf = requestAnimationFrame(step);
    };
    if (skipBtn) skipBtn.addEventListener('click', () => { if (anim) finish(); else play(); });

    const onProf = (e) => {
      if (!P) return;
      if (anim) finish();
      const pt = svgPt(profSvg, e); if (!pt) return;
      set(byKm(((pt.x - pf[0]) / iw) * pf[6]));
    };
    const onMap = (e) => {
      if (!P) return;
      if (anim) finish();
      const pt = svgPt(mapSvg, e); if (!pt) return;
      let bi = 0, bd = 1e12;
      for (let i = 0; i < MX.length; i++) { const d = (MX[i] - pt.x) ** 2 + (MY[i] - pt.y) ** 2; if (d < bd) { bd = d; bi = i; } }
      if (bd < 90 * 90) set(bi);
    };
    const drag = (el, fn) => {
      let down = false;
      el.addEventListener('pointerdown', (e) => { down = true; fn(e); });
      el.addEventListener('pointermove', (e) => { if (down || (e.pointerType === 'mouse' && !anim)) fn(e); });
      addEventListener('pointerup', () => { down = false; });
      el.addEventListener('pointercancel', () => { down = false; });
    };
    // arranca cuando se ve casi todo el mapa (70 % de lo que cabe en pantalla)
    const watch = () => {
      if (reduce.matches || !('IntersectionObserver' in window)) { finish(); return; }
      maskLen = maskPath.getTotalLength();
      maskPath.style.strokeDasharray = maskLen.toFixed(1) + ' ' + (maskLen + 50).toFixed(1);
      maskPath.style.strokeDashoffset = maskLen.toFixed(1);
      alt.setAttribute('mask', 'url(#mDraw)');
      fig.classList.add('is-anim');
      if (cKm) cKm.textContent = '0';
      if (cUp) cUp.textContent = '0';
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en2) => {
          const need = Math.min(en2.boundingClientRect.height, innerHeight) * 0.7;
          if (en2.isIntersecting && en2.intersectionRect.height >= need) { io.disconnect(); play(); }
        });
      }, { threshold: [0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
      io.observe(mapSvg);
    };
    const load = () => {
      if (P || loading) return; loading = true;
      fetch(live.dataset.src, { credentials: 'omit' }).then((r) => r.json()).then((j) => {
        P = j; MX = j.p.map((q) => mx(q[2])); MY = j.p.map((q) => my(q[1]));
        // desnivel positivo acumulado (histéresis de 3 m), para el contador
        let g = 0, ref = j.p[0][3]; UP = j.p.map((q) => { if (q[3] - ref >= 3) { g += q[3] - ref; ref = q[3]; } else if (ref - q[3] >= 3) ref = q[3]; return g; });
        drag(profSvg, onProf); drag(mapSvg, onMap);
        wrap.addEventListener('keydown', (e) => {
          const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 25, PageDown: -25 }[e.key];
          if (k || ['Home', 'End'].includes(e.key)) { if (anim) finish(); }
          if (k) { e.preventDefault(); set(cur + k); }
          else if (e.key === 'Home') { e.preventDefault(); set(0); }
          else if (e.key === 'End') { e.preventDefault(); set(P.p.length - 1); }
        });
        wrap.addEventListener('focus', () => { if (!live.classList.contains('is-live')) set(0); });
        $$('.ctrl [data-km]').forEach((th2) => {
          const b = document.createElement('button');
          b.type = 'button'; b.className = 'ctrl-go'; b.textContent = th2.textContent;
          b.addEventListener('click', () => { if (anim) finish(); set(byKm(+th2.dataset.km)); const r = live.getBoundingClientRect(); if (r.top < 0 || r.top > innerHeight * 0.5) live.scrollIntoView({ block: 'start' }); });
          th2.textContent = ''; th2.appendChild(b);
        });
        watch();
      }).catch(() => { loading = false; });
    };
    load();
  }
})();
