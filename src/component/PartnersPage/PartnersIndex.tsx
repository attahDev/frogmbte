import NewsletterSignup from "../LandingPages/NewsLetterSignup"
import AboutPartner from "./AboutPartners"
import PartnersSection from "./PartnersSection"
import PartnerSpotlight from "./PartnersSportlight"
import PartnerWithUs from "./PartnerWithUs"
import PartnersSpotlightSection from "./SpotlightSection"
import WhyPartner from "./WhyPartner"

const IndexPartnersPage = () => {
  return (
    <>
      <AboutPartner />
      <section id="view-partners">
        <PartnersSection />
      </section>
      
      <WhyPartner />
      <PartnersSpotlightSection />
      <PartnerSpotlight />
      <NewsletterSignup />
      <section id="partners">
        <PartnerWithUs />
      </section>

    </>
  )
}

export default IndexPartnersPage