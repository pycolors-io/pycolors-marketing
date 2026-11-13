import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Code2,
  Layers3,
  Palette,
} from "lucide-react";
import { Badge, cn } from "@pycolors/ui";

import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { Container } from "@/components/container";
import { UiSectionNav } from "@/components/marketing/ui-section-nav";
import { BuyStarterProButton } from "@/components/pricing/buy-starter-pro-button";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import {
  PatternAnatomy,
  PatternPreview,
  type PatternKind,
} from "@/components/marketing/pattern-preview";
import styles from "@/components/marketing/ui-patterns.module.css";

const description =
  "Explore six SaaS UI patterns for dashboards, billing, settings, teams, application shells, and upgrade moments. Find the related PyColors Blocks, source, and runnable examples.";
const metadata: Metadata = {
  title: "Next.js SaaS UI Patterns",
  description,
  alternates: { canonical: "/ui/patterns" },
  openGraph: {
    title: "Next.js SaaS UI Patterns",
    description,
    url: "/ui/patterns",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS UI Patterns",
    description,
    images: ["/seo/twitter-main.png"],
  },
};

type Pattern = {
  id: PatternKind;
  title: string;
  category: string;
  description: string;
  points: readonly string[];
  docs: string;
  docsLabel: string;
};

const patterns: readonly Pattern[] = [
  {
    id: "dashboard",
    title: "Dashboard layout",
    category: "Overview",
    description:
      "For your application home: key metrics, recent activity and the next action to take.",
    points: [
      "Lead with a small set of useful metrics",
      "Keep recent activity and next actions in context",
    ],
    docs: "/docs/blocks/data/stats-overview",
    docsLabel: "View dashboard example and source",
  },
  {
    id: "billing",
    title: "Billing page",
    category: "Subscription",
    description:
      "For subscribers who need to check their current plan, payment method and invoices.",
    points: [
      "Make the current plan and status easy to find",
      "Separate billing information from plan changes",
    ],
    docs: "/docs/blocks/commerce/billing-overview",
    docsLabel: "View billing example and source",
  },
  {
    id: "settings",
    title: "Settings page",
    category: "Account",
    description:
      "For people updating a profile or workspace: grouped fields, validation and an explicit save action.",
    points: [
      "Group fields by purpose, with a clear save action",
      "Keep destructive actions separate",
    ],
    docs: "/docs/blocks/account/settings-panel",
    docsLabel: "View settings example and source",
  },
  {
    id: "team",
    title: "Team management",
    category: "Collaboration",
    description:
      "For workspace owners managing members, roles and pending invitations.",
    points: [
      "Keep identity, role, and status together",
      "Distinguish invitations from active membership",
    ],
    docs: "/docs/blocks/account/workspace-members",
    docsLabel: "View team example and source",
  },
  {
    id: "shell",
    title: "Application navigation",
    category: "Navigation",
    description:
      "For an application with several screens: a shared sidebar, workspace identity and a clear current location.",
    points: [
      "Keep workspace navigation consistent across screens",
      "Enforce authentication and permissions in your app",
    ],
    docs: "/docs/blocks/app-shells/responsive-sidebar",
    docsLabel: "View navigation example and source",
  },
  {
    id: "upgrade",
    title: "Plan comparison",
    category: "Plan selection",
    description:
      "For people choosing a subscription: compare features and terms while keeping the current plan visible.",
    points: [
      "Show the value and billing terms before the action",
      "Keep the current plan and alternatives visible",
    ],
    docs: "/docs/blocks/commerce/pricing-plans",
    docsLabel: "View pricing example and source",
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose the structure",
    description:
      "Start with the job your user needs to do. Pick the pattern that gives information and actions a clear order.",
    href: "#pattern-library",
    link: "Browse the patterns",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Make it your own",
    description:
      "Open the related Block for its example and source. Apply your tokens and adapt the content to your product.",
    href: "/tools/theme-builder",
    link: "Open Theme Builder",
    icon: Palette,
  },
  {
    number: "03",
    title: "Connect the behavior",
    description:
      "Wire up your data, permissions, and actions. Review loading, empty, error, and success states in your application.",
    href: "/docs/blocks",
    link: "Read the integration docs",
    icon: Code2,
  },
] as const;

function PatternCard({ pattern, index }: { pattern: Pattern; index: number }) {
  const tSite = useCopy();

  return (
    <article
      id={`pattern-${pattern.id}`}
      tabIndex={-1}
      aria-labelledby={`pattern-${pattern.id}-title`}
      className={styles.patternCard}
    >
      <div className={styles.previewStage}>
        <div className={styles.previewMeta} aria-hidden="true">
          <span>
            {tSite("Pattern ")}
            {tSite(String(index + 1).padStart(2, "0"))}
          </span>
          <span>{tSite(pattern.category)}</span>
        </div>
        <PatternPreview kind={pattern.id} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeading}>
          <h3 id={`pattern-${pattern.id}-title`}>{tSite(pattern.title)}</h3>
          <Badge variant="outline" className={styles.category}>
            {tSite(pattern.category)}
          </Badge>
        </div>
        <p className={styles.useLabel}>{tSite("When to use it")}</p>
        <p className={styles.cardDescription}>{tSite(pattern.description)}</p>
        <p className={styles.includesLabel}>
          {tSite("What the layout covers")}
        </p>
        <ul className={styles.checks}>
          {pattern.points.map((point) => (
            <MarketingCheckItem key={point} className={styles.checkItem}>
              {tSite(point)}
            </MarketingCheckItem>
          ))}
        </ul>
        <Link href={pattern.docs} className={styles.cardLink}>
          {tSite(pattern.docsLabel)}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function PatternsPage() {
  const tSite = useCopy();

  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="marketing-page-intro pb-16 pt-6 sm:pb-24 sm:pt-8">
        <UiSectionNav
          active="patterns"
          breadcrumb={<MarketingBreadcrumb route="/ui/patterns" />}
        />
        <div className="w-full min-w-0">
          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              className={styles.hero}
              contentClassName="!max-w-none"
              badges={[
                {
                  label: "SaaS screen layouts",
                  variant: "outline",
                  icon: <Layers3 size={13} aria-hidden="true" />,
                },
              ]}
              title={tSite("The right structure for every SaaS screen.")}
              description={tSite(
                "A pattern shows how to organize a screen. Choose a dashboard, settings or billing layout, then open its Block to get the example and source code.",
              )}
              extra={
                <p className={styles.heroNote}>
                  {tSite(
                    "Illustrative previews. Free Block source. Your data and services to connect.",
                  )}
                </p>
              }
              actions={
                <>
                  <MarketingLinkButton>
                    <a href="#pattern-library">
                      {tSite("Explore the patterns")}
                      <ArrowDown size={15} aria-hidden="true" />
                    </a>
                  </MarketingLinkButton>
                  <MarketingLinkButton variant="outline">
                    <Link href="/ui/examples">{tSite("View examples")}</Link>
                  </MarketingLinkButton>
                </>
              }
            />
            <div className={styles.heroComposition}>
              <PatternAnatomy />
            </div>
          </div>

          <nav
            aria-label={tSite("Pattern categories")}
            className={styles.patternNav}
          >
            <span className={styles.eyebrow}>{tSite("Choose a screen")}</span>
            <ul>
              {patterns.map((pattern) => (
                <li key={pattern.id}>
                  <a href={`#pattern-${pattern.id}`}>
                    {tSite(pattern.title)}
                    <ArrowDown size={12} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section
            id="pattern-library"
            tabIndex={-1}
            aria-labelledby="pattern-library-title"
            className={styles.section}
          >
            <MarketingSectionHeader
              align="left"
              titleId="pattern-library-title"
              title={tSite("Six screens. A concrete starting point.")}
              description={tSite(
                "Each preview explains a screen structure. The linked Block provides the interface code; you connect your data and services.",
              )}
              action={
                <Link href="/blocks" className={styles.textLink}>
                  {tSite("Browse all Blocks")}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              }
            />
            <div className={styles.patternGrid}>
              {patterns.map((pattern, index) => (
                <PatternCard key={pattern.id} pattern={pattern} index={index} />
              ))}
            </div>
            <p className={styles.scopeNote}>
              {tSite(
                "The Blocks provide interface structure. Your application supplies data, authentication, permissions, and payment behavior.",
              )}
            </p>
          </section>

          <section
            aria-labelledby="pattern-workflow-title"
            className={cn(styles.section, styles.workflowSection)}
          >
            <MarketingSectionHeader
              align="left"
              titleId="pattern-workflow-title"
              title={tSite("From a useful pattern to your product.")}
              description={tSite(
                "Keep the structure consistent while making the experience specific to your users.",
              )}
            />
            <ol className={styles.workflow}>
              {workflow.map(
                ({ number, title, description, href, link, icon: Icon }) => (
                  <li key={number}>
                    <div className={styles.stepMeta}>
                      <span>{tSite(number)}</span>
                      <Icon size={17} aria-hidden="true" />
                    </div>
                    <h3>{tSite(title)}</h3>
                    <p>{tSite(description)}</p>
                    <Link href={href} className={styles.textLink}>
                      {tSite(link)}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                ),
              )}
            </ol>
          </section>

          <section
            aria-labelledby="patterns-starters-title"
            className={styles.starters}
          >
            <div className={styles.startersIntro}>
              <span className={styles.eyebrow}>
                {tSite("A complete starting point")}
              </span>
              <h2 id="patterns-starters-title">
                {tSite("See the pieces work together.")}
              </h2>
              <p>
                {tSite(
                  "Explore the patterns in a runnable application, then choose the foundation that matches your next step.",
                )}
              </p>
              <Link href="/ui/examples" className={styles.textLink}>
                {tSite("Explore the application screens")}
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.starterOptions}>
              <div className={styles.starterOption}>
                <div className={styles.starterHeading}>
                  <h3>{tSite("Starter Free")}</h3>
                  <Badge variant="outline" className={styles.category}>
                    {tSite("Open source")}
                  </Badge>
                </div>
                <p>
                  {tSite(
                    "Run the screens, explore the navigation, and adapt the interface with demonstration data.",
                  )}
                </p>
                <p className={styles.starterNote}>
                  {tSite(
                    "Authentication, billing, and product data are mocked.",
                  )}
                </p>
                <MarketingLinkButton variant="outline">
                  <Link href="/starters/free">
                    {tSite("Explore Starter Free")}
                  </Link>
                </MarketingLinkButton>
              </div>
              <div className={styles.starterOption}>
                <div className={styles.starterHeading}>
                  <h3>{tSite("Starter Pro")}</h3>
                  <Badge variant="outline" className={styles.category}>
                    {tSite("Commercial")}
                  </Badge>
                </div>
                <p>
                  {tSite(
                    "Start with connected foundations for authentication, billing, and protected application routes.",
                  )}
                </p>
                <p className={styles.starterNote}>
                  {tSite(
                    "Configure your services, add product logic, and validate before launch.",
                  )}
                </p>
                <div className={styles.proActions}>
                  <BuyStarterProButton
                    fullWidth={false}
                    label={tSite("Buy Starter Pro — {value0}", {
                      value0: PRODUCT_DISPLAY["starter-pro"].priceLabel,
                    })}
                  />
                  <Link href="/starters/pro" className={styles.textLink}>
                    {tSite("See what’s included")}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className={styles.bottomLink}>
            <Blocks size={15} aria-hidden="true" />
            <p>{tSite("Looking for individual components?")}</p>
            <Link href="/ui" className={styles.textLink}>
              {tSite("Explore PyColors UI")}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
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
  return localizePageMetadata(metadata, "/ui/patterns", locale);
}
