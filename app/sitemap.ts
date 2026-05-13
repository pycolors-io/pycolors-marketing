import type { MetadataRoute } from 'next';

import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

const BASE_URL = 'https://pycolors.io';

/**
 * Core pages = acquisition + conversion.
 * Order matters for reasoning, not for sitemap output.
 */
const STATIC_ROUTES = [
  // Root
  '',

  // Conversion core
  '/templates/na-ai-landing',
  '/starters/pro',
  '/pricing',
  '/upgrade',
  '/starters/free',

  // Acquisition core
  '/templates',
  '/guides',
  '/blog',
  '/ui',

  // Product
  '/starters',

  // UI ecosystem
  '/ui/patterns',
  '/ui/examples',

  // Exploration
  '/examples',

  // Guides
  '/guides/build-saas-nextjs',
  '/guides/saas-dashboard-design',
  '/guides/saas-auth-flows',
  '/guides/saas-billing-ux',
  '/guides/saas-organizations',
  '/guides/saas-admin-panels',

  // Docs
  '/docs',
  '/docs/ui',

  // Starter Free docs
  '/docs/starter',
  '/docs/starter/upgrade',

  // Starter Pro docs
  '/docs/starter-pro',
  '/docs/starter-pro/overview',
  '/docs/starter-pro/upgrade',
  '/docs/starter-pro/billing',
  '/docs/starter-pro/backend',

  // Trust
  '/roadmap',
  '/changelog',

  // Legal
  '/license',
  '/terms',
  '/privacy',

  // Company
  '/about',
  '/open-source',

  // Blog taxonomies
  '/blog/categories',
  '/blog/tags',
] as const;

/**
 * Priority = business value.
 */
function getPriority(route: string): number {
  if (route === '') return 1.0;

  if (
    [
      '/templates/na-ai-landing',
      '/starters/pro',
      '/pricing',
      '/upgrade',
      '/starters/free',
    ].includes(route)
  ) {
    return 0.95;
  }

  if (['/templates', '/guides', '/blog', '/ui'].includes(route)) {
    return 0.9;
  }

  if (route.startsWith('/guides/') || route.startsWith('/blog/')) {
    return 0.85;
  }

  if (route.startsWith('/docs/starter-pro')) {
    return 0.85;
  }

  if (route.startsWith('/docs/')) {
    return 0.75;
  }

  if (
    route === '/starters' ||
    route === '/ui/patterns' ||
    route === '/ui/examples' ||
    route === '/examples'
  ) {
    return 0.8;
  }

  if (
    ['/roadmap', '/changelog', '/about', '/open-source'].includes(
      route,
    )
  ) {
    return 0.7;
  }

  return 0.6;
}

/**
 * Change frequency = update strategy.
 */
function getChangeFrequency(
  route: string,
): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  if (route === '') return 'weekly';

  if (
    [
      '/templates/na-ai-landing',
      '/templates',
      '/starters/pro',
      '/starters/free',
      '/upgrade',
      '/pricing',
      '/roadmap',
      '/changelog',
      '/blog',
    ].includes(route)
  ) {
    return 'weekly';
  }

  if (route.startsWith('/guides/') || route.startsWith('/blog/')) {
    return 'monthly';
  }

  if (route.startsWith('/docs/')) {
    return 'monthly';
  }

  return 'monthly';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: getChangeFrequency(route),
      priority: getPriority(route),
    }),
  );

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map(
    (post) => ({
      url: `${BASE_URL}${post.url}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: 'monthly',
      priority: 0.85,
    }),
  );

  const blogCategories: MetadataRoute.Sitemap =
    getAllCategories().map((category) => ({
      url: `${BASE_URL}/blog/categories/${normalizeTaxonomy(category)}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const blogTags: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${BASE_URL}/blog/tags/${normalizeTaxonomy(tag)}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const entries = [
    ...staticEntries,
    ...blogPosts,
    ...blogCategories,
    ...blogTags,
  ];

  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}
