"use client";

import { useState } from "react";
import { pickOne } from "@/lib/toolLogic";
import "./NewTools.css";

export default function RandomNamePicker() {
  const [list, setList] = useState("Ananya\nArjun\nPriya\nRohan");
  const [winner, setWinner] = useState<string | null>(null);
  const items = list.split("\n").map((s) => s.trim()).filter(Boolean);

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Random Name Picker</h1>
        <p>Paste names or options, one per line, and pick one at random.</p>
      </header>
      <div className="nt-card nt-stack">
        <div>
          <label className="nt-label" htmlFor="rp-list">Names or options ({items.length})</label>
          <textarea id="rp-list" className="nt-textarea" style={{ minHeight: 130 }} value={list} onChange={(e) => { setList(e.target.value); setWinner(null); }} />
        </div>
        <div className="nt-row">
          <button type="button" className="nt-btn is-on" disabled={!items.length} onClick={() => setWinner(pickOne(items))}>
            Pick one
          </button>
        </div>
        {winner && (
          <div className="nt-preview" style={{ textAlign: "center", fontSize: "1.6rem", fontWeight: 700, color: "#0f172a" }} aria-live="polite">
            {winner}
          </div>
        )}
      </div>
    </main>
  );
}
