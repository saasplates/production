import { writable } from 'svelte/store';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  location?: string;
  company?: string;
  website?: string;
  twitter?: string;
  expertise: string[];
}

export const authors: Author[] = [
  {
    id: 'johndoe',
    name: 'John Doe',
    avatar: '/authors/john-doe.jpg',
    role: 'Technical Writer & Developer',
    bio: 'Writing about web development, SaaS architecture, and developer tools. Former engineer at Google.',
    location: 'San Francisco, CA',
    company: 'TechBlog',
    website: 'https://johndoe.dev',
    twitter: '@johndoewrites',
    expertise: ['Web Development', 'SaaS Architecture', 'Developer Tools']
  },
  {
    id: 'sarahsmith',
    name: 'Sarah Smith',
    avatar: '/authors/sarah-smith.jpg',
    role: 'Developer Advocate',
    bio: 'Explaining complex technical concepts in simple terms. Focused on React, TypeScript, and web performance.',
    location: 'London, UK',
    company: 'DevEducate',
    website: 'https://sarahsmith.dev',
    twitter: '@sarahteaches',
    expertise: ['React', 'TypeScript', 'Web Performance']
  },
  {
    id: 'mikewong',
    name: 'Mike Wong',
    avatar: '/authors/mike-wong.jpg',
    role: 'Cloud Architect',
    bio: 'Writing about cloud architecture, serverless, and DevOps best practices. AWS Community Builder.',
    location: 'Singapore',
    company: 'CloudScale',
    website: 'https://mikewong.cloud',
    twitter: '@mikeclouddev',
    expertise: ['AWS', 'Serverless', 'DevOps']
  },
  {
    id: 'annapatel',
    name: 'Anna Patel',
    avatar: '/authors/anna-patel.jpg',
    role: 'UI/UX Specialist',
    bio: 'Sharing insights about UI design, user experience, and accessibility in modern web applications.',
    location: 'Toronto, Canada',
    company: 'DesignInsights',
    website: 'https://annapatel.design',
    twitter: '@annauxwrites',
    expertise: ['UI Design', 'Accessibility', 'User Experience']
  },
  {
    id: 'carlosrodriguez',
    name: 'Carlos Rodriguez',
    avatar: '/authors/carlos-rodriguez.jpg',
    role: 'Security Expert',
    bio: 'Writing about web security, authentication best practices, and secure coding patterns.',
    location: 'Madrid, Spain',
    company: 'SecureWeb',
    website: 'https://carlos.security',
    twitter: '@carlosecwrites',
    expertise: ['Web Security', 'Authentication', 'Secure Coding']
  }
];

export const authorStore = writable(authors); 