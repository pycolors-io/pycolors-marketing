import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import {
  getAllCategories,
  getPostsByCategory,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

export const metadata: Metadata = {
  title: 'Blog Categories',
  description:
    'Browse PyColors blog categories across SaaS architecture, product UX, Next.js, billing, design systems, and implementation patterns.',
  alternates: {
    canonical: '/blog/categories',
  },
  openGraph: {
    title: 'Blog Categories · PyColors',
    description:
      'Browse PyColors blog categories across SaaS architecture, product UX, Next.js, billing, design systems, and implementation patterns.',
    url: '/blog/categories',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Categories · PyColors',
    description:
      'Browse PyColors blog categories across SaaS architecture, product UX, Next.js, billing, design systems, and implementation patterns.',
    images: ['/seo/twitter-main.png'],
  },
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/30 px-2.5 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 space-y-1 sm:mb-6">
      <h2 className="font-brand text-lg font-semibold tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export default function BlogCategoriesPage() {
  const categories = getAllCategories();

  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Categories', href: '/blog/categories' },
            ]}
          />
        </div>

        <header className="mb-14 flex flex-col items-center gap-6 text-center sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
              Categories
            </Badge>
            <Badge variant="outline">Blog taxonomy</Badge>
            <Badge variant="outline" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Product-first
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Explore blog categories
              <span className="block font-bold">
                by product surface and technical domain.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Browse PyColors writing by topic to go deeper into SaaS
              architecture, product UX, implementation patterns, and
              technical decisions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/blog">
                Back to Blog
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/guides">Browse Guides</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Pill>SaaS Architecture</Pill>
            <Pill>Billing</Pill>
            <Pill>Next.js</Pill>
            <Pill>Design Systems</Pill>
          </div>
        </header>

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="All categories"
            description="Each category groups articles around the same product logic or implementation domain."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const posts = getPostsByCategory(category);

              return (
                <Card
                  key={category}
                  className="flex h-full flex-col justify-between p-6"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{category}</Badge>
                      <Badge variant="secondary">
                        {posts.length} article
                        {posts.length > 1 ? 's' : ''}
                      </Badge>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Explore articles related to{' '}
                      {category.toLowerCase()} and adjacent
                      implementation decisions.
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      <Link
                        href={`/blog/categories/${normalizeTaxonomy(category)}`}
                      >
                        View category
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
