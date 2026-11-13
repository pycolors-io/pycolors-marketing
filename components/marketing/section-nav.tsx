"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCopy } from "@/lib/i18n/use-copy";
import { SiteButton } from "@/components/site-button";
import defaultStyles from "./section-nav.module.css";

export type MarketingSectionNavItem = Readonly<{ href: string; label: string }>;
type Bounds = Readonly<{ overflow: boolean; back: boolean; forward: boolean }>;

export type MarketingSectionNavClassNames = Readonly<
  Partial<
    Record<
      | "sectionNavShell"
      | "sectionNav"
      | "sectionNavLink"
      | "sectionNavIndex"
      | "sectionNavControls"
      | "sectionNavPosition"
      | "sectionNavControl",
      string
    >
  >
>;

/** Native anchors with reading progress and horizontal overflow controls. */
export function MarketingSectionNav({
  items,
  label,
  classNames,
}: Readonly<{
  items: readonly MarketingSectionNavItem[];
  label: string;
  classNames?: MarketingSectionNavClassNames;
}>) {
  const styles = {
    sectionNavShell:
      classNames?.sectionNavShell ?? defaultStyles.sectionNavShell,
    sectionNav: classNames?.sectionNav ?? defaultStyles.sectionNav,
    sectionNavLink: classNames?.sectionNavLink ?? defaultStyles.sectionNavLink,
    sectionNavIndex:
      classNames?.sectionNavIndex ?? defaultStyles.sectionNavIndex,
    sectionNavControls:
      classNames?.sectionNavControls ?? defaultStyles.sectionNavControls,
    sectionNavPosition:
      classNames?.sectionNavPosition ?? defaultStyles.sectionNavPosition,
    sectionNavControl:
      classNames?.sectionNavControl ?? defaultStyles.sectionNavControl,
  };
  const tSite = useCopy();
  const railRef = useRef<HTMLDivElement>(null);
  const destination = useRef<string | undefined>(undefined);
  const [active, setActive] = useState<string>();
  const [bounds, setBounds] = useState<Bounds>({
    overflow: false,
    back: false,
    forward: false,
  });
  const id = useId();

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const sections = items.flatMap((item) => {
      const element = document.getElementById(item.href.slice(1));
      return element ? [{ href: item.href, element }] : [];
    });
    let frame: number | undefined;

    function update() {
      frame = undefined;
      if (!rail) return;
      const maximum = Math.max(0, rail.scrollWidth - rail.clientWidth);
      const next = {
        overflow: maximum > 1,
        back: rail.scrollLeft > 1,
        forward: maximum - rail.scrollLeft > 1,
      };
      setBounds((current) =>
        current.overflow === next.overflow &&
        current.back === next.back &&
        current.forward === next.forward
          ? current
          : next,
      );
      const readingLine =
        Math.max(
          0,
          rail.closest("nav")?.parentElement?.getBoundingClientRect().bottom ??
            0,
        ) + 24;
      let current: string | undefined;
      for (const section of sections) {
        if (section.element.getBoundingClientRect().top > readingLine) break;
        current = section.href;
      }
      const requested = sections.find(
        (section) => section.href === destination.current,
      );
      if (
        !requested ||
        Math.abs(requested.element.getBoundingClientRect().top - readingLine) <=
          32
      )
        destination.current = undefined;
      setActive(destination.current ?? current);
    }

    function interrupt() {
      destination.current = undefined;
      schedule();
    }

    function interruptKey(event: KeyboardEvent) {
      if (
        [
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        interrupt();
    }

    function schedule() {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    }

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedule)
        : null;
    observer?.observe(rail);
    for (const link of rail.querySelectorAll("a")) observer?.observe(link);
    rail.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt, { passive: true });
    window.addEventListener("keydown", interruptKey);
    schedule();

    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      rail.removeEventListener("scroll", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("keydown", interruptKey);
    };
  }, [items]);

  useEffect(() => {
    const rail = railRef.current;
    if (
      !rail ||
      !active ||
      rail.scrollWidth - rail.clientWidth <= 1 ||
      rail.contains(document.activeElement)
    )
      return;
    const link = rail.querySelector<HTMLAnchorElement>(
      'a[aria-current="location"]',
    );
    if (!link) return;
    const viewport = rail.getBoundingClientRect();
    const position = link.getBoundingClientRect();
    if (
      position.left >= viewport.left + 4 &&
      position.right <= viewport.right - 4
    )
      return;
    rail.scrollTo({
      left: Math.max(
        0,
        Math.min(
          rail.scrollWidth - rail.clientWidth,
          rail.scrollLeft +
            position.left -
            viewport.left -
            Math.max(8, (rail.clientWidth - position.width) / 2),
        ),
      ),
      behavior: "instant",
    });
  }, [active, bounds.overflow]);

  function move(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollTo({
      left: Math.max(
        0,
        Math.min(
          rail.scrollWidth - rail.clientWidth,
          rail.scrollLeft + direction * rail.clientWidth * 0.8,
        ),
      ),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <nav aria-label={tSite(label)} className={styles.sectionNavShell}>
      <div ref={railRef} id={id} className={styles.sectionNav}>
        {items.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={active === item.href ? "location" : undefined}
            className={styles.sectionNavLink}
            onClick={(event) => {
              if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              destination.current = item.href;
              setActive(item.href);
            }}
          >
            <span className={styles.sectionNavIndex} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {tSite(item.label)}
          </a>
        ))}
      </div>
      {bounds.overflow && (
        <div className={styles.sectionNavControls}>
          <span className={styles.sectionNavPosition} aria-hidden="true">
            <span>
              {active
                ? String(
                    items.findIndex((item) => item.href === active) + 1,
                  ).padStart(2, "0")
                : "—"}
            </span>
            / {String(items.length).padStart(2, "0")}
          </span>
          <SiteButton
            type="button"
            variant="ghost"
            size="icon-sm"
            className={styles.sectionNavControl}
            aria-label={tSite("Previous sections")}
            aria-controls={id}
            disabled={!bounds.back}
            onClick={() => move(-1)}
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </SiteButton>
          <SiteButton
            type="button"
            variant="ghost"
            size="icon-sm"
            className={styles.sectionNavControl}
            aria-label={tSite("Next sections")}
            aria-controls={id}
            disabled={!bounds.forward}
            onClick={() => move(1)}
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </SiteButton>
        </div>
      )}
    </nav>
  );
}
