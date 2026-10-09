"use client";

import Link from "next/link";

import { cn } from "@pycolors/ui";

import { wordmarkFont } from "./wordmark-font";

export function Logomark() {
  // Match the visible ink of the local wordmark font, not just its line box.
  return (
    <svg
      viewBox="0 0 44 40"
      className="h-8.5 w-8.5 shrink-0 translate-y-[2.5px] text-primary"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Two forward facets share a 1:2 slope and 5-unit terminals.
          The trailing tip sits 8 units behind the leading tip; the open cut
          separates the facets without relying on color or opacity. */}
      <path
        d="M9 7 35 20 30 22.5 9 12ZM9 28 22 21.5 27 24 9 33Z"
        transform="translate(0 40) scale(1 -1)"
        fill="currentColor"
        className={cn(
          "transition-opacity duration-300 ease-out motion-reduce:transition-none",
          "group-hover:opacity-90",
        )}
      />
    </svg>
  );
}
function Wordmark() {
  return (
    <span
      className={cn(
        wordmarkFont.className,
        "inline-flex h-[18px] w-18 shrink-0 items-center whitespace-nowrap select-none text-[18px] font-extrabold leading-none tracking-[-0.04em]",
        "text-foreground antialiased",
        "transition-opacity duration-300 ease-out motion-reduce:transition-none",
        "group-hover:opacity-90",
      )}
    >
      pycolors
    </span>
  );
}

export function Logo({
  variant = "default",
}: {
  readonly variant?: "default" | "docs";
}) {
  const isDocs = variant === "docs";

  return (
    <Link
      href={isDocs ? "/docs" : "/"}
      aria-label={isDocs ? "PyColors Docs" : "PyColors"}
      className={cn(
        "group inline-flex min-h-11 shrink-0 items-center rounded-md",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <Logomark />
      {/* A fixed wordmark width and centered badge keep both variants aligned. */}
      <span className="inline-flex h-5 items-center gap-2">
        <Wordmark />
        {isDocs ? (
          <span className="inline-flex h-5 shrink-0 items-center rounded border border-border-subtle bg-transparent px-1.5 text-[11px] font-medium leading-none tracking-normal text-muted-foreground">
            Docs
          </span>
        ) : null}
      </span>
    </Link>
  );
}
