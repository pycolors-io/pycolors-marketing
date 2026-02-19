import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  cn,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pycolors/ui';
import { Container } from '@/components/container';

export const metadata: Metadata = {
  title: 'Starter Free',
  description:
    'Launch your SaaS in days, not months. Starter Free ships a production-shaped SaaS surface: dashboard, data screens, settings, billing entrypoints, and auth UX — mocked by design, ready to wire.',
  alternates: { canonical: '/starters/free' },
  openGraph: {
    title: 'Starter Free · PyColors',
    description:
      'Launch your SaaS in days, not months. A production-shaped Next.js starter with real screens and UX contracts — mocked by design, ready to wire.',
    url: '/starters/free',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starter Free · PyColors',
    description:
      'Launch your SaaS in days, not months. A production-shaped Next.js starter with real screens and UX contracts — mocked by design, ready to wire.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const EXTERNAL = {
  demo: 'https://starter-demo.pycolors.io',
  repo: 'https://github.com/pycolors-io/pycolors-starter-free',
  docs: 'https://pycolors.io/docs/saas-starter',
} as const;

const INTERNAL = {
  starters: 'https://pycolors.io/starters',
  ui: 'https://pycolors.io/ui',
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

function ProductFeatureCard({
  title,
  subtitle,
  points,
  why,
  href,
  badge,
}: {
  title: string;
  subtitle: string;
  points: string[];
  why: string;
  href: string;
  badge?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-sm font-medium">{title}</div>
            {badge ? (
              <Badge variant="outline" className="text-xs">
                {badge}
              </Badge>
            ) : null}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {subtitle}
          </p>

          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {points.map((p) => (
              <li key={p}>• {p}</li>
            ))}
          </ul>

          <p className="mt-3 text-xs text-muted-foreground">
            <span className="text-foreground">Why it matters:</span>{' '}
            {why}
          </p>

          <div className="pt-2">
            <Button asChild size="sm" variant="outline">
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${title} in the live demo`}
              >
                View in demo
                <ExternalLink
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>
        </div>
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
                  href={INTERNAL.starters}
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
                  A production-shaped SaaS starter
                  <span className="block font-bold">
                    you can run in minutes.
                  </span>
                </h1>

                <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                  Starter Free gives you a credible SaaS surface out
                  of the box: auth UX, dashboard, data screens,
                  settings, billing entrypoints, and B2B member
                  management — mocked by design and ready to wire when
                  you are.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a
                    href={EXTERNAL.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open the Starter Free live demo"
                  >
                    Open live demo
                    <ExternalLink
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>

                <Button asChild variant="secondary">
                  <a
                    href={EXTERNAL.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open the Starter Free repository on GitHub"
                  >
                    Get the repo (FREE)
                    <ExternalLink
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
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
                <Pill>Real screens + UX contracts</Pill>
              </div>
            </header>

            {/* BUILT ON PYCOLORS UI */}
            <section className="py-10 sm:py-12">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">Design system</Badge>
                      <Badge variant="outline">Open source</Badge>
                    </div>

                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Built on PyColors UI
                    </h2>

                    <p className="max-w-xl text-sm text-muted-foreground">
                      The starter ships with the same UI primitives
                      used across the PyColors ecosystem — accessible,
                      Radix-based components with semantic tokens and
                      production-ready states.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <TrustPill label="Radix primitives" />
                      <TrustPill label="Semantic tokens" />
                      <TrustPill label="Accessible by default" />
                      <TrustPill label="Production states" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:min-w-55 sm:items-end">
                    <Button asChild variant="outline">
                      <Link href={INTERNAL.ui}>
                        Explore UI system
                      </Link>
                    </Button>

                    <p className="text-xs text-muted-foreground">
                      Used by the starter, templates, and future Pro
                      kits.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* WHAT YOU GET (productized) */}
            <section id="included" className="py-10 sm:py-12">
              <SectionHeader
                title="What you get"
                description="Not a list of tech. A product surface you can ship from — then wire later."
                action={
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={EXTERNAL.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Open the live demo"
                    >
                      Open demo
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                }
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <ProductFeatureCard
                  title="/login + /register + /forgot"
                  badge="Auth UX"
                  subtitle="The mandatory entry point for any SaaS — with clean states and no extra noise."
                  points={[
                    'Email + password',
                    'OAuth (Google placeholder)',
                    'Forgot password flow',
                    'States: loading / error / success',
                  ]}
                  why="Without auth, it’s not a SaaS. This gives you the UX contract you’ll wire to your provider later."
                  href={`${EXTERNAL.demo}/login`}
                />

                <ProductFeatureCard
                  title="/dashboard"
                  badge="First impression"
                  subtitle="Immediate product credibility — the screen that proves it’s real-world."
                  points={[
                    'Header (user + org)',
                    'KPI placeholders',
                    'Primary call to action',
                    'Intelligent empty state',
                  ]}
                  why="This is where users decide if your product feels legit. The layout and states do the work."
                  href={`${EXTERNAL.demo}/dashboard`}
                />

                <ProductFeatureCard
                  title="/projects"
                  badge="Core entity"
                  subtitle="A placeholder business entity with full CRUD UI surface."
                  points={[
                    'Table list',
                    'Create / edit / delete',
                    'Empty state: “Create your first…”',
                    'Simple permissions surface',
                  ]}
                  why="Every SaaS has a central entity. You can rename it later — the pattern stays."
                  href={`${EXTERNAL.demo}/projects`}
                />

                <ProductFeatureCard
                  title="/settings"
                  badge="Maturity"
                  subtitle="The section that turns a demo into a product — structure included."
                  points={[
                    'Tabs: Profile / Organization / Security',
                    'Password & sessions placeholders',
                    'Danger zone surface',
                  ]}
                  why="A SaaS without settings feels fake. This sells maturity instantly."
                  href={`${EXTERNAL.demo}/settings`}
                />

                <ProductFeatureCard
                  title="/billing"
                  badge="Monetization"
                  subtitle="Billing entrypoints and subscription surface — mocked, but designed to wire to Stripe."
                  points={[
                    'Current plan surface',
                    'Upgrade / downgrade actions',
                    'Portal entrypoint (mock)',
                    'Subscription status placeholders',
                  ]}
                  why="Billing is non-negotiable for SaaS. You get the UI surface now, wiring later."
                  href={`${EXTERNAL.demo}/billing`}
                />

                <ProductFeatureCard
                  title="/admin (members)"
                  badge="B2B-ready"
                  subtitle="Team management UI surface for multi-user orgs."
                  points={[
                    'Member management table',
                    'Roles: owner / member',
                    'Invitations surface',
                  ]}
                  why="B2B readiness is a differentiator. This proves you’re not shipping a toy."
                  href={`${EXTERNAL.demo}/admin`}
                />
              </div>
            </section>

            {/* MOCKED ON PURPOSE */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Mocked on purpose"
                description="Starter Free is frontend-only so you can evaluate UX and structure first."
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <Card className="p-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      No backend required
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Data is mocked so you can explore flows,
                      layouts, and states without infrastructure.
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
                      Wire later without rewrites
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Keep screens and UX contracts. Swap the
                      data/auth/billing layers progressively when
                      you’re ready.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Provider-ready</Pill>
                      <Pill>Stripe-ready</Pill>
                      <Pill>Backend-agnostic</Pill>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* UPGRADE TO PRO */}
            <section className="py-10 sm:py-12">
              <SectionHeader
                title="Upgrade to Pro when you scale"
                description="Free gets you shipping faster. Pro (planned) wires the foundation for production."
                action={
                  <Button asChild size="sm" variant="outline">
                    <Link href="/roadmap">View roadmap</Link>
                  </Button>
                }
              />

              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">FREE</Badge>
                      <Badge variant="outline">PRO (planned)</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Start with the product surface today, then
                      upgrade when you want it wired and
                      production-ready.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <TrustPill label="No lock-in" />
                      <TrustPill label="Progressive adoption" />
                      <TrustPill label="Upgrade-ready" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:items-end">
                    <Button asChild variant="secondary">
                      <a
                        href={EXTERNAL.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Open demo
                        <ExternalLink
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/starters">Explore Starters</Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[42%]">
                          Capability
                        </TableHead>
                        <TableHead className="w-[29%]">
                          FREE (today)
                        </TableHead>
                        <TableHead className="w-[29%]">
                          PRO (planned)
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Authentication
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Auth screens + UX states (mocked)
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Auth wired (Clerk/NextAuth/Supabase)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Billing
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Billing entrypoints (mocked)
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Stripe Checkout + Portal wired
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Organizations
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Single-org UI surface
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Multi-org + org switcher
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Roles & permissions
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Basic roles UI
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          RBAC + advanced permissions
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Data layer
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Mock sources
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Production data layer + API contracts
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Packaging
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Demo-ready baseline
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Production-ready upgrades + guidance
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          UI components
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <Link
                            href={INTERNAL.ui}
                            className="underline"
                          >
                            Core PyColors UI primitives
                          </Link>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Advanced components
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <p className="mt-3 text-xs text-muted-foreground">
                    Pro isn’t public yet — roadmap is the source of
                    truth.
                  </p>
                </div>
              </Card>
            </section>

            {/* QUICK START (consistent terminal box) */}
            <section className="py-8 sm:py-10">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Quick start
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Clone the repo, run the starter locally, and
                      explore real SaaS screens immediately.
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

                    <div className="pt-2 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={EXTERNAL.repo}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Open repository
                          <ExternalLink
                            className="ml-2 h-4 w-4"
                            aria-hidden="true"
                          />
                        </a>
                      </Button>

                      <Button asChild size="sm" variant="secondary">
                        <a
                          href={EXTERNAL.demo}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Open live demo
                          <ExternalLink
                            className="ml-2 h-4 w-4"
                            aria-hidden="true"
                          />
                        </a>
                      </Button>
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
                          aria-label="Open the Starter Free repository on GitHub"
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
            <section className="mx-auto mt-8 w-full max-w-5xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Start shipping faster today.
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Open the demo, clone the repo, and build on a
                      credible SaaS surface — then wire your
                      production foundation when ready.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Pill>Real screens</Pill>
                      <Pill>Clear states</Pill>
                      <Pill>Upgrade path</Pill>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <a
                        href={EXTERNAL.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Open demo
                        <ExternalLink
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>
                    <Button asChild variant="secondary">
                      <a
                        href={EXTERNAL.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Get the repo (FREE)
                        <ExternalLink
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Docs for the Starter will live under{' '}
                <span className="font-mono text-foreground">
                  /docs/saas-starter
                </span>{' '}
                (planned).
              </p>
            </section>
          </div>
        </Container>
      </main>
    </div>
  );
}
