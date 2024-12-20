import { getPost } from '$lib/utils/markdown';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await getPost(params.slug);
    return { post };
  } catch (e) {
    throw error(404, 'Post not found');
  }
}; 