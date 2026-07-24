import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AIDashboardButton from '../ui/AIDashboardButton'
import { listIdeas, type IdeaListItem } from '../lib/ideaEngineApi'
import { setCurrentIdeaId } from '../lib/currentIdea'

function difficultyTag(confidence: number) {
  if (confidence >= 70) return { label: 'High Confidence', bg: 'bg-[#F3ECF8]', text: 'text-[#9A63B0]' }
  if (confidence >= 40) return { label: 'Moderate', bg: 'bg-[#FFF4E5]', text: 'text-[#D48B3B]' }
  return { label: 'Needs Work', bg: 'bg-[#EDF4FF]', text: 'text-[#3B6FD4]' }
}

function IdeaCardItem({ idea }: { idea: IdeaListItem }) {
  const navigate = useNavigate()
  const tag = difficultyTag(idea.confidence_score)

  const goTo = (path: string) => {
    setCurrentIdeaId(idea.id)
    navigate(path)
  }

  return (
    <div className="min-w-0 w-full flex-1 rounded-[18px] border border-[#E8E8E0] bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.06)] sm:rounded-[22px] sm:p-5">
      <h4 className="text-sm font-extrabold leading-snug text-[#001F3F] sm:text-[15px]">
        {idea.business_idea}
      </h4>
      <p className="mt-2 text-xs leading-relaxed text-[#5B6472]">
        {idea.industry || 'General'}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${tag.bg} ${tag.text}`}>
          {tag.label} ({idea.confidence_score}/100)
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-2">
        <button
          onClick={() => goTo('/dashboard/opportunity-insights')}
          className="flex-1 rounded-xl border border-[#D7263D] px-3 py-2.5 text-xs font-semibold text-[#D7263D] transition hover:bg-[#D7263D]/5 sm:py-2"
        >
          Validate
        </button>
        <AIDashboardButton
          variant="secondary"
          className="flex-1 py-2 text-xs"
          onClick={() => goTo('/dashboard/business-plan')}
        >
          Build Plan
        </AIDashboardButton>
      </div>
    </div>
  )
}

export default function IGPreviousIdeas() {
  const [ideas, setIdeas] = useState<IdeaListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    listIdeas()
      .then((data) => {
        if (!cancelled) setIdeas(data.slice(0, 4))
      })
      .catch(() => {
        if (!cancelled) setIdeas([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (loading || ideas.length === 0) return null

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#E8E8E0]" />
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9AA3B2]">
          <span className="text-[10px]">📁 </span>
          Previously Generated Ideas
        </div>
        <div className="h-px flex-1 bg-[#E8E8E0]" />
      </div>

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:gap-4">
        {ideas.map((idea) => (
          <IdeaCardItem key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  )
}
