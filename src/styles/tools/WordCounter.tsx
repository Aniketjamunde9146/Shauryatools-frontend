"use client";

import { useState } from "react";
import { formatDuration, textStats } from "@/lib/toolLogic";
import "./NewTools.css";

export default function WordCounter() {
  const [text, setText] = useState("");
  const s = textStats(text);

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Word Counter</h1>
        <p>Paste or type text to count words, characters, sentences and paragraphs, with reading and speaking time.</p>
      </header>
      <div className="nt-card">
        <label className="nt-label" htmlFor="wc-text">Your text</label>
        <textarea
          id="wc-text"
          className="nt-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here…"
        />
        <div className="nt-grid">
          <Stat value={s.words} label="Words" />
          <Stat value={s.characters} label="Characters" />
          <Stat value={s.charactersNoSpaces} label="Characters (no spaces)" />
          <Stat value={s.sentences} label="Sentences" />
          <Stat value={s.paragraphs} label="Paragraphs" />
          <Stat value={formatDuration(s.readingMinutes)} label="Reading time (200 wpm)" />
          <Stat value={formatDuration(s.speakingMinutes)} label="Speaking time (130 wpm)" />
        </div>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="nt-stat">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}
