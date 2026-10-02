import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

import { Badge, Button } from "@pycolors/ui";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";

import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import {
  MarketingPill,
  MarketingPillList,
} from "@/components/marketing/pill-list";
import { MarketingFeatureCard } from "@/components/marketing/feature-card";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import { MarketingResourceCard } from "@/components/marketing/resource-card";

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
};

const guides: Guide[] = [
  {
    title: "What a production-ready SaaS starter should include",
    description:
      "The essential product surfaces and foundations that make a SaaS starter genuinely useful, without unnecessary complexity.",
    href: "/guides/production-ready-saas-starter",
    category: "Foundations",
  },
  {
    title: "How to build a production-ready SaaS with Next.js",
    description:
      "Architecture, product surface, authentication, billing, and deployment basics.",
    href: "/guides/build-saas-nextjs",
    category: "Foundations",
  },
  {
    title: "Why PWA foundations matter for modern SaaS",
    description:
      "Installability, standalone mode, offline resilience, and app-like UX patterns for modern SaaS products.",
    href: "/guides/pwa-for-saas",
    category: "PWA",
  },
  {
    title: "SaaS dashboard design patterns",
    description:
      "How modern SaaS dashboards are structured: KPIs, activity feeds, hierarchy, and actions.",
    href: "/guides/saas-dashboard-design",
    category: "Product UX",
  },
  {
    title: "Authentication flows for SaaS",
    description:
      "Login, register, password reset, OAuth, sessions, and protected product access.",
    href: "/guides/saas-auth-flows",
    category: "Auth",
  },
  {
    title: "SaaS billing UX best practices",
    description:
      "Plans, usage metrics, invoices, upgrade flows, and billing trust patterns.",
    href: "/guides/saas-billing-ux",
    category: "Billing",
  },
  {
    title: "Team & organization systems",
    description:
      "How SaaS products structure organizations, members, roles, invitations, and collaboration.",
    href: "/guides/saas-organizations",
    category: "B2B",
  },
  {
    title: "Admin panels for SaaS products",
    description:
      "Moderation tools, operational queues, audit logs, roles, and admin workflows.",
    href: "/guides/saas-admin-panels",
    category: "Operations",
  },
];

export default function GuidesPage() {
  return (
    <main id="content" tabIndex={-1}>
      <Container className="pb-16 pt-24">
        <div className="mx-auto max-w-6xl">
          <PageHero
            variant="compact"
            align="left"
            maxWidth="5xl"
            contentClassName="mx-0"
            badges={[
              {
                label: "Guides",
                variant: "secondary",
                icon: <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />,
              },
              { label: "SaaS knowledge base", variant: "outline" },
              {
                label: "Product-first",
                variant: "outline",
                icon: <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />,
              },
            ]}
            title="SaaS building guides for developers."
            description="Learn how stronger SaaS products are structured before you build them."
            actions={
              <MarketingLinkButton variant="outline">
                <Link href="#browse-guides">Browse guides</Link>
              </MarketingLinkButton>
            }
          />

          <MarketingSectionShell
            id="browse-guides"
            aria-labelledby="guides-title"
            spacing="compact"
            className="scroll-mt-20"
          >
            <MarketingSectionHeader
              titleId="guides-title"
              align="left"
              eyebrow="Browse guides"
              title="Focused guides for the surfaces and systems that matter most in SaaS"
              description="These guides are designed to help developers think more clearly about product structure before moving into implementation."
              action={
                <MarketingLinkButton variant="outline">
                  <Link href="/docs/starter">Starter docs</Link>
                </MarketingLinkButton>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map(({ category, ...guide }) => (
                <MarketingResourceCard
                  key={guide.href}
                  {...guide}
                  meta={
                    <Badge
                      variant="outline"
                      className="rounded-[5px] border-border-subtle bg-surface-muted text-xs"
                    >
                      {category}
                    </Badge>
                  }
                />
              ))}
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell aria-labelledby="why-guides-title">
            <MarketingSectionHeader
              titleId="why-guides-title"
              align="left"
              title="Why these guides exist"
            />
            <div className="max-w-3xl space-y-6">
              <p className="text-sm leading-7 text-muted-foreground">
                Learn how modern SaaS products are designed and structured —
                from dashboards and authentication to billing, installable PWA
                experiences, admin workflows, and production-ready product
                foundations.
              </p>
              <MarketingPillList>
                {["Architecture", "Auth", "Billing", "PWA", "Admin UX"].map(
                  (label) => (
                    <MarketingPill key={label}>{label}</MarketingPill>
                  ),
                )}
              </MarketingPillList>
              <p className="text-sm leading-7 text-muted-foreground">
                The guides are educational on purpose: they help you understand
                the product logic first, so your UI, starter, and monetization
                decisions become clearer.
              </p>
              <p className="text-sm leading-7 text-muted-foreground">
                PyColors is not only a UI library or a starter. It is a system
                for building SaaS products with stronger structure, clearer UX,
                and less rework.
              </p>
              <p className="text-sm leading-7 text-muted-foreground">
                These guides explain the product patterns behind that system so
                you can make better product decisions before implementation
                complexity takes over.
              </p>
              <MarketingPillList>
                {[
                  "Production-ready thinking",
                  "SaaS-first UX",
                  "PWA-ready UX",
                  "System design",
                  "Developer-focused",
                ].map((label) => (
                  <MarketingPill key={label}>{label}</MarketingPill>
                ))}
              </MarketingPillList>
              <MarketingActionGroup>
                <MarketingLinkButton variant="outline">
                  <Link href="/pricing">View pricing</Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/starters/pro">See Starter Pro</Link>
                </MarketingLinkButton>
              </MarketingActionGroup>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell aria-labelledby="guides-path-title">
            <MarketingSectionHeader
              titleId="guides-path-title"
              eyebrow="How the guides fit the PyColors path"
              title="The guides are educational on purpose"
              description="They help you understand the product logic before you choose the interface patterns, starter path, or business wiring."
              align="left"
            />
            <div className="grid gap-4 lg:grid-cols-3">
              <MarketingFeatureCard
                meta="Step 01"
                title="Learn the product logic"
                description="Use the guides to understand how strong SaaS products structure dashboards, auth, billing, settings, and operations."
              />
              <MarketingFeatureCard
                meta="Step 02"
                title="Explore patterns and examples"
                description="Move from concepts to real interfaces with examples and UI patterns built around the same product surfaces."
              />
              <MarketingFeatureCard
                meta="Step 03"
                title="Build with Starter Free, upgrade with Starter Pro"
                description="Start with a production-shaped SaaS surface today, then move to Starter Pro when auth, billing, backend wiring, and installable PWA foundations become the blocker."
              />
            </div>
            <MarketingActionGroup className="mt-6">
              <MarketingLinkButton>
                <Link href="/starters/free">
                  Start with Starter Free
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </MarketingLinkButton>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="h-auto min-h-11 whitespace-normal rounded-[5px] px-6 py-2.5 text-sm font-medium"
              >
                <Link href="/examples">Explore Examples</Link>
              </Button>
              <MarketingLinkButton variant="outline">
                <Link href="/ui/patterns">Browse UI Patterns</Link>
              </MarketingLinkButton>
            </MarketingActionGroup>
          </MarketingSectionShell>

          <MarketingSectionShell
            aria-labelledby="guides-next-title"
            spacing="compact"
          >
            <Badge
              variant="outline"
              className="mb-4 rounded-[5px] border-border-subtle bg-surface-muted"
            >
              Build faster
            </Badge>
            <MarketingCtaPanel
              titleId="guides-next-title"
              title="Build your SaaS faster with PyColors"
              description="Use Starter Free to validate a real SaaS product surface now, then move to Starter Pro when auth, billing, backend workflows, and installable PWA foundations need to be wired seriously."
              actions={
                <div className="space-y-6">
                  <MarketingPillList>
                    {["Starter Free", "Starter Pro", "Production-shaped"].map(
                      (label) => (
                        <MarketingPill key={label}>{label}</MarketingPill>
                      ),
                    )}
                  </MarketingPillList>
                  <MarketingActionGroup className="sm:max-w-60 sm:flex-col sm:items-stretch">
                    <MarketingLinkButton>
                      <Link href="/starters/free">Starter Free</Link>
                    </MarketingLinkButton>
                    <BuyStarterProButton
                      fullWidth={true}
                      label={`Starter Pro — ${starterProPriceLabel}`}
                      variant="outline"
                    />
                  </MarketingActionGroup>
                </div>
              }
            />
          </MarketingSectionShell>
        </div>
      </Container>
    </main>
  );
}
