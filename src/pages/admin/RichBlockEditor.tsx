// src/pages/admin/RichBlockEditor.tsx
import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import {
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Plus,
  Trash2,
  GripVertical,
  Bold,
  Italic,
  Link as LinkIcon,
  HelpCircle,
  ChevronDown,
  Image as ImageIcon,
  MoveUp,
  MoveDown,
  Strikethrough,
  Upload,
  Check,
  Sparkles,
  AlertCircle,
  Lightbulb,
  Info,
  Maximize2,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Flame,
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────

interface RichBlockEditorProps {
  content: string;
  onChange: (markdown: string) => void;
  onInsertImageModal: () => void;
  onInsertQuizModal: () => void;
}

export interface RichBlockEditorRef {
  insertMarkdownAtEnd: (markdown: string) => void;
  insertBlockAtEnd: (type: BlockType, content?: string, meta?: any) => void;
}

export type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "bullet-list"
  | "numbered-list"
  | "callout"
  | "stat"
  | "blockquote"
  | "code"
  | "image"
  | "separator"
  | "raw";

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: string;
  meta?: {
    language?: string;
    src?: string;
    alt?: string;
    caption?: string;
    alignment?: "center" | "wide" | "left" | "right";
    calloutType?: "NOTE" | "TIP" | "WARNING" | "IMPORTANT";
    statLabel?: string;
  };
}

const generateId = () => Math.random().toString(36).substring(2, 11);

// ─── Markdown Parsing ────────────────────────────────────────

function parseMarkdownToBlocks(markdown: string): EditorBlock[] {
  if (!markdown || !markdown.trim()) {
    return [{ id: generateId(), type: "paragraph", content: "" }];
  }

  const lines = markdown.split("\n");
  const blocks: EditorBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Quiz blocks (:::quiz ... :::)
    if (line.trimStart().startsWith(":::quiz")) {
      let raw = line + "\n";
      i++;
      while (i < lines.length) {
        raw += lines[i] + "\n";
        if (lines[i].trimStart() === ":::") {
          i++;
          break;
        }
        i++;
      }
      blocks.push({ id: generateId(), type: "raw", content: raw.trimEnd() });
      continue;
    }

    // Callout blocks (> [!NOTE|TIP|WARNING|IMPORTANT])
    const calloutHeaderMatch = line.match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*$/i);
    if (calloutHeaderMatch) {
      const calloutType = calloutHeaderMatch[1].toUpperCase() as any;
      const calloutLines: string[] = [];
      i++;
      while (i < lines.length && lines[i].startsWith(">")) {
        calloutLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({
        id: generateId(),
        type: "callout",
        content: calloutLines.join("\n"),
        meta: { calloutType: calloutType === "CAUTION" ? "WARNING" : calloutType },
      });
      continue;
    }

    // Fenced code blocks
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      let code = "";
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code += lines[i] + "\n";
        i++;
      }
      i++; // skip closing ```
      blocks.push({
        id: generateId(),
        type: "code",
        content: code.trimEnd(),
        meta: { language },
      });
      continue;
    }

    // Images: ![alt|alignment](src "caption") or ![alt](src)
    const imgRegex = /^!\[(.*?)(?:\|(wide|left|right|center))?\]\((.*?)(?:\s+"(.*?)")?\)\s*$/;
    const imgMatch = line.match(imgRegex);
    if (imgMatch) {
      blocks.push({
        id: generateId(),
        type: "image",
        content: "",
        meta: {
          alt: imgMatch[1] || "",
          alignment: (imgMatch[2] as any) || "center",
          src: imgMatch[3] || "",
          caption: imgMatch[4] || "",
        },
      });
      i++;
      continue;
    }

    // Separator (---)
    if (line.trim() === "---") {
      blocks.push({ id: generateId(), type: "separator", content: "" });
      i++;
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      blocks.push({ id: generateId(), type: "heading3", content: line.slice(4) });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ id: generateId(), type: "heading2", content: line.slice(3) });
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      blocks.push({ id: generateId(), type: "heading1", content: line.slice(2) });
      i++;
      continue;
    }

    // Blockquotes (consecutive lines starting with >)
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ id: generateId(), type: "blockquote", content: quoteLines.join("\n") });
      continue;
    }

    // Bullet lists (including custom bullet symbols: -, *, ✓, ✦, ★, →, ⚡)
    if (/^[-*✓✦★→⚡] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*✓✦★→⚡] /.test(lines[i])) {
        items.push(lines[i].replace(/^[-*✓✦★→⚡] /, ""));
        i++;
      }
      blocks.push({ id: generateId(), type: "bullet-list", content: items.join("\n") });
      continue;
    }

    // Numbered lists (1. , 2. etc.)
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      blocks.push({ id: generateId(), type: "numbered-list", content: items.join("\n") });
      continue;
    }

    // Empty lines — skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph (gather continuous text)
    let para = line;
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith(">") &&
      !/^[-*✓✦★→⚡] /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith(":::") &&
      lines[i].trim() !== "---" &&
      !imgRegex.test(lines[i])
    ) {
      para += "\n" + lines[i];
      i++;
    }
    blocks.push({ id: generateId(), type: "paragraph", content: para });
  }

  return blocks.length > 0 ? blocks : [{ id: generateId(), type: "paragraph", content: "" }];
}

// ─── Blocks → Markdown ───────────────────────────────────────

function convertBlocksToMarkdown(blocks: EditorBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading1":
          return `# ${block.content}`;
        case "heading2":
          return `## ${block.content}`;
        case "heading3":
          return `### ${block.content}`;
        case "paragraph":
          return block.content;
        case "blockquote":
          return block.content
            .split("\n")
            .map((l) => `> ${l}`)
            .join("\n");
        case "callout": {
          const type = block.meta?.calloutType || "TIP";
          const body = block.content
            ? block.content
                .split("\n")
                .map((l) => `> ${l}`)
                .join("\n")
            : "> Write callout message here...";
          return `> [!${type}]\n${body}`;
        }
        case "stat": {
          const num = block.content || "100%";
          const label = block.meta?.statLabel || "Key Highlight";
          return `> **${num}** — ${label}`;
        }
        case "bullet-list":
          return block.content
            .split("\n")
            .filter((l) => l.trim() !== "")
            .map((l) => `- ${l}`)
            .join("\n");
        case "numbered-list":
          return block.content
            .split("\n")
            .filter((l) => l.trim() !== "")
            .map((l, i) => `${i + 1}. ${l}`)
            .join("\n");
        case "code":
          return "```" + (block.meta?.language || "") + "\n" + block.content + "\n```";
        case "separator":
          return "---";
        case "image": {
          const alt = block.meta?.alt ? block.meta.alt.trim() : "";
          const align = block.meta?.alignment || "center";
          const altPart = align && align !== "center" ? `${alt}|${align}` : alt;
          const src = block.meta?.src || "";
          const cap = block.meta?.caption ? block.meta.caption.trim() : "";
          return cap ? `![${altPart}](${src} "${cap}")` : `![${altPart}](${src})`;
        }
        case "raw":
          return block.content;
        default:
          return block.content;
      }
    })
    .join("\n\n");
}

// ─── Block Definitions ───────────────────────────────────────

const BLOCK_TYPE_OPTIONS: {
  type: BlockType;
  label: string;
  icon: React.FC<any>;
  description: string;
}[] = [
  { type: "paragraph", label: "Text", icon: Type, description: "Normal body paragraph" },
  { type: "heading1", label: "Heading 1", icon: Heading1, description: "Main section title" },
  { type: "heading2", label: "Heading 2", icon: Heading2, description: "Sub-section header" },
  { type: "heading3", label: "Heading 3", icon: Heading3, description: "Minor sub-heading" },
  { type: "bullet-list", label: "Bullet Points", icon: List, description: "Bullet list (•)" },
  { type: "numbered-list", label: "Numbered List", icon: ListOrdered, description: "Counting list (1. 2. 3.)" },
  { type: "callout", label: "Callout Note", icon: Lightbulb, description: "Highlighted callout box" },
  { type: "image", label: "Graphic / Image", icon: ImageIcon, description: "Standalone image (no text needed)" },
  { type: "blockquote", label: "Pullquote", icon: Quote, description: "Editorial pullquote" },
  { type: "code", label: "Code Block", icon: Code, description: "Monospace syntax block" },
  { type: "separator", label: "Divider", icon: Minus, description: "Decorative section rule" },
];

const QUICK_SYMBOLS = [
  { symbol: "•", label: "Bullet Point" },
  { symbol: "✓", label: "Checkmark" },
  { symbol: "✦", label: "Star / Sparkle" },
  { symbol: "★", label: "Solid Star" },
  { symbol: "→", label: "Arrow" },
  { symbol: "⚡", label: "Lightning" },
  { symbol: "❖", label: "Diamond" },
  { symbol: "“", label: "Left Quote" },
  { symbol: "”", label: "Right Quote" },
  { symbol: "—", label: "Em Dash" },
  { symbol: "№", label: "Number Symbol" },
  { symbol: "§", label: "Section Symbol" },
  { symbol: "⌘", label: "Command" },
  { symbol: "💡", label: "Idea / Tip" },
  { symbol: "⚠️", label: "Warning" },
];

// ─── Add Block Menu ──────────────────────────────────────────

function AddBlockMenu({
  onSelect,
  onClose,
  onInsertImage,
  onInsertQuiz,
}: {
  onSelect: (type: BlockType) => void;
  onClose: () => void;
  onInsertImage: () => void;
  onInsertQuiz: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-64 rounded-xl bg-[#18181B] border border-[#27272A] shadow-2xl p-1.5 font-sans"
    >
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-[#71717A] font-semibold">
        Insert Block At This Position
      </div>
      <div className="max-h-80 overflow-y-auto space-y-0.5 pr-1">
        {BLOCK_TYPE_OPTIONS.map(({ type, label, icon: Icon, description }) => (
          <button
            key={type}
            className="w-full flex items-center gap-3 px-2.5 py-2 text-left rounded-lg hover:bg-[#27272A] transition-colors group cursor-pointer"
            onClick={() => {
              onSelect(type);
              onClose();
            }}
          >
            <div className="w-7 h-7 rounded-md bg-[#27272A] group-hover:bg-[#3F3F46] flex items-center justify-center flex-shrink-0 transition">
              <Icon className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-white" />
            </div>
            <div>
              <div className="text-xs font-medium text-[#E4E4E7] group-hover:text-white">{label}</div>
              <div className="text-[10px] text-[#71717A]">{description}</div>
            </div>
          </button>
        ))}

        <div className="h-px bg-[#27272A] my-1" />

        <button
          className="w-full flex items-center gap-3 px-2.5 py-2 text-left rounded-lg hover:bg-[#27272A] transition-colors group cursor-pointer"
          onClick={() => {
            onInsertImage();
            onClose();
          }}
        >
          <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-medium text-emerald-300">Upload Media / Graphic</div>
            <div className="text-[10px] text-[#71717A]">Upload file from computer</div>
          </div>
        </button>

        <button
          className="w-full flex items-center gap-3 px-2.5 py-2 text-left rounded-lg hover:bg-[#27272A] transition-colors group cursor-pointer"
          onClick={() => {
            onInsertQuiz();
            onClose();
          }}
        >
          <div className="w-7 h-7 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div>
            <div className="text-xs font-medium text-purple-300">Interactive Quiz</div>
            <div className="text-[10px] text-[#71717A]">Reader knowledge check</div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Change Block Type Dropdown ──────────────────────────────

function BlockTypeDropdown({
  currentType,
  onSelect,
}: {
  currentType: BlockType;
  onSelect: (type: BlockType) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = BLOCK_TYPE_OPTIONS.find((o) => o.type === currentType);
  const CurrentIcon = current?.icon || Type;

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center gap-1 px-1.5 py-1 rounded-md text-[#71717A] hover:text-[#A1A1AA] hover:bg-[#27272A] transition text-[11px] font-medium cursor-pointer"
        onClick={() => setOpen(!open)}
        title="Change block type"
      >
        <CurrentIcon className="w-3.5 h-3.5 text-[#A1A1AA]" />
        <ChevronDown className="w-3 h-3 text-[#71717A]" />
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-44 rounded-lg bg-[#18181B] border border-[#27272A] shadow-xl py-1">
          {BLOCK_TYPE_OPTIONS.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-xs transition-colors cursor-pointer ${
                type === currentType
                  ? "bg-[#27272A] text-white font-semibold"
                  : "text-[#A1A1AA] hover:bg-[#27272A] hover:text-white"
              }`}
              onClick={() => {
                onSelect(type);
                setOpen(false);
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Inline Formatting Helpers ───────────────────────────────

function wrapSelectionInTextarea(
  textareaId: string,
  before: string,
  after: string,
  onUpdate: (content: string) => void,
  placeholder = "text"
) {
  const el = document.getElementById(textareaId) as HTMLTextAreaElement | null;
  if (!el) return;

  const start = el.selectionStart;
  const end = el.selectionEnd;
  const currentVal = el.value;
  const selected = currentVal.substring(start, end) || placeholder;

  const replacement = `${before}${selected}${after}`;
  const updated = currentVal.substring(0, start) + replacement + currentVal.substring(end);

  onUpdate(updated);

  setTimeout(() => {
    el.focus();
    el.setSelectionRange(start + before.length, start + before.length + selected.length);
  }, 10);
}

function insertSymbolInTextarea(
  textareaId: string,
  symbol: string,
  onUpdate: (content: string) => void
) {
  const el = document.getElementById(textareaId) as HTMLTextAreaElement | null;
  if (!el) {
    onUpdate(symbol);
    return;
  }

  const start = el.selectionStart;
  const end = el.selectionEnd;
  const currentVal = el.value;

  const updated = currentVal.substring(0, start) + symbol + currentVal.substring(end);
  onUpdate(updated);

  setTimeout(() => {
    el.focus();
    el.setSelectionRange(start + symbol.length, start + symbol.length);
  }, 10);
}

// ─── Standalone Image / Graphic Block ─────────────────────────

function ImageBlock({
  block,
  onChange,
  onAddAnotherGraphic,
}: {
  block: EditorBlock;
  onChange: (meta: EditorBlock["meta"]) => void;
  onAddAnotherGraphic: () => void;
}) {
  const meta = block.meta || {};
  const [showEdit, setShowEdit] = useState(!meta.src);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size should be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange({
        ...meta,
        src: result,
        alt: meta.alt || file.name.replace(/\.[^/.]+$/, ""),
      });
      setShowEdit(false);
      toast.success("Graphic loaded!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="my-3 rounded-2xl border border-[#27272A] bg-[#121214] overflow-hidden group/img transition-all hover:border-[#3F3F46]">
      {meta.src ? (
        <div className="relative bg-black/40">
          <div
            className={`p-2 flex ${
              meta.alignment === "left"
                ? "justify-start"
                : meta.alignment === "right"
                ? "justify-end"
                : "justify-center"
            }`}
          >
            <img
              src={meta.src}
              alt={meta.alt || "Graphic"}
              className={`rounded-xl object-contain max-h-[460px] ${
                meta.alignment === "wide" ? "w-full" : "max-w-full"
              }`}
              loading="lazy"
            />
          </div>

          {/* Quick action overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity">
            <button
              onClick={onAddAnotherGraphic}
              className="px-2.5 py-1 rounded-lg bg-black/70 hover:bg-white text-[#E4E4E7] hover:text-black text-xs font-medium backdrop-blur-md border border-white/10 transition flex items-center gap-1 cursor-pointer"
              title="Add another graphic directly below this one"
            >
              <Plus className="w-3 h-3" />
              <span>Add Next Graphic</span>
            </button>
            <button
              onClick={() => setShowEdit(!showEdit)}
              className="px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black/90 text-white text-xs font-medium backdrop-blur-md border border-white/10 transition cursor-pointer"
            >
              {showEdit ? "Done" : "Adjust"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#71717A] mb-3">
            <ImageIcon className="w-6 h-6" />
          </div>
          <p className="text-xs font-medium text-white mb-1">
            Standalone Graphic Block
          </p>
          <p className="text-[11px] text-[#71717A] mb-4 max-w-xs">
            Insert an image or graphic without needing any text or description
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-lg bg-white text-black font-medium text-xs hover:bg-[#E4E4E7] transition flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Graphic</span>
            </button>

            <button
              type="button"
              onClick={() => setShowEdit(true)}
              className="px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-xs font-medium text-[#A1A1AA] hover:text-white transition cursor-pointer"
            >
              Paste Image URL
            </button>
          </div>
        </div>
      )}

      {/* Optional Caption (only if user provided one) */}
      {meta.caption && !showEdit && (
        <div className="px-4 py-2 text-xs text-[#71717A] border-t border-[#27272A] text-center italic bg-[#18181B]/30">
          {meta.caption}
        </div>
      )}

      {/* Graphic settings drawer */}
      {showEdit && (
        <div className="p-4 border-t border-[#27272A] space-y-3 bg-[#18181B]/70">
          <div>
            <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1">
              Graphic Image URL (or upload above)
            </label>
            <input
              type="url"
              value={meta.src || ""}
              onChange={(e) => onChange({ ...meta, src: e.target.value })}
              placeholder="https://images.unsplash.com/... or data:image/..."
              className="w-full rounded-lg bg-[#09090B] border border-[#27272A] px-3 py-1.5 text-xs text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Layout alignment buttons */}
            <div>
              <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1">
                Placement & Width
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onChange({ ...meta, alignment: "center" })}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition cursor-pointer ${
                    meta.alignment === "center" || !meta.alignment
                      ? "bg-white text-black font-semibold"
                      : "bg-[#27272A] text-[#A1A1AA] hover:text-white"
                  }`}
                  title="Centered Standard"
                >
                  <AlignCenter className="w-3 h-3" />
                  <span>Center</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...meta, alignment: "wide" })}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition cursor-pointer ${
                    meta.alignment === "wide"
                      ? "bg-white text-black font-semibold"
                      : "bg-[#27272A] text-[#A1A1AA] hover:text-white"
                  }`}
                  title="Full Width Banner"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Wide</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...meta, alignment: "left" })}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition cursor-pointer ${
                    meta.alignment === "left"
                      ? "bg-white text-black font-semibold"
                      : "bg-[#27272A] text-[#A1A1AA] hover:text-white"
                  }`}
                  title="Float Left"
                >
                  <AlignLeft className="w-3 h-3" />
                  <span>Float Left</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...meta, alignment: "right" })}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition cursor-pointer ${
                    meta.alignment === "right"
                      ? "bg-white text-black font-semibold"
                      : "bg-[#27272A] text-[#A1A1AA] hover:text-white"
                  }`}
                  title="Float Right"
                >
                  <AlignRight className="w-3 h-3" />
                  <span>Float Right</span>
                </button>
              </div>
            </div>

            {/* Optional Caption & Alt */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={meta.caption || ""}
                onChange={(e) => onChange({ ...meta, caption: e.target.value })}
                placeholder="Caption (optional — leave blank for no text)"
                className="w-60 rounded-lg bg-[#09090B] border border-[#27272A] px-2.5 py-1 text-xs text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-3 py-1 rounded-lg bg-white text-black text-xs font-medium hover:bg-[#E4E4E7] transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Callout Box Block ───────────────────────────────────────

function CalloutBlock({
  block,
  onChange,
}: {
  block: EditorBlock;
  onChange: (updates: Partial<EditorBlock>) => void;
}) {
  const meta = block.meta || {};
  const currentType = meta.calloutType || "TIP";

  const typeConfig: Record<string, { label: string; icon: React.FC<any>; bg: string; border: string; text: string }> = {
    TIP: { label: "Pro Tip", icon: Lightbulb, bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
    NOTE: { label: "Note", icon: Info, bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
    WARNING: { label: "Warning", icon: AlertCircle, bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
    IMPORTANT: { label: "Key Insight", icon: Sparkles, bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
  };

  const current = typeConfig[currentType] || typeConfig.TIP;
  const CurrentIcon = current.icon;

  return (
    <div className={`my-3 p-4 rounded-2xl ${current.bg} border ${current.border} transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <CurrentIcon className={`w-4 h-4 ${current.text}`} />
          <span className={`text-xs font-semibold uppercase tracking-wider font-mono ${current.text}`}>
            {current.label}
          </span>
        </div>

        {/* Change callout style */}
        <div className="flex items-center gap-1">
          {(["TIP", "NOTE", "WARNING", "IMPORTANT"] as const).map((t) => (
            <button
              key={t}
              onClick={() => onChange({ meta: { ...meta, calloutType: t } })}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition cursor-pointer ${
                currentType === t
                  ? "bg-white text-black font-bold"
                  : "bg-black/30 text-[#A1A1AA] hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={block.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Write important takeaway, pro tip, or highlight message here..."
        className="w-full bg-transparent text-sm leading-relaxed text-[#E4E4E7] placeholder-[#71717A] outline-none resize-none min-h-[60px]"
      />
    </div>
  );
}

// ─── Single Block Row ────────────────────────────────────────

function BlockRow({
  block,
  index,
  totalBlocks,
  onUpdate,
  onAdd,
  onDelete,
  onMoveUp,
  onMoveDown,
  onInsertImageModal,
  onInsertQuizModal,
}: {
  block: EditorBlock;
  index: number;
  totalBlocks: number;
  onUpdate: (id: string, updates: Partial<EditorBlock>) => void;
  onAdd: (afterIndex: number, type?: BlockType) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onInsertImageModal: () => void;
  onInsertQuizModal: () => void;
}) {
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const textareaId = `block-${block.id}`;

  const isTextBlock = [
    "paragraph",
    "heading1",
    "heading2",
    "heading3",
    "blockquote",
    "bullet-list",
    "numbered-list",
  ].includes(block.type);

  // Auto-resize textarea
  const autoResize = useCallback(() => {
    const ta = textRef.current;
    if (ta) {
      ta.style.height = "0";
      ta.style.height = `${Math.max(38, ta.scrollHeight)}px`;
    }
  }, []);

  useEffect(() => {
    autoResize();
  }, [block.content, autoResize]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    onUpdate(block.id, { content: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (block.type === "bullet-list" || block.type === "numbered-list") {
        return; // standard newline for list items
      }
      e.preventDefault();
      onAdd(index);
    }

    if (e.key === "Backspace" && block.content === "" && totalBlocks > 1) {
      e.preventDefault();
      onDelete(block.id);
    }
  };

  const handleTextInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLTextAreaElement).value;

    // Shortcuts for empty paragraph
    if (block.type === "paragraph" && !value.includes("\n")) {
      if (value === "# ") {
        onUpdate(block.id, { type: "heading1", content: "" });
      } else if (value === "## ") {
        onUpdate(block.id, { type: "heading2", content: "" });
      } else if (value === "### ") {
        onUpdate(block.id, { type: "heading3", content: "" });
      } else if (value === "- " || value === "* " || value === "• ") {
        onUpdate(block.id, { type: "bullet-list", content: "" });
      } else if (value === "1. ") {
        onUpdate(block.id, { type: "numbered-list", content: "" });
      } else if (value === "> ") {
        onUpdate(block.id, { type: "blockquote", content: "" });
      } else if (value === "```") {
        onUpdate(block.id, { type: "code", content: "", meta: { language: "typescript" } });
      } else if (value === "---") {
        onUpdate(block.id, { type: "separator", content: "" });
      }
    }
  };

  const textStyles: Record<string, string> = {
    paragraph: "text-[15px] sm:text-[16px] leading-[1.8] text-[#E4E4E7] font-sans font-light",
    heading1: "text-2xl sm:text-3xl font-extrabold text-white leading-tight font-sans tracking-tight",
    heading2: "text-xl sm:text-2xl font-bold text-white leading-snug font-sans tracking-tight",
    heading3: "text-lg sm:text-xl font-bold text-white leading-snug font-sans tracking-tight",
    blockquote: "text-base sm:text-lg leading-relaxed text-[#D4D4D8] font-sans italic pl-4 border-l-2 border-white/40",
    "bullet-list": "text-[15px] sm:text-[16px] leading-[1.8] text-[#E4E4E7] font-sans",
    "numbered-list": "text-[15px] sm:text-[16px] leading-[1.8] text-[#E4E4E7] font-sans",
  };

  const placeholders: Record<string, string> = {
    paragraph: "Type paragraph text... (type '# ' for Heading, '- ' for Bullet, '1. ' for Numbered)",
    heading1: "Main Section Heading...",
    heading2: "Sub-section Heading...",
    heading3: "Minor Topic Heading...",
    blockquote: "Editorial pullquote...",
    "bullet-list": "Bullet points (one point per line)...",
    "numbered-list": "Step or counting points (one item per line)...",
  };

  return (
    <div className="group relative transition-all my-1.5">
      {/* Left Gutter: Block Type & Reorder Controls */}
      <div className="absolute -left-12 sm:-left-14 top-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <button
          className="p-1 rounded text-[#52525B] hover:text-[#A1A1AA] transition cursor-grab"
          title="Block options"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        <BlockTypeDropdown
          currentType={block.type}
          onSelect={(type) => onUpdate(block.id, { type })}
        />
      </div>

      {/* Main Block Content */}
      <div className="relative">
        {/* Right action tray on hover */}
        <div className="absolute right-0 -top-7 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-20 bg-[#18181B] px-2 py-1 rounded-lg border border-[#27272A] shadow-lg">
          {/* Quick formatting buttons for text blocks */}
          {isTextBlock && (
            <div className="flex items-center gap-0.5 pr-1.5 border-r border-[#27272A]">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  wrapSelectionInTextarea(textareaId, "**", "**", (c) => onUpdate(block.id, { content: c }));
                }}
                className="p-1 rounded text-[#71717A] hover:text-white hover:bg-[#27272A] transition"
                title="Bold"
              >
                <Bold className="w-3 h-3" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  wrapSelectionInTextarea(textareaId, "*", "*", (c) => onUpdate(block.id, { content: c }));
                }}
                className="p-1 rounded text-[#71717A] hover:text-white hover:bg-[#27272A] transition"
                title="Italic"
              >
                <Italic className="w-3 h-3" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  wrapSelectionInTextarea(textareaId, "==", "==", (c) => onUpdate(block.id, { content: c }));
                }}
                className="p-1 rounded text-[#71717A] hover:text-amber-300 hover:bg-[#27272A] transition"
                title="Highlight"
              >
                <Highlighter className="w-3 h-3" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  wrapSelectionInTextarea(textareaId, "`", "`", (c) => onUpdate(block.id, { content: c }));
                }}
                className="p-1 rounded text-[#71717A] hover:text-white hover:bg-[#27272A] transition"
                title="Inline Code"
              >
                <Code className="w-3 h-3" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const url = prompt("Enter link URL:", "https://");
                  if (url) {
                    wrapSelectionInTextarea(textareaId, "[", `](${url})`, (c) => onUpdate(block.id, { content: c }));
                  }
                }}
                className="p-1 rounded text-[#71717A] hover:text-white hover:bg-[#27272A] transition"
                title="Add Link"
              >
                <LinkIcon className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Quick symbols insertion on active block */}
          {isTextBlock && (
            <div className="flex items-center gap-0.5 pr-1.5 border-r border-[#27272A]">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertSymbolInTextarea(textareaId, "• ", (c) => onUpdate(block.id, { content: c }));
                }}
                className="px-1 py-0.5 rounded text-[11px] font-bold text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition"
                title="Insert Bullet Point (•)"
              >
                •
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertSymbolInTextarea(textareaId, "✓ ", (c) => onUpdate(block.id, { content: c }));
                }}
                className="px-1 py-0.5 rounded text-[11px] font-bold text-emerald-400 hover:bg-[#27272A] transition"
                title="Insert Checkmark (✓)"
              >
                ✓
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertSymbolInTextarea(textareaId, "✦ ", (c) => onUpdate(block.id, { content: c }));
                }}
                className="px-1 py-0.5 rounded text-[11px] font-bold text-purple-400 hover:bg-[#27272A] transition"
                title="Insert Sparkle (✦)"
              >
                ✦
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  insertSymbolInTextarea(textareaId, "→ ", (c) => onUpdate(block.id, { content: c }));
                }}
                className="px-1 py-0.5 rounded text-[11px] font-bold text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition"
                title="Insert Arrow (→)"
              >
                →
              </button>
            </div>
          )}

          {/* Block Reorder & Delete */}
          {index > 0 && (
            <button
              onClick={() => onMoveUp(index)}
              className="p-1 rounded text-[#71717A] hover:text-white hover:bg-[#27272A] transition cursor-pointer"
              title="Move Up"
            >
              <MoveUp className="w-3 h-3" />
            </button>
          )}
          {index < totalBlocks - 1 && (
            <button
              onClick={() => onMoveDown(index)}
              className="p-1 rounded text-[#71717A] hover:text-white hover:bg-[#27272A] transition cursor-pointer"
              title="Move Down"
            >
              <MoveDown className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={() => onDelete(block.id)}
            className="p-1 rounded text-[#71717A] hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
            title="Delete Block"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

        {/* Text Blocks */}
        {isTextBlock && (
          <div className="relative">
            {/* Visual list badges in editor */}
            {block.type === "bullet-list" && (
              <div className="absolute left-0 top-0 w-6 flex flex-col items-center pt-[7px] text-[#71717A] pointer-events-none">
                {block.content.split("\n").map((_, i) => (
                  <div key={i} className="h-[1.8em] flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>
                ))}
              </div>
            )}

            {block.type === "numbered-list" && (
              <div className="absolute left-0 top-0 w-6 flex flex-col items-center pt-[4px] text-[#71717A] pointer-events-none font-mono text-xs">
                {block.content.split("\n").map((_, i) => (
                  <div key={i} className="h-[1.8em] flex items-center">
                    <span className="w-4 h-4 rounded bg-white/10 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <textarea
              id={textareaId}
              ref={textRef}
              value={block.content}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              onInput={handleTextInput}
              onFocus={autoResize}
              placeholder={placeholders[block.type] || "Type here..."}
              className={`w-full bg-transparent resize-none outline-none placeholder-[#52525B] overflow-hidden ${
                textStyles[block.type] || ""
              } ${
                block.type === "bullet-list" || block.type === "numbered-list" ? "pl-8" : ""
              }`}
              rows={1}
            />
          </div>
        )}

        {/* Callout Block */}
        {block.type === "callout" && (
          <CalloutBlock
            block={block}
            onChange={(updates) => onUpdate(block.id, updates)}
          />
        )}

        {/* Image / Graphic Block */}
        {block.type === "image" && (
          <ImageBlock
            block={block}
            onChange={(meta) => onUpdate(block.id, { meta })}
            onAddAnotherGraphic={() => onAdd(index, "image")}
          />
        )}

        {/* Code Block */}
        {block.type === "code" && (
          <div className="my-2 rounded-xl border border-[#27272A] bg-[#0E0E0E] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-[#18181B]/60 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-[#71717A]" />
                <input
                  type="text"
                  value={block.meta?.language || ""}
                  onChange={(e) =>
                    onUpdate(block.id, {
                      meta: { ...block.meta, language: e.target.value },
                    })
                  }
                  placeholder="language (typescript, python, css...)"
                  className="bg-transparent text-xs text-[#A1A1AA] font-mono outline-none w-48 placeholder-[#52525B]"
                />
              </div>
            </div>
            <textarea
              value={block.content}
              onChange={(e) => onUpdate(block.id, { content: e.target.value })}
              placeholder="Paste or write code here..."
              className="w-full bg-transparent p-4 text-xs sm:text-sm font-mono text-[#E4E4E7] outline-none resize-none min-h-[120px] placeholder-[#52525B]"
            />
          </div>
        )}

        {/* Separator */}
        {block.type === "separator" && (
          <div className="my-6 flex items-center justify-center">
            <div className="flex items-center gap-3 text-[#52525B]">
              <span className="h-px w-16 bg-[#27272A]" />
              <span className="text-xs tracking-[0.3em] uppercase">✦ ✦ ✦</span>
              <span className="h-px w-16 bg-[#27272A]" />
            </div>
          </div>
        )}

        {/* Raw (Quiz) Block */}
        {block.type === "raw" && (
          <div className="my-3 rounded-xl border border-[#27272A] bg-[#18181B] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-[#121214] border-b border-[#27272A]">
              <div className="flex items-center gap-2 text-purple-300">
                <HelpCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">Interactive Reader Quiz</span>
              </div>
            </div>
            <textarea
              value={block.content}
              onChange={(e) => onUpdate(block.id, { content: e.target.value })}
              className="w-full bg-transparent p-4 text-xs font-mono text-[#A1A1AA] outline-none resize-none min-h-[100px]"
            />
          </div>
        )}
      </div>

      {/* In-Between "+" Button to Add Block at Exact Position */}
      <div className="relative h-4 -my-1">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 z-10 transition-opacity">
          <div className="relative">
            <button
              className="flex items-center justify-center w-6 h-6 rounded-full bg-[#18181B] hover:bg-white text-[#71717A] hover:text-black border border-[#27272A] hover:border-white transition-all shadow-md cursor-pointer"
              onClick={() => setAddMenuOpen(!addMenuOpen)}
              title="Insert block at this position"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            {addMenuOpen && (
              <AddBlockMenu
                onSelect={(type) => onAdd(index, type)}
                onClose={() => setAddMenuOpen(false)}
                onInsertImage={onInsertImageModal}
                onInsertQuiz={onInsertQuizModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Editor Component ───────────────────────────────────

const RichBlockEditor = forwardRef<RichBlockEditorRef, RichBlockEditorProps>(
  ({ content, onChange, onInsertImageModal, onInsertQuizModal }, ref) => {
    const [blocks, setBlocks] = useState<EditorBlock[]>(() => parseMarkdownToBlocks(content));
    const lastExternalContent = useRef(content);
    const isInternalChange = useRef(false);

    // Expose methods to insert content from modals or toolbar
    useImperativeHandle(ref, () => ({
      insertMarkdownAtEnd: (markdown: string) => {
        const newBlocks = parseMarkdownToBlocks(markdown);
        setBlocks((prev) => {
          const combined = [...prev, ...newBlocks];
          const md = convertBlocksToMarkdown(combined);
          isInternalChange.current = true;
          onChange(md);
          return combined;
        });
      },
      insertBlockAtEnd: (type: BlockType, blockContent = "", meta?: any) => {
        const newBlock: EditorBlock = {
          id: generateId(),
          type,
          content: blockContent,
          meta,
        };
        setBlocks((prev) => {
          const combined = [...prev, newBlock];
          const md = convertBlocksToMarkdown(combined);
          isInternalChange.current = true;
          onChange(md);
          return combined;
        });
      },
    }));

    // Sync with external content changes (e.g., when editing a post)
    useEffect(() => {
      if (isInternalChange.current) {
        isInternalChange.current = false;
        return;
      }
      if (content !== lastExternalContent.current) {
        lastExternalContent.current = content;
        setBlocks(parseMarkdownToBlocks(content));
      }
    }, [content]);

    const notifyChange = useCallback(
      (newBlocks: EditorBlock[]) => {
        const md = convertBlocksToMarkdown(newBlocks);
        lastExternalContent.current = md;
        isInternalChange.current = true;
        onChange(md);
      },
      [onChange]
    );

    const updateBlock = useCallback(
      (id: string, updates: Partial<EditorBlock>) => {
        setBlocks((prev) => {
          const newBlocks = prev.map((b) => (b.id === id ? { ...b, ...updates } : b));
          notifyChange(newBlocks);
          return newBlocks;
        });
      },
      [notifyChange]
    );

    const addBlock = useCallback(
      (afterIndex: number, type: BlockType = "paragraph") => {
        const newBlock: EditorBlock = {
          id: generateId(),
          type,
          content: "",
          meta: type === "code" ? { language: "typescript" } : undefined,
        };
        setBlocks((prev) => {
          const newBlocks = [...prev];
          newBlocks.splice(afterIndex + 1, 0, newBlock);
          notifyChange(newBlocks);
          return newBlocks;
        });

        // Focus the new block
        setTimeout(() => {
          const el = document.getElementById(`block-${newBlock.id}`) as HTMLTextAreaElement;
          if (el) el.focus();
        }, 50);
      },
      [notifyChange]
    );

    const deleteBlock = useCallback(
      (id: string) => {
        setBlocks((prev) => {
          if (prev.length <= 1) {
            const reset = [{ id: generateId(), type: "paragraph" as BlockType, content: "" }];
            notifyChange(reset);
            return reset;
          }
          const idx = prev.findIndex((b) => b.id === id);
          const newBlocks = prev.filter((b) => b.id !== id);
          notifyChange(newBlocks);
          if (idx > 0) {
            setTimeout(() => {
              const el = document.getElementById(`block-${prev[idx - 1].id}`) as HTMLTextAreaElement;
              if (el) {
                el.focus();
                el.setSelectionRange(el.value.length, el.value.length);
              }
            }, 50);
          }
          return newBlocks;
        });
      },
      [notifyChange]
    );

    const moveBlock = useCallback(
      (fromIndex: number, toIndex: number) => {
        setBlocks((prev) => {
          const newBlocks = [...prev];
          const [moved] = newBlocks.splice(fromIndex, 1);
          newBlocks.splice(toIndex, 0, moved);
          notifyChange(newBlocks);
          return newBlocks;
        });
      },
      [notifyChange]
    );

    const handleQuickInsertSymbol = (symbol: string) => {
      // Find the last or focused block
      const lastIndex = blocks.length - 1;
      const lastBlock = blocks[lastIndex];
      if (lastBlock && ["paragraph", "bullet-list", "numbered-list"].includes(lastBlock.type)) {
        insertSymbolInTextarea(`block-${lastBlock.id}`, symbol + " ", (updated) => {
          updateBlock(lastBlock.id, { content: updated });
        });
      } else {
        addBlock(lastIndex, "paragraph");
        setTimeout(() => {
          const newBlock = blocks[blocks.length - 1];
          if (newBlock) {
            insertSymbolInTextarea(`block-${newBlock.id}`, symbol + " ", (updated) => {
              updateBlock(newBlock.id, { content: updated });
            });
          }
        }, 100);
      }
    };

    return (
      <div className="w-full min-h-[550px] bg-[#09090B] rounded-2xl border border-[#27272A] overflow-hidden flex flex-col font-sans shadow-xl">
        {/* Editor Top Bar: Symbols & Quick Block Inserters */}
        <div className="p-3 bg-[#121214] border-b border-[#27272A] space-y-2 sticky top-14 z-30 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Quick Block Adders */}
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => addBlock(blocks.length - 1, "image")}
                className="px-2.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-[#E4E4E7] transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Insert a standalone graphic/image (no text required)"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>+ Graphic</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock(blocks.length - 1, "bullet-list")}
                className="px-2.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#E4E4E7] text-xs font-medium border border-[#27272A] transition flex items-center gap-1.5 cursor-pointer"
                title="Insert bullet points list"
              >
                <List className="w-3.5 h-3.5 text-white" />
                <span>Bullet Points</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock(blocks.length - 1, "numbered-list")}
                className="px-2.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#E4E4E7] text-xs font-medium border border-[#27272A] transition flex items-center gap-1.5 cursor-pointer"
                title="Insert counting numbered list"
              >
                <ListOrdered className="w-3.5 h-3.5 text-white" />
                <span>1. 2. 3. Counting</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock(blocks.length - 1, "callout")}
                className="px-2.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#E4E4E7] text-xs font-medium border border-[#27272A] transition flex items-center gap-1.5 cursor-pointer"
                title="Insert callout effect box"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Callout Box</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock(blocks.length - 1, "heading2")}
                className="px-2.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#E4E4E7] text-xs font-medium border border-[#27272A] transition flex items-center gap-1.5 cursor-pointer"
                title="Insert heading"
              >
                <Heading2 className="w-3.5 h-3.5 text-white" />
                <span>Heading</span>
              </button>

              <button
                type="button"
                onClick={() => addBlock(blocks.length - 1, "separator")}
                className="px-2.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#E4E4E7] text-xs font-medium border border-[#27272A] transition flex items-center gap-1 cursor-pointer"
                title="Insert section divider"
              >
                <span className="text-xs">✦ ✦ ✦</span>
              </button>
            </div>

            {/* External Modal Triggers */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onInsertImageModal}
                className="px-2.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white text-xs font-medium border border-[#27272A] transition flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Upload Media</span>
              </button>

              <button
                type="button"
                onClick={onInsertQuizModal}
                className="px-2.5 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-white text-xs font-medium border border-[#27272A] transition flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Insert Quiz</span>
              </button>
            </div>
          </div>

          {/* Quick Symbols Tray */}
          <div className="flex items-center gap-1 overflow-x-auto py-0.5 no-scrollbar text-xs">
            <span className="text-[11px] font-medium text-[#71717A] mr-1 flex-shrink-0">
              Symbols:
            </span>
            {QUICK_SYMBOLS.map(({ symbol, label }) => (
              <button
                key={symbol}
                type="button"
                onClick={() => handleQuickInsertSymbol(symbol)}
                className="px-2 py-0.5 rounded-md bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#E4E4E7] hover:text-white text-xs font-mono transition flex-shrink-0 cursor-pointer"
                title={`Insert ${label} (${symbol})`}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Body */}
        <div className="flex-1 p-6 sm:p-10 pl-14 sm:pl-18 max-w-4xl w-full mx-auto space-y-4">
          {blocks.map((block, index) => (
            <BlockRow
              key={block.id}
              block={block}
              index={index}
              totalBlocks={blocks.length}
              onUpdate={updateBlock}
              onAdd={addBlock}
              onDelete={deleteBlock}
              onMoveUp={(i) => moveBlock(i, i - 1)}
              onMoveDown={(i) => moveBlock(i, i + 1)}
              onInsertImageModal={onInsertImageModal}
              onInsertQuizModal={onInsertQuizModal}
            />
          ))}

          {/* Bottom Add Graphic / Block Card */}
          <div className="mt-8 pt-6 border-t border-[#27272A] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => addBlock(blocks.length - 1, "paragraph")}
              className="p-4 rounded-xl border border-dashed border-[#27272A] hover:border-white/40 hover:bg-[#18181B]/40 text-center transition cursor-pointer group"
            >
              <Type className="w-5 h-5 mx-auto mb-1.5 text-[#71717A] group-hover:text-white transition" />
              <div className="text-xs font-medium text-white">Add Paragraph</div>
              <div className="text-[10px] text-[#71717A]">Normal article text</div>
            </button>

            <button
              onClick={() => addBlock(blocks.length - 1, "image")}
              className="p-4 rounded-xl border border-dashed border-[#27272A] hover:border-emerald-500/40 hover:bg-emerald-500/5 text-center transition cursor-pointer group"
            >
              <ImageIcon className="w-5 h-5 mx-auto mb-1.5 text-emerald-400 group-hover:scale-110 transition" />
              <div className="text-xs font-medium text-emerald-300">Add Graphic / Image</div>
              <div className="text-[10px] text-[#71717A]">Standalone visual without text</div>
            </button>

            <button
              onClick={() => addBlock(blocks.length - 1, "callout")}
              className="p-4 rounded-xl border border-dashed border-[#27272A] hover:border-amber-500/40 hover:bg-amber-500/5 text-center transition cursor-pointer group"
            >
              <Lightbulb className="w-5 h-5 mx-auto mb-1.5 text-amber-400 group-hover:scale-110 transition" />
              <div className="text-xs font-medium text-amber-300">Add Callout Effect</div>
              <div className="text-[10px] text-[#71717A]">Key takeaway or pro tip</div>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

RichBlockEditor.displayName = "RichBlockEditor";
export default RichBlockEditor;
