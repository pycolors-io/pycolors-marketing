import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { JsonLd } from '@/components/seo/json-ld';

import { ArticleHeader } from '@/components/blog/article-header';
import { ArticleCTA } from '@/components/blog/article-cta';
import { ArticlePagination } from '@/components/blog/article-pagination';
import { OnThisPage } from '@/components/blog/on-this-page';
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
  params: Promise<{
    slug: string;
  }>;
};

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
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="sm:self-start">{action}</div> : null}
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
    <Container className="py-20 sm:py-20 lg:py-24">
      <JsonLd id="article-jsonld" data={articleJsonLd} />

      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              {
                label: post.category,
                href: `/blog/categories/${normalizeTaxonomy(post.category)}`,
              },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
        </div>

        <header className="mb-10 flex flex-col items-center gap-6 text-center sm:mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-2">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Blog
            </Badge>
            <Badge variant="outline">{post.category}</Badge>
            <Badge variant="outline" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Technical article
            </Badge>
          </div>

          <ArticleHeader
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
            readingTime={post.readingTime}
            tags={post.tags}
            shareUrl={`/blog/${post.slug}`}
          />
        </header>

        <section className="py-4 sm:py-6">
          <Card className="p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">
                    Why this article matters
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  This article captures a concrete implementation
                  decision from building PyColors and turns it into a
                  reusable technical pattern for developers building
                  serious SaaS products.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button asChild size="sm" variant="outline">
                  <Link href="/guides">View Guides</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/starters/free">Starter Free</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_260px]">
          <article className="min-w-0 space-y-10">
            <Card className="p-6 sm:p-8">
              <div className="blog-prose prose max-w-none dark:prose-invert">
                <MDX components={getBlogMDXComponents()} />
              </div>
            </Card>

            <ArticleCTA cta={post.cta} />

            <ArticlePagination
              previous={adjacentPosts.previous}
              next={adjacentPosts.next}
            />
          </article>

          <div className="space-y-6">
            <OnThisPage
              items={
                (page.data.toc ?? []) as Array<{
                  title: ReactNode;
                  url: string;
                  depth: number;
                }>
              }
            />
          </div>
        </div>

        <section className="py-12 sm:py-14">
          <SectionHeader
            title="Keep exploring"
            description="Related articles around the same technical and product surface."
            action={
              <Button asChild size="sm" variant="outline">
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
      </div>
    </Container>
  );
}
