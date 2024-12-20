import { writable } from 'svelte/store';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  content: string;
  readingTime?: string;
}

// Example blog posts
export const blogPosts: BlogPost[] = [
  {
    slug: 'getting-started-with-saas-templates',
    title: 'Getting Started with SaaS Templates',
    description: 'Learn how to effectively use and customize our SaaS templates for your next project.',
    date: '2024-01-15',
    author: 'John Doe',
    content: `
# Getting Started with SaaS Templates

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Why Use Templates?

- Save development time
- Professional design out of the box
- Best practices included

## Getting Started

1. Choose your template
2. Clone the repository
3. Customize to your needs

\`\`\`javascript
// Example configuration
{
  theme: 'modern',
  features: ['auth', 'dashboard', 'settings']
}
\`\`\`
    `
  },
  {
    slug: 'customizing-templates',
    title: 'Customizing Templates for Your Brand',
    description: 'A comprehensive guide to customizing our templates to match your brand identity.',
    date: '2024-01-20',
    author: 'Jane Smith',
    content: `
# Customizing Templates

Learn how to make our templates truly yours...
    `
  }
];

export const blogStore = writable(blogPosts); 