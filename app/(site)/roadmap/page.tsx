import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/container';
import { Badge, Card, cn, Button } from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'Public roadmap for PyColors UI. A realistic, release-driven plan focused on shipping, documentation quality, and commercial readiness.',
  openGraph: {
    title: 'Roadmap · PyColors UI',
    description:
      'A release-driven roadmap focused on shipping: core UI, docs baseline, stability patches, and monetization-ready steps.',
    url: '/roadmap',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roadmap · PyColors UI',
    description:
      'A release-driven roadmap focused on shipping and commercial readiness.',
    images: ['/seo/twitter-main.png'],
  },
};

type Status = 'Now' | 'Next' | 'Later' | 'Shipped';
type Milestone = 'Release Week' | 'Jan 2026' | 'Feb 2026' | 'H1 2026';

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
      'Ship PyColors UI v1.0: core components + docs baseline + release hygiene.',
  },
  {
    id: 'Jan 2026',
    title: 'January 2026 (post-release)',
    subtitle:
      'Stabilize, fix gaps, improve docs quality, and prepare distribution pages.',
  },
  {
    id: 'Feb 2026',
    title: 'February 2026',
    subtitle:
      'Advance UI components + patterns that unlock dashboard-grade product UIs.',
  },
  {
    id: 'H1 2026',
    title: 'H1 2026 (first half)',
    subtitle:
      'Blocks + first templates. Start monetization loop with predictable releases.',
  },
];

const items: RoadmapItem[] = [
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
      'Unify Related guides, add missing Preview/Code tabs, fix footer consistency between docs & marketing, quick navigation cleanup.',
    status: 'Shipped',
    milestone: 'Release Week',
    tags: ['Docs', 'DX'],
    href: '/docs',
  },
  {
    title: 'Release hygiene',
    description:
      'Changelog page + Roadmap page + version bump + release notes format. Ensure “v1.0” looks serious.',
    status: 'Shipped',
    milestone: 'Release Week',
    tags: ['Release', 'Trust'],
    href: '/changelog',
  },
  {
    title: 'Marketing site baseline (pycolors.io)',
    description:
      'Home page v2 + dedicated pages: Templates, License, About. Trust-first baseline for distribution.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Marketing', 'Trust'],
    href: '/',
  },
  {
    title: 'Patterns docs v1 (Overlays, Async actions, Data Table)',
    description:
      'New “Patterns” section with production UX rules + interactive demos: overlays decision matrix, async mutation UX, and data table states (loading/empty/error/filtering/row actions).',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Docs', 'Patterns', 'DX'],
    href: '/docs/patterns',
  },
  {
    title: 'Table (Data UI) direction',
    description:
      'Production-ready data table patterns and previews: loading/empty/error states, filtering, and row actions. Minimal, practical approach for dashboards.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Data UI', 'Dashboards', 'Docs'],
    href: '/docs/patterns/data-table',
  },
  {
    title: 'SEO & branding polish',
    description:
      'Metadata positioning cleanup (ecosystem messaging), canonical-ready docs metadata improvements, and refreshed favicons for consistent branding.',
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
      'Published NA-AI as a Template on PyColors site + demo/purchase links + license section + cross-links from docs.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Template', 'Sales'],
    href: '/templates/na-ai',
  },
  {
    title: 'UI Advanced v1',
    description:
      'First complete set of advanced, dashboard-grade UI primitives: Dialog/Modal, Dropdown/Menu, Tabs, Tooltip, and Toast. Each component ships with a stable, aligned API, accessibility-first behavior.',
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
    title: 'February 2026 — dashboard-grade UI unlock',
    description:
      'Shipped advanced UI + patterns required for dashboard-grade product UX (Overlays, Async actions, Data Table) and aligned component docs.',
    status: 'Shipped',
    milestone: 'Feb 2026',
    tags: ['Shipped', 'Advanced', 'Patterns', 'Dashboards', 'Docs'],
  },
  {
    title: 'Stability patch (v1.1.x)',
    description:
      'Fix edge cases, polish docs, align tokens + class naming, reduce inconsistencies discovered after weekly releases.',
    status: 'Shipped',
    milestone: 'Jan 2026',
    tags: ['Quality', 'Consistency'],
  },
  {
    title: 'Search & analytics baseline',
    description:
      'Finish GA4/GTM wiring, validate key events, and set up Search Console indexing checks for faster discoverability.',
    status: 'Now',
    milestone: 'Jan 2026',
    tags: ['SEO', 'Analytics', 'Trust'],
  },
  {
    title: 'Brand & legal baseline',
    description:
      'Logo v1, domain hygiene, and lightweight legal pages (license, privacy, terms) to support trust and early sales.',
    status: 'Now',
    milestone: 'Jan 2026',
    tags: ['Brand', 'Trust', 'Legal'],
  },
  {
    title: 'Monetization readiness v1',
    description:
      'Pricing + license clarity, packaging checklist, demo stability, and a minimal purchase funnel (Gumroad) aligned with weekly releases.',
    status: 'Next',
    milestone: 'Feb 2026',
    tags: ['Sales', 'Trust', 'Packaging'],
  },
  {
    title: 'Issue triage + public feedback loop',
    description:
      'Public “good first issue”, bug bash cadence, and roadmap grooming based on real user feedback from docs + templates.',
    status: 'Next',
    milestone: 'Feb 2026',
    tags: ['Community', 'Quality', 'DX'],
    href: 'https://github.com/pycolors-io/pycolors-ui/issues',
  },
  {
    title: 'Blocks library (marketing + SaaS)',
    description:
      'Copy/paste sections: hero, feature grids, pricing, testimonials, FAQ, CTA, footers. Each block documented.',
    status: 'Later',
    milestone: 'H1 2026',
    tags: ['Blocks', 'Marketing'],
  },
  {
    title: 'Templates line v1',
    description:
      'First premium templates built on PyColors UI: landing + dashboard. Packaging + README + license + demo.',
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
          <p className="text-sm text-muted-foreground leading-relaxed">
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
              A realistic plan focused on shipping. This roadmap is
              aligned with the v1.0 release week (Fri 9 Jan 2026) and
              outlines the next steps to grow PyColors UI into a
              stable, production-ready foundation for the broader
              PyColors ecosystem.
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
            </div>
          </header>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="p-5">
                <div className="text-sm font-medium">
                  Single thing
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Ship PyColors UI Kit Pro v1.0 and iterate weekly
                  with measurable releases.
                </p>
              </Card>

              <Card className="p-5">
                <div className="text-sm font-medium">
                  Documentation-first
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Every component ships with Preview, Usage, Code, and
                  Props.
                </p>
              </Card>

              <Card className="p-5">
                <div className="text-sm font-medium">
                  Commercial readiness
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Trust pages, licensing, demos, packaging, and a
                  predictable update cadence.
                </p>
              </Card>
            </div>
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
                    Requests and issues help prioritize what ships
                    next.
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
              Note: roadmap items may shift based on feedback, bugs,
              and real-world usage.
            </p>
          </section>
        </Container>
      </main>

    </div>
  );
}
