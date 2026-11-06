import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import ImplementationExamplePage, {
  generateMetadata as getLocalizedMetadata0,
} from "@/app/[locale]/(site)/starters/pro/implementation-example/page";
import { GET } from "@/app/[locale]/(site)/starters/pro/implementation-example/handover/route";
import {
  implementationExample,
  createExampleHandover,
} from "@/lib/products/implementation-example";
import { STARTER_PRO_SERVICES } from "@/lib/products/starter-pro-services";
import { quoteService } from "@/lib/quotes/quote-request";

const metadata = await getLocalizedMetadata0({
  params: Promise.resolve({ locale: "en" }),
});

const source = resolve("app/[locale]/(site)");

describe("scoped implementation delivery example", () => {
  it("shows two concrete scopes at the central service prices, with correct quote selection", () => {
    render(<ImplementationExamplePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText(implementationExample.disclosure)).toBeVisible();
    for (const service of Object.values(STARTER_PRO_SERVICES)) {
      const scope = screen.getByRole("article", {
        name: service.example.title,
      });
      expect(scope).toHaveAttribute("id", service.id);
      expect(within(scope).getByText(service.priceLabel)).toBeVisible();
      const href = within(scope)
        .getByRole("link", { name: service.action })
        .getAttribute("href")!;
      expect(href).toBe(service.href);
      expect(
        quoteService(
          new URL(href, "https://pycolors.io").searchParams.get("service"),
        ),
      ).toBe(service.id);
      expect(service.example.href).toBe(
        `${implementationExample.href}#${service.id}`,
      );
    }
    expect(
      screen.getByText(/Source licence and provider costs/i, { exact: false }),
    ).toBeVisible();
  });

  it("separates expected checks from observed results and keeps an editable handover available", () => {
    render(<ImplementationExamplePage />);
    expect(
      screen.getByText("Not run · Results to complete at acceptance"),
    ).toBeVisible();
    for (const row of implementationExample.acceptance)
      expect(
        screen.getByRole("heading", {
          level: 3,
          name: row.journey,
        }),
      ).toBeVisible();
    for (const row of implementationExample.handover)
      expect(
        screen.getByRole("heading", { level: 3, name: row.title }),
      ).toBeVisible();
    const downloads = screen.getAllByRole("link", {
      name: "Download example handover",
    });
    expect(downloads).toHaveLength(2);
    for (const link of downloads) {
      expect(link).toHaveAttribute("href", implementationExample.downloadHref);
      expect(link).toHaveAttribute("download");
    }
    expect(
      screen.getByRole("region", { name: "Example environment configuration" }),
    ).toHaveAttribute("tabindex", "0");
  });

  it("downloads a real document with UTF-8, the four records and no completed-result claim", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    try {
      const response = await GET(
        new Request(
          "https://pycolors.io/starters/pro/implementation-example/handover",
        ),
        { params: Promise.resolve({ locale: "en" }) },
      );
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe(
        "text/markdown; charset=utf-8",
      );
      expect(response.headers.get("content-disposition")).toBe(
        `attachment; filename="${implementationExample.filename}"`,
      );
      expect(response.headers.get("x-content-type-options")).toBe("nosniff");
      expect(response.headers.get("x-robots-tag")).toBe("noindex");
      const text = await response.text();
      expect(text).toBe(createExampleHandover());
      expect(text.split("\n").length).toBeGreaterThan(80);
      for (const heading of [
        "1. Agreed scope",
        "2. Environment configuration record",
        "3. Acceptance record",
        "4. Team handover",
      ])
        expect(text).toContain(`## ${heading}`);
      for (const service of Object.values(STARTER_PRO_SERVICES))
        expect(text).toContain(service.priceLabel);
      expect(text).toContain("Result: NOT RUN");
      expect(text).not.toMatch(
        /Result: (PASS|SUCCESS)|customer delivery completed/i,
      );
      expect(text).toContain(
        "Delivered revision: [record the exact release/commit]",
      );
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally {
      fetchSpy.mockRestore();
    }
  });

  it("has crawlable links, working fragment destinations and a distinct canonical page", () => {
    render(<ImplementationExamplePage />);
    expect(metadata.alternates).toMatchObject({
      canonical: implementationExample.href,
    });
    expect(metadata.openGraph).toMatchObject({
      url: implementationExample.href,
    });
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      const href = link.getAttribute("href")!;
      if (href.startsWith("#")) {
        expect(document.getElementById(href.slice(1)), href).not.toBeNull();
        continue;
      }
      if (!href.startsWith("/")) continue;
      const path = href.split(/[?#]/)[0]!.slice(1);
      const candidates = path.startsWith("docs/")
        ? [resolve("content", path + ".mdx")]
        : [
            resolve(source, path, "page.tsx"),
            resolve(source, path, "route.ts"),
          ];
      expect(
        candidates.some((file) => existsSync(file)),
        href,
      ).toBe(true);
    }
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(<ImplementationExamplePage />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
