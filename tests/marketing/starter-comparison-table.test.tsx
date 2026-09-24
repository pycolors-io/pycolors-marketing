import * as React from "react";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { StarterComparisonTable } from "../../components/starters/starter-comparison-table";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function cellsFor(label: string) {
  const header = screen.getByRole("rowheader", { name: label });
  const row = header.closest("tr");

  if (!row) {
    throw new Error(`Missing comparison row: ${label}`);
  }

  return within(row).getAllByRole("cell");
}

describe("Starter Free and Pro comparison", () => {
  beforeEach(() => {
    render(<StarterComparisonTable />);
  });

  it("renders a named table with column and row associations", () => {
    const table = screen.getByRole("table", {
      name: "Compare Starter Free and Starter Pro",
    });
    const headers = within(table).getAllByRole("columnheader");

    expect(headers.map((header) => header.textContent)).toEqual([
      "Capability",
      "Starter Free",
      "Starter Pro",
    ]);
    for (const header of headers) {
      expect(header).toHaveAttribute("scope", "col");
    }

    const rows = within(table).getAllByRole("rowheader");
    expect(rows).toHaveLength(8);
    for (const row of rows) {
      expect(row).toHaveAttribute("scope", "row");
    }
  });

  it("distinguishes mocked auth from configurable real integrations", () => {
    const [freeAuth, proAuth] = cellsFor("Authentication");
    const [freeAccess, proAccess] = cellsFor("Session and access checks");

    expect(freeAuth).toHaveTextContent("no real account or session is created");
    expect(proAuth).toHaveTextContent("Auth.js credentials");
    expect(proAuth).toHaveTextContent("configure your providers");
    expect(freeAccess).toHaveTextContent("add real session checks");
    expect(proAccess).toHaveTextContent("extend permissions for your product");
  });

  it("separates billing and data foundations from a finished product", () => {
    const [freeBilling, proBilling] = cellsFor("Stripe billing");
    const [freeData, proData] = cellsFor("Data persistence");

    expect(freeBilling).toHaveTextContent("Mock plans and invoices");
    expect(freeBilling).toHaveTextContent("no Stripe Checkout");
    expect(proBilling).toHaveTextContent("configure and test");
    expect(freeData).toHaveTextContent("add your persistence layer");
    expect(proData).toHaveTextContent("wire your own domain data");
  });

  it("states deployment and migration responsibilities near the table", () => {
    const table = screen.getByRole("table");

    expect(table).toHaveAccessibleDescription(/not a hosted service/u);
    expect(table).toHaveAccessibleDescription(/does not provision or deploy/u);
    expect(
      screen.getByText(/automatically migrate your app or data/u),
    ).toHaveTextContent("Stay on Free while validating screens and workflows");
    for (const cell of cellsFor("Work you still own")) {
      expect(cell).toHaveTextContent("deploy and operate your app");
    }
    expect(table).not.toHaveTextContent(/Ready after checkout/u);
  });

  it("offers concrete next steps at existing internal destinations", () => {
    const destinations = [
      ["Explore Starter Free", "/starters/free"],
      ["Plan the upgrade from Free", "/docs/starter/upgrade"],
      [
        "Review production responsibilities",
        "/docs/starter-pro/production-checklist",
      ],
    ] as const;

    for (const [name, href] of destinations) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
      const path = href.startsWith("/docs/")
        ? resolve(marketingRoot, "content/docs", `${href.slice(6)}.mdx`)
        : resolve(marketingRoot, "app/(site)", href.slice(1), "page.tsx");

      expect(existsSync(path), `Missing destination: ${href}`).toBe(true);
    }
  });

  it("makes the horizontal scroll region focusable", () => {
    const region = screen.getByRole("region", {
      name: "Starter comparison, scroll horizontally for all columns",
    });

    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toHaveClass("overflow-x-auto");
    region.focus();
    expect(region).toHaveFocus();
  });

  it("keeps the page connected to the comparison and purchase CTA", () => {
    const page = readFileSync(
      resolve(marketingRoot, "app/(site)/starters/pro/page.tsx"),
      "utf8",
    );

    expect(page).toContain("<StarterComparisonTable />");
    expect(page).toContain('id="free-vs-pro"');
    expect(page).not.toContain("const comparisonRows =");
    expect(page).toContain("BuyStarterProButton");
    expect(page).toContain("Try the Starter Free demo");
    expect(page).toContain("starterProBuyerFaqs.map");
  });

  it("has no automated accessibility violations", async () => {
    const root = screen.getByRole("table").closest("div")?.parentElement;

    if (!root) {
      throw new Error("Missing comparison root");
    }

    expect(await axe(root)).toHaveNoViolations();
  });
});
