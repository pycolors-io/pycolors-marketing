import Link from "next/link";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { AppearanceControls } from "@/components/appearance-controls";
import { SiteButton } from "@/components/site-button";
import styles from "@/components/footer.module.css";
import { LanguageSwitcher } from "./language-switcher";
const groups = [
  {
    title: "Votre produit",
    links: [
      ["Starter Pro", "/fr/starters/pro"],
      ["Tarifs", "/fr/tarifs"],
      ["Demander un devis", "/fr/demande-de-devis"],
    ],
  },
  {
    title: "Explorer · en anglais",
    links: [
      ["Démonstration", "/demo"],
      ["Documentation", "/docs/starter-pro"],
      ["Exemple PyColors", "/showcase/product-studio"],
      ["Personnaliser un thème", "/tools/theme-builder"],
    ],
  },
  {
    title: "Informations · en anglais",
    links: [
      ["Licence", "/license"],
      ["Conditions de vente", "/terms"],
      ["Confidentialité", "/privacy"],
      ["Assistance achat", "/orders/support"],
    ],
  },
] as const;
export function FrenchFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <section
          className={styles.invitation}
          aria-labelledby="footer-invitation-title"
        >
          <div className={styles.invitationCopy}>
            <p className={styles.eyebrow}>Construire avec PyColors</p>
            <h2 id="footer-invitation-title">
              Un point de départ. Votre produit.
            </h2>
            <p className={styles.description}>
              Explorez le code, testez les parcours et choisissez
              l’accompagnement adapté à votre équipe.
            </p>
          </div>
          <div className={styles.actions}>
            <SiteButton asChild>
              <Link href="/fr/starters/pro">Découvrir Starter Pro</Link>
            </SiteButton>
            <SiteButton asChild variant="outline">
              <Link href="/fr/demande-de-devis">Parler de votre projet</Link>
            </SiteButton>
          </div>
        </section>
        <div className={styles.directory}>
          <div className={styles.brand}>
            <Logo href="/fr" />
            <p className={styles.brandDescription}>
              Composants React, blocs et starters SaaS. Une base cohérente pour
              avancer.
            </p>
          </div>
          <div className={styles.groups}>
            {groups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        hrefLang={href.startsWith("/fr") ? "fr" : "en"}
                        className={styles.directoryLink}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PyColors
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher locale="fr" />
            <AppearanceControls locale="fr" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
