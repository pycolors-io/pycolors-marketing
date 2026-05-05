import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  CreditCard,
  Eye,
  ExternalLink,
  Layers3,
  LayoutDashboard,
  Lock,
  Sparkles,
  Users,
} from 'lucide-react';

import { Badge, Button, Card, CardContent, cn } from '@pycolors/ui';
import { Container } from '@/components/container';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';

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

const launchPrice = '199 €';

const AVAILABLE_NOW = {
  title: 'PyColors Starter Free',
  description:
    'A runnable production-shaped SaaS starter available today with auth UX, dashboard, CRUD, billing entrypoints, settings, and admin surfaces.',
  tag: 'Available now',
  repoHref: 'https://github.com/pycolors-io/pycolors-starter-free',
  demoHref: 'https://starter-demo.pycolors.io/',
} as const;

type ExampleDirection = {
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
};

const exampleDirections: ExampleDirection[] = [
  {
    title: 'AI SaaS Dashboard',
    description:
      'Usage metrics, prompt history, credits, billing visibility, and product surfaces for AI-native SaaS products.',
    category: 'Usage',
    icon: Sparkles,
  },
  {
    title: 'B2B SaaS Platform',
    description:
      'Organization switching, team management, roles, permissions, and collaborative workflows for company-ready products.',
    category: 'Teams',
    icon: Users,
  },
  {
    title: 'Analytics Product',
    description:
      'Reports, KPI hierarchy, charts, filters, and metric-heavy product surfaces for data-oriented SaaS tools.',
    category: 'Data',
    icon: LayoutDashboard,
  },
  {
    title: 'Subscription SaaS',
    description:
      'Plans, upgrades, invoices, usage metrics, and monetization-focused surfaces designed to support recurring revenue products.',
    category: 'Revenue',
    icon: CreditCard,
  },
  {
    title: 'Admin Platform',
    description:
      'Moderation tools, permissions, queues, and operational surfaces for products with stronger internal control needs.',
    category: 'Operations',
    icon: Lock,
  },
  {
    title: 'Startup SaaS MVP',
    description:
      'A lighter product direction with dashboard, onboarding, project CRUD, and the minimum surface needed to feel credible fast.',
    category: 'MVP',
    icon: Layers3,
  },
];

const steps = [
  {
    eyebrow: 'Step 01',
    title: 'Explore real product surfaces',
    description:
      'See how dashboards, billing pages, team systems, and admin surfaces feel when the product is structured and credible.',
  },
  {
    eyebrow: 'Step 02',
    title: 'Start from a runnable baseline',
    description:
      'Use Starter Free to move from inspiration to a real SaaS surface without starting from scratch.',
  },
  {
    eyebrow: 'Step 03',
    title: 'Upgrade when wiring matters',
    description:
      'Move to Starter Pro when auth, billing, backend foundations, and production wiring become the real blocker to launch.',
  },
] as const;

const proofPoints = [
  'Starter Free is the runnable product example available today.',
  'Patterns explain how the SaaS surfaces are structured.',
  'Starter Pro wires auth, billing, protected routes, and backend foundations.',
] as const;

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function Pill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function CheckItem({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
      <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface">
        <Check className="h-3 w-3 text-foreground" />
      </span>
      <span className="leading-6">{children}</span>
    </li>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
}: {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly action?: React.ReactNode;
  readonly align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mb-8 space-y-3',
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="rounded-[5px] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            {eyebrow}
          </Badge>
        ) : null}

        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {align === 'left' && action ? (
        <div className="shrink-0 sm:self-start">{action}</div>
      ) : null}
    </div>
  );
}

function AvailableNowCard() {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardContent className="p-6 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-[5px]">
                {AVAILABLE_NOW.tag}
              </Badge>

              <Badge variant="outline" className="rounded-[5px]">
                Starter Free
              </Badge>

              <Badge variant="outline" className="rounded-[5px]">
                Runnable demo
              </Badge>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight">
                {AVAILABLE_NOW.title}
              </h3>

              <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                {AVAILABLE_NOW.description}
              </p>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              <CheckItem>Dashboard surface</CheckItem>
              <CheckItem>Auth UX screens</CheckItem>
              <CheckItem>CRUD patterns</CheckItem>
              <CheckItem>Billing entrypoints</CheckItem>
              <CheckItem>Settings surface</CheckItem>
              <CheckItem>Admin/member flows</CheckItem>
            </ul>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <Button
              asChild
              className="h-10 w-full rounded-[5px] text-sm lg:w-55"
            >
              <a
                href={AVAILABLE_NOW.demoHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open the Starter Free live demo"
              >
                Open live demo
                <Eye className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-10 w-full rounded-[5px] text-sm lg:w-55"
            >
              <a
                href={AVAILABLE_NOW.repoHref}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Open the Starter Free GitHub repository"
              >
                View GitHub repo
                <ExternalLink
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-10 w-full rounded-[5px] text-sm lg:w-55"
            >
              <Link href="/starters/free">
                Read Starter Free details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExampleDirectionCard({
  title,
  description,
  tag,
  category,
  icon: Icon,
}: ExampleDirection) {
  return (
    <Card className="flex h-full flex-col justify-between rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-colors hover:border-border">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted text-muted-foreground">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>

            <Badge
              variant="outline"
              className="rounded-[5px] border-platform-border-subtle bg-platform-muted text-xs"
            >
              {category}
            </Badge>
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
            className="flex-1 rounded-[5px]"
          >
            <Link href="/starters/free">Starter Free</Link>
          </Button>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 rounded-[5px]"
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
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: 'Examples',
              variant: 'secondary',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
            {
              label: 'Product proof',
              variant: 'outline',
            },
            {
              label: 'Available now',
              variant: 'outline',
            },
          ]}
          title="See what a PyColors SaaS product can feel like."
          subtitle="Examples make the product direction visible before the business layer is fully wired."
          description="Explore the runnable Starter Free demo available today, then see the SaaS directions PyColors is designed to support across dashboards, billing, teams, analytics, admin systems, and future Pro-ready products."
          actions={
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/starters/free">
                  Start with Starter Free
                  <ArrowRight
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <a
                  href={AVAILABLE_NOW.demoHref}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open live demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>

              <BuyStarterProButton />
            </div>
          }
          pills={[
            'Runnable demo',
            'Dashboards',
            'Billing',
            'Teams',
            'Admin',
            'Upgrade path',
          ]}
          extra={
            <div className="mx-auto grid max-w-4xl gap-3 text-left sm:grid-cols-3">
              {proofPoints.map((point) => (
                <CheckItem key={point}>{point}</CheckItem>
              ))}
            </div>
          }
        />

        <section className="py-10 sm:py-12">
          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
            <CardContent className="p-6 sm:p-7">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-[5px] border-platform-border-subtle bg-platform-muted"
                    >
                      Why examples matter
                    </Badge>

                    <Badge
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      Product proof
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-balance text-2xl font-semibold tracking-tight">
                      Examples turn product direction into something
                      visible.
                    </h2>

                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      Components explain the building blocks. Patterns
                      explain the interface logic. Examples show what
                      a real SaaS can feel like.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-sm leading-7 text-muted-foreground">
                    This page separates what is already available from
                    the product directions PyColors is designed to
                    support next, so builders can evaluate the
                    ecosystem honestly before moving toward Starter
                    Free or Starter Pro.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                      <p className="text-sm font-medium">UI</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Primitives and patterns.
                      </p>
                    </div>

                    <div className="rounded-[5px] border border-success-border-subtle bg-success-muted p-4">
                      <p className="text-sm font-medium">Free</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Runnable product surface.
                      </p>
                    </div>

                    <div className="rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted p-4">
                      <p className="text-sm font-medium">Pro</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Auth and billing wiring.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Pill>Runnable example</Pill>
                    <Pill>Product-shaped UX</Pill>
                    <Pill>Honest availability</Pill>
                    <Pill>Upgrade path</Pill>
                    <Pill>Conversion-aware</Pill>
                  </div>
                </div>
              </div>
            </CardContent>
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
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-[5px]"
              >
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
            align="center"
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {steps.map((step) => (
              <Card
                key={step.eyebrow}
                className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft"
              >
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {step.eyebrow}
                  </div>

                  <div className="text-sm font-medium">
                    {step.title}
                  </div>

                  <p className="text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-[5px] px-6 text-sm font-medium"
            >
              <Link href="/ui/patterns">Browse patterns</Link>
            </Button>
          </div>
        </section>

        <section className="pt-4">
          <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface px-6 py-8 shadow-medium sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-pro-border bg-pro-surface-muted"
                >
                  Next step
                </Badge>

                <h2 className="text-2xl font-semibold tracking-tight">
                  See the surface. Then wire the business layer.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  Use Starter Free to begin with a production-shaped
                  SaaS surface today, then move to Starter Pro when
                  authentication, billing, protected routes, and
                  backend foundations need to be wired.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill>Starter Free validates UX</Pill>
                  <Pill>Starter Pro wires auth</Pill>
                  <Pill>Starter Pro wires billing</Pill>
                  <Pill>Launch price {launchPrice}</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-60">
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    'h-11 rounded-[5px] text-sm font-medium',
                    focusRing,
                  )}
                >
                  <Link href="/starters/free">Starter Free</Link>
                </Button>

                <BuyStarterProButton
                  label={`Buy Starter Pro — ${launchPrice}`}
                />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}
