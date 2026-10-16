import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import StarterProFaqPage, {
  metadata,
} from "../../app/(site)/starters/pro/faq/page";
import { StarterProFaqExplorer } from "../../components/starters/starter-pro-faq-explorer";
import { starterProBuyerFaqs } from "../../lib/products/starter-pro-buyer-faq";

function searchInput() {
  return screen.getByRole("searchbox", {
    name: "Search Starter Pro questions",
  });
}

function disclosures(container: HTMLElement) {
  return Array.from(container.querySelectorAll("details"));
}

describe("Starter Pro FAQ explorer", () => {
  it("renders all canonical answers and links before JavaScript runs", () => {
    const host = document.createElement("div");
    host.innerHTML = renderToStaticMarkup(<StarterProFaqExplorer />);
    const rows = disclosures(host);

    expect(rows).toHaveLength(starterProBuyerFaqs.length);
    expect(host.querySelector("fieldset")).toBeDisabled();
    expect(host.querySelector("noscript")?.textContent).toContain(
      "All answers are available below without JavaScript",
    );
    rows.forEach((row, index) => {
      const faq = starterProBuyerFaqs[index]!;
      expect(row.querySelector("summary")).toHaveTextContent(faq.question);
      expect(row).toHaveTextContent(faq.answer);
      for (const link of faq.links) {
        expect(row.querySelector(`a[href="${link.href}"]`)).toHaveTextContent(
          link.label,
        );
      }
    });
  });

  it("updates filters, pressed states and result counts", () => {
    const { container } = render(<StarterProFaqExplorer />);
    const input = searchInput();

    expect(input).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent("14 of 14 questions");
    fireEvent.click(screen.getByRole("button", { name: "Purchase & access" }));
    expect(
      screen.getByRole("button", { name: "Purchase & access" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "All topics" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(disclosures(container)).toHaveLength(2);
    fireEvent.change(input, { target: { value: "spam" } });
    expect(screen.getByRole("status")).toHaveTextContent("1 of 14 questions");
    const result = disclosures(container)[0];
    expect(result?.querySelector("summary")).toHaveTextContent(
      "What if I do not receive my purchase email?",
    );
    fireEvent.change(input, { target: { value: "" } });
    expect(disclosures(container)).toHaveLength(2);
  });

  it("resets both filters and restores search focus", () => {
    const { container } = render(<StarterProFaqExplorer />);
    fireEvent.click(screen.getByRole("button", { name: "License & refunds" }));
    fireEvent.change(searchInput(), { target: { value: "nonexistent-727" } });

    expect(
      screen.getByRole("heading", { name: "No matching questions" }),
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent("0 of 14 questions");
    expect(disclosures(container)).toHaveLength(0);
    const reset = screen.getByRole("button", { name: "Reset filters" });
    reset.focus();
    fireEvent.click(reset);

    expect(searchInput()).toHaveValue("");
    expect(searchInput()).toHaveFocus();
    expect(screen.getByRole("button", { name: "All topics" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(disclosures(container)).toHaveLength(starterProBuyerFaqs.length);
    expect(reset).toBeDisabled();
  });

  it("preserves independent disclosures and next-step links", () => {
    const { container } = render(<StarterProFaqExplorer />);
    const rows = disclosures(container);

    for (const index of [0, 1]) {
      const row = rows[index]!;
      const summary = row.querySelector("summary")!;
      summary.focus();
      expect(summary).toHaveFocus();
      fireEvent.click(summary);
      expect(row.open).toBe(true);
      const faq = starterProBuyerFaqs[index]!;
      expect(within(row).getByText(faq.answer)).toBeVisible();
      for (const link of faq.links) {
        const destination = within(row).getByRole("link", { name: link.label });
        expect(destination).toHaveAttribute("href", link.href);
      }
    }
    fireEvent.click(rows[0]!.querySelector("summary")!);
    expect(rows[0]!.open).toBe(false);
    expect(rows[1]!.open).toBe(true);
  });

  it("has no axe violations in full and empty states", async () => {
    const { container } = render(<StarterProFaqExplorer />);
    expect((await axe(container)).violations).toEqual([]);

    fireEvent.change(searchInput(), { target: { value: "nonexistent-727" } });
    expect((await axe(container)).violations).toEqual([]);
  });
});

describe("Starter Pro FAQ page", () => {
  it("keeps next steps available with no results", () => {
    render(<StarterProFaqPage />);
    expect(screen.getByRole("main")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Starter Pro questions, answered.",
      }),
    ).toBeVisible();
    fireEvent.change(searchInput(), { target: { value: "nonexistent-727" } });

    for (const [label, href] of [
      ["Explore Starter Pro", "/starters/pro"],
      ["View pricing", "/pricing"],
      ["Read the setup guide", "/docs/starter-pro/getting-started"],
      ["Contact purchase support", "/orders/support"],
      ["Recover purchase access", "/orders/recover"],
    ] as const) {
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
    }
    expect(metadata.alternates?.canonical).toBe("/starters/pro/faq");
    expect(metadata.openGraph?.url).toBe("/starters/pro/faq");
  });
});
