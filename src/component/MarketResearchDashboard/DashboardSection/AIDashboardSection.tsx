import ChatSideBarPanel from '../ChatSideBar/ChatSideBarPanel'
import DashboardActivity from './AIDashboardActivity'
import DashboardEmpty from './AIDashboardEmpty'
import DashboardHero from './AIDashboardHero'
import DashboardProjects from './AIDashboardProjects'
import DashboardStats from './AIDashboardStats'
import DashboardRecommendations from './AIRecommendations'

type Props = {
  hasContent?: boolean
}

const DashboardSection = ({ hasContent = true }: Props) => {
  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {hasContent ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,430px)] xl:items-start">
            <div className="space-y-6">
              <DashboardHero hasContent={hasContent} />
              <DashboardStats />

              <DashboardProjects />

              <div className="grid gap-6 lg:grid-cols-2">
                <DashboardActivity />
                <DashboardRecommendations />
              </div>
            </div>

            <ChatSideBarPanel />
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] xl:items-start">
            <DashboardEmpty />
            <ChatSideBarPanel />
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardSection