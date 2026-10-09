"use client";

import * as React from "react";
import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  cn,
} from "@pycolors/ui";

import { SidebarContents } from "./sidebar-navigation";
import type { ResponsiveSidebarProps } from "./types";

export type {
  ResponsiveSidebarNavItem,
  ResponsiveSidebarNavGroup,
  ResponsiveSidebarRenderLinkProps,
  ResponsiveSidebarProps,
} from "./types";

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * A source-copy application shell with persistent desktop navigation and an
 * accessible mobile Sheet. All product content and routing stay consumer-owned.
 */
export function ResponsiveSidebar({
  activeItemId,
  brand,
  children,
  className,
  contentId = "main-content",
  contentAs: Content = "main",
  groups = [],
  headerActions,
  headerTitle,
  items,
  mobileDescription = "Navigate the application.",
  mobileTitle,
  mobileTriggerLabel = "Open navigation",
  navigationLabel,
  renderLink,
  sidebarFooter,
  skipToContentLabel = "Skip to content",
}: ResponsiveSidebarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeMobileNavigation = () => setMobileOpen(false);

  return (
    <div
      className={cn("flex min-h-dvh bg-background text-foreground", className)}
      data-slot="responsive-sidebar"
    >
      <a
        className={cn(
          "sr-only z-[60] rounded-md bg-background px-3 py-2 text-sm font-medium text-foreground",
          "focus:not-sr-only focus:fixed focus:left-3 focus:top-3",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
        data-slot="responsive-sidebar-skip-link"
        href={`#${contentId}`}
      >
        {skipToContentLabel}
      </a>

      <aside
        className="sticky top-0 hidden h-dvh w-64 shrink-0 border-r border-border bg-card md:flex"
        data-slot="responsive-sidebar-desktop"
      >
        <SidebarContents
          activeItemId={activeItemId}
          brand={brand}
          groups={groups}
          items={items}
          navigationLabel={navigationLabel}
          onNavigate={() => undefined}
          renderLink={renderLink}
          sidebarFooter={sidebarFooter}
        />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex min-h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6"
          data-slot="responsive-sidebar-header"
        >
          <Sheet onOpenChange={setMobileOpen} open={mobileOpen}>
            <SheetTrigger asChild>
              <Button
                aria-label={mobileTriggerLabel}
                className="size-11 shrink-0 md:hidden"
                data-slot="responsive-sidebar-mobile-trigger"
                size="icon"
                type="button"
                variant="outline"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent
              className="top-0 flex h-dvh w-[min(18rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] flex-col gap-0 rounded-none p-0 [&_[data-slot=responsive-sidebar-brand]]:pr-12 [&>button]:right-3 [&>button]:top-2.5 [&>button]:grid [&>button]:size-11 [&>button]:place-items-center"
              data-slot="responsive-sidebar-mobile"
              side="left"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>{mobileTitle}</SheetTitle>
                <SheetDescription>{mobileDescription}</SheetDescription>
              </SheetHeader>

              <SidebarContents
                activeItemId={activeItemId}
                brand={brand}
                groups={groups}
                items={items}
                navigationLabel={navigationLabel}
                onNavigate={closeMobileNavigation}
                renderLink={renderLink}
                sidebarFooter={sidebarFooter}
              />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1" data-slot="responsive-sidebar-title">
            {headerTitle}
          </div>
          {headerActions ? (
            <div
              className="flex min-w-0 max-w-[60%] flex-wrap items-center justify-end gap-2 py-2 [&>*]:max-w-full [&>*]:whitespace-normal [&>*]:[overflow-wrap:anywhere]"
              data-slot="responsive-sidebar-actions"
            >
              {headerActions}
            </div>
          ) : null}
        </header>

        <Content
          className="min-w-0 flex-1 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          data-slot="responsive-sidebar-main"
          id={contentId}
          tabIndex={-1}
        >
          {children}
        </Content>
      </div>
    </div>
  );
}
