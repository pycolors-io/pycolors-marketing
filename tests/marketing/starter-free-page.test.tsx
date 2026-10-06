import { existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import StarterFreePage, { metadata } from "@/app/(site)/starters/free/page";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";

vi.mock("@/lib/api/client", () => ({ createStarterProCheckout: vi.fn() }));

describe("Starter Free product page", () => {
  it("connects the free repository, demo, setup and real comparison destinations", () => {
    render(<StarterFreePage />);
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(metadata.alternates).toEqual({ canonical: "/starters/free" });
    expect(
      screen.getByRole("link", { name: "Get Starter Free" }),
    ).toHaveAttribute(
      "href",
      "https://github.com/pycolors-io/pycolors-starter-free",
    );
    expect(
      screen.getByRole("link", { name: "Open live demo" }),
    ).toHaveAttribute("href", "https://starter-demo.pycolors.io");
    expect(
      screen.getByRole("link", { name: "Installation guide" }),
    ).toHaveAttribute("href", "/docs/starter/installation");
    expect(
      screen.getByRole("link", { name: "Compare all features" }),
    ).toHaveAttribute("href", "/starters/pro#free-vs-pro");
    expect(
      screen.getByRole("button", {
        name: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      }),
    ).toBeVisible();
    const nav = screen.getByRole("navigation", {
      name: "Starter Free sections",
    });
    for (const link of within(nav).getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      const section = document.getElementById(href.slice(1));
      expect(section, href).not.toBeNull();
      expect(section).toHaveAccessibleName();
    }
    for (const link of screen.getAllByRole("link")) {
      const href = link.getAttribute("href")!;
      if (!href.startsWith("/")) continue;
      const route = href.split("#")[0]!;
      const candidates = route.startsWith("/docs/")
        ? [
            resolve("content", `${route.slice(1)}.mdx`),
            resolve("content", route.slice(1), "index.mdx"),
          ]
        : [resolve("app/(site)", route.slice(1), "page.tsx")];
      expect(candidates.some(existsSync), href).toBe(true);
    }
  });

  it("exposes one preview at a time with the correct demo link and existing capture", () => {
    render(<StarterFreePage />);
    const expected = [
      ["Dashboard", "/dashboard"],
      ["Projects", "/projects"],
      ["Authentication", "/login"],
      ["Settings", "/settings"],
      ["Billing", "/billing"],
      ["Admin", "/admin"],
    ];
    expect(screen.getAllByRole("tab")).toHaveLength(expected.length);
    for (const [label, route] of expected) {
      const tab = screen.getByRole("tab", { name: label });
      fireEvent.mouseDown(tab, { button: 0, ctrlKey: false });
      expect(tab).toHaveAttribute("aria-selected", "true");
      expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
      const panel = screen.getByRole("tabpanel", { name: label });
      expect(tab.getAttribute("aria-controls")).toBe(panel.id);
      expect(panel).not.toHaveAttribute("inert");
      expect(within(panel).getByRole("link")).toHaveAttribute(
        "href",
        `https://starter-demo.pycolors.io${route}`,
      );
      const image = within(panel).getByRole("img");
      const src = new URL(image.getAttribute("src")!, "http://localhost");
      const path = src.searchParams.get("url") ?? src.pathname;
      expect(existsSync(resolve("public", path.slice(1))), path).toBe(true);
      for (const other of screen
        .getAllByRole("tabpanel", { hidden: true })
        .filter((node) => node !== panel)) {
        expect(other).toHaveAttribute("aria-hidden", "true");
        expect(other).toHaveAttribute("inert");
        expect(other).toHaveAttribute("tabindex", "-1");
      }
    }
  });

  it("supports arrow-key navigation without moving focus into the screenshot", async () => {
    render(<StarterFreePage />);
    const dashboard = screen.getByRole("tab", { name: "Dashboard" });
    const projects = screen.getByRole("tab", { name: "Projects" });
    act(() => dashboard.focus());
    fireEvent.keyDown(dashboard, { key: "ArrowRight" });
    await waitFor(() => expect(projects).toHaveFocus());
    expect(projects).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(projects, { key: "Home" });
    await waitFor(() => expect(dashboard).toHaveFocus());
    expect(dashboard).toHaveAttribute("aria-selected", "true");
  });

  it("highlights and copies all setup commands without dropping line breaks", async () => {
    const original = Object.getOwnPropertyDescriptor(navigator, "clipboard");
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      render(<StarterFreePage />);
      const code =
        "git clone https://github.com/pycolors-io/pycolors-starter-free.git\ncd pycolors-starter-free\npnpm install\npnpm dev";
      await waitFor(() =>
        expect(
          screen
            .getByRole("region", { name: "Starter Free setup commands" })
            .querySelector("code")?.textContent,
        ).toBe(code),
      );
      expect(
        screen
          .getByRole("region", { name: "Starter Free setup commands" })
          .querySelectorAll("span[style]").length,
      ).toBeGreaterThan(3);
      fireEvent.click(screen.getByRole("button", { name: "Copy Text" }));
      await waitFor(() => expect(writeText).toHaveBeenCalledWith(code));
      expect(
        await screen.findByRole("button", { name: "Copied Text" }),
      ).toBeVisible();
    } finally {
      if (original) Object.defineProperty(navigator, "clipboard", original);
      else Reflect.deleteProperty(navigator, "clipboard");
    }
  });

  it("keeps service boundaries explicit and uses the shared native FAQ", async () => {
    const { container } = render(<StarterFreePage />);
    const faq = screen.getByRole("region", { name: "Before you start." });
    expect(faq.querySelectorAll("details > summary")).toHaveLength(4);
    expect(faq).toHaveTextContent(
      "No real account, session or payment is created.",
    );
    expect(faq).toHaveTextContent(
      "does not automatically migrate your application or data",
    );
    expect(
      await axe(container, { rules: { "color-contrast": { enabled: false } } }),
    ).toHaveNoViolations();
  });
});
