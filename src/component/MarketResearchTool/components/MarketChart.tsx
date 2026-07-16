// @ts-nocheck
import { useState, useRef, useEffect, useCallback } from 'react'

const PERIODS = ['1d', '7d', '30d', '1y', '5y']

function pickData(chartData, period) {
  const map = {
    '1d':  chartData?.ohlc_1d,
    '7d':  chartData?.ohlc_7d,
    '30d': chartData?.ohlc_30d,
    '1y':  chartData?.ohlc_1y,
    '5y':  chartData?.ohlc_5y,
  }
  return (map[period] || []).filter(Boolean)
}

function fmtLabel(time, period) {
  const d = new Date(time)
  if (period === '1d') return d.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })
  if (period === '7d') return d.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })
  if (period === '30d') return d.toLocaleDateString('en', { month: 'short', day: 'numeric' })
  return d.toLocaleDateString('en', { month: 'short', year: '2-digit' })
}

function fmtPrice(p) {
  if (p == null) return '—'
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
  if (p >= 1)    return `$${p.toFixed(2)}`
  return `$${p.toFixed(6)}`
}

export default function MarketChart({ chartData, category }) {
  const [period, setPeriod]   = useState('7d')
  const [tooltip, setTooltip] = useState(null)
  const canvasRef = useRef(null)
  const coordsRef = useRef([])

  const data = pickData(chartData, period)

  const draw = useCallback(() => {
    if (!data.length) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width  = rect.width  * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    const W = rect.width
    const H = rect.height

    ctx.clearRect(0, 0, W, H)

    const prices = data.map(d => d.close || d.open || 0)
    const min    = Math.min(...prices)
    const max    = Math.max(...prices)
    const range  = max - min || 1

    const pad = { top: 12, right: 12, bottom: 32, left: 56 }
    const w   = W - pad.left - pad.right
    const h   = H - pad.top  - pad.bottom

    const isPos      = prices[prices.length - 1] >= prices[0]
    const lineColor  = isPos ? '#22c55e' : '#ef4444'
    const gridColor  = '#E0E5EC'

    const toX = (i) => pad.left + (i / (prices.length - 1 || 1)) * w
    const toY = (p) => pad.top  + ((max - p) / range) * h
    ctx.setLineDash([3, 4])
    ctx.strokeStyle = gridColor
    ctx.lineWidth   = 1
    for (let i = 0; i <= 4; i++) {
      const y   = pad.top + (h * i) / 4
      const val = max - (range * i) / 4
      ctx.beginPath()
      ctx.moveTo(pad.left, y)
      ctx.lineTo(pad.left + w, y)
      ctx.stroke()
      ctx.setLineDash([])
      ctx.fillStyle   = '#8A94A6'
      ctx.font        = `10px Montserrat, sans-serif`
      ctx.textAlign   = 'right'
      ctx.fillText(fmtPrice(val), pad.left - 4, y + 4)
    }
    ctx.setLineDash([])
    const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + h)
    grad.addColorStop(0, isPos ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.beginPath()
    ctx.moveTo(toX(0), toY(prices[0]))
    for (let i = 1; i < prices.length; i++) ctx.lineTo(toX(i), toY(prices[i]))
    ctx.lineTo(toX(prices.length - 1), pad.top + h)
    ctx.lineTo(toX(0), pad.top + h)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(toX(0), toY(prices[0]))
    for (let i = 1; i < prices.length; i++) ctx.lineTo(toX(i), toY(prices[i]))
    ctx.strokeStyle = lineColor
    ctx.lineWidth   = 2
    ctx.stroke()

    const lx = toX(prices.length - 1)
    const ly = toY(prices[prices.length - 1])
    ctx.beginPath()
    ctx.arc(lx, ly, 4, 0, Math.PI * 2)
    ctx.fillStyle = lineColor
    ctx.fill()

    const steps = Math.min(5, data.length - 1)
    ctx.fillStyle  = '#8A94A6'
    ctx.font       = '10px Montserrat, sans-serif'
    ctx.textAlign  = 'center'
    for (let i = 0; i <= steps; i++) {
      const idx = Math.round((i / steps) * (data.length - 1))
      const d   = data[idx]
      if (!d?.time) continue
      ctx.fillText(fmtLabel(d.time, period), toX(idx), pad.top + h + 20)
    }
    coordsRef.current = prices.map((p, i) => ({
      x:     toX(i),
      y:     toY(p),
      price: p,
      time:  data[i]?.time,
    }))
  }, [data, period])

  useEffect(() => {
    draw()
  }, [draw])

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current
    if (!canvas || !coordsRef.current.length) return
    const rect   = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    let nearest = null
    let minDist = Infinity
    for (const pt of coordsRef.current) {
      const d = Math.abs(pt.x - mouseX)
      if (d < minDist) { minDist = d; nearest = pt }
    }

    if (!nearest || minDist > 40) { setTooltip(null); return }

    const prices  = coordsRef.current.map(p => p.price)
    const first   = prices[0]
    const pct     = first ? ((nearest.price - first) / first * 100) : 0
    const isPos   = pct >= 0

    const tipW   = 130
    const tipX   = nearest.x + rect.left + (nearest.x > rect.width - tipW - 20 ? -(tipW + 12) : 12)
    const tipY   = nearest.y + rect.top - 10

    setTooltip({
      x:    tipX,
      y:    tipY,
      canvasX: nearest.x,
      canvasY: nearest.y,
      price:   nearest.price,
      time:    nearest.time,
      pct,
      isPos,
    })
  }, [period])

  const handleMouseLeave = useCallback(() => setTooltip(null), [])

  const overlayRef = useRef(null)
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const ctx = overlay.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const rect = overlay.getBoundingClientRect()
    overlay.width  = rect.width  * dpr
    overlay.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)

    if (!tooltip) return
    const canvas = canvasRef.current
    if (!canvas) return
    const cRect = canvas.getBoundingClientRect()

    ctx.setLineDash([4, 4])
    ctx.strokeStyle = '#8A94A6'
    ctx.lineWidth   = 1

    ctx.beginPath()
    ctx.moveTo(tooltip.canvasX, 12)
    ctx.lineTo(tooltip.canvasX, cRect.height - 32)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.arc(tooltip.canvasX, tooltip.canvasY, 5, 0, Math.PI * 2)
    ctx.fillStyle   = tooltip.isPos ? '#22c55e' : '#ef4444'
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth   = 2
    ctx.stroke()
  }, [tooltip])

  if (!chartData) return null

  const prices    = data.map(d => d.close || 0)
  const pctChange = prices.length > 1 && prices[0]
    ? ((prices[prices.length - 1] - prices[0]) / prices[0] * 100)
    : 0
  const isPos = pctChange >= 0

  return (
    <div className="rounded-2xl border border-[#E0E5EC] bg-white p-5 shadow-sm">
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">📈</span>
          <span className="text-[13px] font-bold text-[#001F3F]">Market Growth Trend</span>
        </div>
        {data.length > 0 && (
          <span className={`text-xs font-semibold ${isPos ? 'text-green-600' : 'text-red-600'}`}>
            {isPos ? '+' : ''}{pctChange.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="mb-2 flex gap-1">
        {PERIODS.map(p => (
          <button
            key={p}
            onClick={() => { setPeriod(p); setTooltip(null) }}
            className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition ${
              period === p
                ? 'bg-[#001F3F] text-[#FFD700]'
                : 'bg-transparent text-[#8A94A6] hover:text-[#001F3F]'
            }`}
          >
            {p.toUpperCase()}
          </button>
        ))}
      </div>

      {data.length > 0 ? (
        <div
          className="relative h-[168px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <canvas ref={overlayRef} className="pointer-events-none absolute inset-0 h-full w-full" />

          {tooltip && (
            <div
              className="pointer-events-none fixed z-[100] min-w-[120px] rounded-lg bg-[#001F3F] px-3 py-2 text-xs text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <div className="mb-0.5 text-sm font-bold">
                {fmtPrice(tooltip.price)}
              </div>
              <div className={`mb-1 text-[11px] ${tooltip.isPos ? 'text-green-400' : 'text-red-400'}`}>
                {tooltip.isPos ? '+' : ''}{tooltip.pct.toFixed(2)}%
              </div>
              <div className="text-[10px] text-white/50">
                {tooltip.time ? fmtLabel(tooltip.time, period) : ''}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[168px] items-center justify-center text-[13px] text-[#8A94A6]">
          No chart data for this period
        </div>
      )}
    </div>
  )
}
