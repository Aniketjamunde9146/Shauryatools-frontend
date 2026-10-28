"use client";

import { useEffect, useMemo, useState } from "react";
import "./JwtDecoder.css";

type Json = Record<string, unknown>;

type Decoded =
  | { ok: true; header: Json; payload: Json; signature: string }
  | { ok: false; error: string };

/* ── Decoding ── */

function base64UrlToText(segment: string, label: string): string {
  if (!/^[A-Za-z0-9_-]*$/.test(segment) || segment.length % 4 === 1) {
    throw new Error(`The ${label} is not valid Base64URL. Check that the whole token was copied.`);
  }
  const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function parseSegment(segment: string, label: string): Json {
  let text: string;
  try {
    text = base64UrlToText(segment, label);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("The ")) throw error;
    throw new Error(`The ${label} could not be decoded as text.`);
  }
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error(`The ${label} decoded, but it is not valid JSON.`);
  }
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`The ${label} must be a JSON object.`);
  }
  return value as Json;
}

function decodeToken(input: string): Decoded | null {
  const token = input.replace(/^\s*bearer\s+/i, "").replace(/\s+/g, "");
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length === 5) {
    return { ok: false, error: "This looks like an encrypted token (JWE, 5 parts). Its contents cannot be read without the key." };
  }
  if (parts.length !== 3) {
    return {
      ok: false,
      error: `A JWT has 3 parts separated by dots (header.payload.signature). This one has ${parts.length}.`,
    };
  }
  try {
    return { ok: true, header: parseSegment(parts[0], "header"), payload: parseSegment(parts[1], "payload"), signature: parts[2] };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "This token could not be decoded." };
  }
}

/* ── Time helpers ── */

const TIME_CLAIMS = ["iat", "nbf", "exp"] as const;

const CLAIM_LABELS: Record<string, string> = {
  iss: "Issuer",
  sub: "Subject",
  aud: "Audience",
  exp: "Expires",
  nbf: "Not valid before",
  iat: "Issued at",
  jti: "Token ID",
};

function relativeTime(seconds: number, now: number): string {
  const diff = Math.round(seconds - now / 1000);
  const abs = Math.abs(diff);
  const units: [number, string][] = [
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  let text = `${abs} second${abs === 1 ? "" : "s"}`;
  for (const [size, name] of units) {
    if (abs >= size) {
      const n = Math.floor(abs / size);
      text = `${n} ${name}${n === 1 ? "" : "s"}`;
      break;
    }
  }
  return diff >= 0 ? `in ${text}` : `${text} ago`;
}

function tokenStatus(payload: Json, now: number): { label: string; tone: "good" | "bad" | "warn" | "neutral" } {
  const { exp, nbf } = payload;
  if (typeof exp === "number" && now >= exp * 1000) return { label: "Expired", tone: "bad" };
  if (typeof nbf === "number" && now < nbf * 1000) return { label: "Not valid yet", tone: "warn" };
  if (typeof exp === "number") return { label: "Not expired", tone: "good" };
  return { label: "No expiry claim", tone: "neutral" };
}

/* ── Sample token (built in the browser, so its dates are always current) ── */

function encodeSegment(value: unknown): string {
  const bytes = new TextEncoder().encode(typeof value === "string" ? value : JSON.stringify(value));
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function makeSampleToken(): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  return [
    encodeSegment({ alg: "HS256", typ: "JWT" }),
    encodeSegment({
      sub: "1234567890",
      name: "Ada Lovelace",
      role: "admin",
      iss: "https://example.com",
      iat: issuedAt,
      exp: issuedAt + 3600,
    }),
    encodeSegment("sample-signature"),
  ].join(".");
}

/* ── Component ── */

export default function JwtDecoder() {
  const [input, setInput] = useState("");
  const [now, setNow] = useState<number | null>(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  const decoded = useMemo(() => decodeToken(input), [input]);

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((current) => (current === key ? "" : current)), 1500);
    } catch {
      setCopied("");
    }
  };

  const ok = decoded && decoded.ok ? decoded : null;
  const status = ok && now !== null ? tokenStatus(ok.payload, now) : null;
  const headerJson = ok ? JSON.stringify(ok.header, null, 2) : "";
  const payloadJson = ok ? JSON.stringify(ok.payload, null, 2) : "";
  const claimRows = ok ? Object.keys(CLAIM_LABELS).filter((key) => key in ok.payload) : [];
  const algorithm = ok && typeof ok.header.alg === "string" ? ok.header.alg : null;

  const warnings: string[] = [];
  if (ok) {
    if (typeof ok.header.alg === "string" && ok.header.alg.toLowerCase() === "none") {
      warnings.push("The algorithm is “none”, so this token is unsigned. A server should never accept it as proof of identity.");
    }
    if (!("exp" in ok.payload)) {
      warnings.push("There is no exp claim, so this token never expires on its own.");
    }
  }

  return (
    <main className="jd-page">
      <div className="jd-inner">
        <header className="jd-header">
          <div className="jd-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <div>
            <h1 className="jd-title">JWT Decoder</h1>
            <p className="jd-sub">Paste a JSON Web Token to read its header, payload and expiry. Everything happens in your browser.</p>
          </div>
        </header>

        <p className="jd-note" role="note">
          <strong>Decoding is not verifying.</strong> This tool never checks the signature, so don’t trust the contents of a token you did not issue.
        </p>

        <section className="jd-card" aria-labelledby="jd-input-label">
          <label className="jd-label" id="jd-input-label" htmlFor="jd-input">
            Token
          </label>
          <textarea
            id="jd-input"
            className="jd-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            rows={5}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
          <div className="jd-actions">
            <button type="button" className="jd-btn" onClick={() => setInput(makeSampleToken())}>
              Use a sample token
            </button>
            <button type="button" className="jd-btn jd-btn-quiet" onClick={() => setInput("")} disabled={!input}>
              Clear
            </button>
          </div>
        </section>

        {decoded && !decoded.ok && (
          <p className="jd-error" role="alert">
            {(decoded as { error?: string }).error}
          </p>
        )}

        {ok && (
          <div className="jd-results" aria-live="polite">
            <div className="jd-status-row">
              {status && <span className={`jd-badge jd-badge-${status.tone}`}>{status.label}</span>}
              {algorithm && <span className="jd-chip">Algorithm: {algorithm}</span>}
              {status && <span className="jd-muted">Checked against this device’s clock.</span>}
            </div>

            {warnings.length > 0 && (
              <ul className="jd-warnings">
                {warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            )}

            <div className="jd-grid">
              <section className="jd-card">
                <div className="jd-card-head">
                  <h2>Header</h2>
                  <button type="button" className="jd-copy" onClick={() => copy("header", headerJson)}>
                    {copied === "header" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="jd-code">{headerJson}</pre>
              </section>
              <section className="jd-card">
                <div className="jd-card-head">
                  <h2>Payload</h2>
                  <button type="button" className="jd-copy" onClick={() => copy("payload", payloadJson)}>
                    {copied === "payload" ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="jd-code">{payloadJson}</pre>
              </section>
            </div>

            {claimRows.length > 0 && (
              <section className="jd-card">
                <h2>Standard claims</h2>
                <div className="jd-table-wrap">
                  <table className="jd-table">
                    <thead>
                      <tr>
                        <th scope="col">Claim</th>
                        <th scope="col">Meaning</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {claimRows.map((key) => {
                        const value = ok.payload[key];
                        const isTime = (TIME_CLAIMS as readonly string[]).includes(key);
                        return (
                          <tr key={key}>
                            <td>
                              <code>{key}</code>
                            </td>
                            <td>{CLAIM_LABELS[key]}</td>
                            <td>
                              {isTime && typeof value === "number" ? (
                                <>
                                  <span>{new Date(value * 1000).toLocaleString()}</span>
                                  <span className="jd-muted">
                                    {" "}
                                    · {now !== null ? relativeTime(value, now) : ""} · {new Date(value * 1000).toISOString()}
                                  </span>
                                </>
                              ) : isTime ? (
                                <span>
                                  {String(value)} <span className="jd-muted">(not a Unix timestamp in seconds)</span>
                                </span>
                              ) : (
                                <span>{typeof value === "string" ? value : JSON.stringify(value)}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section className="jd-card">
              <div className="jd-card-head">
                <h2>Signature</h2>
                <button type="button" className="jd-copy" onClick={() => copy("signature", ok.signature)} disabled={!ok.signature}>
                  {copied === "signature" ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="jd-code jd-code-wrap">{ok.signature || "(empty)"}</pre>
              <p className="jd-muted">Shown as received. Verifying it needs the secret or public key, which only your server should hold.</p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
