import { ExternalLink } from "lucide-react";
import { getUiExplorerUrl } from "@/lib/docs/ui-explorer";

export function UiExplorerLink({
  slug,
}: {
  readonly slug?: readonly string[];
}) {
  const href = getUiExplorerUrl(slug);
  if (!href) return null;

  return (
    <p className="mb-6 text-sm text-muted-foreground">
      <a
        href={href}
        className="inline-flex items-center gap-2 rounded-sm font-medium text-foreground underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        Open interactive example in PyColors UI Explorer
        <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
      </a>
    </p>
  );
}
