/* =====================================================================
   TRABAJOS
   Cada bloque { ... } es un trabajo. Aparecen en este orden dentro de
   su sección.

   Campos:
     id        palabra corta, sin espacios ni tildes. Arma el link:
               /project/?w=porsche
     titulo    como se ve en la web.
     seccion   "direccion", "fotografia" o "live".
     rol       { es: "...", en: "..." }  tu rol en la pieza.
     vimeo     número del video de Vimeo (de https://vimeo.com/NUMERO).
     anio      opcional, ej. "2026".
     youtube   opcional, link a la versión completa en YouTube.
     oculto    opcional: true lo esconde sin borrarlo.

   Para agregar uno: copiá un bloque entero, pegalo donde quieras que
   aparezca y cambiá los datos. Ojo con las comas entre bloques.
   ===================================================================== */
window.TRABAJOS = [

  /* ---------- DIRECCIÓN ---------- */
  {
    id: "porsche",
    titulo: "Porsche — Spec Commercial",
    seccion: "direccion",
    rol: { es: "Dirección y fotografía", en: "Director / DoP" },
    vimeo: "1239275800"
  },
  {
    id: "adidas",
    titulo: "Adidas",
    seccion: "direccion",
    rol: { es: "Dirección y fotografía", en: "Director / DoP" },
    vimeo: "1199077476"
  },
  {
    id: "costa-blanca",
    titulo: "Costa Blanca, España",
    seccion: "direccion",
    rol: { es: "Dirección y fotografía", en: "Director / DoP" },
    vimeo: "1201097513"
  },
  {
    id: "jdva",
    titulo: "JDVA",
    seccion: "direccion",
    rol: { es: "Dirección y fotografía", en: "Director / DoP" },
    vimeo: "1209322533",
    anio: "2026"
  },

  /* ---------- FOTOGRAFÍA ---------- */
  {
    id: "famidesa",
    titulo: "Famidesa",
    seccion: "fotografia",
    rol: { es: "Dirección de fotografía y cámara", en: "DoP / Camera" },
    vimeo: "1208209260"
  },
  {
    id: "la-roche-posay",
    titulo: "La Roche-Posay — Backstage",
    seccion: "fotografia",
    rol: { es: "Cámara y edición", en: "Camera / Edit" },
    vimeo: "1201097169"
  },

  /* ---------- LIVE / MUSIC ---------- */
  {
    id: "drexler-taraca",
    titulo: "Jorge Drexler — Taracá",
    seccion: "live",
    rol: { es: "Cámara y edición", en: "Camera / Edit" },
    vimeo: "1208199537",
    youtube: "https://www.youtube.com/watch?v=N5TXzAPGppc"
  },
  {
    id: "la-vela-puerca",
    titulo: "La Vela Puerca",
    seccion: "live",
    rol: { es: "Edición en vivo", en: "Live Edit" },
    vimeo: "1201096690"
  },
  {
    id: "cosquin-rock",
    titulo: "Cosquín Rock",
    seccion: "live",
    rol: { es: "Dirección y fotografía", en: "Director / DoP" },
    vimeo: "1209310746"
  }

];
