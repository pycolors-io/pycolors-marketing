import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import type { Metadata } from "next";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowRight,
  ArrowUp,
  Boxes,
  CheckCircle2,
  Copy,
  Eye,
  Layers3,
} from "lucide-react";

import { Container } from "@/components/container";
import { UiSectionNav } from "@/components/marketing/ui-section-nav";
import { BlockCatalogPreview } from "@/components/marketing/blocks/block-catalog-preview";
import { BlockShowcaseTabs } from "@/components/marketing/blocks/block-showcase-tabs";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import {
  BLOCK_CATEGORIES,
  BLOCKS_CATALOG,
  type BlockCatalogEntry,
} from "@/lib/blocks/catalog";
import { readBlockSource } from "@/lib/blocks/source.server";
import { SiteText } from "@/components/site-text";

const title = "PyColors Blocks — Copyable React application patterns";
const description =
  "Try real PyColors Blocks by category, inspect canonical source and copy production-shaped React patterns into your application.";

const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blocks" },
  openGraph: {
    title,
    description,
    url: "/blocks",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/seo/twitter-main.png"],
  },
};

const categoryAnchorClassName =
  "inline-flex min-h-11 shrink-0 items-center gap-2 border-b-2 border-transparent px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none";

const cardActionClassName =
  "inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-[5px] border border-border-subtle bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

const proofItems = [
  {
    id: "compositions",
    icon: Layers3,
    title: (
      <>
        {BLOCKS_CATALOG.length} <SiteText text="documented Blocks" />
      </>
    ),
    description: "Complete compositions built with PyColors UI.",
  },
  {
    id: "categories",
    icon: Eye,
    title: (
      <>
        {BLOCK_CATEGORIES.length} <SiteText text="product categories" />
      </>
    ),
    description: "Find the interface your product needs next.",
  },
  {
    id: "source",
    icon: Copy,
    title: "Preview, then copy",
    description: "Try the interactions and bring the source into your app.",
  },
] as const;

function BlockCatalogCard({ block }: Readonly<{ block: BlockCatalogEntry }>) {
  const tSite = useCopy();

  const blockId = block.id.split("/")[1];
  const source = readBlockSource(block);

  return (
    <article className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <h4 className="text-lg font-semibold tracking-subheading sm:text-xl">
            {tSite(block.title)}
          </h4>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            {tSite(block.description)}
          </p>
        </div>

        <Link
          aria-label={tSite("Open {value0} documentation", {
            value0: tSite(block.title),
          })}
          className={cardActionClassName}
          href={block.href}
        >
          {tSite("Documentation")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <BlockShowcaseTabs
        preview={<BlockCatalogPreview blockId={blockId} headingLevel={5} />}
        previewHref={tSite.href(`/blocks/${block.id}/preview`)}
        source={source}
      />

      <p className="flex items-start gap-2 text-xs leading-6 text-muted-foreground">
        <CheckCircle2 className="mt-1 size-3.5 shrink-0" aria-hidden="true" />
        <span>
          {tSite(
            "Demo uses fictional local state only. Copy the source, then connect your app’s data and actions.",
          )}
        </span>
      </p>
    </article>
  );
}

export default function BlocksPage() {
  const tSite = useCopy();

  return (
    <main id="content" tabIndex={-1}>
      <Container className="pt-24 pb-12 sm:pt-28 sm:pb-16">
        <UiSectionNav active="blocks" />
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0"
          actions={
            <MarketingActionGroup align="left">
              <MarketingLinkButton>
                <Link href="#block-catalog">{tSite("Explore Blocks")}</Link>
              </MarketingLinkButton>
              <MarketingLinkButton variant="outline">
                <Link href="/docs/blocks">{tSite("Integration guide")}</Link>
              </MarketingLinkButton>
            </MarketingActionGroup>
          }
          badges={[
            {
              label: "PyColors Blocks",
              variant: "outline",
              icon: <Boxes className="h-3.5 w-3.5" aria-hidden="true" />,
            },
            { label: "Preview + source", variant: "outline" },
          ]}
          description={tSite(
            "React patterns for authentication, billing, settings, and data. Try each Block, explore its source, and make it part of your application.",
          )}
          maxWidth="5xl"
          title={tSite("Build the next screen. Own the code.")}
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-[5px] border border-border-subtle bg-border-subtle md:grid-cols-3">
          {proofItems.map((item) => (
            <div className="bg-background p-5 sm:p-6" key={item.id}>
              <div className="flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-background text-muted-foreground">
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{tSite(item.title)}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {tSite(item.description)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <MarketingSectionShell
        divider="pattern"
        aria-labelledby="blocks-catalog-title"
        className="scroll-mt-24 border-t border-border-subtle py-16 lg:py-20"
        id="block-catalog"
        width="full"
      >
        <Container>
          <div>
            <MarketingSectionHeader
              align="left"
              description={tSite(
                "Choose a category, try the preview at different screen sizes, then copy the complete source. Each Block links to its integration guide.",
              )}
              title={tSite("Choose the interface you need next")}
              titleId="blocks-catalog-title"
            />

            <div className="sticky top-(--site-header-height) z-20 mb-10 border-y border-border-subtle bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
              <nav
                aria-label={tSite("Block categories")}
                className="flex min-w-0 overflow-x-auto"
              >
                {BLOCK_CATEGORIES.map((category) => (
                  <Link
                    className={categoryAnchorClassName}
                    href={`#category-${category.slug}`}
                    key={category.slug}
                  >
                    {tSite(category.label)}
                    <span className="grid min-w-5 place-items-center rounded-[3px] bg-surface-muted px-1 py-0.5 text-[10px] tabular-nums">
                      {tSite(
                        BLOCKS_CATALOG.filter(
                          (block) => block.category === category.label,
                        ).length,
                      )}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-20">
              {BLOCK_CATEGORIES.map((category) => {
                const blocks = BLOCKS_CATALOG.filter(
                  (block) => block.category === category.label,
                );

                return (
                  <section
                    aria-labelledby={`category-${category.slug}-title`}
                    className="scroll-mt-32"
                    id={`category-${category.slug}`}
                    key={category.slug}
                  >
                    <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3
                          className="text-[22px] font-semibold leading-snug tracking-subheading sm:text-2xl"
                          id={`category-${category.slug}-title`}
                        >
                          {tSite(category.label)}
                        </h3>
                        <span className="rounded-[5px] border border-border-subtle px-2 py-1 text-[11px] tabular-nums text-muted-foreground">
                          {tSite(blocks.length)}
                          {tSite(" ")}
                          {tSite(blocks.length === 1 ? "Block" : "Blocks")}
                        </span>
                      </div>
                      <Link
                        className="inline-flex min-h-10 items-center gap-2 text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                        href="#block-catalog"
                      >
                        {tSite("Back to categories")}
                        <ArrowUp className="size-3" aria-hidden="true" />
                      </Link>
                    </div>

                    <div className="space-y-16">
                      {blocks.map((block) => (
                        <BlockCatalogCard block={block} key={block.id} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </Container>
      </MarketingSectionShell>

      <MarketingSectionShell
        aria-labelledby="blocks-starters-title"
        className="border-t border-border-subtle py-16 lg:py-20"
        width="full"
      >
        <Container>
          <div>
            <MarketingCtaPanel
              actions={
                <MarketingActionGroup align="left">
                  <MarketingLinkButton>
                    <Link href="/starters">{tSite("Compare Starters")}</Link>
                  </MarketingLinkButton>
                  <MarketingLinkButton variant="outline">
                    <Link href="/docs/blocks">
                      {tSite("Continue with Blocks")}
                    </Link>
                  </MarketingLinkButton>
                </MarketingActionGroup>
              }
              align="left"
              description={tSite(
                "Use Blocks when you want one pattern in an existing application. Choose Starter Free or Starter Pro when you need a broader SaaS foundation instead of assembling screens one at a time.",
              )}
              title={tSite("Need the complete application foundation?")}
              titleId="blocks-starters-title"
            />
          </div>
        </Container>
      </MarketingSectionShell>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/blocks", locale);
}
