'use client';

import Link from 'next/link';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { cn } from '@pycolors/ui';

const BRAND = '#6A30D4';

const wordmarkFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

function Logomark() {
  return (
    <svg
      viewBox="0 0 44 40"
      className={cn(
        'h-8.5 w-8.5 shrink-0',
        'transition-transform duration-300 ease-out',
        'group-hover:scale-[1.03]',
      )}
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
        fill={BRAND}
        className={cn(
          'transition-opacity duration-300 ease-out',
          'group-hover:opacity-90',
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
        'select-none text-[18px] font-extrabold leading-none tracking-[-0.075em]',
        'text-foreground antialiased',
      )}
    >
      pycolors{' '}
      <span className="ml-1" style={{ color: BRAND }}>
        /docs
      </span>
    </span>
  );
}

export function DocsLogo() {
  return (
    <Link
      href="/docs"
      aria-label="PyColors Docs"
      className={cn(
        'group inline-flex items-center gap-0.5',
        'transition-opacity duration-200 hover:opacity-90',
      )}
    >
      <Logomark />
      <Wordmark />
    </Link>
  );
}
