"use client";

import { useState } from "react";
import { dateDifference } from "@/lib/toolLogic";
import "./NewTools.css";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export default function DateDifferenceCalculator() {
  const [start, setStart] = useState("2026-01-01");
  const [end, setEnd] = useState("2026-12-31");
  const valid = DATE_RE.test(start) && DATE_RE.test(end);
  const d = valid ? dateDifference(start, end) : null;

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Date Difference Calculator</h1>
        <p>Find the exact number of days, weeks, months and years between two dates.</p>
      </header>
      <div className="nt-card nt-stack">
        <div className="nt-fields">
          <div>
            <label className="nt-label" htmlFor="dd-start">Start date</label>
            <input id="dd-start" className="nt-input" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div>
            <label className="nt-label" htmlFor="dd-end">End date</label>
            <input id="dd-end" className="nt-input" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>

        {d ? (
          <>
            <div className="nt-grid" style={{ marginTop: 0 }}>
              <Stat value={d.totalDays} label="Total days" />
              <Stat value={`${d.weeks} wk ${d.remainderDays} d`} label="Weeks and days" />
              <Stat value={d.hours.toLocaleString("en-US")} label="Hours" />
              <Stat value={`${d.years} y ${d.months} m ${d.days} d`} label="Years, months, days" />
            </div>
            {d.reversed && (
              <p className="nt-muted">The end date is before the start date, so the result is shown as a positive difference.</p>
            )}
          </>
        ) : (
          <p className="nt-error">Enter both dates.</p>
        )}
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="nt-stat">
      <b style={{ fontSize: "1.2rem" }}>{value}</b>
      <span>{label}</span>
    </div>
  );
}
