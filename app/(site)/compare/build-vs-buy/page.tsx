import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Code2,
  CreditCard,
  Database,
  GitBranch,
  Layers3,
  Lock,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { PageHero } from "@/components/marketing/page-hero";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import styles from "@/components/starters/build-vs-buy.module.css";

export const metadata: Metadata = {
  title: "Build vs Buy a Next.js SaaS Starter",
  description:
    "Compare building a Next.js SaaS starter from scratch with buying PyColors Starter Pro. Understand time, cost, scope, tradeoffs, and when each path makes sense.",
  alternates: { canonical: "/compare/build-vs-buy" },
  openGraph: {
    title: "Build vs Buy a Next.js SaaS Starter",
    description:
      "Compare architecture, integration effort and ownership when building SaaS foundations yourself or starting with PyColors Starter Pro.",
    url: "/compare/build-vs-buy",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Build vs Buy a Next.js SaaS Starter",
    description:
      "Compare the tradeoffs of building SaaS foundations from scratch versus starting with PyColors Starter Pro.",
    images: ["/seo/twitter-main.png"],
  },
};

const starterProPrice = PRODUCT_DISPLAY["starter-pro"].priceLabel;
const sections = [
  ["#choose-your-path", "Choose your path"],
  ["#cost-time-comparison", "Compare the work"],
  ["#included", "Included foundations"],
  ["#risks-tradeoffs", "Your responsibilities"],
] as const;

const options = [
  {
    id: "build-from-scratch",
    number: "01",
    icon: GitBranch,
    label: "Build from scratch",
    title: "Shape every decision.",
    description:
      "Start with your own architecture when the foundation is part of your advantage, or your team has specific platform requirements.",
    items: [
      "Custom infrastructure, auth or billing requirements.",
      "Existing team standards that shape the whole stack.",
      "Time to build, test and document each integration.",
    ],
    tradeoff: "You own the integration work from the first commit.",
    href: "/ui",
    link: "Build with PyColors UI",
  },
  {
    id: "buy-starter-pro",
    number: "02",
    icon: Layers3,
    label: "Start with Starter Pro",
    title: "Build on a connected foundation.",
    description:
      "Start with auth, billing and data foundations already structured together when the stack fits the product you want to build.",
    items: [
      "Next.js, Auth.js, Stripe and Prisma fit your needs.",
      "Recurring integration work is your next bottleneck.",
      "You are ready to review and adapt an existing codebase.",
    ],
    tradeoff: "You own configuration, customization and validation.",
    href: "/starters/pro",
    link: "Explore Starter Pro",
  },
] as const;

const comparisonRows = [
  {
    factor: "Architecture",
    scratch: "Choose every building block.",
    scratchDetail:
      "Define packages, routes, models and conventions around your requirements.",
    pro: "Review an existing structure.",
    proDetail:
      "Start with an opinionated Next.js foundation; adapt it to your product and team.",
  },
  {
    factor: "Authentication",
    scratch: "Assemble the account lifecycle.",
    scratchDetail:
      "Implement providers, sessions, verification, recovery and route protection.",
    pro: "Start with Auth.js flows.",
    proDetail:
      "Credentials, Google/GitHub OAuth, verification and reset flows. Configure your providers and email.",
  },
  {
    factor: "Billing",
    scratch: "Connect payments and app state.",
    scratchDetail:
      "Implement checkout, portal, webhooks and subscription access for your billing model.",
    pro: "Adapt the Stripe foundation.",
    proDetail:
      "Checkout, customer portal and webhook-backed subscriptions. Configure and test your Stripe account.",
  },
  {
    factor: "Data & permissions",
    scratch: "Design persistence and access.",
    scratchDetail:
      "Define your schema, migrations, session checks and authorization boundaries.",
    pro: "Extend the existing baseline.",
    proDetail:
      "Prisma + PostgreSQL foundations and server-side guards. Add domain data and product permissions.",
  },
  {
    factor: "Engineering effort",
    scratch: "Plan the foundation work.",
    scratchDetail:
      "Budget for implementation, integration tests, documentation and your product features.",
    pro: "Plan the adaptation work.",
    proDetail:
      "Budget for code review, configuration, customization and your product features.",
  },
  {
    factor: "Cost",
    scratch: "Engineering time + services.",
    scratchDetail:
      "Estimate build effort and recurring infrastructure costs for your own stack.",
    pro: `${starterProPrice} + adaptation + services.`,
    proDetail:
      "One-time launch price for the source. Hosting, database, email and other providers are separate.",
  },
  {
    factor: "Long-term ownership",
    scratch: "Maintain your implementation.",
    scratchDetail:
      "Own dependencies, security reviews, reliability and future changes.",
    pro: "Maintain your adapted product.",
    proDetail:
      "The same operational responsibilities remain. A starter is source code, not a managed service.",
  },
] as const;

const foundations = [
  {
    title: "Authentication",
    icon: Lock,
    description:
      "Account flows, sessions and protected routes built around Auth.js.",
    href: "/docs/starter-pro/auth",
    link: "Explore auth flows",
  },
  {
    title: "Stripe billing",
    icon: CreditCard,
    description:
      "Checkout, customer portal and subscription synchronization through webhooks.",
    href: "/docs/starter-pro/billing",
    link: "Review billing scope",
  },
  {
    title: "Data foundation",
    icon: Database,
    description:
      "Prisma and PostgreSQL foundations to extend with your domain models.",
    href: "/docs/starter-pro/backend",
    link: "Read the backend guide",
  },
  {
    title: "Application structure",
    icon: Code2,
    description:
      "Dashboard, settings, billing and admin surfaces within a protected app structure.",
    href: "/docs/starter-pro/architecture",
    link: "Inspect the architecture",
  },
] as const;

const responsibilities = [
  {
    title: "Your product decisions",
    icon: Layers3,
    description:
      "Onboarding, pricing, permissions and domain logic still need to fit your customers. Choose a foundation that leaves room for those decisions.",
  },
  {
    title: "Your launch configuration",
    icon: Settings2,
    description:
      "Set up your providers, secrets, database and deployment. Test real account, payment and access flows in your own environment.",
  },
  {
    title: "Your ongoing maintenance",
    icon: ShieldCheck,
    description:
      "Plan for dependency updates, monitoring, backups and security reviews. Both paths lead to an application you operate.",
  },
] as const;

export default function BuildVsBuyComparisonPage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="w-full min-w-0">
          <Breadcrumb
            className={`mb-8 ${styles.breadcrumb}`}
            items={[
              { label: "Home", href: "/" },
              { label: "Build vs Buy", href: "/compare/build-vs-buy" },
            ]}
          />
          <div className="grid items-center gap-10 pb-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)] lg:gap-16 lg:pb-16">
            <PageHero
              variant="compact"
              align="left"
              badges={[
                {
                  label: "Build vs buy",
                  icon: <GitBranch className="size-3.5" aria-hidden="true" />,
                },
              ]}
              title="Build from scratch. Or start with Pro."
              description="Choose where your engineering time goes. Compare building your own SaaS foundation with adapting Starter Pro — from the first integration to the work you still own after launch."
              contentClassName="max-w-none"
              actions={
                <>
                  <Button
                    asChild
                    size="lg"
                    className="site-primary-action rounded-[5px]"
                  >
                    <Link href="#cost-time-comparison">
                      Compare the work{" "}
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-[5px]"
                  >
                    <Link href="/starters/pro">
                      Inspect Starter Pro{" "}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </>
              }
            />
            <aside
              aria-labelledby="decision-brief"
              className={`${styles.brief} rounded-[5px] border border-border-subtle p-6 sm:p-8`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                The decision brief
              </p>
              <h2
                id="decision-brief"
                className="mt-3 text-xl font-semibold tracking-heading"
              >
                Start with the fit.
              </h2>
              <dl className="mt-6 divide-y divide-border-subtle">
                {[
                  ["Stack", "Does the architecture match your constraints?"],
                  [
                    "Effort",
                    "Is integration or adaptation the better use of your time?",
                  ],
                  ["Ownership", "Can you maintain the product you launch?"],
                ].map(([label, text]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[5rem_1fr] gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <dt className="text-xs font-medium">{label}</dt>
                    <dd className="text-xs leading-6 text-muted-foreground">
                      {text}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <nav
            aria-label="Comparison page sections"
            className="flex flex-wrap gap-x-6 gap-y-1 border-y border-border-subtle py-2"
          >
            {sections.map(([href, label]) => (
              <Link key={href} href={href} className={styles.textLink}>
                {label}
              </Link>
            ))}
          </nav>

          <MarketingSectionShell
            id="choose-your-path"
            width="full"
            aria-labelledby="choose-your-path-heading"
            className="scroll-mt-24"
          >
            <MarketingSectionHeader
              titleId="choose-your-path-heading"
              title="Two paths. Different priorities."
              description="The right choice depends on your constraints, your stack and the work your team wants to own."
              align="left"
            />
            <div className={styles.options}>
              {options.map((option, index) => {
                const Icon = option.icon;
                return (
                  <article
                    key={option.id}
                    id={option.id}
                    aria-labelledby={`${option.id}-heading`}
                    className={`${styles.option} ${index === 1 ? styles.proOption : ""} scroll-mt-24`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className={styles.iconFrame}>
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span
                        className="font-mono text-xs text-muted-foreground"
                        aria-hidden="true"
                      >
                        {option.number}
                      </span>
                    </div>
                    <p className="mt-6 text-xs font-medium text-muted-foreground">
                      {option.label}
                    </p>
                    <h3
                      id={`${option.id}-heading`}
                      className="mt-2 text-xl font-semibold tracking-subheading sm:text-2xl"
                    >
                      {option.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {option.description}
                    </p>
                    <ul className="mb-6 mt-6 space-y-3">
                      {option.items.map((item) => (
                        <MarketingCheckItem
                          key={item}
                          className={styles.checkItem}
                        >
                          {item}
                        </MarketingCheckItem>
                      ))}
                    </ul>
                    <div className="mt-auto border-t border-border-subtle pt-5">
                      <p className="text-xs leading-6 text-muted-foreground">
                        {option.tradeoff}
                      </p>
                      <Link
                        className={`${styles.textLink} mt-2`}
                        href={option.href}
                      >
                        {option.link}{" "}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="cost-time-comparison"
            width="full"
            aria-labelledby="comparison-heading"
            className="scroll-mt-24 border-t border-border-subtle"
          >
            <MarketingSectionHeader
              titleId="comparison-heading"
              title="Compare the work, not just the price."
              description="Look at what you build, what you adapt and what you maintain. The launch date depends on your scope, experience and quality requirements."
              align="left"
            />
            <div className="min-w-0 overflow-hidden rounded-[5px] border border-border-subtle bg-background">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-5 py-4 sm:px-6">
                <p className="text-xs font-medium">
                  One product. Two starting points.
                </p>
                <span className="flex items-center gap-2 text-xs text-muted-foreground md:hidden">
                  <ArrowLeftRight className="size-3.5" aria-hidden="true" />
                  Scroll to compare
                </span>
                <span className="hidden text-xs text-muted-foreground md:inline">
                  Scope · effort · ownership
                </span>
              </div>
              <div
                role="region"
                aria-label="Build versus buy comparison, scroll horizontally for all columns"
                tabIndex={0}
                className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
              >
                <table
                  className={styles.comparisonTable}
                  aria-describedby="comparison-context"
                >
                  <caption className="sr-only">
                    Compare building from scratch with Starter Pro
                  </caption>
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="w-[22%] text-xs font-medium text-muted-foreground"
                      >
                        Decision area
                      </th>
                      <th scope="col" aria-labelledby="scratch-column">
                        <span
                          id="scratch-column"
                          className="block text-lg font-semibold tracking-tight sm:text-xl"
                        >
                          Build from scratch
                        </span>
                        <span className="mt-2 block text-xs font-normal leading-6 text-muted-foreground">
                          Choose and connect your stack.
                        </span>
                      </th>
                      <th scope="col" aria-labelledby="pro-column">
                        <span
                          id="pro-column"
                          className="block text-lg font-semibold tracking-tight sm:text-xl"
                        >
                          Starter Pro
                        </span>
                        <span className="mt-2 block text-xs font-normal leading-6 text-muted-foreground">
                          Review, configure and extend.
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.factor}>
                        <th
                          scope="row"
                          className="text-xs font-medium sm:text-sm"
                        >
                          {row.factor}
                        </th>
                        <td>
                          <p className="text-sm font-medium">{row.scratch}</p>
                          <p className="mt-2 text-xs leading-6 text-muted-foreground">
                            {row.scratchDetail}
                          </p>
                        </td>
                        <td>
                          <p className="text-sm font-medium">{row.pro}</p>
                          <p className="mt-2 text-xs leading-6 text-muted-foreground">
                            {row.proDetail}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p
                id="comparison-context"
                className="border-t border-border-subtle px-5 py-4 text-xs leading-6 text-muted-foreground sm:px-6"
              >
                Starter Pro is source code, not a hosted service. Both paths
                require product development, testing, deployment and
                maintenance. Time and cost depend on your project; no fixed
                saving is assumed.
              </p>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="included"
            width="full"
            aria-labelledby="included-heading"
            className="scroll-mt-24 border-t border-border-subtle"
          >
            <MarketingSectionHeader
              titleId="included-heading"
              title="Inspect the foundation before you decide."
              description="Follow each system into the documentation to evaluate its scope and how it fits your product."
              align="left"
              action={
                <Link className={styles.textLink} href="/docs/starter-pro">
                  <BookOpen className="size-4" aria-hidden="true" />
                  Starter Pro documentation
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              }
            />
            <div className={styles.foundationGrid}>
              {foundations.map((item) => {
                const Icon = item.icon;
                return (
                  <MarketingFeatureCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    className={styles.foundationCard}
                    icon={<Icon className="size-5" aria-hidden="true" />}
                    action={
                      <Link className={styles.textLink} href={item.href}>
                        {item.link}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    }
                  />
                );
              })}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="risks-tradeoffs"
            width="full"
            aria-labelledby="responsibilities-heading"
            className="scroll-mt-24 border-t border-border-subtle"
          >
            <MarketingSectionHeader
              titleId="responsibilities-heading"
              title="The work that stays with you."
              description="Buying changes your starting point. The product and its operation remain your responsibility."
              align="left"
            />
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {responsibilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="border-t border-border-subtle pt-6"
                  >
                    <Icon
                      className="size-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <h3 className="mt-4 text-base font-semibold tracking-normal">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-border-subtle pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-xs leading-6 text-muted-foreground">
                Specific infrastructure, authentication or billing constraints
                can make a custom build the better fit. Review those constraints
                before purchasing.
              </p>
              <Link
                className={`${styles.textLink} shrink-0`}
                href="/docs/starter-pro/production-checklist"
              >
                Review the launch checklist
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </MarketingSectionShell>

          <section
            aria-labelledby="next-step-heading"
            className="border-t border-border-subtle pt-14 sm:pt-16"
          >
            <div
              className={`${styles.nextStep} overflow-hidden rounded-[5px] border border-border-subtle`}
            >
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:p-10">
                <div>
                  <Badge variant="outline" className="bg-background">
                    Your next step
                  </Badge>
                  <h2
                    id="next-step-heading"
                    className="mt-4 text-balance text-2xl font-semibold tracking-heading sm:text-3xl"
                  >
                    Choose with the product in front of you.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                    Explore Starter Free to evaluate the interface and
                    workflows. Review Starter Pro when real authentication,
                    billing and data become your next implementation step.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
                    <Link className={styles.textLink} href="/starters/free">
                      Explore Starter Free
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                    <Link className={styles.textLink} href="/upgrade">
                      Compare Free and Pro
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    Starter Free uses mocked auth, billing and product data.
                  </p>
                </div>
                <div className="border-t border-border-subtle pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-sm font-medium">Starter Pro</h3>
                    <Badge variant="secondary">Launch offer</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-3xl font-semibold tracking-tight">
                      {starterProPrice}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      One-time payment
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">
                    Planned regular price{" "}
                    {PRODUCT_DISPLAY["starter-pro"].regularPriceLabel}
                  </p>
                  <BuyStarterProButton
                    className="mt-5"
                    label={`Buy Starter Pro — ${starterProPrice}`}
                  />
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    Source ZIP via your claim email after payment confirmation
                    and delivery processing.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border-subtle bg-background/60 px-6 py-3 sm:px-8 lg:px-10">
                <Link className={styles.textLink} href="/pricing">
                  All plans
                </Link>
                <Link className={styles.textLink} href="/license">
                  License
                </Link>
                <Link
                  className={styles.textLink}
                  href="/docs/starter-pro/delivery"
                >
                  Delivery guide
                </Link>
                <Link
                  className={`${styles.textLink} sm:ml-auto`}
                  href="/orders/support"
                >
                  Purchase support
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
