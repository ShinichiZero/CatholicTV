"use client";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Channel } from "@/types";
import { useHLS } from "@/hooks/useHLS";
import { usePiP } from "@/hooks/usePiP";
import StreamError from "./StreamError";

interface VideoPlayerProps {
  channel: Channel;
  audioOnly?: boolean;
}

// Delay before clearing loading state after a retry, to allow media element to reset
const RETRY_LOADING_DELAY_MS = 500;

export default function VideoPlayer({ channel, audioOnly = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback((msg: string) => {
    setError(msg);
    setIsLoading(false);
  }, []);

  const isAudioMode = channel.type === "radio" || audioOnly;
  const mediaRef = isAudioMode ? audioRef : videoRef;

  useHLS(mediaRef as React.RefObject<HTMLVideoElement | HTMLAudioElement | null>, channel.url, { onError: handleError });
  const { isPiP, togglePiP, supported: pipSupported } = usePiP(videoRef);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    const el = mediaRef.current;
    if (el) {
      el.pause();
      el.removeAttribute("src");
      el.load();
    }
    setTimeout(() => setIsLoading(false), RETRY_LOADING_DELAY_MS);
  }, [mediaRef]);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [channel.id]);

  if (isAudioMode) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-gradient-to-b from-catholic-navy to-black rounded-xl p-8">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 rounded-full bg-catholic-gold/20 animate-ping" />
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-catholic-navy border-2 border-catholic-gold text-4xl">
            {channel.type === "radio" ? "📻" : "🔇"}
          </div>
        </div>
        <p className="text-white font-semibold text-lg mb-1">{channel.name}</p>
        <p className="text-gray-400 text-sm mb-4">{audioOnly ? "Audio Only Mode" : "Live Radio"}</p>
        <audio
          ref={audioRef}
          controls
          className="w-full max-w-sm"
          aria-label={`${channel.name} audio player`}
        />
        {error && <StreamError message={error} onRetry={handleRetry} />}
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group">
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-catholic-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-white text-sm">Loading stream...</p>
          </div>
        </div>
      )}
      {error ? (
        <div className="absolute inset-0 z-20">
          <StreamError message={error} onRetry={handleRetry} />
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          playsInline
          controls
          aria-label={`${channel.name} live stream`}
          onCanPlay={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
        />
      )}
      {pipSupported && !error && (
        <button
          onClick={togglePiP}
          className="absolute bottom-14 right-2 z-30 px-3 py-1 bg-black/70 text-white text-xs rounded hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-catholic-gold opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Toggle Picture-in-Picture"
          tabIndex={0}
        >
          {isPiP ? "Exit PiP" : "PiP"}
        </button>
      )}
    </div>
  );
}
