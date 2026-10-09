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

## Homepage product preview

The interactive workspace follows the hero with a compact “Built with PyColors UI”
heading and a single preview frame. Product and documentation actions sit below
the demo alongside its local-only data notice. Table, board, filtering and project
review interactions remain available; this preview does not connect to a backend
or demonstrate production readiness.

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
