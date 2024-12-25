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

export interface BoilerplateChild {
  title: string;
  content: string;
  icon?: any; // Component type for Svelte icons
}

export interface Boilerplate {
  id: string;
  title: string;
  description: string;
  image: string;
  mainImage?: string;
  framework: string[];
  price: 'Free' | 'Paid';
  demoUrl: string;
  sourceCodeUrl: string;
  featured?: boolean;
  sponsored?: boolean;
  features?: Feature[];
  customContent?: CustomContent[];
  children?: BoilerplateChild[];
}

export const boilerplates: Boilerplate[] = [
  {
    id: 'next-saas-starter',
    title: 'Next.js SaaS Starter',
    description: 'Get started quickly with Next.js, Postgres, Stripe, and shadcn/ui.',
    image: '/plate/nextjs-saas-starter.webp',
    mainImage: '/plate/nextjs-saas-starter-main.webp',
    framework: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Drizzle ORM'],
    price: 'Free',
    demoUrl: 'https://next-saas-start.vercel.app/',
    sourceCodeUrl: 'https://github.com/leerob/next-saas-starter',
    featured: true,
    features: [
      {
        title: 'Authentication System',
        description: 'Email/password authentication with JWT tokens stored in cookies'
      },
      {
        title: 'Stripe Integration',
        description: 'Complete payment system with Stripe Checkout and Customer Portal'
      },
      {
        title: 'Dashboard & CRUD',
        description: 'Full-featured dashboard with user/team management and CRUD operations'
      },
      {
        title: 'Role-Based Access Control',
        description: 'Built-in RBAC system with Owner and Member roles'
      },
      {
        title: 'Activity Logging',
        description: 'Comprehensive system for tracking user events and activities'
      }
    ],
    customContent: [
      {
        title: 'Tech Stack',
        description: 'Built with modern technologies for scalability and performance',
        links: [
          {
            text: 'Next.js Documentation',
            url: 'https://nextjs.org/docs'
          },
          {
            text: 'Stripe Documentation',
            url: 'https://stripe.com/docs'
          }
        ]
      },
      {
        title: 'Getting Started',
        description: 'Follow these steps to set up your development environment.',
        links: [
          {
            text: 'GitHub Repository',
            url: 'https://github.com/leerob/next-saas-starter'
          }
        ]
      }
    ],
    children: [
      {
        title: 'Installation',
        content: `
          <pre class="bg-gray-50 p-4 rounded-md"><code># Setup environment variables
pnpm db:setup

# Run database migrations and seed
pnpm db:migrate
pnpm db:seed

# Start development server
pnpm dev</code></pre>
        `
      },
      {
        title: 'Key Features',
        content: `
          <ul class="list-disc pl-4">
            <li>Marketing landing page with animated Terminal</li>
            <li>Pricing page with Stripe Checkout integration</li>
            <li>Dashboard with CRUD operations for users/teams</li>
            <li>Role-based access control (RBAC)</li>
            <li>Subscription management via Stripe Customer Portal</li>
            <li>Email/password authentication with JWT</li>
            <li>Global and local middleware protection</li>
            <li>Activity logging system</li>
          </ul>
        `
      },
      {
        title: 'Default Credentials',
        content: `
          <div class="bg-gray-50 p-4 rounded-md">
            <p><strong>Email:</strong> test@test.com</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        `
      }
    ]
  },
  {
    id: 'nuxt-ui-pro-saas',
    title: 'Nuxt UI Pro Saas',
    description: 'A SaaS template made with Nuxt UI Pro.',
    image: '/plate/nuxt-saas.webp',
    mainImage: '/plate/nuxt-saas-main.webp',
    framework: ['Nuxt'],
    price: 'Free',
    demoUrl: 'https://saas-template.nuxt.dev/'
  },
  {
    id: 'remix-saas',
    title: 'Remix SaaS',
    description: 'A Lightweight, Production-Ready Remix Stack for your next SaaS application.',
    image: '/plate/remix-saas.webp',
    mainImage: '/plate/remix-saas-main.webp',
    framework: ['Remix'],
    price: 'Free',
    featured: true,
    demoUrl: '/boilerplates/remix-saas'
  },
  {
    id: 'larafast',
    title: 'Larafast',
    description: 'Production ready SaaS Starter Kit with everything to start your SaaS app.',
    image: '/plate/larafast.webp',
    mainImage: '/plate/larafast-main.webp',
    framework: ['Laravel'],
    price: 'Paid',
    demoUrl: '/boilerplates/larafast',
    sponsored: true
  }
];

export const boilerplateStore = writable(boilerplates); 