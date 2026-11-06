import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Download,
  FileCheck2,
  FileText,
  Server,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { SiteButton } from "@/components/site-button";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { implementationExample as example } from "@/lib/products/implementation-example";

const title = "Example delivery & handover · Starter Pro";
const description =
  "Inspect an example PyColors engagement: agreed scope, configured preview environment, acceptance records and a downloadable team handover document.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: example.href },
  openGraph: {
    title,
    description,
    url: example.href,
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/seo/twitter-main.png"],
  },
};
const linkClass =
  "inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const stages = [
  {
    label: "Agreed scope",
    icon: Workflow,
    href: "#scope",
    detail: "The workflow, boundaries and acceptance criteria.",
  },
  {
    label: "Configured environment",
    icon: Server,
    href: "#environment",
    detail: "A usable preview and its configuration record.",
  },
  {
    label: "Verified journeys",
    icon: FileCheck2,
    href: "#acceptance",
    detail: "Expected results, observed outcomes and evidence.",
  },
  {
    label: "Team handover",
    icon: FileText,
    href: "#handover",
    detail: "The revision, operating notes and next actions.",
  },
] as const;

export default function ImplementationExamplePage() {
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <JsonLd
        id="implementation-example-breadcrumb"
        data={generateBreadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Starter Pro", href: "/starters/pro" },
          { label: "Example delivery", href: example.href },
        ])}
      />
      <Container className="pb-10 pt-20 sm:pb-14 sm:pt-24">
        <Link
          href="/starters/pro#implementation"
          className={`${linkClass} mb-8 text-xs text-muted-foreground`}
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to implementation services
        </Link>
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-16">
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0"
            badges={[{ label: "Starter Pro · Example delivery" }]}
            title="A delivery your team can take over."
            description="See how an agreed scope becomes a configured environment, recorded acceptance checks and a practical handover."
            actions={
              <>
                <SiteButton asChild size="lg">
                  <a href={example.downloadHref} download>
                    <Download className="size-3.5" aria-hidden="true" />
                    Download example handover
                  </a>
                </SiteButton>
                <SiteButton asChild size="lg" variant="outline">
                  <Link href="/request-a-quote">Discuss your project</Link>
                </SiteButton>
              </>
            }
          />
          <aside
            aria-labelledby="example-document-title"
            className="rounded-sm border border-border-subtle bg-surface p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <FileText
                className="size-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>Document preview · Sample</span>
            </div>
            <h2
              id="example-document-title"
              className="mt-6 text-base font-semibold"
            >
              Implementation handover
            </h2>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              {example.project}
            </p>
            <ol className="mt-5 divide-y divide-border-subtle border-y border-border-subtle text-xs">
              {stages.map((stage, index) => (
                <li key={stage.label} className="flex items-center gap-3 py-3">
                  <span
                    className="font-mono text-muted-foreground"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  {stage.label}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[11px] leading-6 text-muted-foreground">
              Editable Markdown · No code or credentials included
            </p>
          </aside>
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-6 text-muted-foreground">
          {example.disclosure}
        </p>
      </Container>
      <Container>
        <nav
          aria-label="Example delivery contents"
          className="grid grid-cols-2 gap-3 border-y border-border-subtle py-4 lg:grid-cols-4"
        >
          {stages.map(({ label, href, icon: Icon, detail }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-20 gap-3 rounded-sm p-3 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Icon
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>
                <span className="block text-xs font-medium">{label}</span>
                <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                  {detail}
                </span>
              </span>
            </Link>
          ))}
        </nav>
        <MarketingSectionShell
          id="scope"
          width="full"
          aria-labelledby="example-scope-heading"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            titleId="example-scope-heading"
            eyebrow="01 · Agreed scope"
            title="Start with a defined outcome."
            description="Two example briefs show where setup ends and a targeted adaptation begins. Your quote confirms the deliverables and acceptance criteria."
            align="left"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {example.scopes.map(({ service, scope, boundary }) => (
              <article
                id={service.id}
                key={service.id}
                aria-labelledby={`example-${service.id}`}
                className="flex min-w-0 scroll-mt-24 flex-col rounded-sm border border-border-subtle bg-surface p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-medium">{service.title}</span>
                  <span className="text-muted-foreground">
                    {service.priceLabel}
                  </span>
                </div>
                <h3
                  id={`example-${service.id}`}
                  className="mt-5 text-xl font-semibold tracking-tight"
                >
                  {service.example.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {service.example.outcome}
                </p>
                <ul className="my-6 space-y-3 border-y border-border-subtle py-5">
                  {scope.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-7">
                      <Check
                        className="mt-1.5 size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mb-5 flex-1 text-xs leading-6 text-muted-foreground">
                  {boundary}
                </p>
                <SiteButton asChild variant="outline">
                  <Link href={service.href}>{service.action}</Link>
                </SiteButton>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">
            Starting service fees. The source licence and provider costs are
            itemized separately. Final scope, price, acceptance checks and
            follow-up are agreed in writing.
          </p>
        </MarketingSectionShell>
        <MarketingSectionShell
          id="environment"
          width="full"
          aria-labelledby="example-environment-heading"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            titleId="example-environment-heading"
            eyebrow="02 · Configured environment"
            title="A preview you can run and understand."
            description="The environment record identifies what was configured, where the evidence lives and who owns it. Your accounts retain control of provider settings and credentials."
            align="left"
          />
          <div
            role="region"
            aria-label="Example environment configuration"
            tabIndex={0}
            className="overflow-x-auto rounded-sm border border-border-subtle focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-surface text-xs">
                <tr>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Area
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Configuration to document
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Evidence to retain
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {example.environment.map((row) => (
                  <tr key={row.area} className="align-top">
                    <th scope="row" className="px-5 py-4 text-xs font-medium">
                      {row.area}
                    </th>
                    <td className="px-5 py-4 text-xs leading-7 text-muted-foreground">
                      {row.configuration}
                    </td>
                    <td className="px-5 py-4 text-xs leading-7 text-muted-foreground">
                      {row.evidence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            The sample document has fields for the environment, responsible
            owner and evidence location. Secret values stay in your credential
            manager.
          </p>
        </MarketingSectionShell>
        <MarketingSectionShell
          id="acceptance"
          width="full"
          aria-labelledby="example-acceptance-heading"
          className="scroll-mt-24"
        >
          <MarketingSectionHeader
            titleId="example-acceptance-heading"
            eyebrow="03 · Verified journeys"
            title="Know what was checked, and what remains."
            description="At acceptance, each agreed journey gets an environment, date, actual outcome and evidence reference. Failed or blocked checks retain an owner and next action."
            align="left"
          />
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border-subtle bg-surface px-5 py-4 text-xs">
            <p>Sample acceptance record</p>
            <span className="text-muted-foreground">
              Not run · Results to complete at acceptance
            </span>
          </div>
          <ol className="divide-y divide-border-subtle border-y border-border-subtle">
            {example.acceptance.map((row, index) => (
              <li
                key={row.journey}
                className="grid gap-3 py-5 sm:grid-cols-[2rem_1fr] lg:grid-cols-[2rem_0.5fr_1fr_1fr]"
              >
                <span
                  className="font-mono text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <h3 className="text-sm font-medium">{row.journey}</h3>
                <p className="text-xs leading-7 text-muted-foreground sm:col-start-2 lg:col-start-auto">
                  {row.expected}
                </p>
                <p className="text-xs leading-7 text-muted-foreground sm:col-start-2 lg:col-start-auto">
                  <span className="font-medium text-foreground">
                    Evidence:{" "}
                  </span>
                  {row.evidence}
                </p>
              </li>
            ))}
          </ol>
          <Link
            href="/docs/starter-pro/release-readiness"
            className={`${linkClass} mt-5`}
          >
            Review the starter’s validation coverage
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </MarketingSectionShell>
        <MarketingSectionShell
          id="handover"
          width="full"
          aria-labelledby="example-handover-heading"
          className="scroll-mt-24"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <MarketingSectionHeader
                titleId="example-handover-heading"
                eyebrow="04 · Team handover"
                title="The context stays with your team."
                description="A practical document connects the delivered code to its configuration, validation and operating responsibilities. It also records remaining launch actions and the agreed follow-up."
                align="left"
              />
              <SiteButton asChild size="lg">
                <a href={example.downloadHref} download>
                  <Download className="size-3.5" aria-hidden="true" />
                  Download example handover
                </a>
              </SiteButton>
            </div>
            <ol className="divide-y divide-border-subtle border-y border-border-subtle">
              {example.handover.map((row) => (
                <li key={row.title} className="py-5">
                  <h3 className="text-sm font-medium">{row.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {row.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </MarketingSectionShell>
        <MarketingSectionShell
          width="full"
          aria-labelledby="example-next-heading"
        >
          <div className="flex flex-col gap-6 rounded-sm border border-border-subtle bg-surface p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2
                id="example-next-heading"
                className="font-brand text-2xl font-semibold tracking-tight"
              >
                Let’s define your delivery.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                Share the workflow and target environment. We’ll agree on a
                scope, deliverables and acceptance checks before work begins.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <SiteButton asChild size="lg">
                <Link href="/request-a-quote">Request a written proposal</Link>
              </SiteButton>
              <Link
                href="/docs/starter-pro/implementation-support"
                className={linkClass}
              >
                Scope &amp; support
              </Link>
            </div>
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">
            Explore the{" "}
            <Link
              href="/showcase/product-studio"
              className="underline underline-offset-4"
            >
              PyColors-built Product studio reference
            </Link>{" "}
            and the{" "}
            <Link
              href="/docs/starter-pro/recipes/client-tracking"
              className="underline underline-offset-4"
            >
              client tracking recipe
            </Link>{" "}
            for the reusable foundation behind this example.
          </p>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}
