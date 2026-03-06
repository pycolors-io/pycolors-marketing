import { MetadataRoute } from 'next';

const BASE_URL = 'https://pycolors.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/ui',
    '/ui/patterns',

    '/examples',

    '/guides',

    '/starters',
    '/starters/free',

    '/upgrade',
    '/waitlist',

    '/docs',
    '/docs/saas-starter',

    '/roadmap',
    '/changelog',

    '/license',
    '/terms',
    '/privacy',

    '/about',
    '/open-source',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
