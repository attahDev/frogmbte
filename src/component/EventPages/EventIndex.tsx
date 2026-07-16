import EventsSection from "../LandingPages/EventsSection"
import NewsletterSignup from "../LandingPages/NewsLetterSignup"
import PartnersSection from "../PartnersPage/PartnersSection"
import EventHighlightSection from "./EventHighlightSection"
import EventsHeroSection from "./EventsHeroSection"
import EventsHighlights from "./EventsHighlights"


export const EventIndex = () => {
  return (
    <>
    <EventsHeroSection />
    <section id="events">ƒ
      <EventsSection />
    </section>
    
    <EventHighlightSection />
    <EventsHighlights />
    <NewsletterSignup />
    <PartnersSection />
    </>
  )
}
