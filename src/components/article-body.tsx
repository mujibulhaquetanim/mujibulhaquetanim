import { Fragment } from "react";
import type { Block } from "@/content/posts";

// Inline `backticks` become <code>; everything else is plain text.
function Inline({ text }: { text: string }) {
  return text.split("`").map((part, i) =>
    i % 2 ? (
      <code key={i} className="rounded-[3px] bg-paper-2 px-1 py-px text-[0.9em]">
        {part}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    // No ligatures in code: JetBrains Mono would draw `===` as one glyph.
    <div className="article max-w-[68ch] text-[1.0625rem] leading-relaxed [&_code]:[font-variant-ligatures:none]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-12 text-2xl font-bold leading-snug tracking-tight">
                <Inline text={block.text} />
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="mt-5 list-disc space-y-2 pl-5 marker:text-accent">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre
                key={i}
                className="mt-5 overflow-x-auto rounded-md border border-line bg-paper-2 p-4 font-mono text-[0.875rem] leading-relaxed"
              >
                <code data-lang={block.lang}>{block.code}</code>
              </pre>
            );
          default:
            return (
              <p key={i} className="mt-5">
                <Inline text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
