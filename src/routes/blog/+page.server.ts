import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const posts = await Promise.all(
    Object.entries(import.meta.glob('/src/content/blog/*.md')).map(async ([path, resolver]) => {
      const { metadata } = await resolver() as any;
      const slug = path.split('/').pop()?.replace('.md', '');
      
      return {
        slug,
        ...metadata
      };
    })
  );

  // Sort posts by date
  return {
    posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  };
}; 