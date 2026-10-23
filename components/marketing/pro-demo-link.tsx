"use client";
import { track } from "@vercel/analytics";
import { proDemoUrl } from "@/lib/pro-demo-url";

export function ProDemoLink() {
  const href = proDemoUrl();
  if (!href) return null;
  return (
    <a
      href={href}
      onClick={() => {
        try {
          track("marketing_to_pro_demo_clicked");
        } catch {
          /* Optional analytics. */
        }
      }}
      className="inline-flex min-h-11 items-center rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
    >
      Explore demo
    </a>
  );
}
