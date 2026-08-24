// src/components/blog/BlogContentRenderer.tsx
import { useMemo, useState } from "react";
import InteractiveQuiz from "./InteractiveQuiz";
import { QuizQuestion } from "@/lib/blogStorage";
import { Copy, Check } from "lucide-react";

interface BlogContentRendererProps {
  content: string;
}

type ContentBlock =
  | { type: "markdown"; content: string }
  | { type: "quiz"; data: QuizQuestion };

export default function BlogContentRenderer({ content }: BlogContentRendererProps) {
  const blocks = useMemo(() => {
    if (!content) return [];

    const result: ContentBlock[] = [];
    const quizRegex = /:::quiz\s*([\s\S]*?):::/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = quizRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        const textBefore = content.substring(lastIndex, match.index).trim();
        if (textBefore) {
          result.push({ type: "markdown", content: textBefore });
        }
      }

      const rawJson = match[1].trim();
      try {
        const quizData = JSON.parse(rawJson) as QuizQuestion;
        if (quizData && quizData.question && Array.isArray(quizData.options)) {
          result.push({ type: "quiz", data: quizData });
        } else {
          result.push({
            type: "markdown",
            content: `> *[Quiz block format error]*`,
          });
        }
      } catch (err) {
        console.error("Failed to parse quiz block JSON:", err);
        result.push({
          type: "markdown",
          content: `> *[Quiz format error]*`,
        });
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      const remaining = content.substring(lastIndex).trim();
      if (remaining) {
        result.push({ type: "markdown", content: remaining });
      }
    }

    return result;
  }, [content]);

  return (
    <div className="newspaper-article-body text-[#D4D4D4] font-sans antialiased w-full max-w-full overflow-hidden">
      {blocks.map((block, index) => {
        if (block.type === "quiz") {
          return (
            <div key={`quiz-${index}-${block.data.id || index}`} className="my-8 sm:my-10 w-full clear-both">
              <InteractiveQuiz quiz={block.data} />
            </div>
          );
        }
        return (
          <MarkdownSegment
            key={`md-${index}`}
            markdown={block.content}
            isFirstBlock={index === 0}
          />
        );
      })}
    </div>
  );
}

function MarkdownSegment({
  markdown,
  isFirstBlock,
}: {
  markdown: string;
  isFirstBlock?: boolean;
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const parsedSections = useMemo(() => {
    const sections: Array<{
      type: "code" | "html";
      lang?: string;
      code?: string;
      html?: string;
    }> = [];
    const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(markdown)) !== null) {
      if (match.index > lastIdx) {
        const text = markdown.substring(lastIdx, match.index);
        sections.push({
          type: "html",
          html: formatNewspaperMarkdown(text, isFirstBlock && sections.length === 0),
        });
      }
      sections.push({
        type: "code",
        lang: match[1] || "code",
        code: match[2].trim(),
      });
      lastIdx = match.index + match[0].length;
    }

    if (lastIdx < markdown.length) {
      const text = markdown.substring(lastIdx);
      sections.push({
        type: "html",
        html: formatNewspaperMarkdown(text, isFirstBlock && sections.length === 0),
      });
    }

    return sections;
  }, [markdown, isFirstBlock]);

  const handleCopyCode = (code: string, idx: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="space-y-6 w-full clear-both">
      {parsedSections.map((sec, idx) => {
        if (sec.type === "code" && sec.code) {
          const isCopied = copiedIndex === idx;
          return (
            <div
              key={idx}
              className="my-8 rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0E0E0E] shadow-2xl w-full clear-both"
            >
              <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-white/[0.02] border-b border-white/[0.06] text-xs font-mono text-[#888888] uppercase tracking-wider">
                <span>{sec.lang}</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(sec.code || "", idx)}
                  className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-white transition px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08]"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-[#F1F5F9] leading-[1.75] bg-[#080808]">
                <code>{sec.code}</code>
              </pre>
            </div>
          );
        }

        return (
          <div
            key={idx}
            dangerouslySetInnerHTML={{ __html: sec.html || "" }}
            className="prose-content w-full"
          />
        );
      })}
    </div>
  );
}

function formatNewspaperMarkdown(markdown: string, hasDropCap?: boolean): string {
  let output = markdown;

  // 1. Flexible Images: ![alt|alignment](url "caption") or ![alt](url)
  // Supports alignment: center (default), wide, left, right
  output = output.replace(
    /!\[(.*?)(?:\|(wide|left|right|center))?\]\((.*?)(?:\s+"(.*?)")?\)/g,
    (_match, altText, align, url, caption) => {
      const alignment = align || "center";
      const captionText = caption || altText;

      if (alignment === "wide") {
        return `
        <figure class="my-8 sm:my-12 w-full clear-both">
          <div class="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#0D0D0D] shadow-2xl">
            <img src="${url}" alt="${altText}" class="w-full h-auto max-h-[580px] object-cover" loading="lazy" />
          </div>
          ${
            captionText
              ? `<figcaption class="mt-2.5 text-center text-xs text-[#888888] font-sans tracking-wide">${captionText}</figcaption>`
              : ""
          }
        </figure>
        `;
      }

      if (alignment === "left") {
        return `
        <figure class="my-6 w-full sm:float-left sm:w-[46%] sm:mr-6 sm:mb-4 clear-left">
          <div class="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D0D] shadow-xl">
            <img src="${url}" alt="${altText}" class="w-full h-auto max-h-[360px] object-cover" loading="lazy" />
          </div>
          ${
            captionText
              ? `<figcaption class="mt-2 text-xs text-[#888888] font-sans leading-snug">${captionText}</figcaption>`
              : ""
          }
        </figure>
        `;
      }

      if (alignment === "right") {
        return `
        <figure class="my-6 w-full sm:float-right sm:w-[46%] sm:ml-6 sm:mb-4 clear-right">
          <div class="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D0D] shadow-xl">
            <img src="${url}" alt="${altText}" class="w-full h-auto max-h-[360px] object-cover" loading="lazy" />
          </div>
          ${
            captionText
              ? `<figcaption class="mt-2 text-xs text-[#888888] font-sans leading-snug">${captionText}</figcaption>`
              : ""
          }
        </figure>
        `;
      }

      // Default: Centered standard
      return `
      <figure class="my-8 sm:my-10 w-full clear-both">
        <div class="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D0D0D] shadow-xl">
          <img src="${url}" alt="${altText}" class="w-full h-auto max-h-[480px] object-cover mx-auto" loading="lazy" />
        </div>
        ${
          captionText
            ? `<figcaption class="mt-2.5 text-center text-xs text-[#888888] font-sans tracking-wide">${captionText}</figcaption>`
            : ""
        }
      </figure>
      `;
    }
  );

  // 2. Headings - Clean Editorial Hierarchy
  output = output.replace(
    /^#### (.*$)/gim,
    '<h4 class="text-sm sm:text-base font-bold text-white mt-8 mb-2 tracking-tight uppercase font-mono">$1</h4>'
  );
  output = output.replace(
    /^### (.*$)/gim,
    '<h3 class="text-lg sm:text-xl md:text-2xl font-bold font-sans text-white mt-10 mb-3 tracking-tight pb-1 leading-snug">$1</h3>'
  );
  output = output.replace(
    /^## (.*$)/gim,
    '<h2 class="text-xl sm:text-2xl md:text-3xl font-bold font-sans bg-gradient-to-r from-white via-white/90 to-[#999999] bg-clip-text text-transparent mt-12 sm:mt-16 mb-5 pb-2.5 border-b border-white/[0.1] tracking-tight leading-tight clear-both">$1</h2>'
  );
  output = output.replace(
    /^# (.*$)/gim,
    '<h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold font-sans bg-gradient-to-r from-white via-[#FAFAFA] to-[#94A3B8] bg-clip-text text-transparent mt-10 mb-5 tracking-tight leading-[1.15] clear-both">$1</h1>'
  );

  // 3. Editorial Pull Quotes & Blockquotes
  output = output.replace(
    /^> (.*$)/gim,
    `
    <blockquote class="my-8 px-5 sm:px-8 py-4 border-l-2 border-white/40 bg-white/[0.02] text-left text-white/95 font-sans italic text-base sm:text-lg md:text-xl leading-relaxed clear-both">
      “$1”
    </blockquote>
    `
  );

  // 4. Section Separator (Ornamental)
  output = output.replace(/^---$/gim, `
    <div class="my-10 sm:my-14 flex items-center justify-center gap-3 text-white/30 clear-both">
      <span class="h-px w-12 sm:w-20 bg-white/[0.1]"></span>
      <span class="text-xs sm:text-sm tracking-[0.3em] uppercase">✦ ✦ ✦</span>
      <span class="h-px w-12 sm:w-20 bg-white/[0.1]"></span>
    </div>
  `);

  // 5. Inline formatting
  output = output.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[#E2E8F0] font-mono text-xs sm:text-sm">$1</code>'
  );
  output = output.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold text-white">$1</strong>'
  );
  output = output.replace(
    /\*(.*?)\*/g,
    '<em class="italic text-[#E5E5E5] font-sans">$1</em>'
  );
  output = output.replace(
    /~~(.*?)~~/g,
    '<del class="line-through text-white/40">$1</del>'
  );
  output = output.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-white hover:text-white/70 underline underline-offset-4 decoration-white/40 transition-colors">$1</a>'
  );

  // 6. Unordered Lists
  output = output.replace(/(?:^[ \t]*[-*][ \t]+(.*?)(?:\n|$))+/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((line) => {
        const itemText = line.replace(/^[ \t]*[-*][ \t]+/, "");
        return `<li class="flex items-start gap-3 my-2 text-[#D1D5DB] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-sans"><span class="w-1.5 h-1.5 rounded-full bg-white/70 mt-2.5 flex-shrink-0"></span><span>${itemText}</span></li>`;
      })
      .join("");
    return `<ul class="my-5 space-y-1 pl-1 clear-both">${items}</ul>`;
  });

  // 7. Ordered Lists
  output = output.replace(/(?:^[ \t]*\d+\.[ \t]+(.*?)(?:\n|$))+/gm, (match) => {
    let count = 1;
    const items = match
      .trim()
      .split("\n")
      .map((line) => {
        const itemText = line.replace(/^[ \t]*\d+\.[ \t]+/, "");
        const item = `<li class="flex items-start gap-3 my-2 text-[#D1D5DB] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-sans"><span class="w-5 h-5 rounded-md bg-white/[0.06] border border-white/[0.1] text-white font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">${count}</span><span>${itemText}</span></li>`;
        count++;
        return item;
      })
      .join("");
    return `<ol class="my-5 space-y-1 pl-1 clear-both">${items}</ol>`;
  });

  // 8. Paragraphs with consistent font-sans
  const paragraphs = output.split(/\n\n+/);

  output = paragraphs
    .map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<figure") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol")
      ) {
        return trimmed;
      }

      return `<p class="mb-6 text-[15px] sm:text-[16px] md:text-[17px] leading-[1.8] text-[#D1D5DB] font-sans font-light tracking-normal">${trimmed.replace(
        /\n/g,
        "<br />"
      )}</p>`;
    })
    .join("\n");

  return output;
}
