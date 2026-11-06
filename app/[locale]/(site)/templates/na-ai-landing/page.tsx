import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import type { Metadata } from "next";
import {
  NA_AI_USAGE_SUMMARY,
  DIGITAL_REFUND_SUMMARY,
} from "@/lib/products/commercial-policy";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  FileArchive,
  FileCode2,
  LayoutTemplate,
  Palette,
  SlidersHorizontal,
} from "lucide-react";

import { Badge, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingFaq } from "@/components/marketing/faq";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { PageHero } from "@/components/marketing/page-hero";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { JsonLd, generateProductOfferJsonLd } from "@/components/seo/json-ld";
import { TemplateColorPreview } from "@/components/templates/template-color-preview";
import { TemplateStickyCta } from "@/components/templates/template-sticky-cta";
import styles from "@/components/templates/na-ai-landing.module.css";

const metadata: Metadata = {
  title: "AI SaaS Landing Page Template for Next.js",
  description:
    "Premium AI SaaS landing page template built with Next.js, Tailwind CSS, shadcn/ui, charts, pricing sections, FAQ, dark mode, SEO foundations, and commercial-ready source code.",
  alternates: {
    canonical: "/templates/na-ai-landing",
  },

  openGraph: {
    title: "AI SaaS Landing Page Template for Next.js",
    description:
      "Launch a polished AI or SaaS landing page faster with modern Next.js architecture, production-ready UI, SEO foundations, and commercial-ready source code.",
    url: "/templates/na-ai-landing",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI SaaS Landing Page Template for Next.js",
    description:
      "Premium AI and SaaS landing page template built for modern product launches.",
    images: ["/seo/twitter-main.png"],
  },
};

const PRODUCT = {
  slug: "na-ai-landing",
  name: "NA-AI Landing",
  price: PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
  regularPrice: PRODUCT_DISPLAY["na-ai-landing"].regularPriceLabel,
  demoUrl: "https://na-ai.pycolors.io",
} as const;

const naAiLandingJsonLd = generateProductOfferJsonLd({
  product: PRODUCT_DISPLAY["na-ai-landing"],
  canonicalPath: "/templates/na-ai-landing",
  description:
    "Premium AI and SaaS landing page template built for modern Next.js product launches.",
});

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

const includedGroups = [
  {
    title: "The marketing sections",
    label: "01 / Product story",
    description:
      "The structure to explain your product and answer the next question.",
    icon: LayoutTemplate,
    items: [
      "Hero, features and integrations",
      "AI, security and revenue insight sections",
      "Analytics-style charts and product visuals",
      "Monthly/yearly pricing and comparison table",
      "Sample testimonials, native FAQ and local contact demo",
    ],
  },
  {
    title: "The visual foundation",
    label: "02 / Design & interaction",
    description: "A consistent interface you can adapt to your own identity.",
    icon: Palette,
    items: [
      "Responsive layouts for mobile and desktop",
      "Dark and light appearances",
      "PyColors UI and shared design tokens",
      "Radix primitives and Lucide icons",
      "Finite motion with reduced-motion support",
    ],
  },
  {
    title: "The source project",
    label: "03 / Code & setup",
    description:
      "An editable Next.js project with the essentials to get started.",
    icon: Code2,
    items: [
      "Next.js App Router, React and TypeScript",
      "Content managed in TypeScript config files",
      "Metadata and social preview foundations",
      "Sitemap and robots configuration",
      "Full source ZIP and setup documentation",
    ],
  },
] as const;

const notIncluded = [
  "Authentication",
  "Database",
  "Backend API",
  "Stripe billing",
  "Email delivery",
  "User dashboard",
] as const;

const contentFiles = [
  { path: "@data/hero.ts", purpose: "Product promise & calls to action" },
  { path: "@data/features.ts", purpose: "Features & benefits" },
  { path: "@data/pricing.ts", purpose: "Plans & pricing content" },
  { path: "@data/faq.ts", purpose: "Questions & answers" },
  { path: "config/site.ts", purpose: "Site identity & metadata" },
] as const;

const customizationSteps = [
  {
    number: "01",
    title: "Make the content yours",
    description:
      "Replace the sample copy, testimonials, metrics and product visuals with accurate content for your own offer.",
  },
  {
    number: "02",
    title: "Set your visual identity",
    description:
      "Update your logo, colors, fonts and social images. PyColors UI and tokens keep the interface consistent.",
  },
  {
    number: "03",
    title: "Connect, review, deploy",
    description:
      "Connect forms and services, check links and both themes, then validate the production build before publishing.",
  },
] as const;

const faqs = [
  { question: "What is the refund policy?", answer: DIGITAL_REFUND_SUMMARY },
  {
    question: "Is NA-AI Landing a full SaaS app?",
    answer:
      "No. NA-AI Landing is a frontend marketing template. It is designed for landing pages, product validation, and commercial presentation — not authentication, billing, or backend logic.",
  },
  {
    question: "Can I use it for client work?",
    answer: NA_AI_USAGE_SUMMARY,
  },
  {
    question: "What should I choose between this template and Starter Pro?",
    answer:
      "Choose NA-AI Landing when you need a polished marketing page. Choose Starter Pro when you need real authentication, Stripe billing, protected routes, database foundations, and SaaS app wiring.",
  },
  {
    question: "What do I receive after purchase?",
    answer:
      "You receive a ZIP package containing the full source code and setup documentation, ready to run locally and deploy on Vercel or a similar platform.",
  },
] as const;

export default function NaAiTemplatePage() {
  const tSite = useCopy();

  return (
    <main
      id="content"
      tabIndex={-1}
      className={cn(
        "bg-background text-foreground focus:outline-none",
        styles.page,
      )}
    >
      <JsonLd id="na-ai-landing-product-jsonld" data={naAiLandingJsonLd} />
      <Container className="pb-16 pt-24 sm:pt-28">
        <Breadcrumb
          className={cn("mb-8", styles.breadcrumb)}
          items={[
            { label: "Home", href: "/" },
            { label: "Templates", href: "/templates" },
            { label: PRODUCT.name, href: "/templates/na-ai-landing" },
          ]}
        />
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0 max-w-3xl"
            badges={[
              { label: PRODUCT.name, variant: "outline" },
              { label: "Frontend template", variant: "outline" },
            ]}
            title={tSite("A complete landing page for your AI product.")}
            description={tSite(
              "Give your AI, analytics or SaaS product a considered marketing page. NA-AI Landing brings the sections, visuals and editable Next.js source. Make it your own, then connect your services.",
            )}
            actions={
              <>
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className="rounded-[5px] shadow-none"
                >
                  <Link href="#template-preview">
                    {tSite("Explore the preview")}
                    {tSite("  ")}
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Link
                  href="/docs/templates/na-ai-landing"
                  className={styles.textLink}
                >
                  {tSite("Read the documentation")}
                  {tSite("  ")}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </>
            }
            extra={
              <MarketingPillList
                aria-label={tSite("NA-AI Landing foundations")}
              >
                {["Next.js", "TypeScript", "Tailwind CSS", "PyColors UI"].map(
                  (item) => (
                    <MarketingPill key={item} className="bg-background">
                      {tSite(item)}
                    </MarketingPill>
                  ),
                )}
              </MarketingPillList>
            }
          />
          <aside
            aria-label={tSite("Purchase NA-AI Landing")}
            className={cn(
              "rounded-[5px] border border-border-subtle p-5 sm:p-6",
              styles.purchasePanel,
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-muted-foreground">
                {tSite("The complete template")}
              </p>
              <FileArchive
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-4xl font-semibold tracking-[-0.04em]">
                {tSite(PRODUCT.price)}
              </span>
              <span className="text-xs text-muted-foreground">
                {tSite("One-time payment")}
              </span>
            </div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              {tSite("Launch price · Regular price ")}
              {tSite(PRODUCT.regularPrice)}
            </p>
            <ul
              className="my-5 space-y-2"
              aria-label={tSite("Purchase includes")}
            >
              {[
                "Full editable source code",
                "Setup documentation",
                "Commercial use under the PyColors license",
              ].map((item) => (
                <MarketingCheckItem key={item} className={styles.checkItem}>
                  {tSite(item)}
                </MarketingCheckItem>
              ))}
            </ul>
            <BuyProductButton
              productSlug={PRODUCT.slug}
              label={tSite("Buy NA-AI Landing")}
              loadingLabel={tSite("Opening checkout…")}
              className="shadow-none hover:shadow-none"
            />
            <Button
              asChild
              variant="outline"
              className="mt-2 w-full rounded-[5px] shadow-none"
            >
              <a
                href={PRODUCT.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {tSite("Open live demo")}
                {tSite("  ")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">
                  {" "}
                  {tSite(" (opens in a new tab)")}
                </span>
              </a>
            </Button>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              {tSite(
                "ZIP access is sent to your checkout email after payment confirmation and delivery processing.",
              )}
            </p>
            <div className="mt-2 flex flex-wrap gap-x-5">
              <Link href="/license" className={styles.textLink}>
                {tSite("License")}
              </Link>
              <Link href="/terms" className={styles.textLink}>
                {tSite("Purchase terms")}
              </Link>
            </div>
          </aside>
        </div>

        <nav
          aria-label={tSite("NA-AI Landing sections")}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-1 border-y border-border-subtle py-2 text-muted-foreground"
        >
          {[
            ["Preview", "template-preview"],
            ["What's included", "template-included"],
            ["Customization", "template-customization"],
            ["Delivery", "template-delivery"],
            ["FAQ", "template-faq"],
          ].map(([label, id]) => (
            <Link key={id} href={`#${id}`} className={styles.textLink}>
              {tSite(label)}
            </Link>
          ))}
        </nav>

        <MarketingSectionShell
          divider="pattern"
          id="template-preview"
          aria-labelledby="template-preview-title"
          width="full"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            align="left"
            titleId="template-preview-title"
            title={tSite("See how your product could look.")}
            description={tSite(
              "Explore both appearances, then try the live demo to inspect the full page and its interactions.",
            )}
            action={
              <a
                href={PRODUCT.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.textLink}
              >
                {tSite("Explore the live demo")}{" "}
                <ArrowUpRight
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">
                  {" "}
                  {tSite(" (opens in a new tab)")}
                </span>
              </a>
            }
          />
          <div
            className={cn(
              "overflow-hidden rounded-[5px] border border-border-subtle",
              styles.previewStage,
            )}
          >
            <TemplateColorPreview
              previews={previews.map((preview) => ({
                mode: preview.mode,
                label: preview.label,
                content: (
                  <figure className="w-full min-w-0">
                    <a
                      href={PRODUCT.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={tSite(
                        "Open NA-AI live demo from the {value0} preview (opens in a new tab)",
                        { value0: preview.mode },
                      )}
                      className={cn(
                        "block overflow-hidden rounded-[5px] border border-border-subtle bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                        styles.previewImage,
                      )}
                    >
                      <Image
                        src={preview.src}
                        alt={tSite(
                          "NA-AI Landing hero and illustrative analytics preview in {value0} mode",
                          { value0: preview.mode },
                        )}
                        width={2880}
                        height={2000}
                        sizes="(min-width: 1440px) 1312px, 92vw"
                        className="h-auto w-full"
                      />
                    </a>
                    <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 text-xs leading-6 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {tSite(preview.label)}{" "}
                        {tSite(" appearance · Hero preview")}
                      </span>
                      <span>
                        {tSite("Product visuals and metrics are illustrative.")}
                      </span>
                    </figcaption>
                  </figure>
                ),
              }))}
            />
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="template-included"
          aria-labelledby="template-included-title"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="template-included-title"
            title={tSite("The marketing layer, already considered.")}
            description={tSite(
              "A clear view of the sections, design system and source files included in the template.",
            )}
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {includedGroups.map((group) => (
              <MarketingFeatureCard
                key={group.title}
                title={tSite(group.title)}
                description={tSite(group.description)}
                className={cn("bg-background shadow-none", styles.includedCard)}
                icon={<group.icon className="size-4" />}
                meta={
                  <div>
                    <p className="mb-5 border-b border-border-subtle pb-4 font-mono text-[11px] text-muted-foreground">
                      {tSite(group.label)}
                    </p>
                    <ul className="space-y-3" aria-label={tSite(group.title)}>
                      {group.items.map((item) => (
                        <MarketingCheckItem
                          key={item}
                          className={styles.checkItem}
                        >
                          {tSite(item)}
                        </MarketingCheckItem>
                      ))}
                    </ul>
                  </div>
                }
              />
            ))}
          </div>
          <div className="mt-5 grid gap-6 rounded-[5px] border border-border-subtle bg-background p-5 sm:p-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
            <div>
              <h3 className="flex items-center gap-2.5 text-sm font-medium">
                <SlidersHorizontal
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                {tSite("What you'll connect yourself ")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {tSite(
                  "NA-AI Landing is a frontend template. Its pricing, charts and contact form are presentation UI; connect real services for your product.",
                )}
              </p>
            </div>
            <div>
              <MarketingPillList
                aria-label={tSite("Not included in the template")}
              >
                {notIncluded.map((item) => (
                  <MarketingPill key={item} className="bg-background">
                    {tSite(item)}
                  </MarketingPill>
                ))}
              </MarketingPillList>
              <Link
                href="/starters/pro"
                className={cn("mt-3", styles.textLink)}
              >
                {tSite("Need auth and billing? Explore Starter Pro")}
                {tSite("  ")}
                <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="template-customization"
          aria-labelledby="template-customization-title"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="template-customization-title"
            title={tSite("Your content. Your visual identity.")}
            description={tSite(
              "Start with the content files and shared tokens. Adjust the page without having to rebuild its structure.",
            )}
            action={
              <Link
                href="/docs/templates/na-ai-landing/customization"
                className={styles.textLink}
              >
                {tSite("Customization guide")}{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <div
              className={cn(
                "min-w-0 overflow-hidden rounded-[5px] border border-border-subtle",
                styles.sourcePanel,
              )}
            >
              <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-background/70 px-5 py-4 sm:px-6">
                <p className="flex items-center gap-2 text-xs font-medium">
                  <Code2
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {tSite("Content map")}
                </p>
                <span className="font-mono text-xs text-muted-foreground">
                  {tSite("src/")}
                </span>
              </div>
              <dl className="divide-y divide-border-subtle bg-background">
                {contentFiles.map((file) => (
                  <div
                    key={file.path}
                    className="flex flex-col gap-2 px-5 py-4 sm:px-6"
                  >
                    <dt className="flex items-center gap-2.5">
                      <FileCode2
                        className="size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <code className="break-all text-xs font-medium text-foreground">
                        {file.path}
                      </code>
                    </dt>
                    <dd className="pl-6 text-xs leading-6 text-muted-foreground">
                      {tSite(file.purpose)}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border-subtle px-5 py-3 sm:px-6">
                <Link
                  href="/docs/templates/na-ai-landing/project-structure"
                  className={styles.textLink}
                >
                  {tSite("Explore the project structure")}
                  {tSite("  ")}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="flex min-w-0 flex-col justify-between rounded-[5px] border border-border-subtle bg-background p-5 sm:p-7">
              <ol
                aria-label={tSite("Customize NA-AI Landing")}
                className="space-y-6"
              >
                {customizationSteps.map((step) => (
                  <li key={step.number} className="flex items-start gap-4">
                    <span aria-hidden="true" className={styles.stepNumber}>
                      {tSite(step.number)}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium">
                        {tSite(step.title)}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {tSite(step.description)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7 border-t border-border-subtle pt-4">
                <p className="text-xs leading-6 text-muted-foreground">
                  {tSite(
                    "Built with the public PyColors UI and Tokens packages.",
                  )}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-5">
                  <Link href="/ui" className={styles.textLink}>
                    {tSite("Explore PyColors UI")}
                    {tSite("  ")}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <Link href="/tools/theme-builder" className={styles.textLink}>
                    {tSite("Open Theme Builder")}
                    {tSite("  ")}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="template-delivery"
          aria-labelledby="template-delivery-title"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <div
            className={cn(
              "overflow-hidden rounded-[5px] border border-border-subtle",
              styles.deliveryPanel,
            )}
          >
            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:p-10">
              <div>
                <div
                  className={cn(
                    "mb-5 inline-flex size-11 items-center justify-center rounded-[5px] border",
                    styles.deliveryIcon,
                  )}
                >
                  <FileArchive className="size-5" aria-hidden="true" />
                </div>
                <MarketingSectionHeader
                  align="left"
                  titleId="template-delivery-title"
                  title={tSite("What arrives after purchase.")}
                  description={tSite(
                    "The source project and setup documentation, delivered as a ZIP you can run and customize locally.",
                  )}
                  className="mb-0"
                />
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] bg-background text-xs"
                  >
                    {tSite("Full source code")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-[5px] bg-background text-xs"
                  >
                    {tSite("Setup documentation")}
                  </Badge>
                </div>
              </div>
              <ol
                aria-label={tSite("Template delivery steps")}
                className="space-y-5"
              >
                {[
                  {
                    title: "Confirm your purchase",
                    text: "Complete checkout using the email address where you want to receive access.",
                  },
                  {
                    title: "Open your access email",
                    text: "Once payment is confirmed and delivery is processed, use the secure link to download your ZIP.",
                  },
                  {
                    title: "Run the project locally",
                    text: "Unzip the package and follow the setup guide. Configure your content and services before deployment.",
                  },
                ].map((step, i) => (
                  <li key={step.title} className="flex items-start gap-3">
                    <span className={styles.stepNumber} aria-hidden="true">
                      {tSite(String(i + 1).padStart(2, "0"))}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium">
                        {tSite(step.title)}
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        {tSite(step.text)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border-subtle bg-background/60 px-5 py-3 sm:px-8 lg:px-10">
              <Link
                href="/docs/templates/na-ai-landing/setup"
                className={styles.textLink}
              >
                <BookOpen className="size-3.5" aria-hidden="true" />
                {tSite("Read the setup guide")}
              </Link>
              <Link href="/orders/recover" className={styles.textLink}>
                {tSite("Recover a purchase")}
                {tSite("  ")}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <Link href="/orders/support" className={styles.textLink}>
                {tSite("Purchase support")}
                {tSite("  ")}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="template-faq"
          aria-labelledby="template-faq-heading"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <MarketingFaq
            titleId="template-faq-heading"
            title={tSite("Questions before buying")}
            description={tSite("Make the scope clear before purchase.")}
            items={faqs}
          />
          <div className="mt-6 flex flex-wrap justify-end gap-x-5">
            <Link href="/license" className={styles.textLink}>
              {tSite("Read the license")}
              {tSite("  ")}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link href="/terms" className={styles.textLink}>
              {tSite("Read purchase terms")}
              {tSite("  ")}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>

        <section
          aria-labelledby="template-purchase-title"
          className={cn(
            "flex flex-col gap-7 rounded-[5px] border border-border-subtle p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between",
            styles.purchasePanel,
          )}
        >
          <div className="max-w-2xl">
            <h2
              id="template-purchase-title"
              className="text-2xl font-semibold tracking-heading sm:text-3xl"
            >
              {tSite("Make the page your own.")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {tSite("NA-AI Landing · Full source code · ")}
              {tSite(PRODUCT.price)} {tSite(" one-time payment.")}
            </p>
            <Link href="/templates" className={cn("mt-2", styles.textLink)}>
              {tSite("Back to templates")}
              {tSite("  ")}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="w-full lg:w-auto lg:min-w-64">
            <BuyProductButton
              productSlug={PRODUCT.slug}
              label={tSite("Buy NA-AI Landing — {value0}", {
                value0: PRODUCT.price,
              })}
              loadingLabel={tSite("Opening checkout…")}
              className="shadow-none hover:shadow-none"
            />
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              {tSite(
                "Source ZIP and setup docs. Your hosting and services are separate.",
              )}
            </p>
          </div>
        </section>
      </Container>
      <TemplateStickyCta
        productSlug={PRODUCT.slug}
        name={PRODUCT.name}
        price={PRODUCT.price}
        demoUrl={PRODUCT.demoUrl}
        className={styles.purchasePanel}
      />
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/templates/na-ai-landing", locale);
}
