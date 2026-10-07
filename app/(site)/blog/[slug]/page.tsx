import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { ArticleHeader } from "@/components/blog/article-header";
import { ArticleCTA } from "@/components/blog/article-cta";
import { ArticlePagination } from "@/components/blog/article-pagination";
import { ArticleToc } from "@/components/blog/article-toc";
import { BlogFeaturedArticle } from "@/components/blog/blog-index-article";
import { getBlogMDXComponents } from "@/components/blog/mdx-components";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import {
  getAdjacentPosts,
  getAllSlugs,
  getPostBySlug,
  getPostMetaBySlug,
  getRelatedPosts,
} from "@/lib/blog/utils";
import {
  createArticleMetadata,
  generateArticleJsonLd,
} from "@/lib/seo/article";
import styles from "@/components/blog/blog-article.module.css";

type PageProps = { readonly params: Promise<{ readonly slug: string }> };
const textLink =
  "inline-flex min-h-11 items-center gap-2 rounded-[5px] text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

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
      title: "Post not found",
    };
  }

  return createArticleMetadata(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPostBySlug(slug);
  const post = getPostMetaBySlug(slug);
  if (!page || !post) notFound();

  const MDX = page.data.body;
  const relatedPosts = getRelatedPosts(slug, 3);
  const adjacentPosts = getAdjacentPosts(slug);
  const toc = page.data.toc.filter((item) => item.depth === 2);

  return (
    <main
      id="content"
      tabIndex={-1}
      className={`${styles.page} bg-background text-foreground`}
    >
      <Container className="pb-16 pt-24 sm:pt-28">
        <JsonLd id="article-jsonld" data={generateArticleJsonLd(post)} />
        <Breadcrumb
          className={`${styles.breadcrumb} mb-6`}
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: post.url },
          ]}
        />
        <ArticleHeader
          title={post.title}
          description={post.description}
          author={post.author}
          date={post.date}
          readingTime={post.readingTime}
          tags={post.tags}
          shareUrl={post.url}
          category={post.category}
        />
        <div
          className={`grid items-start gap-8 pt-8 sm:pt-10 ${toc.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 xl:gap-20" : "max-w-4xl"}`}
        >
          {toc.length > 0 ? (
            <aside
              aria-label="Article navigation"
              className="min-w-0 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1"
            >
              <ArticleToc items={toc} />
            </aside>
          ) : null}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <article
              aria-labelledby="article-title"
              className={`${styles.body} blog-prose prose dark:prose-invert`}
            >
              <MDX components={getBlogMDXComponents()} />
            </article>
            {post.cta ? (
              <div className="mt-12 sm:mt-16">
                <ArticleCTA cta={post.cta} />
              </div>
            ) : null}
            <div className="mt-10 border-t border-border-subtle pt-8">
              <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Continue reading
              </p>
              <ArticlePagination
                previous={adjacentPosts.previous}
                next={adjacentPosts.next}
              />
              <Link href="/blog" className={`${textLink} mt-4`}>
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Back to all articles
              </Link>
            </div>
          </div>
        </div>
        {relatedPosts.length > 0 ? (
          <MarketingSectionShell
            width="full"
            className="mt-14 border-t border-border-subtle sm:mt-16"
            aria-labelledby="related-articles-title"
          >
            <MarketingSectionHeader
              titleId="related-articles-title"
              align="left"
              title="More on this topic."
              description="Continue with related architecture decisions and implementation notes."
              action={
                <Link href="/guides" className={textLink}>
                  Explore practical guides
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              }
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogFeaturedArticle key={related.slug} post={related} />
              ))}
            </div>
          </MarketingSectionShell>
        ) : null}
      </Container>
    </main>
  );
}
