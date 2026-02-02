export const prerender = false;

export async function GET() {
  const hasClientId = !!import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const hasClientSecret = !!import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const hasSecret = !!import.meta.env.KEYSTATIC_SECRET;
  
  const clientSecretStart = import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET 
    ? import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET.substring(0, 5) + '...'
    : 'MISSING';

  return new Response(JSON.stringify({
    ok: true,
    env: {
       KEYSTATIC_GITHUB_CLIENT_ID: hasClientId ? 'PRESENT' : 'MISSING',
       KEYSTATIC_GITHUB_CLIENT_SECRET: hasClientSecret ? `PRESENT (${clientSecretStart})` : 'MISSING',
       KEYSTATIC_SECRET: hasSecret ? 'PRESENT' : 'MISSING'
    },
    site: import.meta.env.SITE,
    prod: import.meta.env.PROD
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
