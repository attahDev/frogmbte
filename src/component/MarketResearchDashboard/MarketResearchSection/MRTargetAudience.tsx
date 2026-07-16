import AIDashboardCard from '../ui/AIDashboardCard'

type AudienceItem = {
  text: string
  dotColor: string
}

const defaultItems: AudienceItem[] = [
  {
    text: 'Primary: Professionals aged 25–40 seeking affordable, convenient fitness solutions',
    dotColor: 'bg-[#0B2545]',
  },
  {
    text: 'Secondary: Fitness enthusiasts wanting AI-personalised training and nutrition',
    dotColor: 'bg-[#5AA34A]',
  },
  {
    text: 'Market size: 185M potential users globally growing 14% year over year',
    dotColor: 'bg-[#F5A623]',
  },
  {
    text: 'Willingness to pay: $15–$50 per month for quality coaching',
    dotColor: 'bg-[#D7263D]',
  },
]

type Props = {
  items?: AudienceItem[]
}

export default function MRTargetAudience({ items = defaultItems }: Props) {
  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-4 text-base font-semibold text-[#001F3F]">Target Audience Insights</h3>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl bg-[#FAFAF8] px-3 py-2.5"
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dotColor}`}
            />
            <p className="text-xs leading-relaxed text-[#3D4A5C]">{item.text}</p>
          </div>
        ))}
      </div>
    </AIDashboardCard>
  )
}