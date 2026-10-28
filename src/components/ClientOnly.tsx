"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children only after the component has mounted in the browser.
 * Used for tools whose first render depends on the current time, randomness,
 * or localStorage — those can't match between the server render and the browser.
 */
export default function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}
