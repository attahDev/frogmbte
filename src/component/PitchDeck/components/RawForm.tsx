// @ts-nocheck
import React from "react";

const labelClass =
  "mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.07em] text-white/55";
const inputClass =
  "w-full rounded-[10px] border border-white/12 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#FFD700] focus:bg-white/10";

export default function RawForm({ values, onChange }) {
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
          Your Raw Notes
          <span className="text-[11px] font-normal normal-case tracking-normal text-white/40">
            Dump everything — bullet points, paragraphs, half-ideas. AI will structure it.
          </span>
        </label>
        <textarea
          className={`${inputClass} min-h-[220px] resize-y`}
          placeholder={`Paste anything here. For example:\n\n- Want to help farmers sell directly\n- Big problem is middlemen taking too much\n- Tested in Lagos and Kano\n- 200 farmers signed up so far\n- Made $12k GMV in pilot\n- Team is 4 people, 2 engineers\n- Need $500k to expand to 3 more states...`}
          value={values.notes || ""}
          onChange={(e) => onChange({ ...values, notes: e.target.value })}
          rows={12}
        />
      </div>
    </div>
  );
}
