import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Code2,
  CreditCard,
  Database,
  FileArchive,
  Layers3,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Badge, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingFaq } from "@/components/marketing/faq";
import { PageHero } from "@/components/marketing/page-hero";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { StarterComparisonTable } from "@/components/starters/starter-comparison-table";
import styles from "@/components/starters/upgrade.module.css";

const description =
  "Compare Starter Free and Starter Pro. Explore authentication, Stripe billing and database foundations, understand the upgrade path, and review source delivery and setup before buying.";
const metadata: Metadata = {
  title: "Next.js SaaS Auth & Billing Starter",
  description,
  alternates: { canonical: "/upgrade" },
  openGraph: {
    title: "Next.js SaaS Auth & Billing Starter",
    description,
    url: "/upgrade",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Auth & Billing Starter",
    description,
    images: ["/seo/twitter-main.png"],
  },
};
const PRICING = {
  source: PRODUCT_DISPLAY["starter-pro"].priceLabel,
} as const;

const foundations = [
  {
    title: "Authentication",
    icon: LockKeyhole,
    label: "01 / Identity",
    description:
      "Auth.js credentials, Google and GitHub OAuth, verification, password reset and sessions.",
    href: "/docs/starter-pro/auth",
    link: "Review authentication",
  },
  {
    title: "Stripe billing",
    icon: CreditCard,
    label: "02 / Subscriptions",
    description:
      "Checkout, customer portal, invoices and subscription state synchronized through webhooks.",
    href: "/docs/starter-pro/billing",
    link: "Review billing",
  },
  {
    title: "Database foundation",
    icon: Database,
    label: "03 / Persistence",
    description:
      "Prisma and PostgreSQL foundations for accounts and billing. Extend the models for your product.",
    href: "/docs/starter-pro/backend",
    link: "Review the backend",
  },
  {
    title: "Protected application",
    icon: ShieldCheck,
    label: "04 / Product access",
    description:
      "Server-side session guards, account areas and installable PWA foundations with online-first auth and billing.",
    href: "/docs/starter-pro/architecture",
    link: "Review the architecture",
  },
] as const;

const upgradeSteps = [
  {
    title: "Set up the Pro foundation",
    detail:
      "Run the Pro source locally. Configure PostgreSQL, auth providers, email and Stripe in your development environment.",
    href: "/docs/starter-pro/getting-started",
    link: "Follow the setup guide",
  },
  {
    title: "Bring across your product work",
    detail:
      "Port your components, layouts and branding. Adapt routes, domain models and permissions to the Pro architecture.",
    href: "/docs/starter/upgrade",
    link: "Plan the move from Free",
  },
  {
    title: "Validate before you launch",
    detail:
      "Test sign-in, account recovery, checkout, webhooks and access checks. Plan data migration and deployment for your own app.",
    href: "/docs/starter-pro/production-checklist",
    link: "Review the production checklist",
  },
] as const;

const faqs = [
  {
    question: "When should I move from Free to Pro?",
    answer:
      "Stay with Starter Free while you are validating screens, navigation and product workflows with demo data. Consider Pro when real accounts, protected access, payments and persistence become your next implementation work.",
    links: [{ href: "/starters/free", label: "Explore Starter Free" }],
  },
  {
    question: "Does buying Pro automatically upgrade my Free project?",
    answer:
      "No. Starter Pro is a separate source package. Bring your components, layouts and branding across deliberately, adapt your routes and data models, and validate the integrations. Buying Pro does not automatically migrate your application or data.",
    links: [{ href: "/docs/starter/upgrade", label: "Read the upgrade guide" }],
  },
  {
    question: "What do I still need to build and configure?",
    answer:
      "You own your product logic, onboarding and domain-specific workflows. Configure your database, auth providers, email and Stripe, then test the complete customer journey before deploying. Hosting and third-party services are separate.",
    links: [
      {
        href: "/docs/starter-pro/production-checklist",
        label: "Review production responsibilities",
      },
    ],
  },
  {
    question: "What do I receive after purchase?",
    answer:
      "After payment confirmation and delivery processing, a claim email is sent to your checkout address. Use its secure access link to download the Starter Pro source ZIP and follow the setup documentation.",
    links: [
      { href: "/docs/starter-pro/delivery", label: "Understand delivery" },
      { href: "/orders/recover", label: "Recover purchase access" },
    ],
  },
  {
    question: "What does the source licence include?",
    answer: `Starter Pro is available for ${PRICING.source} as a one-time source licence. Implementation services are quoted separately. It includes the source package and commercial usage under the PyColors license.`,
    links: [{ href: "/pricing", label: "Review pricing" }],
  },
  {
    question: "Where can I review the license or get purchase help?",
    answer:
      "Review the license and purchase terms for the usage scope. If you already purchased, use access recovery or the purchase support page.",
    links: [
      { href: "/license", label: "Read the license" },
      { href: "/terms", label: "Read purchase terms" },
      { href: "/orders/support", label: "Purchase support" },
    ],
  },
] as const;
const actionClass = "rounded-[5px] shadow-none";

export default function UpgradePage() {
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
      <Container className="pb-16 pt-24 sm:pt-28">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0 max-w-3xl"
            badges={[
              { label: "Starter Free → Starter Pro", variant: "outline" },
            ]}
            title={tSite("Your next step: real accounts and payments.")}
            description={tSite(
              "Move beyond demo flows with authentication, Stripe billing and a PostgreSQL foundation. Bring your interface work into Starter Pro, configure your services and keep building your product.",
            )}
            actions={
              <>
                <Button
                  size="lg"
                  asChild
                  variant="outline"
                  className={actionClass}
                >
                  <Link href="#upgrade-comparison">
                    {tSite("Compare Free and Pro")}
                    {tSite("  ")}
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Link href="/starters/pro" className={styles.textLink}>
                  {tSite("Explore the full starter")}
                  {tSite("  ")}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </>
            }
            extra={
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-border-subtle pt-5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Code2 className="size-3.5" aria-hidden="true" />
                  {tSite("Shared PyColors UI foundation")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Layers3 className="size-3.5" aria-hidden="true" />
                  {tSite("Bring your product work across")}
                </span>
              </div>
            }
          />
          <aside
            aria-label={tSite("Starter Pro purchase")}
            className={cn(
              "rounded-[5px] border border-border-subtle p-5 sm:p-6",
              styles.offerPanel,
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">{tSite("Starter Pro")}</p>
              <Badge variant="outline" className="bg-background text-[11px]">
                {tSite("Source licence")}
              </Badge>
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-4xl font-semibold tracking-[-0.04em]">
                {tSite(PRICING.source)}
              </span>
              <span className="text-xs text-muted-foreground">
                {tSite("One-time payment")}
              </span>
            </div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              {tSite(
                "Complete source licence. Implementation services are quoted separately.",
              )}
            </p>
            <ul
              className="my-5 space-y-3"
              aria-label={tSite("Starter Pro purchase includes")}
            >
              {[
                "Full Starter Pro source ZIP",
                "Auth, billing and database foundations",
                "Setup and production documentation",
              ].map((item) => (
                <MarketingCheckItem key={item} className={styles.checkItem}>
                  {tSite(item)}
                </MarketingCheckItem>
              ))}
            </ul>
            <BuyStarterProButton
              label={tSite("Buy Starter Pro — {value0}", {
                value0: PRICING.source,
              })}
              className="shadow-none hover:shadow-none"
            />
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              {tSite(
                "Access arrives by claim email after payment confirmation and delivery processing.",
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
          aria-label={tSite("Upgrade page sections")}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-1 border-y border-border-subtle py-2 text-muted-foreground"
        >
          {[
            ["What Pro adds", "upgrade-foundations"],
            ["Free vs Pro", "upgrade-comparison"],
            ["Upgrade path", "upgrade-path"],
            ["Delivery", "upgrade-delivery"],
            ["FAQ", "upgrade-faq"],
          ].map(([label, id]) => (
            <Link key={id} href={`#${id}`} className={styles.textLink}>
              {tSite(label)}
            </Link>
          ))}
        </nav>

        <MarketingSectionShell
          divider="pattern"
          id="upgrade-foundations"
          aria-labelledby="upgrade-foundations-title"
          width="full"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            align="left"
            titleId="upgrade-foundations-title"
            title={tSite("The systems behind your product.")}
            description={tSite(
              "Four connected foundations, with documentation you can review before buying.",
            )}
            action={
              <Link
                href="/docs/starter-pro/what-is-included"
                className={styles.textLink}
              >
                {tSite("Review everything included")}{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <div className={styles.foundationGrid}>
            {foundations.map((item) => (
              <MarketingFeatureCard
                key={item.title}
                title={tSite(item.title)}
                description={tSite(item.description)}
                icon={<item.icon className="size-4" />}
                className={styles.foundationCard}
                meta={
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {tSite(item.label)}
                  </span>
                }
                action={
                  <Link href={item.href} className={styles.textLink}>
                    {item.link}{" "}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                }
              />
            ))}
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="upgrade-comparison"
          aria-labelledby="upgrade-comparison-title"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="upgrade-comparison-title"
            title={tSite("Choose the starting point you need.")}
            description={tSite(
              "Keep Free while shaping the interface. Choose Pro when accounts, payments and persistence become the next step.",
            )}
          />
          <StarterComparisonTable />
        </MarketingSectionShell>

        <MarketingSectionShell
          id="upgrade-path"
          aria-labelledby="upgrade-path-title"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="upgrade-path-title"
            title={tSite("A deliberate move from Free to Pro.")}
            description={tSite(
              "Start with the Pro foundation, carry over your product work and validate each integration before launch.",
            )}
          />
          <div className="grid overflow-hidden rounded-[5px] border border-border-subtle lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <ol
              className="divide-y divide-border-subtle bg-background"
              aria-label={tSite("Free to Pro upgrade steps")}
            >
              {upgradeSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex items-start gap-4 p-5 sm:gap-5 sm:p-7"
                >
                  <span className={styles.stepNumber} aria-hidden="true">
                    0{tSite(index + 1)}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-normal">
                      {tSite(step.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {tSite(step.detail)}
                    </p>
                    <Link
                      href={step.href}
                      className={cn("mt-2", styles.textLink)}
                    >
                      {tSite(step.link)}
                      {tSite("  ")}
                      <ArrowRight
                        className="size-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
            <div
              className={cn(
                "flex flex-col border-t border-border-subtle p-5 sm:p-8 lg:border-l lg:border-t-0",
                styles.pathPanel,
              )}
            >
              <span className={styles.iconFrame}>
                <Code2 className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-subheading">
                {tSite("Your product work comes with you.")}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {tSite(
                  "Free and Pro share the PyColors UI foundation. Reuse the parts you have shaped, then adapt them to real sessions and data.",
                )}
              </p>
              <ul
                className="mt-6 space-y-3"
                aria-label={tSite("Work to bring from Free")}
              >
                {[
                  "Components and page layouts",
                  "Branding, content and theme tokens",
                  "Product workflows you have validated",
                ].map((item) => (
                  <MarketingCheckItem key={item} className={styles.checkItem}>
                    {tSite(item)}
                  </MarketingCheckItem>
                ))}
              </ul>
              <div className="mt-auto border-t border-border-subtle pt-5">
                <p className="mt-6 text-xs leading-6 text-muted-foreground">
                  {tSite(
                    "This is a source-code upgrade. Buying Pro does not automatically migrate your app, move your data or deploy it.",
                  )}
                </p>
                <Link
                  href="/docs/starter-pro/architecture"
                  className={cn("mt-2", styles.textLink)}
                >
                  {tSite("Review the Pro architecture")}
                  {tSite("  ")}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="upgrade-delivery"
          aria-labelledby="upgrade-delivery-title"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <div
            className={cn(
              "overflow-hidden rounded-[5px] border border-border-subtle",
              styles.deliveryPanel,
            )}
          >
            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:p-10">
              <div>
                <span className={styles.iconFrame}>
                  <FileArchive className="size-5" aria-hidden="true" />
                </span>
                <MarketingSectionHeader
                  align="left"
                  titleId="upgrade-delivery-title"
                  title={tSite("From purchase to your project.")}
                  description={tSite(
                    "A source package to inspect, configure and adapt. Use your checkout email to receive and recover access.",
                  )}
                  className="mb-0 mt-5"
                />
                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-background text-xs">
                    {tSite("Source ZIP")}
                  </Badge>
                  <Badge variant="outline" className="bg-background text-xs">
                    {tSite("Setup documentation")}
                  </Badge>
                  <Badge variant="outline" className="bg-background text-xs">
                    {tSite("Commercial license")}
                  </Badge>
                </div>
              </div>
              <ol
                aria-label={tSite("Starter Pro delivery steps")}
                className="space-y-5"
              >
                {[
                  [
                    "Complete checkout",
                    "Use the email address where you want to receive your purchase access.",
                  ],
                  [
                    "Open your claim email",
                    "After payment confirmation and delivery processing, follow the secure access link.",
                  ],
                  [
                    "Download and set up",
                    "Unzip the source, follow the documentation and configure your own services.",
                  ],
                ].map(([title, detail], index) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className={styles.stepNumber} aria-hidden="true">
                      0{tSite(index + 1)}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium">{tSite(title)}</h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        {tSite(detail)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border-subtle bg-background/70 px-5 py-3 sm:px-8 lg:px-10">
              <Link
                href="/docs/starter-pro/delivery"
                className={styles.textLink}
              >
                <BookOpen className="size-3.5" aria-hidden="true" />
                {tSite("Read the delivery guide")}
              </Link>
              <Link href="/orders/recover" className={styles.textLink}>
                {tSite("Recover purchase access")}
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
          id="upgrade-faq"
          aria-labelledby="upgrade-faq-heading"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
        >
          <MarketingFaq
            titleId="upgrade-faq-heading"
            title={tSite("Clear scope. Clear decision.")}
            description={tSite(
              "The practical questions about moving to Pro, configuring your project and receiving the source.",
            )}
            items={faqs}
          />
        </MarketingSectionShell>

        <section
          aria-labelledby="upgrade-purchase-title"
          className={cn(
            "grid items-center gap-7 rounded-[5px] border border-border-subtle p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_19rem]",
            styles.offerPanel,
          )}
        >
          <div className="max-w-2xl">
            <h2
              id="upgrade-purchase-title"
              className="text-2xl font-semibold tracking-heading sm:text-3xl"
            >
              {tSite("Build your next stage on Pro.")}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {tSite(
                "Authentication, billing and database foundations, with the source and documentation to make them yours.",
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5">
              <Link href="/starters/pro" className={styles.textLink}>
                {tSite("Explore Starter Pro")}
                {tSite("  ")}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <Link href="/pricing" className={styles.textLink}>
                {tSite("Compare all products")}
                {tSite("  ")}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div>
            <BuyStarterProButton
              label={tSite("Upgrade to Starter Pro — {value0}", {
                value0: PRICING.source,
              })}
              className="shadow-none hover:shadow-none"
            />
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              {tSite(
                "One-time purchase. Your hosting and third-party services are separate.",
              )}
            </p>
          </div>
        </section>
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
  return localizePageMetadata(metadata, "/upgrade", locale);
}
