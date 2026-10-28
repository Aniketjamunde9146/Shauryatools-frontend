"use client";

import { useState } from "react";
import { pxToRem, remToPx } from "@/lib/toolLogic";
import "./NewTools.css";

export default function PxRemConverter() {
  const [px, setPx] = useState(24);
  const [base, setBase] = useState(16);
  const b = base > 0 ? base : 16;

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>PX to REM Converter</h1>
        <p>Convert pixels to rem for CSS. The base font size is 16px unless you change it.</p>
      </header>
      <div className="nt-card nt-stack">
        <div className="nt-fields">
          <div>
            <label className="nt-label" htmlFor="pr-px">Pixels (px)</label>
            <input id="pr-px" className="nt-input" type="number" value={px} onChange={(e) => setPx(Number(e.target.value))} />
          </div>
          <div>
            <label className="nt-label" htmlFor="pr-base">Base font size (px)</label>
            <input id="pr-base" className="nt-input" type="number" min={1} value={base} onChange={(e) => setBase(Number(e.target.value))} />
          </div>
        </div>
        <div className="nt-grid" style={{ marginTop: 0 }}>
          <div className="nt-stat"><b>{pxToRem(px || 0, b).toFixed(4).replace(/\.?0+$/, "")} rem</b><span>{px || 0} px in rem</span></div>
          <div className="nt-stat"><b>{remToPx(1, b)} px</b><span>1 rem in px</span></div>
        </div>
      </div>
    </main>
  );
}
