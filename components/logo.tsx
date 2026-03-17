'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LogoVariant = 'io' | 'ui' | 'docs';

function getVariant(pathname: string | null): LogoVariant {
  if (!pathname) return 'io';

  if (
    pathname === '/' ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/license') ||
    pathname.startsWith('/roadmap') ||
    pathname.startsWith('/changelog') ||
    pathname.startsWith('/templates')
  ) {
    return 'io';
  }

  if (pathname.startsWith('/ui')) return 'ui';
  if (pathname.startsWith('/docs')) return 'docs';

  return 'io';
}

function getLabel(variant: LogoVariant) {
  switch (variant) {
    case 'io':
      return 'IO';
    case 'ui':
      return 'UI';
    case 'docs':
      return 'DOCS';
  }
}

function Logomark() {
  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-primary text-primary-foreground"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 18V6H13.5C15.9853 6 18 8.01472 18 10.5C18 12.9853 15.9853 15 13.5 15H8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Logo() {
  const pathname = usePathname();
  const variant = getVariant(pathname);
  const label = getLabel(variant);

  return (
    <Link
      href="/"
      aria-label="PyColors"
      className="group inline-flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-150 hover:bg-accent/30"
    >
      <Logomark />

      <span className="font-brand text-sm font-semibold tracking-tight text-foreground">
        PyColors
      </span>

      <span className="inline-flex items-center justify-center rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground transition-colors group-hover:border-border group-hover:text-foreground">
        {label}
      </span>
    </Link>
  );
}
