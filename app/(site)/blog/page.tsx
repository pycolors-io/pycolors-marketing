import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";

import { Button } from "@pycolors/ui";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import {
  BlogArticleRow,
  BlogFeaturedArticle,
} from "@/components/blog/blog-index-article";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { PageHero } from "@/components/marketing/page-hero";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  getFeaturedPosts,
} from "@/lib/blog/utils";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import styles from "@/components/blog/blog-index.module.css";

const textLink =
  "inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export const metadata: Metadata = {
  title: "Next.js SaaS Engineering Blog",
  description:
    "Technical articles about Next.js SaaS architecture, authentication, billing systems, UI engineering, design systems, product UX, and production-ready implementation decisions.",
  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title: "Next.js SaaS Engineering Blog",
    description:
      "Technical writing from PyColors about SaaS architecture, UI systems, billing flows, product UX, and production-ready Next.js engineering.",
    url: "/blog",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Engineering Blog",
    description:
      "Technical articles about SaaS architecture, UI systems, billing, product UX, and modern Next.js engineering.",
    images: ["/seo/twitter-main.png"],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPosts = getFeaturedPosts(3);
  const [leadPost, ...supportingPosts] = featuredPosts;
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <main
      id="content"
      tabIndex={-1}
      className={`${styles.page} bg-background text-foreground`}
    >
      <Container className="pb-16 pt-24 sm:pt-28">
        <div
          className={`${styles.intro} grid items-end gap-8 pb-12 sm:gap-10 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16`}
        >
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0 max-w-3xl"
            badges={[{ label: "Blog", variant: "outline" }]}
            title="Technical articles for developers"
            description="Architecture decisions, implementation notes and lessons from building PyColors. Practical reading for your next SaaS product."
            actions={
              <>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-11 rounded-md px-5"
                >
                  <Link
                    href={leadPost ? "#featured-articles" : "#latest-articles"}
                  >
                    Browse articles{" "}
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Link
                  href="/guides"
                  className={`${textLink} justify-center sm:px-2`}
                >
                  Explore guides{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </>
            }
          />
          <aside
            aria-label="About the blog"
            className={`${styles.introNote} lg:mb-1`}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              From the workbench
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The decisions behind the code, from interface details to
              production systems.
            </p>
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-6 text-muted-foreground">
              <span>
                {posts.length} {posts.length === 1 ? "article" : "articles"}
              </span>
              <span aria-hidden="true">/</span>
              <span>
                {categories.length}{" "}
                {categories.length === 1 ? "topic" : "topics"}
              </span>
            </p>
          </aside>
        </div>

        {leadPost ? (
          <MarketingSectionShell
            id="featured-articles"
            width="full"
            spacing="compact"
            className="scroll-mt-24 border-t border-border-subtle"
            aria-labelledby="featured-title"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 sm:mb-8">
              <h2
                id="featured-title"
                className="font-brand text-[28px] font-semibold leading-[1.2] tracking-heading sm:text-[32px] lg:text-4xl"
              >
                Featured articles
              </h2>
              <Link
                href="#latest-articles"
                className={`${textLink} text-muted-foreground`}
              >
                View all articles{" "}
                <ArrowDown className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div
              className={`grid gap-5 sm:gap-6 ${supportingPosts.length > 0 ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}
            >
              <BlogFeaturedArticle post={leadPost} lead />
              {supportingPosts.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-1">
                  {supportingPosts.map((post) => (
                    <BlogFeaturedArticle key={post.slug} post={post} />
                  ))}
                </div>
              ) : null}
            </div>
          </MarketingSectionShell>
        ) : null}

        <MarketingSectionShell
          id="latest-articles"
          width="full"
          className="scroll-mt-24"
          aria-labelledby="latest-title"
        >
          <MarketingSectionHeader
            titleId="latest-title"
            align="left"
            title="Latest articles"
            description="Explore the complete archive, or follow a topic that matters to your product."
          />
          <div className="grid items-start gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
            <BlogSidebar categories={categories} tags={tags} posts={posts} />
            <div className="min-w-0 border-y border-border-subtle">
              <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-3 py-4 text-xs text-muted-foreground sm:px-5">
                <span>
                  All articles{" "}
                  <span className="ml-2 font-mono">
                    {String(posts.length).padStart(2, "0")}
                  </span>
                </span>
                <span>Newest first</span>
              </div>
              {posts.length > 0 ? (
                <div className="divide-y divide-border-subtle">
                  {posts.map((post) => (
                    <BlogArticleRow key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="px-5 py-12">
                  <BookOpen
                    className="mb-4 size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground">
                    No articles found yet.
                  </p>
                  <Link href="/guides" className={`${textLink} mt-3`}>
                    Read the guides{" "}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          width="full"
          className="border-t border-border-subtle"
          aria-labelledby="blog-next-title"
        >
          <MarketingSectionHeader
            titleId="blog-next-title"
            align="left"
            title="Build on what you learn."
            description="Explore the interface first, or start with connected SaaS foundations."
            action={
              <Link href="/pricing" className={textLink}>
                Compare the options{" "}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            }
          />
          <div
            className={`${styles.nextSteps} grid rounded-lg border border-border-subtle md:grid-cols-2`}
          >
            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-brand text-lg font-semibold tracking-normal">
                  Starter Free
                </h3>
                <span className="text-xs text-muted-foreground">Free</span>
              </div>
              <p className="mb-6 mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                Explore the dashboard, settings and product UI. Authentication
                and billing screens use mocked data.
              </p>
              <div className="mt-auto">
                <Button
                  asChild
                  variant="outline"
                  className="min-h-11 rounded-md px-5"
                >
                  <Link href="/starters/free">
                    Explore Starter Free{" "}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col border-t border-border-subtle p-6 sm:p-8 md:border-l md:border-t-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-brand text-lg font-semibold tracking-normal">
                  Starter Pro
                </h3>
                <span className="text-xs text-muted-foreground">
                  One-time purchase
                </span>
              </div>
              <p className="mb-6 mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                Build from the connected foundation: Auth.js, Prisma and Stripe,
                with setup guides for your own services.
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                <BuyStarterProButton
                  fullWidth={false}
                  label={`Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`}
                />
                <Link
                  href="/starters/pro"
                  className={`${textLink} text-muted-foreground`}
                >
                  See what’s included{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}
