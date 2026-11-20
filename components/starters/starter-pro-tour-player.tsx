"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import styles from "./starter-pro.module.css";

type StarterProTourPlayerProps = Readonly<{
  source: string;
  poster: string;
  captions: string;
  duration: string;
}>;

/** Only the poster loads before the visitor explicitly requests playback. */
export function StarterProTourPlayer({
  source,
  poster,
  captions,
  duration,
}: StarterProTourPlayerProps) {
  const tSite = useCopy();
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!started || !video.current) return;
    video.current.focus();
    // Browsers can refuse programmatic playback; native controls remain usable.
    void video.current.play().catch(() => {});
  }, [started]);

  return (
    <div className={styles.tourStage}>
      <div className={styles.tourScreen}>
        {started ? (
          <video
            ref={video}
            className={styles.tourVideo}
            aria-label={tSite("Starter Pro product tour")}
            controls
            playsInline
            preload="none"
            poster={poster}
            src={source}
            tabIndex={0}
          >
            <track
              kind="captions"
              src={captions}
              srcLang="en"
              label={tSite("English")}
            />
            {tSite(
              "Read the tour transcript below if your browser cannot play this video.",
            )}
          </video>
        ) : (
          <button
            type="button"
            aria-label={tSite("Play Starter Pro product tour ({value0})", {
              value0: duration,
            })}
            className={styles.tourPoster}
            onClick={() => setStarted(true)}
          >
            <Image
              src={poster}
              alt=""
              quality={100}
              width={1920}
              height={1080}
              sizes="(min-width: 1440px) 1296px, 92vw"
              className={styles.tourPosterImage}
            />
            <span className={styles.tourPlay}>
              <span className={styles.tourPlayIcon} aria-hidden="true">
                <Play className="size-4 fill-current sm:size-5" />
              </span>
              <span>{tSite("Watch the tour")}</span>
              <span className={styles.tourDuration}>{tSite(duration)}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
