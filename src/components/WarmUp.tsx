"use client";

import { useEffect } from "react";
import { warmUpBackend } from "@/lib/api";

/**
 * One wake-up request per visitor landing. The root layout mounts once per full page load, so this
 * runs once when someone arrives. Moving between pages inside the site does not send it again.
 * Free: it is a single request to the backend's /health route, no paid cron or extra service needed.
 * Renders nothing.
 */
export default function WarmUp() {
  useEffect(() => {
    // Wait until the browser is idle so the request never competes with the first paint.
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(() => void warmUpBackend());
    else window.setTimeout(() => void warmUpBackend(), 1);
  }, []);

  return null;
}
