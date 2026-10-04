# Product discovery navigation — issue #665

Review evidence for Marketing composition owner #398. These are genuine
Chromium captures of the rendered Marketing production build, not mockups.
Baseline: `e89dac28af9c5803a221652881793afaddf90c6f` (`origin/main` when work
started). The after captures use the implementation in this PR.

## Matching screenshots

All matching captures use the homepage at scroll position 0, the same theme,
and the navigation open. At 768px the previous desktop panel was off-screen;
the new navigation deliberately uses the compact modal layout below 1024px.

| Viewport           | Before                          | After                         |
| ------------------ | ------------------------------- | ----------------------------- |
| 1440 × 1000, light | [Before](before-light-1440.png) | [After](after-light-1440.png) |
| 1440 × 1000, dark  | [Before](before-dark-1440.png)  | [After](after-dark-1440.png)  |
| 768 × 1000, light  | [Before](before-light-768.png)  | [After](after-light-768.png)  |
| 768 × 1000, dark   | [Before](before-dark-768.png)   | [After](after-dark-768.png)   |
| 320 × 800, light   | [Before](before-light-320.png)  | [After](after-light-320.png)  |
| 320 × 800, dark    | [Before](before-dark-320.png)   | [After](after-dark-320.png)   |

## Reproducible keyboard evidence

The [baseline interaction probe](before-interaction.json) reproduces hidden focus
and the focus/Enter race. [Native new-tab evidence](new-tab-evidence.txt) records
Meta+Enter opening the existing UI page in a second tab.

The recorded observations in [keyboard-and-responsive.json](keyboard-and-responsive.json)
come from native browser key input against the actual header. Focus snapshots
are [desktop](keyboard-desktop-focus.png) and [mobile after scrolling](keyboard-mobile-scrolled.png).
This reproducible sequence is provided instead of video; ffmpeg was unavailable.

1. At 1440px, Tab from the logo to Products. Focus alone must leave it closed.
2. Press Enter, then Tab: UI Library receives visible focus. Shift+Tab returns
   to Products. Space closes; Space opens again.
3. Tab through the six products and four secondary links. Moving the pointer
   outside while a link is focused must leave the panel open. Tabbing beyond
   its last link must close it and preserve focus on the next primary link.
4. Reopen, Tab to a product and press Escape: Products receives focus. Two
   pointer clicks must open then close; an outside click must also close.
5. Activate UI Library with Enter: the existing `/ui` page opens and the
   disclosure closes. Native anchors retain modifier/new-tab behavior.
6. At 320px, scroll the page to 480px, then open navigation. Tab and Shift+Tab
   stay in the modal. Attempting to focus an obscured page link redirects focus
   into the modal. Wheel input scrolls its content, leaving page scroll at 480px.
7. Escape and Close each restore focus to the mobile trigger and release the
   body scroll lock after the existing Sheet exit animation.
8. Open mobile navigation and resize to 1024px: the modal closes, page scrolling
   returns, and Products receives focus. Reopen, focus a product, then resize to
   1023px: the compact trigger receives focus. Follow Blocks in the mobile
   panel: the route changes and the body is unlocked.

The component regression test also covers route updates without link clicks,
modifier clicks, most-specific active routes, unique IDs, supplied `docsLinks`,
listener cleanup and unmounting an open modal.

## Browser and accessibility results

[after-browser-matrix.json](after-browser-matrix.json) contains 24 page/theme/viewport
combinations and both open and closed full-page axe audits, without disabled
rules. Pages: `/`, `/starters/pro`, `/orders/support`, `/docs`. Each was checked
at 320, 768 and 1440px in light and dark.

- The Marketing header has no axe violations in the tested open or closed
  states. Its panels stay within the viewport; no horizontal page overflow.
- The historical `aria-required-children` finding on `#products-menu` is
  reproduced before and corrected after. Before, a closed product link could
  receive focus; focusing Products opened the menu and Enter immediately
  closed it. A first-pointer-click failure was **not** reproduced in the
  initial baseline probe and is not claimed as a reproduced historical defect.
- The existing Starter Pro hero badge has a `color-contrast` finding in some
  closed full-page states. It is outside the changed header and was present
  in the baseline.
- `/docs` uses the separate, unchanged `DocsHeader` and Fumadocs shell. Its
  existing menu/landmark/link-name findings remain; at 768px its own panel
  extends beyond the right edge. Docs captures verify integration, not a
  claim that the documentation shell passes accessibility checks.
- axe incomplete IDs, target counts and sample targets are retained in these
  summaries for human inspection, not counted as passes. Full raw audits remain
  in the task artifacts. No page JavaScript errors were reported during this verification.

[viewport-stress.json](viewport-stress.json) records 1023/1024/1025px breakpoint
neighbors, short viewports (320 × 480, 1024 × 480, 1440 × 360), and 200% root
text size at 320 × 640 and 1440 × 800 with reduced motion enabled. All scoped
open-panel axe checks pass. Product and secondary links remain keyboard
reachable. Enlarged long product entries require vertical scrolling; their
text is retained and wraps without horizontal clipping. The close control and
fixed CTA remain reachable.

Scope of evidence: Chromium on the local production build, with public CI dummy
environment values and no real transaction. These checks do not establish
Safari/Firefox, physical-device or assistive-technology certification. The
price/name source remains `lib/products/public-catalog.ts`; no commercial
values were changed.
