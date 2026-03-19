import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Eye,
  ExternalLink,
  Layers3,
  Sparkles,
} from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Examples',
  description:
    'Real SaaS interfaces built with PyColors. Explore what is available today and the product directions PyColors is designed to support.',
  alternates: { canonical: '/examples' },
  openGraph: {
    title: 'Examples · PyColors',
    description:
      'Real SaaS interfaces built with PyColors. Explore what is available today and the product directions PyColors is designed to support.',
    url: '/examples',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Examples · PyColors',
    description:
      'Real SaaS interfaces built with PyColors. Explore what is available today and the product directions PyColors is designed to support.',
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
      'A product direction showing usage metrics, prompt history, billing credits, and subscription overview surfaces.',
    tag: 'Concept',
    category: 'Usage',
  },
  {
    title: 'B2B SaaS Platform',
    description:
      'A collaboration direction showing organization switching, team management, roles, and invitation workflows.',
    tag: 'Concept',
    category: 'Teams',
  },
  {
    title: 'Analytics Product',
    description:
      'A reporting direction showing metrics, charts, filters, and dashboard hierarchy patterns.',
    tag: 'Concept',
    category: 'Data',
  },
  {
    title: 'Subscription SaaS',
    description:
      'A monetization direction showing plan upgrades, usage metrics, invoices, and billing history surfaces.',
    tag: 'Concept',
    category: 'Revenue',
  },
  {
    title: 'Admin Platform',
    description:
      'An operations direction showing permissions, moderation tools, queues, and audit surfaces.',
    tag: 'Concept',
    category: 'Operations',
  },
  {
    title: 'Startup SaaS MVP',
    description:
      'An early-stage direction showing a lightweight dashboard, projects CRUD, and onboarding flow.',
    tag: 'Concept',
    category: 'MVP',
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

function AvailableNowCard() {
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{AVAILABLE_NOW.tag}</Badge>
            <Badge variant="outline">Starter</Badge>
            <Badge variant="outline">Production-shaped</Badge>
          </div>

          <div className="space-y-2">
            <h3 className="font-brand text-lg font-semibold tracking-tight sm:text-xl">
              {AVAILABLE_NOW.title}
            </h3>

            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
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
          <Link href="/starters/free">Explore Starter Free</Link>
        </Button>

        <Button
          asChild
          size="sm"
          variant="outline"
          className="flex-1"
        >
          <Link href="/ui/patterns">Browse Patterns</Link>
        </Button>
      </div>
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
              { label: 'Examples', href: '/examples' },
            ]}
          />
        </div>
        {/* HERO */}
        <header className="mb-14 flex flex-col items-center gap-6 text-center sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Examples
            </Badge>
            <Badge variant="outline">Product showcase</Badge>
            <Badge variant="outline">Honest availability</Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Real SaaS interfaces
              <span className="block font-bold">
                built with PyColors.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Explore what is available today and the product
              directions PyColors is designed to support — from
              dashboards and billing to teams, analytics, and admin
              systems.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/starters/free">
                Start with Starter Free
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/ui/patterns">Browse UI Patterns</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/upgrade">Explore PRO</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Pill>Dashboards</Pill>
            <Pill>Billing</Pill>
            <Pill>Teams</Pill>
            <Pill>Admin</Pill>
            <Pill>Analytics</Pill>
          </div>
        </header>

        {/* INTRO STRIP */}
        <section className="py-4 sm:py-6">
          <Card className="p-6 sm:p-7">
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

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  Components explain the building blocks. Examples
                  show what a real product can feel like. This page
                  separates what is already available from the product
                  directions PyColors is designed to support.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/guides">Read Guides</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/access">View Access</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* AVAILABLE NOW */}
        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Available now"
            description="What you can explore and use today."
          />

          <AvailableNowCard />
        </section>

        {/* DIRECTIONS */}
        <section className="py-8 sm:py-10">
          <SectionHeader
            title="Example directions"
            description="Product directions PyColors is built to support as the ecosystem expands."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href="/waitlist">Join PRO waitlist</Link>
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

        {/* PRODUCT LOGIC */}
        <section className="py-8 sm:py-10">
          <SectionHeader
            title="How examples fit the PyColors path"
            description="Examples are not only inspiration. They help you see the product surface before the business layer is wired."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 01
                </div>
                <div className="text-sm font-medium">
                  Explore real product surfaces
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  See how dashboards, billing pages, team systems, and
                  admin surfaces can look when the product feels
                  structured and credible.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 02
                </div>
                <div className="text-sm font-medium">
                  Start from a runnable baseline
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Use Starter Free to move from inspiration to a real
                  SaaS surface without starting from scratch.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Step 03
                </div>
                <div className="text-sm font-medium">
                  Upgrade when wiring matters
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Move toward PRO when auth, billing, backend
                  foundations, and production wiring become the
                  bottleneck.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16">
          <Card className="p-6 sm:p-7 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <h2 className="font-brand text-lg font-semibold">
                Build your own SaaS faster
              </h2>

              <p className="text-sm text-muted-foreground">
                Use Starter Free to begin with a production-shaped
                SaaS surface today, then move to PRO when the business
                layer needs to be wired.
              </p>
            </div>

            <div className="flex gap-3">
              <Button asChild>
                <Link href="/starters/free">Starter Free</Link>
              </Button>

              <Button asChild variant="secondary">
                <Link href="/waitlist">Join PRO waitlist</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}
