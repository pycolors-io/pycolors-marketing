"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

const HOVER_NAV_QUERY = "(hover: hover) and (pointer: fine)";

/** Shared pointer and keyboard behavior for marketing and documentation menus. */
export function useHeaderDisclosure({
  open,
  onOpenChange,
  triggerRef,
  desktopQuery,
}: Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  desktopQuery: string;
}>) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const hoverTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const keyboardOpenedRef = React.useRef(false);
  const pathname = usePathname();

  const clearHoverTimer = React.useCallback(() => {
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  // A delayed interaction must not survive dismissal, navigation or unmount.
  React.useEffect(() => clearHoverTimer, [clearHoverTimer, open, pathname]);

  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        clearHoverTimer();
        if (open) onOpenChange(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      clearHoverTimer();
      if (!open) return;
      event.preventDefault();
      onOpenChange(false);
      // Hover never moves focus, including when Escape dismisses the panel.
      if (rootRef.current?.contains(document.activeElement)) {
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [clearHoverTimer, open, onOpenChange, triggerRef]);

  React.useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    media.addEventListener("change", clearHoverTimer);
    return () => media.removeEventListener("change", clearHoverTimer);
  }, [clearHoverTimer, desktopQuery]);

  const rootProps = {
    onPointerEnter: (event) => {
      if (
        event.pointerType !== "mouse" ||
        !window.matchMedia(HOVER_NAV_QUERY).matches ||
        !window.matchMedia(desktopQuery).matches
      )
        return;
      clearHoverTimer();
      if (open) return;
      hoverTimerRef.current = setTimeout(() => {
        hoverTimerRef.current = null;
        if (!window.matchMedia(desktopQuery).matches) return;
        keyboardOpenedRef.current = false;
        onOpenChange(true);
      }, 150);
    },
    onPointerLeave: (event) => {
      if (event.pointerType !== "mouse") return;
      clearHoverTimer();
      if (!open) return;
      hoverTimerRef.current = setTimeout(() => {
        hoverTimerRef.current = null;
        // Keep keyboard users' focused controls available when the mouse moves.
        if (
          panelRef.current?.contains(document.activeElement) ||
          (keyboardOpenedRef.current &&
            rootRef.current?.contains(document.activeElement))
        )
          return;
        onOpenChange(false);
      }, 200);
    },
    onPointerDown: () => {
      clearHoverTimer();
      keyboardOpenedRef.current = false;
    },
    onBlur: (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        clearHoverTimer();
        onOpenChange(false);
      }
    },
    onKeyDown: () => {
      keyboardOpenedRef.current = true;
    },
  } satisfies React.HTMLAttributes<HTMLDivElement>;
  const triggerProps = {
    onClick: (event) => {
      clearHoverTimer();
      keyboardOpenedRef.current = event.detail === 0;
      onOpenChange(!open);
    },
  } satisfies React.ButtonHTMLAttributes<HTMLButtonElement>;

  return { rootRef, panelRef, rootProps, triggerProps };
}
