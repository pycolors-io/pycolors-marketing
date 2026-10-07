import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Braces,
  Code2,
  Component,
  GitBranch,
  Globe,
  History,
  LayoutDashboard,
  ListChecks,
  Map,
  Palette,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@pycolors/ui";

import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import {
  MarketingActionGroup,
  MarketingCtaPanel,
  MarketingLinkButton,
} from "@/components/marketing/cta-panel";
import styles from "@/components/marketing/open-source.module.css";

const description =
  "Explore the code behind PyColors: open-source UI components, semantic tokens, TypeScript and ESLint tooling, Starter Free and the public website.";

export const metadata: Metadata = {
  title: "Open-Source SaaS UI & Developer Tools",
  description,
  alternates: { canonical: "/open-source" },
  openGraph: {
    title: "Open-Source SaaS UI & Developer Tools — PyColors",
    description,
    url: "/open-source",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open-Source SaaS UI & Developer Tools — PyColors",
    description,
    images: ["/seo/twitter-main.png"],
  },
};

type Repository = {
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: LucideIcon;
  detail: string;
  guide?: { href: string; label: string };
};

const repositoryGroups: {
  id: string;
  title: string;
  description: string;
  repositories: Repository[];
}[] = [
  {
    id: "foundations",
    title: "Core foundations",
    description: "The shared language behind PyColors interfaces.",
    repositories: [
      {
        name: "PyColors UI",
        slug: "pycolors-ui",
        category: "UI components",
        icon: Component,
        description:
          "React components built on Radix primitives and semantic tokens. Inspect the source, examples and interaction patterns before adding them to your app.",
        detail: "React · Radix · TypeScript",
        guide: { href: "/docs/ui", label: "Read the UI docs" },
      },
      {
        name: "PyColors Tokens",
        slug: "pycolors-tokens",
        category: "Design tokens",
        icon: Palette,
        description:
          "Semantic CSS variables for color, radius and surface styles. Keep light and dark themes consistent across your components and product screens.",
        detail: "CSS variables · Light & dark themes",
        guide: {
          href: "/docs/design-system/tokens",
          label: "Explore the tokens",
        },
      },
    ],
  },
  {
    id: "tooling",
    title: "Developer tooling",
    description: "Shared conventions for the code around your interface.",
    repositories: [
      {
        name: "ESLint config",
        slug: "pycolors-eslint-config",
        category: "Code quality",
        icon: ListChecks,
        description:
          "Shared ESLint configurations for Next.js, React and TypeScript projects.",
        detail: "Next.js · React · TypeScript",
      },
      {
        name: "TypeScript config",
        slug: "pycolors-typescript-config",
        category: "Type checking",
        icon: Braces,
        description:
          "Strict TypeScript presets for applications and React libraries, with consistent compiler defaults.",
        detail: "Shared tsconfig presets",
      },
    ],
  },
  {
    id: "in-practice",
    title: "The foundations in use",
    description: "See how the pieces come together in a running application.",
    repositories: [
      {
        name: "Starter Free",
        slug: "pycolors-starter-free",
        category: "Frontend demo",
        icon: LayoutDashboard,
        description:
          "Dashboard, auth screens, settings and billing UI. Auth, billing and product data are mocked; connect your own backend when you are ready.",
        detail: "Next.js · PyColors UI",
        guide: { href: "/starters/free", label: "Explore Starter Free" },
      },
      {
        name: "PyColors website",
        slug: "pycolors-marketing",
        category: "Marketing & docs",
        icon: Globe,
        description:
          "The public mirror of this website. Explore the product pages, documentation and content structure built with Next.js and Fumadocs.",
        detail: "Next.js · Fumadocs",
        guide: { href: "/about", label: "About PyColors" },
      },
    ],
  },
];

const repositoryCount = repositoryGroups.reduce(
  (count, group) => count + group.repositories.length,
  0,
);

const startingPoints = [
  {
    icon: Code2,
    title: "Add UI to an existing app.",
    description:
      "Install the components, connect the styles and render your first interface.",
    href: "/docs/ui/installation",
    label: "Install PyColors UI",
  },
  {
    icon: LayoutDashboard,
    title: "Start with a complete interface.",
    description:
      "Run Starter Free locally and explore the screens with demo data.",
    href: "/docs/starter",
    label: "Set up Starter Free",
  },
  {
    icon: Palette,
    title: "Make the theme your own.",
    description:
      "Explore colors, preview components and export the tokens for your project.",
    href: "/tools/theme-builder",
    label: "Open Theme Builder",
  },
] as const;

function RepositoryCard({
  repository,
  featured,
}: Readonly<{
  repository: Repository;
  featured: boolean;
}>) {
  const Icon = repository.icon;
  return (
    <article
      aria-labelledby={`repo-${repository.slug}`}
      className={`${styles.repoCard} ${featured ? styles.featuredRepo : ""}`}
    >
      <div className={styles.repoHeader}>
        <span className={styles.repoIcon}>
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <Badge variant="outline" className={styles.repoBadge}>
          {repository.category}
        </Badge>
      </div>
      <div className={styles.repoContent}>
        <h4 id={`repo-${repository.slug}`}>{repository.name}</h4>
        <p className={styles.repoSlug}>{repository.slug}</p>
        <p className={styles.repoDescription}>{repository.description}</p>
      </div>
      <div className={styles.repoFooter}>
        <p className={styles.repoDetail}>{repository.detail}</p>
        <div className={styles.repoLinks}>
          {repository.guide ? (
            <Link href={repository.guide.href} className={styles.textLink}>
              {repository.guide.label}
              <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
            </Link>
          ) : null}
          <a
            href={`https://github.com/pycolors-io/${repository.slug}`}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.sourceLink}
            aria-label={`View ${repository.slug} on GitHub (opens in a new tab)`}
          >
            View source
            <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function OpenSourcePage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-24 sm:pb-24 sm:pt-28">
        <Breadcrumb
          className={styles.breadcrumb}
          items={[
            { label: "Home", href: "/" },
            { label: "Open source", href: "/open-source" },
          ]}
        />
        <div className={styles.heroLayout}>
          <PageHero
            variant="compact"
            align="left"
            contentClassName="mx-0"
            className={styles.hero}
            badges={[
              {
                label: "Open source",
                icon: <GitBranch className="size-3.5" aria-hidden="true" />,
              },
            ]}
            title="Read the code. Build with confidence."
            description="UI components, semantic tokens and tools you can inspect and use. Start with the open foundations behind PyColors, then make them part of your product."
            actions={
              <>
                <MarketingLinkButton>
                  <Link href="#repositories">
                    Explore repositories
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </Link>
                </MarketingLinkButton>
                <Link href="/docs/getting-started" className={styles.textLink}>
                  Read the documentation
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </>
            }
          />
          <figure
            className={styles.foundation}
            aria-labelledby="foundation-caption"
          >
            <div className={styles.foundationHeader}>
              <span>
                <GitBranch className="size-4" aria-hidden="true" /> pycolors-io
              </span>
              <span>{repositoryCount} public repositories</span>
            </div>
            <ol className={styles.layers} aria-label="Open foundation layers">
              {[
                {
                  name: "Semantic tokens",
                  detail: "A shared visual language",
                  icon: Palette,
                },
                {
                  name: "UI components",
                  detail: "Reusable interface primitives",
                  icon: Component,
                },
                {
                  name: "Starter Free",
                  detail: "A runnable frontend demo",
                  icon: LayoutDashboard,
                },
              ].map(({ name, detail, icon: Icon }, index) => (
                <li key={name} className={styles.layer}>
                  <span className={styles.layerIcon}>
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p>{name}</p>
                    <span>{detail}</span>
                  </div>
                  <span className={styles.layerNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                </li>
              ))}
            </ol>
            <figcaption
              id="foundation-caption"
              className={styles.foundationCaption}
            >
              <Braces className="size-4 shrink-0" aria-hidden="true" />
              Shared TypeScript & ESLint configurations
            </figcaption>
          </figure>
        </div>

        <nav
          aria-label="Open source page sections"
          className={styles.sectionNav}
        >
          {[
            ["#repositories", "01", "Explore the source"],
            ["#getting-started", "02", "Start building"],
            ["#open-core", "03", "Open & commercial"],
          ].map(([href, number, label]) => (
            <Link key={href} href={href!} className={styles.textLink}>
              <span className={styles.navNumber} aria-hidden="true">
                {number}
              </span>
              {label}
              <ArrowDown
                className="ml-auto size-3.5 shrink-0"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <MarketingSectionShell
          id="repositories"
          width="full"
          aria-labelledby="open-source-repositories"
          className={styles.section}
        >
          <span className={styles.eyebrow}>01 / Public repositories</span>
          <MarketingSectionHeader
            align="left"
            titleId="open-source-repositories"
            title="The code behind the ecosystem."
            description="Each repository has a clear role. Explore its source, read its documentation and choose the pieces your project needs."
          />
          <div className={styles.repositoryGroups}>
            {repositoryGroups.map((group) => (
              <div key={group.id} className={styles.repositoryGroup}>
                <div className={styles.groupIntro}>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <div className={styles.repoGrid}>
                  {group.repositories.map((repository) => (
                    <RepositoryCard
                      key={repository.slug}
                      repository={repository}
                      featured={group.id === "foundations"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.repositoryNote}>
            <GitBranch className="size-4 shrink-0" aria-hidden="true" />
            Public repositories are synchronized from the PyColors monorepo.
            Check each repository’s README for its contribution guidance.
          </p>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="getting-started"
          width="full"
          aria-labelledby="open-source-getting-started"
          className={`${styles.section} ${styles.dividedSection}`}
        >
          <span className={styles.eyebrow}>02 / Your first step</span>
          <MarketingSectionHeader
            align="left"
            titleId="open-source-getting-started"
            title="From source to your first screen."
            description="Choose the path that fits what you are building today."
          />
          <div className={styles.startingGrid}>
            {startingPoints.map(
              ({ icon: Icon, title, description, href, label }) => (
                <div key={href} className={styles.startingPoint}>
                  <Icon
                    className="size-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Link href={href} className={styles.textLink}>
                    {label}
                    <ArrowRight
                      className="size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              ),
            )}
          </div>
        </MarketingSectionShell>

        <MarketingSectionShell
          id="open-core"
          width="full"
          aria-labelledby="open-source-open-core-strategy"
          className={`${styles.section} ${styles.dividedSection}`}
        >
          <div className={styles.modelPanel}>
            <div className={styles.modelIntro}>
              <span className={styles.eyebrow}>03 / Open & commercial</span>
              <h2 id="open-source-open-core-strategy">
                One foundation.
                <br />
                Different starting points.
              </h2>
              <p>
                The open-source layer gives you components, conventions and a
                frontend demo. Commercial products add a more complete starting
                point for a specific project.
              </p>
              <Link href="/pricing" className={styles.textLink}>
                Compare the products
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.modelOptions}>
              <section aria-labelledby="open-foundation-heading">
                <Badge variant="outline" className={styles.repoBadge}>
                  Open source
                </Badge>
                <h3 id="open-foundation-heading">Inspect, adopt and adapt.</h3>
                <p>
                  UI components, tokens, developer tooling and Starter Free. Use
                  the source under each repository’s license and connect your
                  own application services.
                </p>
                <Link href="/ui" className={styles.textLink}>
                  Explore PyColors UI
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </section>
              <section aria-labelledby="commercial-products-heading">
                <Badge variant="outline" className={styles.repoBadge}>
                  Commercial products
                </Badge>
                <h3 id="commercial-products-heading">
                  Start with more already connected.
                </h3>
                <p>
                  Starter Pro provides the SaaS foundation for auth, billing and
                  protected routes. NA-AI Landing provides a dedicated landing
                  page template. Configure, customize and validate before
                  launch.
                </p>
                <div className={styles.modelLinks}>
                  <Link href="/starters/pro" className={styles.textLink}>
                    Starter Pro
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/templates/na-ai-landing"
                    className={styles.textLink}
                  >
                    NA-AI Landing
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </section>
            </div>
          </div>
          <div className={styles.licenseNote}>
            <Scale className="mt-1 size-4 shrink-0" aria-hidden="true" />
            <p>
              Public repositories are governed by their repository licenses.
              Premium products, commercial access, private releases, and brand
              assets remain subject to separate commercial terms.
            </p>
            <Link href="/license" className={styles.textLink}>
              License overview
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </MarketingSectionShell>

        <section
          aria-labelledby="open-source-follow"
          className={styles.followSection}
        >
          <MarketingCtaPanel
            titleId="open-source-follow"
            title="Follow the work. See what changes."
            description="Read the release history and explore the roadmap. Shipped changes and future plans each have a place to follow."
            className={styles.followPanel}
            actions={
              <MarketingActionGroup>
                <MarketingLinkButton variant="outline">
                  <Link href="/changelog">
                    <History className="size-4" aria-hidden="true" />
                    View changelog
                  </Link>
                </MarketingLinkButton>
                <Link href="/roadmap" className={styles.textLink}>
                  <Map className="size-4" aria-hidden="true" />
                  View roadmap
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </MarketingActionGroup>
            }
          />
          <p className={styles.contactNote}>
            <BookOpen className="size-4 shrink-0" aria-hidden="true" />A
            question about the right starting point?
            <Link href="/contact" className={styles.textLink}>
              Get in touch
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </p>
        </section>
      </Container>
    </main>
  );
}
