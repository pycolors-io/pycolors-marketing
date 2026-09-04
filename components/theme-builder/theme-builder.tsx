"use client";

import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
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
import type {
  ThemeBuilderDraft,
  ThemeBuilderField,
  ThemeBuilderFieldErrors,
  ThemeBuilderState,
} from "./theme-builder-state";

type ThemeBuilderPreset = Readonly<{
  id: string;
  name: string;
  category: string;
  description: string;
  brandColor: string;
  draft: ThemeBuilderDraft;
}>;

const THEME_BUILDER_PRESETS: readonly ThemeBuilderPreset[] = [
  {
    id: "violet-studio",
    name: "Violet Studio",
    category: "Product SaaS",
    description: "A composed default for polished product interfaces.",
    brandColor: "#6a30d4",
    draft: {
      brandColor: "#6a30d4",
      name: "Violet Studio",
      neutralColor: "#71717a",
      lightBackgroundColor: "#fafafa",
    },
  },
  {
    id: "indigo-ledger",
    name: "Indigo Ledger",
    category: "Finance and workflow",
    description: "Crisp indigo with a calm slate foundation.",
    brandColor: "#4f46e5",
    draft: {
      brandColor: "#4f46e5",
      name: "Indigo Ledger",
      neutralColor: "#64748b",
      lightBackgroundColor: "#f8fafc",
    },
  },
  {
    id: "emerald-console",
    name: "Emerald Console",
    category: "Operations",
    description: "A measured green for operational SaaS products.",
    brandColor: "#0f9d72",
    draft: {
      brandColor: "#0f9d72",
      name: "Emerald Console",
      neutralColor: "#5f6b7a",
      lightBackgroundColor: "#f7faf9",
    },
  },
  {
    id: "graphite-atlas",
    name: "Graphite Atlas",
    category: "Developer tooling",
    description: "Quiet graphite with a precise, neutral canvas.",
    brandColor: "#334155",
    draft: {
      brandColor: "#334155",
      name: "Graphite Atlas",
      neutralColor: "#64748b",
      lightBackgroundColor: "#f8fafc",
    },
  },
];

function applyThemeBuilderPreset(
  state: ThemeBuilderState,
  preset: ThemeBuilderPreset,
): ThemeBuilderState {
  return (Object.keys(preset.draft) as ThemeBuilderField[]).reduce(
    (nextState, field) =>
      updateThemeBuilderField(nextState, field, preset.draft[field]),
    state,
  );
}

function generationWarningLabel(
  warning: ReturnType<
    typeof createThemeBuilderState
  >["generatedTheme"]["warnings"][number],
) {
  switch (warning.code) {
    case "neutral-derived":
      return "A neutral scale was generated from your brand.";
    case "gamut-mapped":
      return "A color was refined to display reliably.";
    case "foreground-fallback-used":
      return "Text color was strengthened for readability.";
    case "input-normalized":
      return "A color value was normalized.";
    default:
      return warning.code.replaceAll("-", " ");
  }
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

type ThemeSettingsPanelProps = Readonly<{
  draft: ThemeBuilderDraft;
  errors: ThemeBuilderFieldErrors;
  generationError: string | null;
  onClose: () => void;
  onReset: () => void;
  onPresetSelect: (preset: ThemeBuilderPreset) => void;
  onFieldChange: (field: ThemeBuilderField, value: string) => void;
}>;

function ThemeSettingsPanel({
  draft,
  errors,
  generationError,
  onClose,
  onReset,
  onPresetSelect,
  onFieldChange,
}: ThemeSettingsPanelProps) {
  const hasFieldErrors = Object.keys(errors).length > 0;
  const panelRef = React.useRef<HTMLElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  }

  return (
    <aside
      ref={panelRef}
      id="theme-builder-settings-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-builder-settings-heading"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="absolute inset-x-0 top-0 z-50 min-h-full rounded-[4px] border border-border-subtle/55 bg-surface shadow-medium"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle/55 bg-surface-muted/80 px-4 py-3 backdrop-blur-md">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
            01 · Configure brand
          </p>
          <h2
            id="theme-builder-settings-heading"
            className="mt-0.5 text-sm font-semibold tracking-tight"
          >
            Theme settings
          </h2>
        </div>
        <Button
          ref={closeButtonRef}
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0 rounded-[4px]"
          aria-label="Close theme settings"
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </Button>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] xl:gap-6 xl:p-6">
        <div className="min-w-0 space-y-4">
          <p className="rounded-[4px] border border-border-subtle bg-background/70 px-3 py-2 text-sm leading-6 text-muted-foreground">
            Tune the brand foundation. The Northstar preview updates locally as
            you type.
          </p>

          <ThemeInputs
            draft={draft}
            errors={errors}
            onFieldChange={onFieldChange}
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

          {generationError ? (
            <Alert variant="destructive" ariaLive="assertive">
              <AlertTitle>Theme generation could not complete</AlertTitle>
              <AlertDescription>{generationError}</AlertDescription>
            </Alert>
          ) : null}
        </div>

        <section
          aria-labelledby="theme-builder-presets-heading"
          className="rounded-[4px] border border-pro-border-subtle bg-pro-surface-muted/60 p-4"
        >
          <div className="space-y-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
              Professional foundations
            </p>
            <h3
              id="theme-builder-presets-heading"
              className="text-sm font-semibold tracking-tight"
            >
              Start with a balanced combination
            </h3>
            <p className="text-xs leading-5 text-muted-foreground">
              Each starting point pairs your brand with a balanced neutral and
              canvas foundation. Refine the source colors without weakening the
              system.
            </p>
          </div>

          <div className="mt-4 grid gap-2">
            {THEME_BUILDER_PRESETS.map((preset) => (
              <Button
                key={preset.id}
                type="button"
                variant="outline"
                className="h-auto min-h-16 justify-start rounded-[4px] border-pro-border bg-background px-3 py-3 text-left hover:border-foreground/30 hover:bg-background"
                onClick={() => onPresetSelect(preset)}
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 size-3 shrink-0 rounded-full ring-1 ring-border"
                  style={{ backgroundColor: preset.brandColor }}
                />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-sm font-medium text-foreground">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {preset.category}
                    </span>
                  </span>
                  <span className="mt-0.5 block whitespace-normal text-xs font-normal leading-5 text-muted-foreground">
                    {preset.description}
                  </span>
                </span>
              </Button>
            ))}
          </div>
        </section>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border-subtle/55 bg-surface p-4">
        <p className="max-w-44 text-[11px] leading-4 text-muted-foreground">
          Inputs stay in this browser and are never persisted.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0 rounded-[4px]"
          onClick={onReset}
        >
          Reset
        </Button>
      </div>
    </aside>
  );
}

export function ThemeBuilder() {
  const [state, setState] = React.useState(createThemeBuilderState);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const settingsTriggerRef = React.useRef<HTMLButtonElement>(null);
  const settingsWereOpenRef = React.useRef(false);
  const preview = state.generatedTheme.modes[state.previewMode];
  const failedContrasts = state.generatedTheme.contrasts.filter(
    (contrast) => contrast.status === "fail",
  );
  const generationWarnings = state.generatedTheme.warnings.filter(
    (warning) => warning.code !== "contrast-below-target",
  );
  const passingContrastCount =
    state.generatedTheme.contrasts.length - failedContrasts.length;

  React.useEffect(() => {
    if (settingsWereOpenRef.current && !settingsOpen) {
      settingsTriggerRef.current?.focus();
    }

    settingsWereOpenRef.current = settingsOpen;
  }, [settingsOpen]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <section
        aria-label="Theme Builder workspace"
        className={settingsOpen ? "relative z-30 min-w-0" : "min-w-0"}
      >
        <div className="group relative min-h-[320px] min-w-0 rounded-[5px] border border-border-subtle/55 bg-surface shadow-medium sm:min-h-[420px] lg:min-h-[520px] xl:min-h-[600px]">
          <div className="flex min-h-13 flex-wrap items-center justify-between gap-3 border-b border-border-subtle/55 bg-surface-muted/80 px-4 py-3 backdrop-blur-md sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-[4px] border border-border-subtle/55 bg-background text-[11px] font-semibold text-primary"
              >
                P
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight">
                  PyColors Theme Studio
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  Deterministic semantic token engine
                </p>
              </div>
            </div>
            <p className="inline-flex shrink-0 items-center gap-2 rounded-[4px] border border-success-border-subtle bg-success-muted px-2.5 py-1 text-[11px] font-medium text-success">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-success"
              />
              Local session
            </p>
          </div>
          <ThemePreview
            mode={state.previewMode}
            theme={preview}
            settingsOpen={settingsOpen}
            embedded
            onModeChange={(previewMode) =>
              setState((current) =>
                selectThemeBuilderMode(current, previewMode),
              )
            }
            settingsControl={
              <div className="relative z-40">
                <Button
                  ref={settingsTriggerRef}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-[4px] bg-background/80"
                  aria-controls="theme-builder-settings-panel"
                  aria-expanded={settingsOpen}
                  onClick={() => setSettingsOpen((open) => !open)}
                >
                  <SlidersHorizontal aria-hidden="true" />
                  Theme settings
                </Button>
              </div>
            }
          />
          {settingsOpen ? (
            <ThemeSettingsPanel
              draft={state.draft}
              errors={state.fieldErrors}
              generationError={state.generationError}
              onClose={() => setSettingsOpen(false)}
              onReset={() => setState(resetThemeBuilderState())}
              onPresetSelect={(preset) =>
                setState((current) => applyThemeBuilderPreset(current, preset))
              }
              onFieldChange={(field, value) =>
                setState((current) =>
                  updateThemeBuilderField(current, field, value),
                )
              }
            />
          ) : null}
        </div>

        <div className="mt-6 min-w-0 rounded-[5px] border border-border-subtle/55 bg-surface p-4 shadow-soft sm:p-6">
          <section
            aria-labelledby="theme-builder-notices-heading"
            className="rounded-[5px] border border-border-subtle/55 bg-background/70 p-4 sm:p-5"
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
                  Theme quality
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  A short quality signal for the current theme. Details stay
                  available when you need to review a real product context.
                </p>
              </div>

              <p
                className="w-fit rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted px-3 py-2 text-xs font-medium tabular-nums text-muted-foreground"
                role="status"
              >
                {failedContrasts.length > 0
                  ? `${failedContrasts.length} items to review`
                  : "Ready to export"}
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
                    Automatic safeguards
                  </h3>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {generationWarnings.length > 0
                      ? `${generationWarnings.length} safeguards were applied to keep the generated values usable.`
                      : "No automatic safeguards were needed for this theme."}
                  </p>
                </div>

                {generationWarnings.length > 0 ? (
                  <details className="group mt-4 border-t border-border-subtle pt-3">
                    <summary className="cursor-pointer list-none text-xs font-medium text-foreground marker:content-none">
                      <span className="inline-flex items-center gap-2">
                        See automatic adjustments
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
                          </p>
                          {warning.mode ? (
                            <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                              Checked in {warning.mode} mode.
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <p className="mt-4 border-t border-border-subtle pt-3 text-xs text-muted-foreground">
                    Generated values were used without further adjustment.
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
                      Visual contrast check
                    </h3>
                    <p className="text-xs leading-5 text-muted-foreground">
                      {failedContrasts.length > 0
                        ? `${failedContrasts.length} token pairs need a visual check before shipping. This is evidence, not a failed export.`
                        : "Every checked token pair meets its target in both modes."}
                    </p>
                  </div>
                </div>

                {failedContrasts.length > 0 ? (
                  <details className="group mt-4 border-t border-border-subtle pt-3">
                    <summary className="cursor-pointer list-none text-xs font-medium text-foreground marker:content-none">
                      <span className="inline-flex items-center gap-2">
                        Review {failedContrasts.length} measured ratio
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
                      <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-xl text-xs leading-5 text-muted-foreground">
                          Inspect borders, inputs, focus rings, and destructive
                          actions in the preview that matches your product.
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-fit rounded-[4px]"
                          onClick={() => setSettingsOpen(true)}
                        >
                          Review foundation
                        </Button>
                      </div>
                      <p className="border-t border-border-subtle py-2 text-xs tabular-nums text-muted-foreground">
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
      </section>

      <ThemeOutput theme={state.generatedTheme} />
    </div>
  );
}
