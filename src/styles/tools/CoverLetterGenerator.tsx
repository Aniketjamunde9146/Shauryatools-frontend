"use client";

import { useState } from "react";
import { generateAI } from "@/lib/api";
import SnakeLoader from "@/components/SnakeLoader";
import "./NewTools.css";

export default function CoverLetterGenerator() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const ready = name.trim() && role.trim() && company.trim();

  const write = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const prompt = `Write a short, professional cover letter in plain text (about 200 words).
Applicant name: ${name.trim()}
Job title applying for: ${role.trim()}
Company: ${company.trim()}
About the job or applicant (optional): ${about.trim() || "not given, keep it general and confident"}
Start with a greeting, state the role, explain why the applicant fits in 2 short paragraphs, end with a polite closing and the name. Do not invent facts, years of experience or achievements.`;
      const res = await generateAI("cover_letter", prompt);
      if (!res.data.success) throw new Error("ai_fail");
      setResult(String(res.data.data || "").trim());
    } catch {
      setError("Could not write the cover letter. Please try again.");
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
        <h1>Cover Letter Generator</h1>
        <p>Enter the job and your name. We write the letter.</p>
      </header>

      <div className="nt-card nt-stack">
        <div className="nt-fields">
          <div>
            <label className="nt-label" htmlFor="cl-name">Your name</label>
            <input id="cl-name" className="nt-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Arjun Mehta" />
          </div>
          <div>
            <label className="nt-label" htmlFor="cl-role">Job title</label>
            <input id="cl-role" className="nt-input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Frontend Developer" />
          </div>
        </div>

        <div>
          <label className="nt-label" htmlFor="cl-company">Company</label>
          <input id="cl-company" className="nt-input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Google India" />
        </div>

        <div>
          <label className="nt-label" htmlFor="cl-about">About you or the job (optional)</label>
          <textarea
            id="cl-about"
            className="nt-textarea"
            style={{ minHeight: 90 }}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Example: 2 years building React apps, I want to work on design systems"
          />
        </div>

        <div className="nt-row">
          <button type="button" className="nt-btn is-on" disabled={!ready || loading} onClick={write}>
            {loading ? "Writing…" : "Write cover letter"}
          </button>
        </div>

        {error && <p className="nt-error">{error}</p>}

        {result && (
          <div>
            <div className="nt-preview" style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>{result}</div>
            <div className="nt-row" style={{ marginTop: 10 }}>
              <button type="button" className="nt-btn" onClick={copy}>{copied ? "Copied" : "Copy letter"}</button>
            </div>
          </div>
        )}
      </div>
      <SnakeLoader loading={loading} message="Writing your cover letter. Usually under a minute." />
    </main>
  );
}
