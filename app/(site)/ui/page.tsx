import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';

import { Container } from '@/components/container';
import { UI_VERSION, formatVersion } from '@/lib/version';
import { Badge, Button, Card, cn } from '@pycolors/ui';

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
const STATUS = formatVersion(UI_VERSION);

const components = [
  {
    name: 'Dialog',
    desc: 'Accessible modal primitives built on Radix UI.',
    href: '/docs/ui/dialog',
    status: STATUS,
  },
  {
    name: 'Sheet',
    desc: 'Slide-over panels for filters, actions, and contextual UI.',
    href: '/docs/ui/sheet',
    status: STATUS,
  },
  {
    name: 'Dropdown Menu',
    desc: 'Groups, submenus, checkboxes/radios, shortcuts.',
    href: '/docs/ui/dropdown-menu',
    status: STATUS,
  },
  {
    name: 'Tabs',
    desc: 'Segmented navigation with size variants and theming.',
    href: '/docs/ui/tabs',
    status: STATUS,
  },
  {
    name: 'Toast',
    desc: 'Minimal, accessible notifications with variants.',
    href: '/docs/ui/toast',
    status: STATUS,
  },
  {
    name: 'Table',
    desc: 'Composable data table primitives + empty/loading states.',
    href: '/docs/ui/table',
    status: STATUS,
  },
  {
    name: 'Pagination',
    desc: 'Stateless pagination UI primitives (UI-only).',
    href: '/docs/ui/pagination',
    status: STATUS,
  },
  {
    name: 'Skeleton',
    desc: 'Loading placeholders that preserve layout.',
    href: '/docs/ui/skeleton',
    status: STATUS,
  },
  {
    name: 'Empty State',
    desc: 'Clear empty UI with optional actions and guidance.',
    href: '/docs/ui/empty-state',
    status: STATUS,
  },
  {
    name: 'Password Input',
    desc: 'Accessible show/hide toggle for auth flows.',
    href: '/docs/ui/password-input',
    status: STATUS,
  },
];

const quickLinks = [
  { label: 'Getting started', href: '/docs' },
  { label: 'Components', href: '/docs/ui' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Templates', href: '/templates' },
  { label: 'License', href: '/license' },
  { label: 'Open source', href: '/open-source' },
];

export default function UiPage() {
  const versionLabel =
    typeof formatVersion === 'function'
      ? formatVersion()
      : UI_VERSION;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-5xl">
            <section className="relative">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Badge variant="secondary" className="gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {versionLabel} · stable baseline
                  </Badge>

                  <Badge variant="outline" className="gap-2">
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
                    now including advanced interactions and data UI
                    foundations for real product screens.
                  </p>

                  <p className="mx-auto max-w-2xl text-balance text-xs text-muted-foreground">
                    PyColors UI is the minimal foundation powering
                    Templates and SaaS Starters.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild>
                    <Link href="/docs">Explore the docs</Link>
                  </Button>

                  <Button asChild variant="outline">
                    <Link href="/docs/ui">Browse components</Link>
                  </Button>

                  <Button asChild variant="secondary">
                    <Link href="/templates">Browse templates</Link>
                  </Button>

                  <Link
                    href="/open-source"
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground',
                      focusRing,
                    )}
                  >
                    Open source
                  </Link>
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

            <section className="py-8 sm:py-10">
              <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <h2 className="font-brand text-lg font-semibold tracking-tight">
                    Who it’s for
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Built for people shipping real interfaces: SaaS
                    apps, dashboards, and marketing sites.
                  </p>
                </div>

                <Button
                  asChild
                  variant="secondary"
                  className="sm:self-start"
                >
                  <Link href="/docs">Get started</Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      SaaS products
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dashboards, settings, billing pages, CRUD flows
                      — with predictable UI density and tokens.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Data-heavy dashboards
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Tables, filters, pagination, empty states, and
                      system feedback — without fighting your UI
                      foundation.
                    </p>
                  </div>
                </Card>

                <Card className="p-5">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">
                      Marketing sites
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Landing pages that stay consistent with your app
                      UI — typography, spacing, tokens, and
                      components.
                    </p>
                  </div>
                </Card>
              </div>
            </section>

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

                    <div className="pt-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href="/docs/ui">
                          Start from a component
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
                            className="h-3.5 w-3.5"
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
              <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-1">
                  <h2 className="font-brand text-lg font-semibold tracking-tight">
                    What’s in {UI_VERSION}
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
                        <StatusPill label={c.status} />
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

            <section className="mx-auto mt-10 w-full max-w-5xl">
              <Card className="p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <h2 className="font-brand text-lg font-semibold tracking-tight">
                      Start here
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Build your first screen with PyColors UI today.
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
                      <Link href="/templates">Templates</Link>
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
