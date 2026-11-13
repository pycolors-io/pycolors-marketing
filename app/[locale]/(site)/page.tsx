import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { localizedAlternates } from "@/lib/i18n/routes";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Layers3,
  Package,
  Plus,
  Palette,
  PanelsTopLeft,
  Server,
  Smartphone,
  Check,
} from "lucide-react";
import { Badge, cn } from "@pycolors/ui";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import effects from "@/components/marketing/product-light.module.css";
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
import chapterStyles from "@/components/marketing/presentation.module.css";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/seo/website";
import { ProductPreviewMedia } from "@/components/marketing/product-preview-media";
import { PRODUCT_PREVIEW_MEDIA } from "@/lib/products/product-preview-media";
import { ProductStudioReference } from "@/components/marketing/product-studio-reference";
import { HomeProductJourney } from "@/components/marketing/home-product-journey";
import { FibonacciBackground } from "@/components/marketing/fibonacci-background";

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
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover/resource:text-foreground motion-reduce:transition-none"
      />
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
    image: "delivery-case",
    situation: "Launch a focused landing page.",
    value: "Present your SaaS offer with an editable frontend.",
    detail: PRODUCT_DISPLAY["na-ai-landing"].name,
    href: "/templates/na-ai-landing",
    action: "View NA-AI template",
  },
  {
    product: "PyColors UI",
    image: "recovery-loop",
    situation: "Build inside your existing app.",
    value: "Compose custom screens with public components and semantic tokens.",
    detail: "Public UI foundation",
    href: "/ui",
    action: "Explore PyColors UI",
  },
  {
    product: "Blocks",
    image: "source-stack",
    situation: "Add a complete interface section.",
    value: "Inspect and copy reusable layouts into your application.",
    detail: "Public, copyable sections",
    href: "/blocks",
    action: "Explore Blocks",
  },
  {
    product: "PyColors Starter Free",
    image: "billing-loops",
    situation: "Explore the application experience.",
    value: "Run the SaaS frontend with mocked auth, payments and data.",
    detail: "Runnable application UX",
    href: "/starters/free",
    action: "Explore Starter Free",
  },
  {
    product: starterPro.name,
    image: "workflow-path",
    situation: "Connect your application foundation.",
    value:
      "Start with auth, billing, database and email. Configure and validate for production.",
    detail: "Commercial SaaS foundation",
    href: "/starters/pro",
    action: "View Starter Pro",
  },
  {
    product: "React Native Mobile App",
    image: "connected-workspace",
    situation: "React Native · Expo",
    value: "Mobile is not on sale. No release date has been announced.",
    detail: "Coming soon",
    href: "/starters/mobile",
    action: "Explore Starter Pro Mobile",
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

const buyingProof = [
  {
    icon: Code2,
    title: "Source you can inspect",
    description:
      "Explore the public UI library and documentation before choosing your foundation.",
    action: "Explore PyColors UI",
    href: "/ui",
  },
  {
    icon: PanelsTopLeft,
    title: "Try the application",
    description:
      "Explore the Starter Free demo with clearly labelled mock authentication, payments and data.",
    action: "Open the Starter Free demo",
    href: starterDemo,
  },
  {
    icon: Package,
    title: "Understand your purchase",
    description:
      "Review the licence, included files, setup requirements and delivery process.",
    action: "Understand purchase and delivery",
    href: "/docs/starter-pro/delivery",
  },
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

/** The same decorative ribbon geometry as Starter Pro, owned by this hero. */
function HomeHeroWaves() {
  return (
    <svg
      className={styles.heroWaves}
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="home-hero-spectrum" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--home-hero-apricot)" />
          <stop offset="0.16" stopColor="var(--home-hero-sun)" />
          <stop offset="0.38" stopColor="var(--home-hero-rose)" />
          <stop offset="0.58" stopColor="var(--home-hero-violet)" />
          <stop offset="1" stopColor="var(--home-hero-orchid)" />
        </linearGradient>
        <clipPath id="home-hero-ribbon-clip">
          <path d="M-140 490C160 520 350 290 670 295S1120 450 1580 130L1580 620H-140Z" />
        </clipPath>
      </defs>
      <path
        d="M-140 490C160 520 350 290 670 295S1120 450 1580 130L1580 620H-140Z"
        fill="url(#home-hero-spectrum)"
      />
      <g clipPath="url(#home-hero-ribbon-clip)" className={styles.heroContours}>
        {Array.from({ length: 8 }, (_, index) => (
          <path
            key={index}
            d={`M-140 ${490 + index * 13}C160 ${520 + index * 11} 350 ${290 + index * 10} 670 ${295 + index * 10}S1120 ${450 + index * 7} 1580 ${130 + index * 12}`}
          />
        ))}
      </g>
    </svg>
  );
}

/** Genuine Web product capture; the caption preserves its synthetic-data scope. */
function HomeProductPreview() {
  const tSite = useCopy();

  return (
    <figure className={`${styles.heroPreview} ${effects.previewEntry}`}>
      <div className={styles.heroPreviewWindow}>
        <div className={styles.heroWindowChrome} aria-hidden="true">
          <span className={styles.heroWindowControls}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.heroWindowAddress}>
            {tSite("Starter Pro")}
          </span>
          <PanelsTopLeft className={styles.heroWindowSidebar} />
        </div>
        <div className={styles.heroPreviewImage}>
          <Image
            src="/images/starters/pro/dashboard-pycolors-2x.png"
            alt={tSite(
              "Starter Pro dashboard with saved project counts, weekly chart and workspace team",
            )}
            fill
            loading="eager"
            fetchPriority="high"
            quality={100}
            sizes="(min-width: 1440px) 1376px, (min-width: 1024px) calc(100vw - 4rem), (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
            className={styles.heroLight}
          />
          <Image
            src="/images/starters/pro/dashboard-dark-pycolors-2x.png"
            alt={tSite(
              "Starter Pro dashboard with saved project counts, weekly chart and workspace team",
            )}
            fill
            loading="eager"
            fetchPriority="high"
            quality={100}
            sizes="(min-width: 1440px) 1376px, (min-width: 1024px) calc(100vw - 4rem), (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
            className={styles.heroDark}
          />
        </div>
      </div>
      <figcaption className={styles.heroPreviewCaption}>
        {tSite(
          "Project counts, weekly creation history and team roles come from a seeded PostgreSQL workspace. These captures use demonstration data, not customer results.",
        )}
      </figcaption>
    </figure>
  );
}

export default function HomePage() {
  const tSite = useCopy();

  const breadcrumb = generateBreadcrumbJsonLd([{ label: "Home", href: "/" }]);

  return (
    <>
      <JsonLd id="home-breadcrumb" data={breadcrumb} />
      <Container className={cn(styles.page, "pb-8")}>
        <main id="content" tabIndex={-1} className="w-full min-w-0">
          <section className={styles.hero}>
            <div className={styles.heroAtmosphere} aria-hidden="true">
              <div className={styles.heroGlow} />
              <HomeHeroWaves />
            </div>
            <FibonacciBackground />
            <div className={styles.heroGrid}>
              <PageHero
                variant="compact"
                maxWidth="4xl"
                align="center"
                className={`${styles.heroCopy} ${effects.copyEntry}`}
                contentClassName={styles.heroContent}
                badges={[
                  {
                    label: `npm · @pycolors/ui v${UI_VERSION}`,
                    icon: <Package className="size-3.5" aria-hidden="true" />,
                  },
                ]}
                actionsClassName={styles.heroActions}
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
                    <MarketingLinkButton className={effects.primaryAction}>
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
              <div className={styles.heroVisual}>
                <HomeProductPreview />
              </div>
            </div>
          </section>

          <MarketingSectionShell
            id="start-with-pycolors"
            spacing="default"
            width="full"
            aria-labelledby="home-start-heading"
            className={cn(styles.section, styles.journeySection)}
          >
            <HomeProductJourney
              count={startingPoints.length}
              introduction={
                <MarketingSectionHeader
                  titleId="home-start-heading"
                  eyebrow={tSite("One system. Six entry points.")}
                  title={tSite("Start with what your project needs now.")}
                  description={tSite(
                    "From a single component to a complete application foundation. Choose the scope that fits your next step.",
                  )}
                  align="left"
                  className={sectionHeaderClass}
                />
              }
              footer={
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
              }
            >
              <ol
                aria-label={tSite("PyColors starting points")}
                className={styles.startingPoints}
              >
                {startingPoints.map((point) => (
                  <li
                    data-home-product
                    key={point.product}
                    className={styles.startingPoint}
                  >
                    <div className={styles.productHeading}>
                      <h3>{tSite(point.product)}</h3>
                      <p>
                        {point.detail === "Coming soon" ? (
                          <Badge
                            variant="outline"
                            className="rounded-full border-current/25 bg-transparent text-inherit"
                          >
                            {tSite(point.detail)}
                          </Badge>
                        ) : (
                          tSite(point.detail)
                        )}
                      </p>
                    </div>
                    <div className={styles.productDescription}>
                      <p className="text-[13px] font-medium leading-6">
                        {tSite(point.situation)}
                      </p>
                      <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                        {tSite(point.value)}
                      </p>
                    </div>
                    <div className={styles.productVisual}>
                      <Image
                        src={`/images/starters/pro/concepts/${point.image}-test-v1.png`}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(min-width: 1400px) 28vw, (min-width: 1024px) 384px, 85vw"
                        className={styles.productArtwork}
                      />
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
            </HomeProductJourney>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="what-you-get"
            spacing="default"
            width="full"
            aria-labelledby="home-foundations-heading"
            className={cn(
              styles.section,
              styles.colorChapter,
              styles.foundationScroll,
            )}
          >
            <MarketingSectionHeader
              titleId="home-foundations-heading"
              eyebrow={tSite("Inspect the foundation")}
              title={tSite("From the interface to your implementation.")}
              description={tSite(
                "Explore public components in the UI Explorer. Use the documentation to install, theme and compose them in your application.",
              )}
              align="left"
              action={
                <MarketingLinkButton variant="outline">
                  <a href="https://ui.pycolors.io">
                    {tSite("Open UI Explorer")}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                </MarketingLinkButton>
              }
              className={cn(sectionHeaderClass, styles.foundationHeader)}
            />
            <div className={styles.foundations}>
              <MarketingDetailCard
                className={styles.foundationCard}
                title={tSite("Components and states")}
                eyebrow={tSite("Public primitives")}
                icon={<Code2 />}
                description={tSite(
                  "Inspect component APIs, interaction states and keyboard behavior in the public UI Explorer.",
                )}
                meta="01"
                visual={
                  <div className={styles.foundationVisual}>
                    <MarketingCardIllustration kind="components" />
                  </div>
                }
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
                className={styles.foundationCard}
                title={tSite("Tokens and themes")}
                eyebrow={tSite("Visual foundation")}
                icon={<Palette />}
                description={tSite(
                  "The same semantic tokens support this page in light and dark. Adapt them to your product.",
                )}
                meta="02"
                visual={
                  <div className={styles.foundationVisual}>
                    <MarketingCardIllustration kind="tokens" />
                  </div>
                }
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
                className={styles.foundationCard}
                title={tSite("Product composition")}
                eyebrow={tSite("Application patterns")}
                icon={<Layers3 />}
                description={tSite(
                  "Combine primitives into your own screens, or inspect the available Starter Free application.",
                )}
                meta="03"
                visual={
                  <div className={styles.foundationVisual}>
                    <MarketingCardIllustration kind="composition" />
                  </div>
                }
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
            id="infrastructure"
            spacing="default"
            width="full"
            aria-labelledby="home-production-heading"
            className={cn(
              styles.section,
              styles.colorChapter,
              styles.productionScroll,
            )}
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
              <article
                aria-labelledby="home-free-title"
                className={cn(styles.starterCard, styles.freeStarterCard)}
              >
                <div className={styles.starterStory}>
                  <div className={styles.starterSummary}>
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
                    <h3 id="home-free-title">
                      {tSite("PyColors Starter Free")}
                    </h3>
                    <p className={styles.starterDescription}>
                      {tSite(
                        "Inspect auth UX, dashboards, projects, settings, billing surfaces and admin flows. Authentication, payments and data are mocked.",
                      )}
                    </p>
                    <MarketingLinkButton
                      variant="outline"
                      className={styles.starterAction}
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
                  <figure className={styles.starterMedia}>
                    <ProductPreviewMedia
                      product="starter-free"
                      sizes="(min-width: 1024px) 720px, 90vw"
                    />
                    <figcaption>
                      {tSite(PRODUCT_PREVIEW_MEDIA["starter-free"].caption)}
                    </figcaption>
                  </figure>
                </div>
                <div className={styles.starterDetails}>
                  <StarterScope />
                  <div className={styles.starterResources}>
                    <ResourceLink href="/docs/starter/installation">
                      {tSite("Install Starter Free")}
                    </ResourceLink>
                    <ResourceLink href="/docs/starter/upgrade">
                      {tSite("Compare the upgrade scope")}
                    </ResourceLink>
                  </div>
                </div>
              </article>
              <article
                aria-labelledby="home-pro-title"
                className={cn(styles.starterCard, styles.proCard)}
              >
                <div className={styles.starterStory}>
                  <div className={styles.starterSummary}>
                    <div className={styles.starterEyebrow}>
                      <Server
                        className="size-5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <Badge variant="outline" size="sm">
                        {tSite("Commercial foundation")}
                      </Badge>
                    </div>
                    <h3 id="home-pro-title">{tSite(starterPro.name)}</h3>
                    <p className={styles.starterDescription}>
                      {tSite(
                        "Accounts, team workspaces, Stripe billing and projects with assigned tasks and discussions. Start with a validated ZIP, product configuration and a documented path to operations.",
                      )}
                    </p>
                    <p className={styles.starterPrice}>
                      <strong>{tSite(starterPro.priceLabel)}</strong>
                      <span>{tSite("One-time payment")}</span>
                    </p>
                    <BuyStarterProButton
                      label={tSite("Buy Starter Pro — {value0}", {
                        value0: starterPro.priceLabel,
                      })}
                      className={styles.starterAction}
                    />
                  </div>
                  <figure className={styles.starterMedia}>
                    <ProductPreviewMedia
                      product="starter-pro"
                      sizes="(min-width: 1024px) 720px, 90vw"
                    />
                    <figcaption>
                      {tSite(PRODUCT_PREVIEW_MEDIA["starter-pro"].caption)}
                    </figcaption>
                  </figure>
                </div>
                <div className={styles.starterDetails}>
                  <StarterScope pro />
                  <div className={styles.starterResources}>
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
              </article>
            </div>
            <aside
              aria-labelledby="home-implementation-heading"
              className={styles.implementation}
            >
              <div className={styles.implementationHeader}>
                <div className={styles.implementationCopy}>
                  <p className={styles.implementationEyebrow}>
                    {tSite("PyColors Services")}
                  </p>
                  <h3 id="home-implementation-heading">
                    {tSite("Custom software, built around your business.")}
                  </h3>
                  <p className={styles.implementationDescription}>
                    {tSite(
                      "Client portals, internal tools, document workflows and SaaS applications. Define your project with PyColors through a written proposal, or start with the focused engagements below.",
                    )}
                  </p>
                  <Link href="/services" className={linkClass}>
                    {tSite("Explore our services")}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
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
              <details open className={styles.implementationDetails}>
                <summary>
                  <span>{tSite("Explore implementation services")}</span>
                  <Plus aria-hidden="true" className="size-5 shrink-0" />
                </summary>
                <div className={styles.implementationServices}>
                  {Object.values(STARTER_PRO_SERVICES).map((service, index) => (
                    <section
                      key={service.id}
                      data-service={service.id}
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
                        <MarketingLinkButton className="w-full">
                          <Link href={service.href}>
                            {tSite(service.action)}
                          </Link>
                        </MarketingLinkButton>
                      </div>
                    </section>
                  ))}
                </div>
              </details>
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
            className={cn(
              styles.section,
              styles.themeChapter,
              chapterStyles.diagonalChapter,
              chapterStyles.diagonalWarm,
              chapterStyles.straightChapter,
            )}
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
                  <MarketingLinkButton className={effects.primaryAction}>
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
            id="starter-pro-mobile"
            width="full"
            aria-labelledby="home-mobile-heading"
            className={styles.section}
          >
            <div className={cn(styles.mobileTeaser, styles.mobileScroll)}>
              <div className={styles.mobileCopy}>
                <div className={styles.mobileEyebrow}>
                  <span>
                    <Smartphone className="size-4" aria-hidden="true" />
                    {tSite("Starter Pro Mobile")}
                  </span>
                  <Badge variant="outline">{tSite("Coming soon")}</Badge>
                </div>
                <h2 id="home-mobile-heading">
                  {tSite("React Native Mobile App")}
                </h2>
                <p className={styles.mobileDescription}>
                  {tSite(
                    "A proposed native extension for Starter Pro, built with React Native and Expo. Final scope, availability and terms are to be announced.",
                  )}
                </p>
                <p className={styles.mobileStack}>
                  {tSite("React Native · Expo")}
                  <span aria-hidden="true"> / </span>
                  {tSite("iOS · Android")}
                </p>
                <Link href="/starters/mobile" className={linkClass}>
                  {tSite("Explore Starter Pro Mobile")}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
                <p className={styles.mobileAvailability}>
                  {tSite(
                    "Mobile is not on sale. No release date has been announced.",
                  )}
                </p>
              </div>
              <figure className={styles.mobileVisual}>
                <div className={styles.mobilePhones} aria-hidden="true">
                  {[0, 1].map((phone) => (
                    <div className={styles.mobilePhone} key={phone}>
                      <div className={styles.mobileIsland} />
                      <div className={styles.mobilePhoneHeader}>
                        <span />
                        <span />
                      </div>
                      <div className={styles.mobilePhoneCards}>
                        <span />
                        <span />
                      </div>
                      <div className={styles.mobilePhoneChart}>
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className={styles.mobilePhoneRows}>
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className={styles.mobilePhoneNav}>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  ))}
                </div>
                <figcaption>{tSite("Concept illustration")}</figcaption>
              </figure>
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
            <div className={styles.buyingProof}>
              {buyingProof.map(({ icon: Icon, ...proof }) => (
                <article key={proof.href}>
                  <Icon
                    aria-hidden="true"
                    className="size-7"
                    strokeWidth={1.4}
                  />
                  <h3>{tSite(proof.title)}</h3>
                  <p>{tSite(proof.description)}</p>
                  <Link href={proof.href} className={linkClass}>
                    {tSite(proof.action)}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
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
                  <MarketingLinkButton className={effects.primaryAction}>
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
