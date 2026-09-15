import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Code2,
  Copy,
  Eye,
  Layers3,
} from "lucide-react";

import { Container } from "@/components/container";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { BlockCatalogPreview } from "@/components/marketing/blocks/block-catalog-preview";
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
  "Evaluate real PyColors Blocks by category, inspect canonical previews, open complete source and copy production-shaped React patterns into your application.";

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
  "inline-flex min-h-10 items-center rounded-full border border-border-subtle bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const cardActionClassName =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-[5px] border border-border-subtle bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const proofItems = [
  {
    icon: Layers3,
    title: `${BLOCKS_CATALOG.length} source-backed Blocks`,
    description: "Every preview maps to canonical copyable source.",
  },
  {
    icon: Eye,
    title: `${BLOCK_CATEGORIES.length} product categories`,
    description: "Scan by the screen or workflow you need next.",
  },
  {
    icon: Copy,
    title: "Application-owned installation",
    description: "Copy source locally; no Blocks Registry or CLI is required.",
  },
] as const;

function BlockCatalogCard({ block }: Readonly<{ block: BlockCatalogEntry }>) {
  const blockId = block.id.split("/")[1];
  const sourceHref = `${block.href}#copy-source`;
  const installHref = `${block.href}#install-by-copying-source`;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border-subtle bg-card shadow-sm">
      <div className="border-b border-border-subtle p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {block.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Canonical source
          </span>
        </div>
        <h4 className="text-xl font-semibold tracking-tight">{block.title}</h4>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {block.description}
        </p>
      </div>

      <div className="flex-1 p-4 sm:p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Live preview
        </p>
        <div className="relative overflow-hidden rounded-lg border border-border-subtle bg-surface-muted/25">
          <div
            aria-hidden="true"
            className="max-h-72 min-h-56 overflow-hidden p-3 sm:p-4"
            inert
          >
            <BlockCatalogPreview blockId={blockId} />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/95 to-transparent"
          />
        </div>
      </div>

      <div className="border-t border-border-subtle bg-surface-muted/20 p-4 sm:p-5">
        <p className="mb-3 text-xs leading-5 text-muted-foreground">
          Copy the complete source into your application, then own its behavior,
          customization and future updates.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            aria-label={`View ${block.title} documentation`}
            className={cardActionClassName}
            href={block.href}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            View
          </Link>
          <Link
            aria-label={`View ${block.title} source`}
            className={cardActionClassName}
            href={sourceHref}
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
            Source
          </Link>
          <Link
            aria-label={`Install ${block.title} by copying source`}
            className={cardActionClassName}
            href={installHref}
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            Install
          </Link>
        </div>
      </div>
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
                  <Link href="/docs/blocks">Source-copy guide</Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
            }
            badges={[
              {
                label: "PyColors Blocks",
                variant: "secondary",
                icon: <Boxes className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: "Real canonical previews", variant: "outline" },
            ]}
            description="Evaluate production-shaped React patterns before you copy them. Browse real canonical compositions for navigation, authentication, commerce, account workflows, data and feedback states, then open the complete source when a pattern fits."
            maxWidth="5xl"
            pills={[
              `${BLOCKS_CATALOG.length} documented Blocks`,
              "Server-rendered by default",
              "Consumer-owned behavior",
            ]}
            subtitle="See the composition first. Inspect the source second."
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
          <div className="mx-auto max-w-6xl">
            <MarketingSectionHeader
              align="left"
              description="Start with the product area you are building. Every card renders the canonical Block or a bounded fixture around it; the documentation remains the technical source-copy handoff."
              eyebrow="Visual catalog"
              title="Choose the interface you need next"
              titleId="blocks-catalog-title"
            />

            <nav aria-label="Block categories" className="mb-12 flex flex-wrap gap-2">
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

            <div className="space-y-16">
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
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border-subtle pb-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {blocks.length} {blocks.length === 1 ? "Block" : "Blocks"}
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

                    <div className="grid min-w-0 gap-5 lg:grid-cols-2">
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
