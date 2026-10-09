import Link from "next/link";
import { Badge } from "@pycolors/ui";
import { AuthorBadge } from "./author-badge";
import { TagList } from "./tag-list";
import { ShareArticle } from "./share-article";
import { formatDate, normalizeTaxonomy } from "@/lib/blog/utils";

type ArticleHeaderProps = {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly date: string;
  readonly readingTime?: string;
  readonly tags: string[];
  readonly shareUrl: string;
  readonly category: string;
};

export function ArticleHeader({
  title,
  description,
  author,
  date,
  readingTime,
  tags,
  shareUrl,
  category,
}: ArticleHeaderProps) {
  return (
    <header className="border-b border-border-subtle pb-8 sm:pb-10">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {category ? (
          <Link
            href={`/blog/categories/${normalizeTaxonomy(category)}`}
            className="inline-flex min-h-11 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Badge
              variant="outline"
              className="border-border-subtle bg-background px-3 text-[11px]"
            >
              {category}
            </Badge>
          </Link>
        ) : null}
        <time dateTime={date}>{formatDate(date)}</time>
        {readingTime ? (
          <>
            <span aria-hidden="true">/</span>
            <span>{readingTime}</span>
          </>
        ) : null}
      </div>
      <h1
        id="article-title"
        className="mt-5 max-w-5xl text-balance font-brand text-3xl font-semibold leading-[1.15] tracking-[-0.035em] sm:text-[40px]"
      >
        {title}
      </h1>
      <p className="mt-5 max-w-[65ch] text-pretty text-[15px] leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
        <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-4">
          {author ? <AuthorBadge name={author} /> : null}
          <TagList tags={tags} />
        </div>
        <ShareArticle title={title} url={shareUrl} />
      </div>
    </header>
  );
}
