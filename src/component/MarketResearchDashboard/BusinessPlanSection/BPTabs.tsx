'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BPDashboardSection } from './BP/BPDashboardSection'
import { FinDashboardSection } from './FI/FIDashboardSection'
import { RoadmapDashboardSection } from './RM/RMDashboardSection'
import BPEmpty from './BPEmpty'
import ChatSideBarPanel from '../ChatSideBar/ChatSideBarPanel'
import { getIdea, type IdeaContent } from '../lib/ideaEngineApi'
import { getCurrentIdeaId } from '../lib/currentIdea'
import { getBusinessPlanById } from '../lib/businessPlannerApi'

type Tab = 'roadmap' | 'financials' | 'business-plan'

const tabs: { id: Tab; label: string }[] = [
  { id: 'roadmap',       label: 'Roadmap'       },
  { id: 'financials',    label: 'Financials'    },
  { id: 'business-plan', label: 'Business Plan' },
]

export default function BPTabs() {
  // planId in the URL (/dashboard/business-plan/:planId) is the source of
  // truth for which saved plan is being viewed. Since it's saved server-side
  // by userId, this URL works the same on any device the user is signed
  // into — no per-device/session state involved.
  const { planId: routePlanId } = useParams<{ planId?: string }>()
  const [active, setActive] = useState<Tab>('roadmap')
  const [content, setContent] = useState<IdeaContent | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [hasIdea, setHasIdea] = useState(false)
  const [planId, setPlanId] = useState<string | undefined>(undefined)
  const [initialCompletedIndexes, setInitialCompletedIndexes] = useState<number[]>([])

  useEffect(() => {
    if (!routePlanId) return
    let cancelled = false
    getBusinessPlanById(routePlanId)
      .then((plan) => {
        if (cancelled) return
        setPlanId(plan.id)
        setInitialCompletedIndexes(plan.completedActionIndexes || [])
      })
      .catch(() => {
        /* invalid/inaccessible plan id — checkboxes just start unchecked */
      })
    return () => {
      cancelled = true
    }
  }, [routePlanId])

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

  if (!hasIdea) {
    return (
      <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1600px] space-y-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] xl:items-start">
            <BPEmpty />
            <ChatSideBarPanel />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Tab bar */}
      <div className="border-b border-[#E5E7EB] bg-[#F2F2EE] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1600px] gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={[
                'py-3 text-sm font-semibold transition-colors duration-150',
                'border-b-2 -mb-px',
                active === tab.id
                  ? 'border-[#F6D04D] text-[#001F3F]'
                  : 'border-transparent text-[#9CA3AF] hover:text-[#5B6472]',
              ].join(' ')}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {active === 'roadmap'       && <RoadmapDashboardSection content={content} />}
      {active === 'financials'    && <FinDashboardSection     content={content} />}
      {active === 'business-plan' && (
        <BPDashboardSection
          content={content}
          planId={planId}
          initialCompletedIndexes={initialCompletedIndexes}
        />
      )}
    </div>
  )
}
