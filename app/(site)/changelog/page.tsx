import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Tag,
  CheckCircle2,
} from 'lucide-react';

import { Container } from '@/components/container';
import {
  Badge,
  cn,
  Button,
  Card,
  CardHeader,
  CardContent,
} from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Release notes and product updates for the PyColors ecosystem: UI, Starters, and Templates. Predictable releases, stable conventions, documentation-first.',
  openGraph: {
    title: 'Changelog · PyColors',
    description:
      'Release notes and product updates across PyColors: UI, Starters, Templates. Predictable releases and documentation-first shipping.',
    url: '/changelog',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Changelog · PyColors',
    description:
      'Release notes and product updates across PyColors: UI, Starters, Templates.',
    images: ['/seo/twitter-main.png'],
  },
};

type ChangelogStatus = 'Stable' | 'Beta' | 'In progress';

type ChangelogItem = {
  version: string;
  title: string;
  dateLabel: string;
  dateISO: string;
  status: ChangelogStatus;
  releaseWeekLabel: string;
  summary: string;
  highlights: Array<{
    title: string;
    items: string[];
  }>;
  cta?: { label: string; href: string };
};

const CHANGELOG: ChangelogItem[] = [
  {
    version: 'v1.2.2',
    title: 'Trust foundation: Terms + Privacy',
    dateLabel: 'Fri 27 Feb 2026',
    dateISO: '2026-02-27',
    status: 'Stable',
    releaseWeekLabel: 'Feb 2026 (weekly release)',
    summary:
      'This release completes the trust baseline required for commercial distribution. It adds Terms of Service and a Privacy Policy, updates the footer “Trust” section, and clarifies how commercial templates (like NA-AI) relate to the licensing model.',
    highlights: [
      {
        title: 'Legal baseline shipped',
        items: [
          'Added /terms (Terms of Service) to define website and digital product usage rules.',
          'Added /privacy (Privacy Policy) covering minimal data collection, cookies/analytics, and third-party checkout handling.',
        ],
      },
      {
        title: 'Trust surface & navigation',
        items: [
          'Updated footer “Trust” links to include Terms and Privacy.',
          'Small copy alignment to ensure commercial template licensing remains clear and consistent across pages.',
        ],
      },
      {
        title: 'Commercial readiness (templates)',
        items: [
          'Reinforced the “open core → paid acceleration” model: open-source foundations remain discoverable while premium templates stay properly licensed.',
          'Keeps NA-AI positioning consistent with a commercial license included at purchase (Gumroad distribution).',
        ],
      },
    ],
    cta: {
      label: 'Read the license',
      href: '/license',
    },
  },
  {
    version: 'v1.2.1',
    title: 'Starter Free docs + marketing UX polish',
    dateLabel: 'Fri 20 Feb 2026',
    dateISO: '2026-02-20',
    status: 'Stable',
    releaseWeekLabel: 'Feb 2026 (weekly release)',
    summary:
      'This release hardens PyColors.io as a distribution and onboarding surface. It ships a full Starter Free documentation set, improves the UI and Starter positioning pages, and adds trust signals like npm badges (shields.io) while tightening accessibility and navigation across mobile and layout surfaces.',
    highlights: [
      {
        title: 'Starter Free documentation shipped',
        items: [
          'Added a comprehensive Starter Free docs set: philosophy, installation, project structure, deployment, upgrade path, and key concepts (auth & billing).',
          'Improved progressive adoption guidance to validate product screens first, then wire backend later.',
          'Added SaaS Starter and release policy docs to collections for clearer onboarding and team conventions.',
        ],
      },
      {
        title: 'Marketing pages: clearer product positioning',
        items: [
          'Revamped Starter Free page with product-focused UX: clearer Free vs Pro comparison, CTAs, and a more actionable quickstart.',
          'Redesigned UI page messaging around outcomes (shipping SaaS screens) vs generic component lists, with richer structure and trust indicators.',
          'Enhanced homepage with a dedicated UI section, improved starter links, and clearer CTAs + demo paths.',
          'Refined About copy and added open-source links for better transparency and discoverability.',
        ],
      },
      {
        title:
          'Trust surface: npm badges + safer external SVG support',
        items: [
          'Introduced a reusable npm badge component (version / downloads / license) to improve package visibility.',
          'Enabled remote SVG badges from shields.io and updated CSP to support external images while keeping security constraints.',
          'Switched multiple links to internal routing and surfaced docs paths across pages for stronger navigation consistency.',
        ],
      },
      {
        title: 'UX & accessibility polish',
        items: [
          'Improved mobile nav a11y: focus first link on open, added skip-to-content, and prevented layout shift with scrollbar compensation.',
          'Refined footer layout and external links hierarchy; streamlined badges/CTAs for readability.',
          'Cleaned redundant in-code comments and removed unused code for a tighter, more maintainable marketing codebase.',
          'Removed sidebar border and simplified positioning for a cleaner UI.',
        ],
      },
    ],
    cta: {
      label: 'Read Starter Free docs',
      href: '/docs/saas-starter',
    },
  },
  {
    version: 'v1.2.0',
    title:
      'Ecosystem public launch: Tokens + ESLint + Release Engine',
    dateLabel: 'Fri 13 Feb 2026',
    dateISO: '2026-02-13',
    status: 'Stable',
    releaseWeekLabel: 'Feb 2026 (weekly release)',
    summary:
      'This release marks a major ecosystem milestone: PyColors is now a structured developer platform with public packages (UI, Tokens, ESLint) and a hardened weekly release engine. The focus shifts from “components” to “shipping infrastructure”.',
    highlights: [
      {
        title: 'New public packages',
        items: [
          '@pycolors/tokens published on npm: light/dark themes + semantic variables + Tailwind v4 bridge.',
          '@pycolors/eslint-config v1.0.0 released: base, Next.js, and React internal flat configs (ESLint v9 ready).',
          'Improved peer dependency clarity and ecosystem alignment across packages.',
        ],
      },
      {
        title: 'Release & distribution engine',
        items: [
          'Stabilized Changesets publish workflow.',
          'Subtree sync strategy hardened (monorepo = source of truth, mirrors = distribution).',
          'GitHub Releases automated for public packages.',
        ],
      },
      {
        title: 'Marketing alignment',
        items: [
          'Changelog and roadmap updated to reflect ecosystem positioning.',
          'Clearer messaging: PyColors as a SaaS shipping platform (UI → Starter → Templates).',
          'Weekly release cadence formalized as a trust-building mechanism.',
        ],
      },
    ],
    cta: { label: 'Explore ecosystem', href: '/docs' },
  },
  {
    version: 'v1.1.2',
    title: 'Starter foundations + release engine',
    dateLabel: 'Fri 6 Feb 2026',
    dateISO: '2026-02-06',
    status: 'Stable',
    releaseWeekLabel: 'Feb 2026 (weekly release)',
    summary:
      'This release focuses on foundations for the upcoming SaaS Starter (Free) and strengthening the shipping engine: discoverability, trust surface, and consistent ecosystem messaging.',
    highlights: [
      {
        title: 'Starters (in progress)',
        items: [
          'Started the SaaS Starter (Free): laying down production-ready foundations (structure, DX conventions, UI baseline).',
          'Prepared ecosystem cross-links (UI ↔ Starters ↔ Templates) to support a cohesive builder workflow.',
          'Defined starter release conventions: what is “shipped” vs “in progress” to keep public updates honest and predictable.',
        ],
      },
      {
        title: 'Discoverability & trust',
        items: [
          'Search & analytics baseline: ensure key pages are trackable and indexable (events, metadata hygiene).',
          'Improved messaging across metadata to reflect PyColors as an ecosystem (not only a UI kit).',
          'Roadmap / changelog copy aligned with weekly release cadence and commercial readiness.',
        ],
      },
      {
        title: 'Release engine',
        items: [
          'Standardized weekly release structure: highlights blocks, CTA focus, and a clearer “what’s next” narrative.',
          'Small UI/UX polish passes to reduce friction and improve perceived quality.',
        ],
      },
    ],
    cta: { label: 'View roadmap', href: '/roadmap' },
  },
  {
    version: 'v1.1.1',
    title: 'Patterns docs + SEO polish',
    dateLabel: 'Fri 30 Jan 2026',
    dateISO: '2026-01-30',
    status: 'Stable',
    releaseWeekLabel: 'Jan 2026 (weekly release)',
    summary:
      'Docs expansion for production-grade UX patterns (data tables, overlays, async actions) plus SEO/metadata cleanup, favicon refresh, and type-level refactors for consistency.',
    highlights: [
      {
        title: 'Docs & patterns',
        items: [
          'Introduced a new “Patterns” docs section: feature-level UI patterns with guidance on when to use them.',
          'Added a comprehensive Data Table pattern doc: anatomy, states, and variations for SaaS/admin dashboards.',
          'Shipped Data Table preview components: loading, empty, error, filterable, and row actions states.',
          'Added an Overlays pattern guide (Dropdown vs Dialog vs Sheet) with interactive demos and accessibility rules.',
          'Added Async Actions UX patterns: optimistic/pessimistic updates, feedback tiers, error handling + interactive demos.',
          'Refactored Toast docs and centralized preview exports via an index file.',
        ],
      },
      {
        title: 'SEO & metadata',
        items: [
          'Refined site metadata messaging to better position PyColors as a product ecosystem.',
          'Simplified metadata configuration by removing redundant title/description where Open Graph is the source of truth.',
          'Enhanced docs layout SEO with improved titles/descriptions and canonical URL support.',
        ],
      },
      {
        title: 'Branding & UI polish',
        items: [
          'Updated favicon assets for improved branding consistency.',
        ],
      },
      {
        title: 'Refactoring',
        items: [
          'Standardized component prop typing by migrating from interfaces to type aliases.',
        ],
      },
    ],
    cta: { label: 'Browse patterns', href: '/docs/patterns' },
  },
  {
    version: 'v1.1.0',
    title: 'Advanced UI + product patterns',
    dateLabel: 'Fri 23 Jan 2026',
    dateISO: '2026-01-23',
    status: 'Stable',
    releaseWeekLabel: 'Jan 2026 (weekly release)',
    summary:
      'Major expansion of PyColors UI with advanced components, practical product patterns, and a clearer ecosystem structure — a SaaS-ready foundation from core interactions to data UI.',
    highlights: [
      {
        title: 'New UI components',
        items: [
          'Password Input, Sheet, Dialog, Dropdown Menu, Tabs, Toast, Table, Skeleton, Empty State, Pagination.',
        ],
      },
      {
        title: 'Docs & product guides',
        items: [
          'New guides covering SaaS layout composition, async UI states, and accessible forms with validation.',
          'Docs expanded beyond components to include real-world product patterns and UX guidance.',
        ],
      },
      {
        title: 'Marketing & ecosystem structure',
        items: [
          'Restructured marketing pages to better reflect the PyColors product ecosystem.',
          'Introduced dedicated sections for UI and Starters to clarify positioning and future offerings.',
        ],
      },
      {
        title: 'Platform readiness',
        items: [
          'Added Radix dependencies for advanced interactions.',
          'Improved discoverability through clearer information architecture and interactive previews.',
        ],
      },
    ],
    cta: { label: 'Browse components', href: '/docs/ui' },
  },
  {
    version: 'v1.0.1',
    title: 'Marketing & trust baseline',
    dateLabel: 'Fri 16 Jan 2026',
    dateISO: '2026-01-16',
    status: 'Stable',
    releaseWeekLabel: 'Jan 2026 (post-release)',
    summary:
      'Improves marketing + trust surface: templates listing, NA-AI template page, narrative About, and navigation/accessibility polish.',
    highlights: [
      {
        title: 'Templates',
        items: [
          'Templates index page: listing of available templates with status and positioning.',
          'NA-AI template landing: clear value prop + stack + distribution links.',
        ],
      },
      {
        title: 'About page',
        items: [
          'New About page: design principles + direction of PyColors UI.',
          'Docs-first philosophy and trust positioning for early adopters.',
        ],
      },
      {
        title: 'Navigation & UI polish',
        items: [
          'Navigation cleanup + accessibility improvements.',
          'Quick start copy updated for clearer onboarding.',
        ],
      },
    ],
    cta: { label: 'View templates', href: '/templates' },
  },
  {
    version: 'v1.0.0',
    title: 'UI Core Foundation',
    dateLabel: 'Fri 9 Jan 2026',
    dateISO: '2026-01-09',
    status: 'Stable',
    releaseWeekLabel: 'Release Week (Mon 5 → Fri 9 Jan 2026)',
    summary:
      'Official v1.0 launch of PyColors UI: core components, docs baseline, and release hygiene — a production-ready foundation.',
    highlights: [
      {
        title: 'UI Core Components',
        items: [
          'Button, Input, Badge, Card, Alert — consistent variants, sizing, and accessibility baseline.',
        ],
      },
      {
        title: 'Documentation Baseline',
        items: [
          'Every component ships with Preview / Usage / Code / Props.',
          'Docs quality contract established for future releases.',
        ],
      },
      {
        title: 'Release Hygiene',
        items: [
          'Changelog page + Roadmap page shipped.',
          'Semantic versioning introduced and version bumped to v1.0.0.',
        ],
      },
    ],
    cta: { label: 'View roadmap', href: '/roadmap' },
  },
];

function StatusPill({ status }: { status: ChangelogStatus }) {
  const tone =
    status === 'Stable'
      ? 'bg-success'
      : status === 'Beta'
        ? 'bg-warning'
        : 'bg-muted-foreground';

  return (
    <Badge variant="secondary" className="gap-2">
      <span
        className={cn('inline-flex h-1.5 w-1.5 rounded-full', tone)}
      />
      {status}
    </Badge>
  );
}

function TimelineDot() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center">
      <div className="absolute inset-0 rounded-full border bg-card shadow-sm" />
      <div className="relative rounded-full border bg-background p-1.5">
        <CheckCircle2
          className="h-4 w-4 text-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <header className="mx-auto w-full max-w-4xl text-center">
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                Ecosystem updates
              </Badge>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Changelog
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Product updates across PyColors: UI, Starters, and
              Templates. Clear versions, stable conventions, and
              documentation-first releases.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/docs">Read the docs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/roadmap">View roadmap</Link>
              </Button>
            </div>
          </header>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="relative">
              <div
                className="absolute left-4 top-0 h-full w-px bg-border/70 sm:left-[18px]"
                aria-hidden="true"
              />

              <div className="space-y-8">
                {CHANGELOG.map((entry) => (
                  <article
                    key={entry.version}
                    className="relative pl-14"
                  >
                    <div className="absolute left-0 top-1">
                      <TimelineDot />
                    </div>

                    <Card className="overflow-hidden">
                      <CardHeader className="border-b bg-card/60">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant="secondary"
                                className="font-medium"
                              >
                                {entry.version}
                              </Badge>
                              <StatusPill status={entry.status} />
                            </div>

                            <div className="space-y-1">
                              <h2 className="font-brand text-xl font-semibold tracking-tight">
                                {entry.title}
                              </h2>

                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <span className="inline-flex items-center gap-1.5">
                                  <Calendar
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  <time dateTime={entry.dateISO}>
                                    {entry.dateLabel}
                                  </time>
                                </span>

                                <span className="inline-flex items-center gap-1.5">
                                  <Tag
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  {entry.releaseWeekLabel}
                                </span>
                              </div>
                            </div>
                          </div>

                          {entry.cta ? (
                            <Button
                              asChild
                              variant="outline"
                              className="sm:mt-1"
                            >
                              <Link href={entry.cta.href}>
                                {entry.cta.label}
                                <ArrowRight
                                  className="ml-2 h-4 w-4"
                                  aria-hidden="true"
                                />
                              </Link>
                            </Button>
                          ) : null}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6 p-6">
                        <p className="max-w-3xl text-pretty text-sm text-muted-foreground sm:text-base">
                          {entry.summary}
                        </p>

                        <div className="space-y-6">
                          {entry.highlights.map((block) => (
                            <div
                              key={block.title}
                              className="space-y-2"
                            >
                              <h3 className="text-sm font-semibold tracking-tight">
                                {block.title}
                              </h3>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {block.items.map((it) => (
                                  <li key={it} className="flex gap-2">
                                    <span
                                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
                                      aria-hidden="true"
                                    />
                                    <span className="text-pretty">
                                      {it}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-4">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                              Strategy
                            </span>{' '}
                            Weekly releases build trust. Even when
                            features are still in progress, we ship
                            foundations and keep the roadmap explicit.
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button asChild>
                            <Link href="/docs/ui">
                              Browse components
                              <ArrowRight
                                className="ml-2 h-4 w-4"
                                aria-hidden="true"
                              />
                            </Link>
                          </Button>
                          <Button asChild variant="outline">
                            <Link href="/docs">Read docs</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </article>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Note: changelog entries reflect shipped work. Internal
              tasks and refactors may be grouped into a single release
              item.
            </p>
          </section>
        </Container>
      </main>
    </div>
  );
}
