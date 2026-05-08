import { CalendarDays, Clock3, Sparkles } from 'lucide-react';

import { Badge, cn } from '@pycolors/ui';
import { AuthorBadge } from '@/components/blog/author-badge';
import { TagList } from '@/components/blog/tag-list';
import { ShareArticle } from '@/components/blog/share-article';
import { formatDate } from '@/lib/blog/utils';

type ArticleHeaderProps = {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly date: string;
  readonly readingTime?: string;
  readonly tags: string[];
  readonly shareUrl: string;
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
    <header className="mx-auto w-full max-w-5xl">
      <div className="space-y-10 sm:space-y-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge
            variant="secondary"
            className={cn(
              'gap-1.5 rounded-[5px]',
              'border border-border-subtle',
              'bg-surface-muted/80',
              'px-2.5 py-1',
              'text-[11px] font-medium',
            )}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            PyColors Blog
          </Badge>

          <Badge
            variant="outline"
            className={cn(
              'rounded-[5px]',
              'border-border-subtle',
              'bg-background/60',
              'px-2.5 py-1',
              'text-[11px] font-medium',
            )}
          >
            Technical article
          </Badge>
        </div>

        <div className="mx-auto max-w-5xl space-y-6 text-center">
          <h1
            className={cn(
              'text-balance',
              'font-brand',
              'text-4xl font-semibold',
              'tracking-[-0.05em]',
              'text-foreground',
              'sm:text-5xl',
              'lg:text-[4.5rem]',
              'lg:leading-[0.95]',
            )}
          >
            {title}
          </h1>

          <p
            className={cn(
              'mx-auto max-w-3xl',
              'text-balance',
              'text-[16px] leading-8',
              'text-muted-foreground',
              'sm:text-lg',
            )}
          >
            {description}
          </p>
        </div>

        <div
          className={cn(
            'mx-auto max-w-4xl',
            'border-y border-border-subtle',
            'py-5 sm:py-6',
          )}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4">
              <AuthorBadge name={author} />

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  {formatDate(date)}
                </span>

                {readingTime ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                    {readingTime}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <TagList tags={tags} />
              <ShareArticle title={title} url={shareUrl} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
