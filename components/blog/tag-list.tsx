import Link from 'next/link';

import { Badge, cn } from '@pycolors/ui';
import { normalizeTaxonomy } from '@/lib/blog/utils';

type TagListProps = {
  readonly tags: string[];
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          asChild
          variant="secondary"
          className="rounded-[5px] border border-border-subtle bg-surface-muted text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <Link
            href={`/blog/tags/${normalizeTaxonomy(tag)}`}
            className={cn(focusRing)}
          >
            {tag}
          </Link>
        </Badge>
      ))}
    </div>
  );
}
