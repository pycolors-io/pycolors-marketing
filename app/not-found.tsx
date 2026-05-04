'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Compass,
  ExternalLink,
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
    href: '/pricing',
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
    title: 'Guides',
    description:
      'Learn the product logic behind dashboards, auth, billing, teams, and SaaS foundations.',
    href: '/guides',
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
        <Container className="py-20 sm:py-20 lg:py-24">
          <section className="mx-auto max-w-5xl text-center">
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="gap-2 rounded-[5px] border-border-subtle bg-surface-muted px-3 py-1"
              >
                <span
                  className="inline-flex h-1.5 w-1.5 rounded-full bg-warning"
                  aria-hidden="true"
                />
                404 · Page not found
              </Badge>
            </div>

            <h1 className="mt-5 text-balance font-brand text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              This page is no longer part of the current PyColors
              path.
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
              The link may be outdated, moved, or removed as the
              product structure evolved. Use the core paths below to
              get back to the fastest route: validate with Starter
              Free, upgrade with Starter Pro, or continue through docs
              and patterns.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-11 min-w-55 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/starters/free">
                  Start with Starter Free
                  <Rocket className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>

              <BuyStarterProButton
                fullWidth={false}
                label="Buy Starter Pro — 199 €"
              />

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 min-w-45 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/docs">Browse docs</Link>
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="rounded-[5px]">
                Starter Free
              </Badge>
              <Badge variant="outline" className="rounded-[5px]">
                Starter Pro
              </Badge>
              <Badge variant="outline" className="rounded-[5px]">
                Pricing
              </Badge>
              <Badge variant="outline" className="rounded-[5px]">
                Docs
              </Badge>
              <Badge variant="outline" className="rounded-[5px]">
                Guides
              </Badge>
              <Badge variant="outline" className="rounded-[5px]">
                Patterns
              </Badge>
            </div>
          </section>

          <section className="mx-auto mt-14 max-w-6xl">
            <div className="mb-8 text-center">
              <Badge
                variant="outline"
                className="rounded-[5px] border-border-subtle bg-surface-muted"
              >
                Best next steps
              </Badge>

              <h2 className="mt-4 font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
                Choose the path that gets you back into PyColors
                fastest.
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                PyColors is structured around a simple progression:
                learn, explore, validate, then upgrade when the
                business layer matters.
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
                      'h-full rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border hover:bg-surface-muted',
                      item.featured &&
                        'border-pro-border-subtle bg-pro-surface shadow-medium',
                    )}
                  >
                    <div className="flex h-full flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'inline-flex h-6 w-6 items-center justify-center    text-muted-foreground',
                              item.featured &&
                                'border-pro-border-subtle text-primary',
                            )}
                          >
                            {item.icon}
                          </div>

                          <div className="text-left">
                            <div className="text-sm font-semibold sm:text-base">
                              {item.title}
                            </div>

                            <p className="mt-1 text-sm leading-7 text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {item.badge ? (
                          <Badge
                            variant={
                              item.featured ? 'secondary' : 'outline'
                            }
                            className="shrink-0 rounded-[5px] text-[11px]"
                          >
                            {item.badge}
                          </Badge>
                        ) : null}
                      </div>

                      <div className="mt-5 flex items-center text-sm font-medium text-foreground">
                        Open page
                        <ArrowRight
                          className="h-4 w-4"
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
            <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    <Sparkles
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    A better fallback than a dead end
                  </div>

                  <h2 className="text-2xl font-semibold tracking-tight">
                    Get back to the product path.
                  </h2>
                </div>

                <div className="space-y-5">
                  <p className="text-sm leading-7 text-muted-foreground">
                    PyColors is structured as a product ecosystem: use
                    Starter Free to begin, Starter Pro when the
                    business layer matters, pricing to make the buying
                    decision, docs to learn, and patterns to explore
                    implementation direction.
                  </p>

                  <div className="flex flex-wrap gap-3 border-t border-border-subtle pt-5">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href="/docs">Browse docs</Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href="/ui/patterns">
                        Explore patterns
                      </Link>
                    </Button>

                    <Button asChild className="rounded-[5px]">
                      <Link href="/pricing">
                        View pricing
                        <ArrowRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="mx-auto mt-8 max-w-6xl">
            <Card className="rounded-[5px] border border-border-subtle bg-surface p-6 shadow-soft sm:p-7">
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
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <a
                      href="https://github.com/pycolors-io/pycolors-marketing/issues"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Report an issue on the PyColors marketing repository"
                    >
                      Report issue
                      <ExternalLink
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href="/changelog">
                      Latest updates
                      <ArrowRight
                        className="h-4 w-4"
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
