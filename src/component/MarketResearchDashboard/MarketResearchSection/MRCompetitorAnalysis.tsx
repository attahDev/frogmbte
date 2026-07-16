import AIDashboardCard from '../ui/AIDashboardCard'

type Competitor = {
  name: string
  description: string
  score: number
}

const competitors: Competitor[] = [
  {
    name: 'Whoop / Fitbit',
    description: 'Hardware-focused, limited AI coaching layer',
    score: 85,
  },
  {
    name: 'MyFitnessPal',
    description: 'Nutrition tracking, weak coaching',
    score: 70,
  },
  {
    name: 'Future App',
    description: 'Human coaching, expensive at $149/mo',
    score: 55,
  },
]

function CompetitorRow({ competitor }: { competitor: Competitor }) {
  return (
    <div className="rounded-xl border border-[#F0F0EC] bg-[#FAFAF8] p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-[#001F3F]">{competitor.name}</p>
          <p className="mt-0.5 text-xs text-[#8A94A0]">{competitor.description}</p>
        </div>
        <span className="shrink-0 text-sm font-bold text-[#D7263D]">{competitor.score}%</span>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#ECEEE8]">
        <div
          className="h-full rounded-full bg-[#D7263D]"
          style={{ width: `${competitor.score}%` }}
        />
      </div>
    </div>
  )
}

type Props = {
  competitors?: Competitor[]
}

export default function MRCompetitorAnalysis({ competitors: data = competitors }: Props) {
  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-4 text-base font-semibold text-[#001F3F]">Competitor Analysis</h3>
      <div className="space-y-3">
        {data.map((c) => (
          <CompetitorRow key={c.name} competitor={c} />
        ))}
      </div>
    </AIDashboardCard>
  )
}