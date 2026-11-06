![license](https://img.shields.io/github/license/pycolors-io/pycolors-marketing)

# pycolors-marketing

Official marketing website for **PyColors**.

👉 https://pycolors.io

Built with **Next.js + Fumadocs**, this site is the public entry point
for the PyColors ecosystem: documentation, starters, roadmap, and
product updates.

---

## ⚠️ Read-only mirror

This repository is automatically synced from the **PyColors monorepo**.\
**Source of truth:**\
https://github.com/pycolors-io/pycolors/tree/main/apps/marketing

You can safely open **Issues and Discussions in this repository**.\
Changes are synced automatically from the monorepo.

---

## Purpose

The marketing site is the **public entry point** of the PyColors
ecosystem:

- Discover the design system and philosophy
- Read documentation and guides
- Explore starters and templates
- Follow the public roadmap and weekly releases
- Learn how to build SaaS products faster

---

## Tech stack

- Next.js (App Router)
- Fumadocs
- Tailwind CSS
- Turborepo (source monorepo)
- Vercel deployment

---

## Starter demo entry points

`/demo` is the marketing discovery page for the two starters. The global header,
mobile navigation and footer link to it. Starter Free keeps its existing
`https://starter-demo.pycolors.io/` deployment; its screens use mock data and
client-side interactions.

Marketing defaults to the verified public Pro demo at
`https://pro-demo.pycolors.io/demo`, hosted by the dedicated `pycolors-pro-demo`
project. `/demo` leads with Pro, its actual workspace captures and three direct
journey entry points: Dashboard, Members and the Free → Pro plan preview. Free
has a separate frontend demo section. Captures follow the site's light/dark mode.
The Pro `demo-dashboard-indigo-light-2x.png` / `demo-dashboard-indigo-dark-2x.png` captures come from
the same English, Indigo Ledger workspace in local demo browser QA, with
fictitious data. They use 2× device pixel ratio (2880 × 2000) and image quality 100. Keep the page, locale, palette and viewport consistent when refreshing the pair.

Override `NEXT_PUBLIC_STARTER_PRO_DEMO_URL` **at build time** to use another
verified isolated deployment. Missing or empty values use the public PyColors
demo; invalid non-empty values hide outbound demo links and offer the clearly
separate product tour. The Starter Free app retains its own opt-in configuration.
The Marketing build does not need database credentials, auth or cleanup secrets.

Deploy Pro separately in demo mode using the configuration in
`apps/starter-pro/DEMO.md` in the canonical monorepo. Keep the marketing site and
normal Starter Pro application out of demo mode. This change does not alter DNS,
deploy an application or enable payments.

## Homepage product preview

The interactive workspace follows the hero with a compact “Built with PyColors UI”
heading and a single preview frame. Product and documentation actions sit below
the demo alongside its local-only data notice. Table, board, filtering and project
review interactions remain available; this preview does not connect to a backend
or demonstrate production readiness.

Below the desktop breakpoint, project details start collapsed to keep the product
entry points within easier reach. The labelled disclosure toggles the panel;
selecting a project also opens its details. Desktop keeps the detail panel visible.
The homepage uses the active palette for primary actions and a tighter mobile
spacing scale while preserving touch targets and keyboard access.

---

## Brand icons

Favicons and mobile icons use the header's upward-facing, two-facet symbol in
white on violet (`#6A30D4`), independently of the selected site palette. Regenerate
the SVG, PNG, ICO and Explorer assets from `components/logo.tsx` with:

```bash
node apps/marketing/scripts/generate-brand-icons.mjs
```

Run from the monorepo root after installing dependencies. The script uses Next.js's
installed Sharp renderer. The separate maskable icon keeps the complete symbol
inside the central safe zone; Apple and mobile icons use an opaque square canvas
so the operating system can apply its own mask. When replacing assets, update the
version query in `app/layout.tsx` and `public/manifest.webmanifest` to refresh caches.
These assets do not change the published UI package API or require a Changeset.

---

## Search metadata

The homepage and site defaults share their title and description in
`lib/seo/website.ts`. Each documentation page declares its own canonical URL and
Open Graph/Twitter preview through `lib/seo/docs.ts`; it must not inherit `/docs`
as the canonical URL for every article. Blog titles use an absolute title to avoid
appending the site name twice.

The sitemap includes public discovery pages, blog posts, taxonomy and documentation.
Only known, valid editorial dates are used for `lastModified`; static pages and
undated content omit it instead of claiming an update on every build. Google
ignores `priority` and `changeFrequency`; these remain optional hints for other
consumers. `robots.txt` allows crawling and points to the sitemap. Transactional
pages retain their existing `noindex` metadata and stay outside the sitemap.
Website structured data describes the real site and organization, without
advertising an unavailable `/search` page.

After deployment, validate canonical URLs and sitemap coverage in Search Console.
These code changes do not submit URLs, guarantee indexing or claim ranking gains.

---

## Navigation and appearance

The marketing header groups navigation into Products, Docs, Resources, and Pricing.
Products opens beneath its trigger in a compact two-column panel: **Build your
interface** (UI Library, Blocks, Theme Builder) and **Launch your product** (Starter
Free, Starter Pro, NA-AI Landing). Compare Starters and All templates sit beside the
palette picker at the bottom. Mobile navigation also retains UI examples and Pricing
as direct links. Documentation uses the same header and global destinations, with
the PyColors Docs logo and documentation search. A shared desktop brand width keeps
the logo and primary navigation aligned between contexts. Article navigation stays
in the Fumadocs sidebar, including its dated New badges. On small screens, the
separate **Documentation** row opens that sidebar; the global menu stays focused on
products and resources. Resources links to Guides, Blog, Changelog, and Roadmap,
with GitHub as a secondary link.
On devices with a mouse, the Products and Resources desktop menus share
the same interaction: they open after a 50 ms hover, reveal over 100 ms, and close
200 ms after the pointer leaves. Entering the panel cancels that dismissal; focused
panel controls remain available to keyboard users. Click and keyboard activation
also work, and only one panel can be open at a time. Escape dismisses the panel,
returning focus to the trigger only when focus was inside the menu. Hover never
moves focus. Opening motion respects reduced-motion preferences. Touch navigation
uses taps, and mobile navigation exposes the same destinations in a scrollable sheet.

The footer, mobile navigation menus, and shared desktop Products menu offer two
site palettes: **PyColors** (violet, the default) and **Monochrome** (black, white, and
neutral grays). This choice is separate from the Light, Dark, and System
appearance controls.

Preferences are saved in the browser and shared across marketing pages, the
blog, and documentation. If browser storage is unavailable, palette changes
still apply for the current visit. Theme Builder previews and exports keep
their own configured colors.

---

## Local development

```bash
pnpm install
pnpm dev
```

The site will be available at: http://localhost:3000

---

## Contributing

We welcome issues, ideas, and discussions.

If you'd like to contribute code, please open a discussion first so we
can coordinate changes with the monorepo.

---

## Release & deployment

This repository is a **distribution mirror**.

- Updates arrive via automated sync PRs from the monorepo
- Production deployment is handled by **Vercel**
- Releases follow the monorepo CI/CD pipeline

---

## License

MIT

---

## Links

Website → https://pycolors.io \
Docs → https://pycolors.io/docs \
UI → https://github.com/pycolors-io/pycolors-ui \
Tokens → https://github.com/pycolors-io/pycolors-tokens

## English and French site

Marketing, documentation and blog articles share the same component layouts in
English and French. English URLs remain stable; French URLs use `/fr`.
Commercial aliases include `/fr/tarifs` and `/fr/demande-de-devis`; legal aliases
are `/fr/licence`, `/fr/conditions` and `/fr/confidentialite`.

`lib/i18n/routing.ts` defines routing and localized links. Use its `Link` and
navigation helpers instead of assembling locale prefixes. The shared language
menu is available in the header and both footers, with keyboard navigation and
the active language indicated. Native locale links keep the current page, query
and anchor; the footer's smooth-scroll handler leaves them untouched. There is no browser/IP redirect or
language cookie: links select the language explicitly.

Every public page has a self canonical, reciprocal `en`/`fr` alternates and an
English `x-default`. The sitemap lists both versions. Checkout and purchase-access
pages retain their noindex rules and API contracts. Product prices, identifiers,
commands and code examples remain unchanged by translation.

The shared document initializes appearance through `public/site-appearance.js`
before the first paint, including localized 404s. Keep its `theme` storage key,
class-based light/dark modes and palette key aligned with `RootProvider`.
The provider retains theme state and system-preference updates; its inline
bootstrap is inert so client remounts do not render executable scripts.

### Updating copy

- Server and client components share `useCopy`; async components use `getCopy`.
  Translate presentation text at its render boundary. Keep identifiers, customer
  data and code out of this API.
- Translate server-owned labels before passing them into interactive client
  components, as in `Breadcrumb` and the guide table of contents. The client
  catalogue contains the client import graph, not arbitrary strings passed by
  Server Components. Preserve IDs, values and callback arguments when translating
  the presentation models of local examples.
- `messages/en.json` records normalized English source copy; `messages/fr.json`
  contains the corresponding French copy. Keys come from `messageKey` in
  `lib/i18n/copy-core.ts`. Preserve `{value0}` placeholders exactly and pass their
  values separately. Messages are plain text, never HTML.
- Keep English MDX files and add French siblings as `name.fr.mdx`. Fumadocs owns
  localized navigation and search, without an English content fallback. Preserve
  code fences, imports, identifiers and component structure. Explicit `[#id]`
  headings keep existing deep links valid across languages. Navigation metadata
  uses `meta.fr.json` with the same page order and icons.
- Review translations in context, especially commercial and legal copy. A
  translation must not change the offer, rights, prices or provider behavior.
- Run `pnpm --filter pycolors-marketing i18n:client` after changing a client
  component's copy or imports. It derives the serialized client message subset;
  the complete catalogue stays on the server. English client components use
  their existing source strings without serializing the English catalogue.

Run Marketing lint, types, tests and a production build. `i18n:check` is included
in the existing test command and rejects missing messages, changed placeholders
and a stale client catalogue. It also checks field hints and requires placeholders
for interpolated copy. Regression tests cover shared layouts, translated FAQ
search, MDX/code preservation, documentation tabs, locale links and the root palette script.
Check desktop/mobile rendering and the browser console before public delivery.

The Next.js `skipProxyUrlNormalize` flag preserves the incoming URL for locale
rewrites. Without it, Next.js 16 loopback normalization can turn an internal
English rewrite into a second HTTP request and a redirect back to the same public
URL under `next start`. The public-demo browser suite checks production EN/FR
responses, canonical aliases with queries and client navigation. The default
English URL remains unprefixed; no locale detection or redirect rule is removed.

## Custom project services

`/services` and `/fr/services` describe custom software engagements, possible
use cases, deliverables and the delivery process. Examples of future adaptations
are scoped possibilities; Product studio remains a clearly identified PyColors
reference implementation. Existing Starter Pro setup/adaptation prices stay in
`lib/products/starter-pro-services.ts`.

`lib/products/project-services.ts` adds the `custom-product` enquiry option,
quoted after scoping, without adding a fixed-price product to checkout. Its CTA
preselects the same stable service ID in the quote form. The API validator and
private enquiry email template support all three service IDs; older enquiries
remain valid. Deploy the compatible API/email change before exposing the new
Marketing entry point. No migration is required. Tests mock email delivery.

The service use cases focus on client portals, internal tools, document
automation and custom SaaS applications. Sport is one possible sector alongside
agencies, service firms and training teams. Websites and template adaptations
can complement a scoped product.

The Services introduction uses a real Product studio capture, explicitly labelled
as a PyColors reference with fictional data. Direct collaboration, written scope
and handover terms explain the engagement. Component, Starter Pro and reference
links provide inspectable examples; process steps identify concrete outputs.
There are no customer claims, promised delivery times or competitor comparisons.
Custom development remains scoped separately from the two Starter Pro engagements.
Services copy names PyColors and addresses the visitor directly, without a plural
agency voice, to reflect an independent practice accurately.

### Proposal preview and editable document

`/request-a-quote/template` and `/fr/demande-de-devis/modele` now display the
proposal as a web page. These URLs previously downloaded Markdown; their links
now open the preview. The page provides a Word download (`/word` under either
localized URL) and native browser printing / Save as PDF. Pages and downloads
remain `noindex`. They are blank templates, not accepted customer proposals.

The primary commercial action is “Describe your project”. The proposal preview
is a secondary explanation of what PyColors prepares after reviewing the brief;
visitors do not need to complete a proposal themselves. Word and print actions
remain secondary tools inside the document header. Printing retains the blank
template notice; the Word content is unchanged.

`lib/quotes/proposal-template.ts` remains the single content source for both
languages. A restricted parser feeds the preview and a native OOXML generator
using the existing `fflate` dependency. Word text, headings, lists and tables
are editable; there are no macros, uploaded assets or external document services.
Downloads use fixed ZIP timestamps and cannot contain request-provided content.

The proposal includes custom software alongside the two existing engagements.
Scope, licence requirements, third-party costs and any follow-up are agreed in
the written proposal. Regenerate both Word downloads and visually inspect all
pages in a Word-compatible renderer when changing their content or layout.
