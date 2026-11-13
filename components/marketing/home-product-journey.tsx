"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCopy } from "@/lib/i18n/use-copy";
import styles from "./home.module.css";

function clamp(value: number, maximum: number) {
  return Math.max(0, Math.min(value, maximum));
}

/** A native horizontal gallery: touch, trackpad, wheel, buttons and keyboard. */
export function HomeProductJourney({
  introduction,
  footer,
  count,
  children,
}: Readonly<{
  introduction: ReactNode;
  footer: ReactNode;
  count: number;
  children: ReactNode;
}>) {
  const tSite = useCopy();
  const railRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const navigateRef = useRef<((index: number) => void) | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    const journey = journeyRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!rail || !journey || !track || !stage) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let linked = false;
    let maximum = 0;
    let inset = 0;
    let start = 0;
    let travel = 0;
    let frame = 0;
    let measure = true;
    let lastPageLeft = 0;
    let restoreAnchor = true;

    function cards() {
      return Array.from(
        rail!.querySelectorAll<HTMLElement>("[data-home-product]"),
      );
    }
    function updateActive() {
      if (!rail) return;
      const edge = rail.getBoundingClientRect().left + inset;
      let nearest = 0;
      let distance = Infinity;
      cards().forEach((card, index) => {
        const delta = Math.abs(card.getBoundingClientRect().left - edge);
        if (delta < distance) {
          nearest = index;
          distance = delta;
        }
      });
      setActive(
        maximum > 0 && maximum - rail.scrollLeft <= 2 ? count - 1 : nearest,
      );
    }
    function update() {
      frame = 0;
      if (!rail || !journey || !track || !stage) return;
      if (measure) {
        measure = false;
        maximum = Math.max(0, rail.scrollWidth - rail.clientWidth);
        inset =
          Number.parseFloat(window.getComputedStyle(rail).paddingInlineStart) ||
          0;
        const top = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
        const height = stage.getBoundingClientRect().height;
        linked =
          !preference.matches &&
          window.innerWidth >= 1024 &&
          maximum > 1 &&
          height + top + 24 <= window.innerHeight;
        start = window.scrollY + track.getBoundingClientRect().top - top;
        travel = linked ? Math.max(maximum * 0.85, window.innerHeight) : 0;
        if (linked) {
          journey.dataset.scrollLinked = "true";
          track.style.height = `${height + travel}px`;
        } else {
          delete journey.dataset.scrollLinked;
          track.style.removeProperty("height");
        }
        if (restoreAnchor) {
          restoreAnchor = false;
          const target = document.getElementById(window.location.hash.slice(1));
          if (
            target &&
            !journey.contains(target) &&
            journey.compareDocumentPosition(target) &
              Node.DOCUMENT_POSITION_FOLLOWING
          )
            target.scrollIntoView({ block: "start", behavior: "instant" });
        }
      }
      if (linked) {
        lastPageLeft = clamp((window.scrollY - start) / travel, 1) * maximum;
        rail.scrollLeft = lastPageLeft;
      }
      updateActive();
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    function resize() {
      measure = true;
      schedule();
    }
    function onRailScroll() {
      if (!rail) return;
      if (linked && Math.abs(rail.scrollLeft - lastPageLeft) > 2) {
        lastPageLeft = rail.scrollLeft;
        window.scrollTo({
          top: start + (rail.scrollLeft / maximum) * travel,
          behavior: "instant",
        });
      }
      updateActive();
    }
    function onWheel(event: WheelEvent) {
      if (
        !rail ||
        event.ctrlKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY)
      )
        return;
      const delta =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? rail.clientWidth
            : 1);
      const next = clamp(rail.scrollLeft + delta, maximum);
      if (next === rail.scrollLeft) return;
      event.preventDefault();
      if (linked) {
        lastPageLeft = next;
        window.scrollTo({
          top: start + (next / maximum) * travel,
          behavior: "instant",
        });
      }
      rail.scrollLeft = next;
      updateActive();
    }
    navigateRef.current = (index) => {
      const card = cards()[clamp(index, count - 1)];
      if (!rail || !card) return;
      const left = clamp(
        rail.scrollLeft +
          card.getBoundingClientRect().left -
          rail.getBoundingClientRect().left -
          inset,
        maximum,
      );
      const behavior = preference.matches ? "instant" : "smooth";
      if (linked)
        window.scrollTo({ top: start + (left / maximum) * travel, behavior });
      else rail.scrollTo({ left, behavior });
    };
    const observer =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    observer?.observe(stage);
    observer?.observe(rail);
    rail.addEventListener("scroll", onRailScroll, { passive: true });
    rail.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    preference.addEventListener("change", resize);
    schedule();
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      rail.removeEventListener("scroll", onRailScroll);
      rail.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      preference.removeEventListener("change", resize);
      delete journey.dataset.scrollLinked;
      track.style.removeProperty("height");
      navigateRef.current = null;
    };
  }, [count]);

  function navigate(index: number) {
    navigateRef.current?.(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const index =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? count - 1
          : event.key === "ArrowRight"
            ? active + 1
            : event.key === "ArrowLeft"
              ? active - 1
              : null;
    if (index === null) return;
    event.preventDefault();
    navigate(index);
  }

  return (
    <div ref={journeyRef} className={styles.productJourney}>
      {introduction}
      <div ref={trackRef} className={styles.productJourneyTrack}>
        <div ref={stageRef} className={styles.productJourneyStage}>
          <div className={styles.productJourneyControls}>
            <span>{tSite("Scroll to explore")}</span>
            <div>
              <span aria-live="polite" aria-atomic="true">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label={tSite("Previous product")}
                disabled={active === 0}
                onClick={() => navigate(active - 1)}
              >
                <ArrowLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={tSite("Next product")}
                disabled={active === count - 1}
                onClick={() => navigate(active + 1)}
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            ref={railRef}
            className={styles.productRail}
            role="group"
            aria-label={tSite("Explore the products")}
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            {children}
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
}
