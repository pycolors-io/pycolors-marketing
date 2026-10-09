import Link from "next/link";
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
  return (
    <FooterNavigation className={styles.footer}>
      <Container>
        <section
          className={styles.invitation}
          aria-labelledby="footer-invitation-title"
        >
          <div className={styles.invitationCopy}>
            <p className={styles.eyebrow}>Build with PyColors</p>
            <h2 id="footer-invitation-title">Build with a head start.</h2>
            <p className={styles.description}>
              Explore the components, templates, and SaaS foundations that fit
              your project.
            </p>
          </div>
          <div className={styles.actions}>
            <MarketingLinkButton>
              <Link href="/starters/pro">Explore Starter Pro</Link>
            </MarketingLinkButton>
            <MarketingLinkButton variant="outline">
              <Link href="/pricing">Compare products</Link>
            </MarketingLinkButton>
          </div>
        </section>

        <div className={styles.directory}>
          <div className={styles.brand}>
            <div>
              <Logo />
              <p className={styles.brandDescription}>
                Components, templates, and SaaS starters. Built to work
                together.
              </p>
            </div>
            <nav
              aria-label="PyColors on GitHub"
              className={styles.repositories}
            >
              <p className={styles.repositoryHeading}>
                <GitBranch className="size-3.5" aria-hidden="true" />
                On GitHub
              </p>
              <ul>
                {REPOSITORIES.map((repo) => (
                  <li key={repo.href}>
                    <a
                      href={repo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${repo.name} on GitHub (opens in a new tab)`}
                    >
                      {repo.label}
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
              <nav key={group.title} aria-label={`Footer ${group.title}`}>
                <h2>{group.title}</h2>
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
                        aria-description={
                          link.href.startsWith("https://")
                            ? "Opens in a new tab"
                            : undefined
                        }
                      >
                        {link.label}
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
            <p>© {new Date().getFullYear()} PyColors</p>
            <nav aria-label="Footer legal information">
              <Link href="/license">License</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </nav>
          </div>
          <div className={styles.utilities}>
            <Link
              href="/changelog"
              className={styles.versions}
              aria-label={`Release history: UI ${UI_VERSION}, Tokens ${TOKENS_VERSION}`}
            >
              <span>UI {UI_VERSION}</span>
              <span aria-hidden="true">·</span>
              <span>Tokens {TOKENS_VERSION}</span>
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </Link>
            <FooterAppearance />
          </div>
        </div>
      </Container>
    </FooterNavigation>
  );
}
