import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import BlogPostPage, {
  generateMetadata,
  generateStaticParams,
} from "../../app/(site)/blog/[slug]/page";
import { ArticleToc } from "@/components/blog/article-toc";
import { ShareArticle } from "@/components/blog/share-article";
import { AuthorBadge } from "@/components/blog/author-badge";

const { getPages, getPage } = vi.hoisted(() => ({
  getPages: vi.fn(),
  getPage: vi.fn(),
}));
vi.mock("@/lib/source", () => ({ blogSource: { getPages, getPage } }));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

function Body() {
  return (
    <>
      <p>Original technical introduction.</p>
      <h2 id="first-decision">First decision</h2>
      <p>Original implementation detail.</p>
      <h3 id="detail">Implementation detail</h3>
      <h2 id="next-decision">Next decision</h2>
      <p>Original conclusion.</p>
    </>
  );
}
const articles = [
  ["older", "2026-01-01"],
  ["current", "2026-02-01"],
  ["newer", "2026-03-01"],
].map(([slug, date]) => ({
  slugs: [slug],
  url: `/blog/${slug}`,
  data: {
    title: `A practical engineering article: ${slug}`,
    description: "An original summary.",
    author: "Patrice Parny",
    date,
    category: "Next.js",
    tags: [" Design Tokens ", "design tokens", "Next.js"],
    readingTime: "12 min read",
    featured: false,
    cover: "/seo/blog/og-blog-saas.png",
    cta: {
      label: "Try the Theme Builder",
      href: "/tools/theme-builder",
      variant: "theme-builder",
    },
    body: Body,
    toc: [
      { title: "First decision", url: "#first-decision", depth: 2 },
      { title: "Implementation detail", url: "#detail", depth: 3 },
      { title: "Next decision", url: "#next-decision", depth: 2 },
    ],
  },
}));

beforeEach(() => {
  getPages.mockReturnValue(articles);
  getPage.mockImplementation(([slug]: string[]) =>
    articles.find((article) => article.slugs[0] === slug),
  );
  window.history.replaceState(null, "", "/");
});
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

async function renderPage() {
  return render(
    await BlogPostPage({ params: Promise.resolve({ slug: "current" }) }),
  );
}

describe("blog article reading layout", () => {
  it("keeps a single skip target and article title, source content, tags and author details", async () => {
    await renderPage();
    expect(screen.getByRole("main")).toHaveAttribute("id", "content");
    expect(screen.getByRole("main")).toHaveAttribute("tabindex", "-1");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const article = screen.getByRole("article", {
      name: articles[1]!.data.title,
    });
    expect(article).toHaveTextContent("Original technical introduction.");
    expect(article).toHaveTextContent("Original implementation detail.");
    expect(article).toHaveTextContent("Original conclusion.");
    expect(screen.getAllByText("Patrice Parny").length).toBeGreaterThan(0);
    expect(document.querySelector("header time")).toHaveAttribute(
      "datetime",
      "2026-02-01",
    );
    const tags = within(
      screen.getByRole("navigation", { name: "Article tags" }),
    ).getAllByRole("link");
    expect(tags.map((tag) => tag.getAttribute("href"))).toEqual([
      "/blog/tags/design-tokens",
      "/blog/tags/next.js",
    ]);
    for (const tag of tags)
      expect(tag.querySelector('[data-slot="badge"]')).not.toBeNull();
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
    }
  });

  it("uses generated top-level headings and keeps adjacent/related routes and the contextual resource", async () => {
    await renderPage();
    const nav = screen.getAllByRole("navigation", { name: "On this page" })[0]!;
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "#first-decision",
      "#next-decision",
    ]);
    for (const link of links)
      expect(
        document.getElementById(link.getAttribute("href")!.slice(1)),
      ).not.toBeNull();
    const pagination = screen.getByRole("navigation", {
      name: "More articles",
    });
    expect(
      within(pagination).getByRole("link", { name: /Previous article/ }),
    ).toHaveAttribute("href", "/blog/older");
    expect(
      within(pagination).getByRole("link", { name: /Next article/ }),
    ).toHaveAttribute("href", "/blog/newer");
    expect(
      screen.getByRole("link", { name: "Try the Theme Builder" }),
    ).toHaveAttribute("href", "/tools/theme-builder");
    expect(
      within(
        screen.getByRole("region", { name: "More on this topic." }),
      ).getAllByRole("article"),
    ).toHaveLength(2);
    expect(screen.queryByText("Why it matters:")).toBeNull();
  });

  it("preserves per-article SEO, structured data and static routes", async () => {
    expect(await generateStaticParams()).toEqual([
      { slug: "newer" },
      { slug: "current" },
      { slug: "older" },
    ]);
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "current" }),
    });
    expect(metadata.alternates?.canonical).toMatch(/\/blog\/current$/);
    expect(metadata.description).toBe("An original summary.");
    await renderPage();
    const jsonLd = JSON.parse(
      document.getElementById("article-jsonld")!.textContent!,
    );
    expect(jsonLd).toMatchObject({
      "@type": "Article",
      headline: articles[1]!.data.title,
      datePublished: "2026-02-01",
      author: { name: "Patrice Parny" },
    });
  });

  it("handles an article without a TOC, CTA or related posts without empty sections", async () => {
    const onlyArticle = {
      ...articles[1]!,
      data: { ...articles[1]!.data, toc: [], cta: undefined, tags: [] },
    };
    getPages.mockReturnValue([onlyArticle]);
    getPage.mockReturnValue(onlyArticle);
    await renderPage();
    expect(screen.queryByRole("complementary")).toBeNull();
    expect(
      screen.queryByRole("navigation", { name: "Article tags" }),
    ).toBeNull();
    expect(
      screen.queryByRole("navigation", { name: "More articles" }),
    ).toBeNull();
    expect(
      screen.queryByRole("region", { name: "More on this topic." }),
    ).toBeNull();
    expect(
      screen.getByRole("link", { name: "Back to all articles" }),
    ).toHaveAttribute("href", "/blog");
  });

  it("retains the missing-article boundary", async () => {
    await expect(
      BlogPostPage({ params: Promise.resolve({ slug: "missing" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(
      await generateMetadata({ params: Promise.resolve({ slug: "missing" }) }),
    ).toEqual({ title: "Post not found" });
  });

  it("has no automated accessibility violations", async () => {
    const { container } = await renderPage();
    expect(await axe(container)).toHaveNoViolations();
  });

  it("does not assign the founder role to other authors", () => {
    render(<AuthorBadge name="Guest Author" />);
    expect(screen.getByText("Author")).toBeVisible();
    expect(screen.queryByText("Founder of PyColors")).toBeNull();
  });
});

describe("article sharing", () => {
  it("copies the canonical link and title/link post with announced feedback", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(
      <ShareArticle
        title="Practical article"
        url="https://pycolors.io/blog/practical"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Article link copied.",
      ),
    );
    expect(writeText).toHaveBeenLastCalledWith(
      "https://pycolors.io/blog/practical",
    );
    fireEvent.click(screen.getByRole("button", { name: "Copy post" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(
        "Title and link copied.",
      ),
    );
    expect(writeText).toHaveBeenLastCalledWith(
      "Practical article\n\nhttps://pycolors.io/blog/practical",
    );
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "rel",
      "noreferrer noopener",
    );
    expect(screen.getByRole("link", { name: /on X/ })).toHaveAttribute(
      "href",
      "https://twitter.com/intent/tweet?text=Practical%20article&url=https%3A%2F%2Fpycolors.io%2Fblog%2Fpractical",
    );
  });

  it("reports clipboard failure without claiming a successful copy", async () => {
    vi.stubGlobal("navigator", {
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
    });
    render(<ShareArticle title="Practical article" url="/blog/practical" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent("Copy unavailable."),
    );
    expect(screen.getByRole("button", { name: "Copy link" })).toBeEnabled();
  });
});

describe("article reading position", () => {
  it("tracks the heading above the reading line, including long sections, without changing focus or the URL", async () => {
    let firstTop = 200;
    let nextTop = 2000;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
      function (this: HTMLElement) {
        return { top: this.id === "first" ? firstTop : nextTop } as DOMRect;
      },
    );
    render(
      <>
        <h2 id="first">First section</h2>
        <h2 id="next">Next section</h2>
        <ArticleToc
          items={[
            { url: "#first", title: "First section" },
            { url: "#next", title: "Next section" },
          ]}
        />
      </>,
    );
    const nav = screen.getAllByRole("navigation", { name: "On this page" })[0]!;
    const firstLink = within(nav).getByRole("link", { name: "First section" });
    const nextLink = within(nav).getByRole("link", { name: "Next section" });
    firstLink.focus();
    firstTop = -800;
    nextTop = 700;
    fireEvent.scroll(window);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });
    expect(firstLink).toHaveAttribute("aria-current", "location");
    nextTop = 96;
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(nextLink).toHaveAttribute("aria-current", "location"),
    );
    expect(document.activeElement).toBe(firstLink);
    expect(window.location.hash).toBe("");
    nextTop = 500;
    fireEvent.scroll(window);
    await waitFor(() =>
      expect(firstLink).toHaveAttribute("aria-current", "location"),
    );
  });

  it("closes the mobile disclosure for an ordinary anchor click and respects modified clicks", () => {
    const { container } = render(
      <ArticleToc items={[{ url: "#first", title: "First section" }]} />,
    );
    const details = container.querySelector("details")!;
    details.open = true;
    const link = within(details).getByRole("link", { name: "First section" });
    fireEvent.click(link, { ctrlKey: true });
    expect(details.open).toBe(true);
    fireEvent.click(link);
    expect(details.open).toBe(false);
    expect(link).toHaveAttribute("href", "#first");
  });
});

describe("article code and MDX rendering", () => {
  it("keeps the complete highlighted code copyable inside a named keyboard-accessible viewport", async () => {
    const { getBlogMDXComponents } =
      await import("@/components/blog/mdx-components");
    const Code = getBlogMDXComponents().pre as React.ComponentType<
      React.ComponentProps<"pre">
    >;
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    const { container } = render(
      <Code title="app/example.tsx" data-language="tsx">
        <code>
          <span className="line">const example = true;</span>
          {"\n"}
          <span className="line">export default example;</span>
        </code>
      </Code>,
    );
    expect(
      screen.getByRole("region", { name: "Code: app/example.tsx" }),
    ).toHaveAttribute("tabindex", "0");
    expect(container.querySelector("figure")).toHaveAttribute(
      "data-language",
      "tsx",
    );
    expect(container.querySelectorAll(".line")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "Copy Text" }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(
        "const example = true;\nexport default example;",
      ),
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives untitled code blocks a header and a named viewport", async () => {
    const { getBlogMDXComponents } =
      await import("@/components/blog/mdx-components");
    const Code = getBlogMDXComponents().pre as React.ComponentType<
      React.ComponentProps<"pre">
    >;
    render(
      <Code>
        <code>pnpm build</code>
      </Code>,
    );
    expect(
      screen.getByRole("region", { name: "Code example" }),
    ).toHaveTextContent("pnpm build");
    expect(document.querySelector("figcaption")).toHaveTextContent(
      "Code example",
    );
  });

  it("keeps fragment links in the article and external links safely separate", async () => {
    const { getBlogMDXComponents } =
      await import("@/components/blog/mdx-components");
    const Anchor = getBlogMDXComponents().a as React.ComponentType<
      React.ComponentProps<"a">
    >;
    render(
      <>
        <Anchor href="#first-decision">Jump to decision</Anchor>
        <Anchor href="/docs">Docs</Anchor>
        <Anchor href="https://example.com/reference">Reference</Anchor>
      </>,
    );
    expect(
      screen.getByRole("link", { name: "Jump to decision" }),
    ).not.toHaveAttribute("target");
    expect(screen.getByRole("link", { name: "Docs" })).not.toHaveAttribute(
      "target",
    );
    expect(screen.getByRole("link", { name: "Reference" })).toHaveAttribute(
      "target",
      "_blank",
    );
    expect(screen.getByRole("link", { name: "Reference" })).toHaveAttribute(
      "rel",
      "noreferrer noopener",
    );
  });

  it("makes wide article tables keyboard accessible and preserves caller classes", async () => {
    const { getBlogMDXComponents } =
      await import("@/components/blog/mdx-components");
    const Table = getBlogMDXComponents().table as React.ComponentType<
      React.ComponentProps<"table">
    >;
    render(
      <Table className="custom-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary</td>
            <td>Action surface</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(
      screen.getByRole("region", { name: "Article table" }),
    ).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("table")).toHaveClass("custom-table");
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
  });
});
