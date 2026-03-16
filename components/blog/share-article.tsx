'use client';

import { useMemo } from 'react';
import { Button } from '@pycolors/ui';

type ShareArticleProps = {
  title: string;
  url: string;
};

export function ShareArticle({ title, url }: ShareArticleProps) {
  const encoded = useMemo(
    () => ({
      title: encodeURIComponent(title),
      url: encodeURIComponent(url),
    }),
    [title, url],
  );

  async function copyLink() {
    await navigator.clipboard.writeText(url);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`}
          target="_blank"
          rel="noreferrer"
        >
          Share on LinkedIn
        </a>
      </Button>

      <Button asChild variant="outline" size="sm">
        <a
          href={`https://twitter.com/intent/tweet?text=${encoded.title}&url=${encoded.url}`}
          target="_blank"
          rel="noreferrer"
        >
          Share on X
        </a>
      </Button>

      <Button variant="outline" size="sm" onClick={copyLink}>
        Copy link
      </Button>
    </div>
  );
}
