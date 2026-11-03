import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import ProductStudioPage, {
  metadata,
} from "@/app/(site)/showcase/product-studio/page";
import { ProductStudioReference } from "@/components/marketing/product-studio-reference";
import { productStudio } from "@/lib/showcase/product-studio";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));
beforeEach(() => vi.stubEnv("NEXT_PUBLIC_STARTER_PRO_DEMO_URL", ""));
afterEach(() => vi.unstubAllEnvs());

describe("PyColors-owned product reference", () => {
  it("identifies its creator and synthetic evidence without customer or testimonial schema", () => {
    const { container } = render(<ProductStudioPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText(productStudio.label)).toBeVisible();
    expect(screen.getByText(productStudio.disclosure)).toBeVisible();
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(container.querySelector("blockquote")).toBeNull();
    const data = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    ).map((node) => JSON.parse(node.textContent!));
    expect(data).toHaveLength(1);
    expect(data[0]["@type"]).toBe("BreadcrumbList");
    expect(JSON.stringify(data)).not.toMatch(
      /aggregateRating|reviewRating|testimonial/,
    );
    expect(screen.getByText(/not a customer success story/)).toBeVisible();
  });

  it("gives visitors a reproducible project workflow and accurate adaptation boundaries", () => {
    render(<ProductStudioPage />);
    const workflow = screen.getByRole("region", {
      name: "One release. A clear path through the work.",
    });
    for (const step of productStudio.workflow)
      expect(within(workflow).getByText(step.task)).toBeVisible();
    expect(
      screen.getByText(/Update the project status separately/),
    ).toBeVisible();
    expect(screen.getByText(/they do not restrict visibility/)).toBeVisible();
    expect(
      screen.getByText(
        /contractual approval, automated reminders or a support SLA/,
      ),
    ).toBeVisible();
    expect(screen.getByText(/No email or payment is sent/)).toBeVisible();
    for (const name of ["Try the project workflow", "Open the live demo"]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "href",
        "https://pro-demo.pycolors.io/demo?destination=%2Fprojects",
      );
    }
    expect(
      screen.getByRole("link", { name: "Explore Starter Pro" }),
    ).toHaveAttribute("href", "/starters/pro#purchase");
  });

  it("uses the safe demo-link configuration and retains the recipe when a live target is invalid", () => {
    vi.stubEnv("NEXT_PUBLIC_STARTER_PRO_DEMO_URL", "javascript:alert(1)");
    render(<ProductStudioPage />);
    expect(
      screen.queryByRole("link", { name: "Open the live demo" }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Read the adaptation recipe" }),
    ).toHaveAttribute("href", "/docs/starter-pro/recipes/client-tracking");
  });

  it("exposes one accessible description per real capture and preserves the light/dark assets", () => {
    const { container } = render(<ProductStudioPage />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
    for (const media of Object.values(productStudio.images)) {
      expect(screen.getByRole("img", { name: media.alt })).toBeVisible();
      const captures = [media.light, media.dark].map((path) =>
        readFileSync(resolve("public", path.slice(1))),
      );
      for (const bytes of captures) {
        expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
        expect(bytes.readUInt32BE(16)).toBe(1440);
        expect(bytes.readUInt32BE(20)).toBe(1100);
      }
      expect(captures[0]).not.toEqual(captures[1]);
    }
    for (const image of container.querySelectorAll("img"))
      expect(image).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps crawlable case, product and recipe links and case-specific sharing metadata", () => {
    const html = renderToStaticMarkup(<ProductStudioReference />);
    expect(html).toContain(`href="${productStudio.href}"`);
    expect(html).toContain(productStudio.disclosure);
    expect(metadata.alternates).toEqual({ canonical: productStudio.href });
    expect(metadata.openGraph).toMatchObject({
      url: productStudio.href,
      images: [{ url: productStudio.images.dashboard.light }],
    });
    render(<ProductStudioPage />);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      const href = link.getAttribute("href")!;
      if (href.startsWith("/docs/"))
        expect(
          existsSync(resolve("content", href.slice(1).split("#")[0] + ".mdx")),
          href,
        ).toBe(true);
      else if (href.startsWith("/"))
        expect(
          existsSync(
            resolve("app/(site)", href.slice(1).split("#")[0]!, "page.tsx"),
          ),
          href,
        ).toBe(true);
    }
  });

  it("has no automated accessibility violations on the case or its reusable entry", async () => {
    const page = render(<ProductStudioPage />);
    expect((await axe(page.container)).violations).toEqual([]);
    page.unmount();
    const entry = render(<ProductStudioReference />);
    expect((await axe(entry.container)).violations).toEqual([]);
  });
});
