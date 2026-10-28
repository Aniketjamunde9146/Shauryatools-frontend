"use client";

/* eslint-disable react-refresh/only-export-components */
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { tools } from "@/data/toolsData";
import Link from "next/link";
import { GROUPS, getGroup, trendingTools } from "@/lib/toolMeta";
import { searchTools, highlightParts } from "@/lib/search";

const GROUP_META: Record<string, (typeof GROUPS)[number]> = Object.fromEntries(GROUPS.map(g => [g.label, g]));
const ALL_CATEGORIES = ["All", ...GROUPS.map(g => g.label)];
const metaFor = (label: string) => GROUP_META[label] ?? GROUPS[GROUPS.length - 1];

const Home = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const urlSynced = useRef(false);
  const [search,   setSearch]   = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(1);
  const categoryLoadRef = useRef<HTMLDivElement>(null);

  // Open /?q=jwt with the search already filled in.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setSearch(q.slice(0, 80));
  }, []);

  // Keep ?q= in the address bar so a search can be shared or bookmarked.
  useEffect(() => {
    if (!urlSynced.current) { urlSynced.current = true; return; }
    const url = new URL(window.location.href);
    if (search.trim()) url.searchParams.set("q", search.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  }, [search]);

  // Press "/" anywhere to jump to the search box.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const query = search.trim();
  const result = useMemo(() => (query ? searchTools(query) : null), [query]);
  const searching = !!result && result.mode !== "empty";

  const hits = useMemo(() => {
    if (!result) return [];
    return result.hits.filter(h => activeTab === "All" || getGroup(h.tool).label === activeTab);
  }, [result, activeTab]);

  useEffect(() => { setActiveIndex(0); }, [query, activeTab]);

  const tabTools = useMemo(
    () => tools.filter(t => activeTab === "All" || getGroup(t).label === activeTab),
    [activeTab],
  );

  const groupedByCategory = useMemo(() => {
    if (searching || activeTab !== "All") return null;
    const groups: Record<string, typeof tools> = {};
    tools.forEach(t => {
      const label = getGroup(t).label;
      if (!groups[label]) groups[label] = [];
      groups[label].push(t);
    });
    return groups;
  }, [searching, activeTab]);

  const showGrouped = groupedByCategory !== null;
  const categoryEntries = groupedByCategory ? Object.entries(groupedByCategory) : [];
  const trending = useMemo(() => trendingTools(), []);

  useEffect(() => {
    setVisibleCategoryCount(1);
  }, [activeTab, query]);

  useEffect(() => {
    const target = categoryLoadRef.current;
    if (!showGrouped || visibleCategoryCount >= categoryEntries.length || !target) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setVisibleCategoryCount((count) => Math.min(count + 1, categoryEntries.length));
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [showGrouped, visibleCategoryCount, categoryEntries.length]);

  const clearAll = () => { setSearch(""); setActiveTab("All"); };

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") { setSearch(""); return; }
    if (!searching || !hits.length) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = e.key === "ArrowDown" ? Math.min(activeIndex + 1, hits.length - 1) : Math.max(activeIndex - 1, 0);
      setActiveIndex(next);
      document.getElementById(`hp-hit-${hits[next].tool.slug}`)?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/${hits[activeIndex].tool.slug}`);
    }
  };

  return (
    <>

      <div className="hp-root">

        {/* ════ HERO (the only one) ════ */}
        <section className="hp-hero">
          {/* Background mesh */}
          <div className="hp-hero-mesh" aria-hidden="true">
            <div className="mesh-blob mesh-1" />
            <div className="mesh-blob mesh-2" />
            <div className="mesh-blob mesh-3" />
            <div className="mesh-grid" />
          </div>

          <div className="hp-hero-inner">
            <h1 className="hp-h1">
              Free online tools
              <br />
              <em>for everyday work.</em>
            </h1>
            <p className="hp-sub">Pick a tool and get it done. No sign-up needed.</p>

            {/* Search */}
            <div className="hp-search-wrap">
              <svg className="hp-search-ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                ref={inputRef}
                id="tool-search"
                className="hp-search"
                type="search"
                role="combobox"
                aria-expanded={searching}
                aria-controls="hp-results"
                aria-autocomplete="list"
                aria-activedescendant={searching && hits[activeIndex] ? `hp-hit-${hits[activeIndex].tool.slug}` : undefined}
                value={search}
                onChange={e => { setSearch(e.target.value); if (e.target.value) setActiveTab("All"); }}
                onKeyDown={onSearchKey}
                placeholder={`Search ${tools.length} tools…`}
                aria-label="Search tools"
                autoComplete="off"
                spellCheck={false}
              />
              {search ? (
                <button className="hp-search-clear" onClick={() => { setSearch(""); inputRef.current?.focus(); }} aria-label="Clear search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              ) : (
                <kbd className="hp-kbd" aria-hidden="true">/</kbd>
              )}
            </div>

            {/* Category filter tabs */}
            <div className="hp-tabs">
              {ALL_CATEGORIES.map(cat => {
                const meta = cat === "All" ? undefined : metaFor(cat);
                return (
                  <button
                    key={cat}
                    className={`hp-tab ${activeTab === cat ? "hp-tab-on" : ""}`}
                    onClick={() => setActiveTab(cat)}
                    style={activeTab === cat && meta ? {
                      background: meta.bg,
                      color:      meta.color,
                      borderColor:meta.border,
                    } : {}}
                  >
                    {meta && <span className="hp-tab-dot" style={{ background: meta.dot }} />}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════ TOOLS SECTION ════ */}
        <main className="hp-main">
          <div className="hp-container">

            {/* Result summary (announced to screen readers as it changes) */}
            {(searching || activeTab !== "All") && (
              <div className="hp-result-bar">
                <span className="hp-result-count" role="status" aria-live="polite">
                  {searching
                    ? `${hits.length} result${hits.length !== 1 ? "s" : ""} for “${query}”`
                    : `${tabTools.length} tool${tabTools.length !== 1 ? "s" : ""}`}
                  {activeTab !== "All" ? ` in ${activeTab}` : ""}
                </span>
                <button className="hp-clear-filters" onClick={clearAll}>
                  Clear filters
                </button>
              </div>
            )}

            {searching && result?.mode === "partial" && hits.length > 0 && (
              <p className="hp-search-note">No tool matches every word, so these match some of them.</p>
            )}

            {/* ── Trending (default view only) ── */}
            {showGrouped && trending.length > 0 && (
              <section id="trending" className="hp-category-section" aria-labelledby="hp-trending-title">
                <div className="hp-cat-header">
                  <div id="hp-trending-title" className="hp-cat-label hp-trending-label">Trending</div>
                  <div className="hp-cat-line" />
                  <span className="hp-cat-count">{trending.length} tools</span>
                </div>
                <div className="hp-grid">
                  {trending.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} meta={metaFor(getGroup(tool).label)} />
                  ))}
                </div>
              </section>
            )}

            {/* ── Grouped by category (default view) ── */}
            {showGrouped && categoryEntries.slice(0, visibleCategoryCount).map(([cat, catTools]) => {
              const meta = metaFor(cat);
              return (
                <section key={cat} id={meta.id} className="hp-category-section">
                  <div className="hp-cat-header">
                    <div className="hp-cat-label" style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}>
                      <span className="hp-cat-dot" style={{ background: meta.dot }} />
                      {cat}
                    </div>
                    <div className="hp-cat-line" />
                    <span className="hp-cat-count">{catTools.length} tools</span>
                  </div>

                  <div className="hp-grid">
                    {catTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} meta={meta} />
                    ))}
                  </div>
                </section>
              );
            })}

            {showGrouped && visibleCategoryCount < categoryEntries.length && (
              <div ref={categoryLoadRef} className="hp-category-loader" aria-hidden="true" />
            )}

            {/* ── Ranked search results ── */}
            {!showGrouped && searching && hits.length > 0 && (
              <div className="hp-grid" id="hp-results" role="listbox" aria-label="Search results">
                {hits.map((hit, i) => (
                  <ToolCard
                    key={hit.tool.id}
                    tool={hit.tool}
                    meta={metaFor(getGroup(hit.tool).label)}
                    terms={result?.terms}
                    active={i === activeIndex}
                    searchMode
                  />
                ))}
              </div>
            )}

            {/* ── Category tab, no search ── */}
            {!showGrouped && !searching && (
              <div className="hp-grid">
                {tabTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} meta={metaFor(getGroup(tool).label)}  />
                ))}
              </div>
            )}

            {/* ── Nothing found ── */}
            {!showGrouped && searching && hits.length === 0 && (
              <div className="hp-empty" id="hp-results">
                <h3>No tools found for “{query}”</h3>
                {result?.suggestion && (
                  <p>
                    Did you mean{" "}
                    <button className="hp-suggest" onClick={() => setSearch(result.suggestion!)}>
                      {result.suggestion}
                    </button>
                    ?
                  </p>
                )}
                {activeTab !== "All" && result && result.hits.length > 0 && (
                  <p>
                    {result.hits.length} match{result.hits.length !== 1 ? "es" : ""} in other categories.{" "}
                    <button className="hp-suggest" onClick={() => setActiveTab("All")}>Show all</button>
                  </p>
                )}
                <p>Try a shorter word, or start from one of these:</p>
                <div className="hp-chips">
                  {trending.slice(0, 5).map(tool => (
                    <Link key={tool.id} href={`/${tool.slug}`} className="hp-chip">{tool.name}</Link>
                  ))}
                </div>
                <button onClick={clearAll}>Clear search</button>
              </div>
            )}
          </div>
        </main>

      </div>
    </>
  );
};

/* ── Highlighted text ── */
function Highlight({ text, terms }: { text: string; terms?: string[] }) {
  if (!terms || !terms.length) return <>{text}</>;
  return (
    <>
      {highlightParts(text, terms).map((part, i) =>
        part.match ? <mark key={i} className="hp-mark">{part.text}</mark> : <span key={i}>{part.text}</span>,
      )}
    </>
  );
}

/* ── Tool Card ── */
function ToolCard({ tool, meta, terms, active, searchMode }: any) {
  return (
    <Link
      href={`/${tool.slug}`}
      id={searchMode ? `hp-hit-${tool.slug}` : undefined}
      role={searchMode ? "option" : undefined}
      aria-selected={searchMode ? !!active : undefined}
      className={`hp-card${active ? " hp-card-active" : ""}`}
    >
      <div className="hp-card-top">
        <div className="hp-card-icon" style={{ background: meta.bg, borderColor: meta.border }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
          </svg>
        </div>
        <span
          className="hp-card-cat"
          style={{ color: meta.color, background: meta.bg, borderColor: meta.border }}
        >
          {tool.category}
        </span>
      </div>

      <div className="hp-card-body">
        <h3 className="hp-card-name"><Highlight text={tool.name} terms={terms} /></h3>
        <p  className="hp-card-desc"><Highlight text={tool.description} terms={terms} /></p>
      </div>

      <div className="hp-card-cta" style={{ color: meta.accent ?? meta.color }}>
        <span>Use Tool</span>
        <svg className="hp-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>

      {/* Hover shine */}
      <div className="hp-card-shine" aria-hidden="true" />
    </Link>
  );
}

export default Home;
