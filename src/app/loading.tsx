import "@/components/PageLoader.css";

// Shown while any route segment loads (tool pages and the home page).
// Layout (navbar, footer) stays on screen, so only the content area is a skeleton.
export default function Loading() {
  return (
    <div className="pl-wrap" role="status" aria-live="polite">
      <span className="pl-sr">Loading page…</span>
      <div className="pl-bar pl-w40" />
      <div className="pl-bar pl-title" />
      <div className="pl-bar pl-sub" />
      <div className="pl-card" aria-hidden="true">
        <div className="pl-bar pl-w30" />
        <div className="pl-field" />
        <div className="pl-row">
          <div className="pl-cell" />
          <div className="pl-cell" />
          <div className="pl-cell" />
        </div>
      </div>
    </div>
  );
}
