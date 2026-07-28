# Changelog

## 1.18.0

### Minor Changes

- Prepared the next nonbreaking `@pycolors/ui` and `@pycolors/tokens` patches
  with accessibility, React Server Component compatibility, clearer validation
  semantics, improved contrast tokens, and broader automated regression
  coverage.
- Defined durable component API conventions and expanded component
  documentation so developers can adopt and upgrade the free UI layer with
  less ambiguity.
- Improved release reliability with Node.js 24, pinned package-manager
  versions, stricter package publication checks, and safer synchronization of
  public projects.
- Established a policy-gated autonomous engineering workflow to shorten
  delivery cycles while preserving maintainer review, focused pull requests,
  and release quality.
- Reinforced the business foundation for the four-year EUR2M objective by
  reducing adoption risk in the free layer, increasing product trust, and
  making future Starter Pro, UI Pro, Blocks, and Templates releases safer to
  deliver.

## 1.17.5

### Patch Changes

- 7e9179c: Improved Starter Pro demo visibility and conversion proof across homepage, pricing, starters, and product pages with clearer live demo CTAs, annotated screenshots, stronger what-you-receive messaging, better Free → Demo → Pro guidance, buyer confidence near purchase CTAs, comparison clarity, and more specific documentation entry points. No backend or pricing changes.

## 1.17.4

### Patch Changes

- Improved live demo visibility across the marketing journey so Starter Free becomes the natural evaluation step before Starter Pro.
- Strengthened Starter Pro visual proof with higher-placement screenshots, annotated product proof, and clearer buyer-facing captions.
- Clarified what buyers receive after checkout, including ZIP delivery, full source code, documentation, production checklist, commercial license, and future updates.
- Improved the Starter Free → Demo → Starter Pro path across homepage, pricing, starters, and Starter Pro pages.
- Added stronger buyer confidence near purchase CTAs with secure checkout, instant ZIP delivery, future updates, and purchase recovery reassurance.
- Improved Free vs Pro comparison language and documentation entry points around included scope, setup, deployment, billing, authentication, and production readiness.
- No backend changes.
- No pricing changes.

## 1.17.3

### Patch Changes

- Improved Starter Pro buyer trust copy across pricing, product, and post-purchase pages.
- Clarified checkout success guidance with inbox-first messaging, purchase recovery as a secondary action, and aligned setup next steps.
- Standardized purchase recovery and resend access link terminology on `/orders/recover` and related surfaces.
- Added claim and download setup guidance, including a Getting Started download and unzip step before install commands.
- Added an Explore Starter Pro link on the pricing page and fixed the Starters examples link to `/ui/examples`.
- No backend changes.

## 1.17.2

### Patch Changes

- 46a85fb: Fixed the NA-AI Landing checkout action on the templates catalog by reusing the existing product checkout button flow.

All notable changes to **pycolors-marketing** are documented here.

This repository is a **read-only mirror** synced from the PyColors monorepo:
https://github.com/pycolors-io/pycolors/tree/main/apps/marketing

## Unreleased

## 1.17.0

- Weekly release for 12 June 2026.
- Added Starter Pro PWA foundations: manifest metadata, service worker registration, offline fallback, installable app assets, mobile viewport refinements, and PWA-ready product messaging.
- Introduced shared public shell/header layouts for Starter Pro marketing and auth routes with safer responsive and safe-area behavior.
- Expanded Starter Pro documentation around PWA setup, production checklists, local development, seeded testing fixtures, and Stripe billing validation.
- Added Vercel Analytics integration for the marketing app and Starter Free, plus no-index SEO controls for the public Starter Free demo.
- Improved marketing recovery, release history, versioning policy, Product Hunt visibility, starter preview imagery, and hero carousel motion.
- Added Starter Pro release packaging automation and local database helper scripts.

## 1.1.0

- Weekly release cadence: changelog + roadmap surfaces aligned with ecosystem shipping.
- Docs-first messaging and trust baseline improvements.
