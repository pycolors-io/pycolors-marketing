import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge, Button, Card } from '@pycolors/ui';
import { BlogCTA } from '@/types/blog';

type ArticleCTAProps = {
  cta?: BlogCTA;
};

const variantLabel: Record<
  NonNullable<BlogCTA['variant']>,
  string
> = {
  free: 'Starter Free',
  pro: 'Starter Pro',
  blocks: 'Advanced Blocks',
};

export function ArticleCTA({ cta }: ArticleCTAProps) {
  if (!cta) return null;

  const label = variantLabel[cta.variant ?? 'free'];

  return (
    <Card className="p-7 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md space-y-2">
          <Badge variant="outline">{label}</Badge>

          <h2 className="font-brand text-lg font-semibold tracking-tight">
            Turn this article into shipping leverage
          </h2>

          <p className="text-sm text-muted-foreground">
            Explore the PyColors offer connected to this
            implementation pattern.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/guides">Read Guides</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
