import { Clock3, Users, Award } from "lucide-react";

type PracticeCardProps = {
  points: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  duration: string;
  participants: string;
  topBg?: string;
  bottomClassName: string;
  buttonClassName: string;
  buttonTextClassName?: string;
};

function PracticeCard({
  points,
  titleTop,
  titleBottom,
  description,
  duration,
  participants,
  topBg,
  bottomClassName,
  buttonClassName,
  buttonTextClassName = "text-[#001F3F]",
}: PracticeCardProps) {
  return (
    <div className="overflow-hidden rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] border border-[#F1D56A] bg-white shadow-[0px_2px_4px_-1px_#001F3F0F,0px_4px_6px_-1px_#001F3F1A]">
      {/* Top visual area */}
      <div
        className="relative h-[170px] sm:h-[190px] lg:h-[200px] overflow-hidden bg-[#F5F9FC] bg-cover bg-center"
        style={topBg ? { backgroundImage: `url(${topBg})` } : undefined}
      >
        {/* Points ribbon */}
        <div className="absolute left-0 top-4 z-20 inline-flex h-[34px] sm:h-[38px] items-center gap-2 bg-[#E32746] px-3 sm:px-4 pr-5 sm:pr-6 text-white clip-ribbon">
          <Award size={14} className="sm:w-4 sm:h-4" strokeWidth={2} />
          <span className="text-[14px] sm:text-[16px] font-medium">
            {points}
          </span>
        </div>

        {/* Title */}
        <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h3 className="text-xl font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-[#001F3F] sm:text-[28px] lg:text-[32px]">
              {titleTop}
            </h3>
            <h3 className="mt-1 text-xl font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-[#DF2846] sm:text-[28px] lg:text-[32px]">
              {titleBottom}
            </h3>
          </div>
        </div>

        {/* Curve separator */}
        <svg
          className="absolute bottom-[-1px] left-0 z-10 w-full"
          viewBox="0 0 100 18"
          preserveAspectRatio="none"
        >
          <path
            d="M0,18 C22,18 35,15 52,13 C70,11 84,8 100,0 L100,18 L0,18 Z"
            fill="currentColor"
            className={bottomClassName}
          />
          <path
            d="M0,17 C22,17 35,14 52,12 C70,10 84,7 100,-1"
            fill="none"
            stroke="#D9A514"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Bottom content */}
      <div className={`px-5 sm:px-7 lg:px-10 pb-6 sm:pb-8 lg:pb-10 pt-6 sm:pt-7 lg:pt-8 text-white ${bottomClassName}`}>
        <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-[1.45]">
          {description}
        </p>

        <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6 lg:gap-8 text-[14px] sm:text-[15px] lg:text-[16px] text-white/95">
          <div className="flex items-center gap-2">
            <Clock3 size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>{duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>{participants}</span>
          </div>
        </div>

        <button
          className={`mt-6 sm:mt-7 lg:mt-8 h-[48px] sm:h-[52px] lg:h-[54px] w-full rounded-[12px] sm:rounded-[14px] text-[15px] sm:text-[16px] lg:text-[18px] font-medium transition hover:opacity-95 ${buttonClassName} ${buttonTextClassName}`}
        >
          Submit Work
        </button>
      </div>
    </div>
  );
}

export default function RealWorldPractice() {
  const practiceCards = [
    {
      points: "500 pts",
      titleTop: "Weekly Startup",
      titleBottom: "Challenge",
      description: "Build a landing page for your startup idea",
      duration: "3 days left",
      participants: "89 participants",
      topBg: "/images/practice/startup-challenge.jpg",
      bottomClassName: "bg-[#001F3F]",
      buttonClassName: "bg-[#FFD700]",
      buttonTextClassName: "text-[#001F3F]",
    },
    {
      points: "1300 pts",
      titleTop: "Pitch Your Idea",
      titleBottom: "Challenge",
      description: "Create a 60 seconds elevator pitch video",
      duration: "5 days left",
      participants: "156 participants",
      topBg: "/images/practice/pitch-idea.jpg",
      bottomClassName: "bg-[linear-gradient(90deg,#82138D_0%,#E51F46_100%)]",
      buttonClassName: "bg-[#FFD700]",
      buttonTextClassName: "text-[#001F3F]",
    },
    {
      points: "500 pts",
      titleTop: "Market Research",
      titleBottom: "Assignment",
      description: "Conduct competitor analysis for your niche",
      duration: "1 week left",
      participants: "67 participants",
      topBg: "/images/practice/market-research.jpg",
      bottomClassName: "bg-[linear-gradient(90deg,#12B8C9_0%,#11DB7A_100%)]",
      buttonClassName: "bg-[#001F3F]",
      buttonTextClassName: "text-white",
    },
    {
      points: "300 pts",
      titleTop: "Branding",
      titleBottom: "Exercise",
      description: "Design a logo and brand identity for your brand",
      duration: "4 days left",
      participants: "102 participants",
      topBg: "/images/practice/branding-exercise.jpg",
      bottomClassName: "bg-[linear-gradient(90deg,#1165E8_0%,#1EA9E8_100%)]",
      buttonClassName: "bg-[#001F3F]",
      buttonTextClassName: "text-white",
    },
  ];

  return (
    <section className="mx-auto mt-6 max-w-[1400px] px-4 sm:mt-8 sm:px-6 lg:px-8">
      <h2 className="mb-6 sm:mb-8 text-[24px] sm:text-[30px] lg:text-[36px] font-bold text-[#001F3F]">
        Real World Practice
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:gap-8 xl:grid-cols-2">
        {practiceCards.map((card) => (
          <PracticeCard
            key={`${card.titleTop}-${card.titleBottom}`}
            points={card.points}
            titleTop={card.titleTop}
            titleBottom={card.titleBottom}
            description={card.description}
            duration={card.duration}
            participants={card.participants}
            topBg={card.topBg}
            bottomClassName={card.bottomClassName}
            buttonClassName={card.buttonClassName}
            buttonTextClassName={card.buttonTextClassName}
          />
        ))}
      </div>
    </section>
  );
}