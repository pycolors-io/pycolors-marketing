import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@pycolors/ui';

type ReadingOrderItem = Readonly<{
  title: string;
  href: string;
  description: string;
}>;

type ReadingOrderProps = Readonly<{
  items: readonly ReadingOrderItem[];
  className?: string;
}>;

export function ReadingOrder({
  items,
  className,
}: ReadingOrderProps) {
  return (
    <div
      className={cn(
        'not-prose my-8 overflow-hidden rounded-[5px]',
        'border border-border-subtle bg-card',
        'shadow-soft',
        className,
      )}
    >
      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'group relative grid grid-cols-[32px_1fr_auto] items-start gap-4',
            'border-b border-border-subtle',
            'px-4 py-4 no-underline',
            'transition-colors duration-200',
            'last:border-b-0',
            'hover:bg-primary/[0.02]',
            'sm:px-5',
          )}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-primary/[0.03] opacity-0 transition-opacity group-hover:opacity-100" />

          <span
            className={cn(
              'flex size-7 items-center justify-center rounded-[5px]',
              'border border-primary/10',
              'bg-primary/[0.05]',
              'text-xs font-medium text-primary/80',
              'transition-colors duration-200',
              'group-hover:border-primary/20',
              'group-hover:bg-primary/[0.08]',
            )}
          >
            {index + 1}
          </span>

          <span className="min-w-0">
            <span
              className={cn(
                'block text-sm font-medium tracking-tight',
                'text-foreground transition-colors',
                'group-hover:text-primary',
              )}
            >
              {item.title}
            </span>

            <span className="mt-1.5 block text-sm leading-6 text-muted-foreground">
              {item.description}
            </span>
          </span>

          <ArrowRight
            className={cn(
              'mt-1 size-4 shrink-0 text-muted-foreground',
              'transition-all duration-200',
              'group-hover:translate-x-0.5',
              'group-hover:text-primary',
            )}
            aria-hidden="true"
          />
        </Link>
      ))}
    </div>
  );
}
