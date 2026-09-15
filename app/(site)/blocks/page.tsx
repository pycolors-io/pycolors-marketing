import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Copy,
  Eye,
  Layers3,
} from "lucide-react";

import { Container } from "@/components/container";
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

const title = "PyColors Blocks — Copyable React application patterns";
const description =
  "Try real PyColors Blocks by category, inspect canonical source and copy production-shaped React patterns into your application.";

export const metadata: Metadata = {
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
  "inline-flex min-h-10 shrink-0 items-center border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardActionClassName =
  "inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-[5px] border border-border-subtle bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const proofItems = [
  {
    icon: Layers3,
    title: `${BLOCKS_CATALOG.length} source-backed Blocks`,
    description: "Every preview maps to canonical copyable source.",
  },
  {
    icon: Eye,
    title: `${BLOCK_CATEGORIES.length} product categories`,
    description: "Try the real interaction before you copy the pattern.",
  },
  {
    icon: Copy,
    title: "Copy source directly",
    description:
      "Preview, interact, inspect and copy without leaving the catalog.",
  },
] as const;

function readBlockSource(block: BlockCatalogEntry) {
  return readFileSync(
    resolve(process.cwd(), "content", "blocks", block.id, "index.tsx"),
    "utf8",
  );
}

function BlockCatalogCard({ block }: Readonly<{ block: BlockCatalogEntry }>) {
  const blockId = block.id.split("/")[1];
  const source = readBlockSource(block);

  return (
    <article className="space-y-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {block.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              Interactive preview · Canonical source
            </span>
          </div>
          <h4 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {block.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
            {block.description}
          </p>
        </div>

        <Link
          aria-label={`Open ${block.title} documentation`}
          className={cardActionClassName}
          href={block.href}
        >
          Documentation
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <BlockShowcaseTabs
        preview={<BlockCatalogPreview blockId={blockId} />}
        source={source}
      />

      <p className="text-xs leading-5 text-muted-foreground">
        Preview interactions use fictional local state only. No account,
        payment, email, persistence or network mutation occurs. Copy the
        complete source, then connect the behavior your application owns.
      </p>
    </article>
  );
}

export default function BlocksPage() {
  return (
    <main id="content" tabIndex={-1}>
      <Container className="py-18">
        <div className="mx-auto max-w-6xl">
          <PageHero
            actions={
              <MarketingActionGroup align="center">
                <MarketingLinkButton>
                  <Link href="#block-catalog">
                    Explore Blocks
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/docs/blocks">Integration guide</Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
            }
            badges={[
              {
                label: "PyColors Blocks",
                variant: "secondary",
                icon: <Boxes className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: "Interactive preview + source", variant: "outline" },
            ]}
            description="Try production-shaped React patterns before you copy them. Interact with the real composition using safe local demo state, switch to syntax-highlighted canonical source, copy it directly, then use the docs for integration guidance."
            maxWidth="5xl"
            pills={[
              `${BLOCKS_CATALOG.length} documented Blocks`,
              "Interactive local demos",
              "Consumer-owned behavior",
            ]}
            subtitle="Try the composition. Inspect the code. Copy what you need."
            title="Build SaaS interfaces faster"
          />

          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {proofItems.map((item) => (
              <div
                className="rounded-lg border border-border-subtle bg-surface-muted/25 p-4"
                key={item.title}
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-background text-muted-foreground">
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <MarketingSectionShell
        aria-labelledby="blocks-catalog-title"
        className="scroll-mt-24 border-t border-border-subtle py-16 lg:py-20"
        id="block-catalog"
        width="full"
      >
        <Container>
          <div className="mx-auto max-w-[1440px]">
            <MarketingSectionHeader
              align="left"
              description="Start with the product area you are building. Every Preview is a safe interactive composition backed by the canonical Block; Code exposes the complete source without turning this page into a second documentation site."
              eyebrow="Interactive catalog"
              title="Choose the interface you need next"
              titleId="blocks-catalog-title"
            />

            <div className="sticky top-0 z-20 mb-12 border-y border-border-subtle bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
              <nav
                aria-label="Block categories"
                className="flex min-w-0 overflow-x-auto"
              >
                {BLOCK_CATEGORIES.map((category) => (
                  <Link
                    className={categoryAnchorClassName}
                    href={`#category-${category.slug}`}
                    key={category.slug}
                  >
                    {category.label}
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
                    className="scroll-mt-24"
                    id={`category-${category.slug}`}
                    key={category.slug}
                  >
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-border-subtle pb-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {blocks.length}{" "}
                          {blocks.length === 1 ? "Block" : "Blocks"}
                        </p>
                        <h3
                          className="mt-1 text-2xl font-semibold tracking-tight"
                          id={`category-${category.slug}-title`}
                        >
                          {category.label}
                        </h3>
                      </div>
                      <Link
                        className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        href="#block-catalog"
                      >
                        Back to categories
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
          <div className="mx-auto max-w-6xl">
            <MarketingCtaPanel
              actions={
                <MarketingActionGroup align="center">
                  <MarketingLinkButton>
                    <Link href="/starters">
                      Compare Starters
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </MarketingLinkButton>
                  <MarketingLinkButton variant="outline">
                    <Link href="/docs/blocks">Continue with Blocks</Link>
                  </MarketingLinkButton>
                </MarketingActionGroup>
              }
              align="center"
              description="Use Blocks when you want one pattern in an existing application. Choose Starter Free or Starter Pro when you need a broader SaaS foundation instead of assembling screens one at a time."
              title="Need the complete application foundation?"
              titleId="blocks-starters-title"
            />
          </div>
        </Container>
      </MarketingSectionShell>
    </main>
  );
}
