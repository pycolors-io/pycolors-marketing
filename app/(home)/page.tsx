import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ExternalLink,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { MarketingShell } from '@/components/shells/marketing-shell';
import { Button, Card, Badge, cn } from '@pycolors/ui';
import { UI_VERSION } from '@/lib/version';

export const metadata: Metadata = {
  metadataBase: new URL('https://pycolors.io'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PyColors',
    description:
      'A product ecosystem for shipping real SaaS: UI system, premium templates, and production-ready starters.',
    url: '/',
    siteName: 'PyColors',
    images: ['/seo/og-main.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyColors',
    description:
      'A product ecosystem for shipping real SaaS: UI system, premium templates, and production-ready starters.',
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

function TrustPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {label}
    </span>
  );
}

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
                Starter Free available
              </Badge>
            </div>

            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              PyColors helps you build real SaaS products
              <span className="block font-bold">
                faster, with less guesswork.
              </span>
            </h1>

            <p className="max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Start with a minimal UI foundation, then accelerate with
              templates, and scale with production-ready starters —
              designed to ship.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/ui">Explore UI system</Link>
              </Button>

              <Button asChild variant="secondary">
                <Link href="/starters/free">Get Starter Free</Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/starters">Starters (early access)</Link>
              </Button>
            </div>

            <div className="mt-2 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
              <Stat label="UI baseline" value={`v${UI_VERSION}`} />
              <Stat
                label="Starter Free"
                value="Mock data · No backend"
              />
              <Stat label="Cadence" value="Weekly releases" />
            </div>
          </div>
        </section>

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
              title="UI System"
              badge={`v${UI_VERSION}`}
              badgeVariant="outline"
              description="Documentation-first UI built on semantic tokens and Radix primitives — predictable, accessible, and ready for real screens."
              href="/ui"
              cta="View UI system"
              ctaVariant="default"
            />

            <ProductCard
              title="Starter Free"
              badge="Free"
              badgeVariant="secondary"
              description="A production-shaped demo starter: dashboard shell, tables, dialogs, settings, billing entrypoints, and auth screens — ready to wire."
              href="/starters/free"
              cta="Open Starter Free"
              ctaVariant="secondary"
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
                  Clone the repo, run it locally, and explore a
                  credible SaaS UI surface — before wiring backend,
                  auth, or billing.
                </p>

                <p className="text-xs text-muted-foreground">
                  Fast path: run → open dashboard → inspect patterns →
                  copy the structure.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <TrustPill label="Next.js App Router" />
                  <TrustPill label="Tailwind v4" />
                  <TrustPill label="Mock data" />
                  <TrustPill label="No backend" />
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <Link href="/starters/free">
                      Starter Free details
                    </Link>
                  </Button>

                  <Button asChild size="sm" variant="outline">
                    <a
                      href="https://github.com/pycolors-io/pycolors-starter-free"
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cn(focusRing)}
                    >
                      GitHub repo
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
                      href="https://github.com/pycolors-io/pycolors-starter-free"
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
                    href="https://starter-demo.pycolors.io"
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

        {/* FEATURED TEMPLATE (keep) */}
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
          </div>
        </section>

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
              title="Try the Starter Free"
              description="Explore a production-shaped SaaS surface (mock data) — then wire backend later."
              href="/starters/free"
              cta="Open Starter Free"
              variant="secondary"
            />

            <StepCard
              step="Step 03"
              title="Scale with Starters"
              description="When you want everything wired together, Starters become the fastest path to production."
              href="/starters"
              cta="Early access"
              variant="outline"
            />
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="font-brand text-lg font-semibold tracking-tight">
                  Built in public. Shipped with discipline.
                </h3>
                <p className="text-sm text-muted-foreground">
                  Public roadmap, changelog, and documentation-first
                  workflow — designed to last.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className={cn(focusRing)}
                >
                  <Link href="/docs">Read the docs</Link>
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
