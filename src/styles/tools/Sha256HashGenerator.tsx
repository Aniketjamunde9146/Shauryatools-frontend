"use client";

import { useEffect, useState } from "react";
import { sha256Hex } from "@/lib/toolLogic";
import "./NewTools.css";

export default function Sha256HashGenerator() {
  const [text, setText] = useState("hello");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    sha256Hex(text).then((h) => {
      if (!cancelled) setHash(h);
    });
    return () => {
      cancelled = true;
    };
  }, [text]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>SHA-256 Hash Generator</h1>
        <p>Type or paste text to get its SHA-256 hash. The hash is computed in your browser, and nothing is uploaded.</p>
      </header>
      <div className="nt-card nt-stack">
        <div>
          <label className="nt-label" htmlFor="sha-in">Text</label>
          <textarea id="sha-in" className="nt-textarea" style={{ minHeight: 110 }} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div>
          <label className="nt-label" htmlFor="sha-out">SHA-256 hash</label>
          <input id="sha-out" className="nt-input" readOnly value={hash} onFocus={(e) => e.currentTarget.select()} spellCheck={false} style={{ fontFamily: "monospace", fontSize: "0.85rem" }} />
          <div className="nt-row" style={{ marginTop: 10 }}>
            <button type="button" className="nt-btn" onClick={copy}>{copied ? "Copied" : "Copy hash"}</button>
          </div>
        </div>
      </div>
    </main>
  );
}
