import type { MetadataRoute } from 'next';

import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

const BASE_URL = 'https://pycolors.io';

/**
 * Core pages = acquisition + conversion
 * Order matters for reasoning, not for sitemap output
 */
const STATIC_ROUTES = [
  // Root
  '',

  // 🔥 CONVERSION CORE
  '/starters/free',
  '/starters/pro',
  '/upgrade',
  '/access',

  // 🔥 ACQUISITION CORE
  '/guides',
  '/blog',
  '/ui',
  '/templates',

  // Product
  '/starters',

  // UI ecosystem
  '/ui/patterns',

  // Exploration
  '/examples',

  // Guides (SEO pages)
  '/guides/build-saas-nextjs',
  '/guides/saas-dashboard-design',
  '/guides/saas-auth-flows',
  '/guides/saas-billing-ux',
  '/guides/saas-organizations',
  '/guides/saas-admin-panels',

  // Templates
  '/templates/na-ai',

  // Docs
  '/docs',
  '/docs/ui',

  // Starter Free docs
  '/docs/saas-starter',
  '/docs/saas-starter/upgrade-to-pro',

  // 🔥 PRO docs (VERY IMPORTANT)
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
 * PRIORITY = BUSINESS VALUE
 */
function getPriority(route: string): number {
  if (route === '') return 1.0;

  // 🔥 MONEY PAGES
  if (['/starters/free', '/upgrade', '/access'].includes(route)) {
    return 0.95;
  }

  // 🔥 TRAFFIC → CONVERSION PAGES
  if (['/guides', '/blog', '/ui', '/templates'].includes(route)) {
    return 0.9;
  }

  // 🔥 DEEP CONTENT (SEO)
  if (route.startsWith('/guides/') || route.startsWith('/blog/')) {
    return 0.85;
  }

  // 🔥 DOCS (conversion support)
  if (route.startsWith('/docs/starter-pro')) {
    return 0.85;
  }

  if (route.startsWith('/docs/')) {
    return 0.75;
  }

  // Product exploration
  if (
    route === '/starters' ||
    route === '/ui/patterns' ||
    route === '/examples'
  ) {
    return 0.8;
  }

  // Trust / support
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
 * CHANGE FREQUENCY = UPDATE STRATEGY
 */
function getChangeFrequency(
  route: string,
): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  if (route === '') return 'weekly';

  // 🔥 FAST EVOLVING
  if (
    [
      '/upgrade',
      '/access',
      '/starters/free',
      '/roadmap',
      '/changelog',
      '/blog',
    ].includes(route)
  ) {
    return 'weekly';
  }

  // 🔥 SEO CONTENT
  if (route.startsWith('/guides/') || route.startsWith('/blog/')) {
    return 'monthly';
  }

  // Docs evolve regularly
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

  const blogPosts = getAllPosts().map((post) => ({
    url: `${BASE_URL}${post.url}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  const blogCategories = getAllCategories().map((category) => ({
    url: `${BASE_URL}/blog/categories/${normalizeTaxonomy(category)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogTags = getAllTags().map((tag) => ({
    url: `${BASE_URL}/blog/tags/${normalizeTaxonomy(tag)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const entries = [
    ...staticEntries,
    ...blogPosts,
    ...blogCategories,
    ...blogTags,
  ];

  // Remove duplicates
  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}
