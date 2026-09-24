import * as React from "react";
import Link from "next/link";

// Compare shipped foundations, not a customer's configured deployment.
// Offer, license, and support terms remain in their existing sources.
const comparisonRows = [
  {
    label: "Product interface",
    free: "Dashboard, projects, settings, and billing UI to validate your UX.",
    pro: "SaaS app surfaces with auth and billing integration foundations.",
  },
  {
    label: "Authentication",
    free: "Mocked auth screens; no real account or session is created.",
    pro: "Auth.js credentials, Google/GitHub OAuth, verification, and password reset; configure your providers.",
  },
  {
    label: "Session and access checks",
    free: "UI structure only; add real session checks and authorization.",
    pro: "Auth.js sessions and server-side guards; extend permissions for your product.",
  },
  {
    label: "Stripe billing",
    free: "Mock plans and invoices; no Stripe Checkout or customer portal integration.",
    pro: "Checkout, customer portal, and webhook-backed subscriptions; configure and test your Stripe account.",
  },
  {
    label: "Data persistence",
    free: "Mock product data and client-side state; add your persistence layer.",
    pro: "Prisma + PostgreSQL foundations for auth and billing; wire your own domain data.",
  },
  {
    label: "Mobile experience",
    free: "Responsive web UI.",
    pro: "Responsive UI plus installable PWA foundations; auth and billing stay online-first.",
  },
  {
    label: "Source access",
    free: "Clone the public Starter Free repository.",
    pro: "Download the ZIP through your purchase claim email; access recovery is available.",
  },
  {
    label: "Work you still own",
    free: "Build the integrations and product logic, then deploy and operate your app.",
    pro: "Configure and validate the integrations, build your product logic, then deploy and operate your app.",
  },
] as const;

export function StarterComparisonTable(): React.ReactElement {
  return (
    <div className="min-w-0 space-y-4">
      <div
        role="region"
        aria-label="Starter comparison, scroll horizontally for all columns"
        tabIndex={0}
        className="overflow-x-auto rounded-[5px] border border-border-subtle bg-surface shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <table
          className="w-full min-w-[36rem] border-collapse text-left text-sm"
          aria-describedby="starter-comparison-setup"
        >
          <caption className="sr-only">
            Compare Starter Free and Starter Pro
          </caption>
          <thead className="bg-surface-muted">
            <tr>
              <th scope="col" className="w-1/4 px-5 py-4 font-medium">
                Capability
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Starter Free
              </th>
              <th scope="col" className="px-5 py-4 font-medium">
                Starter Pro
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-border-subtle align-top last:border-b-0"
              >
                <th scope="row" className="px-5 py-4 font-medium">
                  {row.label}
                </th>
                <td className="px-5 py-4 leading-6 text-muted-foreground">
                  {row.free}
                </td>
                <td className="px-5 py-4 leading-6">{row.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        id="starter-comparison-setup"
        className="text-sm leading-7 text-muted-foreground"
      >
        Starter Pro is source code, not a hosted service. You still configure
        PostgreSQL, auth, email, and Stripe, validate the integrations, and
        complete the production checklist. Buying Pro does not provision or
        deploy your app.
      </p>

      <p className="text-sm leading-7 text-muted-foreground">
        Stay on Free while validating screens and workflows. Choose Pro when
        real accounts and payments become the next implementation step. Bring
        your existing UI work across deliberately; buying Pro does not
        automatically migrate your app or data.
      </p>

      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <li>
          <Link
            href="/starters/free"
            className="font-medium underline underline-offset-4"
          >
            Explore Starter Free
          </Link>
        </li>
        <li>
          <Link
            href="/docs/starter/upgrade"
            className="font-medium underline underline-offset-4"
          >
            Plan the upgrade from Free
          </Link>
        </li>
        <li>
          <Link
            href="/docs/starter-pro/production-checklist"
            className="font-medium underline underline-offset-4"
          >
            Review production responsibilities
          </Link>
        </li>
      </ul>
    </div>
  );
}
