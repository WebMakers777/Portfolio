// src/pages/admin/ImageUploadModal.tsx
import { useState, useRef } from "react";
import { X, Upload, Link2, Check, AlignCenter, Maximize2, AlignLeft, AlignRight } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (imageMarkdown: string) => void;
}

type ImageAlignment = "center" | "wide" | "left" | "right";

export default function ImageUploadModal({
  isOpen,
  onClose,
  onInsert,
}: ImageUploadModalProps) {
  const [activeTab, setActiveTab] = useState<"url" | "upload">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [alignment, setAlignment] = useState<ImageAlignment>("center");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (PNG, JPG, WebP, SVG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image file size should be under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewSrc(result);
      setImageUrl(result);
      if (!altText) {
        setAltText(file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    setPreviewSrc(url);
  };

  const handleInsert = () => {
    const src = previewSrc || imageUrl.trim();
    if (!src) {
      toast.error("Please provide an image URL or upload a file.");
      return;
    }

    const baseAlt = altText.trim() || "Article Visual";
    const formattedAlt = alignment === "center" ? baseAlt : `${baseAlt}|${alignment}`;
    const cap = caption.trim();

    const markdown = cap
      ? `\n\n![${formattedAlt}](${src} "${cap}")\n\n`
      : `\n\n![${formattedAlt}](${src})\n\n`;

    onInsert(markdown);
    setImageUrl("");
    setAltText("");
    setCaption("");
    setAlignment("center");
    setPreviewSrc(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#121214] border border-[#27272A] rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272A]">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Insert Media & Visuals
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Place images in-between paragraphs with custom sizing & text wrapping
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-[#18181B] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#27272A] px-6 pt-3 gap-6 bg-[#18181B]/40">
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`pb-3 text-xs font-medium flex items-center gap-1.5 border-b-2 transition ${
              activeTab === "url"
                ? "border-white text-white font-semibold"
                : "border-transparent text-[#71717A] hover:text-white"
            }`}
          >
            <Link2 className="w-3.5 h-3.5" /> Web Image URL
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`pb-3 text-xs font-medium flex items-center gap-1.5 border-b-2 transition ${
              activeTab === "upload"
                ? "border-white text-white font-semibold"
                : "border-transparent text-[#71717A] hover:text-white"
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Upload File
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {activeTab === "url" ? (
            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                Image URL <span className="text-rose-400">*</span>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3.5 py-2 text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                Upload File (Max 5MB)
              </label>
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
                className="w-full border border-dashed border-[#27272A] hover:border-white/40 rounded-xl p-6 text-center bg-[#18181B]/50 hover:bg-[#18181B] transition group cursor-pointer"
              >
                <Upload className="w-6 h-6 mx-auto text-[#71717A] group-hover:text-white mb-2 transition" />
                <p className="text-xs font-medium text-white/90">
                  Click to select image file
                </p>
                <p className="text-[11px] text-[#71717A] mt-1">
                  Supports PNG, JPG, WebP, SVG
                </p>
              </button>
            </div>
          )}

          {/* Alignment / Layout Option */}
          <div>
            <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
              Placement & Alignment
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setAlignment("center")}
                className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition ${
                  alignment === "center"
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white"
                }`}
              >
                <AlignCenter className="w-4 h-4" />
                <span>Centered</span>
              </button>

              <button
                type="button"
                onClick={() => setAlignment("wide")}
                className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition ${
                  alignment === "wide"
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white"
                }`}
              >
                <Maximize2 className="w-4 h-4" />
                <span>Full Wide</span>
              </button>

              <button
                type="button"
                onClick={() => setAlignment("left")}
                className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition ${
                  alignment === "left"
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white"
                }`}
              >
                <AlignLeft className="w-4 h-4" />
                <span>Float Left</span>
              </button>

              <button
                type="button"
                onClick={() => setAlignment("right")}
                className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition ${
                  alignment === "right"
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-[#18181B] border-[#27272A] text-[#A1A1AA] hover:text-white"
                }`}
              >
                <AlignRight className="w-4 h-4" />
                <span>Float Right</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                Alt Description
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Architecture Flow"
                className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1">
                Caption (Optional)
              </label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Figure 1 — Edge Network"
                className="w-full rounded-lg bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs sm:text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition"
              />
            </div>
          </div>

          {previewSrc && (
            <div>
              <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                Preview
              </label>
              <div className="rounded-lg overflow-hidden border border-[#27272A] max-h-40 bg-black/40 flex items-center justify-center p-2">
                <img
                  src={previewSrc}
                  alt="Preview"
                  className="max-h-36 max-w-full object-contain rounded-md"
                  onError={() => toast.error("Could not load preview. Check URL.")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-[#27272A] bg-[#18181B]/50">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg text-xs font-medium text-[#A1A1AA] hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleInsert}
            disabled={!previewSrc && !imageUrl.trim()}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-[#E4E4E7] transition disabled:opacity-40 flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Insert Media
          </button>
        </div>
      </div>
    </div>
  );
}
