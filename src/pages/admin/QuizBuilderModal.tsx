// src/pages/admin/QuizBuilderModal.tsx
import { useState } from "react";
import { X, Plus, Trash2, CheckCircle2, Eye, HelpCircle } from "lucide-react";
import { QuizQuestion } from "@/lib/blogStorage";
import InteractiveQuiz from "@/components/blog/InteractiveQuiz";

interface QuizBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (quizMarkdown: string) => void;
}

export default function QuizBuilderModal({
  isOpen,
  onClose,
  onInsert,
}: QuizBuilderModalProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);
  const [correctIndex, setCorrectIndex] = useState<number>(0);
  const [explanation, setExplanation] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddOption = () => {
    if (options.length >= 6) return;
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const next = options.filter((_, i) => i !== index);
    setOptions(next);
    if (correctIndex >= next.length) {
      setCorrectIndex(0);
    }
  };

  const handleOptionTextChange = (index: number, text: string) => {
    const next = [...options];
    next[index] = text;
    setOptions(next);
  };

  const handleSave = () => {
    if (!question.trim()) {
      setError("Please enter a question prompt.");
      return;
    }

    const cleanedOptions = options.map((o) => o.trim()).filter(Boolean);
    if (cleanedOptions.length < 2) {
      setError("Please provide at least 2 non-empty options.");
      return;
    }

    const quizPayload: QuizQuestion = {
      id: "q_" + Date.now().toString(36),
      question: question.trim(),
      options: cleanedOptions,
      correctIndex: Math.min(correctIndex, cleanedOptions.length - 1),
      explanation: explanation.trim() || undefined,
    };

    const quizMarkdown = `\n\n:::quiz\n${JSON.stringify(
      quizPayload,
      null,
      2
    )}\n:::\n\n`;

    onInsert(quizMarkdown);
    setQuestion("");
    setOptions(["Option 1", "Option 2", "Option 3", "Option 4"]);
    setCorrectIndex(0);
    setExplanation("");
    setError(null);
    onClose();
  };

  const previewQuizData: QuizQuestion = {
    id: "preview-quiz",
    question: question.trim() || "Sample Question Prompt?",
    options: options.map((o) => o.trim() || "Option"),
    correctIndex: correctIndex,
    explanation: explanation.trim() || "Sample explanation.",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#121214] border border-[#27272A] rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#27272A]">
          <div>
            <h2 className="text-sm font-semibold text-white">
              Insert Interactive Quiz
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Embed an interactive knowledge check at your current cursor position
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between pb-2 border-b border-[#27272A]">
            <span className="text-xs font-medium text-[#A1A1AA]">
              {showPreview ? "Live Preview" : "Question Details"}
            </span>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition px-2.5 py-1 rounded-md bg-[#18181B] border border-[#27272A]"
            >
              <Eye className="w-3.5 h-3.5" />
              {showPreview ? "Back to Edit" : "Preview Widget"}
            </button>
          </div>

          {showPreview ? (
            <div className="py-2">
              <InteractiveQuiz quiz={previewQuizData} />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Question Text */}
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] mb-1.5">
                  Question Prompt <span className="text-rose-400">*</span>
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. What is the primary benefit of Edge Rendering over origin SSR?"
                  rows={3}
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] p-3 text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition resize-none leading-relaxed"
                />
              </div>

              {/* Options */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-[#A1A1AA]">
                    Answer Options (Click circle to set correct answer)
                  </label>
                  {options.length < 6 && (
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="flex items-center gap-1 text-xs text-[#A1A1AA] hover:text-white transition"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Option
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {options.map((opt, idx) => {
                    const isCorrect = correctIndex === idx;
                    const letter = String.fromCharCode(65 + idx);

                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border transition ${
                          isCorrect
                            ? "bg-emerald-950/20 border-emerald-500/40"
                            : "bg-[#18181B] border-[#27272A]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setCorrectIndex(idx)}
                          className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-medium flex-shrink-0 transition ${
                            isCorrect
                              ? "bg-emerald-500 text-black border-emerald-400 font-bold"
                              : "bg-[#27272A] border-[#3F3F46] text-[#A1A1AA] hover:text-white"
                          }`}
                          title="Mark as correct answer"
                        >
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : letter}
                        </button>

                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            handleOptionTextChange(idx, e.target.value)
                          }
                          placeholder={`Option ${letter}`}
                          className="flex-1 bg-transparent px-2 text-sm text-white focus:outline-none placeholder-[#71717A]"
                        />

                        {isCorrect && (
                          <span className="text-[10px] font-semibold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 uppercase tracking-wider">
                            Correct
                          </span>
                        )}

                        {options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(idx)}
                            className="p-1 text-[#71717A] hover:text-rose-400 transition"
                            title="Remove option"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-[#A1A1AA] mb-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#71717A]" />
                  Explanation / Solution Note (Optional)
                </label>
                <textarea
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain why this option is correct to provide extra context to readers..."
                  rows={2}
                  className="w-full rounded-lg bg-[#18181B] border border-[#27272A] p-3 text-sm text-white placeholder-[#71717A] focus:border-white/40 focus:outline-none transition resize-none leading-relaxed"
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
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-[#E4E4E7] transition"
          >
            Insert Quiz Widget
          </button>
        </div>
      </div>
    </div>
  );
}
