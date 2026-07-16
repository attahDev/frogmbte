// @ts-nocheck
import React, { useEffect, useState } from "react";

const STEPS = [
  { label: "Analysing your input", duration: 3000 },
  { label: "Structuring 12 slides", duration: 5000 },
  { label: "Writing investor-ready content", duration: 7000 },
  { label: "Fetching images", duration: 4000 },
  { label: "Building your PPTX file", duration: 3000 },
  { label: "Finalising deck", duration: 2000 },
];

export default function GeneratingState({ status, error }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setElapsed((e) => e + 100), 100);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    let cumulative = 0;
    for (let i = 0; i < STEPS.length; i++) {
      cumulative += STEPS[i].duration;
      if (elapsed < cumulative) { setStepIndex(i); break; }
    }
  }, [elapsed]);

  if (error) {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-[#E0E5EC] bg-white p-8 text-center">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-red-300 bg-red-50 text-xl text-red-600">
          ✕
        </div>
        <h3 className="text-lg font-bold text-[#001F3F]">Generation Failed</h3>
        <p className="text-sm text-red-600">{error}</p>
        <p className="text-xs text-[#8A94A6]">Please try again or adjust your input.</p>
      </div>
    );
  }

  const TOTAL_MS = STEPS.reduce((s, x) => s + x.duration, 0);
  const progressPct = status === "done" ? 100 : Math.min((elapsed / TOTAL_MS) * 100, 95);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-7 rounded-2xl border border-[#E0E5EC] bg-white p-8">
      <div className="relative flex h-[100px] w-[100px] items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[70px] w-[70px] animate-ping rounded-full border border-[#001F3F]/20" style={{ animationDuration: "2.5s" }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[90px] w-[90px] animate-ping rounded-full border border-[#001F3F]/15" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
        </div>
        <div className="relative z-10 flex h-[52px] w-[52px] animate-pulse items-center justify-center rounded-full bg-[#001F3F] shadow-[0_0_40px_rgba(0,31,63,0.3)]">
          <div className="h-5 w-5 rounded-full bg-[#FFD700] opacity-90" />
        </div>
      </div>

      <h3 className="text-center text-lg font-bold text-[#001F3F]">
        {status === "done" ? "Deck Ready" : "Building your deck"}
      </h3>

      <div className="flex w-full flex-col gap-2.5">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 text-sm transition-colors ${
              i < stepIndex
                ? "text-[#1A8F5E]"
                : i === stepIndex
                  ? "font-medium text-[#001F3F]"
                  : "text-[#B7C0CF]"
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full bg-current ${
                i === stepIndex ? "animate-pulse shadow-[0_0_8px_currentColor]" : ""
              }`}
            />
            <span>{step.label}</span>
          </div>
        ))}
      </div>

      <div className="flex w-full items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#E0E5EC]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#001F3F] to-[#FFD700] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="min-w-[32px] text-right font-mono text-xs text-[#8A94A6]">
          {Math.round(progressPct)}%
        </span>
      </div>
    </div>
  );
}
