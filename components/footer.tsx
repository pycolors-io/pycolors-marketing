import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  GitBranch,
  Layers,
  LayoutTemplate,
} from "lucide-react";

import { Container } from "@/components/container";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import { FibonacciMark } from "@/components/marketing/fibonacci-background";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";
import { UI_EXPLORER_URL } from "@/lib/docs/ui-explorer";
import { FooterAppearance } from "./footer-appearance";
import { FooterNavigation } from "./footer-navigation";
import { Logo } from "./logo";
import styles from "./footer.module.css";
import { LanguageSwitcher } from "./layout/language-switcher";

const GROUPS = [
  {
    title: "Products",
    links: [
      { label: "UI Library", href: "/ui" },
      { label: "Blocks", href: "/blocks" },
      { label: "Theme Builder", href: "/tools/theme-builder" },
      { label: "Starter Free", href: "/starters/free" },
      { label: "Starter Pro", href: "/starters/pro" },
      {
        label: "Starter Pro Mobile",
        href: "/starters/mobile",
      },
      { label: "Starter Pro Fullstack", href: "/starters/fullstack" },
    ],
    more: { label: "Explore the ecosystem", href: "/" },
  },
  {
    title: "UI",
    links: [
      { label: "Overview", href: "/docs/ui" },
      { label: "Installation", href: "/docs/ui/installation" },
      { label: "Button", href: "/docs/ui/button" },
      { label: "Input", href: "/docs/ui/input" },
      { label: "Dialog", href: "/docs/ui/dialog" },
      { label: "Table", href: "/docs/ui/table" },
      { label: "Tabs", href: "/docs/ui/tabs" },
      { label: "AI Composer", href: "/docs/ui/ai-composer" },
    ],
    more: { label: "View all components", href: "/docs/ui" },
  },
  {
    title: "Blocks",
    links: [
      { label: "Overview", href: "/docs/blocks" },
      {
        label: "Responsive sidebar",
        href: "/docs/blocks/app-shells/responsive-sidebar",
      },
      { label: "AI chat", href: "/docs/blocks/app-shells/ai-chat" },
      { label: "Sign in", href: "/docs/blocks/auth/sign-in" },
      { label: "Data table", href: "/docs/blocks/data/data-table" },
      { label: "Settings panel", href: "/docs/blocks/account/settings-panel" },
      {
        label: "Workspace members",
        href: "/docs/blocks/account/workspace-members",
      },
      {
        label: "Invoice history",
        href: "/docs/blocks/commerce/invoice-history",
      },
    ],
    more: { label: "View all blocks", href: "/blocks" },
  },
  {
    title: "Design System",
    links: [
      { label: "Overview", href: "/docs/design-system" },
      { label: "Principles", href: "/docs/design-system/principles" },
      { label: "Design tokens", href: "/docs/design-system/tokens" },
      { label: "Colors", href: "/docs/design-system/colors" },
      { label: "Typography", href: "/docs/design-system/typography" },
      { label: "Theming", href: "/docs/ui/theming" },
      { label: "UI examples", href: "/ui/examples" },
      { label: "Patterns", href: "/ui/patterns" },
    ],
    more: { label: "Explore the design system", href: "/docs/design-system" },
  },
  {
    title: "Starter Free",
    links: [
      { label: "Getting started", href: "/docs/starter/getting-started" },
      { label: "Installation", href: "/docs/starter/installation" },
      { label: "Project structure", href: "/docs/starter/project-structure" },
      { label: "Authentication concepts", href: "/docs/starter/auth-concept" },
      { label: "Billing concepts", href: "/docs/starter/billing-concept" },
      { label: "Deployment", href: "/docs/starter/deployment" },
      { label: "Upgrade to Pro", href: "/docs/starter/upgrade" },
    ],
    more: { label: "All Starter Free guides", href: "/docs/starter" },
  },
  {
    title: "Starter Pro",
    links: [
      { label: "Getting started", href: "/docs/starter-pro/getting-started" },
      { label: "Architecture", href: "/docs/starter-pro/architecture" },
      {
        label: "Environment variables",
        href: "/docs/starter-pro/environment-variables",
      },
      { label: "Authentication", href: "/docs/starter-pro/auth" },
      { label: "Billing", href: "/docs/starter-pro/billing" },
      { label: "Recipes", href: "/docs/starter-pro/recipes" },
      { label: "Deployment", href: "/docs/starter-pro/deployment" },
      {
        label: "Production checklist",
        href: "/docs/starter-pro/production-checklist",
      },
    ],
    more: { label: "All Starter Pro guides", href: "/docs/starter-pro" },
  },
  {
    title: "Templates",
    links: [
      { label: "NA-AI Landing", href: "/templates/na-ai-landing" },
      { label: "Overview", href: "/docs/templates" },
      { label: "NA-AI guides", href: "/docs/templates/na-ai-landing" },
      { label: "Setup", href: "/docs/templates/na-ai-landing/setup" },
      {
        label: "Customization",
        href: "/docs/templates/na-ai-landing/customization",
      },
      { label: "Deployment", href: "/docs/templates/na-ai-landing/deployment" },
      { label: "License", href: "/docs/templates/na-ai-landing/license" },
    ],
    more: { label: "View all templates", href: "/templates" },
  },
  {
    title: "Guides",
    links: [
      { label: "Getting started", href: "/docs/getting-started" },
      {
        label: "Building a SaaS layout",
        href: "/docs/guides/building-a-saas-layout",
      },
      {
        label: "Forms with validation",
        href: "/docs/guides/forms-with-validation",
      },
      {
        label: "Empty, loading, and error states",
        href: "/docs/guides/empty-loading-error",
      },
      { label: "Usage patterns", href: "/docs/ui/usage-patterns" },
      { label: "Migration guidance", href: "/docs/ui/migration-guidance" },
      { label: "Accessibility", href: "/docs/ui/accessibility" },
    ],
    more: { label: "View all guides", href: "/docs/guides" },
  },
  {
    title: "Registry",
    links: [
      { label: "Overview", href: "/docs/registry" },
      { label: "Installation", href: "/docs/registry/installation" },
      { label: "Agent context", href: "/docs/registry/agent-context" },
      { label: "Updates", href: "/docs/registry/updates" },
      { label: "Troubleshooting", href: "/docs/registry/troubleshooting" },
      { label: "Release policy", href: "/docs/project/release-policy" },
      { label: "Versioning policy", href: "/docs/project/versioning-policy" },
    ],
    more: { label: "Explore the registry", href: "/docs/registry" },
  },
  {
    title: "Resources",
    links: [
      { label: "Demos", href: "/demo" },
      { label: "Documentation", href: "/docs" },
      { label: "UI Explorer", href: UI_EXPLORER_URL },
      { label: "Guides", href: "/guides" },
      { label: "Blog", href: "/blog" },
      { label: "Product releases", href: "/product-releases" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
    more: { label: "Explore the documentation", href: "/docs" },
  },
  {
    title: "Compare",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Compare starters", href: "/starters" },
      { label: "Starter Pro FAQ", href: "/starters/pro/faq" },
      { label: "Build vs. buy", href: "/compare/build-vs-buy" },
      { label: "Upgrade to Pro", href: "/upgrade" },
      { label: "Open source", href: "/open-source" },
    ],
    more: { label: "Compare products", href: "/pricing" },
  },
  {
    title: "Company",
    links: [
      { label: "About PyColors", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Purchase support", href: "/orders/support" },
      { label: "Recover purchase", href: "/orders/recover" },
      { label: "Contact", href: "/contact" },
      { label: "Request a quote", href: "/request-a-quote" },
    ],
    more: { label: "Contact PyColors", href: "/contact" },
  },
] as const;

const STARTING_POINTS = [
  {
    title: "PyColors UI",
    description:
      "Build a consistent interface with accessible React components you can adapt to your brand.",
    action: "Explore the components",
    href: "/ui",
    icon: Boxes,
    tone: "neutral",
    label: "For your interface",
  },
  {
    title: "Blocks",
    description:
      "Assemble application screens from complete compositions, with source code to copy into your project.",
    action: "Explore the blocks",
    href: "/blocks",
    icon: Layers,
    tone: "blue",
    label: "For your screens",
  },
  {
    title: "Templates",
    description:
      "Start with a complete marketing page, then adapt its content and visual identity to your product.",
    action: "Explore the templates",
    href: "/templates",
    icon: LayoutTemplate,
    tone: "violet",
    label: "For your website",
  },
  {
    title: "SaaS starters",
    description:
      "Test your journeys with Starter Free, then connect authentication, billing, and data with Starter Pro.",
    action: "Compare the starters",
    href: "/starters",
    icon: GitBranch,
    tone: "dark",
    label: "For your SaaS app",
  },
] as const;

const REPOSITORIES = [
  {
    label: "UI",
    name: "PyColors UI",
    href: "https://github.com/pycolors-io/pycolors-ui",
  },
  {
    label: "Starter Free",
    name: "PyColors Starter Free",
    href: "https://github.com/pycolors-io/pycolors-starter-free",
  },
] as const;

/** Marketing discovery sits before the shared site footer. */
export function FooterPromotion() {
  const tSite = useCopy();

  return (
    <section
      className={`${styles.publicFooter} ${styles.promotion}`}
      aria-labelledby="footer-invitation-title"
    >
      <Container>
        <div className={styles.invitation}>
          <div className={styles.invitationCopy}>
            <div className={styles.invitationHeading}>
              <p className={styles.eyebrow}>{tSite("Build with PyColors")}</p>
              <h2 id="footer-invitation-title">
                {tSite("Your next product starts here.")}
              </h2>
            </div>
            <div className={styles.invitationDetails}>
              <p className={styles.description}>
                {tSite(
                  "UI components, copyable blocks, templates, or a SaaS starter. Start with what your project needs.",
                )}
              </p>
              <div className={styles.actions}>
                <MarketingLinkButton>
                  <Link href="/starters/pro">
                    {tSite("Explore Starter Pro")}
                  </Link>
                </MarketingLinkButton>
                <MarketingLinkButton variant="outline">
                  <Link href="/pricing">{tSite("Compare products")}</Link>
                </MarketingLinkButton>
              </div>
            </div>
          </div>
          <nav
            className={styles.startingPoints}
            aria-label={tSite("Choose your starting point")}
          >
            {STARTING_POINTS.map(
              ({
                title,
                description,
                action,
                href,
                icon: Icon,
                tone,
                label,
              }) => (
                <Link
                  key={href}
                  href={href}
                  className={styles.startingPoint}
                  data-discovery-tone={tone}
                >
                  <span className={styles.startingPointIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <div className={styles.startingPointCopy}>
                    <p className={styles.startingPointLabel}>{tSite(label)}</p>
                    <h3 className={styles.startingPointTitle}>
                      {tSite(title)}
                    </h3>
                    <p className={styles.startingPointDescription}>
                      {tSite(description)}
                    </p>
                  </div>
                  <span className={styles.startingPointAction}>
                    {tSite(action)}
                    <ArrowRight aria-hidden="true" />
                  </span>
                </Link>
              ),
            )}
          </nav>
        </div>
      </Container>
    </section>
  );
}

export function Footer() {
  const tSite = useCopy();

  return (
    <FooterNavigation className={`${styles.footer} ${styles.publicFooter}`}>
      <Container>
        <div className={styles.directory}>
          <div className={styles.groups}>
            {GROUPS.map((group) => (
              <nav
                key={group.title}
                aria-label={tSite("Footer {value0}", {
                  value0: tSite(group.title),
                })}
              >
                <h2>{tSite(group.title)}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className={styles.directoryLink}
                        target={
                          link.href.startsWith("https://")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          link.href.startsWith("https://")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-description={tSite(
                          link.href.startsWith("https://")
                            ? "Opens in a new tab"
                            : undefined,
                        )}
                      >
                        {tSite(link.label)}
                        {link.href.startsWith("https://") && (
                          <ArrowUpRight
                            className="ml-1.5 size-3"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={group.more.href}
                  prefetch={false}
                  className={styles.directoryMore}
                >
                  {tSite(group.more.label)}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </nav>
            ))}
          </div>
          <div className={styles.brand}>
            <div className={styles.brandCopy}>
              <div className={styles.brandLogo}>
                <FibonacciMark className={styles.signature} />
                <Logo />
              </div>
              <p className={styles.brandDescription}>
                {tSite(
                  "Components, templates, and SaaS starters. Built to work together.",
                )}
              </p>
            </div>
            <div className={styles.repositoryArea}>
              <nav
                aria-label={tSite("PyColors on GitHub")}
                className={styles.repositories}
              >
                <p className={styles.repositoryHeading}>
                  <GitBranch className="size-3.5" aria-hidden="true" />
                  {tSite("On GitHub")}
                </p>
                <ul>
                  {REPOSITORIES.map((repo) => (
                    <li key={repo.href}>
                      <a
                        href={repo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tSite(
                          "{value0} on GitHub (opens in a new tab)",
                          { value0: repo.name },
                        )}
                      >
                        {tSite(repo.label)}
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.legal}>
            <p>
              © {tSite(new Date().getFullYear())} {tSite(" PyColors")}
            </p>
            <nav aria-label={tSite("Footer legal information")}>
              <Link href="/license">{tSite("License")}</Link>
              <Link href="/terms">{tSite("Terms")}</Link>
              <Link href="/privacy">{tSite("Privacy")}</Link>
            </nav>
          </div>
          <div className={styles.utilities}>
            <Link
              href="/changelog"
              className={styles.versions}
              aria-label={tSite(
                "Release history: UI {value0}, Tokens {value1}",
                { value0: UI_VERSION, value1: TOKENS_VERSION },
              )}
            >
              <span>
                {tSite("UI ")}
                {tSite(UI_VERSION)}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {tSite("Tokens ")}
                {tSite(TOKENS_VERSION)}
              </span>
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </Link>
            <div className={styles.preferences}>
              <LanguageSwitcher variant="footer" />
              <FooterAppearance />
            </div>
          </div>
        </div>
      </Container>
    </FooterNavigation>
  );
}
