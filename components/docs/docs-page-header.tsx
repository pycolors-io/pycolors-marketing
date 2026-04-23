import { DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { Badge } from '@pycolors/ui';
import { Clock, Layers3 } from 'lucide-react';

type DocsPageHeaderProps = Readonly<{
  title: string;
  description?: string;
  lastUpdated?: string;
  appliesTo?: string;
}>;

export function DocsPageHeader({
  title,
  description,
  lastUpdated,
  appliesTo,
}: DocsPageHeaderProps) {
  return (
    <header className="space-y-5  ">
      {/* Meta badges */}
      {(lastUpdated || appliesTo) && (
        <div className="flex flex-wrap items-center gap-2">
          {appliesTo && (
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1 text-[11px]"
            >
              <Layers3 className="h-3 w-3" />
              {appliesTo}
            </Badge>
          )}

          {lastUpdated && (
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"
            >
              <Clock className="h-3 w-3" />
              Last updated {lastUpdated}
            </Badge>
          )}
        </div>
      )}

      {/* Title */}
      <DocsTitle className="font-brand text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </DocsTitle>

      {/* Description */}
      {description && (
        <DocsDescription className="max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-base">
          {description}
        </DocsDescription>
      )}
    </header>
  );
}
