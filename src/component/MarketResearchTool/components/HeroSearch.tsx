// @ts-nocheck
import { useState, useEffect } from 'react'
import { Search, Sparkles } from 'lucide-react'

const CHIPS = [
  { emoji: '🌿', label: 'Sustainable Fashion Africa' },
  { emoji: '⚡', label: 'EV Market Nigeria' },
  { emoji: '🏦', label: 'Fintech West Africa' },
  { emoji: '🤖', label: 'AI SaaS Trends' },
  { emoji: '🎓', label: 'EdTech Growth' },
]

export default function HeroSearch({ onSubmit, defaultQuery = '', disabled }) {
  const [query, setQuery] = useState(defaultQuery)

  useEffect(() => { setQuery(defaultQuery) }, [defaultQuery])

  const go = (q) => {
    const v = (q || query).trim()
    if (!v || disabled) return
    onSubmit(v)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#001F3F] px-6 py-8 sm:px-10 sm:py-9">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:24px_24px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.08)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20px] right-12 h-36 w-36 rounded-full bg-white/[0.02]"
        aria-hidden
      />

      <div className="relative mb-3.5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-3 py-1 text-[11px] font-semibold text-[#FFD700]">
          <Sparkles className="h-3 w-3" />
          AI-Powered · Real-Time Data
        </span>
      </div>

      <h2 className="relative mb-2 text-2xl font-extrabold tracking-tight text-white sm:text-[28px]">
        AI <span className="text-[#FFD700]">Market Research</span>
      </h2>
      <p className="relative mb-6 max-w-2xl text-sm leading-relaxed text-white/60">
        Discover insights, trends, and opportunities powered by AI. Search any market, industry, or business topic.
      </p>

      <div className="relative z-[2] flex items-center rounded-full bg-white/[0.97] p-1.5 pl-5 shadow-[0_6px_28px_rgba(0,0,0,0.25)]">
        <Search className="mr-2.5 h-4 w-4 shrink-0 text-[#8A94A6]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && go()}
          disabled={disabled}
          placeholder="Search market, industry, trend, or business opportunity..."
          className="min-w-0 flex-1 border-none bg-transparent text-sm text-[#001F3F] outline-none placeholder:text-[#8A94A6] disabled:opacity-50"
        />
        <button
          onClick={() => go()}
          disabled={disabled || !query.trim()}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#FFD700] px-6 py-2.5 text-sm font-bold text-[#001F3F] transition hover:-translate-y-0.5 hover:bg-[#E6C200] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Analyze →
        </button>
      </div>

      <div className="relative z-[2] mt-4 flex flex-wrap items-center gap-2">
        <span className="mr-0.5 text-xs text-white/40">Try</span>
        {CHIPS.map(chip => (
          <button
            key={chip.label}
            disabled={disabled}
            onClick={() => go(chip.label)}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/85 transition hover:border-white/30 hover:bg-white/20 hover:text-white disabled:opacity-50"
          >
            <span className="text-[11px]">{chip.emoji}</span>
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
