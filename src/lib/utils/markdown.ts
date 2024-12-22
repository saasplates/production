import type { BlogPost } from '$lib/stores/blog';

export async function getPost(slug: string): Promise<BlogPost> {
  try {
    const post = await import(`../../content/blog/${slug}.md`);
    const { metadata, default: content } = post;
    
    if (!metadata) {
      throw new Error('No metadata found for post');
    }

    return {
      slug,
      title: metadata.title || '',
      description: metadata.description || '',
      date: metadata.date || new Date().toISOString(),
      authorId: metadata.author || '',
      tags: metadata.tags || [],
      readingTime: calculateReadingTime(content?.render?.()?.html || '')
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    throw error;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = import.meta.glob('../../content/blog/*.md');
    const allPosts = await Promise.all(
      Object.entries(posts).map(async ([path, resolver]) => {
        const slug = path.split('/').pop()?.replace('.md', '');
        return await getPost(slug!);
      })
    );
    
    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

function calculateReadingTime(content: string): string {
  if (!content) return '1 min read';
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
} 