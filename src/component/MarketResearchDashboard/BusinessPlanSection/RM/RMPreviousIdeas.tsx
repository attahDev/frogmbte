import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listIdeas, type IdeaListItem } from '../../lib/ideaEngineApi'
import { setCurrentIdeaId } from '../../lib/currentIdea'

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24))
  if (days <= 0) return 'Created today'
  if (days === 1) return 'Created 1 day ago'
  if (days < 7) return `Created ${days} days ago`
  const weeks = Math.floor(days / 7)
  return `Created ${weeks} week${weeks > 1 ? 's' : ''} ago`
}

function confidenceStage(score: number) {
  if (score >= 80) return { label: 'Progress: Beta Launch', width: 'w-3/5' }
  if (score >= 60) return { label: 'Progress: Week 1-2 Done', width: 'w-2/5' }
  return { label: 'Progress: Month 1 - MVP', width: 'w-1/4' }
}

export default function RoadmapPreviousIdeas() {
  const navigate = useNavigate()
  const [ideas, setIdeas] = useState<IdeaListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    listIdeas()
      .then((data) => {
        if (!cancelled) setIdeas(data.slice(0, 3))
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
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#D6DAE3]" />
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#5B6472]">
          <span>🏷</span> Previously Generated Ideas
        </span>
        <div className="h-px flex-1 bg-[#D6DAE3]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {ideas.map((idea) => {
          const stage = confidenceStage(idea.confidence_score)
          return (
            <button
              key={idea.id}
              type="button"
              onClick={() => {
                setCurrentIdeaId(idea.id)
                navigate(0)
              }}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-4 text-left shadow-[0_4px_14px_rgba(15,23,42,0.05)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <h4 className="mb-1 text-xs font-extrabold tracking-wide text-[#001F3F] uppercase">
                {idea.business_idea}
              </h4>
              <p className="mb-3 text-xs text-[#9CA3AF]">{timeAgo(idea.created_at)}</p>
              <p className="mb-1.5 text-xs text-[#5B6472]">{stage.label}</p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F2F2EE]">
                <div className={`h-full rounded-full ${stage.width} bg-[#F5A623]`} />
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
