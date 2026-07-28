import { Quote } from "lucide-react";
import React from "react";

interface Testimonial {
  name: string;
  title: string;
  message: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Aisha Patel",
    title: "Senior Developer • TechStart Manchester",
    message:
      "GMBTE changed my career trajectory completely. Through their mentorship program, I connected with industry leaders who helped me transition from hospitality into tech. Today, I'm a senior developer at a Manchester startup, and I'm passionate about giving back to the community that supported me.",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Daniel Aamer",
    title: "Junior Developer • CodeBridge",
    message:
      "Thanks to GMBTE, I gained the confidence and support I needed to grow my skills and start my first job in tech. The mentorship experience was incredible.",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    name: "Sophie Li",
    title: "UX Designer • Northern Digital",
    message:
      "The GMBTE network opened doors I didn’t know existed. Their community gave me a sense of belonging and career direction.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
];

const CommunityImpact: React.FC = () => {
  return (
    <section className="bg-[#FFD700] py-16 md:py-20 text-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="font-montserrat text-xl font-bold text-[#001F3F] sm:text-[27px] mb-3 md:text-[30px]">
          Community Impact
        </h2>
        <p className="text-base sm:text-lg text-[#001F3F] mb-10 sm:mb-14 mx-auto">
          Real numbers, real impact. See how we're transforming lives <br /> and
          businesses across Greater Manchester.
        </p>

        {/* === DESKTOP LAYOUT === */}
        <div className="hidden lg:flex justify-center items-stretch gap-6 relative">
          {/* Left smaller card */}
          <div className="flex flex-col justify-between bg-[#FFF6C8] text-[#001F3F] italic rounded-2xl shadow-md p-6 w-[280px] flex-shrink-0 scale-95 translate-x-4 opacity-80">
            <div className="flex items-start">
              <div className="bg-[#E53935] text-white rounded-full p-2 mr-2 -mt-3">
                <Quote size={18} />
              </div>
              <p className="text-left text-[15px] leading-relaxed">
                {testimonials[1].message}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <img
                src={testimonials[1].avatar}
                alt={testimonials[1].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left leading-tight">
                <p className="font-semibold text-gray-900 text-sm">
                  {testimonials[1].name}
                </p>
                <p className="text-xs text-gray-600">{testimonials[1].title}</p>
              </div>
            </div>
          </div>

          {/* Center large card */}
          <div className="relative bg-white rounded-2xl shadow-xl p-10 w-full max-w-[800px] z-10 flex flex-col justify-between">
            <div>
              <div className="absolute -top-5 left-8 bg-[#E53935] text-white p-3 rounded-full">
                <Quote size={22} />
              </div>
              <p className="text-gray-800 italic text-[18px] leading-relaxed mb-8">
                "{testimonials[0].message}"
              </p>
            </div>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={testimonials[0].avatar}
                alt={testimonials[0].name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left leading-tight">
                <p className="font-semibold text-gray-900 text-[16px]">
                  {testimonials[0].name}
                </p>
                <p className="text-sm text-gray-600">{testimonials[0].title}</p>
              </div>
            </div>
          </div>

          {/* Right smaller card */}
          <div className="flex flex-col justify-between bg-[#FFF6C8] text-gray-700 italic rounded-2xl shadow-md p-6 w-[280px] flex-shrink-0 scale-95 -translate-x-4 opacity-80">
            <div className="flex items-start">
              <div className="bg-[#E53935] text-white rounded-full p-2 mr-2 -mt-3">
                <Quote size={18} />
              </div>
              <p className="text-left text-[15px] leading-relaxed">
                {testimonials[2].message}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <img
                src={testimonials[2].avatar}
                alt={testimonials[2].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left leading-tight">
                <p className="font-semibold text-gray-900 text-sm">
                  {testimonials[2].name}
                </p>
                <p className="text-xs text-gray-600">{testimonials[2].title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* === MOBILE/TABLET SCROLL LAYOUT === */}
        <div className="flex lg:hidden gap-4 overflow-x-auto mt-8 pb-4 px-2 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`${
                index === 0 ? "bg-white" : "bg-[#FFF6C8]"
              } min-w-[85%] sm:min-w-[70%] rounded-2xl shadow-md p-6 text-[#001F3F] italic snap-center flex flex-col justify-between`}
            >
              <div className="flex items-start">
                <div className="bg-[#E53935] text-white rounded-full p-2 mr-2 -mt-2">
                  <Quote size={18} />
                </div>
                <p className="text-left text-sm sm:text-base leading-relaxed">
                  "{t.message}"
                </p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div className="text-left leading-tight">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {t.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
