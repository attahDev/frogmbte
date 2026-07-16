// @ts-nocheck
import React from "react";

export default function ThemePicker({ selected, onChange, themes, variant = "light" }) {
  if (!themes || themes.length === 0) return null;
  const dark = variant === "dark";

  return (
    <div className="flex flex-col gap-2.5">
      <label
        className={`text-xs font-semibold uppercase tracking-[0.07em] ${
          dark ? "text-white/55" : "text-[#8A94A6]"
        }`}
      >
        Theme
      </label>
      <div className="flex flex-wrap gap-2">
        {themes.map((t) => {
          const active = selected === t.id;
          return (
            <button
              key={t.id}
              type="button"
              className={`flex min-w-[64px] flex-col items-center gap-1.5 rounded-xl border px-2.5 py-2 transition ${
                dark
                  ? active
                    ? "border-[#FFD700] bg-white/10"
                    : "border-white/20 hover:border-white/30"
                  : active
                    ? "border-[#001F3F] bg-[#001F3F]/5"
                    : "border-[#E0E5EC] bg-white hover:border-[#001F3F]/25"
              }`}
              onClick={() => onChange(t.id)}
              title={t.description}
            >
              <span
                className={`relative block h-6 w-9 overflow-hidden rounded border-2 ${
                  dark ? "border-white/20" : ""
                }`}
                style={{ background: t.bg_color, borderColor: t.accent_color }}
              >
                <span
                  className="absolute bottom-0 left-0 right-0 block h-1.5"
                  style={{ background: t.accent_color }}
                />
              </span>
              <span
                className={`text-[11px] font-mono ${
                  dark
                    ? active
                      ? "font-semibold text-[#FFD700]"
                      : "text-white/70"
                    : active
                      ? "font-semibold text-[#001F3F]"
                      : "text-[#8A94A6]"
                }`}
              >
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
