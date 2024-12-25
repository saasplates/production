import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { boilerplates } from '$lib/stores/boilerplates';

export const load: PageServerLoad = async ({ params }) => {
    const boilerplate = boilerplates.find(b => b.id === params.id);
    
    if (!boilerplate) {
        throw error(404, 'Boilerplate not found');
    }

    return {
        boilerplate,
        meta: {
            title: `${boilerplate.title} - Boilerplates`,
            description: boilerplate.description,
            image: `/api/og/boilerplate/${params.id}`,
            url: `/boilerplates/${params.id}`
        }
    };
}; 