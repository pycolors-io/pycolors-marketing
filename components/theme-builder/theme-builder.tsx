"use client";

import * as React from "react";
import {
  ArrowDown,
  Check,
  ChevronDown,
  LockKeyhole,
  Maximize2,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from "@pycolors/ui";

import { ThemeInputs } from "./theme-inputs";
import { ThemeQuality } from "./theme-quality";
import { ThemePalette, type ThemePaletteSelection } from "./theme-palette";
import {
  ThemeComponentsPreview,
  INITIAL_THEME_COMPONENTS_STATE,
} from "./theme-components-preview";
import { ThemeOutput } from "./theme-output";
import { ThemePreview, INITIAL_THEME_PREVIEW_VIEW } from "./theme-preview";
import { ThemeModeControl } from "./theme-mode-control";
import { ThemeConfigurationControls } from "./theme-configuration-controls";
import { DEFAULT_THEME_FONT, THEME_FONTS } from "./theme-typography";
import {
  createThemeBuilderState,
  resetThemeBuilderState,
  selectThemeBuilderMode,
  updateThemeBuilderField,
} from "./theme-builder-state";
import type {
  ThemeBuilderDraft,
  ThemeBuilderField,
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
  {
    id: "rose-atelier",
    name: "Rose Atelier",
    category: "Creative teams",
    description: "A warm rose accent with soft stone neutrals.",
    brandColor: "#be185d",
    draft: {
      brandColor: "#be185d",
      name: "Rose Atelier",
      neutralColor: "#78716c",
      lightBackgroundColor: "#fafafa",
    },
  },
  {
    id: "amber-foundry",
    name: "Amber Foundry",
    category: "Commerce and operations",
    description: "Grounded amber with a warm, understated canvas.",
    brandColor: "#b45309",
    draft: {
      brandColor: "#b45309",
      name: "Amber Foundry",
      neutralColor: "#78716c",
      lightBackgroundColor: "#fafafa",
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

const PREVIEW_TABS = ["dashboard", "components", "palette"] as const;
type PreviewTab = (typeof PREVIEW_TABS)[number];

function PreviewTabs() {
  return (
    <TabsList
      aria-label="Preview content"
      className="h-10 max-w-full gap-0.5 rounded-[5px] border border-border-subtle bg-background p-0.5"
    >
      {PREVIEW_TABS.map((tab) => (
        <TabsTrigger
          key={tab}
          value={tab}
          className="min-h-8 rounded-[3px] px-2.5 text-xs capitalize data-[state=active]:bg-surface-muted data-[state=active]:text-foreground data-[state=active]:shadow-none"
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

export function ThemeBuilder() {
  const [state, setState] = React.useState(createThemeBuilderState);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [previewTab, setPreviewTab] = React.useState<PreviewTab>("dashboard");
  const [paletteSelection, setPaletteSelection] =
    React.useState<ThemePaletteSelection>({
      type: "semantic",
      role: "primary",
    });
  const [componentsView, setComponentsView] = React.useState(
    INITIAL_THEME_COMPONENTS_STATE,
  );
  const [font, setFont] = React.useState(DEFAULT_THEME_FONT);
  const [previewView, setPreviewView] = React.useState(
    INITIAL_THEME_PREVIEW_VIEW,
  );
  const [inlineHeight, setInlineHeight] = React.useState(0);
  const inlinePreviewRef = React.useRef<HTMLDivElement>(null);
  const hasFieldErrors = Object.keys(state.fieldErrors).length > 0;
  const preview = state.generatedTheme.modes[state.previewMode];

  function renderPreview(fullScreen = false) {
    return (
      <TabsContent value={previewTab} className="mt-0 min-w-0">
        {previewTab === "palette" ? (
          <ThemePalette
            theme={preview}
            mode={state.previewMode}
            selection={paletteSelection}
            onSelect={setPaletteSelection}
          />
        ) : previewTab === "components" ? (
          <ThemeComponentsPreview
            theme={preview}
            mode={state.previewMode}
            fontFamily={font.previewFamily}
            view={componentsView}
            onViewChange={setComponentsView}
          />
        ) : (
          <ThemePreview
            mode={state.previewMode}
            theme={preview}
            fontFamily={font.previewFamily}
            view={previewView}
            onViewChange={setPreviewView}
            embedded
            fullScreen={fullScreen}
          />
        )}
      </TabsContent>
    );
  }

  return (
    <div className="space-y-6">
      <section
        aria-label="Theme Builder workspace"
        className="overflow-hidden rounded-[5px] border border-border-subtle bg-background"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-4 py-3 sm:px-5">
          <div>
            <h2 className="text-sm font-semibold">Theme workspace</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Customize, preview, export.
            </p>
          </div>
          <div className="flex flex-wrap items-start gap-2">
            <ThemeConfigurationControls
              state={state}
              font={font}
              onRestore={(configuration) => {
                setState(configuration.state);
                setFont(configuration.font);
              }}
            />
            <Button asChild size="sm" className="min-h-10 rounded-[5px]">
              <a href="#theme-builder-export">
                Export theme
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
        <div className="grid min-w-0 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)]">
          <div className="border-b border-border-subtle px-4 py-3 lg:hidden">
            <Button
              type="button"
              variant="outline"
              className="min-h-11 w-full justify-between rounded-[5px]"
              aria-controls="theme-builder-settings-panel"
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((open) => !open)}
            >
              <span className="inline-flex items-center gap-2">
                <SlidersHorizontal aria-hidden="true" />
                Theme settings
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "transition-transform motion-reduce:transition-none",
                  settingsOpen && "rotate-180",
                )}
              />
            </Button>
          </div>
          <aside
            id="theme-builder-settings-panel"
            aria-labelledby="theme-builder-settings-heading"
            className={cn(
              "min-w-0 border-b border-border-subtle bg-background p-4 lg:block lg:border-r lg:border-b-0 lg:p-5",
              !settingsOpen && "hidden",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <h3
                id="theme-builder-settings-heading"
                className="text-sm font-semibold"
              >
                Customize your theme
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="size-10 shrink-0 rounded-[5px]"
                aria-label="Reset theme"
                onClick={() => {
                  setState(resetThemeBuilderState());
                  setFont(DEFAULT_THEME_FONT);
                }}
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-1 mb-5 text-xs leading-5 text-muted-foreground">
              Start with your brand color. Both modes update as you edit.
            </p>
            <ThemeInputs
              draft={state.draft}
              errors={state.fieldErrors}
              onFieldChange={(field, value) =>
                setState((current) =>
                  updateThemeBuilderField(current, field, value),
                )
              }
            />
            <div className="mt-5">
              <label
                htmlFor="theme-builder-font"
                className="text-sm font-medium"
              >
                Font family
              </label>
              <select
                id="theme-builder-font"
                value={font.id}
                aria-describedby="theme-builder-font-help"
                onChange={(event) => {
                  const selected = THEME_FONTS.find(
                    (item) => item.id === event.target.value,
                  );
                  if (selected) setFont(selected);
                }}
                className="mt-2 min-h-10 w-full min-w-0 rounded-[5px] border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {THEME_FONTS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <p
                id="theme-builder-font-help"
                className="mt-1.5 text-xs leading-4 text-muted-foreground"
              >
                Preview your typeface. Typography CSS is available with your
                export.
              </p>
            </div>
            {hasFieldErrors ? (
              <Alert
                variant="destructive"
                ariaLive="assertive"
                className="mt-4"
              >
                <AlertTitle>Showing the last valid theme</AlertTitle>
                <AlertDescription>
                  Correct the highlighted fields to update your preview and
                  exports.
                </AlertDescription>
              </Alert>
            ) : null}
            {state.generationError ? (
              <Alert
                variant="destructive"
                ariaLive="assertive"
                className="mt-4"
              >
                <AlertTitle>Theme generation could not complete</AlertTitle>
                <AlertDescription>{state.generationError}</AlertDescription>
              </Alert>
            ) : null}
            <section
              aria-labelledby="theme-builder-presets-heading"
              className="mt-6 border-t border-border-subtle pt-5"
            >
              <h3
                id="theme-builder-presets-heading"
                className="text-xs font-medium"
              >
                Or start with a preset
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {THEME_BUILDER_PRESETS.map((preset) => {
                  const selected = (
                    Object.keys(preset.draft) as ThemeBuilderField[]
                  ).every(
                    (field) => state.draft[field] === preset.draft[field],
                  );
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={selected}
                      title={preset.description}
                      onClick={() =>
                        setState((current) =>
                          applyThemeBuilderPreset(current, preset),
                        )
                      }
                      className={cn(
                        "relative rounded-[5px] border p-2.5 text-left transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        selected
                          ? "border-foreground bg-surface-muted"
                          : "border-border-subtle",
                      )}
                    >
                      <span aria-hidden="true" className="mb-2 flex gap-1">
                        {[
                          preset.brandColor,
                          preset.draft.neutralColor,
                          preset.draft.lightBackgroundColor,
                        ].map((color, index) => (
                          <span
                            key={index}
                            className="size-3.5 rounded-full border border-black/10"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </span>
                      <span className="block text-[11px] font-medium leading-4">
                        {preset.name}
                      </span>
                      {selected ? (
                        <Check
                          className="absolute top-2 right-2 size-3"
                          aria-hidden="true"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </section>
            <p className="mt-5 flex items-start gap-2 text-[11px] leading-5 text-muted-foreground">
              <LockKeyhole
                aria-hidden="true"
                className="mt-1 size-3 shrink-0"
              />
              No account. No uploads. Save a configuration file to continue
              later.
            </p>
          </aside>
          <div className="min-w-0 bg-surface-muted/30 p-3 sm:p-4">
            <Tabs
              value={previewTab}
              onValueChange={(value) => {
                if (PREVIEW_TABS.includes(value as PreviewTab))
                  setPreviewTab(value as PreviewTab);
              }}
            >
              <Dialog
                open={expanded}
                onOpenChange={(open) => {
                  if (open)
                    setInlineHeight(
                      inlinePreviewRef.current?.getBoundingClientRect()
                        .height ?? 0,
                    );
                  setExpanded(open);
                }}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  {!expanded ? (
                    <PreviewTabs />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Preview open in full screen
                    </span>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <ThemeModeControl
                      value={state.previewMode}
                      onChange={(mode) =>
                        setState((current) =>
                          selectThemeBuilderMode(current, mode),
                        )
                      }
                    />
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="min-h-10 rounded-[5px]"
                        aria-label="Open full screen preview"
                      >
                        <Maximize2 className="size-3.5" aria-hidden="true" />
                        <span>Full screen</span>
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>
                <div
                  ref={inlinePreviewRef}
                  className="overflow-hidden rounded-[5px] border border-border-subtle"
                  style={expanded ? { height: inlineHeight } : undefined}
                >
                  {!expanded ? renderPreview() : null}
                </div>
                <DialogContent
                  style={{ top: 0, borderRadius: 0 }}
                  className="left-0 flex h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden border-0 bg-background p-0 motion-reduce:animate-none [&>button]:right-3 [&>button]:top-3 [&>button]:grid [&>button]:size-10 [&>button]:place-items-center"
                >
                  <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-border-subtle py-4 pr-16 pl-4 sm:pl-6">
                    <div>
                      <DialogTitle className="text-sm">
                        Theme preview
                      </DialogTitle>
                      <DialogDescription className="mt-1 text-xs">
                        Your colors and typography · Live preview
                      </DialogDescription>
                    </div>
                    {expanded ? <PreviewTabs /> : null}
                    <ThemeModeControl
                      idPrefix="theme-builder-fullscreen-mode"
                      value={state.previewMode}
                      onChange={(mode) =>
                        setState((current) =>
                          selectThemeBuilderMode(current, mode),
                        )
                      }
                    />
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto overscroll-contain bg-surface-muted/30 p-2 sm:p-5">
                    <div className="mx-auto max-w-400 overflow-hidden rounded-[5px] border border-border-subtle">
                      {expanded ? renderPreview(true) : null}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </Tabs>
          </div>
        </div>
      </section>
      <ThemeQuality theme={state.generatedTheme} />
      <ThemeOutput theme={state.generatedTheme} font={font} />
    </div>
  );
}
