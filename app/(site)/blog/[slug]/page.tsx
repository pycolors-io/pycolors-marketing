import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Badge, Button, cn } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { JsonLd } from '@/components/seo/json-ld';

import { ArticleHeader } from '@/components/blog/article-header';
import { ArticleCTA } from '@/components/blog/article-cta';
import { ArticlePagination } from '@/components/blog/article-pagination';
import { RelatedPosts } from '@/components/blog/related-posts';
import { getBlogMDXComponents } from '@/components/blog/mdx-components';

import {
  getAdjacentPosts,
  getAllSlugs,
  getPostBySlug,
  getPostMetaBySlug,
  getRelatedPosts,
  normalizeTaxonomy,
} from '@/lib/blog/utils';
import {
  createArticleMetadata,
  generateArticleJsonLd,
} from '@/lib/seo/article';

type PageProps = {
  readonly params: Promise<{
    readonly slug: string;
  }>;
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostMetaBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return createArticleMetadata(post);
}

function SectionHeader({
  title,
  description,
  action,
}: {
  readonly title: string;
  readonly description?: string;
  readonly action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <h2 className="font-brand text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {title}
        </h2>

        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const page = getPostBySlug(slug);
  const post = getPostMetaBySlug(slug);

  if (!page || !post) {
    notFound();
  }

  const MDX = page.data.body;
  const relatedPosts = getRelatedPosts(slug, 3);
  const adjacentPosts = getAdjacentPosts(slug);
  const articleJsonLd = generateArticleJsonLd(post);

  return (
    <Container className="py-16 sm:py-20">
      <JsonLd id="article-jsonld" data={articleJsonLd} />

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
                label: post.category,
                href: `/blog/categories/${normalizeTaxonomy(post.category)}`,
              },
            ]}
          />
        </div>

        <div className="mb-14 sm:mb-20">
          <ArticleHeader
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
            readingTime={post.readingTime}
            tags={post.tags}
            shareUrl={`/blog/${post.slug}`}
          />
        </div>

        <main className="mx-auto max-w-4xl">
          <div className="mx-auto mb-12 max-w-[72ch] border-l border-border-subtle pl-5">
            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              <span className="font-medium text-foreground">
                Why it matters:
              </span>{' '}
              this article turns a real PyColors product decision into
              a reusable SaaS implementation pattern.
            </p>
          </div>

          <article
            className={cn(
              'relative mx-auto max-w-5xl overflow-hidden rounded-[5px]',
              'border border-border-subtle',
              'bg-background/45',
              'px-7 py-10 backdrop-blur-sm',
              'sm:px-12 sm:py-14',
              'lg:px-16',
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
            />

            <div className="blog-prose prose mx-auto max-w-[72ch] dark:prose-invert">
              <MDX components={getBlogMDXComponents()} />
            </div>
          </article>

          <div className="mx-auto mt-16 max-w-5xl">
            <ArticleCTA cta={post.cta} />
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <ArticlePagination
              previous={adjacentPosts.previous}
              next={adjacentPosts.next}
            />
          </div>
        </main>

        <section className="mx-auto max-w-5xl py-20">
          <SectionHeader
            title="Keep exploring"
            description="Related articles around the same technical and product surface."
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={cn('rounded-[5px]', focusRing)}
              >
                <Link href="/blog">
                  Back to blog
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            }
          />

          <RelatedPosts posts={relatedPosts} />
        </section>
        <section className="border-t border-border-subtle pt-12">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl space-y-4">
                <Badge
                  variant="outline"
                  className="gap-1.5 rounded-[5px] border-pro-border-subtle bg-background/40"
                >
                  <Sparkles
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  Next step
                </Badge>

                <h2 className="font-brand text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Build the product surface first. Upgrade when wiring
                  becomes the bottleneck.
                </h2>

                <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
                  Use the blog for product engineering insight,
                  Starter Free for validation, and Starter Pro when
                  real auth, billing, and protected architecture
                  should already be handled.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-60">
                <Button
                  asChild
                  className={cn('h-10 rounded-[5px]', focusRing)}
                >
                  <Link href="/starters/free">
                    Explore Starter Free
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className={cn('h-10 rounded-[5px]', focusRing)}
                >
                  <Link href="/starters/pro">View Starter Pro</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
