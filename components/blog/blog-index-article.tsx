import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, cn } from "@pycolors/ui";

import { formatDate } from "@/lib/blog/utils";
import type { BlogPost } from "@/types/blog";
import styles from "./blog-index.module.css";

function ArticleByline({ post }: { readonly post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs leading-6 text-muted-foreground">
      {post.author ? <span>{post.author}</span> : null}
      {post.author && post.readingTime ? (
        <span aria-hidden="true">·</span>
      ) : null}
      {post.readingTime ? <span>{post.readingTime}</span> : null}
    </div>
  );
}

/** Editorial selection, with one descriptive link per article. */
export function BlogFeaturedArticle({
  post,
  lead = false,
}: {
  readonly post: BlogPost;
  readonly lead?: boolean;
}) {
  const titleId = `featured-${post.slug}`;

  return (
    <article className="h-full min-w-0">
      <Card
        asChild
        interactive
        className={cn(
          styles.featuredArticle,
          "group flex h-full flex-col justify-between rounded-[5px] border-border-subtle bg-background p-6 shadow-none hover:shadow-none",
          lead && `${styles.leadArticle} p-6 sm:p-8 lg:p-10`,
        )}
      >
        <Link href={post.url} aria-labelledby={titleId}>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs leading-5 text-muted-foreground">
              {post.category ? (
                <span className="font-medium text-foreground">
                  {post.category}
                </span>
              ) : null}
              {post.category ? <span aria-hidden="true">/</span> : null}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <h3
              id={titleId}
              className={cn(
                "mt-4 text-balance font-brand text-lg font-semibold leading-snug tracking-tight sm:text-xl",
                lead &&
                  "mt-7 max-w-lg text-2xl leading-tight sm:text-3xl lg:text-4xl",
              )}
            >
              {post.title}
            </h3>
            <p
              className={cn(
                "mt-3 text-sm leading-7 text-muted-foreground",
                lead && "mt-5 max-w-lg sm:text-base sm:leading-8",
              )}
            >
              {post.description}
            </p>
          </div>
          <div
            className={cn(
              "mt-6 flex items-end justify-between gap-4",
              lead && "mt-10 border-t border-border-subtle pt-6",
            )}
          >
            <ArticleByline post={post} />
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-background/60"
            >
              <ArrowRight className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </Card>
    </article>
  );
}

/** A compact archive row keeps long titles and publication details readable. */
export function BlogArticleRow({ post }: { readonly post: BlogPost }) {
  const titleId = `article-${post.slug}`;

  return (
    <article>
      <Link
        href={post.url}
        aria-labelledby={titleId}
        className={`${styles.articleRow} group grid gap-3 rounded-[5px] px-3 py-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6 sm:px-5 sm:py-8`}
      >
        <time
          dateTime={post.date}
          className="text-xs leading-6 text-muted-foreground"
        >
          {formatDate(post.date)}
        </time>
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {post.category ? (
                <p className="text-xs font-medium leading-6 text-muted-foreground">
                  {post.category}
                </p>
              ) : null}
              <h3
                id={titleId}
                className="mt-1 font-brand text-lg font-semibold leading-relaxed tracking-tight sm:text-xl"
              >
                {post.title}
              </h3>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:text-foreground motion-safe:group-hover:translate-x-0.5"
            />
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-3">
            <ArticleByline post={post} />
          </div>
        </div>
      </Link>
    </article>
  );
}
