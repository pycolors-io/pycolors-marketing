import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Hash, Sparkles } from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';

import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';

import {
  getAllTags,
  getPostsByTag,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

export const metadata: Metadata = {
  title: 'Next.js SaaS Engineering Topics',
  description:
    'Explore technical topics across Next.js SaaS architecture, authentication, billing systems, UI engineering, product UX, developer experience, and production-ready implementation patterns.',
  alternates: {
    canonical: '/blog/tags',
  },

  openGraph: {
    title: 'Next.js SaaS Engineering Topics',
    description:
      'Browse technical topics covering SaaS architecture, billing, UI systems, developer experience, and modern Next.js engineering.',
    url: '/blog/tags',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Engineering Topics',
    description:
      'Technical topics across SaaS architecture, UI systems, billing, and modern Next.js engineering.',
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

export default function BlogTagsPage() {
  const tags = getAllTags();

  return (
    <Container className="py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        />

        <div className="mb-10">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Tags', href: '/blog/tags' },
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
                <Hash className="h-3.5 w-3.5" aria-hidden="true" />
                Tags
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
                Topic navigation
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
                Developer knowledge
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
                Explore blog topics
                <span className="block text-muted-foreground">
                  across SaaS, engineering, and product design.
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
                Tags help you explore specific technical ideas across
                multiple articles — from Next.js architecture and SaaS
                billing to UI systems, developer experience, and
                product strategy.
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
                    className="ml-2 h-4 w-4"
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

              <Button
                asChild
                variant="outline"
                className={cn('rounded-[5px]', focusRing)}
              >
                <Link href="/starters/free">Starter Free</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <Pill>SaaS</Pill>
              <Pill>Next.js</Pill>
              <Pill>Product UX</Pill>
              <Pill>Design Systems</Pill>
              <Pill>Architecture</Pill>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl py-6 sm:py-8">
          <SectionHeader
            title="All tags"
            description="Each tag groups articles connected to the same implementation topic, product concern, or engineering pattern."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => {
              const posts = getPostsByTag(tag);

              return (
                <Card
                  key={tag}
                  className={cn(
                    'group flex h-full flex-col justify-between',
                    'rounded-[5px]',
                    'border border-border-subtle',
                    'bg-background/45',
                    'p-6 backdrop-blur-sm',
                    'transition-all duration-200',

                    // subtle premium tint
                    'hover:border-primary/20',
                    'hover:bg-[color-mix(in_oklch,var(--primary),var(--background)_96%)]',
                  )}
                >
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          'rounded-[5px]',
                          'border-primary/15',
                          'bg-[color-mix(in_oklch,var(--primary),transparent_96%)]',
                          'text-foreground',
                        )}
                      >
                        #{tag}
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="rounded-[5px]"
                      >
                        {posts.length} article
                        {posts.length > 1 ? 's' : ''}
                      </Badge>
                    </div>

                    <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
                      Articles connected to the {tag} topic and
                      adjacent implementation decisions across SaaS,
                      frontend architecture, and product engineering.
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
                        href={`/blog/tags/${normalizeTaxonomy(tag)}`}
                      >
                        View tag
                        <ArrowRight
                          className="ml-2 h-4 w-4"
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
