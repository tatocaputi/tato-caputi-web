# tato.caputi.uy

Web personal de Tato Caputi. Es un sitio estático: no tiene servidor, base de datos ni panel. Todo se edita cambiando archivos de texto, y al guardar en GitHub se publica solo.

## Qué editar y dónde

| Quiero cambiar… | Archivo |
|---|---|
| Agregar, sacar u ordenar trabajos | `data/trabajos.js` |
| Video de fondo de la home o de Acerca, email, teléfono, redes | `data/sitio.js` |
| Textos (Acerca, Contacto, menú, línea de rol) en español e inglés | `js/i18n.js` |
| Colores y tipografías | `css/style.css` (arriba de todo, en `:root`) |
| Foto de fondo de Contacto | subir `assets/images/contact-bg.jpg` |
| Logo | reemplazar `assets/logos/tato-caputi-logo.png` |

## Agregar un trabajo (desde la web de GitHub)

1. Subí el video a Vimeo y copiá el número del link (`https://vimeo.com/1239275800` → `1239275800`).
2. En GitHub, abrí `data/trabajos.js` y tocá el lápiz (Edit).
3. Copiá un bloque `{ ... },` completo, pegalo donde quieras que aparezca y cambiá los datos.
4. Abajo, **Commit changes**. En uno o dos minutos está publicado.

Para esconder un trabajo sin borrarlo, agregale `oculto: true,`.

Si después de un cambio la página de Trabajo queda vacía, casi siempre es una coma o una comilla que falta en `trabajos.js`.

## Ver el sitio en tu computadora (opcional)

Desde la carpeta del proyecto:

```
python3 -m http.server 8000
```

y abrí http://localhost:8000

## Videos

Cada trabajo puede usar Vimeo (`vimeo`) o YouTube (`youtube`). Con Vimeo, la tarjeta de la grilla muestra el video en loop; con YouTube, muestra la portada del video y la página del trabajo usa el reproductor de YouTube.

Para que se vean bien como fondo (sin controles, en loop), cada video en Vimeo tiene que permitir ser embebido en cualquier sitio o en `tato.caputi.uy` (Vimeo → video → Settings → Privacy → Embed).

## Links viejos

`_redirects` manda los links de la web anterior (por ejemplo `/porsche`) a los nuevos. Funciona en Netlify.
