import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Eye,
  ExternalLink,
  Layers3,
  Sparkles,
} from 'lucide-react';

import { Badge, Button, Card, CardContent, cn } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title: 'Examples | PyColors',
  description:
    'Explore production-shaped SaaS interfaces built with PyColors. See what is available today through Starter Free and the product directions the ecosystem is designed to support.',
  alternates: { canonical: '/examples' },
  openGraph: {
    title: 'Examples | PyColors',
    description:
      'Explore production-shaped SaaS interfaces built with PyColors. See what is available today and where the ecosystem can take your product next.',
    url: '/examples',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Examples | PyColors',
    description:
      'Explore production-shaped SaaS interfaces built with PyColors. See what is available today and where the ecosystem can take your product next.',
    images: ['/seo/twitter-main.png'],
  },
};

const AVAILABLE_NOW = {
  title: 'PyColors Starter Free',
  description:
    'A production-shaped SaaS starter available today with auth UX, dashboard, CRUD, billing entrypoints, settings, and admin surfaces.',
  tag: 'Available now',
  repoHref: 'https://github.com/pycolors-io/pycolors-starter-free',
  demoHref: 'https://starter-demo.pycolors.io/',
} as const;

type ExampleDirection = {
  title: string;
  description: string;
  tag: string;
  category: string;
};

const exampleDirections: ExampleDirection[] = [
  {
    title: 'AI SaaS Dashboard',
    description:
      'Usage metrics, prompt history, credits, billing visibility, and product surfaces for AI-native SaaS products.',
    tag: 'Direction',
    category: 'Usage',
  },
  {
    title: 'B2B SaaS Platform',
    description:
      'Organization switching, team management, roles, permissions, and collaborative workflows for company-ready products.',
    tag: 'Direction',
    category: 'Teams',
  },
  {
    title: 'Analytics Product',
    description:
      'Reports, KPI hierarchy, charts, filters, and metric-heavy product surfaces for data-oriented SaaS tools.',
    tag: 'Direction',
    category: 'Data',
  },
  {
    title: 'Subscription SaaS',
    description:
      'Plans, upgrades, invoices, usage metrics, and monetization-focused surfaces designed to support recurring revenue products.',
    tag: 'Direction',
    category: 'Revenue',
  },
  {
    title: 'Admin Platform',
    description:
      'Moderation tools, permissions, queues, and operational surfaces for products with stronger internal control needs.',
    tag: 'Direction',
    category: 'Operations',
  },
  {
    title: 'Startup SaaS MVP',
    description:
      'A lighter product direction with dashboard, onboarding, project CRUD, and the minimum surface needed to feel credible fast.',
    tag: 'Direction',
    category: 'MVP',
  },
];

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

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
      className={`mb-6 space-y-3 ${
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'
      }`}
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

function AvailableNowCard() {
  return (
    <Card className="rounded-[28px] border p-6 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{AVAILABLE_NOW.tag}</Badge>
            <Badge variant="outline">Starter Free</Badge>
            <Badge variant="outline">Production-shaped</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
              {AVAILABLE_NOW.title}
            </h3>

            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              {AVAILABLE_NOW.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Pill>Dashboard</Pill>
            <Pill>Auth UX</Pill>
            <Pill>CRUD patterns</Pill>
            <Pill>Billing entrypoints</Pill>
            <Pill>Admin surfaces</Pill>
          </div>
        </div>

        <div className="flex min-w-[220px] flex-col gap-2">
          <Button asChild>
            <a
              href={AVAILABLE_NOW.demoHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open the Starter Free live demo"
            >
              Open live demo
              <Eye className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>

          <Button asChild variant="secondary">
            <a
              href={AVAILABLE_NOW.repoHref}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open the Starter Free GitHub repository"
            >
              View GitHub repo
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </a>
          </Button>

          <Button asChild variant="outline">
            <Link href="/starters/free">
              Read Starter Free details
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ExampleDirectionCard({
  title,
  description,
  tag,
  category,
}: ExampleDirection) {
  return (
    <Card className="flex h-full flex-col justify-between rounded-2xl border">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="outline" className="text-xs">
              {tag}
            </Badge>

            <span className="text-xs text-muted-foreground">
              {category}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold tracking-tight">
              {title}
            </h3>

            <p className="text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1"
          >
            <Link href="/starters/free">Starter Free</Link>
          </Button>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1"
          >
            <Link href="/ui/patterns">Browse patterns</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ExamplesPage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'UI', href: '/ui' },
              { label: 'Examples', href: '/ui/examples' },
            ]}
          />
        </div>

        <section className="relative overflow-hidden rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

          <div className="mx-auto max-w-4xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary" className="gap-2">
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Examples
              </Badge>
              <Badge variant="outline">Product showcase</Badge>
              <Badge variant="outline">Honest availability</Badge>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Production-shaped SaaS interfaces.{' '}
              <span className="block text-muted-foreground">
                Built to show what PyColors can support.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Explore what is available today through Starter Free,
              and see the product directions PyColors is designed to
              support across dashboards, billing, teams, analytics,
              and admin systems.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/starters/free">
                  Start with Starter Free
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/ui/patterns">Browse UI patterns</Link>
              </Button>

              <BuyStarterProButton
                fullWidth={false}
                label="Buy Starter Pro — 199 €"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Pill>Dashboards</Pill>
              <Pill>Billing</Pill>
              <Pill>Teams</Pill>
              <Pill>Admin</Pill>
              <Pill>Analytics</Pill>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-2">
                    <Layers3
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Why examples matter
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  Components explain the building blocks. Patterns
                  explain the interface logic. Examples show what a
                  real product can feel like. This page separates what
                  is already available from the product directions
                  PyColors is designed to support next.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/guides">Read guides</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Available now"
            title="What you can actually explore today"
            description="Starter Free is the current runnable example of the PyColors product direction."
          />

          <AvailableNowCard />
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Example directions"
            title="Where the ecosystem is designed to go next"
            description="These are not random inspiration cards. They reflect the kinds of SaaS products PyColors patterns and starters are built to support."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href="/starters/pro">Explore Starter Pro</Link>
              </Button>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exampleDirections.map((example) => (
              <ExampleDirectionCard
                key={example.title}
                {...example}
              />
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="How examples fit the PyColors path"
            title="Examples are not just inspiration. They help you see the product before the business layer is wired."
            description="The point is to shorten the distance between product imagination and product execution."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 01
                </div>
                <div className="text-sm font-medium">
                  Explore real product surfaces
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  See how dashboards, billing pages, team systems, and
                  admin surfaces can look when the product feels
                  structured and credible.
                </p>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 02
                </div>
                <div className="text-sm font-medium">
                  Start from a runnable baseline
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Use Starter Free to move from inspiration to a real
                  SaaS surface without starting from scratch.
                </p>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 03
                </div>
                <div className="text-sm font-medium">
                  Upgrade when wiring matters
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Move to Starter Pro when auth, billing, backend
                  foundations, and production wiring become the real
                  blocker to launch.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section className="pt-4">
          <Card className="rounded-[32px] border bg-card px-6 py-8 shadow-lg shadow-black/5 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-lg font-semibold tracking-tight">
                  Build your own SaaS faster
                </h2>
                <p className="text-sm text-muted-foreground">
                  Use Starter Free to begin with a production-shaped
                  SaaS surface today, then move to Starter Pro when
                  the business layer needs to be wired.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[240px]">
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    'h-11 rounded-xl text-sm font-medium',
                    focusRing,
                  )}
                >
                  <Link href="/starters/free">Starter Free</Link>
                </Button>
                <BuyStarterProButton />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}
