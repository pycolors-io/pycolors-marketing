// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { createDocsMetadata } from "@/lib/seo/docs";

const { getPages, getAllPosts } = vi.hoisted(() => ({
  getPages: vi.fn(),
  getAllPosts: vi.fn(),
}));
vi.mock("@/lib/source", () => ({ source: { getPages } }));
vi.mock("@/lib/blog/utils", () => ({
  getAllPosts,
  getAllCategories: () => ["Next.js"],
  getAllTags: () => ["Design tokens"],
  normalizeTaxonomy: (value: string) =>
    value.toLowerCase().replaceAll(" ", "-"),
}));

beforeEach(() => {
  getPages.mockReturnValue([
    { url: "/docs", data: { title: "Documentation" } },
    { url: "/docs/ui/button", data: { lastUpdated: "2026-09-25" } },
    { url: "/docs/ui/card", data: { lastUpdated: "invalid" } },
    { url: "/docs/ui/alert", data: { lastUpdated: new Date("2026-09-20") } },
    { url: "/docs/draft", data: { draft: true } },
    { url: "/docs/private", data: { private: true } },
  ]);
  getAllPosts.mockReturnValue([
    { url: "/blog/design-tokens", date: "2026-09-25" },
    { url: "/blog/undated", date: "" },
    { url: "/blog/invalid-date", date: "invalid" },
  ]);
});
afterEach(() => vi.useRealTimers());

describe("documentation search and sharing metadata", () => {
  it.each([
    ["/docs", "Documentation", "/og/docs/image.png"],
    ["/docs/ui/button", "Button", "/og/docs/ui/button/image.png"],
  ])("gives %s its own canonical and social preview", (url, title, image) => {
    const metadata = createDocsMetadata({
      title,
      description: "Page-specific documentation.",
      url,
      image,
    });
    expect(metadata.title).toEqual({ absolute: `${title} · Docs · PyColors` });
    expect(metadata.alternates).toEqual({ canonical: url });
    expect(metadata.openGraph).toMatchObject({
      url,
      title: `${title} · Docs · PyColors`,
      description: "Page-specific documentation.",
      images: [{ url: image, width: 1200, height: 630 }],
    });
    expect(metadata.twitter).toMatchObject({
      title: `${title} · Docs · PyColors`,
      description: "Page-specific documentation.",
      images: [{ url: image }],
    });
  });

  it("does not repeat the brand when the document title already includes it", () => {
    const metadata = createDocsMetadata({
      title: "PyColors Documentation",
      url: "/docs",
      image: "/og/docs/image.png",
    });
    expect(metadata.title).toEqual({ absolute: "PyColors Documentation" });
    expect(metadata.openGraph).toMatchObject({
      title: "PyColors Documentation",
    });
    expect(metadata.twitter).toMatchObject({ title: "PyColors Documentation" });
  });
});

describe("sitemap date integrity", () => {
  it("does not announce content updates just because a new build ran", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-09T00:00:00Z"));
    const first = sitemap();
    vi.setSystemTime(new Date("2026-10-10T00:00:00Z"));
    expect(sitemap()).toEqual(first);
  });

  it("preserves known dates and omits missing or invalid dates", () => {
    const entries = new Map(sitemap().map((entry) => [entry.url, entry]));
    for (const path of ["/docs/ui/button", "/blog/design-tokens"]) {
      expect(entries.get(`https://pycolors.io${path}`)?.lastModified).toEqual(
        new Date("2026-09-25"),
      );
    }
    expect(
      entries.get("https://pycolors.io/docs/ui/alert")?.lastModified,
    ).toEqual(new Date("2026-09-20"));
    for (const path of [
      "",
      "/pricing",
      "/docs",
      "/docs/ui/card",
      "/blog/undated",
      "/blog/invalid-date",
      "/blog/categories/next.js",
      "/blog/tags/design-tokens",
    ]) {
      const entry = entries.get(`https://pycolors.io${path}`);
      expect(entry).toBeDefined();
      expect(entry?.lastModified).toBeUndefined();
    }
  });

  it("includes only unique public URLs and leaves transactional routes out", () => {
    getPages.mockReturnValue([
      ...getPages(),
      { url: "/docs", data: { title: "Documentation" } },
    ]);
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const excluded of [
      "https://pycolors.io/docs/draft",
      "https://pycolors.io/docs/private",
      "https://pycolors.io/orders/claim",
      "https://pycolors.io/checkout/success",
    ])
      expect(urls).not.toContain(excluded);
    expect(urls.every((url) => url.startsWith("https://pycolors.io"))).toBe(
      true,
    );
  });
});
