// @ts-nocheck
import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import HeroSearch from './HeroSearch'
import ExportButton from './ExportButton'
import AnalyzingPanel from './AnalyzingPanel'
import ResultsPanel from './ResultsPanel'

const EXAMPLE_CARDS = [
  { emoji: '🌿', title: 'Sustainable Fashion', desc: 'Market size, trends & opportunities in Africa' },
  { emoji: '🏦', title: 'Fintech in West Africa', desc: 'Growth drivers, players & entry points' },
  { emoji: '🤖', title: 'AI SaaS Trends', desc: 'Demand signals, competition & niches' },
]

function ExampleCard({ emoji, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-[#E0E5EC] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#FFD700] hover:shadow-[0_4px_16px_rgba(255,215,0,0.15)]"
    >
      <div className="mb-2.5 text-2xl">{emoji}</div>
      <div className="mb-1.5 text-sm font-semibold text-[#001F3F]">{title}</div>
      <div className="text-xs leading-relaxed text-[#8A94A6]">{desc}</div>
    </button>
  )
}

function EmptyState({ onSubmit }) {
  return (
    <div className="pt-10 text-center">
      <div className="mx-auto mb-5 flex h-[82px] w-[82px] items-center justify-center rounded-full border-[3px] border-[#FFD700] bg-[#FFD700]/10 text-[34px]">
        📊
      </div>

      <h2 className="mb-2.5 text-xl font-bold text-[#001F3F]">
        What Market do you want to explore?
      </h2>
      <p className="mx-auto mb-9 max-w-md text-sm leading-relaxed text-[#4A5568]">
        Type any market, industry, or business opportunity above and our AI
        will deliver deep insights, trends, competitor data, and actionable
        opportunities in seconds.
      </p>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {EXAMPLE_CARDS.map(card => (
          <ExampleCard
            key={card.title}
            {...card}
            onClick={() => onSubmit(card.title)}
          />
        ))}
      </div>
    </div>
  )
}

function ErrorPanel({ error, onRetry }) {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#E0E5EC] bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl text-red-500">
        ⚠
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-[#001F3F]">Research Failed</h3>
      <p className="mb-5 text-[13px] leading-relaxed text-[#4A5568]">
        {error?.message || 'Something went wrong. Please try again.'}
      </p>
      <button
        onClick={onRetry}
        className="rounded-xl bg-[#FFD700] px-6 py-2.5 text-sm font-bold text-[#001F3F] transition hover:-translate-y-0.5 hover:bg-[#E6C200]"
      >
        Try Again
      </button>
    </div>
  )
}

export default function MarketResearchPage({
  phase,
  currentQuery,
  statusLabel,
  jobData,
  errorInfo,
  onSubmit,
  onCancel,
  onNewSearch,
}) {
  const showLoading = phase === 'loading'
  const showResult  = phase === 'result' && jobData
  const showError   = phase === 'error'
  const showEmpty   = !showLoading && !showResult && !showError

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <div className="sticky top-0 z-30 flex flex-wrap items-center gap-3 bg-[#001F3F] px-5 py-4 shadow-lg">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFD700] text-sm font-extrabold text-[#001F3F]">
          GM
        </div>

        <h1 className="text-sm font-bold text-white sm:text-base">
          AI Market Research
        </h1>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {showResult && (
            <>
              <ExportButton query={currentQuery} jobData={jobData} />
              <button
                onClick={onNewSearch}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#D7263D] px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#A81D2F]"
              >
                + New Project
              </button>
            </>
          )}
          {!showResult && (
            <button
              onClick={onNewSearch}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#D7263D] px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#A81D2F]"
            >
              + New Project
            </button>
          )}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 px-3 py-1 text-xs font-semibold text-[#FFD700]">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 py-6 pb-16">
        <HeroSearch
          onSubmit={onSubmit}
          defaultQuery={currentQuery}
          disabled={showLoading}
        />

        <div className="mt-6">
          {showLoading && (
            <AnalyzingPanel
              query={currentQuery}
              status={statusLabel}
              onCancel={onCancel}
            />
          )}
          {showResult && (
            <ResultsPanel
              jobData={jobData}
              query={currentQuery}
              onNewSearch={onNewSearch}
            />
          )}
          {showError && (
            <ErrorPanel error={errorInfo} onRetry={onNewSearch} />
          )}
          {showEmpty && (
            <EmptyState onSubmit={onSubmit} />
          )}
        </div>
      </main>
    </div>
  )
}
