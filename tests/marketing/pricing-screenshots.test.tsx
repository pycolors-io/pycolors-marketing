import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import PricingPage, { metadata } from "../../app/(site)/pricing/page";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";

vi.mock("@/lib/api/client", () => ({
  createStarterProCheckout: vi.fn(),
  createCheckoutSession: vi.fn(),
}));

describe("Starter Pro pricing screenshots", () => {
  it("renders two captioned, descriptive previews after the comparison", () => {
    render(<PricingPage />);
    const preview = screen.getByRole("region", {
      name: "See the screens you can build on",
    });
    expect(within(preview).getAllByRole("img")).toHaveLength(2);
    for (const [title, alt, file, caption] of [
      [
        "Sign-in screen",
        "Starter Pro sign-in screen with email, password, Google and GitHub options",
        "auth",
        "email and password fields",
      ],
      [
        "Offline fallback",
        "Starter Pro offline screen with reload and dashboard links",
        "pwa",
        "when their connection drops",
      ],
    ]) {
      const image = within(preview).getByRole("img", { name: alt });
      const figure = image.closest("figure");
      expect(figure).not.toBeNull();
      expect(figure?.querySelector("figcaption")).toHaveTextContent(title!);
      expect(figure?.querySelector("figcaption")).toHaveTextContent(caption!);
      const link = within(preview).getByRole("link", {
        name: `View ${title!.toLowerCase()} at full size`,
      });
      expect(link).toHaveAttribute(
        "href",
        `/images/starters/pro/${file}-pycolors.png`,
      );
      expect(link).not.toHaveAttribute("target");
      link.focus();
      expect(link).toHaveFocus();
      expect(image.closest("a")).toHaveAttribute(
        "href",
        link.getAttribute("href"),
      );
    }
    expect(preview.previousElementSibling).toHaveAccessibleName(
      "What’s included in each product",
    );
    expect(preview.nextElementSibling).toHaveAccessibleName(
      "Your questions, answered.",
    );
    expect(preview).toHaveTextContent(
      "not proof of a live deployment, a completed payment, or a verified integration",
    );
    expect(preview).toHaveTextContent("shown in the light theme");
  });

  it("compares the same products in offer order and distinguishes demo from integrated flows", () => {
    render(<PricingPage />);
    const offers = screen.getByRole("region", {
      name: "Choose a PyColors product",
    });
    expect(
      within(offers)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["NA-AI Landing", "Starter Free", "Starter Pro"]);
    const table = screen.getByRole("table", {
      name: "Compare NA-AI Landing, Starter Free and Starter Pro features",
    });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .slice(1)
        .map((heading) => heading.textContent),
    ).toEqual([
      `NA-AI Landing${PRODUCT_DISPLAY["na-ai-landing"].priceLabel}One-time`,
      "Starter FreeFreePublic repository",
      `Starter Pro${PRODUCT_DISPLAY["starter-pro"].priceLabel}One-time · Launch price`,
    ]);
    for (const [name, values] of [
      [
        "Email & password sign-in",
        ["Not included", "Mock screens only", "Auth.js credentials"],
      ],
      [
        "Stripe Checkout & portal",
        ["Not included", "Not included", "Included"],
      ],
      [
        "Sessions & protected routes",
        ["Not included", "UI structure only", "Server-side guards"],
      ],
      [
        "Data persistence",
        ["Not included", "Mock data", "Prisma + PostgreSQL"],
      ],
    ] as const) {
      const row = within(table).getByRole("rowheader", { name }).closest("tr")!;
      expect(
        within(row)
          .getAllByRole("cell")
          .map((cell) => cell.textContent),
      ).toEqual(values);
    }
    expect(
      screen.getByText(/Starter Pro is source code, not a hosted service/),
    ).toBeVisible();
  });

  it("provides keyboard access to the comparison and valid section anchors", () => {
    render(<PricingPage />);
    const comparison = screen.getByRole("region", {
      name: "Product comparison, scroll horizontally for all columns",
    });
    comparison.focus();
    expect(comparison).toHaveFocus();
    const navigation = screen.getByRole("navigation", {
      name: "Pricing sections",
    });
    for (const link of within(navigation).getAllByRole("link")) {
      const id = link.getAttribute("href")!.slice(1);
      expect(document.getElementById(id)).not.toBeNull();
    }
  });

  it("keeps offers, comparison and FAQ accessible", async () => {
    const { container } = render(<PricingPage />);
    expect((await axe(container)).violations).toEqual([]);
  });

  it("preserves purchase labels, product links and canonical pricing metadata", () => {
    render(<PricingPage />);
    expect(
      screen.getAllByRole("button", {
        name: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("button", {
        name: `Buy NA-AI Landing — ${PRODUCT_DISPLAY["na-ai-landing"].priceLabel}`,
      }).length,
    ).toBeGreaterThan(0);
    for (const link of screen.getAllByRole("link", {
      name: "Explore Starter Pro",
    })) {
      expect(link).toHaveAttribute("href", "/starters/pro");
    }
    for (const link of screen.getAllByRole("link", {
      name: "Try the live demo",
    })) {
      expect(link).toHaveAttribute("href", "https://starter-demo.pycolors.io");
    }
    expect(metadata.alternates?.canonical).toBe("/pricing");
  });

  it("keeps the preview section accessible", async () => {
    render(<PricingPage />);
    const preview = screen.getByRole("region", {
      name: "See the screens you can build on",
    });
    expect((await axe(preview)).violations).toEqual([]);
  });
});
