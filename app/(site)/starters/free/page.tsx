import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Starter Free',
  description:
    'A production-shaped SaaS starter (FREE): real app screens, layouts, states, and UX patterns — ready to wire to your backend.',
  alternates: { canonical: '/starters/free' },
  openGraph: {
    title: 'Starter Free · PyColors',
    description:
      'A production-shaped SaaS starter (FREE): real app screens, layouts, states, and UX patterns — ready to wire.',
    url: '/starters/free',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starter Free · PyColors',
    description:
      'A production-shaped SaaS starter (FREE): real app screens, layouts, states, and UX patterns — ready to wire.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const EXTERNAL = {
  demo: 'https://starter-demo.pycolors.io',
  repo: 'https://github.com/pycolors-io/pycolors-starter-free',
  docs: '/docs',
  starters: '/starters',
} as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function TrustPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {label}
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

function FeatureCard({
  title,
  description,
  badge,
}: {
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        {badge ? (
          <Badge variant="secondary" className="shrink-0">
            {badge}
          </Badge>
        ) : null}
      </div>
    </Card>
  );
}

export default function StarterFreePage() {
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
                  Free
                </Badge>
                <Badge variant="outline">Production-shaped</Badge>

                <Link
                  href={EXTERNAL.starters}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                    focusRing,
                  )}
                >
                  Back to Starters
                </Link>
              </div>

              <div className="space-y-4">
                <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  Starter Free
                  <span className="block font-bold">
                    that feels like a real SaaS.
                  </span>
                </h1>

                <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                  This isn’t a blank template. It’s a credible app
                  surface: navigation, tables, dialogs, empty/loading
                  states, settings, billing entrypoints, and auth
                  screens — ready to wire to your backend later.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href={EXTERNAL.demo}>Open live demo</Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href={EXTERNAL.repo}>Get the repo</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href={EXTERNAL.docs}>Read the docs</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <Pill>Next.js App Router</Pill>
                <Pill>Tailwind v4</Pill>
                <Pill>PyColors UI</Pill>
                <Pill>Mock data · No backend</Pill>
                <Pill>Layouts + states</Pill>
              </div>
            </header>

            {/* WHAT YOU GET */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="What you get (Free)"
                description="A focused baseline to ship real screens fast — without committing to a backend yet."
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                  title="Dashboard foundation"
                  description="KPI cards, quick actions, stable layout primitives and navigation structure."
                  badge="App"
                />
                <FeatureCard
                  title="Data UI patterns"
                  description="Tables with loading/empty states, row actions, safe destructive flows."
                  badge="UX"
                />
                <FeatureCard
                  title="Settings surface"
                  description="Tabs + forms (disabled/coming next), clear hierarchy, danger zone patterns."
                  badge="Product"
                />
                <FeatureCard
                  title="Admin patterns"
                  description="Members + invitations UI surface: resend/cancel actions, role badges, B2B tone."
                  badge="B2B"
                />
                <FeatureCard
                  title="Billing entrypoints"
                  description="Plan overview + invoices table + portal entrypoint (mocked, ready to wire)."
                  badge="Monetize"
                />
                <FeatureCard
                  title="Auth screens"
                  description="Login/register/forgot screens and UX contracts — provider wiring left to you."
                  badge="UI"
                />
              </div>
            </section>

            {/* WHAT'S MOCKED */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="What’s mocked (by design)"
                description="Free is intentionally frontend-only — so you can evaluate UX surface first."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      No backend required
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Data is mocked so you can explore flows, states,
                      and layout composition without infrastructure.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Mock data</Pill>
                      <Pill>No DB</Pill>
                      <Pill>No API</Pill>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Auth & billing not wired
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Screens and UX contracts are included. You plug
                      in NextAuth/Clerk/Supabase and Stripe when
                      ready.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Provider-ready</Pill>
                      <Pill>Stripe-ready</Pill>
                      <Pill>Wire later</Pill>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* WIRING PATH */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="How to move from demo → production"
                description="A clean upgrade path: keep the UI surface, swap the data and auth layers."
              />

              <div className="grid gap-4 lg:grid-cols-3">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Step 01
                    </div>
                    <div className="text-sm font-medium">
                      Keep screens & states
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Don’t rewrite UI. Replace mock sources with real
                      API calls progressively.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Step 02
                    </div>
                    <div className="text-sm font-medium">
                      Wire auth provider
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Add your auth (NextAuth/Clerk/Supabase). Map
                      existing routes to protected layouts.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">
                      Step 03
                    </div>
                    <div className="text-sm font-medium">
                      Add billing
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Replace the billing mocks with Stripe checkout +
                      portal flows when you’re ready to monetize.
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* QUICKSTART */}

            <section className="py-8 sm:py-10">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Quick start
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Clone the starter, run it locally, and explore
                      real SaaS screens immediately.
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Fast path: run → open dashboard → inspect
                      patterns → wire later.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <TrustPill label="Next.js App Router" />
                      <TrustPill label="PNPM" />
                      <TrustPill label="Mock data (no backend)" />
                    </div>
                  </div>

                  <div className="w-full sm:max-w-md">
                    <div className="overflow-hidden rounded-xl border border-border bg-card">
                      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-flex h-2 w-2 rounded-full bg-rose-500"
                            aria-hidden="true"
                          />
                          <span
                            className="inline-flex h-2 w-2 rounded-full bg-amber-500"
                            aria-hidden="true"
                          />
                          <span
                            className="inline-flex h-2 w-2 rounded-full bg-emerald-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-xs text-muted-foreground">
                            terminal
                          </span>
                        </div>

                        <a
                          href={EXTERNAL.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label="Open the PyColors Starter Free repository on GitHub"
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                            focusRing,
                          )}
                        >
                          GitHub
                          <ExternalLink
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </a>
                      </div>

                      <div className="px-4 py-4">
                        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`git clone https://github.com/pycolors-io/pycolors-starter-free.git
cd pycolors-starter-free
pnpm install
pnpm dev`}</pre>

                        <div className="mt-3 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                          Then open{' '}
                          <span className="font-mono text-foreground">
                            http://localhost:3000
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* FINAL CTA */}
            <section className="mx-auto mt-6 w-full max-w-5xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Ready to build on top of it?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Start with the demo. Wire backend/auth/billing
                      when you’re ready.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Product-like UX</Pill>
                      <Pill>Stable layouts</Pill>
                      <Pill>Fast to adapt</Pill>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href={EXTERNAL.demo}>Open demo</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={EXTERNAL.repo}>Get the repo</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Free today. Pro version planned (auth + billing wired
                + more blocks).
              </p>
            </section>
          </div>
        </Container>
      </main>
    </div>
  );
}
