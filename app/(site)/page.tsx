import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@pycolors/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { SaasShowcase } from "@/components/marketing/showcase/saas-showcase";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { UI_VERSION } from "@/lib/version";
import { getUiExplorerUrl } from "@/lib/docs/ui-explorer";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";

export const metadata: Metadata = {
  title: {
    absolute: "Next.js SaaS UI System, Templates & Starters · PyColors",
  },
  description:
    "PyColors helps developers build and launch modern Next.js SaaS products faster with premium templates, a production-ready UI system, Starter Free, and Starter Pro with Auth.js, Prisma, Stripe commerce, secure delivery, purchase recovery, and SaaS architecture.",
  alternates: {
    canonical: "https://pycolors.io",
  },

  openGraph: {
    title: "Next.js SaaS UI System, Templates & Starters · PyColors",

    description:
      "Production-ready Next.js SaaS foundations including premium templates, UI systems, Starter Free, and Starter Pro with authentication, Stripe commerce, Prisma, secure delivery, purchase recovery, and protected app architecture.",
    url: "https://pycolors.io",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS UI System, Templates & Starters · PyColors",
    description:
      "Build modern SaaS products faster with premium templates, a production-ready UI system, Starter Free, and Starter Pro commerce foundations.",
    images: ["/seo/twitter-main.png"],
  },
};

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center gap-2 rounded-[3px] py-2 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

const starterPro = PRODUCT_DISPLAY["starter-pro"];
const starterDemo = "https://starter-demo.pycolors.io";

const startingPoints = [
  {
    product: "Templates",
    situation: "You need a focused landing page.",
    value:
      "An editable frontend for presenting and validating your SaaS offer.",
    detail: PRODUCT_DISPLAY["na-ai-landing"].name,
    href: "/templates/na-ai-landing",
    action: "View NA-AI template",
  },
  {
    product: "PyColors UI",
    situation: "You already have an application.",
    value:
      "Public components and semantic tokens for building consistent custom screens.",
    detail: "Public UI foundation",
    href: "/ui",
    action: "Explore PyColors UI",
  },
  {
    product: "Blocks",
    situation: "You need a complete interface section.",
    value:
      "Inspect source-backed patterns and copy the section into your application.",
    detail: "Public, copyable sections",
    href: "/blocks",
    action: "Explore Blocks",
  },
  {
    product: "PyColors Starter Free",
    situation: "You want to evaluate a full SaaS surface.",
    value: "Run the mocked frontend before connecting your own infrastructure.",
    detail: "Runnable application UX",
    href: "/starters/free",
    action: "Explore Starter Free",
  },
  {
    product: starterPro.name,
    situation: "You need the documented infrastructure foundation.",
    value:
      "Review auth, billing, database, email and PWA scope, including setup obligations.",
    detail: "Commercial SaaS foundation",
    href: "/starters/pro",
    action: "View Starter Pro",
  },
] as const;

const explorerLinks = [
  { family: "table", label: "Table states" },
  { family: "tabs", label: "Tab interactions" },
  { family: "empty-state", label: "Empty states" },
] as const;

export default function HomePage() {
  const breadcrumb = generateBreadcrumbJsonLd([{ label: "Home", href: "/" }]);

  return (
    <>
      <JsonLd id="home-breadcrumb" data={breadcrumb} />
      <Container className="pt-24 pb-8">
        <main id="content" tabIndex={-1} className="mx-auto w-full max-w-6xl">
          <PageHero
            maxWidth="5xl"
            align="left"
            className="px-0 py-4 sm:px-0 sm:py-4 lg:px-0 lg:py-4"
            contentClassName="mx-0"
            actionsClassName="mt-6"
            title="Ship credible SaaS products faster."
            description="A coherent React and Next.js foundation for developers building a SaaS. Explore a working interface, then choose the starting point your project needs."
            actions={
              <MarketingActionGroup className="w-full">
                <MarketingLinkButton className="motion-reduce:transition-none">
                  <a href="#start-with-pycolors">
                    Choose your starting point
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </a>
                </MarketingLinkButton>
                <MarketingLinkButton
                  variant="outline"
                  className="motion-reduce:transition-none"
                >
                  <Link href="/starters/free">Explore Starter Free</Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
            }
          />

          <SaasShowcase />
          <div className="flex flex-col gap-3 pb-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted-foreground">
              Built with public @pycolors/ui v{UI_VERSION}.
            </p>
            <nav
              aria-label="Explore the showcase primitives"
              className="flex flex-wrap gap-x-5 gap-y-1"
            >
              {explorerLinks.map(({ family, label }) => (
                <a
                  key={family}
                  href={getUiExplorerUrl(["ui", family])}
                  className={linkClass}
                >
                  {label}
                  <ExternalLink
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>
          </div>

          <MarketingSectionShell
            id="start-with-pycolors"
            spacing="compact"
            width="full"
            aria-labelledby="home-start-heading"
            className="scroll-mt-24 border-t border-border-subtle"
          >
            <MarketingSectionHeader
              titleId="home-start-heading"
              eyebrow="Choose your starting point"
              title="Start with what your project needs now."
              description="Enter at any layer. Each shares the same UI foundation; you do not need to begin with a template or buy a starter."
              align="left"
            />
            <ol
              aria-label="PyColors starting points"
              className="divide-y divide-border-subtle border-y border-border-subtle"
            >
              {startingPoints.map((point, index) => (
                <li
                  key={point.product}
                  className="grid gap-5 py-7 lg:grid-cols-[1fr_1.2fr_auto] lg:items-center lg:gap-10"
                >
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="pt-0.5 font-mono text-xs text-muted-foreground"
                    >
                      0{index + 1}
                    </span>
                    <p className="max-w-xs text-sm font-medium leading-6">
                      {point.situation}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {point.product}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {point.detail}
                    </p>
                    <p className="max-w-md text-sm leading-6 text-muted-foreground">
                      {point.value}
                    </p>
                  </div>
                  <Link
                    href={point.href}
                    className={cn(
                      linkClass,
                      "justify-self-start lg:justify-self-end",
                    )}
                  >
                    {point.action}
                    <ArrowRight
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="what-you-get"
            spacing="compact"
            width="full"
            aria-labelledby="home-foundations-heading"
            className="scroll-mt-24"
          >
            <MarketingSectionHeader
              titleId="home-foundations-heading"
              eyebrow="Inspect the foundation"
              title="From the interface to your implementation."
              description="The workspace shows public primitives in context. Inspect their behavior in the UI Explorer; use the documentation for installation, composition and integration."
              align="left"
            />
            <div className="grid gap-8 border-y border-border-subtle py-7 lg:grid-cols-3 lg:gap-10">
              <div>
                <h3 className="font-semibold">Components and states</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Review the APIs and keyboard behavior behind the table,
                  filters and empty state.
                </p>
                <ul className="mt-3">
                  <li>
                    <Link className={linkClass} href="/docs/ui/installation">
                      Read the installation guide
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/docs/ui/accessibility">
                      Read accessibility guidance
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/docs/ui/storybook">
                      Use the UI Explorer
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Tokens and themes</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  The same semantic tokens support this page in light and dark.
                  Adapt them to your product.
                </p>
                <ul className="mt-3">
                  <li>
                    <Link className={linkClass} href="/docs/ui/theming">
                      See theming documentation
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/tools/theme-builder">
                      Open Theme Builder
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Product composition</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Combine primitives into your own screens, or inspect the
                  available Starter Free application.
                </p>
                <ul className="mt-3">
                  <li>
                    <Link className={linkClass} href="/docs/ui/composition">
                      Read composition guidance
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/ui/patterns">
                      Explore UI patterns
                    </Link>
                  </li>
                  <li>
                    <Link className={linkClass} href="/ui/examples">
                      Inspect available examples
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            width="full"
            aria-labelledby="home-production-heading"
          >
            <MarketingSectionHeader
              titleId="home-production-heading"
              eyebrow="From evaluation to implementation"
              title="Choose the infrastructure your project needs."
              description="Starter Free demonstrates application UX with mock data. Starter Pro supplies the documented infrastructure foundation; your project still needs configuration, integration and production checks."
              align="left"
            />
            <div className="grid overflow-hidden rounded-[5px] border border-border-subtle bg-surface lg:grid-cols-2">
              <div className="p-5 sm:p-8">
                <h3 className="text-xl font-semibold">PyColors Starter Free</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Inspect auth UX, dashboards, projects, settings, billing
                  surfaces and admin flows. Authentication, payments and data
                  are mocked.
                </p>
                <div className="mt-5 flex flex-col items-start">
                  <a className={linkClass} href={starterDemo}>
                    Open the Starter Free demo
                    <ExternalLink
                      className="size-4 shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                  <Link className={linkClass} href="/docs/starter/installation">
                    Install Starter Free
                  </Link>
                  <Link className={linkClass} href="/docs/starter/upgrade">
                    Compare the upgrade scope
                  </Link>
                </div>
              </div>
              <div className="border-t border-border-subtle bg-pro-surface p-5 sm:p-8 lg:border-t-0 lg:border-l">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold">{starterPro.name}</h3>
                  <p className="font-mono text-xl font-medium">
                    {starterPro.priceLabel}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Auth.js, Prisma/PostgreSQL, Stripe billing, transactional
                  email, protected routes and PWA foundations. Review included
                  scope and setup before buying.
                </p>
                <div className="mt-5">
                  <BuyStarterProButton
                    fullWidth={false}
                    label={`Buy Starter Pro — ${starterPro.priceLabel}`}
                    className="h-auto min-h-11 max-w-full whitespace-normal py-2.5 motion-reduce:transition-none"
                  />
                </div>
                <div className="mt-4 flex flex-col items-start">
                  <Link
                    className={linkClass}
                    href="/docs/starter-pro/what-is-included"
                  >
                    Review what is included
                  </Link>
                  <Link
                    className={linkClass}
                    href="/docs/starter-pro/getting-started"
                  >
                    Read the setup requirements
                  </Link>
                  <Link className={linkClass} href="/docs/starter-pro/delivery">
                    Understand purchase and delivery
                  </Link>
                  <Link className={linkClass} href="/pricing">
                    Compare product pricing
                  </Link>
                </div>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            width="full"
            aria-labelledby="home-trust-heading"
          >
            <MarketingSectionHeader
              titleId="home-trust-heading"
              eyebrow="Engineering and trust"
              title="Inspect the project before you commit."
              description="Check maintenance, source, commercial terms and support alongside the product scope."
              align="left"
            />
            <ul className="flex flex-wrap gap-x-8 gap-y-2 border-y border-border-subtle py-5">
              {(
                [
                  ["Public roadmap", "/roadmap"],
                  ["Changelog", "/changelog"],
                  ["Open source", "/open-source"],
                  ["License", "/license"],
                  ["Terms", "/terms"],
                  ["Privacy", "/privacy"],
                  ["Purchase support", "/orders/support"],
                ] as const
              ).map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            width="full"
            aria-labelledby="home-next-heading"
          >
            <MarketingCtaPanel
              titleId="home-next-heading"
              title="Choose the foundation for your next step."
              description="Start with the layer that fits your current project. If infrastructure is the blocker, review Starter Pro’s scope and setup."
              actions={
                <MarketingActionGroup>
                  <MarketingLinkButton className="motion-reduce:transition-none">
                    <a href="#start-with-pycolors">
                      Choose your starting point
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                  </MarketingLinkButton>
                  <MarketingLinkButton
                    variant="outline"
                    className="motion-reduce:transition-none"
                  >
                    <Link href="/starters/pro">View Starter Pro</Link>
                  </MarketingLinkButton>
                </MarketingActionGroup>
              }
            />
          </MarketingSectionShell>
        </main>
      </Container>
    </>
  );
}
