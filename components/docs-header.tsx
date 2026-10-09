"use client";

import * as React from "react";
import { ChevronDown, PanelLeft } from "lucide-react";
import {
  SidebarTrigger,
  useSidebar,
} from "fumadocs-ui/components/sidebar/base";
import {
  FullSearchTrigger,
  SearchTrigger,
} from "fumadocs-ui/layouts/shared/slots/search-trigger";

import { Container } from "@/components/container";
import { DocsLogo } from "@/components/docs-logo";
import { SiteHeader } from "@/components/layout/site-header";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Global navigation stays identical; article navigation belongs to the sidebar. */
export function DocsHeader() {
  const { open, setOpen, mode } = useSidebar();
  const sidebarTriggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open || mode !== "drawer") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      event.preventDefault();
      setOpen(false);
      sidebarTriggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen, mode]);

  return (
    <SiteHeader
      logo={<DocsLogo />}
      onMobileMenuOpen={() => setOpen(false)}
      desktopActions={
        <FullSearchTrigger
          className={`h-8 w-36 rounded-md text-[13px] text-foreground xl:w-44 [@media(pointer:coarse)]:min-h-11 ${focusRing}`}
        />
      }
      mobileActions={
        <SearchTrigger
          className={`relative z-10 size-11 shrink-0 rounded-md text-foreground ${focusRing}`}
        />
      }
      secondaryNavigation={
        <div className="border-t border-border-subtle/60 md:hidden">
          <Container>
            <SidebarTrigger
              ref={sidebarTriggerRef}
              aria-label="Browse documentation"
              className={`group inline-flex h-11 items-center gap-2 rounded-md text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none ${focusRing}`}
            >
              <PanelLeft
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4"
              />
              Documentation
              <ChevronDown
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-3 transition-transform duration-150 group-aria-expanded:rotate-180 motion-reduce:transition-none"
              />
            </SidebarTrigger>
          </Container>
        </div>
      }
    />
  );
}
