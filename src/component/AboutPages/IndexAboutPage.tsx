
import NewsletterSignup from "../LandingPages/NewsLetterSignup"
import SupportMissionSection from "../LandingPages/SupportMissionSection"
import AboutGMBTE from "./AboutGTME"
import ACommunitySpotlight from "./ACommunitySpotlight"
import CommunityImpact from "./CommunityImpact"
import EmpowerSection from "./EmpowerSection"
import LaunchIdeationRoadmap from "./LunchToidiation"
import MeetTheTeam from "./MeetTheTeam"
// import OurStory from "./OurStory"
import RootedInManchester from "./RootedInManchester"


export const IndexAboutPage = () => {
  return (
    <>
    <AboutGMBTE />
    <EmpowerSection />
    <ACommunitySpotlight />
    {/* <OurStory /> */}
    <LaunchIdeationRoadmap />
    <RootedInManchester />
    <CommunityImpact />
    <SupportMissionSection />
    <NewsletterSignup />
    <MeetTheTeam />
    </>
  )
}
