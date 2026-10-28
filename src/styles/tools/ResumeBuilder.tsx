"use client";

import { useState } from "react";
import { generateAI } from "@/lib/api";
import SnakeLoader from "@/components/SnakeLoader";
import "./NewTools.css";

export default function ResumeBuilder() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [work, setWork] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const ready = name.trim() && role.trim() && work.trim();

  const build = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const prompt = `Write a clean, ATS-friendly one-page resume in plain text.
Name: ${name.trim()}
Job title: ${role.trim()}
Recent work: ${work.trim()}
Add a 2-line summary at the top, then the experience and a skills list.
Use short bullet points that start with action verbs. Infer relevant skills from the work. Do not invent employers or dates.`;
      const res = await generateAI("resume_builder", prompt);
      if (!res.data.success) throw new Error("ai_fail");
      setResult(String(res.data.data || "").trim());
    } catch {
      setError("Could not create the resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="nt-wrap">
      <header className="nt-head">
        <h1>Resume Builder</h1>
        <p>Enter three things. We write the rest.</p>
      </header>

      <div className="nt-card nt-stack">
        <div className="nt-fields">
          <div>
            <label className="nt-label" htmlFor="rb-name">Full name</label>
            <input id="rb-name" className="nt-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Arjun Mehta" />
          </div>
          <div>
            <label className="nt-label" htmlFor="rb-role">Job title</label>
            <input id="rb-role" className="nt-input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Frontend Developer" />
          </div>
        </div>

        <div>
          <label className="nt-label" htmlFor="rb-work">Recent work</label>
          <textarea
            id="rb-work"
            className="nt-textarea"
            style={{ minHeight: 110 }}
            value={work}
            onChange={(e) => setWork(e.target.value)}
            placeholder="Example: Built the company website at ABC Ltd (2023–2025), reduced load time by 40%"
          />
        </div>

        <div className="nt-row">
          <button type="button" className="nt-btn is-on" disabled={!ready || loading} onClick={build}>
            {loading ? "Writing…" : "Create resume"}
          </button>
        </div>

        {error && <p className="nt-error">{error}</p>}

        {result && (
          <div>
            <div className="nt-preview" style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>{result}</div>
            <div className="nt-row" style={{ marginTop: 10 }}>
              <button type="button" className="nt-btn" onClick={copy}>{copied ? "Copied" : "Copy resume"}</button>
            </div>
          </div>
        )}
      </div>
      <SnakeLoader loading={loading} message="Building your resume. Usually under a minute." />
    </main>
  );
}
