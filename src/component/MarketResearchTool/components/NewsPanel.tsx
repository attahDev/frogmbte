// @ts-nocheck
const SENTIMENT_CFG = {
  positive: { label: 'Positive', color: 'text-green-600', bg: 'bg-green-50', dot: 'text-green-600' },
  negative: { label: 'Negative', color: 'text-red-600', bg: 'bg-red-50', dot: 'text-red-600' },
  neutral:  { label: 'Neutral',  color: 'text-amber-600', bg: 'bg-amber-50', dot: 'text-amber-500' },
}

function headlineSentiment(title) {
  const t = title.toLowerCase()
  if (/surges?|jumps?|rallies|soars?|booms?|record|grows?|expands?|rises?/.test(t)) return 'positive'
  if (/falls?|drops?|slumps?|crashes?|concerns?|scrutiny|saturation|risks?/.test(t)) return 'negative'
  return 'neutral'
}

function timeAgo(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const diff = Date.now() - d.getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 60) return `${mins} minutes ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs} ${hrs === 1 ? 'hour' : 'hours'} ago`
    const days = Math.floor(hrs / 24)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } catch { return '' }
}

export default function NewsPanel({ news }) {
  if (!news?.headlines?.length) return null

  const headlines = news.headlines.slice(0, 5)

  return (
    <div className="rounded-2xl border border-[#E0E5EC] bg-white p-5 shadow-sm sm:px-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="text-[15px]">📰</span>
        <span className="text-sm font-bold text-[#001F3F]">Recent News</span>
        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
          Live
        </span>
      </div>

      <div className="flex flex-col">
        {headlines.map((h, i) => {
          const sent = headlineSentiment(h.title)
          const cfg  = SENTIMENT_CFG[sent]
          return (
            <div
              key={i}
              className={`flex gap-3.5 py-3 ${
                i < headlines.length - 1 ? 'border-b border-[#E0E5EC]' : ''
              }`}
            >
              <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#001F3F] text-[10px] font-bold text-[#FFD700]">
                {i + 1}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#4A5568]">{h.source}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>
                    ● {cfg.label}
                  </span>
                </div>
                <a
                  href={h.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-1 block text-[13px] font-medium leading-snug text-[#001F3F] no-underline transition hover:text-[#001F3F]/80"
                >
                  {h.title}
                </a>
                <div className="text-[11px] text-[#8A94A6]">
                  {timeAgo(h.published_at)}{h.source ? ` · ${h.source}` : ''}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
