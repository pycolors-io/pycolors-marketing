import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Layers3,
  LayoutTemplate,
  Sparkles,
} from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'SaaS Patterns',
  description:
    'Production SaaS patterns built with PyColors UI. Explore real product surfaces designed for dashboards, billing, settings, teams, analytics, and admin systems.',
  alternates: { canonical: '/ui/patterns' },
  openGraph: {
    title: 'SaaS Patterns · PyColors',
    description:
      'Production SaaS patterns built with PyColors UI. Explore real product surfaces designed for dashboards, billing, settings, teams, analytics, and admin systems.',
    url: '/ui/patterns',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Patterns · PyColors',
    description:
      'Production SaaS patterns built with PyColors UI. Explore real product surfaces designed for dashboards, billing, settings, teams, analytics, and admin systems.',
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
      'A production-ready dashboard surface with KPI cards, activity feed, hierarchy, and quick actions.',
    tag: 'Dashboard',
    category: 'Core',
  },
  {
    title: 'Billing page',
    description:
      'Subscription state, upgrade entrypoints, usage metrics, invoice history, and monetization surfaces.',
    tag: 'Billing',
    category: 'Revenue',
  },
  {
    title: 'Settings page',
    description:
      'Profile, security, organization preferences, API keys, and danger zone structure.',
    tag: 'Settings',
    category: 'Account',
  },
  {
    title: 'Team management',
    description:
      'Members, invitations, roles, permissions, and organization switching patterns.',
    tag: 'Teams',
    category: 'B2B',
  },
  {
    title: 'Analytics dashboard',
    description:
      'Charts, filters, KPI cards, reports overview, and product metrics hierarchy.',
    tag: 'Analytics',
    category: 'Data',
  },
  {
    title: 'Admin panel',
    description:
      'Roles, permissions, moderation actions, operational queues, and audit log patterns.',
    tag: 'Admin',
    category: 'Operations',
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
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

function PatternCard({ title, description, tag, category }: Pattern) {
  return (
    <Card className="flex h-full flex-col justify-between p-6">
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
          <h3 className="font-brand text-base font-semibold tracking-tight">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
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
        {/* HERO */}
        <header className="mb-14 flex flex-col items-center gap-6 text-center sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Patterns
            </Badge>
            <Badge variant="outline">SaaS surfaces</Badge>
            <Badge variant="outline">Production-shaped</Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Production SaaS patterns
              <span className="block font-bold">
                built with PyColors.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Explore real product surfaces designed for SaaS builders
              — dashboards, billing, settings, team systems,
              analytics, and admin workflows.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/starters/free">
                Explore Starter Free
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/examples">See Examples</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/upgrade">Explore PRO</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Pill>Dashboards</Pill>
            <Pill>Billing</Pill>
            <Pill>Settings</Pill>
            <Pill>Teams</Pill>
            <Pill>Admin</Pill>
          </div>
        </header>

        {/* INTRO STRIP */}
        <section className="py-4 sm:py-6">
          <Card className="p-6 sm:p-7">
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

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Components are the foundation. Patterns are where a
                  product starts to feel real. They help SaaS builders
                  move from isolated UI pieces to coherent product
                  surfaces with clearer UX and less design debt.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/ui">Explore UI System</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/access">View Access</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* GRID */}
        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Browse patterns"
            description="Pattern directions for the surfaces modern SaaS products need most."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href="/guides">Read Guides</Link>
              </Button>
            }
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {patterns.map((pattern) => (
              <PatternCard key={pattern.title} {...pattern} />
            ))}
          </div>
        </section>

        {/* PRODUCT LOGIC */}
        <section className="py-8 sm:py-10">
          <SectionHeader
            title="How patterns fit the PyColors path"
            description="Patterns help bridge the gap between UI primitives and a real product surface."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 01
                </div>
                <div className="text-sm font-medium">
                  Move beyond primitives
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Use patterns to understand how components combine
                  into real SaaS surfaces like dashboards, billing
                  pages, and settings flows.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 02
                </div>
                <div className="text-sm font-medium">
                  Start from a production-shaped surface
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Move into Starter Free when you want a runnable
                  product baseline instead of disconnected UI pieces.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 03
                </div>
                <div className="text-sm font-medium">
                  Upgrade when the business layer matters
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Move toward PRO when auth, billing, backend
                  foundations, and premium product patterns become the
                  real leverage point.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* VALUE STRIP */}
        <section className="py-8 sm:py-10">
          <Card className="p-6 sm:p-7">
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

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  PyColors UI gives you the primitives. Patterns give
                  you the product logic. Starter Free gives you the
                  runnable SaaS surface. Together, they reduce rework
                  and accelerate time-to-revenue.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/examples">See Examples</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/starters/free">Starter Free</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* FINAL CTA */}
        <section className="mt-10">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Build faster with Starter Free
                </h2>
                <p className="text-sm text-muted-foreground">
                  Patterns show the interface logic. Starter Free
                  gives you the product surface to start building now.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/starters/free">Starter Free</Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href="/waitlist">Join PRO waitlist</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}
