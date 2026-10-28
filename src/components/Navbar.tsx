"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Instagram, Menu, Search, X } from "lucide-react";
import { GROUPS } from "@/lib/toolMeta";
import "./Navbar.css";

const SHORT_LABEL: Record<string, string> = {
  developer: "Developer",
  calculators: "Calculators",
  "ai-writing": "AI Writing",
  social: "Social",
};

const PRIMARY_GROUPS = GROUPS.filter((g) => g.id in SHORT_LABEL);

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nb-root${scrolled ? " nb-scrolled" : ""}`}>
      <div className="nb-inner">
        <Link href="/" className="nb-logo" aria-label="ShauryaTools home">
          <img src="/logo.png" alt="" width={30} height={30} className="nb-logo-img" />
          <span className="nb-wordmark">
            Shaurya<strong>Tools</strong>
          </span>
        </Link>

        <nav className="nb-links" aria-label="Main">
          <Link href="/" className={`nb-link${pathname === "/" ? " is-active" : ""}`}>
            All tools
          </Link>
          {PRIMARY_GROUPS.map((g) => (
            <Link key={g.id} href={`/#${g.id}`} className="nb-link">
              {SHORT_LABEL[g.id]}
            </Link>
          ))}
        </nav>

        <div className="nb-right">
          <Link href="/#tool-search" className="nb-icon" aria-label="Search tools" title="Search tools">
            <Search size={17} strokeWidth={2} />
          </Link>
          <a
            href="https://instagram.com/aniket_jamunde_002"
            target="_blank"
            rel="noopener noreferrer"
            className="nb-icon nb-social"
            aria-label="Instagram"
            title="Instagram"
          >
            <Instagram size={17} strokeWidth={2} />
          </a>
          <a
            href="https://github.com/Aniketjamunde9146"
            target="_blank"
            rel="noopener noreferrer"
            className="nb-icon nb-social"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github size={17} strokeWidth={2} />
          </a>
          <Link href="/#tool-search" className="nb-cta">
            Browse tools
          </Link>
          <button
            type="button"
            className="nb-menu-btn"
            aria-expanded={open}
            aria-controls="nb-mobile"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="nb-mobile" className="nb-mobile">
          <Link href="/" className="nb-mobile-link nb-mobile-all">
            All tools
          </Link>
          {GROUPS.map((g) => (
            <Link key={g.id} href={`/#${g.id}`} className="nb-mobile-link">
              <span className="nb-mobile-dot" style={{ background: g.dot }} aria-hidden="true" />
              <span>
                {g.label}
                <small>{g.blurb}</small>
              </span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
