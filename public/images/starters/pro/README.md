# Starter Pro interface captures

Refreshed on 2026-11-03 from Starter Pro commit `b0ea55f4`. These are unedited
Chromium screenshots, English, 100% interface scale, a 1440 × 1000 CSS-pixel
viewport and **2× device pixel ratio (2880 × 2000)**. Marketing requests image
quality 100 with responsive sizes so detailed text remains clear on Retina
screens without sending desktop-sized images to every phone.

| Capture                              | Palette                 | Source                                |
| ------------------------------------ | ----------------------- | ------------------------------------- |
| `dashboard-pycolors-2x.png`          | PyColors · light        | Normal application                    |
| `dashboard-dark-pycolors-2x.png`     | PyColors · dark         | Same normal workspace                 |
| `auth-indigo-2x.png`                 | Indigo Ledger · light   | Anonymous sign-in screen              |
| `billing-emerald-2x.png`             | Emerald Console · light | Synthetic local billing fixtures      |
| `pricing-cyan-2x.png`                | Arctic Cyan · light     | Example SaaS pricing screen           |
| `project-work-coral-2x.png`          | Coral Signal · light    | Launch checklist tasks and discussion |
| `demo-dashboard-indigo-light-2x.png` | Indigo Ledger · light   | Private demo session                  |
| `demo-dashboard-indigo-dark-2x.png`  | Indigo Ledger · dark    | Same private demo session             |

The palettes are shipped in **Customize → Color palette**. Normal captures use
`prisma/local-seed.ts` on a new temporary local QA PostgreSQL database, which was
removed after capture. Demo captures use `lib/demo/seed.ts` in an isolated local
QA demo. All projects, names, subscription figures and invoice records are
fictional. No customer data, external OAuth login, email delivery, Stripe request
or production deployment is represented. Provider buttons use non-working QA
configuration and are not evidence of a configured integration.

These are the starter's own SaaS pricing and billing examples; they are separate
from the commercial Starter Pro licence. Calendar dates and counts depend on
fixture generation. The public demo has simulated billing and invitations.

To refresh, use disposable QA data, the normal application's credentials flow
and the actual Customize palette controls. Keep the viewport, default scale,
locale and device pixel ratio consistent. Wait for fonts and loading placeholders
to settle; scroll billing to its summary and the project to its tasks before capture. Review the actual
render and all captions before publishing. Never recolor pixels or upscale an
old screenshot to claim a higher-resolution source.

The retained legacy `pwa-pycolors.png` is not used by the current Marketing
product/pricing galleries. The four Product studio reference captures have their
own provenance in `../../showcase/product-studio/README.md`.
