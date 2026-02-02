export const prerender = false;

export async function GET({ request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  // Debug: Try to exchange manually to see the REAL error
  const tokenUrl = 'https://github.com/login/oauth/access_token';
  const body = {
    client_id: import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID,
    client_secret: import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    code,
  };
  
  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    
    return new Response(JSON.stringify({
      debug_message: "This is a temporary debug response from Veredillas FM",
      github_response: data,
      env_check: {
        client_id_start: body.client_id ? body.client_id.substring(0, 4) : 'MISSING',
        has_secret: !!body.client_secret
      }
    }, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
