'use client';

import Link from 'next/link';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

import { JsonLd } from '@/components/seo/json-ld';
import {
  generateBreadcrumbJsonLd,
  type BreadcrumbItem,
} from '@/lib/seo/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@pycolors/ui';
import { cn } from '@pycolors/ui';

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items.length) return null;

  const jsonLd = generateBreadcrumbJsonLd(items);
  const shouldCollapseOnMobile = items.length > 3;

  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  const hiddenItems = shouldCollapseOnMobile
    ? items.slice(1, -1)
    : [];

  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={jsonLd} />

      <nav aria-label="Breadcrumb" className={className}>
        {/* Mobile */}
        <ol className="flex min-w-0 items-center gap-1 text-sm text-muted-foreground sm:hidden">
          {/* First */}
          <li className="inline-flex min-w-0 items-center gap-1.5">
            {items.length === 1 ? (
              <span
                aria-current="page"
                className="block max-w-[220px] truncate font-medium text-foreground"
                title={firstItem.label}
              >
                {firstItem.label}
              </span>
            ) : (
              <Link
                href={firstItem.href}
                className="shrink-0 transition-colors hover:text-foreground"
              >
                {firstItem.label}
              </Link>
            )}
          </li>

          {/* Collapsed middle */}
          {shouldCollapseOnMobile ? (
            <>
              <li className="inline-flex items-center gap-1.5">
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label="Show breadcrumb path"
                      className={cn(
                        'inline-flex h-7 w-7 items-center justify-center rounded-sm transition-colors hover:bg-muted hover:text-foreground',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                      )}
                    >
                      <MoreHorizontal
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="min-w-44"
                  >
                    {hiddenItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              <li className="inline-flex items-center gap-1.5">
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />

                <span
                  aria-current="page"
                  className="block max-w-[180px] truncate font-medium text-foreground"
                  title={lastItem.label}
                >
                  {lastItem.label}
                </span>
              </li>
            </>
          ) : items.length > 1 ? (
            items.slice(1).map((item, index) => {
              const isLast = index === items.slice(1).length - 1;

              return (
                <li
                  key={`${item.href}-${index}-mobile`}
                  className="inline-flex min-w-0 items-center gap-1.5"
                >
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />

                  {isLast ? (
                    <span
                      aria-current="page"
                      className="block max-w-[180px] truncate font-medium text-foreground"
                      title={item.label}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="shrink-0 transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })
          ) : null}
        </ol>

        {/* Desktop */}
        <ol className="hidden min-w-0 flex-wrap items-center gap-1 text-sm text-muted-foreground sm:flex">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={`${item.href}-${index}-desktop`}
                className="inline-flex min-w-0 items-center gap-1.5"
              >
                {index > 0 ? (
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                ) : null}

                {isLast ? (
                  <span
                    aria-current="page"
                    className="block max-w-[28rem] truncate font-medium text-foreground"
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
