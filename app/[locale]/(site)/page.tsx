import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { localizedAlternates } from "@/lib/i18n/routes";
import { Link } from "@/lib/i18n/navigation";
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
} from "lucide-react";
import { Badge, cn } from "@pycolors/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { FibonacciBackground } from "@/components/marketing/fibonacci-background";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingDetailCard } from "@/components/marketing/detail-card";
import { MarketingCardIllustration } from "@/components/marketing/card-illustration";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";
import { UI_VERSION } from "@/lib/version";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import styles from "@/components/marketing/home.module.css";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo/website";
import { ProductStudioReference } from "@/components/marketing/product-studio-reference";

const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "https://pycolors.io",
    languages: localizedAlternates("home", "en").languages,
  },

  openGraph: {
    locale: "en_US",
    alternateLocale: "fr_FR",
    title: SITE_TITLE,

    description: SITE_DESCRIPTION,
    url: "https://pycolors.io",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/seo/twitter-main.png"],
  },
};

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center gap-2 rounded-[3px] py-2 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none";

function ResourceLink({
  href,
  children,
}: Readonly<{ href: string; children: string }>) {
  const tSite = useCopy();

  return (
    <Link
      href={href}
      className="group/resource flex min-h-12 w-full items-center justify-between gap-3 rounded-md px-2.5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
    >
      <span className="min-w-0">{tSite(children)}</span>
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
  "[&_h2]:max-w-2xl [&_p]:max-w-2xl [&_[data-slot=badge]]:rounded-none [&_[data-slot=badge]]:border-0 [&_[data-slot=badge]]:bg-transparent [&_[data-slot=badge]]:px-0 [&_[data-slot=badge]]:text-muted-foreground",
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

const trustLinks = [
  ["Public roadmap", "/roadmap"],
  ["Changelog", "/changelog"],
  ["Open source", "/open-source"],
  ["License", "/license"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"],
  ["Purchase support", "/orders/support"],
] as const;

function StarterScope({ pro = false }: { pro?: boolean }) {
  const tSite = useCopy();

  const rows = pro
    ? [
        ["Interface", "FR/EN, Customize & real workspace data"],
        ["Services", "Accounts, billing, projects & team workflows"],
        ["Handover", "Validated ZIP, guides & operational checks"],
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
          <dt>{tSite(label)}</dt>
          <dd>{tSite(value)}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function HomePage() {
  const tSite = useCopy();

  const breadcrumb = generateBreadcrumbJsonLd([{ label: "Home", href: "/" }]);

  return (
    <>
      <JsonLd id="home-breadcrumb" data={breadcrumb} />
      <Container className={cn(styles.page, "pt-24 pb-8")}>
        <main id="content" tabIndex={-1} className="w-full min-w-0">
          <PageHero
            variant="compact"
            maxWidth="4xl"
            align="center"
            className={styles.hero}
            background={<FibonacciBackground />}
            badges={[
              {
                label: `npm · @pycolors/ui v${UI_VERSION}`,
                icon: <Package className="size-3.5" aria-hidden="true" />,
              },
            ]}
            actionsClassName="mt-7"
            title={tSite("Ship credible SaaS products faster.")}
            description={tSite(
              "UI components, reusable blocks and application starters. One shared design system for your next React and Next.js product.",
            )}
            extra={
              <div className={styles.heroProof}>
                {[
                  "Public UI foundation",
                  "Source you can inspect",
                  "Free starting point",
                ].map((label) => (
                  <span key={label}>
                    <Check className="size-3.5" aria-hidden="true" />
                    {tSite(label)}
                  </span>
                ))}
              </div>
            }
            extraClassName="mt-6"
            actions={
              <MarketingActionGroup align="center" className="w-full">
                <MarketingLinkButton className={styles.primaryAction}>
                  <a href="#start-with-pycolors">
                    {tSite("Choose your starting point")}
                  </a>
                </MarketingLinkButton>
                <MarketingLinkButton
                  variant="outline"
                  className="motion-reduce:transition-none"
                >
                  <Link href="/starters/free">
                    {tSite("Explore Starter Free")}
                  </Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
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
              eyebrow={tSite("One system. Five entry points.")}
              title={tSite("Start with what your project needs now.")}
              description={tSite(
                "From a single component to a complete application foundation. Choose the scope that fits your next step.",
              )}
              align="left"
              className={sectionHeaderClass}
            />
            <div className={styles.startingPointsFrame}>
              <div className={styles.startingPointsHeader} aria-hidden="true">
                <span>{tSite("Product")}</span>
                <span>{tSite("Best for your next step")}</span>
                <span>{tSite("Explore the scope")}</span>
              </div>
              <ol
                aria-label={tSite("PyColors starting points")}
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
                        <h3 className="text-[15px] font-semibold tracking-normal">
                          {tSite(point.product)}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {tSite(point.detail)}
                        </p>
                      </div>
                    </div>
                    <div className={styles.productDescription}>
                      <p className="text-[13px] font-medium leading-6">
                        {tSite(point.situation)}
                      </p>
                      <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                        {tSite(point.value)}
                      </p>
                    </div>
                    <Link
                      href={point.href}
                      className={cn(linkClass, styles.productLink)}
                    >
                      {tSite(point.action)}
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
                  {tSite("One shared design system.")}
                </span>
                <p>
                  {tSite(
                    "Start at any layer. Build on it as your product grows.",
                  )}
                </p>
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
              eyebrow={tSite("Inspect the foundation")}
              title={tSite("From the interface to your implementation.")}
              description={tSite(
                "Explore public components in the UI Explorer. Use the documentation to install, theme and compose them in your application.",
              )}
              align="left"
              className={sectionHeaderClass}
            />
            <div className={styles.foundations}>
              <MarketingDetailCard
                title={tSite("Components and states")}
                eyebrow={tSite("Public primitives")}
                icon={<Code2 />}
                description={tSite(
                  "Inspect component APIs, interaction states and keyboard behavior in the public UI Explorer.",
                )}
                visual={<MarketingCardIllustration kind="components" />}
                footer={
                  <ul className="divide-y divide-border-subtle">
                    <li>
                      <ResourceLink href="/docs/ui/installation">
                        {tSite("Read the installation guide")}
                      </ResourceLink>
                    </li>
                    <li>
                      <ResourceLink href="/docs/ui/accessibility">
                        {tSite("Read accessibility guidance")}
                      </ResourceLink>
                    </li>
                    <li>
                      <ResourceLink href="/docs/ui/storybook">
                        {tSite("Read the UI Explorer guide")}
                      </ResourceLink>
                    </li>
                  </ul>
                }
              />
              <MarketingDetailCard
                title={tSite("Tokens and themes")}
                eyebrow={tSite("Visual foundation")}
                icon={<Palette />}
                description={tSite(
                  "The same semantic tokens support this page in light and dark. Adapt them to your product.",
                )}
                visual={<MarketingCardIllustration kind="tokens" />}
                footer={
                  <ul className="divide-y divide-border-subtle">
                    <li>
                      <ResourceLink href="/docs/ui/theming">
                        {tSite("See theming documentation")}
                      </ResourceLink>
                    </li>
                    <li>
                      <ResourceLink href="/docs/design-system/tokens">
                        {tSite("Read token documentation")}
                      </ResourceLink>
                    </li>
                  </ul>
                }
              />
              <MarketingDetailCard
                title={tSite("Product composition")}
                eyebrow={tSite("Application patterns")}
                icon={<Layers3 />}
                description={tSite(
                  "Combine primitives into your own screens, or inspect the available Starter Free application.",
                )}
                visual={<MarketingCardIllustration kind="composition" />}
                footer={
                  <ul className="divide-y divide-border-subtle">
                    <li>
                      <ResourceLink href="/docs/ui/composition">
                        {tSite("Read composition guidance")}
                      </ResourceLink>
                    </li>
                    <li>
                      <ResourceLink href="/ui/patterns">
                        {tSite("Explore UI patterns")}
                      </ResourceLink>
                    </li>
                    <li>
                      <ResourceLink href="/ui/examples">
                        {tSite("Inspect available examples")}
                      </ResourceLink>
                    </li>
                  </ul>
                }
              />
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
              eyebrow={tSite("From evaluation to implementation")}
              title={tSite("Choose the infrastructure your project needs.")}
              description={tSite(
                "Explore app UX with Starter Free, then build on persisted workspaces, billing and project workflows with Starter Pro. Inspect the included source, validation and handover. Your launch still needs configuration, integration and production checks.",
              )}
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
                    {tSite("Free · Open source")}
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold tracking-subheading">
                  {tSite("PyColors Starter Free")}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground lg:min-h-21">
                  {tSite(
                    "Inspect auth UX, dashboards, projects, settings, billing surfaces and admin flows. Authentication, payments and data are mocked.",
                  )}
                </p>
                <StarterScope />
                <div className="mt-7">
                  <MarketingLinkButton
                    variant="outline"
                    className="w-full motion-reduce:transition-none"
                  >
                    <a href={starterDemo}>
                      {tSite("Open the Starter Free demo")}
                      <ExternalLink
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  </MarketingLinkButton>
                </div>
                <div className="mt-7 divide-y divide-border-subtle border-t border-border-subtle pt-2">
                  <ResourceLink href="/docs/starter/installation">
                    {tSite("Install Starter Free")}
                  </ResourceLink>
                  <ResourceLink href="/docs/starter/upgrade">
                    {tSite("Compare the upgrade scope")}
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
                    {tSite("Commercial foundation")}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold tracking-subheading">
                    {tSite(starterPro.name)}
                  </h3>
                  <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-mono text-2xl font-medium tracking-tight">
                      {tSite(starterPro.priceLabel)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {tSite("One-time payment")}
                    </span>
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground lg:min-h-21">
                  {tSite(
                    "Accounts, team workspaces, Stripe billing and projects with assigned tasks and discussions. Start with a validated ZIP, product configuration and a documented path to operations.",
                  )}
                </p>
                <StarterScope pro />
                <div className="mt-7">
                  <BuyStarterProButton
                    fullWidth
                    label={tSite("Buy Starter Pro — {value0}", {
                      value0: starterPro.priceLabel,
                    })}
                    className="h-auto max-w-full whitespace-normal rounded-md motion-reduce:transition-none"
                  />
                </div>
                <div className="mt-7 divide-y divide-pro-border-subtle border-t border-pro-border-subtle pt-2">
                  <ResourceLink href="/starters/pro#product-tour">
                    {tSite("Watch the product tour")}
                  </ResourceLink>
                  <ResourceLink href="/docs/starter-pro/what-is-included">
                    {tSite("Review what is included")}
                  </ResourceLink>
                  <ResourceLink href="/docs/starter-pro/getting-started">
                    {tSite("Read the setup requirements")}
                  </ResourceLink>
                  <ResourceLink href="/docs/starter-pro/delivery">
                    {tSite("Understand purchase and delivery")}
                  </ResourceLink>
                  <ResourceLink href="/pricing">
                    {tSite("Compare product pricing")}
                  </ResourceLink>
                </div>
              </div>
            </div>
            <aside
              aria-labelledby="home-implementation-heading"
              className={styles.implementation}
            >
              <div className={styles.implementationHeader}>
                <div className={styles.implementationCopy}>
                  <p className={styles.implementationEyebrow}>
                    {tSite("Starter Pro · Implementation services")}
                  </p>
                  <h3 id="home-implementation-heading">
                    {tSite("Implementation, scoped to your product.")}
                  </h3>
                  <p className={styles.implementationDescription}>
                    {tSite(
                      "Work with PyColors to configure your foundation or build a defined business workflow. Start with agreed deliverables and a written proposal.",
                    )}
                  </p>
                </div>
                <ol
                  aria-label={tSite("Implementation process")}
                  className={styles.implementationProcess}
                >
                  {["Scope", "Implementation", "Handover"].map(
                    (step, index) => (
                      <li key={step}>
                        <span aria-hidden="true">0{tSite(index + 1)}</span>
                        {tSite(step)}
                      </li>
                    ),
                  )}
                </ol>
              </div>
              <div className={styles.implementationServices}>
                {Object.values(STARTER_PRO_SERVICES).map((service, index) => (
                  <section
                    key={service.id}
                    aria-labelledby={`home-service-${service.id}`}
                    className={styles.implementationService}
                  >
                    <div className={styles.implementationServiceHeading}>
                      <h4 id={`home-service-${service.id}`}>
                        {tSite(service.title)}
                      </h4>
                      <span aria-hidden="true">0{tSite(index + 1)}</span>
                    </div>
                    <p className={styles.implementationPrice}>
                      {tSite(service.priceLabel)}
                    </p>
                    <p className={styles.implementationServiceDescription}>
                      {tSite(service.description)}
                    </p>
                    <ul
                      aria-label={tSite("{value0} includes", {
                        value0: service.title,
                      })}
                      className={styles.implementationHighlights}
                    >
                      {service.highlights.map((highlight) => (
                        <li key={highlight}>
                          <Check aria-hidden="true" />
                          <span>{tSite(highlight)}</span>
                        </li>
                      ))}
                    </ul>
                    <dl className={styles.implementationDeliverable}>
                      <dt>{tSite("You receive")}</dt>
                      <dd>{tSite(service.deliverable)}</dd>
                    </dl>
                    <Link href={service.example.href} className={linkClass}>
                      {tSite("View example delivery")}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                    <div className={styles.implementationAction}>
                      <MarketingLinkButton variant="outline" className="w-full">
                        <Link href={service.href}>{tSite(service.action)}</Link>
                      </MarketingLinkButton>
                    </div>
                  </section>
                ))}
              </div>
              <div className={styles.implementationFooter}>
                <p className={styles.implementationScope}>
                  {tSite(
                    "Starting service fees. Source licence and provider costs are separate. The quote defines your scope, acceptance checks and included follow-up.",
                  )}
                </p>
                <Link
                  href="/docs/starter-pro/implementation-support"
                  className={styles.implementationScopeLink}
                >
                  {tSite("Review scope & support")}
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </MarketingSectionShell>

          <ProductStudioReference />

          <MarketingSectionShell
            spacing="default"
            width="full"
            aria-labelledby="home-theme-builder-heading"
            className={styles.section}
          >
            <div className={styles.themeTeaser}>
              <div className={styles.themeContent}>
                <MarketingSectionHeader
                  titleId="home-theme-builder-heading"
                  eyebrow={tSite("Theme Builder")}
                  title={tSite("Your brand. Your interface.")}
                  description={tSite(
                    "Build light and dark themes from your brand color. Preview components and export the CSS tokens.",
                  )}
                  align="left"
                  className={cn(sectionHeaderClass, styles.themeHeading)}
                />
                <ul
                  className={styles.themeCapabilities}
                  aria-label={tSite("Theme Builder capabilities")}
                >
                  <li>{tSite("Color system")}</li>
                  <li>{tSite("Typography")}</li>
                  <li>{tSite("CSS export")}</li>
                </ul>
                <div className={styles.themeAction}>
                  <MarketingLinkButton className={styles.primaryAction}>
                    <Link href="/tools/theme-builder">
                      {tSite("Open Theme Builder")}
                    </Link>
                  </MarketingLinkButton>
                  <p>{tSite("Free · No account needed")}</p>
                </div>
              </div>
              <div className={styles.themeVisual} aria-hidden="true">
                <div className={styles.themeVisualHeader}>
                  <span>
                    <Code2 />
                    {tSite("theme.css")}
                  </span>
                  <div className={styles.themeSwatches}>
                    {[100, 65, 30, 10].map((strength) => (
                      <i
                        key={strength}
                        style={{
                          background: `color-mix(in oklab, var(--primary) ${strength}%, var(--background))`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.themeSamples}>
                  {["Light", "Dark"].map((mode) => (
                    <div
                      key={mode}
                      className={cn(
                        styles.themeSample,
                        mode === "Dark" ? styles.themeDark : styles.themeLight,
                      )}
                    >
                      <div className={styles.themeMode}>
                        <span />
                        {tSite(mode)}
                      </div>
                      <div className={styles.themeSampleBody}>
                        <span className={styles.themeSpecimen}>
                          {tSite("Aa")}
                        </span>
                        <div className={styles.themeSampleFooter}>
                          <span>{tSite("Interface")}</span>
                          <span className={styles.themeSampleSwatches}>
                            <i />
                            <i />
                            <i />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.themeTokens}>
                  <code>--primary</code>
                  <code>--background</code>
                  <code>--foreground</code>
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
              eyebrow={tSite("Engineering and trust")}
              title={tSite("Inspect the project before you commit.")}
              description={tSite(
                "Check maintenance, source, commercial terms and support alongside the product scope.",
              )}
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
                    {tSite(label)}
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
              title={tSite("Choose the foundation for your next step.")}
              description={tSite(
                "Start with the layer that fits your current project. If infrastructure is the blocker, review Starter Pro’s scope and setup.",
              )}
              actions={
                <MarketingActionGroup>
                  <MarketingLinkButton className={styles.primaryAction}>
                    <a href="#start-with-pycolors">
                      {tSite("Choose your starting point")}
                    </a>
                  </MarketingLinkButton>
                  <MarketingLinkButton
                    variant="outline"
                    className="motion-reduce:transition-none"
                  >
                    <Link href="/starters/pro">
                      {tSite("View Starter Pro")}
                    </Link>
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/", locale);
}
