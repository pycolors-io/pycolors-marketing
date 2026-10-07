import Link from "next/link";
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
export const metadata: Metadata = {
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
      "Help people understand what matters now, what has changed, and where to go next.",
    points: [
      "Lead with a small set of useful metrics",
      "Keep recent activity and next actions in context",
    ],
    docs: "/docs/blocks/data/stats-overview",
    docsLabel: "Explore the stats block",
  },
  {
    id: "billing",
    title: "Billing page",
    category: "Subscription",
    description:
      "Bring the current plan, payment details, and billing actions into one predictable place.",
    points: [
      "Make the current plan and status easy to find",
      "Separate billing information from plan changes",
    ],
    docs: "/docs/blocks/commerce/billing-overview",
    docsLabel: "Explore the billing block",
  },
  {
    id: "settings",
    title: "Settings page",
    category: "Account",
    description:
      "Organize everyday preferences and sensitive changes around clear groups of related controls.",
    points: [
      "Group fields by purpose, with a clear save action",
      "Keep destructive actions separate",
    ],
    docs: "/docs/blocks/account/settings-panel",
    docsLabel: "Explore the settings block",
  },
  {
    id: "team",
    title: "Team management",
    category: "Collaboration",
    description:
      "Make it easy to understand who belongs to a workspace and which role each person holds.",
    points: [
      "Keep identity, role, and status together",
      "Distinguish invitations from active membership",
    ],
    docs: "/docs/blocks/account/workspace-members",
    docsLabel: "Explore the members block",
  },
  {
    id: "shell",
    title: "Protected app shell",
    category: "Navigation",
    description:
      "Give signed-in screens a consistent frame, with a visible location and predictable navigation.",
    points: [
      "Keep workspace navigation consistent across screens",
      "Enforce authentication and permissions in your app",
    ],
    docs: "/docs/blocks/app-shells/responsive-sidebar",
    docsLabel: "Explore the sidebar block",
  },
  {
    id: "upgrade",
    title: "Upgrade moment",
    category: "Plan selection",
    description:
      "Explain the next plan at a relevant moment, with visible terms and a clear way to continue.",
    points: [
      "Show the value and billing terms before the action",
      "Keep the current plan and alternatives visible",
    ],
    docs: "/docs/blocks/commerce/pricing-plans",
    docsLabel: "Explore the pricing block",
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
  return (
    <article
      id={`pattern-${pattern.id}`}
      tabIndex={-1}
      aria-labelledby={`pattern-${pattern.id}-title`}
      className={styles.patternCard}
    >
      <div className={styles.previewStage}>
        <div className={styles.previewMeta} aria-hidden="true">
          <span>Pattern {String(index + 1).padStart(2, "0")}</span>
          <span>{pattern.category}</span>
        </div>
        <PatternPreview kind={pattern.id} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardHeading}>
          <h3 id={`pattern-${pattern.id}-title`}>{pattern.title}</h3>
          <Badge variant="outline" className={styles.category}>
            {pattern.category}
          </Badge>
        </div>
        <p className={styles.cardDescription}>{pattern.description}</p>
        <ul className={styles.checks}>
          {pattern.points.map((point) => (
            <MarketingCheckItem key={point} className={styles.checkItem}>
              {point}
            </MarketingCheckItem>
          ))}
        </ul>
        <Link href={pattern.docs} className={styles.cardLink}>
          {pattern.docsLabel}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function PatternsPage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-24 sm:pb-24 sm:pt-28">
        <div className={styles.sectionNav}>
          <UiSectionNav active="patterns" />
        </div>
        <div className="w-full min-w-0">
          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              className={styles.hero}
              contentClassName="!max-w-none"
              badges={[
                {
                  label: "UI patterns",
                  variant: "outline",
                  icon: <Layers3 size={13} aria-hidden="true" />,
                },
              ]}
              title="Give every screen a clear purpose."
              description="Six interface patterns for the everyday work of a SaaS product. Find the right structure, explore the matching Block, and make it your own."
              actions={
                <>
                  <MarketingLinkButton>
                    <a href="#pattern-library">
                      Explore the patterns
                      <ArrowDown size={15} aria-hidden="true" />
                    </a>
                  </MarketingLinkButton>
                  <MarketingLinkButton variant="outline">
                    <Link href="/ui/examples">
                      View examples
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </MarketingLinkButton>
                </>
              }
            />
            <PatternAnatomy />
          </div>

          <nav aria-label="Pattern categories" className={styles.patternNav}>
            <span className={styles.eyebrow}>Find your surface</span>
            <ul>
              {patterns.map((pattern) => (
                <li key={pattern.id}>
                  <a href={`#pattern-${pattern.id}`}>
                    {pattern.title}
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
              title="Familiar patterns. Considered details."
              description="Illustrative layouts with a practical starting point for each one. Open the related Block for working examples, complete source, and integration guidance."
              action={
                <Link href="/blocks" className={styles.textLink}>
                  Browse all Blocks
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
              The Blocks provide interface structure. Your application supplies
              data, authentication, permissions, and payment behavior.
            </p>
          </section>

          <section
            aria-labelledby="pattern-workflow-title"
            className={cn(styles.section, styles.workflowSection)}
          >
            <MarketingSectionHeader
              align="left"
              titleId="pattern-workflow-title"
              title="From a useful pattern to your product."
              description="Keep the structure consistent while making the experience specific to your users."
            />
            <ol className={styles.workflow}>
              {workflow.map(
                ({ number, title, description, href, link, icon: Icon }) => (
                  <li key={number}>
                    <div className={styles.stepMeta}>
                      <span>{number}</span>
                      <Icon size={17} aria-hidden="true" />
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <Link href={href} className={styles.textLink}>
                      {link}
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
              <span className={styles.eyebrow}>A complete starting point</span>
              <h2 id="patterns-starters-title">
                See the pieces work together.
              </h2>
              <p>
                Explore the patterns in a runnable application, then choose the
                foundation that matches your next step.
              </p>
              <Link href="/ui/examples" className={styles.textLink}>
                Explore the application screens
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.starterOptions}>
              <div className={styles.starterOption}>
                <div className={styles.starterHeading}>
                  <h3>Starter Free</h3>
                  <Badge variant="outline" className={styles.category}>
                    Open source
                  </Badge>
                </div>
                <p>
                  Run the screens, explore the navigation, and adapt the
                  interface with demonstration data.
                </p>
                <p className={styles.starterNote}>
                  Authentication, billing, and product data are mocked.
                </p>
                <MarketingLinkButton variant="outline">
                  <Link href="/starters/free">
                    Explore Starter Free
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </MarketingLinkButton>
              </div>
              <div className={styles.starterOption}>
                <div className={styles.starterHeading}>
                  <h3>Starter Pro</h3>
                  <Badge variant="outline" className={styles.category}>
                    Commercial
                  </Badge>
                </div>
                <p>
                  Start with connected foundations for authentication, billing,
                  and protected application routes.
                </p>
                <p className={styles.starterNote}>
                  Configure your services, add product logic, and validate
                  before launch.
                </p>
                <div className={styles.proActions}>
                  <BuyStarterProButton
                    fullWidth={false}
                    label={`Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`}
                  />
                  <Link href="/starters/pro" className={styles.textLink}>
                    See what’s included
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <div className={styles.bottomLink}>
            <Blocks size={15} aria-hidden="true" />
            <p>Looking for individual components?</p>
            <Link href="/ui" className={styles.textLink}>
              Explore PyColors UI
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
