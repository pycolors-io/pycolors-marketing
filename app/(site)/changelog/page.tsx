import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Tag,
  CheckCircle2,
} from 'lucide-react';

import { Container } from '@/components/container';
import {
  Badge,
  cn,
  Button,
  Card,
  CardHeader,
  CardContent,
} from '@pycolors/ui';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Next.js SaaS Product Changelog',
  description:
    'Release notes and product updates for the PyColors ecosystem covering Next.js SaaS starters, UI systems, templates, documentation, developer tooling, and production-ready platform evolution.',
  alternates: {
    canonical: '/changelog',
  },

  openGraph: {
    title: 'Next.js SaaS Product Changelog',
    description:
      'Explore PyColors release notes across SaaS starters, UI systems, templates, documentation, developer tooling, and production-ready product evolution.',
    url: '/changelog',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Product Changelog',
    description:
      'Release notes and product updates for the PyColors SaaS ecosystem, UI systems, templates, starters, and developer tooling.',
    images: ['/seo/twitter-main.png'],
  },
};

type ChangelogStatus = 'Stable' | 'Beta' | 'In progress';

type ChangelogItem = {
  version: string;
  title: string;
  dateLabel: string;
  dateISO: string;
  status: ChangelogStatus;
  releaseWeekLabel: string;
  summary: string;
  highlights: Array<{
    title: string;
    items: string[];
  }>;
  cta?: { label: string; href: string };
};

const CHANGELOG: ChangelogItem[] = [
  {
    version: 'v1.1.2 (@pycolors/ui)',
    title: '@pycolors/ui accessibility hardening',
    dateLabel: 'Sat 11 Jul 2026',
    dateISO: '2026-07-11',
    status: 'Stable',
    releaseWeekLabel: 'Jul 2026 (patch release)',
    summary:
      'This nonbreaking patch fixes two accessibility gaps in @pycolors/ui and adds package-level regression test coverage. PasswordInput now fully respects the disabled state on its visibility toggle, and TableLoading exposes accessible live-region semantics so assistive technology users are notified when a table starts loading. No public API, export, prop, variant, or size changed.',

    highlights: [
      {
        title: 'Accessibility fixes',
        items: [
          'PasswordInput: the show/hide visibility toggle is disabled together with the field, instead of staying clickable on a disabled input.',
          'TableLoading: now exposes accessible live-region semantics instead of being visual-only.',
        ],
      },
      {
        title: 'Test and reliability improvements',
        items: [
          'Added Vitest, jsdom, and Testing Library package-level coverage for @pycolors/ui.',
          'Added focused regression coverage for package exports, Button variants, Input/Textarea accessibility, PasswordInput behavior, Table rendering and loading states, Card asChild/interactive semantics, and EmptyState status semantics.',
        ],
      },
      {
        title: 'Still open (not part of this release)',
        items: [
          'Package-wide data-slot consistency across Dialog, Sheet, DropdownMenu, Tabs, and Toast.',
          'Pagination asChild support and a first-class Checkbox error API.',
        ],
      },
    ],

    cta: { label: 'View @pycolors/ui docs', href: '/docs/ui' },
  },
  {
    version: 'v1.17.4',
    title: 'Starter Pro demo visibility and conversion proof',
    dateLabel: 'Fri 3 Jul 2026',
    dateISO: '2026-07-03',
    status: 'Stable',
    releaseWeekLabel: 'Jul 2026 (patch release)',
    summary:
      'This patch improves Starter Pro conversion clarity by making the live demo easier to find, moving visual proof closer to the buying decision, clarifying what buyers receive after checkout, and strengthening buyer confidence near purchase CTAs. No backend changes and no pricing changes.',

    highlights: [
      {
        title: 'Live demo visibility improved',
        items: [
          'Added clearer Try the live demo paths across homepage, pricing, starters, and Starter Pro pages.',
          'Made the Starter Free live demo feel like the natural evaluation step before buying Starter Pro.',
          'Clarified the Starter Free → Demo → Starter Pro journey across key marketing surfaces.',
        ],
      },
      {
        title: 'Starter Pro product proof strengthened',
        items: [
          'Moved Starter Pro visual proof closer to the hero so buyers see the product faster.',
          'Added annotated screenshots and concise value captions for dashboard, authentication, billing, organizations, and PWA-ready surfaces.',
          'Improved “what you receive” messaging around ZIP delivery, full source code, documentation, production checklist, commercial license, and future updates.',
        ],
      },
      {
        title: 'Buyer confidence before checkout improved',
        items: [
          'Added stronger reassurance near purchase CTAs for secure checkout, instant ZIP delivery, future updates, and purchase recovery.',
          'Reworked Free vs Pro comparison copy toward buyer outcomes and business value.',
          'Improved documentation entry points for included scope, setup, deployment, billing, authentication, and production readiness.',
        ],
      },
    ],

    cta: {
      label: 'View Starter Pro',
      href: '/starters/pro',
    },
  },

  {
    version: 'v1.17.3',
    title: 'Starter Pro buyer trust and purchase-flow clarity',
    dateLabel: 'Fri 26 Jun 2026',
    dateISO: '2026-06-26',
    status: 'Stable',
    releaseWeekLabel: 'Jun 2026 (patch release)',
    summary:
      'This patch improves Starter Pro buyer trust across the full purchase path: clearer checkout success guidance, consistent purchase recovery language, stronger claim and download setup direction, and aligned Getting Started documentation. No backend changes.',

    highlights: [
      {
        title: 'Checkout success and purchase recovery clarity',
        items: [
          'Replaced failure-state checkout success copy with inbox-first guidance and clearer next steps after payment.',
          'Moved purchase recovery to a secondary “Resend access link” action on checkout success.',
          'Standardized terminology around claim email, access link, purchase recovery, and resend access link.',
        ],
      },
      {
        title: 'Claim, download, and setup guidance',
        items: [
          'Added clearer claim and download setup guidance, including a Start setup path to Getting Started.',
          'Added a download and unzip step before install commands in Starter Pro Getting Started.',
          'Removed the top-of-page purchase CTA from Getting Started for post-purchase readers.',
        ],
      },
      {
        title: 'Pricing and Starters navigation polish',
        items: [
          'Added an Explore Starter Pro link on the Starter Pro pricing card.',
          'Fixed the Starters examples link from `/examples` to `/ui/examples`.',
          'Expanded Starter Pro buyer reassurance across pricing and product surfaces.',
        ],
      },
    ],

    cta: {
      label: 'View Starter Pro',
      href: '/starters/pro',
    },
  },

  {
    version: 'v1.17.1',
    title: 'NA-AI Landing checkout reliability fix',
    dateLabel: 'Fri 19 Jun 2026',
    dateISO: '2026-06-19',
    status: 'Stable',
    releaseWeekLabel: 'Jun 2026 (patch release)',
    summary:
      'This patch improves trust and conversion reliability for the templates catalog by fixing the NA-AI Landing purchase action on /templates.',

    highlights: [
      {
        title: 'Templates purchase path reliability improved',
        items: [
          'Fixed the broken NA-AI Landing checkout action on `/templates`.',
          'Reused the existing product checkout button flow from the product detail page.',
          'Improved reliability of the templates purchase path without changing product scope.',
        ],
      },
    ],

    cta: {
      label: 'View templates',
      href: '/templates',
    },
  },

  {
    version: 'v1.17.0',
    title:
      'Starter Pro PWA foundations, public shell, local validation docs, analytics, and launch visibility',
    dateLabel: 'Fri 12 Jun 2026',
    dateISO: '2026-06-12',
    status: 'Stable',
    releaseWeekLabel: 'Jun 2026 (weekly release)',
    summary:
      'This release moves Starter Pro further toward a polished, app-like SaaS starter. It adds pragmatic PWA foundations, introduces a shared public shell for marketing and auth routes, expands local development and billing validation documentation, improves marketing analytics and SEO controls, and strengthens release transparency with versioning and product-specific release history. The focus is practical product credibility: installability, safer offline behavior, clearer public navigation, stronger local testing, and better launch visibility.',

    highlights: [
      {
        title: 'Starter Pro is now PWA-ready',
        items: [
          'Added PWA configuration, web app manifest metadata, app icons, screenshots, theme colors, viewport refinements, and app-like installability settings.',
          'Added a service worker registration component and lightweight service worker caching with an offline fallback page for resilient navigation.',
          'Updated product copy, pricing, dashboard cards, badges, included-feature lists, and documentation to communicate PWA-ready foundations clearly.',
          'Kept the PWA layer conservative and SaaS-safe: online-first for auth, billing, admin, and source-of-truth workflows.',
        ],
      },
      {
        title: 'Public shell and responsive layout foundations improved',
        items: [
          'Introduced shared public shell, public header, marketing layout wrapper, and auth-layout integration for consistent unauthenticated pages.',
          'Added sticky header behavior, safe-area CSS variables, dynamic viewport height handling, and mobile-safe spacing for app and public layouts.',
          'Refined homepage, auth, pricing, settings, security, connected accounts, project, admin, and not-found surfaces with subtler borders and stronger responsive behavior.',
          'Improved empty states and accessibility details, including clearer not-found guidance and decorative icon handling.',
        ],
      },
      {
        title: 'Starter Pro documentation expanded for production-shaped validation',
        items: [
          'Added PWA overview, setup, production checklist, and pragmatic PWA guidance for installability, manifest, icons, offline fallback, and standalone behavior.',
          'Added Local Development, testing fixtures, seeded local accounts, and billing testing guides to help validate auth, onboarding, subscriptions, webhooks, and protected routes.',
          'Expanded README structure with local DB scripts, db logs, markdown links, Stripe and seed guidance, and clearer setup/testing instructions.',
          'Added Starter Pro release history docs and centralized versioning-policy references to make upgrade expectations more transparent.',
        ],
      },
      {
        title: 'Marketing analytics, SEO, and recovery paths strengthened',
        items: [
          'Added Vercel Analytics to the marketing app and Starter Free demo so public usage and performance telemetry can be collected across pages.',
          'Released Starter Free v1.2.2 with no-index controls, googleBot directives, canonical metadata, analytics, and corrected external Starter Pro links.',
          'Improved the 404 page with recovery-path grids, ecosystem links, clearer CTAs, and routes toward docs, starters, pricing, changelog, roadmap, and patterns.',
          'Added versioning policy documentation and product-specific release history references to reduce duplicated release guidance.',
        ],
      },
      {
        title: 'Marketing proof and launch visibility improved',
        items: [
          'Added Starter Free and Starter Pro promotional screenshots for auth, dashboard, billing, pricing, projects, settings, admin, and PWA views.',
          'Replaced the static screenshot gallery with a focused hero carousel, looping animations, feature cards, and stronger Starter Pro product proof.',
          'Added PWA-focused blog and guide content explaining pragmatic installability, standalone mode, mobile-safe UX, and safer offline foundations for SaaS.',
          'Added Product Hunt badges to the marketing header and footers to improve launch visibility and discoverability.',
        ],
      },
      {
        title: 'Release and delivery workflow improved',
        items: [
          'Released Starter Pro v1.3.0 with PWA foundations, public shell layouts, UX polish, metadata improvements, local DB helpers, and onboarding updates.',
          'Added a Starter Pro release packaging script that creates versioned ZIP archives with standard excludes and upload-ready output paths.',
          'Centralized metadata from PWA configuration and strengthened Starter Pro SEO metadata, robots directives, fallback metadataBase handling, and dark color-scheme behavior.',
          'Standardized UI tokens across multiple Starter Pro surfaces, replacing mixed hard-coded borders and color utilities with semantic tokens.',
        ],
      },
    ],

    cta: {
      label: 'View Starter Pro',
      href: '/starters/pro',
    },
  },

  {
    version: 'v1.16.0',
    title:
      'Starter Pro product maturity, reusable SaaS patterns, premium docs polish, and conversion-ready platform refinement',
    dateLabel: 'Fri 5 Jun 2026',
    dateISO: '2026-06-05',
    status: 'Stable',
    releaseWeekLabel: 'Jun 2026 (weekly release)',
    summary:
      'This release significantly improves the product maturity of Starter Pro and strengthens PyColors as a production-ready SaaS developer platform. It introduces reusable SaaS showcase patterns, refines pricing and dashboard surfaces, improves projects and admin workflows, upgrades documentation architecture, and unifies UI consistency across marketing and product experiences. The focus is clear: stronger product credibility, clearer upgrade positioning, better onboarding quality, and more scalable documentation and SaaS UX foundations.',

    highlights: [
      {
        title:
          'Starter Pro product surfaces are more production-ready',
        items: [
          'Refined dashboard, billing, pricing, settings, projects, and admin experiences to feel more cohesive and product-oriented.',
          'Improved visual hierarchy, status handling, badges, navigation clarity, and responsive layout consistency across the app.',
          'Strengthened readonly typing patterns and centralized UI configuration logic to improve long-term maintainability.',
          'Improved product wording and structure to better communicate operational SaaS workflows and subscription-ready experiences.',
        ],
      },
      {
        title: 'Reusable Feature Showcase system introduced',
        items: [
          'Added a reusable FeatureShowcase component for presenting advanced SaaS capabilities and extensible product surfaces.',
          'Standardized preview layouts, feature lists, upgrade positioning, and documentation CTAs across Starter Pro.',
          'Improved consistency when presenting premium product capabilities and future-ready architecture patterns.',
          'Expanded reusable product-marketing patterns to reduce duplication and improve scalability across the platform.',
        ],
      },

      {
        title: 'Projects, billing, and admin UX refined',
        items: [
          'Improved project creation, rename, archive, and delete flows with clearer UX guidance and stronger validation behavior.',
          'Refined billing surfaces, invoice actions, subscription states, and pricing messaging for improved clarity and consistency.',
          'Improved admin member management, invitation workflows, filtering, and table handling.',
          'Expanded product-oriented navigation and internal routing consistency across Starter Pro surfaces.',
        ],
      },

      {
        title: 'Documentation architecture and patterns expanded',
        items: [
          'Added Feature Showcase and Upgrade Gate documentation patterns for production-ready SaaS product communication.',
          'Expanded decision-oriented documentation with stronger UX guidance, comparison systems, and monetization-aware product patterns.',
          'Refined documentation hierarchy, modularity, and reusable content structures for easier long-term maintenance.',
          'Improved docs readability, instructional clarity, and interactive guidance across UI and product documentation.',
        ],
      },

      {
        title: 'Premium UI consistency and polish improved',
        items: [
          'Unified shadows, border radius usage, spacing, hover behavior, and neutral surfaces across documentation and product UI.',
          'Refined cards, tables, buttons, step visuals, and code block rendering for a cleaner and more cohesive reading experience.',
          'Improved accessibility details and semantic consistency across multiple interactive surfaces.',
          'Strengthened overall visual polish to better align PyColors with premium SaaS platform expectations.',
        ],
      },

      {
        title: 'Navigation and mobile experience improved',
        items: [
          'Improved sidebar structure and mobile navigation consistency with reusable footer areas and version visibility.',
          'Refined user menu interactions and added clearer access to billing and account-related surfaces.',
          'Simplified navigation labels and internal upgrade paths for better product discoverability.',
          'Improved responsive layout behavior and reduced UI duplication across navigation surfaces.',
        ],
      },
    ],

    cta: {
      label: 'Read the docs',
      href: '/docs',
    },
  },

  {
    version: 'v1.15.0',
    title:
      'Starter Pro production documentation, scalable token architecture, npm Trusted Publishing, and stronger commercial positioning',
    dateLabel: 'Fri 29 May 2026',
    dateISO: '2026-05-29',
    status: 'Stable',
    releaseWeekLabel: 'May 2026 (weekly release)',
    summary:
      'This release strengthens PyColors as a production-ready SaaS developer platform. It expands Starter Pro production documentation, improves upgrade messaging and commercial clarity, introduces a more scalable token radius architecture, hardens npm publishing infrastructure with Trusted Publishing, and refines documentation systems, sharing UX, overlays guidance, and reusable product decision surfaces. The focus is clear: improve long-term platform credibility, release reliability, onboarding quality, and Free-to-Pro conversion.',
    highlights: [
      {
        title: 'Starter Pro production documentation expanded',
        items: [
          'Added dedicated architecture documentation explaining Starter Pro structure, separation of concerns, scalability principles, and long-term maintainability.',
          'Added comprehensive environment variables documentation covering auth, billing, database, email, deployment, and production security practices.',
          'Added production deployment documentation with infrastructure guidance, deployment workflows, environment management, and operational recommendations.',
          'Integrated architecture, deployment, and environment variable sections directly into the Starter Pro docs navigation for easier onboarding and discoverability.',
        ],
      },
      {
        title: 'Commercial upgrade path is clearer',
        items: [
          'Refined Upgrade page messaging to better explain the value difference between Starter Free and Starter Pro.',
          'Improved commercial positioning, headlines, feature framing, and product differentiation to reduce ambiguity during upgrade evaluation.',
          'Clarified production-ready capabilities, SaaS foundations, and long-term scaling benefits across commercial surfaces.',
          'Improved CTA clarity and reduced friction in the Free-to-Pro decision process.',
        ],
      },
      {
        title: 'Scalable token architecture improved',
        items: [
          'Reworked border radius tokens from fixed pixel values to scalable rem-based calculations driven by a base radius variable.',
          'Improved consistency across components, surfaces, cards, badges, inputs, overlays, and product UI.',
          'Made the token system more adaptable to future scaling, theming, accessibility, and ecosystem-wide consistency.',
          'Strengthened the long-term maintainability of the PyColors design system architecture.',
        ],
      },
      {
        title:
          'npm Trusted Publishing and release infrastructure hardened',
        items: [
          'Migrated package publishing workflows to npm Trusted Publishing using GitHub OIDC.',
          'Removed dependency on long-lived NPM_TOKEN secrets to improve security and operational reliability.',
          'Added dedicated GitHub workflows for Changesets-based manual publishing flows.',
          'Updated CI configuration and Node.js runtime consistency for more reliable automated releases.',
          'Improved release workflow documentation and clarified publishing architecture for monorepo package management.',
        ],
      },
      {
        title: 'Engineering and accessibility polish',
        items: [
          'Improved success badge foreground contrast for better accessibility and visual consistency.',
          'Aligned badge foreground colors with primary surfaces to reinforce visual coherence across the UI system.',
          'Updated internal dependencies to latest PyColors package versions for stability and consistency.',
        ],
      },
      {
        title: 'Documentation and editorial system refinement',
        items: [
          'Expanded overlays pattern documentation with stronger UX guidance, accessibility recommendations, and decision frameworks.',
          'Refactored patterns documentation around reusable comparison systems, modular structures, and clearer onboarding.',
          'Improved release policy documentation with clearer semantic versioning explanations and release transparency guidance.',
          'Added a new blog article documenting npm Trusted Publishing issues and solutions for pnpm monorepos using GitHub Actions and Changesets.',
        ],
      },
      {
        title: 'Content distribution and sharing UX improved',
        items: [
          'Added the ability to copy full share-post content including title and URL for easier social distribution.',
          'Improved clipboard handling and sharing reliability across editorial surfaces.',
          'Refined URL generation consistency for cleaner public sharing behavior.',
        ],
      },
    ],
    cta: {
      label: 'Read the docs',
      href: '/docs',
    },
  },

  {
    version: 'v1.14.0',
    title:
      'Documentation system consolidation, reusable docs components, NA-AI guidance, and clearer product decision paths',
    dateLabel: 'Fri 22 May 2026',
    dateISO: '2026-05-22',
    status: 'Stable',
    releaseWeekLabel: 'May 2026 (weekly release)',
    summary:
      'This release strengthens PyColors as a documentation-first SaaS platform. It consolidates the documentation UI around reusable grids, CTAs, related links, concept tabs, decision surfaces, improved steps, clearer heading hierarchy, and better NA-AI Landing guidance. The focus is to make docs more scalable, easier to maintain, more premium to read, and more effective at moving users from understanding to product decision.',
    highlights: [
      {
        title: 'Documentation UI is now more unified',
        items: [
          'Unified docs steps, heading levels, section hierarchy, and related-link patterns across UI documentation.',
          'Replaced hardcoded related-link grids with reusable components for more consistent cross-linking.',
          'Improved icon placement guidance and made related patterns easier to discover.',
        ],
      },
      {
        title: 'Reusable docs components reduce repetition',
        items: [
          'Introduced reusable feature grid patterns for concepts, principles, feature lists, and system overviews.',
          'Replaced repetitive card-based layouts with configurable documentation components.',
          'Improved long-term maintainability by reducing duplicated MDX markup across docs pages.',
        ],
      },
      {
        title: 'Concept tabs and decision grids improve scanning',
        items: [
          'Replaced legacy tab usage with richer concept tabs and decision grids.',
          'Improved accessibility, icon consistency, and content structure across decision-oriented docs sections.',
          'Made product paths easier to compare when users evaluate templates, UI, Starter Free, and Starter Pro.',
        ],
      },
      {
        title: 'Upgrade and CTA surfaces are cleaner',
        items: [
          'Replaced ad-hoc upgrade callouts with reusable CTA components.',
          'Standardized upgrade prompts across Starter Pro docs and template documentation.',
          'Made product benefits and next steps more structured, scannable, and conversion-ready.',
        ],
      },
      {
        title: 'NA-AI Landing docs are more complete',
        items: [
          'Expanded NA-AI Landing documentation for setup, customization, deployment, project structure, and license usage.',
          'Clarified the data-driven architecture, recommended workflow, separation of concerns, and production readiness.',
          'Improved onboarding so customers can adapt and launch the template with less friction.',
        ],
      },
      {
        title: 'Docs readability and navigation improved',
        items: [
          'Improved list styling, callout styling, prose structure, and docs reading rhythm.',
          'Added clearer next-step guidance through concept tabs and decision grids.',
          'Made documentation surfaces feel more premium, coherent, and product-led.',
        ],
      },
    ],
    cta: {
      label: 'Read the docs',
      href: '/docs',
    },
  },
  {
    version: 'v1.13.0',
    title:
      'NA-AI Landing launch, multi-product commerce, templates funnel, docs system cleanup, and blog polish',
    dateLabel: 'Fri 15 May 2026',
    dateISO: '2026-05-15',
    status: 'Stable',
    releaseWeekLabel: 'May 2026 (weekly release)',
    summary:
      'This release expands PyColors from a Starter-focused platform into a broader commercial product ecosystem. It introduces NA-AI Landing as a purchasable premium template, improves the templates funnel, strengthens product discovery, generalizes the commercial purchase and delivery experience for multiple digital products, and improves documentation, legal pages, blog reading, pricing, homepage, footer, and product navigation. The focus is clear: create a stronger product ladder from templates to UI to Starter Free to Starter Pro.',
    highlights: [
      {
        title:
          'NA-AI Landing is now part of the PyColors product line',
        items: [
          'Integrated NA-AI Landing as a production-ready AI SaaS landing page template.',
          'Aligned the template with the PyColors UI system for better consistency, maintainability, and product quality.',
          'Improved accessibility, theming, responsive behavior, visual polish, and content structure across the template experience.',
          'Expanded documentation and licensing guidance so customers better understand setup, customization, commercial usage, and product boundaries.',
        ],
      },
      {
        title: 'Commerce now supports multiple digital products',
        items: [
          'Added NA-AI Landing as a new purchasable product in the PyColors catalog.',
          'Generalized checkout, post-purchase access, recovery, and delivery flows so PyColors can support more than one premium product.',
          'Improved purchase flow reliability with clearer product-specific messaging and safer fallback behavior.',
          'Reduced product-specific duplication to make future premium templates and starters easier to launch and maintain.',
        ],
      },
      {
        title: 'Digital product delivery is more repeatable',
        items: [
          'Introduced a more flexible private delivery resolver for purchased digital products.',
          'Unified customer access and recovery flows across premium products.',
          'Added reusable customer email flows for digital product delivery and recovery.',
          'Added internal release tooling to make premium product packaging and delivery more repeatable.',
        ],
      },
      {
        title: 'Templates funnel and purchase path improved',
        items: [
          'Revamped the templates experience with a dedicated NA-AI Landing product page and clearer premium positioning.',
          'Introduced a sticky purchase CTA to keep the buying action visible at key decision moments.',
          'Updated pricing, homepage, footer, product menu, sitemap, and template links to present NA-AI Landing as a real commercial product.',
          'Replaced weaker template navigation points with more direct purchase actions where conversion matters most.',
        ],
      },
      {
        title:
          'Marketing pages now explain the product ladder better',
        items: [
          'Refined the homepage around a clearer product-led flow: templates, UI, Starter Free, and Starter Pro.',
          'Expanded pricing to support a three-product structure: templates, Starter Free, and Starter Pro.',
          'Improved upgrade page messaging to focus on production SaaS value, business foundations, and clearer Free-to-Pro differentiation.',
          'Updated footer links, menu order, product descriptions, and demo URLs to better reflect the current commercial ecosystem.',
        ],
      },
      {
        title: 'Docs system is cleaner and more scalable',
        items: [
          'Added template documentation, including NA-AI Landing customization, deployment, and licensing guidance.',
          'Refined getting started docs to clarify when to use templates, Starter Free, Starter Pro, and UI primitives.',
          'Introduced reusable documentation link and guidance components to reduce repetitive markup and improve consistency.',
          'Improved docs navigation, sidebar content, menu hierarchy, responsiveness, tables, accordions, and reading flow.',
        ],
      },
      {
        title: 'Blog reading experience improved',
        items: [
          'Refactored blog UI for clearer spacing, stronger editorial surfaces, better badge and card styling, and improved sectioning.',
          'Removed in-article “On This Page” navigation to simplify article reading.',
          'Refined prose typography, article metadata, sharing actions, navigation UI, focus states, and rounded-corner consistency.',
          'Improved accessibility and engagement across blog surfaces.',
        ],
      },
      {
        title: 'Legal and trust surfaces updated',
        items: [
          'Updated license, privacy, and terms pages to reflect templates, Starter Free, Starter Pro, commercial usage, data practices, and support boundaries.',
          'Clarified product scope and buyer expectations across legal pages.',
          'Improved transparency for customers evaluating commercial products before purchase.',
        ],
      },
    ],
    cta: {
      label: 'View templates',
      href: '/templates',
    },
  },
  {
    version: 'v1.12.0',
    title:
      'Premium brand system, SaaS token architecture, marketing polish, and stronger Starter Free-to-Pro conversion',
    dateLabel: 'Fri 8 May 2026',
    dateISO: '2026-05-08',
    status: 'Stable',
    releaseWeekLabel: 'May 2026 (weekly release)',
    summary:
      'This release strengthens PyColors as a premium SaaS developer platform. It refines the visual identity, introduces a richer token architecture, improves marketing consistency, clarifies Starter Free and Starter Pro upgrade paths, adds stronger product screenshots, and makes the pricing, homepage, roadmap, changelog, docs, footer, header, and starter pages feel more cohesive, credible, and conversion-ready.',
    highlights: [
      {
        title: 'Premium brand and token system upgraded',
        items: [
          'Expanded the design token system with richer semantic colors, surfaces, borders, shadows, brand roles, state roles, and Tailwind mappings.',
          'Introduced a stronger violet-first SaaS foundation with clearer support for premium, platform, success, accent, and elevated UI states.',
          'Refined typography by removing the Graphit font, standardizing Mona Sans, and improving logo and wordmark presentation.',
          'Standardized border radius usage across the marketing site for a sharper, more consistent premium product feel.',
        ],
      },
      {
        title: 'Marketing UI is more coherent and accessible',
        items: [
          'Improved button styling, transitions, focus states, error colors, icon accessibility, and CTA consistency.',
          'Unified card, badge, border, background, hover, and shadow treatments across pricing, starters, guides, legal, open-source, about, roadmap, changelog, and upgrade pages.',
          'Refined PageHero styling with better spacing, gradients, borders, badge hierarchy, and typography rhythm.',
          'Enforced a consistent dark theme experience by disabling system theme detection.',
        ],
      },
      {
        title: 'Homepage and product path clarified',
        items: [
          'Revamped the homepage structure and copy to focus on the path from Starter Free validation to Starter Pro launch readiness.',
          'Removed legacy pricing, template, and example noise to make the core product journey easier to understand.',
          'Clarified the progression across UI, Guides, Patterns, Starter Free, Starter Pro, pricing, and upgrade surfaces.',
          'Improved onboarding and progressive adoption messaging so visitors understand where to start and when to upgrade.',
        ],
      },
      {
        title:
          'Pricing and upgrade surfaces are more conversion-focused',
        items: [
          'Refined the pricing page to better explain Starter Pro as a production-ready SaaS foundation with auth, billing, database, and commercial usage.',
          'Added stronger SaaS trust messaging, stack clarity, launch pricing details, FAQ improvements, and buyer reassurance.',
          'Simplified redundant sections to reduce cognitive load and keep attention on the Free versus Pro decision.',
          'Improved the upgrade page with clearer value propositions, product differentiation, accessibility, and CTA clarity.',
        ],
      },
      {
        title: 'Starter pages now show stronger product proof',
        items: [
          'Added business-focused screenshots to the Starter Pro page for authentication, billing, and protected app structure.',
          'Enhanced the Starter Free page with visual product previews that better communicate available screens and validation surfaces.',
          'Refined starter page cards, badges, screenshots, CTAs, and comparison messaging for clearer Free-to-Pro positioning.',
          'Made the distinction between mocked validation surfaces and production-ready wiring more explicit across starter marketing pages.',
        ],
      },
      {
        title: 'Navigation, header, footer, and logo system improved',
        items: [
          'Refined the site header with updated colors, borders, hover states, menu behavior, and clearer product descriptions.',
          'Added a Guides link to the main navigation and improved product menu clarity.',
          'Introduced a dedicated docs logo component and refreshed the main brand logo with a reusable Logo component.',
          'Reorganized footer links into clearer groups including Upgrade, About, Open Source, and legal sections.',
        ],
      },
      {
        title: 'Docs maintainability and rendering improved',
        items: [
          'Improved MDX table rendering with better structure, responsiveness, and consistent styling.',
          'Introduced and reused a shared PreferAvoid component across UI documentation to reduce duplication and improve consistency.',
          'Added inline code rendering support for guideline text in Prefer/Avoid sections.',
          'Standardized documentation heading hierarchy for cleaner structure and better long-term maintainability.',
        ],
      },
      {
        title: 'Roadmap and changelog clarity improved',
        items: [
          'Refined changelog UI with cleaner badges, cards, spacing, color usage, and release note readability.',
          'Improved roadmap UX with clearer milestones, condensed descriptions, stronger visual structure, and more actionable commercial priorities.',
          'Better aligned release notes and roadmap content with the current priority: trust, conversion, Starter Pro proof, and product credibility.',
        ],
      },
      {
        title: 'Project hygiene improved',
        items: [
          'Expanded .gitignore coverage for generated Fumadocs source files, local artifacts, IDE files, and tool-generated outputs.',
          'Refactored layout wrapper typing to enforce readonly children and improve type-safety.',
          'Centralized logo usage and simplified repeated layout patterns for easier future maintenance.',
        ],
      },
    ],
    cta: {
      label: 'View pricing',
      href: '/pricing',
    },
  },
  {
    version: 'v1.11.0',
    title:
      'Premium documentation system, docs navigation polish, SaaS guides expansion, and stronger Free-to-Pro clarity',
    dateLabel: 'Fri 1 May 2026',
    dateISO: '2026-05-01',
    status: 'Stable',
    releaseWeekLabel: 'May 2026 (weekly release)',
    summary:
      'This release turns the PyColors documentation into a much stronger product surface. It refines the docs header, mobile navigation, sidebar, table of contents, code block rendering, and content hierarchy while deeply expanding Starter Free, Starter Pro, UI, Design System, Guides, and Patterns documentation. The focus is clear: make PyColors easier to understand, more premium to evaluate, and more convincing as a SaaS foundation users can trust before upgrading to Starter Pro.',
    highlights: [
      {
        title: 'Docs navigation and header UX are more premium',
        items: [
          'Refined the docs header with fixed positioning, improved backdrop blur, cleaner borders, and better visibility while scrolling.',
          'Improved mobile navigation with clearer product context, better spacing, stronger sectioning, and integrated theme controls.',
          'Rearranged mobile header actions by moving the theme toggle into the mobile menu and prioritizing search access in the header.',
          'Refined search and theme toggle alignment, icon sizing, border radius, padding, and interaction clarity across docs navigation.',
        ],
      },
      {
        title: 'Sidebar, TOC, and layout clarity improved',
        items: [
          'Improved the docs sidebar hierarchy with clearer section descriptions and stronger visual guidance.',
          'Excluded the root docs page from the navigation tree to avoid redundant entries and make the docs structure easier to scan.',
          'Limited the table of contents depth to keep pages focused and easier to navigate.',
          'Improved heading spacing, focused states, active TOC styling, responsive dialog spacing, and table action-column styling.',
        ],
      },
      {
        title: 'Code blocks and reading experience upgraded',
        items: [
          'Added rehype-pretty-code support for cleaner, more readable code examples.',
          'Improved code block styling, fragment rendering, code titles, headings, tables, and docs typography.',
          'Updated featured docs links and layout polish so technical pages feel more consistent and credible.',
        ],
      },
      {
        title:
          'Starter Free docs now explain the evaluation path better',
        items: [
          'Refactored Starter Free documentation into a clearer onboarding path from idea validation to product-shaped UX.',
          'Clarified what is included, what is mocked, and what remains backend-specific implementation work.',
          'Added richer explanations, callouts, checklists, last-updated signals, and next-step guidance.',
          'Strengthened the upgrade path so users understand when Starter Free is enough and when Starter Pro becomes the right move.',
        ],
      },
      {
        title: 'Starter Pro docs are now more production-focused',
        items: [
          'Revamped Starter Pro documentation across auth, billing, backend, delivery, and production-readiness topics.',
          'Added clearer decision guides, implementation steps, comparison tables, production checklists, and common questions.',
          'Updated the Starter Pro upgrade documentation to a simpler path with more actionable content.',
          'Clarified why buying Starter Pro is faster than rebuilding auth, billing, backend, and delivery foundations from scratch.',
        ],
      },
      {
        title:
          'Design system, UI, guides, and patterns docs expanded',
        items: [
          'Refactored design system docs around semantic roles, token-driven architecture, colors, typography, radius, shadows, and usage rules.',
          'Expanded UI documentation with stronger product usage guidance, accessibility notes, composition principles, prefer/avoid sections, and decision rules.',
          'Revamped Guides content around production-ready SaaS patterns, navigation, async states, forms, validation, accessibility, and separation of concerns.',
          'Expanded Patterns docs with clearer mental models, decision guides, practical checklists, async actions, data tables, overlays, and next-step navigation.',
        ],
      },
      {
        title: 'Marketing and pricing surfaces were polished',
        items: [
          'Refined hero section styling, spacing, gradients, border treatments, and typography for a more cohesive marketing experience.',
          'Improved pricing UI clarity with more consistent cards, badges, buttons, typing, and action paths.',
          'Reduced visual noise and simplified styling in footer and layout areas to avoid unnecessary stacking and spacing issues.',
          'Strengthened SaaS value messaging and made the Free-to-Pro upgrade path more obvious across documentation and product pages.',
        ],
      },
      {
        title: 'Documentation now supports conversion better',
        items: [
          'The docs now explain not only how PyColors works, but why it matters for shipping SaaS products faster.',
          'The upgrade path from Starter Free to Starter Pro is clearer, more practical, and better connected to real business value.',
          'This release improves trust, onboarding, perceived quality, and buyer confidence before users reach pricing or checkout.',
        ],
      },
    ],
    cta: {
      label: 'Read the docs',
      href: '/docs',
    },
  },
  {
    version: 'v1.10.0',
    title:
      'Pricing route, product navigation, documentation UX, and Free-to-Pro conversion polish',
    dateLabel: 'Fri 24 Apr 2026',
    dateISO: '2026-04-24',
    status: 'Stable',
    releaseWeekLabel: 'Apr 2026 (weekly release)',
    summary:
      'This release strengthens the commercial surface of PyColors after the Starter Pro launch. It consolidates the premium path around /pricing, removes the old PRO waitlist page, improves product navigation, modernizes the header and footer, expands Starter Pro documentation, and clarifies the Free → Upgrade → Pro journey. The work focuses on reducing buyer confusion, improving documentation discovery, and making pycolors.io feel more coherent, premium, and conversion-ready.',
    highlights: [
      {
        title: 'Pricing is now the primary commercial route',
        items: [
          'Renamed /access to /pricing across routes, links, breadcrumbs, sitemap priorities, and commercial references.',
          'Removed the standalone PRO waitlist page to simplify the launch strategy now that Starter Pro is publicly available.',
          'Refined pricing, upgrade, starter, and footer messaging around a clearer Free → Pro decision path.',
          'Improved CTAs so users understand when Starter Free is enough and when Starter Pro becomes the right upgrade.',
        ],
      },
      {
        title: 'Product navigation and header UX were upgraded',
        items: [
          'Revamped the product menu with icons, descriptions, badges, and a dedicated Starter Pro launch offer section.',
          'Improved desktop and mobile navigation grouping for clearer product discovery.',
          'Added more accurate mobile active states by matching the most specific route.',
          'Added scroll-based dynamic header styling and refined spacing, button styling, and CTA affordances.',
        ],
      },
      {
        title: 'Documentation experience is more premium and usable',
        items: [
          'Added a dedicated responsive docs header with navigation, search, theme controls, and mobile menu behavior.',
          'Improved docs layout flexibility with a dedicated page shell, full-width content support, refined sidebar behavior, and better TOC structure.',
          'Added breadcrumbs to docs pages so users can better understand where they are in the documentation tree.',
          'Redesigned docs footer with previous/next navigation, contextual CTAs, feedback controls, grouped links, version display, and theme toggle.',
        ],
      },
      {
        title:
          'Starter Pro docs now explain value and delivery better',
        items: [
          'Added and refined Starter Pro getting started, why buy, what is included, and delivery documentation.',
          'Clarified the secure delivery and fulfillment model so buyers better understand how access works after purchase.',
          'Clarified what Starter Pro includes versus what remains product-specific implementation work.',
          'Improved upgrade guidance to reduce friction between evaluating Starter Free and choosing Starter Pro.',
        ],
      },
      {
        title:
          'UI, patterns, guides, and design system docs were clarified',
        items: [
          'Reworked UI docs structure and philosophy content around long-term maintainability, system thinking, and real SaaS usage.',
          'Refined design system documentation for tokens, colors, typography, radius, shadows, and usage rationale.',
          'Revamped Patterns docs with clearer value, fit scenarios, common mistakes, and actionable next steps.',
          'Improved Guides content to emphasize practical SaaS patterns, composition, separation of concerns, and product-focused UX.',
        ],
      },
      {
        title: 'Brand, footer, and visual consistency improved',
        items: [
          'Unified page hero sections with a reusable PageHero component across marketing pages.',
          'Refactored the homepage hero into a reusable component for better consistency and maintainability.',
          'Redesigned the footer layout with clearer navigation groups, stronger upgrade CTAs, version display, and theme toggle.',
          'Updated logo and badge styling for a more modern, theme-aware, and consistent visual system.',
        ],
      },
      {
        title: 'Commercial funnel is clearer after launch',
        items: [
          'The site now points users toward pricing instead of a deprecated access/waitlist model.',
          'Product discovery, documentation discovery, and premium upgrade paths are more coherent across header, footer, docs, starters, and pricing.',
          'This release supports the next business objective: improving trust, measuring conversion, and turning Starter Pro traffic into real purchases.',
        ],
      },
    ],
    cta: {
      label: 'View pricing',
      href: '/pricing',
    },
  },
  {
    version: 'v1.9.0',
    title:
      'Starter Pro public commercial launch, checkout flow, secure delivery, and conversion hardening',
    dateLabel: 'Fri 17 Apr 2026',
    dateISO: '2026-04-17',
    status: 'Stable',
    releaseWeekLabel: 'Apr 2026 (weekly release)',
    summary:
      'This release marks the first real commercial launch of Starter Pro on pycolors.io. Starter Pro is now publicly available and purchasable, with a clearer conversion path from product discovery to checkout, a secure post-purchase access flow, and stronger documentation to support buyer confidence. The release upgrades the full commercial journey: product positioning, pricing clarity, checkout actions, success and cancel recovery, secure claim and download, access recovery, docs credibility, and local development support. Starter Pro now feels materially closer to a real sellable SaaS product business, not only a premium direction.',
    highlights: [
      {
        title: 'Starter Pro is now live and purchasable',
        items: [
          'Starter Pro is now publicly available on pycolors.io as a real commercial product.',
          'Added a reusable Starter Pro purchase button wired to the checkout flow with loading state, error handling, and redirect logic.',
          'Improved product entry points so the premium buying path is clearer across the site.',
          'Shifted the product narrative from premium direction and waitlist-style framing to real availability and purchase readiness.',
        ],
      },
      {
        title:
          'Checkout and post-checkout flow are now product-shaped',
        items: [
          'Added a dedicated checkout success page with order confirmation details, next steps, and support guidance.',
          'Added a checkout cancel page that clearly explains no payment was captured and offers recovery actions.',
          'Improved buyer reassurance after interrupted or completed checkout flows so the commercial journey feels more trustworthy.',
          'Strengthened the post-payment experience to reduce uncertainty and support real customer delivery expectations.',
        ],
      },
      {
        title: 'Secure access, claim, download, and recovery flow',
        items: [
          'Added an order claim and download page so customers can securely access their purchased product.',
          'Added an order access recovery page to let customers resend their Starter Pro access link if needed.',
          'Improved the self-service delivery experience so buyers can recover access without unnecessary support friction.',
          'Documented secure delivery behavior more clearly in the Starter Pro docs to reinforce trust around commercial fulfillment.',
        ],
      },
      {
        title: 'Conversion surfaces were substantially hardened',
        items: [
          'Revamped the pricing page to reduce cognitive load and make the Free versus Starter Pro decision more obvious.',
          'Refactored the Upgrade page with stronger value framing, proof points, pricing logic, and objection handling.',
          'Revamped the Starters page and Starter Free / Starter Pro product pages for a clearer progression from validation to production wiring.',
          'Improved footer messaging, product navigation, CTA labels, and not-found recovery so the overall commercial funnel feels cleaner and more intentional.',
        ],
      },
      {
        title: 'Docs, README, and commercial credibility improved',
        items: [
          'Refined the upgrade guide to better explain when Starter Free is enough and when Starter Pro becomes the right move.',
          'Added and improved Starter Pro documentation, including auth, billing, backend, and secure delivery guidance.',
          'Revamped the README with clearer setup, environment, billing, auth, seed, and usage documentation for real product evaluation.',
          'Clarified proprietary license terms for team usage, organizations, updates, and client work to reduce ambiguity for buyers.',
        ],
      },
      {
        title: 'Local development and product operations improved',
        items: [
          'Added Docker Compose PostgreSQL setup to streamline local database setup and testing.',
          'Added Docker-based database management scripts for starting, stopping, resetting, and monitoring the local DB.',
          'Added optional seed data for a local PRO user and a trial subscription to make billing and access testing easier.',
          'Improved metadata, sitemap structure, docs route naming, dependency consistency, and package clarity to support better maintenance and discoverability.',
        ],
      },
      {
        title: 'Commercial positioning is now materially stronger',
        items: [
          'Starter Pro now presents a much more credible path from discovery to purchase to delivery.',
          'The public product surface now supports real monetization instead of only launch preparation.',
          'This release turns Starter Pro into a sellable product layer inside the PyColors ecosystem.',
          'The next focus should move from launch readiness toward sales proof, analytics instrumentation, delivery reliability, and customer trust reinforcement.',
        ],
      },
    ],
    cta: {
      label: 'View roadmap',
      href: '/roadmap',
    },
  },
  {
    version: 'v1.8.0',
    title:
      'Starter Pro security hardening, account security activity, premium auth UX, pricing clarity, and production-shaped app surfaces',
    dateLabel: 'Fri 10 Apr 2026',
    dateISO: '2026-04-10',
    status: 'Stable',
    releaseWeekLabel: 'Apr 2026 (weekly release)',
    summary:
      'This release materially upgrades Starter Pro from a credible auth-and-billing baseline into a much stronger launch candidate. It hardens core auth actions with rate limiting and auditing, surfaces backend-driven security activity inside settings, improves self-service account management for provider-based users, and refines authentication UX into a more premium SaaS entry experience. On the product and marketing side, it sharpens pricing and docs around real SaaS monetization, improves dashboard, admin, and projects surfaces, and makes the premium path feel more intentional, secure, and commercially credible.',
    highlights: [
      {
        title: 'Security hardening for authentication flows',
        items: [
          'Added configurable rate limiting for login, password reset, verification resend, password change, and password creation flows to reduce abuse and brute-force risk.',
          'Introduced auditing for authentication-related actions with metadata such as IP address and user agent to improve traceability and account monitoring.',
          'Adopted more generic success and error messaging across sensitive auth actions to reduce information leakage and improve security posture.',
          'Extended server-side auth flows with safer operational behavior instead of relying only on UI-level validation.',
        ],
      },
      {
        title: 'Backend-driven security activity in settings',
        items: [
          'Integrated recent security activity directly into the backend-driven settings page so users can review sign-ins, password changes, verification actions, and related auth events.',
          'Improved activity lookup to match both user ID and normalized email for better coverage of security-relevant events.',
          'Made security activity rendering hydration-safe and aligned timestamps with French locale and Paris time for a more reliable and user-friendly experience.',
          'Improved device and source labels by mapping localhost and unknown addresses to clearer human-readable values such as “Local device” and “Unknown device”.',
        ],
      },
      {
        title: 'Stronger self-service account management',
        items: [
          'Added support for users who signed up with Google or GitHub to set a local password when none exists, improving long-term account flexibility and recovery options.',
          'Added a dedicated UI card for password creation with server-side validation, rate limiting, and email notification behavior.',
          'Refined connected account logic so provider disconnect rules are computed more safely and always preserve at least one valid sign-in path.',
          'Improved provider utility functions and primary-provider label handling to make provider-related account states clearer and more maintainable.',
        ],
      },
      {
        title: 'Premium auth UX and safer public auth routing',
        items: [
          'Redirect authenticated users away from login, register, forgot-password, and similar public auth pages to avoid redundant access and reduce confusion.',
          'Revamped the auth layout into a more premium two-column SaaS entry surface with stronger hierarchy, product highlights, and better trust signaling.',
          'Polished login, registration, forgot password, verify email, and resend verification flows with clearer helper text, better loading states, improved skeletons, and stronger user guidance.',
          'Improved auth screen consistency so Starter Pro feels less like an internal implementation and more like a sellable premium product.',
        ],
      },
      {
        title:
          'Pricing, billing docs, and backend narrative are clearer',
        items: [
          'Raised Starter Pro pricing from €249 to €299 to better align positioning with product value and premium business goals.',
          'Revamped the pricing page with clearer product positioning, deeper feature explanation, stronger FAQ content, and better monetization messaging.',
          'Added and refined PRO billing documentation to explain how Stripe-backed monetization works in a real SaaS context.',
          'Expanded and improved the SaaS PRO docs structure with dedicated auth, billing, and backend guides so the premium offer feels more complete and implementation-ready.',
        ],
      },
      {
        title: 'App surfaces now look more production-shaped',
        items: [
          'Improved the user menu with a temporary pro-ready avatar experience, provider indicators, fallback initials, and a clearer signed-in account surface.',
          'Refined the dashboard to communicate a more monetizable, B2B-ready SaaS product shape with stronger summary cards, surface cards, and business-oriented copy.',
          'Upgraded projects list and detail pages into a more premium entity surface with search, richer detail views, not-found handling, and a stronger foundation for future CRUD, billing, membership, and analytics features.',
          'Added a reusable Pro gating direction and analytics teaser on projects pages to reinforce premium upgrade logic without breaking the product flow.',
          'Enhanced the admin members experience with search, stats, invitation filtering, and clearer production-oriented structure.',
        ],
      },
      {
        title: 'Marketing and navigation quality improvements',
        items: [
          'Improved mobile navigation accessibility by switching to a native dialog-based flow with better semantics, focus behavior, and background scroll prevention.',
          'Added a more user-friendly global 404 page with clearer recovery paths and navigation options.',
          'Improved app navigation by supporting badges such as “Pro”, handling external links more safely, and enforcing a required upgrade URL through explicit configuration validation.',
          'Continued tightening docs ordering, release messaging, and premium-path clarity so the public product surface better supports conversion.',
        ],
      },
      {
        title: 'Project hygiene and local setup cleanup',
        items: [
          'Expanded ignore rules to better cover generated files, IDE metadata, and local development artifacts.',
          'Clarified local database environment defaults for easier onboarding.',
          'Added then removed a marketing Docker Compose setup to avoid unnecessary maintenance and keep the local development story cleaner.',
        ],
      },
    ],
    cta: {
      label: 'View roadmap',
      href: '/roadmap',
    },
  },
  {
    version: 'v1.7.0',
    title:
      'Starter Pro account management, OAuth UX, connected accounts, and in-session security flows',
    dateLabel: 'Fri 3 Apr 2026',
    dateISO: '2026-04-03',
    status: 'Stable',
    releaseWeekLabel: 'Apr 2026 (weekly release)',
    summary:
      'This release pushes Starter Pro beyond the initial auth baseline into a much more credible account system. It strengthens Google and GitHub authentication across sign-up and sign-in, improves provider configuration and safer error handling, adds connected accounts management in settings, enables secure provider disconnect rules, and ships the first real in-session password change flow. On the product side, Starter Pro now feels less like an auth prototype and more like a real SaaS account surface with persistent user data, clearer account state, and safer self-service security controls.',
    highlights: [
      {
        title: 'OAuth sign-in and sign-up UX is now first-class',
        items: [
          'Added configurable Google and GitHub OAuth buttons for authentication with loading states and flexible provider visibility.',
          'Added OAuth sign-up on the registration page so users can onboard faster without going through the email-password path first.',
          'Added OAuth login options on the sign-in page with clearer separation between provider-based access and credentials-based access.',
          'Refined helper text, form structure, and divider logic across registration and login so auth entry points feel more intentional and easier to understand.',
          'Improved alert rendering and messaging across auth screens to guide users more clearly through available authentication options.',
        ],
      },
      {
        title:
          'Safer auth configuration and account conflict handling',
        items: [
          'Improved provider configuration defaults and credential validation to make auth setup more robust and production-oriented.',
          'Normalized auth input handling and refined user update logic during sign-in and account-link events for better consistency.',
          'Improved email verification updates and profile synchronization when users authenticate through external providers.',
          'Handled OAuth account conflicts with safer user-facing messaging so sign-in errors are clearer and less confusing.',
          'Mapped query-parameter auth errors into readable product feedback instead of exposing vague or low-context failure states.',
        ],
      },
      {
        title: 'Connected accounts management in settings',
        items: [
          'Added a real connected accounts management card in security settings for Google and GitHub providers.',
          'Replaced mock account settings sections with backend-driven auth data so settings now reflect the real signed-in user state.',
          'Added backend logic to snapshot linked providers and expose accurate connection state in the UI.',
          'Improved provider row readability and prop safety to make account management components clearer and easier to maintain.',
          'Refocused settings around profile, security, provider connections, and verification state instead of placeholder organization and billing tabs.',
        ],
      },
      {
        title: 'Safe disconnect rules and password self-service',
        items: [
          'Added backend-driven connected account management with provider disconnect support directly from settings.',
          'Enforced a critical safety rule that prevents users from disconnecting their last available sign-in method.',
          'Added clearer UI feedback and guarded error handling for disconnect attempts and allowed account actions.',
          'Shipped the first real in-session password change flow for signed-in users.',
          'Added validation, feedback, and notification logic around password updates so account security management is now materially more complete.',
        ],
      },
      {
        title: 'Authenticated product surfaces feel more real',
        items: [
          'Hydrated the user menu from real server-side auth and account data instead of using a static user placeholder.',
          'Improved personalization by surfacing the signed-in user name, email, and provider context in the app shell.',
          'Moved mobile user navigation into a dedicated component for cleaner separation and easier future extension.',
          'Improved perceived product authenticity by making account state visible across navigation and settings.',
        ],
      },
      {
        title: 'Email delivery and environment consistency',
        items: [
          'Corrected email sender logic for development and production modes so transactional auth emails use the right sender configuration per environment.',
          'Improved environment variable usage around email delivery and trusted auth hosts to reduce setup mistakes between local and production deployments.',
          'Continued tightening the production-readiness path for auth infrastructure started in the previous release.',
        ],
      },
    ],
    cta: {
      label: 'View roadmap',
      href: '/roadmap',
    },
  },
  {
    version: 'v1.6.0',
    title:
      'Starter Pro auth foundation + transactional auth emails + marketing UX polish',
    dateLabel: 'Fri 27 Mar 2026',
    dateISO: '2026-03-27',
    status: 'Stable',
    releaseWeekLabel: 'Mar 2026 (weekly release)',
    summary:
      'This release moves Starter Pro from billing-first groundwork into a real authentication baseline. It adds Auth.js with Prisma-backed user, account, session, token, and auth-attempt models; brings credentials and OAuth-ready flows into the product; ships registration, login, email verification, forgot password, and reset password foundations; and connects billing flows to the authenticated user instead of a temporary development account. On the marketing side, it also improves breadcrumbs, mobile navigation behavior, footer polish, page structure, and homepage clarity for a cleaner and more reliable product experience.',
    highlights: [
      {
        title: 'Starter Pro auth foundation (Auth.js + Prisma)',
        items: [
          'Extended the user model with authentication-ready fields including password hash, email verification timestamp, image, and last login tracking.',
          'Added Auth.js core Prisma models for accounts, sessions, and verification tokens, plus dedicated auth token and auth attempt models for security and recovery workflows.',
          'Added NextAuth and Prisma adapter dependencies and introduced a full Auth.js configuration with credentials, Google, GitHub, and email provider support.',
          'Switched session handling to JWT for a simpler and more consistent stateless auth architecture.',
          'Extended session and JWT typings so custom user fields remain strongly typed across the app.',
        ],
      },
      {
        title:
          'Real user flows: registration, login, verification, reset password',
        items: [
          'Added server-side registration and login actions with validation, password hashing, and clearer error handling.',
          'Connected login and registration forms to real server actions with pending states, validation feedback, and improved submission UX.',
          'Added the post-signup email verification prompt to guide users through account activation.',
          'Implemented forgot password and reset password flows with token-based validation and user-facing reset pages.',
          'Added resend verification support so users can request a new verification email if needed.',
        ],
      },
      {
        title: 'Transactional auth emails',
        items: [
          'Added Resend integration for transactional auth emails.',
          'Introduced reusable auth email templates for email verification, password reset, and password changed notifications.',
          'Replaced development-only logging of verification and reset links with real email delivery.',
          'Send verification emails after registration, resend requests, and reset emails when a password recovery request is made.',
          'Notify users by email after a successful password reset to improve account security awareness.',
        ],
      },
      {
        title: 'Billing integration now uses the authenticated user',
        items: [
          'Replaced temporary development-user billing lookups with authenticated user retrieval.',
          'Enforced authentication for checkout and billing portal session creation.',
          'Improved billing portal session creation by validating customer existence and portal URL generation.',
          'Added helpers for current user retrieval, required authentication, and required email verification to centralize access control.',
          'Clarified remaining development-only helpers while continuing the migration from dev scaffolding to production-ready auth flows.',
        ],
      },
      {
        title: 'Marketing UX and navigation polish',
        items: [
          'Added breadcrumb navigation to key marketing pages and improved breadcrumb UX on mobile with collapsing and overflow handling.',
          'Redesigned the mobile header navigation with grouped sections, icons, badges, preserved scroll position, and better body scroll locking.',
          'Fixed mobile menu scroll handling and overscroll edge cases for a more reliable menu experience.',
          'Improved footer layout, header spacing, container behavior, semantic structure, 404 guidance, and CTA section responsiveness.',
          'Refined the homepage and broader marketing copy for clearer messaging and stronger product discovery.',
        ],
      },
      {
        title: 'Developer experience and configuration',
        items: [
          'Expanded environment example documentation for auth, email, OAuth providers, and seed options.',
          'Added support for auth seed fixtures and improved seed refresh behavior through upserts.',
          'Added bcryptjs for password hashing and improved schema support for auth and security indexing.',
          'Updated generated type import paths to align with the current Next.js development structure.',
        ],
      },
    ],
    cta: {
      label: 'View roadmap',
      href: '/roadmap',
    },
  },
  {
    version: 'v1.5.0',
    title: 'Blog platform + billing maturity + marketing clarity',
    dateLabel: 'Fri 20 Mar 2026',
    dateISO: '2026-03-20',
    status: 'Stable',
    releaseWeekLabel: 'Mar 2026 (weekly release)',
    summary:
      'This release significantly expands PyColors as a SaaS builder ecosystem by introducing a full blog platform with SEO-first architecture, improving billing reliability and Stripe integration, and refining marketing surfaces for clarity, navigation, and conversion. It strengthens both the distribution engine (content + SEO) and the monetization foundation (billing + PRO access).',
    highlights: [
      {
        title: 'Blog platform (SEO + content engine)',
        items: [
          'Introduced a full blog system with dynamic article pages, categories, tags, and structured navigation.',
          'Added blog landing page with featured and latest articles to improve content discovery and engagement.',
          'Implemented tag and category archive pages with SEO metadata and improved navigation.',
          'Added JSON-LD structured data, Open Graph images, RSS feed, and sitemap integration for stronger SEO.',
          'Introduced reusable blog components: article header, cards, pagination, related posts, author badge, and CTAs.',
          'Added “On this page” navigation and improved reading experience with styled prose and layout consistency.',
        ],
      },
      {
        title: 'Billing system maturity (Stripe + lifecycle)',
        items: [
          'Implemented full Stripe checkout flow with customer creation, session handling, and plan validation.',
          'Added Stripe webhook processing with subscription and invoice synchronization.',
          'Introduced webhook event tracking with status lifecycle (RECEIVED, PROCESSED, FAILED) and idempotency safeguards.',
          'Improved billing page UX with real subscription data, invoice history, trial messaging, and contextual alerts.',
          'Added billing portal integration and management actions (cancel, resume, manage subscription).',
          'Enforced PRO access for protected routes with subscription validation logic.',
        ],
      },
      {
        title: 'Marketing clarity & navigation refactor',
        items: [
          'Refactored major marketing pages (About, Upgrade, Starters, Guides, UI, Access, Templates) with improved structure and breadcrumbs.',
          'Added Blog to main navigation and improved discoverability of learning content.',
          'Improved waitlist and upgrade flows with clearer value proposition, pricing communication, and CTAs.',
          'Refined SEO metadata handling with centralized constants and absolute URL utilities.',
          'Improved sharing UX (LinkedIn, X, copy link) with better encoding and feedback.',
        ],
      },
      {
        title: 'DX, architecture & reliability improvements',
        items: [
          'Introduced Zod for schema validation and safer data parsing.',
          'Improved Prisma setup with singleton client, env validation, and schema tooling.',
          'Upgraded Prisma and Node compatibility for improved stability.',
          'Refined monorepo and app-level .gitignore for better project hygiene.',
          'Improved CI environment consistency (Node version, DB env setup).',
        ],
      },
    ],
    cta: {
      label: 'Read the blog',
      href: '/blog',
    },
  },
  {
    version: 'v1.4.0',
    title: 'Starter Pro foundation + billing engine groundwork',
    dateLabel: 'Fri 13 Mar 2026',
    dateISO: '2026-03-13',
    status: 'Stable',
    releaseWeekLabel: 'Mar 2026 (weekly release)',
    summary:
      'This release moves PyColors from PRO positioning into real premium product implementation work. It lays the technical and product foundation for Starter Pro with the first billing architecture, Prisma subscription schema, pricing surfaces, and stronger marketing, SEO, and trust messaging. Starter Pro is not publicly launched yet, but the premium system is now materially taking shape.',
    highlights: [
      {
        title: 'Starter Pro foundation in progress',
        items: [
          'Bootstrapped Starter Pro from the Starter Free base with dedicated branding, package metadata, navigation, sidebar copy, and proprietary licensing.',
          'Prepared Starter Pro as a production-oriented SaaS app with dashboard, auth, settings, billing, and admin-ready product surfaces.',
          'Added a dedicated pricing page with clearer offer structure, FAQ, guarantees, and improved upgrade entry points while the product remains in active development.',
        ],
      },
      {
        title: 'Billing engine groundwork',
        items: [
          'Introduced the first billing module architecture with centralized exports, typed billing plans, Stripe subscription status mapping, custom billing errors, and a service + repository foundation.',
          'Added Stripe server integration, lazy client initialization, strict server-side environment validation, and example environment configuration.',
          'Added API routes for checkout, billing portal access, plan changes, cancellation, resume, and Stripe webhook handling to establish the first billing workflow.',
        ],
      },
      {
        title: 'Prisma subscription data model',
        items: [
          'Added an initial Prisma billing schema covering users, customers, products, prices, subscriptions, invoices, and usage tracking.',
          'Introduced Prisma tooling, scripts, singleton database client setup, and seed workflows to support development and future production billing logic.',
          'Standardized Prisma commands with explicit schema paths and improved environment handling across development tasks.',
        ],
      },
      {
        title: 'Marketing, SEO, and trust improvements',
        items: [
          'Improved metadata, sitemap priorities, structured data, breadcrumb JSON-LD, and SEO-oriented navigation across marketing and docs pages.',
          'Refined changelog, roadmap, footer, About, open-source, upgrade, access, waitlist, license, terms, and privacy messaging for clearer open-core and premium product direction.',
          'Improved not-found UX, footer readability, docs layout structure, and MDX rendering for better documentation and ecosystem navigation.',
        ],
      },
    ],
    cta: {
      label: 'View roadmap',
      href: '/roadmap',
    },
  },
  {
    version: 'v1.3.0',
    title: 'SaaS knowledge layer + PRO funnel',
    dateLabel: 'Fri 6 Mar 2026',
    dateISO: '2026-03-06',
    status: 'Stable',
    releaseWeekLabel: 'Mar 2026 (weekly release)',
    summary:
      'This release turns PyColors.io into a much stronger SaaS learning and conversion surface. It ships a full Guides layer, adds Patterns, Examples, and Access pages, introduces PRO upgrade and waitlist flows, and refines navigation and ecosystem messaging to make the path from learning to upgrading much clearer.',
    highlights: [
      {
        title: 'Guides layer shipped',
        items: [
          'Added a dedicated Guides landing page to position PyColors as a SaaS knowledge base for builders.',
          'Shipped structured SaaS guides covering Next.js product foundations, dashboard UX, authentication flows, billing UX, admin panel design, and team & organization systems.',
          'Introduced a reusable guide page shell and an inline “On This Page” navigation component for clearer reading and stronger content consistency.',
        ],
      },
      {
        title: 'Product discovery & ecosystem navigation',
        items: [
          'Added new marketing pages for Patterns, Examples, and Access to clarify the PyColors ecosystem and guide users through learning, validation, and upgrade paths.',
          'Updated primary navigation to better reflect the new content structure: UI, Patterns, Examples, Guides, and Starters.',
          'Improved content discoverability and onboarding by making educational, product, and upgrade resources easier to browse.',
        ],
      },
      {
        title: 'PRO upgrade funnel',
        items: [
          'Added a dedicated Upgrade to PRO page outlining the product direction, roadmap logic, pricing structure, value proposition, and FAQ.',
          'Added a PRO waitlist page with early interest capture and pricing visibility to support premium demand before launch.',
          'Enhanced site header with clearer PRO upgrade CTAs and badges across desktop and mobile.',
        ],
      },
      {
        title: 'Messaging, positioning & conversion clarity',
        items: [
          'Refined Starter, upgrade, and ecosystem messaging to better distinguish product surface validation from production wiring.',
          'Improved footer structure and brand context to reinforce PyColors as a structured SaaS ecosystem rather than a simple UI library.',
          'Strengthened the progression logic across the site: Guides → Patterns / Examples → Starter Free → Starter PRO.',
        ],
      },
    ],
    cta: {
      label: 'Explore guides',
      href: '/guides',
    },
  },
  {
    version: 'v1.2.2',
    title: 'Trust foundation: Terms + Privacy',
    dateLabel: 'Fri 27 Feb 2026',
    dateISO: '2026-02-27',
    status: 'Stable',
    releaseWeekLabel: 'Feb 2026 (weekly release)',
    summary:
      'This release completes the trust baseline required for commercial distribution. It adds Terms of Service and a Privacy Policy, updates the footer trust section, and clarifies how commercial templates like NA-AI relate to the broader PyColors licensing model.',
    highlights: [
      {
        title: 'Legal baseline shipped',
        items: [
          'Added /terms (Terms of Service) to define website, repository ecosystem, and digital product usage rules.',
          'Added /privacy (Privacy Policy) covering minimal data collection, cookies and analytics direction, and third-party checkout handling.',
        ],
      },
      {
        title: 'Trust surface & navigation',
        items: [
          'Updated footer trust links to include Terms and Privacy.',
          'Aligned trust copy so commercial template licensing remains clearer and more consistent across pages.',
        ],
      },
      {
        title: 'Commercial readiness (templates)',
        items: [
          'Reinforced the open-core → paid acceleration model: open foundations remain discoverable while premium templates stay properly licensed.',
          'Keeps NA-AI positioning consistent with a commercial license included at purchase via Gumroad distribution.',
        ],
      },
    ],
    cta: {
      label: 'Read the license',
      href: '/license',
    },
  },
  {
    version: 'v1.2.1',
    title: 'Starter Free docs + marketing UX polish',
    dateLabel: 'Fri 20 Feb 2026',
    dateISO: '2026-02-20',
    status: 'Stable',
    releaseWeekLabel: 'Feb 2026 (weekly release)',
    summary:
      'This release hardens PyColors.io as a distribution and onboarding surface. It ships a full Starter Free documentation set, improves the UI and Starter positioning pages, and adds trust signals like npm badges while tightening accessibility and navigation across mobile and layout surfaces.',
    highlights: [
      {
        title: 'Starter Free documentation shipped',
        items: [
          'Added a comprehensive Starter Free docs set: philosophy, installation, project structure, deployment, upgrade path, and key concepts such as auth and billing.',
          'Improved progressive adoption guidance to validate product screens first, then wire backend later.',
          'Added SaaS Starter and release policy docs to collections for clearer onboarding and team conventions.',
        ],
      },
      {
        title: 'Marketing pages: clearer product positioning',
        items: [
          'Revamped Starter Free page with product-focused UX: clearer Free vs Pro comparison, CTAs, and a more actionable quickstart.',
          'Redesigned UI page messaging around shipping outcomes instead of generic component lists, with richer structure and trust indicators.',
          'Enhanced homepage with a dedicated UI section, improved starter links, and clearer CTA plus demo paths.',
          'Refined About copy and added open-source links for better transparency and discoverability.',
        ],
      },
      {
        title:
          'Trust surface: npm badges + safer external SVG support',
        items: [
          'Introduced a reusable npm badge component (version / downloads / license) to improve package visibility.',
          'Enabled remote SVG badges from shields.io and updated CSP to support external images while keeping security constraints.',
          'Switched multiple links to internal routing and surfaced docs paths across pages for stronger navigation consistency.',
        ],
      },
      {
        title: 'UX & accessibility polish',
        items: [
          'Improved mobile nav accessibility: focus first link on open, added skip-to-content, and reduced layout shift with scrollbar compensation.',
          'Refined footer layout and external links hierarchy; streamlined badges and CTAs for readability.',
          'Cleaned redundant in-code comments and removed unused code for a tighter, more maintainable marketing codebase.',
          'Removed sidebar border and simplified positioning for a cleaner UI.',
        ],
      },
    ],
    cta: {
      label: 'Read Starter Free docs',
      href: '/docs/starter',
    },
  },
  {
    version: 'v1.2.0',
    title:
      'Ecosystem public launch: Tokens + ESLint + Release Engine',
    dateLabel: 'Fri 13 Feb 2026',
    dateISO: '2026-02-13',
    status: 'Stable',
    releaseWeekLabel: 'Feb 2026 (weekly release)',
    summary:
      'This release marks a major ecosystem milestone: PyColors is now a more structured developer platform with public packages (UI, Tokens, ESLint) and a hardened weekly release engine. The positioning shifts from isolated components to shipping infrastructure.',
    highlights: [
      {
        title: 'New public packages',
        items: [
          '@pycolors/tokens published on npm: light / dark themes, semantic variables, and Tailwind v4 bridge.',
          '@pycolors/eslint-config v1.0.0 released: base, Next.js, and React internal flat configs ready for ESLint v9.',
          'Improved peer dependency clarity and ecosystem alignment across packages.',
        ],
      },
      {
        title: 'Release & distribution engine',
        items: [
          'Stabilized Changesets publish workflow.',
          'Subtree sync strategy hardened (monorepo = source of truth, mirrors = distribution).',
          'GitHub Releases automated for public packages.',
        ],
      },
      {
        title: 'Marketing alignment',
        items: [
          'Changelog and roadmap updated to reflect ecosystem positioning.',
          'Clearer messaging: PyColors as a SaaS shipping platform (UI → Starter → Templates).',
          'Weekly release cadence formalized as a trust-building mechanism.',
        ],
      },
    ],
    cta: { label: 'Explore ecosystem', href: '/docs' },
  },
  {
    version: 'v1.1.2',
    title: 'Starter foundations + release engine',
    dateLabel: 'Fri 6 Feb 2026',
    dateISO: '2026-02-06',
    status: 'Stable',
    releaseWeekLabel: 'Feb 2026 (weekly release)',
    summary:
      'This release focuses on foundations for the upcoming SaaS Starter (Free) and strengthens the shipping engine: discoverability, trust surface, and consistent ecosystem messaging.',
    highlights: [
      {
        title: 'Starters (in progress)',
        items: [
          'Started the SaaS Starter (Free): laying down production-ready foundations such as structure, DX conventions, and UI baseline.',
          'Prepared ecosystem cross-links (UI ↔ Starters ↔ Templates) to support a cohesive builder workflow.',
          'Defined starter release conventions: what is shipped vs in progress to keep public updates honest and predictable.',
        ],
      },
      {
        title: 'Discoverability & trust',
        items: [
          'Search and analytics baseline: ensure key pages are trackable and indexable through events and metadata hygiene.',
          'Improved messaging across metadata to reflect PyColors as an ecosystem, not only a UI kit.',
          'Roadmap and changelog copy aligned with weekly release cadence and commercial readiness.',
        ],
      },
      {
        title: 'Release engine',
        items: [
          'Standardized weekly release structure: highlights blocks, CTA focus, and a clearer “what’s next” narrative.',
          'Small UI / UX polish passes to reduce friction and improve perceived quality.',
        ],
      },
    ],
    cta: { label: 'View roadmap', href: '/roadmap' },
  },
  {
    version: 'v1.1.1',
    title: 'Patterns docs + SEO polish',
    dateLabel: 'Fri 30 Jan 2026',
    dateISO: '2026-01-30',
    status: 'Stable',
    releaseWeekLabel: 'Jan 2026 (weekly release)',
    summary:
      'Docs expansion for production-grade UX patterns such as data tables, overlays, and async actions, plus SEO cleanup, favicon refresh, and type-level consistency refactors.',
    highlights: [
      {
        title: 'Docs & patterns',
        items: [
          'Introduced a new Patterns docs section: feature-level UI patterns with guidance on when to use them.',
          'Added a comprehensive Data Table pattern doc: anatomy, states, and variations for SaaS and admin dashboards.',
          'Shipped Data Table preview components: loading, empty, error, filterable, and row actions states.',
          'Added an Overlays pattern guide (Dropdown vs Dialog vs Sheet) with interactive demos and accessibility rules.',
          'Added Async Actions UX patterns: optimistic / pessimistic updates, feedback tiers, error handling, and interactive demos.',
          'Refactored Toast docs and centralized preview exports via an index file.',
        ],
      },
      {
        title: 'SEO & metadata',
        items: [
          'Refined site metadata messaging to better position PyColors as a product ecosystem.',
          'Simplified metadata configuration by removing redundant title / description where Open Graph acts as the source of truth.',
          'Enhanced docs layout SEO with improved titles, descriptions, and canonical URL support.',
        ],
      },
      {
        title: 'Branding & UI polish',
        items: [
          'Updated favicon assets for stronger branding consistency.',
        ],
      },
      {
        title: 'Refactoring',
        items: [
          'Standardized component prop typing by migrating from interfaces to type aliases.',
        ],
      },
    ],
    cta: { label: 'Browse patterns', href: '/docs/patterns' },
  },
  {
    version: 'v1.1.0',
    title: 'Advanced UI + product patterns',
    dateLabel: 'Fri 23 Jan 2026',
    dateISO: '2026-01-23',
    status: 'Stable',
    releaseWeekLabel: 'Jan 2026 (weekly release)',
    summary:
      'Major expansion of PyColors UI with advanced components, practical product patterns, and a clearer ecosystem structure — a SaaS-ready foundation from core interactions to data UI.',
    highlights: [
      {
        title: 'New UI components',
        items: [
          'Password Input, Sheet, Dialog, Dropdown Menu, Tabs, Toast, Table, Skeleton, Empty State, Pagination.',
        ],
      },
      {
        title: 'Docs & product guides',
        items: [
          'New guides covering SaaS layout composition, async UI states, and accessible forms with validation.',
          'Docs expanded beyond components to include real-world product patterns and UX guidance.',
        ],
      },
      {
        title: 'Marketing & ecosystem structure',
        items: [
          'Restructured marketing pages to better reflect the PyColors product ecosystem.',
          'Introduced dedicated sections for UI and Starters to clarify positioning and future offerings.',
        ],
      },
      {
        title: 'Platform readiness',
        items: [
          'Added Radix dependencies for advanced interactions.',
          'Improved discoverability through clearer information architecture and interactive previews.',
        ],
      },
    ],
    cta: { label: 'Browse components', href: '/docs/ui' },
  },
  {
    version: 'v1.0.1',
    title: 'Marketing & trust baseline',
    dateLabel: 'Fri 16 Jan 2026',
    dateISO: '2026-01-16',
    status: 'Stable',
    releaseWeekLabel: 'Jan 2026 (post-release)',
    summary:
      'Improves the marketing and trust surface: templates listing, NA-AI template page, narrative About page, and navigation plus accessibility polish.',
    highlights: [
      {
        title: 'Templates',
        items: [
          'Templates index page: listing of available templates with status and positioning.',
          'NA-AI template landing: clearer value proposition, stack, and distribution links.',
        ],
      },
      {
        title: 'About page',
        items: [
          'New About page: design principles and direction of PyColors UI.',
          'Docs-first philosophy and trust positioning for early adopters.',
        ],
      },
      {
        title: 'Navigation & UI polish',
        items: [
          'Navigation cleanup and accessibility improvements.',
          'Quick start copy updated for clearer onboarding.',
        ],
      },
    ],
    cta: { label: 'View templates', href: '/templates' },
  },
  {
    version: 'v1.0.0',
    title: 'UI Core Foundation',
    dateLabel: 'Fri 9 Jan 2026',
    dateISO: '2026-01-09',
    status: 'Stable',
    releaseWeekLabel: 'Release Week (Mon 5 → Fri 9 Jan 2026)',
    summary:
      'Official v1.0 launch of PyColors UI: core components, docs baseline, and release hygiene — a production-ready foundation.',
    highlights: [
      {
        title: 'UI Core Components',
        items: [
          'Button, Input, Badge, Card, Alert — consistent variants, sizing, and accessibility baseline.',
        ],
      },
      {
        title: 'Documentation Baseline',
        items: [
          'Every component ships with Preview / Usage / Code / Props.',
          'Docs quality contract established for future releases.',
        ],
      },
      {
        title: 'Release Hygiene',
        items: [
          'Changelog page and Roadmap page shipped.',
          'Semantic versioning introduced and version bumped to v1.0.0.',
        ],
      },
    ],
    cta: { label: 'View roadmap', href: '/roadmap' },
  },
];

function StatusPill({ status }: { status: ChangelogStatus }) {
  const tone =
    status === 'Stable'
      ? 'bg-primary'
      : status === 'Beta'
        ? 'bg-primary/70'
        : 'bg-muted-foreground';

  return (
    <Badge variant="outline" className="gap-2 rounded-[5px]">
      <span
        className={cn('inline-flex h-1.5 w-1.5 rounded-full', tone)}
      />
      {status}
    </Badge>
  );
}

function TimelineDot() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center">
      <div className="absolute inset-0 rounded-[5px] border border-border-subtle bg-surface shadow-soft" />
      <CheckCircle2
        className="relative h-4 w-4 text-primary"
        aria-hidden="true"
      />
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Changelog', href: '/changelog' },
            ]}
          />
        </div>

        <header className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="gap-2 rounded-[5px]"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              Ecosystem updates
            </Badge>
          </div>

          <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Changelog
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
            Product updates across PyColors: UI, Starters, Templates,
            docs, and commercial product growth.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-balance text-xs leading-6 text-muted-foreground">
            Changelog entries reflect shipped work and public-facing
            release notes. For current product direction, use the
            roadmap and pricing pages.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-[5px]">
              <Link href="/docs">Read the docs</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-[5px]"
            >
              <Link href="/roadmap">View roadmap</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-[5px]"
            >
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </header>

        <section className="mx-auto mt-10 w-full">
          <Card className="rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft">
            <p className="text-sm leading-7 text-muted-foreground">
              <span className="font-medium text-foreground">
                Release philosophy.
              </span>{' '}
              PyColors ships in public through release-driven
              iterations. The changelog records shipped work. The
              roadmap summarizes current priorities. Pricing defines
              the commercial path.
            </p>
          </Card>
        </section>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="relative">
            <div
              className="absolute left-4 top-0 h-full w-px bg-border-subtle sm:left-[18px]"
              aria-hidden="true"
            />

            <div className="space-y-8">
              {CHANGELOG.map((entry) => (
                <article
                  key={entry.version}
                  className="relative pl-14"
                >
                  <div className="absolute left-0 top-1">
                    <TimelineDot />
                  </div>

                  <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft">
                    <CardHeader className="border-b border-border-subtle bg-surface-muted">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="rounded-[5px] font-medium"
                            >
                              {entry.version}
                            </Badge>

                            <StatusPill status={entry.status} />
                          </div>

                          <div className="space-y-2">
                            <h2 className="font-brand text-xl font-semibold tracking-tight">
                              {entry.title}
                            </h2>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={entry.dateISO}>
                                  {entry.dateLabel}
                                </time>
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <Tag className="h-4 w-4" />
                                {entry.releaseWeekLabel}
                              </span>
                            </div>
                          </div>
                        </div>

                        {entry.cta ? (
                          <Button
                            asChild
                            variant="outline"
                            className="rounded-[5px] sm:mt-1"
                          >
                            <Link href={entry.cta.href}>
                              {entry.cta.label}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 p-6">
                      <p className="max-w-3xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
                        {entry.summary}
                      </p>

                      <div className="space-y-6">
                        {entry.highlights.map((block) => (
                          <div
                            key={block.title}
                            className="space-y-3"
                          >
                            <h3 className="text-sm font-semibold tracking-tight">
                              {block.title}
                            </h3>

                            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                              {block.items.map((it) => (
                                <li key={it} className="flex gap-2">
                                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                  <span className="text-pretty">
                                    {it}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <Card className="rounded-[5px] border border-border-subtle bg-surface-muted p-4 shadow-none">
                        <p className="text-sm leading-7 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Strategy.
                          </span>{' '}
                          Weekly releases build trust. PyColors ships
                          usable foundations, documents what is real,
                          and keeps product direction grounded in
                          roadmap and offer pages.
                        </p>
                      </Card>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button asChild className="rounded-[5px]">
                          <Link href="/docs/ui">
                            Browse components
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="outline"
                          className="rounded-[5px]"
                        >
                          <Link href="/docs">Read docs</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-6 text-muted-foreground">
            Changelog entries reflect shipped work. Internal tasks,
            strategy changes, and in-progress commercial scope may be
            grouped or summarized.
          </p>
        </section>
      </div>
    </Container>
  );
}
