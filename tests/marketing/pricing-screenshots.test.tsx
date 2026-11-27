import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import PricingPage, {
  generateMetadata as getLocalizedMetadata0,
} from "../../app/[locale]/(site)/pricing/page";
import { STARTER_PRO_MOBILE_PREVIEW } from "@/lib/products/starter-pro-mobile-preview";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";

const metadata = await getLocalizedMetadata0({
  params: Promise.resolve({ locale: "en" }),
});

vi.mock("@/lib/api/client", () => ({
  createStarterProCheckout: vi.fn(),
  createCheckoutSession: vi.fn(),
}));

describe("Starter Pro pricing screenshots", () => {
  it("compares the three source licences together with distinct checkout actions", () => {
    render(<PricingPage />);
    const offers = screen.getByRole("region", {
      name: "Choose a PyColors product",
    });
    expect(within(offers).getAllByRole("article")).toHaveLength(3);
    expect(
      within(offers)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      "Starter Pro Web",
      "Starter Pro Mobile",
      "Starter Pro Fullstack",
    ]);
    expect(within(offers).getAllByRole("button")).toHaveLength(3);
    for (const option of [
      STARTER_PRO_MOBILE_PREVIEW,
      STARTER_PRO_MOBILE_PREVIEW.bundle,
    ]) {
      expect(
        within(offers).getByRole("button", {
          name: `Buy ${option.name} — ${option.priceLabel}`,
        }),
      ).toBeInTheDocument();
      expect(
        within(offers).getByRole("link", { name: option.action }),
      ).toHaveAttribute("href", option.href);
    }
    const schema = JSON.parse(
      document.getElementById("pricing-products-jsonld")!.textContent!,
    );
    expect(schema["@graph"]).toHaveLength(4);
    for (const product of Object.values(PRODUCT_DISPLAY)) {
      expect(JSON.stringify(schema)).toContain(product.name);
    }
  });

  it("keeps offer artwork decorative and product proof separately captioned", () => {
    render(<PricingPage />);
    const offers = screen.getByRole("region", {
      name: "Choose a PyColors product",
    });
    const preview = screen.getByRole("region", {
      name: "See the screens you can build on",
    });
    const otherProducts = screen.getByRole("region", {
      name: "Start with a page. Or explore for free.",
    });
    for (const [name, product, caption] of [
      ["NA-AI Landing", "na-ai-landing", "Illustrative content"],
      ["Starter Free", "starter-free", "Mock data"],
      ["Starter Pro Web", "starter-pro", "Demo workspace"],
    ] as const) {
      const card = within(
        product === "starter-pro" ? offers : otherProducts,
      ).getByRole("article", { name });
      expect(card.querySelector("[data-product-preview]")).toBeNull();
      const artwork = card.querySelector("img");
      expect(artwork).not.toBeNull();
      expect(artwork).toHaveAttribute("alt", "");
      expect(artwork?.closest('[aria-hidden="true"]')).not.toBeNull();
      expect(within(card).queryByRole("img")).not.toBeInTheDocument();

      const media = preview.querySelector(
        `[data-product-preview="${product}"]`,
      );
      expect(media).not.toBeNull();
      expect(media).toHaveAccessibleName();
      const figure = media?.closest("figure");
      expect(figure).not.toBeNull();
      expect(figure?.querySelector("figcaption")).toHaveTextContent(caption);
      expect(media?.querySelectorAll("img")).toHaveLength(2);
    }
  });

  it("renders two captioned, descriptive previews after the comparison", () => {
    render(<PricingPage />);
    const preview = screen.getByRole("region", {
      name: "See the screens you can build on",
    });
    expect(within(preview).getAllByRole("img")).toHaveLength(5);
    for (const [title, alt, file, caption] of [
      [
        "Sign-in screen",
        "Starter Pro sign-in screen with email, password, Google and GitHub options",
        "auth-indigo-2x",
        "email and password fields",
      ],
      [
        "Project work",
        "Starter Pro project with assigned tasks, due dates and a discussion",
        "project-work-coral-2x",
        "assigned tasks, due dates, comments and archiving",
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
      expect(link).toHaveAttribute("href", `/images/starters/pro/${file}.png`);
      expect(link).not.toHaveAttribute("target");
      link.focus();
      expect(link).toHaveFocus();
      expect(image.closest("a")).toHaveAttribute(
        "href",
        link.getAttribute("href"),
      );
    }
    expect(preview.previousElementSibling).toHaveAccessibleName(
      "Compare the template and Web starting points",
    );
    expect(preview.nextElementSibling).toHaveAccessibleName(
      "An assisted start, scoped to your product.",
    );
    expect(preview).toHaveTextContent(
      "not proof of a live deployment, a completed payment, or a verified integration",
    );
    expect(preview).toHaveTextContent("shown in the light theme");
  });

  it("keeps lighter starting points separate from the source licences and distinguishes their scope", () => {
    render(<PricingPage />);
    const offers = screen.getByRole("region", {
      name: "Choose a PyColors product",
    });
    expect(
      within(offers)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      "Starter Pro Web",
      "Starter Pro Mobile",
      "Starter Pro Fullstack",
    ]);
    const otherProducts = screen.getByRole("region", {
      name: "Start with a page. Or explore for free.",
    });
    expect(within(otherProducts).getAllByRole("article")).toHaveLength(2);
    expect(
      within(otherProducts).queryByRole("heading", { name: "Starter Pro Web" }),
    ).not.toBeInTheDocument();
    const table = screen.getByRole("table", {
      name: "Compare NA-AI Landing, Starter Free and Starter Pro features",
    });
    expect(
      within(table)
        .getAllByRole("columnheader")
        .slice(1)
        .map((heading) => heading.textContent),
    ).toEqual([
      `NA-AI Landing${PRODUCT_DISPLAY["na-ai-landing"].priceLabel}One-time payment`,
      "Starter FreeFreePublic repository",
      `Starter Pro${PRODUCT_DISPLAY["starter-pro"].priceLabel}One-time payment`,
    ]);
    for (const [name, values] of [
      [
        "Email & password sign-in",
        ["Not included", "Mock screens only", "Better Auth credentials"],
      ],
      [
        "Stripe Checkout & portal",
        ["Not included", "Not included", "Included"],
      ],
      [
        "Sessions & protected routes",
        [
          "Not included",
          "UI structure only",
          "Revocable sessions & workspace roles",
        ],
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
      name: "Explore the demos",
    })) {
      expect(link).toHaveAttribute("href", "/demo");
    }
    expect(metadata.alternates?.canonical).toBe("/pricing");
  });

  it("connects screen previews to guides and labels the native concept honestly", () => {
    render(<PricingPage />);
    const preview = screen.getByRole("region", {
      name: "See the screens you can build on",
    });
    expect(
      within(preview).getByRole("link", { name: "Explore auth flows" }),
    ).toHaveAttribute("href", "/docs/starter-pro/auth");
    expect(
      within(preview).getByRole("link", {
        name: "Explore the included workflows",
      }),
    ).toHaveAttribute("href", "/docs/starter-pro/what-is-included");
    const mobile = within(preview).getByRole("article", {
      name: STARTER_PRO_MOBILE_PREVIEW.name,
    });
    expect(mobile).toHaveTextContent("Source licence");
    expect(mobile).toHaveTextContent(STARTER_PRO_MOBILE_PREVIEW.description);
    expect(within(mobile).getByRole("link")).toHaveAttribute(
      "href",
      "/starters/mobile",
    );
    expect(within(mobile).queryByRole("button")).toBeNull();
  });

  it("keeps the preview section accessible", async () => {
    render(<PricingPage />);
    const preview = screen.getByRole("region", {
      name: "See the screens you can build on",
    });
    expect((await axe(preview)).violations).toEqual([]);
  });
});
