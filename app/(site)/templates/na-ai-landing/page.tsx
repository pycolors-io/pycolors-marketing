import type { Metadata } from "next";
import {
  NA_AI_USAGE_SUMMARY,
  DIGITAL_REFUND_SUMMARY,
} from "@/lib/products/commercial-policy";
import Image from "next/image";
import Link from "next/link";
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

import { Badge, Button, cn } from "@pycolors/ui";
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

export const metadata: Metadata = {
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
      "Testimonials, FAQ and frontend contact form",
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
      "Tailwind CSS v4 and Framer Motion",
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
            title="A complete landing page for your AI product."
            description="Give your AI, analytics or SaaS product a considered marketing page. NA-AI Landing brings the sections, visuals and editable Next.js source. Make it your own, then connect your services."
            actions={
              <>
                <Button
                  asChild
                  variant="outline"
                  className="min-h-11 rounded-[5px] px-5 text-sm shadow-none"
                >
                  <Link href="#template-preview">
                    Explore the preview{" "}
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Link
                  href="/docs/templates/na-ai-landing"
                  className={styles.textLink}
                >
                  Read the documentation{" "}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </>
            }
            extra={
              <MarketingPillList aria-label="NA-AI Landing foundations">
                {["Next.js", "TypeScript", "Tailwind CSS", "PyColors UI"].map(
                  (item) => (
                    <MarketingPill key={item} className="bg-background">
                      {item}
                    </MarketingPill>
                  ),
                )}
              </MarketingPillList>
            }
          />
          <aside
            aria-label="Purchase NA-AI Landing"
            className={cn(
              "rounded-[5px] border border-border-subtle p-5 sm:p-6",
              styles.purchasePanel,
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-muted-foreground">
                The complete template
              </p>
              <FileArchive
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-4xl font-semibold tracking-[-0.04em]">
                {PRODUCT.price}
              </span>
              <span className="text-xs text-muted-foreground">
                One-time payment
              </span>
            </div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              Launch price · Regular price {PRODUCT.regularPrice}
            </p>
            <ul className="my-5 space-y-2" aria-label="Purchase includes">
              {[
                "Full editable source code",
                "Setup documentation",
                "Commercial use under the PyColors license",
              ].map((item) => (
                <MarketingCheckItem key={item} className={styles.checkItem}>
                  {item}
                </MarketingCheckItem>
              ))}
            </ul>
            <BuyProductButton
              productSlug={PRODUCT.slug}
              label="Buy NA-AI Landing"
              loadingLabel="Opening checkout…"
              className="shadow-none hover:shadow-none"
            />
            <Button
              asChild
              variant="outline"
              className="mt-2 min-h-11 w-full rounded-[5px] text-sm shadow-none"
            >
              <a
                href={PRODUCT.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                Open live demo{" "}
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              ZIP access is sent to your checkout email after payment
              confirmation and delivery processing.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-5">
              <Link href="/license" className={styles.textLink}>
                License
              </Link>
              <Link href="/terms" className={styles.textLink}>
                Purchase terms
              </Link>
            </div>
          </aside>
        </div>

        <nav
          aria-label="NA-AI Landing sections"
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
              {label}
            </Link>
          ))}
        </nav>

        <MarketingSectionShell
          id="template-preview"
          aria-labelledby="template-preview-title"
          width="full"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            align="left"
            titleId="template-preview-title"
            title="See how your product could look."
            description="Explore both appearances, then try the live demo to inspect the full page and its interactions."
            action={
              <a
                href={PRODUCT.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.textLink}
              >
                Explore the live demo{" "}
                <ArrowUpRight
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only"> (opens in a new tab)</span>
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
                      aria-label={`Open NA-AI live demo from the ${preview.mode} preview (opens in a new tab)`}
                      className={cn(
                        "block overflow-hidden rounded-[5px] border border-border-subtle bg-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
                        styles.previewImage,
                      )}
                    >
                      <Image
                        src={preview.src}
                        alt={`NA-AI Landing hero and illustrative analytics preview in ${preview.mode} mode`}
                        width={3452}
                        height={1916}
                        sizes="(min-width: 1280px) 1180px, 92vw"
                        className="h-auto w-full"
                      />
                    </a>
                    <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 text-xs leading-6 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {preview.label} appearance · Hero preview
                      </span>
                      <span>Product visuals and metrics are illustrative.</span>
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
            title="The marketing layer, already considered."
            description="A clear view of the sections, design system and source files included in the template."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {includedGroups.map((group) => (
              <MarketingFeatureCard
                key={group.title}
                title={group.title}
                description={group.description}
                className={cn("bg-background shadow-none", styles.includedCard)}
                icon={<group.icon className="size-4" />}
                meta={
                  <div>
                    <p className="mb-5 border-b border-border-subtle pb-4 font-mono text-[11px] text-muted-foreground">
                      {group.label}
                    </p>
                    <ul className="space-y-3" aria-label={group.title}>
                      {group.items.map((item) => (
                        <MarketingCheckItem
                          key={item}
                          className={styles.checkItem}
                        >
                          {item}
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
                What you&apos;ll connect yourself
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                NA-AI Landing is a frontend template. Its pricing, charts and
                contact form are presentation UI; connect real services for your
                product.
              </p>
            </div>
            <div>
              <MarketingPillList aria-label="Not included in the template">
                {notIncluded.map((item) => (
                  <MarketingPill key={item} className="bg-background">
                    {item}
                  </MarketingPill>
                ))}
              </MarketingPillList>
              <Link
                href="/starters/pro"
                className={cn("mt-3", styles.textLink)}
              >
                Need auth and billing? Explore Starter Pro{" "}
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
            title="Your content. Your visual identity."
            description="Start with the content files and shared tokens. Adjust the page without having to rebuild its structure."
            action={
              <Link
                href="/docs/templates/na-ai-landing/customization"
                className={styles.textLink}
              >
                Customization guide{" "}
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
                  Content map
                </p>
                <span className="font-mono text-xs text-muted-foreground">
                  src/
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
                      {file.purpose}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border-subtle px-5 py-3 sm:px-6">
                <Link
                  href="/docs/templates/na-ai-landing/project-structure"
                  className={styles.textLink}
                >
                  Explore the project structure{" "}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="flex min-w-0 flex-col justify-between rounded-[5px] border border-border-subtle bg-background p-5 sm:p-7">
              <ol aria-label="Customize NA-AI Landing" className="space-y-6">
                {customizationSteps.map((step) => (
                  <li key={step.number} className="flex items-start gap-4">
                    <span aria-hidden="true" className={styles.stepNumber}>
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7 border-t border-border-subtle pt-4">
                <p className="text-xs leading-6 text-muted-foreground">
                  Built with the public PyColors UI and Tokens packages.
                </p>
                <div className="mt-1 flex flex-wrap gap-x-5">
                  <Link href="/ui" className={styles.textLink}>
                    Explore PyColors UI{" "}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <Link href="/tools/theme-builder" className={styles.textLink}>
                    Open Theme Builder{" "}
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
                  title="What arrives after purchase."
                  description="The source project and setup documentation, delivered as a ZIP you can run and customize locally."
                  className="mb-0"
                />
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="rounded-[5px] bg-background text-xs"
                  >
                    Full source code
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-[5px] bg-background text-xs"
                  >
                    Setup documentation
                  </Badge>
                </div>
              </div>
              <ol aria-label="Template delivery steps" className="space-y-5">
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
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium">{step.title}</h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        {step.text}
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
                Read the setup guide
              </Link>
              <Link href="/orders/recover" className={styles.textLink}>
                Recover a purchase{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <Link href="/orders/support" className={styles.textLink}>
                Purchase support{" "}
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
            title="Questions before buying"
            description="Make the scope clear before purchase."
            items={faqs}
          />
          <div className="mt-6 flex flex-wrap justify-end gap-x-5">
            <Link href="/license" className={styles.textLink}>
              Read the license{" "}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link href="/terms" className={styles.textLink}>
              Read purchase terms{" "}
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
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Make the page your own.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              NA-AI Landing · Full source code · {PRODUCT.price} one-time
              payment.
            </p>
            <Link href="/templates" className={cn("mt-2", styles.textLink)}>
              Back to templates{" "}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="w-full lg:w-auto lg:min-w-64">
            <BuyProductButton
              productSlug={PRODUCT.slug}
              label={`Buy NA-AI Landing — ${PRODUCT.price}`}
              loadingLabel="Opening checkout…"
              className="shadow-none hover:shadow-none"
            />
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Source ZIP and setup docs. Your hosting and services are separate.
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
