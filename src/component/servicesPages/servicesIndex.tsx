import BusinessPackages from "./BusinessPackages"
import CommunityImpact from "./CommunityImpact"
import CTASection from "./ctasection"
import FAQSection from "./faqcomponent"
import HowItWorks from "./HowItWorks"
import ServiceHeroSection from "./serviceHero"
import SupportServices from "./SupportServices"
import WhatWeDo from "./WhatWeDo"

const ServicesIndexPage = () => {
    return (
        <>
            <ServiceHeroSection />
            <WhatWeDo />
            <HowItWorks />
            <SupportServices />
            <section id="business">
                <BusinessPackages />
            </section>

            <CommunityImpact />
            <FAQSection />
            <CTASection />
        </>
    )
}

export default ServicesIndexPage