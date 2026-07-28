import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

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
    quote:
      "What struck me most was the incredible knowledge shared by fellow speakers and the vibrant connections I made with some of the brightest minds in the industry.",
    image: "/spotlight/adewale.jpeg",
  },
  {
    name: "Dr. Emilee",
    lname: "Simmons",
    role: "AI and ML Engineer",
    quote:
      "The most effective entrepreneurial individuals have been found to be those who adopt an effectual logic. They start with the means they have and rely on the journey to generate ideas and opportunities.",
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
    name: "Esther ",
    lname: "Aluko",
    role: "AI Researcher at Innovate UK",
    quote:
      "What an eventful weekend at the GREATER MANCHESTER BLACK TECH EXPO! The lineup of speakers and panelists was brilliantly curated, representing diverse industries.",
    image: "/spotlight/esther.png",
  },
];

const SWIPE_OFFSET = 60;
const SWIPE_VELOCITY = 500;

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

  const maxStartIndex = Math.max(spotlights.length - itemsPerView, 0);
  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStartIndex;

  const handleNext = () => {
    if (!canNext) return;
    setStartIndex((prev) => Math.min(prev + itemsPerView, maxStartIndex));
  };

  const handlePrev = () => {
    if (!canPrev) return;
    setStartIndex((prev) => Math.max(prev - itemsPerView, 0));
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_OFFSET || velocity.x < -SWIPE_VELOCITY) {
      handleNext();
    } else if (offset.x > SWIPE_OFFSET || velocity.x > SWIPE_VELOCITY) {
      handlePrev();
    }
  };

  const displayed = spotlights.slice(startIndex, startIndex + itemsPerView);

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 text-center">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Header */}
        <p className="mb-4 inline-block rounded-full bg-[#F5F5F5] px-3 py-1 text-sm font-medium text-[#001F3F] sm:text-base">
          Featured Stories
        </p>
        <h2 className="font-montserrat text-xl font-bold text-[#001F3F] sm:text-[27px] md:text-[30px]">
          Community Spotlight
        </h2>
        <p className="font-montserrat mt-2 px-2 text-base text-[#6B7280] sm:text-lg md:text-2xl">
          Celebrating the faces shaping Manchester&apos;s tech future.
        </p>

        <div className="relative mt-10 flex w-full items-center justify-center sm:mt-12">
          {/* Left Button — overlaps left card edge */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous stories"
            aria-disabled={!canPrev}
            className={`absolute left-2 z-20 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full shadow-md transition sm:flex md:left-0 md:h-12 md:w-12 ${
              canPrev
                ? "bg-[#001F3F] text-white hover:scale-105"
                : "cursor-not-allowed bg-[#001F3F]/40 text-white/35"
            }`}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards */}
          <div className="w-full overflow-hidden touch-pan-y">
            <AnimatePresence mode="wait">
              <motion.div
                key={startIndex}
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -80, opacity: 0 }}
                transition={{ duration: 0.45 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={handleDragEnd}
                className="flex cursor-grab flex-nowrap justify-start gap-4 active:cursor-grabbing sm:cursor-default sm:gap-6 sm:justify-between"
              >
                {displayed.map((spotlight, i) => (
                  <div
                    key={`${spotlight.name}-${spotlight.lname}-${i}`}
                    className="group relative flex h-[200px] min-w-full flex-1 shrink-0 items-end overflow-hidden rounded-3xl shadow-lg sm:h-[300px] sm:min-w-[calc(50%-12px)] sm:shrink md:h-[350px] md:min-w-[calc(33.333%-16px)]"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={spotlight.image}
                        alt={`Headshot of ${spotlight.name} ${spotlight.lname}`}
                        className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    </div>

                    <div className="absolute right-4 top-4 z-10 rounded-full bg-[#FFD700] p-3">
                      <Quote className="text-gray-900" size={20} />
                    </div>

                    <div className="relative z-10 w-full p-5 text-left text-white sm:p-6">
                      <h3 className="font-montserrat text-lg font-semibold sm:text-xl">
                        {spotlight.name}{" "}
                        <span className="text-[#FFD700]">{spotlight.lname}</span>
                      </h3>
                      <p className="mt-2 line-clamp-3 max-w-md text-xs italic text-white/95 sm:mt-3 sm:text-sm sm:line-clamp-4">
                        &ldquo;{spotlight.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Button — overlaps right card edge */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next stories"
            aria-disabled={!canNext}
            className={`absolute right-2 z-20 hidden h-11 w-11 translate-x-1/2 items-center justify-center rounded-full shadow-md transition sm:flex md:right-0 md:h-12 md:w-12 ${
              canNext
                ? "bg-[#001F3F] text-white hover:scale-105"
                : "cursor-not-allowed bg-[#001F3F]/40 text-white/35"
            }`}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Mobile dot indicators */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          {Array.from({ length: Math.ceil(spotlights.length / itemsPerView) }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setStartIndex(Math.min(i * itemsPerView, maxStartIndex))}
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
