import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { boilerplateStore } from '$lib/stores/boilerplates';

export const load: PageLoad = ({ params }) => {
  const boilerplates = get(boilerplateStore);
  const boilerplate = boilerplates.find(t => t.id === params.id);
  
  if (!boilerplate) {
    throw error(404, 'Boilerplate not found');
  }

  return {
    boilerplate
  };
}; 