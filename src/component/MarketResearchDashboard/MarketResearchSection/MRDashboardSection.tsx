import ChatSideBarPanel from '../ChatSideBar/ChatSideBarPanel'
import MRCompetitiveEdge from './MRCompetitiveEdge'
import MRCompetitorAnalysis from './MRCompetitorAnalysis'
import MREmpty from './MREmpty'
import MRResultHero from './MRHero'
import MRPreviousReports from './MRPreviousReport'
import MRTargetAudience from './MRTargetAudience'

type Props = {
  hasContent?: boolean
}

export const MRDashboardSection = ({ hasContent = true }: Props) => {
  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {hasContent ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,430px)] xl:items-start">
            <div className="min-w-0 space-y-6">
              <div className="grid min-w-0 gap-6 lg:grid-cols-2">
                <MRResultHero />
                <MRCompetitorAnalysis />
              </div>

              <div className="grid min-w-0 gap-6 lg:grid-cols-2">
                <MRTargetAudience />
                <MRCompetitiveEdge />
              </div>

              <MRPreviousReports />
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