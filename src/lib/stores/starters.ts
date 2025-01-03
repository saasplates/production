import { writable } from 'svelte/store';

export interface Feature {
  title: string;
  description: string;
}

export interface ContentLink {
  text: string;
  url: string;
}

export interface CustomContent {
  title: string;
  description: string;
  links?: ContentLink[];
}

export interface StarterChild {
  title: string;
  content: string;
  icon?: any;
}

export interface Starter {
  id: string;
  title: string;
  description: string;
  image: string;
  mainImage?: string;
  framework: string[];
  category: 'auth' | 'payment' | 'database' | 'api' | 'ui' | 'testing';
  price: 'Free' | 'Paid';
  priceAmount?: string;
  demoUrl?: string;
  visitUrl?: string;
  sourceCodeUrl?: string;
  featured?: boolean;
  sponsored?: boolean;
  features?: Feature[];
  customContent?: CustomContent[];
  children?: StarterChild[];
}

export const starters: Starter[] = [
  {
    id: 'nextjs-subscription-payments',
    title: 'Next.js Subscription Payments Starter',
    description: 'The all-in-one starter kit for high-performance SaaS applications, powered by Stripe, Supabase, and Vercel.',
    image: '/starter/stripe-subscription.webp',
    mainImage: '/starter/stripe-subscription-main.webp',
    framework: ['Next.js', 'TypeScript', 'Supabase', 'Stripe'],
    category: 'payment',
    price: 'Free',
    sourceCodeUrl: 'https://github.com/vercel/nextjs-subscription-payments',
    featured: true,
    features: [
      {
        title: 'User Authentication',
        description: 'Secure user management and authentication with Supabase'
      },
      {
        title: 'Database Management',
        description: 'Powerful data access & management tooling on top of PostgreSQL with Supabase'
      },
      {
        title: 'Stripe Integration',
        description: 'Integration with Stripe Checkout and the Stripe customer portal'
      },
      {
        title: 'Webhook Sync',
        description: 'Automatic syncing of pricing plans and subscription statuses via Stripe webhooks'
      }
    ]
  }
];

export const starterStore = writable(starters); 