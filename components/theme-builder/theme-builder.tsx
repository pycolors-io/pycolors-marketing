"use client";

import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
} from "@pycolors/ui";

import { ThemeInputs } from "./theme-inputs";
import { ThemeOutput } from "./theme-output";
import { ThemePreview } from "./theme-preview";
import {
  createThemeBuilderState,
  resetThemeBuilderState,
  selectThemeBuilderMode,
  updateThemeBuilderField,
} from "./theme-builder-state";

export function ThemeBuilder() {
  const [state, setState] = React.useState(createThemeBuilderState);
  const preview = state.generatedTheme.modes[state.previewMode];
  const hasFieldErrors = Object.keys(state.fieldErrors).length > 0;
  const failedContrasts = state.generatedTheme.contrasts.filter(
    (contrast) => contrast.status === "fail",
  );

  return (
    <div className="space-y-8">
      <section
        aria-label="Theme Builder workspace"
        className="min-w-0 overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium"
      >
        <div className="grid min-w-0 lg:grid-cols-[minmax(20rem,0.78fr)_minmax(0,1.22fr)]">
          <Card className="min-w-0 rounded-none border-0 border-b border-border-subtle bg-surface p-5 shadow-none lg:border-b-0 lg:border-r sm:p-6">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  01 · Configure brand
                </p>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold tracking-tight">
                    Theme settings
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Enter a brand foundation, then review the result in a real
                    product surface. Inputs stay local to this browser.
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

              <div className="flex flex-col gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-muted-foreground">
                  Need a clean slate? Restore the documented PyColors defaults.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="min-h-11 shrink-0 rounded-[5px]"
                  onClick={() => setState(resetThemeBuilderState())}
                >
                  Reset defaults
                </Button>
              </div>
            </div>
          </Card>

          <div className="min-w-0 space-y-5 bg-surface-elevated/45 p-4 sm:p-6">
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
                    03 · Review contrast
                  </p>
                  <h2
                    id="theme-builder-notices-heading"
                    className="text-base font-semibold tracking-tight"
                  >
                    Contrast-aware notices
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Generated evidence helps guide review; it is not an
                    accessibility certification.
                  </p>
                </div>

                {failedContrasts.length > 0 ? (
                  <p
                    className="w-fit rounded-[5px] border border-warning/30 bg-warning/10 px-3 py-2 text-sm font-medium text-warning"
                    role="status"
                  >
                    {failedContrasts.length} contrast check
                    {failedContrasts.length === 1 ? "" : "s"} remain below
                    target.
                  </p>
                ) : null}
              </div>

              <ul className="mt-4 grid gap-2" aria-live="polite">
                {state.generatedTheme.warnings.map((warning, index) => (
                  <li key={`${warning.code}-${warning.mode ?? "all"}-${index}`}>
                    <Alert
                      variant={
                        warning.severity === "warning" ? "warning" : "info"
                      }
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
      </section>

      <ThemeOutput theme={state.generatedTheme} />
    </div>
  );
}
