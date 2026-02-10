# 📖 Manual de Broslunas CMS — Veredillas FM

> **Broslunas CMS** es el sistema de gestión de contenido utilizado para administrar el sitio web de Veredillas FM. Este manual te guiará a través de cada tipo de colección disponible, explicando cada campo, su tipo de dato, si es obligatorio u opcional, y proporcionando ejemplos reales para que puedas crear y editar contenido sin problemas.

---

## 📑 Tabla de Contenidos

1. [Introducción](#-introducción)
2. [¿Cómo funciona el contenido?](#-cómo-funciona-el-contenido)
3. [Colección: Episodios](#-colección-episodios)
4. [Colección: Blog](#-colección-blog)
5. [Colección: Guests (Invitados)](#-colección-guests-invitados)
6. [Colección: Gallery (Galería)](#-colección-gallery-galería)
7. [Guía rápida de tipos de datos](#-guía-rápida-de-tipos-de-datos)
8. [Preguntas frecuentes](#-preguntas-frecuentes)

---

## 🌟 Introducción

El contenido del sitio web se gestiona a través de **archivos Markdown** (`.md`) organizados en colecciones. Cada colección tiene un esquema definido que determina qué datos puede contener. Los datos se escriben en la sección **frontmatter** del archivo (la parte delimitada por `---`) y el contenido del artículo se escribe en Markdown debajo del frontmatter.

### Estructura básica de un archivo

```markdown
---
campo1: valor1
campo2: valor2
campo3: valor3
---

# Aquí va el contenido del artículo

Este es el texto **en Markdown** que aparecerá como cuerpo del contenido.
```

---

## 📁 ¿Cómo funciona el contenido?

Todo el contenido se encuentra en la carpeta `src/content/` del repositorio. Las colecciones disponibles son:

| Colección | Carpeta | Descripción |
|-----------|---------|-------------|
| **Episodios** | `src/content/episodios/` | Episodios del podcast de Veredillas FM |
| **Blog** | `src/content/blog/` | Artículos y noticias del blog |
| **Guests** | `src/content/guests/` | Perfiles de invitados y colaboradores |
| **Gallery** | `src/content/gallery/` | Galerías de imágenes por categoría |

### Nombre del archivo

El nombre del archivo (sin extensión `.md`) se convierte en el **slug** de la URL. Por ejemplo:
- `amor-sin-filtros.md` → `/episodios/amor-sin-filtros`
- `bienvenida.md` → `/blog/bienvenida`
- `carlos.md` → `/guests/carlos`

> ⚠️ **Importante:** Usa nombres en minúsculas, sin espacios, y separados por guiones (`-`). No uses caracteres especiales ni acentos en el nombre del archivo.

---

## 🎙️ Colección: Episodios

**Carpeta:** `src/content/episodios/`

Los episodios son la colección principal del sitio. Representan cada programa/episodio del podcast de Veredillas FM.

### Tabla de campos

| Campo | Tipo de dato | Obligatorio | Valor por defecto | Descripción |
|-------|-------------|-------------|-------------------|-------------|
| `title` | `string` | ✅ Sí | — | Título del episodio |
| `description` | `string` | ✅ Sí | — | Descripción breve del episodio |
| `pubDate` | `date` | ✅ Sí | — | Fecha de publicación (formato ISO 8601) |
| `author` | `string` | ❌ No | `"Veredillas FM"` | Autor o responsable del episodio |
| `image` | `string` | ❌ No | — | URL de la imagen de portada del episodio |
| `spotifyUrl` | `string` | ❌ No | — | URL del episodio en Spotify |
| `audioUrl` | `string` | ❌ No | — | URL directa al archivo de audio |
| `duration` | `string` | ❌ No | — | Duración del episodio (ej: `"37 min"`) |
| `season` | `number` | ❌ No | — | Número de temporada |
| `episode` | `number` | ❌ No | — | Número de episodio |
| `videoUrl` | `string` | ❌ No | — | URL del vídeo embebido (YouTube, Spotify, etc.) |
| `tags` | `string[]` | ❌ No | `["General"]` | Lista de etiquetas para categorizar el episodio |
| `participants` | `string[]` | ❌ No | — | Lista de nombres de los participantes/invitados |
| `isPremiere` | `boolean` | ❌ No | `false` | Indica si el episodio es un estreno próximo |
| `transcription` | `object[]` | ❌ No | — | Transcripción completa del episodio (ver detalle abajo) |
| `sections` | `object[]` | ❌ No | — | Secciones/capítulos del episodio (ver detalle abajo) |
| `warningMessage` | `string` | ❌ No | — | Mensaje de advertencia mostrado antes del contenido |

### Detalle de campos complejos

#### `transcription` (array de objetos)

Cada entrada de la transcripción tiene la siguiente estructura:

| Subcampo | Tipo | Obligatorio | Descripción |
|----------|------|-------------|-------------|
| `time` | `string` | ✅ Sí | Marca de tiempo en formato `"MM:SS"` o `"HH:MM:SS"` |
| `text` | `string` | ✅ Sí | Texto hablado en ese momento |
| `speaker` | `string` | ❌ No | Nombre del hablante (si se quiere identificar quién habla) |

#### `sections` (array de objetos)

Las secciones dividen el episodio en capítulos navegables:

| Subcampo | Tipo | Obligatorio | Descripción |
|----------|------|-------------|-------------|
| `title` | `string` | ✅ Sí | Título de la sección |
| `time` | `string` | ✅ Sí | Marca de tiempo de inicio en formato `"MM:SS"` |

### Ejemplo completo: Episodio básico

```yaml
---
title: Amor Sin Filtros ft. Saray & Antonieta
tags:
  - amor
  - relaciones
  - pareja
  - sin filtros
description: >-
  Un análisis profundo y sin tapujos sobre el amor, la pareja y las relaciones
  modernas con Saray y Antonieta.
pubDate: '2026-02-11T17:00:00Z'
duration: ¿?
isPremiere: true
season: 1
episode: 9
image: 'https://cdn.veredillasfm.es/images/009.webp'
audioUrl: 'https://example.com/veredillas-fm-episodio-9.mp3'
videoUrl: 'https://example.com/veredillas-fm-episodio-9.mp4'
participants:
  - Saray
  - Antonieta
---
# Amor Sin Filtros: Un Diálogo Abierto con Saray y Antonieta

¡Bienvenidos a una conversación sincera sobre el amor!
```

### Ejemplo completo: Episodio con transcripción y secciones

```yaml
---
title: 'El Mercadillo ft. Carlos, Anaysa y Gisselle'
tags:
  - Eventos
transcription:
  - time: '00:01'
    text: >-
      Bienvenidos a Veredías FM, donde te mantenemos al pendiente de los temas
      más candentes.
  - time: '00:15'
    text: Muy bien.
  - time: '00:18'
    text: 'Eh, bueno, coméntanos un poco cómo surgió esta idea del mercadillo.'
  - time: '00:22'
    text: >-
      Bueno, pues los alumnos de 4.º C querían iniciar una iniciativa para
      aquellas personas que tengan cosas en casa que no utilicen...
description: >-
  Hoy, el foco se dirige hacia una iniciativa muy especial: ¡el Mercadillo
  Escolar!
pubDate: '2025-12-10T00:00:00.000Z'
image: 'https://cdn.veredillasfm.es/images/005.webp'
audioUrl: 'https://cdn.veredillasfm.es/podcast-005-mercadillo.wav'
season: 1
episode: 5
duration: 6 min
participants:
  - Carlos
  - Anaysa
  - Gisselle
sections:
  - time: '00:01'
    title: Intro / Bienvenida
  - time: '00:22'
    title: ¿Cómo surgió la idea?
  - time: '00:52'
    title: Respuesta del profesorado
  - time: '01:10'
    title: Organización y tareas
---

**¡Hola! ¡Bienvenido a Veredillas FM!**

Contenido del episodio en Markdown...
```

### Notas importantes sobre Episodios

- 🎯 **`isPremiere: true`** marca el episodio como un estreno próximo. Se mostrará con un indicador especial en la web. Cambia a `false` (o elimínalo) una vez emitido.
- 🔗 **`spotifyUrl`** espera una URL con formato: `https://open.spotify.com/episode/...`
- 🎬 **`videoUrl`** puede ser una URL de embed de YouTube (`https://www.youtube.com/embed/VIDEO_ID`) o de Spotify.
- 📝 **`transcription`** es ideal para episodios largos donde se quiere ofrecer la transcripción completa. Cada entrada tiene una marca de tiempo y el texto correspondiente.
- 📑 **`sections`** permite dividir el episodio en capítulos con marcas de tiempo, facilitando la navegación.

---

## 📝 Colección: Blog

**Carpeta:** `src/content/blog/`

Los artículos del blog son publicaciones de noticias, anuncios y contenido editorial relacionado con Veredillas FM.

### Tabla de campos

| Campo | Tipo de dato | Obligatorio | Valor por defecto | Descripción |
|-------|-------------|-------------|-------------------|-------------|
| `title` | `string` | ✅ Sí | — | Título del artículo |
| `description` | `string` | ✅ Sí | — | Descripción breve o resumen del artículo |
| `pubDate` | `date` | ✅ Sí | — | Fecha de publicación (formato ISO 8601 o `YYYY-MM-DD`) |
| `author` | `string` | ❌ No | `"Redacción Veredillas"` | Autor del artículo |
| `image` | `string` | ❌ No | — | URL de la imagen de cabecera del artículo |
| `tags` | `string[]` | ❌ No | — | Lista de etiquetas para categorizar el artículo |

### Ejemplo: Artículo de blog

```yaml
---
title: "¡Bienvenidos a Veredillas FM!"
description: "La voz del IES Las Veredillas ya está en el aire... ¡y en la red!"
pubDate: 2025-11-25
image: "https://cdn.veredillasfm.es/banner.webp"
tags: ["Bienvenida", "Radio", "IES Las Veredillas"]
---

**La voz del IES Las Veredillas ya está en el aire... ¡y en la red!**

Estamos muy emocionados de daros la bienvenida al blog oficial de **Veredillas FM.**

Aquí podréis encontrar:

* **Los Últimos Programas:** Escucha a la carta nuestras emisiones más recientes.
* **Detrás de las Ondas:** Conoce a los alumnos y profesores que hacen posible cada programa.
* **Y MUCHO MÁS**
```

### Ejemplo: Artículo con autor personalizado

```yaml
---
title: "Próximamente: Entrevista a un invitado especial"
description: "¡Prepárate! Muy pronto tendremos una entrevista con un profesor sorpresa."
pubDate: 2026-01-13
author: "Redacción Veredillas"
image: "https://example.com/imagen-teaser.webp"
tags: ["Próximamente", "Sorpresa"]
---

¡Atención a todos los oyentes de Veredillas FM!

Próximamente se realizará una entrevista a un invitado muy especial...
```

### Notas importantes sobre Blog

- 📅 **`pubDate`** acepta múltiples formatos de fecha: `2025-11-25`, `"2025-11-25"`, `'2025-12-10T00:00:00.000Z'`. Se recomienda usar el formato `YYYY-MM-DD` por simplicidad.
- ✍️ Si no especificas `author`, se usará automáticamente `"Redacción Veredillas"`.
- 🏷️ A diferencia de episodios, `tags` no tiene valor por defecto; si no lo defines, el artículo no tendrá etiquetas.

---

## 👥 Colección: Guests (Invitados)

**Carpeta:** `src/content/guests/`

Los perfiles de invitados representan a las personas que han participado en los episodios de Veredillas FM, ya sean alumnos, profesores u otros colaboradores.

### Tabla de campos

| Campo | Tipo de dato | Obligatorio | Valor por defecto | Descripción |
|-------|-------------|-------------|-------------------|-------------|
| `name` | `string` | ✅ Sí | — | Nombre completo del invitado |
| `image` | `string` | ❌ No | — | URL de la foto de perfil del invitado |
| `role` | `string` | ❌ No | — | Rol o cargo del invitado (ej: "Alumno de 2º Bachillerato B") |
| `description` | `string` | ❌ No | — | Descripción breve del invitado |
| `social` | `object` | ❌ No | — | Redes sociales del invitado (ver detalle abajo) |

### Detalle de campos complejos

#### `social` (objeto)

| Subcampo | Tipo | Obligatorio | Descripción |
|----------|------|-------------|-------------|
| `twitter` | `string` | ❌ No | URL del perfil de Twitter/X |
| `instagram` | `string` | ❌ No | URL del perfil de Instagram |
| `website` | `string` | ❌ No | URL del sitio web personal |

> 💡 Todos los campos dentro de `social` son opcionales. Puedes incluir solo los que el invitado tenga disponibles, o no incluir `social` en absoluto.

### Ejemplo: Invitado alumno con redes sociales

```yaml
---
name: "Carlos"
role: "Alumno de 2º Bachillerato B"
description: "Alumno 2º Bachillerato B."
image: "https://cdn.veredillasfm.es/guest/carlos.webp"
social:
  instagram: "https://www.instagram.com/carlosramos_m_/"
---
Carlos es uno de los alumnos encargados de la organización del Mercadillo Escolar.
```

### Ejemplo: Invitado profesor sin redes sociales

```yaml
---
name: "Prof. Alejandro"
role: "Profesor de Informática"
description: "Profesor de informática en el I.E.S. Las Veredillas, apasionado por la enseñanza y la biología."
image: "https://cdn.veredillasfm.es/guest/alejandro.jpg"
---
Con una trayectoria dedicada a la educación tecnológica, el Prof. Alejandro combina su conocimiento técnico con un enfoque humano.
```

### Ejemplo: Invitado con múltiples redes sociales

```yaml
---
name: "Nombre del Invitado"
role: "Su rol o cargo"
description: "Breve descripción del invitado."
image: "https://cdn.veredillasfm.es/guest/foto.webp"
social:
  twitter: "https://twitter.com/usuario"
  instagram: "https://www.instagram.com/usuario/"
  website: "https://www.su-pagina.com"
---
Biografía del invitado en formato Markdown.
```

### Notas importantes sobre Guests

- 👤 El **nombre del archivo** debe ser un identificador corto del invitado (ej: `carlos.md`, `prof-alejandro.md`).
- 📸 Para la imagen, se recomienda usar imágenes en formato `.webp` o `.jpg` alojadas en el CDN (`cdn.veredillasfm.es`).
- 📝 El **contenido Markdown** debajo del frontmatter sirve como biografía extendida del invitado.
- 🔗 Los nombres en `participants` de los episodios deben coincidir con el campo `name` de los invitados para que se enlacen correctamente.

---

## 🖼️ Colección: Gallery (Galería)

**Carpeta:** `src/content/gallery/`

Las galerías organizan imágenes por categorías temáticas. Cada archivo de galería representa una categoría y contiene una lista de imágenes con sus títulos.

### Tabla de campos

| Campo | Tipo de dato | Obligatorio | Valor por defecto | Descripción |
|-------|-------------|-------------|-------------------|-------------|
| `category` | `string` | ✅ Sí | — | Nombre de la categoría de la galería |
| `images` | `object[]` | ✅ Sí | — | Lista de imágenes de la galería (ver detalle abajo) |

### Detalle de campos complejos

#### `images` (array de objetos)

Cada imagen tiene la siguiente estructura:

| Subcampo | Tipo | Obligatorio | Descripción |
|----------|------|-------------|-------------|
| `title` | `string` | ✅ Sí | Título o descripción de la imagen |
| `src` | `string` | ✅ Sí | URL de la imagen |

### Ejemplo: Galería de episodios

```yaml
---
category: Episodios
images:
  - title: 008 - Charlas cotidianas - Carlos y Gustavo
    src: 'https://cdn.veredillasfm.es/img/008-v2.webp'
  - title: 007 - Hablemos de Venezuela
    src: 'https://cdn.veredillasfm.es/img/007-v2.webp'
  - title: 006 - El Pulso de la Vida
    src: 'https://cdn.veredillasfm.es/img/006.webp'
  - title: 005 - El Mercadillo
    src: 'https://cdn.veredillasfm.es/img/005.webp'
---
```

### Ejemplo: Galería de equipo

```yaml
---
category: Equipo
images:
  - title: Nuestro Equipo Técnico
    src: 'https://cdn.veredillasfm.es/galeria/001.jpg'
  - title: Preparando el programa
    src: 'https://cdn.veredillasfm.es/galeria/007.jpg'
  - title: El equipo de redacción
    src: 'https://cdn.veredillasfm.es/galeria/003.jpg'
---
```

### Ejemplo: Galería de estudio

```yaml
---
category: Estudio
images:
  - title: Grabación en vivo
    src: 'https://cdn.veredillasfm.es/galeria/002.jpg'
  - title: Micrófonos listos
    src: 'https://cdn.veredillasfm.es/galeria/004.jpg'
---
```

### Notas importantes sobre Gallery

- 📂 Cada archivo `.md` representa **una categoría** de galería. Las categorías actuales son: `Episodios`, `Equipo`, `Estudio`, `Momentos`.
- 🖼️ No hay contenido Markdown debajo del frontmatter en las galerías; toda la información está en el frontmatter.
- 📸 Se recomienda usar formato `.webp` para las imágenes por su mejor compresión.
- ➕ Para añadir una nueva imagen a una galería existente, simplemente añade un nuevo objeto `- title: / src:` a la lista `images`.
- 🆕 Para crear una nueva categoría de galería, crea un nuevo archivo `.md` en `src/content/gallery/` con un campo `category` único.

---

## 🔤 Guía rápida de tipos de datos

| Tipo | Descripción | Ejemplo en YAML |
|------|-------------|-----------------|
| `string` | Texto libre | `title: "Mi título"` |
| `number` | Número entero | `episode: 5` |
| `boolean` | Verdadero o falso | `isPremiere: true` |
| `date` | Fecha en formato ISO | `pubDate: 2025-11-25` o `pubDate: '2025-12-10T00:00:00.000Z'` |
| `string[]` | Lista de textos | `tags: ["Radio", "Música"]` o en formato lista (ver abajo) |
| `object` | Objeto con subcampos | `social:` seguido de subcampos indentados |
| `object[]` | Lista de objetos | `sections:` seguido de una lista de objetos (ver abajo) |

### Formatos de listas en YAML

Las listas se pueden escribir de dos formas:

**Formato en línea:**
```yaml
tags: ["Radio", "Música", "Entrevista"]
```

**Formato expandido (recomendado para listas largas):**
```yaml
tags:
  - Radio
  - Música
  - Entrevista
```

### Formato de textos largos en YAML

Para textos largos como descripciones, usa el operador `>-`:

```yaml
description: >-
  Esta es una descripción muy larga que ocupa múltiples líneas pero que
  se renderizará como un solo párrafo sin saltos de línea adicionales.
```

---

## ❓ Preguntas frecuentes

### ¿Cómo creo un nuevo episodio?

1. Crea un archivo `.md` en `src/content/episodios/` con un nombre descriptivo (ej: `mi-nuevo-episodio.md`).
2. Añade el frontmatter con al menos los campos obligatorios: `title`, `description`, y `pubDate`.
3. Escribe el contenido del episodio en Markdown debajo del frontmatter.
4. Opcionalmente, añade `audioUrl`, `videoUrl`, `participants`, `sections`, `transcription`, etc.

### ¿Cómo añado un nuevo invitado?

1. Crea un archivo `.md` en `src/content/guests/` con el nombre del invitado (ej: `nombre-invitado.md`).
2. Rellena el campo obligatorio `name` y opcionalmente `role`, `description`, `image`, y `social`.
3. Escribe una biografía breve como contenido Markdown.
4. Asegúrate de que el valor de `name` coincida con el que usas en `participants` de los episodios.

### ¿Cómo añado imágenes a la galería?

1. Abre el archivo de galería correspondiente en `src/content/gallery/` (ej: `episodios.md`).
2. Añade un nuevo objeto a la lista `images` con `title` y `src`.
3. Para una nueva categoría, crea un archivo `.md` nuevo con un campo `category` único.

### ¿Cómo marco un episodio como "estreno"?

Añade `isPremiere: true` al frontmatter del episodio. Una vez emitido, cámbialo a `false` o elimínalo.

### ¿Qué formato de imagen debo usar?

Se recomienda **WebP** (`.webp`) por su excelente compresión y calidad. También se aceptan `.jpg` y `.png`. Las imágenes deben estar alojadas en el CDN (`cdn.veredillasfm.es`) o en cualquier URL pública.

### ¿Cómo añado una transcripción a un episodio?

Añade el campo `transcription` como una lista de objetos con `time` y `text`:

```yaml
transcription:
  - time: '00:01'
    text: Bienvenidos al programa.
  - time: '00:15'
    text: Hoy hablaremos sobre...
  - time: '00:30'
    speaker: Prof. Alejandro
    text: Me parece un tema muy interesante.
```

### ¿Cómo añado secciones/capítulos a un episodio?

Añade el campo `sections` como una lista de objetos con `title` y `time`:

```yaml
sections:
  - time: '00:01'
    title: Intro / Bienvenida
  - time: '05:30'
    title: Tema principal
  - time: '15:00'
    title: Preguntas y respuestas
  - time: '25:00'
    title: Despedida
```

### ¿Puedo usar HTML dentro del contenido Markdown?

Sí, puedes usar HTML básico dentro del contenido Markdown para elementos que no son posibles solo con Markdown, como imágenes con atributos especiales o iframes.

### ¿Qué pasa si omito un campo opcional?

El campo simplemente no se mostrará en la web. Los campos con valores por defecto (como `author` o `tags` en episodios) usarán ese valor automáticamente si no los defines.

---

## 📋 Resumen de campos obligatorios por colección

| Colección | Campos obligatorios |
|-----------|-------------------|
| **Episodios** | `title`, `description`, `pubDate` |
| **Blog** | `title`, `description`, `pubDate` |
| **Guests** | `name` |
| **Gallery** | `category`, `images` (con al menos un `title` y `src`) |

---

> 📌 **¿Necesitas más ayuda?** Consulta los archivos existentes en cada carpeta como referencia: son el mejor ejemplo de cómo estructurar tu contenido.