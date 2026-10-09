"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
import { SiteButton as Button } from "@/components/site-button";
import { LinkedinIcon, TwitterIcon } from "@/components/brand-icons";

type ShareArticleProps = { readonly title: string; readonly url: string };

function getShareUrl(url: string) {
  if (url.startsWith("http")) return url;
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "https://pycolors.io";
  return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export function ShareArticle({ title, url }: ShareArticleProps) {
  const [copied, setCopied] = useState<"link" | "post" | null>(null);
  const [error, setError] = useState(false);
  const absoluteUrl = getShareUrl(url);
  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedTitle = encodeURIComponent(title);

  useEffect(() => {
    if (!copied && !error) return;
    const timeout = globalThis.setTimeout(() => {
      setCopied(null);
      setError(false);
    }, 4000);
    return () => globalThis.clearTimeout(timeout);
  }, [copied, error]);

  async function copy(kind: "link" | "post") {
    try {
      await navigator.clipboard.writeText(
        kind === "link" ? absoluteUrl : `${title}\n\n${absoluteUrl}`,
      );
      setError(false);
      setCopied(kind);
    } catch {
      setCopied(null);
      setError(true);
    }
  }

  const iconButton =
    "shrink-0 rounded-[5px] text-muted-foreground hover:text-foreground";
  return (
    <div className="max-w-full">
      <div
        className="flex flex-wrap items-center gap-1.5"
        role="group"
        aria-label="Share article"
      >
        <Button
          size="sm"
          variant="outline"
          onClick={() => copy("link")}
          className="w-28 shrink-0 rounded-[5px]"
        >
          {copied === "link" ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <LinkIcon className="size-3.5" aria-hidden="true" />
          )}
          {copied === "link" ? "Copied" : "Copy link"}
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => copy("post")}
          aria-label="Copy post"
          title="Copy title and link"
          className={iconButton}
        >
          {copied === "post" ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
        </Button>
        <Button asChild variant="ghost" size="icon-sm" className={iconButton}>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Share this article on LinkedIn (opens in a new tab)"
            title="Share on LinkedIn"
          >
            <LinkedinIcon className="size-4" aria-hidden="true" />
          </a>
        </Button>
        <Button asChild variant="ghost" size="icon-sm" className={iconButton}>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Share this article on X (opens in a new tab)"
            title="Share on X"
          >
            <TwitterIcon className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
      <p
        role="status"
        className="mt-1 min-h-5 max-w-72 text-xs leading-5 text-muted-foreground"
      >
        {error
          ? "Copy unavailable. Use your browser’s address bar."
          : copied === "post"
            ? "Title and link copied."
            : copied === "link"
              ? "Article link copied."
              : ""}
      </p>
    </div>
  );
}
