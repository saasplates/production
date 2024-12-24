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
    id: 'nuxt-ui-pro-saas',
    title: 'Nuxt UI Pro Saas',
    description: 'A SaaS template made with Nuxt UI Pro.',
    image: '/plate/nuxt-saas.webp',
    framework: ['Nuxt'],
    price: 'Free',
    demoUrl: 'https://saas-template.nuxt.dev/'
  },
  {
    id: 'remix-saas',
    title: 'Remix SaaS',
    description: 'A Lightweight, Production-Ready Remix Stack for your next SaaS application.',
    image: '/plate/remix-saas.webp',
    framework: ['Remix'],
    price: 'Free',
    featured: true,
    demoUrl: '/boilerplates/remix-saas'
  },
  {
    id: 'larafast',
    title: 'Larafast',
    description: 'Convert visitors with this optimized SaaS Laravel',
    image: '/plate/larafast.webp',
    framework: ['Laravel'],
    price: 'Paid',
    demoUrl: '/boilerplates/larafast',
    sponsored: true
  }
];

export const boilerplateStore = writable(boilerplates); 