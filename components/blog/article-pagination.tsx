import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types/blog";

type ArticlePaginationProps = {
  readonly previous: BlogPost | null;
  readonly next: BlogPost | null;
};

export function ArticlePagination({ previous, next }: ArticlePaginationProps) {
  if (!previous && !next) return null;
  return (
    <nav aria-label="More articles" className="grid gap-4 sm:grid-cols-2">
      {(
        [
          { post: previous, label: "Previous article", Icon: ArrowLeft },
          { post: next, label: "Next article", Icon: ArrowRight },
        ] as const
      ).map(({ post, label, Icon }) =>
        post ? (
          <Link
            key={post.slug}
            href={post.url}
            className="group flex flex-col gap-3 rounded-lg border border-border-subtle p-5 transition-colors hover:bg-surface-muted/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className="size-3.5" aria-hidden="true" />
              {label}
            </span>
            <span className="text-sm font-medium leading-6">{post.title}</span>
          </Link>
        ) : null,
      )}
    </nav>
  );
}
