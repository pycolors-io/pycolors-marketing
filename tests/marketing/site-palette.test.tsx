import * as React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { FooterAppearance } from "@/components/footer-appearance";
import { FooterPalette } from "@/components/footer-palette";
import {
  SITE_PALETTE_INIT_SCRIPT,
  SITE_PALETTE_STORAGE_KEY,
} from "@/lib/site-palette";

const theme = vi.hoisted(() => ({ theme: "system", setTheme: vi.fn() }));
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => theme }));

function initializePalette() {
  // Exercise the same static script that runs before the first browser paint.
  new Function("document", "localStorage", SITE_PALETTE_INIT_SCRIPT)(
    document,
    window.localStorage,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.dataset.sitePalette = "pycolors";
  theme.setTheme.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.removeAttribute("data-site-palette");
});

describe("site palette preference", () => {
  it("defaults to PyColors and switches palette independently of light/dark/system", () => {
    render(<FooterAppearance />);
    const palette = screen.getByRole("group", { name: "Site palette" });
    const violet = within(palette).getByRole("button", { name: "PyColors" });
    const monochrome = within(palette).getByRole("button", {
      name: "Monochrome",
    });
    expect(violet).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(monochrome);
    expect(monochrome).toHaveAttribute("aria-pressed", "true");
    expect(violet).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement).toHaveAttribute(
      "data-site-palette",
      "monochrome",
    );
    expect(window.localStorage.getItem(SITE_PALETTE_STORAGE_KEY)).toBe(
      "monochrome",
    );
    expect(theme.setTheme).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Dark theme" }));
    expect(theme.setTheme).toHaveBeenCalledWith("dark");
    expect(monochrome).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(violet);
    expect(violet).toHaveAttribute("aria-pressed", "true");
    expect(window.localStorage.getItem(SITE_PALETTE_STORAGE_KEY)).toBe(
      "pycolors",
    );
  });

  it("restores the saved palette before hydration and preserves the appearance preference", () => {
    window.localStorage.setItem(SITE_PALETTE_STORAGE_KEY, "monochrome");
    window.localStorage.setItem("theme", "system");
    initializePalette();
    expect(document.documentElement.dataset.sitePalette).toBe("monochrome");
    expect(window.localStorage.getItem("theme")).toBe("system");

    render(<FooterPalette />);
    expect(screen.getByRole("button", { name: "Monochrome" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it.each([null, "pycolors", "invalid-palette"])(
    "uses the PyColors default for stored value %s",
    (stored) => {
      if (stored !== null) {
        window.localStorage.setItem(SITE_PALETTE_STORAGE_KEY, stored);
      }
      initializePalette();
      expect(document.documentElement.dataset.sitePalette).toBe("pycolors");
    },
  );

  it("keeps controls stable during server rendering without accessing storage", () => {
    const read = vi.spyOn(Storage.prototype, "getItem");
    const html = renderToString(<FooterPalette />);
    const container = document.createElement("div");
    container.innerHTML = html;
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      expect(button).toHaveAttribute("disabled");
      expect(button).toHaveAttribute("aria-pressed", "false");
    }
    expect(read).not.toHaveBeenCalled();
  });

  it("keeps the default and allows switching when browser storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "SecurityError");
    });
    expect(initializePalette).not.toThrow();
    expect(document.documentElement.dataset.sitePalette).toBe("pycolors");
    render(<FooterPalette />);
    fireEvent.click(screen.getByRole("button", { name: "Monochrome" }));
    expect(document.documentElement.dataset.sitePalette).toBe("monochrome");
    expect(screen.getByRole("button", { name: "Monochrome" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("synchronizes other tabs, ignores unrelated preferences, and handles clearing storage", () => {
    render(<FooterPalette />);
    for (const [key, newValue, expected] of [
      [SITE_PALETTE_STORAGE_KEY, "monochrome", "monochrome"],
      ["theme", "light", "monochrome"],
      [SITE_PALETTE_STORAGE_KEY, "invalid", "pycolors"],
      [SITE_PALETTE_STORAGE_KEY, "monochrome", "monochrome"],
      [null, null, "pycolors"],
    ]) {
      act(() => {
        window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
      });
      expect(document.documentElement.dataset.sitePalette).toBe(expected);
      expect(
        screen.getByRole("button", {
          name: expected === "monochrome" ? "Monochrome" : "PyColors",
        }),
      ).toHaveAttribute("aria-pressed", "true");
    }
  });

  it("keeps multiple controls and newly mounted footers in sync", () => {
    const first = render(<FooterPalette />);
    const second = render(<FooterPalette />);
    fireEvent.click(
      within(first.container).getByRole("button", { name: "Monochrome" }),
    );
    expect(
      within(second.container).getByRole("button", { name: "Monochrome" }),
    ).toHaveAttribute("aria-pressed", "true");
    first.unmount();
    second.unmount();
    render(<FooterPalette />);
    expect(screen.getByRole("button", { name: "Monochrome" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<FooterPalette />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
