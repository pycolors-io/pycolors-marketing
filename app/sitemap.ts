import type { MetadataRoute } from 'next';

import {
  getAllCategories,
  getAllPosts,
  getAllTags,
  normalizeTaxonomy,
} from '@/lib/blog/utils';

const BASE_URL = 'https://pycolors.io';

const STATIC_ROUTES = [
  '',
  '/ui',
  '/ui/patterns',

  '/examples',

  '/guides',
  '/guides/build-saas-nextjs',
  '/guides/saas-dashboard-design',
  '/guides/saas-auth-flows',
  '/guides/saas-billing-ux',
  '/guides/saas-organizations',
  '/guides/saas-admin-panels',

  '/starters',
  '/starters/free',

  '/upgrade',
  '/access',
  '/waitlist',

  '/templates',
  '/templates/na-ai',

  '/docs',
  '/docs/ui',
  '/docs/saas-starter',
  '/docs/saas-starter/upgrade-to-pro',

  '/roadmap',
  '/changelog',

  '/license',
  '/terms',
  '/privacy',

  '/about',
  '/open-source',

  '/blog',
  '/blog/categories',
  '/blog/tags',
] as const;

function getPriority(route: string): number {
  if (route === '') return 1.0;

  if (
    [
      '/starters/free',
      '/upgrade',
      '/access',
      '/guides',
      '/ui',
      '/templates',
      '/blog',
    ].includes(route)
  ) {
    return 0.9;
  }

  if (
    route.startsWith('/guides/') ||
    route.startsWith('/blog/') ||
    route === '/ui/patterns' ||
    route === '/examples' ||
    route === '/starters' ||
    route === '/docs/saas-starter'
  ) {
    return 0.8;
  }

  if (
    [
      '/waitlist',
      '/roadmap',
      '/changelog',
      '/about',
      '/open-source',
      '/blog/categories',
      '/blog/tags',
    ].includes(route)
  ) {
    return 0.7;
  }

  return 0.6;
}

function getChangeFrequency(
  route: string,
): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  if (route === '') return 'weekly';

  if (
    [
      '/roadmap',
      '/changelog',
      '/waitlist',
      '/upgrade',
      '/access',
      '/starters/free',
      '/blog',
    ].includes(route)
  ) {
    return 'weekly';
  }

  if (
    route.startsWith('/guides/') ||
    route.startsWith('/docs/') ||
    route.startsWith('/blog/')
  ) {
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
    priority: 0.8,
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

  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}
