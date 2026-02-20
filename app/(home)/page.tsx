import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ExternalLink,
  Eye,
  ArrowRight,
  Sparkles,
  BadgeCheck,
} from 'lucide-react';

import { MarketingShell } from '@/components/shells/marketing-shell';
import {
  Button,
  Card,
  Badge,
  cn,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@pycolors/ui';
import { UI_VERSION } from '@/lib/version';
import { NpmBadges } from '@/components/npm-badges';

export const metadata: Metadata = {
  metadataBase: new URL('https://pycolors.io'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PyColors',
    description:
      'Ship real SaaS faster with a predictable UI foundation, templates, and starter-grade product surfaces.',
    url: '/',
    siteName: 'PyColors',
    images: ['/seo/og-main.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyColors',
    description:
      'Ship real SaaS faster with a predictable UI foundation, templates, and starter-grade product surfaces.',
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

function StepCard({
  step,
  title,
  description,
  href,
  cta,
  variant = 'outline',
}: {
  step: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  variant?: 'default' | 'outline' | 'secondary';
}) {
  return (
    <Card className="p-5">
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">{step}</div>
        <div className="text-sm font-medium">{title}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="pt-2">
          <Button asChild size="sm" variant={variant}>
            <Link href={href}>{cta}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function ProductCard({
  title,
  description,
  href,
  badge,
  badgeVariant = 'secondary',
  cta,
  ctaVariant = 'default',
}: {
  title: string;
  description: string;
  href: string;
  badge?: string;
  badgeVariant?: 'secondary' | 'outline';
  cta: string;
  ctaVariant?: 'default' | 'outline' | 'secondary';
}) {
  return (
    <Card className="flex h-full flex-col justify-between p-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="font-brand text-lg font-semibold tracking-tight">
            {title}
          </h3>
          {badge ? (
            <Badge variant={badgeVariant} className="text-xs">
              {badge}
            </Badge>
          ) : null}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5">
        <Button asChild className="w-full" variant={ctaVariant}>
          <Link href={href}>{cta}</Link>
        </Button>
      </div>
    </Card>
  );
}

const starterSurfaces = [
  {
    title: '/login + /register + /forgot',
    desc: 'Auth flows with states (loading / error / success), plus Google OAuth.',
    tag: 'Auth',
  },
  {
    title: '/dashboard',
    desc: 'Product overview that feels “real” on first load (KPIs + next actions).',
    tag: 'Core',
  },
  {
    title: '/projects',
    desc: 'Your main entity screen: table + CRUD dialogs + empty state (mock).',
    tag: 'CRUD',
  },
  {
    title: '/settings',
    desc: 'Profile, org, security, danger zone — credibility baseline.',
    tag: 'Settings',
  },
  {
    title: '/billing',
    desc: 'Plan state + upgrade entrypoints (wiring-ready).',
    tag: 'Billing',
  },
  {
    title: '/admin',
    desc: 'B2B readiness: members, roles, invitations (mock).',
    tag: 'B2B',
  },
];

const EXTERNAL = {
  starterRepo: 'https://github.com/pycolors-io/pycolors-starter-free',
  starterDemo: 'https://starter-demo.pycolors.io',
} as const;

export default function HomePage() {
  return (
    <MarketingShell>
      <div className="mx-auto w-full max-w-5xl">
        {/* HERO */}
        <section className="py-12 text-center sm:py-16">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Built in public
              </Badge>
              <Badge variant="outline">Production-first</Badge>
              <Badge variant="outline" className="gap-1.5">
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Starter Free is available
              </Badge>
            </div>

            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Launch your SaaS in days,
              <span className="block font-bold">not months.</span>
            </h1>

            <p className="max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              PyColors helps you ship real SaaS with a predictable UI
              foundation, templates, and starter-grade product
              surfaces — designed to scale without rewrites.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/starters/free">
                  Get Starter Free
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button asChild variant="secondary">
                <a
                  href={EXTERNAL.starterDemo}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open the Starter Free live demo"
                >
                  View live demo
                  <Eye className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>

              <Button asChild variant="outline">
                <Link
                  href="/docs/saas-starter"
                  className={cn(focusRing)}
                >
                  Read starter docs
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/ui">Explore UI system</Link>
              </Button>
            </div>

            <div className="mt-2 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
              <Stat label="UI baseline" value={`v${UI_VERSION}`} />
              <Stat
                label="Starter Free"
                value="Real screens · Wiring-ready"
              />
              <Stat label="Cadence" value="Weekly releases" />
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <TrustPill label="Next.js App Router" />
              <TrustPill label="Tailwind v4" />
              <TrustPill label="Tokens-first" />
              <TrustPill label="Docs-first workflow" />
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="py-10 sm:py-14">
          <div className="mb-6 space-y-1 text-center">
            <h2 className="font-brand text-xl font-semibold tracking-tight">
              What’s inside PyColors
            </h2>
            <p className="text-sm text-muted-foreground">
              One foundation → templates → starters. Start free.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              title="Starter Free"
              badge="Free"
              badgeVariant="secondary"
              description="A production-shaped SaaS surface: dashboard shell, CRUD table, dialogs, settings, billing entrypoints, and admin screens — mocked by design, ready to wire."
              href="/starters/free"
              cta="Open Starter Free"
              ctaVariant="secondary"
            />

            <ProductCard
              title="UI System"
              badge={`v${UI_VERSION}`}
              badgeVariant="outline"
              description="Documentation-first UI built on semantic tokens and Radix primitives — predictable, accessible, and ready for real screens."
              href="/ui"
              cta="View UI system"
              ctaVariant="default"
            />

            <ProductCard
              title="Premium Templates"
              badge="Premium"
              description="Paid-ready landing pages and dashboards built on PyColors UI — consistent tokens, clean structure, and zero design debt."
              href="/templates"
              cta="Browse templates"
              ctaVariant="outline"
            />
          </div>
        </section>

        {/* PYCOLORS UI TRACTION (COMPACT) */}
        <section className="py-8 sm:py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Open source</Badge>
              <Badge variant="outline">npm package</Badge>
            </div>

            <p className="max-w-xl text-sm text-muted-foreground">
              PyColors UI powers the Starters and Templates and is
              published on npm. Use it independently or as part of the
              ecosystem.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <NpmBadges packageName="@pycolors/ui" size="sm" />
              <span className="text-xs text-muted-foreground">
                Powering the Starters and Templates.
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/ui">Explore UI system</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/docs/ui">UI docs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* STARTER FREE QUICKSTART */}
        <section className="py-10 sm:py-14">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="gap-2">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Starter Free
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Clone → install → run
                  </Badge>
                </div>

                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Try the Starter Free
                </h2>
                <p className="text-sm text-muted-foreground">
                  Run it locally and explore a credible SaaS UI
                  surface — before wiring backend, auth, or billing.
                </p>

                <p className="text-xs text-muted-foreground">
                  Fast path: run → open dashboard → inspect patterns →
                  copy the structure.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <TrustPill label="Instant UI surface" />
                  <TrustPill label="Mock data" />
                  <TrustPill label="No backend" />
                  <TrustPill label="Ready to wire later" />
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <Link href="/starters/free">
                      Starter Free details
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/docs/saas-starter">
                      Read starter docs
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
                      href={EXTERNAL.starterRepo}
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

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Prefer a hosted preview?</span>
                  <a
                    href={EXTERNAL.starterDemo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-sm underline-offset-4 hover:text-foreground hover:underline',
                      focusRing,
                    )}
                  >
                    Open live demo
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* WHAT YOU GET */}
        <section id="what-you-get" className="py-10 sm:py-14">
          <div className="mb-6 space-y-1 text-center">
            <h2 className="font-brand text-xl font-semibold tracking-tight">
              What you get (Starter Free)
            </h2>
            <p className="text-sm text-muted-foreground">
              Not “features”. Product surfaces users expect on day
              one.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {starterSurfaces.map((s) => (
              <Card key={s.title} className="p-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">
                      {s.title}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {s.tag}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-6 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <BadgeCheck
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </span>
                <div className="space-y-1">
                  <div className="text-sm font-medium">
                    Built on PyColors UI (already included)
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Starter Free ships with the PyColors UI primitives
                    you’ve published: buttons, cards, badges, dialogs,
                    sheets, tabs, toasts, tables, pagination,
                    skeletons, empty states, and an accessible
                    password input.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href="/ui">Explore PyColors UI</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href="/docs/saas-starter">
                        Read starter docs
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* UPGRADE MENTAL MODEL */}
        <section className="py-10 sm:py-14">
          <div className="mb-6 space-y-1 text-center">
            <h2 className="font-brand text-xl font-semibold tracking-tight">
              Upgrade to PRO when you scale
            </h2>
            <p className="text-sm text-muted-foreground">
              Upgrade when wiring slows you down.
            </p>
          </div>

          <Card className="p-6 sm:p-7">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">
                    Capability
                  </TableHead>
                  <TableHead className="w-[35%]">Free</TableHead>
                  <TableHead className="w-[35%]">
                    PRO (coming)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Auth</TableCell>
                  <TableCell>Mock flows + UI states</TableCell>
                  <TableCell>
                    Real auth + sessions + providers
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Billing
                  </TableCell>
                  <TableCell>Mock-ready pages</TableCell>
                  <TableCell>
                    Stripe ready + portal + webhooks
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Organizations
                  </TableCell>
                  <TableCell>Single org surface</TableCell>
                  <TableCell>Multi-org + switching</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Permissions
                  </TableCell>
                  <TableCell>Basic roles (owner/member)</TableCell>
                  <TableCell>Advanced RBAC + policies</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">UI</TableCell>
                  <TableCell>PyColors UI baseline</TableCell>
                  <TableCell>
                    PRO blocks + premium product patterns
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href="/starters">Starters page</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/roadmap">Track roadmap</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/docs/saas-starter">Starter docs</Link>
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              PRO stays clean: same surfaces, wired foundations, and
              upgrade-ready packaging.
            </p>
          </Card>
        </section>

        {/* FEATURED TEMPLATE */}
        <section className="py-10 sm:py-14">
          <div className="mx-auto w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="gap-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Featured template
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Early access
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      $49
                    </span>
                  </div>

                  <h3 className="font-brand text-lg font-semibold tracking-tight">
                    NA-AI — Premium Landing Page
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    Premium landing page template for AI & SaaS
                    products — real sections, pricing toggle,
                    integrations, dark/light mode, and clean
                    production UI.
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Dark + Light screenshots included. Frontend-only
                    by design.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:min-w-[220px] sm:items-end">
                  <Button asChild className={cn(focusRing)}>
                    <Link href="/templates/na-ai">
                      View NA-AI details
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="secondary"
                    className={cn(focusRing)}
                  >
                    <a
                      href="https://pycolors.gumroad.com/l/na-ai-nextjs-landing?layout=profile"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Buy NA-AI on Gumroad (opens in a new tab)"
                    >
                      Get it on Gumroad
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>

                  <a
                    href="https://na-ai-landing-template.vercel.app"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      'mt-1 inline-flex items-center text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline',
                      focusRing,
                      'rounded-sm',
                    )}
                  >
                    View live demo
                    <Eye
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </Card>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              This is one example of the Templates line — more ship
              progressively.
            </p>

            <div className="mt-3 flex justify-center">
              <Button asChild size="sm" variant="outline">
                <Link href="/templates">Browse all templates</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className="py-10 sm:py-14">
          <div className="mb-6 space-y-1 text-center">
            <h2 className="font-brand text-xl font-semibold tracking-tight">
              How it fits your workflow
            </h2>
            <p className="text-sm text-muted-foreground">
              Adopt progressively — no rewrites, no lock-in.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <StepCard
              step="Step 01"
              title="Start with the UI foundation"
              description="Use the UI system as your stable baseline for dashboards and marketing screens."
              href="/ui"
              cta="Explore UI"
              variant="outline"
            />

            <StepCard
              step="Step 02"
              title="Validate with Starter Free"
              description="Explore a real SaaS UI surface (mock data) — prove the UX before wiring backend."
              href="/starters/free"
              cta="Open Starter Free"
              variant="secondary"
            />

            <StepCard
              step="Step 03"
              title="Scale with Starters"
              description="When you need everything wired together, the Starter becomes the fastest path to production."
              href="/starters"
              cta="Early access"
              variant="outline"
            />
          </div>
        </section>

        {/* TRUST */}
        <section className="py-10 sm:py-14">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="font-brand text-lg font-semibold tracking-tight">
                  Built in public. Shipped with discipline.
                </h3>
                <p className="text-sm text-muted-foreground">
                  Public roadmap, changelog, and docs-first workflow —
                  designed to last.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className={cn(focusRing)}
                >
                  <Link href="/docs/saas-starter">Starter docs</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className={cn(focusRing)}
                >
                  <Link href="/docs/ui">UI docs</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className={cn(focusRing)}
                >
                  <Link href="/changelog">Changelog</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className={cn(focusRing)}
                >
                  <Link href="/roadmap">Roadmap</Link>
                </Button>
              </div>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            PyColors is designed to last — not to chase trends.
          </p>
        </section>
      </div>
    </MarketingShell>
  );
}
