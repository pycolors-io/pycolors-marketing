import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SCALE_STEPS, serializeTheme } from "@pycolors/color-engine";
import { ThemeBuilder } from "@/components/theme-builder/theme-builder";
import {
  createThemeBuilderState,
  updateThemeBuilderField,
} from "@/components/theme-builder/theme-builder-state";

vi.mock("fumadocs-ui/provider/base", () => ({
  useTheme: () => ({ resolvedTheme: "dark" }),
}));
vi.mock("@/components/theme-builder/theme-code-highlighter", () => ({
  HighlightedThemeCode: ({ content }: { content: string }) => (
    <code>{content}</code>
  ),
}));

const writeText = vi.fn().mockResolvedValue(undefined);
const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  "clipboard",
);
beforeEach(() => {
  writeText.mockClear();
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
});
afterEach(() => {
  if (originalClipboard)
    Object.defineProperty(navigator, "clipboard", originalClipboard);
  else Reflect.deleteProperty(navigator, "clipboard");
});
function selectView(name: string) {
  fireEvent.mouseDown(screen.getByRole("tab", { name }), {
    button: 0,
    ctrlKey: false,
  });
}

describe("Theme Builder exploration", () => {
  it("shows engine-owned shades in both modes and copies the selected value", async () => {
    render(<ThemeBuilder />);
    selectView("Palette");
    const theme = createThemeBuilderState().generatedTheme;
    for (const mode of ["light", "dark"] as const) {
      fireEvent.click(
        screen.getByRole("radio", {
          name: mode === "light" ? "Light" : "Dark",
        }),
      );
      const palette = within(
        screen.getByRole("region", { name: "Theme palette" }),
      );
      for (const family of ["accent", "neutral"] as const) {
        for (const step of SCALE_STEPS) {
          const color = theme.modes[mode].scales[family][step];
          expect(
            palette.getByRole("button", {
              name: `${family === "accent" ? "Accent" : "Neutral"} shade ${step}, ${color.srgbHex}`,
            }),
          ).toBeVisible();
        }
      }
      const selected = theme.modes[mode].scales.accent[9];
      fireEvent.click(
        palette.getByRole("button", {
          name: `Accent shade 9, ${selected.srgbHex}`,
        }),
      );
      fireEvent.click(palette.getByRole("button", { name: "Copy HEX" }));
      await waitFor(() =>
        expect(writeText).toHaveBeenLastCalledWith(selected.srgbHex),
      );
      fireEvent.click(palette.getByRole("button", { name: "Copy OKLCH" }));
      await waitFor(() =>
        expect(writeText).toHaveBeenLastCalledWith(selected.oklch),
      );
      expect(palette.getByText(/Used by --primary, --ring/)).toBeVisible();
    }
    fireEvent.click(screen.getByRole("button", { name: "Inspect background" }));
    const selectedColor = within(
      screen.getByRole("region", { name: "Selected color" }),
    );
    expect(
      selectedColor.getByText(theme.modes.dark.semantic.background.srgbHex),
    ).toBeVisible();
  });

  it("applies the light background, keeps the dark palette, and retains the last valid export", async () => {
    render(<ThemeBuilder />);
    selectView("Palette");
    fireEvent.click(screen.getByRole("button", { name: "Inspect background" }));
    const background = screen.getByRole("textbox", {
      name: "Light background",
    });
    fireEvent.change(background, { target: { value: "#fff9f0" } });
    expect(
      within(screen.getByRole("region", { name: "Selected color" })).getByText(
        "#fff9f0",
      ),
    ).toBeVisible();
    const valid = updateThemeBuilderField(
      createThemeBuilderState(),
      "lightBackgroundColor",
      "#fff9f0",
    );
    fireEvent.change(background, { target: { value: "#ff" } });
    expect(background).toHaveAttribute("aria-invalid", "true");
    expect(
      within(screen.getByRole("region", { name: "Selected color" })).getByText(
        "#fff9f0",
      ),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Copy CSS" }));
    const output = serializeTheme(valid.generatedTheme, "css");
    if (!output.ok) throw new Error("Expected valid output");
    await waitFor(() =>
      expect(writeText).toHaveBeenLastCalledWith(output.value.content),
    );
    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(
      within(screen.getByRole("region", { name: "Selected color" })).getByText(
        createThemeBuilderState().generatedTheme.modes.dark.semantic.background
          .srgbHex,
      ),
    ).toBeVisible();
  });

  it("retains demo controls, typography, and palette selection across views and full screen", async () => {
    render(<ThemeBuilder />);
    selectView("Components");
    fireEvent.change(
      screen.getByRole("textbox", { name: /^Workspace display name/ }),
      { target: { value: "Aurora Studio" } },
    );
    fireEvent.click(screen.getByRole("checkbox", { name: /Weekly summary/ }));
    fireEvent.change(screen.getByRole("combobox", { name: "Font family" }), {
      target: { value: "system-mono" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save demo settings" }));
    expect(
      screen.getByText("Demo settings saved in this preview."),
    ).toBeVisible();
    const trigger = screen.getByRole("button", {
      name: "Open full screen preview",
    });
    fireEvent.click(trigger);
    expect(
      screen.getByRole("region", { name: "Your theme in use" }).style
        .fontFamily,
    ).toContain("ui-monospace");
    expect(
      screen.getByRole("textbox", { name: /^Workspace display name/ }),
    ).toHaveValue("Aurora Studio");
    expect(
      screen.getByRole("checkbox", { name: /Weekly summary/ }),
    ).toBeChecked();
    selectView("Palette");
    fireEvent.click(screen.getByRole("button", { name: "Inspect ring" }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
    expect(
      screen.getByRole("button", { name: "Inspect ring" }),
    ).toHaveAttribute("aria-pressed", "true");
    selectView("Components");
    expect(
      screen.getByRole("textbox", { name: /^Workspace display name/ }),
    ).toHaveValue("Aurora Studio");
    expect(
      screen.getByRole("checkbox", { name: /Weekly summary/ }),
    ).toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Destructive" }));
    expect(screen.getByText("Destructive action previewed.")).toBeVisible();
  });
});
