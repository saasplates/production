import type { Writable } from 'svelte/store';
import { writable, derived } from 'svelte/store';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  authorId: string;
  tags: string[];
  content?: string;
  publishedAt?: string;
}

// Initialize empty store
export const blogStore: Writable<BlogPost[]> = writable([]);

// Derived store for post counts by author
export const authorPostCounts = derived(blogStore, ($posts) => {
  const counts = new Map<string, number>();
  
  $posts.forEach(post => {
    const currentCount = counts.get(post.authorId) || 0;
    counts.set(post.authorId, currentCount + 1);
  });
  
  return counts;
});

// Function to load blog posts
export async function loadBlogPosts() {
  const modules = import.meta.glob('/src/content/blog/*.md');
  const deployDate = new Date().toISOString();

  const posts = await Promise.all(
    Object.entries(modules).map(async ([path, resolver]) => {
      const { metadata, default: content } = await resolver();
      const slug = path.split('/').pop()?.replace('.md', '');
      
      return {
        slug,
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        authorId: metadata.author,
        tags: metadata.tags || [],
        content,
        publishedAt: deployDate
      };
    })
  );

  // Sort by date descending
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  blogStore.set(sortedPosts);
  return sortedPosts;
} 