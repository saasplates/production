import { writable } from 'svelte/store';

export interface Boilerplate {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  demoUrl: string;
  features: string[];
  featured?: boolean;
  sponsored?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  techStack?: string[];
  pricing?: {
    amount: number;
    currency: string;
    period?: string;
  };
  lastUpdated?: string;
  version?: string;
}

export const boilerplates: Boilerplate[] = [
  {
    id: 'next-saas-starter',
    title: 'Next.js SaaS Starter',
    description: 'Clean and modern Next.js boilerplate with dark mode support',
    seoTitle: 'Next.js SaaS Starter on SaasPlates',
    seoDescription: 'Next.js SaaS Starter by Leerob on SaasPlates with lots of full stack features.',
    image: '/plate/nextjs-saas-starter.png',
    category: ['Next.js', 'Free'], 
    demoUrl: '/boilerplates/next-saas-starter',
    features: ['Drizzle', 'NextAuth', 'Shadcn', 'Tailwind', 'TypeScript', 'React', 'Next.js'],
    featured: true,
    techStack: ['Next.js', 'Drizzle', 'TypeScript', 'Chart.js'],
    pricing: {
      amount: 0,
      currency: 'USD'
    },
    lastUpdated: '2024-01-15',
    version: '2.1.0',
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Comprehensive project management Next.js',
    image: '/plate/nextjs-saas-starter.png',
    category: ['Next.js', 'Free'],
    demoUrl: '/boilerplates/project-management',
    features: ['Gantt charts', 'Resource allocation', 'Time tracking', 'Budget monitoring'],
  },
  {
    id: 'enterprise-admin',
    title: 'Enterprise Admin',
    description: 'Enterprise-grade admin panel with advanced features',
    image: '/plate/nextjs-saas-starter.png',
    category: ['Remix', 'Free'],
    demoUrl: '/boilerplates/enterprise-admin',
    features: ['Role-based access', 'Audit logs', 'Batch operations', 'Export tools'],
  },
  {
    id: 'hr-admin',
    title: 'HR Admin Panel',
    description: 'Complete HR management system',
    image: '/plate/nextjs-saas-starter.png',
    category: ['Remix', 'Free'],
    demoUrl: '/boilerplates/hr-admin',
    features: ['Employee profiles', 'Leave management', 'Payroll', 'Performance tracking'],
  },
  {
    id: 'svelte-starter',
    title: 'Svelte Starter',
    description: 'Modern SvelteKit starter template with essential features',
    image: '/plate/nextjs-saas-starter.png',
    category: ['SvelteKit', 'Free'],
    demoUrl: '/boilerplates/svelte-starter',
    features: ['Authentication', 'Database integration', 'UI Components', 'API Routes'],
  },
  {
    id: 'saas-landing',
    title: 'SaaS Landing',
    description: 'Convert visitors with this optimized SaaS Laravel',
    image: '/plate/nextjs-saas-starter.png',
    category: ['Laravel', 'Free'],
    demoUrl: '/boilerplates/saas-landing',
    features: ['Hero section', 'Feature grid', 'Testimonials', 'Pricing tables'],
    sponsored: true,
  }
];

export const boilerplateStore = writable(boilerplates); 