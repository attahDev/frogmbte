import React, { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { fetchGreenStats, type GreenBadge } from "../../../../../lib/greenImpactApi";
import { onGreenImpactUpdate } from "../../../../../lib/greenImpactEvents";

// Icon + colour per badge id — purely presentational, the badge's earned
// state, progress %, and "what's needed" text all come from the backend.
const BADGE_STYLE: Record<string, { color: string; iconBg: string; icon: React.ReactNode }> = {
  "first-action": {
    color: "#10B981",
    iconBg: "bg-[#10B98133]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 20C9.24404 20.0053 7.55023 19.3505 6.2545 18.1654C4.95876 16.9803 4.15575 15.3515 4.00471 13.6021C3.85368 11.8527 4.36567 10.1104 5.43913 8.72074C6.51259 7.33112 8.06911 6.3957 9.79998 6.1C15.5 5 17 4.48 19 2C20 4 21 6.18 21 10C21 15.5 16.22 20 11 20Z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 21C2 18 3.85 15.64 7.08 15C9.5 14.52 12 13 13 12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "ten-actions": {
    color: "#3B82F6",
    iconBg: "bg-[#3B82F633]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.516 3.00947 16.931 3.99122 18.74 5.74L21 8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 3V8H16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21C9.48395 20.9905 7.06897 20.0088 5.26 18.26L3 16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16H3V21" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "100kg-milestone": {
    color: "#6B7280",
    iconBg: "bg-[#D1D5DB33]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2C9.43223 4.69615 8 8.27674 8 12C8 15.7233 9.43223 19.3038 12 22C14.5678 19.3038 16 15.7233 16 12C16 8.27674 14.5678 4.69615 12 2Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12H22" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

const DEFAULT_STYLE = { color: "#6B7280", iconBg: "bg-[#D1D5DB33]", icon: null as React.ReactNode };

function remainingText(badge: GreenBadge): string {
  if (badge.remaining <= 0) return "";
  return badge.id === "ten-actions" || badge.id === "first-action"
    ? `${badge.remaining} more action${badge.remaining === 1 ? "" : "s"} to go`
    : `${badge.remaining}kg more CO₂ to offset`;
}

export default function SustainabilityAchievements() {
  const [badges, setBadges] = useState<GreenBadge[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetchGreenStats()
        .then((data) => {
          if (!cancelled) setBadges(data.badges);
        })
        .catch(() => {
          if (!cancelled) setBadges([]);
        });
    };
    load();
    const unsubscribe = onGreenImpactUpdate(load);
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return (
    <div className="w-full rounded-[16px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-4 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-5 lg:px-[22px]">
      <h2 className="text-lg font-medium text-[#001F3F] sm:text-[22px] lg:text-[25px]">
        Your Sustainability Achievements
      </h2>

      <p className="mt-2 text-[14px] text-[#6B7280]">
        Track your progress and unlock new badges
      </p>

      <div className="mt-8 space-y-3 mb-5">
        {badges === null ? (
          <p className="text-[14px] text-[#8B93A1]">Loading badges…</p>
        ) : (
          badges.map((badge) => (
            <AchievementItem key={badge.id} badge={badge} />
          ))
        )}
      </div>
    </div>
  );
}

function AchievementItem({ badge }: { badge: GreenBadge }) {
  const style = BADGE_STYLE[badge.id] ?? DEFAULT_STYLE;

  return (
    <div className="rounded-[14px] border border-[#D1D5DB] bg-[#F3F4F6] px-4 py-4">
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full ${style.iconBg}`}>
          {style.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4
                className={`text-[16px] font-semibold leading-[1.2] ${
                  badge.earned ? "text-[#0B2B50]" : "text-[#64748B]"
                }`}
              >
                {badge.label}
              </h4>

              <p className="mt-1 text-[13px] leading-[1.4] text-[#6B7280]">
                {badge.description}
              </p>
            </div>

            {!badge.earned && <Lock size={16} className="mt-1 text-[#9CA3AF]" />}
          </div>

          {badge.earned ? (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#DDF7E8] px-3 py-1 text-[12px] font-medium text-[#16A34A]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 7.33337H3.33333C2.59695 7.33337 2 7.93033 2 8.66671V13.3334C2 14.0698 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0698 14 13.3334V8.66671C14 7.93033 13.403 7.33337 12.6667 7.33337Z" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.66675 7.33337V4.66671C4.66675 3.78265 5.01794 2.93481 5.64306 2.30968C6.26818 1.68456 7.11603 1.33337 8.00008 1.33337C8.88414 1.33337 9.73198 1.68456 10.3571 2.30968C10.9822 2.93481 11.3334 3.78265 11.3334 4.66671V7.33337" stroke="#6A7282" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Unlocked
            </div>
          ) : (
            <div className="mt-3">
              <div className="flex items-center justify-between text-[12px] text-[#6B7280]">
                <span>{remainingText(badge)}</span>
                <span>{badge.progress}%</span>
              </div>

              <div className="mt-2 h-[8px] rounded-full bg-[#E5E7EB]">
                <div
                  className="h-full rounded-full bg-[#FFD700]"
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
