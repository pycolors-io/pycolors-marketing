import * as React from "react";
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

import { DocsHeader } from "@/components/docs-header";
import { SITE_PALETTE_STORAGE_KEY } from "@/lib/site-palette";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { DOCS_MENU_GROUPS, PRODUCT_MENU_GROUPS } from "@/lib/layout.shared";
import { DocsSidebarPublications } from "@/components/docs/docs-sidebar-items";

const route = vi.hoisted(() => ({ pathname: "/docs" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }));
vi.mock("next/link", () => ({
  default: (props: React.ComponentProps<"a">) => <a {...props} />,
}));
vi.mock("@/components/wordmark-font", () => ({
  wordmarkFont: { className: "wordmark-font" },
}));
vi.mock("fumadocs-ui/layouts/shared/slots/search-trigger", () => ({
  FullSearchTrigger: () => <button type="button">Search documentation</button>,
  SearchTrigger: () => <button type="button">Search documentation</button>,
}));
const appearance = vi.hoisted(() => ({ theme: "system", setTheme: vi.fn() }));
vi.mock("fumadocs-ui/provider/base", () => ({ useTheme: () => appearance }));

const docsLinks = [
  { label: "Getting Started", href: "/docs/getting-started" },
  {
    label: "Project Structure",
    href: "/docs/templates/na-ai-landing/project-structure",
  },
  { label: "Upgrade to Starter Pro", href: "/docs/starter/upgrade" },
  { label: "What is included", href: "/docs/starter-pro/what-is-included" },
  { label: "Billing", href: "/docs/starter-pro/billing" },
  { label: "Backend", href: "/docs/starter-pro/backend" },
  { label: "Button", href: "/docs/ui/button" },
];
const sections = [
  "/docs/ui",
  "/docs/blocks",
  "/docs/starter",
  "/docs/starter-pro",
  "/docs/design-system",
  "/docs/templates/na-ai-landing",
  "/docs",
  "/docs/patterns",
];
let breakpointChange: (() => void) | undefined;
const media = {
  matches: true,
  addEventListener: vi.fn((_event: string, listener: () => void) => {
    breakpointChange = listener;
  }),
  removeEventListener: vi.fn(),
};
function Fixture({ links = docsLinks }: { links?: typeof docsLinks }) {
  return (
    <div
      onClick={(event) => {
        // Let the component handle the click before suppressing jsdom navigation.
        if ((event.target as HTMLElement).closest("a")) event.preventDefault();
      }}
    >
      <DocsHeader docsLinks={links} />
      <main id="content">
        <h1>Documentation page</h1>
        <a href="/outside">Outside link</a>
      </main>
    </div>
  );
}
function trigger() {
  return screen.getByRole("button", { name: "Docs" });
}
function panel() {
  return document.getElementById(trigger().getAttribute("aria-controls")!)!;
}
function openDesktop() {
  fireEvent.click(trigger());
  return within(panel());
}
function resize(desktop: boolean) {
  act(() => {
    media.matches = desktop;
    breakpointChange?.();
  });
}
function openMobile() {
  media.matches = false;
  const button = screen.getByRole("button", {
    name: "Open documentation menu",
  });
  fireEvent.click(button);
  return {
    button,
    dialog: screen.getByRole("dialog", { name: "Documentation" }),
  };
}
beforeEach(() => {
  document.documentElement.dataset.sitePalette = "pycolors";
  window.localStorage.clear();
  appearance.setTheme.mockClear();
  route.pathname = "/docs";
  media.matches = true;
  media.addEventListener.mockClear();
  media.removeEventListener.mockClear();
  breakpointChange = undefined;
  vi.stubGlobal(
    "matchMedia",
    vi.fn(() => media),
  );
});
afterEach(async () => {
  cleanup();
  vi.useRealTimers();
  document.documentElement.removeAttribute("data-site-palette");
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
  vi.unstubAllGlobals();
});

describe("DocsHeader hover", () => {
  beforeEach(() => vi.useFakeTimers());

  function advance(ms: number) {
    act(() => vi.advanceTimersByTime(ms));
  }

  it("opens after intentional hover and stays open while entering the panel", () => {
    render(<Fixture />);
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    advance(100);
    expect(panel()).not.toBeVisible();
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    advance(100);
    expect(panel()).not.toBeVisible();
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    advance(150);
    expect(panel()).toBeVisible();
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    advance(100);
    fireEvent.pointerEnter(panel(), { pointerType: "mouse" });
    advance(250);
    expect(panel()).toBeVisible();
    fireEvent.pointerLeave(panel(), { pointerType: "mouse" });
    advance(150);
    expect(panel()).toBeVisible();
    advance(50);
    expect(panel()).not.toBeVisible();
  });

  it("dismisses hover with Escape without stealing focus from the article", () => {
    render(<Fixture />);
    const outside = screen.getByRole("link", { name: "Outside link" });
    act(() => outside.focus());
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    advance(150);
    expect(panel()).toBeVisible();
    expect(outside).toHaveFocus();
    fireEvent.keyDown(outside, { key: "Escape" });
    advance(300);
    expect(panel()).not.toBeVisible();
    expect(outside).toHaveFocus();
  });

  it("keeps the panel open for keyboard users after pointer exit", () => {
    render(<Fixture />);
    act(() => trigger().focus());
    openDesktop();
    fireEvent.pointerLeave(trigger(), { pointerType: "mouse" });
    advance(300);
    expect(panel()).toBeVisible();
    const link = within(panel()).getByRole("link", { name: /^UI Library/ });
    act(() => link.focus());
    fireEvent.pointerLeave(panel(), { pointerType: "mouse" });
    advance(300);
    expect(link).toHaveFocus();
    expect(panel()).toBeVisible();
    fireEvent.keyDown(link, { key: "Escape" });
    expect(panel()).not.toBeVisible();
    expect(trigger()).toHaveFocus();
  });

  it("retains tap activation and cancels pending hover on a responsive change", () => {
    render(<Fixture />);
    fireEvent.pointerEnter(trigger(), { pointerType: "touch" });
    advance(300);
    expect(panel()).not.toBeVisible();
    openDesktop();
    expect(panel()).toBeVisible();
    fireEvent.click(trigger());
    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    resize(false);
    advance(300);
    resize(true);
    expect(panel()).not.toBeVisible();
  });
});

describe("DocsHeader navigation", () => {
  it("shares dated article badges with the mobile list without marking product sections or quick links", () => {
    const now = vi
      .spyOn(Date, "now")
      .mockReturnValue(Date.parse("2026-10-06T12:00:00Z"));
    const links = [{ label: "Storybook", href: "/docs/ui/storybook" }];
    const { unmount } = render(
      <DocsSidebarPublications dates={{ "/docs/ui/storybook": "2026-09-25" }}>
        <Fixture links={links} />
      </DocsSidebarPublications>,
    );
    const { dialog } = openMobile();
    fireEvent.click(within(dialog).getByText("All documentation pages"));
    const allDocs = within(dialog).getByRole("navigation", {
      name: "All documentation links",
    });
    const quick = within(dialog).getByRole("navigation", {
      name: "Quick documentation links",
    });
    const article = within(allDocs).getByRole("link", {
      name: "Storybook New",
    });
    expect(article).toHaveAttribute("href", "/docs/ui/storybook");
    expect(
      within(quick).getByRole("link", { name: "Storybook" }),
    ).not.toHaveTextContent("New");
    now.mockReturnValue(Date.parse("2026-10-25T00:00:00Z"));
    fireEvent.focus(window);
    expect(within(allDocs).getByRole("link", { name: "Storybook" })).toBe(
      article,
    );
    expect(within(allDocs).getByText("New")).not.toBeVisible();
    unmount();
    now.mockRestore();
  });

  it("keeps the PyColors Docs identity in one link to the documentation home", () => {
    render(<Fixture />);
    const logo = screen.getByRole("link", { name: "PyColors Docs" });
    expect(logo).toHaveAttribute("href", "/docs");
    expect(logo).toHaveTextContent(/pycolors\s*Docs/);
    expect(
      screen.queryByRole("link", { name: "PyColors" }),
    ).not.toBeInTheDocument();
    expect(logo.querySelector("a")).toBeNull();
  });

  it("keeps focus passive and supports explicit click activation", () => {
    render(<Fixture />);
    act(() => trigger().focus());
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(panel()).not.toBeVisible();
    expect(within(panel()).queryByRole("link")).not.toBeInTheDocument();
    expect(trigger()).not.toHaveAttribute("aria-haspopup");
    openDesktop();
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(panel()).toBeVisible();
    fireEvent.click(trigger());
    expect(panel()).not.toBeVisible();
  });

  it("preserves all section, featured, pricing and Pro destinations as real links", () => {
    render(<Fixture />);
    const menu = openDesktop();
    expect(
      within(menu.getByRole("navigation", { name: "Documentation sections" }))
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(sections);
    expect(
      within(menu.getByRole("list", { name: "Quick documentation links" }))
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(docsLinks.slice(0, 6).map((a) => a.href));
    const pricing = menu.getByRole("link", { name: /View pricing/ });
    expect(pricing).toHaveAttribute("href", "/pricing");
    expect(pricing).toHaveTextContent(
      PRODUCT_DISPLAY["na-ai-landing"].priceLabel,
    );
    expect(pricing).toHaveTextContent(
      PRODUCT_DISPLAY["starter-pro"].priceLabel,
    );
    expect(
      menu.getByRole("link", { name: "Open Theme Builder" }),
    ).toHaveAttribute("href", "/tools/theme-builder");
    expect(screen.getByRole("link", { name: "Explore Pro" })).toHaveAttribute(
      "href",
      "/starters/pro",
    );
    expect(
      screen.getAllByRole("button", { name: "Search documentation" }),
    ).toHaveLength(2);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.queryByRole("menuitem")).not.toBeInTheDocument();
  });

  it("falls back to supplied docs links and works without them", () => {
    const { rerender } = render(<Fixture links={[docsLinks[6]]} />);
    expect(openDesktop().getByRole("link", { name: "Button" })).toHaveAttribute(
      "href",
      "/docs/ui/button",
    );
    rerender(<Fixture links={[]} />);
    expect(
      within(panel()).queryByRole("list", {
        name: "Quick documentation links",
      }),
    ).not.toBeInTheDocument();
    expect(within(panel()).getAllByRole("link")).toHaveLength(
      sections.length + 2,
    );
  });

  it("keeps only the most-specific section and quick link current", () => {
    route.pathname = "/docs/starter-pro/billing";
    render(<Fixture />);
    const menu = openDesktop();
    const section = within(
      menu.getByRole("navigation", { name: "Documentation sections" }),
    ).getByRole("link", { current: "page" });
    expect(section).toHaveAttribute("href", "/docs/starter-pro");
    expect(
      within(
        menu.getByRole("list", { name: "Quick documentation links" }),
      ).getByRole("link", { current: "page" }),
    ).toHaveAttribute("href", "/docs/starter-pro/billing");
  });

  it("keeps the dedicated docs families and documentation links for every marketing product", () => {
    render(<Fixture />);
    const menu = openDesktop();
    expect(DOCS_MENU_GROUPS.map((group) => group.title)).toEqual([
      "Build your interface",
      "Start your application",
      "Design and launch",
    ]);
    expect(
      DOCS_MENU_GROUPS.flatMap((group) =>
        group.items.map((item) => item.href),
      ).sort(),
    ).toEqual(
      PRODUCT_MENU_GROUPS.flatMap((group) =>
        group.items.map((item) => item.documentation.href),
      ).sort(),
    );
    for (const group of DOCS_MENU_GROUPS) {
      const links = within(menu.getByRole("list", { name: group.title }));
      for (const item of group.items) {
        const link = links.getByRole("link", {
          name: `${item.label} ${item.description}`,
        });
        expect(link).toHaveAttribute("href", item.href);
        expect(item.href).toMatch(/^\/docs\//);
      }
    }
    expect(menu.getByRole("link", { name: /UI Library/ })).toHaveAttribute(
      "href",
      "/docs/ui",
    );
    expect(menu.getByRole("link", { name: /Blocks/ })).toHaveAttribute(
      "href",
      "/docs/blocks",
    );
    expect(menu.getByRole("link", { name: /NA-AI Landing/ })).toHaveAttribute(
      "href",
      "/docs/templates/na-ai-landing",
    );
  });

  it.each([
    ["/docs/ui/button", "UI Library", "/docs/ui"],
    ["/docs/blocks/auth/sign-in", "Blocks", "/docs/blocks"],
    [
      "/docs/templates/na-ai-landing/setup",
      "NA-AI Landing",
      "/docs/templates/na-ai-landing",
    ],
  ])(
    "highlights one direct documentation section at %s",
    (path, label, href) => {
      route.pathname = path;
      render(<Fixture />);
      const current = screen.getByRole("link", {
        name: label,
        current: "page",
      });
      expect(current).toHaveAttribute("href", href);
      expect(trigger()).not.toHaveClass("bg-surface-muted/60");
    },
  );

  it.each(["/docs", "/docs/design-system/colors", "/docs/patterns"])(
    "highlights the Docs overview trigger for sections without a direct header link at %s",
    (path) => {
      route.pathname = path;
      render(<Fixture />);
      expect(trigger()).toHaveClass("bg-surface-muted/60");
    },
  );

  it("changes the shared palette without closing Docs and preserves the choice on reopen", () => {
    render(<Fixture />);
    const menu = openDesktop();
    const palette = within(menu.getByRole("group", { name: "Site palette" }));
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
    openDesktop();
    expect(monochrome).toHaveAttribute("aria-pressed", "true");
  });

  it("preserves keyboard focus when the pointer leaves and restores it on Escape", () => {
    render(<Fixture />);
    const link = openDesktop().getByRole("link", { name: "Getting Started" });
    act(() => link.focus());
    fireEvent.mouseLeave(trigger().parentElement!);
    expect(panel()).toBeVisible();
    expect(link).toHaveFocus();
    fireEvent.keyDown(link, { key: "Escape" });
    expect(panel()).not.toBeVisible();
    expect(trigger()).toHaveFocus();
  });

  it("closes when focus leaves without stealing that focus", () => {
    render(<Fixture />);
    const link = openDesktop().getByRole("link", { name: "Getting Started" });
    act(() => link.focus());
    const outside = screen.getByRole("link", { name: "Outside link" });
    act(() => outside.focus());
    expect(panel()).not.toBeVisible();
    expect(outside).toHaveFocus();
  });

  it("closes on outside pointer interaction and route changes", () => {
    const { rerender } = render(<Fixture />);
    openDesktop();
    fireEvent.pointerDown(screen.getByRole("main"));
    expect(panel()).not.toBeVisible();
    openDesktop();
    route.pathname = "/docs/ui";
    rerender(<Fixture />);
    expect(panel()).not.toBeVisible();
  });

  it("keeps modifier-clicks native and closes on same-tab navigation", () => {
    render(<Fixture />);
    const link = openDesktop().getByRole("link", { name: "Getting Started" });
    fireEvent.click(link, { ctrlKey: true });
    expect(panel()).toBeVisible();
    fireEvent.click(link, { metaKey: true });
    expect(panel()).toBeVisible();
    fireEvent.click(link);
    expect(panel()).not.toBeVisible();
  });

  it("uses distinct controlled IDs when more than one header is rendered", () => {
    render(
      <>
        <DocsHeader />
        <DocsHeader />
      </>,
    );
    const controls = screen
      .getAllByRole("button", { name: "Docs" })
      .map((b) => b.getAttribute("aria-controls"));
    expect(new Set(controls).size).toBe(2);
    for (const id of controls)
      expect(document.getElementById(id!)).toHaveAttribute("hidden");
  });

  it("opens a named mobile modal with every docs link and preserves current state", () => {
    route.pathname = "/docs/ui/button";
    render(<Fixture />);
    const { dialog } = openMobile();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const nav = within(dialog).getByRole("navigation", {
      name: "Documentation navigation",
    });
    expect(
      within(nav)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(sections);
    expect(within(nav).getByRole("link", { current: "page" })).toHaveAttribute(
      "href",
      "/docs/ui",
    );
    expect(
      within(dialog).queryByRole("navigation", {
        name: "All documentation links",
      }),
    ).not.toBeVisible();
    expect(
      within(dialog).getByRole("navigation", {
        name: "Quick documentation links",
      }),
    ).toBeVisible();
    fireEvent.click(within(dialog).getByText("All documentation pages"));
    const allDocs = within(dialog).getByRole("navigation", {
      name: "All documentation links",
    });
    expect(
      within(allDocs)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(docsLinks.map((a) => a.href));
    expect(
      within(allDocs).getByRole("link", { current: "page" }),
    ).toHaveAttribute("href", "/docs/ui/button");
    expect(
      within(dialog).getByRole("link", { name: "Pricing" }),
    ).toHaveAttribute("href", "/pricing");
    expect(
      within(dialog).getByRole("link", { name: "Theme Builder" }),
    ).toHaveAttribute("href", "/tools/theme-builder");
    const settings = within(
      within(dialog).getByRole("region", { name: "Appearance" }),
    );
    fireEvent.click(settings.getByRole("button", { name: "Monochrome" }));
    expect(document.documentElement.dataset.sitePalette).toBe("monochrome");
    expect(
      settings.getByRole("button", { name: "Monochrome" }),
    ).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(settings.getByRole("button", { name: "Light theme" }));
    expect(appearance.setTheme).toHaveBeenCalledWith("light");
    expect(
      settings.getByRole("button", { name: "System theme" }),
    ).toBeVisible();
    expect(dialog).toBeVisible();
    expect(
      within(dialog).getByRole("link", { name: "Explore Starter Pro" }),
    ).toHaveAttribute("href", "/starters/pro");
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
    expect(getComputedStyle(document.body).overflow).toBe("hidden");
  });

  it("dismisses the mobile modal and restores focus and existing body styles", async () => {
    document.body.style.overflow = "auto";
    render(<Fixture />);
    const { button, dialog } = openMobile();
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(button).toHaveFocus());
    expect(document.body.style.overflow).toBe("auto");
    document.body.style.overflow = "";
  });

  it("closes mobile navigation on route change and releases the scroll lock", async () => {
    const { rerender } = render(<Fixture />);
    openMobile();
    route.pathname = "/docs/starter-pro";
    rerender(<Fixture />);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(getComputedStyle(document.body).overflow).not.toBe("hidden");
  });

  it("closes both navigation modes across their breakpoint and restores visible focus", async () => {
    render(<Fixture />);
    const link = openDesktop().getByRole("link", { name: "Getting Started" });
    act(() => link.focus());
    resize(false);
    expect(panel()).not.toBeVisible();
    expect(
      screen.getByRole("button", { name: "Open documentation menu" }),
    ).toHaveFocus();
    openMobile();
    resize(true);
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    await waitFor(() => expect(trigger()).toHaveFocus());
    expect(getComputedStyle(document.body).overflow).not.toBe("hidden");
  });

  it("cleans listeners and modal effects on unmount", async () => {
    const remove = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<Fixture />);
    openDesktop();
    const installed = media.addEventListener.mock.calls[0][1];
    openMobile();
    unmount();
    await waitFor(() =>
      expect(getComputedStyle(document.body).overflow).not.toBe("hidden"),
    );
    expect(media.removeEventListener).toHaveBeenCalledWith("change", installed);
    expect(remove).toHaveBeenCalledWith("pointerdown", expect.any(Function));
    expect(document.body.style.pointerEvents).not.toBe("none");
    remove.mockRestore();
  });

  it("passes axe for the closed/open header and mobile modal", async () => {
    const { container } = render(<Fixture />);
    expect((await axe(container)).violations).toEqual([]);
    openDesktop();
    expect((await axe(container)).violations).toEqual([]);
    const { dialog } = openMobile();
    expect((await axe(dialog)).violations).toEqual([]);
  });
});
