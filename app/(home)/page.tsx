import Link from 'next/link';
import type { Metadata } from 'next';
import { ExternalLink, Eye, ArrowRight } from 'lucide-react';

import { MarketingShell } from '@/components/shells/marketing-shell';
import { Button, Card, Badge, cn } from '@pycolors/ui';
import { APP_VERSION } from '@/lib/version';

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

export default function HomePage() {
  return (
    <MarketingShell>
      <div className="mx-auto w-full max-w-5xl">
        <section className="py-12 text-center sm:py-16">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Built in public
              </Badge>
              <Badge variant="outline">Production-first</Badge>
            </div>

            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              PyColors helps you build real SaaS products
              <span className="block font-bold">
                faster, with less guesswork.
              </span>
            </h1>

            <p className="max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              PyColors is a product ecosystem for founders and teams
              shipping real-world SaaS — built on a minimal UI
              foundation, premium templates, and production-ready
              starters.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/ui">Explore UI system</Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/templates">Browse templates</Link>
              </Button>

              <Button asChild variant="secondary">
                <Link href="/starters">Starters (early access)</Link>
              </Button>
            </div>

            <div className="mt-2 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
              <Stat label="UI baseline" value={`v${APP_VERSION}`} />
              <Stat
                label="Docs format"
                value="Preview → Usage → Code → Props"
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
              One foundation → templates → starters.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              title="UI System"
              badge={`v${APP_VERSION}`}
              badgeVariant="outline"
              description="A minimal, documentation-first UI system built on semantic tokens and Radix primitives — predictable, accessible, and built for real screens."
              href="/ui"
              cta="View UI system"
              ctaVariant="default"
            />

            <ProductCard
              title="Premium Templates"
              badge="Premium"
              description="Paid-ready landing pages and dashboards built on PyColors UI — clean structure, consistent tokens, and zero design debt."
              href="/templates"
              cta="Browse templates"
              ctaVariant="outline"
            />

            <ProductCard
              title="SaaS Starters"
              badge="Coming soon"
              description="Production-ready starters designed for shipping: auth & billing foundations, app layout, settings, and dashboard-grade UX patterns."
              href="/starters"
              cta="Join early access"
              ctaVariant="secondary"
            />
          </div>

          <div className="mx-auto mt-6 w-full max-w-5xl">
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
              title="Ship faster with templates"
              description="Drop-in marketing and dashboard layouts that match your UI out of the box."
              href="/templates"
              cta="View templates"
              variant="outline"
            />

            <StepCard
              step="Step 03"
              title="Scale with starters"
              description="When you need everything wired together, Starters are the fastest path to production."
              href="/starters"
              cta="Early access"
              variant="secondary"
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
