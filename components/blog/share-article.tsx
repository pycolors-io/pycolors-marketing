'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@pycolors/ui';

type ShareArticleProps = {
  title: string;
  url: string;
};

function getAbsoluteUrl(url: string) {
  if (typeof window === 'undefined') return url;
  return url.startsWith('http')
    ? url
    : new URL(url, window.location.origin).toString();
}

export function ShareArticle({ title, url }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);

  const absoluteUrl = useMemo(() => getAbsoluteUrl(url), [url]);

  const encoded = useMemo(
    () => ({
      title: encodeURIComponent(title),
      url: encodeURIComponent(absoluteUrl),
    }),
    [title, absoluteUrl],
  );

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyLink() {
    try {
      if (
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(absoluteUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = absoluteUrl;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
    } catch (error) {
      console.error('Failed to copy article URL:', error);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="sm">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share this article on LinkedIn"
        >
          Share on LinkedIn
        </a>
      </Button>

      <Button asChild variant="outline" size="sm">
        <a
          href={`https://twitter.com/intent/tweet?text=${encoded.title}&url=${encoded.url}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share this article on X"
        >
          Share on X
        </a>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={copyLink}
        aria-live="polite"
      >
        {copied ? 'Copied' : 'Copy link'}
      </Button>
    </div>
  );
}
