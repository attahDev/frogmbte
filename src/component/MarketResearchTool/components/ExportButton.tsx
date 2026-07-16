// @ts-nocheck
import { useState } from 'react'
import jsPDF from 'jspdf'

function fmtPrice(p) {
  if (p == null) return '--'
  if (p >= 1000) return `$${p.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
  if (p >= 1)    return `$${p.toFixed(2)}`
  return `$${p.toFixed(6)}`
}

function fmtCompact(num) {
  if (num == null) return '--'
  if (Math.abs(num) >= 1e12) return `$${(num / 1e12).toFixed(1)}T`
  if (Math.abs(num) >= 1e9)  return `$${(num / 1e9).toFixed(1)}B`
  if (Math.abs(num) >= 1e6)  return `$${(num / 1e6).toFixed(1)}M`
  if (Math.abs(num) >= 1e3)  return `$${(num / 1e3).toFixed(1)}K`
  return `$${num.toFixed(2)}`
}

function stripEmoji(str) {
  return (str || '').replace(
    /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27FF}\u{FE00}-\u{FEFF}]/gu, ''
  ).replace(/\s{2,}/g, ' ').trim()
}

function buildPDF(query, jobData) {
  const { result, metrics, enrichments, category } = jobData
  const news     = enrichments?.news?.headlines || []
  const analyst  = enrichments?.analyst_ratings
  const insights = result?.insights || []

  const midpoint = Math.ceil(insights.length / 2)
  const opps  = insights.slice(0, midpoint)
  const risks = insights.slice(midpoint)

  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W   = doc.internal.pageSize.getWidth()
  const H   = doc.internal.pageSize.getHeight()
  const M   = 40
  const COL = W - M * 2
  let y     = M

  const C = {
    navy:   [0, 31, 63],
    yellow: [255, 215, 0],
    green:  [22,  163, 74],
    red:    [220, 38,  38],
    grey:   [136, 150, 167],
    light:  [247, 248, 250],
    border: [226, 230, 234],
    white:  [255, 255, 255],
    dark2:  [74,  85, 104],
    dark3:  [220, 225, 235],
  }

  function newPage(needed = 60) {
    if (y + needed > H - M) {
      doc.addPage()
      y = M
    }
  }

  function font(size, style = 'normal', color = C.navy) {
    doc.setFontSize(size)
    doc.setFont('helvetica', style)
    doc.setTextColor(...color)
  }

  function hline(color = C.border, w = 0.5) {
    doc.setDrawColor(...color)
    doc.setLineWidth(w)
    doc.line(M, y, W - M, y)
  }

  function sectionHead(label) {
    newPage(44)
    y += 10
    font(9, 'bold', C.navy)
    doc.text(label, M, y)
    y += 5
    hline()
    y += 10
  }

  function bulletRow(text, x, dotColor, maxW, lineH = 12) {
    font(8.5, 'normal', C.navy)
    const lines = doc.splitTextToSize(stripEmoji(text), maxW - 14)
    doc.setFillColor(...dotColor)
    doc.circle(x + 4, y - 3, 2.5, 'F')
    doc.text(lines, x + 12, y)
    y += lines.length * lineH + 5
  }

  doc.setFillColor(...C.navy)
  doc.rect(0, 0, W, 68, 'F')

  doc.setFillColor(...C.yellow)
  doc.rect(0, 68, W, 4, 'F')

  font(9, 'bold', C.white)
  doc.text('GM BLACK', M, 24)
  font(9, 'bold', C.yellow)
  doc.text('TECH EXPO', M, 36)
  font(7.5, 'normal', [160, 175, 195])
  doc.text('Market Research AI', M, 50)

  font(8, 'normal', [160, 175, 195])
  doc.text(
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    W - M, 50, { align: 'right' }
  )

  doc.setFillColor(...C.yellow)
  doc.roundedRect(W - M - 76, 16, 76, 18, 4, 4, 'F')
  font(8, 'bold', C.navy)
  doc.text('AI Analysed', W - M - 38, 28, { align: 'center' })

  y = 88

  font(20, 'bold', C.navy)
  doc.text(stripEmoji(query), M, y)
  y += 8

  if (category) {
    const cat = category.toUpperCase()
    const tw  = doc.getTextWidth(cat) + 16
    doc.setFillColor(...C.light)
    doc.setDrawColor(...C.border)
    doc.setLineWidth(0.5)
    doc.roundedRect(M, y + 2, tw, 14, 3, 3, 'FD')
    font(7.5, 'bold', C.grey)
    doc.text(cat, M + 8, y + 12)
    y += 22
  }

  y += 10

  const summaryRaw   = result?.trend_summary || result?.balance || ''
  const summaryClean = stripEmoji(summaryRaw)
  const summaryLines = doc.splitTextToSize(summaryClean, COL - 28)
  const boxH         = summaryLines.length * 13 + 46

  newPage(boxH + 24)

  doc.setFillColor(...C.navy)
  doc.roundedRect(M, y, COL, boxH, 6, 6, 'F')

  font(8, 'bold', C.yellow)
  doc.text('AI MARKET SUMMARY', M + 14, y + 18)

  font(9.5, 'normal', C.dark3)
  doc.text(summaryLines, M + 14, y + 32)

  if (result?.tags?.length) {
    let tx   = M + 14
    const ty = y + boxH - 14
    result.tags.forEach(tag => {
      const label = stripEmoji(tag)
      font(7, 'bold', [200, 210, 220])
      const tw = doc.getTextWidth(label) + 14
      doc.setFillColor(40, 55, 80)
      doc.setDrawColor(80, 100, 130)
      doc.setLineWidth(0.4)
      doc.roundedRect(tx, ty - 8, tw, 11, 3, 3, 'FD')
      doc.text(label, tx + 7, ty)
      tx += tw + 6
    })
  }

  y += boxH + 22

  const cards = []
  if (metrics?.current_price != null) cards.push({
    label: metrics.name || metrics.ticker || 'Price',
    value: fmtPrice(metrics.current_price),
    sub:   metrics.price_change_24h != null
      ? `${metrics.price_change_24h >= 0 ? '+' : ''}${metrics.price_change_24h.toFixed(2)}%`
      : null,
    subPos: (metrics.price_change_24h || 0) >= 0,
  })
  if (metrics?.market_cap != null)   cards.push({ label: 'Market Cap',    value: fmtCompact(metrics.market_cap) })
  if (metrics?.pe_ratio != null)     cards.push({ label: 'P/E Ratio',     value: `${metrics.pe_ratio.toFixed(1)}x` })
  if (analyst?.consensus_rating)     cards.push({ label: 'Analyst Rating', value: analyst.consensus_rating.toUpperCase(), sub: analyst.total_analysts ? `${analyst.total_analysts} analysts` : null, subPos: true })

  if (cards.length > 0) {
    sectionHead('KEY METRICS')
    const cols  = Math.min(cards.length, 4)
    const cardW = (COL - (cols - 1) * 12) / cols
    const cardH = 58
    newPage(cardH + 16)

    cards.forEach((c, i) => {
      const cx = M + i * (cardW + 12)
      doc.setFillColor(...C.light)
      doc.setDrawColor(...C.border)
      doc.setLineWidth(0.5)
      doc.roundedRect(cx, y, cardW, cardH, 5, 5, 'FD')

      font(8, 'normal', C.grey)
      doc.text(c.label, cx + 12, y + 16)

      font(17, 'bold', C.navy)
      doc.text(c.value, cx + 12, y + 36)

      if (c.sub) {
        font(8, 'bold', c.subPos ? C.green : C.red)
        doc.text((c.subPos ? '+' : '') + c.sub, cx + 12, y + 50)
      }
    })
    y += cardH + 16
  }

  if (insights.length > 0) {
    sectionHead('KEY INSIGHTS')
    insights.forEach(ins => {
      newPage(30)
      bulletRow(ins, M, C.yellow, COL)
    })
    y += 4
  }

  if (opps.length > 0 || risks.length > 0) {
    sectionHead('OPPORTUNITIES  &  RISKS')
    const half = (COL - 12) / 2

    doc.setFillColor(240, 253, 244)
    doc.roundedRect(M, y, half, 18, 3, 3, 'F')
    font(8.5, 'bold', C.green)
    doc.text('Opportunities', M + 10, y + 12)

    doc.setFillColor(254, 242, 242)
    doc.roundedRect(M + half + 12, y, half, 18, 3, 3, 'F')
    font(8.5, 'bold', C.red)
    doc.text('Risks to Watch', M + half + 22, y + 12)

    y += 26

    const maxRows = Math.max(opps.length, risks.length)
    for (let i = 0; i < maxRows; i++) {
      newPage(30)
      const startY = y

      let leftH = 0
      if (opps[i]) {
        font(8.5, 'normal', C.navy)
        doc.setFillColor(...C.green)
        doc.circle(M + 5, y - 3, 2.5, 'F')
        const lines = doc.splitTextToSize(stripEmoji(opps[i]), half - 16)
        doc.text(lines, M + 14, y)
        leftH = lines.length * 12 + 8
      }

      let rightH = 0
      if (risks[i]) {
        font(8.5, 'normal', C.navy)
        doc.setFillColor(...C.red)
        doc.circle(M + half + 17, startY - 3, 2.5, 'F')
        const lines = doc.splitTextToSize(stripEmoji(risks[i]), half - 16)
        doc.text(lines, M + half + 26, startY)
        rightH = lines.length * 12 + 8
      }

      y = startY + Math.max(leftH, rightH, 16)
    }
    y += 8
  }

  if (insights.length > 0) {
    sectionHead('ACTIONABLE ADVICE')
    const cols  = 3
    const cardW = (COL - (cols - 1) * 12) / cols

    const cards3 = insights.slice(0, 3).map((ins, i) => {
      const sep   = ins.match(/[—–:]/)?.[0]
      const parts = sep ? ins.split(sep) : [null, ins]
      const title = stripEmoji(parts[0]?.trim() || `Step ${i + 1}`)
      const body  = stripEmoji(parts.slice(1).join(sep || '').trim() || ins)
      const bodyL = doc.splitTextToSize(body, cardW - 22)
      const titlL = doc.splitTextToSize(title, cardW - 22)
      const cardH = 32 + titlL.length * 13 + bodyL.length * 12 + 24
      return { title, body, bodyL, titlL, cardH }
    })

    const maxCardH = Math.max(...cards3.map(c => c.cardH), 90)

    newPage(maxCardH + 20)

    const rowY = y

    cards3.forEach(({ bodyL, titlL }, i) => {
      const cx = M + i * (cardW + 12)

      doc.setFillColor(...C.light)
      doc.setDrawColor(...C.border)
      doc.setLineWidth(0.5)
      doc.roundedRect(cx, rowY, cardW, maxCardH, 5, 5, 'FD')

      doc.setFillColor(...C.navy)
      doc.circle(cx + 16, rowY + 18, 10, 'F')
      font(9, 'bold', C.yellow)
      doc.text(String(i + 1), cx + 16, rowY + 22, { align: 'center' })

      font(9, 'bold', C.navy)
      doc.text(titlL, cx + 10, rowY + 40)

      font(8, 'normal', C.dark2)
      doc.text(bodyL, cx + 10, rowY + 40 + titlL.length * 13 + 6)
    })

    y = rowY + maxCardH + 16
  }

  if (news.length > 0) {
    sectionHead('RECENT NEWS')
    news.slice(0, 6).forEach((h, i) => {
      newPage(36)

      doc.setFillColor(...C.navy)
      doc.circle(M + 8, y - 3, 7, 'F')
      font(7, 'bold', C.yellow)
      doc.text(String(i + 1), M + 8, y, { align: 'center' })

      font(8, 'bold', C.grey)
      doc.text(stripEmoji(h.source || ''), M + 22, y - 5)

      font(9, 'normal', C.navy)
      const tl = doc.splitTextToSize(stripEmoji(h.title), COL - 30)
      doc.text(tl, M + 22, y + 6)
      y += tl.length * 12 + 14

      if (i < Math.min(news.length, 6) - 1) {
        doc.setDrawColor(...C.border)
        doc.setLineWidth(0.3)
        doc.line(M + 22, y - 4, W - M, y - 4)
      }
    })
  }

  const total = doc.internal.getNumberOfPages()
  for (let p = 1; p <= total; p++) {
    doc.setPage(p)
    doc.setFillColor(...C.navy)
    doc.rect(0, H - 26, W, 26, 'F')
    font(7.5, 'normal', [160, 170, 185])
    doc.text('GM Black Tech Expo - Market Research AI', M, H - 9)
    doc.text('Not financial advice  |  Data accuracy may vary', W / 2, H - 9, { align: 'center' })
    doc.text(`Page ${p} of ${total}`, W - M, H - 9, { align: 'right' })
  }

  return doc
}

export default function ExportButton({ query, jobData }) {
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    if (!jobData || loading) return
    setLoading(true)
    try {
      const doc      = buildPDF(query, jobData)
      const filename = `market-research-${query.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 40)}.pdf`
      doc.save(filename)
    } catch (err) {
      console.error('PDF export failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={!jobData || loading}
      className="inline-flex items-center gap-1.5 rounded-xl border border-[#E0E5EC] bg-white px-4 py-2 text-xs font-semibold text-[#4A5568] transition hover:border-[#001F3F] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? (
        <>
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#E0E5EC] border-t-[#001F3F]" />
          Generating...
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Export PDF
        </>
      )}
    </button>
  )
}
