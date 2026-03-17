import type { ReactNode } from 'react';
import { Card } from '@pycolors/ui';

type TocItem = {
  title: ReactNode;
  url: string;
  depth: number;
};

type OnThisPageProps = {
  items: TocItem[];
};

export function OnThisPage({ items }: OnThisPageProps) {
  if (!items.length) return null;

  return (
    <Card className="sticky top-24 p-5">
      <div className="space-y-4">
        <p className="font-brand text-sm font-semibold tracking-tight">
          On this page
        </p>

        <nav aria-label="Table of contents">
          <ol className="space-y-2">
            {items.map((item) => (
              <li
                key={item.url}
                className={item.depth > 2 ? 'pl-3' : undefined}
              >
                <a
                  href={item.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </Card>
  );
}
