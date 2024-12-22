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
    description: 'Clean and modern dashboard boilerplate with dark mode support',
    seoTitle: 'Next.js SaaS Starter on SaasPlates',
    seoDescription: 'Next.js SaaS Starter by Leerob on SaasPlates with lots of full stack features.',
    image: '/placeholder.png',
    category: 'Dashboard',
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
    description: 'Convert visitors with this optimized SaaS landing page',
    image: '/placeholder.png',
    category: 'Landing Page',
    demoUrl: '/boilerplates/saas-landing',
    features: ['Hero section', 'Feature grid', 'Testimonials', 'Pricing tables'],
    sponsored: true,
  },
  {
    id: 'admin-pro',
    title: 'Admin Pro',
    description: 'Feature-rich admin panel with advanced analytics',
    image: '/placeholder.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/admin-pro',
    features: ['User management', 'Analytics dashboard', 'Settings panel', 'Activity logs'],
  },
  {
    id: 'auth-starter',
    title: 'Auth Starter',
    description: 'Complete authentication flow with social login',
    image: '/placeholder.png',
    category: 'Authentication',
    demoUrl: '/boilerplates/auth-starter',
    features: ['Social login', 'Password reset', '2FA support', 'Profile management'],
  },
  {
    id: 'minimal-dashboard',
    title: 'Minimal Dashboard',
    description: 'Minimalist dashboard focused on essential features',
    image: '/placeholder.png',
    category: 'Dashboard',
    demoUrl: '/boilerplates/minimal-dashboard',
    features: ['Clean UI', 'Performance optimized', 'Essential widgets', 'Quick actions'],
  },
  {
    id: 'startup-landing',
    title: 'Startup Landing',
    description: 'Modern landing page perfect for startups',
    image: '/placeholder.png',
    category: 'Landing Page',
    demoUrl: '/boilerplates/startup-landing',
    features: ['Animated sections', 'Newsletter signup', 'Blog section', 'Contact form'],
  },
  {
    id: 'enterprise-admin',
    title: 'Enterprise Admin',
    description: 'Enterprise-grade admin panel with advanced features',
    image: '/placeholder.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/enterprise-admin',
    features: ['Role-based access', 'Audit logs', 'Batch operations', 'Export tools'],
  },
  {
    id: 'auth-enterprise',
    title: 'Auth Enterprise',
    description: 'Enterprise authentication system with SSO support',
    image: '/placeholder.png',
    category: 'Authentication',
    demoUrl: '/boilerplates/auth-enterprise',
    features: ['SSO integration', 'LDAP support', 'Audit logging', 'Compliance tools'],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Data visualization dashboard with real-time analytics',
    image: '/placeholder.png',
    category: 'Dashboard',
    demoUrl: '/boilerplates/analytics-dashboard',
    features: ['Real-time charts', 'Custom reports', 'Data filters', 'Export options'],
  },
  {
    id: 'marketing-landing',
    title: 'Marketing Landing',
    description: 'High-converting landing page for marketing campaigns',
    image: '/placeholder.png',
    category: 'Landing Page',
    demoUrl: '/boilerplates/marketing-landing',
    features: ['A/B testing ready', 'CTA optimization', 'Mobile optimized', 'Fast loading'],
  },
  {
    id: 'team-dashboard',
    title: 'Team Dashboard',
    description: 'Collaborative dashboard for team productivity',
    image: '/placeholder.png',
    category: 'Dashboard',
    demoUrl: '/boilerplates/team-dashboard',
    features: ['Team calendar', 'Task management', 'Team chat', 'File sharing'],
  },
  {
    id: 'ecommerce-admin',
    title: 'E-commerce Admin',
    description: 'Complete admin panel for e-commerce platforms',
    image: '/placeholder.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/ecommerce-admin',
    features: ['Order management', 'Inventory tracking', 'Customer insights', 'Sales analytics'],
  },
  {
    id: 'subscription-landing',
    title: 'Subscription Landing',
    description: 'Modern landing page for subscription services',
    image: '/placeholder.png',
    category: 'Landing Page',
    demoUrl: '/boilerplates/subscription-landing',
    features: ['Pricing tables', 'Feature comparison', 'FAQ section', 'Testimonials'],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Comprehensive project management dashboard',
    image: '/placeholder.png',
    category: 'Dashboard',
    demoUrl: '/boilerplates/project-management',
    features: ['Gantt charts', 'Resource allocation', 'Time tracking', 'Budget monitoring'],
  },
  {
    id: 'crm-dashboard',
    title: 'CRM Dashboard',
    description: 'Customer relationship management solution',
    image: '/placeholder.png',
    category: 'Dashboard',
    demoUrl: '/boilerplates/crm-dashboard',
    features: ['Lead tracking', 'Deal pipeline', 'Contact management', 'Email integration'],
  },
  {
    id: 'hr-admin',
    title: 'HR Admin Panel',
    description: 'Complete HR management system',
    image: '/placeholder.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/hr-admin',
    features: ['Employee profiles', 'Leave management', 'Payroll', 'Performance tracking'],
  },
  {
    id: 'startup-landing',
    title: 'Startup Landing',
    description: 'Modern landing page for tech startups',
    image: '/placeholder.png',
    category: 'Landing Page',
    demoUrl: '/boilerplates/startup-landing',
    features: ['Hero section', 'Feature showcase', 'Team section', 'Contact form'],
  },
  {
    id: 'inventory-management',
    title: 'Inventory Dashboard',
    description: 'Real-time inventory tracking system',
    image: '/placeholder.png',
    category: 'Dashboard',
    demoUrl: '/boilerplates/inventory-management',
    features: ['Stock tracking', 'Order management', 'Supplier portal', 'Reports'],
  },
  {
    id: 'saas-admin',
    title: 'SaaS Admin',
    description: 'Complete admin panel for SaaS applications',
    image: '/placeholder.png',
    category: 'Admin Panel',
    demoUrl: '/boilerplates/saas-admin',
    features: ['Subscription management', 'Customer portal', 'Billing integration', 'Support tickets'],
  },
  {
    id: 'auth-plus',
    title: 'Auth Plus',
    description: 'Advanced authentication system with security features',
    image: '/placeholder.png',
    category: 'Authentication',
    demoUrl: '/boilerplates/auth-plus',
    features: ['Biometric auth', 'Device management', 'Security logs', 'Privacy controls'],
  }
];

export const boilerplateStore = writable(boilerplates); 