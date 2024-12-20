import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { templates } from '$lib/stores/templates';

export const load: PageLoad = ({ params }) => {
  const template = templates.find(t => t.id === params.id);
  
  if (!template) {
    throw error(404, 'Template not found');
  }

  return {
    template
  };
}; 