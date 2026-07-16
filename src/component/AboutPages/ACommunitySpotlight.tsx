import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FC } from "react";
import { useRef } from "react";

interface SpotlightCardProps {
  image: string;
  name: string;
  lname: string;
  // role: string;
  description: string;
}

const SpotlightCard: FC<SpotlightCardProps> = ({
  image,
  name,
  lname,
  description,
}) => (
  <div className="shrink-0 w-[90%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-[#FFD700] overflow-hidden flex flex-col">
    {/* Image Section */}
    <div className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden group">
      <img
        src={image}
        alt={`Headshot of ${name} ${lname}`}
        className="w-full  h-full object-cover object-[50%_10%] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#FFD700] text-[#001F3F] font-bold w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl shadow-md">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
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
      </div>
    </div>

    {/* Card Content */}
    <div className="p-5 sm:p-6 flex flex-col grow">
      <h3 className="text-lg sm:text-xl font-extrabold text-[#001F3F]">{name} <span className="text-[#D7263D]">{lname}</span></h3>
      {/* <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-medium">
        {role}
      </p> */}
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed grow">
        {description}
      </p>
      <a
        href="#"
        className="mt-4 sm:mt-5 inline-flex items-center text-[#D7263D] text-sm font-semibold hover:text-[#D7263D] transition-colors"
      >
        Read More
        <ChevronRight className="ml-1 w-4 h-4" />
      </a>
    </div>
  </div>
);

const ACommunitySpotlight: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const cards = [
    {
      image: "/about/spolight/mrmike.jpeg",
      name: "Michael",
      lname: "Ekpechue",
      role: "Software Engineer at MediaCityUK",
      description:
        "Black Tech Expo isn’t just an event. It’s a movement built on purpose, progress, and people",
    },
    {
      image: "/about/spolight/annate.jpeg",
      name: "Annette",
      lname: "Joseph",
      role: "Tech Entrepreneur & Founder",
      description:
        "Innovation begins when voices long silenced are finally heard. Every idea deserves a seat at the table, that’s how transformation begins.",
    },
    {
      image: "/about/spolight/mary.jpeg",
      name: "Mary",
      lname: "Fashanu",
      role: "UX Designer at Manchester Digital",
      description:
        "This is just the beginning. Let’s build local, scale global. The power of visibility changes everything when women see each other rise",
    },
     {
      image: "/spotlight/woman1.png",
      name: "Amara",
      lname: "Johnson",
      role: "Software Engineer at MediaCityUK",
      description:
        "Meet Amara Johnson, who began her journey through our mentorship program and now inspires young developers across Manchester.",
    },
    {
      image: "/spotlight/woman2.png",
      name: "Marcus",
      lname: "Williams",
      role: "Tech Entrepreneur & Founder",
      description:
        "Meet Marcus Williams from Hulme, who launched his first app after joining GMBTE's founder bootcamp, proving that big ideas can start right here.",
    },
    {
      image: "/spotlight/woman3.png",
      name: "David",
      lname: "Khan",
      role: "UX Designer at Manchester Digital",
      description:
        "Meet David Khan, who credits GMBTE for connecting him to mentors and a community that transformed his design career.",
    },
  ];

  return (
    <section className="bg-linear-to from-[#FFFEFB] to-white py-20 sm:py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-[1500px] mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-base sm:text-base font-semibold text-gray-700 bg-gray-100 px-4 sm:px-5 py-2 rounded-full uppercase tracking-wider mb-5">
            Featured Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-2">
            Community Spotlight
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            Stories that show how technology is changing lives across Manchester.
          </p>
        </div>

        {/* Scrollable Row */}
        <div className="relative">
          {/* Left Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full hidden sm:flex items-center justify-center shadow-lg border border-gray-200 transition-all z-10 hover:scale-110"
          >
            <ChevronLeft className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory px-1 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cards.map((card, index) => (
              <SpotlightCard key={index} {...card} />
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-[#FFD700] hover:bg-[#FFD700] w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full hidden sm:flex items-center justify-center shadow-lg transition-all z-10 hover:scale-110"
          >
            <ChevronRight className="text-gray-900 w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ACommunitySpotlight;
