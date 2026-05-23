import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import {
  getAllCategories,
  getPostsByCategory,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

export const metadata: Metadata = {
  title: 'Next.js SaaS Engineering Categories',
  description:
    'Browse engineering categories across Next.js SaaS architecture, billing systems, authentication, UI engineering, product UX, design systems, and production-ready implementation patterns.',
  alternates: {
    canonical: '/blog/categories',
  },

  openGraph: {
    title: 'Next.js SaaS Engineering Categories',
    description:
      'Explore engineering categories covering SaaS architecture, UI systems, billing flows, developer experience, and production-ready Next.js implementation patterns.',
    url: '/blog/categories',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Engineering Categories',
    description:
      'Engineering categories across SaaS architecture, UI systems, billing, product UX, and modern Next.js development.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function Pill({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-[5px]',
        'border border-border-subtle',
        'bg-background/50',
        'px-2.5 py-1',
        'text-[11px] font-medium text-muted-foreground',
      )}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  title,
  description,
}: Readonly<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="mb-10 space-y-3">
      <h2 className="font-brand text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        {title}
      </h2>

      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function BlogCategoriesPage() {
  const categories = getAllCategories();

  return (
    <Container className="py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary),transparent_95%),transparent_60%)]"
        />

        <div className="mb-10">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Categories', href: '/blog/categories' },
            ]}
          />
        </div>

        <header className="mx-auto mb-20 max-w-5xl">
          <div className="space-y-10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  'gap-1.5 rounded-[5px]',
                  'border border-border-subtle',
                  'bg-surface-muted/80',
                  'px-2.5 py-1',
                  'text-[11px] font-medium',
                )}
              >
                <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
                Categories
              </Badge>

              <Badge
                variant="outline"
                className={cn(
                  'rounded-[5px]',
                  'border-border-subtle',
                  'bg-background/60',
                  'px-2.5 py-1',
                  'text-[11px] font-medium',
                )}
              >
                Blog taxonomy
              </Badge>

              <Badge
                variant="outline"
                className={cn(
                  'gap-1.5 rounded-[5px]',
                  'border-border-subtle',
                  'bg-background/60',
                  'px-2.5 py-1',
                  'text-[11px] font-medium',
                )}
              >
                <Sparkles
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                Product-first
              </Badge>
            </div>

            <div className="mx-auto max-w-4xl space-y-6">
              <h1
                className={cn(
                  'text-balance',
                  'font-brand',
                  'text-4xl font-semibold',
                  'tracking-[-0.05em]',
                  'text-foreground',
                  'sm:text-5xl',
                  'lg:text-[4.5rem]',
                  'lg:leading-[0.95]',
                )}
              >
                Explore blog categories
                <span className="block text-muted-foreground">
                  by product surface and technical domain.
                </span>
              </h1>

              <p
                className={cn(
                  'mx-auto max-w-3xl',
                  'text-balance',
                  'text-[16px] leading-8',
                  'text-muted-foreground',
                  'sm:text-lg',
                )}
              >
                Browse PyColors writing by topic to go deeper into
                SaaS architecture, product UX, implementation
                patterns, frontend systems, and production-ready
                engineering decisions.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className={cn('rounded-[5px]', focusRing)}
              >
                <Link href="/blog">
                  Back to Blog
                  <ArrowRight
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className={cn('rounded-[5px]', focusRing)}
              >
                <Link href="/guides">Browse Guides</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <Pill>SaaS Architecture</Pill>
              <Pill>Billing</Pill>
              <Pill>Next.js</Pill>
              <Pill>Design Systems</Pill>
              <Pill>Product Engineering</Pill>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl py-4">
          <SectionHeader
            title="All categories"
            description="Each category groups articles around the same implementation logic, product surface, or engineering concern."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const posts = getPostsByCategory(category);

              return (
                <Card
                  key={category}
                  className={cn(
                    'group relative flex h-full flex-col justify-between overflow-hidden rounded-[5px]',
                    'border border-border-subtle',
                    'bg-background/45',
                    'p-6 backdrop-blur-sm',
                    'transition-all duration-200',
                    'hover:border-border',
                    'hover:bg-background/65',
                  )}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />

                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        {category}
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="rounded-[5px]"
                      >
                        {posts.length} article
                        {posts.length > 1 ? 's' : ''}
                      </Badge>
                    </div>

                    <p className="text-sm leading-7 text-muted-foreground">
                      Explore articles related to{' '}
                      {category.toLowerCase()} and adjacent
                      implementation decisions across SaaS product
                      engineering.
                    </p>
                  </div>

                  <div className="mt-8">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={cn(
                        'w-full rounded-[5px]',
                        focusRing,
                      )}
                    >
                      <Link
                        href={`/blog/categories/${normalizeTaxonomy(category)}`}
                      >
                        View category
                        <ArrowRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </Container>
  );
}
