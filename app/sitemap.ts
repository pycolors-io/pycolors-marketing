import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://pycolors.io', lastModified: new Date() },
    { url: 'https://pycolors.io/docs', lastModified: new Date() },
    {
      url: 'https://pycolors.io/changelog',
      lastModified: new Date(),
    },
    { url: 'https://pycolors.io/roadmap', lastModified: new Date() },
    { url: 'https://pycolors.io/license', lastModified: new Date() },
  ];
}
