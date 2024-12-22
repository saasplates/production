import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { boilerplates } from '$lib/stores/boilerplates';

export const load: PageLoad = ({ params }) => {
  const boilerplate = boilerplates.find(t => t.id === params.id);
  
  if (!boilerplate) {
    throw error(404, 'Boilerplate not found');
  }

  return {
    boilerplate
  };
}; 