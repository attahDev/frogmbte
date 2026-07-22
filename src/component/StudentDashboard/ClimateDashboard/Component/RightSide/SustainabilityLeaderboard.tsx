import React, { useEffect, useState } from "react";
import { ArrowUpRight, Award, Medal, Trophy } from "lucide-react";
import { fetchLeaderboard, type Leaderboard, type LeaderboardEntry } from "../../../../../lib/greenImpactApi";
import { onGreenImpactUpdate } from "../../../../../lib/greenImpactEvents";

const RANK_ICON: Record<number, React.ReactNode> = {
  1: <Trophy size={16} />,
  2: <Medal size={16} />,
  3: <Award size={16} />,
};

export default function SustainabilityLeaderboard() {
  const [board, setBoard] = useState<Leaderboard | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetchLeaderboard(10)
        .then((data) => {
          if (!cancelled) setBoard(data);
        })
        .catch(() => {
          if (!cancelled) setBoard(null);
        });
    };
    load();
    // Ranks shift the moment anyone logs an action, not just the current
    // user — so this refetches on the same global event LogGreenActionForm
    // broadcasts, keeping the board live without a page reload.
    const unsubscribe = onGreenImpactUpdate(load);
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return (
    <div className="w-full rounded-[16px] border-[0.3px] border-[#001F3F] bg-[#FFFDF7] px-4 py-4 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-5 lg:px-[22px]">
      <h2 className="text-lg font-semibold text-[#6B7280] sm:text-[22px]">
        Sustainability Leaderboard
      </h2>

      <p className="mt-2 text-[14px] text-[#6B7280]">
        Top green champions, ranked by real logged impact
      </p>

      <div className="mt-8 space-y-2.5">
        {board === null ? (
          <p className="text-[14px] text-[#8B93A1]">Loading leaderboard…</p>
        ) : board.top.length === 0 ? (
          <p className="text-[14px] text-[#8B93A1]">
            No green actions logged yet — be the first to appear here.
          </p>
        ) : (
          board.top.map((entry) => <LeaderboardRow key={entry.userId} entry={entry} />)
        )}
      </div>

      {board && (
        <>
          <div className="mt-4 rounded-[12px] border-2 border-dashed border-[#001F3F] bg-[#FFFDF7] px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD700] text-[14px] font-semibold text-[#001F3F]">
                  You
                </div>

                <div>
                  <p className="text-[16px] font-semibold text-[#0B2B50]">Your Rank</p>
                  <p className="text-[14px] text-[#8B93A1]">
                    {board.me.rank ? "Keep climbing!" : "Log an action to get ranked"}
                  </p>
                </div>
              </div>

              <span className="text-[18px] font-semibold text-[#0B2B50]">
                {board.me.rank ? `#${board.me.rank}` : "—"}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-[12px] bg-gradient-to-r from-[#F0FDF4] to-[#ECFDF5] px-4 py-4 text-[15px] font-medium text-[#16A34A]">
            {board.greenChampionUnlocked
              ? "🏆 Green Champion Badge unlocked!"
              : `🏆 Green Champion Badge unlocks at #${board.greenChampionRankThreshold}`}
          </div>
        </>
      )}
    </div>
  );
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  const highlighted = entry.rank <= 3;
  const initials = entry.displayName
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-between rounded-[12px] px-4 py-3 ${
        entry.isCurrentUser
          ? "border-[0.67px] border-[#FFD700] bg-[#FFFBEB]"
          : highlighted
          ? "border-[0.67px] border-[#FFF085] bg-gradient-to-r from-[#FEFCE8] to-[#FFFBEB]"
          : "bg-[#F9FAFB]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {RANK_ICON[entry.rank] ? (
          <div className="flex w-6 shrink-0 justify-center text-[#F59E0B] sm:w-7">
            {RANK_ICON[entry.rank]}
          </div>
        ) : (
          <span className="w-6 shrink-0 text-base font-medium text-[#0B2B50] sm:w-7 sm:text-[18px]">
            #{entry.rank}
          </span>
        )}

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#001F3F1A] text-[12px] font-semibold text-[#001F3F] sm:h-10 sm:w-10">
          {initials || "GM"}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#0B2B50] sm:text-[15px]">
            {entry.displayName}
            {entry.isCurrentUser ? " (You)" : ""}
          </p>
          <p className="mt-0.5 truncate text-xs text-[#DC2138] sm:mt-1 sm:text-[13px]">
            {entry.points.toLocaleString()} points
          </p>
        </div>
      </div>

      <ArrowUpRight size={16} className="text-[#16A34A]" />
    </div>
  );
}
