import CommunitySpotlight from "../DashboardSection/CommunitySpotlight"
import CollaborationLiveSessions from "./CollaborativeSession"
import CommunityMentorship from "./CommunityMentorship"
import EducationlToolkit from "./EducationalToolkits"
import RealWorldPractice from "./RealWorldPractice"
import LearningModules from "./ToolkitsCourses"
// import ToolkitCourses from "./ToolkitsCourses"

export const ToolkitsIndex = () => {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
    <EducationlToolkit />
    <LearningModules />
    <CollaborationLiveSessions />
    <CommunityMentorship />
    <RealWorldPractice />
    <CommunitySpotlight />
    </div>
  )
}
