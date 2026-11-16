import { useCopy } from "@/lib/i18n/use-copy";
import { DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { Badge } from "@pycolors/ui";
import { Clock, Layers3 } from "lucide-react";
import { DocsBreadcrumb } from "@/components/docs/docs-breadcrumb";
import styles from "./docs-design.module.css";

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
  const tSite = useCopy();

  return (
    <header className={styles.articleHeader}>
      {breadcrumbs.length > 0 ? (
        <DocsBreadcrumb items={breadcrumbs} className={styles.breadcrumb} />
      ) : null}

      <DocsTitle className={styles.articleTitle}>{tSite(title)}</DocsTitle>

      {description ? (
        <DocsDescription className={styles.articleDescription}>
          {tSite(description)}
        </DocsDescription>
      ) : null}

      {(lastUpdated || appliesTo) && (
        <div className={styles.articleMeta}>
          {appliesTo ? (
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1.5 border-border-subtle px-2.5 text-[11px]"
            >
              <Layers3 className="size-3" aria-hidden="true" />
              {tSite(appliesTo)}
            </Badge>
          ) : null}

          {lastUpdated ? (
            <span className="inline-flex items-center gap-1.5 leading-5">
              <Clock className="size-3" aria-hidden="true" />
              {tSite("Updated ")}
              {tSite(lastUpdated)}
            </span>
          ) : null}
        </div>
      )}
    </header>
  );
}
