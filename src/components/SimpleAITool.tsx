"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { generateAI } from "@/lib/api";
import { AI_TOOLS, LANGUAGES, TONES, buildAIPrompt, type AIField, type AIToolConfig } from "@/lib/aiTools";
import { tools } from "@/data/toolsData";
import SnakeLoader from "@/components/SnakeLoader";
import "./SimpleAITool.css";

const NOT_SPECIFIED = "";
const REQUIRED_MESSAGE = "Please fill this in.";

/** Starting values: required dropdowns start on their first option, everything else starts empty. */
function startingValues(cfg: AIToolConfig): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of cfg.fields) {
    if (field.type === "select" && field.required && field.options?.length) values[field.id] = field.options[0];
    else values[field.id] = "";
  }
  return values;
}

/** The shared AI tool page. Each tool shows only the inputs it defines in src/lib/aiTools.ts. */
export default function SimpleAITool({ slug }: { slug: string }) {
  const cfg = AI_TOOLS[slug];
  const meta = tools.find((t) => t.slug === slug);
  const [values, setValues] = useState<Record<string, string>>(() => (cfg ? startingValues(cfg) : {}));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tone, setTone] = useState(TONES[0]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // A different tool starts with a clean form.
  useEffect(() => {
    if (!cfg) return;
    setValues(startingValues(cfg));
    setErrors({});
    setError("");
    setResult("");
  }, [slug, cfg]);

  if (!cfg) return null;

  function setValue(id: string, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
    if (errors[id]) setErrors((current) => ({ ...current, [id]: "" }));
  }

  function fieldId(field: AIField) {
    return `st-${slug}-${field.id}`;
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const field of cfg.fields) {
      if (field.required && !(values[field.id] ?? "").trim()) next[field.id] = REQUIRED_MESSAGE;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function run() {
    if (loading) return;
    if (!validate()) {
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await generateAI(cfg.key, buildAIPrompt(cfg, values, tone, language));
      const text = String(res.data.data ?? "")
        .replace(/^```[a-z]*\n?/i, "")
        .replace(/\n?```$/, "")
        .trim();
      if (!text) throw new Error("We're investing in our servers right now. Please try again after some time.");
      setResult(text);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "We're investing in our servers right now. Please try again after some time.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy. Select the text and copy it manually.");
    }
  }

  function renderField(field: AIField) {
    const id = fieldId(field);
    const value = values[field.id] ?? "";
    const message = errors[field.id];
    const describedBy = message ? `${id}-error` : undefined;
    const shared = {
      id,
      className: field.type === "select" ? "st-select" : field.type === "textarea" ? "st-textarea" : "st-input",
      value,
      "aria-required": field.required ? true : undefined,
      "aria-invalid": message ? true : undefined,
      "aria-describedby": describedBy,
    };
    const wide = field.type === "textarea";

    let control;
    if (field.type === "textarea") {
      control = (
        <textarea
          {...shared}
          placeholder={field.placeholder}
          rows={4}
          maxLength={6000}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setValue(field.id, e.target.value)}
        />
      );
    } else if (field.type === "select") {
      const options = field.options ?? [];
      control = (
        <select {...shared} onChange={(e) => setValue(field.id, e.target.value)}>
          {!field.required && <option value={NOT_SPECIFIED}>Not specified</option>}
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      );
    } else if (field.type === "number") {
      control = (
        <input
          {...shared}
          type="number"
          inputMode="decimal"
          min={0}
          placeholder={field.placeholder}
          onChange={(e) => setValue(field.id, e.target.value)}
        />
      );
    } else if (field.type === "date") {
      control = <input {...shared} type="date" onChange={(e) => setValue(field.id, e.target.value)} />;
    } else {
      control = (
        <input
          {...shared}
          type="text"
          placeholder={field.placeholder}
          maxLength={300}
          onChange={(e) => setValue(field.id, e.target.value)}
        />
      );
    }

    return (
      <div key={field.id} className={`st-field${wide ? " st-field-wide" : ""}`}>
        <label className="st-label" htmlFor={id}>
          {field.label}
          {field.required && <span className="st-required" aria-hidden="true"> *</span>}
        </label>
        {control}
        {message && <p className="st-field-error" id={`${id}-error`}>{message}</p>}
      </div>
    );
  }

  return (
    <div className="st-page">
      <SnakeLoader loading={loading} message="Writing your result. Usually under a minute." />
      <div className="st-inner">
        <header className="st-head">
          <h1 className="st-title">{meta?.name ?? "AI tool"}</h1>
          {meta?.description && <p className="st-sub">{meta.description}</p>}
        </header>

        <div className="st-card" onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run(); }}>
          <div className="st-fields">
            {cfg.fields.map((field) => renderField(field))}
          </div>

          {(cfg.showTone || cfg.showLanguage) && (
            <div className={`st-row${cfg.showTone ? "" : " st-row-one"}`}>
              {cfg.showTone && (
                <div className="st-field">
                  <label className="st-label" htmlFor={`st-${slug}-tone`}>Tone</label>
                  <select id={`st-${slug}-tone`} className="st-select" value={tone} onChange={(e) => setTone(e.target.value)}>
                    {TONES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              )}
              {cfg.showLanguage && (
                <div className="st-field">
                  <label className="st-label" htmlFor={`st-${slug}-lang`}>Language</label>
                  <select id={`st-${slug}-lang`} className="st-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              )}
            </div>
          )}

          <button type="button" className="st-btn" onClick={run} disabled={loading}>
            {loading ? "Generating…" : "Generate"}
          </button>
          <div role="alert" aria-live="polite">{error && <p className="st-error">{error}</p>}</div>
        </div>

        {result && (
          <div className="st-card st-result" ref={resultRef}>
            <div className="st-result-bar">
              <span className="st-label">Result</span>
              <div className="st-actions">
                <button type="button" className="st-mini" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
                <button type="button" className="st-mini" onClick={run} disabled={loading}>Regenerate</button>
              </div>
            </div>
            <pre className="st-output">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
