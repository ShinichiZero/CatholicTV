"use client";
import { useCallback, useState } from "react";

export function usePiP(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const [isPiP, setIsPiP] = useState(false);
  const supported =
    typeof document !== "undefined" && "pictureInPictureEnabled" in document;

  const togglePiP = useCallback(async () => {
    if (!videoRef.current || !supported) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else {
        await videoRef.current.requestPictureInPicture();
        setIsPiP(true);
      }
    } catch {
      // PiP not available in this context
    }
  }, [videoRef, supported]);

  return { isPiP, togglePiP, supported };
}
