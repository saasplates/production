import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../../../content/blog/${params.slug}.md`);
    const { metadata, default: component } = post;

    if (!metadata) {
      throw error(404, 'Post not found');
    }

    return {
      post: {
        slug: params.slug,
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        authorId: metadata.author,
        tags: metadata.tags,
        content: component,
        ogImage: metadata.ogImage,
        image: metadata.image,
        publishedAt: new Date().toISOString()
      }
    };
  } catch (e) {
    console.error('Error loading post:', e, params.slug);
    throw error(404, 'Post not found');
  }
}; 