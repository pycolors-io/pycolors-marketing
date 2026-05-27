'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Linkedin, Twitter } from 'lucide-react';

import { Button, cn } from '@pycolors/ui';

type ShareArticleProps = {
  readonly title: string;
  readonly url: string;
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function getShareUrl(url: string) {
  if (url.startsWith('http')) return url;

  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ??
    'https://pycolors.io';

  return `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`;
}

export function ShareArticle({ title, url }: ShareArticleProps) {
  const [copied, setCopied] = useState(false);
  const [copiedPost, setCopiedPost] = useState(false);

  const absoluteUrl = useMemo(() => getShareUrl(url), [url]);

  const encoded = useMemo(
    () => ({
      title: encodeURIComponent(title),
      url: encodeURIComponent(absoluteUrl),
    }),
    [title, absoluteUrl],
  );

  const shareText = useMemo(
    () => `${title}\n\n${absoluteUrl}`,
    [title, absoluteUrl],
  );

  useEffect(() => {
    if (!copied && !copiedPost) return;

    const timeout = globalThis.setTimeout(() => {
      setCopied(false);
      setCopiedPost(false);
    }, 2000);

    return () => globalThis.clearTimeout(timeout);
  }, [copied, copiedPost]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(absoluteUrl);

      setCopied(true);
    } catch (error) {
      console.error('Failed to copy article URL:', error);
    }
  }

  async function copyPost() {
    try {
      await navigator.clipboard.writeText(shareText);

      setCopiedPost(true);
    } catch (error) {
      console.error('Failed to copy share post:', error);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        asChild
        variant="outline"
        size="sm"
        className={cn('rounded-[5px]', focusRing)}
      >
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share this article on LinkedIn"
        >
          <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
          LinkedIn
        </a>
      </Button>

      <Button
        asChild
        variant="outline"
        size="sm"
        className={cn('rounded-[5px]', focusRing)}
      >
        <a
          href={`https://twitter.com/intent/tweet?text=${encoded.title}&url=${encoded.url}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share this article on X"
        >
          <Twitter className="h-3.5 w-3.5" aria-hidden="true" />X
        </a>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={copyPost}
        aria-live="polite"
        className={cn('rounded-[5px]', focusRing)}
      >
        {copiedPost ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}

        {copiedPost ? 'Post copied' : 'Copy post'}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={copyLink}
        aria-live="polite"
        className={cn('rounded-[5px]', focusRing)}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
        )}

        {copied ? 'Copied' : 'Copy link'}
      </Button>
    </div>
  );
}
