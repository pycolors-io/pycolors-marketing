import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { formatDate } from '@/lib/blog/utils';
import { BlogPost } from '@/types/blog';

type ArticleCardProps = {
  post: BlogPost;
};

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between p-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
          {post.featured ? (
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          ) : null}
        </div>

        <div className="space-y-2">
          <h3 className="font-brand text-base font-semibold tracking-tight">
            {post.title}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          {post.readingTime ? <span>{post.readingTime}</span> : null}
        </div>
      </div>

      <div className="mt-6">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="w-full"
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
