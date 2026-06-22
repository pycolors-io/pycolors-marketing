'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Compass,
  CreditCard,
  Layers3,
  LifeBuoy,
  Map,
  Rocket,
  Search,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/layout/site-header';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { Badge, Button, Card, cn } from '@pycolors/ui';
import { PRODUCT_DISPLAY } from '@/lib/products/public-catalog';

type QuickLink = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  badge?: string;
  featured?: boolean;
};

type RecoveryPath = {
  label: string;
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

const starterProPriceLabel = PRODUCT_DISPLAY['starter-pro'].priceLabel;

const quickLinks: QuickLink[] = [
  {
    title: 'Starter Free',
    description:
      'Start with a production-shaped SaaS foundation and validate faster.',
    href: '/starters/free',
    icon: <Rocket className="h-4 w-4" aria-hidden="true" />,
    badge: 'Best entry point',
    featured: true,
  },
  {
    title: 'Starter Pro',
    description:
      'Move to authentication, billing, protected app surfaces, and SaaS patterns.',
    href: '/starters/pro',
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
    badge: 'Premium',
  },
  {
    title: 'Pricing',
    description:
      'Compare the path from Starter Free to Starter Pro and choose the right plan.',
    href: '/pricing',
    icon: <CreditCard className="h-4 w-4" aria-hidden="true" />,
    badge: 'Decision',
  },
  {
    title: 'Documentation',
    description:
      'Explore the PyColors docs, implementation notes, and product foundations.',
    href: '/docs',
    icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
    badge: 'Docs',
  },
  {
    title: 'Patterns',
    description:
      'Browse reusable SaaS and UI patterns designed for production surfaces.',
    href: '/docs/patterns',
    icon: <Layers3 className="h-4 w-4" aria-hidden="true" />,
    badge: 'Patterns',
  },
  {
    title: 'Roadmap',
    description:
      'See what is planned next across the PyColors ecosystem.',
    href: '/roadmap',
    icon: <Map className="h-4 w-4" aria-hidden="true" />,
    badge: 'Direction',
  },
];

const recoveryPaths: RecoveryPath[] = [
  {
    label: 'Looking for docs?',
    title: 'Go to documentation',
    description:
      'Find product guides, implementation notes, release policies, and framework foundations.',
    href: '/docs',
    icon: <BookOpen className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: 'Looking for a starter?',
    title: 'Compare starters',
    description:
      'Start with Starter Free or move directly to Starter Pro for auth, billing, and app surfaces.',
    href: '/starters',
    icon: <Rocket className="h-4 w-4" aria-hidden="true" />,
  },
  {
    label: 'Looking for product depth?',
    title: 'Explore patterns',
    description:
      'Review reusable SaaS patterns built for dashboards, billing, onboarding, and upgrades.',
    href: '/docs/patterns',
    icon: <Layers3 className="h-4 w-4" aria-hidden="true" />,
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
                variant="outline"
                className="gap-2 rounded-[5px] border-border-subtle bg-surface-muted px-3 py-1"
              >
                <span
                  className="inline-flex h-1.5 w-1.5 rounded-full bg-warning"
                  aria-hidden="true"
                />
                <span>404 · Page not found</span>
              </Badge>
            </div>

            <h1 className="mt-5 text-balance font-brand text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              This page moved as the PyColors ecosystem evolved.
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
              The route may be outdated, renamed, or removed. Use the
              recommended paths below to get back to the product,
              docs, pricing, or starter that best matches what you
              were looking for.
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
                label={`Buy Starter Pro — ${starterProPriceLabel}`}
              />

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 min-w-45 rounded-[5px] px-6 text-sm font-medium"
              >
                <Link href="/docs">
                  Browse docs
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                </Link>
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
                Patterns
              </Badge>
              <Badge variant="outline" className="rounded-[5px]">
                Roadmap
              </Badge>
            </div>
          </section>

          <section className="mx-auto mt-14 max-w-6xl">
            <div className="mb-7 text-center">
              <Badge
                variant="outline"
                className="rounded-[5px] border-border-subtle bg-surface-muted"
              >
                Recommended recovery paths
              </Badge>

              <h2 className="mt-4 font-brand text-2xl font-semibold tracking-tight sm:text-3xl">
                Find the right path back into PyColors.
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                PyColors is structured around a simple progression:
                learn, explore, validate, then upgrade when the
                business layer matters.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {recoveryPaths.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block"
                >
                  <Card className="h-full rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border hover:bg-surface-muted">
                    <div className="flex h-full flex-col">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        {item.icon}
                        {item.label}
                      </div>

                      <h3 className="mt-3 text-base font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>

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
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge
                  variant="outline"
                  className="rounded-[5px] border-border-subtle bg-surface-muted"
                >
                  Popular destinations
                </Badge>

                <h2 className="mt-4 font-brand text-2xl font-semibold tracking-tight">
                  Continue from a core PyColors surface.
                </h2>
              </div>

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
                              'inline-flex h-6 w-6 items-center justify-center text-muted-foreground',
                              item.featured && 'text-primary',
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
            <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <div className="border-b border-border-subtle p-6 sm:p-7 lg:border-b-0 lg:border-r">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Search
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                    Ecosystem map
                  </div>

                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    Recover from the right product surface.
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    PyColors is organized around docs, starters,
                    patterns, pricing, and product direction. Start
                    from the surface closest to what you were trying
                    to reach.
                  </p>
                </div>

                <div className="divide-y divide-border-subtle">
                  {[
                    {
                      title: 'Learn',
                      icon: BookOpen,
                      links: [
                        { label: 'Documentation', href: '/docs' },
                        { label: 'Guides', href: '/guides' },
                        { label: 'Changelog', href: '/changelog' },
                      ],
                    },
                    {
                      title: 'Build',
                      icon: Rocket,
                      links: [
                        {
                          label: 'Starter Free',
                          href: '/starters/free',
                        },
                        {
                          label: 'Starter Pro',
                          href: '/starters/pro',
                        },
                        { label: 'Patterns', href: '/docs/patterns' },
                      ],
                    },
                    {
                      title: 'Upgrade',
                      icon: CreditCard,
                      links: [
                        { label: 'Pricing', href: '/pricing' },
                        {
                          label: 'Starter Pro docs',
                          href: '/docs/starter-pro',
                        },
                        {
                          label: 'Billing',
                          href: '/docs/starter-pro/billing',
                        },
                      ],
                    },
                    {
                      title: 'Explore',
                      icon: Compass,
                      links: [
                        { label: 'Roadmap', href: '/roadmap' },
                        {
                          label: 'Release policy',
                          href: '/docs/project/release-policy',
                        },
                        {
                          label: 'Versioning policy',
                          href: '/docs/project/versioning-policy',
                        },
                      ],
                    },
                  ].map((group) => (
                    <div
                      key={group.title}
                      className="grid gap-3 p-4 transition-colors hover:bg-surface-muted sm:grid-cols-[140px_1fr] sm:items-center sm:p-5"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <group.icon className="h-4 w-4 text-muted-foreground" />
                        {group.title}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="group inline-flex h-8 items-center gap-1.5 rounded-[5px] border border-border-subtle bg-background px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:bg-surface hover:text-foreground"
                          >
                            {link.label}
                            <ArrowRight
                              className="h-3.5 w-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                              aria-hidden="true"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
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
                    Ready to choose the right path?
                  </div>

                  <p className="text-sm leading-7 text-muted-foreground">
                    Compare Starter Free and Starter Pro to decide
                    whether you want to validate first or start from a
                    production-ready SaaS foundation.
                  </p>
                </div>

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
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              PyColors is maintained as an evolving SaaS ecosystem:
              starters, docs, patterns, changelog, and roadmap move
              together.
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
