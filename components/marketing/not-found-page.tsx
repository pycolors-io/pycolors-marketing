"use client";

import { ArrowRight, BookOpen, Layers3, LifeBuoy } from "lucide-react";

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Logomark } from "@/components/logo";
import { SiteButton as Button } from "@/components/site-button";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import styles from "./not-found-page.module.css";

const destinations = [
  {
    id: "products",
    title: "Products",
    description: "Compare source licences and find your starting point.",
    href: "/pricing",
    icon: Layers3,
  },
  {
    id: "documentation",
    title: "Documentation",
    description: "Find setup guides and answers for your project.",
    href: "/docs",
    icon: BookOpen,
  },
  {
    id: "recovery",
    title: "Recover purchase access",
    description: "Get a fresh access link using the email from your purchase.",
    href: "/orders/recover",
    icon: LifeBuoy,
  },
] as const;

export default function NotFound() {
  const tSite = useCopy();

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main id="content" tabIndex={-1} className={styles.main}>
        <Container className={styles.frame}>
          <section className={styles.hero} aria-labelledby="not-found-heading">
            <div className={styles.intro}>
              <p className={styles.eyebrow}>{tSite("404 · Page not found")}</p>
              <h1 id="not-found-heading">{tSite("This page isn’t here.")}</h1>
              <p className={styles.description}>
                {tSite(
                  "The link may have changed. These pages will help you find what you need.",
                )}
              </p>
              <div className={styles.actions}>
                <Button asChild size="lg" className={styles.primaryAction}>
                  <Link href="/">{tSite("Back to home")}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className={styles.secondaryAction}
                >
                  <Link href="/starters">{tSite("Compare starters")}</Link>
                </Button>
              </div>
            </div>
            <div className={styles.visual} aria-hidden="true">
              <span className={styles.errorCode}>404</span>
              <span className={styles.signature}>
                <Logomark />
                <span>PyColors</span>
              </span>
            </div>
          </section>

          <nav
            className={styles.destinations}
            aria-labelledby="not-found-destinations"
          >
            <h2 id="not-found-destinations">{tSite("Find your next step.")}</h2>
            <div className={styles.destinationGrid}>
              {destinations.map((destination) => {
                const Icon = destination.icon;
                return (
                  <Link
                    key={destination.href}
                    href={destination.href}
                    className={styles.destination}
                    aria-labelledby={`not-found-${destination.id}`}
                  >
                    <span className={styles.destinationIcon}>
                      <Icon aria-hidden="true" />
                    </span>
                    <span className={styles.destinationCopy}>
                      <span
                        className={styles.destinationTitle}
                        id={`not-found-${destination.id}`}
                      >
                        {tSite(destination.title)}
                      </span>
                      <span className={styles.destinationDescription}>
                        {tSite(destination.description)}
                      </span>
                    </span>
                    <ArrowRight
                      className={styles.destinationArrow}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className={styles.support}>
            <p>{tSite("Still need help?")}</p>
            <div>
              <Link href="/orders/support">{tSite("Purchase support")}</Link>
              <Link href="/contact">{tSite("Contact PyColors")}</Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
