import { localizePageMetadata } from "@/lib/i18n/metadata";
import { getCopy } from "@/lib/i18n/server-copy";
import { localizedAlternates } from "@/lib/i18n/routes";
import type { Metadata } from "next";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { QuoteRequestForm } from "@/components/quotes/quote-request-form";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";
import { quoteService } from "@/lib/quotes/quote-request";
import styles from "@/components/quotes/quote-request.module.css";

const description =
  "Discuss Starter Pro setup or a targeted business adaptation. Share your workflow and receive a scope-led proposal from PyColors.";
const metadata: Metadata = {
  title: "Request a quote · Starter Pro",
  description,
  alternates: {
    canonical: "/request-a-quote",
    languages: localizedAlternates("quote", "en").languages,
  },
  openGraph: {
    locale: "en_US",
    alternateLocale: "fr_FR",
    title: "Request a quote · Starter Pro",
    description,
    url: "/request-a-quote",
    type: "website",
    images: ["/seo/og-main.png"],
  },
};

export default async function QuoteRequestPage({
  searchParams,
}: PageProps<"/[locale]/request-a-quote">) {
  const tSite = await getCopy();

  const params = await searchParams;
  const initialService = quoteService(params.service);
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <Container className="pb-12 pt-24 sm:pb-20 sm:pt-28">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[{ label: "Starter Pro · Implementation" }]}
          title={tSite("A clear scope for your next product.")}
          description={tSite(
            "Tell us what you’re building. We’ll review your workflow, define the deliverables and prepare a written proposal.",
          )}
        />
        <div className={styles.layout}>
          <aside
            className={styles.context}
            aria-labelledby="quote-scope-heading"
          >
            <span className={styles.eyebrow}>
              {tSite("One foundation. Your workflow.")}
            </span>
            <h2 id="quote-scope-heading">
              {tSite("Help where it moves your product forward.")}
            </h2>
            <p className={styles.intro}>
              {tSite(
                "Start with the complete Starter Pro source. Add an engagement for your environment or a specific business workflow, with a scope your team can review.",
              )}
            </p>
            <div className={styles.services}>
              {Object.values(STARTER_PRO_SERVICES).map((service) => (
                <section
                  className={styles.service}
                  key={service.id}
                  aria-labelledby={`quote-${service.id}-title`}
                >
                  <h3 id={`quote-${service.id}-title`}>
                    {tSite(service.title)}
                  </h3>
                  <strong>{tSite(service.priceLabel)}</strong>
                  <p>{tSite(service.deliverable)}</p>
                  <Link
                    href={service.example.href}
                    className="mt-2 inline-flex min-h-11 items-center text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {tSite("View example delivery")}
                  </Link>
                </section>
              ))}
            </div>
            <ol className={styles.steps}>
              {[
                [
                  "Share the essentials",
                  "Your workflow, budget and desired timeline give us a starting point.",
                ],
                [
                  "Define the scope",
                  "We clarify deliverables, integrations and acceptance checks with you.",
                ],
                [
                  "Review a written quote",
                  "Agree on the price, responsibilities and follow-up before work begins.",
                ],
              ].map(([title, detail], index) => (
                <li key={title}>
                  <span aria-hidden="true">0{tSite(index + 1)}</span>
                  <div>
                    <h3>{tSite(title)}</h3>
                    <p>{tSite(detail)}</p>
                  </div>
                </li>
              ))}
            </ol>
            <section
              className={styles.proposal}
              aria-labelledby="proposal-outline-heading"
            >
              <h3 id="proposal-outline-heading">
                {tSite("Your quote, in writing.")}
              </h3>
              <p>
                {tSite(
                  "A reviewable scope with deliverables, milestones, acceptance criteria, responsibilities and an itemized budget.",
                )}
              </p>
              <a
                href={tSite.href("/request-a-quote/template")}
                download
                className="inline-flex min-h-11 items-center text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {tSite("Download the editable proposal template")}
              </a>
              <p className={styles.help}>
                {tSite(
                  "Blank example to complete for your engagement. Prices and commitments are agreed before work begins.",
                )}
              </p>
            </section>
            <p className={styles.scope}>
              {tSite("Starting service fees. The")}
              {tSite(" ")}
              {tSite(PRODUCT_DISPLAY["starter-pro"].priceLabel)}{" "}
              {tSite(
                " source licence and provider costs are itemized separately. Review",
              )}
              {tSite(" ")}
              <Link href="/docs/starter-pro/implementation-support">
                {tSite("scope and support")}
              </Link>
              {tSite(" ")}
              {tSite("or")}
              {tSite(" ")}
              <Link href="/pricing#implementation">
                {tSite("compare the engagements")}
              </Link>
              .
            </p>
          </aside>
          <QuoteRequestForm initialService={initialService} />
        </div>
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
  return localizePageMetadata(metadata, "/request-a-quote", locale);
}
