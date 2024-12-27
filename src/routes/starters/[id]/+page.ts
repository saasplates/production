import { error } from '@sveltejs/kit';
import { starters } from '$lib/stores/starters';

export function load({ params }) {
  const starter = starters.find(s => s.id === params.id);

  if (!starter) {
    throw error(404, 'Starter not found');
  }

  return {
    starter
  };
} 