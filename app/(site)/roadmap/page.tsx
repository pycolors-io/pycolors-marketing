import type { Metadata } from "next";
import Link from "next/link";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  CircleDot,
  GitBranch,
  History,
  MessageSquare,
  MoreHorizontal,
  Route,
  type LucideIcon,
} from "lucide-react";
import { Badge, cn } from "@pycolors/ui";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import disclosureStyles from "@/components/marketing/faq.module.css";
import styles from "@/components/marketing/roadmap.module.css";

export const metadata: Metadata = {
  title: "Next.js SaaS Product Roadmap",
  description:
    "Public roadmap for the PyColors ecosystem covering Next.js SaaS starters, UI systems, documentation, templates, developer tooling, product architecture, and commercial platform evolution.",
  alternates: {
    canonical: "/roadmap",
  },

  openGraph: {
    title: "Next.js SaaS Product Roadmap",
    description:
      "Explore the public PyColors roadmap across SaaS starters, UI systems, templates, documentation, developer tooling, and platform growth.",
    url: "/roadmap",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Product Roadmap",
    description:
      "Public roadmap for the PyColors SaaS ecosystem, UI systems, templates, starters, and developer tooling.",
    images: ["/seo/twitter-main.png"],
  },
};

type Status = "Now" | "Next" | "Later" | "Shipped";
type Milestone =
  | "Release Week"
  | "Jan 2026"
  | "Feb 2026"
  | "Mar 2026"
  | "Apr 2026"
  | "May 2026"
  | "Jun 2026"
  | "Jul 2026"
  | "Aug 2026"
  | "Sep 2026"
  | "Oct 2026"
  | "H1 2026";

type RoadmapItem = {
  title: string;
  description: string;
  status: Status;
  milestone: Milestone;
  tags?: string[];
  href?: string;
};

const statusMeta: Record<
  Status,
  {
    icon: LucideIcon;
    description: string;
    href: string;
    className: string;
  }
> = {
  Now: {
    icon: CircleDot,
    description: "Active work and priorities",
    href: "#roadmap-now",
    className: styles.now,
  },
  Next: {
    icon: CircleDashed,
    description: "Planned next steps",
    href: "#roadmap-next",
    className: styles.next,
  },
  Later: {
    icon: MoreHorizontal,
    description: "Longer-term possibilities",
    href: "#roadmap-later",
    className: styles.later,
  },
  Shipped: {
    icon: CheckCircle2,
    description: "Work already released",
    href: "#roadmap-history",
    className: styles.shipped,
  },
};

const milestones: Array<{
  id: Milestone;
  title: string;
  subtitle: string;
}> = [
  {
    id: "Release Week",
    title: "Release Week",
    subtitle:
      "Ship PyColors UI v1.0: core components, docs baseline, and release hygiene.",
  },
  {
    id: "Jan 2026",
    title: "January 2026",
    subtitle:
      "Stabilize quality, improve docs, and strengthen the distribution loop.",
  },
  {
    id: "Feb 2026",
    title: "February 2026",
    subtitle: "Ship Starter Free publicly and strengthen the trust baseline.",
  },
  {
    id: "Mar 2026",
    title: "March 2026",
    subtitle:
      "Move from PRO positioning into implementation: Starter Pro foundation, billing maturity, auth baseline, and conversion surfaces.",
  },
  {
    id: "Apr 2026",
    title: "April 2026",
    subtitle:
      "Turn Starter Pro into a real commercial product with purchase flow, secure delivery, and pricing clarity.",
  },
  {
    id: "May 2026",
    title: "May 2026",
    subtitle:
      "Turn documentation, branding, tokens, starters, pricing, and upgrade paths into a more premium and conversion-ready product surface.",
  },
  {
    id: "Jun 2026",
    title: "June 2026",
    subtitle:
      "Ship Starter Pro PWA foundations, buyer trust and purchase-flow clarity, local validation depth, release history, analytics, and stronger public product recovery paths.",
  },
  {
    id: "Jul 2026",
    title: "July 2026",
    subtitle:
      "Improve Starter Pro conversion proof, stabilize the free UI and token layer, recover the missed release week, and strengthen release reliability for faster premium product delivery.",
  },
  {
    id: "Aug 2026",
    title: "August 2026",
    subtitle:
      "PyColors Marketing v1.21.0 shipped on 7 August 2026 with clearer public guidance for adoption, customization, upgrades, and product evaluation.",
  },
  {
    id: "Sep 2026",
    title: "September 2026",
    subtitle:
      "The 25 September 2026 PyColors Marketing v1.25.0 update strengthens product proof, purchase and recovery guidance, live UI evaluation, and the showcase-first homepage journey.",
  },
  {
    id: "Oct 2026",
    title: "October 2026",
    subtitle:
      "PyColors Marketing v1.26.0, released on 2 October 2026, brings practical integration guidance and clearer product journeys.",
  },
  {
    id: "H1 2026",
    title: "H1 2026",
    subtitle:
      "Keep the public product surface accurate, credible, and focused on shipped work.",
  },
];

const items: RoadmapItem[] = [
  {
    title: "PyColors Marketing v1.26.0",
    description:
      "Released on 2 October 2026 with public AI integration guidance, clearer content discovery and purchase-recovery feedback.",
    status: "Shipped",
    milestone: "Oct 2026",
    href: "/changelog",
  },
  {
    title: "Docs-based AI integration guidance",
    description:
      "Use public PyColors guides with a coding agent today. Agent Context remains a Pilot; public Registry delivery and packaged skill evaluation are separate work.",
    status: "Shipped",
    milestone: "Oct 2026",
    href: "/docs/registry/agent-context",
  },
  {
    title: "Content-first blog and guide discovery",
    description:
      "Browse resources before supporting product sections, and follow article actions that describe their destinations.",
    status: "Shipped",
    milestone: "Oct 2026",
    href: "/guides",
  },
  {
    title: "Product-specific purchase recovery guidance",
    description:
      "Select the product you need and follow conditional confirmation, retry and support guidance.",
    status: "Shipped",
    milestone: "Oct 2026",
    href: "/orders/recover",
  },
  {
    title: "PyColors UI v1.5.5 baseline",
    description:
      "The displayed PyColors UI baseline is v1.5.5; PyColors Tokens remains v1.2.3. No additional package version is introduced by this Marketing release.",
    status: "Shipped",
    milestone: "Oct 2026",
    href: "/docs/ui",
  },
  {
    title: "PyColors Marketing v1.25.0",
    description:
      "Shipped on 25 September 2026 with clearer Starter Pro purchase and recovery guidance, stronger product proof, verified live UI evaluation links, and a showcase-first homepage journey.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Marketing", "Trust", "DX"],
    href: "/changelog",
  },
  {
    title: "Starter Pro purchase and recovery clarity",
    description:
      "Distinguish verified success from incomplete checkout states, expose recovery and support paths, and connect buyers to delivery and first-session guidance.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Starter Pro", "Trust", "Commerce"],
    href: "/starters/pro",
  },
  {
    title: "Live PyColors UI evaluation",
    description:
      "Connect UI documentation to the verified live UI Explorer and consumer Storybook guidance so component behavior and examples are easier to inspect.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["UI", "Docs", "DX"],
    href: "/docs/ui",
  },
  {
    title: "Showcase-first product journey",
    description:
      "Bring interactive product proof earlier on the homepage and pair Starter Pro offers with annotated screenshots so evaluation starts from visible product behavior.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Marketing", "Product", "Trust"],
    href: "/",
  },
  {
    title: "Product-specific setup guidance",
    description:
      "Choose a product path, follow its setup guide, and verify the first result. UI installation explains token CSS and styling setup before the first component.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Docs", "DX"],
    href: "/docs/getting-started",
  },
  {
    title: "Interactive UI usage examples",
    description:
      "Try notification settings, a rename dialog, a paginated members table, and save feedback with complete source. Examples use local state; applications own persistence and product behavior.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["UI", "Docs", "DX"],
    href: "/docs/ui/usage-patterns",
  },
  {
    title: "Design-system principles",
    description:
      "Use documented rules for semantic roles, composition, ownership, and accessibility when adapting UI primitives to a product.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Design System", "Docs", "Accessibility"],
    href: "/docs/design-system/principles",
  },
  {
    title: "Semantic color and Toast readability",
    description:
      "PyColors UI v1.5.4 and PyColors Tokens v1.2.3 improve light muted-text contrast, dark primary and destructive foregrounds, and semantic Toast readability with compatible public APIs.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["UI", "Tokens", "Accessibility"],
    href: "/docs/design-system/tokens",
  },
  {
    title: "PyColors Marketing v1.23.0",
    description:
      "The 2026-09-11 release connects the four-Block catalog, complete-source documentation, Pricing Plans, and Data Table empty-state actions while keeping application behavior consumer-owned.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Marketing", "Blocks", "DX"],
    href: "/changelog",
  },
  {
    title: "Blocks discovery and complete-source documentation",
    description:
      "Browse four documented Blocks from one catalog and copy their complete implementations from the guides. Copied source remains application-owned, without automatic updates or an installer.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Blocks", "Docs", "DX"],
    href: "/blocks",
  },
  {
    title: "Pricing Plans Block",
    description:
      "Compare offers with responsive plan cards, consumer-provided prices and billing terms, controlled period selection, and application-owned actions. The example uses fictional offers and processes no payments.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Blocks", "Commerce", "UI"],
    href: "/docs/blocks/commerce/pricing-plans",
  },
  {
    title: "Data Table empty-state actions",
    description:
      "Offer a first-record or filter-reset action when a ready table is empty. The application owns the callback and focus transition; loading, error, and populated states remain separate.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Blocks", "UX", "Accessibility"],
    href: "/docs/blocks/data/data-table",
  },
  {
    title: "PyColors Marketing v1.22.0",
    description:
      "Shipped on 4 September 2026 with the Theme Builder, practical copyable Blocks, a current PyColors UI baseline, and a clearer path from evaluation to implementation.",
    status: "Shipped",
    milestone: "Sep 2026",
    tags: ["Marketing", "DX", "Trust"],
    href: "/changelog",
  },
  {
    title: "PyColors Marketing v1.21.1",
    description:
      "Added the 2026-08-14 public marketing update to make the paths across UI, documentation, starters, and templates easier to evaluate while preserving the full roadmap context.",
    status: "Shipped",
    milestone: "Aug 2026",
    tags: ["Marketing", "Trust", "SEO"],
    href: "/changelog",
  },
  {
    title: "PyColors UI adoption guidance",
    description:
      "Shipped connected installation, usage, migration, theming, and accessibility guidance with more reliable documentation navigation.",
    status: "Shipped",
    milestone: "Aug 2026",
    tags: ["Docs", "DX", "Accessibility"],
    href: "/docs/ui",
  },
  {
    title: "Starter Pro purchase clarity",
    description:
      "Shipped clearer purchase expectations so teams can evaluate Starter Pro with more confidence before continuing.",
    status: "Shipped",
    milestone: "Aug 2026",
    tags: ["Starter Pro", "Trust"],
    href: "/starters/pro",
  },
  {
    title: "Ship v1.0 — UI Core",
    description:
      "Button, Input, Badge, Card, Alert: consistent variants, sizing, docs, preview, usage, code, and props.",
    status: "Shipped",
    milestone: "Release Week",
    tags: ["Core", "Docs"],
    href: "/docs/ui",
  },
  {
    title: "Docs quality pass",
    description:
      "Unify related guides, add missing Preview/Code tabs, fix footer consistency, and clean navigation.",
    status: "Shipped",
    milestone: "Release Week",
    tags: ["Docs", "DX"],
    href: "/docs",
  },
  {
    title: "Release hygiene",
    description:
      "Changelog page, Roadmap page, version bump, and release notes format.",
    status: "Shipped",
    milestone: "Release Week",
    tags: ["Release", "Trust"],
    href: "/changelog",
  },
  {
    title: "Marketing site baseline",
    description:
      "Home page v2 and dedicated pages for templates, license, about, trust, and ecosystem positioning.",
    status: "Shipped",
    milestone: "Jan 2026",
    tags: ["Marketing", "Trust"],
    href: "/",
  },
  {
    title: "Patterns docs v1",
    description:
      "Production UX rules and interactive demos for overlays, async actions, and data table states.",
    status: "Shipped",
    milestone: "Jan 2026",
    tags: ["Docs", "Patterns", "DX"],
    href: "/docs/patterns",
  },
  {
    title: "Distribution loop v1",
    description:
      "Repeatable launch routine: demo links, screenshot kit, what’s new posts, and publish checklist.",
    status: "Shipped",
    milestone: "Jan 2026",
    tags: ["Growth", "Launch"],
  },
  {
    title: "UI Advanced v1",
    description:
      "Dialog, Dropdown, Tabs, Tooltip, and Toast with accessibility-first behavior.",
    status: "Shipped",
    milestone: "Feb 2026",
    tags: ["Advanced", "Components", "Accessibility"],
    href: "/docs/ui",
  },
  {
    title: "Public packages",
    description:
      "Published @pycolors/tokens and @pycolors/eslint-config on npm to strengthen ecosystem consistency.",
    status: "Shipped",
    milestone: "Feb 2026",
    tags: ["Ecosystem", "NPM", "DX"],
  },
  {
    title: "Starter Free public alpha",
    description:
      "Starter Free publicly documented and positioned as the onboarding entry point.",
    status: "Shipped",
    milestone: "Feb 2026",
    tags: ["Starters", "Docs", "Launch"],
    href: "/starters/free",
  },
  {
    title: "Starter docs v1",
    description:
      "Installation, structure, conventions, deployment, upgrade path, auth, and billing concepts.",
    status: "Shipped",
    milestone: "Feb 2026",
    tags: ["Docs", "Starters", "DX"],
    href: "/docs/starter",
  },
  {
    title: "Guides knowledge layer",
    description:
      "Dedicated Guides layer covering product foundations, auth, billing, dashboards, admin, and team systems.",
    status: "Shipped",
    milestone: "Mar 2026",
    tags: ["Guides", "SaaS", "Education"],
    href: "/guides",
  },
  {
    title: "Patterns + Examples discovery layer",
    description:
      "Dedicated marketing pages for SaaS patterns and examples to show what users can learn, validate, and build.",
    status: "Shipped",
    milestone: "Mar 2026",
    tags: ["Patterns", "Examples", "Marketing"],
    href: "/ui/examples",
  },
  {
    title: "PRO upgrade funnel",
    description:
      "Dedicated upgrade page clarifying the value of moving from validation surfaces to production-ready wiring.",
    status: "Shipped",
    milestone: "Mar 2026",
    tags: ["PRO", "Upgrade", "Sales"],
    href: "/upgrade",
  },
  {
    title: "Billing system v1",
    description:
      "Stripe checkout, billing portal, webhook processing, subscription lifecycle, invoice sync, and PRO access enforcement.",
    status: "Shipped",
    milestone: "Mar 2026",
    tags: ["Billing", "Stripe", "Monetization"],
    href: "/pricing",
  },
  {
    title: "Starter PRO auth foundation",
    description:
      "Auth.js, Prisma-backed auth models, credentials, OAuth-ready providers, JWT sessions, verification, reset password, and transactional emails.",
    status: "Shipped",
    milestone: "Mar 2026",
    tags: ["Auth", "Starter PRO", "Security"],
    href: "/starters/pro",
  },
  {
    title: "OAuth sign-in and sign-up UX",
    description:
      "First-class Google and GitHub OAuth entry points with better loading states and onboarding UX.",
    status: "Shipped",
    milestone: "Apr 2026",
    tags: ["Auth", "OAuth", "Starter PRO"],
    href: "/starters/pro",
  },
  {
    title: "Auth security hardening",
    description:
      "Rate limiting, generic responses, and audit metadata collection for sensitive auth actions.",
    status: "Shipped",
    milestone: "Apr 2026",
    tags: ["Auth", "Security", "Rate limiting"],
  },
  {
    title: "Starter Pro public commercial launch",
    description:
      "Starter Pro became publicly available and purchasable on pycolors.io.",
    status: "Shipped",
    milestone: "Apr 2026",
    tags: ["Starter PRO", "Launch", "Sales"],
    href: "/starters/pro",
  },
  {
    title: "Secure claim, download, and access recovery",
    description:
      "Post-purchase access surfaces for claim, download, and recovery to make Starter Pro delivery more credible.",
    status: "Shipped",
    milestone: "Apr 2026",
    tags: ["Delivery", "Download", "Trust"],
    href: "/docs/starter-pro",
  },
  {
    title: "Pricing route consolidation",
    description:
      "Renamed /access to /pricing and updated links, breadcrumbs, sitemap priorities, and commercial references.",
    status: "Shipped",
    milestone: "Apr 2026",
    tags: ["Pricing", "Navigation", "Conversion"],
    href: "/pricing",
  },
  {
    title: "Reusable marketing hero system",
    description:
      "Unified marketing hero sections through a reusable PageHero component.",
    status: "Shipped",
    milestone: "Apr 2026",
    tags: ["Marketing", "Components", "Consistency"],
  },
  {
    title: "Premium docs navigation and header system",
    description:
      "Refined docs header, mobile navigation, search access, theme toggle placement, sidebar hierarchy, and fixed header behavior.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Docs", "Navigation", "Mobile"],
    href: "/docs",
  },
  {
    title: "Focused docs reading experience",
    description:
      "Improved TOC behavior, heading hierarchy, active states, sidebar clarity, responsive spacing, and table styling.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Docs", "TOC", "Accessibility"],
    href: "/docs",
  },
  {
    title: "Starter Free documentation refinement",
    description:
      "Clearer onboarding, product-surface evaluation, mocked-vs-wired explanations, and stronger upgrade path.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Starter Free", "Docs", "Upgrade"],
    href: "/docs/starter",
  },
  {
    title: "Starter Pro production documentation expansion",
    description:
      "Production readiness, auth, billing, backend, delivery, upgrade timing, and buyer confidence.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Starter PRO", "Docs", "Trust"],
    href: "/docs/starter-pro",
  },
  {
    title: "Marketing and pricing polish",
    description:
      "Refined hero styling, pricing hierarchy, card consistency, badge styling, buttons, accessibility, and layout details.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Marketing", "Pricing", "Conversion"],
    href: "/pricing",
  },
  {
    title: "Premium brand, token, and conversion polish",
    description:
      "Refined the PyColors brand system, token architecture, homepage, pricing, upgrade path, starter pages, screenshots, headers, footers, changelog, and roadmap for a more cohesive premium SaaS platform experience.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Brand", "Tokens", "Conversion"],
    href: "/changelog",
  },
  {
    title: "NA-AI Landing commercial template",
    description:
      "Integrated NA-AI Landing as a premium AI SaaS landing page product with docs, license, demo, pricing, and purchase flow.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Templates", "NA-AI", "Monetization"],
    href: "/templates/na-ai-landing",
  },
  {
    title: "Multi-product commerce foundation",
    description:
      "Generalized checkout, customer access, recovery, delivery, and product messaging for multiple premium digital products.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Commerce", "Delivery", "Monetization"],
    href: "/pricing",
  },
  {
    title: "Templates documentation system",
    description:
      "Added template docs, NA-AI Landing guides, licensing guidance, customization docs, and clearer product selection paths.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Docs", "Templates", "Onboarding"],
    href: "/docs/templates/na-ai-landing",
  },
  {
    title: "Blog editorial UX polish",
    description:
      "Refined blog layout, prose, metadata, sharing, accessibility, and reading flow to support authority-building content.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Blog", "SEO", "Authority"],
    href: "/blog",
  },
  {
    title: "Reusable docs component system",
    description:
      "Unified documentation pages around reusable feature grids, CTA blocks, concept tabs, decision grids, related links, steps, and clearer heading hierarchy.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Docs", "Components", "DX"],
    href: "/docs",
  },
  {
    title: "NA-AI Landing documentation expansion",
    description:
      "Expanded setup, customization, deployment, project structure, license guidance, and production-readiness documentation for the NA-AI Landing template.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Templates", "NA-AI", "Docs"],
    href: "/docs/templates/na-ai-landing",
  },
  {
    title: "Documentation decision surfaces",
    description:
      "Added clearer concept tabs and decision grids to help users compare product paths and understand when to use templates, UI, Starter Free, or Starter Pro.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Docs", "Conversion", "Product"],
    href: "/docs",
  },
  {
    title: "Starter Pro production architecture documentation",
    description:
      "Expand Starter Pro documentation around architecture, deployment, infrastructure, environment variables, and production scalability patterns.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Starter PRO", "Docs", "Architecture"],
    href: "/docs/starter-pro",
  },
  {
    title: "Scalable token foundation",
    description:
      "Migrate radius tokens to scalable rem-driven architecture for stronger consistency, theming flexibility, and long-term design-system maintainability.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Tokens", "Design System", "Scalability"],
    href: "/docs/design-system",
  },
  {
    title: "Trusted Publishing infrastructure",
    description:
      "Harden npm publishing workflows through GitHub OIDC Trusted Publishing, Changesets automation, and improved release reliability.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["CI", "Release", "Infrastructure"],
  },
  {
    title: "Commercial upgrade clarity",
    description:
      "Strengthen Free-to-Pro positioning with clearer upgrade messaging, product differentiation, and production-ready SaaS value communication.",
    status: "Shipped",
    milestone: "May 2026",
    tags: ["Conversion", "Upgrade", "Starter PRO"],
    href: "/upgrade",
  },
  {
    title: "Reusable SaaS feature showcase system",
    description:
      "Introduced reusable Feature Showcase patterns across Starter Pro and documentation to standardize premium feature presentation, upgrade positioning, and scalable SaaS product communication.",
    status: "Shipped",
    milestone: "H1 2026",
    tags: ["Starter PRO", "Patterns", "Conversion"],
    href: "/docs/patterns/feature-showcase",
  },

  {
    title: "Upgrade Gate monetization patterns",
    description:
      "Added reusable Upgrade Gate documentation and UX guidance for production-ready premium feature gating and upgrade flows.",
    status: "Shipped",
    milestone: "H1 2026",
    tags: ["Monetization", "Upgrade", "Patterns"],
    href: "/docs/patterns/upgrade-gate",
  },

  {
    title: "Starter Pro product-surface refinement",
    description:
      "Refined dashboard, pricing, billing, projects, settings, admin, and navigation surfaces to improve SaaS product maturity and premium UX consistency.",
    status: "Shipped",
    milestone: "H1 2026",
    tags: ["Starter PRO", "UX", "Product"],
    href: "/starters/pro",
  },

  {
    title: "Documentation modularity and decision systems",
    description:
      "Expanded reusable documentation structures, concept guidance, comparison systems, and decision-oriented product documentation.",
    status: "Shipped",
    milestone: "H1 2026",
    tags: ["Docs", "DX", "Architecture"],
    href: "/docs",
  },
  {
    title: "Starter Pro PWA foundation",
    description:
      "Added installable manifest metadata, service worker registration, offline fallback behavior, PWA icons and screenshots, mobile viewport tuning, and app-like product messaging.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Starter PRO", "PWA", "Mobile"],
    href: "/docs/starter-pro/pwa",
  },
  {
    title: "Public shell and safe-area layout system",
    description:
      "Introduced shared public header and shell layouts for marketing and auth pages, centralizing navigation, footer structure, sticky headers, safe-area spacing, and responsive viewport behavior.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Starter PRO", "Layout", "UX"],
    href: "/starters/pro",
  },
  {
    title: "Local validation and billing testing docs",
    description:
      "Expanded Starter Pro guidance for local development, seeded auth fixtures, production-shaped test accounts, Stripe Checkout validation, webhook sync, and billing-aware access checks.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Docs", "Testing", "Billing"],
    href: "/docs/starter-pro",
  },
  {
    title: "Analytics, SEO, and recovery-path hardening",
    description:
      "Added Vercel Analytics to marketing and Starter Free, tightened Starter Free demo indexing controls, and improved 404 recovery paths with grouped ecosystem links and clearer CTAs.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Analytics", "SEO", "Navigation"],
    href: "/changelog",
  },
  {
    title: "Starter Pro release history and packaging",
    description:
      "Added Starter Pro release history documentation, centralized versioning policy references, and a release script for packaging versioned Starter Pro archives.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Release", "Docs", "Starter PRO"],
    href: "/docs/starter-pro/releases-history",
  },
  {
    title: "Marketing proof and launch visibility",
    description:
      "Added Starter Free and Starter Pro promotional screenshots, a rotating hero carousel, Product Hunt badges, PWA-focused guides, and stronger public messaging around pragmatic SaaS PWA foundations.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Marketing", "Proof", "PWA"],
    href: "/starters/pro",
  },
  {
    title: "Authority engineering content engine",
    description:
      "Publish high-value engineering articles around SaaS infrastructure, monorepos, CI/CD, npm publishing, release workflows, and production-ready developer systems.",
    status: "Now",
    milestone: "H1 2026",
    tags: ["Blog", "Authority", "SEO"],
    href: "/blog",
  },

  {
    title: "Starter Pro conversion instrumentation",
    description:
      "Measure the docs-to-pricing-to-checkout funnel across Starter Free, Starter Pro, pricing, upgrade, and post-purchase access, starting with Vercel Analytics coverage.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Analytics", "Conversion", "Sales"],
    href: "/pricing",
  },
  {
    title: "Starter Pro buyer trust and purchase-flow clarity",
    description:
      "Improved checkout success, purchase recovery, claim and download, Getting Started, pricing navigation, and consistent post-purchase terminology for Starter Pro buyers.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Starter PRO", "Trust", "Conversion"],
    href: "/checkout/success",
  },
  {
    title: "Starter Pro hosted demo",
    description:
      "Publish a hosted Starter Pro demo so buyers can evaluate the production-shaped product surface before purchase.",
    status: "Next",
    milestone: "Jun 2026",
    tags: ["Starter PRO", "Demo", "Trust"],
    href: "/starters/pro",
  },
  {
    title: "Starter Pro demo visibility and conversion proof",
    description:
      "Improved live demo visibility, Starter Free → Demo → Starter Pro flow, annotated screenshots, what-you-receive messaging, buyer confidence near purchase CTAs, comparison clarity, and documentation entry points without backend or pricing changes.",
    status: "Shipped",
    milestone: "Jul 2026",
    tags: ["Starter PRO", "Conversion", "Trust"],
    href: "/starters/pro",
  },
  {
    title: "@pycolors/ui v1.1.2 accessibility hardening",
    description:
      "PasswordInput now fully respects the disabled state on its visibility toggle, and TableLoading exposes accessible live-region semantics, backed by new Vitest, jsdom, and Testing Library regression coverage for exports, forms, password visibility, tables, Card semantics, and EmptyState semantics. No public API, export, prop, variant, or size changed. Data-slot consistency, Pagination asChild support, and a Checkbox error API remain open follow-up work.",
    status: "Shipped",
    milestone: "Jul 2026",
    tags: ["@pycolors/ui", "Accessibility", "Testing"],
    href: "/docs/ui",
  },
  {
    title: "@pycolors/ui production-readiness sprint",
    description:
      "Landed nonbreaking accessibility, contrast, validation, reduced-motion, table semantics, and React Server Component reliability improvements with broader automated coverage. The work is now reflected in the repository package baseline for @pycolors/ui v1.1.4 and @pycolors/tokens v1.2.2.",
    status: "Shipped",
    milestone: "Jul 2026",
    tags: ["@pycolors/ui", "Quality", "Accessibility"],
    href: "/docs/ui",
  },
  {
    title: "Release catch-up and UI delivery cleanup",
    description:
      "Closed the missed 24 July marketing release with a focused operational note covering Card RSC follow-up, generated docs source maintenance, dependency alignment, and release-preflight cleanup without changing pricing, checkout, backend behavior, or product scope.",
    status: "Shipped",
    milestone: "Jul 2026",
    tags: ["Release", "Marketing", "Reliability"],
    href: "/changelog",
  },
  {
    title: "@pycolors/tokens v1.2.2 contrast baseline",
    description:
      "Added dedicated success and warning foreground tokens for light and dark themes, plus Tailwind v4 theme bridges, giving Badge and future components a clearer accessible status-color foundation without requiring consumer migrations.",
    status: "Shipped",
    milestone: "Jul 2026",
    tags: ["@pycolors/tokens", "Accessibility", "Design System"],
    href: "/docs/design-system/tokens",
  },
  {
    title: "Component standards and reliable delivery foundation",
    description:
      "Established durable component API conventions, production-safe documentation examples, repeatable release controls, and a governed engineering workflow so the ecosystem can ship focused improvements with lower regression risk.",
    status: "Shipped",
    milestone: "Jul 2026",
    tags: ["DX", "Documentation", "Release"],
    href: "/changelog",
  },
  {
    title: "Starter Pro video walkthrough",
    description:
      "Publish a concise walkthrough from purchase to first local run so buyers understand delivery, setup, and next steps faster.",
    status: "Next",
    milestone: "Jun 2026",
    tags: ["Starter PRO", "Trust", "Onboarding"],
    href: "/docs/starter-pro/getting-started",
  },
  {
    title: "Template #2",
    description:
      "Ship the next premium template product with docs, pricing, checkout, and delivery aligned to the existing commerce foundation.",
    status: "Next",
    milestone: "H1 2026",
    tags: ["Templates", "Monetization", "Catalog"],
    href: "/templates",
  },
  {
    title: "@pycolors/blocks",
    description:
      "Package-based distribution remains planned. The current Blocks catalog provides source-copy guides, not an installable Blocks package.",
    status: "Next",
    milestone: "H1 2026",
    tags: ["Blocks", "UI", "DX"],
    href: "/blocks",
  },
  {
    title: "Starter Pro sales proof and trust content",
    description:
      "Add implementation comparisons, real architecture explanations, buyer reassurance, launch checklists, and authority content.",
    status: "Now",
    milestone: "May 2026",
    tags: ["Trust", "Content", "Starter PRO"],
    href: "/starters/pro",
  },
  {
    title: "Documentation-to-product conversion loop",
    description:
      "Keep guides, patterns, Starter Free, Starter Pro, pricing, and checkout paths aligned so public product journeys stay clear.",
    status: "Now",
    milestone: "H1 2026",
    tags: ["Docs", "Conversion", "SEO"],
    href: "/docs",
  },
  {
    title: "Traffic-readiness trust cleanup",
    description:
      "Remove stale links, unfinished public promises, and outdated claims before sending more traffic to roadmap, changelog, pricing, and product pages.",
    status: "Shipped",
    milestone: "Jun 2026",
    tags: ["Trust", "SEO", "Marketing"],
    href: "/changelog",
  },
];

function StatusBadge({ status }: Readonly<{ status: Status }>) {
  const { icon: Icon, className } = statusMeta[status];
  return (
    <Badge variant="outline" className={cn(styles.statusBadge, className)}>
      <Icon className="size-3" aria-hidden="true" />
      {status}
    </Badge>
  );
}

function RoadmapCard({
  item,
  archived = false,
}: Readonly<{
  item: RoadmapItem;
  archived?: boolean;
}>) {
  const external = item.href?.startsWith("http");
  const content = (
    <>
      <div className={styles.itemMeta}>
        <StatusBadge status={item.status} />
        {!archived ? (
          <span className={styles.milestoneLabel}>
            Original milestone · {item.milestone}
          </span>
        ) : null}
      </div>
      <div className={styles.itemHeading}>
        <h3>{item.title}</h3>
        {item.href ? (
          <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
        ) : null}
      </div>
      <p className={styles.itemDescription}>{item.description}</p>
      {item.tags?.length ? (
        <div className={styles.tags}>
          {item.tags.map((tag) => (
            <Badge key={tag} variant="outline" className={styles.tag}>
              {tag}
            </Badge>
          ))}
        </div>
      ) : null}
      {external ? <span className="sr-only">Opens in a new tab.</span> : null}
    </>
  );
  const className = cn(
    styles.item,
    archived ? styles.archiveItem : styles.activeItem,
  );
  if (!item.href) return <div className={className}>{content}</div>;
  if (external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        className={className}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

const historyOrder: Milestone[] = [
  "Oct 2026",
  "Sep 2026",
  "Aug 2026",
  "Jul 2026",
  "Jun 2026",
  "H1 2026",
  "May 2026",
  "Apr 2026",
  "Mar 2026",
  "Feb 2026",
  "Jan 2026",
  "Release Week",
];

export default function RoadmapPage() {
  const byStatus = {
    Now: items.filter((item) => item.status === "Now"),
    Next: items.filter((item) => item.status === "Next"),
    Later: items.filter((item) => item.status === "Later"),
    Shipped: items.filter((item) => item.status === "Shipped"),
  };
  const history = historyOrder.flatMap((id) => {
    const milestone = milestones.find((milestone) => milestone.id === id);
    const entries = byStatus.Shipped.filter((item) => item.milestone === id);
    return milestone && entries.length ? [{ ...milestone, entries }] : [];
  });

  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="max-w-7xl pb-16 pt-24 sm:pb-24 sm:pt-28 lg:px-6 xl:px-0">
        <Breadcrumb
          className={styles.breadcrumb}
          items={[
            { label: "Home", href: "/" },
            { label: "Roadmap", href: "/roadmap" },
          ]}
        />
        <div className={styles.heroLayout}>
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0"
            className={styles.hero}
            badges={[
              {
                label: "Public roadmap",
                icon: <Route className="size-3.5" aria-hidden="true" />,
              },
            ]}
            title="The work ahead. The progress so far."
            description="Follow the evolution of PyColors, from UI foundations to product experiences. See the active work, the planned next steps and what has already shipped."
            actions={
              <>
                <MarketingLinkButton>
                  <Link href="#roadmap-priorities">
                    Explore the priorities
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </Link>
                </MarketingLinkButton>
                <Link href="/changelog" className={styles.textLink}>
                  View changelog
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </>
            }
          />
          <aside
            aria-labelledby="roadmap-overview-heading"
            className={styles.overview}
          >
            <div className={styles.overviewHeading}>
              <GitBranch className="size-4" aria-hidden="true" />
              <h2 id="roadmap-overview-heading">Roadmap at a glance</h2>
            </div>
            <ul
              aria-label="Roadmap status totals"
              className={styles.statusTotals}
            >
              {(["Now", "Next", "Later", "Shipped"] as const).map((status) => {
                const {
                  icon: Icon,
                  description,
                  href,
                  className,
                } = statusMeta[status];
                return (
                  <li key={status}>
                    <Link
                      href={href}
                      className={cn(styles.statusLink, className)}
                    >
                      <Icon className={styles.statusIcon} aria-hidden="true" />
                      <span className={styles.statusCopy}>
                        <span className={styles.statusLabel}>{status}</span>
                        <span className={styles.statusDescription}>
                          {description}
                        </span>
                      </span>
                      <span className={styles.statusCount}>
                        {byStatus[status].length}
                      </span>
                      <ArrowDown
                        className="size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className={styles.overviewNote}>
              Item counts describe the public roadmap, not release versions.
            </p>
          </aside>
        </div>

        <div className={styles.directionNote}>
          <CircleDashed className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>
            This roadmap reflects current product direction. It is not a
            contractual delivery promise, and scope may evolve based on real
            usage, feedback, bugs, and commercial priorities.
          </p>
        </div>

        <section
          id="roadmap-priorities"
          aria-labelledby="roadmap-priorities-heading"
          tabIndex={-1}
          className={styles.section}
        >
          <span className={styles.eyebrow}>01 / Looking ahead</span>
          <MarketingSectionHeader
            align="left"
            titleId="roadmap-priorities-heading"
            title="Active priorities. Clear next steps."
            description="Now reflects active work. Next describes planned scope. Original milestone labels provide context; they are not new delivery dates."
          />
          <div className={styles.priorityGrid}>
            {(["Now", "Next"] as const).map((status) => (
              <section
                key={status}
                id={`roadmap-${status.toLowerCase()}`}
                aria-label={status}
                tabIndex={-1}
                className={cn(
                  styles.priorityLane,
                  status === "Now" && styles.nowLane,
                )}
              >
                <div className={styles.laneHeading}>
                  <StatusBadge status={status} />
                  <span>{byStatus[status].length} items</span>
                </div>
                <p className={styles.laneDescription}>
                  {status === "Now"
                    ? "Work receiving attention today."
                    : "The next improvements under consideration."}
                </p>
                <ul
                  aria-label={`${status} roadmap items`}
                  className={styles.priorityList}
                >
                  {byStatus[status].map((item) => (
                    <li key={item.title}>
                      <RoadmapCard item={item} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <section
            id="roadmap-later"
            aria-label="Later"
            tabIndex={-1}
            className={styles.laterSection}
          >
            <div>
              <StatusBadge status="Later" />
              <span className={styles.laterCount}>
                {byStatus.Later.length} items
              </span>
            </div>
            {byStatus.Later.length ? (
              <ul aria-label="Later roadmap items" className={styles.laterList}>
                {byStatus.Later.map((item) => (
                  <li key={item.title}>
                    <RoadmapCard item={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                No longer-term items are listed yet. New scope will appear here
                when it is ready to share.
              </p>
            )}
          </section>
        </section>

        <section
          id="roadmap-history"
          aria-labelledby="roadmap-history-heading"
          tabIndex={-1}
          className={cn(styles.section, styles.dividedSection)}
        >
          <div className={styles.historyLayout}>
            <div className={styles.historyIntro}>
              <span className={styles.eyebrow}>02 / Delivered work</span>
              <h2 id="roadmap-history-heading">Progress you can explore.</h2>
              <p>
                Browse {byStatus.Shipped.length} shipped items by milestone,
                starting with the most recent month. Open a group to see its
                details and related product pages.
              </p>
              <Link href="/changelog" className={styles.textLink}>
                <History className="size-4" aria-hidden="true" />
                Read the release notes
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
              <p className={styles.historyHint}>
                Month labels group the roadmap history. The changelog records
                dated releases.
              </p>
            </div>
            <div className={styles.historyGroups}>
              {history.map((milestone, index) => (
                <details
                  key={milestone.id}
                  open={index === 0}
                  className={cn(styles.historyGroup, disclosureStyles.item)}
                >
                  <summary className={styles.historySummary}>
                    <span className={styles.historyDot} aria-hidden="true" />
                    <span className={styles.historyMonth}>
                      {milestone.title}
                    </span>
                    <span className={styles.historyCount}>
                      {milestone.entries.length} shipped
                    </span>
                    <span
                      className={disclosureStyles.indicator}
                      aria-hidden="true"
                    >
                      <ChevronDown className="size-4" />
                    </span>
                  </summary>
                  <div className={disclosureStyles.content}>
                    <p className={styles.milestoneDescription}>
                      {milestone.subtitle}
                    </p>
                    <ul
                      aria-label={milestone.title}
                      className={styles.historyList}
                    >
                      {milestone.entries.map((item) => (
                        <li key={item.title}>
                          <RoadmapCard item={item} archived />
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="roadmap-feedback-heading"
          className={styles.feedbackSection}
        >
          <MarketingCtaPanel
            titleId="roadmap-feedback-heading"
            title="Help shape the next improvement."
            description="Found a UI bug or a documentation gap? Share the details in the public repository. Clear steps and examples make feedback easier to act on."
            className={styles.feedbackPanel}
            actions={
              <MarketingActionGroup>
                <MarketingLinkButton>
                  <a
                    href="https://github.com/pycolors-io/pycolors-ui/issues"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Open UI issue
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </MarketingLinkButton>
                <Link href="/contact" className={styles.textLink}>
                  <MessageSquare className="size-4" aria-hidden="true" />
                  Contact PyColors
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </MarketingActionGroup>
            }
          />
          <div className={styles.feedbackFooter}>
            <p>
              Roadmap items may shift based on feedback, bugs, technical
              constraints, and real-world usage.
            </p>
            <a
              href="https://github.com/pycolors-io/pycolors-ui"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.textLink}
            >
              View UI repository
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}
