'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LogoVariant = 'io' | 'ui' | 'docs' | 'none';

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

  if (pathname === '/ui' || pathname.startsWith('/ui/')) return 'ui';
  if (pathname === '/docs' || pathname.startsWith('/docs/'))
    return 'docs';

  return 'io';
}

function getPillLabel(variant: LogoVariant) {
  switch (variant) {
    case 'io':
      return 'IO';
    case 'ui':
      return 'UI';
    case 'docs':
      return 'Docs';
    default:
      return null;
  }
}

export function Logo() {
  const pathname = usePathname();
  const variant = getVariant(pathname);
  const pill = getPillLabel(variant);

  return (
    <Link
      href="/"
      aria-label="PyColors"
      className="
        group inline-flex h-10 items-center gap-2
        rounded-full border border-border
        bg-background px-3
        font-semibold
        transition-colors duration-150
        hover:bg-accent/40
      "
    >
      <span className="font-brand text-sm tracking-tight text-foreground transition-colors duration-150">
        PyColors
      </span>

      {pill ? (
        <>
          <span
            className="
              h-4 w-px bg-border/70
              transition-colors duration-150
              group-hover:bg-border/40
            "
            aria-hidden="true"
          />

          <span
            className="
              font-brand
              inline-flex h-6 min-w-6 items-center justify-center
              rounded-full
              bg-primary
              px-1.5
              text-[11px] font-semibold uppercase
              text-primary-foreground
              transition-all duration-150
              group-hover:scale-[1.04]
              group-hover:bg-primary/90
            "
          >
            {pill}
          </span>
        </>
      ) : null}
    </Link>
  );
}
