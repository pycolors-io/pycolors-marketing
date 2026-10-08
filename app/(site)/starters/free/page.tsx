import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  ExternalLink,
  FolderTree,
  Layers3,
  Palette,
  Terminal,
} from "lucide-react";
import { Button } from "@pycolors/ui";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { NpmBadges } from "@/components/npm-badges";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { MarketingFaq } from "@/components/marketing/faq";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingDetailCard } from "@/components/marketing/detail-card";
import { MarketingCardIllustration } from "@/components/marketing/card-illustration";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { StarterFreePreview } from "@/components/starters/starter-free-preview";

const description =
  "Free Next.js SaaS starter with dashboard, project flows, auth screens and PyColors UI. Explore with demo data, customize the interface and connect your own backend.";

export const metadata: Metadata = {
  title: "Free Next.js SaaS Starter",
  description,
  alternates: { canonical: "/starters/free" },
  openGraph: {
    title: "Free Next.js SaaS Starter — PyColors",
    description,
    url: "/starters/free",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Next.js SaaS Starter — PyColors",
    description,
    images: ["/seo/twitter-main.png"],
  },
};

const starterProPriceLabel = PRODUCT_DISPLAY["starter-pro"].priceLabel;
const EXTERNAL = {
  demo: "https://starter-demo.pycolors.io",
  repo: "https://github.com/pycolors-io/pycolors-starter-free",
} as const;

const quickStart = `git clone https://github.com/pycolors-io/pycolors-starter-free.git
cd pycolors-starter-free
pnpm install
pnpm dev`;

const textLink =
  "inline-flex min-h-11 items-center gap-2 rounded-[5px] text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const sectionClass = "scroll-mt-24 border-t border-border-subtle";

const screens = [
  {
    id: "dashboard",
    label: "Dashboard",
    title: "A home for your product.",
    description:
      "An overview with sample metrics, project activity and clear next actions. Start with a complete page structure and make it relevant to your product.",
    image: "/images/starters/free/dashboard-free-page-pycolors.png",
    route: "/dashboard",
    points: ["Responsive app navigation", "Sample KPIs and summary cards"],
  },
  {
    id: "projects",
    label: "Projects",
    title: "Give your workflows a shape.",
    description:
      "Explore a project table, detail routes and create, rename and delete dialogs. Use the client-side examples to shape your own data workflows.",
    image: "/images/starters/free/projects-page-pycolors.png",
    route: "/projects",
    points: ["Tables and contextual actions", "Dialogs and empty states"],
  },
  {
    id: "auth",
    label: "Authentication",
    title: "Design the first interaction.",
    description:
      "Sign-in, registration and password reset screens with form and loading states. These are UI examples; they do not create accounts or sessions.",
    image: "/images/starters/free/auth-page-pycolors.png",
    route: "/login",
    points: ["Email and password forms", "Loading and validation patterns"],
  },
  {
    id: "settings",
    label: "Settings",
    title: "Make account details feel at home.",
    description:
      "Profile, preferences and security sections with clear action hierarchy. Connect saving and session management to your own backend.",
    image: "/images/starters/free/settings-page-pycolors.png",
    route: "/settings",
    points: ["Profile and security layouts", "Destructive action patterns"],
  },
  {
    id: "billing",
    label: "Billing",
    title: "Explore the paid experience.",
    description:
      "Sample plans, invoices and payment details help you design the subscription experience. Checkout and the customer portal are not connected.",
    image: "/images/starters/free/billing-free-page-pycolors.png",
    route: "/billing",
    points: ["Plan and subscription UI", "Invoice and payment layouts"],
  },
  {
    id: "admin",
    label: "Admin",
    title: "Plan a workspace for your team.",
    description:
      "Member, role and invitation screens give your workspace a clear structure. Add real authorization and invitation delivery when you connect your services.",
    image: "/images/starters/free/admin-page-pycolors.png",
    route: "/admin",
    points: ["Member and role layouts", "Invitation UI examples"],
  },
] as const;

const foundations = [
  {
    title: "Application structure",
    icon: FolderTree,
    label: "App Router",
    illustration: "architecture",
    description: "Start with routes and layouts you can follow.",
    items: [
      "Next.js App Router with TypeScript",
      "Shared app shell and mobile navigation",
      "Feature components organized by flow",
    ],
    href: "/docs/starter/project-structure",
    link: "Explore the structure",
  },
  {
    title: "A shared design system",
    icon: Layers3,
    label: "PyColors UI",
    illustration: "components",
    description: "Keep every screen speaking the same language.",
    items: [
      "PyColors UI components included",
      "Tailwind v4 and semantic color tokens",
      "Forms, tables, dialogs and sheets",
    ],
    href: "/ui",
    link: "Discover PyColors UI",
  },
  {
    title: "A focused local workflow",
    icon: Code2,
    label: "Local development",
    illustration: "workflow",
    description: "Explore the interface before choosing services.",
    items: [
      "Mock data and client-side examples",
      "No database or API keys to explore",
      "Lint, type and build checks with pnpm verify",
    ],
    href: "/docs/starter/getting-started",
    link: "Read the starter guide",
  },
] as const;

const faqs = [
  {
    question: "What can I do with Starter Free?",
    answer:
      "Clone the source, run the app and adapt the dashboard, project flows, account screens and styles to your product. The public Starter Free repository is MIT licensed; its license is included with the source.",
  },
  {
    question: "Do authentication and payments work out of the box?",
    answer:
      "The screens use demo data and client-side state. No real account, session or payment is created. Connect your own authentication, database and payment services, or review the integration foundations in Starter Pro.",
    links: [
      {
        href: "/docs/starter/auth-concept",
        label: "Understand the auth screens",
      },
    ],
  },
  {
    question: "Do I need a database to try it?",
    answer:
      "No. Clone the repository, install its dependencies and run the development server with Node.js and pnpm. The included screens can be explored without configuring a database or external services.",
    links: [
      {
        href: "/docs/starter/installation",
        label: "Follow the installation guide",
      },
    ],
  },
  {
    question: "Can I move to Starter Pro later?",
    answer:
      "Yes. Free and Pro share the PyColors UI foundation. Bring your interface changes across deliberately and configure the Pro integrations for your product. Purchasing Pro does not automatically migrate your application or data.",
    links: [{ href: "/docs/starter/upgrade", label: "Plan the upgrade" }],
  },
] as const;

export default function StarterFreePage() {
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <Container className="pb-16 pt-24 sm:pt-28">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[
            { label: "Starter Free", variant: "outline" },
            { label: "Open source · MIT", variant: "outline" },
          ]}
          title="Your next SaaS starts here."
          description="A free Next.js starter with a dashboard, project flows, auth screens and a shared design system. Shape your product with demo data, then connect the backend you choose."
          actions={
            <>
              <Button
                asChild
                size="lg"
                className="site-primary-action min-h-11 rounded-[5px] px-5"
              >
                <a
                  href={EXTERNAL.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Get Starter Free
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-11 rounded-[5px] px-5"
              >
                <a
                  href={EXTERNAL.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Open live demo
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </>
          }
          extra={
            <p className="text-xs leading-6 text-muted-foreground">
              Full source code · No account required · Mocked auth, billing and
              product data
            </p>
          }
        />

        <div className="mt-9 flex flex-col gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
          <MarketingPillList aria-label="Starter Free technology stack">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS v4",
              "PyColors UI",
            ].map((item) => (
              <MarketingPill
                key={item}
                className="border-transparent bg-transparent px-0 pr-4 text-muted-foreground"
              >
                {item}
              </MarketingPill>
            ))}
          </MarketingPillList>
          <Link href="/docs/starter" className={`${textLink} shrink-0 text-xs`}>
            Read the documentation{" "}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <nav
          aria-label="Starter Free sections"
          className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-b border-border-subtle pb-3"
        >
          {[
            ["#product-preview", "Product preview"],
            ["#included", "What’s included"],
            ["#get-started", "Get started"],
            ["#free-vs-pro", "Free vs Pro"],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={`${textLink} text-xs text-muted-foreground`}
            >
              {label}
            </a>
          ))}
        </nav>

        <MarketingSectionShell
          id="product-preview"
          width="full"
          className="scroll-mt-24"
          aria-labelledby="preview-heading"
        >
          <MarketingSectionHeader
            titleId="preview-heading"
            align="left"
            eyebrow="Product preview"
            title="Explore the screens. See the starting point."
            description="Six areas of a SaaS interface, ready to explore with demo data. Select a screen or open the live demo to try the flows."
          />
          <StarterFreePreview
            screens={screens.map((screen, index) => ({
              id: screen.id,
              label: screen.label,
              content: (
                <figure className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_19rem]">
                  <div className="flex min-w-0 items-center border-b border-border-subtle bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary),transparent_95%),var(--background)_50%,color-mix(in_oklch,var(--primary),transparent_97%))] p-3 sm:p-6 lg:border-b-0 lg:border-r">
                    <div className="relative aspect-16/10 w-full overflow-hidden rounded-[3px] border border-border-subtle bg-white shadow-sm">
                      <Image
                        src={screen.image}
                        alt={`Starter Free ${screen.label.toLowerCase()} interface with demonstration data`}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1280px) 860px, (min-width: 1024px) 65vw, 95vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <figcaption className="flex flex-col p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                      <span className="font-mono">{screen.route}</span>
                      <span>UI preview</span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold tracking-subheading">
                      {screen.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {screen.description}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {screen.points.map((point) => (
                        <MarketingCheckItem key={point}>
                          {point}
                        </MarketingCheckItem>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <a
                        href={`${EXTERNAL.demo}${screen.route}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={textLink}
                      >
                        Try {screen.label.toLowerCase()}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </div>
                  </figcaption>
                </figure>
              ),
            }))}
          />
          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            Captures show the light theme with sample data. Authentication,
            payments and access control still need real service integrations.
          </p>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="included"
          width="full"
          className={sectionClass}
          aria-labelledby="included-heading"
        >
          <MarketingSectionHeader
            titleId="included-heading"
            align="left"
            eyebrow="What’s included"
            title="A connected foundation for your first screens."
            description="Keep the structure, adapt the components and build on the same UI system used across PyColors."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {foundations.map(({ icon: Icon, ...item }) => (
              <MarketingDetailCard
                key={item.title}
                title={item.title}
                description={item.description}
                icon={<Icon />}
                eyebrow={item.label}
                visual={<MarketingCardIllustration kind={item.illustration} />}
                footer={
                  <Link
                    href={item.href}
                    className={`${textLink} w-full justify-between text-xs`}
                  >
                    {item.link}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                }
              >
                <ul className="space-y-3">
                  {item.items.map((point) => (
                    <MarketingCheckItem key={point}>{point}</MarketingCheckItem>
                  ))}
                </ul>
              </MarketingDetailCard>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <NpmBadges packageName="@pycolors/ui" size="sm" />
            <p className="text-xs leading-6 text-muted-foreground">
              PyColors UI · Versioned · documented · tested · actively
              maintained
            </p>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="get-started"
          width="full"
          className={sectionClass}
          aria-labelledby="setup-heading"
        >
          <MarketingSectionHeader
            titleId="setup-heading"
            align="left"
            eyebrow="Get started"
            title="From repository to running app."
            description="Start locally, explore the sample flows and make your first screen your own."
          />
          <div className="grid overflow-hidden rounded-[5px] border border-border-subtle lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="p-6 sm:p-8">
              <ol className="space-y-6">
                {[
                  {
                    title: "Clone and run",
                    detail:
                      "Use Node.js and the pnpm version declared in the starter’s package.json.",
                  },
                  {
                    title: "Explore the demo data",
                    detail:
                      "Open the dashboard, try the project dialogs and inspect the account screens.",
                  },
                  {
                    title: "Make it your product",
                    detail:
                      "Update the copy, adjust your theme and connect the services your app needs.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="grid size-7 shrink-0 place-items-center rounded-[5px] border border-border-subtle font-mono text-[11px] text-muted-foreground">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium leading-7">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/docs/starter/installation"
                className={`${textLink} mt-6 text-xs`}
              >
                Installation guide{" "}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex min-w-0 flex-col border-t border-border-subtle bg-surface-muted/20 lg:border-l lg:border-t-0">
              <DynamicCodeBlock
                lang="bash"
                code={quickStart}
                options={{
                  themes: { light: "github-light", dark: "github-dark" },
                }}
                codeblock={{
                  title: "Terminal",
                  icon: <Terminal aria-hidden="true" className="size-4" />,
                  allowCopy: true,
                  className:
                    "m-0 flex flex-1 flex-col rounded-none border-0 bg-transparent shadow-none [&>div:first-child]:h-14 [&_button]:size-11",
                  viewportProps: {
                    "aria-label": "Starter Free setup commands",
                    className:
                      "flex-1 py-7 [&_pre]:text-xs [&_pre]:leading-8 sm:[&_pre]:text-sm",
                  },
                }}
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border-subtle px-5 py-4 text-xs text-muted-foreground sm:px-7">
                <span>Local preview</span>
                <code className="text-foreground">http://localhost:3000</code>
              </div>
            </div>
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="free-vs-pro"
          width="full"
          className={sectionClass}
          aria-labelledby="comparison-heading"
        >
          <MarketingSectionHeader
            titleId="comparison-heading"
            align="left"
            eyebrow="Free vs Pro"
            title="Choose the foundation for your next step."
            description="Keep Free while shaping the interface. Consider Pro when real accounts and subscriptions become the next implementation step."
            action={
              <Link href="/starters/pro#free-vs-pro" className={textLink}>
                Compare all features{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            }
          />
          <div className="grid gap-px overflow-hidden rounded-[5px] border border-border-subtle bg-border-subtle md:grid-cols-2">
            <div className="flex flex-col bg-background p-6 sm:p-8 md:row-span-5 md:grid md:grid-rows-subgrid md:gap-0">
              <p className="text-xs font-medium text-muted-foreground">
                Starter Free
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-subheading">
                Shape the product experience.
              </h3>
              <p className="mt-5 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-semibold tracking-tight">
                  Free
                </span>
                <span className="text-xs text-muted-foreground">
                  Public repository · MIT
                </span>
              </p>
              <ul className="my-6 space-y-3">
                {[
                  "Dashboard, projects and account UI",
                  "Mocked auth, billing and product data",
                  "Connect your own backend and services",
                ].map((point) => (
                  <MarketingCheckItem key={point}>{point}</MarketingCheckItem>
                ))}
              </ul>
              <div className="mt-auto pt-2 md:mt-0 md:self-start">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-11 w-full rounded-[5px] sm:w-auto"
                >
                  <a
                    href={EXTERNAL.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Clone the repository{" "}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex flex-col bg-[linear-gradient(135deg,color-mix(in_oklch,var(--primary),var(--background)_96%),var(--background)_70%)] p-6 sm:p-8 md:row-span-5 md:grid md:grid-rows-subgrid md:gap-0">
              <p className="text-xs font-medium text-muted-foreground">
                Starter Pro
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-subheading">
                Start with auth and billing foundations.
              </h3>
              <p className="mt-5 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-semibold tracking-tight">
                  {starterProPriceLabel}
                </span>
                <span className="text-xs text-muted-foreground">
                  Launch price · One-time payment
                </span>
              </p>
              <ul className="my-6 space-y-3">
                {[
                  "Auth.js sessions and protected routes",
                  "Stripe Checkout, portal and webhooks",
                  "Prisma and PostgreSQL foundations",
                ].map((point) => (
                  <MarketingCheckItem key={point}>{point}</MarketingCheckItem>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center md:mt-0 md:self-start">
                <BuyStarterProButton
                  fullWidth={false}
                  className="w-full sm:w-auto"
                />
                <Link
                  href="/starters/pro"
                  className={`${textLink} justify-center sm:justify-start`}
                >
                  Explore Pro{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-4xl text-xs leading-6 text-muted-foreground">
            Pro is source code. You still configure the providers, build your
            product logic and validate the integrations before launch. Moving
            from Free requires bringing your changes across; it is not an
            automatic migration.
          </p>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="faq"
          width="full"
          className={sectionClass}
          aria-labelledby="faq-heading"
        >
          <MarketingFaq
            titleId="faq-heading"
            title="Before you start."
            description="A few details about the source, the demo data and your next steps."
            items={faqs}
          />
        </MarketingSectionShell>

        <MarketingSectionShell
          width="full"
          className={`${sectionClass} pb-0`}
          aria-labelledby="next-heading"
        >
          <MarketingSectionHeader
            titleId="next-heading"
            align="left"
            title="Make the starting point your own."
            description="Use the same components and colors as you expand your app."
          />
          <div className="grid gap-px overflow-hidden rounded-[5px] border border-border-subtle bg-border-subtle md:grid-cols-3">
            {[
              {
                title: "Customize your theme",
                description:
                  "Explore colors and type before applying them to your app.",
                href: "/tools/theme-builder",
                icon: Palette,
              },
              {
                title: "Add your next screen",
                description: "Reuse application blocks built with PyColors UI.",
                href: "/blocks",
                icon: Layers3,
              },
              {
                title: "Follow the documentation",
                description:
                  "Find setup steps, project structure and integration concepts.",
                href: "/docs/starter",
                icon: BookOpen,
              },
            ].map(({ icon: Icon, ...item }) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-background p-6 transition-colors hover:bg-surface-muted/40 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring sm:p-7"
              >
                <div className="flex items-center justify-between text-muted-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                  <ArrowUpRight
                    className="size-4 transition-colors group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}
