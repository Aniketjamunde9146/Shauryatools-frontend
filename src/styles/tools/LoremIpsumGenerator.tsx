"use client";

import { useState } from "react";
import { loremText, textStats } from "@/lib/toolLogic";
import "./NewTools.css";

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [copied, setCopied] = useState(false);
  const paragraphs = Math.min(10, Math.max(1, Math.round(count) || 1));
  const output = loremText(paragraphs);
  const words = textStats(output).words;

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
        <h1>Lorem Ipsum Generator</h1>
        <p>Placeholder text for mockups, page layouts and design tests. Choose how many paragraphs you need (1 to 10).</p>
      </header>
      <div className="nt-card nt-stack">
        <div style={{ maxWidth: 220 }}>
          <label className="nt-label" htmlFor="li-count">Paragraphs</label>
          <input
            id="li-count"
            className="nt-input"
            type="number"
            min={1}
            max={10}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <p className="nt-muted">{words} words generated</p>
        </div>
        <div>
          <label className="nt-label" htmlFor="li-output">Generated text</label>
          <textarea id="li-output" className="nt-textarea" value={output} readOnly style={{ minHeight: 240 }} />
          <div className="nt-row" style={{ marginTop: 10 }}>
            <button type="button" className="nt-btn" onClick={copy}>
              {copied ? "Copied" : "Copy text"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
