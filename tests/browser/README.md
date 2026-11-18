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
