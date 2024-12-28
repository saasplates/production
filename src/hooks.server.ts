import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    
    // Add cache control headers for font files
    if (event.url.pathname.startsWith('/fonts/') && event.url.pathname.endsWith('.ttf')) {
        response.headers.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
        response.headers.set('Access-Control-Allow-Origin', '*');
    }
    
    return response;
}; 