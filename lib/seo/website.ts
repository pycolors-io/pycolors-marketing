export const SITE_NAME = 'PyColors';

export const SITE_URL = 'https://pycolors.io';

export const SITE_DESCRIPTION =
  'PyColors is a product ecosystem for shipping real SaaS: a minimal UI system, premium templates, and production-ready starters.';

export const SITE_TWITTER_HANDLE = '@pycolors';

export const SITE_DEFAULT_OG_IMAGE = '/seo/og-main.png';

export const SITE_DEFAULT_TWITTER_IMAGE = '/seo/twitter-main.png';

/**
 * Blog
 */

export const BLOG_DEFAULT_OG_IMAGE = '/seo/blog/og-blog-default.png';

export const BLOG_CATEGORY_OG_IMAGES: Record<string, string> = {
  'Next.js': '/seo/blog/og-blog-nextjs.png',
  'SaaS Architecture': '/seo/blog/og-blog-saas.png',
};

/**
 * Helpers
 */

export function toAbsoluteUrl(path?: string) {
  if (!path) return undefined;

  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}
