"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MissionSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Yellow Background Section */}
      <motion.div
        className="bg-[#FFD700] pb-40 sm:pb-52 md:pb-60 pt-8 sm:pt-10 text-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.span
            className="font-open-sans text-[14px] border-[#001F3F0D]/70 sm:text-[14px] font-medium bg-[#001F3F0D] text-[#001F3F] px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-3 mt-10 sm:mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Mission
          </motion.span>

          <motion.h2
            className="text-[26px] sm:text-[32px] md:text-[32px] lg:text-[35px] font-extrabold text-[#001F3F] leading-snug"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Greater Manchester Black Tech Expo <br className="hidden sm:block" />
            is building a connected, innovative <br className="hidden sm:block" />
            ecosystem where every community <br className="hidden sm:block" />
            can thrive in the digital economy.
          </motion.h2>

          <motion.p
            className="text-[16px] sm:text-[17px] md:text-[20px] text-[#D7263D] mt-4 mb-6 sm:mb-8 lg:mb-16 sm:mt-6 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Powered by community. Driven by innovation.
          </motion.p>
        </div>
      </motion.div>

      {/* Overlapping Image Card */}
      <motion.div
        className="relative max-w-[1440px] mx-auto px-4 sm:px-6 -mt-16 sm:-mt-28 md:-mt-40 z-20 pb-8 sm:pb-0"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className="relative overflow-hidden rounded-2xl h-[300px] sm:h-[400px] md:h-[500px] w-full flex flex-col justify-end shadow-2xl"
          style={{
            backgroundImage: "url('/images/mission.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Text on Image */}
          <div className="relative p-6 sm:p-10 text-white pb-20 sm:pb-10">
            <motion.h3
              className="text-xl sm:text-[28px] md:text-[35px] font-open-sans font-bold leading-snug pr-0 sm:pr-32"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              Be part of empowering our <br className="hidden sm:block" />
              community through tech <br className="hidden sm:block" />
              and connection
            </motion.h3>

            <motion.p
              className="mt-3 font-open-sans text-[14px] sm:text-[16px] md:text-[20px] text-[#DBEAFEB2]"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Join our next event and connect with the community
            </motion.p>
          </div>

          {/* Button */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 sm:bottom-11 sm:right-10 sm:left-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a href="/events" className="flex w-full sm:w-auto items-center justify-center gap-2 bg-white text-gray-900 font-medium px-6 sm:px-5 py-4 rounded-xl shadow-lg hover:bg-gray-100 active:scale-95 transition">
              Get Involved
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
