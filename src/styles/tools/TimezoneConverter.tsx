"use client";

import { useState } from "react";
import { TIME_ZONES, formatInZone, zonedToInstant } from "@/lib/toolLogic";
import "./NewTools.css";

export default function TimezoneConverter() {
  const [local, setLocal] = useState("2026-01-01T12:00");
  const [from, setFrom] = useState("Asia/Kolkata");
  const [to, setTo] = useState("America/New_York");

  let result: { utc: string; source: string; target: string } | null = null;
  let error: string | null = null;
  try {
    const instant = zonedToInstant(local, from);
    if (Number.isNaN(instant.getTime())) throw new Error("bad date");
    result = {
      utc: instant.toISOString().replace(".000Z", " UTC"),
      source: formatInZone(instant, from),
      target: formatInZone(instant, to),
    };
  } catch {
    error = "Enter a valid date and time.";
  }

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Timezone Converter</h1>
        <p>Convert a date and time from one world time zone to another. Daylight saving changes are handled for you.</p>
      </header>
      <div className="nt-card nt-stack">
        <div>
          <label className="nt-label" htmlFor="tz-local">Date and time</label>
          <input id="tz-local" className="nt-input" type="datetime-local" value={local} onChange={(e) => setLocal(e.target.value)} />
        </div>
        <div className="nt-fields">
          <div>
            <label className="nt-label" htmlFor="tz-from">From</label>
            <select id="tz-from" className="nt-input" value={from} onChange={(e) => setFrom(e.target.value)}>
              {TIME_ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div>
            <label className="nt-label" htmlFor="tz-to">To</label>
            <select id="tz-to" className="nt-input" value={to} onChange={(e) => setTo(e.target.value)}>
              {TIME_ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
        </div>

        {result ? (
          <div className="nt-grid" style={{ marginTop: 0 }}>
            <div className="nt-stat"><b style={{ fontSize: "1.1rem" }}>{result.source}</b><span>In {from}</span></div>
            <div className="nt-stat"><b style={{ fontSize: "1.1rem" }}>{result.target}</b><span>In {to}</span></div>
            <div className="nt-stat"><b style={{ fontSize: "1.1rem" }}>{result.utc}</b><span>Same moment in UTC</span></div>
          </div>
        ) : (
          <p className="nt-error">{error}</p>
        )}
      </div>
    </main>
  );
}
