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
  assert.match(previewSource, /aria-label="Northstar projects"/u);
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
  assert.match(
    outputSource,
    /const \[codeVisible, setCodeVisible\] = useState\(false\)/u,
  );
  assert.match(outputSource, /useTheme/u);
  assert.match(outputSource, /resolvedTheme === "light" \? "light" : "dark"/u);
  assert.match(outputSource, /colorScheme=\{codeColorScheme\}/u);
  assert.match(outputSource, /bg-white text-black/u);
  assert.match(outputSource, /bg-black text-white/u);
  assert.match(outputSource, /View generated code/u);
  assert.match(outputSource, /Hide generated code/u);
  assert.match(outputSource, /aria-expanded=\{codeVisible\}/u);
  assert.match(outputSource, /hidden=\{!codeVisible\}/u);
  assert.match(outputSource, /active=\{codeVisible\}/u);
  assert.match(outputSource, /content=\{activeArtifact\.content\}/u);
  assert.match(highlighterSource, /from "rehype-pretty-code"/u);
  assert.match(highlighterSource, /"github-light"/u);
  assert.match(highlighterSource, /"github-dark"/u);
  assert.match(highlighterSource, /self\.postMessage/u);
  assert.doesNotMatch(highlighterSource, /fetch\s*\(/u);
});

test("keeps customization inline and exports reachable outside the preview", () => {
  const builderSource = readFileSync(
    new URL("./theme-builder.tsx", import.meta.url),
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

  const qualitySource = readFileSync(
    new URL("./theme-quality.tsx", import.meta.url),
    "utf8",
  );

  assert.match(builderSource, /aria-controls="theme-builder-settings-panel"/u);
  assert.match(builderSource, /aria-expanded=\{settingsOpen\}/u);
  assert.match(
    builderSource,
    /aria-labelledby="theme-builder-settings-heading"/u,
  );
  assert.doesNotMatch(builderSource, /aria-modal|role="dialog"/u);
  assert.match(builderSource, /href="#theme-builder-export"/u);
  assert.match(outputSource, /id="theme-builder-export"/u);
  assert.match(builderSource, /<ThemeQuality theme=\{state.generatedTheme\}/u);
  assert.match(qualitySource, /Color readability/u);
  assert.match(qualitySource, /Automatic color adjustments/u);
  assert.match(qualitySource, /Technical details/u);
  assert.doesNotMatch(previewSource, /ThemeModeControl|settingsControl/u);
  assert.match(outputSource, /Integration checklist/u);
  assert.match(outputSource, /INTEGRATION_STEPS/u);
});
