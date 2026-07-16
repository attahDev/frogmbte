// @ts-nocheck
import NewsPanel from './NewsPanel'
import MarketChart from './MarketChart'

const CARD = 'rounded-2xl border border-[#E0E5EC] bg-white shadow-sm'

function fmtPrice(p) {
  if (p == null) return '—'
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
  if (p >= 1)    return `$${p.toFixed(2)}`
  return `$${p.toFixed(6)}`
}

function fmt(num, { prefix = '', decimals = 2, compact = false } = {}) {
  if (num == null) return '—'
  if (compact) {
    if (Math.abs(num) >= 1e12) return `${prefix}${(num / 1e12).toFixed(decimals)}T`
    if (Math.abs(num) >= 1e9)  return `${prefix}${(num / 1e9).toFixed(decimals)}B`
    if (Math.abs(num) >= 1e6)  return `${prefix}${(num / 1e6).toFixed(decimals)}M`
    if (Math.abs(num) >= 1e3)  return `${prefix}${(num / 1e3).toFixed(decimals)}K`
  }
  return `${prefix}${num.toFixed(decimals)}`
}

function ConfidenceBadge({ dataConfidence, classifierConfidence, fetchedAt }) {
  const score = dataConfidence ?? classifierConfidence ?? null
  if (score === null) return null

  const tier =
    score >= 0.75
      ? { label: 'High Confidence', text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' }
      : score >= 0.45
        ? { label: 'Medium Confidence', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' }
        : { label: 'Low Confidence', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' }

  const pct = Math.round(score * 100)
  const barW = `${pct}%`

  let timeStr = ''
  if (fetchedAt) {
    try {
      const d = new Date(fetchedAt)
      const diff = Math.floor((Date.now() - d.getTime()) / 60000)
      timeStr = diff < 1 ? 'just now' : diff < 60 ? `${diff}m ago` : `${Math.floor(diff / 60)}h ago`
    } catch {}
  }

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 pl-2 text-[11px] font-semibold ${tier.bg} ${tier.border} ${tier.text}`}>
      <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${tier.dot} ${score >= 0.45 ? 'animate-pulse' : ''}`} />
      <span>{tier.label}</span>
      <span className="opacity-70">{pct}%</span>
      <div className="h-1 w-10 shrink-0 overflow-hidden rounded-sm bg-black/10">
        <div className={`h-full rounded-sm transition-all duration-500 ${tier.dot}`} style={{ width: barW }} />
      </div>
      {timeStr && <span className="font-normal opacity-55">· Data {timeStr}</span>}
    </div>
  )
}

function AnalystPanel({ analyst }) {
  if (!analyst) return null
  const { buy_count, hold_count, sell_count, total_analysts,
          consensus_rating, target_price_consensus,
          target_price_high, target_price_low,
          recent_upgrades, recent_downgrades } = analyst

  const total = total_analysts || (buy_count + hold_count + sell_count) || 0
  if (!total && !consensus_rating) return null

  const buyPct  = total ? Math.round((buy_count  || 0) / total * 100) : 0
  const holdPct = total ? Math.round((hold_count || 0) / total * 100) : 0
  const sellPct = total ? Math.round((sell_count || 0) / total * 100) : 0

  const consensusColor =
    consensus_rating?.toLowerCase().includes('buy')  ? 'text-green-600 bg-green-50 border-green-400/40' :
    consensus_rating?.toLowerCase().includes('sell') ? 'text-red-600 bg-red-50 border-red-400/40' :
    'text-amber-700 bg-amber-50 border-amber-400/40'

  return (
    <div className={`${CARD} p-5 sm:px-6`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[15px]">🎯</span>
          <span className="text-sm font-bold text-[#001F3F]">Analyst Ratings</span>
          {total > 0 && (
            <span className="rounded-full border border-[#E0E5EC] bg-[#F4F6F9] px-2 py-0.5 text-[11px] font-medium text-[#8A94A6]">
              {total} analysts
            </span>
          )}
        </div>
        {consensus_rating && (
          <span className={`rounded-full border px-3.5 py-1 text-xs font-bold tracking-wide ${consensusColor}`}>
            {consensus_rating.toUpperCase()}
          </span>
        )}
      </div>

      {total > 0 && (
        <div className="mb-4 flex flex-col gap-2.5">
          {[
            { label: 'Buy',  count: buy_count  || 0, pct: buyPct,  bar: 'bg-green-500' },
            { label: 'Hold', count: hold_count || 0, pct: holdPct, bar: 'bg-amber-500' },
            { label: 'Sell', count: sell_count || 0, pct: sellPct, bar: 'bg-red-500' },
          ].map(({ label, count, pct, bar }) => (
            <div key={label}>
              <div className="mb-1 flex justify-between">
                <span className="text-xs font-semibold text-[#4A5568]">{label}</span>
                <span className="text-xs font-semibold text-[#001F3F]">
                  {count} <span className="font-normal text-[#8A94A6]">({pct}%)</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded bg-[#F4F6F9]">
                <div className={`h-full rounded transition-all duration-500 ${bar}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {target_price_consensus != null && (
        <div className="mb-3 rounded-xl bg-[#F4F6F9] px-4 py-3.5">
          <div className="mb-1.5 text-[11px] text-[#8A94A6]">Price Target</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-[#001F3F]">
              {fmtPrice(target_price_consensus)}
            </span>
            {target_price_low != null && target_price_high != null && (
              <span className="text-xs text-[#8A94A6]">
                Range: {fmtPrice(target_price_low)} – {fmtPrice(target_price_high)}
              </span>
            )}
          </div>
        </div>
      )}

      {(recent_upgrades != null || recent_downgrades != null) && (
        <div className="flex gap-2.5">
          {recent_upgrades != null && (
            <div className="flex-1 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-center">
              <div className="text-base font-extrabold text-green-600">+{recent_upgrades}</div>
              <div className="text-[11px] text-green-600">Upgrades</div>
            </div>
          )}
          {recent_downgrades != null && (
            <div className="flex-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-center">
              <div className="text-base font-extrabold text-red-600">-{recent_downgrades}</div>
              <div className="text-[11px] text-red-600">Downgrades</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const ACTION_CFG = {
  BUY:   { color: 'bg-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: '↑' },
  SELL:  { color: 'bg-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: '↓' },
  HOLD:  { color: 'bg-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: '—' },
  WATCH: { color: 'bg-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', icon: '◎' },
}

const RISK_CFG = {
  Low:    { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300/30' },
  Medium: { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-300/30' },
  High:   { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300/30' },
}

function FinalRecommendationsPanel({ recommendations }) {
  if (!recommendations?.length) return null

  return (
    <div className={`${CARD} p-5 sm:p-6`}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-base">🏁</span>
        <span className="text-[15px] font-bold text-[#001F3F]">Final Recommendations</span>
      </div>
      <p className="mb-5 text-xs text-[#8A94A6]">
        AI-generated guidance based on current data · Not financial advice
      </p>

      <div
        className="grid gap-3.5"
        style={{ gridTemplateColumns: `repeat(${Math.min(recommendations.length, 2)}, 1fr)` }}
      >
        {recommendations.map((rec, i) => {
          const action = rec.action?.toUpperCase() || 'WATCH'
          const risk   = rec.risk_level || 'Medium'
          const aCfg   = ACTION_CFG[action] || ACTION_CFG.WATCH
          const rCfg   = RISK_CFG[risk]     || RISK_CFG.Medium

          return (
            <div key={i} className={`rounded-xl border-[1.5px] p-4 sm:p-5 ${aCfg.border} ${aCfg.bg}`}>
              <div className="mb-3 flex items-center justify-between">
                <div className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-extrabold tracking-wider text-white ${aCfg.color}`}>
                  <span>{aCfg.icon}</span>
                  {action}
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${rCfg.bg} ${rCfg.border} ${rCfg.text}`}>
                  {risk} Risk
                </span>
              </div>

              <p className="mb-2.5 text-[13px] leading-relaxed text-[#001F3F]">
                {rec.rationale}
              </p>

              <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4A5568]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {rec.timeframe}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MetricCard({ icon, label, value, badge, badgePositive }) {
  return (
    <div className={`${CARD} px-5 py-5 sm:px-6`}>
      <div className="mb-2.5 text-2xl">{icon}</div>
      <div className="mb-0.5 text-2xl font-extrabold leading-none tracking-tight text-[#001F3F]">{value}</div>
      <div className={`text-[11.5px] text-[#8A94A6] ${badge ? 'mb-2' : ''}`}>{label}</div>
      {badge && (
        <div className={`text-[11.5px] font-semibold ${badgePositive ? 'text-green-600' : 'text-red-600'}`}>
          {badgePositive ? '↑' : '↓'} {badge}
        </div>
      )}
    </div>
  )
}

function buildMetricCards(category, metrics, analyst) {
  if (!metrics) return []
  const cards = []

  if (category === 'crypto') {
    cards.push({ icon: '💰', label: `${metrics.name || ''} Current Price`, value: fmtPrice(metrics.current_price), badge: metrics.price_change_24h != null ? `${Math.abs(metrics.price_change_24h).toFixed(2)}% 24h` : null, badgePositive: (metrics.price_change_24h || 0) >= 0 })
    if (metrics.market_cap) cards.push({ icon: '📊', label: 'Market Capitalization', value: fmt(metrics.market_cap, { prefix: '$', compact: true, decimals: 1 }), badge: 'Explosive growth', badgePositive: true })
    if (metrics.volume)     cards.push({ icon: '📈', label: '24h Trading Volume', value: fmt(metrics.volume, { prefix: '$', compact: true, decimals: 1 }), badge: 'High liquidity', badgePositive: true })
  }

  if (category === 'stock' || category === 'commodity') {
    cards.push({ icon: '📈', label: `${metrics.ticker || metrics.name || ''} Price`, value: fmtPrice(metrics.current_price), badge: metrics.price_change_24h != null ? `${Math.abs(metrics.price_change_24h).toFixed(2)}% today` : null, badgePositive: (metrics.price_change_24h || 0) >= 0 })
    if (metrics.market_cap) cards.push({ icon: '🏢', label: 'Market Cap', value: fmt(metrics.market_cap, { prefix: '$', compact: true, decimals: 1 }) })
    if (metrics.pe_ratio)   cards.push({ icon: '⚖️', label: 'P/E Ratio', value: `${metrics.pe_ratio.toFixed(1)}x` })
    if (analyst?.consensus_rating) cards.push({ icon: '🎯', label: 'Analyst Rating', value: analyst.consensus_rating.toUpperCase(), badge: analyst.total_analysts ? `${analyst.total_analysts} analysts` : null, badgePositive: true })
  }

  return cards.slice(0, 4)
}

export default function ResultsPanel({ jobData, query }) {
  const { result, metrics, chart_data, enrichments, category,
          data_confidence, classifier_confidence, fetched_at } = jobData

  const news    = enrichments?.news
  const analyst = enrichments?.analyst_ratings
  const onchain = enrichments?.onchain
  const funds   = enrichments?.fundamentals

  const insights = result?.insights || []
  const opps  = result?.opportunities?.length ? result.opportunities : insights.slice(0, Math.ceil(insights.length / 2))
  const risks = result?.risks?.length         ? result.risks         : insights.slice(Math.ceil(insights.length / 2))

  const hasChart  = ['crypto', 'stock', 'commodity'].includes(category) && chart_data
  const metCards  = buildMetricCards(category, metrics, analyst)

  return (
    <div className="flex flex-col gap-5">

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#FFD700] px-5 py-3">
        <div>
          <div className="mb-0.5 text-[10px] font-bold tracking-[0.1em] text-[#001F3F]/55">ANALYSING</div>
          <div className="text-[15px] font-bold text-[#001F3F]">{query}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ConfidenceBadge
            dataConfidence={data_confidence}
            classifierConfidence={classifier_confidence}
            fetchedAt={fetched_at}
          />
          <span className="rounded-full bg-[#001F3F]/10 px-3 py-1 text-[11px] font-semibold text-[#001F3F]">
            ⏱ Updated just now
          </span>
          <span className="rounded-full bg-[#001F3F] px-3 py-1 text-[11px] font-semibold text-[#FFD700]">
            ✦ AI Analysed
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-[#001F3F] px-6 py-7 sm:px-8">
        <div className="mb-3.5 flex items-center gap-2">
          <span className="text-base">📊</span>
          <span className="text-sm font-bold text-[#FFD700]">AI Market Summary</span>
        </div>
        <p className="text-sm leading-relaxed text-white/80">
          {result?.trend_summary || result?.balance || 'Generating summary...'}
        </p>
        {result?.tags?.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {result.tags.map((tag, i) => (
              <span
                key={i}
                className="rounded-full border border-[#FFD700]/25 bg-[#FFD700]/15 px-2.5 py-0.5 text-[11px] font-medium text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {metCards.length > 0 && (
        <div
          className="grid gap-3.5"
          style={{ gridTemplateColumns: `repeat(${metCards.length}, 1fr)` }}
        >
          {metCards.map((c, i) => <MetricCard key={i} {...c} />)}
        </div>
      )}

      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: news && hasChart ? '1fr 380px' : '1fr' }}
      >
        {news && <NewsPanel news={news} />}

        {hasChart && (
          <div className="flex flex-col gap-4">
            <MarketChart chartData={chart_data} category={category} />
            {insights.length > 0 && <KeyInsights insights={insights} />}
          </div>
        )}

        {!hasChart && insights.length > 0 && <KeyInsights insights={insights} />}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className={`${CARD} p-5 sm:px-6`}>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[15px]">✅</span>
            <span className="text-sm font-bold text-green-600">Opportunities</span>
          </div>
          <div className="flex flex-col gap-3">
            {opps.length > 0 ? opps.map((opp, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-green-500 bg-green-50 text-[9px] font-bold text-green-600">
                  ✓
                </div>
                <p className="text-[13px] leading-relaxed text-[#001F3F]">{opp}</p>
              </div>
            )) : (
              <p className="text-[13px] text-[#8A94A6]">No specific opportunities identified.</p>
            )}
          </div>
        </div>

        <div className={`${CARD} p-5 sm:px-6`}>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[15px]">⚠️</span>
            <span className="text-sm font-bold text-red-600">Risks to Watch</span>
          </div>
          <div className="flex flex-col gap-3">
            {risks.length > 0 ? risks.map((risk, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-red-500 bg-red-50 text-[9px] font-bold text-red-600">
                  !
                </div>
                <p className="text-[13px] leading-relaxed text-[#001F3F]">{risk}</p>
              </div>
            )) : (
              <p className="text-[13px] text-[#8A94A6]">No specific risks flagged.</p>
            )}
          </div>
        </div>
      </div>

      {insights.length > 0 && (
        <div className={`${CARD} px-6 py-6 sm:px-7`}>
          <div className="mb-1 flex items-center gap-2">
            <span className="text-base">🎯</span>
            <span className="text-[15px] font-bold text-[#001F3F]">Actionable Advice</span>
          </div>
          <p className="mb-5 text-xs text-[#8A94A6]">Based on current market data and AI analysis</p>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {insights.slice(0, 3).map((ins, i) => {
              const sep   = ins.match(/[—–:]/)?.[0]
              const parts = sep ? ins.split(sep) : [null, ins]
              const title = parts[0]?.trim() || `Step ${i + 1}`
              const body  = parts.slice(1).join(sep || '').trim() || ins
              return (
                <div key={i} className="rounded-xl bg-[#F4F6F9] px-4 py-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#001F3F] text-[13px] font-bold text-[#FFD700]">
                    {i + 1}
                  </div>
                  <div className="mb-1.5 text-[13px] font-semibold text-[#001F3F]">{title}</div>
                  <div className="text-xs leading-relaxed text-[#4A5568]">{body}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {(onchain || funds || analyst) && (
        <div className={`grid gap-4 ${analyst ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
          {analyst && <AnalystPanel analyst={analyst} />}
          {(onchain || funds) && <SupplementalPanel onchain={onchain} funds={funds} analyst={null} />}
        </div>
      )}

      {result?.recommendations?.length > 0 && (
        <FinalRecommendationsPanel recommendations={result.recommendations} />
      )}

    </div>
  )
}

function KeyInsights({ insights }) {
  return (
    <div className={`${CARD} px-5 py-5 sm:px-6`}>
      <div className="mb-3.5 flex items-center gap-2">
        <span className="text-[15px]">🔑</span>
        <span className="text-sm font-bold text-[#001F3F]">Key Insights</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {insights.map((ins, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD700]" />
            <p className="text-[13px] leading-relaxed text-[#001F3F]">{ins}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SupplementalPanel({ onchain, funds, analyst }) {
  const rows = []
  if (onchain?.chain_tvl_usd) rows.push({ label: 'Chain TVL', value: fmt(onchain.chain_tvl_usd, { prefix: '$', compact: true, decimals: 1 }), sub: onchain.chain_tvl_7d_change_pct != null ? `${onchain.chain_tvl_7d_change_pct > 0 ? '+' : ''}${onchain.chain_tvl_7d_change_pct.toFixed(1)}% 7d` : null })
  if (onchain?.active_addresses_24h) rows.push({ label: 'Active Addresses 24h', value: fmt(onchain.active_addresses_24h, { compact: true, decimals: 0 }) })
  if (onchain?.exchange_netflow_24h_usd != null) rows.push({ label: 'Exchange Netflow 24h', value: fmt(onchain.exchange_netflow_24h_usd, { prefix: '$', compact: true, decimals: 1 }) })
  if (analyst?.consensus_rating)    rows.push({ label: 'Analyst Consensus', value: analyst.consensus_rating.toUpperCase() })
  if (analyst?.target_price_consensus) rows.push({ label: 'Price Target', value: fmtPrice(analyst.target_price_consensus), sub: analyst.total_analysts ? `${analyst.total_analysts} analysts` : null })
  if (funds?.pe_ratio)           rows.push({ label: 'P/E Ratio', value: `${funds.pe_ratio.toFixed(1)}x` })
  if (funds?.net_margin_pct)     rows.push({ label: 'Net Margin', value: `${(funds.net_margin_pct * 100).toFixed(1)}%` })
  if (funds?.debt_to_equity)     rows.push({ label: 'Debt / Equity', value: funds.debt_to_equity.toFixed(2) })
  if (funds?.dividend_yield_pct) rows.push({ label: 'Dividend Yield', value: `${funds.dividend_yield_pct.toFixed(2)}%` })

  if (!rows.length) return null

  return (
    <div className={`${CARD} px-5 py-5 sm:px-7`}>
      <div className="mb-4 text-sm font-bold text-[#001F3F]">📋 Additional Data</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
        {rows.map((r, i) => (
          <div key={i} className="rounded-lg bg-[#F4F6F9] px-3.5 py-3">
            <div className="mb-1 text-[10.5px] text-[#8A94A6]">{r.label}</div>
            <div className="text-[17px] font-bold text-[#001F3F]">{r.value}</div>
            {r.sub && <div className="mt-0.5 text-[10.5px] text-[#8A94A6]">{r.sub}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
