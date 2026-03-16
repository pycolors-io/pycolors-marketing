import type { Metadata } from 'next';
import type { BlogPost } from '@/types/blog';
import {
  SITE_NAME,
  SITE_URL,
  SITE_TWITTER_HANDLE,
} from '@/lib/seo/website';

const DEFAULT_BLOG_OG_IMAGE = '/seo/blog/og-blog-default.png';

const BLOG_CATEGORY_OG_IMAGES: Record<string, string> = {
  'Next.js': '/seo/blog/og-blog-nextjs.png',
  'SaaS Architecture': '/seo/blog/og-blog-saas.png',
};

function toAbsoluteUrl(path?: string) {
  if (!path) return undefined;
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

function getArticleImage(post: BlogPost) {
  return (
    post.cover ??
    BLOG_CATEGORY_OG_IMAGES[post.category] ??
    DEFAULT_BLOG_OG_IMAGE
  );
}

export function createArticleMetadata(post: BlogPost): Metadata {
  const canonicalUrl = `${SITE_URL}${post.url}`;
  const imagePath = getArticleImage(post);
  const imageUrl = toAbsoluteUrl(imagePath);

  return {
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: post.title,
      description: post.description,
      siteName: SITE_NAME,
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: SITE_TWITTER_HANDLE,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateArticleJsonLd(post: BlogPost) {
  const imagePath = getArticleImage(post);
  const imageUrl = toAbsoluteUrl(imagePath);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${post.url}`,
    articleSection: post.category,
    keywords: post.tags,
    image: imageUrl ? [imageUrl] : undefined,
  };
}
