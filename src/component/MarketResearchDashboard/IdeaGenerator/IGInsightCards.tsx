import { BarChart2, CheckCircle, Star } from 'lucide-react'
import AIDashboardCard from '../ui/AIDashboardCard'

function Row({
  label,
  value,
  valueClass = 'text-[#D7263D]',
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between gap-2 min-w-0">
      <span className="text-xs text-[#5B6472] sm:text-sm">{label}</span>
      <span className={`shrink-0 text-xs font-bold sm:text-sm ${valueClass}`}>{value}</span>
    </div>
  )
}

function CardHeader({
  icon,
  iconBg,
  iconColor,
  title,
}: {
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  title: string
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className={`flex h-7 w-7 items-center justify-center rounded-full ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <span className="text-xs font-extrabold tracking-[0.08em] text-[#001F3F] uppercase">
        {title}
      </span>
    </div>
  )
}

export default function IGInsightCards() {
  return (
    <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-3">
   
      <AIDashboardCard variant="default" padding="md">
        <CardHeader
          icon={<BarChart2 className="h-4 w-4" />}
          iconBg="bg-[#FFECC1]"
          iconColor="text-[#D7263D]"
          title="Market Insights"
        />
        <div className="space-y-2.5">
          <Row label="Demand" value="High 8/10" valueClass="text-[#D7263D] font-bold text-sm" />
          <Row
            label="Competition"
            value="Medium 6/10"
            valueClass="text-[#F5A623] font-bold text-sm"  
          />
        </div>
        <div className="mt-3 rounded-xl bg-[#F7F8FA] p-3">
          <p className="text-xs leading-relaxed text-[#5B6472]">
            <span className="font-semibold text-[#001F3F]">Opportunity:</span>{' '}
            Growing health awareness driving demand for convenient, AI-powered solutions.
          </p>
        </div>
      </AIDashboardCard>

      <AIDashboardCard variant="default" padding="md">
        <CardHeader
          icon={<CheckCircle className="h-4 w-4" />}
          iconBg="bg-[#E8F5E9]"
          iconColor="text-[#5AA34A]"
          title="Feasibility"
        />
        <div className="space-y-2.5">
          <Row
            label="Competition"
            value="Moderate"
            valueClass="text-[#F5A623] font-bold text-sm"  
          />
          <Row label="Fit Score" value="High 78/100" valueClass="text-[#D7263D] font-bold text-sm" />
        </div>
          <div className="mt-3 space-y-1.5">
          <p className="text-xs text-[#5B6472]">
            <span className="font-semibold text-[#5AA34A]">Strengths:</span>{' '}
            Fitness + tech skills, scalable revenue
          </p>
          <p className="text-xs text-[#5B6472]">
            <span className="font-semibold text-[#D7263D]">Strengths:</span>{' '}
            Creating relatable contents
          </p>
        </div>
      </AIDashboardCard>

      <AIDashboardCard variant="default" padding="md">
        <CardHeader
          icon={<Star className="h-4 w-4" />}
          iconBg="bg-[#FFFBEA]"
          iconColor="text-[#FFD700]"
          title="Revenue Projection"
        />
        <div className="space-y-2.5">
          <Row
            label="Model"
            value="Subscription"
            valueClass="text-[#001F3F] font-bold text-sm"
          />

          <Row
            label="Month 6 Target"
            value="£18,000"
            valueClass="text-[#5AA34A] font-bold text-sm"
          />
          <Row label="Scalability" value="High" valueClass="text-[#D7263D] font-bold text-sm" />
        </div>
      </AIDashboardCard>
    </div>
  )
}