import { useCopy } from "@/lib/i18n/use-copy";
import type { ReactNode } from "react";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowRight,
  BookOpen,
  Blocks,
  Box,
  Code2,
  CreditCard,
  Layers3,
  LayoutTemplate,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { FullSearchTrigger } from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { Button as UiButton, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import { SITE_URL } from "@/lib/seo/website";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";
import { DocsLinks } from "./docs-links";
import { DocsContextCopy } from "./docs-context-copy";
import { DocsFeedback } from "./docs-feedback";
import styles from "./docs-home.module.css";

export function DocsHome({ children }: Readonly<{ children: ReactNode }>) {
  return <div className={cn("not-prose", styles.home)}>{children}</div>;
}

export function DocsHomeHero() {
  const tSite = useCopy();
  return (
    <header className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{tSite("PyColors Documentation")}</p>
        <h1>{tSite("Everything you need to build with PyColors.")}</h1>
        <p className={styles.description}>
          {tSite(
            "Find a component, follow a guide, and bring your next idea to life.",
          )}
        </p>
        <FullSearchTrigger
          className={styles.search}
          aria-label={tSite("Search the documentation")}
        />
        <nav
          className={styles.shortcuts}
          aria-label={tSite("Popular documentation")}
        >
          <Link href="/docs/ui/installation">{tSite("Installation")}</Link>
          <Link href="/docs/ui/theming">{tSite("Theming")}</Link>
          <Link href="/docs/starter-pro/getting-started">Starter Pro</Link>
        </nav>
        <div className={styles.heroActions}>
          <Button asChild className="site-primary-action">
            <Link href="/docs/getting-started">{tSite("Get started")}</Link>
          </Button>
          <Link href="/docs/ui">
            {tSite("Browse components")}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DocsHomeQuickstart({
  children,
}: Readonly<{ children: ReactNode }>) {
  const tSite = useCopy();
  return (
    <DocsHomeSection
      id="choose-your-quick-start"
      title="Start with the right command."
      description="Install the UI library, explore Starter Free, or set up your purchased Starter Pro."
    >
      <div
        className={styles.quickstart}
        aria-label={tSite("Choose your quick start")}
      >
        <div className={styles.windowBar}>
          <span className={styles.windowDots} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <Terminal className="size-3.5" aria-hidden="true" />
          <span>{tSite("Your next step")}</span>
        </div>
        {children}
      </div>
    </DocsHomeSection>
  );
}

const buttonExample = `import { Button } from "@pycolors/ui";

export function Example() {
  return (
    <Button asChild>
      <a href="/docs/ui/button">Button</a>
    </Button>
  );
}`;

export function DocsHomeExample() {
  const tSite = useCopy();
  return (
    <DocsHomeSection
      id="see-it-work"
      title="One component. See it work."
      description="A real PyColors component, with the code behind it."
    >
      <div className={styles.example}>
        <figure className={styles.exampleCode}>
          <figcaption>
            <Code2 aria-hidden="true" />
            Button.tsx
          </figcaption>
          <pre tabIndex={0} aria-label={tSite("Button example source code")}>
            <code>{buttonExample}</code>
          </pre>
        </figure>
        <div className={styles.exampleResult}>
          <p className={styles.exampleLabel}>{tSite("Live component")}</p>
          <div className={styles.exampleCanvas}>
            <UiButton asChild>
              <Link href="/docs/ui/button">Button</Link>
            </UiButton>
          </div>
          <p>{tSite("Follows your theme. Supports keyboard navigation.")}</p>
          <Link className={styles.exampleLink} href="/docs/ui/button">
            {tSite("Read the Button guide")}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </DocsHomeSection>
  );
}

type SectionProps = Readonly<{
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}>;
export function DocsHomeSection({
  id,
  title,
  description,
  children,
}: SectionProps) {
  const tSite = useCopy();
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.sectionHeading}>
        <h2 id={id}>{tSite(title)}</h2>
        <p>{tSite(description)}</p>
      </div>
      {children}
    </section>
  );
}

export function DocsHomePaths() {
  const tSite = useCopy();
  const entries = [
    {
      title: "UI",
      href: "/docs/ui",
      description: "Components and API references.",
      icon: Box,
    },
    {
      title: "Blocks",
      href: "/docs/blocks",
      description: "Ready-to-compose product sections.",
      icon: Blocks,
    },
    {
      title: "Starters",
      href: "/docs/getting-started#choose-your-starting-point",
      description: "Choose and set up your application.",
      icon: Layers3,
    },
    {
      title: "Templates",
      href: "/docs/templates",
      description: "Install and adapt your landing page.",
      icon: LayoutTemplate,
    },
  ];
  return (
    <nav
      className={styles.entryNav}
      aria-label={tSite("Explore the documentation")}
    >
      {entries.map(({ title, href, description, icon: Icon }) => (
        <Link key={href} href={href} className={styles.entry}>
          <span className={styles.entryIcon}>
            <Icon aria-hidden="true" />
          </span>
          <span className={styles.entryTitle}>{tSite(title)}</span>
          <span className={styles.entryDescription}>{tSite(description)}</span>
          <ArrowRight className={styles.entryArrow} aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}

export function DocsHomeResources() {
  const tSite = useCopy();
  return (
    <DocsHomeSection
      id="connect-and-launch"
      title="Go from setup to real product flows"
      description="Practical guides for the decisions and integrations ahead."
    >
      <DocsLinks
        variant="grid"
        tone="neutral"
        className="xl:grid-cols-4"
        items={[
          {
            title: "Authentication",
            href: "/docs/starter-pro/auth",
            description: "Sign-in, sessions, and protected routes.",
            icon: LockKeyhole,
          },
          {
            title: "Billing",
            href: "/docs/starter-pro/billing",
            description: "Stripe checkout, webhooks, and subscriptions.",
            icon: CreditCard,
          },
          {
            title: "Usage patterns",
            href: "/docs/ui/usage-patterns",
            description:
              "Bring components together in useful application screens.",
            icon: Code2,
          },
          {
            title: "Production checklist",
            href: "/docs/starter-pro/production-checklist",
            description:
              "Review configuration and verify your flows before launch.",
            icon: ShieldCheck,
          },
        ]}
      />
      <div className={styles.sectionLinks}>
        <Link href="/docs/guides">
          {tSite("Explore all guides")}
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link href="/roadmap">
          {tSite("React Native mobile app · Coming soon")}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </DocsHomeSection>
  );
}

export function DocsHomeAI() {
  const tSite = useCopy();
  const paths = [
    "/docs/ui/installation",
    "/docs/ui/usage-patterns",
    "/docs/ui/theming",
    "/docs/ui/accessibility",
    "/docs/registry/agent-context",
  ];
  const context = [
    tSite(
      "Use the official PyColors documentation for my next task. Inspect this project's installed versions and existing components first. Reuse public APIs, semantic tokens, and accessible controls. Follow this repository's instructions and permissions. Ask about missing requirements and report the checks you run.",
    ),
    ...paths.map((path) => new URL(tSite.href(path), SITE_URL).href),
  ].join("\n\n");
  return (
    <section
      className={styles.aiSection}
      aria-labelledby="build-with-your-agent"
    >
      <div className={styles.aiIntro}>
        <p className={styles.aiEyebrow}>
          <Sparkles aria-hidden="true" />
          {tSite("Build with your AI tools")}
        </p>
        <h2 id="build-with-your-agent">
          {tSite("Give your coding agent the right starting point.")}
        </h2>
        <p>
          {tSite(
            "Copy a focused brief and the relevant public guides into the AI tool you already use. Keep your project's conventions and permissions in control.",
          )}
        </p>
        <Link href="/docs/registry/agent-context">
          {tSite("Read the AI coding guide")}
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
      <DocsContextCopy context={context} />
    </section>
  );
}

export function DocsHomeUpdates() {
  const tSite = useCopy();
  return (
    <section className={styles.updates} aria-labelledby="docs-updates">
      <div>
        <p className={styles.eyebrow}>
          {tSite("Keep your foundation current")}
        </p>
        <h2 id="docs-updates">
          {tSite("Follow what changes. Know what comes next.")}
        </h2>
        <p>
          {tSite(
            "Review release notes and the roadmap before updating your project.",
          )}
        </p>
      </div>
      <div className={styles.releaseLinks}>
        <Link href="/changelog">
          <span>{tSite("Latest release notes")}</span>
          <strong>
            UI {UI_VERSION}
            <span aria-hidden="true"> · </span>Tokens {TOKENS_VERSION}
          </strong>
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link href="/roadmap">
          <span>{tSite("Product roadmap")}</span>
          <strong>{tSite("Shipped, in progress, and planned")}</strong>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function DocsHomeHelp() {
  const tSite = useCopy();
  return (
    <aside
      className={styles.help}
      aria-label={tSite("Find your starting point")}
    >
      <BookOpen
        className="size-5 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">
          {tSite("Not sure where to start?")}
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {tSite("See how the library, blocks, and starters fit your project.")}
        </p>
      </div>
      <Link
        href="/docs/getting-started#choose-your-starting-point"
        className="inline-flex min-h-11 items-center gap-2 rounded text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        {tSite("Find your starting point")}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}

export function DocsHomeFeedback() {
  const tSite = useCopy();
  return (
    <DocsFeedback pageTitle={tSite("PyColors Documentation")} pageUrl="/docs" />
  );
}
