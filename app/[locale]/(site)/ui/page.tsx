import { MarketingBreadcrumb } from "@/components/marketing/breadcrumb";
import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  AppWindow,
  Code2,
  LayoutGrid,
  Layers3,
  MessageSquare,
  MousePointer2,
  Palette,
  PanelsTopLeft,
  ShieldCheck,
  Table2,
  Terminal,
  TextCursorInput,
} from "lucide-react";
import { SiteButton as Button } from "@/components/site-button";
import { SCALE_STEPS } from "@pycolors/color-engine";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Container } from "@/components/container";
import { NpmBadges } from "@/components/npm-badges";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingSectionShell } from "@/components/marketing/section-shell";
import { MarketingSectionHeader } from "@/components/marketing/section-header";
import { MarketingDetailCard } from "@/components/marketing/detail-card";
import { MarketingCardIllustration } from "@/components/marketing/card-illustration";
import { MarketingCheckItem } from "@/components/marketing/check-item";
import { UiSectionNav } from "@/components/marketing/ui-section-nav";
import { MarketingSectionNav } from "@/components/marketing/section-nav";
import { UiLivePreview } from "@/components/marketing/ui-live-preview";
import { CopyableCommand } from "@/components/docs/copyable-command";
import { createThemeBuilderState } from "@/components/theme-builder/theme-builder-state";
import { UI_VERSION, formatVersion } from "@/lib/version";
import { UI_EXPLORER_URL } from "@/lib/docs/ui-explorer";
import styles from "@/components/marketing/catalogue-hub.module.css";

const description =
  "React components and semantic colors for Next.js product interfaces. Try PyColors UI, customize a light and dark theme, and start building with the documentation.";
const metadata: Metadata = {
  title: "PyColors UI — Components for your next product",
  description,
  alternates: { canonical: "/ui" },
  openGraph: {
    title: "PyColors UI — Components for your next product",
    description,
    url: "/ui",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PyColors UI — Components for your next product",
    description,
    images: ["/seo/twitter-main.png"],
  },
};

const componentGroups = [
  {
    title: "Actions",
    illustration: "actions",
    icon: MousePointer2,
    description: "Make the next step clear.",
    links: [
      ["Button", "button"],
      ["Dropdown Menu", "dropdown-menu"],
      ["Tabs", "tabs"],
    ],
  },
  {
    title: "Forms",
    illustration: "forms",
    icon: TextCursorInput,
    description: "Collect input with clear feedback.",
    links: [
      ["Input", "input"],
      ["Checkbox", "checkbox"],
      ["Textarea", "textarea"],
      ["Password Input", "password-input"],
    ],
  },
  {
    title: "Overlays",
    illustration: "overlays",
    icon: PanelsTopLeft,
    description: "Keep focused tasks in context.",
    links: [
      ["Dialog", "dialog"],
      ["Sheet", "sheet"],
    ],
  },
  {
    title: "Data",
    illustration: "data",
    icon: Table2,
    description: "Organize records and navigation.",
    links: [
      ["Table", "table"],
      ["Pagination", "pagination"],
    ],
  },
  {
    title: "Feedback",
    illustration: "feedback",
    icon: MessageSquare,
    description: "Show progress, results, and next steps.",
    links: [
      ["Alert", "alert"],
      ["Toast", "toast"],
      ["Empty State", "empty-state"],
      ["Skeleton", "skeleton"],
    ],
  },
  {
    title: "Structure",
    illustration: "structure",
    icon: LayoutGrid,
    description: "Give every screen a shared language.",
    links: [
      ["Card", "card"],
      ["Badge", "badge"],
      ["Separator", "separator"],
    ],
  },
] as const;

const nextSteps = [
  {
    title: "Compose an assistant interface",
    product: "Free UI",
    icon: MessageSquare,
    description:
      "Explore conversation, message and copy-feedback primitives alongside AIComposer. Check the guide for package-version availability; your application supplies the model connection.",
    href: "#conversation-primitives",
    label: "Try conversation primitives",
  },
  {
    title: "Compose a screen",
    product: "Patterns",
    icon: Layers3,
    description:
      "Explore layout patterns for settings, dashboards, and everyday product flows.",
    href: "/ui/patterns",
    label: "Explore patterns",
  },
  {
    title: "Start with an app",
    product: "Starter Free",
    icon: AppWindow,
    description:
      "See the components inside a runnable Next.js interface with Starter Free.",
    href: "/starters/free",
    label: "Explore Starter Free",
  },
  {
    title: "Connect the business layer",
    product: "Starter Pro",
    icon: ShieldCheck,
    description:
      "Explore Starter Pro for authentication, Stripe billing, and protected product routes.",
    href: "/starters/pro",
    label: "Explore Starter Pro",
  },
] as const;

const textLink =
  "inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const primaryAction = "rounded-full px-5";

const uiPageSections = [
  { href: "#ui-preview", label: "Try PyColors UI" },
  { href: "#ui-components", label: "The component library" },
  { href: "#ui-themes", label: "Theme Builder" },
  { href: "#ui-install", label: "From preview to your project" },
  { href: "#ui-next", label: "Next steps" },
] as const;

const saveButtonCode = `import { Button } from "@pycolors/ui";

export function SaveButton() {
  return <Button>Save changes</Button>;
}`;

export default function UiPage() {
  const tSite = useCopy();

  const { generatedTheme } = createThemeBuilderState();
  return (
    <main
      id="content"
      tabIndex={-1}
      className={`bg-background text-foreground ${styles.cataloguePage} ${styles.uiPage}`}
    >
      <Container className={styles.uiDiscoveryHeader}>
        <UiSectionNav
          active="overview"
          breadcrumb={<MarketingBreadcrumb route="/ui" />}
        />
      </Container>
      <div className={styles.uiProductBar}>
        <Container className={styles.uiProductBarInner}>
          <span className={styles.uiProductIdentity}>
            {tSite("PyColors UI")}
          </span>
          <MarketingSectionNav
            items={uiPageSections.map((item) => ({
              ...item,
              label: tSite(item.label),
            }))}
            label="On this page"
          />
        </Container>
      </div>
      <Container className={styles.uiHeroContainer}>
        <PageHero
          className={`${styles.heroFrame} ${styles.uiHero}`}
          variant="compact"
          align="center"
          badges={[
            { label: "PyColors UI", variant: "outline" },
            { label: formatVersion(UI_VERSION), variant: "outline" },
          ]}
          title={tSite("Build your interface. Make it yours.")}
          description={tSite(
            "React components and semantic colors for dashboards, forms, and settings. Explore the UI, shape your theme, and bring it into your Next.js app.",
          )}
          contentClassName="mx-auto max-w-4xl"
          actions={
            <>
              <Button
                size="lg"
                asChild
                className={`site-primary-action ${primaryAction}`}
              >
                <Link href="/docs/ui/installation">
                  {tSite("Start building")}
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className={primaryAction}
              >
                <a
                  href={UI_EXPLORER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-description={tSite("Opens in a new tab")}
                >
                  {tSite("Explore components")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
              <a href="#ui-preview" className={`${textLink} justify-center`}>
                {tSite("Try the components")}
              </a>
            </>
          }
        />
        <ul
          className={`mt-7 flex flex-wrap gap-x-6 gap-y-2 ${styles.proofStrip}`}
        >
          {[
            "Open source · MIT",
            "Light and dark",
            "Semantic color tokens",
            "Keyboard interactions",
          ].map((label) => (
            <MarketingCheckItem key={label} className="text-xs">
              {tSite(label)}
            </MarketingCheckItem>
          ))}
        </ul>
        <div className={styles.uiProductMeta}>
          <a
            href="https://www.npmjs.com/package/@pycolors/ui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tSite("View @pycolors/ui on npm")}
            className="inline-flex min-h-10 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <NpmBadges packageName="@pycolors/ui" size="sm" />
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <p className="text-xs leading-6 text-muted-foreground">
              {tSite("Versioned · documented · tested · actively maintained")}
            </p>
            <a
              href="https://github.com/pycolors-io/pycolors-ui"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-10 items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
              aria-label={tSite("Open the PyColors UI repository on GitHub")}
            >
              {tSite("View on GitHub")}
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </a>
          </div>
        </div>
      </Container>

      <MarketingSectionShell
        id="ui-preview"
        aria-label={tSite("Try PyColors UI")}
        width="full"
        className={`${styles.uiSection} ${styles.uiPreviewChapter}`}
      >
        <Container>
          <div className={styles.uiPreviewPanel}>
            <UiLivePreview modes={generatedTheme.modes} />
          </div>
        </Container>
      </MarketingSectionShell>

      <section
        id="ui-components"
        aria-labelledby="ui-components-heading"
        className={`${styles.uiSection} ${styles.uiContentSection} ${styles.uiLibrarySection}`}
      >
        <Container>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            {tSite("The component library")}
          </p>
          <MarketingSectionHeader
            align="left"
            titleId="ui-components-heading"
            className={styles.uiProductHeading}
            title={tSite("Small pieces. A consistent product.")}
            description={tSite(
              "Start with the primitives you need. Each component has usage examples, props, and guidance in the documentation.",
            )}
            action={
              <Link href="/docs/ui" className={textLink}>
                {tSite("Browse all components")}{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          <div
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${styles.uiComponentGrid}`}
          >
            {componentGroups.map((group) => (
              <MarketingDetailCard
                key={group.title}
                className={`${styles.componentCard} ${styles.uiComponentCard} ${
                  group.illustration === "forms"
                    ? styles.lilacCard
                    : group.illustration === "feedback"
                      ? styles.peachCard
                      : ""
                }`}
                title={tSite(group.title)}
                description={tSite(group.description)}
                eyebrow={tSite("UI library")}
                icon={<group.icon />}
                meta={`${group.links.length} components`}
                visual={<MarketingCardIllustration kind={group.illustration} />}
                footer={
                  <ul className="divide-y divide-border-subtle">
                    {group.links.map(([label, slug]) => (
                      <li key={slug}>
                        <Link
                          href={`/docs/ui/${slug}`}
                          className="group -mx-2 flex min-h-10 items-center justify-between gap-3 rounded-[3px] px-2 text-sm text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
                        >
                          {tSite(label)}
                          <ArrowRight
                            aria-hidden="true"
                            className="size-3.5 shrink-0 opacity-40 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <section
        id="ui-themes"
        aria-labelledby="ui-themes-heading"
        className={`${styles.uiSection} ${styles.uiContentSection}`}
      >
        <Container>
          <div
            className={`grid overflow-hidden border border-border-subtle lg:grid-cols-[0.9fr_1.1fr] ${styles.exampleFrame} ${styles.uiThemeFrame}`}
          >
            <div
              className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${styles.brandIntro} ${styles.uiThemeIntro}`}
            >
              <Palette
                aria-hidden="true"
                className="mb-4 size-5 text-muted-foreground"
              />
              <p className="text-xs font-medium text-muted-foreground">
                {tSite("Your colors, across every surface")}
              </p>
              <MarketingSectionHeader
                align="left"
                className="mt-2 mb-0"
                titleId="ui-themes-heading"
                title={tSite("Make the system feel like your brand.")}
                description={tSite(
                  "Choose your brand color, neutrals, and typography in Theme Builder. Explore the palette, try it on components or a dashboard, and export CSS or JSON for both modes.",
                )}
              />
              <div className={styles.uiThemeCapabilities}>
                <span>{tSite("Brand colors")}</span>
                <span>{tSite("Neutral surfaces")}</span>
                <span>{tSite("Typography")}</span>
              </div>
              <div className={styles.uiThemeActions}>
                <Button
                  asChild
                  className={`site-primary-action ${styles.uiThemeAction}`}
                >
                  <Link href="/tools/theme-builder">
                    {tSite("Open Theme Builder")}
                  </Link>
                </Button>
                <Link href="/docs/ui/theming" className={textLink}>
                  {tSite("Theming guide")}
                </Link>
              </div>
            </div>
            <div className={styles.uiThemePreview}>
              <div className={styles.uiPaletteHeader}>
                <p className="text-sm font-medium">
                  {tSite("One palette. Two modes.")}
                </p>
                <span className="text-xs text-muted-foreground">
                  {tSite("Violet preset")}
                </span>
              </div>
              {(["light", "dark"] as const).map((mode) => (
                <div
                  key={mode}
                  className={styles.uiModeSample}
                  style={{
                    backgroundColor:
                      generatedTheme.modes[mode].semantic.background.srgbHex,
                    color:
                      generatedTheme.modes[mode].semantic.foreground.srgbHex,
                    borderColor:
                      generatedTheme.modes[mode].semantic.border.srgbHex,
                  }}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {tSite(
                        mode === "light"
                          ? "Light appearance"
                          : "Dark appearance",
                      )}
                    </p>
                    <span
                      className="text-[11px]"
                      style={{
                        color:
                          generatedTheme.modes[mode].semantic[
                            "muted-foreground"
                          ].srgbHex,
                      }}
                    >
                      {tSite("12 accent shades")}
                    </span>
                  </div>
                  <div
                    role="img"
                    aria-label={tSite(
                      "Twelve generated {value0}-mode accent shades",
                      { value0: mode },
                    )}
                    className="grid h-12 grid-cols-12 gap-1"
                  >
                    {SCALE_STEPS.map((step) => (
                      <span
                        key={step}
                        className="min-w-0 rounded-[3px] border border-black/10"
                        style={{
                          backgroundColor:
                            generatedTheme.modes[mode].scales.accent[step]
                              .srgbHex,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                    {(
                      [
                        ["background", "Background"],
                        ["foreground", "Text"],
                        ["primary", "Primary"],
                      ] as const
                    ).map(([role, label]) => (
                      <span
                        key={role}
                        className="inline-flex items-center gap-2 text-[11px]"
                      >
                        <span
                          aria-hidden="true"
                          className="size-3 rounded-full border"
                          style={{
                            backgroundColor:
                              generatedTheme.modes[mode].semantic[role].srgbHex,
                            borderColor:
                              generatedTheme.modes[mode].semantic.border
                                .srgbHex,
                          }}
                        />
                        {tSite(label)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <p className={styles.uiPaletteNote}>
                {tSite(
                  "Preview your palette and review color contrast in Theme Builder before using it in your app.",
                )}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="ui-install"
        aria-labelledby="ui-install-heading"
        className={`${styles.uiSection} ${styles.uiContentSection}`}
      >
        <Container>
          <div
            className={`grid overflow-hidden border border-border-subtle lg:grid-cols-[0.9fr_1.1fr] ${styles.exampleFrame} ${styles.uiInstallFrame}`}
          >
            <div
              className={`p-6 sm:p-8 lg:p-10 ${styles.installIntro} ${styles.uiInstallIntro}`}
            >
              <Terminal
                aria-hidden="true"
                className="mb-4 size-5 text-muted-foreground"
              />
              <p className="text-xs font-medium text-muted-foreground">
                {tSite("From preview to your project")}
              </p>
              <MarketingSectionHeader
                align="left"
                className="mt-2 mb-0"
                titleId="ui-install-heading"
                title={tSite("Start with one component.")}
                description={tSite(
                  "Add the components and tokens to your React or Next.js app. Follow the installation guide to configure Tailwind v4, then build your first screen.",
                )}
              />
              <ol className={styles.uiInstallSteps}>
                {[
                  {
                    title: "Install the packages",
                    detail: "Add the components and shared color tokens.",
                  },
                  {
                    title: "Connect your styles",
                    detail: "Load the token CSS and configure Tailwind v4.",
                  },
                  {
                    title: "Build your first screen",
                    detail: "Import a component and check both color modes.",
                  },
                ].map((step, index) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="grid size-7 shrink-0 place-items-center rounded-[5px] border border-border-subtle bg-surface-muted/40 font-mono text-[11px] text-muted-foreground">
                      {tSite(String(index + 1).padStart(2, "0"))}
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-7">
                        {tSite(step.title)}
                      </p>
                      <p className="mt-0.5 text-xs leading-6 text-muted-foreground">
                        {tSite(step.detail)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href="/docs/ui/installation" className={`${textLink} mt-7`}>
                {tSite("Read the installation guide")}
                {tSite("  ")}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className={styles.uiCodeStage}>
              <CopyableCommand
                command="pnpm add @pycolors/ui @pycolors/tokens"
                className={styles.uiCommand}
              />
              <div className={styles.uiCodeBody}>
                <DynamicCodeBlock
                  lang="tsx"
                  code={saveButtonCode}
                  options={{
                    themes: { light: "github-light", dark: "github-dark" },
                  }}
                  codeblock={{
                    title: "save-button.tsx",
                    icon: (
                      <Code2 aria-hidden="true" className="size-4 shrink-0" />
                    ),
                    allowCopy: true,
                    keepBackground: true,
                    className: styles.uiCodeFigure,
                    viewportProps: {
                      "aria-label": "Button usage example",
                      className: styles.uiCodeViewport,
                    },
                  }}
                />
                <div className={styles.uiCodeNote}>
                  {tSite(
                    "After the stylesheet setup in the installation guide.",
                  )}
                  {tSite("  ")}
                  <Link
                    href="/docs/ui/button"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    {tSite("Button documentation")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="ui-next"
        aria-labelledby="ui-next-heading"
        className={`${styles.uiSection} ${styles.uiContentSection}`}
      >
        <Container>
          <Layers3
            aria-hidden="true"
            className="mb-4 size-5 text-muted-foreground"
          />
          <MarketingSectionHeader
            align="left"
            className={`mb-0 ${styles.uiProductHeading}`}
            titleId="ui-next-heading"
            title={tSite("Keep building from here.")}
            description={tSite(
              "Use the UI in your existing app, compose a screen, or start with a complete foundation.",
            )}
            action={
              <Link href="/ui/examples" className={textLink}>
                {tSite("See product examples")}{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          <div
            className={`mt-8 grid gap-5 md:grid-cols-2 ${styles.nextCards} ${styles.uiProductNext}`}
          >
            {nextSteps.map((item) => (
              <div
                key={item.title}
                className="flex min-w-0 flex-col bg-background p-6 sm:p-8"
              >
                <div className="mb-7 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-[5px] border border-border-subtle bg-surface-muted/40">
                    <item.icon
                      aria-hidden="true"
                      className="size-4 text-muted-foreground"
                    />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {tSite(item.product)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-normal">
                  {tSite(item.title)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {tSite(item.description)}
                </p>
                <Link
                  href={item.href}
                  className={`${textLink} group mt-7 justify-between border-t border-border-subtle pt-4`}
                >
                  {tSite(item.label)}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/ui", locale);
}
