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
//   {
//     id: 'next-auth-starter',
//     title: 'Next.js Auth Starter',
//     description: 'Authentication starter with Next-Auth, including email/password, OAuth, and magic links.',
//     image: '/starter/next-auth.webp',
//     mainImage: '/starter/next-auth-main.webp',
//     framework: ['Next.js', 'TypeScript', 'NextAuth.js'],
//     category: 'auth',
//     price: 'Free',
//     demoUrl: 'https://next-auth-example.vercel.app/',
//     sourceCodeUrl: 'https://github.com/nextauthjs/next-auth-example',
//     featured: true,
//     features: [
//       {
//         title: 'Multiple Auth Providers',
//         description: 'Support for OAuth (Google, GitHub), Magic Links, and Email/Password'
//       },
//       {
//         title: 'Session Management',
//         description: 'Built-in session handling with JWT and database sessions'
//       },
//       {
//         title: 'Protected Routes',
//         description: 'Route protection with middleware and hooks'
//       }
//     ]
//   },
//   {
//     id: 'stripe-payment-starter',
//     title: 'Stripe Payment Integration',
//     description: 'Complete payment solution with Stripe including checkout, subscriptions, and webhooks.',
//     image: '/starter/stripe-payment.webp',
//     mainImage: '/starter/stripe-payment-main.webp',
//     framework: ['Next.js', 'TypeScript', 'Stripe'],
//     category: 'payment',
//     price: 'Free',
//     demoUrl: 'https://stripe-payment-demo.vercel.app/',
//     sourceCodeUrl: 'https://github.com/stripe-samples/accept-a-payment',
//     features: [
//       {
//         title: 'Payment Processing',
//         description: 'One-time payments and subscription handling with Stripe Checkout'
//       },
//       {
//         title: 'Webhook Integration',
//         description: 'Complete webhook setup for payment events'
//       },
//       {
//         title: 'Customer Portal',
//         description: 'Built-in customer portal for subscription management'
//       }
//     ]
//   },
//   {
//     id: 'prisma-starter',
//     title: 'Prisma Database Starter',
//     description: 'Type-safe database operations with Prisma ORM, migrations, and seeding.',
//     image: '/starter/prisma-db.webp',
//     mainImage: '/starter/prisma-db-main.webp',
//     framework: ['TypeScript', 'Prisma', 'PostgreSQL'],
//     category: 'database',
//     price: 'Free',
//     sourceCodeUrl: 'https://github.com/prisma/prisma-examples',
//     features: [
//       {
//         title: 'Database Setup',
//         description: 'Complete PostgreSQL setup with Prisma Schema and migrations'
//       },
//       {
//         title: 'CRUD Operations',
//         description: 'Type-safe CRUD operations with Prisma Client'
//       },
//       {
//         title: 'Data Seeding',
//         description: 'Database seeding scripts and fixtures'
//       }
//     ]
//   }
];

export const starterStore = writable(starters); 