import Link from 'next/link';
import { Badge, Card, cn } from '@pycolors/ui';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export type TocItem = {
  id: string;
  label: string;
};

type OnThisPageInlineProps = {
  items: TocItem[];
};

export function OnThisPageInline({ items }: OnThisPageInlineProps) {
  return (
    <Card className="rounded-3xl p-5">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px]">
            Guide
          </Badge>
          <div className="text-sm font-medium text-foreground">
            On this page
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'rounded-full border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-muted',
                focusRing,
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
