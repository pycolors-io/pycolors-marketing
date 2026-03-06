import { MetadataRoute } from 'next';

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
    ].includes(route)
  ) {
    return 0.9;
  }

  if (
    route.startsWith('/guides/') ||
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
    ].includes(route)
  ) {
    return 'weekly';
  }

  if (route.startsWith('/guides/') || route.startsWith('/docs/')) {
    return 'monthly';
  }

  return 'monthly';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));
}
