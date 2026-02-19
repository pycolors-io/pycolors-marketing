import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Sparkles,
  Target,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card, cn } from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story behind PyColors.io — a docs-first ecosystem for shipping real SaaS: UI foundation, templates, and starters.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About · PyColors',
    description:
      'The story behind PyColors.io — a docs-first ecosystem for shipping real SaaS: UI foundation, templates, and starters.',
    url: '/about',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About · PyColors',
    description:
      'The story behind PyColors.io — a docs-first ecosystem for shipping real SaaS: UI foundation, templates, and starters.',
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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <header className="mx-auto w-full max-w-4xl text-center">
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                About
              </Badge>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              PyColors.io is built for shipping
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              PyColors is not a “component dump” or a “pretty demo”.
              It’s an ecosystem designed to help you ship real SaaS
              with fewer decisions: a minimal UI foundation, templates
              that stay consistent, and starter-ready product
              patterns.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className={cn(focusRing)}>
                <Link href="/docs">
                  Read the docs{' '}
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
                <Link href="/roadmap">
                  View roadmap{' '}
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
                  Open source{' '}
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

          {/* THE WHY */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-3">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Why PyColors exists
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  I’ve maintained UI codebases where the hard part
                  wasn’t building a new component — it was keeping the
                  system coherent six months later. Variants drift,
                  spacing becomes arbitrary, tokens are “kind of”
                  used, and docs become outdated right after release.
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  PyColors is my answer: a docs-first foundation that
                  stays predictable, so templates and starters can be
                  shipped without breaking consistency.
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">
                    PyColors UI is the foundation.
                  </span>{' '}
                  Templates and Starters are the products built on
                  top.
                </p>
              </div>

              <BulletList
                items={[
                  'Docs-first: Preview → Usage → Code → Props (always).',
                  'Semantic tokens so themes stay coherent as you grow.',
                  'Radix primitives for accessibility and composability.',
                  'Minimal API surface area: fewer options, stronger defaults.',
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
                  The docs are designed for speed: preview, copy, and
                  ship — without guessing behaviors.
                </p>
              </Card>

              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <BadgeCheck
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Production constraints
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Accessible defaults, consistent tokens, predictable
                  variants — built for SaaS and real cycles.
                </p>
              </Card>

              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Quality over noise
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Fewer components, better finished. A stable baseline
                  you can build on for years.
                </p>
              </Card>
            </div>
          </section>

          {/* NOW / NEXT */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-3">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  What you can expect
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  PyColors is built in public and shipped
                  progressively. The goal is not “everything”. The
                  goal is a foundation you can trust — then grow into
                  templates and starters without breaking the core.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    Now
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Stabilize the UI baseline, tighten documentation,
                    and expand product patterns that make SaaS screens
                    feel “real” out of the box.
                  </p>
                  <div className="mt-4">
                    <Button
                      asChild
                      variant="outline"
                      className={cn(focusRing)}
                    >
                      <Link href="/changelog">
                        View changelog{' '}
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
                    Expand into a sellable ecosystem: UI foundation →
                    templates → starters, shipped with clean packaging
                    and predictable releases.
                  </p>
                  <div className="mt-4">
                    <Button
                      asChild
                      variant="outline"
                      className={cn(focusRing)}
                    >
                      <Link href="/templates">
                        Browse templates{' '}
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
              If you care about UI engineering, design systems, and
              shipping production-grade frontends, you’ll find useful
              patterns here.
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
                  Follow progress, browse open-source packages,
                  request features, and track releases.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className={cn(focusRing)}
                >
                  <Link href="/open-source">
                    Open source{' '}
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
                    GitHub{' '}
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
                    Issues{' '}
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
                    X{' '}
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
                    LinkedIn{' '}
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </div>
            </Card>
          </section>
        </Container>
      </main>
    </div>
  );
}
