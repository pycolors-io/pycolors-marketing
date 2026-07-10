---
status: DRAFT — PENDING NPM PUBLICATION
package: "@pycolors/ui"
version: "1.1.2"
prepared: "2026-07-10"
do_not_publish_until: "npm view @pycolors/ui@1.1.2 version resolves"
---

# DRAFT — do not wire into any public page until npm confirms 1.1.2

This file is intentionally **not** imported or rendered anywhere. It is not
part of the Fumadocs `content/docs` or `content/blog` collections (see
`apps/marketing/source.config.ts` — only those two directories are scanned),
so it will not appear in navigation, sitemap, or search.

Verify before using any of the copy below on a live page:

```bash
npm view @pycolors/ui@1.1.2 version
```

If that command does not print `1.1.2`, do not publish this copy anywhere.

---

## Public changelog entry (paste into `apps/marketing/app/(site)/changelog/page.tsx`)

Insert at the top of the `CHANGELOG` array once npm confirms publication.
Update `dateLabel` / `dateISO` to the actual publish date.

```ts
{
  version: 'v1.1.2 (@pycolors/ui)',
  title: '@pycolors/ui accessibility hardening',
  dateLabel: '<SET ON PUBLISH>',
  dateISO: '<SET ON PUBLISH>',
  status: 'Stable',
  releaseWeekLabel: 'Jul 2026 (patch release)',
  summary:
    'This nonbreaking patch fixes two accessibility gaps in @pycolors/ui and adds package-level regression test coverage. PasswordInput now fully respects the disabled state on its visibility toggle, and TableLoading exposes accessible live-region semantics so assistive technology users are notified when a table starts loading. No public API, export, prop, variant, or size changed.',
  highlights: [
    {
      title: 'Accessibility fixes',
      items: [
        'PasswordInput: the show/hide visibility toggle is now disabled together with the field, instead of staying clickable on a disabled input.',
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
      title: 'Compatibility',
      items: [
        'No public exports, props, variants, sizes, or component names changed.',
        'All package and workspace consumer validation passed before release.',
      ],
    },
  ],
  cta: { label: 'View @pycolors/ui docs', href: '/docs/ui' },
},
```

## Marketing announcement (short, developer-first, no hype)

Use once npm confirms `1.1.2` is live. Suggested surfaces: docs footer note,
release-notes banner, or a short social/newsletter post — whichever the site
supports without new infrastructure.

> **@pycolors/ui v1.1.2 is out — accessibility hardening, nonbreaking.**
> PasswordInput's visibility toggle now correctly respects the field's
> disabled state, and TableLoading now announces itself to screen readers
> instead of failing silently. Backed by new package-level test coverage.
> No public API changed — upgrade is a drop-in patch.
> [See the changelog](/changelog) · [Read the docs](/docs/ui)

Do not use "available now," "released," or any install command in this copy
until `npm view @pycolors/ui@1.1.2 version` confirms the package is public.

## What NOT to say in any of the above

- Do not claim EPIC 1 / `@pycolors/ui` stabilization is fully complete.
  Follow-up work remains open: package-wide `data-slot` consistency,
  broader Radix primitive test coverage, `Pagination` `asChild` support,
  a first-class `Checkbox` error API, and any size/variant API
  normalization. None of that shipped in 1.1.2.
- Do not mention Storybook, new primitives, or broad API normalization —
  none of that happened in this release.
- Do not describe the Card `asChild`+`interactive` or `EmptyState`
  `role="status"` audit findings as "fixed" — they were reviewed and
  confirmed correct as already implemented; nothing changed there.
