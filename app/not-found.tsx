'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Layers3,
  BookOpen,
  Rocket,
  LifeBuoy,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Button, Badge, Card, cn } from '@pycolors/ui';

type QuickLink = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  variant?: 'default' | 'secondary' | 'outline';
};

export default function NotFound() {
  const quickLinks: QuickLink[] = [
    {
      title: 'Starter Free',
      description:
        'Validate a real SaaS surface with auth UX, dashboard, CRUD, settings, and billing entrypoints.',
      href: '/starters/free',
      icon: <Rocket className="h-4 w-4" aria-hidden="true" />,
      variant: 'default',
    },
    {
      title: 'Guides',
      description:
        'Learn the product logic behind dashboards, billing, authentication, admin systems, and SaaS UX.',
      href: '/guides',
      icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
      variant: 'secondary',
    },
    {
      title: 'Patterns',
      description:
        'Explore production-shaped SaaS patterns built on top of the PyColors UI foundation.',
      href: '/ui/patterns',
      icon: <Layers3 className="h-4 w-4" aria-hidden="true" />,
      variant: 'outline',
    },
    {
      title: 'Access',
      description:
        'See the current pricing direction and the upgrade path from Starter Free to premium access.',
      href: '/access',
      icon: <Compass className="h-4 w-4" aria-hidden="true" />,
      variant: 'outline',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />

      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-warning" />
                404 — Page not found
              </Badge>
            </div>

            <h1 className="mt-4 font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Looks like you took a wrong turn.
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              The page you were looking for doesn’t exist or may have
              moved. The fastest way back is to start from one of the
              core PyColors paths below.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/">
                  Back to PyColors
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/starters/free">
                  Open Starter Free
                  <Rocket
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Badge variant="outline">Learn</Badge>
              <Badge variant="outline">Explore</Badge>
              <Badge variant="outline">Validate</Badge>
              <Badge variant="outline">Upgrade</Badge>
            </div>
          </div>

          {/* Quick paths */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="mb-5 text-center sm:mb-6">
              <h2 className="font-brand text-lg font-semibold tracking-tight">
                Most useful pages
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick the path that matches what you were trying to do.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block"
                >
                  <Card
                    className={cn(
                      'p-5 transition-colors',
                      'hover:bg-accent/30',
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg border bg-muted/40">
                        {item.icon}
                      </div>

                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-medium">
                            {item.title}
                          </div>
                          <Badge
                            variant={item.variant ?? 'secondary'}
                            className="text-[11px]"
                          >
                            Open
                          </Badge>
                        </div>

                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Secondary actions */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-left">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    <Sparkles
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Try a safer starting point
                  </div>
                  <p className="text-sm text-muted-foreground">
                    PyColors is structured as a system: guides to
                    learn, patterns to explore, Starter Free to
                    validate, and premium access when wiring matters.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <Link href="/guides">Browse guides</Link>
                  </Button>

                  <Button asChild variant="secondary">
                    <Link href="/ui/patterns">Explore patterns</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Help */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-left">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    <LifeBuoy
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Need help?
                  </div>
                  <p className="text-sm text-muted-foreground">
                    If you think this page should exist, you can
                    report it or check the latest updates.
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
              Tip: use the top navigation to jump back to UI, Guides,
              Examples, or Starters.
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
