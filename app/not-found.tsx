'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Layers3,
  LifeBuoy,
  Rocket,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/layout/site-header';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { Badge, Button, Card, cn } from '@pycolors/ui';

type QuickLink = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  featured?: boolean;
};

const quickLinks: QuickLink[] = [
  {
    title: 'Starter Free',
    description:
      'Start with a production-shaped SaaS surface and validate product direction faster.',
    href: '/starters/free',
    icon: <Rocket className="h-4 w-4" aria-hidden="true" />,
    badge: 'Best entry point',
    featured: true,
  },
  {
    title: 'Starter Pro',
    description:
      'Move from validation to real auth, real billing, and stronger launch-ready foundations.',
    href: '/starters/pro',
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
    badge: 'Paid upgrade',
  },
  {
    title: 'Pricing',
    description:
      'Review the commercial path from Starter Free to Starter Pro access.',
    href: '/access',
    icon: <Compass className="h-4 w-4" aria-hidden="true" />,
    badge: 'Decision page',
  },
  {
    title: 'Documentation',
    description:
      'Go back to the docs and navigate PyColors through the product and implementation paths.',
    href: '/docs',
    icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
    badge: 'Learn',
  },
  {
    title: 'Patterns',
    description:
      'Explore production-shaped UI and SaaS patterns built on the system.',
    href: '/ui/patterns',
    icon: <Layers3 className="h-4 w-4" aria-hidden="true" />,
    badge: 'Explore',
  },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <SiteHeader />

      <main id="content" className="flex-1 pt-16 text-foreground">
        <Container className="py-16 sm:py-20 lg:py-24">
          <section className="mx-auto max-w-5xl text-center">
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="gap-2 rounded-full px-3 py-1"
              >
                <span
                  className="inline-flex h-1.5 w-1.5 rounded-full bg-warning"
                  aria-hidden="true"
                />
                404 · Page not found
              </Badge>
            </div>

            <h1 className="mt-5 text-balance font-brand text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              This page does not exist anymore.
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
              The link may be outdated, moved, or no longer part of
              the current product structure. The fastest way back into
              PyColors is through the core product paths below.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="min-w-[220px] rounded-xl"
              >
                <Link href="/starters/free">
                  Start with Starter Free
                  <Rocket
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <BuyStarterProButton
                fullWidth={false}
                label="Buy Starter Pro — 199 €"
              />
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="outline">Starter Free</Badge>
              <Badge variant="outline">Starter Pro</Badge>
              <Badge variant="outline">Pricing</Badge>
              <Badge variant="outline">Docs</Badge>
              <Badge variant="outline">Patterns</Badge>
            </div>
          </section>

          <section className="mx-auto mt-12 max-w-6xl">
            <div className="mb-6 text-center">
              <h2 className="font-brand text-lg font-semibold tracking-tight sm:text-xl">
                Best next steps
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose the path that gets you back into the product
                fastest.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block"
                >
                  <Card
                    className={cn(
                      'h-full rounded-2xl border-border/70 p-5 transition-all',
                      'hover:-translate-y-0.5 hover:border-border hover:bg-accent/20',
                      item.featured &&
                        'border-primary/30 bg-accent/10',
                    )}
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-background',
                              item.featured && 'border-primary/30',
                            )}
                          >
                            {item.icon}
                          </div>

                          <div className="text-left">
                            <div className="text-sm font-semibold sm:text-base">
                              {item.title}
                            </div>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {item.badge ? (
                          <Badge
                            variant={
                              item.featured ? 'default' : 'secondary'
                            }
                            className="shrink-0 text-[11px]"
                          >
                            {item.badge}
                          </Badge>
                        ) : null}
                      </div>

                      <div className="mt-5 flex items-center text-sm font-medium text-foreground">
                        Open page
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-10 max-w-6xl">
            <Card className="rounded-2xl border-border/70 p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2 text-left">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    <Sparkles
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    A better fallback than a dead end
                  </div>

                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    PyColors is structured as a product ecosystem: use
                    Starter Free to begin, Starter Pro when the
                    business layer matters, pricing to make the buying
                    decision, docs to learn, and patterns to explore
                    implementation direction.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <Link href="/docs">Browse docs</Link>
                  </Button>

                  <Button asChild variant="secondary">
                    <Link href="/ui/patterns">Explore patterns</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          <section className="mx-auto mt-8 max-w-6xl">
            <Card className="rounded-2xl border-border/70 p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2 text-left">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    <LifeBuoy
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Think this page should still exist?
                  </div>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Report the broken path, or check what changed
                    recently in the product and documentation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <a
                      href="https://github.com/pycolors-io/pycolors-marketing/issues"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Report an issue on the PyColors marketing repository"
                    >
                      Report issue
                    </a>
                  </Button>

                  <Button asChild variant="secondary">
                    <Link href="/changelog">
                      Latest updates
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              The fastest recovery path is usually Starter Free,
              Starter Pro, Pricing, or Docs.
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
