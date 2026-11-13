"use client";

import {
  MarketingSectionNav,
  type MarketingSectionNavItem,
} from "@/components/marketing/section-nav";
import styles from "./starter-pro.module.css";

const classNames = {
  sectionNavShell: styles.sectionNavShell,
  sectionNav: styles.sectionNav,
  sectionNavLink: styles.sectionNavLink,
  sectionNavIndex: styles.sectionNavIndex,
  sectionNavControls: styles.sectionNavControls,
  sectionNavPosition: styles.sectionNavPosition,
  sectionNavControl: styles.sectionNavControl,
};

/** Starter Pro keeps its existing appearance on the shared section navigation. */
export function StarterProSectionNav({
  items,
}: Readonly<{ items: readonly MarketingSectionNavItem[] }>) {
  return (
    <MarketingSectionNav
      items={items}
      label="Starter Pro sections"
      classNames={classNames}
    />
  );
}
