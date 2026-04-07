"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
      navigator.serviceWorker
        .register(`${basePath}/sw.js`)
        .then((reg) => {
          console.log("[SW] Registered:", reg.scope);
        })
        .catch((err) => {
          console.warn("[SW] Registration failed:", err);
        });
    }
  }, []);
  return null;
}
