import type { ReactNode } from "react";

export type AIResultBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; language: string; text: string };

function isBlockStart(line: string): boolean {
  return /^(#{1,4}\s+|```|>\s?|[-*+]\s+|\d+[.)]\s+)/.test(line.trim());
}

export function parseAIResult(text: string): AIResultBlock[] {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const blocks: AIResultBlock[] = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim();
    if (!line || /^([-*_]\s*){3,}$/.test(line)) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```([\w-]*)\s*$/);
    if (fence) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !/^```\s*$/.test(lines[index].trim())) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", language: fence[1], text: codeLines.join("\n") });
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+?)\s*#*$/);
    if (heading) {
      blocks.push({ type: "heading", level: Math.min(heading[1].length + 1, 4), text: heading[2] });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quote.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "quote", text: quote.join(" ") });
      continue;
    }

    const listItem = line.match(/^([-*+])\s+(.+)$|^(\d+)[.)]\s+(.+)$/);
    if (listItem) {
      const ordered = listItem[3] !== undefined;
      const items: string[] = [];
      while (index < lines.length) {
        const next = lines[index].trim().match(/^([-*+])\s+(.+)$|^(\d+)[.)]\s+(.+)$/);
        if (!next || (next[3] !== undefined) !== ordered) break;
        items.push(next[2] ?? next[4]);
        index += 1;
      }
      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index].trim())) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}

function renderInline(text: string): ReactNode[] {
  const tokenPattern = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\*[^*]+\*|_[^_]+_)/g;
  return text.split(tokenPattern).filter(Boolean).map((token, index) => {
    if ((token.startsWith("**") && token.endsWith("**")) || (token.startsWith("__") && token.endsWith("__"))) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return <code className="st-inline-code" key={index}>{token.slice(1, -1)}</code>;
    }
    if ((token.startsWith("*") && token.endsWith("*")) || (token.startsWith("_") && token.endsWith("_"))) {
      return <em key={index}>{token.slice(1, -1)}</em>;
    }
    return token;
  });
}

export default function AIResultContent({ text }: { text: string }) {
  return (
    <div className="st-output">
      {parseAIResult(text).map((block, index) => {
        if (block.type === "heading") {
          const Heading = `h${block.level}` as "h2" | "h3" | "h4";
          return <Heading className="st-output-heading" key={index}>{renderInline(block.text)}</Heading>;
        }
        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List className="st-output-list" key={index}>
              {block.items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
            </List>
          );
        }
        if (block.type === "quote") {
          return <blockquote className="st-output-quote" key={index}>{renderInline(block.text)}</blockquote>;
        }
        if (block.type === "code") {
          return (
            <figure className="st-output-code" key={index}>
              {block.language && <figcaption>{block.language}</figcaption>}
              <pre><code>{block.text}</code></pre>
            </figure>
          );
        }
        return <p className="st-output-paragraph" key={index}>{renderInline(block.text)}</p>;
      })}
    </div>
  );
}
