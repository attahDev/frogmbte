import type { FC } from "react";
import { MapPin } from "lucide-react";

const FindUsSection: FC = () => {
  return (
    <section className="w-full bg-[#F9FAFB] py-12 sm:py-16 md:py-20 flex flex-col items-center px-4 sm:px-6 md:px-8">
      {/* Title */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-[#001F3F] leading-tight">
          Find Us
        </h2>
        <div className="h-[3px] w-10 sm:w-12 bg-[#FFD700] rounded-full mt-3 mx-auto" />
      </div>

      {/* Image Section */}
      <div className="relative w-full max-w-[1440px] h-[260px] sm:h-[320px] md:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
        {/* Background Image */}
        <img
          src="/contact/snedusmes.jpg"
          alt="Two modern skyscrapers with reflective glass facades rise against a cloudy sky."
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Centered Pin */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
          {/* Marker */}
          <div className="bg-[#D7263D] text-white p-2 sm:p-3 rounded-full shadow-lg mb-2">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </div>

          {/* Label */}
          <div className="bg-white text-[#001F3F] font-semibold px-4 sm:px-6 py-2 rounded-full shadow-md text-[14px] sm:text-[18px] md:text-[22px]">
            Greater Manchester
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUsSection;
