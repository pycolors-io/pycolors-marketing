'use client';

import Link from 'next/link';

function Logomark() {
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-background"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4.5 w-4.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 18V6H12.8C15.1 6 17 7.8 17 10C17 12.2 15.1 14 12.8 14H8"
          stroke="currentColor"
          strokeWidth="2.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="PyColors"
      className="group inline-flex items-center gap-2.5 transition-opacity duration-150 hover:opacity-90"
    >
      <Logomark />
    </Link>
  );
}
