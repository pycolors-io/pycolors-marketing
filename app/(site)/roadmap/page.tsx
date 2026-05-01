import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/container';
import { Badge, Card, cn, Button } from '@pycolors/ui';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'Public roadmap for the PyColors ecosystem: UI, Blog, Starters, documentation, and commercial product growth. A release-driven plan focused on shipping, trust, SEO, conversion, and monetization.',
  alternates: { canonical: '/roadmap' },
  openGraph: {
    title: 'Roadmap · PyColors',
    description:
      'A release-driven roadmap for PyColors across UI, Starters, docs, conversion, and commercial product growth.',
    url: '/roadmap',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap · PyColors',
    description:
      'A release-driven roadmap for PyColors across UI, Starters, docs, conversion, and commercial product growth.',
    images: ['/seo/twitter-main.png'],
  },
};

type Status = 'Now' | 'Next' | 'Later' | 'Shipped';
type Milestone =
  | 'Release Week'
  | 'Jan 2026'
  | 'Feb 2026'
  | 'Mar 2026'
  | 'Apr 2026'
  | 'May 2026'
  | 'H1 2026';

type RoadmapItem = {
  title: string;
  description: string;
  status: Status;
  milestone: Milestone;
  tags?: string[];
  href?: string;
};

const statusMeta: Record<
  Status,
  { variant: 'secondary' | 'default' | 'outline'; label: string }
> = {
  Shipped: { variant: 'default', label: 'Shipped' },
  Now: { variant: 'secondary', label: 'Now' },
  Next: { variant: 'outline', label: 'Next' },
  Later: { variant: 'outline', label: 'Later' },
};

const milestones: Array<{
  id: Milestone;
  title: string;
  subtitle: string;
}> = [
  {
    id: 'Release Week',
    title: 'Release Week (Mon 5 → Fri 9 Jan 2026)',
    subtitle:
      'Ship PyColors UI v1.0: core components, docs baseline, and release hygiene.',
  },
  {
    id: 'Jan 2026',
    title: 'January 2026 (post-release)',
    subtitle:
      'Stabilize quality, improve docs, and strengthen the distribution loop.',
  },
  {
    id: 'Feb 2026',
    title: 'February 2026',
    subtitle:
      'Ship Starter Free publicly and strengthen the trust baseline: SEO, analytics, legal pages, and packaging clarity.',
  },
  {
    id: 'Mar 2026',
    title: 'March 2026',
    subtitle:
      'Move from PRO positioning into implementation: Starter Pro foundation, billing maturity, auth baseline, and stronger premium conversion surfaces.',
  },
  {
    id: 'Apr 2026',
    title: 'April 2026',
    subtitle:
      'Turn Starter Pro from a strong launch candidate into a real commercial product: public availability, purchase flow, secure delivery, pricing clarity, and stronger post-purchase trust.',
  },
  {
    id: 'May 2026',
    title: 'May 2026',
    subtitle:
      'Turn documentation into a premium product surface: clearer navigation, stronger SaaS guidance, deeper Starter Free and Starter Pro docs, and a more obvious upgrade path.',
  },
  {
    id: 'H1 2026',
    title: 'H1 2026 (first half)',
    subtitle:
      'Grow Starter Pro after launch through trust, proof, analytics, backend expansion, and stronger conversion systems.',
  },
];

const items: RoadmapItem[] = [
  // RELEASE WEEK — shipped
  {
    title: 'Ship v1.0 — UI Core',
    description:
      'Button, Input, Badge, Card, Alert: consistent variants + sizing + docs (Preview / Usage / Code / Props).',
    status: 'Shipped',
    milestone: 'Release Week',
    tags: ['Core', 'Docs'],
    href: '/docs/ui',
  },
  {
    title: 'Docs quality pass (minimum bar)',
    description:
      'Unify related guides, add missing Preview/Code tabs, fix footer consistency between docs and marketing, and clean up navigation.',
    status: 'Shipped',
    milestone: 'Release Week',
    tags: ['Docs', 'DX'],
    href: '/docs',
  },
  {
    title: 'Release hygiene',
    description:
      'Changelog page, Roadmap page, version bump, and release notes format. Ensure “v1.0” looks serious and credible.',
    status: 'Shipped',
    milestone: 'Release Week',
    tags: ['Release', 'Trust'],
    href: '/changelog',
  },

  // JAN 2026 — shipped
  {
    title: 'Marketing site baseline (pycolors.io)',
    description:
      'Home page v2 + dedicated pages: Templates, License, About. Trust-first baseline for ecosystem positioning and distribution.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Marketing', 'Trust'],
    href: '/',
  },
  {
    title: 'Patterns docs v1 (Overlays, Async actions, Data Table)',
    description:
      'New Patterns layer with production UX rules and interactive demos: overlays decision matrix, async mutation UX, and data table states.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Docs', 'Patterns', 'DX'],
    href: '/docs/patterns',
  },
  {
    title: 'Table (Data UI) direction',
    description:
      'Production-ready data table patterns and previews: loading, empty, error states, filtering, and row actions for practical dashboards.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Data UI', 'Dashboards', 'Docs'],
    href: '/docs/patterns/data-table',
  },
  {
    title: 'SEO & branding polish',
    description:
      'Metadata positioning cleanup, canonical-ready improvements, and refreshed favicons for more consistent branding.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['SEO', 'Brand', 'Trust'],
  },
  {
    title: 'Distribution loop v1',
    description:
      'Repeatable launch routine: demo links, screenshot kit, “What’s new” posts, and a publish checklist.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Growth', 'Launch'],
  },
  {
    title: 'NA-AI landing page integration',
    description:
      'Published NA-AI as a premium template on the PyColors site with demo / purchase links, licensing section, and ecosystem cross-links.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Template', 'Sales'],
    href: '/templates/na-ai',
  },
  {
    title: 'Stability patch (v1.1.x)',
    description:
      'Fix edge cases, polish docs, align tokens and naming, and reduce inconsistencies discovered after weekly releases.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Quality', 'Consistency'],
  },

  // FEB 2026 — shipped
  {
    title: 'UI Advanced v1',
    description:
      'First complete set of advanced dashboard-grade UI primitives: Dialog, Dropdown, Tabs, Tooltip, and Toast with accessibility-first behavior.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: [
      'Advanced',
      'Components',
      'Accessibility',
      'Docs',
      'Dashboards',
    ],
    href: '/docs/ui',
  },
  {
    title: 'February dashboard-grade UI unlock',
    description:
      'Shipped advanced UI and patterns required for dashboard-grade product UX, with aligned component docs and stronger production credibility.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Advanced', 'Patterns', 'Dashboards', 'Docs'],
  },
  {
    title: 'Public packages (Tokens + ESLint)',
    description:
      'Published @pycolors/tokens and @pycolors/eslint-config on npm to strengthen ecosystem-level consistency across UI, tokens, and linting.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Ecosystem', 'NPM', 'DX', 'Trust'],
  },
  {
    title: 'Monorepo → Mirrors sync engine',
    description:
      'Hardened subtree distribution strategy: monorepo as source of truth, public repos as mirrors, automated sync flows.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Architecture', 'CI/CD', 'Release'],
  },
  {
    title: 'Weekly release protocol',
    description:
      'Formalized weekly marketing releases aligned with versioning, changelog, and roadmap updates.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Release', 'Trust', 'Brand'],
  },
  {
    title: 'SaaS Starter (Free) — public alpha',
    description:
      'Starter Free is now publicly documented and positioned as the onboarding entry point: production-shaped UX, clear upgrade path, and docs-first adoption.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Starters', 'Docs', 'Launch', 'Trust'],
    href: '/starters',
  },
  {
    title: 'Starter docs v1 (getting started + architecture)',
    description:
      'Shipped Starter Free documentation: installation, structure, conventions, deployment, upgrade path, plus auth and billing concepts.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Docs', 'Starters', 'DX'],
    href: '/docs/starter',
  },
  {
    title: 'Trust signals: npm badges + secure external SVG support',
    description:
      'Added npm badges, enabled remote SVG images with tighter CSP, and improved internal routing to docs.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Trust', 'NPM', 'Security', 'DX'],
  },
  {
    title: 'Marketing positioning refresh (UI + Starter + Home)',
    description:
      'Refined UI and Starter pages around shipping outcomes and tightened navigation, onboarding, and accessibility.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Marketing', 'Onboarding', 'A11y', 'Launch'],
  },
  {
    title: 'Brand & legal baseline',
    description:
      'Completed trust baseline for commercial distribution: License, Open Source, Terms of Service, and Privacy Policy.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Trust', 'Legal', 'Sales'],
    href: '/terms',
  },

  // MAR 2026 — shipped
  {
    title: 'Guides knowledge layer',
    description:
      'Shipped a dedicated Guides layer on PyColors.io with SaaS-focused educational content covering product foundations, auth, billing, dashboards, admin surfaces, and team systems.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Guides', 'Docs', 'SaaS', 'Education'],
    href: '/guides',
  },
  {
    title: 'Guide infrastructure',
    description:
      'Added a reusable guide page shell and inline navigation components to improve consistency, reading flow, and long-form UX.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Docs', 'UX', 'Guides'],
  },
  {
    title: 'Patterns + Examples discovery layer',
    description:
      'Added dedicated marketing pages for SaaS patterns and examples to better show what users can learn, validate, and eventually build with PyColors.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Patterns', 'Examples', 'Marketing', 'Onboarding'],
    href: '/examples',
  },
  {
    title: 'Access & pricing overview',
    description:
      'Added an access and pricing page clarifying Free, PRO, and long-term upgrade logic to make packaging and offer direction easier to understand.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Pricing', 'Packaging', 'Sales', 'Trust'],
    href: '/pricing',
  },
  {
    title: 'PRO upgrade funnel',
    description:
      'Added a dedicated Upgrade to PRO page clarifying the value of moving from validation surfaces to production-ready wiring and business foundations.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['PRO', 'Upgrade', 'Sales', 'Positioning'],
    href: '/upgrade',
  },
  {
    title: 'Navigation restructuring',
    description:
      'Updated the primary navigation to reflect the product learning flow: UI, Blog, Patterns, Examples, Guides, and Starters.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Navigation', 'UX', 'IA'],
  },
  {
    title: 'Ecosystem messaging refresh',
    description:
      'Refined homepage, footer, starter pages, and upgrade messaging to better explain the PyColors funnel from learning to validation to premium acceleration.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Marketing', 'Brand', 'Conversion'],
    href: '/',
  },
  {
    title: 'Starter PRO foundation',
    description:
      'Starter Pro is now bootstrapped as a dedicated premium app with early product surfaces, branding, pricing direction, proprietary licensing, and a clearer path from marketing to premium implementation.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Starter PRO', 'Premium', 'App'],
    href: '/upgrade',
  },
  {
    title: 'Billing system v1 (Stripe lifecycle)',
    description:
      'Shipped a functional billing system with Stripe checkout, billing portal access, webhook processing, subscription lifecycle handling, invoice sync, and PRO access enforcement. Establishes a real monetization backbone for Starter Pro.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Billing', 'Stripe', 'Monetization', 'API'],
    href: '/upgrade',
  },
  {
    title: 'Prisma billing schema',
    description:
      'Added the initial subscription billing data model with customers, products, prices, subscriptions, invoices, usage tracking, webhook events, plus tooling, seed scripts, and explicit schema workflows.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Prisma', 'Database', 'Billing', 'DX'],
  },
  {
    title: 'Blog platform (SEO + distribution engine)',
    description:
      'Shipped a full blog system with dynamic articles, categories, tags, structured data (JSON-LD), RSS feed, sitemap integration, social sharing, and reusable article components to support SEO, content distribution, and long-term audience growth.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Blog', 'SEO', 'Content', 'Growth'],
    href: '/blog',
  },
  {
    title: 'Content-driven distribution loop',
    description:
      'Established blog-driven distribution with SEO-first articles, internal linking, category and tag navigation, and clearer connections between educational content, patterns, guides, and product surfaces.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['SEO', 'Growth', 'Content'],
    href: '/blog',
  },
  {
    title: 'Marketing layout clarity pass',
    description:
      'Refactored core marketing pages with breadcrumbs, flatter layouts, clearer hierarchy, and more consistent page structure across About, UI, Guides, Patterns, Examples, Access, Starters, Upgrade, and Waitlist.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Marketing', 'UX', 'Navigation', 'Trust'],
  },
  {
    title: 'Starter PRO auth foundation',
    description:
      'Shipped the first real authentication baseline for Starter Pro with Auth.js, Prisma-backed auth models, credentials and OAuth-ready provider support, JWT sessions, registration, login, email verification, resend verification, forgot password, reset password, and transactional auth email infrastructure.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Auth', 'Starter PRO', 'Users', 'Security', 'Email'],
    href: '/upgrade',
  },
  {
    title: 'Authenticated billing access',
    description:
      'Connected billing checkout and billing portal flows to the authenticated user instead of a temporary development account, improving security and making premium access checks materially closer to production.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Billing', 'Auth', 'Security', 'Starter PRO'],
    href: '/upgrade',
  },
  {
    title: 'Marketing navigation and mobile UX polish',
    description:
      'Improved breadcrumbs, footer hierarchy, homepage clarity, semantic structure, and mobile menu behavior including scroll locking, overscroll fixes, grouped navigation, and better recovery paths on the 404 page.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Marketing', 'Navigation', 'Mobile', 'UX'],
    href: '/',
  },

  // APR 2026 — shipped
  {
    title: 'OAuth sign-in and sign-up UX',
    description:
      'Shipped first-class Google and GitHub OAuth entry points across registration and login with clearer provider separation, better loading states, and more intentional onboarding UX.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'OAuth', 'Starter PRO', 'Onboarding', 'UX'],
    href: '/upgrade',
  },
  {
    title: 'OAuth account conflict handling',
    description:
      'Improved account-conflict handling and mapped auth query errors to safer, more understandable user-facing messages, reducing confusion around provider linkage and login failures.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'OAuth', 'Errors', 'UX', 'Security'],
  },
  {
    title: 'Connected accounts management',
    description:
      'Shipped backend-driven connected accounts management in settings for Google and GitHub, including real linked-provider state, clearer account visibility, and a stronger account-security surface.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'Settings', 'Accounts', 'Security', 'Starter PRO'],
    href: '/upgrade',
  },
  {
    title: 'Safe provider disconnect rules',
    description:
      'Added disconnect flows for linked providers while enforcing that users must always keep at least one valid sign-in method connected, preventing accidental account lockout.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Security', 'Accounts', 'OAuth', 'Settings'],
  },
  {
    title: 'In-session password change',
    description:
      'Shipped the first real signed-in password change flow with validation, feedback, and notification logic, making Starter Pro account security materially more complete.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'Password', 'Security', 'Settings'],
    href: '/upgrade',
  },
  {
    title: 'Real account-state in app navigation',
    description:
      'Replaced placeholder user navigation with backend-driven account data so the app shell now reflects the real signed-in user, including name, email, and provider context.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'Navigation', 'UX', 'App shell'],
  },
  {
    title: 'Auth environment and email consistency',
    description:
      'Improved trusted auth host and sender configuration between development and production so transactional auth flows are more reliable and less error-prone across environments.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'Email', 'DX', 'Infrastructure'],
  },
  {
    title: 'Auth security hardening with rate limiting and auditing',
    description:
      'Hardened sensitive auth actions with rate limiting, generic responses, and audit metadata collection so Starter Pro account flows are more resilient against abuse and closer to production expectations.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'Security', 'Rate limiting', 'Auditing'],
    href: '/upgrade',
  },
  {
    title: 'Backend-driven security activity in settings',
    description:
      'Added recent security activity to settings with backend-driven event history, hydration-safe rendering, French locale and Paris time formatting, improved activity lookup, and more user-friendly device labels.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Settings', 'Security', 'Audit trail', 'UX'],
    href: '/upgrade',
  },
  {
    title: 'Password creation for OAuth-first users',
    description:
      'Enabled users who registered with a third-party provider to set a local password when none exists, improving self-service account durability and recovery options.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'Password', 'OAuth', 'Settings'],
    href: '/upgrade',
  },
  {
    title: 'Premium auth screen redesign',
    description:
      'Revamped login, register, forgot-password, verify-email, and resend-verification flows with a stronger premium SaaS layout, better loading states, clearer helper text, and improved feedback.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'UX', 'Premium', 'Onboarding'],
    href: '/upgrade',
  },
  {
    title:
      'Authenticated-user redirect protection on public auth pages',
    description:
      'Redirects signed-in users away from public auth routes so the product feels cleaner, safer, and less confusing during real account usage.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'Routing', 'UX', 'Security'],
  },
  {
    title: 'Starter Pro pricing repositioning',
    description:
      'Updated Starter Pro pricing to €299 and sharpened the pricing page, FAQ, and offer framing to better match the product’s security, billing, and backend value.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Pricing', 'Positioning', 'Sales', 'Starter PRO'],
    href: '/pricing',
  },
  {
    title: 'PRO docs expansion: auth, billing, backend',
    description:
      'Expanded the premium documentation structure with clearer auth, billing, and backend guides so Starter Pro feels more implementation-ready and commercially credible.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Docs', 'Starter PRO', 'Billing', 'Backend', 'Auth'],
    href: '/docs',
  },
  {
    title:
      'Production-shaped dashboard, projects, and admin surfaces',
    description:
      'Improved the dashboard, projects, and admin members pages with stronger UX, search, stats, not-found recovery, upgrade teasers, and a more premium SaaS entity surface.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Dashboard', 'Projects', 'Admin', 'UX', 'Starter PRO'],
    href: '/upgrade',
  },
  {
    title: 'Marketing and navigation credibility pass',
    description:
      'Improved mobile navigation accessibility with native dialog behavior, added a stronger 404 page, supported nav badges like “Pro”, and enforced an explicit upgrade URL for safer monetization flows.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: [
      'Marketing',
      'Navigation',
      'Accessibility',
      'Monetization',
    ],
    href: '/',
  },
  {
    title: 'Starter Pro public commercial launch',
    description:
      'Starter Pro is now publicly available and purchasable on pycolors.io, moving the product from premium launch preparation into real commercial availability.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Starter PRO', 'Launch', 'Sales', 'Commercial'],
    href: '/starters/pro',
  },
  {
    title: 'Checkout, success, and cancel journey',
    description:
      'Added a clearer commercial checkout path with purchase entry points, post-checkout confirmation, cancel recovery, and stronger buyer guidance before and after payment.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Checkout', 'Conversion', 'Sales', 'UX'],
    href: '/pricing',
  },
  {
    title: 'Secure claim, download, and access recovery flow',
    description:
      'Shipped secure post-purchase access surfaces including claim, download, and access recovery pages so Starter Pro delivery feels materially more credible and self-service friendly.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Delivery', 'Download', 'Recovery', 'Trust'],
    href: '/docs',
  },
  {
    title: 'Conversion-focused pricing and upgrade hardening',
    description:
      'Refactored pricing, upgrade, starters, and product pages to make the Free-to-Pro path clearer, reduce friction, and support real purchase confidence.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Pricing', 'Upgrade', 'Conversion', 'Marketing'],
    href: '/pricing',
  },
  {
    title: 'Starter Pro docs, README, and license clarity pass',
    description:
      'Expanded documentation, improved the README, and clarified proprietary license terms so evaluation, onboarding, and commercial understanding are much stronger.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Docs', 'README', 'License', 'Trust'],
    href: '/docs/starter-pro',
  },
  {
    title: 'Docker-based local database setup for product testing',
    description:
      'Added Docker Compose PostgreSQL setup, DB management scripts, and optional seeded PRO account data to make local testing and billing evaluation easier.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Docker', 'Database', 'DX', 'Testing'],
  },
  {
    title: 'Pricing route consolidation',
    description:
      'Renamed /access to /pricing across the site, updated internal links, breadcrumbs, sitemap priorities, and commercial references so the buying path is clearer and more aligned with user intent.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Pricing', 'Navigation', 'Sales', 'Conversion'],
    href: '/pricing',
  },
  {
    title: 'PRO waitlist removal',
    description:
      'Removed the standalone PRO waitlist page now that Starter Pro is publicly available, simplifying the funnel and reducing outdated launch-era entry points.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Starter PRO', 'Launch', 'Marketing', 'Conversion'],
    href: '/starters/pro',
  },
  {
    title: 'Product menu and navigation upgrade',
    description:
      'Revamped the product menu with icons, descriptions, badges, a Starter Pro offer section, better mobile active states, and clearer desktop/mobile navigation structure.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Navigation', 'Header', 'UX', 'Product discovery'],
    href: '/',
  },
  {
    title: 'Documentation UX modernization',
    description:
      'Added a dedicated docs header, breadcrumb navigation, full-width docs shell, refined sidebar behavior, improved docs footer, previous/next navigation, contextual CTAs, feedback controls, and stronger metadata.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Docs', 'UX', 'Navigation', 'DX'],
    href: '/docs',
  },
  {
    title: 'Starter Pro documentation clarity pass',
    description:
      'Expanded Starter Pro documentation with getting started, why buy, what is included, delivery, and upgrade guidance to reduce buyer uncertainty and make the premium offer easier to evaluate.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Starter PRO', 'Docs', 'Onboarding', 'Trust'],
    href: '/docs/starter-pro',
  },
  {
    title: 'Free-to-Pro conversion messaging refinement',
    description:
      'Clarified Starter Free, Upgrade, and Starter Pro messaging across marketing pages so users understand when to validate with Free and when to move to Pro for real auth, billing, and delivery foundations.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: [
      'Conversion',
      'Starter Free',
      'Starter PRO',
      'Positioning',
    ],
    href: '/pricing',
  },
  {
    title: 'Reusable marketing hero system',
    description:
      'Unified marketing hero sections through a reusable PageHero component, improving consistency, reducing duplication, and making future conversion page updates easier.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Marketing', 'Components', 'Consistency', 'DX'],
  },
  {
    title: 'Footer, logo, and visual consistency pass',
    description:
      'Redesigned the footer, added theme toggle and version display, refined logo styling, improved badge styling, and aligned spacing across pages for a more premium and consistent public surface.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Brand', 'Footer', 'UI Polish', 'Trust'],
  },
  {
    title: 'Design system and patterns docs refinement',
    description:
      'Improved UI, design system, guides, and patterns documentation with clearer philosophy, token guidance, component usage, common mistakes, and practical SaaS product examples.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Design System', 'Patterns', 'Guides', 'Docs'],
    href: '/docs',
  },
  {
    title: 'Premium docs navigation and header system',
    description:
      'Refined the docs header, mobile navigation, search access, theme toggle placement, sidebar hierarchy, fixed header behavior, and responsive layout polish for a more premium documentation experience.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Docs', 'Navigation', 'Mobile', 'UX'],
    href: '/docs',
  },
  {
    title: 'Focused docs reading experience',
    description:
      'Improved table of contents behavior, heading hierarchy, active and focused states, sidebar clarity, responsive dialog spacing, table styling, and root docs navigation filtering.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Docs', 'TOC', 'Accessibility', 'DX'],
    href: '/docs',
  },
  {
    title: 'Code block rendering upgrade',
    description:
      'Added rehype-pretty-code support and improved code block styling, titles, fragments, headings, tables, and technical readability across documentation pages.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Docs', 'Code', 'MDX', 'DX'],
    href: '/docs',
  },
  {
    title: 'Starter Free documentation refinement',
    description:
      'Expanded Starter Free docs with clearer onboarding, product-surface evaluation, mocked-vs-wired explanations, next-step guidance, checklists, and a stronger upgrade path to Starter Pro.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Starter Free', 'Docs', 'Onboarding', 'Upgrade'],
    href: '/docs/starter',
  },
  {
    title: 'Starter Pro production documentation expansion',
    description:
      'Revamped Starter Pro docs around production readiness, auth, billing, backend, delivery, upgrade timing, implementation steps, decision guides, and buyer confidence.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Starter PRO', 'Docs', 'Production', 'Trust'],
    href: '/docs/starter-pro',
  },
  {
    title: 'Design system documentation clarity pass',
    description:
      'Reworked design system docs around semantic color roles, token-driven architecture, typography, radius, shadows, usage rationale, visual consistency, and common pitfalls.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Design System', 'Tokens', 'Docs', 'UI'],
    href: '/docs/design-system',
  },
  {
    title: 'UI composition and accessibility docs',
    description:
      'Added and refined UI documentation for composition, accessibility, component usage, decision rules, prefer/avoid guidance, and scalable SaaS interface patterns.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['UI', 'Accessibility', 'Composition', 'Docs'],
    href: '/docs/ui',
  },
  {
    title: 'Guides and Patterns documentation expansion',
    description:
      'Expanded guides and patterns with clearer SaaS mental models, async action guidance, data table structure, overlay usage, forms, validation, production checklists, and next-step navigation.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Guides', 'Patterns', 'SaaS', 'Docs'],
    href: '/docs/patterns',
  },
  {
    title: 'SaaS value and Free-to-Pro clarity',
    description:
      'Improved docs messaging to explain how PyColors helps builders move from idea to revenue-generating SaaS, while making the Starter Free to Starter Pro upgrade path more visible.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Conversion', 'Starter PRO', 'Positioning', 'Docs'],
    href: '/pricing',
  },
  {
    title: 'Marketing and pricing polish',
    description:
      'Refined hero section styling, pricing UI hierarchy, card consistency, badge and button styling, accessibility, and layout details to improve perceived quality and commercial clarity.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Marketing', 'Pricing', 'UI Polish', 'Conversion'],
    href: '/pricing',
  },
  // NOW
  {
    title: 'Starter Pro conversion instrumentation',
    description:
      'Measure the docs-to-pricing-to-checkout funnel more precisely across Starter Free, Starter Pro, upgrade pages, pricing, and post-purchase access flows.',
    status: 'Now',
    milestone: 'May 2026',
    tags: ['Analytics', 'Conversion', 'Sales', 'Growth'],
    href: '/pricing',
  },
  {
    title: 'Starter Pro sales proof and trust content',
    description:
      'Add stronger proof around why Starter Pro saves time: implementation comparisons, real architecture explanations, buyer reassurance, launch checklists, and authority content.',
    status: 'Now',
    milestone: 'May 2026',
    tags: ['Trust', 'Content', 'Starter PRO', 'Sales'],
    href: '/starters/pro',
  },
  {
    title: 'Documentation-to-product conversion loop',
    description:
      'Use the improved docs as a conversion surface by connecting guides, patterns, Starter Free evaluation, Starter Pro value, pricing, and checkout more intentionally.',
    status: 'Now',
    milestone: 'May 2026',
    tags: ['Docs', 'Conversion', 'SEO', 'Product'],
    href: '/docs',
  },

  // NEXT
  {
    title: 'Analytics and launch instrumentation',
    description:
      'Finish GA4 and GTM wiring, validate conversion events across docs, pricing, starters, upgrade, and checkout flows, and measure premium discovery more reliably.',
    status: 'Next',
    milestone: 'H1 2026',
    tags: ['Analytics', 'SEO', 'Growth', 'Launch'],
  },
  {
    title: 'Monetization system v2',
    description:
      'Tighten the full commercial system around checkout trust, billing states, support reassurance, proof, demos, legal clarity, and stronger conversion logic for Starter Pro.',
    status: 'Next',
    milestone: 'H1 2026',
    tags: ['Sales', 'Checkout', 'Pricing', 'Trust'],
    href: '/pricing',
  },
  {
    title: 'Starter Pro backend expansion beyond auth and billing',
    description:
      'Extend the premium starter beyond account and payment infrastructure into a stronger backend application baseline with entities, permissions, admin direction, and more production-ready product patterns.',
    status: 'Next',
    milestone: 'H1 2026',
    tags: ['Starter PRO', 'Backend', 'Architecture', 'Premium'],
    href: '/starters/pro',
  },
  {
    title: 'Editorial cadence for authority building',
    description:
      'Turn the blog and guides system into a repeatable authority engine with SaaS, DX, product engineering, and starter-focused editorial publishing.',
    status: 'Next',
    milestone: 'H1 2026',
    tags: ['Blog', 'SEO', 'Authority', 'Growth'],
    href: '/blog',
  },
  {
    title: 'Cookie preferences + analytics consent (optional)',
    description:
      'If analytics remain enabled, add a lightweight consent layer and document tracking behavior in a simple and credible way.',
    status: 'Next',
    milestone: 'H1 2026',
    tags: ['Privacy', 'Analytics', 'Trust'],
    href: '/privacy',
  },

  // LATER
  {
    title: 'Starter Pro commercial maturity',
    description:
      'Improve Starter Pro after launch through stronger proof, onboarding, customer reassurance, delivery reliability, and a more convincing premium business surface.',
    status: 'Later',
    milestone: 'H1 2026',
    tags: ['Starter PRO', 'Premium', 'Growth', 'Trust'],
    href: '/starters/pro',
  },
  {
    title: 'Blocks library (marketing + SaaS)',
    description:
      'Ship copy-paste sections for marketing and SaaS surfaces: hero, feature grids, pricing, testimonials, FAQ, CTA, and footer blocks.',
    status: 'Later',
    milestone: 'H1 2026',
    tags: ['Blocks', 'Marketing'],
  },
  {
    title: 'Templates line v1',
    description:
      'Expand the premium template line with new landing and dashboard directions built on PyColors UI, with stronger packaging and demo quality.',
    status: 'Later',
    milestone: 'H1 2026',
    tags: ['Templates', 'Monetization'],
  },
];

function StatusBadge({ status }: { status: Status }) {
  const meta = statusMeta[status];

  return (
    <Badge variant={meta.variant} className="text-[11px]">
      {meta.label}
    </Badge>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const body = (
    <Card
      className={cn('p-5 transition-colors', 'hover:bg-accent/30')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-sm font-medium">{item.title}</div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </div>
        <div className="shrink-0">
          <StatusBadge status={item.status} />
        </div>
      </div>

      {item.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );

  if (item.href) {
    const isExternal = item.href.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          className="block"
        >
          {body}
        </a>
      );
    }

    return (
      <Link href={item.href} className="block">
        {body}
      </Link>
    );
  }

  return body;
}

function groupByMilestone(list: RoadmapItem[]) {
  const map = new Map<Milestone, RoadmapItem[]>();

  for (const m of milestones.map((x) => x.id)) {
    map.set(m, []);
  }

  for (const item of list) {
    map.get(item.milestone)?.push(item);
  }

  return map;
}

export default function RoadmapPage() {
  const byMilestone = groupByMilestone(items);

  const shipped = items.filter((i) => i.status === 'Shipped').length;
  const now = items.filter((i) => i.status === 'Now').length;
  const next = items.filter((i) => i.status === 'Next').length;
  const later = items.filter((i) => i.status === 'Later').length;

  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Roadmap', href: '/roadmap' },
            ]}
          />
        </div>

        <header className="mx-auto w-full max-w-4xl text-center">
          <div className="flex justify-center">
            <Badge variant="secondary" className="gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Public roadmap
            </Badge>
          </div>

          <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Roadmap
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
            A realistic, release-driven plan focused on shipping. This
            roadmap tracks how PyColors evolves from UI foundations
            into a SaaS builder ecosystem: blog, guides, production
            patterns, Starter Free, Starter Pro, commercial delivery,
            and future premium offers.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-balance text-xs text-muted-foreground">
            This roadmap reflects current priorities and product
            direction. It is not a contractual delivery promise, and
            timing, scope, pricing, or packaging may evolve based on
            feedback, real usage, bugs, or commercial priorities.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              {shipped} shipped
            </span>
            <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              {now} now
            </span>
            <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              {next} next
            </span>
            <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              {later} later
            </span>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/docs">Read the docs</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/changelog">View changelog</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </header>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <div className="text-sm font-medium">Single thing</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Ship the PyColors ecosystem funnel: Guides → Blog →
                Patterns / Examples → Starter Free → Starter Pro.
                Weekly releases, measurable improvements, and a public
                roadmap.
              </p>
            </Card>

            <Card className="p-5">
              <div className="text-sm font-medium">
                Documentation-first
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Every component, guide, article, and starter should
                help users understand what to build, why it matters,
                and how to ship it with clearer conventions.
              </p>
            </Card>

            <Card className="p-5">
              <div className="text-sm font-medium">
                Commercial readiness
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Trust pages, pricing clarity, launch proof, delivery
                reliability, analytics, docs depth, auth reliability,
                billing credibility, and a predictable release
                cadence.
              </p>
            </Card>
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  How to read this roadmap
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Shipped items reflect public work already released.
                  Now and Next reflect the strongest current product,
                  SEO, and monetization priorities. Later reflects
                  likely direction, not a fixed delivery commitment.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/upgrade">Upgrade</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/starters/pro">Starter Pro</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="mx-auto mt-10 w-full max-w-6xl space-y-10">
          {milestones.map((m) => {
            const list = byMilestone.get(m.id) ?? [];

            return (
              <div key={m.id} className="space-y-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      {m.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {m.subtitle}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {list.length} item{list.length === 1 ? '' : 's'}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {list.map((item) => (
                    <RoadmapCard
                      key={`${item.milestone}:${item.title}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="mx-auto mt-12 w-full">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="text-sm font-medium">
                  Have a request?
                </div>
                <p className="text-sm text-muted-foreground">
                  Requests, bugs, and feedback help prioritize what
                  ships next.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a
                    href="https://github.com/pycolors-io/pycolors-ui/issues"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open an issue
                  </a>
                </Button>
                <Button asChild>
                  <a
                    href="https://github.com/pycolors-io/pycolors-ui"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View repository
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Roadmap items may shift based on feedback, bugs, technical
            constraints, and real-world usage.
          </p>
        </section>
      </div>
    </Container>
  );
}
