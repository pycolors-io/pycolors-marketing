"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

export function FooterNavigation({
  children,
  className,
  label = "PyColors site footer",
}: Readonly<{ children: ReactNode; className?: string; label?: string }>) {
  const router = useRouter();

  function navigateFromFooter(event: MouseEvent<HTMLElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      !(event.target instanceof Element)
    ) {
      return;
    }

    const link = event.target.closest("a[href]");
    if (
      !(link instanceof HTMLAnchorElement) ||
      link.hasAttribute("download") ||
      (link.target && link.target !== "_self")
    ) {
      return;
    }

    const destination = new URL(link.href);
    if (destination.origin !== window.location.origin || destination.hash) {
      return;
    }

    event.preventDefault();

    if (destination.href !== window.location.href) {
      // Start navigation immediately, without Next.js replacing the native
      // smooth scroll with an instant jump when the destination renders.
      router.push(destination.pathname + destination.search, { scroll: false });
    } else {
      const content =
        document.getElementById("content") ??
        document.getElementById("nd-page");
      if (content) {
        if (!content.hasAttribute("tabindex")) content.tabIndex = -1;
        content.focus({ preventScroll: true });
      }
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <footer
      className={className}
      aria-label={label}
      onClickCapture={navigateFromFooter}
    >
      {children}
    </footer>
  );
}
