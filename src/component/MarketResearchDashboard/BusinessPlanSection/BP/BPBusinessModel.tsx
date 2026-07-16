import AIDashboardCard from "../../ui/AIDashboardCard"


type BulletItem = {
  label: string
  value: string
  dotColor: string
}

const items: BulletItem[] = [
  {
    label: 'Freemium',
    value: 'Free 14-day trial → $20/mo Basic → $60/mo Pro',
    dotColor: 'bg-[#F5A623]',
  },
  {
    label: 'Revenue streams',
    value: 'Subscriptions, affiliate nutrition products, B2B corporate wellness',
    dotColor: 'bg-[#F5A623]',
  },
  {
    label: 'Target',
    value: '200 subscribers within 90 days of launch',
    dotColor: 'bg-[#5AA34A]',
  },
]

export default function BPBusinessModel() {
  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-3 text-sm font-extrabold tracking-wide text-[#001F3F]">
        Business Model
      </h3>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-3 rounded-lg bg-[#F7F8FA] px-3 py-2.5"
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.dotColor}`}
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