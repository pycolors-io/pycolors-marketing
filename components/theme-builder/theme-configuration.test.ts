import assert from "node:assert/strict";
import test from "node:test";
import { serializeTheme } from "@pycolors/color-engine";
import {
  createThemeBuilderState,
  selectThemeBuilderMode,
  updateThemeBuilderField,
} from "./theme-builder-state";
import {
  createThemeConfigurationFile,
  MAX_THEME_CONFIGURATION_BYTES,
  parseThemeConfiguration,
} from "./theme-configuration";
import { DEFAULT_THEME_FONT, THEME_FONTS } from "./theme-typography";

function fixture() {
  let state = createThemeBuilderState();
  state = updateThemeBuilderField(state, "brandColor", "#0ea5e9");
  state = updateThemeBuilderField(state, "name", "Aurora Team");
  state = updateThemeBuilderField(state, "neutralColor", "#64748b");
  state = updateThemeBuilderField(state, "lightBackgroundColor", "#f8fafc");
  state = selectThemeBuilderMode(state, "dark");
  return { state, font: THEME_FONTS[1]! };
}

test("round-trips all editable settings and regenerates identical color exports", () => {
  const { state, font } = fixture();
  const file = createThemeConfigurationFile(state, font);
  assert.equal(file.fileName, "aurora-team.pycolors-theme.json");
  assert.equal(file.mediaType, "application/json");
  assert.ok(Buffer.byteLength(file.content) < MAX_THEME_CONFIGURATION_BYTES);
  const restored = parseThemeConfiguration(file.content);
  assert.equal(restored.ok, true);
  assert.deepEqual(restored.value.state, state);
  assert.equal(restored.value.font.id, font.id);
  for (const format of ["css", "tailwind-v4", "json"] as const) {
    assert.deepEqual(
      serializeTheme(restored.value.state.generatedTheme, format),
      serializeTheme(state.generatedTheme, format),
    );
  }
});

test("preserves optional empty inputs and accepts a UTF-8 BOM", () => {
  const state = updateThemeBuilderField(createThemeBuilderState(), "name", "");
  const file = createThemeConfigurationFile(state, DEFAULT_THEME_FONT);
  assert.equal(file.fileName, "pycolors-theme.pycolors-theme.json");
  const restored = parseThemeConfiguration(`\uFEFF${file.content}`);
  assert.equal(restored.ok, true);
  if (restored.ok) assert.deepEqual(restored.value.state.draft, state.draft);
});

test("rejects malformed files, unsupported versions, fonts, modes, and invalid field types", () => {
  const { state, font } = fixture();
  const saved = JSON.parse(createThemeConfigurationFile(state, font).content);
  for (const content of [
    "{broken",
    "null",
    "[]",
    JSON.stringify({ ...saved, version: 2 }),
    JSON.stringify({ ...saved, previewMode: "auto" }),
    JSON.stringify({
      ...saved,
      fontId: "https://untrusted.example/font.woff2",
    }),
    JSON.stringify({ ...saved, theme: { ...saved.theme, name: 42 } }),
    JSON.stringify({ ...saved, theme: { ...saved.theme, brandColor: "#12" } }),
    JSON.stringify({
      ...saved,
      theme: { ...saved.theme, neutralColor: "url(https://untrusted.example)" },
    }),
    JSON.stringify({
      ...saved,
      theme: { ...saved.theme, lightBackgroundColor: "red" },
    }),
    JSON.stringify({
      ...saved,
      theme: { ...saved.theme, name: "x".repeat(65) },
    }),
    " ".repeat(MAX_THEME_CONFIGURATION_BYTES + 1),
  ]) {
    const result = parseThemeConfiguration(content);
    assert.equal(result.ok, false);
    if (!result.ok) assert.ok(result.message.length > 0);
  }
});

test("distinguishes generated token JSON from an editable configuration", () => {
  const tokens = serializeTheme(
    createThemeBuilderState().generatedTheme,
    "json",
  );
  if (!tokens.ok) throw new Error("Expected token JSON");
  const result = parseThemeConfiguration(tokens.value.content);
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.message, /Save configuration/);
});

test("ignores injected generated tokens and arbitrary font CSS", () => {
  const { state, font } = fixture();
  const saved = JSON.parse(createThemeConfigurationFile(state, font).content);
  const restored = parseThemeConfiguration(
    JSON.stringify({
      ...saved,
      generatedTheme: { modes: { dark: { semantic: { primary: "red" } } } },
      fontFamily: "untrusted",
      theme: {
        ...saved.theme,
        __proto__: { inherited: true },
        unexpected: "discard",
      },
    }),
  );
  assert.equal(restored.ok, true);
  if (restored.ok) {
    assert.deepEqual(restored.value.state, state);
    assert.deepEqual(restored.value.font, font);
  }
});

test("does not save an incomplete draft as a reusable configuration", () => {
  const invalid = updateThemeBuilderField(
    createThemeBuilderState(),
    "brandColor",
    "#12",
  );
  assert.throws(
    () => createThemeConfigurationFile(invalid, DEFAULT_THEME_FONT),
    /highlighted fields/,
  );
});
