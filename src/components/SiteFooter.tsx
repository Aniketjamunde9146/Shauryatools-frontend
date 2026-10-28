import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GROUPS } from "@/lib/toolMeta";
import "./SiteFooter.css";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="sf-inner">
        <div className="sf-brand">
          <span className="sf-wordmark">
            Shaurya<strong>Tools</strong>
          </span>
          <p className="sf-tagline">
            Free online tools for developers, creators, students and everyday tasks. No sign-up, no install.
          </p>
        </div>

        <nav className="sf-col" aria-label="Tool categories">
          <h2 className="sf-heading">Categories</h2>
          <ul>
            {GROUPS.map((g) => (
              <li key={g.id}>
                <Link href={`/#${g.id}`}>{g.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="sf-col" aria-label="Site links">
          <h2 className="sf-heading">Site</h2>
          <ul>
            <li>
              <Link href="/">All tools</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <a href="/sitemap.xml">Sitemap</a>
            </li>
            <li>
              <a href="/llms.txt">llms.txt</a>
            </li>
            <li>
              <a href="https://instagram.com/aniket_jamunde_002" target="_blank" rel="noopener noreferrer">
                Instagram <ExternalLink size={12} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://github.com/Aniketjamunde9146" target="_blank" rel="noopener noreferrer">
                GitHub <ExternalLink size={12} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>

        <div className="sf-col">
          <h2 className="sf-heading">How it works</h2>
          <p className="sf-note">
            Most tools run entirely in your browser. AI-powered tools send only what you type to an AI service to
            create the result.
          </p>
          <p className="sf-note">
            Managed by{" "}
            <a href="https://aniketwebdev.in" target="_blank" rel="noopener noreferrer">
              aniketwebdev.in <ExternalLink size={12} aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>

      <div className="sf-bottom">
        <span>
          © {year} ShauryaTools. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
