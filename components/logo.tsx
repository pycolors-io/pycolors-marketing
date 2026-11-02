"use client";

import Link from "next/link";

import { cn } from "@pycolors/ui";

import { MARKETING_BRAND } from "@/lib/brand-identity";

export function Logomark() {
  return (
    <svg
      viewBox={MARKETING_BRAND.mark.viewBox}
      className="size-[15px] shrink-0 text-primary"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={MARKETING_BRAND.mark.path}
        fill="currentColor"
        className={cn(
          "transition-opacity duration-300 ease-out motion-reduce:transition-none",
          "group-hover:opacity-90",
        )}
      />
    </svg>
  );
}
function BrandSignature() {
  return (
    <svg
      viewBox={MARKETING_BRAND.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "h-[15px] w-auto shrink-0 text-foreground",
        "transition-opacity duration-300 ease-out motion-reduce:transition-none",
        "group-hover:opacity-90",
      )}
    >
      <g transform={MARKETING_BRAND.mark.transform} className="text-primary">
        <path d={MARKETING_BRAND.mark.path} fill="currentColor" />
      </g>
      <g transform={MARKETING_BRAND.wordmark.transform} fill="currentColor">
        {MARKETING_BRAND.wordmark.paths.map((path) => (
          <path key={path.transform} d={path.d} transform={path.transform} />
        ))}
      </g>
    </svg>
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
        "group inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-[4px]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <BrandSignature />
      <span className="sr-only">PYCOLORS</span>
      {isDocs ? (
        <span className="inline-flex h-5 shrink-0 items-center rounded border border-border-subtle bg-transparent px-1.5 text-[11px] font-medium leading-none tracking-normal text-muted-foreground">
          Docs
        </span>
      ) : null}
    </Link>
  );
}
