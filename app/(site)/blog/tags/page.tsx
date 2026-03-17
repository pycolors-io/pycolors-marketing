import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Hash, Sparkles } from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';

import {
  getAllTags,
  getPostsByTag,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

export const metadata: Metadata = {
  title: 'Blog Tags',
  description:
    'Browse PyColors blog articles by tags including SaaS architecture, Next.js, product UX, billing, and design systems.',
  alternates: {
    canonical: '/blog/tags',
  },
  openGraph: {
    title: 'Blog Tags · PyColors',
    description:
      'Browse PyColors blog articles by tags including SaaS architecture, Next.js, product UX, billing, and design systems.',
    url: '/blog/tags',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Tags · PyColors',
    description:
      'Browse PyColors blog articles by tags including SaaS architecture, Next.js, product UX, billing, and design systems.',
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

export default function BlogTagsPage() {
  const tags = getAllTags();

  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Tags', href: '/blog/tags' },
            ]}
          />
        </div>

        {/* HERO */}

        <header className="mb-14 flex flex-col items-center gap-6 text-center sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <Hash className="h-3.5 w-3.5" aria-hidden="true" />
              Tags
            </Badge>

            <Badge variant="outline">Topic navigation</Badge>

            <Badge variant="outline" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Developer knowledge
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Explore blog topics
              <span className="block font-bold">
                across SaaS, engineering, and product design.
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Tags help you explore specific technical ideas across
              multiple articles — from Next.js architecture and SaaS
              billing to UI systems and product strategy.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/blog">
                Back to Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/guides">Browse Guides</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/starters/free">Starter Free</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <Pill>SaaS</Pill>
            <Pill>Next.js</Pill>
            <Pill>Product UX</Pill>
            <Pill>Design Systems</Pill>
          </div>
        </header>

        {/* TAG GRID */}

        <section className="py-10 sm:py-12">
          <SectionHeader
            title="All tags"
            description="Each tag groups articles referencing the same implementation topic."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => {
              const posts = getPostsByTag(tag);

              return (
                <Card
                  key={tag}
                  className="flex h-full flex-col justify-between p-6"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">#{tag}</Badge>

                      <Badge variant="secondary">
                        {posts.length} article
                        {posts.length > 1 ? 's' : ''}
                      </Badge>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Articles connected to the {tag} topic and
                      related implementation patterns.
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
