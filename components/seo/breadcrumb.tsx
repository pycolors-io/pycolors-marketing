import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { JsonLd } from '@/components/seo/json-ld';
import {
  generateBreadcrumbJsonLd,
  type BreadcrumbItem,
} from '@/lib/seo/breadcrumb';

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items.length) return null;

  const jsonLd = generateBreadcrumbJsonLd(items);

  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={jsonLd} />

      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={`${item.href}-${index}`}
                className="inline-flex items-center gap-1.5"
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
                    className="font-medium text-foreground"
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
