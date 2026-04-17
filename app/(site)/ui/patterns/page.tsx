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
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

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
      'A production-shaped dashboard surface with KPI cards, activity hierarchy, quick actions, and the structure users expect from a serious product.',
    tag: 'Dashboard',
    category: 'Core',
  },
  {
    title: 'Billing page',
    description:
      'Subscription state, upgrade entrypoints, invoice surfaces, monetization hierarchy, and billing UX patterns that prepare for real Stripe wiring.',
    tag: 'Billing',
    category: 'Revenue',
  },
  {
    title: 'Settings page',
    description:
      'Profile, security, organization preferences, API keys, and danger zone structure that make a SaaS feel complete and trustworthy.',
    tag: 'Settings',
    category: 'Account',
  },
  {
    title: 'Team management',
    description:
      'Members, invitations, roles, permissions, and organization-oriented product surfaces designed for collaborative SaaS products.',
    tag: 'Teams',
    category: 'B2B',
  },
  {
    title: 'Analytics dashboard',
    description:
      'Charts, filters, KPI cards, report views, and metric hierarchy for products where data visibility is central to user value.',
    tag: 'Analytics',
    category: 'Data',
  },
  {
    title: 'Admin panel',
    description:
      'Moderation, roles, permissions, operational views, and admin workflow patterns for products that need stronger internal control surfaces.',
    tag: 'Admin',
    category: 'Operations',
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

function PatternCard({ title, description, tag, category }: Pattern) {
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
            <Link href="/examples">See examples</Link>
          </Button>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1"
          >
            <Link href="/starters/free">Starter Free</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PatternsPage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'UI', href: '/ui' },
              { label: 'Patterns', href: '/ui/patterns' },
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
                Patterns
              </Badge>
              <Badge variant="outline">SaaS surfaces</Badge>
              <Badge variant="outline">Production-shaped</Badge>
            </div>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Production-shaped SaaS patterns.{' '}
              <span className="block text-muted-foreground">
                Built to bridge UI and real product surfaces.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              Patterns are where a product starts to feel real.
              Explore dashboards, billing, settings, teams, analytics,
              and admin surfaces designed to help SaaS builders move
              from isolated components to coherent product structure.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
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
                variant="secondary"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/examples">See examples</Link>
              </Button>

              <BuyStarterProButton
                fullWidth={false}
                label="Buy Starter Pro — 199 €"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Pill>Dashboards</Pill>
              <Pill>Billing</Pill>
              <Pill>Settings</Pill>
              <Pill>Teams</Pill>
              <Pill>Admin</Pill>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <Card className="rounded-[28px] border p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-2">
                    <LayoutTemplate
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Why patterns matter
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  Components are the foundation. Patterns are where a
                  product starts to feel credible. They help SaaS
                  builders move from isolated UI pieces to
                  product-shaped surfaces with clearer UX, less design
                  drift, and a shorter path toward something users can
                  trust.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/ui">Explore UI System</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/access">View pricing</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="Browse patterns"
            title="Pattern directions for the surfaces modern SaaS products need most"
            description="Use these patterns to understand how strong SaaS products structure the surfaces users interact with every day."
            action={
              <Button asChild size="sm" variant="outline">
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

        <section className="py-12 sm:py-14 lg:py-16">
          <SectionHeader
            eyebrow="How patterns fit the PyColors path"
            title="Patterns bridge the gap between primitives and a runnable SaaS product"
            description="The value is not just visual polish. It is helping you move faster from interface logic to a product surface you can actually build from."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 01
                </div>
                <div className="text-sm font-medium">
                  Move beyond primitives
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Use patterns to understand how components combine
                  into real SaaS surfaces like dashboards, billing
                  pages, and settings flows.
                </p>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 02
                </div>
                <div className="text-sm font-medium">
                  Start from a production-shaped surface
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Move into Starter Free when you want a runnable
                  product baseline instead of disconnected UI pieces.
                </p>
              </div>
            </Card>

            <Card className="rounded-2xl border p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 03
                </div>
                <div className="text-sm font-medium">
                  Upgrade when the business layer matters
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Move to Starter Pro when auth, billing, backend
                  foundations, and launch-readiness become the real
                  leverage point.
                </p>
              </div>
            </Card>
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
                    Pattern logic
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  PyColors UI gives you the primitives. Patterns give
                  you the product logic. Starter Free gives you the
                  runnable SaaS surface. Starter Pro gives you the
                  business layer. Together, they reduce rework and
                  shorten the path to revenue.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/examples">See examples</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/starters/free">Starter Free</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="pt-4">
          <Card className="rounded-[32px] border bg-card px-6 py-8 shadow-lg shadow-black/5 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-lg font-semibold tracking-tight">
                  Move from interface logic to product momentum
                </h2>
                <p className="text-sm text-muted-foreground">
                  Patterns show how strong SaaS products are
                  structured. Starter Free gives you the runnable
                  surface. Starter Pro helps you launch when the
                  business layer starts to matter.
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
