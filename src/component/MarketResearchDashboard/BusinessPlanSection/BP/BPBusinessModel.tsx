import AIDashboardCard from "../../ui/AIDashboardCard"
import type { IdeaContent } from '../../lib/ideaEngineApi'

const defaultItems = [
  { label: 'Freemium', value: 'Free 14-day trial → $20/mo Basic → $60/mo Pro' },
  { label: 'Revenue streams', value: 'Subscriptions, affiliate nutrition products, B2B corporate wellness' },
  { label: 'Target', value: '200 subscribers within 90 days of launch' },
]

const dotColors = ['bg-[#F5A623]', 'bg-[#F5A623]', 'bg-[#5AA34A]']

type Props = {
  content?: IdeaContent
}

export default function BPBusinessModel({ content }: Props) {
  const items = content?.business_model?.length ? content.business_model : defaultItems

  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-3 text-sm font-extrabold tracking-wide text-[#001F3F]">
        Business Model
      </h3>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="flex items-start gap-3 rounded-lg bg-[#F7F8FA] px-3 py-2.5"
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColors[i % dotColors.length]}`}
            />
            <p className="text-sm text-[#5B6472]">
              <span className="font-bold text-[#001F3F]">{item.label}:</span>{' '}
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </AIDashboardCard>
  )
}
