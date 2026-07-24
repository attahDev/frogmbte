import AIDashboardCard from '../ui/AIDashboardCard'
import type { IdeaContent } from '../lib/ideaEngineApi'

const dotColorBySegment: Record<string, string> = {
  primary: 'bg-[#0B2545]',
  secondary: 'bg-[#5AA34A]',
  market_size: 'bg-[#F5A623]',
  willingness_to_pay: 'bg-[#D7263D]',
}

const defaultItems = [
  { text: 'Primary: Professionals aged 25–40 seeking affordable, convenient fitness solutions', segment: 'primary' },
  { text: 'Secondary: Fitness enthusiasts wanting AI-personalised training and nutrition', segment: 'secondary' },
  { text: 'Market size: 185M potential users globally growing 14% year over year', segment: 'market_size' },
  { text: 'Willingness to pay: $15–$50 per month for quality coaching', segment: 'willingness_to_pay' },
]

type Props = {
  content?: IdeaContent
}

export default function MRTargetAudience({ content }: Props) {
  const items = content?.target_audience?.length ? content.target_audience : defaultItems

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
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColorBySegment[item.segment] ?? 'bg-[#0B2545]'}`}
            />
            <p className="text-xs leading-relaxed text-[#3D4A5C]">{item.text}</p>
          </div>
        ))}
      </div>
    </AIDashboardCard>
  )
}
