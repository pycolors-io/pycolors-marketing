import * as React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

import { cn } from '@pycolors/ui';

type PreferAvoidProps = Readonly<{
  prefer: readonly string[];
  avoid: readonly string[];
  className?: string;
}>;

type PanelProps = Readonly<{
  tone: 'prefer' | 'avoid';
  title: string;
  items: readonly string[];
}>;

type StatusIconProps = Readonly<{
  tone: 'prefer' | 'avoid';
  icon: React.ElementType;
}>;

export function PreferAvoid({
  prefer,
  avoid,
  className,
}: PreferAvoidProps) {
  return (
    <div className={cn('my-8 grid gap-3 md:grid-cols-2', className)}>
      <Panel tone="prefer" title="Prefer" items={prefer} />
      <Panel tone="avoid" title="Avoid" items={avoid} />
    </div>
  );
}

function Panel({ tone, title, items }: PanelProps) {
  const isPrefer = tone === 'prefer';
  const Icon = isPrefer ? CheckCircle2 : XCircle;

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-[5px] border bg-card/70',
        'border-border/60 shadow-[0_1px_0_rgba(255,255,255,0.03)]',
      )}
    >
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-px',
          isPrefer ? 'bg-primary/60' : 'bg-destructive/60',
        )}
      />

      <div className="grid h-14 grid-cols-[20px_1fr] items-center gap-2 border-b border-border/40 bg-muted/18 px-3.5">
        <StatusIcon tone={tone} icon={Icon} />

        <h3 className="m-0 translate-y-px text-[13px] font-semibold leading-none tracking-tight text-foreground mt-2">
          {title}
        </h3>
      </div>

      <ul className="m-0 divide-y divide-border/35">
        {items.map((item) => (
          <li
            key={item}
            className="grid grid-cols-[20px_1fr] items-start gap-2.5 px-3.5 py-2.5 text-[13px] leading-5 text-muted-foreground"
          >
            <Icon
              className={cn(
                'mt-0.75 size-3.5 shrink-0',
                isPrefer ? 'text-primary/75' : 'text-destructive/75',
              )}
              aria-hidden="true"
            />

            <span className="min-w-0">{renderInlineCode(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatusIcon({ tone, icon: Icon }: StatusIconProps) {
  const isPrefer = tone === 'prefer';

  return (
    <span
      className={cn(
        'relative flex size-5 items-center justify-center rounded-[5px]',
        'border shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
        isPrefer
          ? 'border-primary/15 bg-primary/[0.07] text-primary'
          : 'border-destructive/15 bg-destructive/[0.07] text-destructive',
      )}
    >
      <span
        className={cn(
          'absolute inset-0 rounded-[5px]',
          isPrefer ? 'bg-primary/1.5' : 'bg-destructive/1.5',
        )}
      />

      <Icon className="relative z-1 size-3.25" aria-hidden="true" />
    </span>
  );
}

function renderInlineCode(value: string) {
  const parts = value.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>
      );
    }

    return (
      <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
    );
  });
}
