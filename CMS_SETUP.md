# Configuración del CMS (Keystatic)

## 🚨 GUÍA DE SOLUCIÓN DE ERRORES: "Authorization Failed"

He detectado que estás teniendo problemas con la autorización (Error 401). Esto ocurre el 99% de las veces por una de estas tres razones. Por favor, verifica una a una:

### 1. Variables de Entorno en Vercel (CRÍTICO)

Asegúrate de que en **Vercel > Project Settings > Environment Variables** tienes estas TRES variables exactas:

1. `KEYSTATIC_GITHUB_CLIENT_ID`
   - Debe coincidir con el **Client ID** de tu GitHub App.
   - Ejemplo: `Iv23...`

2. `KEYSTATIC_GITHUB_CLIENT_SECRET` 
   - ⚠️ **ES LA CAUSA MÁS PROBABLE DEL ERROR.**
   - Si creaste la App hace un tiempo, el secret original ya no se puede ver. **Debes generar uno nuevo**.
   - Ve a GitHub App > Settings > Client secrets > **Generate a new client secret**.
   - Copia el nuevo valor y actualízalo en Vercel.
   - **¡Cuidado con los espacios!** A veces al copiar se cuela un espacio al final.

3. `KEYSTATIC_SECRET`
   - Esta variable es necesaria para encriptar las cookies de sesión.
   - Puede ser cualquier cadena aleatoria larga (números y letras).
   - Si no la tienes puesta, la autenticación fallará siempre.

### 2. Dominios "www" vs "no-www"

He actualizado tu código para forzar el uso de `www.veredillasfm.es`.
- En GitHub App > Callback URL: debe ser `https://www.veredillasfm.es/api/keystatic/github/oauth/callback`.
- En tu navegador, asegúrate de entrar por `https://www.veredillasfm.es/keystatic`.

### 3. Cookies Antiguas

A veces, el navegador se queda con una cookie corrupta de un intento anterior.
1. Ve a `www.veredillasfm.es`.
2. Abre las herramientas de desarrollador (F12) > Application > Cookies.
3. Borra todas las cookies asociadas al dominio.
4. Intenta entrar de nuevo.

### IMPORTANTE: REDEPLOY

**Despues de cambiar cualquier variable en Vercel, debes hacer un REDEPLOY.**
Ve a Vercel > Deployments, haz clic en los tres puntos del último deployment y selecciona **Redeploy**. Si no lo haces, los cambios de variables no se aplican.
