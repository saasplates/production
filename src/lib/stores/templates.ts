import { writable } from 'svelte/store';

export interface Template {
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

export const templates: Template[] = [
  {
    id: 'modern-dashboard',
    title: 'Modern Dashboard',
    description: 'Clean and modern dashboard template with dark mode support',
    seoTitle: 'Modern Dashboard Template | React & Tailwind Admin Panel',
    seoDescription: 'Professional dashboard template with dark mode, responsive layout, and real-time data visualization. Built with React and Tailwind CSS.',
    image: '/templates/dashboard-1.png',
    category: 'Dashboard',
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
    category: 'Landing Page',
    demoUrl: '/templates/saas-landing',
    features: ['Hero section', 'Feature grid', 'Testimonials', 'Pricing tables'],
    sponsored: true,
  },
  {
    id: 'admin-pro',
    title: 'Admin Pro',
    description: 'Feature-rich admin panel with advanced analytics',
    image: '/templates/admin-1.png',
    category: 'Admin Panel',
    demoUrl: '/templates/admin-pro',
    features: ['User management', 'Analytics dashboard', 'Settings panel', 'Activity logs'],
  },
  {
    id: 'auth-starter',
    title: 'Auth Starter',
    description: 'Complete authentication flow with social login',
    image: '/templates/auth-1.png',
    category: 'Authentication',
    demoUrl: '/templates/auth-starter',
    features: ['Social login', 'Password reset', '2FA support', 'Profile management'],
  },
  {
    id: 'minimal-dashboard',
    title: 'Minimal Dashboard',
    description: 'Minimalist dashboard focused on essential features',
    image: '/templates/dashboard-2.png',
    category: 'Dashboard',
    demoUrl: '/templates/minimal-dashboard',
    features: ['Clean UI', 'Performance optimized', 'Essential widgets', 'Quick actions'],
  },
  {
    id: 'startup-landing',
    title: 'Startup Landing',
    description: 'Modern landing page perfect for startups',
    image: '/templates/landing-2.png',
    category: 'Landing Page',
    demoUrl: '/templates/startup-landing',
    features: ['Animated sections', 'Newsletter signup', 'Blog section', 'Contact form'],
  },
  {
    id: 'enterprise-admin',
    title: 'Enterprise Admin',
    description: 'Enterprise-grade admin panel with advanced features',
    image: '/templates/admin-2.png',
    category: 'Admin Panel',
    demoUrl: '/templates/enterprise-admin',
    features: ['Role-based access', 'Audit logs', 'Batch operations', 'Export tools'],
  },
  {
    id: 'auth-enterprise',
    title: 'Auth Enterprise',
    description: 'Enterprise authentication system with SSO support',
    image: '/templates/auth-2.png',
    category: 'Authentication',
    demoUrl: '/templates/auth-enterprise',
    features: ['SSO integration', 'LDAP support', 'Audit logging', 'Compliance tools'],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'Data visualization dashboard with real-time analytics',
    image: '/templates/dashboard-3.png',
    category: 'Dashboard',
    demoUrl: '/templates/analytics-dashboard',
    features: ['Real-time charts', 'Custom reports', 'Data filters', 'Export options'],
  },
  {
    id: 'marketing-landing',
    title: 'Marketing Landing',
    description: 'High-converting landing page for marketing campaigns',
    image: '/templates/landing-2.png',
    category: 'Landing Page',
    demoUrl: '/templates/marketing-landing',
    features: ['A/B testing ready', 'CTA optimization', 'Mobile optimized', 'Fast loading'],
  },
  {
    id: 'team-dashboard',
    title: 'Team Dashboard',
    description: 'Collaborative dashboard for team productivity',
    image: '/templates/dashboard-4.png',
    category: 'Dashboard',
    demoUrl: '/templates/team-dashboard',
    features: ['Team calendar', 'Task management', 'Team chat', 'File sharing'],
  },
  {
    id: 'ecommerce-admin',
    title: 'E-commerce Admin',
    description: 'Complete admin panel for e-commerce platforms',
    image: '/templates/admin-2.png',
    category: 'Admin Panel',
    demoUrl: '/templates/ecommerce-admin',
    features: ['Order management', 'Inventory tracking', 'Customer insights', 'Sales analytics'],
  },
  {
    id: 'subscription-landing',
    title: 'Subscription Landing',
    description: 'Modern landing page for subscription services',
    image: '/templates/landing-3.png',
    category: 'Landing Page',
    demoUrl: '/templates/subscription-landing',
    features: ['Pricing tables', 'Feature comparison', 'FAQ section', 'Testimonials'],
  },
  {
    id: 'project-management',
    title: 'Project Management',
    description: 'Comprehensive project management dashboard',
    image: '/templates/dashboard-5.png',
    category: 'Dashboard',
    demoUrl: '/templates/project-management',
    features: ['Gantt charts', 'Resource allocation', 'Time tracking', 'Budget monitoring'],
  },
  {
    id: 'crm-dashboard',
    title: 'CRM Dashboard',
    description: 'Customer relationship management solution',
    image: '/templates/dashboard-6.png',
    category: 'Dashboard',
    demoUrl: '/templates/crm-dashboard',
    features: ['Lead tracking', 'Deal pipeline', 'Contact management', 'Email integration'],
  },
  {
    id: 'hr-admin',
    title: 'HR Admin Panel',
    description: 'Complete HR management system',
    image: '/templates/admin-3.png',
    category: 'Admin Panel',
    demoUrl: '/templates/hr-admin',
    features: ['Employee profiles', 'Leave management', 'Payroll', 'Performance tracking'],
  },
  {
    id: 'startup-landing',
    title: 'Startup Landing',
    description: 'Modern landing page for tech startups',
    image: '/templates/landing-4.png',
    category: 'Landing Page',
    demoUrl: '/templates/startup-landing',
    features: ['Hero section', 'Feature showcase', 'Team section', 'Contact form'],
  },
  {
    id: 'inventory-management',
    title: 'Inventory Dashboard',
    description: 'Real-time inventory tracking system',
    image: '/templates/dashboard-7.png',
    category: 'Dashboard',
    demoUrl: '/templates/inventory-management',
    features: ['Stock tracking', 'Order management', 'Supplier portal', 'Reports'],
  },
  {
    id: 'saas-admin',
    title: 'SaaS Admin',
    description: 'Complete admin panel for SaaS applications',
    image: '/templates/admin-3.png',
    category: 'Admin Panel',
    demoUrl: '/templates/saas-admin',
    features: ['Subscription management', 'Customer portal', 'Billing integration', 'Support tickets'],
  },
  {
    id: 'auth-plus',
    title: 'Auth Plus',
    description: 'Advanced authentication system with security features',
    image: '/templates/auth-3.png',
    category: 'Authentication',
    demoUrl: '/templates/auth-plus',
    features: ['Biometric auth', 'Device management', 'Security logs', 'Privacy controls'],
  }
];

export const templateStore = writable(templates); 