"use client";

import { useEffect } from "react";
import Link from "next/link";

/** Shown when a page throws while rendering. `reset` retries the render without a full reload. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 40 }}>
      <h1 style={{ fontSize: 28, margin: "0 0 8px" }}>Something went wrong</h1>
      <p style={{ color: "#6b7280", maxWidth: 420, margin: "0 0 24px" }}>
        This tool hit an unexpected error. Try again, or go back to the home page.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          onClick={reset}
          style={{ padding: "10px 22px", borderRadius: 10, border: 0, background: "#0a0a0a", color: "#fff", fontWeight: 600, cursor: "pointer" }}
        >
          Try again
        </button>
        <Link href="/" style={{ padding: "10px 22px", borderRadius: 10, border: "1px solid #d1d5db", color: "inherit", fontWeight: 600, textDecoration: "none" }}>
          Home
        </Link>
      </div>
    </div>
  );
}
