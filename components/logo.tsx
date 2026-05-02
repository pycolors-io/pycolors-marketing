'use client';

import Link from 'next/link';
import { cn } from '@pycolors/ui';

const BRAND = '#6A30D4';
const BRAND_LIGHT = '#8B5CF6';
const BRAND_SOFT = '#A371F7';
const BRAND_DARK = '#0B0B10';

function Logomark() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-6 w-6 shrink-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* top crystal */}
      <path d="M20 4L30 18H10L20 4Z" fill={BRAND} />

      {/* bottom crystal */}
      <path d="M20 36L10 22H30L20 36Z" fill={BRAND_LIGHT} />

      {/* center cut */}
      <path d="M20 11L25 20L20 29L15 20L20 11Z" fill={BRAND_DARK} />

      {/* subtle center detail */}
      <circle cx="20" cy="20" r="1.15" fill={BRAND_SOFT} />
    </svg>
  );
}

function Wordmark() {
  return (
    <span
      className={cn(
        'select-none font-sans text-[15px] font-semibold leading-none tracking-[-0.05em]',
        'text-foreground antialiased',
      )}
    >
      pycolors
    </span>
  );
}

export function Logo() {
  return (
    <Link
      href="/docs"
      aria-label="PyColors Docs"
      className={cn(
        'group inline-flex items-center gap-2.5',
        'transition-opacity duration-200 hover:opacity-90',
      )}
    >
      <Logomark />
      <Wordmark />
    </Link>
  );
}
