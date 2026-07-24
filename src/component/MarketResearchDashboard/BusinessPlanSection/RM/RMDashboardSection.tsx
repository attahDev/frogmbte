import ChatSideBarPanel from "../../ChatSideBar/ChatSideBarPanel"
import RoadmapPreviousIdeas from "./RMPreviousIdeas"
import RoadmapTimeline from "./RMTimeline"
import type { IdeaContent } from '../../lib/ideaEngineApi'

type Props = {
  content?: IdeaContent
}

export const RoadmapDashboardSection = ({ content }: Props) => {
  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(360px,430px)] xl:items-start">
          <div className="space-y-6">
            <RoadmapTimeline content={content} />
            <RoadmapPreviousIdeas />
          </div>

          <ChatSideBarPanel />
        </div>
      </div>
    </div>
  )
}
