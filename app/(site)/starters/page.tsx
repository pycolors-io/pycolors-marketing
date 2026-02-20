import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Starters',
  description:
    'Production-first SaaS starters built on PyColors UI. Start with real screens and UX contracts today, then wire auth, billing, and data progressively.',
  alternates: { canonical: '/starters' },
  openGraph: {
    title: 'Starters · PyColors',
    description:
      'Production-first SaaS starters built on PyColors UI — designed for real shipping.',
    url: '/starters',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starters · PyColors',
    description:
      'Production-first SaaS starters built on PyColors UI — designed for real shipping.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const INTERNAL = {
  ui: '/ui',
  roadmap: '/roadmap',
  starterFree: '/starters/free',
  docsStarter: '/docs/saas-starter',
  templates: '/templates',
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

export default function StartersPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl">
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
                    designed for real shipping.
                  </span>
                </h1>

                <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                  Start with a credible product surface (dashboard,
                  data screens, settings, billing entrypoints, auth
                  UX). Keep it mocked by design — then wire your
                  providers progressively when you’re ready.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href={INTERNAL.starterFree}>
                    Open Starter Free
                  </Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href={INTERNAL.docsStarter}>
                    Read starter docs
                  </Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href={INTERNAL.roadmap}>View roadmap</Link>
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

            {/* AVAILABLE NOW */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Available now"
                description="Evaluate the UX surface first. Wire auth/billing/data later without rewrites."
                action={
                  <Button asChild size="sm" variant="outline">
                    <Link href={INTERNAL.docsStarter}>
                      Quick start
                    </Link>
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
                        A production-shaped SaaS surface with clean
                        states and predictable patterns: auth screens,
                        dashboard, tables + dialogs, settings, billing
                        entrypoints, and B2B member management —
                        mocked by design.
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Pill>Mock data</Pill>
                        <Pill>Layouts + states</Pill>
                        <Pill>Ready to wire</Pill>
                      </div>

                      <div className="pt-3 flex flex-wrap gap-2">
                        <Button asChild size="sm">
                          <Link href={INTERNAL.starterFree}>
                            Open
                          </Link>
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
                          <Link href={INTERNAL.docsStarter}>
                            Docs
                          </Link>
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
                        Planned
                      </Badge>
                      <Badge variant="outline">Pro</Badge>
                    </div>

                    <div className="text-sm font-medium">
                      Starter Pro
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The same product surface — fully wired for
                      production: authentication providers, Stripe
                      billing flows, a real data layer, and stable API
                      contracts, packaged to remove setup overhead and
                      accelerate your path to launch.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Auth wired</Pill>
                      <Pill>Billing wired</Pill>
                      <Pill>Data layer</Pill>
                    </div>

                    <div className="pt-3">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/docs/saas-starter/upgrade-to-pro">
                          Explore Starter Pro
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* FREE vs PRO (compact) */}
            <section className="pb-8 sm:pb-10">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <h3 className="font-brand text-base font-semibold tracking-tight">
                      Upgrade when you scale
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Start free. Move to wired foundations when speed
                      matters.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:items-start">
                    <Button asChild size="sm" variant="secondary">
                      <Link href={INTERNAL.starterFree}>
                        Open Starter Free
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={INTERNAL.roadmap}>
                        Track Pro on roadmap
                      </Link>
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
                      Pro (planned)
                    </div>
                  </div>

                  {[
                    {
                      cap: 'Auth',
                      free: 'Screens + states (mocked)',
                      pro: 'Provider wired + sessions',
                    },
                    {
                      cap: 'Billing',
                      free: 'Entry points (mocked)',
                      pro: 'Stripe Checkout + Portal + webhooks',
                    },
                    {
                      cap: 'Data layer',
                      free: 'Mock sources (frontend-only)',
                      pro: 'Production contracts + API layer',
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
                  Pro isn’t public yet — roadmap is the source of
                  truth.
                </p>
              </Card>
            </section>

            {/* WHAT'S INCLUDED */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="What you get"
                description="A focused baseline for building SaaS screens without reinventing foundations."
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Auth UX</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Login/register/forgot flows with clean
                      loading/error/success states. Wire your provider
                      later.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Billing surface
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Plan + invoices UI and portal entrypoints —
                      designed to connect to Stripe.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Core entity CRUD
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tables, row actions, dialogs, and empty/loading
                      patterns for your main business entity.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Settings
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Structured settings tabs and safe destructive
                      patterns (danger zone included).
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      B2B admin surface
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Members, roles, and invitations UI — local-only
                      in v1, ready for backend wiring.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Docs-first workflow
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Practical guides that help you run and ship fast
                      (not “marketing docs”).
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

            {/* HOW IT FITS YOUR WORKFLOW */}
            <section className="py-8 sm:py-10">
              <SectionHeader
                title="How it fits your workflow"
                description="Adopt progressively: ship UI + screens first, wire auth/billing/data when you're ready."
              />

              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Step 01
                    </div>
                    <div className="text-sm font-medium">
                      Validate UX in minutes
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Start with Starter Free to evaluate a credible
                      SaaS surface: routes, layout, states, and
                      navigation — without touching a backend.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <Pill>Run locally</Pill>
                      <Pill>Explore screens</Pill>
                      <Pill>Keep the structure</Pill>
                    </div>

                    <div className="pt-3 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={INTERNAL.starterFree}>
                          Open Starter Free
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <Link href={INTERNAL.docsStarter}>
                          Read starter docs
                        </Link>
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
                      Ship real product screens
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Rename “Projects” into your core entity, adjust
                      copy, plug your domain model, and ship a
                      product-shaped UI with predictable states.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <Pill>CRUD surfaces</Pill>
                      <Pill>Settings + Admin</Pill>
                      <Pill>Billing entrypoints</Pill>
                    </div>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Step 03
                    </div>
                    <div className="text-sm font-medium">
                      Upgrade when wiring slows you down.
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      When you want authentication, billing, and data
                      to be production-ready without reworking your UI
                      surface, the Pro starter is the fastest path.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <Pill>Less glue code</Pill>
                      <Pill>Fewer edge cases</Pill>
                      <Pill>Faster time-to-revenue</Pill>
                    </div>
                    <div className="pt-3 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/docs/saas-starter/upgrade-to-pro">
                          Upgrade guide
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <Link href={INTERNAL.roadmap}>
                          View roadmap
                        </Link>
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
                description="Short answers to the questions that block adoption and upgrades."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Is Starter Free a “demo” or a production
                      baseline?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      It’s a production-shaped UI baseline. Screens,
                      routes, layout, and states are real. What’s
                      mocked is the wiring (auth, billing, data) so
                      you can validate structure first.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      What do I actually get in Free today?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      A complete SaaS surface: auth screens,
                      dashboard, CRUD patterns, settings, billing
                      entrypoints, and members management UI —
                      designed to be wired later.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      When should I upgrade to Pro?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Upgrade when wiring becomes your bottleneck: you
                      need real auth, real Stripe billing, a
                      production data layer, and you want to avoid
                      spending days on glue code and edge cases.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Will upgrading force a rewrite?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The intent is progressive adoption: keep screens
                      and UX contracts, then swap the wiring layer.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      What auth/billing providers will Pro support?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Pro is planned to ship with a wired foundation
                      (auth + billing). The supported providers will
                      be documented before release.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Can I use the starter commercially?
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Starter Free is open-source and usable today.
                      Pro licensing will be explicit before release.
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
                      Build faster without lock-in.
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Start with Starter Free today. Upgrade to Pro
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
                      <Link href={INTERNAL.docsStarter}>
                        Read starter docs
                      </Link>
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
      </main>
    </div>
  );
}
