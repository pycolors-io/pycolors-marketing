import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Box,
  Code2,
  ExternalLink,
  Layers3,
  LayoutTemplate,
  Package,
  Palette,
  PanelsTopLeft,
  Server,
} from "lucide-react";
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

function ResourceLink({
  href,
  children,
}: Readonly<{ href: string; children: string }>) {
  return (
    <Link
      href={href}
      className="group/resource flex min-h-12 w-full items-center justify-between gap-3 rounded-md px-2.5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      <span className="min-w-0">{children}</span>
      <span
        aria-hidden="true"
        className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-background text-muted-foreground transition-colors group-hover/resource:border-border group-hover/resource:text-foreground motion-reduce:transition-none"
      >
        <ArrowUpRight className="size-3.5 transition-transform group-hover/resource:-translate-y-0.5 group-hover/resource:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
      </span>
    </Link>
  );
}

const sectionHeaderClass =
  "mb-10 [&_h2]:max-w-2xl [&_h2]:text-3xl [&_h2]:tracking-[-0.035em] sm:[&_h2]:text-4xl [&_p]:max-w-2xl [&_[data-slot=badge]]:rounded-none [&_[data-slot=badge]]:border-0 [&_[data-slot=badge]]:bg-transparent [&_[data-slot=badge]]:px-0 [&_[data-slot=badge]]:text-muted-foreground";

const starterPro = PRODUCT_DISPLAY["starter-pro"];
const starterDemo = "https://starter-demo.pycolors.io";

const startingPoints = [
  {
    product: "Templates",
    icon: LayoutTemplate,
    situation: "You need a focused landing page.",
    value:
      "An editable frontend for presenting and validating your SaaS offer.",
    detail: PRODUCT_DISPLAY["na-ai-landing"].name,
    href: "/templates/na-ai-landing",
    action: "View NA-AI template",
  },
  {
    product: "PyColors UI",
    icon: Box,
    situation: "You already have an application.",
    value:
      "Public components and semantic tokens for building consistent custom screens.",
    detail: "Public UI foundation",
    href: "/ui",
    action: "Explore PyColors UI",
  },
  {
    product: "Blocks",
    icon: Blocks,
    situation: "You need a complete interface section.",
    value:
      "Inspect source-backed patterns and copy the section into your application.",
    detail: "Public, copyable sections",
    href: "/blocks",
    action: "Explore Blocks",
  },
  {
    product: "PyColors Starter Free",
    icon: PanelsTopLeft,
    situation: "You want to evaluate a full SaaS surface.",
    value: "Run the mocked frontend before connecting your own infrastructure.",
    detail: "Runnable application UX",
    href: "/starters/free",
    action: "Explore Starter Free",
  },
  {
    product: starterPro.name,
    icon: Server,
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

const trustLinks = [
  ["Public roadmap", "/roadmap"],
  ["Changelog", "/changelog"],
  ["Open source", "/open-source"],
  ["License", "/license"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Purchase support", "/orders/support"],
] as const;

export default function HomePage() {
  const breadcrumb = generateBreadcrumbJsonLd([{ label: "Home", href: "/" }]);

  return (
    <>
      <JsonLd id="home-breadcrumb" data={breadcrumb} />
      <Container className="pt-24 pb-8 lg:px-8">
        <main id="content" tabIndex={-1} className="mx-auto w-full max-w-6xl">
          <PageHero
            maxWidth="4xl"
            align="center"
            className="px-0 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
            badges={[
              {
                label: `npm · @pycolors/ui v${UI_VERSION}`,
                icon: <Package className="size-3.5" aria-hidden="true" />,
              },
            ]}
            actionsClassName="mt-7"
            title="Ship credible SaaS products faster."
            description="A coherent React and Next.js foundation for developers building a SaaS. Explore a working interface, then choose the starting point your project needs."
            actions={
              <MarketingActionGroup align="center" className="w-full">
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
              Built with public{" "}
              <a
                href="https://www.npmjs.com/package/@pycolors/ui"
                className="rounded-sm underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                @pycolors/ui v{UI_VERSION}
              </a>
              .
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
            spacing="default"
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
              className={sectionHeaderClass}
            />
            <ol
              aria-label="PyColors starting points"
              className="divide-y divide-border-subtle overflow-hidden rounded-lg border border-border-subtle bg-surface"
            >
              {startingPoints.map(({ icon: Icon, ...point }, index) => (
                <li
                  key={point.product}
                  className={cn(
                    "group grid gap-5 p-6 transition-colors hover:bg-surface-muted/40 motion-reduce:transition-none sm:p-8 lg:grid-cols-[1fr_1.15fr_13rem] lg:items-center lg:gap-8",
                    point.href === "/starters/pro" && "bg-pro-surface/40",
                  )}
                >
                  <div className="flex items-center gap-5">
                    <span
                      aria-hidden="true"
                      className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-background text-muted-foreground"
                    >
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div className="space-y-2">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[11px] text-muted-foreground"
                      >
                        0{index + 1}
                      </span>
                      <p className="max-w-xs text-sm font-medium leading-6">
                        {point.situation}
                      </p>
                    </div>
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
                      "justify-between justify-self-start gap-4 no-underline lg:w-full",
                    )}
                  >
                    {point.action}
                    <ArrowRight
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="what-you-get"
            spacing="default"
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
              className={sectionHeaderClass}
            />
            <div className="grid divide-y divide-border-subtle overflow-hidden rounded-lg border border-border-subtle bg-surface lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              <div className="flex flex-col p-6 sm:p-8">
                <Code2
                  className="mb-8 size-6 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold tracking-tight">
                  Components and states
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground lg:min-h-18">
                  Review the APIs and keyboard behavior behind the table,
                  filters and empty state.
                </p>
                <ul className="mt-6 divide-y divide-border-subtle">
                  <li>
                    <ResourceLink href="/docs/ui/installation">
                      Read the installation guide
                    </ResourceLink>
                  </li>
                  <li>
                    <ResourceLink href="/docs/ui/accessibility">
                      Read accessibility guidance
                    </ResourceLink>
                  </li>
                  <li>
                    <ResourceLink href="/docs/ui/storybook">
                      Use the UI Explorer
                    </ResourceLink>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <Palette
                  className="mb-8 size-6 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold tracking-tight">
                  Tokens and themes
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground lg:min-h-18">
                  The same semantic tokens support this page in light and dark.
                  Adapt them to your product.
                </p>
                <ul className="mt-6 divide-y divide-border-subtle">
                  <li>
                    <ResourceLink href="/docs/ui/theming">
                      See theming documentation
                    </ResourceLink>
                  </li>
                  <li>
                    <ResourceLink href="/tools/theme-builder">
                      Open Theme Builder
                    </ResourceLink>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <Layers3
                  className="mb-8 size-6 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-lg font-semibold tracking-tight">
                  Product composition
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground lg:min-h-18">
                  Combine primitives into your own screens, or inspect the
                  available Starter Free application.
                </p>
                <ul className="mt-6 divide-y divide-border-subtle">
                  <li>
                    <ResourceLink href="/docs/ui/composition">
                      Read composition guidance
                    </ResourceLink>
                  </li>
                  <li>
                    <ResourceLink href="/ui/patterns">
                      Explore UI patterns
                    </ResourceLink>
                  </li>
                  <li>
                    <ResourceLink href="/ui/examples">
                      Inspect available examples
                    </ResourceLink>
                  </li>
                </ul>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="default"
            width="full"
            aria-labelledby="home-production-heading"
          >
            <MarketingSectionHeader
              titleId="home-production-heading"
              eyebrow="From evaluation to implementation"
              title="Choose the infrastructure your project needs."
              description="Starter Free demonstrates application UX with mock data. Starter Pro supplies the documented infrastructure foundation; your project still needs configuration, integration and production checks."
              align="left"
              className={sectionHeaderClass}
            />
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="flex flex-col rounded-lg border border-border-subtle bg-surface p-6 sm:p-9">
                <PanelsTopLeft
                  className="mb-8 size-7 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="text-2xl font-semibold tracking-tight">
                  PyColors Starter Free
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground lg:min-h-21">
                  Inspect auth UX, dashboards, projects, settings, billing
                  surfaces and admin flows. Authentication, payments and data
                  are mocked.
                </p>
                <div className="mt-7">
                  <MarketingLinkButton
                    variant="outline"
                    className="w-full motion-reduce:transition-none"
                  >
                    <a href={starterDemo}>
                      Open the Starter Free demo
                      <ExternalLink
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  </MarketingLinkButton>
                </div>
                <div className="mt-7 divide-y divide-border-subtle border-t border-border-subtle pt-2">
                  <ResourceLink href="/docs/starter/installation">
                    Install Starter Free
                  </ResourceLink>
                  <ResourceLink href="/docs/starter/upgrade">
                    Compare the upgrade scope
                  </ResourceLink>
                </div>
              </div>
              <div className="flex flex-col rounded-lg border border-pro-border-subtle bg-pro-surface/50 p-6 sm:p-9">
                <Server
                  className="mb-8 size-7 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {starterPro.name}
                  </h3>
                  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-mono text-2xl font-medium tracking-tight">
                      {starterPro.priceLabel}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Launch price
                    </span>
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground lg:min-h-21">
                  Auth.js, Prisma/PostgreSQL, Stripe billing, transactional
                  email, protected routes and PWA foundations. Review included
                  scope and setup before buying.
                </p>
                <div className="mt-7">
                  <BuyStarterProButton
                    fullWidth
                    label={`Buy Starter Pro — ${starterPro.priceLabel}`}
                    className="h-auto min-h-11 max-w-full whitespace-normal rounded-[5px] py-2.5 motion-reduce:transition-none"
                  />
                </div>
                <div className="mt-7 divide-y divide-pro-border-subtle border-t border-pro-border-subtle pt-2">
                  <ResourceLink href="/docs/starter-pro/what-is-included">
                    Review what is included
                  </ResourceLink>
                  <ResourceLink href="/docs/starter-pro/getting-started">
                    Read the setup requirements
                  </ResourceLink>
                  <ResourceLink href="/docs/starter-pro/delivery">
                    Understand purchase and delivery
                  </ResourceLink>
                  <ResourceLink href="/pricing">
                    Compare product pricing
                  </ResourceLink>
                </div>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="default"
            width="full"
            aria-labelledby="home-trust-heading"
          >
            <MarketingSectionHeader
              titleId="home-trust-heading"
              eyebrow="Engineering and trust"
              title="Inspect the project before you commit."
              description="Check maintenance, source, commercial terms and support alongside the product scope."
              align="left"
              className={cn(sectionHeaderClass, "mb-4")}
            />
            <ul className="flex flex-wrap gap-x-6">
              {trustLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      linkClass,
                      "text-muted-foreground decoration-transparent transition-colors hover:text-foreground hover:decoration-current",
                    )}
                  >
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
