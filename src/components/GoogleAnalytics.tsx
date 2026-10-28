import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-EHLC00KN7H";
const CONSENT_KEY = "shaurya-consent-v1"; // same key ConsentBanner writes

// Consent starts as "denied" unless the visitor already accepted on a previous visit.
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var granted = false;
          try { granted = localStorage.getItem('${CONSENT_KEY}') === 'granted'; } catch (e) {}
          var state = granted ? 'granted' : 'denied';
          gtag('consent', 'default', {
            ad_storage: state, ad_user_data: state, ad_personalization: state, analytics_storage: state
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
