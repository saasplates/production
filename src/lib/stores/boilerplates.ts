import { writable } from 'svelte/store';

export interface Boilerplate {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
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
    category: 'Next.js',
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
    id: 'saas-landing',
    title: 'SaaS Landing',
    description: 'Convert visitors with this optimized SaaS Laravel',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Laravel',
    demoUrl: '/boilerplates/saas-landing',
    features: ['Hero section', 'Feature grid', 'Testimonials', 'Pricing tables'],
    sponsored: true,
  },
  {
    id: 'admin-pro',
    title: 'Admin Pro',
    description: 'Feature-rich admin panel with advanced analytics',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/admin-pro',
    features: ['User management', 'Analytics Next.js', 'Settings panel', 'Activity logs'],
  },
  {
    id: 'auth-starter',
    title: 'Auth Starter',
    description: 'Complete authentication flow with social login',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Authentication',
    demoUrl: '/boilerplates/auth-starter',
    features: ['Social login', 'Password reset', '2FA support', 'Profile management'],
  },
  {
    id: 'minimal-Next.js',
    title: 'Minimal Next.js',
    description: 'Minimalist Next.js focused on essential features',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Next.js',
    demoUrl: '/boilerplates/minimal-Next.js',
    features: ['Clean UI', 'Performance optimized', 'Essential widgets', 'Quick actions'],
  },
  {
    id: 'startup-landing',
    title: 'Startup Landing',
    description: 'Modern Laravel perfect for startups',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Laravel',
    demoUrl: '/boilerplates/startup-landing',
    features: ['Animated sections', 'Newsletter signup', 'Blog section', 'Contact form'],
  },
  {
    id: 'enterprise-admin',
    title: 'Enterprise Admin',
    description: 'Enterprise-grade admin panel with advanced features',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/enterprise-admin',
    features: ['Role-based access', 'Audit logs', 'Batch operations', 'Export tools'],
  },
  {
    id: 'auth-enterprise',
    title: 'Auth Enterprise',
    description: 'Enterprise authentication system with SSO support',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Authentication',
    demoUrl: '/boilerplates/auth-enterprise',
    features: ['SSO integration', 'LDAP support', 'Audit logging', 'Compliance tools'],
  },
  {
    id: 'analytics-Next.js',
    title: 'Analytics Next.js',
    description: 'Data visualization Next.js with real-time analytics',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Next.js',
    demoUrl: '/boilerplates/analytics-Next.js',
    features: ['Real-time charts', 'Custom reports', 'Data filters', 'Export options'],
  },
  {
    id: 'marketing-landing',
    title: 'Marketing Landing',
    description: 'High-converting Laravel for marketing campaigns',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Laravel',
    demoUrl: '/boilerplates/marketing-landing',
    features: ['A/B testing ready', 'CTA optimization', 'Mobile optimized', 'Fast loading'],
  },
  {
    id: 'team-Next.js',
    title: 'Team Next.js',
    description: 'Collaborative Next.js for team productivity',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Next.js',
    demoUrl: '/boilerplates/team-Next.js',
    features: ['Team calendar', 'Task management', 'Team chat', 'File sharing'],
  },
  {
    id: 'ecommerce-admin',
    title: 'Free Admin',
    description: 'Complete admin panel for Free platforms',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/ecommerce-admin',
    features: ['Order management', 'Inventory tracking', 'Customer insights', 'Sales analytics'],
  },
  {
    id: 'subscription-landing',
    title: 'Subscription Landing',
    description: 'Modern Laravel for subscription services',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Laravel',
    demoUrl: '/boilerplates/subscription-landing',
    features: ['Pricing tables', 'Feature comparison', 'FAQ section', 'Testimonials'],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Comprehensive project management Next.js',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Next.js',
    demoUrl: '/boilerplates/project-management',
    features: ['Gantt charts', 'Resource allocation', 'Time tracking', 'Budget monitoring'],
  },
  {
    id: 'crm-Next.js',
    title: 'CRM Next.js',
    description: 'Customer relationship management solution',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Next.js',
    demoUrl: '/boilerplates/crm-Next.js',
    features: ['Lead tracking', 'Deal pipeline', 'Contact management', 'Email integration'],
  },
  {
    id: 'hr-admin',
    title: 'HR Admin Panel',
    description: 'Complete HR management system',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/hr-admin',
    features: ['Employee profiles', 'Leave management', 'Payroll', 'Performance tracking'],
  },
  {
    id: 'startup-landing',
    title: 'Startup Landing',
    description: 'Modern Laravel for tech startups',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Laravel',
    demoUrl: '/boilerplates/startup-landing',
    features: ['Hero section', 'Feature showcase', 'Team section', 'Contact form'],
  },
  {
    id: 'inventory-management',
    title: 'Inventory Next.js',
    description: 'Real-time inventory tracking system',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Next.js',
    demoUrl: '/boilerplates/inventory-management',
    features: ['Stock tracking', 'Order management', 'Supplier portal', 'Reports'],
  },
  {
    id: 'saas-admin',
    title: 'SaaS Admin',
    description: 'Complete admin panel for SaaS applications',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/saas-admin',
    features: ['Subscription management', 'Customer portal', 'Billing integration', 'Support tickets'],
  },
  {
    id: 'auth-plus',
    title: 'Auth Plus',
    description: 'Advanced authentication system with security features',
    image: '/plate/nextjs-saas-starter.png',
    category: 'Authentication',
    demoUrl: '/boilerplates/auth-plus',
    features: ['Biometric auth', 'Device management', 'Security logs', 'Privacy controls'],
  }
];

export const boilerplateStore = writable(boilerplates); 