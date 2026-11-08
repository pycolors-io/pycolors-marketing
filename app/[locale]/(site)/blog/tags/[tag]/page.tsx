import { localizePageMetadata } from "@/lib/i18n/metadata";
import { getCopy } from "@/lib/i18n/server-copy";
import { Link } from "@/lib/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Hash, Sparkles } from "lucide-react";

import { EmptyState } from "@pycolors/ui";

import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { BlogList } from "@/components/blog/blog-list";

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
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";

type PageProps = {
  readonly params: Promise<{
    readonly tag: string;
    readonly locale: "en" | "fr";
  }>;
};

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: normalizeTaxonomy(tag),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag, locale } = await params;
  const tags = getAllTags(locale);

  const matchedTag = tags.find((item) => normalizeTaxonomy(item) === tag);

  if (!matchedTag) {
    return {
      title: "Tag not found",
    };
  }

  const metadata: Metadata = {
    title: `${matchedTag} Articles`,
    description: `Technical articles from PyColors tagged with ${matchedTag}.`,
    alternates: {
      canonical: `/blog/tags/${tag}`,
    },
    openGraph: {
      title: `${matchedTag} · Blog · PyColors`,
      description: `Technical articles from PyColors tagged with ${matchedTag}.`,
      url: `/blog/tags/${tag}`,
      images: ["/seo/og-main.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${matchedTag} · Blog · PyColors`,
      description: `Technical articles from PyColors tagged with ${matchedTag}.`,
      images: ["/seo/twitter-main.png"],
    },
  };
  if (locale === "fr") {
    const t = await getCopy(locale);
    const name = t(matchedTag);
    metadata.title = `Articles sur ${name}`;
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
  return localizePageMetadata(metadata, `/blog/tags/${tag}`, locale);
}

export default async function BlogTagPage({ params }: PageProps) {
  const tSite = await getCopy();

  const { tag, locale } = await params;

  const tags = getAllTags(locale);
  const matchedTag = tags.find((item) => normalizeTaxonomy(item) === tag);

  if (!matchedTag) {
    notFound();
  }

  const posts = getPostsByTag(matchedTag, locale);

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
                { label: matchedTag, href: `/blog/tags/${tag}` },
              ]}
            />
          </div>

          <PageHero
            variant="compact"
            maxWidth="5xl"
            className="mb-10"
            badges={[
              {
                label: tSite("Tag"),
                variant: "secondary",
                icon: <Hash className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: `#${tSite(matchedTag)}`, variant: "outline" },
              {
                label: tSite("Technical writing"),
                variant: "outline",
                icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />,
              },
            ]}
            title={tSite(matchedTag)}
            subtitle={tSite("tag archive.")}
            description={tSite(
              "Explore articles that reference the same implementation topic, framework, or product concept across the PyColors engineering and SaaS product system.",
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
                <MarketingPill>{tSite(matchedTag)}</MarketingPill>
                <MarketingPill>{tSite("Product-first")}</MarketingPill>
                <MarketingPill>{tSite("Technical")}</MarketingPill>
                <MarketingPill>{tSite("SaaS")}</MarketingPill>
                <MarketingPill>{tSite("Implementation")}</MarketingPill>
              </MarketingPillList>
            }
          />

          <MarketingSectionShell
            spacing="compact"
            aria-labelledby="tag-context-heading"
          >
            <MarketingCtaPanel
              titleId="tag-context-heading"
              title={tSite("Why this tag exists")}
              description={tSite(
                "Tags help connect related technical ideas across categories, so readers can follow a narrower topic through multiple article angles and implementation contexts.",
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
            aria-labelledby="tag-articles-heading"
          >
            <MarketingSectionHeader
              align="left"
              titleId="tag-articles-heading"
              title={tSite("Articles with this tag")}
              description={tSite(
                "A narrower set of articles linked by the same technical topic.",
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
              <div className="rounded-[5px] border border-primary/15 bg-[color-mix(in_oklch,var(--primary),transparent_97%)] p-10 backdrop-blur-sm">
                <EmptyState
                  title={tSite("No posts yet")}
                  description={tSite(
                    "This tag exists, but no article is published yet.",
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
