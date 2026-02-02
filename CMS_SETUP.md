# Configuración del CMS (Decap CMS)

Hemos migrado a **Decap CMS** (anteriormente Netlify CMS), que es una solución más ligera, estable y usa un backend de autenticación personalizado que hemos creado.

## Acceso

- **URL**: `https://www.veredillasfm.es/admin/`
- **Gestión**: Desde el Panel de Admin > Contenido.

## Configuración de OAuth (Producción)

Para que el login funcione en producción, necesitamos actualizar la URL de Callback en GitHub ONE LAST TIME.

1. Ve a **GitHub Settings > Developer settings > GitHub Apps > Veredillas FM CMS**.
2. **Callback URL**: Cámbiala a:
   👉 `https://www.veredillasfm.es/api/oauth/callback`
   (Nota: ya no es `/api/keystatic...`, ahora es más corto).

3. **Variables**: Las variables `KEYSTATIC_GITHUB_CLIENT_ID` y `KEYSTATIC_GITHUB_CLIENT_SECRET` se reutilizan, así que **NO hace falta cambiarlas** en Vercel (si ya funcionaban).

## Uso Local

En local (`npm run dev`), puedes entrar a `http://localhost:4321/admin/`.
Decap intentará conectar con el servidor de producción para autenticarse, lo cual funcionará si tienes internet.

## Estructura

El archivo de configuración está en `public/admin/config.yml`. Ahí se definen los campos de Blogs, Episodios e Invitados.
