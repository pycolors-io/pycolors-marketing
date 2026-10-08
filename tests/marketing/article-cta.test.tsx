import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { axe } from "vitest-axe";
import type { z } from "zod";

import { blog } from "../../source.config";
import { ArticleCTA } from "@/components/blog/article-cta";
import { getAllPosts } from "@/lib/blog/utils";
import type { blogSource, source } from "@/lib/source";
import type { BlogCTA } from "@/types/blog";

const { getPages } = vi.hoisted(() => ({ getPages: vi.fn() }));
vi.mock("@/lib/source", () => ({ blogSource: { getPages } }));

const schema = (() => {
  const schema = blog.schema;
  if (!schema || typeof schema === "function") {
    throw new Error("The blog collection must expose its frontmatter schema.");
  }
  return schema;
})();

const article = {
  title: "Controlled article",
  description: "A small source fixture for the article-to-product handoff.",
  author: "Fixture author",
  date: "2026-01-01",
  category: "Design Systems",
};

const themeCTA = {
  label: "Try the Theme Builder",
  href: "/tools/theme-builder",
  variant: "theme-builder",
} satisfies BlogCTA;

function loadArticle(cta?: BlogCTA) {
  const data = schema.parse({ ...article, cta });
  getPages.mockReturnValue([
    { slugs: ["controlled-article"], url: "/blog/controlled-article", data },
  ]);
  const post = getAllPosts()[0];
  if (!post) throw new Error("Expected the validated source article.");
  return post;
}

beforeEach(() => getPages.mockReset());

describe("blog CTA schema and source mapping", () => {
  it.each(["free", "pro", "blocks", "theme-builder"] as const)(
    "preserves the validated %s variant through the loader",
    (variant) => {
      // Deliberately unrelated URL: product identity comes from the variant.
      const cta = { label: "Explore this resource", href: "/fixture", variant };
      expect(loadArticle(cta).cta).toEqual(cta);
    },
  );

  it("keeps the legacy free default for omitted variants", () => {
    expect(
      loadArticle({ label: "Start building", href: "/starters" }).cta,
    ).toEqual({ label: "Start building", href: "/starters", variant: "free" });
  });

  it("preserves an absent CTA and renders nothing", () => {
    const post = loadArticle();
    expect(post.cta).toBeUndefined();
    expect(
      render(<ArticleCTA cta={post.cta} />).container,
    ).toBeEmptyDOMElement();
  });

  it.each(["unsupported", "", null, 42])(
    "rejects unsupported variant %j at the frontmatter boundary",
    (variant) => {
      const result = schema.safeParse({
        ...article,
        cta: { ...themeCTA, variant },
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ path: ["cta", "variant"] }),
          ]),
        );
      }
    },
  );

  it("retains precise generated blog and documentation source inference", () => {
    type BlogData = ReturnType<typeof blogSource.getPages>[number]["data"];
    type DocsData = ReturnType<typeof source.getPages>[number]["data"];
    type ParsedCTA = z.output<typeof schema>["cta"];

    expectTypeOf<BlogData["cta"]>().toEqualTypeOf<ParsedCTA>();
    expectTypeOf<NonNullable<ParsedCTA>["variant"]>().toEqualTypeOf<
      NonNullable<BlogCTA["variant"]>
    >();
    expectTypeOf<DocsData["hero"]>().toEqualTypeOf<boolean | undefined>();
    expectTypeOf<DocsData["appliesTo"]>().toEqualTypeOf<string | undefined>();
  });
});

describe("ArticleCTA presentation", () => {
  it("renders the validated Theme Builder handoff without a Starter pitch", async () => {
    const { container } = render(
      <main>
        <ArticleCTA cta={loadArticle(themeCTA).cta} />
      </main>,
    );
    expect(screen.getByText("Theme Builder")).toBeVisible();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Try your brand with semantic tokens",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Explore your brand color in a light and dark preview, review the results, and copy the supported theme overrides.",
      ),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: themeCTA.label })).toHaveAttribute(
      "href",
      themeCTA.href,
    );
    expect(screen.getByRole("link", { name: "Read Guides" })).toHaveAttribute(
      "href",
      "/guides",
    );
    expect(container).not.toHaveTextContent(
      /Starter|upgrade|buy|shipping leverage/i,
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(await axe(container)).toHaveNoViolations();
  });

  const legacyCases = [
    {
      variant: "free",
      badge: "Starter Free",
      label: "Get the production-ready starter",
      href: "/starters",
      title: "Explore the interface behind the ideas.",
      description:
        "Start with the dashboard, settings and product UI. Starter Free uses mocked authentication and billing data so you can explore the interface first.",
    },
    {
      variant: "pro",
      badge: "Starter Pro",
      label: "Explore Starter Pro",
      href: "/starters/pro",
      title: "Start with the connected foundation.",
      description:
        "Explore the Auth.js, Prisma and Stripe foundation, with documentation to configure the services for your own product.",
    },
    {
      variant: "blocks",
      badge: "Advanced Blocks",
      label: "Explore blocks",
      href: "/blocks",
      title: "Put the pattern into your product.",
      description:
        "Explore reusable product sections for dashboards, settings and everyday SaaS workflows, built with PyColors UI.",
    },
  ] as const;

  it.each(legacyCases)(
    "describes the $variant resource while preserving its label and destination",
    async ({ badge, title, description, ...cta }) => {
      const { container } = render(
        <main>
          <ArticleCTA cta={loadArticle(cta).cta} />
        </main>,
      );
      expect(screen.getByText(badge)).toBeVisible();
      expect(
        screen.getByRole("heading", {
          name: title,
        }),
      ).toBeVisible();
      expect(screen.getByText(description)).toBeVisible();
      const primary = screen.getByRole("link", { name: cta.label });
      expect(primary).toHaveAttribute("href", cta.href);
      for (const icon of container.querySelectorAll("svg")) {
        expect(icon).toHaveAttribute("aria-hidden", "true");
      }
      expect(screen.getByRole("link", { name: "Read Guides" })).toHaveAttribute(
        "href",
        "/guides",
      );
      expect(await axe(container)).toHaveNoViolations();
    },
  );

  it("uses the legacy presentation for a direct caller omitting variant", () => {
    render(<ArticleCTA cta={{ label: "Start building", href: "/starters" }} />);
    expect(screen.getByText("Starter Free")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Start building" }),
    ).toHaveAttribute("href", "/starters");
  });

  it("keeps repeated instances independently named without duplicate IDs", () => {
    const { container } = render(
      <>
        <ArticleCTA cta={themeCTA} />
        <ArticleCTA cta={legacyCases[0]} />
      </>,
    );
    const ids = [...container.querySelectorAll("[id]")].map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const link of within(container).getAllByRole("link")) {
      expect(link).toHaveAccessibleName();
      expect(link.querySelector("a,button")).toBeNull();
    }
  });
});
