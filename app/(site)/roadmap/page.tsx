import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/container';
import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Next.js SaaS Product Roadmap',
  description:
    'Public roadmap for the PyColors ecosystem covering Next.js SaaS starters, UI systems, documentation, templates, developer tooling, product architecture, and commercial platform evolution.',
  alternates: {
    canonical: '/roadmap',
  },

  openGraph: {
    title: 'Next.js SaaS Product Roadmap',
    description:
      'Explore the public PyColors roadmap across SaaS starters, UI systems, templates, documentation, developer tooling, and platform growth.',
    url: '/roadmap',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Product Roadmap',
    description:
      'Public roadmap for the PyColors SaaS ecosystem, UI systems, templates, starters, and developer tooling.',
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
  | 'Jun 2026'
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
  {
    variant: 'secondary' | 'default' | 'outline';
    label: string;
    className: string;
  }
> = {
  Shipped: {
    variant: 'default',
    label: 'Shipped',
    className: 'bg-success text-primary-foreground',
  },
  Now: {
    variant: 'secondary',
    label: 'Now',
    className: 'border-primary/30 bg-primary/10 text-foreground',
  },
  Next: {
    variant: 'outline',
    label: 'Next',
    className: 'border-primary/30 bg-primary/5',
  },
  Later: {
    variant: 'outline',
    label: 'Later',
    className: 'border-border-subtle bg-surface-muted',
  },
};

const milestones: Array<{
  id: Milestone;
  title: string;
  subtitle: string;
}> = [
  {
    id: 'Release Week',
    title: 'Release Week',
    subtitle:
      'Ship PyColors UI v1.0: core components, docs baseline, and release hygiene.',
  },
  {
    id: 'Jan 2026',
    title: 'January 2026',
    subtitle:
      'Stabilize quality, improve docs, and strengthen the distribution loop.',
  },
  {
    id: 'Feb 2026',
    title: 'February 2026',
    subtitle:
      'Ship Starter Free publicly and strengthen the trust baseline.',
  },
  {
    id: 'Mar 2026',
    title: 'March 2026',
    subtitle:
      'Move from PRO positioning into implementation: Starter Pro foundation, billing maturity, auth baseline, and conversion surfaces.',
  },
  {
    id: 'Apr 2026',
    title: 'April 2026',
    subtitle:
      'Turn Starter Pro into a real commercial product with purchase flow, secure delivery, and pricing clarity.',
  },
  {
    id: 'May 2026',
    title: 'May 2026',
    subtitle:
      'Turn documentation, branding, tokens, starters, pricing, and upgrade paths into a more premium and conversion-ready product surface.',
  },
  {
    id: 'Jun 2026',
    title: 'June 2026',
    subtitle:
      'Ship Starter Pro PWA foundations, local validation depth, release history, analytics, and stronger public product recovery paths.',
  },
  {
    id: 'H1 2026',
    title: 'H1 2026',
    subtitle:
      'Keep the public product surface accurate, credible, and focused on shipped work.',
  },
];

const items: RoadmapItem[] = [
  {
    title: 'Ship v1.0 — UI Core',
    description:
      'Button, Input, Badge, Card, Alert: consistent variants, sizing, docs, preview, usage, code, and props.',
    status: 'Shipped',
    milestone: 'Release Week',
    tags: ['Core', 'Docs'],
    href: '/docs/ui',
  },
  {
    title: 'Docs quality pass',
    description:
      'Unify related guides, add missing Preview/Code tabs, fix footer consistency, and clean navigation.',
    status: 'Shipped',
    milestone: 'Release Week',
    tags: ['Docs', 'DX'],
    href: '/docs',
  },
  {
    title: 'Release hygiene',
    description:
      'Changelog page, Roadmap page, version bump, and release notes format.',
    status: 'Shipped',
    milestone: 'Release Week',
    tags: ['Release', 'Trust'],
    href: '/changelog',
  },
  {
    title: 'Marketing site baseline',
    description:
      'Home page v2 and dedicated pages for templates, license, about, trust, and ecosystem positioning.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Marketing', 'Trust'],
    href: '/',
  },
  {
    title: 'Patterns docs v1',
    description:
      'Production UX rules and interactive demos for overlays, async actions, and data table states.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Docs', 'Patterns', 'DX'],
    href: '/docs/patterns',
  },
  {
    title: 'Distribution loop v1',
    description:
      'Repeatable launch routine: demo links, screenshot kit, what’s new posts, and publish checklist.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Growth', 'Launch'],
  },
  {
    title: 'UI Advanced v1',
    description:
      'Dialog, Dropdown, Tabs, Tooltip, and Toast with accessibility-first behavior.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Advanced', 'Components', 'Accessibility'],
    href: '/docs/ui',
  },
  {
    title: 'Public packages',
    description:
      'Published @pycolors/tokens and @pycolors/eslint-config on npm to strengthen ecosystem consistency.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Ecosystem', 'NPM', 'DX'],
  },
  {
    title: 'Starter Free public alpha',
    description:
      'Starter Free publicly documented and positioned as the onboarding entry point.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Starters', 'Docs', 'Launch'],
    href: '/starters/free',
  },
  {
    title: 'Starter docs v1',
    description:
      'Installation, structure, conventions, deployment, upgrade path, auth, and billing concepts.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Docs', 'Starters', 'DX'],
    href: '/docs/starter',
  },
  {
    title: 'Guides knowledge layer',
    description:
      'Dedicated Guides layer covering product foundations, auth, billing, dashboards, admin, and team systems.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Guides', 'SaaS', 'Education'],
    href: '/guides',
  },
  {
    title: 'Patterns + Examples discovery layer',
    description:
      'Dedicated marketing pages for SaaS patterns and examples to show what users can learn, validate, and build.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Patterns', 'Examples', 'Marketing'],
    href: '/ui/examples',
  },
  {
    title: 'PRO upgrade funnel',
    description:
      'Dedicated upgrade page clarifying the value of moving from validation surfaces to production-ready wiring.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['PRO', 'Upgrade', 'Sales'],
    href: '/upgrade',
  },
  {
    title: 'Billing system v1',
    description:
      'Stripe checkout, billing portal, webhook processing, subscription lifecycle, invoice sync, and PRO access enforcement.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Billing', 'Stripe', 'Monetization'],
    href: '/pricing',
  },
  {
    title: 'Starter PRO auth foundation',
    description:
      'Auth.js, Prisma-backed auth models, credentials, OAuth-ready providers, JWT sessions, verification, reset password, and transactional emails.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Auth', 'Starter PRO', 'Security'],
    href: '/starters/pro',
  },
  {
    title: 'OAuth sign-in and sign-up UX',
    description:
      'First-class Google and GitHub OAuth entry points with better loading states and onboarding UX.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'OAuth', 'Starter PRO'],
    href: '/starters/pro',
  },
  {
    title: 'Auth security hardening',
    description:
      'Rate limiting, generic responses, and audit metadata collection for sensitive auth actions.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Auth', 'Security', 'Rate limiting'],
  },
  {
    title: 'Starter Pro public commercial launch',
    description:
      'Starter Pro became publicly available and purchasable on pycolors.io.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Starter PRO', 'Launch', 'Sales'],
    href: '/starters/pro',
  },
  {
    title: 'Secure claim, download, and access recovery',
    description:
      'Post-purchase access surfaces for claim, download, and recovery to make Starter Pro delivery more credible.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Delivery', 'Download', 'Trust'],
    href: '/docs/starter-pro',
  },
  {
    title: 'Pricing route consolidation',
    description:
      'Renamed /access to /pricing and updated links, breadcrumbs, sitemap priorities, and commercial references.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Pricing', 'Navigation', 'Conversion'],
    href: '/pricing',
  },
  {
    title: 'Reusable marketing hero system',
    description:
      'Unified marketing hero sections through a reusable PageHero component.',
    status: 'Shipped',
    milestone: 'Apr 2026',
    tags: ['Marketing', 'Components', 'Consistency'],
  },
  {
    title: 'Premium docs navigation and header system',
    description:
      'Refined docs header, mobile navigation, search access, theme toggle placement, sidebar hierarchy, and fixed header behavior.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Docs', 'Navigation', 'Mobile'],
    href: '/docs',
  },
  {
    title: 'Focused docs reading experience',
    description:
      'Improved TOC behavior, heading hierarchy, active states, sidebar clarity, responsive spacing, and table styling.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Docs', 'TOC', 'Accessibility'],
    href: '/docs',
  },
  {
    title: 'Starter Free documentation refinement',
    description:
      'Clearer onboarding, product-surface evaluation, mocked-vs-wired explanations, and stronger upgrade path.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Starter Free', 'Docs', 'Upgrade'],
    href: '/docs/starter',
  },
  {
    title: 'Starter Pro production documentation expansion',
    description:
      'Production readiness, auth, billing, backend, delivery, upgrade timing, and buyer confidence.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Starter PRO', 'Docs', 'Trust'],
    href: '/docs/starter-pro',
  },
  {
    title: 'Marketing and pricing polish',
    description:
      'Refined hero styling, pricing hierarchy, card consistency, badge styling, buttons, accessibility, and layout details.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Marketing', 'Pricing', 'Conversion'],
    href: '/pricing',
  },
  {
    title: 'Premium brand, token, and conversion polish',
    description:
      'Refined the PyColors brand system, token architecture, homepage, pricing, upgrade path, starter pages, screenshots, headers, footers, changelog, and roadmap for a more cohesive premium SaaS platform experience.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Brand', 'Tokens', 'Conversion'],
    href: '/changelog',
  },
  {
    title: 'NA-AI Landing commercial template',
    description:
      'Integrated NA-AI Landing as a premium AI SaaS landing page product with docs, license, demo, pricing, and purchase flow.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Templates', 'NA-AI', 'Monetization'],
    href: '/templates/na-ai-landing',
  },
  {
    title: 'Multi-product commerce foundation',
    description:
      'Generalized checkout, customer access, recovery, delivery, and product messaging for multiple premium digital products.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Commerce', 'Delivery', 'Monetization'],
    href: '/pricing',
  },
  {
    title: 'Templates documentation system',
    description:
      'Added template docs, NA-AI Landing guides, licensing guidance, customization docs, and clearer product selection paths.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Docs', 'Templates', 'Onboarding'],
    href: '/docs/templates/na-ai-landing',
  },
  {
    title: 'Blog editorial UX polish',
    description:
      'Refined blog layout, prose, metadata, sharing, accessibility, and reading flow to support authority-building content.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Blog', 'SEO', 'Authority'],
    href: '/blog',
  },
  {
    title: 'Reusable docs component system',
    description:
      'Unified documentation pages around reusable feature grids, CTA blocks, concept tabs, decision grids, related links, steps, and clearer heading hierarchy.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Docs', 'Components', 'DX'],
    href: '/docs',
  },
  {
    title: 'NA-AI Landing documentation expansion',
    description:
      'Expanded setup, customization, deployment, project structure, license guidance, and production-readiness documentation for the NA-AI Landing template.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Templates', 'NA-AI', 'Docs'],
    href: '/docs/templates/na-ai-landing',
  },
  {
    title: 'Documentation decision surfaces',
    description:
      'Added clearer concept tabs and decision grids to help users compare product paths and understand when to use templates, UI, Starter Free, or Starter Pro.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Docs', 'Conversion', 'Product'],
    href: '/docs',
  },
  {
    title: 'Starter Pro production architecture documentation',
    description:
      'Expand Starter Pro documentation around architecture, deployment, infrastructure, environment variables, and production scalability patterns.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Starter PRO', 'Docs', 'Architecture'],
    href: '/docs/starter-pro',
  },
  {
    title: 'Scalable token foundation',
    description:
      'Migrate radius tokens to scalable rem-driven architecture for stronger consistency, theming flexibility, and long-term design-system maintainability.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Tokens', 'Design System', 'Scalability'],
    href: '/docs/design-system',
  },
  {
    title: 'Trusted Publishing infrastructure',
    description:
      'Harden npm publishing workflows through GitHub OIDC Trusted Publishing, Changesets automation, and improved release reliability.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['CI', 'Release', 'Infrastructure'],
  },
  {
    title: 'Commercial upgrade clarity',
    description:
      'Strengthen Free-to-Pro positioning with clearer upgrade messaging, product differentiation, and production-ready SaaS value communication.',
    status: 'Shipped',
    milestone: 'May 2026',
    tags: ['Conversion', 'Upgrade', 'Starter PRO'],
    href: '/upgrade',
  },
  {
    title: 'Reusable SaaS feature showcase system',
    description:
      'Introduced reusable Feature Showcase patterns across Starter Pro and documentation to standardize premium feature presentation, upgrade positioning, and scalable SaaS product communication.',
    status: 'Shipped',
    milestone: 'H1 2026',
    tags: ['Starter PRO', 'Patterns', 'Conversion'],
    href: '/docs/patterns/feature-showcase',
  },

  {
    title: 'Upgrade Gate monetization patterns',
    description:
      'Added reusable Upgrade Gate documentation and UX guidance for production-ready premium feature gating and upgrade flows.',
    status: 'Shipped',
    milestone: 'H1 2026',
    tags: ['Monetization', 'Upgrade', 'Patterns'],
    href: '/docs/patterns/upgrade-gate',
  },

  {
    title: 'Starter Pro product-surface refinement',
    description:
      'Refined dashboard, pricing, billing, projects, settings, admin, and navigation surfaces to improve SaaS product maturity and premium UX consistency.',
    status: 'Shipped',
    milestone: 'H1 2026',
    tags: ['Starter PRO', 'UX', 'Product'],
    href: '/starters/pro',
  },

  {
    title: 'Documentation modularity and decision systems',
    description:
      'Expanded reusable documentation structures, concept guidance, comparison systems, and decision-oriented product documentation.',
    status: 'Shipped',
    milestone: 'H1 2026',
    tags: ['Docs', 'DX', 'Architecture'],
    href: '/docs',
  },
  {
    title: 'Starter Pro PWA foundation',
    description:
      'Added installable manifest metadata, service worker registration, offline fallback behavior, PWA icons and screenshots, mobile viewport tuning, and app-like product messaging.',
    status: 'Shipped',
    milestone: 'Jun 2026',
    tags: ['Starter PRO', 'PWA', 'Mobile'],
    href: '/docs/starter-pro/pwa',
  },
  {
    title: 'Public shell and safe-area layout system',
    description:
      'Introduced shared public header and shell layouts for marketing and auth pages, centralizing navigation, footer structure, sticky headers, safe-area spacing, and responsive viewport behavior.',
    status: 'Shipped',
    milestone: 'Jun 2026',
    tags: ['Starter PRO', 'Layout', 'UX'],
    href: '/starters/pro',
  },
  {
    title: 'Local validation and billing testing docs',
    description:
      'Expanded Starter Pro guidance for local development, seeded auth fixtures, production-shaped test accounts, Stripe Checkout validation, webhook sync, and billing-aware access checks.',
    status: 'Shipped',
    milestone: 'Jun 2026',
    tags: ['Docs', 'Testing', 'Billing'],
    href: '/docs/starter-pro',
  },
  {
    title: 'Analytics, SEO, and recovery-path hardening',
    description:
      'Added Vercel Analytics to marketing and Starter Free, tightened Starter Free demo indexing controls, and improved 404 recovery paths with grouped ecosystem links and clearer CTAs.',
    status: 'Shipped',
    milestone: 'Jun 2026',
    tags: ['Analytics', 'SEO', 'Navigation'],
    href: '/changelog',
  },
  {
    title: 'Starter Pro release history and packaging',
    description:
      'Added Starter Pro release history documentation, centralized versioning policy references, and a release script for packaging versioned Starter Pro archives.',
    status: 'Shipped',
    milestone: 'Jun 2026',
    tags: ['Release', 'Docs', 'Starter PRO'],
    href: '/docs/starter-pro/releases-history',
  },
  {
    title: 'Marketing proof and launch visibility',
    description:
      'Added Starter Free and Starter Pro promotional screenshots, a rotating hero carousel, Product Hunt badges, PWA-focused guides, and stronger public messaging around pragmatic SaaS PWA foundations.',
    status: 'Shipped',
    milestone: 'Jun 2026',
    tags: ['Marketing', 'Proof', 'PWA'],
    href: '/starters/pro',
  },
  {
    title: 'Authority engineering content engine',
    description:
      'Publish high-value engineering articles around SaaS infrastructure, monorepos, CI/CD, npm publishing, release workflows, and production-ready developer systems.',
    status: 'Now',
    milestone: 'H1 2026',
    tags: ['Blog', 'Authority', 'SEO'],
    href: '/blog',
  },

  {
    title: 'Starter Pro conversion instrumentation',
    description:
      'Measure the docs-to-pricing-to-checkout funnel across Starter Free, Starter Pro, pricing, upgrade, and post-purchase access, starting with Vercel Analytics coverage.',
    status: 'Shipped',
    milestone: 'Jun 2026',
    tags: ['Analytics', 'Conversion', 'Sales'],
    href: '/pricing',
  },
  {
    title: 'Starter Pro sales proof and trust content',
    description:
      'Add implementation comparisons, real architecture explanations, buyer reassurance, launch checklists, and authority content.',
    status: 'Now',
    milestone: 'May 2026',
    tags: ['Trust', 'Content', 'Starter PRO'],
    href: '/starters/pro',
  },
  {
    title: 'Documentation-to-product conversion loop',
    description:
      'Keep guides, patterns, Starter Free, Starter Pro, pricing, and checkout paths aligned so public product journeys stay clear.',
    status: 'Now',
    milestone: 'H1 2026',
    tags: ['Docs', 'Conversion', 'SEO'],
    href: '/docs',
  },
  {
    title: 'Traffic-readiness trust cleanup',
    description:
      'Remove stale links, unfinished public promises, and outdated claims before sending more traffic to roadmap, changelog, pricing, and product pages.',
    status: 'Now',
    milestone: 'H1 2026',
    tags: ['Trust', 'SEO', 'Marketing'],
    href: '/changelog',
  },
];

function StatusBadge({ status }: { status: Status }) {
  const meta = statusMeta[status];

  return (
    <Badge
      variant={meta.variant}
      className={cn('rounded-[5px] text-[11px]', meta.className)}
    >
      {meta.label}
    </Badge>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2 py-0.5 text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

function RoadmapCard({ item }: { item: RoadmapItem }) {
  const body = (
    <Card className="h-full rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border hover:bg-surface-muted">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <div className="text-sm font-medium text-foreground">
            {item.title}
          </div>

          <p className="text-sm leading-7 text-muted-foreground">
            {item.description}
          </p>
        </div>

        <div className="shrink-0">
          <StatusBadge status={item.status} />
        </div>
      </div>

      {item.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      ) : null}
    </Card>
  );

  if (!item.href) return body;

  if (item.href.startsWith('http')) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        className="block h-full"
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={item.href} className="block h-full">
      {body}
    </Link>
  );
}

function groupByMilestone(list: RoadmapItem[]) {
  const map = new Map<Milestone, RoadmapItem[]>();

  for (const milestone of milestones.map((item) => item.id)) {
    map.set(milestone, []);
  }

  for (const item of list) {
    map.get(item.milestone)?.push(item);
  }

  return map;
}

export default function RoadmapPage() {
  const byMilestone = groupByMilestone(items);

  const shipped = items.filter(
    (item) => item.status === 'Shipped',
  ).length;
  const now = items.filter((item) => item.status === 'Now').length;
  const next = items.filter((item) => item.status === 'Next').length;
  const later = items.filter(
    (item) => item.status === 'Later',
  ).length;

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
            <Badge
              variant="secondary"
              className="gap-2 rounded-[5px]"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              Public roadmap
            </Badge>
          </div>

          <h1 className="font-brand mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Roadmap
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
            A release-driven view of PyColors work across UI
            foundations, guides, patterns, Starter Free, Starter Pro,
            commercial delivery, trust, and product clarity.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-balance text-xs leading-6 text-muted-foreground">
            This roadmap reflects current product direction. It is not
            a contractual delivery promise, and scope may evolve based
            on real usage, feedback, bugs, and commercial priorities.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-4">
            <Card className="rounded-[5px] border border-border-subtle bg-surface px-4 py-3 shadow-soft">
              <div className="text-2xl font-semibold">{shipped}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                shipped
              </div>
            </Card>

            <Card className="rounded-[5px] border border-primary/25 bg-primary/5 px-4 py-3 shadow-soft">
              <div className="text-2xl font-semibold">{now}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                now
              </div>
            </Card>

            <Card className="rounded-[5px] border border-border-subtle bg-surface px-4 py-3 shadow-soft">
              <div className="text-2xl font-semibold">{next}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                next
              </div>
            </Card>

            <Card className="rounded-[5px] border border-border-subtle bg-surface px-4 py-3 shadow-soft">
              <div className="text-2xl font-semibold">{later}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                later
              </div>
            </Card>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-[5px]">
              <Link href="/docs">Read the docs</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-[5px]"
            >
              <Link href="/changelog">View changelog</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-[5px]"
            >
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </header>

        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
            <div className="text-sm font-medium">Single thing</div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Ship the PyColors funnel: Guides → Blog → Patterns /
              Examples → Starter Free → Starter Pro.
            </p>
          </Card>

          <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
            <div className="text-sm font-medium">
              Documentation-first
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Every component, guide, article, and starter should help
              users understand what to build, why it matters, and how
              to ship.
            </p>
          </Card>

          <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
            <div className="text-sm font-medium">
              Commercial readiness
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Trust pages, pricing clarity, launch proof, delivery
              reliability, analytics, docs depth, auth, and billing.
            </p>
          </Card>
        </section>

        <section className="mt-10">
          <Card className="rounded-[5px] border border-primary/25 bg-primary/5 p-6 shadow-soft sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-primary/25 bg-background/60"
                >
                  How to read this roadmap
                </Badge>

                <h2 className="font-brand text-2xl font-semibold tracking-tight">
                  Release-driven, not promise-driven.
                </h2>
              </div>

              <div className="space-y-5">
                <p className="text-sm leading-7 text-muted-foreground">
                  Shipped items reflect public work already released.
                  Now reflects active cleanup and product priorities.
                  Next and Later are used only when public scope is
                  realistic enough to show.
                </p>

                <div className="flex flex-wrap gap-2 border-t border-border-subtle pt-5">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href="/starters/free">Starter Free</Link>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href="/starters/pro">Starter Pro</Link>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href="/pricing">Pricing</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-12 space-y-12">
          {milestones.map((milestone) => {
            const list = byMilestone.get(milestone.id) ?? [];

            return (
              <div key={milestone.id} className="space-y-4">
                <div className="flex flex-col gap-2 border-b border-border-subtle pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="font-brand text-xl font-semibold tracking-tight">
                      {milestone.title}
                    </h2>

                    <p className="mt-1 max-w-3xl text-sm leading-7 text-muted-foreground">
                      {milestone.subtitle}
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

        <section className="mt-14">
          <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface p-6 shadow-medium sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-pro-border bg-pro-surface-muted"
                >
                  Have a request?
                </Badge>

                <h2 className="font-brand text-2xl font-semibold tracking-tight">
                  Public feedback stays scoped and practical.
                </h2>

                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  For UI package bugs or documentation issues, use the
                  public repository. Broader product direction stays
                  selective and release-driven.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <a
                    href="https://github.com/pycolors-io/pycolors-ui/issues"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open UI issue
                  </a>
                </Button>

                <Button asChild className="rounded-[5px]">
                  <a
                    href="https://github.com/pycolors-io/pycolors-ui"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View UI repository
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
