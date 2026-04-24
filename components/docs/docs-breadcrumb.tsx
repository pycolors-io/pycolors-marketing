import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@pycolors/ui';

type DocsBreadcrumbItem = Readonly<{
  label: string;
  href?: string;
}>;

type DocsBreadcrumbProps = Readonly<{
  items: DocsBreadcrumbItem[];
  className?: string;
}>;

export function DocsBreadcrumb({
  items,
  className,
}: DocsBreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'flex flex-wrap items-center text-sm text-muted-foreground',
        className,
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="inline-flex items-center "
          >
            {index > 0 ? (
              <ChevronRight
                className="h-3.5 w-3.5 text-muted-foreground/60"
                aria-hidden="true"
              />
            ) : null}

            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  'rounded-md py-0.5 transition-colors hover:text-foreground',
                  index === 0 ? 'pl-0 pr-1.5' : 'px-1.5',
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'rounded-md px-1.5 py-0.5',
                  isLast ? 'font-medium text-foreground' : '',
                )}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
