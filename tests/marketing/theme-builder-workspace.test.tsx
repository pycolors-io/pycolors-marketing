import * as React from "react";
import { renderToString } from "react-dom/server";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { serializeTheme } from "@pycolors/color-engine";

import { ThemeBuilder } from "@/components/theme-builder/theme-builder";
import { createThemeBuilderState } from "@/components/theme-builder/theme-builder-state";

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

function preview() {
  return screen.getByRole("region", { name: "Dashboard" });
}
function chooseFormat(name: string) {
  fireEvent.mouseDown(screen.getByRole("tab", { name }), {
    button: 0,
    ctrlKey: false,
  });
}

describe("Theme Builder workspace", () => {
  it("hydrates the server-rendered dashboard and chart without recoverable errors", async () => {
    const container = document.createElement("div");
    container.innerHTML = renderToString(<ThemeBuilder />);
    document.body.append(container);
    const onRecoverableError = vi.fn();
    render(<ThemeBuilder />, { container, hydrate: true, onRecoverableError });
    await waitFor(() =>
      expect(screen.getByRole("img", { name: /Total 148/ })).toBeVisible(),
    );
    expect(onRecoverableError).not.toHaveBeenCalled();
  });

  it("copies each serializer format without requiring code to be revealed", async () => {
    render(<ThemeBuilder />);
    expect(screen.getByRole("link", { name: "Export theme" })).toHaveAttribute(
      "href",
      "#theme-builder-export",
    );
    expect(
      screen.getByRole("button", { name: "View generated code" }),
    ).toHaveAttribute("aria-expanded", "false");
    for (const [label, format] of [
      ["CSS", "css"],
      ["Tailwind v4", "tailwind-v4"],
      ["JSON", "json"],
    ] as const) {
      chooseFormat(label);
      expect(
        screen.queryByText("Copied to your clipboard."),
      ).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: `Copy ${label}` }));
      const expected = serializeTheme(
        createThemeBuilderState().generatedTheme,
        format,
      );
      if (!expected.ok) throw new Error("Expected default theme to serialize");
      await waitFor(() =>
        expect(writeText).toHaveBeenLastCalledWith(expected.value.content),
      );
      expect(
        screen.getByRole("button", { name: "View generated code" }),
      ).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("preserves the last valid preview and export during incomplete color input", async () => {
    render(<ThemeBuilder />);
    const input = screen.getByRole("textbox", { name: /^Brand color/ });
    fireEvent.change(input, { target: { value: "#0ea5e9" } });
    const validPreview = preview().style.getPropertyValue("--primary");
    fireEvent.click(screen.getByRole("button", { name: "Copy CSS" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    const validExport = writeText.mock.calls[0][0];
    fireEvent.change(input, { target: { value: "#0e" } });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Showing the last valid theme")).toBeVisible();
    expect(preview().style.getPropertyValue("--primary")).toBe(validPreview);
    fireEvent.click(screen.getByRole("button", { name: "Copy CSS" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenLastCalledWith(validExport),
    );
    fireEvent.change(input, { target: { value: "#dc2626" } });
    expect(input).not.toHaveAttribute("aria-invalid", "true");
    expect(preview().style.getPropertyValue("--primary")).not.toBe(
      validPreview,
    );
  });

  it("applies a preset, switches only the preview mode, and resets the editor", () => {
    render(<ThemeBuilder />);
    const initial = preview().style.getPropertyValue("--primary");
    const preset = screen.getByRole("button", { name: "Indigo Ledger" });
    fireEvent.click(preset);
    expect(preset).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      "Indigo Ledger",
    );
    expect(screen.getByRole("textbox", { name: /^Brand color/ })).toHaveValue(
      "#4f46e5",
    );
    expect(preview().style.getPropertyValue("--primary")).not.toBe(initial);
    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    expect(preview()).toHaveAttribute("data-theme-builder-preview", "dark");
    expect(screen.getByRole("textbox", { name: /^Brand color/ })).toHaveValue(
      "#4f46e5",
    );
    fireEvent.click(screen.getByRole("button", { name: "Reset theme" }));
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      "PyColors Theme",
    );
    expect(preview()).toHaveAttribute("data-theme-builder-preview", "light");
    expect(preview().style.getPropertyValue("--primary")).toBe(initial);
  });

  it("toggles inline mobile settings without a dialog or focus trap", () => {
    render(<ThemeBuilder />);
    const trigger = screen.getByRole("button", { name: "Theme settings" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(
      document.getElementById(trigger.getAttribute("aria-controls")!),
    ).not.toBeNull();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it.each([
    ["Rose Atelier", "#be185d"],
    ["Amber Foundry", "#b45309"],
  ])("applies the %s preset to a valid color theme", (name, color) => {
    render(<ThemeBuilder />);
    const initial = preview().style.getPropertyValue("--primary");
    fireEvent.click(screen.getByRole("button", { name }));
    expect(screen.getByRole("button", { name })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("textbox", { name: /^Brand color/ })).toHaveValue(
      color,
    );
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      name,
    );
    expect(
      screen.queryByText("Showing the last valid theme"),
    ).not.toBeInTheDocument();
    expect(preview().style.getPropertyValue("--primary")).not.toBe(initial);
  });

  it("previews and copies typography separately, keeps it in full screen, and resets it", async () => {
    render(<ThemeBuilder />);
    const outsideFont = document.documentElement.style.fontFamily;
    fireEvent.change(screen.getByRole("combobox", { name: "Font family" }), {
      target: { value: "plus-jakarta-sans" },
    });
    expect(preview().style.fontFamily).toContain("PyColors Preview Jakarta");
    expect(document.documentElement.style.fontFamily).toBe(outsideFont);
    expect(screen.getByRole("link", { name: "Download font" })).toHaveAttribute(
      "href",
      "/fonts/plus-jakarta-sans/latin.woff2",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Copy typography CSS" }),
    );
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(writeText.mock.calls[0][0]).toContain(
      '--font-sans: "Plus Jakarta Sans"',
    );
    expect(writeText.mock.calls[0][0]).toContain(
      'url("/fonts/plus-jakarta-sans/latin.woff2")',
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy CSS" }));
    const colorExport = serializeTheme(
      createThemeBuilderState().generatedTheme,
      "css",
    );
    if (!colorExport.ok) throw new Error("Expected default theme to serialize");
    await waitFor(() =>
      expect(writeText).toHaveBeenLastCalledWith(colorExport.value.content),
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Open full screen preview" }),
    );
    expect(preview().style.fontFamily).toContain("PyColors Preview Jakarta");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    fireEvent.change(screen.getByRole("combobox", { name: "Font family" }), {
      target: { value: "system-mono" },
    });
    expect(
      screen.queryByRole("link", { name: "Download font" }),
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Copy typography CSS" }),
    );
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(3));
    expect(writeText.mock.calls[2][0]).toContain("--font-sans: ui-monospace");
    expect(writeText.mock.calls[2][0]).not.toContain("@font-face");
    fireEvent.click(screen.getByRole("button", { name: "Reset theme" }));
    expect(screen.getByRole("combobox", { name: "Font family" })).toHaveValue(
      "mona-sans",
    );
    expect(preview().style.fontFamily).toContain("Mona Sans");
  });

  it("filters demo projects and updates the chart without changing exported tokens", async () => {
    render(<ThemeBuilder />);
    const table = () =>
      screen.getByRole("table", { name: "Northstar projects" });
    const search = screen.getByRole("textbox", {
      name: "Filter Northstar projects",
    });
    expect(within(table()).getAllByRole("row")).toHaveLength(5);
    fireEvent.change(search, { target: { value: "avery" } });
    expect(within(table()).getAllByRole("row")).toHaveLength(2);
    expect(within(table()).getByText("Orbit onboarding")).toBeVisible();
    fireEvent.change(search, { target: { value: "no match" } });
    expect(within(table()).getByText("No matching projects")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(search).toHaveValue("");
    chooseFormat("Planned 2");
    expect(within(table()).getAllByRole("row")).toHaveLength(3);
    expect(within(table()).getByText("Meridian portal")).toBeVisible();
    expect(
      within(table()).queryByText("Orbit onboarding"),
    ).not.toBeInTheDocument();

    fireEvent.change(
      screen.getByRole("combobox", { name: "Activity period" }),
      {
        target: { value: "month" },
      },
    );
    expect(
      screen.getByRole("img", {
        name: /Completed tasks: Week 1 96,.*Total 482/,
      }),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Copy CSS" }));
    const expected = serializeTheme(
      createThemeBuilderState().generatedTheme,
      "css",
    );
    if (!expected.ok) throw new Error("Expected default theme to serialize");
    await waitFor(() =>
      expect(writeText).toHaveBeenLastCalledWith(expected.value.content),
    );
  });

  it("preserves the theme and dashboard controls across full screen and restores focus", async () => {
    render(<ThemeBuilder />);
    fireEvent.click(screen.getByRole("button", { name: "Emerald Console" }));
    const primary = preview().style.getPropertyValue("--primary");
    chooseFormat("Planned 2");
    fireEvent.change(
      screen.getByRole("textbox", { name: "Filter Northstar projects" }),
      {
        target: { value: "meridian" },
      },
    );
    const trigger = screen.getByRole("button", {
      name: "Open full screen preview",
    });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Theme preview" });
    expect(dialog).toHaveAccessibleDescription(
      "Your colors and typography · Live preview",
    );
    expect(
      within(dialog)
        .getByRole("region", { name: "Dashboard" })
        .style.getPropertyValue("--primary"),
    ).toBe(primary);
    expect(
      within(dialog).getByRole("textbox", {
        name: "Filter Northstar projects",
      }),
    ).toHaveValue("meridian");
    expect(
      within(dialog).getByRole("tab", { name: "Planned 2" }),
    ).toHaveAttribute("aria-selected", "true");
    fireEvent.click(within(dialog).getByRole("radio", { name: "Dark" }));
    fireEvent.change(
      within(dialog).getByRole("combobox", { name: "Activity period" }),
      {
        target: { value: "month" },
      },
    );
    fireEvent.keyDown(document.activeElement ?? dialog, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(preview()).toHaveAttribute("data-theme-builder-preview", "dark");
    expect(
      screen.getByRole("textbox", { name: "Filter Northstar projects" }),
    ).toHaveValue("meridian");
    expect(
      screen.getByRole("combobox", { name: "Activity period" }),
    ).toHaveValue("month");
    fireEvent.click(trigger);
    expect(screen.getByRole("img", { name: /Total 482/ })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });
});
