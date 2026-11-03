"use client";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics";
import { proDemoUrl } from "@/lib/pro-demo-url";
import { SiteButton } from "@/components/site-button";

export function ProDemoLink({
  children = "Explore demo",
  appearance = "button",
}: Readonly<{ children?: ReactNode; appearance?: "button" | "text" }> = {}) {
  const href = proDemoUrl();
  if (!href) return null;
  const link = (
    <a
      href={href}
      onClick={() => {
        try {
          track("marketing_to_pro_demo_clicked");
        } catch {
          /* Optional analytics. */
        }
      }}
      className={
        appearance === "text"
          ? "inline-flex min-h-11 items-center gap-2 text-xs font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          : undefined
      }
    >
      {children}
    </a>
  );
  return appearance === "text" ? (
    link
  ) : (
    <SiteButton asChild variant="outline" size="lg">
      {link}
    </SiteButton>
  );
}
