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

describe("annotated Starter Pro previews", () => {
  it("keeps both uncropped previews and their annotations available beside the purchase decision", () => {
    const region = renderPreviews();
    expect(region.previousElementSibling).toHaveTextContent("Buy Starter Pro");
    expect(within(region).getAllByRole("img")).toHaveLength(2);
    for (const [alt, title, file, annotation] of [
      [
        "Starter Pro sign-in screen with email, password, Google and GitHub options",
        "Sign-in screen",
        "auth",
        "Email and password form",
      ],
      [
        "Starter Pro offline screen with reload and dashboard links",
        "Offline fallback",
        "pwa",
        "A clear connection state",
      ],
    ]) {
      const image = within(region).getByRole("img", { name: alt });
      const caption = image.closest("figure")?.querySelector("figcaption");
      expect(caption).toHaveTextContent(title!);
      expect(caption).toHaveTextContent(annotation!);
      expect(caption?.querySelectorAll("li")).toHaveLength(2);
      const link = within(region).getByRole("link", {
        name: `View ${title!.toLowerCase()} at full size`,
      });
      expect(link).toHaveAttribute(
        "href",
        `/images/starters/pro/${file}-pycolors.png`,
      );
      link.focus();
      expect(link).toHaveFocus();
      expect(image).not.toHaveClass("object-cover");
    }
    expect(region.querySelector('[class*="animate-"]')).toBeNull();
    expect(region).toHaveTextContent("Configure your own provider credentials");
    expect(region).toHaveTextContent(
      "does not mean every feature works offline",
    );
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
