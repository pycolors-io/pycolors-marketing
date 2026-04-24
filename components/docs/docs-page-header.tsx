import { DocsDescription, DocsTitle } from 'fumadocs-ui/page';
import { Badge } from '@pycolors/ui';
import { Clock, Layers3 } from 'lucide-react';
import { DocsBreadcrumb } from '@/components/docs/docs-breadcrumb';

type DocsBreadcrumbItem = Readonly<{
  label: string;
  href?: string;
}>;

type DocsPageHeaderProps = Readonly<{
  title: string;
  description?: string;
  lastUpdated?: string;
  appliesTo?: string;
  breadcrumbs?: DocsBreadcrumbItem[];
}>;

export function DocsPageHeader({
  title,
  description,
  lastUpdated,
  appliesTo,
  breadcrumbs = [],
}: DocsPageHeaderProps) {
  return (
    <header className="space-y-5 border-b border-border/50">
      {breadcrumbs.length > 0 ? (
        <DocsBreadcrumb items={breadcrumbs} />
      ) : null}

      {(lastUpdated || appliesTo) && (
        <div className="flex flex-wrap items-center gap-2">
          {appliesTo ? (
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1 text-[11px]"
            >
              <Layers3 className="h-3 w-3" />
              {appliesTo}
            </Badge>
          ) : null}

          {lastUpdated ? (
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"
            >
              <Clock className="h-3 w-3" />
              Updated {lastUpdated}
            </Badge>
          ) : null}
        </div>
      )}

      <DocsTitle className="font-brand text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </DocsTitle>

      {description ? (
        <DocsDescription className="max-w-2xl text-[15px] leading-7 text-muted-foreground sm:text-base">
          {description}
        </DocsDescription>
      ) : null}
    </header>
  );
}
