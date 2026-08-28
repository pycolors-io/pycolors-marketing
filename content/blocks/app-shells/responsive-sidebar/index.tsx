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

export type ResponsiveSidebarNavItem = Readonly<{
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}>;

export type ResponsiveSidebarNavGroup = Readonly<{
  id: string;
  label: string;
  items: readonly ResponsiveSidebarNavItem[];
}>;

export type ResponsiveSidebarRenderLinkProps = Readonly<{
  item: ResponsiveSidebarNavItem;
  active: boolean;
  className: string;
  children: React.ReactNode;
  onNavigate: () => void;
}>;

export type ResponsiveSidebarProps = Readonly<{
  brand: React.ReactNode;
  navigationLabel: string;
  mobileTitle: string;
  mobileDescription?: string;
  mobileTriggerLabel?: string;
  items: readonly ResponsiveSidebarNavItem[];
  groups?: readonly ResponsiveSidebarNavGroup[];
  activeItemId?: string;
  renderLink?: (props: ResponsiveSidebarRenderLinkProps) => React.ReactNode;
  sidebarFooter?: React.ReactNode;
  headerTitle?: React.ReactNode;
  headerActions?: React.ReactNode;
  contentId?: string;
  skipToContentLabel?: string;
  className?: string;
  children: React.ReactNode;
}>;

interface NavigationItemsProps {
  activeItemId?: string;
  items: readonly ResponsiveSidebarNavItem[];
  onNavigate: () => void;
  renderLink?: ResponsiveSidebarProps["renderLink"];
}

interface SidebarContentsProps extends NavigationItemsProps {
  brand: React.ReactNode;
  groups: readonly ResponsiveSidebarNavGroup[];
  navigationLabel: string;
  sidebarFooter?: React.ReactNode;
}

const linkClassName = cn(
  "flex min-h-10 w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
  "text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background",
  "aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground",
);

function NavigationItems({
  activeItemId,
  items,
  onNavigate,
  renderLink,
}: NavigationItemsProps) {
  return (
    <ul className="space-y-1" role="list">
      {items.map((item) => {
        const active = item.id === activeItemId;
        const children = (
          <>
            {item.icon ? (
              <span
                aria-hidden="true"
                className="flex size-4 shrink-0 items-center justify-center"
                data-slot="responsive-sidebar-item-icon"
              >
                {item.icon}
              </span>
            ) : null}
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.badge ? (
              <span
                className="shrink-0 rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
                data-slot="responsive-sidebar-item-badge"
              >
                {item.badge}
              </span>
            ) : null}
          </>
        );

        return (
          <li key={item.id}>
            {renderLink ? (
              renderLink({
                item,
                active,
                className: linkClassName,
                children,
                onNavigate,
              })
            ) : (
              <a
                aria-current={active ? "page" : undefined}
                className={linkClassName}
                data-slot="responsive-sidebar-link"
                href={item.href}
                onClick={onNavigate}
              >
                {children}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SidebarContents({
  activeItemId,
  brand,
  groups,
  items,
  navigationLabel,
  onNavigate,
  renderLink,
  sidebarFooter,
}: SidebarContentsProps) {
  const groupLabelPrefix = React.useId();

  return (
    <div
      className="flex min-h-0 flex-1 flex-col"
      data-slot="responsive-sidebar-contents"
    >
      <div
        className="flex min-h-16 shrink-0 items-center border-b border-border px-4"
        data-slot="responsive-sidebar-brand"
      >
        {brand}
      </div>

      <nav
        aria-label={navigationLabel}
        className="min-h-0 flex-1 space-y-5 overflow-y-auto px-3 py-4"
        data-slot="responsive-sidebar-navigation"
      >
        {items.length > 0 ? (
          <NavigationItems
            activeItemId={activeItemId}
            items={items}
            onNavigate={onNavigate}
            renderLink={renderLink}
          />
        ) : null}

        {groups.map((group, index) => {
          const labelId = `${groupLabelPrefix}-${index}`;

          return (
            <div
              aria-labelledby={labelId}
              data-slot="responsive-sidebar-group"
              key={group.id}
              role="group"
            >
              <p
                className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                id={labelId}
              >
                {group.label}
              </p>
              <NavigationItems
                activeItemId={activeItemId}
                items={group.items}
                onNavigate={onNavigate}
                renderLink={renderLink}
              />
            </div>
          );
        })}
      </nav>

      {sidebarFooter ? (
        <div
          className="shrink-0 border-t border-border p-4"
          data-slot="responsive-sidebar-footer"
        >
          {sidebarFooter}
        </div>
      ) : null}
    </div>
  );
}

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
                className="md:hidden"
                data-slot="responsive-sidebar-mobile-trigger"
                size="icon"
                type="button"
                variant="outline"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent
              className="flex w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] flex-col gap-0 p-0"
              data-slot="responsive-sidebar-mobile"
              side="left"
            >
              <SheetHeader className="shrink-0 border-b border-border px-6 py-5 pr-12">
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
              className="flex shrink-0 items-center gap-2"
              data-slot="responsive-sidebar-actions"
            >
              {headerActions}
            </div>
          ) : null}
        </header>

        <main
          className="min-w-0 flex-1 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
          data-slot="responsive-sidebar-main"
          id={contentId}
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
