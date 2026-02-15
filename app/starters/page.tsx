import Link from 'next/link';
import type { Metadata } from 'next';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Container } from '@/components/container';

import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'Starters',
  description:
    'Production-ready SaaS starters built on PyColors UI: auth, billing patterns, dashboard foundations, and docs-first workflow.',
  alternates: { canonical: '/starters' },
  openGraph: {
    title: 'Starters · PyColors',
    description:
      'Production-ready SaaS starters built on PyColors UI — designed for real shipping.',
    url: '/starters',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starters · PyColors',
    description:
      'Production-ready SaaS starters built on PyColors UI — designed for real shipping.',
    images: ['/seo/twitter-main.png'],
  },
};

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

export default function StartersPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />

      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl">
            <header className="flex flex-col items-center gap-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Badge variant="secondary" className="gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Coming soon
                </Badge>
                <Badge variant="outline">Production-first</Badge>

                <Link
                  href="/ui"
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
                  A SaaS starter
                  <span className="block font-bold">
                    designed for real shipping.
                  </span>
                </h1>

                <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                  PyColors SaaS Starter bundles the foundations that
                  usually take weeks: authentication, billing, app
                  layout, settings, and product-ready UX patterns —
                  with docs that stay out of your way.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href="/templates">View templates</Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href="/docs">Read the docs</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <Pill>Auth + billing foundations</Pill>
                <Pill>Dashboard-ready UX</Pill>
                <Pill>Docs-first workflow</Pill>
                <Pill>Copy/paste velocity</Pill>
              </div>
            </header>

            {/* WHAT'S INCLUDED */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="What’s included"
                description="A focused baseline for building SaaS screens without reinventing the foundations."
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Authentication
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Email auth plus OAuth foundations, with
                      production-grade UX for login and settings
                      flows.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Billing-ready
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Stripe-ready billing flow foundations: checkout,
                      portal, and subscription state wiring patterns.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      App layout
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sidebar + header layout patterns for dashboards,
                      settings, and CRUD screens.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Data UI patterns
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tables, empty/loading states, skeletons, and
                      feedback primitives — the baseline dashboards
                      need.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Settings & admin
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Clean settings screens, role badges, and member
                      management UI patterns (simple RBAC).
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Documentation-first
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Practical guides: forms, async UI states, layout
                      composition, and shipping workflows.
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="How it fits your workflow"
                description="You can adopt progressively — UI first, then templates, then the full starter when ready."
              />

              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Step 01
                    </div>
                    <div className="text-sm font-medium">
                      Start with UI & patterns
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Use the UI system as a stable baseline for
                      dashboards and marketing screens.
                    </p>
                    <div className="pt-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/ui">Explore UI</Link>
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Step 02
                    </div>
                    <div className="text-sm font-medium">
                      Accelerate with templates
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Drop-in landing pages and dashboard layouts that
                      match your app UI out of the box.
                    </p>
                    <div className="pt-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/templates">View templates</Link>
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Step 03
                    </div>
                    <div className="text-sm font-medium">
                      Ship with the starter
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      When you want the full foundation wired
                      together, the Starter becomes the fastest path
                      to production.
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            <section className="py-8 sm:py-10">
              <SectionHeader
                title="FAQ"
                description="Short answers for the questions that matter before buying."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Is this a “demo starter” or production-focused?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Production-focused. The goal is to ship real
                      screens quickly with predictable UI patterns,
                      docs-first components, and a workflow that
                      doesn’t collapse under complexity.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Do I need to adopt everything?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      No. You can start with the UI system and
                      patterns, then add templates or the full starter
                      later.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      When will it be available?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Early access opens first, then the public
                      release. The roadmap page is the source of
                      truth.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Can I use it commercially?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Commercial usage will be clearly defined with
                      licensing before the paid release. Early access
                      helps shape the final packaging and terms.
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mx-auto mt-10 w-full max-w-5xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Want early access to the SaaS Starter?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Tell me what you’re building — I’ll prioritize
                      the patterns that matter.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Public roadmap</Pill>
                      <Pill>Changelog updates</Pill>
                      <Pill>Docs-first</Pill>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild variant="outline">
                      <Link href="/ui">Explore UI</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href="/roadmap">View roadmap</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Built in public. Shipping weekly.
              </p>
            </section>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
