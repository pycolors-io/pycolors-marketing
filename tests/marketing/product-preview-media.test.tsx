import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { ProductPreviewMedia } from "@/components/marketing/product-preview-media";
import { PRODUCT_PREVIEW_MEDIA } from "@/lib/products/product-preview-media";

describe("shared commercial product media", () => {
  it.each(["na-ai-landing", "starter-free", "starter-pro"] as const)(
    "renders %s with both captures and one accessible image",
    (product) => {
      const { container } = render(<ProductPreviewMedia product={product} />);
      const preview = screen.getByRole("img", {
        name: PRODUCT_PREVIEW_MEDIA[product].alt,
      });
      expect(preview).toHaveAttribute("data-product-preview", product);
      const images = container.querySelectorAll("img");
      expect(images).toHaveLength(2);
      expect(images[0]?.getAttribute("src")).toContain(
        PRODUCT_PREVIEW_MEDIA[product].light.split("/").at(-1)!,
      );
      expect(images[1]?.getAttribute("src")).toContain(
        PRODUCT_PREVIEW_MEDIA[product].dark.split("/").at(-1)!,
      );
      for (const image of images) {
        expect(image).toHaveAttribute("alt", "");
        expect(image).toHaveAttribute("aria-hidden", "true");
      }
    },
  );

  it("preserves image accessibility without requiring client hydration", async () => {
    const { container } = render(<ProductPreviewMedia product="starter-pro" />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
