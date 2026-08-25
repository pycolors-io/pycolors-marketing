"use client";

import * as React from "react";
import {
  SEMANTIC_ROLES,
  type SemanticRole,
  type ThemeModeResult,
} from "@pycolors/color-engine";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
} from "@pycolors/ui";

import { ThemeInputs } from "./theme-inputs";
import { ThemeModeControl } from "./theme-mode-control";
import {
  createThemeBuilderState,
  resetThemeBuilderState,
  selectThemeBuilderMode,
  updateThemeBuilderField,
} from "./theme-builder-state";

const PREVIEW_SWATCHES = [
  { label: "Background", role: "background" },
  { label: "Surface", role: "surface" },
  { label: "Primary", role: "primary" },
  { label: "Accent", role: "accent" },
  { label: "Muted", role: "muted" },
  { label: "Border", role: "border" },
] as const satisfies readonly Readonly<{
  label: string;
  role: SemanticRole;
}>[];

function scopedPreviewVariables(mode: ThemeModeResult): React.CSSProperties {
  const variables: Record<string, string> = {};

  for (const role of SEMANTIC_ROLES) {
    variables[`--${role}`] = mode.semantic[role].srgbHex;
  }

  return variables as React.CSSProperties;
}

export function ThemeBuilder() {
  const [state, setState] = React.useState(createThemeBuilderState);
  const preview = state.generatedTheme.modes[state.previewMode];
  const previewStyle = React.useMemo(
    () => scopedPreviewVariables(preview),
    [preview],
  );
  const hasFieldErrors = Object.keys(state.fieldErrors).length > 0;
  const failedContrasts = state.generatedTheme.contrasts.filter(
    (contrast) => contrast.status === "fail",
  );

  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]">
      <Card className="min-w-0 rounded-[8px] border-border-subtle bg-surface p-5 shadow-soft sm:p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              Configure a theme
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Values stay in this editor. No input is saved, shared, or sent to
              a server.
            </p>
          </div>

          <ThemeInputs
            draft={state.draft}
            errors={state.fieldErrors}
            onFieldChange={(field, value) =>
              setState((current) =>
                updateThemeBuilderField(current, field, value),
              )
            }
          />

          {hasFieldErrors ? (
            <Alert variant="destructive" ariaLive="assertive">
              <AlertTitle>Preview kept on the last valid theme</AlertTitle>
              <AlertDescription>
                Correct the field errors above before new semantic values are
                applied.
              </AlertDescription>
            </Alert>
          ) : null}

          {state.generationError ? (
            <Alert variant="destructive" ariaLive="assertive">
              <AlertTitle>Theme generation could not complete</AlertTitle>
              <AlertDescription>{state.generationError}</AlertDescription>
            </Alert>
          ) : null}

          <div className="flex flex-col gap-4 border-t border-border-subtle pt-5 sm:flex-row sm:items-end sm:justify-between">
            <ThemeModeControl
              value={state.previewMode}
              onChange={(previewMode) =>
                setState((current) =>
                  selectThemeBuilderMode(current, previewMode),
                )
              }
            />
            <Button
              type="button"
              variant="outline"
              className="min-h-11 rounded-[5px]"
              onClick={() => setState(resetThemeBuilderState())}
            >
              Reset defaults
            </Button>
          </div>
        </div>
      </Card>

      <div className="min-w-0 space-y-6">
        <section
          aria-labelledby="theme-builder-preview-heading"
          aria-describedby="theme-builder-preview-description"
          data-theme-builder-preview={state.previewMode}
          style={previewStyle}
          className="min-w-0 overflow-hidden rounded-[8px] border border-border p-4 shadow-soft sm:p-6"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <h2
                  id="theme-builder-preview-heading"
                  className="text-xl font-semibold tracking-tight"
                >
                  Scoped semantic preview
                </h2>
                <p
                  id="theme-builder-preview-description"
                  className="text-sm leading-6 text-muted-foreground"
                >
                  {state.previewMode === "light" ? "Light" : "Dark"} mode values
                  are scoped to this preview only.
                </p>
              </div>
              <span className="w-fit rounded-full border border-border px-3 py-1 text-xs font-medium">
                {state.previewMode === "light"
                  ? "Light preview"
                  : "Dark preview"}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {PREVIEW_SWATCHES.map(({ label, role }) => {
                const color = preview.semantic[role];

                return (
                  <div
                    key={role}
                    className="min-w-0 rounded-md border border-border p-3"
                    style={{
                      backgroundColor:
                        role === "background"
                          ? "var(--background)"
                          : "var(--surface)",
                      color: "var(--surface-foreground)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">{label}</span>
                      <span
                        aria-hidden="true"
                        className="size-6 shrink-0 rounded-full border border-border"
                        style={{ backgroundColor: `var(--${role})` }}
                      />
                    </div>
                    <code className="mt-2 block truncate text-xs text-muted-foreground">
                      {color.srgbHex}
                    </code>
                  </div>
                );
              })}
            </div>

            <div
              className="rounded-md border border-border p-4"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
              }}
            >
              <p className="text-sm font-semibold">Generated semantic values</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                This is a minimal local feedback surface. Full component
                previews and export tools are intentionally deferred.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className="rounded-md px-3 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  Primary
                </span>
                <span
                  className="rounded-md px-3 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-foreground)",
                  }}
                >
                  Accent
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="theme-builder-notices-heading"
          className="space-y-3"
        >
          <div className="space-y-1">
            <h2
              id="theme-builder-notices-heading"
              className="text-base font-semibold tracking-tight"
            >
              Contrast-aware notices
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Generated evidence helps guide review; it is not an accessibility
              certification.
            </p>
          </div>

          {failedContrasts.length > 0 ? (
            <p className="text-sm font-medium text-warning" role="status">
              {failedContrasts.length} contrast check
              {failedContrasts.length === 1 ? "" : "s"} remain below target.
            </p>
          ) : null}

          <ul className="grid gap-3" aria-live="polite">
            {state.generatedTheme.warnings.map((warning, index) => (
              <li key={`${warning.code}-${warning.mode ?? "all"}-${index}`}>
                <Alert
                  variant={warning.severity === "warning" ? "warning" : "info"}
                >
                  <AlertTitle>
                    {warning.code === "contrast-below-target"
                      ? "Contrast warning"
                      : warning.code.replaceAll("-", " ")}
                  </AlertTitle>
                  <AlertDescription>{warning.message}</AlertDescription>
                </Alert>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
