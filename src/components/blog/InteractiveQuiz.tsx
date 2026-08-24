// src/components/blog/InteractiveQuiz.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RefreshCw, HelpCircle, Check } from "lucide-react";
import { QuizQuestion } from "@/lib/blogStorage";

interface InteractiveQuizProps {
  quiz: QuizQuestion;
}

export default function InteractiveQuiz({ quiz }: InteractiveQuizProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect = selectedOption === quiz.correctIndex;

  const handleSelect = (index: number) => {
    if (isSubmitted && isCorrect) return;
    setSelectedOption(index);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 sm:my-10 rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden bg-[#0D0D0D] shadow-2xl w-full ${
        isSubmitted
          ? isCorrect
            ? "border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.06)]"
            : "border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.06)]"
          : "border-white/[0.09] hover:border-white/[0.18]"
      }`}
    >
      {/* Top Tag Header */}
      <div className="flex items-center justify-between px-4 sm:px-7 py-3 sm:py-3.5 border-b border-white/[0.06] bg-white/[0.015]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-[#94A3B8]">
            Interactive Case Query
          </span>
        </div>

        {isSubmitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] sm:text-xs font-mono text-[#94A3B8] hover:text-white transition px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="p-4 sm:p-7 md:p-8">
        {/* Question Prompt */}
        <h3 className="text-base sm:text-lg font-sans font-semibold text-white mb-5 sm:mb-6 leading-snug tracking-tight">
          {quiz.question}
        </h3>

        {/* Options List */}
        <div className="space-y-2.5 sm:space-y-3">
          {quiz.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isThisCorrect = idx === quiz.correctIndex;

            let cardStyle = "border-white/[0.07] bg-white/[0.02] text-[#CBD5E1] hover:bg-white/[0.05] hover:border-white/[0.16] hover:text-white";
            let badgeStyle = "border-white/[0.14] text-white/60 bg-white/[0.03]";

            if (isSubmitted) {
              if (isSelected && isCorrect) {
                cardStyle = "border-emerald-500/50 bg-emerald-950/25 text-white font-medium";
                badgeStyle = "bg-emerald-500 text-black border-emerald-400 font-bold";
              } else if (isSelected && !isCorrect) {
                cardStyle = "border-rose-500/40 bg-rose-950/25 text-white/90 line-through";
                badgeStyle = "bg-rose-500 text-white border-rose-400 font-bold";
              } else if (isThisCorrect && !isCorrect) {
                cardStyle = "border-emerald-500/40 bg-emerald-950/15 text-emerald-200";
                badgeStyle = "border-emerald-400 text-emerald-300 bg-emerald-500/10 font-bold";
              }
            } else if (isSelected) {
              cardStyle = "border-white/50 bg-white/[0.08] text-white";
              badgeStyle = "bg-white text-black border-white font-bold";
            }

            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 flex items-start gap-3 sm:gap-4 group cursor-pointer ${cardStyle}`}
              >
                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border flex items-center justify-center font-mono text-xs flex-shrink-0 transition-colors mt-0.5 ${badgeStyle}`}
                >
                  {isSubmitted && isThisCorrect && (isSelected || !isCorrect) ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    letter
                  )}
                </div>

                <div className="flex-1 text-xs sm:text-[15px] leading-relaxed pt-0.5 font-light">
                  {option}
                </div>

                {isSubmitted && isSelected && (
                  <div className="flex-shrink-0 pt-0.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Explanation Card */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 sm:mt-7 overflow-hidden"
            >
              <div
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${
                  isCorrect
                    ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-100"
                    : "bg-white/[0.02] border-white/[0.08] text-[#E2E8F0]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.16em] text-emerald-400">
                        Correct Analysis
                      </span>
                    </>
                  ) : (
                    <>
                      <HelpCircle className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#94A3B8]">
                        Solution Analysis
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-light">
                  {quiz.explanation ||
                    (isCorrect
                      ? "Your selection accurately reflects the architectural principle."
                      : "Review the highlighted correct choice above.")}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
