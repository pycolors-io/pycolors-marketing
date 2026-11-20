# Pricing keyboard regression

`pricing-focus.mjs` verifies the existing pricing offer controls with real
Chromium keyboard input. The public-demo browser suite calls the same helper
against its local Marketing production server; no additional CI service or
dependency is required.

The matrix covers English and French, widths of 320, 768 and 1440 pixels,
light and dark themes, a 1000-pixel viewport height and reduced motion. Each
state rejects optional consent through the existing UI, opens a fresh page,
uses the native skip link, then visits every offer control with Tab and
Shift+Tab. It checks DOM order, settled control and text-fragment geometry,
fixed-header obstruction, focus visibility, page overflow and uncaught runtime
errors. It never activates an offer, calls `focus()` or adjusts scrolling.

Viewport bottom, left and right containment allows at most **1 CSS pixel** of
native scroll rounding. A settled control can end at 936.21875 pixels in a
936-pixel viewport without its centre being obstructed. The fixed-header boundary
remains strict (`control.top >= header.bottom`), and centre/text-fragment hit tests
receive no tolerance. The report records this bound; it does not turn a missing
or obscured label into a passing result.

## Run the focused matrix

Build and serve Marketing with the repository's synthetic CI configuration.
Use the Node and pnpm versions declared at the repository root. From the root:

```sh
pnpm --filter @pycolors/ui exec playwright install chromium
pnpm exec turbo run build --filter=pycolors-marketing
pnpm --filter pycolors-marketing exec next start --hostname 127.0.0.1 --port 3183
```

In another terminal, run:

```sh
node apps/marketing/tests/browser/pricing-focus.mjs http://127.0.0.1:3183 /tmp/pycolors-pricing-before
```

Only a loopback HTTP origin is accepted. Requests to other origins are blocked;
local Vercel analytics endpoints receive an empty test response. The output
directory receives `report.json` with every measured control and four native
viewport captures of the original French desktop Free/Pro targets. The command
exits unsuccessfully when any state fails, after retaining the complete matrix.
Geometry failures are also written to the job log, so a failure remains
diagnosable when screenshots are not uploaded by the enclosing workflow.

For a correction, retain the unchanged baseline directory, rebuild the source,
restart the local server and run into a different directory such as
`/tmp/pycolors-pricing-after`. Record the source SHA, build mode, browser version,
exact command and any limitations with selected before/after evidence under
`tests/marketing/evidence/`. Never relabel a development-server run as a
production-build result or infer human visual approval from this test.

## Mobile offer and contextual contact

`starter-mobile-contact.mjs` exports `verifyStarterMobileContact`. The existing
public-demo suite invokes it after the pricing regression, reusing its Chromium
instance, already built local Marketing production server and installed axe
script. It starts no browser or service and adds no dependency. Run it through
the existing `pnpm --filter @pycolors/starter-pro test:demo:browser` qualification
with that suite's documented synthetic database and build prerequisites.

The same 12 EN/FR, 320/768/1440, light/dark states verify the current Web price
and the approved Mobile/Fullstack TTC prices and qualifiers. A read-only
availability fixture enables the purchase controls; it is not evidence of
configured Stripe prices or successful payment. Real Tab and Shift+Tab input
visits both purchase card actions and each contextual email action.
The checks measure settled focus geometry, text visibility, header obstruction,
focus indicators (including their full outline bounds) and page overflow, using the same one-pixel viewport rounding
allowance described above. They never call `focus()` or adjust scrolling to make
a keyboard assertion pass.

The root must honor reduced motion with computed `scroll-behavior: auto`. The
observer also waits for the actual focus and scroll outside the target controls
to settle before reversing direction, including the distant FAQ after Fullstack.
The report records these boundaries using only tag names and geometry. A pending
native scroll must not be mistaken for a settled return to a card; all target
visibility, header and hit-test requirements remain strict.

The purchase controls are never activated. The legacy contextual Contact URLs
are visited directly to preserve enquiry coverage. The suite verifies the selected product, localized encoded mailto subject, constant
recipient, address link, purchase support and recovery. It never activates a
mailto link or starts checkout. Unknown and repeated interest values must keep
the general-contact fallback. Axe scans only the changed platform comparison
and general-contact regions. External requests, local API/payment requests (apart from the synthetic
availability read) and mutations are blocked; uncaught runtime errors fail the state.

These checks cover presentation, accessibility and contextual enquiries; they
do not qualify Stripe checkout, payment, webhook persistence or delivery.

The evidence directory is the suite's `mobile-offer` subdirectory. It receives a
bounded `report.json` and up to 60 public-region PNG captures, with names such as
`fr-320-dark-option-mobile.png` and `fr-1440-light-contact-fullstack.png`. Each
product article is captured separately after the keyboard assertions, avoiding
the fixed header inside a screenshot of the entire tall comparison region.
Screenshot capture starts with Playwright's normal element positioning. If this
puts the article behind the fixed header, at most four real ArrowUp presses frame
the image, waiting for each native scroll to settle before recapture. This runs
only after the keyboard assertions and records its key count; it never hides the
header, resizes the viewport or calls JavaScript focus/scroll methods. The report
still requires every captured region to fit completely below the header within
the viewport. No screenshot scroll is used to satisfy a keyboard assertion. Every
state emits a diagnostic log, and failures retain their phase and safe error
name. Reports contain bounded geometry, counts and axe rule IDs, never arbitrary
error messages, HTML, credentials, cookies, storage, traces or request URLs. The
source CI job retains only this JSON/PNG allowlist for seven days. Captures support
visual review; their existence alone is not human visual approval.
