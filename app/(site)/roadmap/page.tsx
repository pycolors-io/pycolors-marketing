import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/container';
import { Badge, Card, cn, Button } from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'Public roadmap for the PyColors ecosystem: UI, Starters, Guides, and future premium products. A release-driven plan focused on shipping, trust, and monetization readiness.',
  alternates: { canonical: '/roadmap' },
  openGraph: {
    title: 'Roadmap · PyColors',
    description:
      'A release-driven roadmap for PyColors: UI, Guides, Starters, and premium products. Shipping-first, docs-first, and monetization readiness.',
    url: '/roadmap',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap · PyColors',
    description:
      'A release-driven roadmap for PyColors: UI, Guides, Starters, and premium products.',
    images: ['/seo/twitter-main.png'],
  },
};

type Status = 'Now' | 'Next' | 'Later' | 'Shipped';
type Milestone =
  | 'Release Week'
  | 'Jan 2026'
  | 'Feb 2026'
  | 'Mar 2026'
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
      'Expand PyColors.io into a SaaS learning and conversion funnel: guides, patterns, examples, access, and PRO positioning.',
  },
  {
    id: 'H1 2026',
    title: 'H1 2026 (first half)',
    subtitle:
      'Move from positioning to monetization: Starter PRO scope, premium packaging, and launch readiness.',
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
    tags: ['Shipped', 'Advanced', 'Patterns', 'Dashboards', 'Docs'],
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
    href: '/docs/saas-starter',
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
    href: '/access',
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
    title: 'Waitlist capture for premium demand',
    description:
      'Added a PRO waitlist page with early interest capture, pricing preview, and bundle-direction messaging to support launch preparation.',
    status: 'Shipped',
    milestone: 'Mar 2026',
    tags: ['Waitlist', 'Audience', 'Launch', 'Growth'],
    href: '/waitlist',
  },
  {
    title: 'Navigation restructuring',
    description:
      'Updated the primary navigation to reflect the product learning flow: UI, Patterns, Examples, Guides, and Starters.',
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

  // NOW
  {
    title: 'Starter PRO wiring baseline',
    description:
      'Turn the PRO offer from positioning into scoped implementation direction: auth provider guidance, session handling, billing direction, backend foundations, and production setup rules.',
    status: 'Now',
    milestone: 'Mar 2026',
    tags: ['Starter PRO', 'Architecture', 'Auth', 'Billing'],
    href: '/upgrade',
  },
  {
    title: 'Waitlist conversion loop',
    description:
      'Connect waitlist capture to a more reliable launch workflow: segmentation, email flow, pricing announcement sequence, and clearer launch CTA placement.',
    status: 'Now',
    milestone: 'Mar 2026',
    tags: ['Waitlist', 'Conversion', 'Launch'],
    href: '/waitlist',
  },

  // NEXT
  {
    title: 'Starter PRO offer page hardening',
    description:
      'Finalize feature comparison, FAQ, upgrade narrative, and packaging detail so the PRO offer feels commercially ready before launch.',
    status: 'Next',
    milestone: 'Mar 2026',
    tags: ['PRO', 'Packaging', 'Sales', 'Trust'],
    href: '/upgrade',
  },
  {
    title: 'Monetization readiness v2',
    description:
      'Align pricing, checkout logic, license language, demos, and upgrade path into a cleaner premium conversion system across the site.',
    status: 'Next',
    milestone: 'Mar 2026',
    tags: ['Sales', 'Checkout', 'Pricing', 'Trust'],
    href: '/access',
  },
  {
    title: 'Search & analytics baseline',
    description:
      'Finish GA4 / GTM wiring, validate key events, and set up Search Console indexing checks for stronger discoverability.',
    status: 'Next',
    milestone: 'Mar 2026',
    tags: ['SEO', 'Analytics', 'Trust'],
  },
  {
    title: 'Cookie preferences + analytics consent (optional)',
    description:
      'If analytics are enabled, add a lightweight consent layer and document what is tracked while keeping implementation minimal.',
    status: 'Next',
    milestone: 'Mar 2026',
    tags: ['Privacy', 'Analytics', 'Trust'],
    href: '/privacy',
  },
  {
    title: 'Issue triage + public feedback loop',
    description:
      'Add better issue triage, public “good first issue” direction, and roadmap grooming based on real user feedback.',
    status: 'Next',
    milestone: 'Mar 2026',
    tags: ['Community', 'Quality', 'DX'],
    href: 'https://github.com/pycolors-io/pycolors-ui/issues',
  },

  // LATER
  {
    title: 'Starter PRO release',
    description:
      'Launch the first premium Starter PRO package with production-oriented auth, billing, backend foundation, and launch-readiness guidance.',
    status: 'Later',
    milestone: 'H1 2026',
    tags: ['Starter PRO', 'Premium', 'Launch'],
    href: '/waitlist',
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
  for (const m of milestones.map((x) => x.id)) map.set(m, []);
  for (const item of list) map.get(item.milestone)?.push(item);
  return map;
}

export default function RoadmapPage() {
  const byMilestone = groupByMilestone(items);

  const shipped = items.filter((i) => i.status === 'Shipped').length;
  const now = items.filter((i) => i.status === 'Now').length;
  const next = items.filter((i) => i.status === 'Next').length;
  const later = items.filter((i) => i.status === 'Later').length;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
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
              A realistic, release-driven plan focused on shipping.
              This roadmap tracks how PyColors evolves from UI
              foundations into a SaaS builder ecosystem: learning
              resources, production patterns, Starter Free, Starter
              PRO, and future premium offers.
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
                <Link href="/access">View access</Link>
              </Button>
            </div>
          </header>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="p-5">
                <div className="text-sm font-medium">
                  Single thing
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ship the PyColors ecosystem funnel: Guides →
                  Patterns / Examples → Starter Free → Starter PRO.
                  Weekly releases, measurable improvements, and a
                  public roadmap.
                </p>
              </Card>

              <Card className="p-5">
                <div className="text-sm font-medium">
                  Documentation-first
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Every component, guide, and starter should help
                  users understand what to build, why it matters, and
                  how to ship it with clearer conventions.
                </p>
              </Card>

              <Card className="p-5">
                <div className="text-sm font-medium">
                  Commercial readiness
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Trust pages, licensing, demos, pricing clarity,
                  waitlist capture, analytics, and a predictable
                  release cadence.
                </p>
              </Card>
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h2 className="font-brand text-lg font-semibold tracking-tight">
                    How to read this roadmap
                  </h2>
                  <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                    Shipped items reflect public work already
                    released. Now and Next reflect the strongest
                    current product and monetization priorities. Later
                    reflects likely direction, not a fixed delivery
                    commitment.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/upgrade">Upgrade</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/waitlist">Waitlist</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl space-y-10">
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

          <section className="mx-auto mt-12 w-full max-w-5xl">
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
              Roadmap items may shift based on feedback, bugs,
              technical constraints, and real-world usage.
            </p>
          </section>
        </Container>
      </main>
    </div>
  );
}
