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

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
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
    <Card className="flex h-full flex-col justify-between rounded-[28px] border border-border/70 shadow-black/5">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="outline" className="text-[11px]">
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
            className="flex-1 rounded-xl"
          >
            <Link href="/examples">View pattern</Link>
          </Button>

          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 rounded-xl"
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
    <Container className="py-20 sm:py-20 lg:py-24">
      <div>
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
          description="Explore dashboards, billing, settings, and workflows designed for real SaaS applications — not just component demos."
          actions={
            <>
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

        <section className="py-16 lg:py-20">
          <Card className="rounded-[32px] border border-border/70 p-6 sm:p-7 shadow-black/5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="gap-2 rounded-full"
                  >
                    <LayoutTemplate
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Why patterns matter
                  </Badge>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  Components are easy. Product structure is not.
                  Patterns help you move from UI pieces to something
                  users actually trust.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                >
                  <Link href="/ui">Explore UI system</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-16 lg:py-20">
          <SectionHeader
            eyebrow="Patterns"
            title="Core product surfaces"
            description="Dashboards, billing, settings, and workflows used in real SaaS products."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-xl"
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

        <section className="py-16 lg:py-20">
          <SectionHeader
            eyebrow="Path"
            title="From UI to product"
            description="Patterns turn components into structure. Starters turn structure into a product."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-[28px] border border-border/70 p-5 shadow-black/5">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Step 01
                </div>
                <div className="text-sm font-medium">
                  Understand the structure
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  See how real SaaS surfaces are built.
                </p>
              </div>
            </Card>

            <Card className="rounded-[28px] border border-border/70 p-5 shadow-black/5">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Step 02
                </div>
                <div className="text-sm font-medium">
                  Start from a real surface
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Use Starter Free instead of rebuilding UI from
                  scratch.
                </p>
              </div>
            </Card>

            <Card className="rounded-[28px] border border-border/70 p-5 shadow-black/5">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Step 03
                </div>
                <div className="text-sm font-medium">
                  Upgrade when it matters
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  Move to Starter Pro when auth and billing become
                  blockers.
                </p>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <Card className="rounded-[32px] border border-border/70 p-6 sm:p-7 shadow-black/5">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="gap-2 rounded-full"
                  >
                    <Layers3
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Pattern logic
                  </Badge>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  PyColors UI gives you the primitives. Patterns give
                  you the structure. Starter Free gives you the
                  runnable surface. Starter Pro gives you the business
                  layer.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                >
                  <Link href="/examples">See examples</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                >
                  <Link href="/starters/free">Starter Free</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="pt-4">
          <Card className="rounded-[36px] border bg-card px-6 py-8 shadow-lg shadow-black/5 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-lg font-semibold tracking-tight">
                  Build faster. Launch sooner.
                </h2>
                <p className="text-sm text-muted-foreground">
                  Start with Starter Free. Move to Starter Pro when
                  the business layer matters.
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
