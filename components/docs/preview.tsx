"use client";

import { cn } from "@pycolors/ui";
import * as React from "react";

export function Preview({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "docs-preview not-prose rounded-lg border border-border-subtle bg-card p-4 text-card-foreground sm:p-6",
        className,
      )}
      {...props}
    />
  );
}
