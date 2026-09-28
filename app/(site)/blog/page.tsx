import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import { Badge } from "@pycolors/ui";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { BlogList } from "@/components/blog/blog-list";
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
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";

const starterProPriceLabel = PRODUCT_DISPLAY["starter-pro"].priceLabel;

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
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <main id="content" tabIndex={-1}>
      <Container className="pb-16 pt-24">
        <div className="mx-auto max-w-6xl">
          <PageHero
            variant="compact"
            align="left"
            maxWidth="5xl"
            contentClassName="mx-0"
            badges={[
              {
                label: "Blog",
                variant: "secondary",
                icon: <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: "Technical writing", variant: "outline" },
              {
                label: "Product-first",
                variant: "outline",
                icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />,
              },
            ]}
            title="Technical articles for developers"
            description="building real SaaS products with better structure."
            actions={
              <MarketingLinkButton variant="outline">
                <Link
                  href={
                    featuredPosts.length > 0
                      ? "#featured-articles"
                      : "#latest-articles"
                  }
                >
                  Browse articles
                </Link>
              </MarketingLinkButton>
            }
          />

          {featuredPosts.length > 0 ? (
            <MarketingSectionShell
              id="featured-articles"
              aria-labelledby="featured-title"
              spacing="compact"
              className="scroll-mt-20"
            >
              <MarketingSectionHeader
                titleId="featured-title"
                align="left"
                title="Featured articles"
                description="Start with the highest-signal articles connected to real product and engineering decisions."
                action={
                  <MarketingLinkButton variant="outline">
                    <Link href="/starters">Explore Starters</Link>
                  </MarketingLinkButton>
                }
              />
              <BlogList posts={featuredPosts} />
            </MarketingSectionShell>
          ) : null}

          <MarketingSectionShell
            id="latest-articles"
            aria-labelledby="latest-title"
            spacing="compact"
            className="scroll-mt-20"
          >
            <MarketingSectionHeader
              titleId="latest-title"
              align="left"
              title="Latest articles"
              description="Focused content for the product surfaces and implementation decisions that matter most."
              action={
                <MarketingLinkButton variant="outline">
                  <Link href="/docs/starter">Starter docs</Link>
                </MarketingLinkButton>
              }
            />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
              <BlogList posts={posts} />
              <BlogSidebar categories={categories} tags={tags} />
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell aria-labelledby="why-blog-title">
            <MarketingSectionHeader
              titleId="why-blog-title"
              align="left"
              eyebrow="Why this blog exists"
              title="Real implementation work turned into durable technical content."
            />
            <div className="max-w-3xl space-y-6">
              <p className="text-sm leading-7 text-muted-foreground">
                The PyColors blog turns real product work into useful technical
                content: SaaS architecture, Next.js decisions, design systems,
                billing, product surfaces, and production-ready implementation
                tradeoffs.
              </p>
              <MarketingPillList>
                {[
                  "Next.js",
                  "SaaS Architecture",
                  "Billing",
                  "Design Systems",
                  "Product UX",
                ].map((label) => (
                  <MarketingPill key={label}>{label}</MarketingPill>
                ))}
              </MarketingPillList>
              <p className="text-sm leading-7 text-muted-foreground">
                This blog is not built for generic tutorials. It documents
                concrete decisions around SaaS architecture, product surfaces,
                UI systems, business wiring, and production-ready tradeoffs
                while building the PyColors ecosystem.
              </p>
              <MarketingPillList>
                {[
                  "Product engineering",
                  "Architecture notes",
                  "Conversion lessons",
                  "Docs-first thinking",
                ].map((label) => (
                  <MarketingPill key={label}>{label}</MarketingPill>
                ))}
              </MarketingPillList>
              <MarketingActionGroup>
                <MarketingLinkButton variant="outline">
                  <Link href="/guides">View Guides</Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/ui/patterns">Browse Patterns</Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/upgrade">Explore Upgrade</Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell aria-labelledby="blog-path-title">
            <MarketingSectionHeader
              titleId="blog-path-title"
              align="left"
              title="How the blog fits the PyColors path"
              description="The blog builds authority, clarifies the product logic, and naturally bridges education to implementation."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              <MarketingFeatureCard
                meta="Step 01"
                title="Learn from real decisions"
                description="Use articles to understand how strong SaaS products are structured across auth, billing, UI systems, settings, and dashboard surfaces."
              />
              <MarketingFeatureCard
                meta="Step 02"
                title="Move from concept to pattern"
                description="Connect the article logic to examples, guides, and reusable UI patterns built around the same product surfaces."
              />
              <MarketingFeatureCard
                meta="Step 03"
                title="Build faster with PyColors"
                description="Start with Starter Free, then move to Starter Pro when architecture, authentication, billing, and business wiring become the bottleneck."
              />
            </div>
            <MarketingActionGroup className="mt-6">
              <MarketingLinkButton>
                <Link href="/starters/free">
                  Start with Starter Free
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </MarketingLinkButton>
              <MarketingLinkButton variant="outline">
                <Link href="/guides">Browse Guides</Link>
              </MarketingLinkButton>
              <BuyStarterProButton
                fullWidth={false}
                label={`Buy Starter Pro — ${starterProPriceLabel}`}
              />
            </MarketingActionGroup>
          </MarketingSectionShell>

          <MarketingSectionShell
            aria-labelledby="blog-next-title"
            spacing="compact"
          >
            <Badge variant="outline" className="mb-4 rounded-[5px]">
              Next step
            </Badge>
            <MarketingCtaPanel
              titleId="blog-next-title"
              title="Turn reading into implementation leverage."
              description="Use the blog to understand the reasoning, then use PyColors to ship the product surface faster."
              actions={
                <div className="space-y-6">
                  <MarketingPillList>
                    {[
                      "Read the logic",
                      "Validate with Free",
                      "Upgrade when ready",
                    ].map((label) => (
                      <MarketingPill key={label}>{label}</MarketingPill>
                    ))}
                  </MarketingPillList>
                  <MarketingActionGroup className="sm:max-w-60 sm:flex-col sm:items-stretch">
                    <MarketingLinkButton variant="outline">
                      <Link href="/starters/free">Starter Free</Link>
                    </MarketingLinkButton>
                    <BuyStarterProButton />
                  </MarketingActionGroup>
                </div>
              }
            />
          </MarketingSectionShell>
        </div>
      </Container>
    </main>
  );
}
