// Single source of truth for the site origin. Set NEXT_PUBLIC_SITE_URL to change the domain.
// Kept in its own tiny module so client tool components can import it without pulling in the tool catalogue.
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shauryatools.vercel.app";

export const SITE_URL = configuredSiteUrl
  .replace(/^http:\/\/shauryatools\.vercel\.app(?=\/|$)/i, "https://shauryatools.vercel.app")
  .replace(/\/$/, "");
