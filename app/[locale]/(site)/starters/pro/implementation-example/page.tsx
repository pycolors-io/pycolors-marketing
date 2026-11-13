import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import type { Metadata } from "next";
import { Link } from "@/lib/i18n/navigation";
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
import styles from "@/components/starters/implementation-example.module.css";

const title = "Example delivery & handover · Starter Pro";
const description =
  "Inspect an example PyColors engagement: agreed scope, configured preview environment, acceptance records and a downloadable team handover document.";
const metadata: Metadata = {
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
  const tSite = useCopy();

  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <JsonLd
        id="implementation-example-breadcrumb"
        data={generateBreadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Starter Pro", href: "/starters/pro" },
          { label: "Example delivery", href: example.href },
        ])}
      />
      <Container className={styles.intro}>
        <MarketingBreadcrumb route="/starters/pro/implementation-example" />
        <Link
          href="/starters/pro#implementation"
          className={`${linkClass} mb-8 text-xs text-muted-foreground`}
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {tSite("Back to implementation services")}
        </Link>
        <div className={styles.heroLayout}>
          <PageHero
            className={styles.hero}
            variant="compact"
            align="left"
            contentClassName="mx-0"
            badges={[{ label: "Starter Pro · Example delivery" }]}
            title={tSite("A delivery your team can take over.")}
            description={tSite(
              "See how an agreed scope becomes a configured environment, recorded acceptance checks and a practical handover.",
            )}
            actions={
              <>
                <SiteButton asChild size="lg" className={styles.primaryAction}>
                  <a href={example.downloadHref} download>
                    <Download className="size-3.5" aria-hidden="true" />
                    {tSite("Download example handover")}
                  </a>
                </SiteButton>
                <SiteButton
                  asChild
                  size="lg"
                  variant="outline"
                  className={styles.secondaryAction}
                >
                  <Link href="/request-a-quote">
                    {tSite("Discuss your project")}
                  </Link>
                </SiteButton>
              </>
            }
          />
          <div className={styles.documentStage}>
            <aside
              aria-labelledby="example-document-title"
              className={styles.document}
            >
              <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <FileText
                  className="size-4"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>{tSite("Document preview · Sample")}</span>
              </div>
              <h2
                id="example-document-title"
                className="mt-6 text-base font-semibold"
              >
                {tSite("Implementation handover")}
              </h2>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                {tSite(example.project)}
              </p>
              <ol className="mt-5 divide-y divide-border-subtle border-y border-border-subtle text-xs">
                {stages.map((stage, index) => (
                  <li
                    key={stage.label}
                    className="flex items-center gap-3 py-3"
                  >
                    <span
                      className="font-mono text-muted-foreground"
                      aria-hidden="true"
                    >
                      0{tSite(index + 1)}
                    </span>
                    {tSite(stage.label)}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[11px] leading-6 text-muted-foreground">
                {tSite("Editable Markdown · No code or credentials included")}
              </p>
            </aside>
          </div>
        </div>
        <p className={styles.disclosure}>{tSite(example.disclosure)}</p>
      </Container>
      <Container>
        <nav
          aria-label={tSite("Example delivery contents")}
          className={styles.contents}
        >
          {stages.map(({ label, href, icon: Icon, detail }) => (
            <Link key={href} href={href} className={styles.contentsLink}>
              <Icon
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>
                <span className="block text-xs font-medium">
                  {tSite(label)}
                </span>
                <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                  {tSite(detail)}
                </span>
              </span>
            </Link>
          ))}
        </nav>
        <MarketingSectionShell
          id="scope"
          width="full"
          aria-labelledby="example-scope-heading"
          className={styles.section}
        >
          <MarketingSectionHeader
            titleId="example-scope-heading"
            eyebrow={tSite("01 · Agreed scope")}
            title={tSite("Start with a defined outcome.")}
            description={tSite(
              "Two example briefs show where setup ends and a targeted adaptation begins. Your quote confirms the deliverables and acceptance criteria.",
            )}
            align="left"
          />
          <div className={styles.scopeGrid}>
            {example.scopes.map(({ service, scope, boundary }) => (
              <article
                id={service.id}
                key={service.id}
                aria-labelledby={`example-${service.id}`}
                className={styles.scopeCard}
              >
                <div className={styles.scopeMeta}>
                  <span className="font-medium">{tSite(service.title)}</span>
                  <span className={styles.scopePrice}>
                    {tSite(service.priceLabel)}
                  </span>
                </div>
                <h3 id={`example-${service.id}`} className={styles.scopeTitle}>
                  {tSite(service.example.title)}
                </h3>
                <p className={styles.scopeOutcome}>
                  {tSite(service.example.outcome)}
                </p>
                <ul className={styles.scopeList}>
                  {scope.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-7">
                      <Check
                        className="mt-1.5 size-3.5 shrink-0 text-muted-foreground"
                        aria-hidden="true"
                      />
                      {tSite(item)}
                    </li>
                  ))}
                </ul>
                <p className={styles.scopeBoundary}>{tSite(boundary)}</p>
                <SiteButton asChild className={styles.primaryAction}>
                  <Link href={service.href}>{tSite(service.action)}</Link>
                </SiteButton>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">
            {tSite(
              "Starting service fees. The source licence and provider costs are itemized separately. Final scope, price, acceptance checks and follow-up are agreed in writing.",
            )}
          </p>
        </MarketingSectionShell>
        <MarketingSectionShell
          id="environment"
          width="full"
          aria-labelledby="example-environment-heading"
          className={styles.section}
        >
          <MarketingSectionHeader
            titleId="example-environment-heading"
            eyebrow={tSite("02 · Configured environment")}
            title={tSite("A preview you can run and understand.")}
            description={tSite(
              "The environment record identifies what was configured, where the evidence lives and who owns it. Your accounts retain control of provider settings and credentials.",
            )}
            align="left"
          />
          <div
            role="region"
            aria-label={tSite("Example environment configuration")}
            tabIndex={0}
            className={styles.environmentRecord}
          >
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-surface text-xs">
                <tr>
                  <th scope="col" className="px-5 py-4 font-medium">
                    {tSite("Area")}
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    {tSite("Configuration to document")}
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    {tSite("Evidence to retain")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {example.environment.map((row) => (
                  <tr key={row.area} className="align-top">
                    <th scope="row" className="px-5 py-4 text-xs font-medium">
                      {tSite(row.area)}
                    </th>
                    <td className="px-5 py-4 text-xs leading-7 text-muted-foreground">
                      {tSite(row.configuration)}
                    </td>
                    <td className="px-5 py-4 text-xs leading-7 text-muted-foreground">
                      {tSite(row.evidence)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            {tSite(
              "The sample document has fields for the environment, responsible owner and evidence location. Secret values stay in your credential manager.",
            )}
          </p>
        </MarketingSectionShell>
        <MarketingSectionShell
          id="acceptance"
          width="full"
          aria-labelledby="example-acceptance-heading"
          className={styles.section}
        >
          <MarketingSectionHeader
            titleId="example-acceptance-heading"
            eyebrow={tSite("03 · Verified journeys")}
            title={tSite("Know what was checked, and what remains.")}
            description={tSite(
              "At acceptance, each agreed journey gets an environment, date, actual outcome and evidence reference. Failed or blocked checks retain an owner and next action.",
            )}
            align="left"
          />
          <div className={styles.acceptanceStatus}>
            <p>{tSite("Sample acceptance record")}</p>
            <span className={styles.acceptanceState}>
              {tSite("Not run · Results to complete at acceptance")}
            </span>
          </div>
          <ol className={styles.acceptanceList}>
            {example.acceptance.map((row, index) => (
              <li key={row.journey} className={styles.acceptanceRow}>
                <span
                  className="font-mono text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  0{tSite(index + 1)}
                </span>
                <h3 className="text-sm font-medium">{tSite(row.journey)}</h3>
                <p className="text-xs leading-7 text-muted-foreground sm:col-start-2 lg:col-start-auto">
                  {tSite(row.expected)}
                </p>
                <p className="text-xs leading-7 text-muted-foreground sm:col-start-2 lg:col-start-auto">
                  <span className="font-medium text-foreground">
                    {tSite("Evidence:")}
                    {tSite(" ")}
                  </span>
                  {tSite(row.evidence)}
                </p>
              </li>
            ))}
          </ol>
          <Link
            href="/docs/starter-pro/release-readiness"
            className={`${linkClass} mt-5`}
          >
            {tSite("Review the starter’s validation coverage")}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </MarketingSectionShell>
        <MarketingSectionShell
          id="handover"
          width="full"
          aria-labelledby="example-handover-heading"
          className={styles.section}
        >
          <div className={styles.handoverLayout}>
            <div>
              <MarketingSectionHeader
                titleId="example-handover-heading"
                eyebrow={tSite("04 · Team handover")}
                title={tSite("The context stays with your team.")}
                description={tSite(
                  "A practical document connects the delivered code to its configuration, validation and operating responsibilities. It also records remaining launch actions and the agreed follow-up.",
                )}
                align="left"
              />
              <SiteButton asChild size="lg" className={styles.primaryAction}>
                <a href={example.downloadHref} download>
                  <Download className="size-3.5" aria-hidden="true" />
                  {tSite("Download example handover")}
                </a>
              </SiteButton>
            </div>
            <ol className={styles.handoverList}>
              {example.handover.map((row) => (
                <li key={row.title} className="py-5">
                  <h3 className="text-sm font-medium">{tSite(row.title)}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {tSite(row.detail)}
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
          <div className={styles.next}>
            <div>
              <h2 id="example-next-heading" className={styles.nextTitle}>
                {tSite("Let’s define your delivery.")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                {tSite(
                  "Share the workflow and target environment. We’ll agree on a scope, deliverables and acceptance checks before work begins.",
                )}
              </p>
            </div>
            <div className={styles.nextActions}>
              <SiteButton asChild size="lg" className={styles.primaryAction}>
                <Link href="/request-a-quote">
                  {tSite("Request a written proposal")}
                </Link>
              </SiteButton>
              <Link
                href="/docs/starter-pro/implementation-support"
                className={linkClass}
              >
                {tSite("Scope & support")}
              </Link>
            </div>
          </div>
          <p className="mt-5 text-xs leading-6 text-muted-foreground">
            {tSite("Explore the")}
            {tSite(" ")}
            <Link
              href="/showcase/product-studio"
              className="underline underline-offset-4"
            >
              {tSite("PyColors-built Product studio reference")}
            </Link>
            {tSite(" ")}
            {tSite("and the")}
            {tSite(" ")}
            <Link
              href="/docs/starter-pro/recipes/client-tracking"
              className="underline underline-offset-4"
            >
              {tSite("client tracking recipe")}
            </Link>
            {tSite(" ")}
            {tSite("for the reusable foundation behind this example.")}
          </p>
        </MarketingSectionShell>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(
    metadata,
    "/starters/pro/implementation-example",
    locale,
  );
}
