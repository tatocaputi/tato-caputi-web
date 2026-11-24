/* =====================================================================
   TATO CAPUTI — Comportamiento común a todas las páginas
   - Datos de contacto y redes (desde data/sitio.js)
   - Video de fondo de Vimeo
   - Menú móvil
   - Animaciones de entrada
   - Transición cinematográfica entre páginas
   ===================================================================== */
(function () {
  'use strict';

  var S = window.SITIO || {};
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function vimeoId(v) { return String(v || '').replace(/\D/g, ''); }

  /* ---------- Contacto y redes ---------- */
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var k = a.getAttribute('data-link');
    if (S[k]) a.setAttribute('href', S[k]);
  });
  document.querySelectorAll('[data-email]').forEach(function (a) {
    a.setAttribute('href', 'mailto:' + S.email);
    a.textContent = S.email;
  });
  document.querySelectorAll('[data-phone]').forEach(function (a) {
    a.setAttribute('href', 'tel:' + String(S.telefono || '').replace(/[^\d+]/g, ''));
    a.textContent = S.telefono;
  });

  /* ---------- Video de fondo ---------- */
  document.querySelectorAll('[data-bg-vimeo]').forEach(function (wrap) {
    var val = String(S[wrap.getAttribute('data-bg-vimeo')] || '');

    /* Archivo de video propio (ej. "/assets/videos/acerca.mp4") */
    if (/\.(mp4|webm|mov)$/i.test(val)) {
      var v = document.createElement('video');
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
      v.preload = 'auto';
      v.poster = val.replace(/\.(mp4|webm|mov)$/i, '.jpg');
      v.src = val;
      v.addEventListener('canplay', function () { wrap.classList.add('is-ready'); });
      wrap.appendChild(v);
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      return;
    }

    /* Video de Vimeo */
    var id = vimeoId(val);
    if (!id) return;
    var f = document.createElement('iframe');
    f.src = 'https://player.vimeo.com/video/' + id +
      '?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1&quality=1080p';
    f.setAttribute('allow', 'autoplay; fullscreen');
    f.setAttribute('tabindex', '-1');
    f.setAttribute('aria-hidden', 'true');
    f.setAttribute('title', '');
    f.addEventListener('load', function () {
      setTimeout(function () { wrap.classList.add('is-ready'); }, 400);
    });
    wrap.appendChild(f);
  });

  /* ---------- Foto de fondo ---------- */
  document.querySelectorAll('[data-bg-image]').forEach(function (img) {
    var src = S[img.getAttribute('data-bg-image')];
    if (!src) { img.remove(); return; }
    img.addEventListener('error', function () { img.style.display = 'none'; });
    img.src = src;
  });

  /* ---------- Menú móvil ---------- */
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    var open = false;
    var setMenu = function (state) {
      open = state;
      toggle.classList.toggle('open', open);
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () { setMenu(!open); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- Entrada ---------- */
  var g = window.gsap;
  if (g && !reduceMotion) {
    var tl = g.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.logo-el', { opacity: 1, duration: 1, delay: 0.2 }, 0);
    tl.fromTo('#top-nav .top-nav__item', { opacity: 0, y: -10 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, delay: 0.4 }, 0);
    tl.to('.social-group', { opacity: 1, duration: 0.9, ease: 'power2.out' }, 0.9);
    tl.fromTo('.fade-in', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.3);
    var main = document.querySelector('.page-main');
    if (main) g.to(main, { opacity: 1, duration: 0.01 });
  } else {
    document.querySelectorAll('.logo-el, .social-group, .fade-in, .page-main').forEach(function (el) {
      el.style.opacity = '1';
    });
  }

  /* El fondo se oscurece un poco al pasar por el menú (home) */
  var overlay = document.getElementById('video-overlay');
  if (overlay) {
    document.querySelectorAll('#top-nav .top-nav__item').forEach(function (item) {
      item.addEventListener('mouseenter', function () { overlay.style.background = 'rgba(3,3,3,.72)'; });
      item.addEventListener('mouseleave', function () { overlay.style.background = ''; });
    });
  }

  /* ---------- Transición cinematográfica ---------- */
  var busy = false;
  var layer = document.getElementById('content-layer') || document.querySelector('.page-main');

  function go(href, word) {
    if (busy) return;
    busy = true;
    if (!g || reduceMotion) { window.location.href = href; return; }

    var wordEl = document.getElementById('t-word-text');
    if (wordEl) {
      wordEl.style.fontSize = '';
      wordEl.textContent = word || '';
      var maxW = window.innerWidth * 0.86;
      var w = wordEl.getBoundingClientRect().width * 1.15;
      if (w > maxW) {
        var cur = parseFloat(getComputedStyle(wordEl).fontSize);
        wordEl.style.fontSize = (cur * maxW / w) + 'px';
      }
    }

    var t = g.timeline();
    if (layer) {
      t.to(layer, { x: -8, duration: 0.04, ease: 'none' }, 0);
      t.to(layer, { x: 12, filter: 'hue-rotate(40deg) saturate(3) brightness(1.3)', duration: 0.04, ease: 'none' }, 0.04);
      t.to(layer, { x: -5, filter: 'hue-rotate(-20deg) saturate(2)', duration: 0.04, ease: 'none' }, 0.08);
      t.to(layer, { x: 0, filter: 'none', duration: 0.04, ease: 'none' }, 0.12);
      t.to(layer, { opacity: 0, duration: 0.12, ease: 'none' }, 0.15);
    }
    t.to('#t-scanlines', { opacity: 1, duration: 0.05, ease: 'none' }, 0);
    t.to('#t-scanlines', { opacity: 0, duration: 0.1, ease: 'none' }, 0.2);
    t.to('#t-flash', { opacity: 0.9, duration: 0.06, ease: 'none' }, 0.15);
    t.to('#t-flash', { opacity: 0, duration: 0.25, ease: 'power2.out' }, 0.21);
    if (word) {
      t.fromTo('#t-word', { opacity: 0, scale: 0.4, filter: 'blur(0px)' },
        { opacity: 1, scale: 1.15, filter: 'blur(0px)', duration: 0.4, ease: 'power4.out' }, 0.18);
      t.to('#t-word', { scale: 3.6, opacity: 0, filter: 'blur(14px)', duration: 0.5, ease: 'power3.in' }, 0.62);
    }
    if (document.getElementById('video-wrap')) t.to('#video-wrap', { scale: 1.2, duration: 1.05, ease: 'power2.in' }, 0);
    t.to('#t-black', { opacity: 1, duration: 0.3, ease: 'power2.in' }, 0.72);
    t.call(function () { window.location.href = href; }, null, 1.05);
  }

  /* Si el usuario vuelve con el botón "atrás", la página no queda en negro */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) window.location.reload();
  });

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href]');
    if (!link || link.hasAttribute('target') || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    go(href, (link.getAttribute('data-text') || '').toUpperCase());
  });

  window.TC = window.TC || {};
  window.TC.vimeoId = vimeoId;
})();
