import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import StarterProPage, { metadata } from "../../app/(site)/starters/pro/page";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";

vi.mock("@/lib/api/client", () => ({ createStarterProCheckout: vi.fn() }));

function renderPreviews() {
  render(<StarterProPage />);
  return screen.getByRole("region", {
    name: "Inspect the screens you can build on",
  });
}

describe("annotated Starter Pro carousel", () => {
  it("preserves all five rotating previews with permanent annotations and original links", () => {
    const region = renderPreviews();
    expect(region.previousElementSibling).toHaveTextContent("Buy Starter Pro");
    const images = within(region).getAllByRole("img");
    expect(images).toHaveLength(5);
    const notes = within(region).getAllByRole("listitem");
    expect(notes).toHaveLength(5);
    for (const [index, [title, file, annotation]] of [
      ["Dashboard", "dashboard", "demonstration data, not customer results"],
      ["Authentication", "auth", "Configure your own provider credentials"],
      [
        "Billing",
        "billing",
        "not evidence of a payment or a verified Stripe integration",
      ],
      [
        "Pricing example",
        "pricing",
        "not the purchase terms for the Starter Pro source package",
      ],
      ["Offline fallback", "pwa", "does not mean every feature works offline"],
    ].entries()) {
      const image = images[index]!;
      expect(image).toHaveAccessibleName(/Starter Pro/u);
      expect(image.parentElement).toHaveClass("animate-hero-fade");
      expect(image.parentElement).toHaveStyle({
        animationDelay: `${index * 5}s`,
      });
      const note = notes[index]!;
      expect(note).toHaveTextContent(annotation!);
      expect(note.closest('[class*="animate-"]')).toBeNull();
      expect(within(note).getByRole("heading", { level: 3 })).toHaveTextContent(
        title!,
      );
      const link = within(note).getByRole("link", {
        name: `View ${title!.toLowerCase()} at full size`,
      });
      expect(link).toHaveAttribute(
        "href",
        `/images/starters/pro/${file}-pycolors.png`,
      );
      expect(link).not.toHaveAttribute("target");
      link.focus();
      expect(link).toHaveFocus();
    }
    expect(region).toHaveTextContent(
      "do not demonstrate a completed payment, a verified integration, or a live production deployment",
    );
  });

  it("preserves the purchase offer and metadata", () => {
    renderPreviews();
    expect(
      screen.getAllByRole("button", {
        name: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      }).length,
    ).toBeGreaterThan(0);
    expect(metadata.alternates?.canonical).toBe("/starters/pro");
  });

  it("has accessible image names, heading structure and links", async () => {
    expect((await axe(renderPreviews())).violations).toEqual([]);
  });
});
