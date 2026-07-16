// @ts-nocheck
import React from "react";

const MODES = [
  {
    id: "quick",
    label: "Quick Idea",
    icon: "⚡",
    desc: "One sentence — AI builds the rest",
  },
  {
    id: "structured",
    label: "Structured",
    icon: "◈",
    desc: "Fill in each section yourself",
  },
  {
    id: "raw",
    label: "Raw Notes",
    icon: "◎",
    desc: "Paste anything — AI structures it",
  },
];

export default function ModeSelector({ active, onChange }) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          className={`flex flex-col items-start gap-1 rounded-2xl border p-4 text-left transition ${
            active === mode.id
              ? "border-[#001F3F] bg-[#001F3F]/5 shadow-[0_0_0_1px_rgba(0,31,63,0.15)]"
              : "border-[#E0E5EC] bg-white hover:border-[#001F3F]/25 hover:bg-[#F4F6F9]"
          }`}
          onClick={() => onChange(mode.id)}
          type="button"
        >
          <span
            className={`text-lg leading-none ${
              active === mode.id ? "text-[#001F3F]" : "text-[#8A94A6]"
            }`}
          >
            {mode.icon}
          </span>
          <span
            className={`text-[13px] font-bold tracking-wide ${
              active === mode.id ? "text-[#001F3F]" : "text-[#1A2332]"
            }`}
          >
            {mode.label}
          </span>
          <span className="text-[11px] leading-snug text-[#B7C0CF]">{mode.desc}</span>
        </button>
      ))}
    </div>
  );
}
