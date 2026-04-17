import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Layers3,
  Rocket,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { UI_VERSION, formatVersion } from '@/lib/version';
import { Badge, Button, Card, cn } from '@pycolors/ui';
import { NpmBadges } from '@/components/npm-badges';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

export const metadata: Metadata = {
  title: 'UI | PyColors',
  description:
    'PyColors UI is a documentation-first design system built to help developers ship real SaaS products faster — with semantic tokens, accessible primitives, and product-shaped UI foundations.',
  alternates: { canonical: '/ui' },
  openGraph: {
    title: 'UI | PyColors',
    description:
      'A documentation-first design system built to help developers ship real SaaS products faster.',
    url: '/ui',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI | PyColors',
    description:
      'A documentation-first design system built to help developers ship real SaaS products faster.',
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
      'Dialog, sheet, dropdown menus, tabs, and toasts — accessible primitives with predictable APIs and documentation-first usage.',
  },
  {
    title: 'Data UI foundations',
    description:
      'Tables, pagination, empty states, skeletons, and the product states modern SaaS screens need to feel complete.',
  },
  {
    title: 'Docs that reduce friction',
    description:
      'Preview, usage, code, and props — organized to help developers move from idea to implementation with less wasted time.',
  },
] as const;

const shipOutcomes = [
  {
    title: 'Auth screens',
    tag: 'SaaS baseline',
    desc: 'Login, register, and forgot-password flows with clear loading, error, and success states.',
    href: '/starters/free',
    cta: 'See in Starter Free',
    isExternal: false,
  },
  {
    title: 'CRUD + tables',
    tag: 'Data UI',
    desc: 'Table primitives, pagination, empty/loading states, plus dialogs and sheets for create and edit flows.',
    href: '/docs/ui/table',
    cta: 'Open Table docs',
    isExternal: false,
  },
  {
    title: 'Settings surface',
    tag: 'Credibility',
    desc: 'Profile, organization, security, sessions, and a proper danger-zone structure that makes products feel mature.',
    href: 'https://starter-demo.pycolors.io/settings',
    cta: 'View in demo',
    isExternal: true,
  },
  {
    title: 'Billing entrypoints',
    tag: 'Monetization',
    desc: 'Upgrade surfaces, plan state, and subscription-oriented UI designed to evolve toward real Stripe wiring.',
    href: '/docs/starter-pro/billing',
    cta: 'Read billing docs',
    isExternal: false,
  },
  {
    title: 'Admin / members',
    tag: 'B2B-ready',
    desc: 'Members, role badges, and invitation surfaces — the B2B proof most UI libraries never show.',
    href: 'https://starter-demo.pycolors.io/admin',
    cta: 'See admin surface',
    isExternal: true,
  },
  {
    title: 'Feedback & states',
    tag: 'Product polish',
    desc: 'Toasts, alerts, skeletons, and empty states that keep UX consistent across the product surface.',
    href: '/docs/ui/toast',
    cta: 'Open Toast docs',
    isExternal: false,
  },
] as const;

const components = [
  {
    name: 'Dialog',
    desc: 'Accessible modal primitives for real product flows.',
    href: '/docs/ui/dialog',
  },
  {
    name: 'Sheet',
    desc: 'Slide-over panels for filters, actions, and contextual UI.',
    href: '/docs/ui/sheet',
  },
  {
    name: 'Dropdown Menu',
    desc: 'Groups, submenus, stateful items, and shortcuts.',
    href: '/docs/ui/dropdown-menu',
  },
  {
    name: 'Tabs',
    desc: 'Segmented navigation with flexible styling and states.',
    href: '/docs/ui/tabs',
  },
  {
    name: 'Toast',
    desc: 'Accessible feedback notifications with variants.',
    href: '/docs/ui/toast',
  },
  {
    name: 'Table',
    desc: 'Composable data table primitives for CRUD-oriented products.',
    href: '/docs/ui/table',
  },
  {
    name: 'Pagination',
    desc: 'Reusable pagination UI primitives.',
    href: '/docs/ui/pagination',
  },
  {
    name: 'Skeleton',
    desc: 'Loading placeholders that preserve product layout.',
    href: '/docs/ui/skeleton',
  },
  {
    name: 'Empty State',
    desc: 'Clear empty UI with guidance and optional actions.',
    href: '/docs/ui/empty-state',
  },
  {
    name: 'Password Input',
    desc: 'Accessible password field with show/hide behavior.',
    href: '/docs/ui/password-input',
  },
] as const;

const quickLinks = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/docs/ui' },
  { label: 'Patterns', href: '/ui/patterns' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Open source', href: '/open-source' },
] as const;

export default function UiPage() {
  const versionLabel = formatVersion(UI_VERSION);
  const STATUS = 'Stable baseline';

  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'UI', href: '/ui' },
            ]}
          />
        </div>

        <section className="relative overflow-hidden rounded-[32px] border bg-card px-6 py-10 shadow-xl shadow-black/5 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

          <div className="mx-auto max-w-4xl text-center">
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

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              A UI foundation built for real SaaS products.{' '}
              <span className="block text-muted-foreground">
                Designed to move faster from primitives to product
                surfaces.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              PyColors UI is a documentation-first design system built
              on semantic tokens and accessible primitives. It helps
              developers ship product-shaped SaaS interfaces faster,
              with stronger consistency, clearer states, and a better
              foundation for real product work.
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              It powers Starter Free today and supports the broader
              PyColors path from UI foundations to launch-ready SaaS
              products.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/docs">
                  Explore docs
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/docs/ui">Browse components</Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-11 rounded-xl px-6 text-sm font-medium"
              >
                <Link href="/starters/free">See Starter Free</Link>
              </Button>
            </div>

            <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-3 mx-auto">
              <Stat label="Current version" value={versionLabel} />
              <Stat
                label="Docs format"
                value="Preview → Usage → Code → Props"
              />
              <Stat label="Release cadence" value="Weekly releases" />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <TrustPill label="Tokens-first" />
              <TrustPill label="Accessible primitives" />
              <TrustPill label="Product states included" />
              <TrustPill label="SaaS-oriented" />
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
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

        <section className="py-10 sm:py-14">
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <Card className="p-6 sm:p-7">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">@pycolors/ui</Badge>
                  <Badge variant="secondary">Open source</Badge>
                </div>

                <h2 className="text-lg font-semibold tracking-tight">
                  Stable, product-oriented, and already useful today.
                </h2>

                <p className="text-sm text-muted-foreground">
                  PyColors UI is not a speculative component set. It
                  is an actively maintained foundation for building
                  real SaaS interfaces with predictable APIs,
                  documentation-first usage, and product-shaped
                  direction.
                </p>

                <ul className="space-y-2 pt-1 text-sm">
                  <li className="text-muted-foreground">
                    <span className="text-foreground">
                      Actively maintained
                    </span>{' '}
                    with regular releases
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground">
                      Used by Starter Free
                    </span>{' '}
                    to power real product surfaces
                  </li>
                </ul>

                <div className="flex flex-wrap items-center gap-2">
                  <NpmBadges packageName="@pycolors/ui" size="sm" />
                  <span className="text-xs text-muted-foreground">
                    Open source · versioned · product-oriented
                  </span>
                </div>
              </div>
            </Card>

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
                  See the UI inside real product screens
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Starter Free lets you evaluate PyColors UI inside a
                  complete SaaS surface: auth UX, dashboard, tables,
                  settings, billing entrypoints, and admin screens.
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
                  Move to Starter Pro when the business layer becomes
                  the blocker.
                </p>
              </div>
            </Card>
          </div>
        </section>
        <section className="py-8 sm:py-10">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">
              What you can ship with this UI
            </h2>
            <p className="text-sm text-muted-foreground">
              Not isolated components. Product surfaces users expect
              from a real SaaS.
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

                  <p className="text-sm leading-relaxed text-muted-foreground">
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
        <section className="py-8 sm:py-10">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Highlights
            </h2>
            <p className="text-sm text-muted-foreground">
              A focused foundation for building product UIs with less
              friction and more consistency.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.title} className="p-5">
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    {item.title}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
        <section className="py-8 sm:py-10">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  Quick start
                </h2>
                <p className="text-sm text-muted-foreground">
                  Install the packages, import tokens, then use the
                  docs to move quickly from idea to a real screen.
                </p>

                <p className="text-xs text-muted-foreground">
                  Fast path: install → open docs → copy a component →
                  ship a screen.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <TrustPill label="Node 18+" />
                  <TrustPill label="PNPM recommended" />
                  <TrustPill label="Tokens-first" />
                  <TrustPill label="Docs-first workflow" />
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
        <section className="py-8 sm:py-10">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold tracking-tight">
                What’s in {versionLabel}
              </h2>
              <p className="text-sm text-muted-foreground">
                Advanced interactions and product UI foundations —
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
                    <p className="text-sm leading-relaxed text-muted-foreground">
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
            Patterns, starters, and future premium product surfaces
            are tracked through the{' '}
            <Link
              href="/roadmap"
              className={cn(
                'rounded-sm underline underline-offset-4 hover:text-foreground',
                focusRing,
              )}
            >
              roadmap
            </Link>
            .
          </div>
        </section>
        <section className="mx-auto mt-10 w-full">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold tracking-tight">
                  Start from the foundation, then move into the
                  product
                </h2>
                <p className="text-sm text-muted-foreground">
                  Build your first screen with PyColors UI, validate a
                  full SaaS surface with Starter Free, then move to
                  Starter Pro when the business layer matters.
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <TrustPill label="Docs-first" />
                  <TrustPill label="Open source" />
                  <TrustPill label="Product-oriented" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/docs">Read the docs</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link href="/starters/free">Open Starter Free</Link>
                </Button>

                <BuyStarterProButton
                  fullWidth={false}
                  label="Starter Pro — 199 €"
                />
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Building in public. Shipping a real SaaS foundation layer
            by layer.
          </p>
        </section>
      </div>
    </Container>
  );
}
