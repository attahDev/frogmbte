import type { FC, JSX } from "react";
import { Lightbulb, Rocket, TrendingUp, Users } from "lucide-react";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: JSX.Element;
  side: "left" | "right";
}

const TimelineItem: FC<TimelineItemProps> = ({
  year,
  title,
  description,
  icon,
  side,
}) => {
  return (
    <div className="relative flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
      {/* Left Side - Desktop */}
      {side === "left" ? (
        <div className="hidden md:flex justify-end pr-8">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-md text-right w-full relative">
            <span className="inline-block bg-[#FFD700] text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {year}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-[#001F3F] mb-2">
              {title}
            </h3>
            <p className="text-[#001F3F] text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div className="hidden md:block"></div>
      )}

      {/* Right Side - Desktop */}
      {side === "right" ? (
        <div className="hidden md:flex justify-start pl-8">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-md text-left w-full relative">
            <span className="inline-block bg-[#FFD700] text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {year}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-[#001F3F] mb-2">
              {title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      ) : (
        <div className="hidden md:block"></div>
      )}

      {/* Mobile Layout (single column) */}
      <div className="md:hidden w-full flex justify-center">
        <div className="bg-white rounded-xl shadow-md p-5 max-w-md w-full text-center mx-4 relative">
          {/* Icon goes on top */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#D7263D] rounded-full flex items-center justify-center shadow-lg">
            <div className="text-white w-5 h-5">{icon}</div>
          </div>

          <div className="mt-8">
            <span className="inline-block bg-[#FFD700] text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {year}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#001F3F] mb-2">
              {title}
            </h3>
            <p className="text-[#001F3F] text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Center node (for desktop only) */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-14 h-14 bg-[#D7263D] rounded-full flex items-center justify-center shadow-lg">
          <div className="text-white w-6 h-6">{icon}</div>
        </div>
      </div>
    </div>
  );
};


const OurStory: FC = () => {
  const timelineItems = [
    {
      year: "2021",
      title: "The Idea",
      description:
        "Recognizing the need for greater diversity and inclusion in Manchester's tech scene",
      icon: <Lightbulb />,
      side: "left" as const,
    },
    {
      year: "2022",
      title: "Launch",
      description:
        "First GMBTE event brings together 100+ professionals and students",
      icon: <Rocket />,
      side: "right" as const,
    },
    {
      year: "2023",
      title: "Growth",
      description:
        "Expanded programming with mentorship initiatives and skills training",
      icon: <TrendingUp />,
      side: "left" as const,
    },
    {
      year: "2025",
      title: "Community Impact",
      description:
        "Now serving 1000+ members across Greater Manchester",
      icon: <Users />,
      side: "right" as const,
    },
  ];

  return (
    <section className="bg-[#F5F3EE] py-10 sm:py-14 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#001F3F] mb-3 sm:mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
            From a simple idea to a thriving community that's transforming Greater
            Manchester's tech landscape.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#FFD700] -translate-x-1/2"></div>

          <div className="space-y-12 sm:space-y-16 md:space-y-28">
            {timelineItems.map((item, index) => (
              <TimelineItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
