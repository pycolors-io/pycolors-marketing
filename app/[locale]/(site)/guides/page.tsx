import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  CreditCard,
  KeyRound,
  Layers3,
  LayoutDashboard,
  PanelTop,
  ShieldCheck,
  Smartphone,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { SiteButton as Button } from "@/components/site-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingHeroBand } from "@/components/marketing/hero-band";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import { StarterSourceDocs } from "@/components/starters/starter-source-docs";
import styles from "@/components/guides/guides-index.module.css";

const metadata: Metadata = {
  title: "SaaS Guides for Next.js, Expo and Shared APIs",
  description:
    "Practical SaaS guides for Next.js Web, React Native with Expo, and shared APIs. Explore architecture, authentication and billing, then follow the Starter Pro setup docs.",
  alternates: {
    canonical: "/guides",
  },

  openGraph: {
    title: "SaaS Guides for Next.js, Expo and Shared APIs",
    description:
      "Practical SaaS guides for Next.js Web, React Native with Expo, and shared APIs. Explore architecture, authentication and billing, then follow the Starter Pro setup docs.",
    url: "/guides",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "SaaS Guides for Next.js, Expo and Shared APIs",
    description:
      "Practical SaaS guides for Next.js Web, React Native with Expo, and shared APIs. Explore architecture, authentication and billing, then follow the Starter Pro setup docs.",
    images: ["/seo/twitter-main.png"],
  },
};

const starterProPriceLabel = PRODUCT_DISPLAY["starter-pro"].priceLabel;

type Guide = {
  title: string;
  description: string;
  href: string;
  category: string;
  icon: LucideIcon;
};

const guides: Guide[] = [
  {
    title: "What a production-ready SaaS starter should include",
    description:
      "The essential product surfaces and foundations that make a SaaS starter genuinely useful, without unnecessary complexity.",
    href: "/guides/production-ready-saas-starter",
    category: "Foundations",
    icon: Layers3,
  },
  {
    title: "How to build a production-ready SaaS with Next.js",
    description:
      "Architecture, product surface, authentication, billing, and deployment basics.",
    href: "/guides/build-saas-nextjs",
    category: "Foundations",
    icon: Boxes,
  },
  {
    title: "Why PWA foundations matter for modern SaaS",
    description:
      "Installability, standalone mode, offline resilience, and app-like UX patterns for modern SaaS products.",
    href: "/guides/pwa-for-saas",
    category: "PWA",
    icon: Smartphone,
  },
  {
    title: "SaaS dashboard design patterns",
    description:
      "How modern SaaS dashboards are structured: KPIs, activity feeds, hierarchy, and actions.",
    href: "/guides/saas-dashboard-design",
    category: "Product UX",
    icon: LayoutDashboard,
  },
  {
    title: "Authentication flows for SaaS",
    description:
      "Login, register, password reset, OAuth, sessions, and protected product access.",
    href: "/guides/saas-auth-flows",
    category: "Auth",
    icon: KeyRound,
  },
  {
    title: "SaaS billing UX best practices",
    description:
      "Plans, usage metrics, invoices, upgrade flows, and billing trust patterns.",
    href: "/guides/saas-billing-ux",
    category: "Billing",
    icon: CreditCard,
  },
  {
    title: "Team & organization systems",
    description:
      "How SaaS products structure organizations, members, roles, invitations, and collaboration.",
    href: "/guides/saas-organizations",
    category: "B2B",
    icon: UsersRound,
  },
  {
    title: "Admin panels for SaaS products",
    description:
      "Moderation tools, operational queues, audit logs, roles, and admin workflows.",
    href: "/guides/saas-admin-panels",
    category: "Operations",
    icon: ShieldCheck,
  },
];

const guideTopics = [
  {
    id: "foundations",
    title: "Foundations",
    description: "Define the scope and architecture before adding features.",
    categories: ["Foundations"],
  },
  {
    id: "product-experience",
    title: "Product experience",
    description: "Make everyday screens and mobile interactions easier to use.",
    categories: ["PWA", "Product UX"],
  },
  {
    id: "auth-and-billing",
    title: "Auth & billing",
    description: "Design the flows where access, payments and trust meet.",
    categories: ["Auth", "Billing"],
  },
  {
    id: "teams-and-operations",
    title: "Teams & operations",
    description:
      "Plan for collaboration, permissions and the work behind the product.",
    categories: ["B2B", "Operations"],
  },
].map((topic) => ({
  ...topic,
  guides: guides.filter((guide) => topic.categories.includes(guide.category)),
}));

const textLink =
  "inline-flex min-h-11 items-center gap-2 rounded-[5px] text-sm font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function GuidesPage() {
  const tSite = useCopy();

  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <MarketingHeroBand tone="warm">
        <Container className={`marketing-page-intro ${styles.heroContainer}`}>
          <MarketingBreadcrumb route="/guides" />
          <div className={styles.heroLayout}>
            <PageHero
              className={styles.heroCopy}
              variant="compact"
              align="left"
              contentClassName="mx-0 max-w-2xl"
              badges={[{ label: "Guides", variant: "outline" }]}
              title={tSite("SaaS building guides for developers.")}
              description={tSite(
                "Make the architecture and product decisions behind your SaaS. Explore Web, native Mobile and shared APIs, from product design to setup documentation.",
              )}
              actions={
                <>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className={styles.heroAction}
                  >
                    <Link href="#browse-guides">
                      {tSite("Browse guides")}
                      {tSite(" ")}
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Link
                    href="/docs"
                    className={`${textLink} ${styles.heroSecondary}`}
                  >
                    {tSite("Open documentation")}
                    {tSite(" ")}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </>
              }
              extra={
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-6 text-muted-foreground">
                  <span>
                    {tSite(guides.length)} {tSite(" practical guides")}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span>
                    {tSite("From product structure to implementation")}
                  </span>
                </p>
              }
            />
            <Link
              href="/guides/production-ready-saas-starter"
              aria-labelledby="recommended-guide-title"
              aria-describedby="recommended-guide-summary"
              className={`${styles.featuredGuide} group block rounded-[5px] border border-border-subtle focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring`}
            >
              <div
                className={styles.featuredArt}
                aria-hidden="true"
                data-editorial-art=""
              >
                <Image
                  src="/images/starters/pro/concepts/source-stack-test-v1.png"
                  alt=""
                  fill
                  quality={75}
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className={styles.editorialArt}
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {tSite("Recommended starting point")}
                  </p>
                  <BookOpen
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <h2
                  id="recommended-guide-title"
                  className="mt-6 max-w-sm font-brand text-2xl font-semibold leading-tight tracking-heading sm:text-3xl"
                >
                  {tSite("What should your SaaS starter include?")}
                </h2>
                <p
                  id="recommended-guide-summary"
                  className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground"
                >
                  {tSite(
                    "Understand the essential screens, integrations and architecture before choosing your foundation.",
                  )}
                </p>
                <div className="mt-7 grid grid-cols-3 divide-x divide-border-subtle border-y border-border-subtle py-4 text-center">
                  {[
                    { label: "Interface", icon: PanelTop },
                    { label: "Integrations", icon: Boxes },
                    { label: "Architecture", icon: Layers3 },
                  ].map(({ label, icon: Icon }) => (
                    <div key={label} className="space-y-2 px-1">
                      <Icon
                        className="mx-auto size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <p className="text-[11px] font-medium">{tSite(label)}</p>
                    </div>
                  ))}
                </div>
                <span
                  className="mt-5 flex min-h-6 items-center justify-between gap-3 text-sm font-medium"
                  aria-hidden="true"
                >
                  {tSite("Read the foundations guide")}
                  <ArrowRight className="size-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </MarketingHeroBand>
      <Container className={styles.contentContainer}>
        <MarketingSectionShell
          divider="pattern"
          id="browse-guides"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
          aria-labelledby="guides-title"
        >
          <MarketingSectionHeader
            titleId="guides-title"
            align="left"
            eyebrow={tSite("The guide library")}
            title={tSite("Find the guide for your next decision.")}
            description={tSite(
              "Start with the foundations, or go straight to the product challenge in front of you.",
            )}
          />
          <div className="grid items-start gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
            <aside className="lg:sticky lg:top-24">
              <nav aria-label={tSite("Guide topics")}>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {tSite("Browse by topic")}
                </p>
                <ul className="grid grid-cols-2 gap-1 lg:grid-cols-1">
                  {guideTopics.map((topic) => (
                    <li key={topic.id}>
                      <Link
                        href={`#${topic.id}`}
                        className="flex min-h-11 items-center justify-between gap-2 rounded-[5px] px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-muted/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-sm"
                      >
                        <span>{tSite(topic.title)}</span>
                        <span
                          className="font-mono text-[11px]"
                          aria-label={tSite("{value0} guides", {
                            value0: topic.guides.length,
                          })}
                        >
                          {tSite(String(topic.guides.length).padStart(2, "0"))}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 hidden border-t border-border-subtle pt-5 lg:block">
                <BookOpen
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="mt-3 text-sm font-medium">
                  {tSite("Ready to implement?")}
                </p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {tSite(
                    "Find installation steps and API references in the docs.",
                  )}
                </p>
                <Link
                  href="/docs/starter-pro"
                  className={`${textLink} mt-2 text-xs`}
                >
                  {tSite("Starter docs")}
                  {tSite(" ")}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </aside>
            <div className="min-w-0 space-y-10 sm:space-y-12">
              {guideTopics.map((topic, index) => (
                <section
                  key={topic.id}
                  id={topic.id}
                  data-topic={topic.id}
                  className={styles.topicSection}
                  aria-labelledby={`${topic.id}-title`}
                >
                  <div className="mb-5 flex items-start gap-4">
                    <span
                      className="pt-1 font-mono text-xs text-muted-foreground"
                      aria-hidden="true"
                    >
                      {tSite(String(index + 1).padStart(2, "0"))}
                    </span>
                    <div>
                      <h3
                        id={`${topic.id}-title`}
                        className="text-lg font-semibold tracking-normal"
                      >
                        {tSite(topic.title)}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {tSite(topic.description)}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {topic.guides.map(({ category, icon: Icon, ...guide }) => (
                      <MarketingResourceCard
                        key={guide.href}
                        {...guide}
                        headingLevel={4}
                        className={`${styles.guideCard} bg-background p-6 shadow-none`}
                        meta={
                          <div className="mb-5 flex items-center gap-3">
                            <span className="grid size-9 shrink-0 place-items-center rounded-[5px] border border-border-subtle bg-surface-muted/20 text-foreground">
                              <Icon className="size-4" aria-hidden="true" />
                            </span>
                            <span className="text-xs">{tSite(category)}</span>
                          </div>
                        }
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="starter-pro-docs"
          width="full"
          className={styles.nextChapter}
          aria-labelledby="guides-source-docs-title"
        >
          <MarketingSectionHeader
            titleId="guides-source-docs-title"
            align="left"
            eyebrow={tSite("Starter Pro documentation")}
            title={tSite("Follow the setup guide for your platform.")}
            description={tSite(
              "Start with the source layout, prerequisites and backend configuration for Web, Mobile or Fullstack. These docs explain what to configure before launch.",
            )}
          />
          <StarterSourceDocs />
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
            <Link href="/docs/starter-pro/architecture" className={textLink}>
              {tSite("Explore architecture")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/product-releases"
              className={`${textLink} text-muted-foreground`}
            >
              {tSite("Product releases")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          width="full"
          className={styles.nextChapter}
          aria-labelledby="guides-next-title"
        >
          <MarketingSectionHeader
            titleId="guides-next-title"
            align="left"
            eyebrow={tSite("From reading to building")}
            title={tSite("Put the ideas to work.")}
            description={tSite(
              "Explore an interface, try a complete frontend, or inspect the integrations your product needs.",
            )}
          />
          <div className={styles.nextSteps}>
            <article
              className={styles.nextStepCard}
              aria-labelledby="guides-next-interface-title"
            >
              <header className={styles.nextStepHeader}>
                <span className={styles.nextStepNumber} aria-hidden="true">
                  01
                </span>
                <span className={styles.nextStepIcon}>
                  <PanelTop className="size-5" aria-hidden="true" />
                </span>
              </header>
              <div className={styles.nextStepSummary}>
                <p className={styles.nextStepEyebrow}>
                  {tSite("Components & patterns")}
                </p>
                <h3 id="guides-next-interface-title">
                  {tSite("Build the interface.")}
                </h3>
                <p className={styles.nextStepDescription}>
                  {tSite(
                    "Compose screens with public components, reusable layouts and working examples.",
                  )}
                </p>
              </div>
              <ul className={styles.nextStepCapabilities}>
                {["PyColors UI", "Blocks", "Examples"].map((capability) => (
                  <li key={capability}>{tSite(capability)}</li>
                ))}
              </ul>
              <Link
                href="/ui/patterns"
                className={`${textLink} ${styles.nextStepAction}`}
              >
                {tSite("Browse UI patterns")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <div className={styles.nextStepFollowup}>
                <div className={styles.nextStepSecondaryLinks}>
                  <Link
                    href="/blocks"
                    className={`${textLink} text-xs text-muted-foreground`}
                  >
                    {tSite("Explore Blocks")}
                  </Link>
                  <Link
                    href="/ui/examples"
                    className={`${textLink} text-xs text-muted-foreground`}
                  >
                    {tSite("View examples")}
                  </Link>
                </div>
              </div>
            </article>
            <article
              className={styles.nextStepCard}
              aria-labelledby="guides-next-free-title"
            >
              <header className={styles.nextStepHeader}>
                <span className={styles.nextStepNumber} aria-hidden="true">
                  02
                </span>
                <span className={styles.nextStepIcon}>
                  <LayoutDashboard className="size-5" aria-hidden="true" />
                </span>
              </header>
              <div className={styles.nextStepSummary}>
                <p className={styles.nextStepEyebrow}>
                  {tSite("Starter Free")}
                </p>
                <h3 id="guides-next-free-title">
                  {tSite("Explore a full product.")}
                </h3>
                <p className={styles.nextStepDescription}>
                  {tSite(
                    "Explore dashboards, settings and team workflows with mocked auth, billing and data.",
                  )}
                </p>
              </div>
              <ul className={styles.nextStepCapabilities}>
                {["Dashboards", "Settings", "Team workflows"].map(
                  (capability) => (
                    <li key={capability}>{tSite(capability)}</li>
                  ),
                )}
              </ul>
              <Link
                href="/starters/free"
                className={`${textLink} ${styles.nextStepAction}`}
              >
                {tSite("Start with Starter Free")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <div className={styles.nextStepFollowup}>
                <p className={styles.nextStepNote}>
                  {tSite("Public source code · Free to explore")}
                </p>
              </div>
            </article>
            <article
              className={`${styles.nextStep} ${styles.nextStepCard}`}
              aria-labelledby="guides-next-pro-title"
            >
              <header className={styles.nextStepHeader}>
                <span className={styles.nextStepNumber} aria-hidden="true">
                  03
                </span>
                <span className={styles.nextStepIcon}>
                  <Boxes className="size-5" aria-hidden="true" />
                </span>
              </header>
              <div className={styles.nextStepSummary}>
                <p className={styles.nextStepEyebrow}>{tSite("Starter Pro")}</p>
                <h3 id="guides-next-pro-title">
                  {tSite("Connect the foundations.")}
                </h3>
                <p className={styles.nextStepDescription}>
                  {tSite(
                    "Start with Better Auth, Stripe and Prisma. Configure your providers and validate before launch.",
                  )}
                </p>
              </div>
              <ul className={styles.nextStepCapabilities}>
                {["Better Auth", "Stripe", "Prisma"].map((capability) => (
                  <li key={capability}>{tSite(capability)}</li>
                ))}
              </ul>
              <Link
                href="/starters/pro"
                className={`${textLink} ${styles.nextStepAction}`}
              >
                {tSite("Explore Starter Pro")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <div className={styles.nextStepFollowup}>
                <BuyStarterProButton
                  fullWidth
                  label={tSite("Starter Pro — {value0}", {
                    value0: starterProPriceLabel,
                  })}
                  variant="outline"
                />
                <p className={styles.nextStepNote}>
                  {tSite("One-time payment · Source code license")}
                </p>
              </div>
            </article>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href="/pricing" className={textLink}>
              {tSite("Compare all products")}
              {tSite(" ")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/docs" className={`${textLink} text-muted-foreground`}>
              {tSite("Explore the documentation")}
              {tSite(" ")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/guides", locale);
}
