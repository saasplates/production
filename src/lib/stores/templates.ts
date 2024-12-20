import { writable } from 'svelte/store';

export interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'dashboard' | 'landing' | 'auth' | 'admin';
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

export const templates: Template[] = [
  {
    id: 'modern-dashboard',
    title: 'Modern Dashboard',
    description: 'Clean and modern dashboard template with dark mode support',
    seoTitle: 'Modern Dashboard Template | React & Tailwind Admin Panel',
    seoDescription: 'Professional dashboard template with dark mode, responsive layout, and real-time data visualization. Built with React and Tailwind CSS.',
    image: '/templates/dashboard-1.png',
    category: 'dashboard',
    demoUrl: '/templates/modern-dashboard',
    features: ['Dark mode', 'Responsive layout', 'Interactive charts', 'Data tables'],
    featured: true,
    techStack: ['React', 'Tailwind CSS', 'TypeScript', 'Chart.js'],
    pricing: {
      amount: 49,
      currency: 'USD'
    },
    lastUpdated: '2024-01-15',
    version: '2.1.0',
  },
  {
    id: 'saas-landing',
    title: 'SaaS Landing',
    description: 'Convert visitors with this optimized SaaS landing page',
    image: '/templates/landing-1.png',
    category: 'landing',
    demoUrl: '/templates/saas-landing',
    features: ['Hero section', 'Feature grid', 'Testimonials', 'Pricing tables'],
    sponsored: true,
  },
  {
    id: 'admin-pro',
    title: 'Admin Pro',
    description: 'Feature-rich admin panel with advanced analytics',
    image: '/templates/admin-1.png',
    category: 'admin',
    demoUrl: '/templates/admin-pro',
    features: ['User management', 'Analytics dashboard', 'Settings panel', 'Activity logs'],
  },
  {
    id: 'auth-starter',
    title: 'Auth Starter',
    description: 'Complete authentication flow with social login',
    image: '/templates/auth-1.png',
    category: 'auth',
    demoUrl: '/templates/auth-starter',
    features: ['Social login', 'Password reset', '2FA support', 'Profile management'],
  },
  {
    id: 'minimal-dashboard',
    title: 'Minimal Dashboard',
    description: 'Minimalist dashboard focused on essential features',
    image: '/templates/dashboard-2.png',
    category: 'dashboard',
    demoUrl: '/templates/minimal-dashboard',
    features: ['Clean UI', 'Performance optimized', 'Essential widgets', 'Quick actions'],
  },
  {
    id: 'startup-landing',
    title: 'Startup Landing',
    description: 'Modern landing page perfect for startups',
    image: '/templates/landing-2.png',
    category: 'landing',
    demoUrl: '/templates/startup-landing',
    features: ['Animated sections', 'Newsletter signup', 'Blog section', 'Contact form'],
  },
  {
    id: 'enterprise-admin',
    title: 'Enterprise Admin',
    description: 'Enterprise-grade admin panel with advanced features',
    image: '/templates/admin-2.png',
    category: 'admin',
    demoUrl: '/templates/enterprise-admin',
    features: ['Role-based access', 'Audit logs', 'Batch operations', 'Export tools'],
  },
  {
    id: 'auth-enterprise',
    title: 'Auth Enterprise',
    description: 'Enterprise authentication system with SSO support',
    image: '/templates/auth-2.png',
    category: 'auth',
    demoUrl: '/templates/auth-enterprise',
    features: ['SSO integration', 'LDAP support', 'Audit logging', 'Compliance tools'],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Comprehensive analytics dashboard with real-time data',
    image: '/templates/dashboard-3.png',
    category: 'dashboard',
    demoUrl: '/templates/analytics-dashboard',
    features: ['Real-time data', 'Custom reports', 'Data export', 'Alert system'],
  },
  {
    id: 'product-landing',
    title: 'Product Landing',
    description: 'Product-focused landing page with conversion optimization',
    image: '/templates/landing-3.png',
    category: 'landing',
    demoUrl: '/templates/product-landing',
    features: ['Product showcase', 'Customer reviews', 'FAQ section', 'Integration demos'],
  },
  {
    id: 'saas-admin',
    title: 'SaaS Admin',
    description: 'Complete admin panel for SaaS applications',
    image: '/templates/admin-3.png',
    category: 'admin',
    demoUrl: '/templates/saas-admin',
    features: ['Subscription management', 'Customer portal', 'Billing integration', 'Support tickets'],
  },
  {
    id: 'auth-plus',
    title: 'Auth Plus',
    description: 'Advanced authentication system with security features',
    image: '/templates/auth-3.png',
    category: 'auth',
    demoUrl: '/templates/auth-plus',
    features: ['Biometric auth', 'Device management', 'Security logs', 'Privacy controls'],
  }
];

export const templateStore = writable(templates); 