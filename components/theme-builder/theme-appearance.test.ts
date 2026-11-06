import assert from "node:assert/strict";
import {
  readFileSync,
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";
import {
  APPEARANCE_DEFAULTS,
  APPEARANCE_PALETTES,
  APPEARANCE_ROLES,
} from "../../lib/appearance-contract";
import {
  createThemeBuilderState,
  selectThemeBuilderPreset,
  updateThemeBuilderField,
  selectThemeBuilderMode,
} from "./theme-builder-state";
import {
  createThemeConfigurationFile,
  parseThemeConfiguration,
} from "./theme-configuration";
import { DEFAULT_THEME_FONT } from "./theme-typography";
import { createStarterProAppearanceFile } from "./starter-pro-appearance-file";

test("each shared preset exports the same semantic colors in both modes", () => {
  for (const preset of APPEARANCE_PALETTES) {
    const state = selectThemeBuilderPreset(
      createThemeBuilderState(),
      preset.value,
    );
    for (const mode of ["light", "dark"] as const)
      for (const role of APPEARANCE_ROLES)
        assert.equal(
          state.generatedTheme.modes[mode].semantic[role].srgbHex,
          preset.modes[mode][role],
          `${preset.value}/${mode}/${role}`,
        );
    assert.equal(state.presetId, preset.value);
    assert.equal(state.generatedTheme.contrasts.length, 34);
  }
});
test("background edits retain the preset's dark colors and save exact custom product defaults", () => {
  const preset = selectThemeBuilderPreset(
    createThemeBuilderState(),
    "indigo-ledger",
  );
  const edited = updateThemeBuilderField(
    preset,
    "lightBackgroundColor",
    "#fff9f0",
  );
  assert.deepEqual(
    edited.generatedTheme.modes.dark,
    preset.generatedTheme.modes.dark,
  );
  assert.equal(
    edited.generatedTheme.modes.light.semantic.background.srgbHex,
    "#fff9f0",
  );
  const file = createStarterProAppearanceFile(
    edited.generatedTheme,
    APPEARANCE_DEFAULTS,
    edited.presetId,
    "dark",
  );
  assert.match(file.content, /"palette": "custom"/);
  assert.match(file.content, /#fff9f0/);
});
test("v2 round-trips geometry and layout; legacy v1 fonts and engine colors remain readable", () => {
  const state = selectThemeBuilderMode(
    selectThemeBuilderPreset(createThemeBuilderState(), "coral-signal"),
    "dark",
  );
  const appearance = {
    ...APPEARANCE_DEFAULTS,
    radius: "large",
    scale: "125",
    sidebar: "collapsed",
    sidebarCollapse: "icons",
    density: "comfortable",
  } as const;
  const file = createThemeConfigurationFile(
    state,
    DEFAULT_THEME_FONT,
    appearance,
  );
  const result = parseThemeConfiguration(file.content);
  assert(result.ok);
  assert.deepEqual(result.value.appearance, appearance);
  assert.deepEqual(result.value.state, state);
  const custom = updateThemeBuilderField(
    createThemeBuilderState(),
    "brandColor",
    "#0ea5e9",
  );
  for (const [oldId, currentId] of [
    ["system-sans", "system"],
    ["system-mono", "mono"],
    ["mona-sans", "mona-sans"],
  ]) {
    const legacy = parseThemeConfiguration(
      JSON.stringify({
        format: "pycolors-theme-builder",
        version: 1,
        theme: custom.draft,
        previewMode: "dark",
        fontId: oldId,
      }),
    );
    assert(legacy.ok);
    assert.equal(legacy.value.font.id, currentId);
    assert.deepEqual(legacy.value.state.generatedTheme, custom.generatedTheme);
  }
  const saved = JSON.parse(file.content);
  for (const patch of [
    { appearance: { ...appearance, scale: "500" } },
    { appearance: { ...appearance, radius: "url(https://untrusted.example)" } },
    { presetId: "unknown" },
    { theme: { ...state.draft, brandColor: "#123456" } },
  ])
    assert.equal(
      parseThemeConfiguration(JSON.stringify({ ...saved, ...patch })).ok,
      false,
    );
  assert.equal(parseThemeConfiguration("é".repeat(9000)).ok, false);
});

test("a downloaded config boots the actual standalone Starter Pro appearance modules", () => {
  const directory = mkdtempSync(
    join(tmpdir(), "pycolors-appearance-consumer-"),
  );
  const require = createRequire(join(directory, "package.json"));
  try {
    mkdirSync(join(directory, "lib"));
    mkdirSync(join(directory, "config"));
    writeFileSync(join(directory, "package.json"), '{"type":"commonjs"}');
    function compile(source: string, target: string) {
      writeFileSync(
        join(directory, target),
        ts.transpileModule(source, {
          compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            target: ts.ScriptTarget.ES2022,
          },
        }).outputText,
      );
    }
    for (const name of [
      "appearance-contract",
      "palette",
      "theme",
      "dashboard-preferences",
    ])
      compile(
        readFileSync(
          new URL(`../../../starter-pro/lib/${name}.ts`, import.meta.url),
          "utf8",
        ),
        `lib/${name}.js`,
      );
    const state = selectThemeBuilderMode(
      updateThemeBuilderField(
        createThemeBuilderState(),
        "brandColor",
        "#0ea5e9",
      ),
      "dark",
    );
    const preferences = {
      ...APPEARANCE_DEFAULTS,
      scale: "125",
      radius: "large",
      sidebar: "collapsed",
      sidebarCollapse: "icons",
    } as const;
    const file = createStarterProAppearanceFile(
      state.generatedTheme,
      preferences,
      null,
      "dark",
    );
    compile(file.content, "config/appearance.js");
    const palette = require("./lib/palette.js");
    const dashboard = require("./lib/dashboard-preferences.js");
    const theme = require("./lib/theme.js");
    const values = new Map<string, string>();
    const root = {
      dataset: {} as Record<string, string>,
      style: {
        colorScheme: "",
        setProperty(name: string, value: string) {
          values.set(name, value);
        },
      },
      classList: {
        dark: false,
        toggle(name: string, value: boolean) {
          this.dark = name === "dark" && value;
        },
      },
    };
    const environment = {
      document: { documentElement: root },
      localStorage: { getItem: () => null },
      matchMedia: () => ({ matches: false }),
    };
    for (const script of [
      palette.PALETTE_INIT_SCRIPT,
      dashboard.DASHBOARD_INIT_SCRIPT,
      theme.THEME_INIT_SCRIPT,
    ])
      vm.runInNewContext(script, environment);
    assert.equal(root.dataset.appPalette, "custom");
    assert.equal(root.dataset.appScale, "125");
    assert.equal(root.dataset.appRadius, "large");
    assert.equal(root.dataset.appSidebarCollapse, "icons");
    assert.equal(root.classList.dark, true);
    for (const mode of ["light", "dark"] as const)
      for (const role of APPEARANCE_ROLES)
        assert.equal(
          values.get(`--app-theme-${mode}-${role}`),
          state.generatedTheme.modes[mode].semantic[role].srgbHex,
        );
    vm.runInNewContext(dashboard.DASHBOARD_INIT_SCRIPT, {
      ...environment,
      localStorage: {
        getItem: () =>
          JSON.stringify({ scale: "110", radius: "none", font: "system" }),
      },
    });
    assert.equal(root.dataset.appScale, "110");
    assert.equal(root.dataset.appRadius, "none");
    assert.equal(root.dataset.appFont, "system");
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
