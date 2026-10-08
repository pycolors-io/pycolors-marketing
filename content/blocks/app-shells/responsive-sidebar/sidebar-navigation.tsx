"use client";

import * as React from "react";
import { cn } from "@pycolors/ui";
import type {
  ResponsiveSidebarNavGroup,
  ResponsiveSidebarNavItem,
  ResponsiveSidebarProps,
} from "./types";

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
  "flex min-h-11 w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium sm:min-h-10",
  "text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background motion-reduce:transition-none",
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
            <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
              {item.label}
            </span>
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

export function SidebarContents({
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
                className="mb-2 px-3 text-[11px] font-medium text-muted-foreground [overflow-wrap:anywhere]"
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
