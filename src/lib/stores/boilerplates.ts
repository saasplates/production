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
  priceAmount?: string;
  demoUrl?: string;
  visitUrl?: string;
  sourceCodeUrl?: string;
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
    demoUrl: 'https://saas-template.nuxt.dev/',
    sourceCodeUrl: 'https://github.com/nuxt-ui-pro/saas'
  },
  {
    id: 'remix-saas',
    title: 'Remix SaaS',
    description: 'A Lightweight, Production-Ready Remix Stack for your next SaaS application.',
    image: '/plate/remix-saas.webp',
    mainImage: '/plate/remix-saas-main.webp',
    framework: ['Remix', 'TypeScript', 'TailwindCSS', 'Prisma'],
    price: 'Free',
    featured: true,
    demoUrl: 'https://github.com/dev-xo/remix-saas',
    sourceCodeUrl: 'https://github.com/dev-xo/remix-saas',
    features: [
      {
        title: 'Modern Tech Stack',
        description: 'Built with Vite, Prisma ORM, and TailwindCSS for a powerful development experience'
      },
      {
        title: 'Authentication System',
        description: 'Email Code, Magic Link and Social Logins with CSRF and Honeypot Protection'
      },
      {
        title: 'Stripe Integration',
        description: 'Complete subscription plans and customer portal functionality'
      },
      {
        title: 'Email System',
        description: 'Resend for developers and React Email for customizable templates'
      },
      {
        title: 'Advanced Features',
        description: 'Server Rate Limiting, File Uploads, I18N support, and Github Actions CI/CD'
      }
    ],
    customContent: [
      {
        title: 'Tech Stack',
        description: 'Built with modern technologies for scalability and performance',
        links: [
          {
            text: 'Documentation',
            url: 'https://github.com/dev-xo/remix-saas/tree/main/docs#remix-saas-documentation'
          },
          {
            text: 'Live Demo',
            url: 'https://github.com/dev-xo/remix-saas'
          }
        ]
      }
    ],
    children: [
      {
        title: 'Key Features',
        content: `
          <ul class="list-disc pl-4">
            <li>⚡ Vite for Next-Gen Frontend Tooling</li>
            <li>🧩 Prisma ORM for Modern Database Management</li>
            <li>🛍️ Stripe Integration for Subscriptions</li>
            <li>🔑 Multiple Authentication Methods</li>
            <li>🎨 TailwindCSS & ShadCN Components</li>
            <li>🌙 Light and Dark Mode Support</li>
            <li>🗺️ Remix Flat Routes</li>
            <li>🍞 Client & Server Toasts</li>
            <li>🛡️ Server Rate Limiting</li>
            <li>🕵️‍♂️ CSRF and Honeypot Protection</li>
            <li>📧 Resend Email Integration</li>
            <li>💌 React Email Templates</li>
            <li>📋 Type-Safe Form Validation</li>
            <li>📥 File Upload Support</li>
            <li>🌐 I18N Internationalization</li>
            <li>⚙️ Github Actions CI/CD</li>
          </ul>
        `
      },
      {
        title: 'UI Features',
        content: `
          <ul class="list-disc pl-4">
            <li>💅 Modern UI with Design System</li>
            <li>🏕 Landing, Onboarding, Dashboard and Admin Pages</li>
            <li>📱 Fully Responsive Design</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 'larafast',
    title: 'Larafast',
    description: 'Production ready SaaS Starter Kit with everything to start your SaaS app.',
    image: '/plate/larafast.webp',
    mainImage: '/plate/larafast-main.webp',
    framework: ['Laravel'],
    price: 'Paid',
    priceAmount: '$149.5',
    visitUrl: 'https://larafast.com',
    // sponsored: true,
  },
  {
    id: 'nextjs-saas-boilerplate',
    title: 'Next.js SaaS Boilerplate',
    description: 'Production-ready SaaS template with Next.js, Tailwind CSS, Shadcn UI, and more.',
    image: '/plate/saas-boilerplate.webp',
    mainImage: '/plate/saas-boilerplate-main.webp',
    framework: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Drizzle ORM'],
    price: 'Free',
    demoUrl: 'https://react-saas.com',
    sourceCodeUrl: 'https://github.com/ixartz/SaaS-Boilerplate',
    featured: true,
    features: [
      {
        title: 'Authentication & Multi-tenancy',
        description: 'Built-in authentication with Clerk and multi-tenant support with team management'
      },
      {
        title: 'Database & ORM',
        description: 'Type-safe database operations with Drizzle ORM supporting PostgreSQL, SQLite, and MySQL'
      },
      {
        title: 'Testing Suite',
        description: 'Comprehensive testing with Vitest, React Testing Library, and Playwright for E2E tests'
      },
      {
        title: 'Internationalization',
        description: 'Built-in i18n support for multiple language implementations'
      },
      {
        title: 'Monitoring & Logging',
        description: 'Error reporting with Sentry and logging system for production monitoring'
      }
    ],
    customContent: [
      {
        title: 'Key Features',
        description: 'Production-ready features for modern SaaS applications',
        links: [
          {
            text: 'Documentation',
            url: 'https://github.com/ixartz/SaaS-Boilerplate#readme'
          },
          {
            text: 'Live Demo',
            url: 'https://react-saas.com'
          }
        ]
      }
    ],
    children: [
      {
        title: 'Core Features',
        content: `
          <ul class="list-disc pl-4">
            <li>🔐 Authentication with Clerk</li>
            <li>👥 Multi-tenancy with Team support</li>
            <li>🔑 Role-based access control</li>
            <li>💾 Database with Drizzle ORM</li>
            <li>🌍 i18n internationalization</li>
            <li>📊 User Dashboard</li>
            <li>🎨 Modern UI with Shadcn UI</li>
            <li>📝 Form handling</li>
            <li>🔍 SEO optimization</li>
            <li>📈 Error monitoring with Sentry</li>
            <li>🧪 Testing suite</li>
            <li>👤 User impersonation</li>
          </ul>
        `
      },
      {
        title: 'Development Features',
        content: `
          <ul class="list-disc pl-4">
            <li>TypeScript for type safety</li>
            <li>ESLint for code quality</li>
            <li>Prettier for code formatting</li>
            <li>GitHub Actions for CI/CD</li>
            <li>Vitest for unit testing</li>
            <li>Playwright for E2E testing</li>
            <li>Automatic database migrations</li>
          </ul>
        `
      }
    ]
  }
];

export const boilerplateStore = writable(boilerplates); 