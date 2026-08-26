import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { SEMANTIC_ROLES, serializeTheme } from "@pycolors/color-engine";

import { createThemePreviewVariables } from "./theme-preview-variables";
import {
  createThemeBuilderState,
  selectThemeBuilderMode,
  updateThemeBuilderField,
} from "./theme-builder-state";

function serializedOutput(
  state: ReturnType<typeof createThemeBuilderState>,
  format: "css" | "json",
) {
  const result = serializeTheme(state.generatedTheme, format);
  assert.equal(result.ok, true);
  if (!result.ok) throw new Error("Expected output serialization to succeed.");
  return result.value.content;
}

test("creates complete scoped preview variables for each selected mode", () => {
  const state = createThemeBuilderState();
  const surroundingAppVariables = { "--primary": "site-primary" };
  const lightVariables = createThemePreviewVariables(
    state.generatedTheme.modes.light,
  );
  const darkVariables = createThemePreviewVariables(
    state.generatedTheme.modes.dark,
  );

  assert.deepEqual(
    Object.keys(lightVariables),
    SEMANTIC_ROLES.map((role) => `--${role}`),
  );
  assert.deepEqual(
    Object.keys(darkVariables),
    SEMANTIC_ROLES.map((role) => `--${role}`),
  );
  assert.equal(
    lightVariables["--primary"],
    state.generatedTheme.modes.light.semantic.primary.srgbHex,
  );
  assert.equal(
    darkVariables["--primary"],
    state.generatedTheme.modes.dark.semantic.primary.srgbHex,
  );
  assert.deepEqual(surroundingAppVariables, { "--primary": "site-primary" });
});

test("switching preview mode changes only the selected scoped map", () => {
  const initial = createThemeBuilderState();
  const dark = selectThemeBuilderMode(initial, "dark");

  assert.strictEqual(dark.generatedTheme, initial.generatedTheme);
  assert.notDeepEqual(
    createThemePreviewVariables(initial.generatedTheme.modes.light),
    createThemePreviewVariables(dark.generatedTheme.modes.dark),
  );
  assert.equal(dark.previewMode, "dark");
});

test("uses the engine output for CSS and JSON, including during invalid input", () => {
  const initial = createThemeBuilderState();
  const updated = updateThemeBuilderField(initial, "brandColor", "#0ea5e9");
  const invalid = updateThemeBuilderField(updated, "brandColor", "#0e");

  assert.notEqual(
    serializedOutput(initial, "css"),
    serializedOutput(updated, "css"),
  );
  assert.notEqual(
    serializedOutput(initial, "json"),
    serializedOutput(updated, "json"),
  );
  assert.strictEqual(invalid.generatedTheme, updated.generatedTheme);
  assert.equal(
    serializedOutput(invalid, "css"),
    serializedOutput(updated, "css"),
  );
  assert.equal(
    serializedOutput(invalid, "json"),
    serializedOutput(updated, "json"),
  );
});

test("keeps the preview root-scoped and imports public UI components", () => {
  const previewSource = readFileSync(
    new URL("./theme-preview.tsx", import.meta.url),
    "utf8",
  );
  const builderSource = readFileSync(
    new URL("./theme-builder.tsx", import.meta.url),
    "utf8",
  );

  assert.match(previewSource, /from "@pycolors\/ui"/u);
  assert.doesNotMatch(previewSource, /@pycolors\/ui\/src/u);
  for (const component of [
    "Button",
    "Input",
    "Card",
    "Badge",
    "Alert",
    "Tabs",
    "Table",
  ]) {
    assert.match(previewSource, new RegExp(`\\b${component}\\b`, "u"));
  }
  assert.doesNotMatch(previewSource, /document\.documentElement/u);
  assert.doesNotMatch(builderSource, /document\.documentElement/u);
  assert.match(previewSource, /style=\{style\}/u);
});

test("renders Northstar as a branded application shell instead of a component demo", () => {
  const previewSource = readFileSync(
    new URL("./theme-preview.tsx", import.meta.url),
    "utf8",
  );
  assert.match(previewSource, /aria-label="Northstar workspace"/u);
  assert.match(previewSource, /Northstar workspace/u);
  assert.match(previewSource, /Dashboard/u);
  assert.match(previewSource, /Active projects/u);
  assert.match(previewSource, /Delivery health/u);
  assert.match(previewSource, /Delivery board/u);
  assert.match(previewSource, /Live activity/u);
  assert.match(previewSource, /New project/u);
  assert.match(previewSource, /Form validation/u);
  assert.match(previewSource, /Empty state/u);
  assert.match(previewSource, /Focus-ready action/u);
  assert.match(previewSource, /bg-primary\/5/u);
  assert.match(previewSource, /data-\[state=active\]:bg-primary/u);
  assert.match(previewSource, /id="northstar-projects"/u);
  assert.doesNotMatch(
    previewSource,
    /Manage the project defaults used by your delivery team\./u,
  );
  assert.doesNotMatch(previewSource, /Save workspace/u);
});

test("highlights local token exports with Rehype Pretty Code", () => {
  const outputSource = readFileSync(
    new URL("./theme-output.tsx", import.meta.url),
    "utf8",
  );
  const highlighterSource = readFileSync(
    new URL("./theme-code-highlighter.worker.ts", import.meta.url),
    "utf8",
  );

  assert.match(outputSource, /HighlightedThemeCode/u);
  assert.match(outputSource, /activeFormat/u);
  assert.match(outputSource, /useTheme/u);
  assert.match(outputSource, /resolvedTheme === "light" \? "light" : "dark"/u);
  assert.match(outputSource, /colorScheme=\{codeColorScheme\}/u);
  assert.match(outputSource, /bg-white text-black/u);
  assert.match(outputSource, /bg-black text-white/u);
  assert.match(
    outputSource,
    /Compact example of the current generated CSS override[\s\S]*generatedCssExample\(css\.content\)/u,
  );
  assert.match(highlighterSource, /from "rehype-pretty-code"/u);
  assert.match(highlighterSource, /"github-light"/u);
  assert.match(highlighterSource, /"github-dark"/u);
  assert.match(highlighterSource, /self\.postMessage/u);
  assert.doesNotMatch(highlighterSource, /fetch\s*\(/u);
});

test("keeps the preview full width while settings open in a full Studio overlay", () => {
  const builderSource = readFileSync(
    new URL("./theme-builder.tsx", import.meta.url),
    "utf8",
  );
  const inputsSource = readFileSync(
    new URL("./theme-inputs.tsx", import.meta.url),
    "utf8",
  );
  const previewSource = readFileSync(
    new URL("./theme-preview.tsx", import.meta.url),
    "utf8",
  );
  const outputSource = readFileSync(
    new URL("./theme-output.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    builderSource,
    /const \[settingsOpen, setSettingsOpen\] = React\.useState\(false\)/u,
  );
  assert.match(
    builderSource,
    /aria-labelledby="theme-builder-settings-heading"/u,
  );
  assert.match(
    builderSource,
    /aria-controls="theme-builder-settings-panel"[\s\S]*aria-expanded=\{settingsOpen\}/u,
  );
  assert.match(
    builderSource,
    /absolute inset-x-0 top-0 z-50 min-h-full rounded-\[4px\] border border-pro-border bg-surface shadow-medium/u,
  );
  assert.match(builderSource, /<ThemeSettingsPanel/u);
  assert.match(builderSource, /<ThemePreview[\s\S]*settingsControl=\{/u);
  assert.match(builderSource, /<ThemeOutput theme=\{state\.generatedTheme\}/u);
  assert.match(builderSource, /settingsOpen=\{settingsOpen\}/u);
  assert.match(builderSource, /Professional foundations/u);
  assert.match(builderSource, /Start with a balanced combination/u);
  assert.match(builderSource, /applyThemeBuilderPreset/u);
  assert.match(builderSource, /role="dialog"/u);
  assert.match(builderSource, /aria-modal="true"/u);
  assert.match(builderSource, /focusableSelector/u);
  assert.match(builderSource, /event\.key === "Escape"/u);
  assert.match(builderSource, /settingsTriggerRef/u);
  assert.match(builderSource, /Theme quality/u);
  assert.match(builderSource, /Automatic safeguards/u);
  assert.match(builderSource, /Visual contrast check/u);
  assert.match(builderSource, /Tune the brand foundation/u);
  assert.match(
    builderSource,
    /xl:grid-cols-\[minmax\(0,1\.15fr\)_minmax\(20rem,0\.85fr\)\]/u,
  );
  assert.match(
    builderSource,
    /border border-pro-border bg-pro-surface shadow-medium/u,
  );
  assert.match(builderSource, /PyColors Theme Studio/u);
  assert.match(previewSource, /settingsOpen[\s\S]*overflow-visible/u);
  assert.match(previewSource, /embedded = false/u);
  assert.match(
    inputsSource,
    /<fieldset className="overflow-hidden rounded-\[4px\] border border-border-subtle bg-background">/u,
  );
  assert.match(
    inputsSource,
    /<legend className="sr-only">Theme settings<\/legend>/u,
  );
  assert.equal((inputsSource.match(/<ThemeSetting/g) ?? []).length, 3);
  assert.doesNotMatch(inputsSource, /Advanced override/u);
  assert.doesNotMatch(inputsSource, /lightBackgroundColor/u);
  assert.match(
    inputsSource,
    /grid min-w-0 gap-3 border-b border-border-subtle p-3\.5 last:border-b-0 sm:grid-cols-\[8rem_minmax\(0,1fr\)\] sm:gap-4/u,
  );
  assert.match(inputsSource, /max-w-md/u);
  assert.match(inputsSource, /Choose \{label\.toLowerCase\(\)\}/u);
  assert.doesNotMatch(builderSource, /lg:grid-cols-\[minmax\(17rem/u);
  assert.doesNotMatch(builderSource, /lg:grid-cols-5/u);
  assert.match(outputSource, /Integration checklist/u);
  assert.match(outputSource, /INTEGRATION_STEPS/u);
});
