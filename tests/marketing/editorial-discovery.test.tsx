import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { axe } from "vitest-axe";

import BlogPage, { metadata as blogMetadata } from "../../app/(site)/blog/page";
import GuidesPage, {
  metadata as guidesMetadata,
} from "../../app/(site)/guides/page";
import { getAllPosts } from "@/lib/blog/utils";
import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { trackMoneyPathEvent } from "@/lib/analytics";
import contracts from "./fixtures/editorial-discovery.json";

const { getPages } = vi.hoisted(() => {
  vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com");
  return { getPages: vi.fn() };
});
vi.mock("@/lib/source", () => ({ blogSource: { getPages } }));
vi.mock("@/lib/analytics", () => ({ trackMoneyPathEvent: vi.fn() }));

// Deliberately unsorted, with four featured articles and a newer non-featured
// article. Real loaders/cards must retain the limit and featured/latest overlap.
const articleFixtures = [
  ["old-featured", "2026-01-01", true],
  ["newest", "2026-01-05", false],
  ["featured-middle", "2026-01-03", true],
  ["featured-newest", "2026-01-04", true],
  ["featured-earlier", "2026-01-02", true],
].map(([slug, date, featured]) => ({
  slugs: [slug],
  url: `/blog/${slug}`,
  data: {
    title: `Architecture and product implementation decisions: ${slug}`,
    description: `A controlled, detailed summary of the decisions in ${slug}.`,
    date,
    featured,
    author: "Editorial fixture author",
    category: slug === "newest" ? "Product UX" : "Architecture",
    tags: [
      " Team workflows ",
      "Accessibility",
      "Accessibility",
      ...Array.from(
        { length: 12 },
        (_, i) => `Tag ${String(i + 1).padStart(2, "0")}`,
      ),
    ],
    readingTime: "7 min read",
    cover: "/fixture-cover.png",
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  getPages.mockReturnValue(articleFixtures);
  vi.stubGlobal("fetch", vi.fn());
  window.history.replaceState(null, "", "/");
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, "", "/");
});
afterAll(() => vi.unstubAllEnvs());

function expectBefore(first: Element, second: Element) {
  expect(
    first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING,
  ).toBeTruthy();
}

function articleUrls(region: HTMLElement) {
  return within(region)
    .getAllByRole("heading", { level: 3 })
    .flatMap((heading) => {
      const link = within(heading).queryByRole("link");
      return link ? [link.getAttribute("href")] : [];
    });
}

const pages = [
  ["blog", BlogPage, blogMetadata, "Technical articles for developers"],
  [
    "guides",
    GuidesPage,
    guidesMetadata,
    "SaaS building guides for developers.",
  ],
] as const;

describe("editorial discovery", () => {
  for (const [route, Page, metadata, title] of pages) {
    it(`${route} preserves metadata and provides one H1, a skip target and named links`, () => {
      render(<Page />);
      expect(metadata).toEqual(contracts[route].metadata);
      const main = screen.getByRole("main");
      expect(main).toHaveAttribute("id", "content");
      expect(main).toHaveAttribute("tabindex", "-1");
      expect(document.querySelectorAll("#content")).toHaveLength(1);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        title,
      );
      for (const link of within(main).getAllByRole("link")) {
        expect(link).toHaveAccessibleName();
        expect(link.querySelector("a,button")).toBeNull();
      }
      for (const region of within(main).getAllByRole("region")) {
        expect(region).toHaveAccessibleName();
      }
      expect(fetch).not.toHaveBeenCalled();
    });

    it(`${route} has no automated accessibility violations`, async () => {
      const { container } = render(<Page />);
      expect(await axe(container)).toHaveNoViolations();
    }, 15_000);
  }

  it("puts featured then latest before explanation and retains their source-defined order and overlap", () => {
    render(<BlogPage />);
    const featured = screen.getByRole("region", { name: "Featured articles" });
    const latest = screen.getByRole("region", { name: "Latest articles" });
    const explanation = screen.getByRole("region", {
      name: "Real implementation work turned into durable technical content.",
    });
    expectBefore(featured, latest);
    expectBefore(latest, explanation);
    expectBefore(
      explanation,
      screen.getByRole("region", {
        name: "How the blog fits the PyColors path",
      }),
    );
    expect(
      screen.getByRole("link", { name: "Browse articles" }),
    ).toHaveAttribute("href", "#featured-articles");
    expect(articleUrls(featured)).toEqual([
      "/blog/featured-newest",
      "/blog/featured-middle",
      "/blog/featured-earlier",
    ]);
    expect(articleUrls(latest)).toEqual([
      "/blog/newest",
      "/blog/featured-newest",
      "/blog/featured-middle",
      "/blog/featured-earlier",
      "/blog/old-featured",
    ]);
    for (const fixture of articleFixtures) {
      const title = within(latest).getByRole("link", {
        name: fixture.data.title,
      });
      const card = title.closest('[data-slot="card"]')!;
      expect(card).toHaveTextContent(fixture.data.description);
      expect(card).toHaveTextContent(fixture.data.category);
      expect(card).toHaveTextContent("7 min read");
      expect(card).toHaveTextContent(
        new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
          new Date(String(fixture.data.date)),
        ),
      );
      expect(
        within(card as HTMLElement).getByRole("link", { name: "Read article" }),
      ).toHaveAttribute("href", fixture.url);
    }
    // Author/cover remain in the source contract; the specialized card's existing
    // presentation does not render them. This migration must not invent them.
    expect(getAllPosts()).toEqual(
      expect.arrayContaining(
        articleFixtures.map((fixture) =>
          expect.objectContaining({
            slug: fixture.slugs[0],
            url: fixture.url,
            title: fixture.data.title,
            description: fixture.data.description,
            date: fixture.data.date,
            author: fixture.data.author,
            cover: fixture.data.cover,
          }),
        ),
      ),
    );
  });

  it("keeps real category/tag links, alphabetical taxonomy and the existing 12-tag limit", () => {
    render(<BlogPage />);
    const sidebar = screen.getByRole("complementary");
    const categoryLinks = within(sidebar)
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("/blog/categories/"));
    expect(
      categoryLinks.map((a) => [a.textContent, a.getAttribute("href")]),
    ).toEqual([
      ["Architecture", "/blog/categories/architecture"],
      ["Product UX", "/blog/categories/product-ux"],
    ]);
    const tagLinks = within(sidebar)
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("/blog/tags/"));
    expect(tagLinks.map((a) => a.textContent)).toEqual([
      "Accessibility",
      ...Array.from(
        { length: 11 },
        (_, i) => `Tag ${String(i + 1).padStart(2, "0")}`,
      ),
    ]);
    expect(tagLinks[0]).toHaveAttribute("href", "/blog/tags/accessibility");
    expect(tagLinks[11]).toHaveAttribute("href", "/blog/tags/tag-11");
  });

  it("omits featured when none are selected and sends Browse articles to latest", () => {
    getPages.mockReturnValue(
      articleFixtures.map((page) => ({
        ...page,
        data: { ...page.data, featured: false },
      })),
    );
    render(<BlogPage />);
    expect(
      screen.queryByRole("region", { name: "Featured articles" }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Browse articles" }),
    ).toHaveAttribute("href", "#latest-articles");
    expect(
      articleUrls(screen.getByRole("region", { name: "Latest articles" })),
    ).toHaveLength(5);
  });

  it("retains the existing empty state without inventing articles or taxonomy", () => {
    getPages.mockReturnValue([]);
    render(<BlogPage />);
    expect(
      screen.queryByRole("region", { name: "Featured articles" }),
    ).toBeNull();
    const latest = screen.getByRole("region", { name: "Latest articles" });
    expect(within(latest).getByText("No articles found yet.")).toBeVisible();
    expect(articleUrls(latest)).toEqual([]);
    expect(
      within(screen.getByRole("complementary"))
        .getAllByRole("link")
        .every((a) => !a.getAttribute("href")?.startsWith("/blog/")),
    ).toBe(true);
    expect(
      screen.getByRole("link", { name: "Browse articles" }),
    ).toHaveAttribute("href", "#latest-articles");
  });

  it("shows the eight curated guides before explanation with intact data/order and descriptive card links", () => {
    render(<GuidesPage />);
    const collection = screen.getByRole("region", {
      name: "Focused guides for the surfaces and systems that matter most in SaaS",
    });
    expectBefore(
      collection,
      screen.getByRole("region", { name: "Why these guides exist" }),
    );
    expect(screen.getByRole("link", { name: "Browse guides" })).toHaveAttribute(
      "href",
      "#browse-guides",
    );
    const headings = within(collection).getAllByRole("heading", { level: 3 });
    expect(headings.map((h) => h.textContent)).toEqual(
      contracts.guides.guides.map((g) => g.title),
    );
    contracts.guides.guides.forEach((guide, i) => {
      const link = headings[i]!.closest("a")!;
      expect(link).toHaveAccessibleName(expect.stringContaining(guide.title));
      expect(link).toHaveAttribute("href", guide.href);
      expect(link).toHaveTextContent(guide.description);
      expect(link).toHaveTextContent(guide.category);
      expect(link.querySelector("a,button")).toBeNull();
    });
  });

  const commerceCases = [
    {
      route: "blog",
      Page: BlogPage,
      index: 0,
      label: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      count: 2,
    },
    {
      route: "blog",
      Page: BlogPage,
      index: 1,
      label: `Buy Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      count: 2,
    },
    {
      route: "guides",
      Page: GuidesPage,
      index: 0,
      label: `Starter Pro — ${PRODUCT_DISPLAY["starter-pro"].priceLabel}`,
      count: 1,
    },
  ];
  it.each(commerceCases)(
    "$route purchase control $index retains the real checkout payload, pending state and destination",
    async ({ route, Page, index, label, count }) => {
      window.history.replaceState(null, "", `/${route}`);
      let completeCheckout!: (response: Response) => void;
      vi.mocked(fetch).mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            completeCheckout = resolve;
          }),
      );
      render(<Page />);
      const buttons = screen.getAllByRole("button", { name: label });
      expect(buttons).toHaveLength(count);
      const button = buttons[index]!;
      expectBefore(screen.getByRole("heading", { level: 1 }), button);
      expectBefore(screen.getAllByRole("heading", { level: 3 })[0]!, button);
      fireEvent.click(button);
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
      fireEvent.click(button);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        "https://api.example.com/api/v1/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productSlug: "starter-pro" }),
        },
      );
      completeCheckout(
        new Response(JSON.stringify({ url: "#controlled-checkout" }), {
          status: 200,
        }),
      );
      await waitFor(() =>
        expect(window.location.hash).toBe("#controlled-checkout"),
      );
      expect(trackMoneyPathEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          event: "checkout_redirect_started",
          productSlug: "starter-pro",
          page: `/${route}`,
        }),
      );
      expect(screen.queryByRole("alert")).toBeNull();
    },
  );
});
