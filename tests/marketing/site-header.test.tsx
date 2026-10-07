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

import { SiteHeader } from "@/components/layout/site-header";
import { SITE_PALETTE_STORAGE_KEY } from "@/lib/site-palette";
import {
  PRODUCT_MENU_GROUPS,
  PRODUCT_MENU_SECONDARY_ITEMS,
  PRIMARY_NAV_ITEMS,
  RESOURCE_NAV_ITEMS,
  baseOptions,
  layoutLinks,
} from "@/lib/layout.shared";
import {
  PRODUCT_DISPLAY,
  STARTER_FREE_PRICE_LABEL,
} from "@/lib/products/public-catalog";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("next/link", () => ({
  default: (props: React.ComponentProps<"a">) => <a {...props} />,
}));
vi.mock("@/components/logo", () => ({
  Logo: () => <Link href="/">PyColors</Link>,
}));
const appearance = vi.hoisted(() => ({ theme: "system", setTheme: vi.fn() }));
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => appearance }));

let onBreakpointChange: (() => void) | undefined;
const media = {
  matches: true,
  addEventListener: vi.fn((_event: string, handler: () => void) => {
    onBreakpointChange = handler;
  }),
  removeEventListener: vi.fn(),
};

function Fixture({
  docsLinks,
}: {
  docsLinks?: { label: string; href: string }[];
}) {
  // Stop jsdom's unsupported document navigation after the real link handler.
  return (
    <div
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) event.preventDefault();
      }}
    >
      <SiteHeader docsLinks={docsLinks} />
      <main id="content">
        <h1>Example page</h1>
        <a href="/outside">Outside navigation</a>
      </main>
    </div>
  );
}
function trigger() {
  return screen.getByRole("button", { name: "Products" });
}
function panel() {
  return document.getElementById(trigger().getAttribute("aria-controls")!)!;
}
function openProducts() {
  fireEvent.click(trigger());
  return within(panel());
}
function resize(desktop: boolean) {
  act(() => {
    media.matches = desktop;
    onBreakpointChange?.();
  });
}

beforeEach(() => {
  document.documentElement.dataset.sitePalette = "pycolors";
  window.localStorage.clear();
  appearance.setTheme.mockClear();
  route.pathname = "/";
  media.matches = true;
  media.addEventListener.mockClear();
  media.removeEventListener.mockClear();
  onBreakpointChange = undefined;
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => media),
  );
});
afterEach(async () => {
  cleanup();
  document.documentElement.removeAttribute("data-site-palette");
  // Radix restores focus on the next task after the modal unmounts.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  vi.unstubAllGlobals();
  document.body.style.overflow = "";
});

describe("Marketing product discovery navigation", () => {
  it("keeps the canonical six products, task groups and all secondary destinations", () => {
    render(<Fixture />);
    const products = openProducts();
    expect(PRODUCT_MENU_GROUPS.map((group) => group.title)).toEqual([
      "Build your interface",
      "Start your application",
      "Design and launch",
    ]);
    const items = PRODUCT_MENU_GROUPS.flatMap((group) => group.items);
    expect(items.map((item) => item.href)).toEqual([
      "/ui",
      "/blocks",
      "/starters/free",
      "/starters/pro",
      "/tools/theme-builder",
      "/templates/na-ai-landing",
    ]);
    for (const item of [...items, ...PRODUCT_MENU_SECONDARY_ITEMS]) {
      expect(
        products.getByRole("link", {
          name: new RegExp(item.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
        }),
      ).toHaveAttribute("href", item.href);
    }
    for (const group of PRODUCT_MENU_GROUPS)
      expect(products.getByRole("list", { name: group.title })).toBeVisible();
    expect(items.find((item) => item.href === "/starters/pro")).toMatchObject({
      label: PRODUCT_DISPLAY["starter-pro"].name,
      badge: PRODUCT_DISPLAY["starter-pro"].priceLabel,
    });
    expect(
      items.find((item) => item.href === "/templates/na-ai-landing"),
    ).toMatchObject({
      label: PRODUCT_DISPLAY["na-ai-landing"].name,
      badge: PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
    });
    expect(items.find((item) => item.href === "/starters/free")?.badge).toBe(
      STARTER_FREE_PRICE_LABEL,
    );
    expect(products.queryByRole("menu")).not.toBeInTheDocument();
    expect(products.queryByRole("menuitem")).not.toBeInTheDocument();
    expect(trigger()).not.toHaveAttribute("aria-haspopup");
    for (const item of PRIMARY_NAV_ITEMS)
      expect(
        within(screen.getByRole("navigation", { name: "Primary" }))
          .getAllByRole("link")
          .some((a) => a.getAttribute("href") === item.href),
      ).toBe(true);
  });

  it("starts hidden, does not open on focus, and toggles on the first click", () => {
    render(<Fixture />);
    act(() => trigger().focus());
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(panel()).not.toBeVisible();
    expect(
      screen.queryByRole("link", { name: /React primitives/ }),
    ).not.toBeInTheDocument();
    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(panel()).toBeVisible();
    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(panel()).not.toBeVisible();
  });

  it("changes the shared palette without closing Products and preserves the preference on reopen", () => {
    render(<Fixture />);
    const products = openProducts();
    const palette = within(
      products.getByRole("group", { name: "Site palette" }),
    );
    const monochrome = palette.getByRole("button", { name: "Monochrome" });
    expect(palette.getByRole("button", { name: "PyColors" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    act(() => monochrome.focus());
    fireEvent.click(monochrome);
    expect(document.documentElement.dataset.sitePalette).toBe("monochrome");
    expect(window.localStorage.getItem(SITE_PALETTE_STORAGE_KEY)).toBe(
      "monochrome",
    );
    expect(monochrome).toHaveAttribute("aria-pressed", "true");
    expect(panel()).toBeVisible();
    expect(appearance.setTheme).not.toHaveBeenCalled();
    fireEvent.keyDown(monochrome, { key: "Escape" });
    expect(panel()).not.toBeVisible();
    expect(trigger()).toHaveFocus();
    openProducts();
    expect(monochrome).toHaveAttribute("aria-pressed", "true");
  });

  it("closes on Escape and restores focus to the disclosure trigger", () => {
    render(<Fixture />);
    const products = openProducts();
    const link = products.getByRole("link", { name: /React primitives/ });
    act(() => link.focus());
    fireEvent.keyDown(link, { key: "Escape" });
    expect(trigger()).toHaveFocus();
    expect(panel()).not.toBeVisible();
  });

  it("keeps focus inside the panel on pointer movement and closes when focus leaves without stealing it", () => {
    render(<Fixture />);
    const link = openProducts().getByRole("link", { name: /React primitives/ });
    act(() => link.focus());
    fireEvent.mouseLeave(panel());
    expect(panel()).toBeVisible();
    expect(link).toHaveFocus();
    const outside = screen.getByRole("link", { name: "Outside navigation" });
    act(() => outside.focus());
    expect(panel()).not.toBeVisible();
    expect(outside).toHaveFocus();
  });

  it("closes on outside pointer interaction and releases the document listener", () => {
    const remove = vi.spyOn(document, "removeEventListener");
    render(<Fixture />);
    openProducts();
    fireEvent.pointerDown(screen.getByRole("heading", { level: 1 }));
    expect(panel()).not.toBeVisible();
    expect(remove.mock.calls.some(([name]) => name === "pointerdown")).toBe(
      true,
    );
    remove.mockRestore();
  });

  it.each(["/starters/pro", "/ui/examples", "/templates/na-ai-landing"])(
    "keeps only the most-specific product destination current at %s",
    (path) => {
      route.pathname = `${path}/details`;
      render(<Fixture />);
      expect(trigger()).toHaveClass("bg-surface-muted", "text-foreground");
      openProducts();
      const current = panel().querySelectorAll('[aria-current="page"]');
      expect(current).toHaveLength(1);
      expect(current[0]).toHaveAttribute("href", path);
    },
  );

  it.each([
    { path: "/pricing", label: "Pricing" },
    { path: "/pricing/details", label: "Pricing" },
    { path: "/tools/theme-builder", label: "Theme Builder" },
    { path: "/tools/theme-builder/details", label: "Theme Builder" },
  ])("highlights only the primary destination at $path", ({ path, label }) => {
    route.pathname = path;
    render(<Fixture />);
    const primary = within(screen.getByRole("navigation", { name: "Primary" }));
    const current = primary.getByRole("link", { name: label });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveClass("bg-surface-muted", "text-foreground");
    expect(trigger()).not.toHaveClass("bg-surface-muted");
    expect(trigger()).not.toHaveClass("text-foreground");

    openProducts();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(trigger()).toHaveClass("bg-surface-muted", "text-foreground");
    fireEvent.keyDown(trigger(), { key: "Escape" });
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).not.toHaveClass("bg-surface-muted");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("closes on route changes and preserves modifier-click and native anchors", () => {
    const { rerender } = render(<Fixture />);
    const link = openProducts().getByRole("link", { name: /React primitives/ });
    fireEvent.click(link, { ctrlKey: true });
    expect(panel()).toBeVisible();
    fireEvent.click(link, { metaKey: true });
    expect(panel()).toBeVisible();
    expect(link.tagName).toBe("A");
    route.pathname = "/blocks";
    rerender(<Fixture />);
    expect(panel()).not.toBeVisible();
    openProducts();
    fireEvent.click(
      within(panel()).getByRole("link", { name: /React primitives/ }),
    );
    expect(panel()).not.toBeVisible();
  });

  it("opens a modal with the same products, resources and supplied docs links, then restores focus", async () => {
    media.matches = false;
    render(
      <Fixture
        docsLinks={[{ label: "Install UI", href: "/docs/ui/installation" }]}
      />,
    );
    const open = screen.getByRole("button", { name: "Open navigation menu" });
    act(() => open.focus());
    fireEvent.click(open);
    const dialog = await screen.findByRole("dialog", {
      name: "Explore PyColors",
    });
    const nav = within(dialog);
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const settings = within(nav.getByRole("region", { name: "Appearance" }));
    fireEvent.click(settings.getByRole("button", { name: "Monochrome" }));
    expect(document.documentElement.dataset.sitePalette).toBe("monochrome");
    expect(
      settings.getByRole("button", { name: "Monochrome" }),
    ).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(settings.getByRole("button", { name: "Dark theme" }));
    expect(appearance.setTheme).toHaveBeenCalledWith("dark");
    expect(
      settings.getByRole("button", { name: "System theme" }),
    ).toBeVisible();
    expect(dialog).toBeVisible();
    const destinations = new Set(
      nav.getAllByRole("link").map((link) => link.getAttribute("href")),
    );
    for (const item of [
      ...PRODUCT_MENU_GROUPS.flatMap((group) => group.items),
      ...PRODUCT_MENU_SECONDARY_ITEMS,
      ...RESOURCE_NAV_ITEMS,
    ])
      expect(destinations.has(item.href)).toBe(true);
    expect(nav.getByRole("link", { name: "Install UI" })).toHaveAttribute(
      "href",
      "/docs/ui/installation",
    );
    expect(nav.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(nav.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "rel",
      "noreferrer noopener",
    );
    expect(
      screen.queryByRole("link", { name: "Outside navigation" }),
    ).not.toBeInTheDocument();
    expect(getComputedStyle(document.body).overflow).toBe("hidden");
    fireEvent.keyDown(document.activeElement!, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(open).toHaveFocus());
    expect(getComputedStyle(document.body).overflow).not.toBe("hidden");
  });

  it("dismisses mobile navigation on an ordinary link or route change, while modifier-click keeps it open", async () => {
    media.matches = false;
    const { rerender } = render(<Fixture />);
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    const dialog = await screen.findByRole("dialog");
    const link = within(dialog).getByRole("link", { name: /React primitives/ });
    fireEvent.click(link, { metaKey: true });
    expect(dialog).toBeVisible();
    fireEvent.click(link);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    route.pathname = "/blocks";
    rerender(<Fixture />);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("releases the modal and restores a visible focus target when resized to desktop", async () => {
    media.matches = false;
    render(<Fixture />);
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    await screen.findByRole("dialog");
    resize(true);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger()).toHaveFocus());
    expect(getComputedStyle(document.body).overflow).not.toBe("hidden");
    const link = openProducts().getByRole("link", { name: /React primitives/ });
    act(() => link.focus());
    resize(false);
    expect(panel()).not.toBeVisible();
    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveFocus();
  });

  it("cleans scroll locks and listeners on unmount and keeps disclosure IDs unique", async () => {
    media.matches = false;
    document.body.style.overflow = "scroll";
    const { unmount } = render(<Fixture />);
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    await screen.findByRole("dialog");
    unmount();
    await waitFor(() =>
      expect(getComputedStyle(document.body).overflow).toBe("scroll"),
    );
    expect(media.removeEventListener).toHaveBeenCalledWith(
      "change",
      onBreakpointChange,
    );
    render(
      <>
        <SiteHeader />
        <SiteHeader />
      </>,
    );
    const ids = Array.from(
      document.querySelectorAll("[id]"),
      (element) => element.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("preserves the documentation layout contract", () => {
    expect(baseOptions()).toMatchObject({
      nav: { enabled: false, transparentMode: "none" },
      searchToggle: { enabled: false },
      themeSwitch: { enabled: false },
    });
    expect(
      layoutLinks.map((item) => ("url" in item ? item.url : undefined)),
    ).toEqual(PRIMARY_NAV_ITEMS.map((item) => item.href));
  });

  it("has no axe violations in closed, disclosed and modal states", async () => {
    const { container } = render(<Fixture />);
    await expect(axe(container)).resolves.toHaveNoViolations();
    openProducts();
    await expect(axe(container)).resolves.toHaveNoViolations();
    fireEvent.click(trigger());
    media.matches = false;
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    const dialog = await screen.findByRole("dialog");
    await expect(axe(dialog)).resolves.toHaveNoViolations();
  });
});
