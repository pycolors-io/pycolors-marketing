import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Hash, Sparkles } from "lucide-react";

import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";

import { getAllTags, getPostsByTag, normalizeTaxonomy } from "@/lib/blog/utils";

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
  title: "Next.js SaaS Engineering Topics",
  description:
    "Explore technical topics across Next.js SaaS architecture, authentication, billing systems, UI engineering, product UX, developer experience, and production-ready implementation patterns.",
  alternates: {
    canonical: "/blog/tags",
  },

  openGraph: {
    title: "Next.js SaaS Engineering Topics",
    description:
      "Browse technical topics covering SaaS architecture, billing, UI systems, developer experience, and modern Next.js engineering.",
    url: "/blog/tags",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Engineering Topics",
    description:
      "Technical topics across SaaS architecture, UI systems, billing, and modern Next.js engineering.",
    images: ["/seo/twitter-main.png"],
  },
};

export default function BlogTagsPage() {
  const tSite = useCopy();

  const tags = getAllTags(tSite.locale);

  return (
    <main id="content" tabIndex={-1}>
      <Container className="py-16 sm:py-20">
        <div className="relative min-w-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          />

          <div className="mb-10">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: "Tags", href: "/blog/tags" },
              ]}
            />
          </div>

          <PageHero
            variant="compact"
            maxWidth="5xl"
            className="mb-10"
            badges={[
              {
                label: tSite("Tags"),
                variant: "secondary",
                icon: <Hash className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: tSite("Topic navigation"), variant: "outline" },
              {
                label: tSite("Developer knowledge"),
                variant: "outline",
                icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />,
              },
            ]}
            title={tSite("Explore blog topics")}
            subtitle={tSite("across SaaS, engineering, and product design.")}
            description={tSite(
              "Tags help you explore specific technical ideas across multiple articles — from Next.js architecture and SaaS billing to UI systems, developer experience, and product strategy.",
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
                <MarketingLinkButton variant="outline">
                  <Link href="/starters/free">{tSite("Starter Free")}</Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
            }
            extra={
              <MarketingPillList align="center">
                <MarketingPill>{tSite("SaaS")}</MarketingPill>
                <MarketingPill>{tSite("Next.js")}</MarketingPill>
                <MarketingPill>{tSite("Product UX")}</MarketingPill>
                <MarketingPill>{tSite("Design Systems")}</MarketingPill>
                <MarketingPill>{tSite("Architecture")}</MarketingPill>
              </MarketingPillList>
            }
          />

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="tags-heading"
          >
            <MarketingSectionHeader
              align="left"
              titleId="tags-heading"
              title={tSite("All tags")}
              description={tSite(
                "Each tag groups articles connected to the same implementation topic, product concern, or engineering pattern.",
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tags.map((tag) => {
                const posts = getPostsByTag(tag, tSite.locale);

                return (
                  <MarketingFeatureCard
                    key={tag}
                    title={<>#{tSite(tag)}</>}
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
                        {tSite("Articles connected to the ")}
                        {tSite(tag)}{" "}
                        {tSite(
                          " topic and adjacent implementation decisions across SaaS, frontend architecture, and product engineering.",
                        )}
                      </>
                    }
                    action={
                      <MarketingLinkButton variant="outline" className="w-full">
                        <Link href={`/blog/tags/${normalizeTaxonomy(tag)}`}>
                          {tSite("View tag")}
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
  return localizePageMetadata(metadata, "/blog/tags", locale);
}
