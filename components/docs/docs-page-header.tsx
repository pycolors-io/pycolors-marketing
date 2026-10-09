import { DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { Badge } from "@pycolors/ui";
import { Clock, Layers3 } from "lucide-react";
import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb";

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
    <header className="mb-8 border-b border-border-subtle pb-8 sm:mb-10 sm:pb-10">
      {breadcrumbs.length > 0 ? (
        <DocsBreadcrumb items={breadcrumbs} className="mb-6" />
      ) : null}

      <DocsTitle className="m-0 text-balance font-brand text-3xl font-semibold leading-[1.15] tracking-[-0.035em] text-foreground sm:text-[40px]">
        {title}
      </DocsTitle>

      {description ? (
        <DocsDescription className="mb-0 mt-4 max-w-[65ch] text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {description}
        </DocsDescription>
      ) : null}

      {(lastUpdated || appliesTo) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {appliesTo ? (
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 border-border-subtle px-2.5 text-[11px]"
            >
              <Layers3 className="size-3" aria-hidden="true" />
              {appliesTo}
            </Badge>
          ) : null}

          {lastUpdated ? (
            <span className="inline-flex items-center gap-1.5 leading-5">
              <Clock className="size-3" aria-hidden="true" />
              Updated {lastUpdated}
            </span>
          ) : null}
        </div>
      )}
    </header>
  );
}
