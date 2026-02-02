# Configuración del CMS (Keystatic)

## 🚨 "Authorization Failed": Últimos Chequeos

Si has regenerado el secreto y sigue fallando, el error suele estar en uno de estos puntos sutiles.

### 1. ¿Client ID o App ID? (Error Común)

Es muy común confundir el **App ID** con el **Client ID**. Son números parecidos pero diferentes.

- Ve a GitHub App Settings > General.
- Busca **Client ID** (Suele empezar por letras, ej: `Ov23...` o `Iv1...`).
- **NO COPIES** el "App ID" (que es solo números).
- Verifica que en Vercel `KEYSTATIC_GITHUB_CLIENT_ID` sea el Client ID correcto.

### 2. ¿La App está INSTALADA?

Crear la App no es suficiente, tienes que instalarla en el repositorio.

1. En GitHub App Settings, ve a **Install App** (menú lateral izquierdo).
2. Asegúrate de que está instalada en la cuenta `Broslunas`.
3. Dale permisos al repositorio `veredillas-fm` (o "All repositories").

### 3. Permisos de Organización

Si `Broslunas` es una Organización, es posible que la App necesite **"Grant"** o **"Authorize"** en los ajustes de la organización (Settings > Third-party access > GitHub Apps).

### 4. Limpieza Final

Si verificas todo lo anterior:
1. Borra cookies de `www.veredillasfm.es` una vez más.
2. Intenta entrar en modo incógnito para asegurar que no hay caché.
