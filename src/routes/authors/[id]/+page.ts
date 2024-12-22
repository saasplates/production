import { loadBlogPosts } from '$lib/stores/blog';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const posts = await loadBlogPosts();
  return { posts };
}; 