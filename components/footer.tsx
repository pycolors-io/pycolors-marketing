import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowUpRight,
  Boxes,
  GitBranch,
  Layers,
  LayoutTemplate,
} from "lucide-react";

import { Container } from "@/components/container";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
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
        label: "React Native mobile app · Coming soon",
        href: "/starters/mobile",
      },
      { label: "Templates", href: "/templates" },
      { label: "NA-AI Landing", href: "/templates/na-ai-landing" },
    ],
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
    ],
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
  },
  {
    title: "Templates",
    links: [
      { label: "Overview", href: "/docs/templates" },
      { label: "NA-AI Landing", href: "/docs/templates/na-ai-landing" },
      { label: "Setup", href: "/docs/templates/na-ai-landing/setup" },
      {
        label: "Customization",
        href: "/docs/templates/na-ai-landing/customization",
      },
      { label: "Deployment", href: "/docs/templates/na-ai-landing/deployment" },
      { label: "License", href: "/docs/templates/na-ai-landing/license" },
    ],
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
  },
  {
    title: "Resources",
    links: [
      { label: "Demos", href: "/demo" },
      { label: "Documentation", href: "/docs" },
      { label: "UI Explorer", href: UI_EXPLORER_URL },
      { label: "Guides", href: "/guides" },
      { label: "UI examples", href: "/ui/examples" },
      { label: "Patterns", href: "/ui/patterns" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
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
  },
] as const;

const STARTING_POINTS = [
  {
    title: "PyColors UI",
    description: "Compose your interface.",
    href: "/ui",
    icon: Boxes,
  },
  {
    title: "Templates",
    description: "Start with a complete page.",
    href: "/templates",
    icon: LayoutTemplate,
  },
  {
    title: "SaaS starters",
    description: "Build on connected application foundations.",
    href: "/starters",
    icon: Layers,
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
            <p className={styles.eyebrow}>{tSite("Build with PyColors")}</p>
            <h2 id="footer-invitation-title">
              {tSite("Your next product starts here.")}
            </h2>
            <p className={styles.description}>
              {tSite(
                "Compose your interface, start with a template, or build on a SaaS starter. Choose the foundation that fits your project.",
              )}
            </p>
            <div className={styles.actions}>
              <MarketingLinkButton>
                <Link href="/starters/pro">{tSite("Explore Starter Pro")}</Link>
              </MarketingLinkButton>
              <MarketingLinkButton variant="outline">
                <Link href="/pricing">{tSite("Compare products")}</Link>
              </MarketingLinkButton>
            </div>
          </div>
          <nav
            className={styles.startingPoints}
            aria-label={tSite("Choose your starting point")}
          >
            {STARTING_POINTS.map(({ title, description, href, icon: Icon }) => (
              <Link key={href} href={href} className={styles.startingPoint}>
                <span className={styles.startingPointIcon}>
                  <Icon aria-hidden="true" />
                </span>
                <span className={styles.startingPointCopy}>
                  <span>{tSite(title)}</span>
                  <span>{tSite(description)}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={styles.startingPointArrow}
                />
              </Link>
            ))}
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
              </nav>
            ))}
          </div>
          <div className={styles.brand}>
            <div>
              <Logo />
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
