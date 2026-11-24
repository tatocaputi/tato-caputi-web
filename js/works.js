/* =====================================================================
   Página Trabajo: arma la grilla desde data/trabajos.js
   Las secciones aparecen en este orden. Una sección sin trabajos no se muestra.
   ===================================================================== */
(function () {
  'use strict';

  var SECCIONES = ['direccion', 'fotografia', 'live'];
  var root = document.getElementById('works');
  if (!root) return;

  var i18n = window.TC && window.TC.i18n;
  function vimeoId(v) { return String(v || '').replace(/\D/g, ''); }
  var trabajos = (window.TRABAJOS || []).filter(function (w) { return w && !w.oculto; });

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function card(w) {
    var id = vimeoId(w.vimeo);
    var media = id
      ? '<div class="card-video" aria-hidden="true"><iframe data-src="https://player.vimeo.com/video/' + id +
        '?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1" allow="autoplay; fullscreen" tabindex="-1" title=""></iframe></div>'
      : '';
    var rol = w.rol ? '<span class="meta" data-rol-es="' + esc(w.rol.es) + '" data-rol-en="' + esc(w.rol.en) + '"></span>' : '';
    return '<a href="/project/?w=' + encodeURIComponent(w.id) + '" class="work-card" data-text="' + esc(String(w.titulo).toUpperCase()) + '">' +
      media + '<div class="label">' + rol + '<span class="title">' + esc(w.titulo) + '</span></div></a>';
  }

  var n = 0;
  root.innerHTML = SECCIONES.map(function (s) {
    var items = trabajos.filter(function (w) { return w.seccion === s; });
    if (!items.length) return '';
    n++;
    return '<section class="works-section" id="' + s + '">' +
      '<h2 class="works-heading"><span class="num">0' + n + '</span><span class="name" data-i18n="work.' + s + '"></span></h2>' +
      '<div class="works-grid">' + items.map(card).join('') + '</div></section>';
  }).join('');

  function roles() {
    var lang = i18n ? i18n.getLang() : 'es';
    root.querySelectorAll('[data-rol-es]').forEach(function (el) {
      el.textContent = el.getAttribute('data-rol-' + lang) || el.getAttribute('data-rol-es');
    });
  }
  if (i18n) i18n.apply();
  roles();
  document.addEventListener('tc:langchange', roles);

  /* Los videos de las tarjetas se cargan recién cuando se acercan a la pantalla */
  var frames = root.querySelectorAll('iframe[data-src]');
  function load(f) { if (!f.src) f.src = f.getAttribute('data-src'); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { load(e.target); io.unobserve(e.target); } });
    }, { rootMargin: '300px' });
    frames.forEach(function (f) { io.observe(f); });
  } else {
    frames.forEach(load);
  }

  /* Entrada de las tarjetas */
  var cards = root.querySelectorAll('.work-card');
  if (window.gsap && !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    root.querySelectorAll('.works-grid').forEach(function (grid) {
      gsap.to(grid.querySelectorAll('.work-card'), {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: window.ScrollTrigger ? { trigger: grid, start: 'top 90%' } : undefined
      });
    });
  } else {
    cards.forEach(function (c) { c.style.opacity = '1'; c.style.transform = 'none'; });
  }
})();
