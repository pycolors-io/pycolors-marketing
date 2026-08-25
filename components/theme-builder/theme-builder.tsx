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
import { ThemeModeControl } from "./theme-mode-control";
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
        <ThemePreview mode={state.previewMode} theme={preview} />

        <ThemeOutput theme={state.generatedTheme} />

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
