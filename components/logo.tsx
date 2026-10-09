"use client";

import Link from "next/link";

import { cn } from "@pycolors/ui";

import { wordmarkFont } from "./wordmark-font";

export function Logomark() {
  // The inset shape at 17px matches the wordmark's ~14.6px visible glyph height.
  return (
    <svg
      viewBox="7 5 30 30"
      className="size-[17px] shrink-0 text-primary"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Two upward-facing facets share a 1:2 slope and 5-unit terminals.
          The trailing tip sits 8 units behind the leading tip; the open cut
          separates the facets without relying on color or opacity. */}
      <path
        d="M9 7 35 20 30 22.5 9 12ZM9 28 22 21.5 27 24 9 33Z"
        transform="rotate(-90 22 20) translate(0 40) scale(1 -1)"
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
        // Geist's visible glyphs sit ~1.25px below the line box's center.
        "inline-flex -translate-y-[1.25px] shrink-0 items-center whitespace-nowrap select-none text-[17px] font-semibold leading-5 tracking-[-0.025em]",
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
        "group inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <Logomark />
      {/* Natural text width keeps the Docs badge clear of the wordmark. */}
      <span className="inline-flex items-center gap-2.5">
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
