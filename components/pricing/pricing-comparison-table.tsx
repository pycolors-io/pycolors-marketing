import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { cn } from "@pycolors/ui";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";

// Compare shipped source, not a buyer's configured or deployed application.
const comparisonGroups = [
  {
    title: "Interface & experience",
    rows: [
      {
        feature: "Marketing landing page",
        template: true,
        free: false,
        pro: false,
      },
      {
        feature: "Dashboard & settings",
        template: false,
        free: "Frontend screens",
        pro: "App foundations",
      },
      {
        feature: "Billing screens",
        template: false,
        free: "Mock plans & invoices",
        pro: "Integrated billing UI",
      },
      { feature: "Responsive layouts", template: true, free: true, pro: true },
      {
        feature: "Installable PWA",
        template: false,
        free: false,
        pro: "Install & offline foundations",
      },
    ],
  },
  {
    title: "Authentication & access",
    rows: [
      {
        feature: "Email & password sign-in",
        template: false,
        free: "Mock screens only",
        pro: "Auth.js credentials",
      },
      {
        feature: "Google & GitHub OAuth",
        template: false,
        free: false,
        pro: true,
      },
      {
        feature: "Verification & password reset",
        template: false,
        free: "Password recovery screen",
        pro: true,
      },
      {
        feature: "Sessions & protected routes",
        template: false,
        free: "UI structure only",
        pro: "Server-side guards",
      },
    ],
  },
  {
    title: "Billing & data",
    rows: [
      {
        feature: "Stripe Checkout & portal",
        template: false,
        free: false,
        pro: true,
      },
      {
        feature: "Subscription webhooks",
        template: false,
        free: false,
        pro: true,
      },
      {
        feature: "Data persistence",
        template: false,
        free: "Mock data",
        pro: "Prisma + PostgreSQL",
      },
      {
        feature: "Transactional email",
        template: false,
        free: false,
        pro: "Resend integration",
      },
      {
        feature: "Recovery & delivery flows",
        template: false,
        free: false,
        pro: "Integration foundations",
      },
    ],
  },
  {
    title: "Source & ownership",
    rows: [
      {
        feature: "Full product source code",
        template: true,
        free: true,
        pro: true,
      },
      {
        feature: "Source access",
        template: "Purchase claim email",
        free: "Public repository",
        pro: "Purchase claim email",
      },
      {
        feature: "Commercial usage",
        template: "Included; see license",
        free: "Review repository license",
        pro: "Included; see license",
      },
      {
        feature: "Your next step",
        template: "Customize & deploy",
        free: "Build your integrations",
        pro: "Configure & validate services",
      },
    ],
  },
] as const;

function ComparisonValue({ value }: { readonly value: string | boolean }) {
  if (typeof value === "string") return value;

  return (
    <span className="inline-flex items-center justify-center">
      {value ? (
        <Check className="size-4 text-foreground" aria-hidden="true" />
      ) : (
        <Minus className="size-4 text-muted-foreground" aria-hidden="true" />
      )}
      <span className="sr-only">{value ? "Included" : "Not included"}</span>
    </span>
  );
}

export function PricingComparisonTable() {
  return (
    <div className="min-w-0">
      <p
        id="pricing-scroll-hint"
        className="mb-3 text-xs text-muted-foreground lg:hidden"
      >
        Scroll horizontally to compare all three products.
      </p>
      <div
        role="region"
        aria-label="Product comparison, scroll horizontally for all columns"
        tabIndex={0}
        className="relative scroll-mt-20 overflow-x-auto rounded-[5px] border border-border-subtle focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <table
          className="w-full min-w-[48rem] border-collapse text-left text-sm"
          aria-describedby="pricing-setup-note"
        >
          <caption className="sr-only">
            Compare NA-AI Landing, Starter Free and Starter Pro features
          </caption>
          <thead>
            <tr className="border-b border-border-subtle">
              <th
                scope="col"
                className="sticky left-0 z-10 w-1/4 min-w-36 bg-surface p-5 align-bottom font-medium"
              >
                Features
                <p className="mt-2 text-xs font-normal text-muted-foreground">
                  Included in the source code
                </p>
              </th>
              {[
                [
                  "NA-AI Landing",
                  PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
                  "One-time",
                ],
                ["Starter Free", STARTER_FREE_PRICE_LABEL, "Public repository"],
                [
                  "Starter Pro",
                  PRODUCT_DISPLAY["starter-pro"].priceLabel,
                  "One-time · Launch price",
                ],
              ].map(([name, price, payment]) => (
                <th
                  key={name}
                  scope="col"
                  className={cn(
                    "w-1/4 p-5 text-center font-semibold",
                    name === "Starter Pro" ? "bg-pro-surface" : "bg-surface",
                  )}
                >
                  {name}
                  <p className="mt-3 text-xl tracking-tight">{price}</p>
                  <p className="mt-1 text-xs font-normal text-muted-foreground">
                    {payment}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          {comparisonGroups.map((group) => (
            <tbody key={group.title}>
              <tr className="border-y border-border-subtle bg-surface-muted">
                <th
                  colSpan={4}
                  scope="rowgroup"
                  className="px-5 py-3 text-xs font-semibold"
                >
                  <span className="sticky left-5">{group.title}</span>
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-border-subtle last:border-b-0"
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-surface px-5 py-4 text-xs font-medium leading-6 sm:text-sm"
                  >
                    {row.feature}
                  </th>
                  <td className="bg-surface px-5 py-4 text-center text-xs leading-6 text-muted-foreground sm:text-sm">
                    <ComparisonValue value={row.template} />
                  </td>
                  <td className="bg-surface px-5 py-4 text-center text-xs leading-6 text-muted-foreground sm:text-sm">
                    <ComparisonValue value={row.free} />
                  </td>
                  <td className="bg-pro-surface px-5 py-4 text-center text-xs leading-6 sm:text-sm">
                    <ComparisonValue value={row.pro} />
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">✓</span> Included{" "}
        <span className="mx-2" aria-hidden="true">
          ·
        </span>{" "}
        — Not included
      </p>
      <p
        id="pricing-setup-note"
        className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground"
      >
        Starter Pro is source code, not a hosted service. You still configure
        PostgreSQL, auth, email and Stripe, validate integrations, and deploy
        your app. Auth and billing stay online-first. Review the{" "}
        <Link
          href="/docs/starter-pro/production-checklist"
          className="font-medium text-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          production checklist
        </Link>{" "}
        before launch.
      </p>
    </div>
  );
}
