import { useCopy } from "@/lib/i18n/use-copy";
import { BreadcrumbClient, type BreadcrumbProps } from "./breadcrumb.client";

/** Translate server-owned labels before crossing the interactive client boundary. */
export function Breadcrumb({ items, ...props }: BreadcrumbProps) {
  const tSite = useCopy();
  return (
    <BreadcrumbClient
      {...props}
      items={items.map((item) => ({ ...item, label: tSite(item.label) }))}
    />
  );
}
