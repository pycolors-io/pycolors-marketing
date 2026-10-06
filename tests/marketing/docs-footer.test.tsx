import * as React from "react";
import Link from "next/link";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { DocsFooter } from "@/components/docs-footer";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";

const preference = vi.hoisted(() => ({ theme: "system", setTheme: vi.fn() }));
const navigation = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => preference }));
vi.mock("next/navigation", () => ({
  useRouter: () => navigation,
}));
vi.mock("@/components/logo", () => ({
  Logo: ({ variant }: { variant?: "default" | "docs" }) => (
    <Link href={variant === "docs" ? "/docs" : "/"}>
      {variant === "docs" ? "PyColors Docs" : "PyColors"}
    </Link>
  ),
}));

beforeEach(() => {
  preference.setTheme.mockClear();
  navigation.push.mockClear();
  window.history.replaceState(null, "", "/docs");
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

describe("documentation footer", () => {
  it("separates documentation from product discovery and links to existing destinations", () => {
    render(<DocsFooter />);
    const footer = screen.getByRole("contentinfo", {
      name: "PyColors Docs footer",
    });
    for (const title of ["Documentation", "Build", "Resources", "Help"]) {
      const nav = within(footer).getByRole("navigation", {
        name: `Docs footer ${title}`,
      });
      expect(
        within(nav).getByRole("heading", { name: title, level: 2 }),
      ).toBeVisible();
      expect(within(nav).getByRole("list")).toBeVisible();
    }
    expect(
      within(footer).getByRole("link", { name: "PyColors Docs" }),
    ).toHaveAttribute("href", "/docs");
    expect(
      within(footer).getByRole("link", { name: "Back to PyColors" }),
    ).toHaveAttribute("href", "/");
    expect(
      within(footer).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");
    const docs = within(footer).getByRole("navigation", {
      name: "Docs footer Documentation",
    });
    expect(
      within(docs).getByRole("link", { name: "Starter Pro" }),
    ).toHaveAttribute("href", "/docs/starter-pro");
    expect(within(docs).getByRole("link", { name: "Blocks" })).toHaveAttribute(
      "href",
      "/docs/blocks",
    );
    for (const link of within(footer).getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("button,a")).toBeNull();
      if (href === "/docs" || href.startsWith("/docs/")) {
        const path = href.slice("/docs".length);
        expect(
          existsSync(resolve(`content/docs${path}/index.mdx`)) ||
            existsSync(resolve(`content/docs${path}.mdx`)),
          href,
        ).toBe(true);
      } else if (href.startsWith("/")) {
        expect(
          existsSync(resolve("app/(site)", href.slice(1), "page.tsx")),
          href,
        ).toBe(true);
      }
    }
  });

  it("shares theme controls and animated navigation while exposing support and release information", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.stubGlobal("scrollY", 1400);
    render(<DocsFooter />);
    const themes = screen.getByRole("group", { name: "Color theme" });
    expect(within(themes).getAllByRole("button")).toHaveLength(3);
    fireEvent.click(
      within(themes).getByRole("button", { name: "Light theme" }),
    );
    expect(preference.setTheme).toHaveBeenCalledWith("light");
    expect(
      screen.getByRole("link", { name: "Purchase support" }),
    ).toHaveAttribute("href", "/orders/support");
    expect(
      screen.getByRole("link", { name: "Recover purchase" }),
    ).toHaveAttribute("href", "/orders/recover");
    expect(
      screen.getByRole("link", {
        name: `Release history: UI ${UI_VERSION}, Tokens ${TOKENS_VERSION}`,
      }),
    ).toHaveAttribute("href", "/changelog");
    const repos = screen.getByRole("navigation", {
      name: "Docs repositories on GitHub",
    });
    for (const link of within(repos).getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAccessibleName(/opens in a new tab/);
    }
    fireEvent.click(screen.getByRole("link", { name: "Contact" }));
    expect(scroll).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    expect(navigation.push).toHaveBeenCalledExactlyOnceWith("/contact", {
      scroll: false,
    });
  });

  it("returns keyboard focus to the docs article when reselecting its current page", () => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.stubGlobal("scrollY", 1400);
    window.history.replaceState(null, "", "/docs/ui");
    render(
      <>
        <article id="nd-page">UI documentation</article>
        <DocsFooter />
      </>,
    );
    const link = screen.getByRole("link", { name: "UI Library" });
    link.focus();
    fireEvent.click(link);
    expect(screen.getByRole("article")).toHaveFocus();
    expect(navigation.push).not.toHaveBeenCalled();
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<DocsFooter />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
