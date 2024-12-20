import { getAllPosts } from '$lib/utils/markdown';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const posts = await getAllPosts();
  return { posts };
};

export type PageData = {
  posts: Post[];
}; 