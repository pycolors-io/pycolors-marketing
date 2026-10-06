import Link from "next/link";
import {
  DIGITAL_REFUND_SUMMARY,
  PURCHASE_SUPPORT_SUMMARY,
} from "@/lib/products/commercial-policy";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, ExternalLink } from "lucide-react";
import { Badge, Button, cn } from "@pycolors/ui";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { JsonLd, generateProductOfferJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingFaq } from "@/components/marketing/faq";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { PricingComparisonTable } from "@/components/pricing/pricing-comparison-table";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { BuyProductButton } from "@/components/pricing/buy-product-button";

export const metadata: Metadata = {
  title: "Next.js SaaS Pricing",
  description:
    "Compare PyColors products for modern Next.js SaaS applications: premium templates, Starter Free for UX validation, and Starter Pro with Auth.js, secure Stripe checkout, Prisma, purchase recovery, and production-ready foundations.",
  alternates: {
    canonical: "/pricing",
  },

  openGraph: {
    title: "Next.js SaaS Pricing",
    description:
      "Compare templates, Starter Free, and Starter Pro for modern Next.js SaaS products with auth, secure checkout, purchase recovery, dashboards, and production-ready architecture.",
    url: "/pricing",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Pricing",
    description:
      "Compare PyColors products for building and launching modern SaaS applications faster.",
    images: ["/seo/twitter-main.png"],
  },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

const INTERNAL = {
  buildVsBuy: "/compare/build-vs-buy",
  templateNaAi: "/templates/na-ai-landing",
  starterFree: "/starters/free",
  starterPro: "/starters/pro",
  docsStarterPro: "/docs/starter-pro",
  license: "/license",
  terms: "/terms",
} as const;

const EXTERNAL = { starterDemo: "https://starter-demo.pycolors.io" } as const;

const PRICING = {
  naAiLanding: PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
  starterFree: STARTER_FREE_PRICE_LABEL,
  starterProLaunch: PRODUCT_DISPLAY["starter-pro"].priceLabel,
  starterProRegular: PRODUCT_DISPLAY["starter-pro"].regularPriceLabel,
} as const;

const pricingJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    generateProductOfferJsonLd({
      product: PRODUCT_DISPLAY["starter-pro"],
      canonicalPath: "/starters/pro",
      description:
        "Production-ready Next.js SaaS starter with authentication, Stripe billing, Prisma, PostgreSQL, protected routes, and launch-ready SaaS architecture.",
    }),
    generateProductOfferJsonLd({
      product: PRODUCT_DISPLAY["na-ai-landing"],
      canonicalPath: "/templates/na-ai-landing",
      description:
        "Premium AI and SaaS landing page template built for modern Next.js product launches.",
    }),
  ],
};

// Existing public Starter Pro captures; provenance and scope are recorded in the PR.
const starterProScreenshots = [
  {
    src: "/images/starters/pro/auth-pycolors.png",
    width: 3456,
    height: 1928,
    title: "Sign-in screen",
    alt: "Starter Pro sign-in screen with email, password, Google and GitHub options",
    caption:
      "Start with an account entry screen: email and password fields, provider buttons, and a password recovery link.",
  },
  {
    src: "/images/starters/pro/pwa-pycolors.png",
    width: 3456,
    height: 1926,
    title: "Offline fallback",
    alt: "Starter Pro offline screen with reload and dashboard links",
    caption:
      "Give users a clear fallback when their connection drops, with a message and navigation back to the application.",
  },
] as const;

const offers = [
  {
    id: "na-ai-landing",
    name: "NA-AI Landing",
    category: "Launch a landing page",
    description:
      "A focused AI/SaaS marketing template to present your product and validate your offer.",
    price: PRICING.naAiLanding,
    payment: "One-time payment",
    features: [
      "Full landing page source code",
      "Next.js, React and Tailwind CSS",
      "Responsive marketing sections",
      "SEO-ready frontend page",
      "Commercial usage rights",
    ],
    scope: "Frontend template. No auth, billing or database integration.",
    href: INTERNAL.templateNaAi,
    link: "Explore NA-AI Landing",
  },
  {
    id: "starter-free",
    name: "Starter Free",
    category: "Validate your app idea",
    description:
      "A runnable SaaS frontend to explore dashboards, settings and product workflows.",
    price: PRICING.starterFree,
    payment: "Public repository",
    features: [
      "Full SaaS frontend source code",
      "Next.js, React and Tailwind CSS",
      "Dashboard and settings screens",
      "Mocked auth and billing flows",
      "Responsive app layouts",
    ],
    scope: "Demo data and mocked flows. Add your own backend integrations.",
    href: INTERNAL.starterFree,
    link: "Explore Starter Free",
  },
  {
    id: "starter-pro",
    name: "Starter Pro",
    category: "Build your SaaS business",
    description:
      "A SaaS foundation with authentication, payments and database integrations to build on.",
    price: PRICING.starterProLaunch,
    payment: "One-time payment · Launch price",
    features: [
      "Full Starter Pro source code",
      "Auth.js credentials and OAuth",
      "Stripe Checkout and billing portal",
      "Prisma + PostgreSQL foundations",
      "Email and installable PWA foundations",
    ],
    scope:
      "Configure your services, validate integrations and deploy your app.",
    href: INTERNAL.starterPro,
    link: "Explore Starter Pro",
  },
] as const;

const faqs = [
  {
    question: "Should I buy NA-AI Landing or Starter Pro?",
    answer:
      "Choose NA-AI Landing when you need a polished frontend marketing page. Choose Starter Pro when you need real authentication, Stripe billing, protected routes, database foundations, and SaaS app wiring.",
  },
  {
    question: "Is NA-AI Landing a full SaaS app?",
    answer:
      "No. NA-AI Landing is a frontend marketing template. It focuses on the public landing page, not authentication, billing, database, or backend logic.",
  },
  {
    question: "Is Starter Pro production-ready?",
    answer:
      "Yes. Starter Pro is designed as a real SaaS foundation with authentication, secure Stripe checkout, protected app architecture, database foundations, purchase recovery, and commercial product surfaces already wired.",
  },
  {
    question: "Why should I buy Starter Pro instead of building it myself?",
    answer: (
      <>
        Because auth, billing, protected routes, account flows, webhook
        synchronization, and delivery/recovery flows are repeated work that can
        delay launch. Starter Pro helps you skip that foundation work and focus
        on your product. For the longer version, read the{" "}
        <Link
          href={INTERNAL.buildVsBuy}
          className="font-medium text-foreground underline underline-offset-4"
        >
          build vs buy comparison
        </Link>
        .
      </>
    ),
  },
  {
    question: "Can I use PyColors products for commercial projects?",
    answer:
      "Yes. NA-AI Landing and Starter Pro permit unlimited end products under their respective licenses. Starter Pro covers one licensed individual or legal entity; a client needs their own license to access the Starter Pro source. Open-source packages follow their repository licenses.",
  },
  {
    question: "How do I receive access after purchase?",
    answer:
      "After payment is confirmed and the order is processed, PyColors sends an access link to the checkout email. The confirmation page guides you through the next steps; payment confirmation and inbox delivery are separate steps.",
  },
  {
    question: "What if I do not receive the access email?",
    answer:
      "Use the purchase recovery page with the same email address used at checkout. PyColors can resend the access link for eligible orders.",
  },
  {
    question: "Do I get future Starter Pro updates?",
    answer:
      "Yes. Your one-time Starter Pro purchase includes future product releases. Major changes follow semantic versioning, with release notes in the changelog and docs.",
  },
  {
    question: "What support is included with Starter Pro?",
    answer: PURCHASE_SUPPORT_SUMMARY,
  },
  {
    question: "What if Starter Pro setup fails locally?",
    answer:
      "Start with Getting Started and the environment variable docs. Check Node.js version, dependencies, database connection, and Stripe test keys first. Email support can help with eligible setup issues.",
  },
  {
    question: "What is the refund policy?",
    answer: DIGITAL_REFUND_SUMMARY,
  },
  {
    question: `Will the Starter Pro price stay at ${PRICING.starterProLaunch}?`,
    answer: `No. ${PRICING.starterProLaunch} is the current launch price. The regular price is planned at ${PRICING.starterProRegular} as the product matures and more production features are added.`,
  },
] as const;

export default function PricingPage() {
  return (
    <Container className="pb-12 pt-20 sm:pb-16 sm:pt-24">
      <JsonLd id="pricing-products-jsonld" data={pricingJsonLd} />
      <div className="mx-auto max-w-6xl">
        <PageHero
          variant="compact"
          maxWidth="4xl"
          badges={[{ label: "Pricing", variant: "outline" }]}
          title="Choose your starting point."
          description="Launch a landing page, validate a SaaS interface, or build on a connected app foundation. Compare what each PyColors product includes."
          className="pb-10 sm:pb-12"
        />

        <nav
          aria-label="Pricing sections"
          className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 border-y border-border-subtle py-3 text-sm"
        >
          {[
            ["#pricing-offers", "Products"],
            ["#pricing-comparison", "Compare features"],
            ["#pricing-preview", "Product preview"],
            ["#pricing-faq", "FAQ"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={cn(
                "inline-flex min-h-9 items-center text-muted-foreground hover:text-foreground",
                focusRing,
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <section
          id="pricing-offers"
          aria-label="Choose a PyColors product"
          className="scroll-mt-24"
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {offers.map((offer) => (
              <article
                key={offer.id}
                aria-labelledby={`${offer.id}-heading`}
                className={cn(
                  "flex min-w-0 flex-col rounded-[5px] border bg-surface p-6 sm:p-7",
                  offer.id === "starter-pro"
                    ? "border-pro-border bg-pro-surface"
                    : "border-border-subtle",
                )}
              >
                <div className="flex min-h-6 items-center justify-between gap-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    {offer.category}
                  </p>
                  {offer.id === "starter-pro" && (
                    <Badge
                      variant="outline"
                      className="rounded-[5px] border-pro-border text-xs"
                    >
                      Pro
                    </Badge>
                  )}
                </div>
                <h2
                  id={`${offer.id}-heading`}
                  className="mt-4 font-brand text-2xl font-semibold tracking-tight"
                >
                  {offer.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground lg:min-h-18">
                  {offer.description}
                </p>
                <div className="mt-6">
                  <p className="font-brand text-4xl font-semibold tracking-tight">
                    {offer.price}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {offer.payment}
                  </p>
                </div>
                <div className="mt-6">
                  {offer.id === "starter-pro" ? (
                    <BuyStarterProButton
                      label={`Buy Starter Pro — ${PRICING.starterProLaunch}`}
                    />
                  ) : offer.id === "na-ai-landing" ? (
                    <BuyProductButton
                      productSlug="na-ai-landing"
                      label={`Buy NA-AI Landing — ${PRICING.naAiLanding}`}
                      variant="outline"
                      fullWidth
                    />
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      className="min-h-11 w-full rounded-[5px] text-sm"
                    >
                      <Link href={INTERNAL.starterFree}>
                        Open Starter Free
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  )}
                </div>
                <div className="mt-6 flex-1 border-t border-border-subtle pt-6">
                  <p className="text-xs font-semibold text-foreground">
                    What you get
                  </p>
                  <ul className="mt-4 space-y-3">
                    {offer.features.map((feature) => (
                      <MarketingCheckItem key={feature}>
                        {feature}
                      </MarketingCheckItem>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 border-t border-border-subtle pt-5 text-xs leading-6 text-muted-foreground lg:min-h-18">
                  {offer.scope}
                </p>
                <Link
                  href={offer.href}
                  className={cn(
                    "mt-3 inline-flex min-h-11 items-center gap-2 self-start text-sm font-medium hover:underline underline-offset-4",
                    focusRing,
                  )}
                >
                  {offer.link}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 text-xs leading-6 text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Paid products are one-time purchases. Starter Pro is currently{" "}
              {PRICING.starterProLaunch}; regular price planned at{" "}
              {PRICING.starterProRegular}.
            </p>
            <a
              href="#pricing-comparison"
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center gap-2 font-medium text-foreground hover:underline underline-offset-4",
                focusRing,
              )}
            >
              Compare every feature
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <MarketingSectionShell
          id="pricing-comparison"
          width="full"
          className="scroll-mt-20"
          aria-labelledby="pricing-comparison-heading"
        >
          <MarketingSectionHeader
            titleId="pricing-comparison-heading"
            eyebrow="Side by side"
            title="What’s included in each product"
            description="The same criteria for every offer, with demo screens and integrated foundations clearly identified."
          />
          <PricingComparisonTable />
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href={INTERNAL.buildVsBuy}
              className={cn(
                "inline-flex min-h-11 items-center underline underline-offset-4",
                focusRing,
              )}
            >
              Compare building vs buying
            </Link>
            <Link
              href={INTERNAL.docsStarterPro}
              className={cn(
                "inline-flex min-h-11 items-center underline underline-offset-4",
                focusRing,
              )}
            >
              Read Starter Pro docs
            </Link>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="pricing-preview"
          width="full"
          className="scroll-mt-20 border-t border-border-subtle"
          aria-labelledby="pricing-product-preview-heading"
        >
          <MarketingSectionHeader
            titleId="pricing-product-preview-heading"
            eyebrow="Inside Starter Pro"
            title="See the screens you can build on"
            description="Existing Starter Pro interface captures, shown in the light theme. These previews show included screens, not proof of a live deployment, a completed payment, or a verified integration."
            action={
              <Button
                asChild
                variant="outline"
                className="min-h-11 rounded-[5px]"
              >
                <a
                  href={EXTERNAL.starterDemo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Try the live demo
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            }
          />
          <div className="grid gap-6 md:grid-cols-2">
            {starterProScreenshots.map((screenshot) => (
              <figure key={screenshot.src} className="min-w-0 space-y-4">
                <a
                  href={screenshot.src}
                  aria-label={`View ${screenshot.title.toLowerCase()} screenshot at full size`}
                  className={cn(
                    "block overflow-hidden rounded-[5px] border border-border-subtle bg-surface",
                    focusRing,
                  )}
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    sizes="(min-width: 1280px) 564px, (min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                </a>
                <figcaption className="space-y-2">
                  <h3 className="text-base font-semibold text-foreground">
                    {screenshot.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {screenshot.caption}
                  </p>
                  <a
                    href={screenshot.src}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-[5px] text-sm font-medium text-foreground underline underline-offset-4",
                      focusRing,
                    )}
                  >
                    View {screenshot.title.toLowerCase()} at full size
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="pricing-faq"
          width="full"
          className="scroll-mt-20 border-t border-border-subtle"
          aria-labelledby="pricing-faq-heading"
        >
          <MarketingFaq
            titleId="pricing-faq-heading"
            eyebrow="Before you choose"
            title="Your questions, answered."
            description="Product fit, purchase access, updates and support."
            items={faqs}
          />
        </MarketingSectionShell>

        <section
          aria-labelledby="pricing-help-heading"
          className="flex flex-col gap-6 border-t border-border-subtle py-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2
              id="pricing-help-heading"
              className="text-lg font-semibold tracking-tight"
            >
              Still deciding where to start?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Explore the free frontend or try the demo before choosing your
              foundation.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="min-h-11 shrink-0 rounded-[5px]"
          >
            <Link href={INTERNAL.starterFree}>
              Explore Starter Free
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </section>
        <p className="border-t border-border-subtle pt-6 text-xs leading-6 text-muted-foreground">
          Legal scope and usage terms are governed by{" "}
          <Link
            href={INTERNAL.license}
            className={cn("underline underline-offset-4", focusRing)}
          >
            the license
          </Link>{" "}
          and{" "}
          <Link
            href={INTERNAL.terms}
            className={cn("underline underline-offset-4", focusRing)}
          >
            terms
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}
