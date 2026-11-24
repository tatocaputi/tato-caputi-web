/* =====================================================================
   TRABAJOS
   Cada bloque { ... } es un trabajo. En la página Trabajo aparecen en
   este mismo orden: el primero de la lista es el primero de la grilla.

   Campos:
     id        palabra corta, sin espacios ni tildes. Arma el link:
               /project/?w=porsche
     titulo    como se ve en la web.
     rol       { es: "...", en: "..." }  tu rol en la pieza.
     vimeo     número del video de Vimeo (de https://vimeo.com/NUMERO).
     youtube   link de YouTube. Si el trabajo no tiene vimeo, se usa este:
               en la grilla aparece la portada del video y en la página
               del trabajo, el reproductor de YouTube.
     loop      opcional, número de Vimeo de un corte corto que se usa
               solo como loop en la tarjeta de la grilla. El video
               completo sigue saliendo de vimeo o youtube.
     anio      opcional, ej. "2026".
     oculto    opcional: true lo esconde sin borrarlo.

   Para agregar uno: copiá un bloque entero, pegalo donde quieras que
   aparezca y cambiá los datos. Ojo con las comas entre bloques.
   ===================================================================== */
window.TRABAJOS = [

  {
    id: "porsche",
    titulo: "Porsche Spec Commercial",
    rol: { es: "Director / DoP", en: "Director / DoP" },
    vimeo: "1249702685"
  },
  {
    id: "drexler-taraca",
    titulo: "Jorge Drexler, Taracá",
    rol: { es: "Camera / Edit", en: "Camera / Edit" },
    youtube: "https://www.youtube.com/watch?v=N5TXzAPGppc",
    loop: "1249700316"
  },
  {
    id: "adidas",
    titulo: "Adidas",
    rol: { es: "Director / DoP", en: "Director / DoP" },
    vimeo: "1199077476"
  },
  {
    id: "la-vela-puerca",
    titulo: "La Vela Puerca",
    rol: { es: "Live Edit", en: "Live Edit" },
    vimeo: "1201096690"
  },
  {
    id: "famidesa",
    titulo: "Oriental Films - Famidesa",
    rol: { es: "DoP / Camera", en: "DoP / Camera" },
    youtube: "https://www.youtube.com/watch?v=amJ-Ktg5FJ8",
    loop: "1249699288"
  },
  {
    id: "costa-blanca",
    titulo: "Costa Blanca, España",
    rol: { es: "Director / DoP", en: "Director / DoP" },
    vimeo: "1201097513"
  },
  {
    id: "jdva",
    titulo: "JDVA",
    rol: { es: "Director / DoP", en: "Director / DoP" },
    vimeo: "1209322533",
    anio: "2026"
  },
  {
    id: "la-roche-posay",
    titulo: "La Roche-Posay, Backstage",
    rol: { es: "Camera / Edit", en: "Camera / Edit" },
    vimeo: "1201097169"
  },
  {
    id: "cosquin-rock",
    titulo: "Cosquín Rock",
    rol: { es: "Director / DoP", en: "Director / DoP" },
    vimeo: "1209310746"
  },
  {
    id: "flashmob-salus",
    titulo: "Flashmob Salus",
    rol: { es: "Camera / BTS", en: "Camera / BTS" },
    youtube: "https://www.youtube.com/watch?v=Z-_e7Nx3crE",
    loop: "1249737071"
  },
  {
    id: "frontline",
    titulo: "Frontline",
    rol: { es: "Director / DoP", en: "Director / DoP" },
    youtube: "https://www.youtube.com/watch?v=h8LXtRl4CCU",
    loop: "1249740102"
  }

];
