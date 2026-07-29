import AIDashboardCard from "../../ui/AIDashboardCard"
import type { IdeaContent } from '../../lib/ideaEngineApi'

const defaultActions = [
  'Register business entity and open business bank account',
  'Hire freelance React Native developer for MVP',
  'Build email list to 500 subscribers before launch',
  'Integrate OpenAI API for personalized coaching engine',
]

type Props = {
  content?: IdeaContent
}

export default function BPNextActions({ content }: Props) {
  const actions = content?.next_actions?.length ? content.next_actions : defaultActions

  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-3 text-sm font-extrabold tracking-wide text-[#001F3F]">
        Next Actions
      </h3>

      <div className="space-y-2">
        {actions.map((action, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-lg bg-[#F7F8FA] px-3 py-2.5"
          >
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#5AA34A]" />
            <p className="text-sm text-[#5B6472]">{action}</p>
          </div>
        ))}
      </div>
    </AIDashboardCard>
  )
}
