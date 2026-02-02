# Configuración del CMS (Custom Built)

Hemos reemplazado los CMS de terceros por un **Gestor de Contenido a medida** integrado directamente en el Dashboard.

## 🚀 Configuración Final de GitHub App

Para que la autenticación funcione con el nuevo sistema, actualiza la **Callback URL** en GitHub por última vez:

👉 **Callback URL**: `https://www.veredillasfm.es/api/auth/github/callback`

### Pasos:
1. Ve a **GitHub Settings > Developer settings > GitHub Apps**.
2. Selecciona tu App (`Veredillas FM CMS`).
3. Busca el campo **Callback URL**.
4. Pega la URL de arriba.
5. Guarda los cambios.

## Acceso

- **URL**: `/dashboard/admin/cms`
- **Permisos**: Solo visible para administradores (`admin` o `owner`).

## Funcionamiento

- **En Local (`npm run dev`)**:
  - Lee y escribe directamente en tu disco duro (`src/content`).
  - No requiere login con GitHub (usa el sistema de archivos).
  
- **En Producción**:
  - Requiere conectar con GitHub (botón visible en el dashboard).
  - Usa la API de GitHub para leer y commitear cambios.
