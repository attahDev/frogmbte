import React from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const EventHighlightSection: React.FC = () => {
  return (
    <section className="w-full">
      {/* TOP BLUE SECTION */}
      <div className="bg-[#001F3F] text-white py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-8 sm:gap-10 overflow-hidden">
        {/* Left Content */}
        <div className="w-full md:w-1/2 md:mt-0 text-center md:text-left md:ml-10">
          <span className="inline-block bg-[#D7263D] text-white text-[12px] sm:text-[14px] font-semibold px-3 py-1.5 sm:py-2 rounded-full mb-4 uppercase tracking-wide">
            Featured Event
          </span>

          <h2 className="text-[26px] sm:text-[30px] md:text-[34px] lg:text-[36px] font-bold mb-4 mt-4 leading-snug">
            Greater Manchester Black Tech Expo 2025
          </h2>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[#FFD700] font-[15px] sm:font-[16px] mb-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>December 27 - 29, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>In-Person</span>
            </div>
          </div>

          <p className="text-[#D1D5DC] text-[15px] sm:text-[18px] leading-relaxed mb-6">
            Our flagship annual event brings together over 1,000 tech
            professionals, entrepreneurs, and innovators for two days of
            networking, workshops, and inspiration. Experience keynote
            speakers, startup showcases, and countless opportunities to
            connect with the community.
          </p>

          <p className="text-[14px] sm:text-[16px] text-[#99A1AF] mb-8">
            <span className="font-semibold text-white">Location:</span>{" "}
            Manchester Central Convention Complex
          </p>

          <div className="flex justify-center md:justify-start">
            <button className="bg-[#FFD700] text-[#001F3F] text-[15px] sm:text-[16px] px-6 py-2.5 rounded-md hover:bg-yellow-300 transition-all shadow-md font-semibold">
              Register
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/events/eventhighlight.jpg"
            alt="A speaker addresses a room full of seated attendees at a community event."
            className="w-full max-w-full md:max-w-[650px] h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* YELLOW CTA SECTION */}
      <div className="bg-[#FFD700] text-center py-12 sm:py-16 px-4 sm:px-6">
        <h3 className="text-[22px] sm:text-[26px] md:text-[32px] lg:text-[35px] font-bold text-[#001F3F] mb-3">
          Host or Partner With Us
        </h3>
        <p className="text-[#001F3F99] text-base sm:text-lg md:text-[24px] mb-8 max-w-5xl mx-auto leading-relaxed">
          Join us in empowering Greater Manchester&apos;s tech community through impactful events.
        </p>

        <button className="bg-[#D7263D] text-white text-[15px] sm:text-[16px] px-8 py-3 rounded-md transition-all hover:scale-105 flex items-center gap-2 mx-auto shadow-lg mb-10 sm:mb-20 font-medium">
          <Link to="/contact">Get In Touch →</Link>
        </button>
      </div>
    </section>
  );
};

export default EventHighlightSection;
