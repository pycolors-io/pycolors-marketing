"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@pycolors/ui";
import styles from "./starter-pro.module.css";

type StarterProCarouselProps = Readonly<{
  slides: readonly Readonly<{ title: string; content: ReactNode }>[];
}>;

const AUTOPLAY_DELAY = 5000;

/** Interactive controls only; the route supplies server-rendered figures. */
export function StarterProCarousel({ slides }: StarterProCarouselProps) {
  const [{ active, previous, direction }, setSlide] = useState<{
    active: number;
    previous: number | null;
    direction: "next" | "previous";
  }>({ active: 0, previous: null, direction: "next" });
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const rotationIntent = useRef<boolean | null>(null);
  const id = useId();
  const rotating =
    playing && !hovered && inView && pageVisible && slides.length > 1;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);

    const carousel = carouselRef.current;
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              if (entry)
                setInView(
                  entry.isIntersecting && entry.intersectionRatio >= 0.25,
                );
            },
            { threshold: 0.25 },
          )
        : null;
    if (carousel) observer?.observe(carousel);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectPreference = () => {
      if (preference.matches) setPlaying(false);
    };
    respectPreference();
    preference.addEventListener("change", respectPreference);
    return () => preference.removeEventListener("change", respectPreference);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => {
      setSlide((current) => ({
        active: (current.active + 1) % slides.length,
        previous: current.active,
        direction: "next",
      }));
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [active, rotating, slides.length]);

  function select(index: number) {
    setPlaying(false);
    setSlide((current) => ({
      active: (index + slides.length) % slides.length,
      previous: current.active,
      direction: index > current.active ? "next" : "previous",
    }));
  }

  return (
    <div
      ref={carouselRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Starter Pro interface previews"
      data-direction={direction}
      data-rotating={rotating}
      className={`${styles.carousel} min-w-0 overflow-hidden rounded-[5px] border border-border-subtle bg-background`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setPlaying(false)}
    >
      <div className="flex items-center justify-between gap-2 border-b border-border-subtle px-3 py-2 sm:px-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <p>
            Preview{" "}
            <span className="ml-2 font-mono text-foreground">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
          </p>
          <span
            aria-hidden="true"
            className="hidden items-center gap-1.5 border-l border-border-subtle pl-3 sm:inline-flex"
          >
            <span
              className={`size-1.5 rounded-full ${rotating ? "bg-foreground" : "bg-muted-foreground/40"}`}
            />
            {rotating ? "Auto-play" : "Paused"}
          </span>
        </div>
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 rounded-[5px]"
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            aria-controls={id}
            onPointerDown={() => {
              // Keep a pointer's intended action when focus also stops rotation.
              rotationIntent.current = !playing;
            }}
            onPointerCancel={() => {
              rotationIntent.current = null;
            }}
            onKeyDown={() => {
              rotationIntent.current = null;
            }}
            onClick={() => {
              const resume = rotationIntent.current ?? !playing;
              setPlaying(resume);
              // An explicit Play action takes effect even while the pointer
              // remains over the controls. A later hover can pause again.
              if (resume) setHovered(false);
              rotationIntent.current = null;
            }}
          >
            {playing ? (
              <Pause className="size-4" aria-hidden="true" />
            ) : (
              <Play className="size-4" aria-hidden="true" />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 rounded-[5px]"
            aria-label="Previous preview"
            aria-controls={id}
            onClick={() => select(active - 1)}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11 rounded-[5px]"
            aria-label="Next preview"
            aria-controls={id}
            onClick={() => select(active + 1)}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div
        id={id}
        className="grid"
        aria-live={rotating ? "off" : "polite"}
        aria-atomic={false}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            aria-hidden={index !== active}
            inert={index !== active}
            data-active={index === active}
            data-exiting={index === previous && index !== active}
            className={`${styles.slide} col-start-1 row-start-1 min-w-0`}
          >
            {slide.content}
          </div>
        ))}
      </div>
      <div
        role="group"
        aria-label="Choose a preview"
        className="grid grid-cols-2 border-t border-border-subtle sm:grid-cols-5"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={slide.title}
            aria-disabled={index === active}
            aria-current={index === active ? "true" : undefined}
            aria-controls={id}
            onClick={() => {
              if (index !== active) select(index);
            }}
            className={`relative flex min-h-11 items-center justify-center gap-2 px-3 py-3 text-xs transition-colors last:col-span-2 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ring sm:last:col-span-1 ${index === active ? "bg-surface-muted/40 font-medium text-foreground" : "text-muted-foreground hover:bg-surface-muted/30 hover:text-foreground"}`}
          >
            <span
              aria-hidden="true"
              className="hidden font-mono text-[10px] text-muted-foreground lg:inline"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {slide.title}
            {index === active ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden bg-foreground/15"
              >
                <span
                  className={styles.progressFill}
                  style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }}
                />
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
