import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Layers3,
  LayoutTemplate,
  Sparkles,
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

const patterns: Pattern[] = [
  {
    title: 'Dashboard layout',
    description:
      'KPI cards, activity hierarchy, quick actions, and the structure users expect from a serious product.',
    tag: 'Dashboard',
    category: 'Core',
  },
  {
    title: 'Billing page',
    description:
      'Plan state, upgrade entrypoints, invoice surfaces, and billing hierarchy designed for monetization.',
    tag: 'Billing',
    category: 'Revenue',
  },
  {
    title: 'Settings page',
    description:
      'Profile, security, organization preferences, API keys, and danger zone patterns that make a SaaS feel complete.',
    tag: 'Settings',
    category: 'Account',
  },
  {
    title: 'Team management',
    description:
      'Members, invitations, roles, and permissions designed for collaborative SaaS products.',
    tag: 'Teams',
    category: 'B2B',
  },
  {
    title: 'Analytics dashboard',
    description:
      'Charts, filters, KPI cards, and reporting structure for products where data visibility matters.',
    tag: 'Analytics',
    category: 'Data',
  },
  {
    title: 'Admin panel',
    description:
      'Moderation, permissions, operational views, and admin workflow patterns for stronger internal control.',
    tag: 'Admin',
    category: 'Operations',
  },
];

const steps = [
  {
    eyebrow: 'Step 01',
    title: 'Understand the structure',
    description:
      'See how credible SaaS surfaces are organized before rebuilding the same flows from scratch.',
  },
  {
    eyebrow: 'Step 02',
    title: 'Start from a real surface',
    description:
      'Use Starter Free to validate layouts, states, navigation, and product hierarchy quickly.',
  },
  {
    eyebrow: 'Step 03',
    title: 'Upgrade when it matters',
    description:
      'Move to Starter Pro when auth, billing, protected flows, and launch infrastructure become blockers.',
  },
] as const;

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-3 py-1 text-xs text-muted-foreground">
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
        <div className="sm:self-start">{action}</div>
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
              label: 'Production-shaped',
              variant: 'outline',
            },
          ]}
          title="SaaS patterns that feel like real products."
          subtitle="From UI primitives to product surfaces."
          description="Explore dashboards, billing, settings, teams, analytics, and admin workflows designed for real SaaS applications — not just component demos."
          actions={
            <>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/starters/free">
                  Explore Starter Free
                  <ArrowRight
                    className="ml-2 h-4 w-4"
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

              <BuyStarterProButton
                fullWidth={false}
                label="Buy Starter Pro — 199 €"
              />
            </>
          }
          pills={[
            'Dashboards',
            'Billing',
            'Settings',
            'Teams',
            'Admin',
          ]}
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
                      Components are easy. Product structure is not.
                    </h2>

                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      Patterns help you move from isolated primitives
                      to the surfaces users actually evaluate:
                      dashboards, billing, settings, teams, and admin
                      workflows.
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

                  <div className="flex flex-wrap gap-2">
                    <Pill>Product-shaped UX</Pill>
                    <Pill>Reusable SaaS surfaces</Pill>
                    <Pill>Starter Free ready</Pill>
                    <Pill>Upgrade path</Pill>
                    <Pill>Conversion-aware</Pill>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-5">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href="/ui">Explore UI system</Link>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href="/pricing">View pricing</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-14 sm:py-16 lg:py-20">
          <SectionHeader
            eyebrow="Patterns"
            title="Core product surfaces"
            description="Dashboards, billing, settings, teams, analytics, and admin workflows used in real SaaS products."
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
            title="From UI to product"
            description="Patterns turn components into structure. Starters turn structure into a product."
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
                      PyColors connects primitives, patterns, and
                      starters.
                    </h2>

                    <p className="max-w-md text-sm leading-7 text-muted-foreground">
                      The goal is not to collect components. The goal
                      is to move faster toward a product users can
                      trust.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <p className="text-sm leading-7 text-muted-foreground">
                    PyColors UI gives you the primitives. Patterns
                    give you the structure. Starter Free gives you the
                    runnable surface. Starter Pro gives you the
                    business layer with auth, billing, and
                    launch-ready foundations.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Pill>UI primitives</Pill>
                    <Pill>SaaS patterns</Pill>
                    <Pill>Starter Free</Pill>
                    <Pill>Starter Pro</Pill>
                  </div>

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
                      <Link href="/starters/free">Starter Free</Link>
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
                  Build faster. Launch sooner.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground">
                  Start with Starter Free. Move to Starter Pro when
                  authentication, billing, and protected product flows
                  become the real bottleneck.
                </p>
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

                <BuyStarterProButton />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}
