'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  Compass,
  Sparkles,
  Search,
  LifeBuoy,
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
      title: 'Documentation',
      description: 'Read the docs and learn the foundations.',
      href: '/docs',
      icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
      variant: 'default',
    },
    {
      title: 'Components',
      description: 'Browse UI components and examples.',
      href: '/docs/ui',
      icon: <Compass className="h-4 w-4" aria-hidden="true" />,
      variant: 'secondary',
    },
    {
      title: 'Changelog',
      description: 'See what shipped and what’s new.',
      href: '/changelog',
      icon: <Search className="h-4 w-4" aria-hidden="true" />,
      variant: 'outline',
    },
    {
      title: 'Roadmap',
      description: 'Discover what we’re building next.',
      href: '/roadmap',
      icon: <ArrowRight className="h-4 w-4" aria-hidden="true" />,
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

            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              This page doesn’t exist.
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              The link may be broken, or the page may have been moved.
              Use the shortcuts below to get back on track.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/">
                  Back home{' '}
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/docs">
                  Browse docs{' '}
                  <Sparkles
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
          </div>

          <section className="mx-auto mt-10 w-full max-w-5xl">
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

                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

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
                    If you think this is a mistake, you can report it
                    or open an issue.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <a
                      href="https://github.com/pycolors-io/pycolors-ui/issues"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Report issue
                    </a>
                  </Button>

                  <Button asChild variant="secondary">
                    <Link href="/changelog">
                      Latest release{' '}
                      <ArrowLeft
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Tip: use the top navigation to jump back to Docs, UI, or
              Templates.
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
