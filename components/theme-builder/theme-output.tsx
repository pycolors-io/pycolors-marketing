"use client";

import Link from "next/link";

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
}>;

function CodePanel({ title, content }: CodePanelProps) {
  return (
    <div className="min-w-0 space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <CopyButton value={content} label={`Copy ${title}`} />
      </div>
      <pre
        tabIndex={0}
        aria-label={`${title} output. Selectable code.`}
        className="max-h-96 max-w-full overflow-auto rounded-md border border-border bg-surface-inverted p-4 font-mono text-xs leading-6 text-surface-inverted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <code>{content}</code>
      </pre>
    </div>
  );
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
  const css = outputArtifact(theme, "css");
  const tailwind = outputArtifact(theme, "tailwind-v4");
  const json = outputArtifact(theme, "json");
  const error = css.error ?? tailwind.error ?? json.error;

  return (
    <section
      aria-labelledby="theme-builder-output-heading"
      className="min-w-0 space-y-4 rounded-[8px] border border-border-subtle bg-surface p-4 shadow-soft sm:p-6"
    >
      <div className="space-y-1">
        <h2
          id="theme-builder-output-heading"
          className="text-xl font-semibold tracking-tight"
        >
          Token exports
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Copy deterministic output from the current valid generated theme.
          Nothing is uploaded or saved.
        </p>
      </div>

      {error ? (
        <Alert variant="destructive" ariaLive="assertive">
          <AlertTitle>Export could not be prepared</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <Tabs defaultValue="css" className="min-w-0">
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
              <div className="mb-4 space-y-2">
                <h3 className="text-sm font-medium text-foreground">
                  Generated override example
                </h3>
                <pre
                  tabIndex={0}
                  aria-label="Compact example of the current generated CSS override"
                  className="max-w-full overflow-auto rounded-md border border-border bg-surface-muted p-4 font-mono text-xs leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <code>{generatedCssExample(css.content)}</code>
                </pre>
              </div>
              <CodePanel title="CSS" content={css.content} />
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
              <CodePanel title="Tailwind v4 CSS" content={tailwind.content} />
            </TabsContent>

            <TabsContent value="json">
              <p className="mb-3 text-sm leading-6 text-muted-foreground">
                Complete engine evidence, including both modes, scales, contrast
                records, and warnings.
              </p>
              <CodePanel title="JSON" content={json.content} />
            </TabsContent>
          </Tabs>

          <section
            aria-labelledby="theme-builder-next-steps-heading"
            className="border-t border-border-subtle pt-4"
          >
            <div className="space-y-3">
              <div className="space-y-1">
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
