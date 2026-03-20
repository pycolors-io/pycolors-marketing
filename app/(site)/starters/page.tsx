import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ExternalLink,
  ArrowRight,
  BookOpen,
  LayoutTemplate,
  Sparkles,
} from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Starters',
  description:
    'Production-first SaaS starters built on PyColors UI. Start with real screens and UX contracts today, then upgrade to wired business foundations when you scale.',
  alternates: { canonical: '/starters' },
  openGraph: {
    title: 'Starters · PyColors',
    description:
      'Production-first SaaS starters built on PyColors UI — designed for real shipping and clear upgrade paths.',
    url: '/starters',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starters · PyColors',
    description:
      'Production-first SaaS starters built on PyColors UI — designed for real shipping and clear upgrade paths.',
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
  docsStarter: '/docs/saas-starter',
  docsUpgrade: '/docs/saas-starter/upgrade-to-pro',
  templates: '/templates',
  upgrade: '/upgrade',
  waitlist: '/waitlist',
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
          <p className="text-sm leading-relaxed text-muted-foreground">
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

export default function StartersPage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Starters', href: '/starters' },
            ]}
          />
        </div>
        {/* HERO */}
        <header className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available today (Free)
            </Badge>
            <Badge variant="outline">Production-first</Badge>

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

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              SaaS starters
              <span className="block font-bold">
                for validation now, production later.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Start with a credible product surface today: dashboard,
              CRUD screens, settings, billing entrypoints, and auth
              UX. Keep it mocked by design, then upgrade when you want
              the business wiring done for you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={INTERNAL.starterFree}>
                Open Starter Free
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href={INTERNAL.access}>
                View Access
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href={INTERNAL.docsStarter}>
                Read starter docs
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <Pill>Next.js App Router</Pill>
            <Pill>Tailwind v4</Pill>
            <Pill>Real screens + UX contracts</Pill>
            <Pill>Mocked by design</Pill>
            <Pill>Upgrade path</Pill>
          </div>

          <p className="text-xs text-muted-foreground">
            Docs live under{' '}
            <Link
              href={INTERNAL.docsStarter}
              className="font-mono text-foreground underline underline-offset-4"
            >
              {INTERNAL.docsStarter}
            </Link>
            .
          </p>
        </header>

        {/* BEFORE YOU BUILD */}
        <section className="py-10 sm:py-12">
          <SectionHeader
            title="Before you start building"
            description="Use the rest of the ecosystem to understand the product logic before you open the starter."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <ResourceCard
              icon={
                <BookOpen className="h-4 w-4" aria-hidden="true" />
              }
              title="Guides"
              description="Learn how SaaS products structure dashboards, billing, auth, team systems, and admin surfaces."
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
              description="Study real SaaS surface directions and what is already available today through Starter Free."
              href={INTERNAL.examples}
              cta="See examples"
            />
          </div>
        </section>

        {/* STARTER PATH */}
        <section className="py-10 sm:py-12">
          <SectionHeader
            title="From validation to production"
            description="Each step has a role: validate first, wire later, then scale with more leverage."
            action={
              <Button asChild size="sm" variant="outline">
                <Link href={INTERNAL.access}>See access</Link>
              </Button>
            }
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Free
                    </Badge>
                    <Badge variant="outline">Frontend-only</Badge>
                  </div>

                  <div className="text-sm font-medium">
                    Starter Free
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A production-shaped SaaS surface with clean states
                    and predictable product patterns: auth screens,
                    dashboard, tables + dialogs, settings, billing
                    entrypoints, and B2B member management — mocked by
                    design.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>Mock data</Pill>
                    <Pill>Layouts + states</Pill>
                    <Pill>Ready to adapt</Pill>
                  </div>

                  <div className="pt-3 flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <Link href={INTERNAL.starterFree}>Open</Link>
                    </Button>

                    <Button asChild size="sm" variant="outline">
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

                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.docsStarter}>Docs</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Coming
                  </Badge>
                  <Badge variant="outline">PRO</Badge>
                </div>

                <div className="text-sm font-medium">
                  Upgrade to PRO
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  The next step is not more screens — it’s the wiring
                  that makes the starter production-ready: auth
                  providers, sessions, Stripe billing, backend
                  foundations, and a launch-ready setup that removes
                  setup overhead and accelerates your path to
                  production.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Auth wired</Pill>
                  <Pill>Billing wired</Pill>
                  <Pill>Backend foundations</Pill>
                </div>

                <div className="pt-3 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={INTERNAL.upgrade}>
                      Explore PRO
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>

                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.docsUpgrade}>
                      Migration guide
                    </Link>
                  </Button>

                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.waitlist}>
                      Join waitlist
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FREE VS PRO */}
        <section className="pb-8 sm:pb-10">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <h3 className="font-brand text-base font-semibold tracking-tight">
                  Free validates. PRO accelerates revenue.
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start free. Upgrade when wiring becomes the thing
                  slowing you down.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:items-start">
                <Button asChild size="sm" variant="secondary">
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href={INTERNAL.access}>View Access</Link>
                </Button>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                  Capability
                </div>
                <div className="border-b border-border bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground sm:border-b-0 sm:border-r">
                  Free (today)
                </div>
                <div className="bg-muted/20 px-4 py-2 text-xs font-medium text-muted-foreground">
                  PRO (coming)
                </div>
              </div>

              {[
                {
                  cap: 'Auth',
                  free: 'Screens + states',
                  pro: 'Providers + sessions + protected routes',
                },
                {
                  cap: 'Billing',
                  free: 'Billing surface + entrypoints',
                  pro: 'Stripe subscriptions + portal + webhooks',
                },
                {
                  cap: 'Backend',
                  free: 'Frontend-only + mock sources',
                  pro: 'Production foundations + contracts',
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
              Roadmap tracks delivery.{' '}
              <span className="text-foreground">/upgrade</span>{' '}
              defines the product promise.{' '}
              <span className="text-foreground">/access</span> defines
              the pricing direction.
            </p>
          </Card>
        </section>

        {/* WHAT'S INCLUDED */}
        <section className="py-8 sm:py-10">
          <SectionHeader
            title="What Starter Free includes"
            description="A focused baseline for product teams who want to ship screens before they wire infrastructure."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">Auth UX</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Login, register, and forgot-password flows with
                  clean loading, error, and success states.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Billing surface
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Plan state, invoices UI, and billing entrypoints
                  designed to connect to Stripe later.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Core entity CRUD
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tables, row actions, dialogs, and empty states for
                  the central entity of your product.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">Settings</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Profile, organization, security, and danger-zone
                  patterns that make the starter feel complete.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  B2B admin surface
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Members, roles, and invitations UI ready for backend
                  wiring when you need it.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Docs-first workflow
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Practical starter docs that explain structure,
                  concepts, and the future upgrade path.
                </p>
              </div>
            </Card>
          </div>

          <div className="pt-6 flex justify-center">
            <Button asChild variant="outline">
              <Link href={INTERNAL.docsStarter}>
                Start with the docs
              </Link>
            </Button>
          </div>
        </section>

        {/* BUILDER JOURNEY */}
        <section className="py-8 sm:py-10">
          <SectionHeader
            title="The builder journey"
            description="From understanding SaaS products to shipping your own."
          />

          <div className="grid gap-4 lg:grid-cols-4">
            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Learn
                </div>
                <div className="text-sm font-medium">
                  Understand SaaS products
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Read guides explaining dashboards, auth, billing,
                  team systems, and admin surfaces.
                </p>

                <div className="pt-3 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.guides}>Read guides</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Explore
                </div>
                <div className="text-sm font-medium">
                  Study real interfaces
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Browse patterns and examples to understand what a
                  credible product surface should feel like.
                </p>

                <div className="pt-3 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.examples}>See examples</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Validate
                </div>
                <div className="text-sm font-medium">
                  Run a SaaS surface locally
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use Starter Free to validate UX before investing
                  time into backend infrastructure.
                </p>

                <div className="pt-3 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={INTERNAL.starterFree}>
                      Open Starter Free
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">
                  Scale
                </div>
                <div className="text-sm font-medium">
                  Upgrade when wiring becomes the blocker
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Move to premium access when authentication, billing,
                  and backend foundations slow progress.
                </p>

                <div className="pt-3 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.access}>View access</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 sm:py-10">
          <SectionHeader
            title="FAQ"
            description="Short answers to the questions that block adoption now and conversion later."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Is Starter Free a demo or a real baseline?
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  It’s a production-shaped baseline. The routes,
                  screens, layout, and states are real. What’s mocked
                  is the wiring layer so you can validate the product
                  surface first.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  What do I get in Free today?
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A complete SaaS surface: auth screens, dashboard,
                  CRUD patterns, settings, billing entrypoints, and
                  members management UI — designed to be wired later.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  When should I move to PRO?
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Upgrade when wiring becomes your bottleneck: real
                  auth, real billing, backend foundations, and
                  deployment setup matter more than just UI
                  exploration.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Will upgrading force a rewrite?
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The intent is progressive adoption: keep the screens
                  and UX contracts, then upgrade the wiring layer
                  underneath.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Is PRO public already?
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Not yet. The offer and scope live on
                  <span className="font-mono text-foreground">
                    {' '}
                    /upgrade
                  </span>
                  . Delivery progress lives on the roadmap.
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Can I use the starter commercially?
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Starter Free is open source and usable today.
                  Premium packaging and licensing details will be
                  explicit for PRO before release.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="mx-auto mt-10 w-full">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Start free. Upgrade when the business layer matters.
                </h2>
                <p className="text-sm text-muted-foreground">
                  Use Starter Free now to validate UX. Move to PRO
                  when you want the foundation wired.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>Progressive adoption</Pill>
                  <Pill>Stable UI system</Pill>
                  <Pill>Upgrade path</Pill>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href={INTERNAL.access}>View Access</Link>
                </Button>
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Building in public. Shipping weekly.
          </p>
        </section>
      </div>
    </Container>
  );
}
