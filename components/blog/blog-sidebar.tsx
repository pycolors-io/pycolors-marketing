import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Badge } from "@pycolors/ui";

import { normalizeTaxonomy } from "@/lib/blog/utils";
import type { BlogPost } from "@/types/blog";
import styles from "./blog-index.module.css";

type BlogSidebarProps = {
  readonly categories: string[];
  readonly tags: string[];
  readonly posts: BlogPost[];
};

const linkClass =
  "flex min-h-11 items-center justify-between gap-3 rounded-[5px] px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-muted/50 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/** Topic navigation stays usable without client JavaScript. */
export function BlogSidebar({ categories, tags, posts }: BlogSidebarProps) {
  const uniqueTags = tags.filter(
    (tag, index) =>
      tags.findIndex(
        (other) => normalizeTaxonomy(other) === normalizeTaxonomy(tag),
      ) === index,
  );

  return (
    <aside
      className="min-w-0 lg:sticky lg:top-24"
      aria-label="Explore the blog"
    >
      <nav aria-label="Blog topics">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Browse by topic
        </p>
        <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
          <li>
            <Link
              href="#latest-articles"
              aria-current="page"
              className={`${linkClass} bg-surface-muted/60 font-medium text-foreground`}
            >
              <span>All articles</span>{" "}
              <span
                className="font-mono text-[11px]"
                aria-label={`${posts.length} articles`}
              >
                {String(posts.length).padStart(2, "0")}
              </span>
            </Link>
          </li>
          {categories.map((category) => {
            const count = posts.filter(
              (post) =>
                normalizeTaxonomy(post.category) ===
                normalizeTaxonomy(category),
            ).length;
            return (
              <li key={category}>
                <Link
                  href={`/blog/categories/${normalizeTaxonomy(category)}`}
                  className={linkClass}
                >
                  <span>{category}</span>{" "}
                  <span
                    className="font-mono text-[11px]"
                    aria-label={`${count} ${count === 1 ? "article" : "articles"}`}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {uniqueTags.length > 0 ? (
        <details
          className={`${styles.tagDisclosure} mt-5 border-t border-border-subtle pt-3`}
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-[5px] text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            Explore tags
            <ChevronDown
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </summary>
          <nav
            aria-label="Blog tags"
            className="mt-2 flex flex-wrap gap-x-2 pb-3"
          >
            {uniqueTags.slice(0, 12).map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${normalizeTaxonomy(tag)}`}
                className="group inline-flex min-h-11 max-w-full items-center rounded-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Badge
                  variant="outline"
                  size="sm"
                  className="h-auto min-h-7 max-w-full rounded-[5px] border-border-subtle bg-background px-2.5 py-1 leading-5 text-muted-foreground transition-colors duration-150 group-hover:border-border group-hover:bg-surface-muted/60 group-hover:text-foreground group-focus-visible:border-border group-focus-visible:text-foreground"
                >
                  <span className="wrap-anywhere">{tag}</span>
                </Badge>
              </Link>
            ))}
          </nav>
        </details>
      ) : null}

      <div className="mt-5 border-t border-border-subtle pt-5">
        <p className="text-sm font-medium">Looking for a walkthrough?</p>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          Follow a product guide, or jump into the implementation docs.
        </p>
        <div className="mt-2">
          <Link href="/guides" className={`${linkClass} px-0`}>
            Practical guides{" "}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
          <Link href="/docs" className={`${linkClass} px-0`}>
            Documentation{" "}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
