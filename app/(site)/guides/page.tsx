import Link from "next/link";
import type { Metadata } from "next";
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
import { Button } from "@pycolors/ui";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingResourceCard } from "@/components/marketing/resource-card";
import styles from "@/components/guides/guides-index.module.css";

export const metadata: Metadata = {
  title: "Next.js SaaS Architecture Guides",
  description:
    "Guides for building modern Next.js SaaS products with stronger architecture, authentication systems, billing flows, admin panels, UI patterns, and production-ready product foundations.",
  alternates: {
    canonical: "/guides",
  },

  openGraph: {
    title: "Next.js SaaS Architecture Guides",
    description:
      "Learn how modern SaaS products are structured across dashboards, authentication, billing systems, admin workflows, product UX, and production-ready Next.js architecture.",
    url: "/guides",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Architecture Guides",
    description:
      "Guides for SaaS architecture, billing, authentication, UI systems, and modern Next.js product engineering.",
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
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <Container className="pb-16 pt-24 sm:pt-28">
        <div className="grid items-center gap-10 pb-14 sm:pb-16 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0 max-w-2xl"
            badges={[{ label: "Guides", variant: "outline" }]}
            title="SaaS building guides for developers."
            description="Make the architecture and product decisions behind a better SaaS. Practical guides to dashboards, authentication, billing and the systems that connect them."
            actions={
              <>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="min-h-11 rounded-[5px] px-5"
                >
                  <Link href="#browse-guides">
                    Browse guides{" "}
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Link
                  href="/docs"
                  className={`${textLink} justify-center sm:px-2`}
                >
                  Open documentation{" "}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </>
            }
            extra={
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-6 text-muted-foreground">
                <span>{guides.length} practical guides</span>
                <span aria-hidden="true">/</span>
                <span>From product structure to implementation</span>
              </p>
            }
          />
          <Link
            href="/guides/production-ready-saas-starter"
            aria-labelledby="recommended-guide-title"
            aria-describedby="recommended-guide-summary"
            className={`${styles.featuredGuide} group block rounded-[5px] border border-border-subtle focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring`}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Recommended starting point
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
                What should your SaaS starter include?
              </h2>
              <p
                id="recommended-guide-summary"
                className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground"
              >
                Understand the essential screens, integrations and architecture
                before choosing your foundation.
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
                    <p className="text-[11px] font-medium">{label}</p>
                  </div>
                ))}
              </div>
              <span
                className="mt-5 flex min-h-6 items-center justify-between gap-3 text-sm font-medium"
                aria-hidden="true"
              >
                Read the foundations guide
                <ArrowRight className="size-4 shrink-0 transition-transform motion-safe:group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>

        <MarketingSectionShell
          id="browse-guides"
          width="full"
          className="scroll-mt-24 border-t border-border-subtle"
          aria-labelledby="guides-title"
        >
          <MarketingSectionHeader
            titleId="guides-title"
            align="left"
            eyebrow="The guide library"
            title="Find the guide for your next decision."
            description="Start with the foundations, or go straight to the product challenge in front of you."
          />
          <div className="grid items-start gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12">
            <aside className="lg:sticky lg:top-24">
              <nav aria-label="Guide topics">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Browse by topic
                </p>
                <ul className="grid grid-cols-2 gap-1 lg:grid-cols-1">
                  {guideTopics.map((topic) => (
                    <li key={topic.id}>
                      <Link
                        href={`#${topic.id}`}
                        className="flex min-h-11 items-center justify-between gap-2 rounded-[5px] px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-muted/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-sm"
                      >
                        <span>{topic.title}</span>
                        <span
                          className="font-mono text-[11px]"
                          aria-label={`${topic.guides.length} guides`}
                        >
                          {String(topic.guides.length).padStart(2, "0")}
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
                <p className="mt-3 text-sm font-medium">Ready to implement?</p>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Find installation steps and API references in the docs.
                </p>
                <Link
                  href="/docs/starter"
                  className={`${textLink} mt-2 text-xs`}
                >
                  Starter docs{" "}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </aside>
            <div className="min-w-0 space-y-10 sm:space-y-12">
              {guideTopics.map((topic, index) => (
                <section
                  key={topic.id}
                  id={topic.id}
                  className="scroll-mt-24"
                  aria-labelledby={`${topic.id}-title`}
                >
                  <div className="mb-5 flex items-start gap-4">
                    <span
                      className="pt-1 font-mono text-xs text-muted-foreground"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        id={`${topic.id}-title`}
                        className="text-lg font-semibold tracking-normal"
                      >
                        {topic.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {topic.description}
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
                            <span className="text-xs">{category}</span>
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
          width="full"
          className="border-t border-border-subtle"
          aria-labelledby="guides-next-title"
        >
          <MarketingSectionHeader
            titleId="guides-next-title"
            align="left"
            eyebrow="From reading to building"
            title="Put the ideas to work."
            description="Explore an interface, try a complete frontend, or inspect the integrations your product needs."
          />
          <div className="grid overflow-hidden rounded-[5px] border border-border-subtle lg:grid-cols-3">
            <div className="flex flex-col p-6 sm:p-8">
              <PanelTop
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="mt-5 text-xs text-muted-foreground">
                Components & patterns
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-subheading">
                Build the interface.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Turn product decisions into screens with PyColors UI, composed
                blocks and working examples.
              </p>
              <div className="mt-auto pt-5">
                <Link href="/ui/patterns" className={textLink}>
                  Browse UI patterns{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <div className="flex flex-wrap gap-x-5">
                  <Link
                    href="/blocks"
                    className={`${textLink} text-xs text-muted-foreground`}
                  >
                    Explore Blocks
                  </Link>
                  <Link
                    href="/ui/examples"
                    className={`${textLink} text-xs text-muted-foreground`}
                  >
                    View examples
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col border-t border-border-subtle p-6 sm:p-8 lg:border-l lg:border-t-0">
              <LayoutDashboard
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="mt-5 text-xs text-muted-foreground">Starter Free</p>
              <h3 className="mt-2 text-xl font-semibold tracking-subheading">
                Explore a full product.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Validate dashboards, settings and workflows in a complete SaaS
                frontend, with mocked auth and billing.
              </p>
              <div className="mt-auto pt-5">
                <Link href="/starters/free" className={textLink}>
                  Start with Starter Free{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Public source code · Free to explore
                </p>
              </div>
            </div>
            <div
              className={`${styles.nextStep} flex flex-col border-t border-border-subtle p-6 sm:p-8 lg:border-l lg:border-t-0`}
            >
              <Boxes
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="mt-5 text-xs text-muted-foreground">Starter Pro</p>
              <h3 className="mt-2 text-xl font-semibold tracking-subheading">
                Connect the foundations.
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Start with Auth.js, Stripe and Prisma foundations. Configure
                your providers and validate the integrations before launch.
              </p>
              <div className="mt-auto pt-5">
                <Link href="/starters/pro" className={`${textLink} mb-3`}>
                  Explore Starter Pro{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <BuyStarterProButton
                  fullWidth
                  label={`Starter Pro — ${starterProPriceLabel}`}
                  variant="outline"
                />
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  One-time payment · Source code license
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href="/pricing" className={textLink}>
              Compare all products{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/docs" className={`${textLink} text-muted-foreground`}>
              Explore the documentation{" "}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}
