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
  MOBILE_BROWSE_NAV_ITEMS,
  PRODUCT_MENU_GROUPS,
  PRODUCT_MENU_SECONDARY_ITEMS,
  PRIMARY_NAV_ITEMS,
  RESOURCE_MENU_ITEMS,
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
function resourcesTrigger() {
  return screen.getByRole("button", { name: "Resources" });
}
function resourcesPanel() {
  return document.getElementById(
    resourcesTrigger().getAttribute("aria-controls")!,
  )!;
}
function openResources() {
  fireEvent.click(resourcesTrigger());
  return within(resourcesPanel());
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
  vi.useRealTimers();
  document.documentElement.removeAttribute("data-site-palette");
  // Radix restores focus on the next task after the modal unmounts.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  vi.unstubAllGlobals();
  document.body.style.overflow = "";
});

describe("Desktop navigation hover", () => {
  beforeEach(() => vi.useFakeTimers());

  function advance(ms: number) {
    act(() => vi.advanceTimersByTime(ms));
  }

  it.each(["Products", "Resources"])(
    "opens %s after intentional hover, tolerates the panel gap and closes after leaving",
    (name) => {
      render(<Fixture />);
      const button = screen.getByRole("button", { name });
      const content = document.getElementById(
        button.getAttribute("aria-controls")!,
      )!;
      const outside = screen.getByRole("link", { name: "Outside navigation" });
      act(() => outside.focus());
      fireEvent.pointerEnter(button, { pointerType: "mouse" });
      advance(100);
      expect(content).not.toBeVisible();
      advance(50);
      expect(content).toBeVisible();
      expect(outside).toHaveFocus();

      // Crossing the eight-pixel gap must not dismiss the panel.
      fireEvent.pointerLeave(button, { pointerType: "mouse" });
      advance(100);
      expect(content).toBeVisible();
      fireEvent.pointerEnter(content, { pointerType: "mouse" });
      advance(250);
      expect(content).toBeVisible();
      fireEvent.pointerLeave(content, { pointerType: "mouse" });
      advance(150);
      expect(content).toBeVisible();
      advance(50);
      expect(content).not.toBeVisible();
      expect(outside).toHaveFocus();
    },
  );

  it("ignores a quick pass over a trigger", () => {
    render(<Fixture />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    advance(75);
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    advance(300);
    expect(panel()).not.toBeVisible();
  });

  it("keeps the newly hovered menu open after the previous menu's close delay", () => {
    render(<Fixture />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    advance(150);
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    fireEvent.pointerEnter(resourcesTrigger(), { pointerType: "mouse" });
    advance(150);
    expect(panel()).not.toBeVisible();
    expect(resourcesPanel()).toBeVisible();
    advance(300);
    expect(resourcesPanel()).toBeVisible();
  });

  it.each(["touch", "pen"])(
    "uses explicit activation for %s pointers",
    (pointerType) => {
      render(<Fixture />);
      fireEvent.pointerEnter(trigger(), { pointerType });
      advance(300);
      expect(panel()).not.toBeVisible();
      fireEvent.click(trigger());
      expect(panel()).toBeVisible();
    },
  );

  it("does not use emulated mouse hover on devices without a fine hover pointer", () => {
    vi.mocked(window.matchMedia).mockImplementation((query) =>
      query.includes("hover")
        ? ({ ...media, matches: false } as unknown as MediaQueryList)
        : (media as unknown as MediaQueryList),
    );
    render(<Fixture />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    advance(300);
    expect(panel()).not.toBeVisible();
    openProducts();
    expect(panel()).toBeVisible();
  });

  it("dismisses hover with Escape without moving focus and cancels pending hover", () => {
    render(<Fixture />);
    const outside = screen.getByRole("link", { name: "Outside navigation" });
    act(() => outside.focus());
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    advance(150);
    fireEvent.keyDown(outside, { key: "Escape" });
    expect(panel()).not.toBeVisible();
    expect(outside).toHaveFocus();
    advance(300);
    expect(panel()).not.toBeVisible();
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    fireEvent.keyDown(outside, { key: "Escape" });
    advance(300);
    expect(panel()).not.toBeVisible();
  });

  it("cancels pending hover on clicks and outside interactions", () => {
    render(<Fixture />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    fireEvent.click(trigger(), { detail: 1 });
    expect(panel()).toBeVisible();
    fireEvent.click(trigger(), { detail: 1 });
    advance(300);
    expect(panel()).not.toBeVisible();
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    fireEvent.pointerDown(screen.getByRole("heading", { level: 1 }));
    advance(300);
    expect(panel()).not.toBeVisible();
  });

  it("preserves keyboard-opened menus and focused panel controls on pointer exit", () => {
    render(<Fixture />);
    act(() => trigger().focus());
    openProducts();
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    advance(300);
    expect(panel()).toBeVisible();
    const link = within(panel()).getByRole("link", {
      name: /React primitives/,
    });
    act(() => link.focus());
    fireEvent.pointerLeave(panel(), { pointerType: "mouse" });
    advance(300);
    expect(panel()).toBeVisible();
    expect(link).toHaveFocus();
    fireEvent.keyDown(link, { key: "Escape" });
    expect(panel()).not.toBeVisible();
    expect(trigger()).toHaveFocus();
  });

  it("cancels delayed opening on navigation, mobile layout and unmount", () => {
    const { rerender, unmount } = render(<Fixture />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    route.pathname = "/blog";
    rerender(<Fixture />);
    advance(300);
    expect(panel()).not.toBeVisible();
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    resize(false);
    advance(300);
    resize(true);
    expect(panel()).not.toBeVisible();
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe("Marketing product discovery navigation", () => {
  it("groups the six products by starting point and keeps two desktop shortcuts", () => {
    render(<Fixture />);
    const products = openProducts();
    expect(PRODUCT_MENU_GROUPS.map((group) => group.title)).toEqual([
      "Build your interface",
      "Launch your product",
    ]);
    const items = PRODUCT_MENU_GROUPS.flatMap((group) => group.items);
    expect(items.map((item) => item.href)).toEqual([
      "/ui",
      "/blocks",
      "/tools/theme-builder",
      "/starters/free",
      "/starters/pro",
      "/templates/na-ai-landing",
    ]);
    for (const item of [...items, ...PRODUCT_MENU_SECONDARY_ITEMS]) {
      expect(
        products.getByRole("link", {
          name: new RegExp(item.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
        }),
      ).toHaveAttribute("href", item.href);
    }
    for (const group of PRODUCT_MENU_GROUPS) {
      const links = within(
        products.getByRole("list", { name: group.title }),
      ).getAllByRole("link");
      expect(links.map((link) => link.getAttribute("href"))).toEqual(
        group.items.map((item) => item.href),
      );
      expect(links).toHaveLength(3);
    }
    expect(products.getAllByRole("link")).toHaveLength(8);
    expect(
      products.queryByRole("link", { name: "Pricing" }),
    ).not.toBeInTheDocument();
    expect(
      products.queryByRole("link", { name: "UI examples" }),
    ).not.toBeInTheDocument();
    expect(items.find((item) => item.href === "/starters/pro")).toMatchObject({
      label: "Starter Pro",
      badge: PRODUCT_DISPLAY["starter-pro"].priceLabel,
    });
    expect(
      items.find((item) => item.href === "/templates/na-ai-landing"),
    ).toMatchObject({
      label: "NA-AI Landing",
      badge: PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
    });
    expect(items.find((item) => item.href === "/starters/free")?.badge).toBe(
      STARTER_FREE_PRICE_LABEL,
    );
    expect(products.queryByRole("menu")).not.toBeInTheDocument();
    expect(products.queryByRole("menuitem")).not.toBeInTheDocument();
    expect(trigger()).not.toHaveAttribute("aria-haspopup");
    const primary = within(screen.getByRole("navigation", { name: "Primary" }));
    expect(PRIMARY_NAV_ITEMS.map((item) => item.label)).toEqual([
      "Products",
      "Docs",
      "Resources",
      "Pricing",
    ]);
    for (const item of PRIMARY_NAV_ITEMS) {
      if ("href" in item) {
        expect(
          primary
            .getAllByRole("link", { name: item.label })
            .every((link) => link.getAttribute("href") === item.href),
        ).toBe(true);
      } else {
        expect(primary.getByRole("button", { name: item.label })).toBeVisible();
      }
    }
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

  it.each([
    ["/starters/pro", "/starters/pro"],
    ["/ui/examples", "/ui"],
    ["/templates/na-ai-landing", "/templates/na-ai-landing"],
    ["/tools/theme-builder", "/tools/theme-builder"],
  ])(
    "keeps only the most-specific product destination current at %s",
    (path, destination) => {
      route.pathname = `${path}/details`;
      render(<Fixture />);
      expect(trigger()).toHaveClass("bg-surface-muted/60", "text-foreground");
      openProducts();
      const current = panel().querySelectorAll('[aria-current="page"]');
      expect(current).toHaveLength(1);
      expect(current[0]).toHaveAttribute("href", destination);
    },
  );

  it.each([
    { path: "/pricing", label: "Pricing" },
    { path: "/pricing/details", label: "Pricing" },
    { path: "/docs", label: "Docs" },
    { path: "/docs/ui/button", label: "Docs" },
  ])("highlights only the primary destination at $path", ({ path, label }) => {
    route.pathname = path;
    render(<Fixture />);
    const primary = within(screen.getByRole("navigation", { name: "Primary" }));
    const current = primary.getByRole("link", { name: label });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveClass("bg-surface-muted/60", "text-foreground");
    expect(trigger()).not.toHaveClass("bg-surface-muted/60");
    expect(trigger()).not.toHaveClass("text-foreground");

    openProducts();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(trigger()).toHaveClass("bg-surface-muted/60", "text-foreground");
    fireEvent.keyDown(trigger(), { key: "Escape" });
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).not.toHaveClass("bg-surface-muted/60");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("groups editorial pages in Resources and keeps a single desktop panel open", () => {
    render(<Fixture />);
    expect(resourcesPanel()).not.toBeVisible();
    expect(
      screen.queryByRole("link", { name: /^Guides/ }),
    ).not.toBeInTheDocument();
    openProducts();
    const resources = openResources();
    expect(panel()).not.toBeVisible();
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(resourcesTrigger()).toHaveAttribute("aria-expanded", "true");
    expect(RESOURCE_MENU_ITEMS.map((item) => item.label)).toEqual([
      "Guides",
      "Blog",
      "Changelog",
      "Roadmap",
    ]);
    for (const item of RESOURCE_MENU_ITEMS) {
      expect(
        resources.getByRole("link", { name: new RegExp(`^${item.label}`) }),
      ).toHaveAttribute("href", item.href);
    }
    const github = resources.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noreferrer noopener");
    expect(resources.queryByRole("menu")).not.toBeInTheDocument();
    openProducts();
    expect(resourcesPanel()).not.toBeVisible();
    expect(panel()).toBeVisible();
    openResources();
    fireEvent.click(resourcesTrigger());
    expect(resourcesPanel()).not.toBeVisible();
    expect(panel()).not.toBeVisible();
  });

  it("returns focus to Resources on Escape and dismisses on outside focus or pointer interaction", () => {
    render(<Fixture />);
    const guides = openResources().getByRole("link", { name: /^Guides/ });
    act(() => guides.focus());
    fireEvent.keyDown(guides, { key: "Escape" });
    expect(resourcesPanel()).not.toBeVisible();
    expect(resourcesTrigger()).toHaveFocus();
    openResources();
    act(() => guides.focus());
    const outside = screen.getByRole("link", { name: "Outside navigation" });
    act(() => outside.focus());
    expect(resourcesPanel()).not.toBeVisible();
    expect(outside).toHaveFocus();
    openResources();
    fireEvent.pointerDown(
      screen.getByRole("heading", { name: "Example page" }),
    );
    expect(resourcesPanel()).not.toBeVisible();
  });

  it.each([
    ["/guides/getting-started", "/guides"],
    ["/blog/product-update", "/blog"],
    ["/changelog", "/changelog"],
    ["/roadmap", "/roadmap"],
  ])(
    "marks the Resources destination at %s without highlighting Products",
    (path, href) => {
      route.pathname = path;
      render(<Fixture />);
      expect(resourcesTrigger()).toHaveClass("text-foreground");
      expect(trigger()).not.toHaveClass("text-foreground");
      openResources();
      const current = resourcesPanel().querySelectorAll(
        '[aria-current="page"]',
      );
      expect(current).toHaveLength(1);
      expect(current[0]).toHaveAttribute("href", href);
    },
  );

  it("preserves modifier-clicks in Resources and closes on same-tab links, route changes and responsive changes", () => {
    const { rerender } = render(<Fixture />);
    const guides = openResources().getByRole("link", { name: /^Guides/ });
    fireEvent.click(guides, { metaKey: true });
    expect(resourcesPanel()).toBeVisible();
    fireEvent.click(guides, { ctrlKey: true });
    expect(resourcesPanel()).toBeVisible();
    fireEvent.click(guides);
    expect(resourcesPanel()).not.toBeVisible();
    openResources();
    route.pathname = "/blog";
    rerender(<Fixture />);
    expect(resourcesPanel()).not.toBeVisible();
    openResources();
    act(() => guides.focus());
    resize(false);
    expect(resourcesPanel()).not.toBeVisible();
    expect(
      screen.getByRole("button", { name: "Open navigation menu" }),
    ).toHaveFocus();
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
      ...MOBILE_BROWSE_NAV_ITEMS,
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

  it("keeps UI examples directly accessible and current in mobile navigation", async () => {
    media.matches = false;
    route.pathname = "/ui/examples";
    render(<Fixture />);
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    const dialog = await screen.findByRole("dialog");
    expect(
      within(dialog).getByRole("link", { current: "page" }),
    ).toHaveAttribute("href", "/ui/examples");
    expect(
      within(dialog).getByRole("link", { name: "Pricing" }),
    ).toHaveAttribute("href", "/pricing");
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
    ).toEqual(
      PRIMARY_NAV_ITEMS.flatMap((item) => ("href" in item ? [item.href] : [])),
    );
  });

  it("has no axe violations in closed, disclosed and modal states", async () => {
    const { container } = render(<Fixture />);
    await expect(axe(container)).resolves.toHaveNoViolations();
    openProducts();
    await expect(axe(container)).resolves.toHaveNoViolations();
    fireEvent.click(trigger());
    openResources();
    await expect(axe(container)).resolves.toHaveNoViolations();
    fireEvent.click(resourcesTrigger());
    media.matches = false;
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" }),
    );
    const dialog = await screen.findByRole("dialog");
    await expect(axe(dialog)).resolves.toHaveNoViolations();
  });
});
