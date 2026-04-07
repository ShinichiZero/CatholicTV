"use client";
import { useEffect, useCallback } from "react";

export function useKeyboardNav(containerRef: React.RefObject<HTMLElement | null>) {
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        '[tabindex="0"], button, a, input, select, textarea'
      )
    ).filter((el) => !el.hasAttribute("disabled"));
  }, [containerRef]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const elements = getFocusableElements();
      if (!elements.length) return;

      const activeIndex = elements.indexOf(document.activeElement as HTMLElement);

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown": {
          e.preventDefault();
          const next = elements[(activeIndex + 1) % elements.length];
          next?.focus();
          break;
        }
        case "ArrowLeft":
        case "ArrowUp": {
          e.preventDefault();
          const prev =
            elements[(activeIndex - 1 + elements.length) % elements.length];
          prev?.focus();
          break;
        }
        case "Enter":
        case " ": {
          e.preventDefault();
          if (document.activeElement && document.activeElement !== document.body) {
            (document.activeElement as HTMLElement).click();
          }
          break;
        }
      }
    },
    [getFocusableElements]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, handleKeyDown]);
}
