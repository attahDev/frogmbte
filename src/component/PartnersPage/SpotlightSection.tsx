import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { FC } from "react";

const PartnersSpotlightSection: FC = () => {
  return (
    <section className="bg-[#001F3F] text-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 overflow-hidden">
      {/* Left Image */}
      <motion.div
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative w-full min-w-0 md:w-1/2 rounded-2xl overflow-hidden md:mt-0"
      >
        <img
          src="/partners/partnersspotlight.jpg"
          alt="A group of people at a networking event engage in lively conversation."
          className="w-full h-auto rounded-2xl object-cover"
        />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#FFD700] text-[#001F3F] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-2 shadow-md text-sm sm:text-base">
          <Star className="fill-[#00264D] w-4 h-4 sm:w-5 sm:h-5" />
          Featured
        </div>
      </motion.div>

      {/* Right Content */}
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full min-w-0 md:w-1/2 space-y-4 sm:space-y-6 md:ml-6 lg:ml-12 text-center md:text-left"
      >
        <h4 className="text-[#FFD700] font-bold text-lg sm:text-[22px] md:text-[24px]">
          Spotlight
        </h4>

        <h2 className="text-2xl sm:text-[32px] md:text-[36px] font-extrabold leading-snug">
          TechNorth Partnership
        </h2>

        <p className="text-[#D1D5DC] text-[16px] sm:text-[18px] leading-relaxed">
          Empowering 200+ students through tech education initiatives,
          providing mentorship, career guidance, and hands-on learning
          opportunities in emerging technologies.
        </p>

        <div className="border-l-4 border-[#FFD700] text-sm sm:text-[16px] md:text-[18px] pl-4 italic text-gray-200 text-left">
          <p>
            "Our partnership with GMBTE has been transformative. Together,
            we're building a more inclusive tech ecosystem that truly represents
            Greater Manchester."
          </p>
          <p className="mt-3 text-[#FFD700] not-italic font-medium">
            — Sarah Johnson, Director of Community Engagement
          </p>
        </div>

        <div className="flex justify-center md:justify-start">
          {/* <button className="bg-[#D7263D]  mb-6 sm:mb-8 text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#D7263D] transition-all duration-300 flex items-center gap-2 text-[16px] sm:text-[18px]">
            Read More <span>→</span>
          </button> */}
        </div>
      </motion.div>
    </section>
  );
};

export default PartnersSpotlightSection;
