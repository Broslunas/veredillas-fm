# Configuración del CMS (Keystatic)

Se ha implementado **Keystatic** como sistema CMS para gestionar Blogs, Episodios e Invitados.

## ⚠️ IMPORTANTE: URL de Callback Correcta

El error que ves confirma que la aplicación está esperando recibir la respuesta en una ruta específica `/api/...`.

Para arreglar el error **"redirect_uri is not associated..."**, ve a GitHub y pon **EXACTAMENTE** esta URL:

👉 **Callback URL**: `https://www.veredillasfm.es/api/keystatic/github/oauth/callback`

*(Nota que incluye `/api/keystatic/github/oauth/callback`. Esta es la ruta correcta para la integración con Astro).*

---

## Pasos para corregirlo ahora mismo

1. Ve a **GitHub Settings > Developer Settings > GitHub Apps > Veredillas FM CMS**.
2. Busca el campo **Callback URL**.
3. Pega la URL completa:
   `https://www.veredillasfm.es/api/keystatic/github/oauth/callback`
4. Guarda los cambios (**Save changes**).

Una vez guardado, vuelve a intentar iniciar sesión en tu web.

## Referencia de Configuración

Si necesitas crear la App de nuevo o revisar, estos son los datos correctos:

- **Homepage URL**: `https://www.veredillasfm.es`
- **Callback URL**: `https://www.veredillasfm.es/api/keystatic/github/oauth/callback`
- **Permissions**: Content (Read & Write).

Las variables de entorno (`KEYSTATIC_GITHUB_CLIENT_ID`, etc.) se mantienen igual.
