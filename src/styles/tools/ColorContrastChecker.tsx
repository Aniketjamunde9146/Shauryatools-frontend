"use client";

import { useState } from "react";
import { contrastRatio, parseHex, toHex, wcagLevels } from "@/lib/toolLogic";
import "./NewTools.css";

export default function ColorContrastChecker() {
  const [fg, setFg] = useState("#1f2937");
  const [bg, setBg] = useState("#ffffff");

  const a = parseHex(fg);
  const b = parseHex(bg);
  const ratio = a && b ? contrastRatio(a, b) : null;
  const levels = ratio !== null ? wcagLevels(ratio) : null;

  const rows: { label: string; need: string; pass: boolean | null }[] = levels
    ? [
        { label: "Normal text, AA", need: "4.5:1", pass: levels.normalAA },
        { label: "Normal text, AAA", need: "7:1", pass: levels.normalAAA },
        { label: "Large text, AA", need: "3:1", pass: levels.largeAA },
        { label: "Large text, AAA", need: "4.5:1", pass: levels.largeAAA },
      ]
    : [];

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Color Contrast Checker</h1>
        <p>Check whether your text and background colors are readable, using the WCAG 2 accessibility levels.</p>
      </header>
      <div className="nt-card nt-stack">
        <div className="nt-fields">
          <ColorField id="cc-fg" label="Text color" value={fg} onChange={setFg} parsed={a} />
          <ColorField id="cc-bg" label="Background color" value={bg} onChange={setBg} parsed={b} />
        </div>

        <div className="nt-preview" style={{ background: b ? toHex(b) : "#ffffff", color: a ? toHex(a) : "#000000" }}>
          The quick brown fox jumps over the lazy dog. 1234567890
        </div>

        {ratio !== null ? (
          <>
            <p style={{ margin: 0, fontSize: "1.1rem", color: "#0f172a" }}>
              Contrast ratio: <strong>{ratio.toFixed(2)}:1</strong>
            </p>
            <table className="nt-table">
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td>Needs {r.need}</td>
                    <td style={{ textAlign: "right" }}>
                      <span className={`nt-pill ${r.pass ? "nt-pass" : "nt-fail"}`}>{r.pass ? "Pass" : "Fail"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="nt-error">Enter valid colors in #rgb or #rrggbb format.</p>
        )}
      </div>
    </main>
  );
}

function ColorField({
  id,
  label,
  value,
  onChange,
  parsed,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  parsed: [number, number, number] | null;
}) {
  return (
    <div>
      <label className="nt-label" htmlFor={id}>{label}</label>
      <div className="nt-row" style={{ flexWrap: "nowrap", alignItems: "center" }}>
        <input
          id={id}
          className="nt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!parsed}
          spellCheck={false}
        />
        <input
          type="color"
          aria-label={`${label} picker`}
          value={parsed ? toHex(parsed) : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 46, height: 44, border: "none", background: "none", padding: 0, cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
