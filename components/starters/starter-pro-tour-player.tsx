"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

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
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!started || !video.current) return;
    video.current.focus();
    // Browsers can refuse programmatic playback; native controls remain usable.
    void video.current.play().catch(() => {});
  }, [started]);

  return (
    <div className="overflow-hidden rounded-[4px] border border-border-subtle bg-zinc-950">
      {started ? (
        <video
          ref={video}
          className="block aspect-video w-full focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white"
          aria-label="Starter Pro product tour"
          controls
          playsInline
          preload="none"
          poster={poster}
          src={source}
          tabIndex={0}
        >
          <track kind="captions" src={captions} srcLang="en" label="English" />
          Read the tour transcript below if your browser cannot play this video.
        </video>
      ) : (
        <button
          type="button"
          aria-label={`Play Starter Pro product tour (${duration})`}
          className="group relative block aspect-video w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          onClick={() => setStarted(true)}
        >
          <Image
            src={poster}
            alt=""
            quality={100}
            width={1920}
            height={1080}
            sizes="(min-width: 1440px) 1360px, 95vw"
            className="block h-full w-full object-cover"
          />
          <span className="absolute bottom-[12%] left-[5%] inline-flex min-h-11 items-center gap-3 rounded-[3px] border border-white/20 bg-white px-4 py-2.5 text-xs font-medium text-zinc-950 transition-colors group-hover:bg-zinc-200 motion-reduce:transition-none sm:text-sm">
            <Play className="size-4 fill-current" aria-hidden="true" />
            Watch the tour
            <span className="border-l border-zinc-300 pl-3 font-mono text-[11px] text-zinc-600">
              {duration}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
