// @ts-nocheck
import React from "react";

const FIELDS = [
  { key: "title", label: "Deck Title", placeholder: "e.g. AgriConnect", type: "input" },
  { key: "problem", label: "The Problem", placeholder: "What pain point does your startup solve?", type: "textarea" },
  { key: "solution", label: "Your Solution", placeholder: "What are you building to solve it?", type: "textarea" },
  { key: "market", label: "Market Size", placeholder: "Who are your customers? How big is the market?", type: "textarea" },
  { key: "business_model", label: "Business Model", placeholder: "How do you make money?", type: "textarea" },
  { key: "traction", label: "Traction (Optional)", placeholder: "Any early users, revenue, pilots, or partnerships?", type: "textarea", optional: true },
  { key: "team", label: "The Team", placeholder: "Who are the founders? Key roles and backgrounds.", type: "textarea" },
  { key: "ask", label: "The Ask", placeholder: "How much are you raising and how will you use it?", type: "textarea" },
];

const labelClass =
  "mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.07em] text-white/55";
const inputClass =
  "w-full rounded-[10px] border border-white/12 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#FFD700] focus:bg-white/10";

export default function StructuredForm({ values, onChange }) {
  const update = (key, val) => onChange({ ...values, [key]: val });

  return (
    <div className="flex flex-col gap-4">
      {FIELDS.map((f) => (
        <div className="flex flex-col gap-1.5" key={f.key}>
          <label className={labelClass}>
            {f.label}
            {f.optional && (
              <span className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-normal uppercase tracking-[0.06em] text-white/50">
                optional
              </span>
            )}
          </label>
          {f.type === "input" ? (
            <input
              className={inputClass}
              type="text"
              placeholder={f.placeholder}
              value={values[f.key] || ""}
              onChange={(e) => update(f.key, e.target.value)}
            />
          ) : (
            <textarea
              className={`${inputClass} min-h-[80px] resize-y`}
              placeholder={f.placeholder}
              value={values[f.key] || ""}
              onChange={(e) => update(f.key, e.target.value)}
              rows={3}
            />
          )}
        </div>
      ))}
    </div>
  );
}
