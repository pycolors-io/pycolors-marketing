import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { afterAll, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import PatternsPage, { metadata } from "@/app/(site)/ui/patterns/page";

vi.hoisted(() =>
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com"),
);
afterAll(() => vi.unstubAllEnvs());

const patterns = [
  ["Dashboard layout", "dashboard", "/docs/blocks/data/stats-overview"],
  ["Billing page", "billing", "/docs/blocks/commerce/billing-overview"],
  ["Settings page", "settings", "/docs/blocks/account/settings-panel"],
  ["Team management", "team", "/docs/blocks/account/workspace-members"],
  [
    "Protected app shell",
    "shell",
    "/docs/blocks/app-shells/responsive-sidebar",
  ],
  ["Upgrade moment", "upgrade", "/docs/blocks/commerce/pricing-plans"],
] as const;

describe("UI Patterns page", () => {
  it("preserves the canonical route, active UI navigation, and skip destination", () => {
    render(<PatternsPage />);
    expect(metadata.alternates?.canonical).toBe("/ui/patterns");
    expect(metadata.openGraph?.url).toBe("/ui/patterns");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Give every screen a clear purpose.",
    );
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    const nav = screen.getByRole("navigation", {
      name: "PyColors UI navigation",
    });
    expect(within(nav).getByRole("link", { name: "Patterns" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(nav.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
    expect(
      screen.getByRole("link", { name: "Explore the patterns" }),
    ).toHaveAttribute("href", "#pattern-library");
    expect(document.getElementById("pattern-library")).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("connects all six patterns to distinct, existing Block documentation", () => {
    render(<PatternsPage />);
    expect(screen.getAllByRole("article")).toHaveLength(patterns.length);
    const nav = screen.getByRole("navigation", { name: "Pattern categories" });
    for (const [title, id, docs] of patterns) {
      const article = screen.getByRole("article", { name: title });
      expect(article).toHaveAttribute("id", `pattern-${id}`);
      expect(article).toHaveAttribute("tabindex", "-1");
      expect(
        within(article).getByRole("heading", { level: 3 }),
      ).toHaveTextContent(title);
      expect(within(article).getByRole("link")).toHaveAttribute("href", docs);
      expect(within(article).getAllByRole("listitem")).toHaveLength(2);
      expect(within(nav).getByRole("link", { name: title })).toHaveAttribute(
        "href",
        `#pattern-${id}`,
      );
      expect(existsSync(resolve("content", `${docs.slice(1)}.mdx`))).toBe(true);
    }
  });

  it("keeps illustrations decorative and directs real interactions to working resources", () => {
    const { container } = render(<PatternsPage />);
    const illustrations = container.querySelectorAll('div[aria-hidden="true"]');
    expect(illustrations.length).toBeGreaterThanOrEqual(patterns.length);
    for (const illustration of illustrations) {
      expect(
        illustration.querySelector("a,button,input,select,textarea,[tabindex]"),
      ).toBeNull();
    }
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("button,a")).toBeNull();
      const href = link.getAttribute("href")!;
      expect(href).not.toBe("/examples");
      if (href.startsWith("#"))
        expect(container.querySelector(href)).not.toBeNull();
    }
    expect(screen.getByRole("link", { name: "View examples" })).toHaveAttribute(
      "href",
      "/ui/examples",
    );
    expect(
      screen.getByRole("link", { name: "Open Theme Builder" }),
    ).toHaveAttribute("href", "/tools/theme-builder");
    expect(
      screen.getByRole("link", { name: "Read the integration docs" }),
    ).toHaveAttribute("href", "/docs/blocks");
  });

  it("makes the boundary between illustrative layouts, runnable demos, and application behavior clear", () => {
    render(<PatternsPage />);
    expect(screen.getByRole("main")).toHaveTextContent(
      "Illustrative layout · Sample data",
    );
    expect(
      screen.getByText("Authentication, billing, and product data are mocked."),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Configure your services, add product logic, and validate before launch.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        /Your application supplies data, authentication, permissions, and payment behavior/,
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Explore Starter Free" }),
    ).toHaveAttribute("href", "/starters/free");
    expect(
      screen.getByRole("link", { name: "See what’s included" }),
    ).toHaveAttribute("href", "/starters/pro");
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<PatternsPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
