import { writable } from 'svelte/store';
import type { Author } from './authors';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  authorId: string;
  readingTime?: string;
  tags?: string[];
}

// This will be populated from markdown files
export const blogPosts: BlogPost[] = [];
export const blogStore = writable(blogPosts); 