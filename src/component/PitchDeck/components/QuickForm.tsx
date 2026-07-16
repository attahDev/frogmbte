// @ts-nocheck
import React from "react";

const labelClass =
  "mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.07em] text-white/55";
const inputClass =
  "w-full rounded-[10px] border border-white/12 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#FFD700] focus:bg-white/10";

export default function QuickForm({ values, onChange }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>Deck Title</label>
        <input
          className={inputClass}
          type="text"
          placeholder="e.g. AgriConnect"
          value={values.title || ""}
          onChange={(e) => onChange({ ...values, title: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass}>
          Your Business Idea
          <span className="text-[11px] font-normal normal-case tracking-normal text-white/40">
            1–3 sentences. AI handles the rest.
          </span>
        </label>
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder="e.g. A mobile marketplace connecting smallholder farmers in West Africa directly to buyers, cutting out middlemen and increasing farmer income by up to 40%."
          value={values.idea || ""}
          onChange={(e) => onChange({ ...values, idea: e.target.value })}
          rows={5}
        />
      </div>
    </div>
  );
}
