import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import { UI_EXPLORER_URL } from "@/lib/docs/ui-explorer";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";
import { FooterAppearance } from "./footer-appearance";
import { FooterNavigation } from "./footer-navigation";
import { LanguageSwitcher } from "./layout/language-switcher";
import { Logo } from "./logo";
import styles from "./docs-footer.module.css";

const GROUPS = [
  {
    title: "Documentation",
    label: "Footer Documentation",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Get started", href: "/docs/getting-started" },
      { label: "UI Library", href: "/docs/ui" },
      { label: "Blocks", href: "/docs/blocks" },
    ],
  },
  {
    title: "Resources",
    label: "Footer Resources",
    links: [
      { label: "UI Explorer", href: UI_EXPLORER_URL },
      { label: "Theme Builder", href: "/tools/theme-builder" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Support",
    label: "Footer Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Purchase support", href: "/orders/support" },
      { label: "Recover purchase", href: "/orders/recover" },
    ],
  },
] as const;

const REPOSITORIES = [
  { label: "UI", href: "https://github.com/pycolors-io/pycolors-ui" },
  {
    label: "Starter Free",
    href: "https://github.com/pycolors-io/pycolors-starter-free",
  },
] as const;

/** Documentation utilities share the article's reading column and canvas. */
export function DocsFooter() {
  const tSite = useCopy();

  return (
    <FooterNavigation
      className={styles.footer}
      label={tSite("PyColors documentation footer")}
    >
      <div className={styles.column}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <div>
              <Logo variant="docs" />
              <p>
                {tSite(
                  "Reference, guides, and support for building with PyColors.",
                )}
              </p>
            </div>
            <Link
              href="/changelog"
              className={styles.versions}
              aria-label={tSite(
                "Release history: UI {value0}, Tokens {value1}",
                {
                  value0: UI_VERSION,
                  value1: TOKENS_VERSION,
                },
              )}
            >
              <span>UI {UI_VERSION}</span>
              <span aria-hidden="true">·</span>
              <span>Tokens {TOKENS_VERSION}</span>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.directory}>
            {GROUPS.map((group) => (
              <nav key={group.label} aria-label={tSite(group.label)}>
                <h2>{tSite(group.title)}</h2>
                <ul>
                  {group.links.map((link) => {
                    const external = link.href.startsWith("https://");
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          aria-describedby={
                            external ? "docs-footer-external-note" : undefined
                          }
                        >
                          {tSite(link.label)}
                          {external ? (
                            <ArrowUpRight aria-hidden="true" />
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
          <div className={styles.tools}>
            <nav
              aria-label={tSite("PyColors on GitHub")}
              className={styles.repositories}
            >
              <span>GitHub</span>
              {REPOSITORIES.map((repo) => (
                <a
                  key={repo.href}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tSite(repo.label)}
                  <span className="sr-only">
                    {" "}
                    {tSite("(opens in a new tab)")}
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </nav>
            <div className={styles.preferences}>
              <LanguageSwitcher variant="footer" />
              <FooterAppearance />
            </div>
          </div>
          <div className={styles.legal}>
            <p>© {new Date().getFullYear()} PyColors</p>
            <nav aria-label={tSite("Footer legal information")}>
              <Link href="/license">{tSite("License")}</Link>
              <Link href="/terms">{tSite("Terms")}</Link>
              <Link href="/privacy">{tSite("Privacy")}</Link>
            </nav>
          </div>
          <span id="docs-footer-external-note" className="sr-only">
            {tSite("Opens in a new tab")}
          </span>
        </div>
      </div>
    </FooterNavigation>
  );
}
