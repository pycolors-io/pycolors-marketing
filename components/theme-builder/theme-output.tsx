"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Code2 } from "lucide-react";
import { useTheme } from "fumadocs-ui/provider/base";

import {
  serializeTheme,
  type ExportFormat,
  type SerializedThemeResult,
} from "@pycolors/color-engine";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";

import { CopyButton } from "./copy-button";
import { DownloadButton } from "./download-button";
import { HighlightedThemeCode } from "./theme-code-highlighter";
import type {
  ThemeCodeColorScheme,
  ThemeCodeLanguage,
} from "./theme-code-highlighter-types";
import { THEME_BUILDER_CTA_LINKS } from "./theme-builder-launch";
import {
  createTypographyCss,
  DEFAULT_THEME_FONT,
  type ThemeFont,
} from "./theme-typography";

type ThemeOutputProps = Readonly<{
  theme: SerializedThemeResult;
  font?: ThemeFont;
}>;

type OutputArtifact = Readonly<{
  content: string;
  mediaType: string;
  extension: string;
  error?: string;
}>;

function outputArtifact(
  theme: SerializedThemeResult,
  format: ExportFormat,
): OutputArtifact {
  const result = serializeTheme(theme, format);
  if (result.ok)
    return {
      content: result.value.content,
      mediaType: result.value.mediaType,
      extension: result.value.suggestedFileExtension,
    };

  return {
    content: "",
    mediaType: "text/plain",
    extension: ".txt",
    error: result.errors.map((error) => error.message).join(" "),
  };
}

type CodePanelProps = Readonly<{
  title: string;
  content: string;
  language: ThemeCodeLanguage;
  active: boolean;
  colorScheme: ThemeCodeColorScheme;
}>;

function CodePanel({
  title,
  content,
  language,
  active,
  colorScheme,
}: CodePanelProps) {
  const isDark = colorScheme === "dark";
  const surfaceClassName = isDark
    ? "border-white/15 bg-black text-white"
    : "border-border-subtle bg-white text-black";
  const headerClassName = isDark ? "border-white/15" : "border-border-subtle";
  const mutedTextClassName = isDark ? "text-white/65" : "text-muted-foreground";

  return (
    <div
      data-theme-builder-code-panel
      className={`min-w-0 overflow-hidden rounded-[5px] border ${surfaceClassName}`}
    >
      <div
        className={`flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${headerClassName}`}
      >
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{title}</p>
          <p className={`text-xs ${mutedTextClassName}`}>
            Complete output for light and dark modes.
          </p>
        </div>
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
          colorScheme={colorScheme}
        />
      </pre>
    </div>
  );
}

const exportTabs = ["css", "tailwind-v4", "json"] as const;
type ExportTab = (typeof exportTabs)[number];

const EXPORT_FORMAT_LABELS: Record<ExportTab, string> = {
  css: "CSS",
  "tailwind-v4": "Tailwind v4",
  json: "JSON",
};

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

/** Display engine-owned export artifacts without rebuilding semantic values. */
export function ThemeOutput({
  theme,
  font = DEFAULT_THEME_FONT,
}: ThemeOutputProps) {
  const { resolvedTheme } = useTheme();
  const [activeFormat, setActiveFormat] = useState<ExportTab>("css");
  const [codeVisible, setCodeVisible] = useState(false);
  const css = outputArtifact(theme, "css");
  const tailwind = outputArtifact(theme, "tailwind-v4");
  const json = outputArtifact(theme, "json");
  const artifacts = { css, "tailwind-v4": tailwind, json };
  const activeArtifact = artifacts[activeFormat];
  const error = activeArtifact.error;
  const codeColorScheme: ThemeCodeColorScheme =
    resolvedTheme === "light" ? "light" : "dark";
  const activeFormatLabel = EXPORT_FORMAT_LABELS[activeFormat];
  const typographyCss = createTypographyCss(font);
  const fileBase = theme.input.slug ?? "pycolors-theme";
  const fileSuffix =
    activeFormat === "json"
      ? ".tokens"
      : activeFormat === "tailwind-v4"
        ? ".tailwind"
        : "";

  return (
    <section
      id="theme-builder-export"
      aria-labelledby="theme-builder-output-heading"
      className="min-w-0 scroll-mt-24 overflow-hidden rounded-[5px] border border-border-subtle bg-background"
    >
      <div className="flex flex-col gap-4 border-b border-border-subtle p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2
            id="theme-builder-output-heading"
            className="text-lg font-semibold tracking-tight"
          >
            Export your theme
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Color tokens for both modes, with separate typography CSS. Copy or
            download your files. Nothing is uploaded.
          </p>
        </div>
        {!error ? (
          <div className="flex flex-wrap items-start gap-2">
            <DownloadButton
              key={`download-${activeFormat}`}
              file={{
                content: activeArtifact.content,
                mediaType: activeArtifact.mediaType,
                fileName: `${fileBase}${fileSuffix}${activeArtifact.extension}`,
              }}
              label={`Download ${activeFormatLabel}`}
            />
            <CopyButton
              key={activeFormat}
              value={activeArtifact.content}
              label={`Copy ${activeFormatLabel}`}
              className="justify-start sm:justify-end"
              buttonClassName="rounded-[5px] border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background"
            />
          </div>
        ) : null}
      </div>
      {error ? (
        <Alert variant="destructive" ariaLive="assertive" className="m-5">
          <AlertTitle>Export could not be prepared</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-5 p-5 sm:p-6">
          <Tabs
            value={activeFormat}
            onValueChange={(value) => {
              if (isExportTab(value)) setActiveFormat(value);
            }}
            className="min-w-0"
          >
            <TabsList
              size="sm"
              aria-label="Export format"
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
              <p className="text-sm leading-6 text-muted-foreground">
                CSS variables for <code>:root</code> and <code>.dark</code>.
                Paste after your PyColors token import.
              </p>
            </TabsContent>
            <TabsContent value="tailwind-v4">
              <p className="text-sm leading-6 text-muted-foreground">
                Use the existing Tailwind v4 semantic utilities and{" "}
                <code>@theme inline</code> bridge with your new colors.
              </p>
            </TabsContent>
            <TabsContent value="json">
              <p className="text-sm leading-6 text-muted-foreground">
                Both modes, color scales, semantic roles, contrast checks, and
                generation notes in one file.
              </p>
            </TabsContent>
          </Tabs>

          <section
            aria-labelledby="theme-builder-integration-checklist-heading"
            className="border-y border-border-subtle py-5"
          >
            <h3
              id="theme-builder-integration-checklist-heading"
              className="text-xs font-medium"
            >
              Integration checklist
            </h3>
            <ol className="mt-3 grid gap-4 md:grid-cols-3">
              {INTEGRATION_STEPS[activeFormat].map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 text-xs leading-5 text-muted-foreground"
                >
                  <span className="grid size-5 shrink-0 place-items-center rounded-full border border-border-subtle text-[10px] font-medium">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <div>
            <Button
              type="button"
              variant="ghost"
              className="rounded-[5px]"
              aria-expanded={codeVisible}
              aria-controls="theme-builder-generated-code"
              onClick={() => setCodeVisible((visible) => !visible)}
            >
              <Code2 aria-hidden="true" />
              {codeVisible ? "Hide generated code" : "View generated code"}
            </Button>
            <div
              id="theme-builder-generated-code"
              hidden={!codeVisible}
              className="mt-3"
            >
              <CodePanel
                title={activeFormatLabel}
                content={activeArtifact.content}
                language={activeFormat === "json" ? "json" : "css"}
                active={codeVisible}
                colorScheme={codeColorScheme}
              />
            </div>
          </div>

          <section
            aria-labelledby="theme-builder-typography-heading"
            className="rounded-[5px] border border-border-subtle p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3
                  id="theme-builder-typography-heading"
                  className="text-sm font-medium"
                >
                  Typography
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {font.label} · Copy separately from your color tokens.
                </p>
              </div>
              <div className="flex flex-wrap items-start gap-2">
                <DownloadButton
                  file={{
                    content: typographyCss,
                    mediaType: "text/css",
                    fileName: `${fileBase}.typography.css`,
                  }}
                  label="Download typography CSS"
                />
                <CopyButton
                  value={typographyCss}
                  label="Copy typography CSS"
                  buttonClassName="rounded-[5px]"
                />
              </div>
            </div>
            {font.asset ? (
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Save the font in{" "}
                <code className="break-all">public{font.asset}</code>, then add
                this CSS after your token imports.{" "}
                <a
                  href={font.asset}
                  download
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Download font
                </a>
                {font.license ? (
                  <>
                    {" "}
                    ·{" "}
                    <a
                      href={font.license}
                      download
                      className="font-medium text-foreground underline underline-offset-4"
                    >
                      Font license
                    </a>
                  </>
                ) : null}
              </p>
            ) : (
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                Uses your visitor&apos;s system fonts. No font file is needed.
                Add this CSS after your token imports.
              </p>
            )}
            <details className="mt-3">
              <summary className="w-fit cursor-pointer rounded text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                View typography CSS
              </summary>
              <pre
                tabIndex={0}
                aria-label="Typography CSS output"
                className="mt-3 overflow-auto rounded-[4px] border border-border-subtle bg-surface-muted p-4 font-mono text-xs leading-6 focus-visible:outline-2 focus-visible:outline-ring"
              >
                <code>{typographyCss}</code>
              </pre>
            </details>
          </section>

          <nav
            aria-label="Continue with your theme"
            className="flex flex-col gap-x-6 gap-y-1 border-t border-border-subtle pt-4 sm:flex-row sm:flex-wrap"
          >
            {THEME_BUILDER_CTA_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {link.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </section>
  );
}
