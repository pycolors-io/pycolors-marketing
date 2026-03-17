import { blogSource } from '@/lib/source';
import type { BlogCTA, BlogPost } from '@/types/blog';

function isBlogVariant(value: unknown): value is BlogCTA['variant'] {
  return value === 'free' || value === 'pro' || value === 'blocks';
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeTaxonomy(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

export function getAllPosts(): BlogPost[] {
  return blogSource
    .getPages()
    .map((page): BlogPost | null => {
      const slug = page.slugs.at(-1);
      const title = page.data.title;

      if (!slug || !title) return null;

      const ctaData = page.data.cta;
      const tags = normalizeTags(page.data.tags);

      return {
        slug,
        url: page.url,
        title,
        description: page.data.description ?? '',
        author: String(page.data.author ?? ''),
        category: String(page.data.category ?? ''),
        tags,
        date: String(page.data.date ?? ''),
        featured: Boolean(page.data.featured),
        readingTime:
          typeof page.data.readingTime === 'string'
            ? page.data.readingTime
            : undefined,
        cover:
          typeof page.data.cover === 'string'
            ? page.data.cover
            : undefined,
        cta:
          ctaData &&
          typeof ctaData === 'object' &&
          'label' in ctaData &&
          'href' in ctaData
            ? {
                label: String(ctaData.label),
                href: String(ctaData.href),
                variant: isBlogVariant(ctaData.variant)
                  ? ctaData.variant
                  : undefined,
              }
            : undefined,
      };
    })
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostBySlug(slug: string) {
  return blogSource.getPage([slug]);
}

export function getPostMetaBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();

  return [...new Set(posts.map((post) => post.category))].sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();

  return [...new Set(posts.flatMap((post) => post.tags))].sort();
}

export function getPostsByCategory(category: string): BlogPost[] {
  const normalizedCategory = normalizeTaxonomy(category);

  return getAllPosts().filter(
    (post) => normalizeTaxonomy(post.category) === normalizedCategory,
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  const normalizedTag = normalizeTaxonomy(tag);

  return getAllPosts().filter((post) =>
    post.tags.some(
      (currentTag) => normalizeTaxonomy(currentTag) === normalizedTag,
    ),
  );
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index >= 0 ? (posts[index + 1] ?? null) : null,
    next: index >= 0 ? (posts[index - 1] ?? null) : null,
  };
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const posts = getAllPosts();
  const current = posts.find((post) => post.slug === slug);

  if (!current) return [];

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = 0;

      if (
        normalizeTaxonomy(post.category) ===
        normalizeTaxonomy(current.category)
      ) {
        score += 3;
      }

      const sharedTags = post.tags.filter((tag) =>
        current.tags.some(
          (currentTag) =>
            normalizeTaxonomy(currentTag) === normalizeTaxonomy(tag),
        ),
      );

      score += sharedTags.length * 2;

      if (post.featured) score += 1;

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function formatDate(date: string, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
  }).format(new Date(date));
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}
