import { useEffect, useState } from 'react'
import ChatSideBarPanel from '../ChatSideBar/ChatSideBarPanel'
import MRCompetitiveEdge from './MRCompetitiveEdge'
import MRCompetitorAnalysis from './MRCompetitorAnalysis'
import MREmpty from './MREmpty'
import MRResultHero from './MRHero'
import MRPreviousReports from './MRPreviousReport'
import MRTargetAudience from './MRTargetAudience'
import { getIdea, type IdeaContent } from '../lib/ideaEngineApi'
import { getCurrentIdeaId, setCurrentIdeaId } from '../lib/currentIdea'

export const MRDashboardSection = () => {
  const [content, setContent] = useState<IdeaContent | undefined>(undefined)
  const [ideaId, setIdeaId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasIdea, setHasIdea] = useState(false)

  const loadIdea = (id: string) => {
    setLoading(true)
    getIdea(id)
      .then((idea) => {
        setContent(idea.content)
        setIdeaId(idea.id)
        setHasIdea(true)
        setCurrentIdeaId(idea.id)
      })
      .catch(() => setHasIdea(false))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const current = getCurrentIdeaId()
    if (!current) {
      setLoading(false)
      return
    }
    loadIdea(current)
  }, [])

  if (loading) {
    return <div className="min-h-screen bg-[#F2F2EE]" />
  }

  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {hasIdea ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,430px)] xl:items-start">
            <div className="min-w-0 space-y-6">
              <div className="grid min-w-0 gap-6 lg:grid-cols-2">
                <MRResultHero content={content} />
                <MRCompetitorAnalysis content={content} />
              </div>

              <div className="grid min-w-0 gap-6 lg:grid-cols-2">
                <MRTargetAudience content={content} />
                <MRCompetitiveEdge content={content} ideaId={ideaId ?? undefined} />
              </div>

              <MRPreviousReports onSelect={loadIdea} />
            </div>

            <ChatSideBarPanel />
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] xl:items-start">
            <MREmpty />
            <ChatSideBarPanel />
          </div>
        )}
      </div>
    </div>
  )
}
