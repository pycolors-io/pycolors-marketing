# Product studio reference captures

PyColors-owned reference implementation of the existing Starter Pro demo. All
people, projects, activity and discussions are fictional fixtures. This is not a
customer product, testimonial or evidence of commercial results.

Captured on 2026-11-03 with Chromium/Playwright from a fresh private demo session
on an isolated, temporary local QA PostgreSQL database. No production data,
external email or payments were accessed. The application source was local commit
`185d0d38`; this feature changes only Marketing.

All four PNGs are unedited 1440 × 1100 browser viewport captures, English,
PyColors palette, default interface scale, reduced motion:

- `dashboard-light.png` / `dashboard-dark.png`: workspace overview, scrolled to
  the Dashboard heading so the chart stays visible.
- `project-light.png` / `project-dark.png`: **Launch checklist**, scrolled to show
  its tasks and discussion. The browser scroll is the only framing adjustment.

The source fixtures are `apps/starter-pro/lib/demo/seed.ts`,
`lib/fixtures/workspace-examples.ts`, `lib/fixtures/task-examples.ts` and
`lib/workspaces/seed-project-work.ts`. The public demo starts with this same
scenario. Session IDs, dates and later visitor changes will differ.

To refresh, run the Pro application in isolated demo QA mode, enter a fresh
English private workspace through `/demo`, select the PyColors palette and capture the
workspace dashboard and Launch checklist in both appearances. Wait for fonts and
loading placeholders to settle. Inspect all images before replacing them; keep
synthetic data and the demo indicators visible. Never use a customer database.

## Adding independent customer evidence

Add a separate case page and link it from the reference section once a real
product and its owner's permission are available. Record the product URL, creator,
capture date, what PyColors supplied and the specific adaptations. Any quotation
must have the exact approved text, named speaker and role, source and permission
to publish. Do not infer results from interface screenshots. Do not relabel this
owned reference as a customer case or fill empty space with invented testimonials.
