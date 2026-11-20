"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { SiteButton as Button } from "@/components/site-button";
import styles from "./starter-pro.module.css";

type StarterProCarouselProps = Readonly<{
  slides: readonly Readonly<{ title: string; content: ReactNode }>[];
}>;

const AUTOPLAY_DELAY = 5000;

/** Interactive controls only; the route supplies server-rendered figures. */
export function StarterProCarousel({ slides }: StarterProCarouselProps) {
  const tSite = useCopy();

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
      aria-label={tSite("Starter Pro interface previews")}
      data-direction={direction}
      data-rotating={rotating}
      className={styles.carousel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setPlaying(false)}
    >
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
            aria-label={tSite("{value0} of {value1}: {value2}", {
              value0: index + 1,
              value1: slides.length,
              value2: slide.title,
            })}
            aria-hidden={index !== active}
            inert={index !== active}
            data-active={index === active}
            data-exiting={index === previous && index !== active}
            className={`${styles.slide} col-start-1 row-start-1 min-w-0`}
          >
            {tSite(slide.content)}
          </div>
        ))}
      </div>
      <div className={styles.carouselNavigation}>
        <div
          role="group"
          aria-label={tSite("Choose a preview")}
          className={styles.previewPicker}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={tSite(slide.title)}
              title={tSite(slide.title)}
              aria-disabled={index === active}
              aria-current={index === active ? "true" : undefined}
              aria-controls={id}
              onClick={() => {
                if (index !== active) select(index);
              }}
              className={styles.previewChoice}
            >
              <span className={styles.previewChoiceLabel}>
                {tSite(slide.title)}
              </span>
              {index === active ? (
                <span aria-hidden="true" className={styles.previewProgress}>
                  <span
                    className={styles.progressFill}
                    style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }}
                  />
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <div className={styles.carouselToolbar}>
          <p className={styles.carouselPosition}>
            {tSite("Preview")}
            <span>
              {tSite(String(active + 1).padStart(2, "0"))} /{tSite(" ")}
              {tSite(String(slides.length).padStart(2, "0"))}
            </span>
            <span aria-hidden="true" className={styles.rotationStatus}>
              {tSite(rotating ? "Auto-play" : "Paused")}
            </span>
          </p>
          <div className={styles.carouselControls}>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={styles.carouselControl}
              aria-label={tSite(playing ? "Pause slideshow" : "Play slideshow")}
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
              size="icon-sm"
              className={styles.carouselControl}
              aria-label={tSite("Previous preview")}
              aria-controls={id}
              onClick={() => select(active - 1)}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className={styles.carouselControl}
              aria-label={tSite("Next preview")}
              aria-controls={id}
              onClick={() => select(active + 1)}
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
