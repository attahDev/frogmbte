import { useEffect, useState } from 'react'
import ChatSideBarPanel from '../ChatSideBar/ChatSideBarPanel'
import IGEmpty from './IGEmpty'
import IGInsightCards from './IGInsightCards'
import IGNextSteps from './IGNextSteps'
import IGPreviousIdeas from './IGPreviousIdeas'
import IGResultHero from './IGResultHero'
import IGRevenueChart from './IGRevenueChart'
import IGScoreBreakdown from './IGScoreBreakdown'
import { getIdea, type IdeaContent } from '../lib/ideaEngineApi'
import { getCurrentIdeaId } from '../lib/currentIdea'

export const IGDashboardSection = () => {
  const [content, setContent] = useState<IdeaContent | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [hasIdea, setHasIdea] = useState(false)

  useEffect(() => {
    const ideaId = getCurrentIdeaId()
    if (!ideaId) {
      setLoading(false)
      return
    }
    let cancelled = false
    getIdea(ideaId)
      .then((idea) => {
        if (!cancelled) {
          setContent(idea.content)
          setHasIdea(true)
        }
      })
      .catch(() => {
        if (!cancelled) setHasIdea(false)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="min-h-screen bg-[#F2F2EE]" />
  }

  return (
    <div className="min-h-screen bg-[#F2F2EE] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-4 sm:space-y-6">
        {hasIdea ? (
          <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,430px)] xl:items-start">
            <div className="min-w-0 space-y-4 sm:space-y-6">
              <IGResultHero content={content} />
              <IGInsightCards content={content} />
              <IGRevenueChart content={content} />
              <IGScoreBreakdown content={content} />
              <IGNextSteps content={content} />
              <IGPreviousIdeas />
            </div>

            <ChatSideBarPanel />
          </div>
        ) : (
          <div className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] xl:items-start">
            <IGEmpty />
            <ChatSideBarPanel />
          </div>
        )}
      </div>
    </div>
  )
}
