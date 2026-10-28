"use client";

import { useState } from "react";
import { splitBill } from "@/lib/toolLogic";
import "./NewTools.css";

export default function TipCalculator() {
  const [bill, setBill] = useState(1000);
  const [tip, setTip] = useState(10);
  const [people, setPeople] = useState(1);
  const r = splitBill(bill || 0, tip || 0, people || 1);

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Tip Calculator</h1>
        <p>Enter the bill, pick a tip, and see the total and each person's share.</p>
      </header>
      <div className="nt-card nt-stack">
        <div className="nt-fields">
          <div>
            <label className="nt-label" htmlFor="tip-bill">Bill amount</label>
            <input id="tip-bill" className="nt-input" type="number" min={0} value={bill} onChange={(e) => setBill(Number(e.target.value))} />
          </div>
          <div>
            <label className="nt-label" htmlFor="tip-people">People</label>
            <input id="tip-people" className="nt-input" type="number" min={1} value={people} onChange={(e) => setPeople(Number(e.target.value))} />
          </div>
        </div>
        <div>
          <span className="nt-label">Tip</span>
          <div className="nt-row">
            {[5, 10, 15, 18, 20].map((p) => (
              <button key={p} type="button" className={`nt-btn${tip === p ? " is-on" : ""}`} aria-pressed={tip === p} onClick={() => setTip(p)}>
                {p}%
              </button>
            ))}
          </div>
        </div>
        <div className="nt-grid" style={{ marginTop: 0 }}>
          <div className="nt-stat"><b>{r.tip.toFixed(2)}</b><span>Tip</span></div>
          <div className="nt-stat"><b>{r.total.toFixed(2)}</b><span>Total</span></div>
          <div className="nt-stat"><b>{r.perPerson.toFixed(2)}</b><span>Each person pays</span></div>
        </div>
      </div>
    </main>
  );
}
