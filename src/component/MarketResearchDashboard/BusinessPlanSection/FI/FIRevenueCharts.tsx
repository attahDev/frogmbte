import AIDashboardCard from "../../ui/AIDashboardCard"


type MonthBar = {
  label: string
  amount: string
  value: number   // 0–100 relative height
  highlight?: boolean
}

const months: MonthBar[] = [
  { label: 'Month 1', amount: '$480',    value: 4  },
  { label: 'Month 2', amount: '$1,800',  value: 15 },
  { label: 'Month 3', amount: '$3,600',  value: 30 },
  { label: 'Month 4', amount: '$6,000',  value: 50, highlight: true },
  { label: 'Month 5', amount: '$9,000',  value: 75 },
  { label: 'Month 6', amount: '$12,000', value: 100 },
]

export default function FinRevenueChart() {
  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-6 text-base font-semibold text-[#001F3F]">
        Revenue Projection — 6 Months
      </h3>

      <div className="flex h-44 items-end gap-3 sm:gap-5">
        {months.map((m) => (
          <div key={m.label} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-end justify-center" style={{ height: '160px' }}>
              <div
                className={[
                  'w-full rounded-t-md transition-all duration-300',
                  m.highlight ? 'bg-[#F6D04D]' : 'bg-[#D6DAE3]',
                ].join(' ')}
                style={{ height: `${m.value}%` }}
              />
            </div>
            <p className="text-[10px] text-[#5B6472]">{m.label}</p>
            <p className="text-[10px] font-bold text-[#001F3F]">{m.amount}</p>
          </div>
        ))}
      </div>
    </AIDashboardCard>
  )
}