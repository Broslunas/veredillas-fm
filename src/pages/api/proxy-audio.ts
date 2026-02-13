
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return new Response('Missing url parameter', { status: 400 });
    }

    try {
        const headers = new Headers();
        // Forward Range header if present
        const range = request.headers.get('range');
        if (range) {
            headers.set('range', range);
        }

        const response = await fetch(targetUrl, {
            headers: headers
        });
        
        const newHeaders = new Headers();
        
        // Forward critical headers for streaming
        const headersToForward = [
            'content-type',
            'content-length',
            'content-range',
            'accept-ranges',
            'last-modified',
            'etag'
        ];

        headersToForward.forEach(header => {
            const value = response.headers.get(header);
            if (value) {
                newHeaders.set(header, value);
            }
        });
        
        // Add CORS headers
        newHeaders.set('Access-Control-Allow-Origin', '*');
        
        // Use upstream Cache-Control or default
        const cacheControl = response.headers.get('cache-control');
        if (cacheControl) {
            newHeaders.set('Cache-Control', cacheControl);
        } else {
            newHeaders.set('Cache-Control', 'public, max-age=3600'); 
        }

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
        });

    } catch (e: any) {
        return new Response(`Server Error: ${e.message}`, { status: 500 });
    }
}
