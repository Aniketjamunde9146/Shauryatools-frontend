import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_NAME } from "@/lib/seo";
import { tools } from "@/data/toolsData";
import { GROUPS } from "@/lib/toolMeta";
import "@/styles/tools/NewTools.css";

const PATH = "/about";

export const metadata: Metadata = buildMetadata(PATH, {
  title: `About ${SITE_NAME} – Free Online Tools and How They Work`,
  description: `What ${SITE_NAME} is, which tools it offers, how the tools handle your data, and who runs the site.`,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd pathname={PATH} />
      <main className="nt-wrap">
        <header className="nt-head">
          <h1>About {SITE_NAME}</h1>
          <p>
            {SITE_NAME} is a free collection of {tools.length} online tools for developers, creators, students and
            everyday tasks. No account or sign-up is needed.
          </p>
        </header>

        <div className="nt-card nt-stack">
          <section>
            <h2 className="nt-label">What you will find</h2>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7, color: "#334155" }}>
              {GROUPS.map((g) => (
                <li key={g.id}>
                  <Link href={`/#${g.id}`}>{g.label}</Link>: {g.blurb}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="nt-label">How your data is handled</h2>
            <p style={{ margin: 0, lineHeight: 1.7, color: "#334155" }}>
              Most tools run entirely in your browser, so what you enter is not sent to our servers. AI-powered tools
              send only what you type to an AI service to create the result. Avoid entering passwords, financial
              details or other sensitive information into any tool.
            </p>
          </section>

          <section>
            <h2 className="nt-label">Who runs this site</h2>
            <p style={{ margin: 0, lineHeight: 1.7, color: "#334155" }}>
              {SITE_NAME} is managed by{" "}
              <a href="https://aniketwebdev.in" target="_blank" rel="noopener noreferrer">aniketwebdev.in</a>.
              You can follow the project on{" "}
              <a href="https://instagram.com/aniket_jamunde_002" target="_blank" rel="noopener noreferrer">Instagram</a>{" "}
              and{" "}
              <a href="https://github.com/Aniketjamunde9146" target="_blank" rel="noopener noreferrer">GitHub</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
