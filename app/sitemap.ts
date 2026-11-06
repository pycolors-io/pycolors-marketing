import { locales, localizedHref } from "@/lib/i18n/routing";
import type { MetadataRoute } from "next";

import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  normalizeTaxonomy,
} from "@/lib/blog/utils";
import { source } from "@/lib/source";

import { SITE_URL } from "@/lib/seo/website";

/**
 * Core acquisition + conversion routes.
 * Ordered intentionally for maintainability.
 */
const STATIC_ROUTES = [
  /**
   * Root
   */
  "",

  /**
   * Conversion
   */
  "/templates/na-ai-landing",
  "/starters/pro",
  "/starters/pro/faq",
  "/starters/pro/implementation-example",
  "/compare/build-vs-buy",
  "/pricing",
  "/request-a-quote",
  "/services",
  "/upgrade",
  "/starters/free",
  "/demo",
  "/showcase/product-studio",

  /**
   * Acquisition
   */
  "/templates",
  "/guides",
  "/blog",
  "/ui",
  "/tools/theme-builder",

  /**
   * Product ecosystem
   */
  "/starters",
  "/blocks",
  "/open-source",

  /**
   * UI ecosystem
   */
  "/ui/patterns",
  "/ui/examples",

  /**
   * Guides
   */
  "/guides/production-ready-saas-starter",
  "/guides/build-saas-nextjs",
  "/guides/saas-dashboard-design",
  "/guides/saas-auth-flows",
  "/guides/saas-billing-ux",
  "/guides/saas-organizations",
  "/guides/saas-admin-panels",
  "/guides/pwa-for-saas",

  /**
   * Product transparency
   */
  "/roadmap",
  "/changelog",

  /**
   * Trust / legal
   */
  "/license",
  "/terms",
  "/privacy",

  /**
   * Company
   */
  "/about",
  "/contact",

  /**
   * Blog taxonomy
   */
  "/blog/categories",
  "/blog/tags",
] as const;

/**
 * Sitemap priorities.
 * Optional hints for consumers; Google ignores priority and changeFrequency.
 */
function getPriority(route: string): number {
  if (route === "") return 1;

  /**
   * Core conversion pages
   */
  if (
    [
      "/templates/na-ai-landing",
      "/starters/pro",
      "/compare/build-vs-buy",
      "/pricing",
      "/upgrade",
      "/starters/free",
    ].includes(route)
  ) {
    return 0.95;
  }

  /**
   * Core acquisition pages
   */
  if (
    ["/templates", "/guides", "/blog", "/ui", "/tools/theme-builder"].includes(
      route,
    )
  ) {
    return 0.9;
  }

  /**
   * High-value educational content
   */
  if (route.startsWith("/guides/") || route.startsWith("/blog/")) {
    return 0.85;
  }

  /**
   * Premium docs
   */
  if (route.startsWith("/docs/starter-pro")) {
    return 0.85;
  }

  /**
   * Documentation
   */
  if (route.startsWith("/docs/")) {
    return 0.75;
  }

  /**
   * Product ecosystem pages
   */
  if (
    [
      "/starters",
      "/blocks",
      "/ui/examples",
      "/ui/patterns",
      "/open-source",
    ].includes(route)
  ) {
    return 0.8;
  }

  /**
   * Trust + company
   */
  if (
    [
      "/roadmap",
      "/changelog",
      "/about",
      "/contact",
      "/license",
      "/terms",
      "/privacy",
    ].includes(route)
  ) {
    return 0.7;
  }

  return 0.6;
}

/**
 * Change frequency strategy.
 * Optional cadence hints for consumers other than Google.
 */
function getChangeFrequency(
  route: string,
): "daily" | "weekly" | "monthly" | "yearly" {
  if (route === "") return "weekly";

  /**
   * Frequently evolving pages
   */
  if (
    [
      "/templates/na-ai-landing",
      "/compare/build-vs-buy",
      "/templates",
      "/starters/pro",
      "/starters/free",
      "/upgrade",
      "/pricing",
      "/roadmap",
      "/changelog",
      "/blog",
      "/open-source",
    ].includes(route)
  ) {
    return "weekly";
  }

  /**
   * Editorial content
   */
  if (route.startsWith("/guides/") || route.startsWith("/blog/")) {
    return "monthly";
  }

  /**
   * Documentation
   */
  if (route.startsWith("/docs/")) {
    return "monthly";
  }

  return "monthly";
}

type SitemapDocData = {
  readonly draft?: boolean;
  readonly private?: boolean;
  readonly lastUpdated?: string | Date;
};

function isPublicDocsPage(page: { readonly data: unknown }) {
  const data = page.data as SitemapDocData;

  return data.draft !== true && data.private !== true;
}

/** Publish only known dates, never the sitemap generation time. */
function getLastModified(value: string | Date | undefined) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  /**
   * Static routes
   */
  const alternates = (path: string) => ({
    languages: {
      en: `${SITE_URL}${localizedHref(path, "en")}`,
      fr: `${SITE_URL}${localizedHref(path, "fr")}`,
      "x-default": `${SITE_URL}${localizedHref(path, "en")}`,
    },
  });
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url:
        route === "" && locale === "en"
          ? SITE_URL
          : `${SITE_URL}${localizedHref(route || "/", locale)}`,
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route),
      alternates: alternates(route || "/"),
    })),
  );

  /**
   * Blog posts
   */
  const blogPosts: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${SITE_URL}${post.url}`,
      lastModified: getLastModified(post.date),
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: alternates(post.url),
    })),
  );

  /**
   * Blog categories
   */
  const blogCategories: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllCategories(locale).map((category) => ({
      url: `${SITE_URL}${localizedHref(`/blog/categories/${normalizeTaxonomy(category)}`, locale)}`,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternates(`/blog/categories/${normalizeTaxonomy(category)}`),
    })),
  );

  /**
   * Blog tags
   */
  const blogTags: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllTags(locale).map((tag) => ({
      url: `${SITE_URL}${localizedHref(`/blog/tags/${normalizeTaxonomy(tag)}`, locale)}`,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: alternates(`/blog/tags/${normalizeTaxonomy(tag)}`),
    })),
  );

  /**
   * Documentation pages from Fumadocs.
   */
  const docsPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    source
      .getPages(locale)
      .filter(isPublicDocsPage)
      .map((page) => {
        const data = page.data as SitemapDocData;

        return {
          url: `${SITE_URL}${page.url}`,
          lastModified: getLastModified(data.lastUpdated),
          changeFrequency: getChangeFrequency(page.url),
          priority: getPriority(localizedHref(page.url, "en")),
          alternates: alternates(page.url),
        };
      }),
  );

  /**
   * Merge + dedupe
   */
  const entries = [
    ...staticEntries,
    ...blogPosts,
    ...blogCategories,
    ...blogTags,
    ...docsPages,
  ];

  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}
