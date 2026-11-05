import Link from "next/link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/marketing/page-hero";
import { QuoteRequestForm } from "@/components/quotes/quote-request-form";
import { FRENCH_SERVICES } from "@/lib/i18n/french-commercial";
import { frenchMetadata } from "@/lib/i18n/routes";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { quoteService } from "@/lib/quotes/quote-request";
import styles from "@/components/quotes/quote-request.module.css";
export const metadata = frenchMetadata(
  "quote",
  "Demander un devis pour votre SaaS",
  "Définissez votre projet avec PyColors : démarrage accompagné ou adaptation métier de Starter Pro. Périmètre, livrables et proposition écrite avant engagement.",
);
export default async function FrenchQuotePage({
  searchParams,
}: PageProps<"/fr/demande-de-devis">) {
  const params = await searchParams;
  return (
    <main id="content" tabIndex={-1}>
      <Container className="pb-12 pt-16 sm:pb-20 sm:pt-24">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[{ label: "Starter Pro · Accompagnement" }]}
          title="Un périmètre clair pour votre prochain produit."
          description="Présentez votre projet. Nous étudions le parcours, définissons les livrables et préparons une proposition écrite."
        />
        <div className={styles.layout}>
          <aside
            className={styles.context}
            aria-labelledby="quote-scope-heading"
          >
            <span className={styles.eyebrow}>Une base. Votre métier.</span>
            <h2 id="quote-scope-heading">
              Un accompagnement là où votre produit en a besoin.
            </h2>
            <p className={styles.intro}>
              Partez du code Starter Pro. Ajoutez une prestation de
              configuration ou une adaptation précise, avec un périmètre que
              votre équipe peut examiner.
            </p>
            <div className={styles.services}>
              {FRENCH_SERVICES.map((service) => (
                <section
                  key={service.id}
                  className={styles.service}
                  aria-labelledby={`quote-${service.id}-title`}
                >
                  <h3 id={`quote-${service.id}-title`}>{service.title}</h3>
                  <strong>{service.priceLabel}</strong>
                  <p>{service.deliverable}</p>
                </section>
              ))}
            </div>
            <ol className={styles.steps}>
              {[
                [
                  "Présenter votre besoin",
                  "Votre parcours, votre budget et le calendrier souhaité donnent un point de départ.",
                ],
                [
                  "Définir le périmètre",
                  "Nous précisons ensemble les livrables, les intégrations et les critères d’acceptation.",
                ],
                [
                  "Examiner le devis",
                  "Le prix, les responsabilités et le suivi sont convenus par écrit avant le début de la mission.",
                ],
              ].map(([title, detail], index) => (
                <li key={title}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={styles.scope}>
              Tarifs de départ. La licence source à{" "}
              {PRODUCT_DISPLAY["starter-pro"].priceLabel} et les frais des
              fournisseurs sont détaillés séparément.{" "}
              <Link href="/fr/tarifs#implementation">
                Comparer les prestations
              </Link>{" "}
              ou{" "}
              <Link
                href="/docs/starter-pro/implementation-support"
                hrefLang="en"
              >
                lire le périmètre d’assistance · en anglais
              </Link>
              .
            </p>
          </aside>
          <QuoteRequestForm
            locale="fr"
            initialService={quoteService(params.service)}
          />
        </div>
      </Container>
    </main>
  );
}
