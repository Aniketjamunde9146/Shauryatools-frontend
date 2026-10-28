"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Sends a GA page_view on client-side route changes (the first load is covered by the gtag config call).
export default function Analytics() {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    window.gtag?.("event", "page_view", {
      page_path: `${pathname}${window.location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
