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
