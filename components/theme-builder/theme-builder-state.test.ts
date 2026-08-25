import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_THEME_BUILDER_MODE,
  THEME_BUILDER_DEFAULTS,
  createThemeBuilderState,
  resetThemeBuilderState,
  selectThemeBuilderMode,
  updateThemeBuilderField,
} from "./theme-builder-state";

test("creates deterministic defaults with both generated modes", () => {
  const first = createThemeBuilderState();
  const second = createThemeBuilderState();

  assert.deepEqual(first.draft, THEME_BUILDER_DEFAULTS);
  assert.equal(first.previewMode, DEFAULT_THEME_BUILDER_MODE);
  assert.deepEqual(Object.keys(first.generatedTheme.modes), ["light", "dark"]);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("regenerates valid brand input through the color engine", () => {
  const initial = createThemeBuilderState();
  const updated = updateThemeBuilderField(initial, "brandColor", "#ef4444");

  assert.equal(updated.draft.brandColor, "#ef4444");
  assert.equal(updated.generatedTheme.input.brandColor, "#ef4444");
  assert.notEqual(
    updated.generatedTheme.modes.light.scales.accent[9].srgbHex,
    initial.generatedTheme.modes.light.scales.accent[9].srgbHex,
  );
  assert.deepEqual(updated.fieldErrors, {});
});

test("retains the last valid theme while a partial brand value is invalid", () => {
  const initial = createThemeBuilderState();
  const invalid = updateThemeBuilderField(initial, "brandColor", "#12");

  assert.equal(invalid.draft.brandColor, "#12");
  assert.strictEqual(invalid.generatedTheme, initial.generatedTheme);
  assert.equal(
    invalid.fieldErrors.brandColor,
    "Enter a six-digit hexadecimal brand color in the format #rrggbb.",
  );
});

test("applies and clears optional name, neutral, and light background values", () => {
  const initial = createThemeBuilderState();
  const named = updateThemeBuilderField(initial, "name", "Product Theme");
  const neutral = updateThemeBuilderField(named, "neutralColor", "#71717a");
  const background = updateThemeBuilderField(
    neutral,
    "lightBackgroundColor",
    "#f5f0ff",
  );
  const restoredNeutral = updateThemeBuilderField(
    background,
    "neutralColor",
    "",
  );
  const restoredBackground = updateThemeBuilderField(
    restoredNeutral,
    "lightBackgroundColor",
    "",
  );

  assert.equal(background.generatedTheme.input.name, "Product Theme");
  assert.notEqual(
    neutral.generatedTheme.modes.light.scales.neutral[9].srgbHex,
    named.generatedTheme.modes.light.scales.neutral[9].srgbHex,
  );
  assert.equal(
    background.generatedTheme.modes.light.semantic.background.srgbHex,
    "#f5f0ff",
  );
  assert.equal(restoredNeutral.generatedTheme.input.neutralColor, null);
  assert.equal(
    restoredBackground.generatedTheme.input.lightBackgroundColor,
    null,
  );
});

test("switches preview mode without regenerating or changing inputs", () => {
  const initial = createThemeBuilderState();
  const dark = selectThemeBuilderMode(initial, "dark");
  const light = selectThemeBuilderMode(dark, "light");

  assert.equal(dark.previewMode, "dark");
  assert.strictEqual(dark.generatedTheme, initial.generatedTheme);
  assert.deepEqual(dark.draft, initial.draft);
  assert.equal(light.previewMode, "light");
  assert.strictEqual(light.generatedTheme, initial.generatedTheme);
});

test("reset restores the exact defaults and light preview mode", () => {
  const initial = createThemeBuilderState();
  const changed = selectThemeBuilderMode(
    updateThemeBuilderField(initial, "brandColor", "#0ea5e9"),
    "dark",
  );
  const reset = resetThemeBuilderState();

  assert.notEqual(JSON.stringify(changed), JSON.stringify(reset));
  assert.equal(JSON.stringify(reset), JSON.stringify(initial));
  assert.equal(reset.previewMode, "light");
});

test("keeps contrast failures visible as engine warnings", () => {
  const initial = createThemeBuilderState();
  const unsafeBackground = updateThemeBuilderField(
    initial,
    "lightBackgroundColor",
    "#777777",
  );

  assert.ok(
    unsafeBackground.generatedTheme.contrasts.some(
      (contrast) => contrast.status === "fail",
    ),
  );
  assert.ok(
    unsafeBackground.generatedTheme.warnings.some(
      (warning) => warning.code === "contrast-below-target",
    ),
  );
});
