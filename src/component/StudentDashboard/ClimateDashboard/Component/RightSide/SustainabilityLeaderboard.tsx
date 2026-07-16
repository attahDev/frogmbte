import React from "react";
import { ArrowUpRight, ArrowDown, Award, Medal, Trophy } from "lucide-react";

type LeaderboardRowProps = {
  rank: string;
  company: string;
  points: string;
  avatar: string;
  highlighted?: boolean;
  trend: "up" | "down";
  icon?: React.ReactNode;
};


const leaderboard = [
  {
    rank: "#1",
    company: "EcoTech Solutions",
    points: "45,280 points",
    trend: "up" as const,
    highlighted: true,
    icon: <Trophy size={16} />,
  },
  {
    rank: "#2",
    company: "Green Future Ltd",
    points: "42,150 points",
    trend: "up" as const,
    highlighted: true,
    icon: <Medal size={16} />,
  },
  {
    rank: "#3",
    company: "Sustainable Works",
    points: "38,920 points",
    trend: "down" as const,
    highlighted: true,
    icon: <Award size={16} />,
  },
  {
    rank: "#4",
    company: "Carbon Zero Co",
    points: "35,670 points",
    trend: "up" as const,
  },
  {
    rank: "#5",
    company: "Planet First Inc",
    points: "32,450 points",
    trend: "up" as const,
  },
];

export default function SustainabilityLeaderboard() {
  const avatar =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=200&auto=format&fit=crop";

  return (
    <div className="w-full rounded-[16px] border-[0.3px] border-[#001F3F] bg-[#FFFDF7] px-4 py-4 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-5 lg:px-[22px]">
      <h2 className="text-lg font-semibold text-[#6B7280] sm:text-[22px]">
        Sustainability Leaderboard
      </h2>

      <p className="mt-2 text-[14px] text-[#6B7280]">
        Top green champions this month
      </p>

      {/* Leaderboard */}
      <div className="mt-8 space-y-2.5">
        {leaderboard.map((item) => (
          <LeaderboardRow
            key={item.rank}
            {...item}
            avatar={avatar}
          />
        ))}
      </div>

      {/* Your rank */}
      <div className="mt-4 rounded-[12px] border-2 border-dashed border-[#001F3F] bg-[#FFFDF7] px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700] text-[14px] font-semibold text-[#001F3F]">
              You
            </div>

            <div>
              <p className="text-[16px] font-semibold text-[#0B2B50]">
                Your Rank
              </p>
              <p className="text-[14px] text-[#8B93A1]">
                Keep climbing!
              </p>
            </div>
          </div>

          <span className="text-[18px] font-semibold text-[#0B2B50]">
            #47
          </span>
        </div>
      </div>

      {/* Badge */}
      <div className="mt-4 rounded-[12px] bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] px-4 py-4 text-[15px] font-medium text-[#16A34A]">
        🏆 Green Champion Badge unlocks at #25
      </div>
    </div>
  );
}

function LeaderboardRow({
    rank,
    company,
    points,
    avatar,
    highlighted = false,
    trend,
    icon,
  }: LeaderboardRowProps) {
    return (
      <div
        className={`flex items-center justify-between rounded-[12px] px-4 py-3 ${
          highlighted
            ? "border-[0.67px] border-[#FFF085] bg-gradient-to-r from-[#FEFCE8] to-[#FFFBEB]"
            : "bg-[#F9FAFB]"
        }`}
      >
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {icon ? (
            <div className="flex w-6 shrink-0 justify-center text-[#F59E0B] sm:w-7">{icon}</div>
          ) : (
            <span className="w-6 shrink-0 text-base font-medium text-[#0B2B50] sm:w-7 sm:text-[18px]">
              {rank}
            </span>
          )}

          <img
            src={avatar}
            alt={company}
            className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#0B2B50] sm:text-[15px]">
              {company}
            </p>
            <p className="mt-0.5 truncate text-xs text-[#DC2138] sm:mt-1 sm:text-[13px]">{points}</p>
          </div>
        </div>
  
        {trend === "up" ? (
          <ArrowUpRight size={16} className="text-[#16A34A]" />
        ) : (
          <ArrowDown size={16} className="text-[#DC2138]" />
        )}
      </div>
    );
  }
  