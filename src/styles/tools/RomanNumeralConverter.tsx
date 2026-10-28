"use client";

import { useState } from "react";
import { fromRoman, toRoman } from "@/lib/toolLogic";
import "./NewTools.css";

export default function RomanNumeralConverter() {
  const [num, setNum] = useState("1994");
  const [roman, setRoman] = useState("MCMXCIV");
  const fromNumber = toRoman(Number(num));

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Roman Numeral Converter</h1>
        <p>Convert a number to a Roman numeral (1 to 3999), or a Roman numeral back to a number.</p>
      </header>
      <div className="nt-card nt-fields">
        <div>
          <label className="nt-label" htmlFor="rn-num">Number</label>
          <input id="rn-num" className="nt-input" inputMode="numeric" value={num} onChange={(e) => setNum(e.target.value)} />
          {fromNumber ? (
            <p className="nt-muted">Roman: <strong style={{ color: "#0f172a", fontSize: "1.1rem" }}>{fromNumber}</strong></p>
          ) : (
            <p className="nt-error">Enter a whole number from 1 to 3999.</p>
          )}
        </div>
        <div>
          <label className="nt-label" htmlFor="rn-roman">Roman numeral</label>
          <input id="rn-roman" className="nt-input" value={roman} onChange={(e) => setRoman(e.target.value)} spellCheck={false} />
          {fromRoman(roman) !== null ? (
            <p className="nt-muted">Number: <strong style={{ color: "#0f172a", fontSize: "1.1rem" }}>{fromRoman(roman)}</strong></p>
          ) : (
            <p className="nt-error">Not a valid Roman numeral.</p>
          )}
        </div>
      </div>
    </main>
  );
}
