import {
  BarChart3,
  Rocket,
  TrendingUp,
  Package,
  DollarSign,
} from "lucide-react";

type ModuleLevel = "Beginner" | "Intermediate";

type ModuleCardProps = {
  title: string;
  progress: number;
  duration: string;
  level: ModuleLevel;
  icon: React.ReactNode;
};

function ModuleCard({
  title,
  progress,
  duration,
  level,
  icon,
}: ModuleCardProps) {
  const levelStyles =
    level === "Beginner"
      ? "bg-[#DCFCE7] text-[#008236]"
      : "bg-[#FEE5C2] text-[#A65F00]";

  return (
    <div className="rounded-[18px] sm:rounded-[20px] lg:rounded-[22px] border border-[#FFD700] bg-[#FFFFFF] px-5 sm:px-6 py-6 sm:py-7 shadow-[0px_6px_16px_rgba(15,23,42,0.08)]">
      {/* Icon */}
      <div className="mb-6 sm:mb-8 flex h-[58px] w-[58px] sm:h-[64px] sm:w-[64px] lg:h-[70px] lg:w-[70px] items-center justify-center rounded-[16px] sm:rounded-[18px] bg-[#FFD700]">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-5 sm:mb-6 text-[19px] sm:text-[20px] lg:text-[22px] font-extrabold leading-[1.3] text-[#001F3F] break-words">
        {title}
      </h3>

      {/* Progress header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium text-[#667085]">
          Progress
        </span>
        <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-bold text-[#D7263D] shrink-0">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-5 sm:mb-6 h-[9px] sm:h-[10px] w-full overflow-hidden rounded-full bg-[#F1E6AF]">
        <div
          className="relative h-full bg-[#FFD700]"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute right-0 top-0 h-full w-[4px] bg-[#E11D48]" />
        </div>
      </div>

      {/* Meta */}
      <div className="mb-6 sm:mb-7 flex flex-wrap items-center gap-2 sm:gap-3 text-[14px] sm:text-[15px] lg:text-[16px] text-[#667085]">
        <span>{duration}</span>
        <span className="text-[#C7C7C7]">•</span>
        <span
          className={`inline-flex items-center rounded-full px-3 sm:px-4 py-1.5 text-[13px] sm:text-[14px] lg:text-[15px] font-medium ${levelStyles}`}
        >
          {level}
        </span>
      </div>

      {/* Button */}
      <button className="h-[52px] sm:h-[56px] lg:h-[58px] w-full rounded-[12px] sm:rounded-[14px] bg-[#D7263D] text-[15px] sm:text-[16px] lg:text-[18px] font-medium text-white transition hover:opacity-95">
        Continue Module
      </button>
    </div>
  );
}

export default function LearningModules() {
  const modules = [
    {
      title: "Digital Marketing Strategy",
      progress: 45,
      duration: "8 hours",
      level: "Intermediate" as ModuleLevel,
      icon: (
        <TrendingUp size={28} className="text-[#E11D48]" strokeWidth={2.2} />
      ),
    },
    {
      title: "Business Analytics Basics",
      progress: 80,
      duration: "5 hours",
      level: "Beginner" as ModuleLevel,
      icon: (
        <BarChart3 size={28} className="text-[#D7263D]" strokeWidth={2.2} />
      ),
    },
    {
      title: "Startup Fundamentals",
      progress: 30,
      duration: "10 hours",
      level: "Intermediate" as ModuleLevel,
      icon: <Rocket size={28} className="text-[#D7263D]" strokeWidth={2.2} />,
    },
    {
      title: "Entrepreneurship Mindset",
      progress: 65,
      duration: "2 hours",
      level: "Intermediate" as ModuleLevel,
      icon: (
        <TrendingUp size={28} className="text-[#D7263D]" strokeWidth={2.2} />
      ),
    },
    {
      title: "Financial Literacy for Founders",
      progress: 20,
      duration: "5 hours",
      level: "Beginner" as ModuleLevel,
      icon: (
        <DollarSign size={28} className="text-[#D7263D]" strokeWidth={2.2} />
      ),
    },
    {
      title: "Product Sales & Marketing Brand Development",
      progress: 30,
      duration: "10 hours",
      level: "Intermediate" as ModuleLevel,
      icon: <Package size={28} className="text-[#E11D48]" strokeWidth={2.2} />,
    },
  ];

  return (
    <section className="mx-auto mb-8 mt-6 max-w-[1400px] rounded-[22px] border border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_#001F3F0F,0px_4px_6px_-1px_#001F3F1A] sm:mb-10 sm:mt-8 sm:rounded-[24px] sm:px-6 sm:py-6 lg:rounded-[28px] lg:px-8 lg:py-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="mb-2 sm:mb-3 text-[22px] sm:text-[28px] lg:text-[32px] font-bold text-[#001F3F]">
          Learning Modules
        </h2>

        <p className="max-w-[1400px] text-[14px] sm:text-[16px] lg:text-[18px] leading-[1.7] text-[#6B7280]">
          Our Business & Entrepreneurship Toolkit equips learners with practical
          skills in branding, marketing, analytics, business planning, and
          startup development. Participants gain hands on experience through real
          world challenges, AI tools, mentorship, and collaborative business
          simulations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <ModuleCard
            key={module.title}
            title={module.title}
            progress={module.progress}
            duration={module.duration}
            level={module.level}
            icon={module.icon}
          />
        ))}
      </div>
    </section>
  );
}