"use client";

import { useState } from "react";
import { isoToUnix, unixToIso } from "@/lib/toolLogic";
import "./NewTools.css";

export default function UnixTimestampConverter() {
  const [ts, setTs] = useState("1700000000");
  const [when, setWhen] = useState("2023-11-14T22:13");
  const iso = ts.trim() ? unixToIso(Number(ts)) : null;
  const unix = isoToUnix(when);

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Unix Timestamp Converter</h1>
        <p>Turn a Unix timestamp into a readable date, or a date into a timestamp. Seconds and milliseconds both work.</p>
      </header>
      <div className="nt-card nt-stack">
        <div>
          <label className="nt-label" htmlFor="ut-ts">Unix timestamp</label>
          <input id="ut-ts" className="nt-input" value={ts} onChange={(e) => setTs(e.target.value)} spellCheck={false} />
          {ts.trim() && !iso && <p className="nt-error">That is not a valid timestamp.</p>}
          {iso && <p className="nt-muted">UTC: <strong style={{ color: "#0f172a" }}>{iso.replace("T", " ").replace(".000Z", " UTC")}</strong></p>}
        </div>
        <div>
          <label className="nt-label" htmlFor="ut-when">Date and time (UTC)</label>
          <input id="ut-when" className="nt-input" type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} />
          {unix !== null && <p className="nt-muted">Timestamp: <strong style={{ color: "#0f172a" }}>{unix}</strong></p>}
        </div>
      </div>
    </main>
  );
}
