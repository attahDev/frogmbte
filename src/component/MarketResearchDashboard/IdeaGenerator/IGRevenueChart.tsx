import AIDashboardCard from '../ui/AIDashboardCard'

type Bar = { month: string; value: number; active?: boolean }

const bars: Bar[] = [
  { month: 'M1', value: 1200 },
  { month: 'M2', value: 2400 },
  { month: 'M3', value: 4200 },
  { month: 'M4', value: 5000 },
  { month: 'M5', value: 9600 },
  { month: 'M6', value: 10100, active: true },
  { month: 'M7', value: 12000 },
  { month: 'M8', value: 13500 },
  { month: 'M9', value: 18000 },
  { month: 'M10', value: 18500 },
  { month: 'M11', value: 26000 },
  { month: 'M12', value: 38000 },
]

function fmt(v: number): string {
  if (v >= 1000) return `£${(v / 1000).toFixed(1)}k`
  return `£${v}`
}

const maxVal = Math.max(...bars.map((b) => b.value))
const CHART_HEIGHT = 120

export default function IGRevenueChart() {
  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-4 text-sm font-bold text-[#001F3F] sm:mb-5 sm:text-base">
        Revenue Projection — First 12 Months
      </h3>

      <div className="scrollbar-hide -mx-1 overflow-x-auto px-1 sm:mx-0 sm:px-0">
        <div className="min-w-[480px] sm:min-w-0 sm:w-full">
          {/* Bars */}
          <div
            className="flex items-end gap-1.5 sm:gap-2"
            style={{ height: `${CHART_HEIGHT}px` }}
          >
            {bars.map((b) => {
              const barH = Math.max(4, (b.value / maxVal) * CHART_HEIGHT)
              return (
                <div
                  key={b.month}
                  className="group flex flex-1 flex-col items-center justify-end"
                  style={{ height: '100%' }}
                >
                  {/* Value label */}
                  <span
                    className={`mb-1 text-[9px] font-semibold leading-none ${
                      b.active ? 'text-[#001F3F]' : 'text-[#9AA3B2]'
                    }`}
                  >
                    {fmt(b.value)}
                  </span>
                  {/* Bar */}
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      b.active ? 'bg-[#FFD700]' : 'bg-[#C8D1DC]'
                    }`}
                    style={{ height: `${barH}px` }}
                  />
                </div>
              )
            })}
          </div>

          {/* Month labels */}
          <div className="mt-2 flex gap-1.5 sm:gap-2">
            {bars.map((b) => (
              <div
                key={b.month}
                className={`flex-1 text-center text-[9px] font-semibold ${
                  b.active ? 'text-[#001F3F]' : 'text-[#9AA3B2]'
                }`}
              >
                {b.month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AIDashboardCard>
  )
}
