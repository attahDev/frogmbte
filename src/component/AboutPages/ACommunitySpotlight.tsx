/* eslint-disable @typescript-eslint/no-empty-object-type */
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

interface SpotlightItem {
  image: string;
  name: string;
  lname: string;
  role: string;
  description: string;
}

interface SpotlightCardProps extends SpotlightItem {}

const SWIPE_OFFSET = 60;
const SWIPE_VELOCITY = 500;

const spotlightItems: SpotlightItem[] = [
  {
    image: "/about/spolight/mrmike.jpeg",
    name: "Michael",
    lname: "Ekpechue",
    role: "Technology & Innovation",
    description:
      "Digital skills create opportunity, but community and mentorship help people turn that opportunity into lasting impact.",
  },
  {
    image: "/about/spolight/annate.jpeg",
    name: "Annette",
    lname: "Joseph",
    role: "Entrepreneurship & Leadership",
    description:
      "When people are given access to skills, support and the right network, they gain the confidence to lead and innovate.",
  },
  {
    image: "/about/spolight/mary.jpeg",
    name: "Mary",
    lname: "Fashanu",
    role: "Design & Digital Innovation",
    description:
      "Technology becomes meaningful when people have the skills and opportunity to use it to solve real problems.",
  },
  {
    image: "/spotlight/bimbo.png",
    name: "Bimbo",
    lname: "Ponmile",
    role: "Technology & Community",
    description:
      "Strong tech communities grow when talent is supported, knowledge is shared and everyone has the opportunity to thrive.",
  },
];

const QuoteIcon: FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 sm:h-6 sm:w-6"
    aria-hidden="true"
  >
    <path
      d="M16 3C15.47 3 14.96 3.21 14.59 3.59C14.21 3.96 14 4.47 14 5V11C14 11.53 14.21 12.04 14.59 12.41C14.96 12.79 15.47 13 16 13C16.27 13 16.52 13.11 16.71 13.29C16.89 13.48 17 13.73 17 14V15C17 15.53 16.79 16.04 16.41 16.41C16.04 16.79 15.53 17 15 17C14.73 17 14.48 17.11 14.29 17.29C14.11 17.48 14 17.73 14 18V20C14 20.27 14.11 20.52 14.29 20.71C14.48 20.89 14.73 21 15 21C16.59 21 18.12 20.37 19.24 19.24C20.37 18.12 21 16.59 21 15V5C21 4.47 20.79 3.96 20.41 3.59C20.04 3.21 19.53 3 19 3H16Z"
      stroke="#001F3F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M5 3C4.47 3 3.96 3.21 3.59 3.59C3.21 3.96 3 4.47 3 5V11C3 11.53 3.21 12.04 3.59 12.41C3.96 12.79 4.47 13 5 13C5.27 13 5.52 13.11 5.71 13.29C5.89 13.48 6 13.73 6 14V15C6 15.53 5.79 16.04 5.41 16.41C5.04 16.79 4.53 17 4 17C3.73 17 3.48 17.11 3.29 17.29C3.11 17.48 3 17.73 3 18V20C3 20.27 3.11 20.52 3.29 20.71C3.48 20.89 3.73 21 4 21C5.59 21 7.12 20.37 8.24 19.24C9.37 18.12 10 16.59 10 15V5C10 4.47 9.79 3.96 9.41 3.59C9.04 3.21 8.53 3 8 3H5Z"
      stroke="#001F3F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SpotlightCard: FC<SpotlightCardProps> = ({
  image,
  name,
  lname,
  description,
}) => (
  <article className="flex w-full min-w-full shrink-0 flex-col overflow-hidden rounded-xl border-l-4 border-[#FFD700] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[calc(50%-12px)] sm:min-w-[calc(50%-12px)] sm:shrink lg:w-[calc(33.333%-16px)] lg:min-w-[calc(33.333%-16px)]">
    <div className="group relative h-48 w-full overflow-hidden sm:h-60 md:h-72">
      <img
        src={image}
        alt={`Headshot of ${name} ${lname}`}
        draggable={false}
        className="pointer-events-none h-full w-full object-cover object-[50%_10%] transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] shadow-md sm:right-4 sm:top-4 sm:h-10 sm:w-10">
        <QuoteIcon />
      </div>
    </div>

    <div className="relative flex grow flex-col p-5 sm:p-7 lg:p-8">
      <span className="pointer-events-none absolute right-5 top-2 font-serif text-[72px] leading-none text-[#001F3F]/5">
        “
      </span>

      <h3 className="relative text-lg font-extrabold text-[#001F3F] sm:text-xl">
        {name} <span className="text-[#D7263D]">{lname}</span>
      </h3>

      <p className="relative mt-3 grow text-sm leading-6 text-gray-700 sm:mt-4 sm:text-base sm:leading-relaxed">
        {description}
      </p>
    </div>
  </article>
);

const ACommunitySpotlight: FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setItemsPerView(3);
      } else if (window.matchMedia("(min-width: 640px)").matches) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();

    window.addEventListener("resize", updateItemsPerView);

    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, []);

  useEffect(() => {
    setStartIndex(0);
  }, [itemsPerView]);

  const maxStartIndex = Math.max(
    spotlightItems.length - itemsPerView,
    0
  );

  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStartIndex;

  const displayedItems = useMemo(
    () =>
      spotlightItems.slice(
        startIndex,
        startIndex + itemsPerView
      ),
    [startIndex, itemsPerView]
  );

  const handlePrev = () => {
    if (!canPrev) return;

    setStartIndex((prev) =>
      Math.max(prev - itemsPerView, 0)
    );
  };

  const handleNext = () => {
    if (!canNext) return;

    setStartIndex((prev) =>
      Math.min(
        prev + itemsPerView,
        maxStartIndex
      )
    );
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;

    if (
      offset.x < -SWIPE_OFFSET ||
      velocity.x < -SWIPE_VELOCITY
    ) {
      handleNext();
      return;
    }

    if (
      offset.x > SWIPE_OFFSET ||
      velocity.x > SWIPE_VELOCITY
    ) {
      handlePrev();
    }
  };

  const handleDotClick = (index: number) => {
    setStartIndex(
      Math.min(
        index * itemsPerView,
        maxStartIndex
      )
    );
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#FFFEFB] to-white px-4 py-14 sm:py-20 md:px-8 lg:px-16 lg:py-24">
      <div className="relative mx-auto max-w-[1500px]">
        <div className="mb-9 text-center sm:mb-14">
          <span className="inline-flex rounded-full bg-gray-100 px-4 py-2 text-xs font-medium tracking-wider text-gray-700 sm:px-5 sm:text-sm">
            Featured Stories
          </span>

          <h2 className="mt-4 text-2xl font-extrabold text-[#001F3F] sm:text-3xl">
            Community Spotlight
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-lg">
            Voices, ideas and stories from people helping shape the future of technology.
          </p>
        </div>

        <div className="relative flex w-full items-center justify-center">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous stories"
            aria-disabled={!canPrev}
            className={`absolute left-0 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full shadow-md transition sm:flex ${
              canPrev
                ? "bg-[#001F3F] text-white hover:scale-105"
                : "cursor-not-allowed bg-[#001F3F]/40 text-white/35"
            }`}
          >
            <ChevronLeft size={22} />
          </button>

          <div className="w-full touch-pan-y overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={startIndex}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.35}
                onDragEnd={handleDragEnd}
                className="flex cursor-grab flex-nowrap justify-start gap-4 active:cursor-grabbing sm:cursor-default sm:justify-between sm:gap-6"
              >
                {displayedItems.map((item) => (
                  <SpotlightCard
                    key={`${item.name}-${item.lname}`}
                    {...item}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next stories"
            aria-disabled={!canNext}
            className={`absolute right-0 z-20 hidden h-12 w-12 translate-x-1/2 items-center justify-center rounded-full shadow-md transition sm:flex ${
              canNext
                ? "bg-[#001F3F] text-white hover:scale-105"
                : "cursor-not-allowed bg-[#001F3F]/40 text-white/35"
            }`}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between sm:hidden">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous story"
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              canPrev
                ? "bg-[#001F3F] text-white"
                : "bg-[#001F3F]/10 text-[#001F3F]/30"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-3">
            <MoveHorizontal
              size={16}
              className="text-gray-400"
            />

            <span className="text-xs text-gray-500">
              Explore stories
            </span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next story"
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              canNext
                ? "bg-[#001F3F] text-white"
                : "bg-[#001F3F]/10 text-[#001F3F]/30"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-5 flex justify-center gap-2 sm:hidden">
          {spotlightItems.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to story ${index + 1}`}
              onClick={() =>
                handleDotClick(index)
              }
              className={`h-2 rounded-full transition-all ${
                startIndex === index
                  ? "w-6 bg-[#001F3F]"
                  : "w-2 bg-[#001F3F]/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ACommunitySpotlight;