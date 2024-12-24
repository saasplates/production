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
  pngImage?: string;
  framework: string[];
  price: 'Free' | 'Paid';
  demoUrl: string;
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
    description: 'Clean and modern Next.js boilerplate with dark mode support',
    image: '/plate/nextjs-saas-starter.webp',
    pngImage: '/plate/nextjs-saas-starter.png',
    framework: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    price: 'Free',
    demoUrl: '/boilerplates/next-saas-starter',
    featured: true,
    features: [
      {
        title: 'Dark Mode Support',
        description: 'Built-in dark mode with system preference detection'
      },
      {
        title: 'TypeScript Ready',
        description: 'Fully typed codebase with TypeScript configuration'
      }
    ],
    customContent: [
      {
        title: 'Getting Started',
        description: 'Clone the repository and install dependencies to get started.',
        links: [
          {
            text: 'Documentation',
            url: '#'
          },
          {
            text: 'GitHub Repository',
            url: '#'
          }
        ]
      }
    ],
    children: [
      {
        title: 'Installation',
        content: `
          <pre class="bg-gray-50 p-4 rounded-md"><code>git clone https://github.com/your-repo/next-saas-starter
npm install
npm run dev</code></pre>
        `
      },
      {
        title: 'Key Features',
        content: `
          <ul class="list-disc pl-4">
            <li>Authentication with NextAuth.js</li>
            <li>Database integration with Prisma</li>
            <li>Stripe payment integration</li>
            <li>Email notifications with React Email</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 'nuxt-ui-pro-saas',
    title: 'Nuxt UI Pro Saas',
    description: 'A SaaS template made with Nuxt UI Pro.',
    image: '/plate/nuxt-saas.webp',
    pngImage: '/plate/nuxt-saas.png',
    framework: ['Nuxt'],
    price: 'Free',
    demoUrl: 'https://saas-template.nuxt.dev/'
  },
  {
    id: 'remix-saas',
    title: 'Remix SaaS',
    description: 'A Lightweight, Production-Ready Remix Stack for your next SaaS application.',
    image: '/plate/remix-saas.webp',
    pngImage: '/plate/remix-saas.png',
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
    pngImage: '/plate/larafast.png',
    framework: ['Laravel'],
    price: 'Paid',
    demoUrl: '/boilerplates/larafast',
    sponsored: true
  }
];

export const boilerplateStore = writable(boilerplates); 