/* =====================================================================
   Página de proyecto: /project/?w=ID
   Toma los datos de data/trabajos.js
   ===================================================================== */
(function () {
  'use strict';

  var i18n = window.TC && window.TC.i18n;
  function vimeoId(v) { return String(v || '').replace(/\D/g, ''); }
  var root = document.getElementById('project');
  if (!root) return;

  var lista = (window.TRABAJOS || []).filter(function (w) { return w && !w.oculto; });
  var orden = ['direccion', 'fotografia', 'live'];
  lista.sort(function (a, b) { return orden.indexOf(a.seccion) - orden.indexOf(b.seccion); });

  var id = new URLSearchParams(window.location.search).get('w');
  var idx = -1;
  lista.forEach(function (w, i) { if (w.id === id) idx = i; });
  var w = lista[idx];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  if (!w) {
    root.innerHTML = '<div class="not-found"><p data-i18n="project.notfound"></p>' +
      '<a href="/work/" class="btn-ghost" data-i18n-word="nav.work"><span data-i18n="project.all"></span><span>→</span></a></div>';
    if (i18n) i18n.apply();
    return;
  }

  document.title = w.titulo + ' — Tato Caputi';
  var next = lista[(idx + 1) % lista.length];
  var vid = vimeoId(w.vimeo);

  root.innerHTML =
    (vid ? '<div class="vimeo-wrap fade-in" id="vimeo-mount"><div class="placeholder" data-i18n="project.loading"></div></div>' : '') +
    '<div class="project-info fade-in">' +
      '<div><span class="meta" id="project-role"></span><h1>' + esc(w.titulo) + '</h1></div>' +
      '<div class="project-links">' +
        (w.youtube ? '<a class="btn-ghost" target="_blank" rel="noopener noreferrer" href="' + esc(w.youtube) + '"><span data-i18n="project.youtube"></span><span>↗</span></a>' : '') +
        '<a class="btn-ghost" href="/work/" data-i18n-word="nav.work"><span data-i18n="project.all"></span></a>' +
        (next && next !== w ? '<a class="btn-ghost" href="/project/?w=' + encodeURIComponent(next.id) + '" data-text="' + esc(next.titulo.toUpperCase()) + '"><span data-i18n="project.next"></span><span class="arrow">→</span></a>' : '') +
      '</div>' +
    '</div>';

  function role() {
    var lang = i18n ? i18n.getLang() : 'es';
    var el = document.getElementById('project-role');
    var r = w.rol ? (w.rol[lang] || w.rol.es) : '';
    el.textContent = [r, w.anio].filter(Boolean).join(' · ');
  }
  if (i18n) i18n.apply();
  role();
  document.addEventListener('tc:langchange', role);

  if (vid) {
    var mount = document.getElementById('vimeo-mount');
    var f = document.createElement('iframe');
    f.src = 'https://player.vimeo.com/video/' + vid + '?title=0&byline=0&portrait=0&dnt=1';
    f.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('title', w.titulo);
    f.addEventListener('load', function () { mount.classList.add('is-loaded'); });
    mount.appendChild(f);
  }
})();
