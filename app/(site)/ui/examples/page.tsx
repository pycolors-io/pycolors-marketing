import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  CreditCard,
  Layers3,
  LockKeyhole,
  Palette,
  Table2,
  Terminal,
} from "lucide-react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Badge, Button, cn } from "@pycolors/ui";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { UiSectionNav } from "@/components/marketing/ui-section-nav";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { StarterFreePreview } from "@/components/starters/starter-free-preview";
import styles from "@/components/marketing/ui-examples.module.css";

const description =
  "Explore six Next.js SaaS interface examples from PyColors Starter Free: dashboard, projects, authentication, settings, billing and admin. Try the demo and run the source locally with sample data.";
export const metadata: Metadata = {
  title: "Next.js SaaS Examples",
  description,
  alternates: { canonical: "/ui/examples" },
  openGraph: {
    title: "Next.js SaaS Examples",
    description,
    url: "/ui/examples",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Examples",
    description,
    images: ["/seo/twitter-main.png"],
  },
};
const AVAILABLE_NOW = {
  repoHref: "https://github.com/pycolors-io/pycolors-starter-free",
  demoHref: "https://starter-demo.pycolors.io",
} as const;
const quickStart = `git clone https://github.com/pycolors-io/pycolors-starter-free.git
cd pycolors-starter-free
pnpm install
pnpm dev`;
const screens = [
  {
    id: "dashboard",
    label: "Dashboard",
    route: "/dashboard",
    title: "Make the overview useful.",
    description:
      "Sample metrics, project activity and clear next actions inside a responsive application shell.",
    image: "/images/starters/free/dashboard-free-page-pycolors.png",
    points: [
      "Cards with a clear information hierarchy",
      "Shared desktop and mobile navigation",
    ],
    note: "Metrics and activity use demonstration data.",
    docs: "/docs/blocks/data/stats-overview",
    docsLabel: "Explore the stats block",
  },
  {
    id: "projects",
    label: "Projects",
    route: "/projects",
    title: "Give records a clear workflow.",
    description:
      "A project table, detail pages and contextual actions for creating, renaming and deleting records.",
    image: "/images/starters/free/projects-page-pycolors.png",
    points: ["Tables and row actions", "Dialogs for focused tasks"],
    note: "Project changes use client-side demo state, not a database.",
    docs: "/docs/blocks/data/data-table",
    docsLabel: "Explore the table block",
  },
  {
    id: "auth",
    label: "Auth",
    route: "/login",
    title: "Start with a considered sign-in.",
    description:
      "Sign-in, registration and password reset interfaces with form, loading and validation states.",
    image: "/images/starters/free/auth-page-pycolors.png",
    points: ["Email and password inputs", "Clear feedback and recovery paths"],
    note: "These screens do not create real accounts or sessions.",
    docs: "/docs/starter/auth-concept",
    docsLabel: "Read the authentication scope",
  },
  {
    id: "settings",
    label: "Settings",
    route: "/settings",
    title: "Make account changes predictable.",
    description:
      "Profile, preferences and security sections with a consistent hierarchy for everyday and destructive actions.",
    image: "/images/starters/free/settings-page-pycolors.png",
    points: [
      "Grouped account forms",
      "Primary and destructive action patterns",
    ],
    note: "Connect saving and session management to your own services.",
    docs: "/docs/blocks/account/settings-panel",
    docsLabel: "Explore the settings block",
  },
  {
    id: "billing",
    label: "Billing",
    route: "/billing",
    title: "Design the subscription experience.",
    description:
      "Sample plans, payment details and invoice history bring the billing interface into the same design system.",
    image: "/images/starters/free/billing-free-page-pycolors.png",
    points: [
      "Plan and subscription summaries",
      "Invoice and payment information",
    ],
    note: "Checkout and the customer portal are not connected.",
    docs: "/docs/starter/billing-concept",
    docsLabel: "Read the billing scope",
  },
  {
    id: "admin",
    label: "Admin",
    route: "/admin",
    title: "Bring the workspace together.",
    description:
      "Member, role and invitation interfaces for shaping how people work together in your product.",
    image: "/images/starters/free/admin-page-pycolors.png",
    points: [
      "Member lists and role controls",
      "Invitation and management dialogs",
    ],
    note: "Authorization and invitation delivery need service integrations.",
    docs: "/docs/blocks/account/workspace-members",
    docsLabel: "Explore the members block",
  },
] as const;
const buildingBlocks = [
  {
    title: "Records & actions",
    icon: Table2,
    label: "Projects · Admin",
    description:
      "Organize data, expose row actions and keep editing tasks in context.",
    href: "/docs/blocks/data/data-table",
    link: "Explore the data table",
    components: [
      ["Table", "table"],
      ["Dialog", "dialog"],
      ["Dropdown Menu", "dropdown-menu"],
    ],
  },
  {
    title: "Forms & account",
    icon: LockKeyhole,
    label: "Auth · Settings",
    description:
      "Compose labelled fields, clear actions and feedback for account flows.",
    href: "/docs/blocks/auth/sign-in",
    link: "Explore the sign-in block",
    components: [
      ["Input", "input"],
      ["Password Input", "password-input"],
      ["Alert", "alert"],
    ],
  },
  {
    title: "Plans & billing",
    icon: CreditCard,
    label: "Dashboard · Billing",
    description:
      "Give plans, payment details and invoices a consistent visual hierarchy.",
    href: "/docs/blocks/commerce/billing-overview",
    link: "Explore the billing block",
    components: [
      ["Card", "card"],
      ["Badge", "badge"],
      ["Button", "button"],
    ],
  },
] as const;
const nextSteps = [
  {
    title: "Choose your building blocks",
    icon: Layers3,
    label: "Blocks",
    description:
      "Copy focused sections into your existing app and adapt the source to your workflow.",
    href: "/blocks",
  },
  {
    title: "Make the theme your own",
    icon: Palette,
    label: "Theme Builder",
    description:
      "Explore semantic colors, light and dark appearances, and typography for your interface.",
    href: "/tools/theme-builder",
  },
] as const;
const actionClass = "min-h-11 rounded-[5px] px-5 text-sm shadow-none";

function AvailableNowCard() {
  return (
    <div className="overflow-hidden rounded-[5px] border border-border-subtle bg-background">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-base font-semibold tracking-normal">
            PyColors Starter Free
          </h3>
          <Badge variant="outline" className="bg-background text-[11px]">
            Open source · MIT
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="text-xs text-muted-foreground">
            Next.js · TypeScript · PyColors UI
          </span>
          <a
            href={AVAILABLE_NOW.repoHref}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View source on GitHub (opens in a new tab)"
            className={styles.textLink}
          >
            View source on GitHub{" "}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className={styles.preview}>
        <StarterFreePreview
          screens={screens.map((screen, index) => ({
            id: screen.id,
            label: screen.label,
            content: (
              <figure className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_20rem]">
                <div
                  className={cn(
                    "flex min-w-0 items-center border-b border-border-subtle p-4 sm:p-7 lg:border-b-0 lg:border-r",
                    styles.previewStage,
                  )}
                >
                  <div className={styles.browserWindow}>
                    <div
                      className="flex h-9 items-center gap-2 border-b border-border-subtle bg-background px-3 text-[10px] text-muted-foreground"
                      aria-hidden="true"
                    >
                      <span className={styles.windowDot} />
                      <span className={styles.windowDot} />
                      <span className={styles.windowDot} />
                      <span className="ml-2 truncate font-mono">
                        starter-free{screen.route}
                      </span>
                    </div>
                    <div className="relative aspect-16/10 bg-white">
                      <Image
                        src={screen.image}
                        alt={`Starter Free ${screen.label.toLowerCase()} screen with demonstration data`}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1280px) 850px, (min-width: 1024px) 65vw, 94vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                <figcaption className="flex flex-col p-5 sm:p-7">
                  <div className="flex items-center justify-between gap-3 font-mono text-[10px] text-muted-foreground">
                    <span>0{index + 1} / 06</span>
                    <span>{screen.route}</span>
                  </div>
                  <h4 className="mt-5 text-xl font-semibold tracking-subheading">
                    {screen.title}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {screen.description}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {screen.points.map((point) => (
                      <MarketingCheckItem
                        key={point}
                        className={styles.checkItem}
                      >
                        {point}
                      </MarketingCheckItem>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-border-subtle pt-4 text-xs leading-6 text-muted-foreground">
                    {screen.note}
                  </p>
                  <div className="mt-auto flex flex-col items-start pt-4">
                    <a
                      href={`${AVAILABLE_NOW.demoHref}${screen.route}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Try ${screen.label.toLowerCase()} demo (opens in a new tab)`}
                      className={styles.textLink}
                    >
                      Try {screen.label.toLowerCase()} demo{" "}
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                    <Link
                      href={screen.docs}
                      className={cn(styles.textLink, "text-muted-foreground")}
                    >
                      {screen.docsLabel}{" "}
                      <ArrowRight
                        className="size-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </figcaption>
              </figure>
            ),
          }))}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1 border-t border-border-subtle px-5 py-3 sm:px-7">
        <p className="max-w-3xl text-xs leading-6 text-muted-foreground">
          Light-theme captures with sample data. Authentication, payments and
          permissions are mocked.
        </p>
        <Link href="/starters/free" className={styles.textLink}>
          Explore Starter Free{" "}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default function ExamplesPage() {
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
        <div className={styles.sectionNav}>
          <UiSectionNav active="examples" />
        </div>
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[{ label: "PyColors UI / Examples", variant: "outline" }]}
          title="See the components become a product."
          description="Explore a dashboard, project workflows and account screens built with PyColors UI. Try the runnable Starter Free demo, inspect the source and bring the parts you need into your own app."
          actions={
            <>
              <Button asChild className={`site-primary-action ${actionClass}`}>
                <Link href="#example-screens">
                  Explore the screens{" "}
                  <ArrowDown className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" className={actionClass}>
                <a
                  href={AVAILABLE_NOW.demoHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open live demo (opens in a new tab)"
                >
                  Open live demo{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </>
          }
          extra={
            <p className="text-xs leading-6 text-muted-foreground">
              Six screens · Full source code · Demo data · No account required
            </p>
          }
        />
        <MarketingSectionShell
          id="example-screens"
          aria-labelledby="example-screens-title"
          width="full"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            align="left"
            titleId="example-screens-title"
            title="One application. Six everyday workflows."
            description="Select a screen to see the layout, understand its scope and open the corresponding demo."
          />
          <AvailableNowCard />
        </MarketingSectionShell>
        <MarketingSectionShell
          id="example-components"
          aria-labelledby="example-components-title"
          width="full"
          className="border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="example-components-title"
            title="Find the pieces behind the interface."
            description="Explore related source-copy blocks and the primitives you can compose in your own product."
            action={
              <Link href="/ui/patterns" className={styles.textLink}>
                Browse patterns{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {buildingBlocks.map((block) => (
              <MarketingFeatureCard
                key={block.title}
                title={block.title}
                description={block.description}
                icon={<block.icon className="size-4" />}
                className={cn("shadow-none", styles.componentCard)}
                meta={
                  <div>
                    <p className="mb-3 font-mono text-[10px] text-muted-foreground">
                      {block.label}
                    </p>
                    <ul
                      className="flex flex-wrap gap-x-4 gap-y-1"
                      aria-label={`${block.title} components`}
                    >
                      {block.components.map(([label, slug]) => (
                        <li key={slug}>
                          <Link
                            href={`/docs/ui/${slug}`}
                            className={styles.textLink}
                          >
                            {label}{" "}
                            <ArrowUpRight
                              className="size-3"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
                action={
                  <Link href={block.href} className={styles.textLink}>
                    {block.link}{" "}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                }
              />
            ))}
          </div>
        </MarketingSectionShell>
        <MarketingSectionShell
          id="example-setup"
          aria-labelledby="example-setup-title"
          width="full"
          className="border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="example-setup-title"
            title="Take the example into your editor."
            description="Run the public Starter Free repository locally. No database or API keys are needed to explore the included demo flows."
          />
          <div
            className={cn(
              "grid overflow-hidden rounded-[5px] border border-border-subtle lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
              styles.setupPanel,
            )}
          >
            <div className="p-5 sm:p-8">
              <ol
                className="space-y-6"
                aria-label="Run and customize the example"
              >
                {[
                  [
                    "Run the starter",
                    "Use the Node.js and pnpm versions declared in the repository’s package.json.",
                  ],
                  [
                    "Adapt a screen",
                    "Replace sample content, adjust the components and try your own theme.",
                  ],
                  [
                    "Connect your services",
                    "Add real authentication, persistence and payment integrations when your product needs them.",
                  ],
                ].map(([title, detail], index) => (
                  <li key={title} className="flex items-start gap-4">
                    <span className={styles.stepNumber} aria-hidden="true">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium leading-7">{title}</h3>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">
                        {detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-x-5">
                <Link
                  href="/docs/starter/installation"
                  className={styles.textLink}
                >
                  Installation guide{" "}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/docs/starter/project-structure"
                  className={styles.textLink}
                >
                  Project structure{" "}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="flex min-w-0 flex-col border-t border-border-subtle bg-background/80 lg:border-l lg:border-t-0">
              <DynamicCodeBlock
                lang="bash"
                code={quickStart}
                options={{
                  themes: { light: "github-light", dark: "github-dark" },
                }}
                codeblock={{
                  title: "Terminal",
                  icon: <Terminal className="size-4" aria-hidden="true" />,
                  allowCopy: true,
                  className:
                    "m-0 flex flex-1 flex-col rounded-none border-0 bg-transparent shadow-none [&>div:first-child]:h-14 [&_button]:size-11",
                  viewportProps: {
                    "aria-label": "Example setup commands",
                    className:
                      "flex-1 py-7 [&_pre]:text-xs [&_pre]:leading-8 sm:[&_pre]:text-sm",
                  },
                }}
              />
              <div className="flex items-center gap-2 border-t border-border-subtle px-5 py-4 text-xs text-muted-foreground">
                <Code2 className="size-3.5 shrink-0" aria-hidden="true" />
                Your local copy. Your components. Your services.
              </div>
            </div>
          </div>
        </MarketingSectionShell>
        <MarketingSectionShell
          aria-labelledby="example-next-title"
          width="full"
          className="border-t border-border-subtle"
        >
          <MarketingSectionHeader
            align="left"
            titleId="example-next-title"
            title="Keep building from here."
            description="Bring a section into an existing app, shape your theme or start connecting the business layer."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {nextSteps.map((step) => (
              <MarketingResourceCard
                key={step.title}
                title={step.title}
                href={step.href}
                description={step.description}
                className={cn("p-6 shadow-none", styles.resourceCard)}
                meta={
                  <span className="mb-5 flex items-center gap-2 text-xs">
                    <step.icon
                      className="size-4 text-primary"
                      aria-hidden="true"
                    />
                    {step.label}
                  </span>
                }
              />
            ))}
          </div>
          <div
            className={cn(
              "mt-4 grid items-center gap-7 rounded-[5px] border border-border-subtle p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_18rem]",
              styles.proPanel,
            )}
          >
            <div className="max-w-2xl">
              <Badge
                variant="outline"
                className="mb-4 bg-background text-[11px]"
              >
                Starter Pro
              </Badge>
              <h3 className="text-2xl font-semibold tracking-subheading">
                Ready to connect the business layer?
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Explore the authentication, Stripe billing, protected routes and
                database foundations in Starter Pro. Review the scope before
                choosing your starting point.
              </p>
              <Link
                href="/starters/pro#free-vs-pro"
                className={cn("mt-3", styles.textLink)}
              >
                Compare Free and Pro{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div>
              <Button
                asChild
                variant="outline"
                className={cn("mb-2 w-full", actionClass)}
              >
                <Link href="/starters/pro">Explore Starter Pro</Link>
              </Button>
              <BuyStarterProButton
                label={`Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`}
                className="shadow-none hover:shadow-none"
              />
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                One-time purchase. Configure the integrations for your product.
              </p>
            </div>
          </div>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}
