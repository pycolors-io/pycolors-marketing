import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Layers3, Sparkles } from "lucide-react";

import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
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
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";

const metadata: Metadata = {
  title: "Next.js SaaS Engineering Categories",
  description:
    "Browse engineering categories across Next.js SaaS architecture, billing systems, authentication, UI engineering, product UX, design systems, and production-ready implementation patterns.",
  alternates: {
    canonical: "/blog/categories",
  },

  openGraph: {
    title: "Next.js SaaS Engineering Categories",
    description:
      "Explore engineering categories covering SaaS architecture, UI systems, billing flows, developer experience, and production-ready Next.js implementation patterns.",
    url: "/blog/categories",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Engineering Categories",
    description:
      "Engineering categories across SaaS architecture, UI systems, billing, product UX, and modern Next.js development.",
    images: ["/seo/twitter-main.png"],
  },
};

export default function BlogCategoriesPage() {
  const tSite = useCopy();

  const categories = getAllCategories(tSite.locale);

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
                { label: "Categories", href: "/blog/categories" },
              ]}
            />
          </div>

          <PageHero
            variant="compact"
            maxWidth="5xl"
            className="mb-10"
            badges={[
              {
                label: tSite("Categories"),
                variant: "secondary",
                icon: <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: tSite("Blog taxonomy"), variant: "outline" },
              {
                label: tSite("Product-first"),
                variant: "outline",
                icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />,
              },
            ]}
            title={tSite("Explore blog categories")}
            subtitle={tSite("by product surface and technical domain.")}
            description={tSite(
              "Browse PyColors writing by topic to go deeper into SaaS architecture, product UX, implementation patterns, frontend systems, and production-ready engineering decisions.",
            )}
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
              </MarketingActionGroup>
            }
            extra={
              <MarketingPillList align="center">
                <MarketingPill>{tSite("SaaS Architecture")}</MarketingPill>
                <MarketingPill>{tSite("Billing")}</MarketingPill>
                <MarketingPill>{tSite("Next.js")}</MarketingPill>
                <MarketingPill>{tSite("Design Systems")}</MarketingPill>
                <MarketingPill>{tSite("Product Engineering")}</MarketingPill>
              </MarketingPillList>
            }
          />

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="categories-heading"
          >
            <MarketingSectionHeader
              align="left"
              titleId="categories-heading"
              title={tSite("All categories")}
              description={tSite(
                "Each category groups articles around the same implementation logic, product surface, or engineering concern.",
              )}
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const posts = getPostsByCategory(category, tSite.locale);

                return (
                  <MarketingFeatureCard
                    key={category}
                    title={tSite(category)}
                    meta={
                      <MarketingPillList>
                        <MarketingPill>
                          {tSite(posts.length)} {tSite(" article")}
                          {tSite(posts.length > 1 ? "s" : "")}
                        </MarketingPill>
                      </MarketingPillList>
                    }
                    description={
                      <>
                        {tSite("Explore articles related to ")}
                        {tSite(category).toLocaleLowerCase(tSite.locale)}{" "}
                        {tSite(
                          " and adjacent implementation decisions across SaaS product engineering.",
                        )}
                      </>
                    }
                    action={
                      <MarketingLinkButton variant="outline" className="w-full">
                        <Link
                          href={`/blog/categories/${normalizeTaxonomy(category)}`}
                        >
                          {tSite("View category")}
                        </Link>
                      </MarketingLinkButton>
                    }
                  />
                );
              })}
            </div>
          </MarketingSectionShell>
        </div>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/blog/categories", locale);
}
