import { useState } from "react";

import { YOUTUBE_EMBED_URL, YOUTUBE_THUMBNAIL_URL, YOUTUBE_VIDEO_ID } from "@/lib/project-links";

/**
 * On-page YouTube demo player. Shows the video's cover art with a play button and
 * only loads the YouTube frame after the visitor clicks it, so the page stays light.
 * Renders nothing while the demo link is unset, so callers can fall back to a link.
 */
export function YouTubeEmbed({ title, className = "" }: { title: string; className?: string }) {
  const [playing, setPlaying] = useState(false);

  if (!YOUTUBE_VIDEO_ID) return null;

  return (
    <div
      className={`relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-background ${className}`}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`${YOUTUBE_EMBED_URL}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center p-6 text-center"
        >
          <img
            src={YOUTUBE_THUMBNAIL_URL}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/30" />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan bg-cyan/15 text-2xl text-cyan shadow-glow transition group-hover:scale-105">
            ▶
          </span>
          <span className="relative mt-4 text-lg font-bold text-foreground">{title}</span>
          <span className="relative technical mt-1 text-xs text-muted-foreground">
            Click to play on YouTube
          </span>
        </button>
      )}
    </div>
  );
}
