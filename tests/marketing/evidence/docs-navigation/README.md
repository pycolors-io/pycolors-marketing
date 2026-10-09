# Documentation header navigation — issue #667

Real Chromium browser evidence from the Marketing production build on macOS
arm64, Node 24.18.1 and pnpm 10.32.1. The baseline is `66b948d6` (main after
#666). Local port 3108 used only the versioned CI dummy environment values.
No production service or purchased product was exercised.

## Reproduced defects

- Focusing a link inside the closed desktop panel succeeded while panel opacity
  was `0`; those links also appeared in the accessibility tree.
- A first pointer activation of **Docs** ended with `aria-expanded=false` because
  focus/hover opening competed with click toggling.
- The fixed 48rem panel extended beyond the 768px viewport.
- At 320px, the full search control pushed the mobile menu button off-screen.
  The baseline 320px screenshot therefore shows the unsuccessful attempt to
  open the menu, not an already-open drawer.
- The historical `aria-required-children` finding on `#docs-menu` reproduced.

The new closed-state regression test also fails against the original main
component, then passes when the corrected component is restored.

## Before and after

These are actual screenshots at matching viewport sizes and themes. At 768px,
the corrected layout intentionally uses the compact header and modal navigation.

| Viewport/theme    | Before                         | After                        |
| ----------------- | ------------------------------ | ---------------------------- |
| 768 × 1000, light | [Before](before-light-768.png) | [After](after-light-768.png) |
| 320 × 800, light  | [Before](before-light-320.png) | [After](after-light-320.png) |
| 1440 × 1000, dark | [Before](before-dark-1440.png) | [After](after-dark-1440.png) |

Keyboard focus: [desktop link](keyboard-focus-desktop.png),
[mobile close action](keyboard-focus-mobile.png).

## Browser results

`after-browser.json` records all 18 combinations of:

- `/docs`, `/docs/ui/installation`, `/docs/starter-pro/getting-started`;
- 320 × 800, 768 × 1000 and 1440 × 1000;
- light and dark themes, with reduced motion enabled.

Every open navigation panel stayed within the viewport. Every scoped panel/modal
axe scan returned zero violations. Existing section destinations, curated quick
links, all-docs data, pricing, catalog-derived prices and Pro links are retained.
The browser reported no runtime errors. Search remains the Fumadocs integration;
the compact button opens it with Enter and the query `Button` returns real results.

`interactions.json` records 24 successful browser assertions, including:

1. Focus cannot enter closed-panel links.
2. Click, Enter and Space reliably toggle; Tab/Shift+Tab traverse native links.
3. Escape returns focus; tabbing out closes without stealing focus.
4. A real link navigates to Getting Started and closes the disclosure.
5. Mobile contains focus, locks background scrolling, and restores scroll/focus
   after Escape; resize to desktop releases the lock and focuses the visible
   desktop trigger.
6. Open panels and their final action remain reachable at 1279/1280/1281px,
   400px short heights, and with a 200% root font size.

`integration.json` also records closed-header control bounds: all controls fit
at 320, 768, 1279, 1280 and 1440px, including 320px with 200% root text size.

## Reproduce the keyboard checks

Run the Marketing production build with its documented local environment, then:

1. At 1440px, Tab to **Docs**. Focus alone must leave it closed. Press Enter,
   Tab, Shift+Tab, Space and Escape; verify actual visibility and focus.
2. Focus the final **View pricing** link and Tab onward. Focus should continue
   to the next header link and the disclosure should close.
3. At 320px, open **Open documentation menu**. Tab in both directions, scroll to
   the last documentation link, then press Escape. Reopen and resize to 1280px.
4. Open the compact search with Enter, type `Button`, and verify results.
5. Repeat open panels at 768px, short heights, dark mode and enlarged text.

The 15 component tests separately cover native link/modifier-click behavior,
active routes, fallback links, unique IDs, route changes and unmount cleanup.
They use the real public Sheet component; search/theme providers are mocked only
at their integration boundary. Native key activation and layout checks above
were performed in Chromium, not inferred from jsdom.

## Bounded accessibility findings

All axe rules ran; no rule was disabled. Panel/modal results are reported
separately from the unchanged logo and Fumadocs shell:

- Broader header scans still flag duplicate banner/landmark semantics from the
  existing docs shell at narrow widths. These also appear in baseline evidence.
- The unchanged DocsLogo `/docs` brand text has a dark-mode contrast finding.
  Its fixed `#6A30D4` color and source are preserved; the current scan reports
  2.79:1. This is not a claim that the complete header/page passes axe.
- Full-page scans retain unrelated link-name/landmark/region findings, recorded
  in `integration.json` with their exact targets.
- Fumadocs search closes on Escape but leaves focus on the document body in
  this browser check. This is separate from the corrected navigation modal's
  verified focus restoration; the search provider is unchanged.

No screen-reader certification, Safari/Firefox result, or production-preview
runtime result is claimed. Human visual and assistive-technology review remains
required before manual merge.
