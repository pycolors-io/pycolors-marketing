import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Database,
  Download,
  Layers3,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { SiteButton } from "@/components/site-button";

const foundations = [
  {
    title: "A ZIP that runs on its own",
    icon: Download,
    description:
      "Packaging requires isolated extraction, a frozen install, empty-database migrations, a production build and a first-user browser journey.",
    href: "/docs/starter-pro/release-readiness",
    link: "Inspect the packaging gate",
  },
  {
    title: "Billing that reconciles",
    icon: Webhook,
    description:
      "Signed webhooks reconcile current Stripe state. PostgreSQL regressions cover concurrent duplicates, reversed order, failed payments, cancellations and retries.",
    href: "/docs/starter-pro/billing-testing",
    link: "Review billing validation",
  },
  {
    title: "Workflows checked together",
    icon: ShieldCheck,
    description:
      "Browser suites cover onboarding, workspace access, English/French, Customize and responsive layouts. The required CI gate waits for selected checks.",
    href: "/docs/starter-pro/release-readiness",
    link: "Review automated coverage",
  },
  {
    title: "A recovery path to rehearse",
    icon: Database,
    description:
      "Configuration diagnostics, health probes, structured error references, alert hooks and a PostgreSQL backup/restore drill support your operations handover.",
    href: "/docs/starter-pro/operations",
    link: "Plan production operations",
  },
  {
    title: "A working business example",
    icon: Layers3,
    description:
      "Multiple workspaces, team roles and invitations connect to projects with assigned tasks, calendar due dates, discussions and reversible archiving.",
    href: "/docs/starter-pro/what-is-included",
    link: "Explore the included workflows",
  },
  {
    title: "A baseline you can maintain",
    icon: BookOpen,
    description:
      "Product configuration, customization recipes, migration guidance, source revision tracking and documented support boundaries come with the source.",
    href: "/docs/starter-pro/customization-and-upgrades",
    link: "Plan your customization",
  },
] as const;

export function StarterProReadiness() {
  return (
    <MarketingSectionShell
      id="readiness"
      width="full"
      divider="pattern"
      aria-labelledby="starter-pro-readiness-heading"
      className="scroll-mt-24"
    >
      <MarketingSectionHeader
        titleId="starter-pro-readiness-heading"
        align="left"
        eyebrow="From source to handover"
        title="More of the product journey, already connected."
        description="Inspect the workflows, the checks behind them and the responsibilities you keep when launching your own SaaS."
      />
      <div className="grid gap-px overflow-hidden rounded-[5px] border border-border-subtle bg-border-subtle sm:grid-cols-2 xl:grid-cols-3">
        {foundations.map(
          ({ title, icon: Icon, description, href, link }, index) => (
            <article
              key={title}
              className="flex min-w-0 flex-col bg-background p-5 sm:p-7"
            >
              <div className="flex items-center justify-between gap-4 text-muted-foreground">
                <Icon className="size-5" aria-hidden="true" />
                <span className="font-mono text-[10px]" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-base font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                {description}
              </p>
              <Link
                href={href}
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {link}
                <ArrowUpRight
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ),
        )}
      </div>
      <p className="mt-4 max-w-3xl text-xs leading-6 text-muted-foreground">
        Automated acceptance uses synthetic data and intercepted providers. Your
        launch checks include real email delivery, your Stripe sandbox, backups
        and the monitoring destination you configure.
      </p>
    </MarketingSectionShell>
  );
}

export function StarterProImplementation() {
  return (
    <MarketingSectionShell
      id="implementation"
      width="full"
      aria-labelledby="starter-pro-implementation-heading"
      className="scroll-mt-24"
    >
      <div className="grid gap-8 rounded-[5px] border border-pro-border bg-pro-surface p-6 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            Scoped implementation · Separate engagement
          </p>
          <h2
            id="starter-pro-implementation-heading"
            className="mt-4 text-2xl font-semibold tracking-subheading sm:text-3xl"
          >
            A starting point tailored to your product.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Discuss a focused engagement around the source licence, initial
            configuration, an agreed product adaptation and a documented
            handover. Scope, acceptance checks, price and support period are
            agreed in writing before work begins.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <SiteButton asChild>
              <Link href="/contact">Discuss your project</Link>
            </SiteButton>
            <Link
              href="/docs/starter-pro/implementation-support"
              className="inline-flex min-h-11 items-center gap-2 text-xs font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              Review scope and handover
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <ol className="divide-y divide-pro-border-subtle border-y border-pro-border-subtle">
          {[
            [
              "Define the outcome",
              "Choose the workflow, environment and acceptance criteria.",
            ],
            [
              "Configure and adapt",
              "Agree on the initial setup and the specific changes to deliver.",
            ],
            [
              "Validate and hand over",
              "Review the result, operating notes and bounded follow-up support.",
            ],
          ].map(([title, detail], index) => (
            <li key={title} className="flex gap-4 py-5">
              <span
                className="pt-0.5 font-mono text-[10px] text-muted-foreground"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <div>
                <h3 className="text-sm font-medium">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">
        The source licence is available separately at the displayed product
        price. Bespoke implementation and ongoing operations are scoped
        separately; service commitments follow the agreed offer.
      </p>
    </MarketingSectionShell>
  );
}
