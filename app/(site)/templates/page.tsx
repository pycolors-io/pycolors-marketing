import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  FileArchive,
  SlidersHorizontal,
  LayoutTemplate,
} from "lucide-react";

import { Badge, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import { MarketingFaq } from "@/components/marketing/faq";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { TemplateColorPreview } from "@/components/templates/template-color-preview";
import styles from "@/components/templates/templates-index.module.css";

export const metadata: Metadata = {
  title: "Next.js SaaS Templates",
  description:
    "Premium Next.js SaaS templates for AI products, analytics platforms, developer tools, and startup launches. Full source code, commercial usage, SEO foundations, and production-shaped UI built for modern SaaS applications.",
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: "Next.js SaaS Templates",

    description:
      "Launch polished SaaS and AI products faster with premium Next.js templates, production-ready UI, SEO foundations, and commercial-ready source code.",
    url: "/templates",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Templates",
    description:
      "Premium templates built for modern SaaS, AI, analytics, and developer products.",
    images: ["/seo/twitter-main.png"],
  },
};

const template = {
  name: "NA-AI Landing",
  product: PRODUCT_DISPLAY["na-ai-landing"],
  href: "/templates/na-ai-landing",
  demoUrl: "https://na-ai.pycolors.io",
} as const;

const previews = [
  {
    mode: "dark",
    label: "Dark",
    src: "/templates/na-ai/na-ai-analytics-workspace-dark.webp",
  },
  {
    mode: "light",
    label: "Light",
    src: "/templates/na-ai/na-ai-analytics-workspace-light.webp",
  },
] as const;

const highlights = [
  "Hero, features, pricing and FAQ sections",
  "Responsive layouts with dark and light mode",
  "Editable content in TypeScript config files",
  "Metadata, sitemap and robots foundations",
] as const;

const packageSteps = [
  {
    number: "01",
    phase: "Download",
    title: "Start with the source",
    description:
      "Download the Next.js project and setup documentation. Run it locally and inspect the sections before making changes.",
    icon: FileArchive,
  },
  {
    number: "02",
    phase: "Customize",
    title: "Make the story yours",
    description:
      "Edit the copy and pricing in TypeScript config files. Replace sample testimonials, metrics and visuals with your own content.",
    icon: Code2,
  },
  {
    number: "03",
    phase: "Publish",
    title: "Connect and publish",
    description:
      "Connect your contact form to a service, review metadata and links, then deploy with your preferred hosting provider.",
    icon: SlidersHorizontal,
  },
] as const;

function WorkflowPreview({
  step,
}: Readonly<{ step: (typeof packageSteps)[number] }>) {
  return (
    <div className={styles.workflowPreview} aria-hidden="true">
      <div className={styles.previewWindow}>
        <div className={styles.windowBar}>
          <step.icon className="size-3.5" />
          <span>
            {step.number === "01"
              ? "na-ai-landing/"
              : step.number === "02"
                ? "Content & appearance"
                : "Before you publish"}
          </span>
          <span className={styles.windowDot} />
        </div>
        {step.number === "01" ? (
          <div className={styles.fileRows}>
            <div>
              <code>src/app/</code>
              <span>Pages</span>
            </div>
            <div>
              <code>src/@data/</code>
              <span>Content</span>
            </div>
            <div>
              <code>src/components/</code>
              <span>Sections</span>
            </div>
          </div>
        ) : step.number === "02" ? (
          <div className={styles.brandPreview}>
            <div className="space-y-2">
              <span className="text-[10px] text-muted-foreground">
                Your product
              </span>
              <div className={styles.brandHeadline} />
              <div className={styles.brandSubline} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className={styles.brandAction} />
              <span className={styles.swatches}>
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
        ) : (
          <div className={styles.fileRows}>
            <div>
              <span>Content & links</span>
              <span>Review</span>
            </div>
            <div>
              <span>Forms & services</span>
              <span>Connect</span>
            </div>
            <div>
              <span>Metadata & assets</span>
              <span>Verify</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductPathPreview({
  kind,
}: Readonly<{ kind: "blocks" | "starters" }>) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        styles.productPreview,
        kind === "starters" && styles.starterPreview,
      )}
    >
      <div className={styles.productWindow}>
        <div className={styles.productWindowBar}>
          <span />
          <span />
          <span />
          <i />
        </div>
        {kind === "blocks" ? (
          <div className={styles.blockTiles}>
            <div>
              <i />
              <span />
              <span />
              <b />
            </div>
            <div>
              <span />
              <div className={styles.miniChart}>
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div>
              <i />
              <span />
              <span />
            </div>
          </div>
        ) : (
          <div className={styles.appCanvas}>
            <div className={styles.appSidebar}>
              <i />
              <span />
              <span />
              <span />
            </div>
            <div className={styles.appContent}>
              <span />
              <div className={styles.metricTiles}>
                <i />
                <i />
                <i />
              </div>
              <div className={styles.appTable}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const templateFaqs = [
  {
    question: "Is this a complete SaaS application?",
    answer:
      "NA-AI Landing is a frontend marketing template. Its charts, pricing and product visuals are presentation examples. Authentication, databases, backend APIs, Stripe billing and email delivery are not included.",
    links: [{ href: "/starters", label: "Compare SaaS starters" }],
  },
  {
    question: "What do I receive after purchase?",
    answer:
      "You receive the template source code and setup documentation in a ZIP. After payment is confirmed and delivery is processed, use the access link sent to your checkout email. Purchase recovery is available if you need to recover access.",
    links: [
      { href: "/orders/recover", label: "Recover a purchase" },
      { href: "/orders/support", label: "Get purchase support" },
    ],
  },
  {
    question: "Where can I check commercial usage and purchase terms?",
    answer:
      "Review the PyColors license for permitted use, client projects and source redistribution restrictions. The terms describe the conditions of purchase for digital products.",
    links: [
      { href: "/license", label: "Read the license" },
      { href: "/terms", label: "Read purchase terms" },
    ],
  },
] as const;

export default function TemplatesPage() {
  return (
    <main
      id="content"
      tabIndex={-1}
      className="bg-background text-foreground focus:outline-none"
    >
      <Container className="pb-16 pt-24 sm:pt-28">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-3xl"
          badges={[{ label: "Templates", variant: "outline" }]}
          title="Give your next launch a head start."
          description="Next.js marketing templates with considered layouts, editable source code and the sections your product story needs. Preview the design, explore what's included, then make it yours."
          actions={
            <>
              <Button
                size="lg"
                asChild
                className="site-primary-action rounded-[5px] shadow-none"
              >
                <Link href="#templates">
                  Explore the template{" "}
                  <ArrowDown className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="rounded-[5px] shadow-none"
              >
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open NA-AI live demo{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </>
          }
          extra={
            <MarketingPillList aria-label="Template foundations">
              {["Next.js", "TypeScript", "Tailwind CSS", "PyColors UI"].map(
                (technology) => (
                  <MarketingPill key={technology} className="bg-background">
                    {technology}
                  </MarketingPill>
                ),
              )}
            </MarketingPillList>
          }
        />

        <MarketingSectionShell
          divider="pattern"
          id="templates"
          aria-labelledby="templates-title"
          width="full"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            align="left"
            titleId="templates-title"
            title="Explore the design. Inspect the details."
            description="A focused landing page for AI, analytics and SaaS products."
            action={
              <span className="text-xs text-muted-foreground">
                1 template available
              </span>
            }
          />
          <article
            aria-labelledby="na-ai-template-title"
            className="overflow-hidden rounded-[5px] border border-border-subtle bg-background"
          >
            <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div
                className={cn(
                  "min-w-0 border-b border-border-subtle lg:border-b-0 lg:border-r",
                  styles.previewStage,
                )}
              >
                <TemplateColorPreview
                  previews={previews.map((preview) => ({
                    mode: preview.mode,
                    label: preview.label,
                    content: (
                      <figure className="w-full min-w-0">
                        <Link
                          href={template.href}
                          aria-label={`Explore NA-AI Landing from its ${preview.mode} preview`}
                          className={cn(
                            "block overflow-hidden rounded-[5px] border border-border-subtle bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                            styles.previewLink,
                          )}
                        >
                          <Image
                            src={preview.src}
                            alt={`NA-AI Landing hero and illustrative analytics preview in ${preview.mode} mode`}
                            width={3452}
                            height={1916}
                            sizes="(min-width: 1280px) 640px, (min-width: 1024px) 52vw, 90vw"
                            className={cn("h-auto w-full", styles.previewImage)}
                          />
                        </Link>
                        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[11px] leading-5 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {preview.label} appearance
                          </span>
                          <span>Template preview · Illustrative content</span>
                        </figcaption>
                      </figure>
                    ),
                  }))}
                />
              </div>
              <div className="flex flex-col p-5 sm:p-7 lg:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] text-[11px]"
                  >
                    Available now
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Frontend template
                  </span>
                </div>
                <h3
                  id="na-ai-template-title"
                  className="mt-5 font-brand text-[22px] font-semibold leading-snug tracking-subheading sm:text-2xl"
                >
                  {template.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  A complete marketing page with product visuals, flexible
                  sections and a consistent design system. Ready for your own
                  content.
                </p>
                <ul
                  aria-label="NA-AI Landing includes"
                  className="mt-6 space-y-3"
                >
                  {highlights.map((highlight) => (
                    <MarketingCheckItem
                      key={highlight}
                      className={styles.checkItem}
                    >
                      {highlight}
                    </MarketingCheckItem>
                  ))}
                </ul>
                <div className="mt-7 border-t border-border-subtle pt-5">
                  <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-3xl font-semibold tracking-[-0.04em]">
                      {template.product.priceLabel}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      One-time payment
                    </span>
                  </p>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">
                    Full source ZIP and setup documentation.
                  </p>
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto rounded-[5px] shadow-none"
                  >
                    <Link href={template.href}>
                      View template details{" "}
                      <ArrowRight
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                  <BuyProductButton
                    productSlug={template.product.slug}
                    label="Buy NA-AI Landing"
                    loadingLabel="Opening checkout…"
                    className="shadow-none hover:shadow-none"
                  />
                </div>
                <Link
                  href="/license"
                  className={cn(
                    "mt-2 self-start text-muted-foreground",
                    styles.textLink,
                  )}
                >
                  Review the license{" "}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-border-subtle px-5 py-4 sm:px-7">
              <LayoutTemplate
                className="mt-1 size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="text-xs leading-6 text-muted-foreground">
                <span className="font-medium text-foreground">
                  The marketing layer.
                </span>{" "}
                This template includes frontend sections. Authentication,
                database, payment processing and form delivery require your own
                integrations.
              </p>
            </div>
          </article>
        </MarketingSectionShell>

        <MarketingSectionShell
          aria-labelledby="template-workflow-title"
          width="full"
          className="border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="template-workflow-title"
            title="From template to your own launch."
            description="The design is a starting point. Your product, content and services make it yours."
          />
          <ol
            className={styles.workflowGrid}
            aria-label="Template launch steps"
          >
            {packageSteps.map((step) => (
              <li key={step.number} className={styles.workflowStep}>
                <div className="flex items-center justify-between gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
                  <span className={styles.stepNumber} aria-hidden="true">
                    {step.number}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {step.phase}
                  </span>
                </div>
                <WorkflowPreview step={step} />
                <MarketingFeatureCard
                  title={step.title}
                  description={step.description}
                  className="flex-1 rounded-none border-0 bg-transparent px-6 pb-7 pt-0 shadow-none sm:px-7"
                />
              </li>
            ))}
          </ol>
        </MarketingSectionShell>

        <MarketingSectionShell
          aria-labelledby="template-next-steps-title"
          width="full"
          className="border-t border-border-subtle"
        >
          <div
            className={cn(
              "overflow-hidden rounded-[5px] border border-border-subtle",
              styles.nextSteps,
            )}
          >
            <div className="p-6 sm:p-8 lg:p-10">
              <p className="mb-4 text-xs font-medium text-muted-foreground">
                Keep building with PyColors
              </p>
              <MarketingSectionHeader
                align="left"
                titleId="template-next-steps-title"
                title="Build beyond the landing page."
                className="mb-0"
                description="Use a template for your product story. Add reusable blocks or start your application when you need the next layer."
              />
            </div>
            <div className="grid border-t border-border-subtle md:grid-cols-2">
              <MarketingResourceCard
                href="/blocks"
                title="Add a focused UI block"
                description="Explore reusable sections for dashboards, settings and product workflows."
                meta={
                  <div className="space-y-6">
                    <ProductPathPreview kind="blocks" />
                    <span className="block text-xs font-medium text-muted-foreground">
                      UI Blocks · Compose your interface
                    </span>
                  </div>
                }
                className={cn(
                  "rounded-none border-0 border-b border-border-subtle bg-background shadow-none hover:shadow-none md:border-b-0 md:border-r",
                  styles.pathCard,
                )}
              />
              <MarketingResourceCard
                href="/starters"
                title="Choose your SaaS starter"
                description="Compare Free's mock UI with Pro's auth, billing and database foundations."
                meta={
                  <div className="space-y-6">
                    <ProductPathPreview kind="starters" />
                    <span className="block text-xs font-medium text-muted-foreground">
                      SaaS Starters · Build your application
                    </span>
                  </div>
                }
                className={cn(
                  "rounded-none border-0 bg-background shadow-none hover:shadow-none",
                  styles.pathCard,
                )}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-border-subtle px-6 py-3 sm:px-8 lg:px-10">
              <span className="text-xs leading-6 text-muted-foreground">
                Choose by what you need to build next.
              </span>
              <Link href="/pricing" className={styles.textLink}>
                Compare all products & pricing{" "}
                <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          aria-labelledby="templates-faq-title"
          width="full"
          className="border-t border-border-subtle pb-0"
        >
          <MarketingFaq
            titleId="templates-faq-title"
            title="Before you choose."
            description="Scope, delivery and usage, with the details close at hand."
            items={templateFaqs}
          />
        </MarketingSectionShell>
      </Container>
    </main>
  );
}
