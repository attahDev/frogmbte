import type { LucideIcon } from "lucide-react";
import DashboardBreadcrumb, { type BreadcrumbItem } from "./DashboardBreadcrumb";

export type ServiceStatCard = {
  title: string;
  value: string | number;
  label: string;
  icon: LucideIcon;
  badge: string;
  tone?: "gold" | "navy" | "red";
};

type ServiceToolkitHeroProps = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  stats: ServiceStatCard[];
};

const toneStyles = {
  gold: {
    border: "border-[#FFD700]",
    badge: "bg-[#FFD700] text-[#001F3F]",
    iconWrap: "bg-[#FFD700]",
    icon: "text-[#001F3F]",
  },
  navy: {
    border: "border-[#001F3F]",
    badge: "bg-[#001F3F] text-[#FFD700]",
    iconWrap: "bg-[#001F3F]",
    icon: "text-[#FFD700]",
  },
  red: {
    border: "border-[#E11D48]",
    badge: "bg-[#E11D48] text-white",
    iconWrap: "bg-[#E11D48]",
    icon: "text-white",
  },
} as const;

export default function ServiceToolkitHero({
  breadcrumb,
  eyebrow,
  title,
  icon: Icon,
  stats,
}: ServiceToolkitHeroProps) {
  const items: BreadcrumbItem[] = [
    { label: "Dashboard", to: "/dashboard" },
    { label: breadcrumb },
  ];

  return (
    <div className="bg-[#FFFDF7]">
      <div className="border-b-4 border-[#001F3F] bg-[#FFD700] px-4 py-6 sm:px-6 md:px-8 md:py-8 lg:px-10">
        <DashboardBreadcrumb items={items} />

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#001F3F] sm:h-14 sm:w-14 sm:rounded-2xl md:h-16 md:w-16">
            <Icon className="h-6 w-6 text-[#FFD700] sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-sm font-medium text-[#001F3F] sm:mb-2 sm:text-base">
              {eyebrow}
            </p>
            <h1 className="text-lg font-bold leading-tight text-[#001F3F] sm:text-xl md:text-2xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 md:grid-cols-2 md:gap-8 md:px-8 md:py-12 lg:grid-cols-3 lg:px-10">
        {stats.map((stat, index) => {
          const tone = toneStyles[stat.tone ?? "gold"];
          const StatIcon = stat.icon;
          const isLastOfThree = stats.length === 3 && index === 2;

          return (
            <div
              key={stat.title}
              className={`relative rounded-xl border bg-[#FFFEF5] p-6 sm:rounded-2xl sm:p-8 ${tone.border} ${
                isLastOfThree ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <span
                className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold sm:right-6 sm:top-6 sm:px-4 sm:text-sm ${tone.badge}`}
              >
                {stat.badge}
              </span>

              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg sm:mb-6 sm:h-14 sm:w-14 sm:rounded-xl ${tone.iconWrap}`}
              >
                <StatIcon className={tone.icon} size={22} />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-[#001F3F] sm:mb-4 sm:text-xl">
                {stat.title}
              </h3>

              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <p className="text-3xl font-bold text-[#E11D48] sm:text-4xl">{stat.value}</p>
                <span className="inline-block whitespace-nowrap rounded-full bg-[#EEF2F7] px-3 py-1.5 text-xs text-[#001F3FB2] sm:px-4 sm:py-2">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
