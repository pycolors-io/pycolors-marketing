"use client";

import Link from "next/link";

import { cn } from "@pycolors/ui";

import { wordmarkFont } from "./wordmark-font";

export function Logomark() {
  return (
    <svg
      viewBox="0 0 44 40"
      className="h-8.5 w-8.5 shrink-0 text-primary"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 31
           Q10.6 29.8 11.4 28.6
           L20.2 10.8
           Q21 9.2 22 9.2
           Q23 9.2 23.8 10.8
           L32.6 28.6
           Q33.4 29.8 34 31
           H27.8
           Q27 31 26.5 29.9
           L22 21
           L17.5 29.9
           Q17 31 16.2 31
           H10Z"
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
