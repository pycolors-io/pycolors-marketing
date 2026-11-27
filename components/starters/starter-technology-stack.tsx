import { ArrowRight, Database, Monitor, Smartphone } from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import styles from "./starter-mobile.module.css";

/** Describe the delivered source, including the Mobile backend's smaller scope. */
export function StarterTechnologyStack({
  productSlug,
}: Readonly<{ productSlug: "starter-pro-mobile" | "starter-pro-fullstack" }>) {
  const tSite = useCopy();
  const fullstack = productSlug === "starter-pro-fullstack";
  const layers = [
    ...(fullstack
      ? [
          {
            id: "web",
            label: "Web application",
            title: "Next.js + React",
            description:
              "Build your browser experience with the App Router, shared components and a responsive interface.",
            technologies: ["TypeScript", "Tailwind CSS", "PyColors UI"],
            href: "/docs/starter-pro/architecture",
            action: "Explore the Web architecture",
            icon: Monitor,
          },
        ]
      : []),
    {
      id: "native",
      label: "Native application",
      title: "React Native + Expo",
      description:
        "Build iOS and Android screens with native navigation and secure session storage.",
      technologies: ["TypeScript", "Expo Router", "Expo SecureStore"],
      href: "/docs/starter-pro/mobile#native-source",
      action: "Explore the native architecture",
      icon: Smartphone,
    },
    {
      id: "backend",
      label: fullstack ? "Shared backend" : "Included backend",
      title: "Next.js + PostgreSQL",
      description: fullstack
        ? "Connect Web and Mobile to one API, with the same accounts and data."
        : "Connect the native app to the included API, authentication and database source.",
      technologies: ["Better Auth", "oRPC", "Prisma"],
      href: "/docs/starter-pro/backend#architecture",
      action: "Explore the backend architecture",
      icon: Database,
    },
  ];

  return (
    <MarketingSectionShell
      id="technology"
      width="full"
      aria-labelledby="technology-title"
    >
      <MarketingSectionHeader
        titleId="technology-title"
        align="left"
        className={styles.bodyHeader}
        title={tSite("Your stack, from interface to data.")}
        description={tSite(
          fullstack
            ? "Next.js for the Web. React Native and Expo for iOS and Android. One backend connects them."
            : "React Native and Expo for your app. A compatible backend for authentication, data and email.",
        )}
      />
      <div className={styles.technologyGrid} data-layers={layers.length}>
        {layers.map((layer, index) => (
          <article
            key={layer.id}
            className={styles.technologyCard}
            aria-labelledby={`technology-${layer.id}-title`}
          >
            <div className={styles.technologyCardTop}>
              <span className={styles.technologyIcon} aria-hidden="true">
                <layer.icon />
              </span>
              <span className={styles.technologyIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <p className={styles.technologyLabel}>{tSite(layer.label)}</p>
              <h3 id={`technology-${layer.id}-title`}>{layer.title}</h3>
            </div>
            <p className={styles.technologyDescription}>
              {tSite(layer.description)}
            </p>
            <ul className={styles.technologyNames}>
              {layer.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <Link href={layer.href} className={styles.technologyLink}>
              {tSite(layer.action)}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
      <aside
        className={styles.technologyServices}
        aria-labelledby="technology-services-title"
      >
        <div>
          <h3 id="technology-services-title">
            {tSite("Integrations to configure")}
          </h3>
          <p>
            {tSite(
              fullstack
                ? "Connect your own database, Stripe and Resend accounts, then configure deployment."
                : "Configure your database, Resend account and deployment for your own application.",
            )}
          </p>
        </div>
        <div className={styles.technologyServiceLinks}>
          {fullstack ? (
            <Link href="/docs/starter-pro/billing">
              {tSite("Stripe · Web billing")}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
            </Link>
          ) : null}
          <Link href="/docs/starter-pro/environment-variables#email-delivery">
            {tSite(
              fullstack ? "Resend · Email" : "Resend · Authentication emails",
            )}
            <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </MarketingSectionShell>
  );
}
