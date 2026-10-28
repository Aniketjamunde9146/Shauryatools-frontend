"use client";

/* eslint-disable no-empty */
import { useState, useCallback } from "react";
import "./CodeToDoc.css";

/* ── Constants ── */
const LANGUAGES = [
  { id: "auto",       label: "Auto Detect", emoji: "✨" },
  { id: "javascript", label: "JavaScript",  emoji: "🟨" },
  { id: "typescript", label: "TypeScript",  emoji: "🔷" },
  { id: "jsx",        label: "JSX / TSX",   emoji: "⚛️"  },
  { id: "python",     label: "Python",      emoji: "🐍" },
  { id: "css",        label: "CSS",         emoji: "🎨" },
  { id: "html",       label: "HTML",        emoji: "🌐" },
  { id: "java",       label: "Java",        emoji: "☕" },
  { id: "go",         label: "Go",          emoji: "🔵" },
  { id: "rust",       label: "Rust",        emoji: "🦀" },
  { id: "sql",        label: "SQL",         emoji: "🗄️" },
];

const DOC_STYLES = [
  { id: "markdown", label: "Markdown",   icon: "MD",  desc: "# Heading style"     },
  { id: "jsdoc",   label: "JSDoc",      icon: "/**", desc: "@param comment style" },
  { id: "plain",   label: "Plain Text", icon: "TXT", desc: "Human readable prose" },
];

/* ── Icons ── */
const IconFile = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);
const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
  </svg>
);
const IconZap = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconEye = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconCode = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconChevron = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconSparkles = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

/* ── Auto-detect language ── */
function detectLanguage(code) {
  if (!code.trim()) return "javascript";
  if (/^\s*<!DOCTYPE html/i.test(code) || /^\s*<html/i.test(code)) return "html";
  if (/className=/.test(code) && /<[a-z]/i.test(code)) return "jsx";
  if (/<[a-z][\s\S]*>/i.test(code) && !/{/.test(code)) return "html";
  if (/:\s*(string|number|boolean|void|any)\b/.test(code) || /interface\s+\w+/.test(code)) return "typescript";
  if (/{[\s\S]*?:\s*[\w#"']/.test(code) && !/(function|const|let|var|=>)/.test(code)) return "css";
  if (/def\s+\w+\s*\(/.test(code) || /^\s*#.*\n/m.test(code)) return "python";
  if (/public\s+(static\s+)?void\s+main/.test(code)) return "java";
  if (/\bSELECT\b|\bFROM\b|\bWHERE\b/i.test(code)) return "sql";
  return "javascript";
}

/* ── Code parser ── */
function parseCode(code, lang) {
  const detected  = lang === "auto" ? detectLanguage(code) : lang;
  const lines     = code.split("\n");
  const functions = [], classes = [], constants = [],
        imports   = [], types   = [], hooks     = [];

  lines.forEach((line, i) => {
    const t = line.trim();
    if (/^import\s/.test(t)) {
      const m = t.match(/^import\s+(.+)\s+from\s+['"](.+)['"]/);
      if (m) imports.push({ what: m[1], from: m[2], line: i + 1 });
    }
    if (/const\s+\[.+\]\s*=\s*useState/.test(t)) {
      const m = t.match(/const\s+\[(\w+),\s*(\w+)\]\s*=\s*useState\((.*)?\)/);
      if (m) hooks.push({ name: m[1], setter: m[2], initial: m[3] || "undefined", type: "useState", line: i + 1 });
    }
    if (/useEffect\s*\(/.test(t)) hooks.push({ name: "useEffect", type: "useEffect", initial: "—", line: i + 1 });
    if (/const\s+\w+\s*=\s*use(Callback|Memo|Ref|Context)\s*\(/.test(t)) {
      const m = t.match(/const\s+(\w+)\s*=\s*(use\w+)/);
      if (m) hooks.push({ name: m[1], type: m[2], initial: "—", line: i + 1 });
    }
    if (/^(export\s+)?(default\s+)?class\s+\w+/.test(t)) {
      const m = t.match(/class\s+(\w+)(?:\s+extends\s+(\w+))?/);
      if (m) classes.push({ name: m[1], extends: m[2] || null, line: i + 1 });
    }
    const fnPats = [
      /^(export\s+)?(default\s+)?function\s+(\w+)\s*\(([^)]*)\)/,
      /^(export\s+)?const\s+(\w+)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>/,
      /^def\s+(\w+)\s*\(([^)]*)\)/,
    ];
    fnPats.forEach(pat => {
      const m = t.match(pat);
      if (m) {
        const name   = m[3] || m[2] || m[1];
        const params = m[4] || m[3] || m[2] || "";
        if (name && !["if","for","while","switch"].includes(name)) {
          const paramList = params.split(",").map(p => p.trim()).filter(Boolean).map(p => {
            const pts = p.split("=");
            return { name: pts[0].trim().replace(/[:{}\s].*/, ""), default: pts[1]?.trim() || null };
          });
          functions.push({
            name, params: paramList,
            async: /async/.test(t),
            exported: /export/.test(t),
            returns: lines.slice(i, i + 20).some(l => /return\s/.test(l)),
            line: i + 1
          });
        }
      }
    });
    if (/^(export\s+)?const\s+[A-Z_]{2,}\s*=/.test(t)) {
      const m = t.match(/const\s+([A-Z_]+)\s*=\s*(.+)/);
      if (m) constants.push({ name: m[1], value: m[2].replace(/[;,]$/, ""), line: i + 1 });
    }
    if (/^(export\s+)?(interface|type)\s+\w+/.test(t)) {
      const m = t.match(/(interface|type)\s+(\w+)/);
      if (m) types.push({ kind: m[1], name: m[2], line: i + 1 });
    }
  });

  return { functions, classes, constants, imports, types, hooks, detected, lineCount: lines.length, charCount: code.length };
}

/* ── Doc generators ── */
function generateDoc(code, lang, style, projectName) {
  const parsed  = parseCode(code, lang);
  const { detected, functions, classes, constants, imports, types, hooks } = parsed;
  const ts   = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const name = projectName || "Module";
  let doc = "";

  if (style === "jsdoc") {
    doc += `/**\n * @file ${name}\n * @description Auto-generated documentation\n * @version 1.0.0\n * @date ${ts}\n * @language ${detected.toUpperCase()}\n */\n\n`;
    if (imports.length) {
      doc += `// ─── Dependencies ───────────────────────────────────────\n`;
      imports.forEach(i => { doc += `// @requires ${i.from} — ${i.what}\n`; });
      doc += "\n";
    }
    constants.forEach(c => { doc += `/**\n * @constant {*} ${c.name}\n * @default ${c.value}\n */\n`; });
    classes.forEach(c => {
      doc += `\n/**\n * @class ${c.name}${c.extends ? `\n * @extends ${c.extends}` : ""}\n * @example\n * const obj = new ${c.name}();\n */\n`;
    });
    functions.forEach(fn => {
      doc += `\n/**\n * @function ${fn.name}\n`;
      if (fn.async) doc += ` * @async\n`;
      if (fn.exported) doc += ` * @public\n`;
      fn.params.forEach(p => { doc += ` * @param {*} ${p.name}${p.default ? ` [=${p.default}]` : ""} - Description\n`; });
      if (fn.returns) doc += ` * @returns {*} Return value description\n`;
      doc += ` * @example\n * ${fn.name}(${fn.params.map(p => p.name).join(", ")});\n */\n`;
    });
    if (hooks.length) {
      doc += `\n// ─── React Hooks ─────────────────────────────────────────\n`;
      hooks.forEach(h => { doc += `// @hook ${h.name} [${h.type}] — Line ${h.line}\n`; });
    }
  } else if (style === "markdown") {
    doc += `# ${name}\n\n`;
    doc += `> Auto-generated · ${ts} · **${detected.toUpperCase()}** · ${parsed.lineCount} lines\n\n---\n\n`;
    doc += `## Table of Contents\n\n`;
    if (imports.length)   doc += `- [Dependencies](#dependencies)\n`;
    if (constants.length) doc += `- [Constants](#constants)\n`;
    if (types.length)     doc += `- [Types](#types)\n`;
    if (classes.length)   doc += `- [Classes](#classes)\n`;
    if (functions.length) doc += `- [Functions](#functions)\n`;
    if (hooks.length)     doc += `- [React Hooks](#react-hooks)\n`;
    doc += `\n---\n\n`;
    if (imports.length) {
      doc += `## 📦 Dependencies\n\n| Package | Imported | Line |\n|---|---|---|\n`;
      imports.forEach(i => { doc += `| \`${i.from}\` | ${i.what} | ${i.line} |\n`; });
      doc += `\n`;
    }
    if (constants.length) {
      doc += `## 🔒 Constants\n\n| Name | Value | Line |\n|---|---|---|\n`;
      constants.forEach(c => { doc += `| \`${c.name}\` | \`${c.value.slice(0,40)}${c.value.length>40?"…":""}\` | ${c.line} |\n`; });
      doc += `\n`;
    }
    if (types.length) {
      doc += `## 🏷️ Types\n\n`;
      types.forEach(t => { doc += `### \`${t.name}\` _(${t.kind})_ — Line ${t.line}\n\n`; });
    }
    if (classes.length) {
      doc += `## 🏗️ Classes\n\n`;
      classes.forEach(c => {
        doc += `### \`${c.name}\`${c.extends ? ` extends \`${c.extends}\`` : ""}\n\n**Line:** ${c.line}\n\n\`\`\`js\nconst obj = new ${c.name}();\n\`\`\`\n\n---\n\n`;
      });
    }
    if (functions.length) {
      doc += `## ⚙️ Functions\n\n`;
      functions.forEach(fn => {
        doc += `### \`${fn.name}(${fn.params.map(p=>p.name).join(", ")})\`\n\n`;
        const badges = [];
        if (fn.async)    badges.push("⏳ Async");
        if (fn.exported) badges.push("📤 Exported");
        if (fn.returns)  badges.push("↩️ Returns value");
        if (badges.length) doc += badges.map(b=>`> ${b}`).join("  \n") + "\n\n";
        if (fn.params.length) {
          doc += `| Parameter | Default | Description |\n|---|---|---|\n`;
          fn.params.forEach(p => { doc += `| \`${p.name}\` | ${p.default?`\`${p.default}\``:"—"} | — |\n`; });
          doc += `\n`;
        }
        doc += `**Line:** ${fn.line}\n\n\`\`\`js\n${fn.name}(${fn.params.map(p=>p.name).join(", ")});\n\`\`\`\n\n---\n\n`;
      });
    }
    if (hooks.length) {
      doc += `## 🎣 React Hooks\n\n| Hook | Type | Initial | Line |\n|---|---|---|---|\n`;
      hooks.forEach(h => { doc += `| \`${h.name}\` | \`${h.type}\` | \`${h.initial||"—"}\` | ${h.line} |\n`; });
    }
  } else {
    const hr = "─".repeat(52);
    doc += `${name.toUpperCase()}\n${hr}\nGenerated: ${ts}\nLanguage:  ${detected.toUpperCase()}\nLines:     ${parsed.lineCount}\nChars:     ${parsed.charCount}\n${hr}\n\n`;
    if (imports.length) { doc += `DEPENDENCIES\n${"─".repeat(24)}\n`; imports.forEach(i => { doc += `  ${i.from}  →  ${i.what}  (L${i.line})\n`; }); doc += "\n"; }
    if (constants.length) { doc += `CONSTANTS\n${"─".repeat(24)}\n`; constants.forEach(c => { doc += `  ${c.name} = ${c.value}  (L${c.line})\n`; }); doc += "\n"; }
    if (classes.length) { doc += `CLASSES\n${"─".repeat(24)}\n`; classes.forEach(c => { doc += `  ${c.name}${c.extends?` extends ${c.extends}`:""}  (L${c.line})\n`; }); doc += "\n"; }
    if (functions.length) {
      doc += `FUNCTIONS\n${"─".repeat(24)}\n`;
      functions.forEach(fn => { doc += `\n  ${fn.async?"[async] ":""}${fn.name}(${fn.params.map(p=>p.name+(p.default?`=${p.default}`:"")).join(", ")})\n  Returns: ${fn.returns?"Yes":"—"}   Exported: ${fn.exported?"Yes":"No"}   Line: ${fn.line}\n`; });
      doc += "\n";
    }
    if (hooks.length) { doc += `REACT HOOKS\n${"─".repeat(24)}\n`; hooks.forEach(h => { doc += `  ${h.name} [${h.type}]  initial=${h.initial||"—"}  (L${h.line})\n`; }); }
  }

  return { doc, parsed };
}

/* ── Markdown Preview Renderer ── */
function renderInline(text) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((p, i) => {
    if (p.startsWith("`") && p.endsWith("`")) return <code key={i} className="ctd-inline-code">{p.slice(1,-1)}</code>;
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2,-2)}</strong>;
    if (p.startsWith("_") && p.endsWith("_")) return <em key={i}>{p.slice(1,-1)}</em>;
    return p;
  });
}

function MarkdownPreview({ doc }: any) {
  const lines = doc.split("\n");
  const els = [];
  let i = 0;
  let tableRows = [];
  let inTable = false;

  const flushTable = () => {
    if (!tableRows.length) return;
    const parsed = tableRows.map(r => r.split("|").map(c=>c.trim()).filter((_,idx,a)=>idx!==0&&idx!==a.length-1));
    const header = parsed[0]||[];
    const body   = parsed.slice(2);
    els.push(
      <div key={`t${i}`} className="ctd-tbl-wrap">
        <table className="ctd-tbl">
          <thead><tr>{header.map((h,hi)=><th key={hi}>{renderInline(h)}</th>)}</tr></thead>
          <tbody>{body.map((row,ri)=><tr key={ri}>{row.map((cell,ci)=><td key={ci}>{renderInline(cell)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
    tableRows=[]; inTable=false;
  };

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();
    if (t.startsWith("|")) { inTable=true; tableRows.push(t); i++; continue; }
    else if (inTable) flushTable();

    if (!t) { els.push(<div key={i} className="ctd-sp"/>); }
    else if (t.startsWith("# ")) { els.push(<h1 key={i} className="ctd-h1">{t.slice(2)}</h1>); }
    else if (t.startsWith("## ")) { els.push(<h2 key={i} className="ctd-h2">{t.slice(3)}</h2>); }
    else if (t.startsWith("### ")) { els.push(<h3 key={i} className="ctd-h3">{t.slice(4)}</h3>); }
    else if (t === "---") { els.push(<hr key={i} className="ctd-hr"/>); }
    else if (t.startsWith("> ")) { els.push(<blockquote key={i} className="ctd-bq">{renderInline(t.slice(2))}</blockquote>); }
    else if (t.startsWith("- ")) { els.push(<div key={i} className="ctd-li"><span className="ctd-bullet">›</span>{renderInline(t.slice(2))}</div>); }
    else if (t.startsWith("```")) {
      const langLabel = t.slice(3);
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) { codeLines.push(lines[i]); i++; }
      els.push(
        <div key={i} className="ctd-code-block">
          {langLabel && <span className="ctd-code-lang">{langLabel}</span>}
          <pre>{codeLines.join("\n")}</pre>
        </div>
      );
    } else {
      els.push(<p key={i} className="ctd-p">{renderInline(t)}</p>);
    }
    i++;
  }
  if (inTable) flushTable();
  return <div className="ctd-md">{els}</div>;
}

/* ── Main Component ── */
export default function CodeToDoc() {
  const [code,        setCode]        = useState("");
  const [lang,        setLang]        = useState("auto");
  const [docStyle,    setDocStyle]    = useState("markdown");
  const [projectName, setProjectName] = useState("");
  const [result,      setResult]      = useState(null);
  const [copied,      setCopied]      = useState(false);
  const [showLang,    setShowLang]    = useState(false);
  const [activeTab,   setActiveTab]   = useState("preview");

  const detectedId = detectLanguage(code);
  const activeLang = LANGUAGES.find(l => l.id === (lang === "auto" ? detectedId : lang));
  const parsed     = result?.parsed;

  const handleGenerate = useCallback(() => {
    if (!code.trim()) return;
    setResult(generateDoc(code, lang, docStyle, projectName));
    setActiveTab("preview");
  }, [code, lang, docStyle, projectName]);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.doc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!result) return;
    const ext  = docStyle === "markdown" ? "md" : docStyle === "jsdoc" ? "js" : "txt";
    const blob = new Blob([result.doc], { type: "text/plain" });
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = `${projectName || "docs"}.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleReset = () => {
    setCode(""); setResult(null); setCopied(false); setProjectName("");
  };

  const stats = parsed ? [
    { emoji: "⚙️",  label: "Functions", val: parsed.functions.length },
    { emoji: "🏗️",  label: "Classes",   val: parsed.classes.length   },
    { emoji: "🎣",  label: "Hooks",     val: parsed.hooks.length     },
    { emoji: "📦",  label: "Imports",   val: parsed.imports.length   },
    { emoji: "🔒",  label: "Constants", val: parsed.constants.length },
    { emoji: "🏷️",  label: "Types",     val: parsed.types.length     },
  ] : [];

  return (
    <>

      <div className="ctd-page" onClick={() => showLang && setShowLang(false)}>
        <div className="ctd-inner">

          {/* ── Header ── */}
          <div className="ctd-header">
            <div className="ctd-icon"><IconFile /></div>
            <div>
              <span className="ctd-cat">Developer Tools</span>
              <h1>Code to Docs</h1>
              <p>Paste your code — get professional documentation instantly.</p>
            </div>
          </div>

          {/* ── Config Card ── */}
          <div className="ctd-card">

            {/* Row 1: Format + Language + Name */}
            <div className="ctd-config-row">
              {/* Doc Style */}
              <div className="ctd-field ctd-field-format">
                <label className="ctd-label">Output Format</label>
                <div className="ctd-format-group">
                  {DOC_STYLES.map(s => (
                    <button
                      key={s.id}
                      className={`ctd-fmt-btn ${docStyle === s.id ? "ctd-fmt-on" : ""}`}
                      onClick={() => setDocStyle(s.id)}
                      title={s.desc}
                    >
                      <span className="ctd-fmt-icon">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div className="ctd-field ctd-field-lang" onClick={e => e.stopPropagation()}>
                <label className="ctd-label">Language</label>
                <div className="ctd-lang-wrap">
                  <button
                    className={`ctd-lang-btn ${lang === "auto" ? "ctd-lang-auto" : ""}`}
                    onClick={() => setShowLang(s => !s)}
                  >
                    <span>{activeLang?.emoji}</span>
                    <span className="ctd-lang-text">
                      {lang === "auto" ? `Auto · ${activeLang?.label}` : activeLang?.label}
                    </span>
                    <span className={`ctd-chev ${showLang ? "ctd-chev-open" : ""}`}><IconChevron /></span>
                  </button>
                  {showLang && (
                    <div className="ctd-lang-dd">
                      {LANGUAGES.map(l => (
                        <button
                          key={l.id}
                          className={`ctd-lang-opt ${lang === l.id ? "ctd-lang-on" : ""}`}
                          onClick={() => { setLang(l.id); setShowLang(false); }}
                        >
                          <span>{l.emoji}</span> {l.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Project name */}
              <div className="ctd-field ctd-field-name">
                <label className="ctd-label">File / Project Name</label>
                <input
                  className="ctd-name-input"
                  placeholder="e.g. AuthService"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                />
              </div>
            </div>

            <div className="ctd-divider" />

            {/* ── Workspace ── */}
            <div className="ctd-workspace">

              {/* Left — Code Input */}
              <div className="ctd-pane ctd-pane-in">
                <div className="ctd-pane-bar">
                  <span className="ctd-pane-title"><IconCode /> Source Code</span>
                  <span className="ctd-pane-count">{code.split("\n").length} lines</span>
                </div>
                <div className="ctd-editor-wrap">
                  <div className="ctd-gutter" aria-hidden="true">
                    {code.split("\n").map((_, idx) => <span key={idx}>{idx + 1}</span>)}
                  </div>
                  <textarea
                    className="ctd-textarea"
                    value={code}
                    onChange={e => { setCode(e.target.value); setResult(null); }}
                    placeholder={"// Paste your code here…\n\nexport const fetchUser = async (id) => {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n};"}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    onKeyDown={e => {
                      if (e.key === "Tab") {
                        e.preventDefault();
                        const s = (e.target as HTMLTextAreaElement).selectionStart;
                        const v = code.substring(0, s) + "  " + code.substring((e.target as HTMLTextAreaElement).selectionEnd);
                        setCode(v);
                        requestAnimationFrame(() => { (e.target as HTMLTextAreaElement).selectionStart = (e.target as HTMLTextAreaElement).selectionEnd = s + 2; });
                      }
                    }}
                  />
                </div>
              </div>

              {/* Right — Output */}
              <div className="ctd-pane ctd-pane-out">
                <div className="ctd-pane-bar ctd-pane-bar-out">
                  <span className="ctd-pane-title" style={{ color: "var(--grey-3)" }}>
                    📄 Documentation
                  </span>
                  {result && (
                    <div className="ctd-tabs">
                      <button className={`ctd-tab ${activeTab === "preview" ? "ctd-tab-on" : ""}`} onClick={() => setActiveTab("preview")}>
                        <IconEye /> Preview
                      </button>
                      <button className={`ctd-tab ${activeTab === "raw" ? "ctd-tab-on" : ""}`} onClick={() => setActiveTab("raw")}>
                        <IconCode /> Raw
                      </button>
                    </div>
                  )}
                  {result && (
                    <div className="ctd-out-actions">
                      <button className={`ctd-out-btn ${copied ? "ctd-out-copied" : ""}`} onClick={handleCopy}>
                        {copied ? <IconCheck /> : <IconCopy />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      <button className="ctd-out-btn" onClick={handleDownload}>
                        <IconDownload /> .{docStyle === "markdown" ? "md" : docStyle === "jsdoc" ? "js" : "txt"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="ctd-output-body">
                  {!result ? (
                    <div className="ctd-empty">
                      <div className="ctd-empty-art">
                        {[75,55,85,45,65,50,70].map((w,idx) => (
                          <div key={idx} className="ctd-empty-row" style={{ "--w": `${w}%`, animationDelay: `${idx*0.1}s` } as React.CSSProperties}>
                            <div className="ctd-empty-ln" />
                            <div className="ctd-empty-txt" />
                          </div>
                        ))}
                      </div>
                      <p className="ctd-empty-title">Documentation will appear here</p>
                      <p className="ctd-empty-sub">Paste code on the left, then click Generate</p>
                    </div>
                  ) : activeTab === "raw" ? (
                    <pre className="ctd-raw animate-in">{result.doc}</pre>
                  ) : docStyle === "markdown" ? (
                    <div className="ctd-preview-wrap animate-in">
                      <MarkdownPreview doc={result.doc} />
                    </div>
                  ) : (
                    <pre className="ctd-raw animate-in">{result.doc}</pre>
                  )}
                </div>
              </div>
            </div>

            {/* ── Actions Bar ── */}
            <div className="ctd-actions-row">
              {/* Stats chips */}
              {parsed && (
                <div className="ctd-stats animate-in">
                  <span className="ctd-stats-lead"><IconSparkles /> Analysis</span>
                  {stats.filter(s => s.val > 0).map(s => (
                    <span key={s.label} className="ctd-chip">
                      <span>{s.emoji}</span>
                      <span className="ctd-chip-n">{s.val}</span>
                      <span className="ctd-chip-lbl">{s.label}</span>
                    </span>
                  ))}
                  <span className="ctd-stats-info">
                    {parsed.lineCount} lines · {parsed.detected.toUpperCase()}
                  </span>
                </div>
              )}

              <div className="ctd-btn-group">
                {result && (
                  <button className="ctd-reset-btn" onClick={handleReset}>
                    <IconRefresh /> Reset
                  </button>
                )}
                <button
                  className="ctd-gen-btn"
                  onClick={handleGenerate}
                  disabled={!code.trim()}
                >
                  <IconZap /> Generate Docs
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}