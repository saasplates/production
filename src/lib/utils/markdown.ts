import { parse } from 'yaml';
import type { BlogPost } from '$lib/stores/blog';

export async function getPost(slug: string): Promise<BlogPost> {
  const post = await import(`../../content/blog/${slug}.md`);
  const { metadata } = post;
  
  return {
    slug,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    authorId: metadata.author,
    tags: metadata.tags,
    readingTime: calculateReadingTime(post.default)
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = import.meta.glob('../../content/blog/*.md');
  const allPosts = await Promise.all(
    Object.entries(posts).map(async ([path, resolver]) => {
      const slug = path.split('/').pop()?.replace('.md', '');
      return await getPost(slug!);
    })
  );
  
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
} 