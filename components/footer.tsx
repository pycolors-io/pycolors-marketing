import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight, GitBranch } from "lucide-react";

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
      { label: "Templates", href: "/templates" },
      { label: "NA-AI Landing", href: "/templates/na-ai-landing" },
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
      { label: "Purchase support", href: "/orders/support" },
      { label: "Recover purchase", href: "/orders/recover" },
      { label: "Contact", href: "/contact" },
      { label: "Request a quote", href: "/request-a-quote" },
    ],
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

export function Footer() {
  const tSite = useCopy();

  return (
    <FooterNavigation className={styles.footer}>
      <Container>
        <section
          className={styles.invitation}
          aria-labelledby="footer-invitation-title"
        >
          <div className={styles.invitationCopy}>
            <p className={styles.eyebrow}>{tSite("Build with PyColors")}</p>
            <h2 id="footer-invitation-title">
              {tSite("Build with a head start.")}
            </h2>
            <p className={styles.description}>
              {tSite(
                "Explore the components, templates, and SaaS foundations that fit your project.",
              )}
            </p>
          </div>
          <div className={styles.actions}>
            <MarketingLinkButton>
              <Link href="/starters/pro">{tSite("Explore Starter Pro")}</Link>
            </MarketingLinkButton>
            <MarketingLinkButton variant="outline">
              <Link href="/pricing">{tSite("Compare products")}</Link>
            </MarketingLinkButton>
          </div>
        </section>

        <div className={styles.directory}>
          <div className={styles.brand}>
            <div>
              <Logo />
              <p className={styles.brandDescription}>
                {tSite(
                  "Components, templates, and SaaS starters. Built to work together.",
                )}
              </p>
            </div>
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
            <FibonacciMark className={styles.brandGeometry} />
          </div>
          <div className={styles.groups}>
            {GROUPS.map((group) => (
              <nav
                key={group.title}
                aria-label={tSite("Footer {value0}", { value0: group.title })}
              >
                <h2>{tSite(group.title)}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
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
