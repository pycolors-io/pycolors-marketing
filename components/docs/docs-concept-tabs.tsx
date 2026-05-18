import * as React from 'react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from '@pycolors/ui';

type DocsConceptTabsItem = Readonly<{
  value: string;
  title: string;
  description: React.ReactNode;
  icon?: React.ElementType;
}>;

type DocsConceptTabsProps = Readonly<{
  items: readonly DocsConceptTabsItem[];
  defaultValue?: string;
  className?: string;
}>;

export function DocsConceptTabs({
  items,
  defaultValue,
  className,
}: DocsConceptTabsProps) {
  const initialValue = defaultValue ?? items[0]?.value;

  return (
    <Tabs
      defaultValue={initialValue}
      className={cn('not-prose my-8 w-full', className)}
    >
      <TabsList
        className={cn(
          'mb-0 h-auto w-full justify-start gap-0 overflow-x-auto rounded-none',
          'border-b border-border-subtle bg-transparent p-0',
        )}
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className={cn(
              'relative rounded-none border-b border-transparent bg-transparent',
              'px-3 py-2 text-sm font-medium text-muted-foreground shadow-none',
              'transition-colors hover:text-foreground',
              'data-[state=active]:border-primary',
              'data-[state=active]:bg-transparent',
              'data-[state=active]:text-foreground',
              'data-[state=active]:shadow-none',
              'focus-visible:ring-0 focus-visible:ring-offset-0',
            )}
          >
            {item.value}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <TabsContent
            key={item.value}
            value={item.value}
            className="mt-0"
          >
            <section
              className={cn(
                'border-x border-b border-border-subtle bg-card',
                'rounded-b-[5px] p-5 shadow-soft sm:p-6',
              )}
            >
              <div className="flex items-start gap-3">
                {Icon ? (
                  <span
                    className={cn(
                      'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[5px]',
                      'border border-border-subtle bg-muted/35 text-muted-foreground',
                    )}
                    aria-hidden="true"
                  >
                    <Icon className="size-4" />
                  </span>
                ) : null}

                <div className="min-w-0">
                  <h3 className="m-0 text-sm font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>

                  <div
                    className={cn(
                      'mt-2 text-sm leading-7 text-muted-foreground',
                      '[&_code]:rounded-[4px]',
                      '[&_code]:border [&_code]:border-border-subtle',
                      '[&_code]:bg-muted/40',
                      '[&_code]:px-1.5 [&_code]:py-0.5',
                      '[&_code]:font-mono [&_code]:text-[12px]',
                      '[&_code]:font-medium [&_code]:text-foreground',
                    )}
                  >
                    {item.description}
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
