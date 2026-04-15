import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  LayoutTemplate,
  Sparkles,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
} from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title: 'Starters | PyColors',
  description:
    'Production-first SaaS starters built on PyColors UI. Start with a credible product surface today, then upgrade to real auth, real billing, and stronger business foundations when you are ready to launch.',
  alternates: { canonical: '/starters' },
  openGraph: {
    title: 'Starters | PyColors',
    description:
      'Production-first SaaS starters built on PyColors UI — designed for validation first and launch-ready upgrades later.',
    url: '/starters',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starters | PyColors',
    description:
      'Production-first SaaS starters built on PyColors UI — designed for validation first and launch-ready upgrades later.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
  ui: '/ui',
  patterns: '/ui/patterns',
  examples: '/examples',
  guides: '/guides',
  roadmap: '/roadmap',
  access: '/access',
  starterFree: '/starters/free',
  starterPro: '/starters/pro',
  docsStarter: '/docs/saas-starter',
  docsUpgrade: '/docs/saas-starter/upgrade-to-pro',
  templates: '/templates',
  upgrade: '/upgrade',
} as const;

const EXTERNAL = {
  starterDemo: 'https://starter-demo.pycolors.io',
} as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mb-6 space-y-3',
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className="space-y-2">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            {eyebrow}
          </Badge>
        ) : null}
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {align === 'left' && action ? (
        <div className="sm:self-start">{action}</div>
      ) : null}
    </div>
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
    <Card className="rounded-2xl border">
      <CardContent className="p-5">
        <div className="space-y-3">
          <div className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-muted/30 text-muted-foreground">
            {icon}
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">{title}</div>
            <p className="text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="pt-1">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-xl px-6 text-sm font-medium"
            >
              <Link href={href}>{cta}</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StarterCard({
  badge,
  title,
  subtitle,
  description,
  pills,
  primaryAction,
  secondaryAction,
}: {
  badge: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  pills: string[];
  primaryAction: React.ReactNode;
  secondaryAction?: React.ReactNode;
}) {
  return (
    <Card className="rounded-[28px] border p-6 shadow-sm shadow-black/5">
      <CardHeader className="space-y-4 px-0 pt-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div>{badge}</div>
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="mt-2 text-sm text-muted-foreground">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-0 pb-0">
        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <Pill key={pill}>{pill}</Pill>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {primaryAction}
          {secondaryAction}
        </div>
      </CardContent>
    </Card>
  );
}

export default function StartersPage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Starters', href: '/starters' },
            ]}
          />
        </div>

        <section className="relative overflow-hidden rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

          <div className="mx-auto max-w-4xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Starter Free available
              </Badge>
              <Badge variant="outline">Starter Pro available</Badge>

              <Link
                href={INTERNAL.ui}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                  focusRing,
                )}
              >
                Built on PyColors UI
              </Link>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              SaaS starters for validation first.{' '}
              <span className="block text-muted-foreground">
                Production foundations when you are ready to launch.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Start with a credible product surface today: dashboard,
              CRUD screens, settings, billing entrypoints, and auth
              UX. Then upgrade when you want real authentication, real
              Stripe billing, protected app architecture, and a faster
              path to revenue.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href={INTERNAL.starterFree}>
                  Open Starter Free
                </Link>
              </Button>

              <BuyStarterProButton
                fullWidth={false}
                label="Buy Starter Pro — 199 €"
              />

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href={INTERNAL.access}>
                  View pricing
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Pill>Next.js App Router</Pill>
              <Pill>Tailwind v4</Pill>
              <Pill>Real screens and UX contracts</Pill>
              <Pill>Validation-first</Pill>
              <Pill>Upgrade path included</Pill>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Starter docs live under{' '}
              <Link
                href={INTERNAL.docsStarter}
                className="font-mono text-foreground underline underline-offset-4"
              >
                {INTERNAL.docsStarter}
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="How to use starters"
            title="Start with the layer you actually need"
            description="The point is not to buy complexity too early. Start with the product surface when you are still validating. Move to the business layer when that becomes the real blocker."
            align="center"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <StarterCard
              badge={
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Free
                  </Badge>
                  <Badge variant="outline">Frontend-first</Badge>
                </div>
              }
              title="Starter Free"
              subtitle="The entry point for validating product shape."
              description="A production-shaped SaaS surface with auth screens, dashboard, CRUD patterns, settings, billing entrypoints, and B2B member management — mocked by design so you can move fast without backend overhead."
              pills={[
                'Mock data',
                'Layouts and states',
                'Ready to adapt',
              ]}
              primaryAction={
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>
              }
              secondaryAction={
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <a
                    href={EXTERNAL.starterDemo}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Live demo
                    <ExternalLink
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              }
            />

            <StarterCard
              badge={
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white/90" />
                    Paid
                  </Badge>
                  <Badge variant="outline">Starter Pro</Badge>
                </div>
              }
              title="Starter Pro"
              subtitle="The upgrade when auth and billing become the real bottleneck."
              description="Move from product-shaped starter to a real commercial SaaS baseline with authentication, Stripe billing, webhook synchronization, protected app foundations, and stronger launch-ready architecture."
              pills={[
                'Auth wired',
                'Billing wired',
                'Protected foundations',
              ]}
              primaryAction={
                <BuyStarterProButton
                  fullWidth={false}
                  label="Buy Starter Pro — 199 €"
                />
              }
              secondaryAction={
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.starterPro}>
                    Explore Starter Pro
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              }
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Before you build"
            title="Use the rest of the ecosystem to understand the product logic first"
            description="The starter becomes more valuable when you connect it to patterns, examples, and guides instead of treating it like an isolated repo."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <ResourceCard
              icon={
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              }
              title="Guides"
              description="Learn how SaaS products structure dashboards, auth, billing, team systems, project and admin surfaces."
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
              description="Explore production-shaped interface patterns before choosing how your own product should feel."
              href={INTERNAL.patterns}
              cta="Browse patterns"
            />

            <ResourceCard
              icon={
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              }
              title="Examples"
              description="Study real SaaS surface directions and what is already available today through Starter Free today."
              href={INTERNAL.examples}
              cta="See examples"
            />
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Free vs Pro"
            title="Free validates the surface. Pro accelerates the business layer."
            description="Do not think of Pro as more screens. Think of it as less repeated engineering work between your product and revenue."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.access}>See pricing</Link>
              </Button>
            }
          />

          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                  Capability
                </div>
                <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                  Starter Free
                </div>
                <div className="bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground">
                  Starter Pro
                </div>
              </div>

              {[
                {
                  cap: 'Auth',
                  free: 'Screens and UX states',
                  pro: 'Providers, sessions, protected routes',
                },
                {
                  cap: 'Billing',
                  free: 'Billing surface and entrypoints',
                  pro: 'Stripe checkout, portal, webhooks',
                },
                {
                  cap: 'Backend',
                  free: 'Frontend-only and mock sources',
                  pro: 'Production foundations and contracts',
                },
              ].map((row) => (
                <div
                  key={row.cap}
                  className="grid grid-cols-1 sm:grid-cols-3"
                >
                  <div className="border-t border-border px-4 py-3 text-sm font-medium">
                    {row.cap}
                  </div>
                  <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground sm:border-l">
                    {row.free}
                  </div>
                  <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground sm:border-l">
                    {row.pro}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              <span className="text-foreground">/starter-pro</span>{' '}
              explains the product.
              <span className="text-foreground"> /upgrade</span>{' '}
              explains when to move.
              <span className="text-foreground"> /access</span>{' '}
              defines the pricing decision.
            </p>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Builder journey"
            title="From learning SaaS products to shipping your own"
            description="The ecosystem is designed to reduce decision fatigue: understand, validate, then upgrade only when the next layer is truly needed."
          />

          <div className="grid gap-4 lg:grid-cols-4">
            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Learn
                </div>
                <div className="text-sm font-medium">
                  Understand SaaS products
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Read guides explaining dashboards, auth, billing,
                  team systems, and admin surfaces.
                </p>
                <div className="pt-3">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-xl px-6 text-sm font-medium"
                  >
                    <Link href={INTERNAL.guides}>Read guides</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Explore
                </div>
                <div className="text-sm font-medium">
                  Study real interfaces
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Browse patterns and examples to understand what a
                  credible product surface should feel like.
                </p>
                <div className="pt-3">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-xl px-6 text-sm font-medium"
                  >
                    <Link href={INTERNAL.examples}>See examples</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Validate
                </div>
                <div className="text-sm font-medium">
                  Run a SaaS surface locally
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Use Starter Free to validate product shape before
                  investing time into backend infrastructure.
                </p>
                <div className="pt-3">
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-11 rounded-xl px-6 text-sm font-medium"
                  >
                    <Link href={INTERNAL.starterFree}>
                      Open Starter Free
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Launch
                </div>
                <div className="text-sm font-medium">
                  Upgrade when wiring blocks you
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Move to Starter Pro when authentication, billing,
                  and foundations slow progress.
                </p>
                <div className="pt-3">
                  <BuyStarterProButton
                    fullWidth={false}
                    label="Buy Pro"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-10">
          <Card className="rounded-[32px] border p-6 shadow-lg shadow-black/5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                  Start free. Upgrade when the business layer matters.
                </h2>
                <p className="text-sm text-muted-foreground">
                  Use Starter Free now to validate UX. Move to Starter
                  Pro when you want the foundation wired and the path
                  to revenue shortened.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Progressive adoption</Pill>
                  <Pill>Stable UI system</Pill>
                  <Pill>Real upgrade path</Pill>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>
                {/* <BuyStarterProButton
                  fullWidth={false}
                  label="Buy Starter Pro — 199 €"
                /> */}
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Building in public. Shipping product-shaped SaaS
            foundations.
          </p>
        </section>
      </div>
    </Container>
  );
}
