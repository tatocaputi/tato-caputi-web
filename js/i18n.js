/* =====================================================================
   TEXTOS DEL SITIO (español / inglés)
   Cada texto tiene una clave. En el HTML se usa así:
     data-i18n="clave"       reemplaza el texto
     data-i18n-html="clave"  reemplaza el texto y permite <br>
   Para cambiar un texto, editalo acá en los dos idiomas.
   ===================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'tc_lang';
  var DEFAULT_LANG = 'es';

  var DICT = {
    es: {
      'nav.work': 'Trabajo',
      'nav.about': 'Acerca',
      'nav.contact': 'Contacto',
      'lang.toggle': 'ENG',

      'home.role': 'Dirección y fotografía',
      'home.place': 'Montevideo, Uruguay',
      'home.year': '@2026',

      'work.direccion': 'Dirección',
      'work.fotografia': 'Fotografía',
      'work.live': 'Live / Music',

      'about.intro': 'Historias contadas con intención.<br><br>Narrativa, emoción y atención al detalle para crear piezas con una identidad propia.',

      'contact.label': 'Contacto',
      'contact.title': 'Hablemos.',
      'contact.email.label': 'Email',
      'contact.phone.label': 'Teléfono',
      'contact.social.label': 'Redes',

      'project.loading': 'Cargando…',
      'project.all': 'Ver todos los trabajos',
      'project.next': 'Siguiente',
      'project.youtube': 'Ver en YouTube',
      'project.notfound': 'Este trabajo no existe o fue movido.'
    },
    en: {
      'nav.work': 'Work',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'lang.toggle': 'ESP',

      'home.role': 'Director / DoP',
      'home.place': 'Montevideo, Uruguay',
      'home.year': '@2026',

      'work.direccion': 'Direction',
      'work.fotografia': 'Cinematography',
      'work.live': 'Live / Music',

      'about.intro': 'Purpose-driven storytelling.<br><br>Blending narrative, emotion, and attention to detail to create work with a distinct identity.',

      'contact.label': 'Contact',
      'contact.title': 'Let’s talk.',
      'contact.email.label': 'Email',
      'contact.phone.label': 'Phone',
      'contact.social.label': 'Social',

      'project.loading': 'Loading…',
      'project.all': 'View all work',
      'project.next': 'Next',
      'project.youtube': 'Watch on YouTube',
      'project.notfound': 'This project doesn’t exist or has moved.'
    }
  };

  function getLang() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s && DICT[s]) return s;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function t(key, lang) {
    var d = DICT[lang || getLang()] || DICT[DEFAULT_LANG];
    return Object.prototype.hasOwnProperty.call(d, key) ? d[key] : key;
  }

  function apply(lang) {
    var cur = lang || getLang();
    document.documentElement.setAttribute('lang', cur);
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'), cur);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'), cur);
    });
    document.querySelectorAll('[data-i18n-word]').forEach(function (el) {
      el.setAttribute('data-text', t(el.getAttribute('data-i18n-word'), cur).toUpperCase());
    });
    document.dispatchEvent(new CustomEvent('tc:langchange', { detail: { lang: cur } }));
  }

  function setLang(lang) {
    if (!DICT[lang]) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  function init() {
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(getLang() === 'es' ? 'en' : 'es');
      });
    });
    apply(getLang());
  }

  window.TC = window.TC || {};
  window.TC.i18n = { t: t, apply: apply, setLang: setLang, getLang: getLang };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
