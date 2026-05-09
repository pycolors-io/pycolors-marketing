import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';

import { Badge, Button, Card, EmptyState, cn } from '@pycolors/ui';

import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { BlogList } from '@/components/blog/blog-list';

import {
  getAllCategories,
  getPostsByCategory,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

type PageProps = {
  readonly params: Promise<{
    readonly category: string;
  }>;
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: normalizeTaxonomy(category),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categories = getAllCategories();

  const matchedCategory = categories.find(
    (item) => normalizeTaxonomy(item) === category,
  );

  if (!matchedCategory) {
    return {
      title: 'Category not found',
    };
  }

  return {
    title: `${matchedCategory} Blog Articles`,
    description: `Technical articles from PyColors about ${matchedCategory.toLowerCase()} and related SaaS implementation decisions.`,
    alternates: {
      canonical: `/blog/categories/${category}`,
    },
    openGraph: {
      title: `${matchedCategory} · Blog · PyColors`,
      description: `Technical articles from PyColors about ${matchedCategory.toLowerCase()} and related SaaS implementation decisions.`,
      url: `/blog/categories/${category}`,
      images: ['/seo/og-main.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${matchedCategory} · Blog · PyColors`,
      description: `Technical articles from PyColors about ${matchedCategory.toLowerCase()} and related SaaS implementation decisions.`,
      images: ['/seo/twitter-main.png'],
    },
  };
}

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
  action,
}: Readonly<{
  title: string;
  description?: string;
  action?: React.ReactNode;
}>) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <h2 className="font-brand text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export default async function BlogCategoryPage({
  params,
}: PageProps) {
  const { category } = await params;

  const categories = getAllCategories();

  const matchedCategory = categories.find(
    (item) => normalizeTaxonomy(item) === category,
  );

  if (!matchedCategory) {
    notFound();
  }

  const posts = getPostsByCategory(matchedCategory);

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
              {
                label: matchedCategory,
                href: `/blog/categories/${category}`,
              },
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
                Category
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
                {matchedCategory}
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
                Technical writing
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
                {matchedCategory}
                <span className="block text-muted-foreground">
                  blog articles.
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
                Focused technical articles connected to{' '}
                {matchedCategory.toLowerCase()}, product structure,
                implementation tradeoffs, and production-ready SaaS
                engineering decisions inside PyColors.
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
              <Pill>{matchedCategory}</Pill>
              <Pill>SaaS</Pill>
              <Pill>Architecture</Pill>
              <Pill>Implementation</Pill>
              <Pill>Product Engineering</Pill>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl pb-10">
          <Card
            className={cn(
              'rounded-[5px]',
              'border border-border-subtle',
              'bg-background/45',
              'p-6 backdrop-blur-sm',
              'sm:p-8',
            )}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-[5px]">
                    Why this category matters
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                  This category groups articles around the same
                  product surface, engineering concern, or
                  implementation domain so readers can explore a topic
                  with stronger continuity and less noise.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn('rounded-[5px]', focusRing)}
                >
                  <Link href="/guides">View Guides</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn('rounded-[5px]', focusRing)}
                >
                  <Link href="/upgrade">Explore PRO</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="mx-auto max-w-5xl py-6 sm:py-8">
          <SectionHeader
            title="Articles in this category"
            description="A focused set of articles around the same technical and product domain."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={cn('rounded-[5px]', focusRing)}
              >
                <Link href="/blog">All articles</Link>
              </Button>
            }
          />

          {posts.length > 0 ? (
            <BlogList posts={posts} />
          ) : (
            <div className="rounded-[5px] border border-border-subtle bg-background/45 p-10 backdrop-blur-sm">
              <EmptyState
                title="No posts yet"
                description="This category exists, but no article is published yet."
              />
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
