import Link from 'next/link';
import { ArrowRight, Clock3 } from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { formatDate } from '@/lib/blog/utils';
import { BlogPost } from '@/types/blog';

type ArticleCardProps = {
  readonly post: BlogPost;
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Card className="group flex h-full flex-col justify-between rounded-[5px] border border-border-subtle bg-surface p-5 shadow-soft transition-colors hover:border-border hover:bg-surface-elevated">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-[5px] border-platform-border-subtle bg-platform-muted text-[11px]"
          >
            {post.category}
          </Badge>

          {post.featured ? (
            <Badge className="rounded-[5px] text-[11px]">
              Featured
            </Badge>
          ) : null}
        </div>

        <div className="space-y-2.5">
          <h3 className="font-brand text-base font-semibold leading-snug tracking-tight text-foreground">
            <Link
              href={post.url}
              className={cn('outline-none', focusRing)}
            >
              {post.title}
            </Link>
          </h3>

          <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
            {post.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>

          {post.readingTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingTime}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <Button
          asChild
          size="sm"
          variant="outline"
          className={cn(
            'h-9 w-full rounded-[5px] text-xs font-medium transition-colors group-hover:border-primary/40',
            focusRing,
          )}
        >
          <Link href={post.url}>
            Read article
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
