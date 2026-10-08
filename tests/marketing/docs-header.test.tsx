import * as React from "react";
import Link from "next/link";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import { FrameworkProvider } from "fumadocs-core/framework";
import {
  SidebarDrawerContent,
  SidebarProvider,
} from "fumadocs-ui/components/sidebar/base";

import { DocsHeader } from "@/components/docs-header";
import { SITE_PALETTE_STORAGE_KEY } from "@/lib/site-palette";
import {
  PRODUCT_MENU_GROUPS,
  PRODUCT_MENU_SECONDARY_ITEMS,
  RESOURCE_MENU_ITEMS,
} from "@/lib/layout.shared";

const route = vi.hoisted(() => ({ pathname: "/docs" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("next/link", () => ({
  default: (props: React.ComponentProps<"a">) => <a {...props} />,
}));
vi.mock("@/components/wordmark-font", () => ({
  wordmarkFont: { className: "wordmark-font" },
}));
vi.mock("fumadocs-ui/layouts/shared/slots/search-trigger", () => ({
  FullSearchTrigger: (props: React.ComponentProps<"button">) => (
    <button type="button" {...props}>
      Search documentation
    </button>
  ),
  SearchTrigger: (props: React.ComponentProps<"button">) => (
    <button type="button" {...props}>
      Search documentation
    </button>
  ),
}));
const appearance = vi.hoisted(() => ({ theme: "system", setTheme: vi.fn() }));
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => appearance }));

let viewportWidth = 1440;
const listeners = new Set<() => void>();
function resize(width: number) {
  act(() => {
    viewportWidth = width;
    for (const listener of listeners) listener();
  });
}
function Fixture() {
  return (
    <FrameworkProvider
      usePathname={() => route.pathname}
      useParams={() => ({})}
      useRouter={() => ({ push: vi.fn(), refresh: vi.fn() })}
    >
      <SidebarProvider>
        <div
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a"))
              event.preventDefault();
          }}
        >
          <DocsHeader />
          <SidebarDrawerContent>
            <nav aria-label="Documentation articles">
              <Link href="/docs/ui/button">Button article</Link>
            </nav>
          </SidebarDrawerContent>
          <main id="content">
            <h1>Documentation page</h1>
            <a href="/outside">Outside link</a>
          </main>
        </div>
      </SidebarProvider>
    </FrameworkProvider>
  );
}
function trigger(name = "Products") {
  return screen.getByRole("button", { name });
}
function panel(name = "Products") {
  return document.getElementById(trigger(name).getAttribute("aria-controls")!)!;
}
function openDesktop(name = "Products") {
  fireEvent.click(trigger(name));
  return within(panel(name));
}
function openMobile() {
  resize(390);
  const button = trigger("Open navigation menu");
  fireEvent.click(button);
  return {
    button,
    dialog: screen.getByRole("dialog", { name: "Explore PyColors" }),
  };
}

beforeEach(() => {
  document.documentElement.dataset.sitePalette = "pycolors";
  window.localStorage.clear();
  appearance.setTheme.mockClear();
  route.pathname = "/docs";
  viewportWidth = 1440;
  listeners.clear();
  vi.stubGlobal("matchMedia", (query: string): MediaQueryList => ({
    media: query,
    get matches() {
      if (query.includes("width < 768px")) return viewportWidth < 768;
      if (query.includes("min-width: 64rem")) return viewportWidth >= 1024;
      return query.includes("hover: hover");
    },
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener(
      _event: string,
      listener: EventListenerOrEventListenerObject | null,
    ) {
      if (typeof listener === "function") listeners.add(listener as () => void);
    },
    removeEventListener(
      _event: string,
      listener: EventListenerOrEventListenerObject | null,
    ) {
      if (typeof listener === "function")
        listeners.delete(listener as () => void);
    },
    dispatchEvent: () => true,
  }));
});
afterEach(async () => {
  cleanup();
  vi.useRealTimers();
  document.documentElement.removeAttribute("data-site-palette");
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  vi.unstubAllGlobals();
  document.body.style.overflow = "";
});

describe("Shared navigation in documentation", () => {
  it("keeps the Docs identity, global navigation and dedicated search", () => {
    render(<Fixture />);
    const logo = screen.getByRole("link", { name: "PyColors Docs" });
    expect(logo).toHaveAttribute("href", "/docs");
    expect(logo).toHaveTextContent(/pycolors\s*Docs/);
    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(
      [...primary.children].map(
        (item) => item.querySelector("button")?.textContent ?? item.textContent,
      ),
    ).toEqual(["Products", "Docs", "Resources", "Pricing"]);
    expect(within(primary).getByRole("link", { name: "Docs" })).toHaveAttribute(
      "href",
      "/docs",
    );
    expect(
      within(primary).getByRole("link", { name: "Pricing" }),
    ).toHaveAttribute("href", "/pricing");
    expect(
      screen.queryByRole("button", { name: "Docs" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "Search documentation" }),
    ).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Explore Pro" })).toHaveAttribute(
      "href",
      "/starters/pro",
    );
  });

  it("uses the same product and resource destinations as marketing", () => {
    render(<Fixture />);
    const products = openDesktop();
    expect(
      products.getAllByRole("link").map((link) => link.getAttribute("href")),
    ).toEqual([
      ...PRODUCT_MENU_GROUPS.flatMap((group) =>
        group.items.map((item) => item.href),
      ),
      ...PRODUCT_MENU_SECONDARY_ITEMS.map((item) => item.href),
    ]);
    expect(
      products.queryByRole("link", { name: "Button article" }),
    ).not.toBeInTheDocument();
    const resources = openDesktop("Resources");
    expect(panel()).not.toBeVisible();
    expect(
      resources.getAllByRole("link").map((link) => link.getAttribute("href")),
    ).toEqual([
      ...RESOURCE_MENU_ITEMS.map((item) => item.href),
      "https://github.com/pycolors",
    ]);
  });

  it.each(["/docs", "/docs/ui/button", "/docs/starter-pro/billing"])(
    "highlights only Docs in the global navigation at %s",
    (pathname) => {
      route.pathname = pathname;
      render(<Fixture />);
      const primary = within(
        screen.getByRole("navigation", { name: "Primary" }),
      );
      expect(primary.getAllByRole("link", { current: "page" })).toHaveLength(1);
      expect(primary.getByRole("link", { current: "page" })).toHaveAttribute(
        "href",
        "/docs",
      );
      expect(trigger()).not.toHaveClass("bg-surface-muted/60");
      expect(trigger("Resources")).not.toHaveClass("bg-surface-muted/60");
    },
  );

  it.each(["Products", "Resources"])(
    "keeps hover and Escape working for %s",
    (name) => {
      vi.useFakeTimers();
      render(<Fixture />);
      const outside = screen.getByRole("link", { name: "Outside link" });
      act(() => outside.focus());
      fireEvent.pointerEnter(trigger(name), { pointerType: "mouse" });
      act(() => vi.advanceTimersByTime(150));
      expect(panel(name)).toBeVisible();
      expect(outside).toHaveFocus();
      fireEvent.pointerLeave(trigger(name), { pointerType: "mouse" });
      act(() => vi.advanceTimersByTime(100));
      fireEvent.pointerEnter(panel(name), { pointerType: "mouse" });
      act(() => vi.advanceTimersByTime(250));
      expect(panel(name)).toBeVisible();
      fireEvent.keyDown(outside, { key: "Escape" });
      expect(panel(name)).not.toBeVisible();
      expect(outside).toHaveFocus();
    },
  );

  it("keeps the shared palette available and preserves native navigation", () => {
    render(<Fixture />);
    const products = openDesktop();
    const palette = within(
      products.getByRole("group", { name: "Site palette" }),
    );
    fireEvent.click(palette.getByRole("button", { name: "Monochrome" }));
    expect(window.localStorage.getItem(SITE_PALETTE_STORAGE_KEY)).toBe(
      "monochrome",
    );
    expect(panel()).toBeVisible();
    expect(appearance.setTheme).not.toHaveBeenCalled();
    const link = products.getByRole("link", { name: /^UI Library/ });
    fireEvent.click(link, { ctrlKey: true });
    expect(panel()).toBeVisible();
    fireEvent.click(link);
    expect(panel()).not.toBeVisible();
  });

  it("exposes the same global mobile menu while articles stay in the sidebar", async () => {
    render(<Fixture />);
    const { button, dialog } = openMobile();
    const nav = within(dialog);
    for (const href of [
      "/ui",
      "/blocks",
      "/starters/free",
      "/starters/pro",
      "/templates/na-ai-landing",
      "/tools/theme-builder",
      "/docs",
      "/pricing",
      "/guides",
      "/blog",
    ]) {
      expect(dialog.querySelector(`a[href="${href}"]`)).not.toBeNull();
    }
    expect(
      nav.queryByRole("link", { name: "Button article" }),
    ).not.toBeInTheDocument();
    expect(nav.getByRole("link", { name: "Docs" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    const settings = within(nav.getByRole("region", { name: "Appearance" }));
    fireEvent.click(settings.getByRole("button", { name: "Dark theme" }));
    expect(appearance.setTheme).toHaveBeenCalledWith("dark");
    fireEvent.click(nav.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(button).toHaveFocus());
    expect(getComputedStyle(document.body).overflow).not.toBe("hidden");
  });

  it("opens the real article sidebar separately and closes it with Escape", () => {
    viewportWidth = 390;
    render(<Fixture />);
    const browse = trigger("Browse documentation");
    expect(browse).toHaveAttribute("aria-controls", "nd-sidebar-mobile");
    expect(browse).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(browse);
    expect(browse).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("nd-sidebar-mobile")).toHaveAttribute(
      "data-state",
      "open",
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const article = screen.getByRole("link", { name: "Button article" });
    act(() => article.focus());
    fireEvent.keyDown(article, { key: "Escape" });
    expect(browse).toHaveAttribute("aria-expanded", "false");
    expect(browse).toHaveFocus();
  });

  it("closes the article sidebar before opening global navigation and on route changes", () => {
    viewportWidth = 390;
    const { rerender } = render(<Fixture />);
    const browse = trigger("Browse documentation");
    fireEvent.click(browse);
    openMobile();
    expect(browse).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("dialog")).toBeVisible();
    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: "Close" }),
    );
    fireEvent.click(browse);
    route.pathname = "/docs/ui/button";
    rerender(<Fixture />);
    expect(browse).toHaveAttribute("aria-expanded", "false");
  });

  it("uses the same desktop breakpoint and restores focus when layouts change", async () => {
    render(<Fixture />);
    const link = openDesktop().getByRole("link", { name: /^UI Library/ });
    act(() => link.focus());
    resize(1023);
    expect(panel()).not.toBeVisible();
    expect(trigger("Open navigation menu")).toHaveFocus();
    openMobile();
    resize(1024);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger()).toHaveFocus());
  });

  it("passes axe with global panels, mobile navigation and article navigation", async () => {
    const { container } = render(<Fixture />);
    expect((await axe(container)).violations).toEqual([]);
    openDesktop();
    expect((await axe(container)).violations).toEqual([]);
    fireEvent.keyDown(trigger(), { key: "Escape" });
    openDesktop("Resources");
    expect((await axe(container)).violations).toEqual([]);
    openMobile();
    expect((await axe(document.body)).violations).toEqual([]);
  });
});
