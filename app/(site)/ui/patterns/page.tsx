import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Check,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  Lock,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';

import { Badge, Button, Card, CardContent, cn } from '@pycolors/ui';
import { Container } from '@/components/container';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title: 'SaaS Patterns | PyColors',
  description:
    'Production-shaped SaaS patterns built with PyColors UI. Explore dashboards, billing, settings, teams, analytics, and admin surfaces designed to move from interface logic to real product structure.',
  alternates: { canonical: '/ui/patterns' },
  openGraph: {
    title: 'SaaS Patterns | PyColors',
    description:
      'Production-shaped SaaS patterns built with PyColors UI. Explore dashboards, billing, settings, teams, analytics, and admin surfaces.',
    url: '/ui/patterns',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Patterns | PyColors',
    description:
      'Production-shaped SaaS patterns built with PyColors UI. Explore dashboards, billing, settings, teams, analytics, and admin surfaces.',
    images: ['/seo/twitter-main.png'],
  },
};

type Pattern = {
  title: string;
  description: string;
  tag: string;
  category: string;
};

const launchPrice = '199 €';

const patterns: Pattern[] = [
  {
    title: 'Dashboard layout',
    description:
      'KPI cards, activity hierarchy, quick actions, empty states, and the structure users expect from a credible SaaS product.',
    tag: 'Dashboard',
    category: 'Core',
  },
  {
    title: 'Billing page',
    description:
      'Plan state, upgrade entrypoints, invoice surfaces, and billing hierarchy designed to move toward monetization.',
    tag: 'Billing',
    category: 'Revenue',
  },
  {
    title: 'Settings page',
    description:
      'Profile, security, organization preferences, API keys, and danger-zone patterns that make a SaaS feel complete.',
    tag: 'Settings',
    category: 'Account',
  },
  {
    title: 'Team management',
    description:
      'Members, invitations, roles, and permissions designed for collaborative and B2B SaaS products.',
    tag: 'Teams',
    category: 'B2B',
  },
  {
    title: 'Protected app shell',
    description:
      'Navigation, account areas, session-aware states, and protected surfaces that prepare the app for real authentication.',
    tag: 'Protected',
    category: 'Architecture',
  },
  {
    title: 'Upgrade moment',
    description:
      'Pricing prompts, billing CTAs, upgrade states, and decision points that connect product usage to revenue.',
    tag: 'Upgrade',
    category: 'Conversion',
  },
];

const steps = [
  {
    eyebrow: 'Step 01',
    title: 'Understand the surface',
    description:
      'Study how credible SaaS screens are structured before rebuilding dashboards, settings, billing, and admin flows yourself.',
  },
  {
    eyebrow: 'Step 02',
    title: 'Validate with Starter Free',
    description:
      'Use the runnable starter to test layouts, states, navigation, product hierarchy, and monetization entrypoints quickly.',
  },
  {
    eyebrow: 'Step 03',
    title: 'Upgrade when wiring blocks launch',
    description:
      'Move to Starter Pro when authentication, billing, protected routes, and backend foundations become the real bottleneck.',
  },
] as const;

const proofPoints = [
  'Patterns show how components behave inside real product surfaces.',
  'Starter Free lets you run and adapt those surfaces without backend overhead.',
  'Starter Pro wires the business layer when you are ready to launch and charge.',
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

function PatternCard({ title, description, tag, category }: Pattern) {
  return (
    <Card className="flex h-full flex-col justify-between rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-colors hover:border-border">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge
              variant="outline"
              className="rounded-[5px] border-platform-border-subtle bg-platform-muted text-[11px]"
            >
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
            className="flex-1 rounded-[5px]"
          >
            <Link href="/examples">View pattern</Link>
          </Button>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 rounded-[5px]"
          >
            <Link href="/starters/free">See in product</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PatternsPage() {
  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <PageHero
          maxWidth="5xl"
          badges={[
            {
              label: 'Patterns',
              variant: 'secondary',
              icon: (
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
              ),
            },
            {
              label: 'SaaS surfaces',
              variant: 'outline',
            },
            {
              label: 'Free → Pro path',
              variant: 'outline',
            },
          ]}
          title="SaaS patterns that turn components into product surfaces."
          subtitle="Use patterns to understand the product structure. Use Starter Free to validate it. Use Starter Pro when auth and billing become the blocker."
          description="PyColors patterns connect UI primitives with real SaaS flows: dashboards, billing, settings, teams, protected app shells, and upgrade moments designed for products that need to feel credible before they are fully wired."
          actions={
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/starters/free">
                  Explore Starter Free
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
                <Link href="/examples">See examples</Link>
              </Button>

              <BuyStarterProButton />
            </div>
          }
          pills={[
            'Dashboards',
            'Billing',
            'Settings',
            'Teams',
            'Protected app',
            'Upgrade moments',
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
                      Why patterns matter
                    </Badge>

                    <Badge
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      Product structure
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-balance text-2xl font-semibold tracking-tight">
                      Components are easy. Product structure is what
                      creates trust.
                    </h2>

                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      Patterns help you move from isolated primitives
                      to the surfaces users actually judge:
                      dashboards, billing, settings, teams, protected
                      areas, and admin workflows.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-sm leading-7 text-muted-foreground">
                    PyColors patterns connect UI primitives with real
                    SaaS decisions: what the page should contain, how
                    actions are prioritized, where trust is created,
                    and when a surface is ready to become part of a
                    product.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                      <p className="text-sm font-medium">UI</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Reusable primitives and tokens.
                      </p>
                    </div>

                    <div className="rounded-[5px] border border-success-border-subtle bg-success-muted p-4">
                      <p className="text-sm font-medium">Free</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Runnable product surfaces.
                      </p>
                    </div>

                    <div className="rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted p-4">
                      <p className="text-sm font-medium">Pro</p>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        Auth, billing, and backend wiring.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Pill>Product-shaped UX</Pill>
                    <Pill>Reusable SaaS surfaces</Pill>
                    <Pill>Starter Free ready</Pill>
                    <Pill>Upgrade path</Pill>
                    <Pill>Conversion-aware</Pill>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeader
            eyebrow="Patterns"
            title="Core SaaS surfaces"
            description="Dashboards, billing, settings, teams, protected areas, and upgrade moments used in real SaaS products."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-[5px]"
              >
                <Link href="/guides">Read guides</Link>
              </Button>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((pattern) => (
              <PatternCard key={pattern.title} {...pattern} />
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeader
            eyebrow="Path"
            title="From UI primitive to launch-ready SaaS."
            description="Patterns turn components into structure. Starter Free turns structure into a runnable product surface. Starter Pro wires the business layer."
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
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/starters/free">
                  Start with Starter Free
                </Link>
              </Button>

              <BuyStarterProButton
                fullWidth={false}
                label={`Buy Starter Pro — ${launchPrice}`}
              />
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <Card className="rounded-[5px] border border-platform-border-subtle bg-surface shadow-soft">
            <CardContent className="p-6 sm:p-7">
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-[5px] border-platform-border-subtle bg-platform-muted"
                    >
                      Pattern logic
                    </Badge>

                    <Badge
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      SaaS system
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-balance text-2xl font-semibold tracking-tight">
                      PyColors connects primitives, patterns,
                      starters, and revenue flows.
                    </h2>

                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      The goal is not to collect components. The goal
                      is to move faster toward a product users can
                      trust and eventually pay for.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-sm leading-7 text-muted-foreground">
                    PyColors UI gives you the primitives. Patterns
                    give you the structure. Starter Free gives you the
                    runnable product surface. Starter Pro gives you
                    the business layer with auth, billing, protected
                    routes, and launch-ready foundations.
                  </p>

                  <ul className="grid gap-2 sm:grid-cols-2">
                    <CheckItem>UI primitives and tokens</CheckItem>
                    <CheckItem>Reusable SaaS surfaces</CheckItem>
                    <CheckItem>
                      Runnable Starter Free product
                    </CheckItem>
                    <CheckItem>
                      Starter Pro auth and billing
                    </CheckItem>
                  </ul>

                  <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-5">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href="/examples">See examples</Link>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href="/pricing">View pricing</Link>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <a
                        href="https://starter-demo.pycolors.io"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Live demo
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                  Use patterns to design better. Use Pro when you need
                  to launch.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  Start with Starter Free to validate the surface.
                  Move to Starter Pro when authentication, billing,
                  protected routes, and backend wiring become the real
                  blocker.
                </p>

                <div className="flex flex-wrap gap-2">
                  <Pill>Free validates UX</Pill>
                  <Pill>Pro wires auth</Pill>
                  <Pill>Pro wires billing</Pill>
                  <Pill>Launch price {launchPrice}</Pill>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[240px]">
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
