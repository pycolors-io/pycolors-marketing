import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { STARTER_PRO_MOBILE_PREVIEW as mobile } from "@/lib/products/starter-pro-mobile-preview";
import styles from "./starter-source-docs.module.css";

const sources = [
  {
    slug: "starter-pro",
    name: "Starter Pro Web",
    icon: Monitor,
    stack: "Next.js · Web",
    description: "A connected foundation for your Web application.",
    guide: "Web setup guide",
    action: "Explore Starter Pro Web",
  },
  {
    slug: "starter-pro-mobile",
    name: "Starter Pro Mobile",
    icon: Smartphone,
    stack: mobile.stack,
    description: "Native iOS and Android, with a compatible backend.",
    guide: "Mobile setup guide",
    action: mobile.action,
  },
  {
    slug: "starter-pro-fullstack",
    name: "Starter Pro Fullstack",
    icon: Layers3,
    stack: mobile.bundle.stack,
    description: "Web and Mobile, built around the same accounts and data.",
    guide: "Fullstack setup guide",
    action: mobile.bundle.action,
  },
] as const;

/** Crawlable source and setup links, without initiating a purchase. */
export function StarterSourceDocs({
  headingLevel = 3,
}: Readonly<{ headingLevel?: 3 | 4 }>) {
  const tSite = useCopy();
  const Heading = headingLevel === 4 ? "h4" : "h3";

  return (
    <nav
      aria-label={tSite("Starter Pro documentation")}
      className={styles.grid}
    >
      {sources.map(
        ({ slug, name, icon: Icon, stack, description, guide, action }) => {
          const product = PRODUCT_DISPLAY[slug];
          return (
            <article key={slug} className={styles.card} data-source-doc={slug}>
              <div className={styles.stack}>
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{tSite(stack)}</span>
              </div>
              <Heading className={styles.title}>{tSite(name)}</Heading>
              <p className={styles.description}>{tSite(description)}</p>
              <div className={styles.actions}>
                <Link href={product.docsHref} className={styles.guide}>
                  {tSite(guide)}
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
                <Link href={product.href} className={styles.product}>
                  {tSite(action)}
                  <ArrowUpRight
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          );
        },
      )}
    </nav>
  );
}
