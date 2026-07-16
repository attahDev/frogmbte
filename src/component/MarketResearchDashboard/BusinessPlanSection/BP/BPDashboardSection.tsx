
import ChatSideBarPanel from '../../ChatSideBar/ChatSideBarPanel'
import BPEmpty from '../BPEmpty'
import BPBusinessModel from './BPBusinessModel'
import BPExecutiveSummary from './BPExecutiveSummary'
import BPNextActions from './BPNextActions'

type Props = {
  hasContent?: boolean
}

export const BPDashboardSection = ({ hasContent = true }: Props) => {
  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {hasContent ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,430px)] xl:items-start">
            <div className="space-y-6">
              <BPExecutiveSummary />
              <BPBusinessModel />
              <BPNextActions />
            </div>

            <ChatSideBarPanel />
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,430px)] xl:items-start">
            <BPEmpty/>
            <ChatSideBarPanel />
          </div>
        )}
      </div>
    </div>
  )
}