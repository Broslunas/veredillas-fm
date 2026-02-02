export const prerender = false;

export async function GET({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  // Debug payload
  console.log('Exchanging code for token...');

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID,
        client_secret: import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();
    console.log('GitHub Token Response:', data);

    if (data.error) {
       return new Response(`Error from GitHub: ${data.error_description}`, { status: 400 });
    }

    const token = data.access_token;

    // Decap CMS expects a postMessage content window communication
    const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
            
            // Match the window.opener check
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}', 
              e.origin
            );
          }

          window.addEventListener("message", receiveMessage, false);
          
          // Send immediately to opener in case we are the popup
          // Decap CMS listens for 'authorization:provider:success:data'
          window.opener.postMessage("authorization:github:success:${JSON.stringify({ token, provider: 'github' })}", "*");
        })();
      </script>
    `;

    return new Response(script, {
      headers: { 'Content-Type': 'text/html' },
    });

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
