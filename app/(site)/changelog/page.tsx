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
  title: 'Changelog',
  description:
    'Release notes and product updates for the PyColors ecosystem: UI, Starters, docs, templates, and commercial product growth. Predictable releases, stable conventions, and documentation-first shipping.',
  alternates: { canonical: '/changelog' },
  openGraph: {
    title: 'Changelog · PyColors',
    description:
      'Release notes and product updates across PyColors: UI, Starters, docs, templates, and commercial product growth. Predictable releases and documentation-first shipping.',
    url: '/changelog',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Changelog · PyColors',
    description:
      'Release notes and product updates across PyColors: UI, Starters, docs, templates, and commercial product growth.',
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
      ? 'bg-success'
      : status === 'Beta'
        ? 'bg-warning'
        : 'bg-muted-foreground';

  return (
    <Badge variant="secondary" className="gap-2">
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
      <div className="absolute inset-0 rounded-full border bg-card shadow-sm" />
      <div className="relative rounded-full border bg-background p-1.5">
        <CheckCircle2
          className="h-4 w-4 text-foreground"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <Container className="py-20 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Changelog', href: '/changelog' },
            ]}
          />
        </div>

        <header className="mx-auto w-full max-w-4xl text-center">
          <div className="flex justify-center">
            <Badge variant="secondary" className="gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              Ecosystem updates
            </Badge>
          </div>

          <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Changelog
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
            Product updates across PyColors: UI, Starters, Templates,
            docs, and commercial product growth. Clear versions,
            stable conventions, and documentation-first releases.
          </p>

          <p className="mx-auto mt-3 max-w-3xl text-balance text-xs text-muted-foreground">
            Changelog entries reflect shipped work and public-facing
            release notes. For future direction, packaging, pricing,
            or launch intent, use the roadmap, access, and upgrade
            pages.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/docs">Read the docs</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/roadmap">View roadmap</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/access">View access</Link>
            </Button>
          </div>
        </header>

        <section className="mx-auto mt-10 w-full">
          <div className="rounded-2xl border bg-muted/20 p-4 sm:p-5">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                Release philosophy
              </span>{' '}
              PyColors ships in public through release-driven
              iterations. The changelog records shipped work. The
              roadmap tracks priority direction. The access and
              upgrade pages define the premium path more clearly than
              the changelog does.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="relative">
            <div
              className="absolute left-4 top-0 h-full w-px bg-border/70 sm:left-[18px]"
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

                  <Card className="overflow-hidden">
                    <CardHeader className="border-b bg-card/60">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="secondary"
                              className="font-medium"
                            >
                              {entry.version}
                            </Badge>
                            <StatusPill status={entry.status} />
                          </div>

                          <div className="space-y-1">
                            <h2 className="font-brand text-xl font-semibold tracking-tight">
                              {entry.title}
                            </h2>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                                <time dateTime={entry.dateISO}>
                                  {entry.dateLabel}
                                </time>
                              </span>

                              <span className="inline-flex items-center gap-1.5">
                                <Tag
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />
                                {entry.releaseWeekLabel}
                              </span>
                            </div>
                          </div>
                        </div>

                        {entry.cta ? (
                          <Button
                            asChild
                            variant="outline"
                            className="sm:mt-1"
                          >
                            <Link href={entry.cta.href}>
                              {entry.cta.label}
                              <ArrowRight
                                className="ml-2 h-4 w-4"
                                aria-hidden="true"
                              />
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6 p-6">
                      <p className="max-w-3xl text-pretty text-sm text-muted-foreground sm:text-base">
                        {entry.summary}
                      </p>

                      <div className="space-y-6">
                        {entry.highlights.map((block) => (
                          <div
                            key={block.title}
                            className="space-y-2"
                          >
                            <h3 className="text-sm font-semibold tracking-tight">
                              {block.title}
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {block.items.map((it) => (
                                <li key={it} className="flex gap-2">
                                  <span
                                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
                                    aria-hidden="true"
                                  />
                                  <span className="text-pretty">
                                    {it}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl border bg-muted/30 p-4">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Strategy
                          </span>{' '}
                          Weekly releases build trust. Even when the
                          larger premium system is still evolving, we
                          ship usable foundations, document what is
                          real, and keep product direction visible
                          through roadmap and offer pages.
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <Button asChild>
                          <Link href="/docs/ui">
                            Browse components
                            <ArrowRight
                              className="ml-2 h-4 w-4"
                              aria-hidden="true"
                            />
                          </Link>
                        </Button>
                        <Button asChild variant="outline">
                          <Link href="/docs">Read docs</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Changelog entries reflect shipped work. Internal tasks,
            strategy changes, and in-progress commercial scope may be
            grouped, summarized, or represented more fully on the
            roadmap and offer pages.
          </p>
        </section>
      </div>
    </Container>
  );
}
