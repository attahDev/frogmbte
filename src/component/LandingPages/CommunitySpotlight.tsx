import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface Spotlight {
  name: string;
  lname: string;
  role: string;
  quote: string;
  image: string;
}

const spotlights: Spotlight[] = [
  {
    name: "Adewale",
    lname: "Omoniyi",
    role: "Software Engineer at MediaCityUK",
    quote: "What struck me most was the incredible knowledge shared by fellow  speakers and the vibrant connections I made with some of the brightest  minds in the industry.",
    image: "/spotlight/adewale.jpeg",
  },
  {
    name: "Emilee",
    lname: "Simmons",
    role: "AI and ML Engineer",
    quote:
      "The most effective entrepreneurial individuals have been found to be those who adopt an effectual logic. They start with the means they have and rely on the journey to gen...",
    image: "/spotlight/emilee.jpeg",
  },
  {
    name: "Carol Ann",
    lname: "Whitehead",
    role: "Mentor And Change Maker",
    quote:
      "Expression is power, when we tell our stories, we reclaim the narrative. Inclusion starts with voice being heard, being seen, being respected",
    image: "/spotlight/carol.jpeg",
  },
  {
    name: "Sara",
    lname: "Okafor",
    role: "Product Manager at TechNorth",
    quote:
      "The Manchester tech community gave me the confidence to lead diverse teams.",
    image: "/spotlight/woman1.png",
  },
  {
    name: "James",
    lname: "Taylor",
    role: "AI Researcher at Innovate UK",
    quote: "Innovation thrives when collaboration meets curiosity.",
    image: "/spotlight/woman2.png",
  },
  {
    name: "Aisha",
    lname: "Bello",
    role: "Blockchain Engineer at FinTech North",
    quote:
      "Building decentralized tools that empower local startups is my mission.",
    image: "/spotlight/woman3.png",
  },
];

export default function CommunitySpotlight() {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setItemsPerView(3);
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    setStartIndex(0);
  }, [itemsPerView]);

  const handleNext = () =>
    setStartIndex((prev) =>
      prev + itemsPerView >= spotlights.length ? 0 : prev + itemsPerView
    );

  const handlePrev = () =>
    setStartIndex((prev) =>
      prev - itemsPerView < 0
        ? Math.max(spotlights.length - itemsPerView, 0)
        : prev - itemsPerView
    );

  const visibleSpotlights = spotlights.slice(startIndex, startIndex + itemsPerView);
  const displayed =
    visibleSpotlights.length < itemsPerView
      ? [
          ...visibleSpotlights,
          ...spotlights.slice(0, itemsPerView - visibleSpotlights.length),
        ]
      : visibleSpotlights;

  return (
    <section className="bg-[#FFFDF7] mb-16 sm:mb-20 md:mb-24 text-center relative w-full overflow-hidden py-8 sm:py-0">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <p className="text-sm sm:text-base font-medium text-[#001F3F] bg-[#F5F5F5] inline-block px-3 py-1 rounded-full mb-4">
          Featured Stories
        </p>
        <h2 className="font-open-sans text-2xl sm:text-[32px] md:text-[35px] font-bold text-[#001F3F]">
          Community Spotlight
        </h2>
        <p className="font-open-sans text-base sm:text-lg md:text-2xl text-[#6B7280] mt-2 px-2">
          Celebrating the faces shaping Manchester's tech future.
        </p>

        {/* Carousel */}
        <div className="relative mt-8 sm:mt-12 flex items-center justify-center w-full px-0 sm:px-10 md:px-14">
          {/* Left Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous stories"
            className="absolute left-0 sm:-left-2 md:-left-6 bg-[#001F3F]/95 text-white rounded-full p-2.5 sm:p-3 hover:scale-105 transition z-10 shadow-md hidden sm:flex items-center justify-center"
          >
            <ArrowLeft size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>

          {/* Container */}
          <div className="overflow-hidden w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={startIndex}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-nowrap gap-4 sm:gap-6 justify-start sm:justify-between"
              >
                {displayed.map((spotlight, i) => (
                  <div
                    key={i}
                    className="relative rounded-3xl overflow-hidden shadow-lg h-[320px] sm:h-[360px] md:h-[380px] flex-1 min-w-full sm:min-w-[calc(50%-12px)] md:min-w-[calc(33.333%-16px)] flex items-end group shrink-0 sm:shrink"
                  >
                    {/* Image container with smooth zoom on hover */}
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={spotlight.image}
                        alt={`Headshot of ${spotlight.name} ${spotlight.lname}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>

                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 bg-[#FFD700] rounded-full p-3 z-10">
                      <Quote className="text-gray-800" />
                    </div>

                    {/* Text content */}
                    <div className="relative z-10 w-full p-4 sm:p-6 text-left text-white">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
                        {spotlight.name} <span className="text-[#FFD700]">{spotlight.lname} </span>
                      </h3>
                      {/* <p className="text-[#FFD700] text-sm mt-1">{spotlight.role}</p> */}
                      <p className="italic text-xs sm:text-sm mt-2 sm:mt-3 max-w-md line-clamp-3 sm:line-clamp-none">
                        "{spotlight.quote}"
                      </p>
                      <button className="mt-3 sm:mt-5 inline-flex items-center gap-2 bg-[#D7263D] hover:bg-[#D7263D] text-white px-4 sm:px-5 py-2 text-sm sm:text-base rounded-md transition">
                        Read Story →
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNext}
            aria-label="Next stories"
            className="absolute right-0 sm:-right-2 md:-right-6 bg-[#001F3F]/95 text-white rounded-full p-2.5 sm:p-3 hover:scale-105 transition z-10 shadow-md hidden sm:flex items-center justify-center"
          >
            <ArrowRight size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>

        {/* Mobile dot indicators */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          {Array.from({ length: Math.ceil(spotlights.length / itemsPerView) }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setStartIndex(i * itemsPerView)}
              className={`h-2 rounded-full transition-all ${
                Math.floor(startIndex / itemsPerView) === i
                  ? "w-6 bg-[#001F3F]"
                  : "w-2 bg-[#001F3F]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
