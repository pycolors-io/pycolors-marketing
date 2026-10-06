"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./starter-pro.module.css";

/** Keeps the route's server-rendered cards in normal flow and reveals them once. */
export function StarterProFoundations({
  introduction,
  children,
}: Readonly<{ introduction: ReactNode; children: ReactNode }>) {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(
      cardsRef.current?.querySelectorAll<HTMLElement>(
        "[data-foundation-card]",
      ) ?? [],
    );
    if (typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealed = new WeakSet<HTMLElement>();
    let observer: IntersectionObserver | undefined;

    function configure() {
      observer?.disconnect();
      for (const card of cards) delete card.dataset.reveal;
      if (preference.matches) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || !(entry.target instanceof HTMLElement))
              continue;
            const card = entry.target;
            if (card.dataset.reveal !== "focused")
              card.dataset.reveal = "visible";
            revealed.add(card);
            observer?.unobserve(card);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
      );

      for (const card of cards) {
        if (
          revealed.has(card) ||
          card.getBoundingClientRect().top < window.innerHeight - 48
        ) {
          revealed.add(card);
          continue;
        }
        card.dataset.reveal = "pending";
        observer.observe(card);
      }
    }

    configure();
    preference.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", configure);
      for (const card of cards) delete card.dataset.reveal;
    };
  }, []);

  return (
    <div className={styles.foundationStory}>
      <div className={styles.foundationIntro}>{introduction}</div>
      <div
        ref={cardsRef}
        className={styles.foundationCards}
        onFocusCapture={(event) => {
          const card = event.target.closest<HTMLElement>(
            "[data-foundation-card]",
          );
          if (card) card.dataset.reveal = "focused";
        }}
      >
        {children}
      </div>
    </div>
  );
}
