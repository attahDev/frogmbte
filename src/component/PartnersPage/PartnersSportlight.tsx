import type { FC } from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SpotlightCardProps {
    image: string;
    name: string;
    description: string;
    alt: string;
}

const SpotlightCard: FC<SpotlightCardProps> = ({
    image,
    name,
    alt,
    description,
}) => (
    <div className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-[#FFFBEA] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-l-4 border-[#FFD700] overflow-hidden flex flex-col snap-center">
        <div className="relative w-full h-48 sm:h-64">
            <img src={image} alt={alt} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-[#FFD700] text-gray-900 font-bold w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 3C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V11C14 11.5304 14.2107 12.0391 14.5858 12.4142C14.9609 12.7893 15.4696 13 16 13C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4804 17 13.7348 17 14V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C16.5913 21 18.1174 20.3679 19.2426 19.2426C20.3679 18.1174 21 16.5913 21 15V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16Z" stroke="#001F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V11C3 11.5304 3.21071 12.0391 3.58579 12.4142C3.96086 12.7893 4.46957 13 5 13C5.26522 13 5.51957 13.1054 5.70711 13.2929C5.89464 13.4804 6 13.7348 6 14V15C6 15.5304 5.78929 16.0391 5.41421 16.4142C5.03914 16.7893 4.53043 17 4 17C3.73478 17 3.48043 17.1054 3.29289 17.2929C3.10536 17.4804 3 17.7348 3 18V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C5.5913 21 7.11742 20.3679 8.24264 19.2426C9.36786 18.1174 10 16.5913 10 15V5C10 4.46957 9.78929 3.96086 9.41421 3.58579C9.03914 3.21071 8.53043 3 8 3H5Z" stroke="#001F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </div>
        </div>
        <div className="p-4 sm:p-6 flex flex-col grow">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{name}</h3>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed grow">{description}</p>
            <a
                href="#"
                className="mt-5 inline-flex items-center gap-2 text-[#D7263D] text-sm font-semibold hover:text-[#D7263D] transition-colors"
            >
                Read More
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33325 8H12.6666" stroke="#D7263D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#D7263D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </a>
        </div>
    </div>
);

const PartnerSpotlight: FC = () => {
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
            image: "/partners/pat3.jpg",
            name: "Unity Digital Network",
            alt: "A lively classroom with diverse students collaborating on computers. Bright yellow banners with words like Innovative adorn the walls.",
            description:
                "Partnering with GMBTE has allowed us to connect with exceptional talent and give back to the community in meaningful ways.",
        },
        {
            image: "/partners/pat2.png",
            name: "TechStart Solutions",
            alt: "A business networking event with people in formal attire conversing in a spacious room. A sign reading GMBTE Partners is displayed.",
            description:
                "TechStart Solutions raises seed funding to expand their AI platform after connecting with investors at GMBTE networking events.",
        },
       
        {
            image: "/partners/pat1.png",
            name: "Manchester Community Foundation",
            alt: "A diverse group of colleagues in a bright office, smiling and clapping.",
            description:
                "Manchester Community Foundation's coding initiative hits major milestone, training over 500 local residents in tech skills.",
        },

        
        
    ];

    return (
        <section className="bg-[#FFFBEA] py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
                {/* Section Header */}
                <div className="text-center mb-10 sm:mb-16">
                    <span className="text-xs sm:text-[14px] text-[#001F3F] bg-[#EFE6BF] px-4 sm:px-5 py-2 rounded-full tracking-wider">
                        Together, we grow.
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-[35px] font-extrabold text-[#001F3F] mt-4 sm:mt-5 mb-3">
                        Partners Spotlights
                    </h2>
                    <p className="text-[#6B7280] text-base sm:text-lg md:text-2xl mt-3 max-w-3xl mx-auto px-2 leading-relaxed">
                        Real stories of collaboration, innovation, and community impact.
                    </p>
                </div>

                {/* Scrollable Row */}
                <div className="relative px-1 sm:px-0">
                    {/* Left Button */}
                    <button
                        onClick={() => scroll("left")}
                        aria-label="Scroll left"
                        className="absolute -left-1 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 w-9 h-9 sm:w-12 sm:h-12 rounded-full hidden sm:flex items-center justify-center shadow-lg border border-gray-200 transition-all z-10 hover:scale-110"
                    >
                        <ChevronLeft className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Scroll Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory px-1 py-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {cards.map((card, index) => (
                            <SpotlightCard key={index} {...card} />
                        ))}
                    </div>

                    {/* Right Button */}
                    <button
                        onClick={() => scroll("right")}
                        aria-label="Scroll right"
                        className="absolute -right-1 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-[#FFD700] hover:bg-[#FFD700] w-9 h-9 sm:w-12 sm:h-12 rounded-full hidden sm:flex items-center justify-center shadow-lg transition-all z-10 hover:scale-110"
                    >
                        <ChevronRight className="text-gray-900 w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PartnerSpotlight;