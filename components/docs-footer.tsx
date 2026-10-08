import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitBranch } from "lucide-react";

import { Container } from "@/components/container";
import { FibonacciMark } from "@/components/marketing/fibonacci-background";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";
import { FooterAppearance } from "./footer-appearance";
import { FooterNavigation } from "./footer-navigation";
import { Logo } from "./logo";
import styles from "./footer.module.css";

const GROUPS = [
  {
    title: "Documentation",
    links: [
      { label: "Getting started", href: "/docs/getting-started" },
      { label: "UI Library", href: "/docs/ui" },
      { label: "Blocks", href: "/docs/blocks" },
      { label: "Design system", href: "/docs/design-system" },
      { label: "Starter Free", href: "/docs/starter" },
      { label: "Starter Pro", href: "/docs/starter-pro" },
      { label: "NA-AI Landing", href: "/docs/templates/na-ai-landing" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "Theme Builder", href: "/tools/theme-builder" },
      { label: "UI examples", href: "/ui/examples" },
      { label: "Patterns", href: "/docs/patterns" },
      { label: "Compare starters", href: "/starters" },
      { label: "Starter Pro", href: "/starters/pro" },
      { label: "Templates", href: "/templates" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "/guides" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Open source", href: "/open-source" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Purchase support", href: "/orders/support" },
      { label: "Recover purchase", href: "/orders/recover" },
      { label: "About PyColors", href: "/about" },
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

export function DocsFooter() {
  return (
    <FooterNavigation className={styles.footer} label="PyColors Docs footer">
      <Container>
        <div className={styles.directory}>
          <div className={styles.brand}>
            <div>
              <Logo variant="docs" />
              <p className={styles.brandDescription}>
                Reference, examples, and guides for building with PyColors.
              </p>
              <Link href="/" className={styles.directoryLink}>
                Back to PyColors
                <ArrowRight className="ml-1.5 size-3" aria-hidden="true" />
              </Link>
            </div>
            <nav
              aria-label="Docs repositories on GitHub"
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
              <nav key={group.title} aria-label={`Docs footer ${group.title}`}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.directoryLink}>
                        {link.label}
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
            <nav aria-label="Docs footer legal information">
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
