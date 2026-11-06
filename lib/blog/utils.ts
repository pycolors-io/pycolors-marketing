import type { SiteLocale } from "@/lib/i18n/routing";
import { blogSource } from "@/lib/source";
import type { BlogPost } from "@/types/blog";

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeTaxonomy(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

export function getAllPosts(locale: SiteLocale = "en"): BlogPost[] {
  return blogSource
    .getPages(locale)
    .map((page): BlogPost | null => {
      const slug = page.slugs.at(-1);
      const title = page.data.title;

      if (!slug || !title) return null;

      const tags = normalizeTags(page.data.tags);

      return {
        slug,
        url: page.url,
        title,
        description: String(page.data.description ?? ""),
        author: String(page.data.author ?? ""),
        category: String(page.data.category ?? "").trim(),
        tags,
        date: String(page.data.date ?? ""),
        featured: Boolean(page.data.featured),
        readingTime:
          typeof page.data.readingTime === "string"
            ? page.data.readingTime
            : undefined,
        cover:
          typeof page.data.cover === "string" ? page.data.cover : undefined,
        // The frontmatter schema validates variants before the source is loaded.
        cta: page.data.cta,
      };
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, locale: SiteLocale = "en") {
  return blogSource.getPage([slug], locale);
}

export function getPostMetaBySlug(
  slug: string,
  locale: SiteLocale = "en",
): BlogPost | null {
  return getAllPosts(locale).find((post) => post.slug === slug) ?? null;
}

export function getFeaturedPosts(
  limit = 3,
  locale: SiteLocale = "en",
): BlogPost[] {
  return getAllPosts(locale)
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getAllCategories(locale: SiteLocale = "en"): string[] {
  return [
    ...new Set(
      getAllPosts(locale)
        .map((post) => post.category.trim())
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b));
}

export function getAllTags(locale: SiteLocale = "en"): string[] {
  return [
    ...new Set(
      getAllPosts(locale)
        .flatMap((post) => post.tags)
        .map((tag) => tag.trim())
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b));
}

export function getPostsByCategory(
  category: string,
  locale: SiteLocale = "en",
): BlogPost[] {
  const normalizedCategory = normalizeTaxonomy(category);

  return getAllPosts(locale).filter(
    (post) => normalizeTaxonomy(post.category) === normalizedCategory,
  );
}

export function getPostsByTag(
  tag: string,
  locale: SiteLocale = "en",
): BlogPost[] {
  const normalizedTag = normalizeTaxonomy(tag);

  return getAllPosts(locale).filter((post) =>
    post.tags.some(
      (currentTag) => normalizeTaxonomy(currentTag) === normalizedTag,
    ),
  );
}

export function getAdjacentPosts(slug: string, locale: SiteLocale = "en") {
  const posts = getAllPosts(locale);
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index >= 0 ? (posts[index + 1] ?? null) : null,
    next: index >= 0 ? (posts[index - 1] ?? null) : null,
  };
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
  locale: SiteLocale = "en",
): BlogPost[] {
  const posts = getAllPosts(locale);
  const current = posts.find((post) => post.slug === slug);

  if (!current) return [];

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      let score = 0;

      if (
        normalizeTaxonomy(post.category) === normalizeTaxonomy(current.category)
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

export function formatDate(date: string, locale = "en-US") {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
  }).format(new Date(date));
}

export function getAllSlugs(locale: SiteLocale = "en"): string[] {
  return getAllPosts(locale).map((post) => post.slug);
}
