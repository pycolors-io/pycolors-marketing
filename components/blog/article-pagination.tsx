import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button, Card } from '@pycolors/ui';
import { BlogPost } from '@/types/blog';

type ArticlePaginationProps = {
  previous: BlogPost | null;
  next: BlogPost | null;
};

export function ArticlePagination({
  previous,
  next,
}: ArticlePaginationProps) {
  if (!previous && !next) return null;

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div>
          {previous ? (
            <Button asChild variant="outline">
              <Link href={previous.url}>
                <ArrowLeft
                  className="mr-2 h-4 w-4"
                  aria-hidden="true"
                />
                Previous article
              </Link>
            </Button>
          ) : null}
        </div>

        <div>
          {next ? (
            <Button asChild variant="outline">
              <Link href={next.url}>
                Next article
                <ArrowRight
                  className="ml-2 h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
