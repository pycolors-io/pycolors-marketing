"use client";

import * as React from "react";
import { Alert, AlertDescription, AlertTitle, Button } from "@pycolors/ui";

import { ThemeInputs } from "./theme-inputs";
import { ThemeOutput } from "./theme-output";
import { ThemePreview } from "./theme-preview";
import {
  createThemeBuilderState,
  resetThemeBuilderState,
  selectThemeBuilderMode,
  updateThemeBuilderField,
} from "./theme-builder-state";

function generationWarningLabel(
  warning: ReturnType<
    typeof createThemeBuilderState
  >["generatedTheme"]["warnings"][number],
) {
  switch (warning.code) {
    case "neutral-derived":
      return "Neutral scale derived";
    case "gamut-mapped":
      return "Gamut mapped";
    case "foreground-fallback-used":
      return "Foreground adjusted";
    case "input-normalized":
      return "Input normalized";
    default:
      return warning.code.replaceAll("-", " ");
  }
}

export function ThemeBuilder() {
  const [state, setState] = React.useState(createThemeBuilderState);
  const preview = state.generatedTheme.modes[state.previewMode];
  const hasFieldErrors = Object.keys(state.fieldErrors).length > 0;
  const failedContrasts = state.generatedTheme.contrasts.filter(
    (contrast) => contrast.status === "fail",
  );
  const generationWarnings = state.generatedTheme.warnings.filter(
    (warning) => warning.code !== "contrast-below-target",
  );
  const passingContrastCount =
    state.generatedTheme.contrasts.length - failedContrasts.length;

  return (
    <div className="space-y-8">
      <section
        aria-label="Theme Builder workspace"
        className="min-w-0 overflow-hidden rounded-[5px] border border-border-subtle bg-surface"
      >
        <div className="grid min-w-0 lg:grid-cols-[minmax(17rem,0.62fr)_minmax(0,1.38fr)] lg:items-start">
          <aside
            aria-labelledby="theme-builder-settings-heading"
            className="min-w-0 border-b border-border-subtle bg-surface lg:border-r lg:border-b-0"
          >
            <div className="space-y-5 p-5 sm:p-6">
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  01 · Configure brand
                </p>
                <div className="space-y-1">
                  <h2
                    id="theme-builder-settings-heading"
                    className="text-xl font-semibold tracking-tight"
                  >
                    Theme settings
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    A compact local control rail. The product preview updates as
                    you type.
                  </p>
                </div>
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
                    Correct the field errors above before new semantic values
                    are applied.
                  </AlertDescription>
                </Alert>
              ) : null}

              {state.generationError ? (
                <Alert variant="destructive" ariaLive="assertive">
                  <AlertTitle>Theme generation could not complete</AlertTitle>
                  <AlertDescription>{state.generationError}</AlertDescription>
                </Alert>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-border-subtle pt-4 sm:flex-row sm:items-center sm:justify-between lg:items-start lg:flex-col">
                <p className="text-xs leading-5 text-muted-foreground">
                  Inputs stay in this browser and are never persisted.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-10 shrink-0 rounded-[5px] px-3"
                  onClick={() => setState(resetThemeBuilderState())}
                >
                  Reset defaults
                </Button>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-5 bg-surface-elevated/30 p-4 sm:p-6">
            <ThemePreview
              mode={state.previewMode}
              theme={preview}
              onModeChange={(previewMode) =>
                setState((current) =>
                  selectThemeBuilderMode(current, previewMode),
                )
              }
            />

            <section
              aria-labelledby="theme-builder-notices-heading"
              className="rounded-[5px] border border-border-subtle bg-surface p-4 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    03 · Review the result
                  </p>
                  <h2
                    id="theme-builder-notices-heading"
                    className="text-base font-semibold tracking-tight"
                  >
                    Theme health
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Automatic choices and contrast checks are kept separate so
                    you can focus on what needs product review.
                  </p>
                </div>

                <p
                  className="w-fit rounded-[5px] border border-border-subtle bg-surface-muted/35 px-3 py-2 text-xs font-medium tabular-nums text-muted-foreground"
                  role="status"
                >
                  {failedContrasts.length > 0
                    ? `${failedContrasts.length} checks to review`
                    : "All checks pass"}
                </p>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
                <section
                  aria-labelledby="theme-builder-generation-notes-heading"
                  className="rounded-[5px] border border-border-subtle bg-background/50 p-4"
                >
                  <div className="space-y-1">
                    <h3
                      id="theme-builder-generation-notes-heading"
                      className="text-sm font-medium"
                    >
                      Automatic adjustments
                    </h3>
                    <p className="text-xs leading-5 text-muted-foreground">
                      These preserve usable colors in sRGB or choose a stronger
                      foreground. They are not failed checks.
                    </p>
                  </div>

                  {generationWarnings.length > 0 ? (
                    <details className="group mt-4 border-t border-border-subtle pt-3">
                      <summary className="cursor-pointer list-none text-xs font-medium text-foreground marker:content-none">
                        <span className="inline-flex items-center gap-2">
                          {generationWarnings.length} implementation note
                          {generationWarnings.length === 1 ? "" : "s"}
                          <span
                            aria-hidden="true"
                            className="text-muted-foreground transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </span>
                      </summary>
                      <ul className="mt-3 space-y-2">
                        {generationWarnings.map((warning, index) => (
                          <li
                            key={`${warning.code}-${warning.mode ?? "all"}-${warning.role ?? "role"}-${index}`}
                            className="border-l border-border-subtle pl-3"
                          >
                            <p className="text-xs font-medium text-foreground">
                              {generationWarningLabel(warning)}
                              {warning.mode ? ` · ${warning.mode}` : ""}
                            </p>
                            <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                              {warning.message}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <p className="mt-4 border-t border-border-subtle pt-3 text-xs text-muted-foreground">
                      No automatic adjustments were needed.
                    </p>
                  )}
                </section>

                <section
                  aria-labelledby="theme-builder-contrast-review-heading"
                  className="rounded-[5px] border border-border-subtle bg-background/50 p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="space-y-1">
                      <h3
                        id="theme-builder-contrast-review-heading"
                        className="text-sm font-medium"
                      >
                        Contrast review
                      </h3>
                      <p className="text-xs leading-5 text-muted-foreground">
                        {failedContrasts.length > 0
                          ? `${failedContrasts.length} token pairs need a visual check before shipping.`
                          : "Every checked token pair meets its target in both modes."}
                      </p>
                    </div>
                  </div>

                  {failedContrasts.length > 0 ? (
                    <details className="group mt-4 border-t border-border-subtle pt-3">
                      <summary className="cursor-pointer list-none text-xs font-medium text-foreground marker:content-none">
                        <span className="inline-flex items-center gap-2">
                          Inspect {failedContrasts.length} contrast ratio
                          {failedContrasts.length === 1 ? "" : "s"}
                          <span
                            aria-hidden="true"
                            className="text-muted-foreground transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </span>
                      </summary>
                      <div className="mt-3 divide-y divide-border-subtle border-y border-border-subtle">
                        <p className="py-2 text-xs tabular-nums text-muted-foreground">
                          {passingContrastCount} pairs meet their target.
                        </p>
                        {failedContrasts.map((contrast) => (
                          <div
                            key={`${contrast.mode}-${contrast.foregroundRole}-${contrast.backgroundRole}-${contrast.target.usage}`}
                            className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4"
                          >
                            <div className="min-w-0">
                              <p className="flex flex-wrap items-center gap-2 text-xs font-medium text-foreground">
                                <span className="rounded-[4px] border border-border-subtle bg-surface px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                                  {contrast.mode}
                                </span>
                                <code className="font-mono text-[11px]">
                                  {contrast.foregroundRole} /{" "}
                                  {contrast.backgroundRole}
                                </code>
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {contrast.target.usage.replaceAll("-", " ")} ·
                                needs {contrast.target.minimumRatio}:1
                              </p>
                            </div>
                            <p className="font-mono text-sm font-medium tabular-nums text-foreground">
                              {contrast.ratio.toFixed(2)}:1
                            </p>
                          </div>
                        ))}
                      </div>
                    </details>
                  ) : null}
                </section>
              </div>
            </section>
          </div>
        </div>
      </section>

      <ThemeOutput theme={state.generatedTheme} />
    </div>
  );
}
