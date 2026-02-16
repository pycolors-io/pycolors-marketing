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
    'Release notes and Product updates for PyColors. Clear versions, stable conventions, and documentation-first releases.',
  openGraph: {
    title: 'Changelog · PyColors UI',
    description:
      'Release notes and Product updates for PyColors. Stable versions, predictable conventions.',
    url: '/changelog',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Changelog · PyColors UI',
    description: 'Release notes and Product updates for PyColors.',
    images: ['/seo/twitter-main.png'],
  },
};

type ChangelogStatus = 'Stable' | 'Beta';

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
          'Introduced a new “Patterns” docs section: opinionated, feature-level UI patterns with guidance on when to use them.',
          'Added a comprehensive Data Table pattern doc: anatomy, states, variations for SaaS/admin dashboards.',
          'Shipped Data Table preview components: loading, empty, error, filterable, and row actions states.',
          'Added an Overlays pattern guide (Dropdown vs Dialog vs Sheet) with interactive demos and accessibility rules.',
          'Added Async Actions UX patterns: optimistic/pessimistic updates, feedback tiers, error handling + interactive demos (save, delete with undo, optimistic toggle).',
          'Refactored Toast docs (removed unnecessary provider) and centralized data table preview exports via an index file.',
        ],
      },
      {
        title: 'SEO & metadata',
        items: [
          'Refined site metadata messaging to better position PyColors as a product ecosystem (not only a UI system).',
          'Simplified metadata configuration by removing redundant title/description where Open Graph is the source of truth.',
          'Enhanced docs layout SEO with improved titles/descriptions and canonical URL support.',
        ],
      },
      {
        title: 'Branding & UI polish',
        items: [
          'Updated favicon assets for improved branding consistency across browsers and platforms.',
        ],
      },
      {
        title: 'Refactoring',
        items: [
          'Standardized component prop typing by migrating from interfaces to type aliases for consistency and readability.',
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
      'Major expansion of PyColors UI with advanced Radix-based components, practical product patterns, and a clearer product ecosystem. This release strengthens PyColors as a SaaS-ready UI foundation — from core interactions to data UI and platform-level structure.',
    highlights: [
      {
        title: 'New UI components',
        items: [
          'Password Input — accessible show/hide toggle with keyboard and screen reader support.',
          'Sheet — slide-over panels for filters, contextual actions, and side content (Radix Dialog-based).',
          'Dialog — accessible modal primitives with composable subcomponents and consistent styling.',
          'Dropdown Menu — groups, submenus, checkbox/radio items, and keyboard shortcuts (Radix-based).',
          'Tabs — segmented navigation with size variants and consistent theming.',
          'Toast — minimal, accessible notifications with variant styling for non-blocking feedback.',
          'Table — composable data table primitives with built-in empty and loading states.',
          'Skeleton — loading placeholder primitive to preserve layout and improve perceived performance.',
          'Empty State — flexible primitive for first-run, no-results, and guidance-driven UX.',
          'Pagination — composable, stateless pagination primitives (UI-only, no routing or data logic).',
        ],
      },
      {
        title: 'Docs & product guides',
        items: [
          'New guides covering SaaS layout composition, async UI states (empty/loading/error), and accessible forms with validation.',
          'Documentation expanded beyond components to include real-world product patterns and UX guidance.',
          'Every new component ships with usage examples, design notes, and accessibility guidelines.',
        ],
      },
      {
        title: 'Marketing & ecosystem structure',
        items: [
          'Restructured marketing pages to better reflect the PyColors product ecosystem.',
          'Introduced dedicated sections for UI and Starters to clarify positioning and future offerings.',
          'Home page refined to focus on product value, use-cases, and SaaS builder workflows.',
          'Navigation updated to streamline the user journey across Docs, UI, Templates, and Starters.',
        ],
      },
      {
        title: 'Platform readiness',
        items: [
          'Added Radix dependencies for dialog, dropdown menu, and tabs to support advanced interactions.',
          'Improved discoverability through clearer information architecture and interactive previews.',
          'Brand consistency improved with a dynamic logo and simplified layout spacing.',
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
          'NA-AI template landing: clear value prop, stack, and “early → migration to PyColors UI planned”.',
          'External links for distribution (Gumroad) + improved discoverability.',
        ],
      },
      {
        title: 'About page',
        items: [
          'New About page: motivation, design principles, and direction of PyColors UI.',
          'Docs-first philosophy and trust positioning for early adopters.',
        ],
      },
      {
        title: 'Navigation & UI polish',
        items: [
          'Navigation cleanup: standardized nav data + new links (Templates/About).',
          'Accessibility improvements: focus handling, keyboard support, ARIA refinements.',
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
      'Official v1.0 launch of PyColors UI: core components, docs baseline, and release hygiene — a serious, production-ready foundation.',
    highlights: [
      {
        title: 'UI Core Components',
        items: [
          'Button — consistent variants + sizing, loading/disabled states, accessible interactions.',
          'Input — stable sizing, error/helper states, consistent tokens.',
          'Badge — semantic variants, neutral + emphasis use-cases.',
          'Card — structural layout primitive with optional interactive states.',
          'Alert — purpose-driven messaging, minimal but expressive when needed.',
        ],
      },
      {
        title: 'Documentation Baseline',
        items: [
          'Every component ships with Preview / Usage / Code / Props.',
          'Predictable API surface with consistent conventions across components.',
          'Docs quality contract established for future releases.',
        ],
      },
      {
        title: 'Release Hygiene',
        items: [
          'Changelog page + Roadmap page shipped.',
          'Semantic versioning introduced and version bumped to v1.0.0.',
          'Release notes format standardized for future iterations.',
        ],
      },
    ],
    cta: { label: 'View roadmap', href: '/roadmap' },
  },
];

function StatusPill({ status }: { status: ChangelogStatus }) {
  const isStable = status === 'Stable';
  return (
    <Badge variant="secondary" className="gap-2">
      <span
        className={cn(
          'inline-flex h-1.5 w-1.5 rounded-full',
          isStable ? 'bg-success' : 'bg-warning',
        )}
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
                Product updates
              </Badge>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Changelog
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Product updates, improvements, and fixes for PyColors
              UI. Clear versions, stable conventions, and
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

          {/* Timeline */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="relative">
              {/* vertical line */}
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
                              Why v1.0?
                            </span>{' '}
                            Stable APIs, consistent conventions, and
                            complete docs — a serious baseline for
                            building real products.
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button asChild>
                            <Link href="/docs/ui">
                              Browse components{' '}
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
              Note: changelog entries reflect shipped work; internal
              tasks and refactors may be grouped into a single release
              item.
            </p>
          </section>
        </Container>
      </main>

    </div>
  );
}
