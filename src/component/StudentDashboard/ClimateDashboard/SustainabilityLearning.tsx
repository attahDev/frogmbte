import { Play } from "lucide-react";
import { Link } from "react-router-dom";

type CourseCardProps = {
  title: string;
  image: string;
  duration: string;
  progress: number;
  slug: string;
};

const courses: CourseCardProps[] = [
  {
    title: "Climate & Social Justice",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop",
    duration: "2 weeks",
    progress: 0,
    slug: "climate-social-justice",
  },
  {
    title: "Climate Technology & Data",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    duration: "2 weeks",
    progress: 0,
    slug: "climate-technology-and-data",
  },
  {
    title: "Climate Change Impacts & Risks",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    duration: "4 weeks",
    progress: 0,
    slug: "climate-change-impacts-and-risks",
  },
];

function CourseCard({
  title,
  image,
  duration,
  progress,
  slug,
}: CourseCardProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-[#FFFDF7] transition duration-300 hover:-translate-y-1 hover:shadow-[0px_12px_30px_rgba(0,31,63,0.10)]">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-[160px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[188px]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        <div className="absolute right-3 top-3 rounded-[6px] bg-[#FFFFFFE5] px-3 py-1.5 text-[12px] font-medium leading-none text-[#0A0A0A] shadow-[0px_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:right-4 sm:top-4 sm:text-[13px]">
          {duration}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-[18px] sm:pb-[18px] sm:pt-[18px]">
        <h3 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.02em] text-[#001F3F] sm:text-[20px]">
          {title}
        </h3>

        <div className="mt-5 flex items-center justify-between sm:mt-6">
          <span className="text-[13px] leading-none text-[#4A5565] sm:text-[14px]">
            Progress
          </span>

          <span className="text-[13px] font-medium leading-none text-[#4A5565] sm:text-[14px]">
            {safeProgress}%
          </span>
        </div>

        <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
          <div
            className="h-full rounded-full bg-[#FFD700] transition-all duration-500"
            style={{ width: `${safeProgress}%` }}
          />
        </div>

        <p className="mt-4 text-[13px] leading-none text-[#8B93A1] sm:mt-5 sm:text-[14px]">
          {safeProgress === 100
            ? "Certificate available"
            : "No certificate yet"}
        </p>

        <Link
          to={`/dashboard/green-impact/${slug}`}
          className="mt-auto flex h-[44px] w-full items-center justify-center gap-2.5 rounded-[12px] bg-[#D7263D] text-[15px] font-medium text-white transition hover:bg-[#C61D31] focus:outline-none focus:ring-2 focus:ring-[#D7263D]/30 focus:ring-offset-2 sm:mt-[18px] sm:h-[46px] sm:text-[16px]"
        >
          <Play
            size={16}
            fill="currentColor"
            className="translate-x-[1px]"
          />

          {safeProgress > 0 ? "Continue" : "Start Course"}
        </Link>
      </div>
    </article>
  );
}

export default function SustainabilityLearningSection() {
  return (
    <section className="w-full rounded-[18px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 lg:rounded-[20px] lg:px-7 lg:pb-8 lg:pt-[26px]">
      <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[#0B2B50] sm:text-[25px] lg:text-[28px]">
        Learn Sustainability
      </h2>

      <p className="mt-3 max-w-2xl text-[14px] leading-[1.45] text-[#6B7280] sm:mt-4 sm:text-[17px]">
        Build your carbon literacy and green skills
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-9 lg:gap-x-7 lg:gap-y-[30px] 2xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} {...course} />
        ))}
      </div>
    </section>
  );
}