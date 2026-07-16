import NewsletterSignup from "../LandingPages/NewsLetterSignup"
import SupportMissionSection from "../LandingPages/SupportMissionSection"
import ContactHeroSection from "./ContactHeroSection"
import FindUsSection from "./FindUsSection"
import SendUsMessage from "./SendUsMessage"

export const IndexContact = () => {
  return (
    <>
    <ContactHeroSection />
    <section id="message">
<SendUsMessage />
    </section>
    
    <FindUsSection />
    <NewsletterSignup />
    <SupportMissionSection />
    </>
  )
}
