import { AuthorBadge } from '@/components/blog/author-badge';
import { TagList } from '@/components/blog/tag-list';
import { ShareArticle } from '@/components/blog/share-article';
import { formatDate } from '@/lib/blog/utils';

type ArticleHeaderProps = {
  title: string;
  description: string;
  author: string;
  date: string;
  readingTime?: string;
  tags: string[];
  shareUrl: string;
};

export function ArticleHeader({
  title,
  description,
  author,
  date,
  readingTime,
  tags,
  shareUrl,
}: ArticleHeaderProps) {
  return (
    <div className="w-full max-w-4xl space-y-8">
      <div className="space-y-4">
        <h1 className="font-brand text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>

        <p className="mx-auto max-w-3xl text-balance text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>

      <div className="rounded-2xl border bg-background p-5 sm:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <AuthorBadge name={author} />

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{formatDate(date)}</span>
              {readingTime ? <span>{readingTime}</span> : null}
            </div>
          </div>

          <div className="space-y-4">
            <TagList tags={tags} />
            <ShareArticle title={title} url={shareUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
