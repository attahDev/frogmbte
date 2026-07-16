import { TrendingUp } from 'lucide-react'
import AIDashboardCard from '../ui/AIDashboardCard'
import BeeWatermark from '../ui/BeeWatermark'

type StatChip = {
  label: string
  value: string
  sub: string
  color: string
  showTrend?: boolean
}

const stats: StatChip[] = [
  {
    label: 'CONFIDENCE SCORE',
    value: '82/100',
    sub: 'Strong opportunity',
    color: 'text-[#FFD700]',
  },
  {
    label: 'MARKET DEMAND',
    value: 'High',
    sub: '8/10',
    color: 'text-[#FFD700]',
    showTrend: true,
  },
  {
    label: 'DIFFICULTY',
    value: 'Moderate',
    sub: 'Achievable',
    color: 'text-[#FFB84D]',
  },
  {
    label: 'PROFIT POTENTIAL',
    value: 'High',
    sub: 'Scalable SaaS',
    color: 'text-[#FFD700]',
    showTrend: true,
  },
]

export default function IGResultHero() {
  return (
    <AIDashboardCard
      variant="panel"
      padding="lg"
      className="relative overflow-hidden bg-[#001F3F]"
    >
      <div className="pointer-events-none absolute -right-8 -bottom-14 z-0 sm:-right-6 sm:-bottom-10">
        <BeeWatermark className="h-[160px] w-auto sm:h-[220px] lg:h-[280px]" />
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-6 sm:gap-8">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#FFD700]/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#FFD700] sm:mb-4 sm:px-3 sm:text-xs">
            <span className="text-[9px] sm:text-[10px]">✦</span>
            AI Generated Result
          </div>

          <h2 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:text-[28px]">
            AI-Powered Fitness Coaching Platform
          </h2>
          <p className="mt-1.5 text-xs text-white/55 sm:mt-2 sm:text-sm">
            Smart Analysis. Real Insights. Better Decisions.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="min-w-0 rounded-xl bg-white/[0.07] px-2.5 py-2.5 sm:rounded-2xl sm:px-4 sm:py-3"
            >
              <p className="truncate text-[8px] font-bold tracking-[0.08em] text-white/40 uppercase sm:text-[9px] sm:tracking-[0.1em]">
                {s.label}
              </p>
              <p
                className={`mt-1 flex items-center gap-0.5 text-base font-extrabold sm:mt-1.5 sm:gap-1 sm:text-xl ${s.color}`}
              >
                <span className="truncate">{s.value}</span>
                {s.showTrend && <TrendingUp className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-white/45 sm:text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </AIDashboardCard>
  )
}
