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
  Check,
  Table2,
  MousePointer2,
  PanelTop,
} from "lucide-react";
import { Badge, cn } from "@pycolors/ui";
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
import styles from "@/components/marketing/home.module.css";

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

const sectionHeaderClass = cn(
  styles.sectionHeader,
  "mb-9 [&_h2]:max-w-2xl [&_h2]:text-3xl [&_h2]:tracking-[-0.04em] sm:[&_h2]:text-4xl [&_p]:max-w-2xl [&_[data-slot=badge]]:rounded-none [&_[data-slot=badge]]:border-0 [&_[data-slot=badge]]:bg-transparent [&_[data-slot=badge]]:px-0 [&_[data-slot=badge]]:text-muted-foreground",
);

const starterPro = PRODUCT_DISPLAY["starter-pro"];
const starterDemo = "https://starter-demo.pycolors.io";

const startingPoints = [
  {
    product: "Templates",
    icon: LayoutTemplate,
    situation: "Launch a focused landing page.",
    value: "Present your SaaS offer with an editable frontend.",
    detail: PRODUCT_DISPLAY["na-ai-landing"].name,
    href: "/templates/na-ai-landing",
    action: "View NA-AI template",
  },
  {
    product: "PyColors UI",
    icon: Box,
    situation: "Build inside your existing app.",
    value: "Compose custom screens with public components and semantic tokens.",
    detail: "Public UI foundation",
    href: "/ui",
    action: "Explore PyColors UI",
  },
  {
    product: "Blocks",
    icon: Blocks,
    situation: "Add a complete interface section.",
    value: "Inspect and copy reusable layouts into your application.",
    detail: "Public, copyable sections",
    href: "/blocks",
    action: "Explore Blocks",
  },
  {
    product: "PyColors Starter Free",
    icon: PanelsTopLeft,
    situation: "Explore the application experience.",
    value: "Run the SaaS frontend with mocked auth, payments and data.",
    detail: "Runnable application UX",
    href: "/starters/free",
    action: "Explore Starter Free",
  },
  {
    product: starterPro.name,
    icon: Server,
    situation: "Connect your application foundation.",
    value:
      "Start with auth, billing, database and email. Configure and validate for production.",
    detail: "Commercial SaaS foundation",
    href: "/starters/pro",
    action: "View Starter Pro",
  },
] as const;

const explorerLinks = [
  {
    family: "table",
    label: "Table states",
    description: "Rows, selection & status",
    icon: Table2,
  },
  {
    family: "tabs",
    label: "Tab interactions",
    description: "Filters & keyboard control",
    icon: MousePointer2,
  },
  {
    family: "empty-state",
    label: "Empty states",
    description: "Clear recovery actions",
    icon: PanelTop,
  },
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

function FoundationVisual({
  kind,
}: {
  kind: "components" | "tokens" | "composition";
}) {
  return (
    <div className={styles.foundationVisual} aria-hidden="true">
      {kind === "components" ? (
        <div className={styles.apiVisual}>
          <span>
            <Package className="size-4" /> @pycolors/ui
          </span>
          <div>
            {["Button", "Dialog", "Table"].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      ) : kind === "tokens" ? (
        <div className={styles.tokenVisual}>
          <div>
            {["background", "surface", "border", "primary"].map((token) => (
              <span key={token} data-token={token} />
            ))}
          </div>
          <span>One theme. Every surface.</span>
        </div>
      ) : (
        <div className={styles.compositionVisual}>
          <span>
            <Box className="size-3.5" /> Primitives
          </span>
          <span>
            <Blocks className="size-3.5" /> Blocks
          </span>
          <span>
            <PanelsTopLeft className="size-3.5" /> Applications
          </span>
        </div>
      )}
    </div>
  );
}

function StarterScope({ pro = false }: { pro?: boolean }) {
  const rows = pro
    ? [
        ["Interface", "Application foundation"],
        ["Services", "Auth, database, billing & email"],
        ["Next step", "Configure, integrate, validate"],
      ]
    : [
        ["Interface", "Runnable frontend"],
        ["Services", "Mock authentication, payments & data"],
        ["Next step", "Explore, customize, connect"],
      ];
  return (
    <dl className={styles.starterScope}>
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function HomePage() {
  const breadcrumb = generateBreadcrumbJsonLd([{ label: "Home", href: "/" }]);

  return (
    <>
      <JsonLd id="home-breadcrumb" data={breadcrumb} />
      <Container className={cn(styles.page, "pt-24 pb-8 lg:px-8")}>
        <main id="content" tabIndex={-1} className="mx-auto w-full max-w-6xl">
          <PageHero
            variant="compact"
            maxWidth="4xl"
            align="center"
            className={styles.hero}
            badges={[
              {
                label: `npm · @pycolors/ui v${UI_VERSION}`,
                icon: <Package className="size-3.5" aria-hidden="true" />,
              },
            ]}
            actionsClassName="mt-7"
            title="Ship credible SaaS products faster."
            description="UI components, reusable blocks and application starters. One shared design system for your next React and Next.js product."
            extra={
              <div className={styles.heroProof}>
                {[
                  "Public UI foundation",
                  "Source you can inspect",
                  "Free starting point",
                ].map((label) => (
                  <span key={label}>
                    <Check className="size-3.5" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            }
            extraClassName="mt-6"
            actions={
              <MarketingActionGroup align="center" className="w-full">
                <MarketingLinkButton className={styles.primaryAction}>
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

          <SaasShowcase
            className={styles.showcase}
            actions={
              <MarketingActionGroup className={styles.showcaseActions}>
                <MarketingLinkButton className={styles.primaryAction}>
                  <Link href="/ui">
                    Explore PyColors UI{" "}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </MarketingLinkButton>
                <Link
                  href="/docs/ui/installation"
                  className={styles.showcaseDocsLink}
                >
                  Read the docs{" "}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </MarketingActionGroup>
            }
            footer={
              <div className={styles.proofCaption}>
                <div className={styles.proofPackage}>
                  <p>Explore the building blocks.</p>
                  <a href="https://www.npmjs.com/package/@pycolors/ui">
                    <Package className="size-3.5" aria-hidden="true" />
                    @pycolors/ui <span>v{UI_VERSION}</span>
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </a>
                </div>
                <nav
                  aria-label="Explore the showcase primitives"
                  className={styles.proofLinks}
                >
                  {explorerLinks.map(
                    ({ family, label, description, icon: Icon }) => (
                      <a
                        key={family}
                        href={getUiExplorerUrl(["ui", family])}
                        aria-label={label}
                      >
                        <span className={styles.proofLinkTitle}>
                          <Icon className="size-3.5" aria-hidden="true" />
                          {label}
                          <ArrowUpRight className="size-3" aria-hidden="true" />
                        </span>
                        <span className={styles.proofLinkDescription}>
                          {description}
                        </span>
                      </a>
                    ),
                  )}
                </nav>
              </div>
            }
          />

          <MarketingSectionShell
            id="start-with-pycolors"
            spacing="default"
            width="full"
            aria-labelledby="home-start-heading"
            className={styles.section}
          >
            <MarketingSectionHeader
              titleId="home-start-heading"
              eyebrow="One system. Five entry points."
              title="Start with what your project needs now."
              description="From a single component to a complete application foundation. Choose the scope that fits your next step."
              align="left"
              className={sectionHeaderClass}
            />
            <div className={styles.startingPointsFrame}>
              <div className={styles.startingPointsHeader} aria-hidden="true">
                <span>Product</span>
                <span>Best for your next step</span>
                <span>Explore the scope</span>
              </div>
              <ol
                aria-label="PyColors starting points"
                className={styles.startingPoints}
              >
                {startingPoints.map(({ icon: Icon, ...point }) => (
                  <li
                    key={point.product}
                    className={cn(
                      "group",
                      styles.startingPoint,
                      point.href === "/starters/pro" && styles.proStartingPoint,
                    )}
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <span aria-hidden="true" className={styles.productIcon}>
                        <Icon className="size-[18px]" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-semibold tracking-tight">
                          {point.product}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {point.detail}
                        </p>
                      </div>
                    </div>
                    <div className={styles.productDescription}>
                      <p className="text-[13px] font-medium leading-6">
                        {point.situation}
                      </p>
                      <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                        {point.value}
                      </p>
                    </div>
                    <Link
                      href={point.href}
                      className={cn(linkClass, styles.productLink)}
                    >
                      {point.action}
                      <span
                        className={styles.productLinkIcon}
                        aria-hidden="true"
                      >
                        <ArrowRight className="size-3.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <div className={styles.startingPointsFooter}>
                <span>
                  <Layers3 className="size-3.5" aria-hidden="true" />
                  One shared design system.
                </span>
                <p>Start at any layer. Build on it as your product grows.</p>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="what-you-get"
            spacing="default"
            width="full"
            aria-labelledby="home-foundations-heading"
            className={styles.section}
          >
            <MarketingSectionHeader
              titleId="home-foundations-heading"
              eyebrow="Inspect the foundation"
              title="From the interface to your implementation."
              description="The workspace shows public primitives in context. Inspect their behavior in the UI Explorer; use the documentation for installation, composition and integration."
              align="left"
              className={sectionHeaderClass}
            />
            <div className={styles.foundations}>
              <div className={styles.foundationCard}>
                <FoundationVisual kind="components" />
                <Code2
                  className="mb-4 size-5 text-muted-foreground"
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
              <div className={styles.foundationCard}>
                <FoundationVisual kind="tokens" />
                <Palette
                  className="mb-4 size-5 text-muted-foreground"
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
              <div className={styles.foundationCard}>
                <FoundationVisual kind="composition" />
                <Layers3
                  className="mb-4 size-5 text-muted-foreground"
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
            className={styles.section}
          >
            <MarketingSectionHeader
              titleId="home-production-heading"
              eyebrow="From evaluation to implementation"
              title="Choose the infrastructure your project needs."
              description="Starter Free demonstrates application UX with mock data. Starter Pro supplies the documented infrastructure foundation; your project still needs configuration, integration and production checks."
              align="left"
              className={sectionHeaderClass}
            />
            <div className={styles.starters}>
              <div className={styles.starterCard}>
                <div className={styles.starterEyebrow}>
                  <PanelsTopLeft
                    className="size-5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <Badge variant="outline" size="sm">
                    Free · Open source
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  PyColors Starter Free
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground lg:min-h-21">
                  Inspect auth UX, dashboards, projects, settings, billing
                  surfaces and admin flows. Authentication, payments and data
                  are mocked.
                </p>
                <StarterScope />
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
              <div className={cn(styles.starterCard, styles.proCard)}>
                <div className={styles.starterEyebrow}>
                  <Server
                    className="size-5 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <Badge variant="outline" size="sm">
                    Commercial foundation
                  </Badge>
                </div>
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
                <StarterScope pro />
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
            className={cn(styles.section, styles.trust)}
          >
            <MarketingSectionHeader
              titleId="home-trust-heading"
              eyebrow="Engineering and trust"
              title="Inspect the project before you commit."
              description="Check maintenance, source, commercial terms and support alongside the product scope."
              align="left"
              className={cn(sectionHeaderClass, "mb-4")}
            />
            <ul className={styles.trustLinks}>
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
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </MarketingSectionShell>

          <MarketingSectionShell
            spacing="compact"
            width="full"
            aria-labelledby="home-next-heading"
            className="pt-0"
          >
            <MarketingCtaPanel
              titleId="home-next-heading"
              className={styles.closing}
              title="Choose the foundation for your next step."
              description="Start with the layer that fits your current project. If infrastructure is the blocker, review Starter Pro’s scope and setup."
              actions={
                <MarketingActionGroup>
                  <MarketingLinkButton className={styles.primaryAction}>
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
