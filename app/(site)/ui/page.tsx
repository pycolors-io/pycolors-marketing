import Link from "next/link";
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
import { UiLivePreview } from "@/components/marketing/ui-live-preview";
import { CopyableCommand } from "@/components/docs/copyable-command";
import { createThemeBuilderState } from "@/components/theme-builder/theme-builder-state";
import { UI_VERSION, formatVersion } from "@/lib/version";

const description =
  "React components and semantic colors for Next.js product interfaces. Try PyColors UI, customize a light and dark theme, and start building with the documentation.";
export const metadata: Metadata = {
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
const primaryAction = "rounded-[5px]";

const saveButtonCode = `import { Button } from "@pycolors/ui";

export function SaveButton() {
  return <Button>Save changes</Button>;
}`;

export default function UiPage() {
  const { generatedTheme } = createThemeBuilderState();
  return (
    <main id="content" tabIndex={-1} className="bg-background text-foreground">
      <Container className="pt-24 pb-10 sm:pt-28 sm:pb-12">
        <UiSectionNav active="overview" />
        <PageHero
          variant="compact"
          align="left"
          badges={[
            { label: "PyColors UI", variant: "outline" },
            { label: formatVersion(UI_VERSION), variant: "outline" },
          ]}
          title="Build your interface. Make it yours."
          description="React components and semantic colors for dashboards, forms, and settings. Explore the UI, shape your theme, and bring it into your Next.js app."
          contentClassName="mx-0 max-w-3xl"
          actions={
            <>
              <Button
                size="lg"
                asChild
                className={`site-primary-action ${primaryAction}`}
              >
                <Link href="/docs/ui/installation">Start building</Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className={primaryAction}
              >
                <a href="#ui-preview">Try the components</a>
              </Button>
            </>
          }
        />
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
          {[
            "Open source · MIT",
            "Light and dark",
            "Semantic color tokens",
            "Keyboard interactions",
          ].map((label) => (
            <MarketingCheckItem key={label} className="text-xs">
              {label}
            </MarketingCheckItem>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border-subtle pt-5">
          <a
            href="https://www.npmjs.com/package/@pycolors/ui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View @pycolors/ui on npm"
            className="inline-flex min-h-10 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <NpmBadges packageName="@pycolors/ui" size="sm" />
          </a>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <p className="text-xs leading-6 text-muted-foreground">
              Versioned · documented · tested · actively maintained
            </p>
            <a
              href="https://github.com/pycolors-io/pycolors-ui"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-10 items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
              aria-label="Open the PyColors UI repository on GitHub"
            >
              View on GitHub
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </a>
          </div>
        </div>
      </Container>

      <MarketingSectionShell
        id="ui-preview"
        aria-label="Try PyColors UI"
        divider="pattern"
        width="full"
        className="scroll-mt-24"
      >
        <Container>
          <UiLivePreview modes={generatedTheme.modes} />
        </Container>
      </MarketingSectionShell>

      <section
        aria-labelledby="ui-components-heading"
        className="border-t border-border-subtle py-12 sm:py-16"
      >
        <Container>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            The component library
          </p>
          <MarketingSectionHeader
            align="left"
            titleId="ui-components-heading"
            title="Small pieces. A consistent product."
            description="Start with the primitives you need. Each component has usage examples, props, and guidance in the documentation."
            action={
              <Link href="/docs/ui" className={textLink}>
                Browse all components{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {componentGroups.map((group) => (
              <MarketingDetailCard
                key={group.title}
                title={group.title}
                description={group.description}
                eyebrow="UI library"
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
                          {label}
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
        aria-labelledby="ui-themes-heading"
        className="border-t border-border-subtle py-12 sm:py-16"
      >
        <Container>
          <div className="grid overflow-hidden rounded-[5px] border border-border-subtle lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <Palette
                aria-hidden="true"
                className="mb-4 size-5 text-muted-foreground"
              />
              <p className="text-xs font-medium text-muted-foreground">
                Your colors, across every surface
              </p>
              <MarketingSectionHeader
                align="left"
                className="mt-2 mb-0"
                titleId="ui-themes-heading"
                title="Make the system feel like your brand."
                description="Choose your brand color, neutrals, and typography in Theme Builder. Explore the palette, try it on components or a dashboard, and export CSS or JSON for both modes."
              />
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                <span>Brand colors</span>
                <span>Neutral surfaces</span>
                <span>Typography</span>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Button
                  asChild
                  className={`site-primary-action ${primaryAction}`}
                >
                  <Link href="/tools/theme-builder">Open Theme Builder</Link>
                </Button>
                <Link href="/docs/ui/theming" className={textLink}>
                  Theming guide
                </Link>
              </div>
            </div>
            <div className="min-w-0 border-t border-border-subtle lg:border-t-0 lg:border-l">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-5 py-4 sm:px-7">
                <p className="text-sm font-medium">One palette. Two modes.</p>
                <span className="text-xs text-muted-foreground">
                  Violet preset
                </span>
              </div>
              {(["light", "dark"] as const).map((mode) => (
                <div
                  key={mode}
                  className="border-b border-border-subtle p-5 sm:p-7"
                  style={{
                    backgroundColor:
                      generatedTheme.modes[mode].semantic.background.srgbHex,
                    color:
                      generatedTheme.modes[mode].semantic.foreground.srgbHex,
                  }}
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {mode === "light"
                        ? "Light appearance"
                        : "Dark appearance"}
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
                      12 accent shades
                    </span>
                  </div>
                  <div
                    role="img"
                    aria-label={`Twelve generated ${mode}-mode accent shades`}
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
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <p className="px-5 py-4 text-xs leading-6 text-muted-foreground sm:px-7">
                Preview your palette and review color contrast in Theme Builder
                before using it in your app.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="ui-install-heading"
        className="border-t border-border-subtle py-12 sm:py-16"
      >
        <Container>
          <div className="grid overflow-hidden rounded-[5px] border border-border-subtle lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <Terminal
                aria-hidden="true"
                className="mb-4 size-5 text-muted-foreground"
              />
              <p className="text-xs font-medium text-muted-foreground">
                From preview to your project
              </p>
              <MarketingSectionHeader
                align="left"
                className="mt-2 mb-0"
                titleId="ui-install-heading"
                title="Start with one component."
                description="Add the components and tokens to your React or Next.js app. Follow the installation guide to configure Tailwind v4, then build your first screen."
              />
              <ol className="mt-8 space-y-6">
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
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-7">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-6 text-muted-foreground">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link href="/docs/ui/installation" className={`${textLink} mt-7`}>
                Read the installation guide{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="flex min-w-0 flex-col border-t border-border-subtle bg-surface-muted/20 lg:border-t-0 lg:border-l">
              <CopyableCommand
                command="pnpm add @pycolors/ui @pycolors/tokens"
                className="my-0 rounded-none border-0 border-b border-border-subtle bg-transparent"
              />
              <div className="flex flex-1 flex-col">
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
                    className:
                      "m-0 flex flex-1 flex-col rounded-none border-0 bg-transparent shadow-none [&>div:first-child]:h-12 [&_button]:size-8 max-sm:[&_button]:size-11 [@media(pointer:coarse)]:[&_button]:size-11",
                    viewportProps: {
                      "aria-label": "Button usage example",
                      className:
                        "flex-1 py-5 [&_pre]:text-xs [&_pre]:leading-8 sm:py-7 sm:[&_pre]:text-sm",
                    },
                  }}
                />
                <div className="border-t border-border-subtle px-5 py-4 text-xs leading-6 text-muted-foreground sm:px-7">
                  After the stylesheet setup in the installation guide.{" "}
                  <Link
                    href="/docs/ui/button"
                    className="font-medium text-foreground underline underline-offset-4"
                  >
                    Button documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="ui-next-heading"
        className="border-t border-border-subtle py-12 sm:py-16"
      >
        <Container>
          <Layers3
            aria-hidden="true"
            className="mb-4 size-5 text-muted-foreground"
          />
          <MarketingSectionHeader
            align="left"
            className="mb-0"
            titleId="ui-next-heading"
            title="Keep building from here."
            description="Use the UI in your existing app, compose a screen, or start with a complete foundation."
            action={
              <Link href="/ui/examples" className={textLink}>
                See product examples{" "}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          <div className="mt-8 grid gap-px overflow-hidden rounded-[5px] border border-border-subtle bg-border-subtle md:grid-cols-3">
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
                    {item.product}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-normal">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className={`${textLink} group mt-7 justify-between border-t border-border-subtle pt-4`}
                >
                  {item.label}
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
