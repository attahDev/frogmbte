import AIDashboardCard from "../../ui/AIDashboardCard"
import type { IdeaContent } from '../../lib/ideaEngineApi'

const defaultStats = [
  { label: 'STARTUP COST', value: '$4,600', sub: 'One-time investment' },
  {
    label: 'MONTHLY REVENUE (PROJECTED)',
    value: '$12,000',
    sub: '200 subscribers × $60',
    badge: '↑ +18% MoM',
  },
  {
    label: 'BREAK-EVEN POINT',
    value: 'MONTH 4',
    sub: '70 paying subscribers needed',
    badge: '↑ Ahead of schedule',
  },
]

type Props = {
  content?: IdeaContent
}

export default function FinStatCards({ content }: Props) {
  const stats = content?.financials.stats?.length ? content.financials.stats : defaultStats

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <AIDashboardCard key={stat.label} variant="default" padding="md">
          <p className="mb-1 text-[10px] font-bold tracking-[0.1em] text-[#5B6472] uppercase">
            {stat.label}
          </p>
          <p className="text-2xl font-extrabold tracking-tight text-[#001F3F]">
            {stat.value}
          </p>
          <p className="mt-0.5 text-xs text-[#5B6472]">{stat.sub}</p>
          {stat.badge && (
            <p className="mt-1 text-xs font-semibold text-[#5AA34A]">
              {stat.badge}
            </p>
          )}
        </AIDashboardCard>
      ))}
    </div>
  )
}
