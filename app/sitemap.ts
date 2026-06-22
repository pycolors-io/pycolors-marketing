import type { MetadataRoute } from 'next';

import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  normalizeTaxonomy,
} from '@/lib/blog/utils';
import { source } from '@/lib/source';

const BASE_URL = 'https://pycolors.io';

/**
 * Core acquisition + conversion routes.
 * Ordered intentionally for maintainability.
 */
const STATIC_ROUTES = [
  /**
   * Root
   */
  '',

  /**
   * Conversion
   */
  '/templates/na-ai-landing',
  '/starters/pro',
  '/compare/build-vs-buy',
  '/pricing',
  '/upgrade',
  '/starters/free',

  /**
   * Acquisition
   */
  '/templates',
  '/guides',
  '/blog',
  '/ui',

  /**
   * Product ecosystem
   */
  '/starters',
  '/open-source',

  /**
   * UI ecosystem
   */
  '/ui/patterns',
  '/ui/examples',

  /**
   * Guides
   */
  '/guides/production-ready-saas-starter',
  '/guides/build-saas-nextjs',
  '/guides/saas-dashboard-design',
  '/guides/saas-auth-flows',
  '/guides/saas-billing-ux',
  '/guides/saas-organizations',
  '/guides/saas-admin-panels',
  '/guides/pwa-for-saas',

  /**
   * Product transparency
   */
  '/roadmap',
  '/changelog',

  /**
   * Trust / legal
   */
  '/license',
  '/terms',
  '/privacy',

  /**
   * Company
   */
  '/about',

  /**
   * Blog taxonomy
   */
  '/blog/categories',
  '/blog/tags',
] as const;

/**
 * Sitemap priorities.
 * Signals relative business + SEO importance.
 */
function getPriority(route: string): number {
  if (route === '') return 1;

  /**
   * Core conversion pages
   */
  if (
    [
      '/templates/na-ai-landing',
      '/starters/pro',
      '/compare/build-vs-buy',
      '/pricing',
      '/upgrade',
      '/starters/free',
    ].includes(route)
  ) {
    return 0.95;
  }

  /**
   * Core acquisition pages
   */
  if (['/templates', '/guides', '/blog', '/ui'].includes(route)) {
    return 0.9;
  }

  /**
   * High-value educational content
   */
  if (route.startsWith('/guides/') || route.startsWith('/blog/')) {
    return 0.85;
  }

  /**
   * Premium docs
   */
  if (route.startsWith('/docs/starter-pro')) {
    return 0.85;
  }

  /**
   * Documentation
   */
  if (route.startsWith('/docs/')) {
    return 0.75;
  }

  /**
   * Product ecosystem pages
   */
  if (
    [
      '/starters',
      '/ui/examples',
      '/ui/patterns',
      '/open-source',
    ].includes(route)
  ) {
    return 0.8;
  }

  /**
   * Trust + company
   */
  if (
    [
      '/roadmap',
      '/changelog',
      '/about',
      '/license',
      '/terms',
      '/privacy',
    ].includes(route)
  ) {
    return 0.7;
  }

  return 0.6;
}

/**
 * Change frequency strategy.
 * Helps search engines understand update cadence.
 */
function getChangeFrequency(
  route: string,
): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  if (route === '') return 'weekly';

  /**
   * Frequently evolving pages
   */
  if (
    [
      '/templates/na-ai-landing',
      '/compare/build-vs-buy',
      '/templates',
      '/starters/pro',
      '/starters/free',
      '/upgrade',
      '/pricing',
      '/roadmap',
      '/changelog',
      '/blog',
      '/open-source',
    ].includes(route)
  ) {
    return 'weekly';
  }

  /**
   * Editorial content
   */
  if (route.startsWith('/guides/') || route.startsWith('/blog/')) {
    return 'monthly';
  }

  /**
   * Documentation
   */
  if (route.startsWith('/docs/')) {
    return 'monthly';
  }

  return 'monthly';
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

function getDocsLastModified(
  lastUpdated: SitemapDocData['lastUpdated'],
  fallback: Date,
) {
  if (!lastUpdated) {
    return fallback;
  }

  const lastModified = new Date(lastUpdated);

  return Number.isNaN(lastModified.getTime()) ? fallback : lastModified;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /**
   * Static routes
   */
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route),
    }),
  );

  /**
   * Blog posts
   */
  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map(
    (post) => ({
      url: `${BASE_URL}${post.url}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
  );

  /**
   * Blog categories
   */
  const blogCategories: MetadataRoute.Sitemap =
    getAllCategories().map((category) => ({
      url: `${BASE_URL}/blog/categories/${normalizeTaxonomy(category)}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  /**
   * Blog tags
   */
  const blogTags: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${BASE_URL}/blog/tags/${normalizeTaxonomy(tag)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  /**
   * Documentation pages from Fumadocs.
   */
  const docsPages: MetadataRoute.Sitemap = source
    .getPages()
    .filter(isPublicDocsPage)
    .map((page) => {
      const data = page.data as SitemapDocData;

      return {
        url: `${BASE_URL}${page.url}`,
        lastModified: getDocsLastModified(data.lastUpdated, now),
        changeFrequency: getChangeFrequency(page.url),
        priority: getPriority(page.url),
      };
    });

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
