import * as React from "react";
import Link from "next/link";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { Footer } from "@/components/footer";
import { FooterAppearance } from "@/components/footer-appearance";
import { UI_VERSION, TOKENS_VERSION } from "@/lib/version";

const preference = vi.hoisted(() => ({ theme: "system", setTheme: vi.fn() }));
const navigation = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({
  useRouter: () => navigation,
}));
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => preference }));
vi.mock("@/components/logo", () => ({
  Logo: () => (
    <Link href="/" aria-label="PyColors">
      pycolors
    </Link>
  ),
}));

beforeEach(() => {
  preference.theme = "system";
  preference.setTheme.mockClear();
  navigation.push.mockClear();
  vi.stubGlobal("scrollY", 1200);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});

describe("marketing footer", () => {
  it("keeps product discovery, comparison, support and legal destinations reachable", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo", {
      name: "PyColors site footer",
    });
    for (const group of ["Products", "Resources", "Compare", "Company"]) {
      const nav = within(footer).getByRole("navigation", {
        name: `Footer ${group}`,
      });
      expect(
        within(nav).getByRole("heading", { name: group, level: 2 }),
      ).toBeVisible();
      expect(within(nav).getByRole("list")).toBeVisible();
    }
    const expected = [
      "/ui",
      "/blocks",
      "/tools/theme-builder",
      "/starters/free",
      "/starters/pro",
      "/templates",
      "/templates/na-ai-landing",
      "/docs",
      "/guides",
      "/ui/examples",
      "/ui/patterns",
      "/blog",
      "/changelog",
      "/roadmap",
      "/pricing",
      "/starters",
      "/compare/build-vs-buy",
      "/upgrade",
      "/open-source",
      "/about",
      "/contact",
      "/orders/support",
      "/orders/recover",
      "/license",
      "/terms",
      "/privacy",
    ];
    const links = within(footer).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      expect.arrayContaining(expected),
    );
    for (const href of expected.filter((href) => href !== "/docs")) {
      expect(
        existsSync(resolve("app/(site)", href.slice(1), "page.tsx")),
        href,
      ).toBe(true);
    }
    for (const link of links) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
    }
    expect(
      within(footer).getByRole("link", { name: "Explore Starter Pro" }),
    ).toHaveAttribute("href", "/starters/pro");
    expect(
      within(footer).getByRole("link", { name: "Compare products" }),
    ).toHaveAttribute("href", "/pricing");
    expect(
      within(footer).getByRole("link", { name: "Contact" }),
    ).toHaveAttribute("href", "/contact");
    const legal = within(footer).getByRole("navigation", {
      name: "Footer legal information",
    });
    expect(
      within(legal)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href")),
    ).toEqual(["/license", "/terms", "/privacy"]);
  });

  it("labels external repositories and connects version information to release history", () => {
    render(<Footer />);
    const repos = screen.getByRole("navigation", {
      name: "PyColors on GitHub",
    });
    expect(within(repos).getAllByRole("link")).toHaveLength(2);
    for (const link of within(repos).getAllByRole("link")) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveAccessibleName(/opens in a new tab/);
    }
    expect(
      screen.getByRole("link", {
        name: `Release history: UI ${UI_VERSION}, Tokens ${TOKENS_VERSION}`,
      }),
    ).toHaveAttribute("href", "/changelog");
  });

  it("changes the shared theme preference and exposes the selected option", () => {
    const { rerender } = render(<FooterAppearance />);
    const controls = screen.getByRole("group", { name: "Color theme" });
    for (const [value, label] of [
      ["light", "Light theme"],
      ["dark", "Dark theme"],
      ["system", "System theme"],
    ]) {
      const button = within(controls).getByRole("button", { name: label });
      fireEvent.click(button);
      expect(preference.setTheme).toHaveBeenLastCalledWith(value);
      preference.theme = value!;
      rerender(<FooterAppearance />);
      expect(button).toHaveAttribute("aria-pressed", "true");
      expect(
        within(controls).getAllByRole("button", { pressed: true }),
      ).toHaveLength(1);
    }
  });

  it("returns to the top when reselecting the current page, including the home logo", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<Footer />);

    for (const [path, name] of [
      ["/terms", "Terms"],
      ["/", "PyColors"],
    ]) {
      window.history.replaceState(null, "", path!);
      vi.stubGlobal("scrollY", 1200);
      const link = screen.getByRole("link", { name });
      link.addEventListener("click", (event) => event.preventDefault());
      fireEvent.click(link);
      expect(scroll).toHaveBeenLastCalledWith({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      expect(navigation.push).not.toHaveBeenCalled();
      scroll.mockClear();
    }
  });

  it("preserves modified clicks, downloads, anchors and external links", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.history.replaceState(null, "", "/terms");
    render(<Footer />);
    const link = screen.getByRole("link", { name: "Terms" });
    link.addEventListener("click", (event) => event.preventDefault());

    for (const modifier of ["metaKey", "ctrlKey", "shiftKey", "altKey"]) {
      fireEvent.click(link, { [modifier]: true });
    }
    fireEvent.click(link, { button: 1 });
    link.setAttribute("target", "_blank");
    fireEvent.click(link);
    link.removeAttribute("target");
    link.setAttribute("download", "terms.html");
    fireEvent.click(link);
    link.removeAttribute("download");
    link.setAttribute("href", "/terms#company");
    fireEvent.click(link);
    link.setAttribute("href", "https://github.com/pycolors-io");
    fireEvent.click(link);
    expect(scroll).not.toHaveBeenCalled();
    expect(navigation.push).not.toHaveBeenCalled();
  });

  it("opens the destination immediately while starting the smooth return to the top", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<Footer />);
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

  it("skips animation for reduced motion and navigates without a delay", () => {
    const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    vi.spyOn(window, "matchMedia").mockReturnValue({
      ...window.matchMedia("(prefers-reduced-motion: reduce)"),
      matches: true,
    });
    render(<Footer />);
    fireEvent.click(screen.getByRole("link", { name: "Compare products" }));
    expect(scroll).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    expect(navigation.push).toHaveBeenCalledExactlyOnceWith("/pricing", {
      scroll: false,
    });
  });

  it("renders stable controls on the server before the saved preference is known", () => {
    const html = renderToString(<FooterAppearance />);
    const container = document.createElement("div");
    container.innerHTML = html;
    const buttons = container.querySelectorAll("button");
    expect(buttons).toHaveLength(3);
    for (const button of buttons) {
      expect(button).toHaveAttribute("disabled");
      expect(button).toHaveAttribute("aria-pressed", "false");
    }
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
