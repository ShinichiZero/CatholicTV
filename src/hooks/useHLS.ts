"use client";
import { useEffect, useRef, useCallback } from "react";

interface UseHLSOptions {
  onError?: (message: string) => void;
  audioOnly?: boolean;
}

export function useHLS(
  mediaRef: React.RefObject<HTMLVideoElement | HTMLAudioElement | null>,
  src: string | null,
  options: UseHLSOptions = {}
) {
  const hlsRef = useRef<import("hls.js").default | null>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { onError } = options;

  const destroy = useCallback(() => {
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (mediaRef.current) {
      mediaRef.current.pause();
      mediaRef.current.removeAttribute("src");
      mediaRef.current.load();
    }
  }, [mediaRef]);

  useEffect(() => {
    if (!src || !mediaRef.current) return;

    // Capture ref value at effect time (safe pattern for refs in effects)
    const media = mediaRef.current;

    const loadStream = async () => {
      const Hls = (await import("hls.js")).default;

      if (Hls.isSupported()) {
        destroy();

        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 30,
          maxBufferLength: 60,
          maxMaxBufferLength: 120,
          startLevel: -1,
          abrEwmaDefaultEstimate: 500000,
        });

        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(media);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          media.play().catch(() => {});
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = setTimeout(() => {
              onError?.("Stream unavailable. Please try again later.");
            }, 3000);
          }
        });
      } else if (media.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS (Safari/iOS)
        media.src = src;
        media.addEventListener("loadedmetadata", () => {
          media.play().catch(() => {});
        }, { once: true });
        media.addEventListener("error", () => {
          onError?.("Stream unavailable. Please try again later.");
        }, { once: true });
      } else {
        onError?.("Your browser does not support HLS streaming.");
      }
    };

    loadStream();

    return () => {
      destroy();
    };
  }, [src, destroy, onError, mediaRef]);

  return { destroy };
}
