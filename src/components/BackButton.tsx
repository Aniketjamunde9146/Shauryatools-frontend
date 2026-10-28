"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./BackButton.css";

/**
 * Shows "Back" on every page except the home page.
 * Goes to the previous page on the site when there is one, otherwise to the home page.
 */
export default function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [inSiteHistory, setInSiteHistory] = useState(false);

  useEffect(() => {
    // Next.js stores an index in history.state for pages reached from inside the site.
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    setInSiteHistory(idx > 0);
  }, [pathname]);

  if (pathname === "/") return null;

  return (
    <div className="bk-bar">
    <Link
      href="/"
      className="bk-back"
      aria-label="Go back"
      onClick={(e) => {
        if (inSiteHistory) {
          e.preventDefault();
          router.back();
        }
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </svg>
      Back
    </Link>
    </div>
  );
}
