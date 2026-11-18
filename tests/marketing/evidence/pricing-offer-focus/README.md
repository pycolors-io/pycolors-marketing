# Pricing offer keyboard visibility — issue #822

## Before correction

[before-ci.json](before-ci.json) preserves the twelve `[pricing-focus]` summaries
from [CI run 44286127425, Source validation job 134739145699](https://github.com/pycolors-io/pycolors/actions/runs/44286127425/job/134739145699).
PR head `46c0dc7e3bd675a7efe4db4670a3cb40775ea2c8` added the browser regression;
the pricing presentation itself was unchanged. GitHub tested merge checkout
`dfe48ce7e9560cc4b45f2d66241d81cb0c3aae62` against main
`c5f70d4a2ba5dd07cf9aecf7cb25a34bc0853ddc`.

All twelve profiles ran: EN/FR × 320/768/1440 pixels × light/dark, height
1000 pixels, reduced motion and native Tab/Shift+Tab input. The log contains
**144 observations and six failed observations across four 320-pixel profiles**:

- English, both themes: the Starter Free detail link reached top 35.625 pixels
  during Shift+Tab, partially beneath the fixed header's 56-pixel bottom edge.
- French, both themes: the Starter Free detail link reached top 0.3125 pixels,
  with its label behind the header; the NA-AI detail link reached top
  31.171875 pixels, also with an obstructed label fragment.
- The eight 768/1440-pixel profiles had no failures. The original historical
  French desktop obstruction was not reproduced on this presentation.

The recorded environment was Ubuntu 26.04.1 LTS, Node 24.22.2,
pnpm 10.32.1 and the installed Playwright Chromium build 1248
(Chrome for Testing 156.0.8078.4). Marketing used a production Next.js build,
served by `next start` on loopback HTTP with synthetic CI configuration.
The browser helper blocks non-local requests and never activates an offer.

## Correction and after evidence

The correction applies the existing `scroll-mt-24` offset directly to the
shared offer-detail link, so native keyboard scrolling can account for the
fixed header. The section already had that offset, but descendant links do not
inherit it. All three detail links use the same class; their names, destinations,
order and semantics are retained.

This versioned receipt records only the baseline. At its creation, the
production-browser run on the correction had not executed. Subsequent results
are recorded in [PR #863](https://github.com/pycolors-io/pycolors/pull/863), with
the exact source SHA and CI run links; each result applies only to that SHA.
The native-keyboard oracle, its strict header boundary and all text-fragment
hit-tests are unchanged. Current-head CI and PR Policy must both finish
successfully before the PR becomes ready. The before receipt remains unchanged.

Run the same command selected by the existing CI:

```sh
pnpm --filter @pycolors/starter-pro test:demo:browser
```

The focused standalone invocation is documented in
[the browser regression guide](../../../browser/README.md).

## Evidence limits

These are the actual per-profile CI summaries, including all failures.
The passing observations' individual rectangles, full runtime `report.json`
and four French desktop PNGs were not uploaded from this runner; no screenshot
attachment or full-geometry archive is claimed.

A local full production build exceeded the available resources, and local
Chromium could not create its required socket. Corrected browser verification
uses the unchanged CI matrix. No current-source corrected browser
result is inferred from the class name, a DOM unit test or the earlier HTTPS
desktop check.

Focus-indicator presence is tested. Complete outline painting, contrast,
screen readers, other browser engines and human design approval remain outside
this bounded qualification.
