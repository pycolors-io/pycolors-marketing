import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { getCopy } from "@/lib/i18n/server-copy";
import { Link } from "@/lib/i18n/navigation";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Layers3, Sparkles } from "lucide-react";

import { Badge, Card, EmptyState, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";

import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { BlogList } from "@/components/blog/blog-list";

import {
  getAllCategories,
  getPostsByCategory,
  normalizeTaxonomy,
} from "@/lib/blog/utils";

type PageProps = {
  readonly params: Promise<{
    readonly category: string;
    readonly locale: "en" | "fr";
  }>;
};

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

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

function Pill({ children }: Readonly<{ children: React.ReactNode }>) {
  const tSite = useCopy();

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[5px]",
        "border border-border-subtle",
        "bg-background/50",
        "px-2.5 py-1",
        "text-[11px] font-medium text-muted-foreground",
      )}
    >
      {tSite(children)}
    </span>
  );
}

function SectionHeader({
  title,
  description,
  action,
}: Readonly<{
  title: string;
  description?: string;
  action?: React.ReactNode;
}>) {
  const tSite = useCopy();

  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <h2 className="font-brand text-[28px] font-semibold leading-[1.2] tracking-heading sm:text-[32px] lg:text-4xl">
          {tSite(title)}
        </h2>

        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
            {tSite(description)}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{tSite(action)}</div> : null}
    </div>
  );
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

        <header className="mx-auto mb-20 max-w-5xl">
          <div className="space-y-10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "gap-1.5 rounded-[5px]",
                  "border border-border-subtle",
                  "bg-surface-muted/80",
                  "px-2.5 py-1",
                  "text-[11px] font-medium",
                )}
              >
                <Layers3 className="h-3.5 w-3.5" aria-hidden="true" />
                {tSite("Category")}
              </Badge>

              <Badge
                variant="outline"
                className={cn(
                  "rounded-[5px]",
                  "border-border-subtle",
                  "bg-background/60",
                  "px-2.5 py-1",
                  "text-[11px] font-medium",
                )}
              >
                {tSite(matchedCategory)}
              </Badge>

              <Badge
                variant="outline"
                className={cn(
                  "gap-1.5 rounded-[5px]",
                  "border-border-subtle",
                  "bg-background/60",
                  "px-2.5 py-1",
                  "text-[11px] font-medium",
                )}
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {tSite("Technical writing")}
              </Badge>
            </div>

            <div className="mx-auto max-w-4xl space-y-6">
              <h1
                className={cn(
                  "text-balance",
                  "font-brand",
                  "text-4xl font-semibold",
                  "tracking-[-0.05em]",
                  "text-foreground",
                  "sm:text-5xl",
                  "lg:text-[4.5rem]",
                  "lg:leading-[0.95]",
                )}
              >
                {tSite(matchedCategory)}
                <span className="block text-muted-foreground">
                  {tSite("blog articles.")}
                </span>
              </h1>

              <p
                className={cn(
                  "mx-auto max-w-3xl",
                  "text-balance",
                  "text-[16px] leading-8",
                  "text-muted-foreground",
                  "sm:text-lg",
                )}
              >
                {tSite("Focused technical articles connected to")}
                {tSite(" ")}
                {tSite(matchedCategory).toLocaleLowerCase(tSite.locale)}
                {tSite(
                  ", product structure, implementation tradeoffs, and production-ready SaaS engineering decisions inside PyColors.",
                )}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className={`site-primary-action ${cn("rounded-[5px]", focusRing)}`}
              >
                <Link href="/blog">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {tSite("Back to Blog")}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className={cn("rounded-[5px]", focusRing)}
              >
                <Link href="/guides">{tSite("Browse Guides")}</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className={cn("rounded-[5px]", focusRing)}
              >
                <Link href="/starters/free">{tSite("Starter Free")}</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <Pill>{tSite(matchedCategory)}</Pill>
              <Pill>{tSite("SaaS")}</Pill>
              <Pill>{tSite("Architecture")}</Pill>
              <Pill>{tSite("Implementation")}</Pill>
              <Pill>{tSite("Product Engineering")}</Pill>
            </div>
          </div>
        </header>

        <section className="pb-10">
          <Card
            className={cn(
              "rounded-[5px]",
              "border border-border-subtle",
              "bg-background/45",
              "p-6 backdrop-blur-sm",
              "sm:p-8",
            )}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-[5px]">
                    {tSite("Why this category matters")}
                  </Badge>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                  {tSite(
                    "This category groups articles around the same product surface, engineering concern, or implementation domain so readers can explore a topic with stronger continuity and less noise.",
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:min-w-[220px] sm:justify-end">
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn("rounded-[5px]", focusRing)}
                >
                  <Link href="/guides">{tSite("View Guides")}</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className={cn("rounded-[5px]", focusRing)}
                >
                  <Link href="/upgrade">{tSite("Explore PRO")}</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        <section className="py-6 sm:py-8">
          <SectionHeader
            title={tSite("Articles in this category")}
            description={tSite(
              "A focused set of articles around the same technical and product domain.",
            )}
            action={
              <Button
                asChild
                size="sm"
                variant="outline"
                className={cn("rounded-[5px]", focusRing)}
              >
                <Link href="/blog">{tSite("All articles")}</Link>
              </Button>
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
        </section>
      </div>
    </Container>
  );
}
