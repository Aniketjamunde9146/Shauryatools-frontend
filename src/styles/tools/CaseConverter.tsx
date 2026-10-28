"use client";

import { useState } from "react";
import { CASE_MODES, type CaseMode, convertCase } from "@/lib/toolLogic";
import "./NewTools.css";

export default function CaseConverter() {
  const [text, setText] = useState("hello world from shauryatools");
  const [mode, setMode] = useState<CaseMode>("title");
  const [copied, setCopied] = useState(false);
  const output = convertCase(text, mode);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Case Converter</h1>
        <p>Change text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case and more.</p>
      </header>
      <div className="nt-card nt-stack">
        <div>
          <label className="nt-label" htmlFor="cc-input">Your text</label>
          <textarea id="cc-input" className="nt-textarea" value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <span className="nt-label">Convert to</span>
          <div className="nt-row">
            {CASE_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`nt-btn${mode === m.id ? " is-on" : ""}`}
                aria-pressed={mode === m.id}
                onClick={() => setMode(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="nt-label" htmlFor="cc-output">Result</label>
          <textarea id="cc-output" className="nt-textarea" value={output} readOnly />
          <div className="nt-row" style={{ marginTop: 10 }}>
            <button type="button" className="nt-btn" onClick={copy}>
              {copied ? "Copied" : "Copy result"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
