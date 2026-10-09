import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import UiPage, { metadata } from "@/app/(site)/ui/page";
import { UiSectionNav } from "@/components/marketing/ui-section-nav";

describe("UI overview", () => {
  it("connects the live preview, setup, and customization through native links", () => {
    render(<UiPage />);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(metadata.alternates).toEqual({ canonical: "/ui" });
    expect(
      screen.getByRole("link", { name: "Start building" }),
    ).toHaveAttribute("href", "/docs/ui/installation");
    expect(
      screen.getByRole("link", { name: "Try the components" }),
    ).toHaveAttribute(
      "href",
      `#${screen.getByRole("region", { name: "Try PyColors UI" }).id}`,
    );
    expect(
      screen.getByRole("link", { name: "Customize colors" }),
    ).toHaveAttribute("href", "/tools/theme-builder");
    expect(screen.getByRole("link", { name: "Theming guide" })).toHaveAttribute(
      "href",
      "/docs/ui/theming",
    );
    expect(
      screen.getByRole("link", { name: "Open UI Explorer" }),
    ).toHaveAttribute("href", "https://ui.pycolors.io");
    const npm = screen.getByRole("link", { name: "View @pycolors/ui on npm" });
    expect(npm).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/@pycolors/ui",
    );
    expect(within(npm).getAllByRole("img")).toHaveLength(3);
    expect(
      screen.getByText("Versioned · documented · tested · actively maintained"),
    ).toBeVisible();
  });

  it("links every catalog item to an existing component documentation page", () => {
    render(<UiPage />);
    const catalog = within(
      screen.getByRole("region", {
        name: "Small pieces. A consistent product.",
      }),
    );
    expect(catalog.getAllByRole("heading", { level: 3 })).toHaveLength(6);
    for (const link of catalog.getAllByRole("link")) {
      const href = link.getAttribute("href");
      expect(href).toMatch(/^\/docs\/ui(?:\/[a-z-]+)?$/);
      const slug = href === "/docs/ui" ? "index" : href?.split("/").at(-1);
      expect(
        existsSync(resolve("content/docs/ui", `${slug}.mdx`)),
        href ?? "",
      ).toBe(true);
    }
  });

  it("keeps demo controls when switching modes without changing the page theme", () => {
    render(<UiPage />);
    const rootClass = document.documentElement.className;
    const rootStyle = document.documentElement.style.cssText;
    const preview = screen.getByRole("region", { name: "Your theme in use" });
    const lightStyle = preview.style.cssText;
    const name = screen.getByRole("textbox", {
      name: /^Workspace display name/,
    });
    fireEvent.change(name, { target: { value: "Aurora Studio" } });
    fireEvent.click(screen.getByRole("checkbox", { name: /Weekly summary/ }));
    fireEvent.click(screen.getByRole("button", { name: "Save demo settings" }));
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Activity" }), {
      button: 0,
      ctrlKey: false,
    });
    for (const mode of ["Dark", "Light"]) {
      fireEvent.click(screen.getByRole("radio", { name: mode }));
      expect(preview).toHaveAttribute(
        "data-theme-builder-components",
        mode.toLowerCase(),
      );
      expect(name).toHaveValue("Aurora Studio");
      expect(screen.getByRole("tab", { name: "Activity" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByText("Design review completed")).toBeVisible();
      expect(
        screen.getByRole("checkbox", { name: /Weekly summary/ }),
      ).toBeChecked();
      expect(
        screen.getByText("Demo settings saved in this preview."),
      ).toBeVisible();
      expect(document.documentElement.className).toBe(rootClass);
      expect(document.documentElement.style.cssText).toBe(rootStyle);
      if (mode === "Dark") expect(preview.style.cssText).not.toBe(lightStyle);
      else expect(preview.style.cssText).toBe(lightStyle);
    }
  });

  it("passes structural accessibility checks with the real component demo", async () => {
    const { container } = render(<UiPage />);
    expect(
      await axe(container, {
        rules: { "color-contrast": { enabled: false } },
      }),
    ).toHaveNoViolations();
  });

  it("highlights the TSX example and copies the complete component with its line breaks", async () => {
    const original = Object.getOwnPropertyDescriptor(navigator, "clipboard");
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      render(<UiPage />);
      const source =
        'import { Button } from "@pycolors/ui";\n\nexport function SaveButton() {\n  return <Button>Save changes</Button>;\n}';
      await waitFor(() =>
        expect(
          screen
            .getByRole("region", { name: "Button usage example" })
            .querySelector("code")?.textContent,
        ).toBe(source),
      );
      const example = screen.getByRole("region", {
        name: "Button usage example",
      });
      expect(example.querySelectorAll("span[style]").length).toBeGreaterThan(3);
      const copy = screen.getByRole("button", { name: "Copy Text" });
      expect(copy.querySelector("svg")).not.toBeNull();
      fireEvent.click(copy);
      await waitFor(() => expect(writeText).toHaveBeenCalledWith(source));
      expect(screen.getByRole("button", { name: "Copied Text" })).toBeVisible();
    } finally {
      if (original) Object.defineProperty(navigator, "clipboard", original);
      else Reflect.deleteProperty(navigator, "clipboard");
    }
  });
});

describe("UI discovery navigation", () => {
  it.each([
    ["overview", "/ui"],
    ["themes", "/tools/theme-builder"],
    ["patterns", "/ui/patterns"],
    ["examples", "/ui/examples"],
    ["blocks", "/blocks"],
  ] as const)("identifies only the current %s page", (active, href) => {
    render(<UiSectionNav active={active} />);
    const links = within(
      screen.getByRole("navigation", {
        name: "PyColors UI navigation",
      }),
    ).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/ui",
      "/blocks",
      "/tools/theme-builder",
      "/ui/patterns",
      "/ui/examples",
      active === "blocks" ? "/docs/blocks" : "/docs/ui",
    ]);
    const current = links.filter(
      (link) => link.getAttribute("aria-current") === "page",
    );
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("href", href);
  });
});
