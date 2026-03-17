import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Sparkles,
  Target,
  Layers3,
  Rocket,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story behind PyColors — a docs-first open-core SaaS ecosystem for learning, exploring, validating, and shipping real product surfaces.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About · PyColors',
    description:
      'The story behind PyColors — a docs-first open-core SaaS ecosystem for learning, exploring, validating, and shipping real product surfaces.',
    url: '/about',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About · PyColors',
    description:
      'The story behind PyColors — a docs-first open-core SaaS ecosystem for learning, exploring, validating, and shipping real product surfaces.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <span
            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
            aria-hidden="true"
          />
          <span className="text-pretty">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <Card className="p-5">
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-brand text-xl font-semibold tracking-tight">
          {value}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default function AboutPage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
            ]}
          />
        </div>
        <header className="mx-auto w-full max-w-4xl text-center">
          <div className="flex justify-center">
            <Badge variant="secondary" className="gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
              About
            </Badge>
          </div>

          <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            PyColors is built for shipping
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
            PyColors is not a component dump, a random starter, or a
            polished demo with no system behind it. It is an open-core
            SaaS ecosystem designed to help builders learn the product
            logic, explore credible interfaces, validate faster, and
            move toward real business wiring when the product becomes
            serious.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className={cn(focusRing)}>
              <Link href="/guides">
                Explore guides
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className={cn(focusRing)}
            >
              <Link href="/starters/free">
                Starter Free
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className={cn(focusRing)}
            >
              <Link href="/open-source">
                Open source
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Pill>Docs-first</Pill>
            <Pill>Tokens-first UI</Pill>
            <Pill>Production patterns</Pill>
            <Pill>Weekly shipping</Pill>
            <Pill>Clear upgrade path</Pill>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-xs text-muted-foreground">
            Created by Patrice (PyColors). Personal site:{' '}
            <a
              href="https://www.pycolors.com"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                'underline underline-offset-4 transition hover:text-foreground',
                focusRing,
              )}
            >
              pycolors.com
            </a>
            .
          </p>
        </header>

        {/* ECOSYSTEM TODAY */}
        <section className="mx-auto mt-10 w-full max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Learn"
              value="Guides"
              description="Understand dashboards, auth, billing, teams, and admin systems."
            />
            <StatCard
              label="Explore"
              value="Patterns"
              description="Move from primitives to production-shaped SaaS surfaces."
            />
            <StatCard
              label="Validate"
              value="Starter Free"
              description="Run a credible SaaS surface locally with no backend overhead."
            />
            <StatCard
              label="Scale"
              value="PRO path"
              description="Upgrade when auth, billing, backend, and launch setup become the bottleneck."
            />
          </div>
        </section>

        {/* THE WHY */}
        <section className="mx-auto mt-10 w-full max-w-5xl">
          <Card className="p-6 sm:p-7">
            <div className="space-y-3">
              <h2 className="font-brand text-lg font-semibold tracking-tight">
                Why PyColors exists
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                I’ve maintained UI codebases where the hardest part
                wasn’t creating a new component. The real difficulty
                was keeping the system coherent six months later:
                spacing drift, inconsistent variants, weak tokens,
                unclear documentation, and product screens that never
                quite felt finished.
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                PyColors is my answer to that problem. A docs-first
                ecosystem that helps builders stay consistent from the
                UI foundation to actual product surfaces.
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">
                  PyColors UI is the foundation.
                </span>{' '}
                Patterns, examples, starters, and future premium
                layers are built on top of that foundation so the
                ecosystem can grow without losing coherence.
              </p>
            </div>

            <BulletList
              items={[
                'Docs-first: understand faster, copy faster, ship faster.',
                'Semantic tokens so light/dark theming stays coherent as you grow.',
                'Production-shaped patterns instead of isolated UI primitives.',
                'An open-core path from free validation to premium business acceleration.',
              ]}
            />
          </Card>
        </section>

        {/* PRINCIPLES */}
        <section className="mx-auto mt-10 w-full max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <div className="inline-flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Documentation-first
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                The docs are designed for speed and clarity: learn the
                logic, inspect the pattern, and move quickly toward
                implementation.
              </p>
            </Card>

            <Card className="p-5">
              <div className="inline-flex items-center gap-2 text-sm font-medium">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Production constraints
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Accessible defaults, stable tokens, predictable
                variants, and SaaS-oriented product surfaces.
              </p>
            </Card>

            <Card className="p-5">
              <div className="inline-flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Quality over noise
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Fewer moving parts, better finished. A baseline you
                can trust instead of a pile of disconnected assets.
              </p>
            </Card>
          </div>
        </section>

        {/* HOW THE ECOSYSTEM WORKS */}
        <section className="mx-auto mt-10 w-full max-w-5xl">
          <Card className="p-6 sm:p-7">
            <div className="space-y-3">
              <h2 className="font-brand text-lg font-semibold tracking-tight">
                How the ecosystem works
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                PyColors is structured as a progression, not as a
                random collection of pages.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Learn
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Use guides to understand how real SaaS products are
                  structured.
                </p>
                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(focusRing)}
                  >
                    <Link href="/guides">Guides</Link>
                  </Button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  Explore
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Browse patterns and examples to see credible product
                  surfaces.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(focusRing)}
                  >
                    <Link href="/ui/patterns">Patterns</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(focusRing)}
                  >
                    <Link href="/examples">Examples</Link>
                  </Button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Rocket className="h-4 w-4" aria-hidden="true" />
                  Validate
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Run Starter Free locally and validate the product
                  surface before backend complexity.
                </p>
                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(focusRing)}
                  >
                    <Link href="/starters/free">Starter Free</Link>
                  </Button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Scale
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Move to premium access when the business layer
                  becomes the real blocker.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(focusRing)}
                  >
                    <Link href="/upgrade">Upgrade</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(focusRing)}
                  >
                    <Link href="/access">Access</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </Card>
        </section>

        {/* WHAT EXISTS TODAY / WHAT'S NEXT */}
        <section className="mx-auto mt-10 w-full max-w-5xl">
          <Card className="p-6 sm:p-7">
            <div className="space-y-3">
              <h2 className="font-brand text-lg font-semibold tracking-tight">
                What exists today — and what comes next
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                PyColors is built in public and shipped progressively.
                The goal is not to ship everything. The goal is to
                ship a system that compounds.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Today
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  UI foundations, guides, examples, patterns, Starter
                  Free, and the premium path are already structured
                  into one coherent ecosystem.
                </p>
                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href="/changelog">
                      View changelog
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Next
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The ecosystem expands toward premium acceleration:
                  planned layers such as UI PRO, Starter PRO, and
                  All-In Access — without breaking the open foundation
                  underneath.
                </p>
                <div className="mt-4">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href="/roadmap">
                      View roadmap
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </Card>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            If you care about UI engineering, design systems, SaaS
            product surfaces, and shipping production-grade frontends,
            PyColors is built for that path.
          </p>
        </section>

        {/* LINKS */}
        <section className="mx-auto mt-10 w-full max-w-5xl">
          <Card className="p-6 sm:p-7">
            <div className="space-y-2">
              <h2 className="font-brand text-lg font-semibold tracking-tight">
                Links
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Follow progress, browse open-source packages, request
                features, and track releases.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                className={cn(focusRing)}
              >
                <Link href="/open-source">
                  Open source
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button asChild className={cn(focusRing)}>
                <a
                  href="https://github.com/pycolors-io/pycolors-ui"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open PyColors UI on GitHub (opens in a new tab)"
                >
                  GitHub
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className={cn(focusRing)}
              >
                <a
                  href="https://github.com/pycolors-io/pycolors-ui/issues"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open PyColors UI issues on GitHub (opens in a new tab)"
                >
                  Issues
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className={cn(focusRing)}
              >
                <a
                  href="https://x.com/PyColors"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open PyColors on X (opens in a new tab)"
                >
                  X
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className={cn(focusRing)}
              >
                <a
                  href="https://www.linkedin.com/in/pycolors/?locale=en_US"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open PyColors on LinkedIn (opens in a new tab)"
                >
                  LinkedIn
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </div>
          </Card>
        </section>

        {/* ORIENTATION NOTE */}
        <section className="mx-auto mt-10 w-full max-w-5xl">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  How to read PyColors
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  This page explains the vision and structure of the
                  ecosystem. For the commercial packaging, use{' '}
                  <span className="text-foreground">/access</span>.
                  For the product upgrade path, use{' '}
                  <span className="text-foreground">/upgrade</span>.
                  For usage rights and legal scope, use{' '}
                  <span className="text-foreground">/license</span>{' '}
                  and <span className="text-foreground">/terms</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/access">Access</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/upgrade">Upgrade</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/license">License</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/terms">Terms</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </Container>
  );
}
