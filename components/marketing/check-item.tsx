import * as React from "react";
import { cn } from "@pycolors/ui";
import { Check } from "lucide-react";

export type MarketingCheckItemProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

/**
 * One proof/inclusion list row. Must be rendered inside a `ul`/`ol`.
 *
 * The check icon is decorative: the meaning always lives in the caller-owned
 * text, never in the icon or in color.
 */
export function MarketingCheckItem({
  children,
  className,
}: MarketingCheckItemProps) {
  return (
    <li
      className={cn(
        "flex items-start gap-2.5 text-sm text-muted-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface"
      >
        <Check className="h-3 w-3 text-foreground" />
      </span>
      <span className="leading-6">{children}</span>
    </li>
  );
}
