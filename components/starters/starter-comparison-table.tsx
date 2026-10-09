import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeftRight,
  Code2,
  SlidersHorizontal,
} from "lucide-react";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";
import styles from "./starter-pro.module.css";

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
    <div className="min-w-0 overflow-hidden rounded-[5px] border border-border-subtle bg-background">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border-subtle px-5 py-4 sm:px-6">
        <p className="text-xs font-medium text-foreground">
          Same UI foundation. Different integration depth.
        </p>
        <span className="flex items-center gap-2 text-xs text-muted-foreground md:hidden">
          <ArrowLeftRight className="size-3.5" aria-hidden="true" />
          Scroll to compare
        </span>
        <span className="hidden text-xs text-muted-foreground md:inline">
          Compare what ships
        </span>
      </div>
      <div
        role="region"
        aria-label="Starter comparison, scroll horizontally for all columns"
        tabIndex={0}
        className="relative overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <table
          className={`${styles.comparisonTable} w-full min-w-[40rem] table-fixed border-collapse text-left text-sm`}
          aria-describedby="starter-comparison-setup"
        >
          <caption className="sr-only">
            Compare Starter Free and Starter Pro
          </caption>
          <thead>
            <tr className="align-top">
              <th
                scope="col"
                className="w-[22%] bg-background px-4 py-6 text-xs font-medium text-muted-foreground sm:sticky sm:left-0 sm:z-10 sm:px-6"
              >
                Capability
              </th>
              <th
                scope="col"
                aria-labelledby="comparison-free-name"
                className="px-5 py-6 font-normal sm:px-6 sm:py-8"
              >
                <span
                  id="comparison-free-name"
                  className="block font-brand text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  Starter Free
                </span>
                <p className="mt-2 max-w-64 text-sm leading-6 text-muted-foreground">
                  Explore screens and validate your workflows.
                </p>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xl font-semibold tracking-tight">
                    {STARTER_FREE_PRICE_LABEL}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Public repository
                  </span>
                </p>
                <Link
                  href="/starters/free"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[5px] text-xs font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Explore Starter Free{" "}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </th>
              <th
                scope="col"
                aria-labelledby="comparison-pro-name"
                className="px-5 py-6 font-normal sm:px-6 sm:py-8"
              >
                <span
                  id="comparison-pro-name"
                  className="block font-brand text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  Starter Pro
                </span>
                <p className="mt-2 max-w-64 text-sm leading-6 text-muted-foreground">
                  Build on real auth, billing and database foundations.
                </p>
                <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xl font-semibold tracking-tight">
                    {PRODUCT_DISPLAY["starter-pro"].priceLabel}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    One-time payment
                  </span>
                </p>
                <Link
                  href="/docs/starter/upgrade"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-[5px] text-xs font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  Plan the upgrade from Free{" "}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-border-subtle align-top"
              >
                <th
                  scope="row"
                  className="bg-background px-4 py-5 text-xs font-medium leading-6 sm:sticky sm:left-0 sm:z-10 sm:px-6 sm:text-sm"
                >
                  {row.label}
                </th>
                <td className="px-5 py-5 leading-6 text-muted-foreground sm:px-6">
                  {row.free}
                </td>
                <td className="px-5 py-5 leading-6 sm:px-6">{row.pro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid border-t border-border-subtle md:grid-cols-2">
        <div className="p-5 sm:p-6">
          <h3 className="flex items-center gap-2.5 text-sm font-medium">
            <SlidersHorizontal
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            Before you launch
          </h3>
          <p
            id="starter-comparison-setup"
            className="mt-3 text-sm leading-7 text-muted-foreground"
          >
            Starter Pro is source code, not a hosted service. You still
            configure PostgreSQL, auth, email, and Stripe, validate the
            integrations, and complete the production checklist. Buying Pro does
            not provision or deploy your app.
          </p>
          <Link
            href="/docs/starter-pro/production-checklist"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-[5px] text-xs font-medium transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            Review production responsibilities
            <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
          </Link>
        </div>
        <div className="border-t border-border-subtle p-5 sm:p-6 md:border-l md:border-t-0">
          <h3 className="flex items-center gap-2.5 text-sm font-medium">
            <Code2
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            Moving from Free to Pro
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Stay on Free while validating screens and workflows. Choose Pro when
            real accounts and payments become the next implementation step.
            Bring your existing UI work across deliberately; buying Pro does not
            automatically migrate your app or data.
          </p>
        </div>
      </div>
    </div>
  );
}
