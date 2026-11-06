import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Database,
  Download,
  Layers3,
  ShieldCheck,
  Webhook,
} from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { SiteButton } from "@/components/site-button";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";

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
  const tSite = useCopy();

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
        eyebrow={tSite("From source to handover")}
        title={tSite("More of the product journey, already connected.")}
        description={tSite(
          "Inspect the workflows, the checks behind them and the responsibilities you keep when launching your own SaaS.",
        )}
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
                  0{tSite(index + 1)}
                </span>
              </div>
              <h3 className="mt-6 text-base font-semibold tracking-tight">
                {tSite(title)}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                {tSite(description)}
              </p>
              <Link
                href={href}
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-xs font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {tSite(link)}
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
        {tSite(
          "Automated acceptance uses synthetic data and intercepted providers. Your launch checks include real email delivery, your Stripe sandbox, backups and the monitoring destination you configure.",
        )}
      </p>
    </MarketingSectionShell>
  );
}

export function StarterProImplementation() {
  const tSite = useCopy();

  return (
    <MarketingSectionShell
      id="implementation"
      width="full"
      aria-labelledby="starter-pro-implementation-heading"
      className="scroll-mt-24"
    >
      <MarketingSectionHeader
        titleId="starter-pro-implementation-heading"
        align="left"
        eyebrow={tSite("Optional services · Written quote")}
        title={tSite("An assisted start, scoped to your product.")}
        description={tSite(
          "The complete source licence is {value0}. Choose an engagement when you want help with setup or a specific business workflow.",
          { value0: PRODUCT_DISPLAY["starter-pro"].priceLabel },
        )}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {Object.values(STARTER_PRO_SERVICES).map((service) => (
          <article
            key={service.id}
            aria-labelledby={`${service.id}-heading`}
            className="flex min-w-0 flex-col rounded-[5px] border border-border-subtle bg-card p-6 sm:p-8"
          >
            <h3
              id={`${service.id}-heading`}
              className="text-lg font-semibold tracking-tight"
            >
              {tSite(service.title)}
            </h3>
            <p className="mt-4 font-brand text-3xl font-semibold tracking-tight">
              {tSite(service.priceLabel)}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {tSite("Starting service fee · Written scope")}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {tSite(service.description)}
            </p>
            <ul className="my-6 space-y-3 border-y border-border-subtle py-5">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-6">
                  <Check
                    className="mt-1 size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {tSite(feature)}
                </li>
              ))}
            </ul>
            <div className="mb-5">
              <h4 className="text-xs font-medium">
                {tSite("What you receive")}
              </h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {tSite(service.deliverable)}
              </p>
              <Link
                href={service.example.href}
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {tSite("View example delivery")}
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <p className="mb-6 flex-1 text-xs leading-6 text-muted-foreground">
              {tSite(service.scope)}
            </p>
            <SiteButton variant="outline" asChild className="w-full">
              <Link href={service.href}>{tSite(service.action)}</Link>
            </SiteButton>
          </article>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 text-xs leading-6 text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-3xl">
          {tSite(
            "Starting service fees. The source licence and provider costs are itemized separately in your quote. Deliverables, acceptance checks, total price and follow-up support are agreed in writing before work begins.",
          )}
        </p>
        <Link
          href="/docs/starter-pro/implementation-support"
          className="inline-flex min-h-11 shrink-0 items-center gap-2 font-medium text-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          {tSite("Review scope and handover")}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
    </MarketingSectionShell>
  );
}
