import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import AIDashboardCard from '../ui/AIDashboardCard'

export default function StatsCard({
  title,
  value,
  icon: Icon,
  onClick,
  onViewAll,
}: {
  title: string
  value: string | number
  icon: LucideIcon
  onClick?: () => void
  onViewAll?: () => void
}) {
  return (
    <AIDashboardCard
      variant="stat"
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFECC1] text-[#D7263D]">
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="text-3xl font-black text-[#001F3F]">
            {value}
          </div>

          <div className="text-sm text-slate-500">
            {title}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onViewAll?.()
            }}
            className="mt-2 flex items-center gap-1 self-start text-xs font-bold text-[#D7263D] transition hover:opacity-80"
          >
            View all
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </AIDashboardCard>
  )
}