import { localizePageMetadata } from "@/lib/i18n/metadata";
import { getCopy } from "@/lib/i18n/server-copy";
import { Link } from "@/lib/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Layers3, Sparkles } from "lucide-react";

import { EmptyState } from "@pycolors/ui";

import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { BlogList } from "@/components/blog/blog-list";

import {
  getAllCategories,
  getPostsByCategory,
  normalizeTaxonomy,
} from "@/lib/blog/utils";

import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";

type PageProps = {
  readonly params: Promise<{
    readonly category: string;
    readonly locale: "en" | "fr";
  }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({
    category: normalizeTaxonomy(category),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, locale } = await params;
  const categories = getAllCategories(locale);

  const matchedCategory = categories.find(
    (item) => normalizeTaxonomy(item) === category,
  );

  if (!matchedCategory) {
    return {
      title: "Category not found",
    };
  }

  const metadata: Metadata = {
    title: `${matchedCategory} Blog Articles`,
    description: `Technical articles from PyColors about ${matchedCategory.toLowerCase()} and related SaaS implementation decisions.`,
    alternates: {
      canonical: `/blog/categories/${category}`,
    },
    openGraph: {
      title: `${matchedCategory} · Blog · PyColors`,
      description: `Technical articles from PyColors about ${matchedCategory.toLowerCase()} and related SaaS implementation decisions.`,
      url: `/blog/categories/${category}`,
      images: ["/seo/og-main.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${matchedCategory} · Blog · PyColors`,
      description: `Technical articles from PyColors about ${matchedCategory.toLowerCase()} and related SaaS implementation decisions.`,
      images: ["/seo/twitter-main.png"],
    },
  };
  if (locale === "fr") {
    const t = await getCopy(locale);
    const name = t(matchedCategory);
    metadata.title = `Articles : ${name}`;
    metadata.description = `Articles techniques PyColors sur ${name}, l’architecture et la réalisation de produits SaaS.`;
    metadata.openGraph = {
      ...metadata.openGraph,
      title: metadata.title,
      description: metadata.description,
    };
    metadata.twitter = {
      ...metadata.twitter,
      title: metadata.title,
      description: metadata.description,
    };
  }
  return localizePageMetadata(metadata, `/blog/categories/${category}`, locale);
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const tSite = await getCopy();

  const { category, locale } = await params;

  const categories = getAllCategories(locale);

  const matchedCategory = categories.find(
    (item) => normalizeTaxonomy(item) === category,
  );

  if (!matchedCategory) {
    notFound();
  }

  const posts = getPostsByCategory(matchedCategory, locale);

  return (
    <main id="content" tabIndex={-1}>
      <Container className="py-16 sm:py-20">
        <div className="relative min-w-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary),transparent_95%),transparent_60%)]"
          />

          <div className="mb-10">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                {
                  label: matchedCategory,
                  href: `/blog/categories/${category}`,
                },
              ]}
            />
          </div>

          <PageHero
            variant="compact"
            maxWidth="5xl"
            className="mb-10"
            badges={[
              {
                label: tSite("Category"),
                variant: "secondary",
                icon: <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: tSite(matchedCategory), variant: "outline" },
              {
                label: tSite("Technical writing"),
                variant: "outline",
                icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />,
              },
            ]}
            title={tSite(matchedCategory)}
            subtitle={tSite("blog articles.")}
            description={
              tSite("Focused technical articles connected to") +
              tSite(" ") +
              tSite(matchedCategory).toLocaleLowerCase(tSite.locale) +
              tSite(
                ", product structure, implementation tradeoffs, and production-ready SaaS engineering decisions inside PyColors.",
              )
            }
            actions={
              <MarketingActionGroup align="center">
                <MarketingLinkButton>
                  <Link href="/blog">
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    {tSite("Back to Blog")}
                  </Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/guides">{tSite("Browse Guides")}</Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/starters/free">{tSite("Starter Free")}</Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
            }
            extra={
              <MarketingPillList align="center">
                <MarketingPill>{tSite(matchedCategory)}</MarketingPill>
                <MarketingPill>{tSite("SaaS")}</MarketingPill>
                <MarketingPill>{tSite("Architecture")}</MarketingPill>
                <MarketingPill>{tSite("Implementation")}</MarketingPill>
                <MarketingPill>{tSite("Product Engineering")}</MarketingPill>
              </MarketingPillList>
            }
          />

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="category-context-heading"
          >
            <MarketingCtaPanel
              titleId="category-context-heading"
              title={tSite("Why this category matters")}
              description={tSite(
                "This category groups articles around the same product surface, engineering concern, or implementation domain so readers can explore a topic with stronger continuity and less noise.",
              )}
              actions={
                <MarketingActionGroup>
                  <MarketingLinkButton variant="outline">
                    <Link href="/guides">{tSite("View Guides")}</Link>
                  </MarketingLinkButton>
                  <MarketingLinkButton variant="outline">
                    <Link href="/upgrade">{tSite("Explore PRO")}</Link>
                  </MarketingLinkButton>
                </MarketingActionGroup>
              }
            />
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="category-articles-heading"
          >
            <MarketingSectionHeader
              align="left"
              titleId="category-articles-heading"
              title={tSite("Articles in this category")}
              description={tSite(
                "A focused set of articles around the same technical and product domain.",
              )}
              action={
                <MarketingLinkButton variant="outline">
                  <Link href="/blog">{tSite("All articles")}</Link>
                </MarketingLinkButton>
              }
            />

            {posts.length > 0 ? (
              <BlogList posts={posts} />
            ) : (
              <div className="rounded-[5px] border border-border-subtle bg-background/45 p-10 backdrop-blur-sm">
                <EmptyState
                  title={tSite("No posts yet")}
                  description={tSite(
                    "This category exists, but no article is published yet.",
                  )}
                />
              </div>
            )}
          </MarketingSectionShell>
        </div>
      </Container>
    </main>
  );
}
