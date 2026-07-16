import CommunitySpotlight from './CommunitySpotlight'
import ImpactGallery from './GallerySection'
import EventsSection from './EventsSection'
import HeroSection from './Herosection'
import MissionSection from './MissionSection'
import NewsletterSignup from './NewsLetterSignup'
import ProgramSection from './Programs'
import SupportMissionSection from './SupportMissionSection'

export const IndexLandingPage = () => {
  return (
    <>
      <HeroSection />
      <ProgramSection />
      <CommunitySpotlight />
      <ImpactGallery />
      <MissionSection />
      <section id="events">
        <EventsSection />
      </section>

      <NewsletterSignup />
      <SupportMissionSection />

    </>
  )
}
