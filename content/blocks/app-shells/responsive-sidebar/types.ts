import type * as React from "react";

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
  /** Use div when embedding the shell inside an existing main landmark. */
  contentAs?: "main" | "div";
  skipToContentLabel?: string;
  className?: string;
  children: React.ReactNode;
}>;
