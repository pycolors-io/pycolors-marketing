import * as React from "react";
import NextLink from "next/link";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

import CategoriesPage, {
  generateMetadata as categoriesMetadata,
} from "@/app/[locale]/(site)/blog/categories/page";
import CategoryPage, {
  generateMetadata as categoryMetadata,
  generateStaticParams as categoryParams,
} from "@/app/[locale]/(site)/blog/categories/[category]/page";
import TagsPage, {
  generateMetadata as tagsMetadata,
} from "@/app/[locale]/(site)/blog/tags/page";
import TagPage, {
  generateMetadata as tagMetadata,
  generateStaticParams as tagParams,
} from "@/app/[locale]/(site)/blog/tags/[tag]/page";
import * as blog from "@/lib/blog/utils";
import { createCopy } from "@/lib/i18n/copy-core";
import { localizedHref, type SiteLocale } from "@/lib/i18n/routing";
import fr from "@/messages/fr.json";

const { localeState, getPages, notFound } = vi.hoisted(() => ({
  localeState: { value: "en" as SiteLocale },
  getPages: vi.fn(),
  notFound: vi.fn((): never => {
    throw new Error("taxonomy-not-found");
  }),
}));

vi.mock("@/lib/source", () => ({ blogSource: { getPages } }));
vi.mock("@/lib/i18n/use-copy", () => ({
  useCopy: () => copyFor(localeState.value),
}));
vi.mock("@/lib/i18n/server-copy", () => ({
  getCopy: async (locale: SiteLocale = localeState.value) => copyFor(locale),
}));
vi.mock("@/lib/i18n/navigation", () => ({
  Link: (props: React.ComponentProps<typeof NextLink>) => (
    <NextLink
      {...props}
      href={
        typeof props.href === "string"
          ? localizedHref(props.href, localeState.value)
          : props.href
      }
    />
  ),
}));
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound,
}));

function copyFor(locale: SiteLocale) {
  const messages: Record<string, string> = fr.site;
  return createCopy(
    locale,
    Object.assign((key: string) => messages[key] ?? key, {
      has: (key: string) => Object.hasOwn(messages, key),
    }),
  );
}

const topics = Array.from(
  { length: 13 },
  (_, index) => `Topic ${String(index + 1).padStart(2, "0")}`,
);
const sharedTopic = (locale: SiteLocale) =>
  locale === "fr" ? "Sujet commun" : "Shared topic";

// Unsorted source, a dotted taxonomy, duplicate/space-padded tags, and more
// than twelve tags exercise the real loaders instead of copying their logic.
function fixtures(locale: SiteLocale) {
  const records: Array<[string, string, string, string[]]> = [
    [
      "old",
      "2026-01-01",
      "Next.js",
      [" Next.js ", sharedTopic(locale), sharedTopic(locale), "Topic 01"],
    ],
    [
      "new",
      "2026-01-03",
      locale === "fr" ? "UX produit" : "Product UX",
      ["Next.js", sharedTopic(locale), ...topics],
    ],
    ["middle", "2026-01-02", "Next.js", ["Next.js", sharedTopic(locale)]],
  ];
  return records.map(([slug, date, category, tags]) => ({
    slugs: [slug],
    url: localizedHref(`/blog/fixture-${slug}`, locale),
    data: {
      title: `${locale.toUpperCase()} fixture ${slug}`,
      description: `${locale.toUpperCase()} summary ${slug}`,
      author: "Fixture author",
      date,
      category,
      tags,
      readingTime: "7 min read",
    },
  }));
}

function articleHrefs(container: HTMLElement) {
  return within(container)
    .queryAllByRole("heading", { level: 3 })
    .flatMap((heading) => {
      const link = heading.querySelector("a");
      return link ? [link.getAttribute("href")] : [];
    });
}

function assertCard(link: HTMLElement, label: string, count: number) {
  const card = link.closest<HTMLElement>('[data-slot="card"]');
  expect(card).not.toBeNull();
  expect(card).toHaveTextContent(label);
  expect(
    within(card!).getByText(`${count} article${count > 1 ? "s" : ""}`, {
      exact: true,
    }),
  ).toBeVisible();
}

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

for (const locale of ["en", "fr"] as const) {
  describe(`blog taxonomy in ${locale}`, () => {
    const href = (path: string) => localizedHref(path, locale);
    const t = copyFor(locale);

    beforeEach(() => {
      localeState.value = locale;
      getPages
        .mockReset()
        .mockImplementation((value: SiteLocale = "en") => fixtures(value));
      notFound.mockClear();
    });

    it("preserves every category, alphabetical order, counts and destinations", () => {
      render(<CategoriesPage />);
      const links = screen.getAllByRole("link", { name: t("View category") });
      expect(links.map((link) => link.getAttribute("href"))).toEqual([
        href("/blog/categories/next.js"),
        href(
          locale === "fr"
            ? "/blog/categories/ux-produit"
            : "/blog/categories/product-ux",
        ),
      ]);
      assertCard(links[0]!, "Next.js", 2);
      assertCard(
        links[1]!,
        locale === "fr" ? "UX produit" : t("Product UX"),
        1,
      );
      expect(getPages).toHaveBeenCalled();
      expect(getPages.mock.calls.every(([value]) => value === locale)).toBe(
        true,
      );
    });

    it("keeps the complete tag index and counts articles once per matching tag", () => {
      render(<TagsPage />);
      const labels = ["Next.js", sharedTopic(locale), ...topics];
      const links = screen.getAllByRole("link", { name: t("View tag") });
      expect(links).toHaveLength(15);
      expect(links.map((link) => link.getAttribute("href"))).toEqual([
        href("/blog/tags/next.js"),
        href(
          locale === "fr"
            ? "/blog/tags/sujet-commun"
            : "/blog/tags/shared-topic",
        ),
        ...topics.map((_, index) =>
          href(`/blog/tags/topic-${String(index + 1).padStart(2, "0")}`),
        ),
      ]);
      links.forEach((link, index) =>
        assertCard(
          link,
          `#${labels[index]}`,
          index < 2 ? 3 : index === 2 ? 2 : 1,
        ),
      );
      expect(getPages).toHaveBeenCalled();
      expect(getPages.mock.calls.every(([value]) => value === locale)).toBe(
        true,
      );
    });

    it("keeps dotted category matching and newest-first article content", async () => {
      const { container } = render(
        await CategoryPage({
          params: Promise.resolve({ locale, category: "next.js" }),
        }),
      );
      expect(articleHrefs(container)).toEqual([
        href("/blog/fixture-middle"),
        href("/blog/fixture-old"),
      ]);
      for (const slug of ["middle", "old"]) {
        const link = screen.getByRole("link", {
          name: `${locale.toUpperCase()} fixture ${slug}`,
        });
        const card = link.closest('[data-slot="card"]');
        expect(card).toHaveTextContent(
          `${locale.toUpperCase()} summary ${slug}`,
        );
        expect(card).toHaveTextContent(t("7 min read"));
        expect(card).toHaveTextContent(
          locale === "fr"
            ? `${slug === "middle" ? 2 : 1} janvier 2026`
            : `January ${slug === "middle" ? 2 : 1}, 2026`,
        );
      }
      expect(
        screen.queryByText(`${locale.toUpperCase()} fixture new`),
      ).toBeNull();
      expect(notFound).not.toHaveBeenCalled();
    });

    it("keeps the locale-specific tag archive and source-defined post order", async () => {
      const tag = locale === "fr" ? "sujet-commun" : "shared-topic";
      const { container } = render(
        await TagPage({ params: Promise.resolve({ locale, tag }) }),
      );
      expect(articleHrefs(container)).toEqual(
        ["new", "middle", "old"].map((slug) => href(`/blog/fixture-${slug}`)),
      );
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        sharedTopic(locale),
      );
      expect(notFound).not.toHaveBeenCalled();
    });

    it("keeps only articles matching a tag shared by part of the catalog", async () => {
      const { container } = render(
        await TagPage({
          params: Promise.resolve({ locale, tag: "topic-01" }),
        }),
      );
      expect(articleHrefs(container)).toEqual([
        href("/blog/fixture-new"),
        href("/blog/fixture-old"),
      ]);
      expect(
        screen.queryByText(`${locale.toUpperCase()} fixture middle`),
      ).toBeNull();
      expect(notFound).not.toHaveBeenCalled();
    });

    it("retains empty indexes without fabricated taxonomy items", () => {
      getPages.mockReturnValue([]);
      render(<CategoriesPage />);
      expect(
        screen.queryByRole("link", { name: t("View category") }),
      ).toBeNull();
      expect(
        screen.getByRole("link", { name: t("Back to Blog") }),
      ).toHaveAttribute("href", href("/blog"));
      cleanup();
      render(<TagsPage />);
      expect(screen.queryByRole("link", { name: t("View tag") })).toBeNull();
      expect(
        screen.getByRole("link", { name: t("Browse Guides") }),
      ).toHaveAttribute("href", href("/guides"));
    });

    it("retains defensive empty detail states for known taxonomies", async () => {
      vi.spyOn(blog, "getPostsByCategory").mockReturnValue([]);
      render(
        await CategoryPage({
          params: Promise.resolve({ locale, category: "next.js" }),
        }),
      );
      expect(
        screen.getByText(
          t("This category exists, but no article is published yet."),
        ),
      ).toBeVisible();
      expect(
        screen.getByRole("link", { name: t("All articles") }),
      ).toHaveAttribute("href", href("/blog"));
      cleanup();
      vi.spyOn(blog, "getPostsByTag").mockReturnValue([]);
      render(
        await TagPage({ params: Promise.resolve({ locale, tag: "next.js" }) }),
      );
      expect(
        screen.getByText(
          t("This tag exists, but no article is published yet."),
        ),
      ).toBeVisible();
      expect(notFound).not.toHaveBeenCalled();
    });

    it("preserves unknown-slug notFound calls and fallback metadata", async () => {
      const category = {
        params: Promise.resolve({ locale, category: "missing-taxonomy" }),
      };
      const tag = {
        params: Promise.resolve({ locale, tag: "missing-taxonomy" }),
      };
      await expect(CategoryPage(category)).rejects.toThrow(
        "taxonomy-not-found",
      );
      await expect(TagPage(tag)).rejects.toThrow("taxonomy-not-found");
      expect(notFound).toHaveBeenCalledTimes(2);
      expect(await categoryMetadata(category)).toEqual({
        title: "Category not found",
      });
      expect(await tagMetadata(tag)).toEqual({ title: "Tag not found" });
    });

    it("preserves static params, including dotted slugs and the complete tag set", async () => {
      expect(await categoryParams()).toEqual([
        { category: "next.js" },
        { category: "product-ux" },
      ]);
      expect(await tagParams()).toEqual([
        { tag: "next.js" },
        { tag: "shared-topic" },
        ...topics.map((_, index) => ({
          tag: `topic-${String(index + 1).padStart(2, "0")}`,
        })),
      ]);
    });

    const pages = [
      [
        "categories",
        () => <CategoriesPage />,
        ["Explore blog categories", "by product surface and technical domain."],
      ],
      [
        "tags",
        () => <TagsPage />,
        [
          "Explore blog topics",
          "across SaaS, engineering, and product design.",
        ],
      ],
      [
        "category detail",
        () =>
          CategoryPage({
            params: Promise.resolve({ locale, category: "next.js" }),
          }),
        ["Next.js", "blog articles."],
      ],
      [
        "tag detail",
        () => TagPage({ params: Promise.resolve({ locale, tag: "next.js" }) }),
        ["Next.js", "tag archive."],
      ],
    ] as const;

    for (const [name, page, headingCopy] of pages) {
      it(`${name} has one reachable main, named navigation and valid accessible structure`, async () => {
        const { container } = render(await page());
        const main = screen.getByRole("main");
        expect(main).toHaveAttribute("id", "content");
        expect(main).toHaveAttribute("tabindex", "-1");
        expect(document.querySelectorAll("#content")).toHaveLength(1);
        expect(within(main).getAllByRole("heading", { level: 1 })).toHaveLength(
          1,
        );
        // The title and subtitle occupy separate blocks; whitespace at that
        // boundary must not hide a missing or replaced translated phrase.
        expect(
          within(main)
            .getByRole("heading", { level: 1 })
            .textContent?.replace(/\s+/g, ""),
        ).toBe(
          headingCopy
            .map((part) => t(part))
            .join("")
            .replace(/\s+/g, ""),
        );
        for (const link of within(main).getAllByRole("link")) {
          expect(link).toHaveAccessibleName();
          expect(link.getAttribute("href")).toBeTruthy();
          expect(link.querySelector("a,button")).toBeNull();
        }
        const actionDefinitions: Array<[string, string]> = [
          ["Back to Blog", "/blog"],
          ["Browse Guides", "/guides"],
        ];
        if (name !== "categories") {
          actionDefinitions.push(["Starter Free", "/starters/free"]);
        }
        if (name.includes("detail")) {
          actionDefinitions.push(
            ["View Guides", "/guides"],
            ["Explore PRO", "/upgrade"],
            ["All articles", "/blog"],
          );
        }
        const actions = actionDefinitions.map(([label, destination]) => ({
          text: t(label),
          href: href(destination),
        }));
        const actionLabels = new Set(actions.map(({ text }) => text));
        expect(
          within(main)
            .getAllByRole("link")
            .map((link) => ({
              text: link.textContent?.replace(/\s+/g, " ").trim(),
              href: link.getAttribute("href"),
            }))
            .filter(({ text }) => actionLabels.has(text ?? "")),
        ).toEqual(actions);
        const breadcrumb = screen.getByRole("navigation", {
          name: t("Breadcrumb"),
        });
        expect(
          within(breadcrumb).getAllByRole("link", { name: t("Home") })[0],
        ).toHaveAttribute("href", href("/"));
        expect(await axe(container)).toHaveNoViolations();
      }, 15_000);
    }

    it("retains localized canonicals, alternates and social metadata for all four routes", async () => {
      const parameters = { params: Promise.resolve({ locale }) };
      const detailDescription =
        "Articles techniques PyColors sur Next.js, l’architecture et la réalisation de produits SaaS.";
      const cases = [
        [
          "/blog/categories",
          await categoriesMetadata(parameters),
          t("Next.js SaaS Engineering Categories"),
          {
            description: t(
              "Browse engineering categories across Next.js SaaS architecture, billing systems, authentication, UI engineering, product UX, design systems, and production-ready implementation patterns.",
            ),
            openGraph: {
              title: t("Next.js SaaS Engineering Categories"),
              description: t(
                "Explore engineering categories covering SaaS architecture, UI systems, billing flows, developer experience, and production-ready Next.js implementation patterns.",
              ),
            },
            twitter: {
              title: t("Next.js SaaS Engineering Categories"),
              description: t(
                "Engineering categories across SaaS architecture, UI systems, billing, product UX, and modern Next.js development.",
              ),
            },
          },
        ],
        [
          "/blog/tags",
          await tagsMetadata(parameters),
          t("Next.js SaaS Engineering Topics"),
          {
            description: t(
              "Explore technical topics across Next.js SaaS architecture, authentication, billing systems, UI engineering, product UX, developer experience, and production-ready implementation patterns.",
            ),
            openGraph: {
              title: t("Next.js SaaS Engineering Topics"),
              description: t(
                "Browse technical topics covering SaaS architecture, billing, UI systems, developer experience, and modern Next.js engineering.",
              ),
            },
            twitter: {
              title: t("Next.js SaaS Engineering Topics"),
              description: t(
                "Technical topics across SaaS architecture, UI systems, billing, and modern Next.js engineering.",
              ),
            },
          },
        ],
        [
          "/blog/categories/next.js",
          await categoryMetadata({
            params: Promise.resolve({ locale, category: "next.js" }),
          }),
          locale === "fr" ? "Articles : Next.js" : "Next.js Blog Articles",
          {
            description:
              locale === "fr"
                ? detailDescription
                : "Technical articles from PyColors about next.js and related SaaS implementation decisions.",
            openGraph: {
              title:
                locale === "fr"
                  ? "Articles : Next.js"
                  : "Next.js · Blog · PyColors",
              description:
                locale === "fr"
                  ? detailDescription
                  : "Technical articles from PyColors about next.js and related SaaS implementation decisions.",
            },
            twitter: {
              title:
                locale === "fr"
                  ? "Articles : Next.js"
                  : "Next.js · Blog · PyColors",
              description:
                locale === "fr"
                  ? detailDescription
                  : "Technical articles from PyColors about next.js and related SaaS implementation decisions.",
            },
          },
        ],
        [
          "/blog/tags/next.js",
          await tagMetadata({
            params: Promise.resolve({ locale, tag: "next.js" }),
          }),
          locale === "fr" ? "Articles sur Next.js" : "Next.js Articles",
          {
            description:
              locale === "fr"
                ? detailDescription
                : "Technical articles from PyColors tagged with Next.js.",
            openGraph: {
              title:
                locale === "fr"
                  ? "Articles sur Next.js"
                  : "Next.js · Blog · PyColors",
              description:
                locale === "fr"
                  ? detailDescription
                  : "Technical articles from PyColors tagged with Next.js.",
            },
            twitter: {
              title:
                locale === "fr"
                  ? "Articles sur Next.js"
                  : "Next.js · Blog · PyColors",
              description:
                locale === "fr"
                  ? detailDescription
                  : "Technical articles from PyColors tagged with Next.js.",
            },
          },
        ],
      ] as const;
      for (const [path, metadata, title, copy] of cases) {
        const canonical =
          locale === "fr" ? `https://pycolors.io${href(path)}` : path;
        expect(metadata.title).toBe(title);
        expect(metadata.description).toBe(copy.description);
        expect(metadata.alternates).toMatchObject({
          canonical,
          languages: {
            en: `https://pycolors.io${path}`,
            fr: `https://pycolors.io/fr${path}`,
            "x-default": `https://pycolors.io${path}`,
          },
        });
        expect(metadata.openGraph).toMatchObject({
          ...copy.openGraph,
          url: canonical,
          locale: locale === "fr" ? "fr_FR" : "en_US",
          images: ["/seo/og-main.png"],
        });
        expect(metadata.twitter).toMatchObject({
          ...copy.twitter,
          card: "summary_large_image",
          images: ["/seo/twitter-main.png"],
        });
      }
    });
  });
}
