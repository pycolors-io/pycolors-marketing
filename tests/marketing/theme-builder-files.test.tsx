import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { serializeTheme } from "@pycolors/color-engine";
import { ThemeBuilder } from "@/components/theme-builder/theme-builder";
import {
  createThemeBuilderState,
  updateThemeBuilderField,
} from "@/components/theme-builder/theme-builder-state";
import {
  createThemeConfigurationFile,
  MAX_THEME_CONFIGURATION_BYTES,
} from "@/components/theme-builder/theme-configuration";
import { DEFAULT_THEME_FONT } from "@/components/theme-builder/theme-typography";
import { downloadThemeFile } from "@/components/theme-builder/theme-file";

vi.mock("fumadocs-ui/provider/base", () => ({
  useTheme: () => ({ resolvedTheme: "dark" }),
}));
vi.mock("@/components/theme-builder/theme-code-highlighter", () => ({
  HighlightedThemeCode: ({ content }: { content: string }) => (
    <code>{content}</code>
  ),
}));
vi.mock("@/components/theme-builder/theme-file", () => ({
  downloadThemeFile: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(downloadThemeFile).mockReset();
});
function configuration() {
  return within(screen.getByRole("group", { name: "Theme configuration" }));
}
function chooseFormat(name: string) {
  fireEvent.mouseDown(screen.getByRole("tab", { name }), {
    button: 0,
    ctrlKey: false,
  });
}
function upload(content: string, read = vi.fn().mockResolvedValue(content)) {
  const file = new File([content], "saved.pycolors-theme.json", {
    type: "application/json",
  });
  Object.defineProperty(file, "text", { value: read });
  fireEvent.change(screen.getByLabelText("Open theme configuration file"), {
    target: { files: [file] },
  });
  return read;
}

describe("Theme Builder files", () => {
  it("downloads each exact serializer artifact and a separate typography stylesheet", () => {
    render(<ThemeBuilder />);
    for (const [label, format, fileName, mediaType] of [
      ["CSS", "css", "pycolors-theme.css", "text/css"],
      ["Tailwind v4", "tailwind-v4", "pycolors-theme.tailwind.css", "text/css"],
      ["JSON", "json", "pycolors-theme.tokens.json", "application/json"],
    ] as const) {
      chooseFormat(label);
      fireEvent.click(
        screen.getByRole("button", { name: `Download ${label}` }),
      );
      const serialized = serializeTheme(
        createThemeBuilderState().generatedTheme,
        format,
      );
      if (!serialized.ok) throw new Error("Expected export");
      expect(downloadThemeFile).toHaveBeenLastCalledWith({
        content: serialized.value.content,
        fileName,
        mediaType,
      });
    }
    fireEvent.change(screen.getByRole("combobox", { name: "Font family" }), {
      target: { value: "system-mono" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: "Download typography CSS" }),
    );
    expect(downloadThemeFile).toHaveBeenLastCalledWith(
      expect.objectContaining({
        fileName: "pycolors-theme.typography.css",
        mediaType: "text/css",
        content: expect.stringContaining("--font-sans: ui-monospace"),
      }),
    );
  });

  it("saves and reopens a theme after a fresh editor mount", async () => {
    const first = render(<ThemeBuilder />);
    fireEvent.click(screen.getByRole("button", { name: "Indigo Ledger" }));
    fireEvent.change(screen.getByRole("combobox", { name: "Font family" }), {
      target: { value: "plus-jakarta-sans" },
    });
    fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    const originalPreview = screen
      .getByRole("region", { name: "Dashboard" })
      .getAttribute("style");
    fireEvent.click(screen.getByRole("button", { name: "Save configuration" }));
    const saved = vi.mocked(downloadThemeFile).mock.calls[0]![0];
    expect(saved.fileName).toBe("indigo-ledger.pycolors-theme.json");
    first.unmount();
    render(<ThemeBuilder />);
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      "PyColors Theme",
    );
    upload(saved.content);
    await screen.findByText(
      "Configuration opened. Colors, font, and preview mode restored.",
    );
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      "Indigo Ledger",
    );
    expect(screen.getByRole("textbox", { name: /^Brand color/ })).toHaveValue(
      "#4f46e5",
    );
    expect(screen.getByRole("textbox", { name: "Neutral color" })).toHaveValue(
      "#64748b",
    );
    expect(screen.getByRole("combobox", { name: "Font family" })).toHaveValue(
      "plus-jakarta-sans",
    );
    expect(
      screen.getByRole("region", { name: "Dashboard" }).getAttribute("style"),
    ).toBe(originalPreview);
    fireEvent.click(screen.getByRole("button", { name: "Save configuration" }));
    expect(downloadThemeFile).toHaveBeenLastCalledWith(saved);
  });

  it("keeps last-valid downloads while preventing an incomplete configuration save", () => {
    render(<ThemeBuilder />);
    fireEvent.click(screen.getByRole("button", { name: "Download CSS" }));
    const valid = vi.mocked(downloadThemeFile).mock.calls[0]![0];
    fireEvent.change(screen.getByRole("textbox", { name: /^Brand color/ }), {
      target: { value: "#12" },
    });
    expect(
      screen.getByRole("button", { name: "Save configuration" }),
    ).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Download CSS" }));
    expect(downloadThemeFile).toHaveBeenLastCalledWith(valid);
  });

  it("rejects invalid and oversized files without changing the current theme", async () => {
    render(<ThemeBuilder />);
    fireEvent.click(screen.getByRole("button", { name: "Rose Atelier" }));
    const original = screen
      .getByRole("region", { name: "Dashboard" })
      .getAttribute("style");
    upload("{broken");
    await configuration().findByRole("alert");
    expect(
      screen.getByRole("region", { name: "Dashboard" }).getAttribute("style"),
    ).toBe(original);
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      "Rose Atelier",
    );
    const read = upload("x".repeat(MAX_THEME_CONFIGURATION_BYTES + 1));
    expect(read).not.toHaveBeenCalled();
    expect(configuration().getByRole("alert")).toHaveTextContent("16 KB");
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      "Rose Atelier",
    );
  });

  it("handles unreadable files and download failures without losing settings", async () => {
    render(<ThemeBuilder />);
    upload("{}", vi.fn().mockRejectedValue(new Error("Unreadable")));
    await screen.findByText(
      "This file could not be read. Your theme has not changed.",
    );
    vi.mocked(downloadThemeFile).mockImplementation(() => {
      throw new Error("Unavailable");
    });
    fireEvent.click(screen.getByRole("button", { name: "Download CSS" }));
    expect(
      screen.getByText(
        "Download could not start. Use Copy or select the code instead.",
      ),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Save configuration" }));
    expect(configuration().getByRole("alert")).toHaveTextContent(
      "configuration could not be downloaded",
    );
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      "PyColors Theme",
    );
  });

  it("does not overwrite edits made while a file is being read", async () => {
    render(<ThemeBuilder />);
    const state = updateThemeBuilderField(
      createThemeBuilderState(),
      "name",
      "Saved theme",
    );
    const saved = createThemeConfigurationFile(state, DEFAULT_THEME_FONT);
    let finish: (content: string) => void = () => {};
    upload(
      saved.content,
      vi.fn().mockImplementation(
        () =>
          new Promise<string>((resolve) => {
            finish = resolve;
          }),
      ),
    );
    fireEvent.change(screen.getByRole("textbox", { name: "Theme name" }), {
      target: { value: "Newer edit" },
    });
    await act(async () => {
      finish(saved.content);
    });
    await waitFor(() =>
      expect(configuration().getByRole("alert")).toHaveTextContent(
        "settings changed",
      ),
    );
    expect(screen.getByRole("textbox", { name: "Theme name" })).toHaveValue(
      "Newer edit",
    );
  });
});
