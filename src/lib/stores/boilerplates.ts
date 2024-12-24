import { writable } from 'svelte/store';

export interface Boilerplate {
  id: string;
  title: string;
  description: string;
  image: string;
  framework: string[];
  price: 'Free' | 'Paid';
  demoUrl: string;
  featured?: boolean;
  sponsored?: boolean;
}

export const boilerplates: Boilerplate[] = [
  {
    id: 'next-saas-starter',
    title: 'Next.js SaaS Starter',
    description: 'Clean and modern Next.js boilerplate with dark mode support',
    image: '/plate/nextjs-saas-starter.png',
    framework: ['Next.js'],
    price: 'Free',
    demoUrl: '/boilerplates/next-saas-starter',
    featured: true
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Comprehensive project management Next.js',
    image: '/plate/nextjs-saas-starter.png',
    framework: ['Next.js'],
    price: 'Free',
    demoUrl: '/boilerplates/project-management'
  },
  {
    id: 'enterprise-admin',
    title: 'Enterprise Admin',
    description: 'Enterprise-grade admin panel with advanced features',
    image: '/plate/nextjs-saas-starter.png',
    framework: ['Remix'],
    price: 'Paid',
    demoUrl: '/boilerplates/enterprise-admin'
  },
  {
    id: 'remix-saas',
    title: 'Remix SaaS',
    description: 'A Lightweight, Production-Ready Remix Stack for your next SaaS application.',
    image: '/plate/remix-saas.png',
    framework: ['Remix'],
    price: 'Free',
    featured: true,
    demoUrl: '/boilerplates/remix-saas'
  },
  {
    id: 'svelte-starter',
    title: 'Svelte Starter',
    description: 'Modern SvelteKit starter template with essential features',
    image: '/plate/nextjs-saas-starter.png',
    framework: ['SvelteKit'],
    price: 'Free',
    demoUrl: '/boilerplates/svelte-starter'
  },
  {
    id: 'larafast',
    title: 'Larafast',
    description: 'Convert visitors with this optimized SaaS Laravel',
    image: '/plate/nextjs-saas-starter.png',
    framework: ['Laravel'],
    price: 'Free',
    demoUrl: '/boilerplates/larafast',
    sponsored: true
  }
];

export const boilerplateStore = writable(boilerplates); 