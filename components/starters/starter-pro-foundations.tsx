"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import { SiteButton } from "@/components/site-button";
import styles from "./starter-pro.module.css";

function cardsIn(rail: HTMLDivElement) {
  return Array.from(
    rail.querySelectorAll<HTMLElement>("[data-foundation-card]"),
  );
}

function railStart(rail: HTMLDivElement) {
  const inset =
    Number.parseFloat(window.getComputedStyle(rail).paddingInlineStart) || 0;
  return rail.getBoundingClientRect().left + inset;
}

function clamp(value: number, maximum: number) {
  return Math.max(0, Math.min(value, maximum));
}

/** A progressively enhanced scroll story; every card stays server-rendered. */
export function StarterProFoundations({
  introduction,
  labels,
  children,
}: Readonly<{
  introduction: ReactNode;
  labels: readonly string[];
  children: ReactNode;
}>) {
  const tSite = useCopy();
  const journeyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const navigateRef = useRef<
    ((left: number, immediate: boolean) => void) | null
  >(null);
  const destination = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const id = useId();
  const count = labels.length;

  useEffect(() => {
    const journey = journeyRef.current;
    const stage = stageRef.current;
    const rail = railRef.current;
    if (!journey || !stage || !rail) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let needsMeasure = true;
    let linked = false;
    let maximum = 0;
    let travel = 0;
    let top = 0;
    let drivenLeft = rail.scrollLeft;

    function updateActive() {
      if (!rail || destination.current !== null) return;
      if (maximum > 1 && maximum - rail.scrollLeft <= 2) {
        setActive(Math.max(0, cardsIn(rail).length - 1));
        return;
      }
      const start = railStart(rail);
      let closest = 0;
      let distance = Infinity;
      for (const [index, card] of cardsIn(rail).entries()) {
        const next = Math.abs(card.getBoundingClientRect().left - start);
        if (next < distance) {
          closest = index;
          distance = next;
        }
      }
      setActive(closest);
    }

    function update() {
      frame = 0;
      if (!journey || !stage || !rail) return;
      if (needsMeasure) {
        needsMeasure = false;
        rail.style.setProperty(
          "--foundation-viewport-width",
          `${document.documentElement.clientWidth || window.innerWidth}px`,
        );
        const journeyTop = journey.getBoundingClientRect().top;
        const wasPinned =
          linked && top - journeyTop >= 0 && top - journeyTop <= travel;
        maximum = Math.max(0, rail.scrollWidth - rail.clientWidth);
        top = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
        const height = stage.getBoundingClientRect().height;
        // Reading and expanded details take priority over a pinned presentation.
        linked =
          !preference.matches &&
          window.innerWidth >= 1024 &&
          height > 0 &&
          height + top + 24 <= window.innerHeight &&
          maximum > 1;
        travel = linked
          ? Math.max(maximum * 0.8, window.innerHeight * 1.25)
          : 0;
        if (linked) {
          journey.dataset.scrollLinked = "true";
          journey.style.height = `${height + travel}px`;
        } else {
          delete journey.dataset.scrollLinked;
          journey.style.removeProperty("height");
          // Keep the current card on screen when longer details release the pin.
          if (wasPinned)
            window.scrollTo({
              top: window.scrollY + journeyTop - top,
              behavior: "instant",
            });
        }
      }
      if (linked) {
        const progress = clamp(
          (top - journey.getBoundingClientRect().top) / travel,
          1,
        );
        drivenLeft = progress * maximum;
        if (Math.abs(rail.scrollLeft - drivenLeft) > 0.5)
          rail.scrollLeft = drivenLeft;
      }
      updateActive();
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function measure() {
      destination.current = null;
      needsMeasure = true;
      schedule();
    }

    function railScroll() {
      if (!rail || !journey) return;
      // Native horizontal gestures and the page position share the same progress.
      const distance = top - journey.getBoundingClientRect().top;
      if (
        linked &&
        distance >= 0 &&
        distance <= travel &&
        Math.abs(rail.scrollLeft - drivenLeft) > 2
      ) {
        drivenLeft = rail.scrollLeft;
        window.scrollTo({
          top:
            window.scrollY +
            journey.getBoundingClientRect().top -
            top +
            (rail.scrollLeft / maximum) * travel,
          behavior: "instant",
        });
      }
      schedule();
    }

    function interrupt() {
      destination.current = null;
    }

    function settle() {
      if (destination.current !== null) {
        setActive(destination.current);
        destination.current = null;
      } else schedule();
    }

    navigateRef.current = (left, immediate) => {
      const behavior = immediate || preference.matches ? "instant" : "smooth";
      const next = clamp(
        left,
        Math.max(0, rail.scrollWidth - rail.clientWidth),
      );
      if (linked) {
        window.scrollTo({
          top:
            window.scrollY +
            journey.getBoundingClientRect().top -
            top +
            (next / maximum) * travel,
          behavior,
        });
      } else rail.scrollTo({ left: next, behavior });
    };

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    observer?.observe(stage);
    observer?.observe(rail);
    rail.addEventListener("scroll", railScroll, { passive: true });
    rail.addEventListener("scrollend", settle);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scrollend", settle);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt, { passive: true });
    window.addEventListener("resize", measure);
    preference.addEventListener("change", measure);
    update();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      rail.removeEventListener("scroll", railScroll);
      rail.removeEventListener("scrollend", settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("scrollend", settle);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", measure);
      delete journey.dataset.scrollLinked;
      journey.style.removeProperty("height");
      rail.style.removeProperty("--foundation-viewport-width");
      navigateRef.current = null;
    };
  }, [count]);

  function goTo(index: number, immediate = false) {
    const rail = railRef.current;
    if (!rail || !count) return;
    const next = clamp(index, count - 1);
    const card = cardsIn(rail)[next];
    if (!card) return;
    destination.current = next;
    setActive(next);
    navigateRef.current?.(
      rail.scrollLeft + card.getBoundingClientRect().left - railStart(rail),
      immediate,
    );
  }

  return (
    <div className={styles.foundationStory}>
      <div className={styles.foundationIntro}>{tSite(introduction)}</div>
      <div ref={journeyRef} className={styles.foundationJourney}>
        <div ref={stageRef} className={styles.foundationSticky}>
          <div className={styles.foundationControls}>
            <p
              className={styles.foundationPosition}
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="sr-only">
                {tSite("Foundation {value0} of {value1}", {
                  value0: active + 1,
                  value1: count,
                })}
                {tSite(" ")}
              </span>
              <span aria-hidden="true">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <span>{tSite(labels[active])}</span>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <span className={styles.foundationScrollHint}>
                {tSite("Scroll to explore")}
                <ArrowDownRight className="size-4" aria-hidden="true" />
              </span>
              <SiteButton
                type="button"
                variant="ghost"
                size="icon-sm"
                className={styles.foundationControl}
                aria-label={tSite("Previous foundation")}
                aria-controls={id}
                disabled={active === 0}
                onClick={() => goTo((destination.current ?? active) - 1)}
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </SiteButton>
              <SiteButton
                type="button"
                variant="ghost"
                size="icon-sm"
                className={styles.foundationControl}
                aria-label={tSite("Next foundation")}
                aria-controls={id}
                disabled={active >= count - 1}
                onClick={() => goTo((destination.current ?? active) + 1)}
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </SiteButton>
            </div>
          </div>
          <p id={`${id}-help`} className="sr-only">
            {tSite(
              "Use the left and right arrow keys to explore the foundations.",
            )}
          </p>
          <div
            ref={railRef}
            id={id}
            role="group"
            aria-label={tSite("Included in the source")}
            aria-describedby={`${id}-help`}
            tabIndex={0}
            className={styles.foundationRail}
            onPointerDown={() => {
              destination.current = null;
            }}
            onWheel={() => {
              destination.current = null;
            }}
            onKeyDown={(event) => {
              if (
                event.target !== event.currentTarget ||
                event.altKey ||
                event.ctrlKey ||
                event.metaKey
              )
                return;
              const current = destination.current ?? active;
              let next: number;
              switch (event.key) {
                case "ArrowLeft":
                  next = current - 1;
                  break;
                case "ArrowRight":
                  next = current + 1;
                  break;
                case "Home":
                  next = 0;
                  break;
                case "End":
                  next = count - 1;
                  break;
                default:
                  return;
              }
              event.preventDefault();
              goTo(next);
            }}
          >
            {tSite(children)}
          </div>
          <div className={styles.foundationProgress} aria-hidden="true">
            <span
              style={{
                transform: `scaleX(${count ? (active + 1) / count : 1})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
