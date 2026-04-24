'use client';

import Link from 'next/link';
import { cn } from '@pycolors/ui';

function Logomark() {
  return (
    <span
      className={cn(
        'relative inline-flex h-7 w-7 items-center justify-center rounded-md',
        'bg-foreground text-background',
        'transition-all duration-200 ease-out',
        'group-hover:scale-[1.02] group-active:scale-[0.98]',
      )}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute inset-0 rounded-md bg-foreground/20 opacity-0 blur-[6px] transition-opacity duration-200 group-hover:opacity-40" />

      <svg
        viewBox="0 0 24 24"
        className="relative h-3.75 w-3.75 transition-transform duration-200 group-hover:scale-[1.03]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 18V6H12.8C15.1 6 17 7.8 17 10C17 12.2 15.1 14 12.8 14H8"
          stroke="currentColor"
          strokeWidth="2.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Wordmark() {
  return (
    <span
      className={cn(
        'text-[14px] font-semibold tracking-tight text-foreground',
        'transition-all duration-200',
        'group-hover:opacity-90',
      )}
    >
      PyColors
    </span>
  );
}

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="PyColors — Build production-ready SaaS faster"
      className={cn(
        'group inline-flex items-center gap-2',
        'transition-all duration-150',
        'hover:opacity-90 active:scale-[0.99]',
      )}
    >
      <Logomark />
      <Wordmark />
    </Link>
  );
}
