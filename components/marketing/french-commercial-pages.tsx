import type { ReactNode } from "react";
import Link from "next/link";
import {
  Blocks,
  Code2,
  Database,
  Layers3,
  LayoutTemplate,
  LockKeyhole,
  Mail,
  Palette,
  Rocket,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/container";
import { SiteButton } from "@/components/site-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingFaq } from "@/components/marketing/faq";
import { ProductPreviewMedia } from "@/components/marketing/product-preview-media";
import { ProDemoLink } from "@/components/marketing/pro-demo-link";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { BuyProductButton } from "@/components/pricing/buy-product-button";
import { JsonLd, generateProductOfferJsonLd } from "@/components/seo/json-ld";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { FRENCH_SERVICES } from "@/lib/i18n/french-commercial";

const price = PRODUCT_DISPLAY["starter-pro"].priceLabel;
const card =
  "flex h-full min-w-0 flex-col rounded-md border border-border-subtle bg-card p-6 sm:p-7";
const textLink =
  "inline-flex min-h-11 items-center rounded-sm text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <MarketingSectionShell id={id} aria-labelledby={`${id}-title`}>
      <Container>
        <MarketingSectionHeader
          titleId={`${id}-title`}
          title={title}
          description={description}
          align="left"
        />
        <div className="mt-8">{children}</div>
      </Container>
    </MarketingSectionShell>
  );
}
function FeatureGrid({
  items,
}: {
  items: readonly { icon: LucideIcon; title: string; description: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon: Icon, title, description }) => (
        <article key={title} className={card}>
          <Icon
            className="size-5 text-primary"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h3 className="mt-5 text-base font-medium">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </article>
      ))}
    </div>
  );
}
export function FrenchImplementation() {
  return (
    <Section
      id="implementation"
      title="Un accompagnement défini autour de votre produit."
      description="Le code est votre point de départ. Une prestation distincte peut vous aider à configurer votre environnement ou à adapter un parcours métier."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {FRENCH_SERVICES.map((service) => (
          <article key={service.id} className={card}>
            <p className="text-xs font-medium text-muted-foreground">
              Prestation sur devis
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">
              {service.title}
            </h3>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {service.priceLabel}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {service.description}
            </p>
            <ul className="my-6 space-y-3 text-sm leading-6">
              {service.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1 shrink-0 bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mb-6 border-t border-border-subtle pt-4 text-sm leading-7 text-muted-foreground">
              <strong className="font-medium text-foreground">
                Livrable :{" "}
              </strong>
              {service.deliverable}
            </p>
            <SiteButton asChild variant="outline" className="mt-auto w-full">
              <Link href={service.href}>Discuter du périmètre</Link>
            </SiteButton>
          </article>
        ))}
      </div>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground">
        Tarifs de départ. La licence source à {price} et les frais des services
        tiers sont détaillés séparément. Le devis précise le périmètre, les
        critères d’acceptation, les responsabilités et le suivi. Hébergement,
        exploitation continue et migrations de données existantes sont chiffrés
        séparément. Les missions plus importantes peuvent dépasser 10 000 €.
      </p>
      <a
        href="/starters/pro/implementation-example"
        hrefLang="en"
        className={textLink}
      >
        Consulter un exemple de livraison · en anglais
      </a>
    </Section>
  );
}
function BuyerFaq() {
  return (
    <MarketingSectionShell aria-labelledby="questions">
      <Container>
        <MarketingFaq
          titleId="questions"
          title="Les réponses avant de vous lancer."
          eyebrow="Questions fréquentes"
          items={[
            {
              question: "Que comprend la licence Starter Pro ?",
              answer:
                "Le code source du starter, ses guides et ses scripts de validation. Une licence couvre une personne ou une entité juridique et un nombre illimité de produits finaux. Les membres de l’organisation licenciée peuvent travailler sur le code. Un client qui accède au code source du starter doit disposer de sa propre licence.",
              links: [
                { href: "/license", label: "Lire la licence · en anglais" },
              ],
            },
            {
              question: "Y a-t-il un abonnement PyColors ?",
              answer:
                "La licence est un achat unique. Les mises à jour futures sont incluses sans coût supplémentaire pour les acheteurs existants, sous réserve du maintien de la disponibilité du produit. Votre hébergement et vos fournisseurs peuvent facturer leur propre usage.",
            },
            {
              question:
                "Le starter est-il prêt à être déployé sans configuration ?",
              answer:
                "Vous configurez la base de données, l’authentification, les emails, les prix Stripe et vos variables d’environnement. Les guides et contrôles fournis accompagnent cette étape. Les offres d’accompagnement sont distinctes de la licence.",
            },
            {
              question: "Quelle assistance est incluse ?",
              answer:
                "Une aide par email pour l’accès à l’achat, la récupération, le périmètre du produit et les questions d’installation, dans la mesure du raisonnable. Aucun délai de réponse garanti n’est annoncé. Développement spécifique, déploiement, conseil et exploitation continue font l’objet d’un accord distinct.",
            },
            {
              question: "La documentation est-elle en français ?",
              answer:
                "Le parcours commercial est disponible en français. La documentation technique reste en anglais et les liens correspondants l’indiquent. Le Starter Pro propose des parcours d’interface en français et en anglais.",
            },
          ]}
        />
      </Container>
    </MarketingSectionShell>
  );
}
export function FrenchHome() {
  return (
    <main id="content" tabIndex={-1}>
      <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[{ label: "React · Next.js · SaaS" }]}
          title="Construisez votre SaaS sur une base solide."
          description="Des composants React aux parcours d’authentification et de facturation : choisissez les fondations adaptées à votre produit, puis faites-les évoluer à votre image."
          actions={
            <>
              <SiteButton asChild size="lg">
                <Link href="/fr/starters/pro">Découvrir Starter Pro</Link>
              </SiteButton>
              <SiteButton asChild variant="outline" size="lg">
                <Link href="/fr/tarifs">Comparer les offres</Link>
              </SiteButton>
            </>
          }
        />
      </Container>
      <Section
        id="point-de-depart"
        title="Le bon point de départ pour votre projet."
        description="Un écosystème cohérent : composez une interface, validez une expérience, puis connectez votre application."
      >
        <FeatureGrid
          items={[
            {
              icon: LayoutTemplate,
              title: "Templates",
              description:
                "Présentez votre offre avec une landing page dont vous pouvez modifier le code.",
            },
            {
              icon: Code2,
              title: "PyColors UI",
              description:
                "Composez vos écrans React avec des primitives publiques et des tokens sémantiques.",
            },
            {
              icon: Blocks,
              title: "Blocs réutilisables",
              description:
                "Inspectez et copiez des sections d’interface pour les adapter à votre application.",
            },
            {
              icon: Layers3,
              title: "Starter Free",
              description:
                "Explorez une interface SaaS avec des parcours et des données simulés, avant de connecter un backend.",
            },
            {
              icon: Rocket,
              title: "Starter Pro",
              description:
                "Partez du code Next.js avec Auth.js, PostgreSQL, Prisma, Stripe et les emails transactionnels.",
            },
            {
              icon: Workflow,
              title: "Accompagnement",
              description:
                "Définissez une prestation de configuration ou une adaptation métier avec des livrables écrits.",
            },
          ]}
        />
        <div className="mt-5 flex flex-wrap gap-x-6">
          <Link href="/fr/tarifs" className={textLink}>
            Comparer les produits
          </Link>
          <a href="/ui" hrefLang="en" className={textLink}>
            Explorer les composants · en anglais
          </a>
        </div>
      </Section>
      <Section
        id="starter-pro"
        title="De la première connexion au travail en équipe."
        description="Un starter que vous pouvez examiner, exécuter et adapter à votre produit."
      >
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <ProductPreviewMedia
            product="starter-pro"
            alt="Aperçu du tableau de bord Starter Pro, interface de démonstration en anglais"
          />
          <div>
            <p className="text-xs font-medium text-primary">
              PyColors Starter Pro
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Les fondations SaaS, reliées dans un même projet.
            </h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Authentification, espaces de travail, invitations, projets avec
              tâches et commentaires, facturation et préférences. Le code
              comprend aussi les guides acheteur et les contrôles de validation
              du ZIP.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SiteButton asChild>
                <Link href="/fr/starters/pro">Voir ce qui est inclus</Link>
              </SiteButton>
              <ProDemoLink destination="/demo">
                Essayer la démo · EN
              </ProDemoLink>
            </div>
          </div>
        </div>
      </Section>
      <Section
        id="personnalisation"
        title="Votre marque. Votre interface."
        description="Personnalisez les couleurs, les polices, les rayons et la présentation depuis Customize. Le Theme Builder permet aussi de prévisualiser et d’exporter des tokens."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            "Palettes et thèmes clair / sombre",
            "Typographie et échelle de l’interface",
            "Navigation et présentation de la sidebar",
          ].map((label) => (
            <div key={label} className={card}>
              <Palette className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-medium">{label}</h3>
            </div>
          ))}
        </div>
        <a href="/tools/theme-builder" hrefLang="en" className={textLink}>
          Explorer le Theme Builder · en anglais
        </a>
      </Section>
      <FrenchImplementation />
      <BuyerFaq />
    </main>
  );
}
export function FrenchStarterPro() {
  return (
    <main id="content" tabIndex={-1}>
      <JsonLd
        id="starter-pro-fr-offer"
        data={generateProductOfferJsonLd({
          product: PRODUCT_DISPLAY["starter-pro"],
          canonicalPath: "/fr/starters/pro",
          description:
            "Code source Next.js pour un SaaS avec authentification, espaces de travail, projets, facturation Stripe et guides de configuration.",
        })}
      />
      <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[
            { label: "PyColors Starter Pro" },
            { label: "Code source · Achat unique" },
          ]}
          title="Votre SaaS Next.js, avec les fondations déjà reliées."
          description="Auth.js, PostgreSQL, Prisma, Stripe et emails transactionnels. Commencez avec des parcours cohérents, puis concentrez votre travail sur votre métier."
          actions={
            <>
              <BuyStarterProButton
                locale="fr"
                fullWidth={false}
                label={`Acheter Starter Pro — ${price}`}
                loadingLabel="Ouverture du paiement sécurisé…"
              />
              <ProDemoLink destination="/demo">
                Essayer la démo · EN
              </ProDemoLink>
            </>
          }
          extra={
            <p className="text-xs leading-6 text-muted-foreground">
              Licence source à {price}. Configuration des fournisseurs et frais
              d’usage distincts.{" "}
              <Link href="/fr/tarifs" className="underline underline-offset-4">
                Voir les conditions et l’accompagnement.
              </Link>
            </p>
          }
        />
        <div className="mt-10">
          <ProductPreviewMedia
            product="starter-pro"
            priority
            sizes="95vw"
            alt="Interface Starter Pro : tableau de bord et navigation, capture de démonstration en anglais"
          />
        </div>
      </Container>
      <Section
        id="inclus"
        title="Un socle applicatif que votre équipe peut reprendre."
        description="Les parcours fonctionnent ensemble ; vous conservez le code et la responsabilité de votre configuration."
      >
        <FeatureGrid
          items={[
            {
              icon: LockKeyhole,
              title: "Connexion et compte",
              description:
                "Authentification, récupération de mot de passe, profil éditable et gestion des sessions.",
            },
            {
              icon: Users,
              title: "Espaces de travail et équipe",
              description:
                "Création d’espaces, invitations, rôles, permissions et onboarding avec progression sauvegardée.",
            },
            {
              icon: Workflow,
              title: "Un exemple métier complet",
              description:
                "Projets, responsables, statuts, archivage, tâches, échéances et commentaires pour construire vos propres parcours.",
            },
            {
              icon: Database,
              title: "Facturation et données",
              description:
                "Abonnements Stripe rattachés au compte utilisateur. Quotas configurables, appliqués côté serveur lorsqu’ils sont définis ; sans plafond par défaut.",
            },
            {
              icon: Mail,
              title: "Emails et notifications",
              description:
                "Emails transactionnels, notifications internes, préférences et historique d’activité.",
            },
            {
              icon: Palette,
              title: "Votre identité visuelle",
              description:
                "Couleurs, polices, rayons, échelle de l’interface et variantes de navigation. Parcours en français et en anglais.",
            },
          ]}
        />
      </Section>
      <Section
        id="livraison"
        title="Du code livré aux premiers parcours vérifiés."
        description="Le ZIP acheteur est accompagné de guides, de conventions pour les assistants IA et de scripts de vérification."
      >
        <ol className="grid gap-4 lg:grid-cols-3">
          {[
            [
              "Installer",
              "Extrayez l’archive hors du monorepo, installez les dépendances et appliquez les migrations à une base vide.",
            ],
            [
              "Configurer",
              "Renseignez votre marque et vos fournisseurs : base de données, authentification, emails et prix Stripe.",
            ],
            [
              "Vérifier",
              "Compilez l’application et testez le compte, l’espace de travail et le premier projet. Utilisez les diagnostics et guides d’exploitation fournis.",
            ],
          ].map(([title, description], index) => (
            <li className={card} key={title}>
              <span className="font-mono text-xs text-primary">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-lg font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-x-6">
          <Link href="/docs/starter-pro" hrefLang="en" className={textLink}>
            Lire le guide technique · en anglais
          </Link>
          <Link href="/fr/demande-de-devis" className={textLink}>
            Se faire accompagner
          </Link>
        </div>
      </Section>
      <FrenchImplementation />
      <BuyerFaq />
    </main>
  );
}
export function FrenchPricing() {
  return (
    <main id="content" tabIndex={-1}>
      <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          badges={[{ label: "Tarifs PyColors" }]}
          title="Choisissez votre point de départ."
          description="Un template pour présenter votre offre, un starter gratuit pour explorer l’expérience, ou le code Starter Pro pour connecter les fondations de votre SaaS."
        />
      </Container>
      <Section id="offres" title="Le code adapté à votre prochaine étape.">
        <div className="grid gap-4 lg:grid-cols-3">
          <article className={card}>
            <p className="text-xs text-muted-foreground">Landing page</p>
            <h3 className="mt-3 text-xl font-semibold">NA-AI Landing</h3>
            <p className="mt-5 text-3xl font-semibold tracking-tight">
              {PRODUCT_DISPLAY["na-ai-landing"].priceLabel}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Achat unique</p>
            <p className="my-6 text-sm leading-7 text-muted-foreground">
              Un template Next.js pour présenter un produit IA ou SaaS. Code
              modifiable ; authentification et backend applicatif à ajouter
              selon vos besoins.
            </p>
            <div className="mt-auto space-y-3">
              <BuyProductButton
                productSlug="na-ai-landing"
                locale="fr"
                label="Acheter le template"
                loadingLabel="Ouverture du paiement sécurisé…"
              />
              <a
                href="/templates/na-ai-landing"
                hrefLang="en"
                className={textLink}
              >
                Voir le template · en anglais
              </a>
            </div>
          </article>
          <article className={card}>
            <p className="text-xs text-muted-foreground">Expérience SaaS</p>
            <h3 className="mt-3 text-xl font-semibold">Starter Free</h3>
            <p className="mt-5 text-3xl font-semibold tracking-tight">
              Gratuit
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Frontend avec données simulées
            </p>
            <p className="my-6 text-sm leading-7 text-muted-foreground">
              Explorez les écrans SaaS, la navigation, les formulaires et les
              parcours simulés. Une base pour valider votre interface avant de
              connecter vos services.
            </p>
            <div className="mt-auto space-y-3">
              <SiteButton
                asChild
                variant="outline"
                size="lg"
                className="w-full"
              >
                <a href="/starters/free" hrefLang="en">
                  Découvrir Starter Free · EN
                </a>
              </SiteButton>
              <a
                href="https://starter-demo.pycolors.io"
                hrefLang="en"
                className={textLink}
              >
                Essayer l’interface · en anglais
              </a>
            </div>
          </article>
          <article className={`${card} border-primary/30 bg-primary/5`}>
            <p className="text-xs font-medium text-primary">
              Fondations SaaS connectées
            </p>
            <h3 className="mt-3 text-xl font-semibold">Starter Pro</h3>
            <p className="mt-5 text-3xl font-semibold tracking-tight">
              {price}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Achat unique · Code source
            </p>
            <p className="my-6 text-sm leading-7 text-muted-foreground">
              Auth.js, Stripe, PostgreSQL, Prisma, emails, équipes et projets.
              Guides acheteur, conventions pour assistants IA et scripts de
              validation inclus.
            </p>
            <div className="mt-auto space-y-3">
              <BuyStarterProButton
                locale="fr"
                label="Acheter Starter Pro"
                loadingLabel="Ouverture du paiement sécurisé…"
              />
              <Link href="/fr/starters/pro" className={textLink}>
                Voir tout ce qui est inclus
              </Link>
            </div>
          </article>
        </div>
        <p className="mt-5 text-xs leading-6 text-muted-foreground">
          Prix des licences en euros. Les taxes applicables et le montant final
          sont précisés au paiement. Hébergement, services tiers et prestations
          d’accompagnement distincts.
        </p>
      </Section>
      <Section id="comparaison" title="Comparer les fonctionnalités.">
        <div
          className="overflow-x-auto rounded-md border border-border-subtle focus-visible:outline-2 focus-visible:outline-ring"
          role="region"
          aria-label="Comparaison des produits"
          tabIndex={0}
        >
          <table className="w-full min-w-160 text-left text-sm">
            <caption className="sr-only">
              Fonctionnalités de NA-AI Landing, Starter Free et Starter Pro
            </caption>
            <thead className="bg-surface-muted">
              <tr>
                {[
                  "Fonctionnalité",
                  "NA-AI Landing",
                  "Starter Free",
                  "Starter Pro",
                ].map((title) => (
                  <th
                    scope="col"
                    key={title}
                    className="px-5 py-4 font-medium last:bg-primary/5"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Code source modifiable", "Inclus", "Inclus", "Inclus"],
                [
                  "Interface SaaS",
                  "Landing page",
                  "Parcours simulés",
                  "Parcours connectés",
                ],
                [
                  "Authentification et base de données",
                  "À connecter",
                  "Simulées",
                  "Auth.js, Prisma, PostgreSQL",
                ],
                [
                  "Facturation",
                  "À connecter",
                  "Simulée",
                  "Stripe, par compte utilisateur",
                ],
                [
                  "Espaces et invitations",
                  "À ajouter",
                  "Interface simulée",
                  "Inclus",
                ],
                [
                  "Projets, tâches et commentaires",
                  "À ajouter",
                  "Selon les exemples",
                  "Inclus",
                ],
                [
                  "Documentation technique",
                  "En anglais",
                  "En anglais",
                  "En anglais",
                ],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-border-subtle">
                  {row.map((value, index) =>
                    index === 0 ? (
                      <th
                        scope="row"
                        className="px-5 py-4 font-medium"
                        key={index}
                      >
                        {value}
                      </th>
                    ) : (
                      <td
                        className="px-5 py-4 text-muted-foreground last:bg-primary/5 last:text-foreground"
                        key={index}
                      >
                        {value}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section id="licence" title="Une licence claire. Des coûts identifiés.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="font-medium">Utilisation et mises à jour</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Une licence Starter Pro couvre une personne ou une entité
              juridique et un nombre illimité de produits finaux. Les membres de
              l’organisation licenciée peuvent utiliser le code. Un client doit
              disposer de sa propre licence pour accéder au code source du
              starter. Les mises à jour futures sont incluses, sous réserve du
              maintien de la disponibilité du produit.
            </p>
            <a href="/license" hrefLang="en" className={textLink}>
              Lire la licence complète · en anglais
            </a>
          </div>
          <div>
            <h3 className="font-medium">Assistance et conditions d’achat</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              L’assistance par email couvre l’accès à l’achat, la récupération
              et les questions de périmètre et d’installation, dans la mesure du
              raisonnable. Aucun délai de réponse garanti. Les droits
              applicables aux contenus numériques et les conditions de
              rétractation sont précisés dans les conditions de vente.
            </p>
            <a href="/terms" hrefLang="en" className={textLink}>
              Lire les conditions de vente · en anglais
            </a>
          </div>
        </div>
      </Section>
      <FrenchImplementation />
      <BuyerFaq />
    </main>
  );
}
