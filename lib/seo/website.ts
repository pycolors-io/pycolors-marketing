export const SITE_NAME = "PyColors";

export const SITE_TITLE =
  "React & Next.js UI, Blocks and SaaS Starters · PyColors";

export const SITE_URL = "https://pycolors.io";

export const SITE_DESCRIPTION =
  "Build React and Next.js products with UI components, reusable blocks, templates and SaaS starters. Explore the public library and choose your starting point.";

export const SITE_TWITTER_HANDLE = "@pycolors";

export const SITE_DEFAULT_OG_IMAGE = "/seo/og-main.png";

export const SITE_DEFAULT_TWITTER_IMAGE = "/seo/twitter-main.png";

/**
 * Blog
 */

export const BLOG_DEFAULT_OG_IMAGE = "/seo/blog/og-blog-default.png";

export const BLOG_CATEGORY_OG_IMAGES: Record<string, string> = {
  "Next.js": "/seo/blog/og-blog-nextjs.png",
  "SaaS Architecture": "/seo/blog/og-blog-saas.png",
};

/**
 * Helpers
 */

export function toAbsoluteUrl(path?: string) {
  if (!path) return undefined;

  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
