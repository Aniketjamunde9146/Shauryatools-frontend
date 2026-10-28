"use client";

import { useEffect } from "react";

/** Registers /sw.js in production so the site works offline after the first visit. Renders nothing. */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline support is an extra. If registration fails, the site still works normally.
    });
  }, []);
  return null;
}
