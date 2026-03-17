import Link from 'next/link';
import type { Metadata } from 'next';
import {
  BadgeCheck,
  ExternalLink,
  ArrowRight,
  BookOpen,
  LayoutTemplate,
  Sparkles,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  cn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pycolors/ui';
import { Container } from '@/components/container';
import { NpmBadges } from '@/components/npm-badges';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Starter Free',
  description:
    'Starter Free gives you a production-shaped SaaS surface: auth UX, dashboard, CRUD screens, settings, billing entrypoints, and B2B member management — mocked by design, ready to wire.',
  alternates: { canonical: '/starters/free' },
  openGraph: {
    title: 'Starter Free · PyColors',
    description:
      'A production-shaped Next.js SaaS starter with real screens and UX contracts — mocked by design, ready to wire.',
    url: '/starters/free',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starter Free · PyColors',
    description:
      'A production-shaped Next.js SaaS starter with real screens and UX contracts — mocked by design, ready to wire.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const EXTERNAL = {
  demo: 'https://starter-demo.pycolors.io',
  repo: 'https://github.com/pycolors-io/pycolors-starter-free',
} as const;

const INTERNAL = {
  starters: '/starters',
  ui: '/ui',
  patterns: '/ui/patterns',
  examples: '/examples',
  guides: '/guides',
  docs: '/docs/saas-starter',
  docsUpgrade: '/docs/saas-starter/upgrade-to-pro',
  upgrade: '/upgrade',
  access: '/access',
  roadmap: '/roadmap',
} as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function TrustPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {label}
    </span>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="sm:self-start">{action}</div> : null}
    </div>
  );
}

function ProductFeatureCard({
  title,
  subtitle,
  points,
  why,
  href,
  badge,
}: {
  title: string;
  subtitle: string;
  points: string[];
  why: string;
  href: string;
  badge?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-medium">{title}</div>
            {badge ? (
              <Badge variant="outline" className="text-xs">
                {badge}
              </Badge>
            ) : null}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>

          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {points.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-muted-foreground">
            <span className="text-foreground">Why it matters:</span>{' '}
            {why}
          </p>

          <div className="pt-2">
            <Button asChild size="sm" variant="outline">
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${title} in the live demo`}
              >
                View in demo
                <ExternalLink
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ResourceCard({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Card className="p-5">
      <div className="space-y-3">
        <div className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-muted/30 text-muted-foreground">
          {icon}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-1">
          <Button asChild size="sm" variant="outline">
            <Link href={href}>{cta}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function StarterFreePage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Starters', href: '/starters' },
              { label: 'Starter Free', href: '/starters/free' },
            ]}
          />
        </div>
        {/* HERO */}
        <header className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Free
            </Badge>
            <Badge variant="outline">Production-shaped</Badge>

            <Link
              href={INTERNAL.starters}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                focusRing,
              )}
            >
              Back to Starters
            </Link>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Validate your SaaS surface first.
              <span className="block font-bold">
                Wire the business later.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Starter Free gives you a credible SaaS surface out of
              the box: auth UX, dashboard, data screens, settings,
              billing entrypoints, and B2B member management — mocked
              by design so you can move fast without backend overhead.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a
                href={EXTERNAL.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open the Starter Free live demo"
              >
                Open live demo
                <ExternalLink
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </Button>

            <Button asChild variant="secondary">
              <a
                href={EXTERNAL.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open the Starter Free repository on GitHub"
              >
                Get the repo (FREE)
                <ExternalLink
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </Button>

            <Button asChild variant="outline">
              <Link href={INTERNAL.docs}>Read the docs</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Pill>Next.js App Router</Pill>
            <Pill>Tailwind v4</Pill>
            <Pill>PyColors UI</Pill>
            <Pill>Mock data · No backend</Pill>
            <Pill>Real screens + UX contracts</Pill>
          </div>
        </header>

        {/* ENTRY POSITIONING */}
        <section className="py-10 sm:py-12">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-2">
                    <Sparkles
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Why Starter Free exists
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Starter Free is the entry point of the PyColors
                  ecosystem. Its job is simple: help you validate the
                  product surface before you spend time wiring
                  authentication, billing, backend contracts, and
                  deployment infrastructure.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[240px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.guides}>Guides</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.patterns}>UI Patterns</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.examples}>Examples</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* BUILT ON PYCOLORS UI */}
        <section className="py-10 sm:py-12">
          <Card className="p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-medium">
                    Built on PyColors UI (already included)
                  </div>
                  <Badge variant="outline" className="text-xs">
                    @pycolors/ui
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Starter Free ships with the PyColors UI primitives
                  you’ve already published: buttons, cards, badges,
                  dialogs, sheets, tabs, toasts, tables, pagination,
                  skeletons, empty states, and an accessible password
                  input.
                </p>

                <div className="pt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <NpmBadges packageName="@pycolors/ui" size="sm" />
                    <span className="text-xs text-muted-foreground">
                      Open source · versioned · shipped weekly
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.ui}>Explore UI</Link>
                    </Button>

                    <Button asChild size="sm" variant="outline">
                      <a
                        href="https://www.npmjs.com/package/@pycolors/ui"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        npm
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* WHAT YOU GET */}
        <section id="included" className="py-10 sm:py-12">
          <SectionHeader
            title="What you get"
            description="Not just components. A product-shaped SaaS surface you can run, inspect, and adapt."
            action={
              <Button asChild size="sm" variant="outline">
                <a
                  href={EXTERNAL.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open the live demo"
                >
                  Open demo
                  <ExternalLink
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            }
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <ProductFeatureCard
              title="/login + /register + /forgot"
              badge="Auth UX"
              subtitle="The mandatory entry point of any SaaS — with clean states and no provider lock-in."
              points={[
                'Email + password surface',
                'OAuth placeholder',
                'Forgot password flow',
                'States: loading / error / success',
              ]}
              why="You get the UX contract now and keep full freedom on which auth provider to wire later."
              href={`${EXTERNAL.demo}/login`}
            />

            <ProductFeatureCard
              title="/dashboard"
              badge="First impression"
              subtitle="The screen that makes your product feel credible on first load."
              points={[
                'Header with product context',
                'KPI placeholders',
                'Primary next action',
                'Empty / structured states',
              ]}
              why="A good dashboard makes your SaaS feel real immediately, even before production wiring."
              href={`${EXTERNAL.demo}/dashboard`}
            />

            <ProductFeatureCard
              title="/projects"
              badge="Core entity"
              subtitle="A realistic CRUD surface for your main business object."
              points={[
                'Table list',
                'Create / edit / delete',
                'Empty state',
                'Row actions + dialogs',
              ]}
              why="Every SaaS has a central entity. You can rename the domain later, but the pattern already works."
              href={`${EXTERNAL.demo}/projects`}
            />

            <ProductFeatureCard
              title="/settings"
              badge="Maturity"
              subtitle="The section that turns a mock product into something people trust."
              points={[
                'Tabs: profile / organization / security',
                'Password and session placeholders',
                'Danger zone surface',
              ]}
              why="Without structured settings, a product feels incomplete. This adds maturity from day one."
              href={`${EXTERNAL.demo}/settings`}
            />

            <ProductFeatureCard
              title="/billing"
              badge="Monetization"
              subtitle="Billing entrypoints and subscription surfaces — mocked by design, ready to wire."
              points={[
                'Current plan state',
                'Upgrade / downgrade actions',
                'Portal entrypoint (mock)',
                'Subscription status placeholders',
              ]}
              why="You can validate how monetization fits the product before wiring Stripe."
              href={`${EXTERNAL.demo}/billing`}
            />

            <ProductFeatureCard
              title="/admin"
              badge="B2B-ready"
              subtitle="A team and roles surface that makes the starter feel company-ready."
              points={[
                'Members table',
                'Roles: owner / member',
                'Invitations surface',
              ]}
              why="B2B credibility matters. This proves you’re building beyond a solo dashboard toy."
              href={`${EXTERNAL.demo}/admin`}
            />
          </div>
        </section>

        {/* LEARN / EXPLORE */}
        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Learn before you wire"
            description="Starter Free works even better when you connect it to the rest of the ecosystem."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <ResourceCard
              icon={
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              }
              title="Guides"
              description="Read focused SaaS guides covering dashboards, auth, billing, teams, admin systems, and product structure."
              href={INTERNAL.guides}
              cta="Read guides"
            />

            <ResourceCard
              icon={
                <LayoutTemplate
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              }
              title="UI Patterns"
              description="Move from primitives to production-shaped product surfaces built for real SaaS workflows."
              href={INTERNAL.patterns}
              cta="Browse patterns"
            />

            <ResourceCard
              icon={
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              }
              title="Examples"
              description="Explore real SaaS interface directions and what is already available today through Starter Free."
              href={INTERNAL.examples}
              cta="See examples"
            />
          </div>
        </section>

        {/* MOCKED ON PURPOSE */}
        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Mocked on purpose"
            description="Starter Free is frontend-first so you can validate structure, UX, and product credibility before infrastructure."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  No backend required
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Data is mocked so you can explore layouts,
                  navigation, product states, and flows without
                  setting up a database, API, or auth provider.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Mock data</Pill>
                  <Pill>No DB</Pill>
                  <Pill>No API</Pill>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Keep the surface, swap the wiring
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The goal is progressive adoption: keep the screens
                  and UX contracts, then plug your auth, billing, and
                  data layer when you’re ready.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Provider-agnostic</Pill>
                  <Pill>Stripe-ready</Pill>
                  <Pill>Backend-agnostic</Pill>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FREE VS PRO */}
        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Free validates UX. PRO wires the business."
            description="Starter Free helps you move fast now. PRO is the upgrade path when auth, billing, backend, and deployment become your bottleneck."
            action={
              <Button asChild size="sm" variant="default">
                <Link href={INTERNAL.upgrade}>
                  Explore PRO
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            }
          />

          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">FREE</Badge>
                  <Badge variant="outline">PRO (coming)</Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  Start with a credible product surface today. Upgrade
                  when you want the business wiring done for you.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <TrustPill label="No lock-in" />
                  <TrustPill label="Progressive adoption" />
                  <TrustPill label="Upgrade-ready" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:items-end">
                <Button asChild variant="outline">
                  <Link href={INTERNAL.docsUpgrade}>
                    Migration guide
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href={INTERNAL.access}>View Access</Link>
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">
                      Capability
                    </TableHead>
                    <TableHead className="w-[35%]">
                      FREE (today)
                    </TableHead>
                    <TableHead className="w-[35%]">
                      PRO (coming)
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Authentication
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Screens + UX states
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Providers + sessions + protected routes
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      Billing
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Billing UI + entrypoints
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Stripe subscriptions + portal + webhooks
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      Data layer
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Mock sources
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Backend foundations + production contracts
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      Organizations
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Single-org UI surface
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Multi-tenant foundations
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      Deployment
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Local-first
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Env setup + CI/CD + launch checklist
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <p className="mt-3 text-xs text-muted-foreground">
                PRO has its own page now. Roadmap tracks delivery, but{' '}
                <span className="text-foreground">/upgrade</span> is
                the source of truth for the offer.
              </p>
            </div>
          </Card>
        </section>

        {/* QUICK START */}
        <section className="py-8 sm:py-10">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Quick start
                </h2>
                <p className="text-sm text-muted-foreground">
                  Clone the repo, run the starter locally, and inspect
                  real SaaS screens in minutes.
                </p>

                <p className="text-xs text-muted-foreground">
                  Fast path: run → open dashboard → inspect surfaces →
                  adapt the product copy → wire later.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <TrustPill label="Next.js App Router" />
                  <TrustPill label="PNPM" />
                  <TrustPill label="Mock data (no backend)" />
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={EXTERNAL.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open repository
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>

                  <Button asChild size="sm" variant="secondary">
                    <a
                      href={EXTERNAL.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open live demo
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="w-full sm:max-w-md">
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-2 w-2 rounded-full bg-rose-500"
                        aria-hidden="true"
                      />
                      <span
                        className="inline-flex h-2 w-2 rounded-full bg-amber-500"
                        aria-hidden="true"
                      />
                      <span
                        className="inline-flex h-2 w-2 rounded-full bg-emerald-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-xs text-muted-foreground">
                        terminal
                      </span>
                    </div>

                    <a
                      href={EXTERNAL.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Open the Starter Free repository on GitHub"
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                        focusRing,
                      )}
                    >
                      GitHub
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  <div className="px-4 py-4">
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`git clone https://github.com/pycolors-io/pycolors-starter-free.git
cd pycolors-starter-free
pnpm install
pnpm dev`}</pre>

                    <div className="mt-3 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                      Then open{' '}
                      <span className="font-mono text-foreground">
                        http://localhost:3000
                      </span>
                    </div>

                    <div className="mt-3 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                      Docs:{' '}
                      <Link
                        href={INTERNAL.docs}
                        className="font-mono text-foreground underline underline-offset-4"
                      >
                        {INTERNAL.docs}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto mt-8 w-full max-w-5xl">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Start with the surface. Upgrade when wiring matters.
                </h2>
                <p className="text-sm text-muted-foreground">
                  Open the demo, clone the repo, and build on a
                  credible SaaS baseline now. Move to PRO when you
                  want auth, billing, backend, and deployment
                  foundations wired.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Real screens</Pill>
                  <Pill>Clear states</Pill>
                  <Pill>Upgrade path</Pill>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={EXTERNAL.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    See live demo
                    <ExternalLink
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>

                <Button asChild variant="secondary">
                  <Link href={INTERNAL.upgrade}>
                    See Upgrade to PRO
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Follow the setup guide in the docs →{' '}
            <Link
              href={INTERNAL.docs}
              className="font-mono text-foreground underline underline-offset-4"
            >
              /docs/saas-starter
            </Link>
          </p>
        </section>
      </div>
    </Container>
  );
}
