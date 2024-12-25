import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { boilerplates } from '$lib/stores/boilerplates';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';

const interRegular = await fetch(
    'https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/Inter-Regular.woff'
).then((res) => res.arrayBuffer());

const interBold = await fetch(
    'https://raw.githubusercontent.com/rsms/inter/master/docs/font-files/Inter-Bold.woff'
).then((res) => res.arrayBuffer());

export const GET: RequestHandler = async ({ params }) => {
    const boilerplate = boilerplates.find(b => b.id === params.id);
    
    if (!boilerplate) {
        throw error(404, 'Boilerplate not found');
    }

    const markup = toReactNode(`
        <div style="display: flex; flex-direction: column; width: 100%; height: 100%; background: #000000; padding: 48px; color: white;">
            <div style="display: flex; flex-direction: column; flex-grow: 1;">
                <h1 style="font-size: 48px; font-weight: bold; margin: 0;">${boilerplate.title}</h1>
                <p style="font-size: 24px; margin-top: 16px;">${boilerplate.description}</p>
            </div>
            <div style="display: flex; align-items: center; margin-top: 32px;">
                <span style="font-size: 20px;">boilerplates.vercel.app</span>
            </div>
        </div>
    `);

    const svg = await satori(markup, {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: 'Inter',
                data: interRegular,
                weight: 400,
                style: 'normal',
            },
            {
                name: 'Inter',
                data: interBold,
                weight: 700,
                style: 'normal',
            },
        ],
    });

    const resvg = new Resvg(svg);
    const pngBuffer = resvg.render().asPng();

    return new Response(pngBuffer, {
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable'
        },
    });
}; 