import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export interface AuthorStats {
  totalPosts: number;
  joinedDate: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location?: string;
  twitter?: string;
  website?: string;
  stats: AuthorStats;
}

export const authors: Author[] = [
  {
    id: 'arjun',
    name: 'Arjun Aditya',
    role: 'Full Stack Developer',
    bio: 'Passionate about building scalable web applications and sharing knowledge with the developer community. Specialized in React, Svelte, and TypeScript.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
    location: 'Chandigarh, India',
    twitter: '@arjvnz',
    website: 'https://arjunaditya.xyz',
    stats: {
      totalPosts: 5,
      joinedDate: '2023-12-01'
    }
  },
  {
    id: 'kritika',
    name: 'Kritika Chaudhary',
    role: 'UI/UX Designer & Developer',
    bio: 'Design-focused developer creating beautiful, user-friendly interfaces. Expert in TailwindCSS, Figma, and frontend development.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kritika',
    location: 'Pune, India',
    twitter: '@kaykritika',
    website: 'https://bento.me/kaykritika',
    stats: {
      totalPosts: 3,
      joinedDate: '2024-01-15'
    }
  }
];

export const authorsStore: Writable<Author[]> = writable(authors); 