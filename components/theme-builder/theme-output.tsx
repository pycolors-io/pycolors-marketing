"use client";

import Link from "next/link";
import { useState } from "react";

import {
  serializeTheme,
  type ExportFormat,
  type SerializedThemeResult,
} from "@pycolors/color-engine";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pycolors/ui";

import { CopyButton } from "./copy-button";
import { HighlightedThemeCode } from "./theme-code-highlighter";
import type { ThemeCodeLanguage } from "./theme-code-highlighter-types";
import { THEME_BUILDER_CTA_LINKS } from "./theme-builder-launch";

type ThemeOutputProps = Readonly<{
  theme: SerializedThemeResult;
}>;

type OutputArtifact = Readonly<{
  content: string;
  error?: string;
}>;

function outputArtifact(
  theme: SerializedThemeResult,
  format: ExportFormat,
): OutputArtifact {
  const result = serializeTheme(theme, format);
  if (result.ok) return { content: result.value.content };

  return {
    content: "",
    error: result.errors.map((error) => error.message).join(" "),
  };
}

type CodePanelProps = Readonly<{
  title: string;
  content: string;
  language: ThemeCodeLanguage;
  active: boolean;
}>;

function CodePanel({ title, content, language, active }: CodePanelProps) {
  return (
    <div
      data-theme-builder-code-panel
      className="min-w-0 overflow-hidden rounded-[5px] border border-border-subtle bg-white text-foreground"
    >
      <div className="flex flex-col gap-3 border-b border-border-subtle px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">
            Select the output or copy the complete generated artifact.
          </p>
        </div>
        <CopyButton
          value={content}
          label={`Copy ${title}`}
          buttonClassName="border-border-subtle bg-background text-foreground hover:bg-surface-muted hover:text-foreground"
          statusClassName="text-muted-foreground"
        />
      </div>
      <pre
        data-theme-builder-code
        tabIndex={0}
        aria-label={`${title} output. Selectable code.`}
        className="max-h-105 max-w-full overflow-auto p-4 font-mono text-xs leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <HighlightedThemeCode
          content={content}
          language={language}
          active={active}
          colorScheme="adaptive"
        />
      </pre>
    </div>
  );
}

const exportTabs = ["css", "tailwind-v4", "json"] as const;
type ExportTab = (typeof exportTabs)[number];

const INTEGRATION_STEPS: Record<ExportTab, readonly string[]> = {
  css: [
    "Keep the PyColors token import in your global stylesheet.",
    "Paste the generated override after that import so it wins predictably.",
    "Review one light and one dark product screen before committing.",
  ],
  "tailwind-v4": [
    "Import @pycolors/tokens/tokens.css once in your global stylesheet.",
    "Place the generated override after the import and keep the existing @theme inline bridge.",
    "Use semantic utilities and PyColors UI components normally.",
  ],
  json: [
    "Store this evidence alongside your design-token source of truth.",
    "Consume the serialized modes and semantic roles without rebuilding values.",
    "Keep the contrast records available for design review and regression checks.",
  ],
};

function isExportTab(value: string): value is ExportTab {
  return (exportTabs as readonly string[]).includes(value);
}

/** Keep the launch example tied directly to the current serializer output. */
function generatedCssExample(content: string) {
  const [lightMode = "", darkMode = ""] = content.trim().split("\n\n");
  const excerpt = (mode: string) => {
    const lines = mode.split("\n");

    return [
      ...lines.slice(0, 5),
      "  /* Remaining semantic roles are included in the copied export. */",
      "}",
    ];
  };

  return [...excerpt(lightMode), "", ...excerpt(darkMode)].join("\n");
}

/** Display engine-owned export artifacts without rebuilding semantic values. */
export function ThemeOutput({ theme }: ThemeOutputProps) {
  const [activeFormat, setActiveFormat] = useState<ExportTab>("css");
  const css = outputArtifact(theme, "css");
  const tailwind = outputArtifact(theme, "tailwind-v4");
  const json = outputArtifact(theme, "json");
  const error = css.error ?? tailwind.error ?? json.error;

  return (
    <section
      aria-labelledby="theme-builder-output-heading"
      className="min-w-0 space-y-5 rounded-[5px] border border-pro-border-subtle bg-pro-surface p-5 shadow-medium sm:p-6"
    >
      <div className="flex flex-col gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
            04 · Export implementation
          </p>
          <h2
            id="theme-builder-output-heading"
            className="text-xl font-semibold tracking-tight"
          >
            Token exports
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Copy deterministic output from the current valid generated theme.
            Nothing is uploaded or saved.
          </p>
        </div>
        <p className="w-fit rounded-[5px] border border-border-subtle bg-surface-muted px-3 py-2 text-xs text-muted-foreground">
          CSS · Tailwind v4 · JSON
        </p>
      </div>

      {error ? (
        <Alert variant="destructive" ariaLive="assertive">
          <AlertTitle>Export could not be prepared</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <Tabs
            value={activeFormat}
            onValueChange={(value) => {
              if (isExportTab(value)) setActiveFormat(value);
            }}
            className="min-w-0"
          >
            <TabsList
              size="sm"
              className="h-auto max-w-full justify-start gap-1 overflow-x-auto"
            >
              <TabsTrigger value="css" size="sm">
                CSS
              </TabsTrigger>
              <TabsTrigger value="tailwind-v4" size="sm">
                Tailwind v4
              </TabsTrigger>
              <TabsTrigger value="json" size="sm">
                JSON
              </TabsTrigger>
            </TabsList>

            <TabsContent value="css">
              <p className="mb-3 text-sm leading-6 text-muted-foreground">
                Load these semantic overrides after the PyColors token import.
              </p>
              <div className="mb-4 space-y-2 rounded-[5px] border border-border-subtle bg-surface-muted p-4">
                <h3 className="text-sm font-medium text-foreground">
                  Generated override example
                </h3>
                <pre
                  data-theme-builder-code
                  tabIndex={0}
                  aria-label="Compact example of the current generated CSS override"
                  className="max-w-full overflow-auto rounded-[4px] border border-border-subtle bg-white p-4 font-mono text-xs leading-6 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <HighlightedThemeCode
                    content={generatedCssExample(css.content)}
                    language="css"
                    active={activeFormat === "css"}
                    colorScheme="adaptive"
                  />
                </pre>
              </div>
              <CodePanel
                title="CSS"
                content={css.content}
                language="css"
                active={activeFormat === "css"}
              />
            </TabsContent>

            <TabsContent value="tailwind-v4" className="space-y-3">
              <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                <li>
                  Import <code>@pycolors/tokens/tokens.css</code> once in your
                  stylesheet.
                </li>
                <li>Place these generated CSS overrides after that import.</li>
                <li>
                  Use the existing Tailwind v4 semantic utilities and PyColors
                  UI components normally; the package&apos;s{" "}
                  <code>@theme inline</code> bridge already maps them to these
                  variables.
                </li>
              </ol>
              <CodePanel
                title="Tailwind v4 CSS"
                content={tailwind.content}
                language="css"
                active={activeFormat === "tailwind-v4"}
              />
            </TabsContent>

            <TabsContent value="json">
              <p className="mb-3 text-sm leading-6 text-muted-foreground">
                Complete engine evidence, including both modes, scales, contrast
                records, and warnings.
              </p>
              <CodePanel
                title="JSON"
                content={json.content}
                language="json"
                active={activeFormat === "json"}
              />
            </TabsContent>
          </Tabs>

          <section
            aria-labelledby="theme-builder-integration-checklist-heading"
            className="rounded-[5px] border border-border-subtle bg-background/70 p-4 sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  Integration checklist
                </p>
                <h3
                  id="theme-builder-integration-checklist-heading"
                  className="text-base font-semibold tracking-tight"
                >
                  Apply{" "}
                  {activeFormat === "tailwind-v4"
                    ? "Tailwind v4"
                    : activeFormat.toUpperCase()}{" "}
                  safely
                </h3>
              </div>
              <p className="w-fit rounded-[4px] border border-border-subtle bg-surface-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                Current export
              </p>
            </div>
            <ol className="mt-4 grid gap-3 lg:grid-cols-3">
              {INTEGRATION_STEPS[activeFormat].map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-[4px] border border-border-subtle bg-background p-3 text-xs leading-5 text-muted-foreground"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-labelledby="theme-builder-next-steps-heading"
            className="rounded-[5px] border border-pro-border-subtle bg-pro-surface p-4 sm:p-5"
          >
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  05 · Continue with PyColors
                </p>
                <h3
                  id="theme-builder-next-steps-heading"
                  className="text-base font-semibold tracking-tight"
                >
                  Continue with generated tokens
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Copy the current output, then follow the supported PyColors
                  integration path.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {THEME_BUILDER_CTA_LINKS.map((link, index) => (
                  <Button
                    key={link.href}
                    asChild
                    variant={index === 0 ? "default" : "outline"}
                    className="min-h-11 rounded-[5px]"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
