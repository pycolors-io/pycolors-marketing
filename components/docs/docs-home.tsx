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
  Palette,
  Accessibility,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button as UiButton, cn } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import { SITE_URL } from "@/lib/seo/website";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";
import {
  LATEST_MARKETING_RELEASE,
  MARKETING_RELEASE_HREF,
} from "@/lib/marketing-release";
import { DocsLinks } from "./docs-links";
import { DocsContextCopy } from "./docs-context-copy";
import { DocsAssistant } from "./docs-assistant";
import { DocsFeedback } from "./docs-feedback";
import styles from "./docs-home.module.css";

export function DocsHome({ children }: Readonly<{ children: ReactNode }>) {
  return <div className={cn("not-prose", styles.home)}>{children}</div>;
}

export function DocsHomeHero({ children }: Readonly<{ children?: ReactNode }>) {
  const tSite = useCopy();
  return (
    <header className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>{tSite("PyColors Documentation")}</p>
        <h1>{tSite("Build with PyColors.")}</h1>
        <p className={styles.description}>
          {tSite(
            "Install the UI library, explore a starter, and follow the guides to build your product.",
          )}
        </p>
        <div className={styles.heroActions}>
          <Button asChild className="site-primary-action">
            <Link href="/docs/getting-started">{tSite("Get started")}</Link>
          </Button>
          <DocsAssistant className={styles.homeAssistant} />
        </div>
      </div>
      {children}
    </header>
  );
}

export function DocsHomeQuickstart({
  children,
}: Readonly<{ children: ReactNode }>) {
  const tSite = useCopy();
  return (
    <section
      id="choose-your-quick-start"
      className={styles.quickstart}
      aria-label={tSite("Choose your quick start")}
    >
      {children}
    </section>
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
      title: "Starter Free",
      href: "/docs/starter",
      description: "Explore application flows with demo data.",
      icon: Layers3,
    },
    {
      title: "Starter Pro",
      href: "/docs/starter-pro/getting-started",
      description: "Configure your purchased SaaS foundation.",
      icon: ShieldCheck,
    },
    {
      title: "Templates",
      href: "/docs/templates",
      description: "Install and adapt your landing page.",
      icon: LayoutTemplate,
    },
    {
      title: "Design System",
      href: "/docs/design-system",
      description: "Understand colors, typography, and design tokens.",
      icon: Palette,
    },
  ];
  return (
    <section className={styles.discovery} aria-labelledby="docs-next-step">
      <div className={styles.sectionHeading}>
        <h2 id="docs-next-step">{tSite("Explore the PyColors ecosystem.")}</h2>
        <p>{tSite("Explore a product, then follow its setup guide.")}</p>
      </div>
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
            <span className={styles.entryDescription}>
              {tSite(description)}
            </span>
            <ArrowRight className={styles.entryArrow} aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </section>
  );
}

export function DocsHomeResources() {
  const tSite = useCopy();
  return (
    <DocsHomeSection
      id="connect-and-launch"
      title="Guides for your next product flow."
      description="Follow a documented path for authentication, billing, composition, or launch checks."
    >
      <DocsLinks
        variant="grid"
        tone="neutral"
        className={styles.cardGrid}
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
          {
            title: "Theming",
            href: "/docs/ui/theming",
            description: "Apply your colors and support light and dark modes.",
            icon: Palette,
          },
          {
            title: "Accessibility",
            href: "/docs/ui/accessibility",
            description:
              "Check keyboard navigation, focus, and accessible names.",
            icon: Accessibility,
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
    <DocsHomeSection
      id="build-with-your-agent"
      title="Set up your coding agent."
      description="Give your coding agent the official guides and your project's conventions. Copy this brief into the tool you already use."
    >
      <DocsContextCopy context={context} collapsible />
      <DocsLinks
        variant="grid"
        tone="neutral"
        className={styles.cardGrid}
        items={[
          {
            title: "Agent context",
            href: "/docs/registry/agent-context",
            description:
              "Use documented APIs, follow project boundaries, and verify the result.",
            icon: Sparkles,
          },
          {
            title: "Registry",
            href: "/docs/registry",
            description:
              "Understand the documented source-copy workflow and its limits.",
            icon: Blocks,
          },
          {
            title: "UI reference",
            href: "/docs/ui",
            description:
              "Find component props, usage examples, and accessibility guidance.",
            icon: BookOpen,
          },
        ]}
      />
    </DocsHomeSection>
  );
}

export function DocsHomeUpdates() {
  const tSite = useCopy();
  return (
    <DocsHomeSection
      id="docs-updates"
      title="Versions and updates."
      description="Read the release notes and review what is planned before updating your project."
    >
      <div className={styles.releaseLinks}>
        <Link href="/changelog">
          <span>UI {UI_VERSION}</span>
          <div>
            <strong>{tSite("Latest release notes")}</strong>
            <p>{tSite("Review changes across the PyColors ecosystem.")}</p>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link href="/docs/design-system/tokens">
          <span>Tokens {TOKENS_VERSION}</span>
          <div>
            <strong>{tSite("Design tokens")}</strong>
            <p>
              {tSite(
                "Keep your colors, typography, and interface foundations consistent.",
              )}
            </p>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link href={MARKETING_RELEASE_HREF}>
          <span>
            {tSite("Site & Docs")} {LATEST_MARKETING_RELEASE.version}
          </span>
          <div>
            <strong>{tSite("Website and documentation updates")}</strong>
            <p>
              {tSite(
                "Explore the latest announced improvements to the website and documentation.",
              )}
            </p>
            <time dateTime={LATEST_MARKETING_RELEASE.dateISO}>
              {new Intl.DateTimeFormat(tSite.locale, {
                dateStyle: "medium",
                timeZone: "UTC",
              }).format(
                new Date(`${LATEST_MARKETING_RELEASE.dateISO}T00:00:00Z`),
              )}
            </time>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link href="/roadmap">
          <span>{tSite("Coming next")}</span>
          <div>
            <strong>{tSite("Product roadmap")}</strong>
            <p>{tSite("Shipped, in progress, and planned")}</p>
          </div>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </DocsHomeSection>
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
