import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Hash, Sparkles } from "lucide-react";

import { Badge, Card, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";

import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";

import { getAllTags, getPostsByTag, normalizeTaxonomy } from "@/lib/blog/utils";

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

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

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
}: Readonly<{
  title: string;
  description?: string;
}>) {
  const tSite = useCopy();

  return (
    <div className="mb-10 space-y-3">
      <h2 className="font-brand text-[28px] font-semibold leading-[1.2] tracking-heading sm:text-[32px] lg:text-4xl">
        {tSite(title)}
      </h2>

      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
          {tSite(description)}
        </p>
      ) : null}
    </div>
  );
}

export default function BlogTagsPage() {
  const tSite = useCopy();

  const tags = getAllTags(tSite.locale);

  return (
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
                <Hash className="h-3.5 w-3.5" aria-hidden="true" />
                {tSite("Tags")}
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
                {tSite("Topic navigation")}
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
                {tSite("Developer knowledge")}
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
                {tSite("Explore blog topics")}
                <span className="block text-muted-foreground">
                  {tSite("across SaaS, engineering, and product design.")}
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
                {tSite(
                  "Tags help you explore specific technical ideas across multiple articles — from Next.js architecture and SaaS billing to UI systems, developer experience, and product strategy.",
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
              <Pill>{tSite("SaaS")}</Pill>
              <Pill>{tSite("Next.js")}</Pill>
              <Pill>{tSite("Product UX")}</Pill>
              <Pill>{tSite("Design Systems")}</Pill>
              <Pill>{tSite("Architecture")}</Pill>
            </div>
          </div>
        </header>

        <section className="py-6 sm:py-8">
          <SectionHeader
            title={tSite("All tags")}
            description={tSite(
              "Each tag groups articles connected to the same implementation topic, product concern, or engineering pattern.",
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => {
              const posts = getPostsByTag(tag, tSite.locale);

              return (
                <Card
                  key={tag}
                  className={cn(
                    "group flex h-full flex-col justify-between",
                    "rounded-[5px]",
                    "border border-border-subtle",
                    "bg-background/45",
                    "p-6 backdrop-blur-sm",
                    "transition-all duration-200",

                    // subtle premium tint
                    "hover:border-primary/20",
                    "hover:bg-[color-mix(in_oklch,var(--primary),var(--background)_96%)]",
                  )}
                >
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-[5px]",
                          "border-primary/15",
                          "bg-[color-mix(in_oklch,var(--primary),transparent_96%)]",
                          "text-foreground",
                        )}
                      >
                        #{tSite(tag)}
                      </Badge>

                      <Badge variant="secondary" className="rounded-[5px]">
                        {tSite(posts.length)} {tSite(" article")}
                        {tSite(posts.length > 1 ? "s" : "")}
                      </Badge>
                    </div>

                    <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
                      {tSite("Articles connected to the ")}
                      {tSite(tag)}{" "}
                      {tSite(
                        " topic and adjacent implementation decisions across SaaS, frontend architecture, and product engineering.",
                      )}
                    </p>
                  </div>

                  <div className="mt-8">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={cn("w-full rounded-[5px]", focusRing)}
                    >
                      <Link href={`/blog/tags/${normalizeTaxonomy(tag)}`}>
                        {tSite("View tag")}
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </Container>
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
