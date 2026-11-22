import {
  ArrowRight,
  Check,
  Database,
  FolderCode,
  Monitor,
  Smartphone,
} from "lucide-react";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import styles from "./starter-mobile.module.css";

type PlatformProps = Readonly<{
  productSlug: "starter-pro-mobile" | "starter-pro-fullstack";
}>;

const nativeFeatures = [
  "Email/password sign-in and session restoration.",
  "Workspace selection, project creation and task lists.",
  "English and French, with device presentation preferences.",
] as const;

/** Product-specific proof, without presenting concept artwork as a running app. */
export function StarterPlatformOverview({ productSlug }: PlatformProps) {
  const tSite = useCopy();
  const fullstack = productSlug === "starter-pro-fullstack";
  const capabilities = [
    ...(fullstack
      ? [
          {
            id: "web",
            label: "Web application",
            title: "Your product, in the browser.",
            description:
              "The complete Starter Pro Web source, with a responsive interface built on PyColors UI.",
            features: [
              "Dashboard, workspaces and project interfaces.",
              "Authentication and account administration.",
              "Web billing interfaces and Stripe integration.",
            ],
            icon: Monitor,
          },
        ]
      : []),
    {
      id: "native",
      label: "Native application",
      title: "A native path into your product.",
      description:
        "An independent Expo application for iOS and Android, connected to the included backend.",
      features: nativeFeatures,
      icon: Smartphone,
    },
    {
      id: "backend",
      label: fullstack ? "Shared backend" : "Included backend",
      title: fullstack
        ? "The same accounts. The same data."
        : "The backend comes with it.",
      description: fullstack
        ? "Both interfaces connect to one Web backend. Keep your accounts, workspace permissions and data together."
        : "API, authentication and database source for the supported native journeys. No separate Web purchase is required.",
      features: fullstack
        ? [
            "One backend under web/app/api.",
            "Workspace permissions enforced by the server.",
            "A typed oRPC contract for both clients.",
          ]
        : [
            "Better Auth sessions and typed API endpoints.",
            "PostgreSQL schema and Prisma migrations.",
            "Registration, recovery and authentication emails.",
          ],
      icon: Database,
    },
  ];

  return (
    <MarketingSectionShell
      id="included"
      width="full"
      aria-labelledby="included-title"
    >
      <MarketingSectionHeader
        titleId="included-title"
        eyebrow={tSite("Inside the source")}
        title={tSite(
          fullstack
            ? "Two experiences. One product foundation."
            : "A native foundation. The backend included.",
        )}
        description={tSite(
          fullstack
            ? "Build for the browser and for native devices from a source package designed around one backend."
            : "Start with the app and the server source it connects to. Shape the experience around your own product.",
        )}
      />
      <div className={styles.scopeGrid} data-layers={capabilities.length}>
        {capabilities.map(
          ({ id, label, title, description, features, icon: Icon }) => (
            <article
              key={id}
              className={styles.scopeCard}
              aria-labelledby={`scope-${id}-title`}
            >
              <div className={styles.scopeCardHeading}>
                <span className={styles.scopeIcon} aria-hidden="true">
                  <Icon />
                </span>
                <p className={styles.cardEyebrow}>{tSite(label)}</p>
              </div>
              <h3 id={`scope-${id}-title`}>{tSite(title)}</h3>
              <p className={styles.cardDescription}>{tSite(description)}</p>
              <ul className={styles.scopeFeatures} role="list">
                {features.map((feature) => (
                  <li key={feature}>
                    <Check aria-hidden="true" />
                    <span>{tSite(feature)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ),
        )}
      </div>
      <p className={styles.scopeNote}>
        {tSite(
          "Native registration and password recovery open in a browser on your configured backend.",
        )}
      </p>
    </MarketingSectionShell>
  );
}

export function StarterPlatformSetup({ productSlug }: PlatformProps) {
  const tSite = useCopy();
  const fullstack = productSlug === "starter-pro-fullstack";
  const offer = PRODUCT_DISPLAY[productSlug];
  const files = [
    ...(fullstack
      ? [
          {
            path: "web/",
            description: "Complete Web application and shared backend.",
          },
        ]
      : [
          {
            path: "backend/",
            description: "Compatible API, authentication and database source.",
          },
        ]),
    {
      path: "mobile/",
      description: "Expo application, retained API client and native tokens.",
    },
    {
      path: "README.md · LICENSE",
      description: "Release setup instructions and source licence.",
    },
    {
      path: "PYCOLORS_RELEASE.json",
      description: "Product, source revision and file hashes.",
    },
  ];
  const steps = [
    {
      title: fullstack
        ? "Configure Web and the backend."
        : "Configure your backend.",
      description: fullstack
        ? "Set up web/ with your database, authentication, email and Web billing providers."
        : "Set up backend/ with your database, authentication and email providers.",
      href: offer.docsHref,
      action: fullstack ? "Fullstack setup guide" : "Mobile setup guide",
    },
    {
      title: "Connect the native app.",
      description:
        "Point mobile/ at your backend, then configure native identifiers and permitted origins.",
      href: "/docs/starter-pro/mobile#native-source",
      action: "Configure the native source",
    },
    {
      title: "Validate your own applications.",
      description:
        "Test your environment, build for your target devices and prepare distribution with your own Apple/Google accounts.",
      href: "/docs/starter-pro/mobile#native-validation-and-distribution",
      action: "Review native validation",
    },
  ];

  return (
    <MarketingSectionShell
      id="source-guides"
      width="full"
      aria-labelledby="source-guides-title"
    >
      <MarketingSectionHeader
        titleId="source-guides-title"
        eyebrow={tSite("From download to your product")}
        title={tSite("Open the source. Make it yours.")}
        description={tSite(
          "A documented archive and a clear setup path. You configure, deploy and operate your own applications.",
        )}
      />
      <div className={styles.setupLayout}>
        <div className={styles.archivePanel}>
          <div className={styles.archiveHeading}>
            <FolderCode aria-hidden="true" />
            <h3>{tSite("Included in your ZIP")}</h3>
          </div>
          <p className={styles.archiveRoot}>
            <code>
              {fullstack
                ? "pycolors-starter-pro-fullstack/"
                : "pycolors-starter-pro-mobile/"}
            </code>
          </p>
          <dl className={styles.archiveFiles}>
            {files.map(({ path, description }) => (
              <div key={path}>
                <dt>
                  <code>{path}</code>
                </dt>
                <dd>{tSite(description)}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.archiveNote}>
            {tSite(
              "Check the received manifest for the delivered source revision and file hashes.",
            )}
          </p>
          <Link href="/product-releases" className={styles.contentLink}>
            {tSite("Explore product releases")}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ol className={styles.setupSteps} role="list">
          {steps.map(({ title, description, href, action }, index) => (
            <li key={title}>
              <span className={styles.setupStepNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{tSite(title)}</h3>
                <p>{tSite(description)}</p>
                <Link href={href} className={styles.contentLink}>
                  {tSite(action)}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </MarketingSectionShell>
  );
}

/** Secondary discovery: product links only, leaving this page's purchase focused. */
export function StarterPlatformAlternatives({ productSlug }: PlatformProps) {
  const tSite = useCopy();
  const alternatives = [
    {
      ...PRODUCT_DISPLAY["starter-pro"],
      description: "The complete Web application and its backend.",
    },
    productSlug === "starter-pro-mobile"
      ? {
          ...PRODUCT_DISPLAY["starter-pro-fullstack"],
          description: "Web and native Mobile with one shared backend.",
        }
      : {
          ...PRODUCT_DISPLAY["starter-pro-mobile"],
          description: "Native iOS and Android source with its backend.",
        },
  ];
  return (
    <MarketingSectionShell
      id="platforms"
      width="full"
      spacing="compact"
      aria-labelledby="platforms-title"
    >
      <MarketingSectionHeader
        titleId="platforms-title"
        align="left"
        title={tSite("A different starting point?")}
        description={tSite(
          "Explore the other source licences, or compare all starters side by side.",
        )}
        action={
          <Link href="/starters#source-licences" className={styles.contentLink}>
            {tSite("Compare all starters")}
            <ArrowRight aria-hidden="true" />
          </Link>
        }
      />
      <nav aria-label={tSite("Explore other source licences")}>
        <ul className={styles.alternatives} role="list">
          {alternatives.map(({ slug, href, name, priceLabel, description }) => (
            <li key={slug}>
              <Link href={href} className={styles.alternative}>
                <div>
                  <h3>{tSite(name)}</h3>
                  <p>{tSite(description)}</p>
                </div>
                <span className={styles.alternativePrice}>
                  {priceLabel}
                  <ArrowRight aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className={styles.alternativesNote}>
        {tSite("One-time payment · VAT included")}
      </p>
    </MarketingSectionShell>
  );
}
