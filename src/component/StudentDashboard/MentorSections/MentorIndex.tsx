import FindMentor from "./FindMentor"
import MentorsDashboard from "./mentorsDashboard"
import MentorshipProgress from "./MentorshipProgress"
import MentorSpotlight from "./MentorSpotlight"


export const MentorIndex = () => {
  return (
    <div className="min-w-0 overflow-x-hidden bg-[#FFFDF7] pb-20 lg:pb-8">
      <MentorsDashboard />
      <MentorshipProgress />
      <FindMentor />
      <MentorSpotlight />
    </div>
  )
}
