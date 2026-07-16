import { useState } from "react";
import { ArrowRight } from "lucide-react";
import SupportMissionModal from "./SupportMissionModal";

export default function SupportMissionSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative bg-[#FFFBEA] overflow-hidden py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Decorative background pattern */}
      <div className="absolute bottom-[-50px] left-[-150px] opacity-10 rotate-[35deg] pointer-events-none select-none">
        <svg width="500" height="500" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.37631 12.5932L10.1976 12.5844C10.1471 13.2199 8.80268 14.4119 8.24989 14.6333C8.1261 14.4928 7.87394 14.3313 7.70862 14.2071C7.2359 13.852 6.48818 13.1772 6.37631 12.5932ZM10.6057 11.2529L6.10527 11.2352C5.77801 11.1405 5.902 10.6995 5.94612 10.1752L10.6419 10.1825C10.7001 10.5392 10.6814 10.9489 10.6057 11.2529ZM6.19608 8.82775C6.30795 8.29344 6.76537 7.89583 7.07714 7.65977C8.21134 6.80097 8.56066 6.86356 9.63565 7.70388C9.96371 7.96041 10.3633 8.27198 10.4807 8.82736L6.19608 8.82775ZM10.3319 6.99629C11.3091 6.48045 11.8502 5.95965 13.0989 5.53482C13.6433 5.34943 14.3938 5.24015 14.9373 5.45197C16.5567 6.08305 15.3639 8.28609 13.1161 8.39935C12.582 8.42637 11.5623 8.42795 11.2728 8.12016L10.3321 6.99629H10.3319ZM6.35902 7.0875C5.3506 7.74402 6.00949 8.55652 3.44403 8.39557C1.23225 8.25688 0.0197617 5.95688 1.78803 5.41918C3.34806 4.94488 6.12634 6.69983 6.35902 7.0875ZM9.08007 4.35949C9.7048 5.14596 9.40853 4.67961 9.73083 5.02217C9.31673 6.35866 7.16377 6.17903 6.87049 5.02217L7.32592 4.64443C7.49938 4.06938 7.67881 3.9907 7.40997 3.35346C8.09132 3.0405 8.34169 3.02221 9.07431 3.30219C9.09438 3.73318 8.94634 3.7914 9.08007 4.35949ZM6.62488 2.85291C6.26841 3.08063 5.96837 3.55791 5.86266 4.12541C5.71303 4.92818 5.98406 5.29121 6.21456 5.80685C4.85503 5.0792 2.63829 3.6841 0.885915 4.84831C-0.524487 5.78539 -0.199601 7.61565 1.49634 8.69144C2.41375 9.27344 3.34408 9.32113 4.57207 9.26191C4.36383 9.75887 3.26778 10.5149 2.44952 10.598C2.06105 10.6373 1.70418 10.6054 1.71391 11.0461C1.72981 11.7545 2.97728 11.4469 3.45953 11.2651C4.17447 10.9956 4.44033 10.6266 4.91384 10.318C4.92139 13.2012 6.52653 14.7748 8.2793 15.75C8.96065 15.481 10.1646 14.4233 10.6427 13.7441C11.3461 12.7446 11.6078 11.8608 11.6638 10.3234C11.8526 10.4224 12.0726 10.6505 12.2945 10.8092C13.0802 11.371 14.6792 11.8612 14.8409 11.1709C14.9581 10.6705 14.609 10.6395 14.238 10.6054C13.8593 10.5704 13.6139 10.4979 13.3003 10.3349C12.8094 10.0796 12.2051 9.62237 11.9895 9.24384C14.2364 9.47453 16.6237 8.46849 16.6247 6.34712C16.6253 5.11953 15.2864 4.28021 13.7832 4.43639C12.9002 4.52819 11.945 5.0013 11.1806 5.40606C10.8956 5.55688 10.678 5.73074 10.375 5.82433C10.9813 4.71119 10.8986 3.59051 9.99331 2.86544C10.0907 2.30688 10.8392 1.60664 11.1607 1.34435C11.4752 1.08743 11.6257 1.04729 12.0074 0.868655C12.4356 0.668162 12.4829 0.239557 12.1165 0.0539678C11.5943 -0.210507 10.6333 0.59286 10.3806 0.830311C10.1217 1.07352 9.97086 1.24242 9.73898 1.51544C9.51702 1.77674 9.31316 2.13639 9.14028 2.31303C8.21889 2.14592 8.31109 2.20713 7.41592 2.30529C7.2196 1.79899 5.22164 -0.395105 4.38013 0.0623118C4.23408 0.141793 3.93423 0.562453 4.4912 0.860311C4.84728 1.05047 5.06506 1.10074 5.39153 1.35369C5.77543 1.65115 6.48361 2.32476 6.62469 2.85351L6.62488 2.85291Z" fill="#040404" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center justify-center">
        {/* Left Column */}
        <div className="z-10 text-center lg:text-left">
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-semibold text-[#001F3F] mb-4 sm:mb-6 leading-snug">
            Empowering Greater Manchester
            <br className="hidden sm:block" />
            Through Tech and Opportunities
          </h2>

          <p className="text-[16px] sm:text-[18px] text-[#001F3F] mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Your support fuels the programs that give local talent the skills, mentorship
            and confidence to thrive in tech. Whether it’s £5 or £500, your gift helps make
            tech accessible to everyone in Manchester.
          </p>

          <p className="text-[20px] sm:text-[22px] md:text-[24px] font-medium text-[#D7263D] mb-8">
            Powered by community. Driven by innovation.
          </p>

          <button onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-2 bg-[#D7263D] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#b62234] transition w-full sm:w-auto">
            Support the Mission <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Column - Image */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="rounded-2xl shadow-md overflow-hidden max-w-[500px] sm:max-w-[600px] md:max-w-[700px] w-full">
            <img
              src="/events/support.jpg"
              alt="A woman in vibrant clothing speaks into a microphone in front of a diverse, attentive audience seated in rows."
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <SupportMissionModal
  isOpen={open}
  onClose={() => setOpen(false)}
/>
    </section>
  );
}
