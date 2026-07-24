import { useNavigate } from 'react-router-dom'
import AIDashboardButton from '../ui/AIDashboardButton'
import AIDashboardCard from '../ui/AIDashboardCard'
import { setCurrentIdeaId } from '../lib/currentIdea'

import { ArrowRight } from 'lucide-react'
import type { IdeaContent } from '../lib/ideaEngineApi'

const defaultEdges = [
  'AI-first personalisation at a low cost point',
  'Affordable $20/month vs $149/month competitors',
  'Community + AI coaching hybrid model',
]

type Props = {
  content?: IdeaContent
  ideaId?: string
  onBuildPlan?: () => void
}

export default function MRCompetitiveEdge({ content, ideaId, onBuildPlan }: Props) {
  const navigate = useNavigate()
  const edges = content?.competitive_edge?.length ? content.competitive_edge : defaultEdges

  const handleBuildPlan =
    onBuildPlan ??
    (() => {
      if (ideaId) setCurrentIdeaId(ideaId)
      navigate('/dashboard/business-plan')
    })

  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-4 text-base font-semibold text-[#001F3F]">Your Competitive Edge</h3>

      <div className="space-y-2.5">
        {edges.map((edge, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#E4E8ED] bg-[#F7F8FA] px-4 py-3 text-xs leading-relaxed text-[#3D4A5C]"
          >
            {edge}
          </div>
        ))}
      </div>

      <AIDashboardButton
  onClick={handleBuildPlan}
  className="mt-5 flex flex-row w-full items-center justify-center gap-2 rounded-xl bg-[#D7263D] py-4 font-semibold text-white transition-colors hover:bg-[#B91C30]"
>
  <span className="leading-none">Build Business Plan</span>
 <ArrowRight className="relative top-px h-4 w-4 shrink-0" />
</AIDashboardButton>
    </AIDashboardCard>
  )
}
