import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "@/styles/Home.css";
import "@/styles/responsive.css";
import "@/styles/theme.css";
import Navbar from "@/components/Navbar";
import BackButton from "@/components/BackButton";
import Analytics from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ServiceWorker from "@/components/ServiceWorker";
import WarmUp from "@/components/WarmUp";
import SiteFooter from "@/components/SiteFooter";
import ToolSEOContent from "@/components/ToolSEOContent";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

// Self-hosted variable font: no Google Fonts request at build or run time, no render-blocking stylesheet.
const manrope = localFont({
  src: "./fonts/Manrope.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

// Site-wide defaults. Each page overrides title/description/canonical/OG via its own `metadata` export.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Free Online Tools | ${SITE_NAME}`,
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        {/* #root is kept so existing selectors in responsive.css still apply */}
        <div id="root">
          <GoogleAnalytics />
          <Navbar />
          <BackButton />
          <Analytics />
          <ConsentBanner />
          <ServiceWorker />
          <WarmUp />
          {children}
          <ToolSEOContent />
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
