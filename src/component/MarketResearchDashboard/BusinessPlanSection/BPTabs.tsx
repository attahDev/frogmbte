'use client'

import { useState } from 'react'
import { BPDashboardSection } from './BP/BPDashboardSection'
import { FinDashboardSection } from './FI/FIDashboardSection'
import { RoadmapDashboardSection } from './RM/RMDashboardSection'

type Tab = 'roadmap' | 'financials' | 'business-plan'

const tabs: { id: Tab; label: string }[] = [
  { id: 'roadmap',       label: 'Roadmap'       },
  { id: 'financials',    label: 'Financials'    },
  { id: 'business-plan', label: 'Business Plan' },
]

type Props = {
  hasContent?: boolean
}

export default function BPTabs({ hasContent = true }: Props) {
  const [active, setActive] = useState<Tab>('roadmap')

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
      {active === 'roadmap'       && <RoadmapDashboardSection hasContent={hasContent} />}
      {active === 'financials'    && <FinDashboardSection     hasContent={hasContent} />}
      {active === 'business-plan' && <BPDashboardSection      hasContent={hasContent} />}
    </div>
  )
}