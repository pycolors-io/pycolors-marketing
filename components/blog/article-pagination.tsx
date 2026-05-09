import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button, Card, cn } from '@pycolors/ui';
import { BlogPost } from '@/types/blog';

type ArticlePaginationProps = {
  readonly previous: BlogPost | null;
  readonly next: BlogPost | null;
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function ArticlePagination({
  previous,
  next,
}: ArticlePaginationProps) {
  if (!previous && !next) return null;

  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface p-4 shadow-soft sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {previous ? (
          <Link
            href={previous.url}
            className={cn(
              'group rounded-[5px] border border-border-subtle bg-surface-muted p-4 transition-colors hover:border-border hover:bg-surface-elevated',
              focusRing,
            )}
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Previous article
            </div>

            <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-foreground">
              {previous.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.url}
            className={cn(
              'group rounded-[5px] border border-border-subtle bg-surface-muted p-4 text-right transition-colors hover:border-border hover:bg-surface-elevated',
              focusRing,
            )}
          >
            <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground">
              Next article
              <ArrowRight
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
            </div>

            <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-foreground">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          asChild
          size="sm"
          variant="outline"
          className={cn('rounded-[5px]', focusRing)}
        >
          <Link href="/blog">Back to all articles</Link>
        </Button>
      </div>
    </Card>
  );
}
