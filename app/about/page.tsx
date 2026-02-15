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
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story behind PyColors.io — an ecosystem built to ship, powered by PyColors UI as the minimal docs-first foundation.',
  openGraph: {
    title: 'About · PyColors',
    description:
      'The story behind PyColors.io — an ecosystem built to ship, powered by PyColors UI as the minimal docs-first foundation.',
    url: '/about',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About · PyColors',
    description:
      'The story behind PyColors.io — an ecosystem built to ship, powered by PyColors UI as the minimal docs-first foundation.',
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

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />

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
              Not “pretty demos”. Not “component dumps”. PyColors is a
              product ecosystem designed to help you ship real web
              products — with a minimal, documentation-first UI
              foundation that stays consistent as you scale.
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

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-3">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  The reason PyColors exists
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  I’ve built and maintained UI codebases where the
                  hard part wasn’t writing a new component — it was
                  keeping everything consistent six months later. The
                  problems were always the same: variants drifting,
                  spacing becoming arbitrary, tokens being “kind of”
                  used, and docs being outdated the minute you ship.
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  PyColors is my answer to that — an ecosystem where
                  the foundation is strong enough to support products.
                  PyColors UI is the minimal, docs-first system that
                  powers everything else: Starters and Templates.
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-medium text-foreground">
                    PyColors UI is the foundation.
                  </span>{' '}
                  Starters and Templates are the products built on
                  top.
                </p>
              </div>

              <BulletList
                items={[
                  'Docs-first: Preview → Usage → Code → Props, always.',
                  'Semantic tokens so themes stay coherent as you grow.',
                  'Radix primitives for accessibility and composability.',
                  'Minimal API surface area: fewer options, stronger defaults.',
                ]}
              />
            </Card>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Documentation-first
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The docs are designed for speed: copy, paste, and
                  adapt — without guessing how a component behaves.
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
                  Consistent tokens, accessible defaults, predictable
                  variants — built for SaaS, dashboards, and real
                  shipping cycles.
                </p>
              </Card>

              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Quality over noise
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Fewer components, better finished. Shipping is
                  release-driven, and improvements are tracked
                  publicly.
                </p>
              </Card>
            </div>
          </section>

          {/* WHAT YOU CAN EXPECT */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-3">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  What you can expect
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  PyColors is built in public and shipped
                  progressively. The goal is not to promise
                  “everything”. The goal is to ship a foundation you
                  can trust — then build up to blocks, templates, and
                  starters without breaking the core.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    <Target className="h-4 w-4" aria-hidden="true" />
                    Now
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Stabilize v1.1.x, tighten docs quality, and expand
                    product patterns so the ecosystem remains
                    consistent and predictable.
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
                    Mid-term
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Grow into a sellable ecosystem: UI foundation →
                    blocks → templates → starters, shipped via
                    predictable weekly releases and clean packaging.
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
              If you care about design systems, UI engineering, and
              shipping production-grade frontends, you’ll probably
              find something useful here.
            </p>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-2">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Links
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Follow progress, request features, and track
                  releases.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
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

      <Footer />
    </div>
  );
}
