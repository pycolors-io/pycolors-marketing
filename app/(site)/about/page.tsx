import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  Blocks,
  BookOpen,
  Box,
  Braces,
  GitBranch,
  History,
  Layers3,
  LayoutDashboard,
  Map,
  Palette,
  PanelsTopLeft,
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
import styles from "@/components/marketing/about.module.css";

const description =
  "Meet PyColors: UI components, semantic tokens, copyable blocks and SaaS starters created by Patrice Parny to help developers ship credible products faster.";

export const metadata: Metadata = {
  title: "About PyColors",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About PyColors — Premium SaaS UI System & Starters",
    description,
    url: "/about",
    siteName: "PyColors",
    images: ["/seo/og-main.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About PyColors — Premium SaaS UI System & Starters",
    description,
    images: ["/seo/twitter-main.png"],
  },
};

const principles = [
  {
    title: "Documentation comes with the work.",
    description:
      "Usage, examples and integration guides belong alongside the code. Understand the foundation before you adapt it to your product.",
    href: "/docs",
    link: "Read the documentation",
  },
  {
    title: "Consistency carries across products.",
    description:
      "Shared components and semantic tokens give screens a common language. Carry that foundation into your own layouts, colors and brand.",
    href: "/tools/theme-builder",
    link: "Explore Theme Builder",
  },
  {
    title: "Scope should be easy to inspect.",
    description:
      "Know what is included, what is mocked and what you still need to configure. Product pages and setup guides make those boundaries visible.",
    href: "/compare/build-vs-buy",
    link: "Review the tradeoffs",
  },
] as const;

const products = [
  {
    name: "PyColors UI",
    type: "Open source",
    icon: Box,
    purpose: "Build your interface.",
    description:
      "React components built on Radix primitives and semantic tokens, with documentation and usage examples.",
    href: "/ui",
    link: "Explore PyColors UI",
  },
  {
    name: "Blocks",
    type: "Free",
    icon: Blocks,
    purpose: "Compose complete sections.",
    description:
      "Copyable app shells, forms and product sections built with PyColors UI. Bring the source into your own application.",
    href: "/blocks",
    link: "Browse Blocks",
  },
  {
    name: "Theme Builder",
    type: "Free tool",
    icon: Palette,
    purpose: "Make the system your own.",
    description:
      "Explore palettes, preview components and export theme CSS. Give the shared foundation your own visual identity.",
    href: "/tools/theme-builder",
    link: "Customize a theme",
  },
  {
    name: "Starter Free",
    type: "Open source",
    icon: LayoutDashboard,
    purpose: "Validate your product interface.",
    description:
      "A runnable SaaS frontend with dashboard, settings and admin surfaces. Auth, billing and product data are mocked.",
    href: "/starters/free",
    link: "Explore Starter Free",
  },
  {
    name: "Starter Pro",
    type: "Commercial",
    icon: Layers3,
    purpose: "Build on real integrations.",
    description:
      "Auth.js, Stripe and Prisma/PostgreSQL foundations. Configure your services, add product logic and validate before launch.",
    href: "/starters/pro",
    link: "Explore Starter Pro",
  },
  {
    name: "Templates",
    type: "Commercial",
    icon: PanelsTopLeft,
    purpose: "Start with your launch page.",
    description:
      "Focused page templates such as NA-AI Landing. Adapt the content, branding and sections to present your product.",
    href: "/templates",
    link: "Browse templates",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="w-full min-w-0">
          <Breadcrumb
            className={`mb-8 ${styles.breadcrumb}`}
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
            ]}
          />

          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              maxWidth="4xl"
              className={styles.hero}
              badges={[{ label: "About PyColors" }]}
              title="Ship credible SaaS products faster."
              description="Thoughtful interfaces. Connected foundations. PyColors gives developers a consistent starting point for the products they want to build."
              actions={
                <>
                  <MarketingLinkButton>
                    <Link href="#about-ecosystem">
                      Explore the ecosystem
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </Link>
                  </MarketingLinkButton>
                  <Link href="/open-source" className={styles.textLink}>
                    See the open foundations
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </>
              }
            />
            <figure
              className={styles.systemVisual}
              aria-labelledby="about-system-caption"
            >
              <div className={styles.visualGrid} aria-hidden="true" />
              <div className={styles.visualHeader}>
                <span className={styles.visualDot} aria-hidden="true" />
                The PyColors system
              </div>
              <div className={styles.systemCore}>
                <span className={styles.coreMark}>
                  <Braces className="size-7" aria-hidden="true" />
                </span>
                <span className="text-xl font-semibold tracking-tight">
                  PyColors UI
                </span>
                <span className="mt-2 text-xs text-muted-foreground">
                  Components + semantic tokens
                </span>
              </div>
              <div className={styles.systemBranches}>
                {[
                  { label: "Blocks", icon: Blocks },
                  { label: "Templates", icon: PanelsTopLeft },
                  { label: "Starters", icon: LayoutDashboard },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className={styles.systemNode}>
                      <Icon
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
              <figcaption
                id="about-system-caption"
                className={styles.visualCaption}
              >
                One visual language. <span>Room for your product.</span>
              </figcaption>
            </figure>
          </div>

          <nav aria-label="About page sections" className={styles.sectionNav}>
            {[
              ["#about-purpose", "01", "Why PyColors"],
              ["#about-principles", "02", "How we build"],
              ["#about-ecosystem", "03", "The ecosystem"],
              ["#about-progress", "04", "In the open"],
            ].map(([href, number, label]) => (
              <Link key={href} href={href} className={styles.textLink}>
                <span
                  className="font-mono text-[10px] text-muted-foreground"
                  aria-hidden="true"
                >
                  {number}
                </span>
                {label}
              </Link>
            ))}
          </nav>

          <MarketingSectionShell
            id="about-purpose"
            width="full"
            aria-labelledby="about-why-pycolors-exists"
            className="scroll-mt-24"
          >
            <div className={styles.purposePanel}>
              <div className={styles.purposeHeading}>
                <span className={styles.eyebrow}>01 / Why PyColors</span>
                <h2 id="about-why-pycolors-exists">
                  More room for
                  <br className="hidden sm:block" /> your product.
                </h2>
                <p>
                  Less time reconnecting the same foundations. More attention to
                  the experience you are here to build.
                </p>
                <div className={styles.founder}>
                  <span className={styles.founderInitials} aria-hidden="true">
                    PP
                  </span>
                  <div>
                    <p className="text-sm font-medium">Patrice Parny</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Founder of PyColors
                    </p>
                  </div>
                </div>
                <Link href="/contact" className={`${styles.textLink} mt-4`}>
                  Get in touch with PyColors
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
              <div className={styles.purposeBody}>
                <p className="text-lg font-medium leading-8 tracking-tight text-foreground sm:text-xl">
                  A product should feel considered, from its first screen to its
                  everyday workflows.
                </p>
                <p>
                  That takes more than individual components. It takes a common
                  language for layout, color and behavior, with enough structure
                  to carry from one screen to the next.
                </p>
                <p>
                  Created by Patrice Parny, PyColors brings components, semantic
                  tokens, blocks and starters together. Each layer builds on the
                  same UI foundation, with documentation to help you understand
                  and adapt it.
                </p>
                <div className={styles.purposeNote}>
                  <BookOpen
                    className="size-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <p>
                    Start with the source and the documentation. Make the
                    product your own.
                  </p>
                </div>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="about-principles"
            width="full"
            aria-labelledby="about-core-principles"
            className="scroll-mt-24 border-t border-border-subtle"
          >
            <div className={styles.sectionIntro}>
              <span className={styles.eyebrow}>02 / How we build</span>
              <MarketingSectionHeader
                align="left"
                titleId="about-core-principles"
                title="Care in the foundations. Clarity in the details."
                description="The principles behind what we build, and the places where you can see them in practice."
              />
            </div>
            <ol
              className={styles.principleGrid}
              aria-label="PyColors principles"
            >
              {principles.map((item, index) => (
                <li key={item.title} className={styles.principle}>
                  <span className={styles.principleNumber} aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link href={item.href} className={styles.textLink}>
                    {item.link}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="about-ecosystem"
            width="full"
            aria-labelledby="about-how-the-ecosystem-works"
            className="scroll-mt-24 border-t border-border-subtle"
          >
            <div className={styles.ecosystemLayout}>
              <div className={styles.ecosystemIntro}>
                <span className={styles.eyebrow}>03 / The ecosystem</span>
                <MarketingSectionHeader
                  align="left"
                  titleId="about-how-the-ecosystem-works"
                  title="One foundation. Your starting point."
                  description="From a single component to an application, choose the level that matches the work in front of you."
                />
                <Link href="/pricing" className={styles.textLink}>
                  Compare the options
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
                <div className={styles.ecosystemNote}>
                  <GitBranch
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p>
                    Open foundations to explore.
                    <br />
                    Commercial products to build on.
                  </p>
                </div>
              </div>
              <ul aria-label="PyColors products" className={styles.productList}>
                {products.map((product) => {
                  const Icon = product.icon;
                  return (
                    <li key={product.name} className={styles.productRow}>
                      <div>
                        <h3 className="flex items-center gap-3 text-base font-semibold tracking-tight">
                          <Icon
                            className="size-4 shrink-0 text-primary"
                            aria-hidden="true"
                          />
                          {product.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="mt-3 bg-background text-[10px]"
                        >
                          {product.type}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.purpose}</p>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                          {product.description}
                        </p>
                        <Link
                          href={product.href}
                          className={`${styles.textLink} mt-2`}
                        >
                          {product.link}
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-3 border-b border-border-subtle py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-6 text-muted-foreground">
                Learn the approach. See the interface in use.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                <Link href="/guides" className={styles.textLink}>
                  Read the guides
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
                <Link href="/ui/patterns" className={styles.textLink}>
                  Explore patterns
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
                <Link href="/ui/examples" className={styles.textLink}>
                  View examples
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </MarketingSectionShell>

          <MarketingSectionShell
            id="about-progress"
            width="full"
            aria-labelledby="about-what-exists-today-and-what-comes-next"
            className="scroll-mt-24 border-t border-border-subtle"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
              <div>
                <span className={styles.eyebrow}>04 / In the open</span>
                <MarketingSectionHeader
                  align="left"
                  titleId="about-what-exists-today-and-what-comes-next"
                  title="Built in public. Easy to follow."
                  description="Follow the release history and review what is planned. Shipped work and future direction have separate places to inspect."
                />
                <Link href="/open-source" className={styles.textLink}>
                  <GitBranch className="size-4" aria-hidden="true" />
                  Explore the public repositories
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
              <div className={styles.progressPanel}>
                {[
                  {
                    title: "What has shipped",
                    icon: History,
                    description:
                      "Release notes describe the changes to components, documentation and product surfaces.",
                    href: "/changelog",
                    link: "View changelog",
                  },
                  {
                    title: "What is planned",
                    icon: Map,
                    description:
                      "The roadmap separates shipped, active and planned work. Planned items are not part of the current product scope.",
                    href: "/roadmap",
                    link: "View roadmap",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="p-6 sm:p-8">
                      <h3 className="flex items-center gap-3 text-base font-semibold">
                        <Icon
                          className="size-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                      <Link
                        href={item.href}
                        className={`${styles.textLink} mt-3`}
                      >
                        {item.link}
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </MarketingSectionShell>

          <section
            aria-labelledby="about-next-step"
            className="border-t border-border-subtle pt-14 sm:pt-16"
          >
            <MarketingCtaPanel
              titleId="about-next-step"
              title="Start with something you can run."
              description="Explore Starter Free to see the components and layouts working together. Use the documentation to understand the foundation, then choose what your product needs next."
              className={styles.cta}
              actions={
                <MarketingActionGroup>
                  <MarketingLinkButton>
                    <Link href="/starters/free">
                      Try Starter Free
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </MarketingLinkButton>
                  <MarketingLinkButton variant="outline">
                    <Link href="/docs/getting-started">
                      Read the getting started guide
                    </Link>
                  </MarketingLinkButton>
                </MarketingActionGroup>
              }
            />
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-6 text-muted-foreground">
                Starter Free is a frontend demo. Choose Pro when real accounts
                and payments become your next step.
              </p>
              <Link href="/upgrade" className={`${styles.textLink} shrink-0`}>
                Compare Free and Pro
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
