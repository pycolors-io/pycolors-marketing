import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  BadgeCheck,
} from 'lucide-react';

import { Container } from '@/components/container';
import { UI_VERSION, formatVersion } from '@/lib/version';
import { Badge, Button, Card, cn } from '@pycolors/ui';
import { NpmBadges } from '@/components/npm-badges';

export const metadata: Metadata = {
  title: 'UI',
  description:
    'PyColors UI is a documentation-first design system built on semantic tokens and Radix primitives — optimized for shipping SaaS.',
  alternates: { canonical: '/ui' },
  openGraph: {
    title: 'UI · PyColors',
    description:
      'A minimal UI system built to ship SaaS: docs-first, Radix-based interactions, and data UI foundations.',
    url: '/ui',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI · PyColors',
    description:
      'A minimal UI system built to ship SaaS — docs-first, Radix primitives, and data UI foundations.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function TrustPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {label}
    </span>
  );
}

function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}

const highlights = [
  {
    title: 'Advanced interactions included',
    description:
      'Dialog, sheet, dropdown menus, tabs, and toasts — accessible Radix primitives with consistent API and docs.',
  },
  {
    title: 'Data UI foundations',
    description:
      'Tables, pagination, empty states, and skeletons — the baseline you need for dashboards and CRUD screens.',
  },
  {
    title: 'Docs that don’t waste time',
    description:
      'Preview → Usage → Code → Props + practical guides for forms and async UI states.',
  },
];

const shipOutcomes = [
  {
    title: 'Auth screens',
    tag: 'SaaS baseline',
    desc: 'Login / register / forgot flows with clean states (loading, error, success) and predictable inputs.',
    href: '/starters/free',
    cta: 'See in Starter Free',
    isExternal: false,
  },
  {
    title: 'CRUD + tables',
    tag: 'Data UI',
    desc: 'Table primitives, pagination, empty/loading states, plus dialogs and sheets for create/edit flows.',
    href: '/docs/ui/table',
    cta: 'Open Table docs',
    isExternal: false,
  },
  {
    title: 'Settings surface',
    tag: 'Credibility',
    desc: 'Profile, org, security, sessions, and a real “danger zone” layout pattern users expect.',
    href: 'https://starter-demo.pycolors.io/settings',
    cta: 'View in demo',
    isExternal: true,
  },
  {
    title: 'Billing entrypoints',
    tag: 'Monetization',
    desc: 'Upgrade/plan surfaces and subscription placeholders designed to wire to Stripe later.',
    href: '/docs/saas-starter/billing-concept',
    cta: 'Read concept',
    isExternal: false,
  },
  {
    title: 'Admin / members',
    tag: 'B2B-ready',
    desc: 'Member list, role badges, and invitation surfaces — the B2B proof most starters skip.',
    href: 'https://starter-demo.pycolors.io/admin',
    cta: 'See admin surface',
    isExternal: true,
  },
  {
    title: 'Feedback & states',
    tag: 'Product polish',
    desc: 'Toasts, alerts, skeletons, and empty states that keep UX consistent across the whole product.',
    href: '/docs/ui/toast',
    cta: 'Open Toast docs',
    isExternal: false,
  },
];

const components = [
  {
    name: 'Dialog',
    desc: 'Accessible modal primitives built on Radix UI.',
    href: '/docs/ui/dialog',
  },
  {
    name: 'Sheet',
    desc: 'Slide-over panels for filters, actions, and contextual UI.',
    href: '/docs/ui/sheet',
  },
  {
    name: 'Dropdown Menu',
    desc: 'Groups, submenus, checkboxes/radios, shortcuts.',
    href: '/docs/ui/dropdown-menu',
  },
  {
    name: 'Tabs',
    desc: 'Segmented navigation with size variants and theming.',
    href: '/docs/ui/tabs',
  },
  {
    name: 'Toast',
    desc: 'Minimal, accessible notifications with variants.',
    href: '/docs/ui/toast',
  },
  {
    name: 'Table',
    desc: 'Composable data table primitives + empty/loading states.',
    href: '/docs/ui/table',
  },
  {
    name: 'Pagination',
    desc: 'Stateless pagination UI primitives (UI-only).',
    href: '/docs/ui/pagination',
  },
  {
    name: 'Skeleton',
    desc: 'Loading placeholders that preserve layout.',
    href: '/docs/ui/skeleton',
  },
  {
    name: 'Empty State',
    desc: 'Clear empty UI with optional actions and guidance.',
    href: '/docs/ui/empty-state',
  },
  {
    name: 'Password Input',
    desc: 'Accessible show/hide toggle for auth flows.',
    href: '/docs/ui/password-input',
  },
];

const quickLinks = [
  { label: 'Getting started', href: '/docs' },
  { label: 'Components', href: '/docs/ui' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Open source', href: '/open-source' },
];

export default function UiPage() {
  const versionLabel = formatVersion(UI_VERSION);
  const STATUS = 'Stable baseline';

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl">
            {/* HERO */}
            <section className="relative">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge variant="secondary" className="gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {versionLabel} · stable baseline
                  </Badge>

                  <Badge variant="outline" className="gap-2">
                    <Sparkles
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    Docs-first
                  </Badge>

                  <a
                    href="https://github.com/pycolors-io/pycolors-ui"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Open the PyColors UI repository on GitHub"
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

                <div className="space-y-4">
                  <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                    A minimal UI system
                    <span className="block font-bold">
                      built to ship SaaS.
                    </span>
                  </h1>

                  <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
                    PyColors UI is a documentation-first design system
                    built on semantic tokens and Radix primitives —
                    including advanced interactions and data UI
                    foundations for real product screens.
                  </p>

                  <p className="mx-auto max-w-2xl text-balance text-xs text-muted-foreground">
                    This is the foundation powering Templates and SaaS
                    Starters.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild>
                    <Link href="/docs">
                      Explore docs
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>

                  <Button asChild variant="outline">
                    <Link href="/docs/ui">Browse components</Link>
                  </Button>

                  <Button asChild variant="secondary">
                    <Link href="/starters/free">
                      See Starter Free
                    </Link>
                  </Button>
                </div>

                <div className="mt-2 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                  <Stat
                    label="Current version"
                    value={versionLabel}
                  />
                  <Stat
                    label="Docs format"
                    value="Preview → Usage → Code → Props"
                  />
                  <Stat
                    label="Release cadence"
                    value="Weekly releases"
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  <TrustPill label="Tokens-first" />
                  <TrustPill label="Radix primitives" />
                  <TrustPill label="Accessible by default" />
                  <TrustPill label="Product states included" />
                </div>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-1">
                  {quickLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={cn(
                        'rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                        focusRing,
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* TRACTION / PROOF */}
            <section className="py-10 sm:py-14">
              <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                <Card className="p-6 sm:p-7">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">@pycolors/ui</Badge>
                      <Badge variant="secondary">Open source</Badge>
                    </div>

                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Production-ready.
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      A stable UI baseline for modern SaaS: documented
                      components, predictable APIs, and real product
                      patterns — already powering Starter Free.
                    </p>

                    <ul className="space-y-2 pt-1 text-sm">
                      <li className="text-muted-foreground">
                        <span className="text-foreground">
                          Actively maintained
                        </span>{' '}
                        with predictable weekly releases
                      </li>
                      <li className="text-muted-foreground">
                        <span className="text-foreground">
                          Stable production baseline
                        </span>{' '}
                        for real SaaS products
                      </li>
                    </ul>

                    <div className="flex flex-wrap items-center gap-2">
                      <NpmBadges
                        packageName="@pycolors/ui"
                        size="sm"
                      />
                      <span className="text-xs text-muted-foreground">
                        Open source · versioned · shipped weekly
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Conversion bridge */}
                <Card className="p-6 sm:p-7">
                  <div className="space-y-3">
                    <Badge variant="outline" className="gap-2">
                      <BadgeCheck
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      Used by Starter Free
                    </Badge>

                    <div className="text-sm font-medium">
                      See the UI in real product screens
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Starter Free lets you evaluate PyColors UI
                      inside a complete SaaS surface: auth UX,
                      dashboard, tables, settings, billing
                      entrypoints, admin screens.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="secondary">
                        <Link href="/starters/free">
                          Open Starter Free
                        </Link>
                      </Button>

                      <Button asChild size="sm" variant="outline">
                        <a
                          href="https://starter-demo.pycolors.io"
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
                    </div>

                    <p className="pt-2 text-xs text-muted-foreground">
                      Upgrade when wiring becomes the bottleneck.
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* WHAT YOU CAN SHIP */}
            <section className="py-8 sm:py-10">
              <div className="mb-4 space-y-1">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  What you can ship with this UI
                </h2>
                <p className="text-sm text-muted-foreground">
                  Not “components”. Real product surfaces users expect
                  on day one.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {shipOutcomes.map((o) => (
                  <Card key={o.title} className="p-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-medium">
                          {o.title}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {o.tag}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {o.desc}
                      </p>

                      <div className="pt-2">
                        <Button asChild size="sm" variant="outline">
                          {o.isExternal ? (
                            <a
                              href={o.href}
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              {o.cta}
                              <ExternalLink
                                className="ml-2 h-4 w-4"
                                aria-hidden="true"
                              />
                            </a>
                          ) : (
                            <Link href={o.href}>{o.cta}</Link>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="py-8 sm:py-10">
              <div className="mb-4 flex items-end justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="font-brand text-lg font-semibold tracking-tight">
                    Highlights
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    A focused baseline for building product UIs with
                    predictable patterns.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((item) => (
                  <Card key={item.title} className="p-5">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        {item.title}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* QUICK START */}
            <section className="py-8 sm:py-10">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Quick start
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Install the packages, import tokens, then copy
                      components from the docs. Keep it fast.
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Fast path: install → open docs → copy/paste a
                      component → ship a screen.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <TrustPill label="Node 18+" />
                      <TrustPill label="PNPM recommended" />
                      <TrustPill label="Tokens-first" />
                      <TrustPill label="Copy/paste workflow" />
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/docs/ui">
                          Start from a component
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <Link href="/starters/free">
                          See it in a starter
                        </Link>
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
                          href="https://github.com/pycolors-io/pycolors-ui"
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label="Open the PyColors UI repository on GitHub"
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                            focusRing,
                          )}
                        >
                          Repo
                          <ExternalLink
                            className="ml-2 h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </a>
                      </div>

                      <div className="px-4 py-4">
                        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">{`pnpm add @pycolors/ui @pycolors/tokens

# Next.js (App Router)
# app/globals.css
@import "@pycolors/tokens/tokens.css";

pnpm dev`}</pre>

                        <div className="mt-3 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs text-muted-foreground">
                          Then open{' '}
                          <span className="font-mono text-foreground">
                            /docs/ui
                          </span>{' '}
                          and copy a component.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* COMPONENTS GRID */}
            <section className="py-8 sm:py-10">
              <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <h2 className="font-brand text-lg font-semibold tracking-tight">
                    What’s in {versionLabel}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Advanced interactions + data UI foundations —
                    documented, consistent, extensible.
                  </p>
                </div>

                <Button
                  asChild
                  variant="secondary"
                  className="sm:self-start"
                >
                  <Link href="/docs/ui">See all components</Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {components.map((c) => (
                  <Link
                    key={c.name}
                    href={c.href}
                    className={cn(
                      'group rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/30',
                      focusRing,
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {c.name}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {c.desc}
                        </p>
                      </div>

                      <div className="shrink-0">
                        <StatusPill label={STATUS} />
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      Open docs →
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                Next up: Blocks library + premium Templates — tracked
                in{' '}
                <Link
                  href="/roadmap"
                  className={cn(
                    'rounded-sm underline underline-offset-4 hover:text-foreground',
                    focusRing,
                  )}
                >
                  Roadmap
                </Link>
                .
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="mx-auto mt-10 w-full max-w-5xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Start here
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Build your first screen with PyColors UI — then
                      validate the full SaaS surface with Starter
                      Free.
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <TrustPill label="Public roadmap" />
                      <TrustPill label="Changelog updates" />
                      <TrustPill label="Docs-first" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild>
                      <Link href="/docs">Read the docs</Link>
                    </Button>

                    <Button asChild variant="outline">
                      <Link href="/starters/free">
                        Open Starter Free
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
