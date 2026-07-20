import React, { useEffect, useState } from "react";
import { Activity, Leaf, TrendingUp } from "lucide-react";
import { fetchGreenStats, type GreenStats } from "../../../../../lib/greenImpactApi";
import { api } from "../../../../../lib/api";
import LogGreenActionForm from "./LogGreenActionForm";

type GreenActionRow = {
  id: string;
  type: string;
  description: string | null;
  co2OffsetKg: number;
  createdAt: string;
};

function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}



type MetricCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconBg: string;
};


type RecentActionItemProps = {
  title: string;
  time: string;
  points: string;
};



export default function GreenImpactProfile() {
  const [stats, setStats] = useState<GreenStats | null>(null);
  const [recentActions, setRecentActions] = useState<GreenActionRow[]>([]);

  const refresh = () => {
    fetchGreenStats()
      .then((data) => setStats(data))
      .catch(() => setStats(null));

    api
      .get("/green-impact/actions/mine?limit=3")
      .then(({ data }) => setRecentActions(data?.data ?? data ?? []))
      .catch(() => setRecentActions([]));
  };

  useEffect(() => {
    let cancelled = false;
    fetchGreenStats()
      .then((data) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setStats(null);
      });

    api
      .get("/green-impact/actions/mine?limit=3")
      .then(({ data }) => {
        if (cancelled) return;
        setRecentActions(data?.data ?? data ?? []);
      })
      .catch(() => {
        if (!cancelled) setRecentActions([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const badgePercent = stats && stats.badgesTotal > 0
    ? Math.round((stats.badgesEarned / stats.badgesTotal) * 100)
    : 0;

  const metrics = stats
    ? [
        {
          title: "Total CO₂ Tracked",
          value: `${stats.totalCo2TrackedKg.toLocaleString()} kg`,
          icon: <TrendingUp size={18} className="text-[#0B2B50]" />,
          iconBg: "bg-[#001F3F33]",
        },
        {
          title: "Actions Logged",
          value: `${stats.actionsCount}`,
          icon: <Leaf size={18} className="text-[#10B981]" />,
          iconBg: "bg-[#10B98133]",
        },
        {
          title: "Badges Earned",
          value: `${stats.badgesEarned} / ${stats.badgesTotal}`,
          icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.8975 10.7416L14.16 17.8466C14.1742 17.9303 14.1624 18.0163 14.1264 18.0931C14.0903 18.1699 14.0317 18.2339 13.9583 18.2765C13.8849 18.3191 13.8003 18.3382 13.7157 18.3314C13.6311 18.3246 13.5507 18.2921 13.485 18.2383L10.5017 15.9991C10.3577 15.8915 10.1827 15.8334 10.003 15.8334C9.82318 15.8334 9.64822 15.8915 9.5042 15.9991L6.51587 18.2375C6.4503 18.2912 6.36992 18.3236 6.28545 18.3304C6.20098 18.3373 6.11643 18.3182 6.04309 18.2757C5.96975 18.2332 5.9111 18.1694 5.87497 18.0927C5.83884 18.0161 5.82694 17.9302 5.84087 17.8466L7.10254 10.7416" stroke="#FFB81C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10 11.6667C12.7614 11.6667 15 9.42811 15 6.66669C15 3.90526 12.7614 1.66669 10 1.66669C7.23858 1.66669 5 3.90526 5 6.66669C5 9.42811 7.23858 11.6667 10 11.6667Z" stroke="#FFB81C" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>,
          iconBg: "bg-[#FFD70033]",
        },
      ]
    : [];

  return (
    <div className="w-full rounded-[16px] border-[0.67px] border-[#F3F4F6] bg-[#FFFDF7] px-4 py-4 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-5 lg:px-[22px]">
      <div className="flex justify-center">
        <h2 className="mt-1 text-lg font-semibold text-[#001F3F] sm:mt-2 sm:text-[20px]">
          Your Green Impact Profile
        </h2>
      </div>

      <p className="mt-2 text-[14px] text-[#6B7280]">
        Personal sustainability overview
      </p>

      {/* Ring shows badge-completion %, not a CO2 "offset target" — there's
          no goal-setting feature yet to make a target percentage honest. */}
      <div className="mt-8 flex justify-center">
        <ProgressRing value={badgePercent} label="Badges" />
      </div>

      <p className="mt-4 text-center text-[14px] text-[#6B7280]">
        {stats && stats.actionsCount > 0
          ? "Keep going! You're making a real difference"
          : "Log your first green action to get started"}
      </p>

      {/* Metrics */}
      <div className="mt-8 space-y-3">
        {metrics.map((item) => (
          <MetricCard key={item.title} {...item} />
        ))}
      </div>

      <div className="mt-4">
        <LogGreenActionForm onLogged={refresh} />
      </div>

      {/* Actions */}
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[#0B2B50]" />
          <h3 className="text-[16px] font-semibold text-[#0B2B50]">
            Recent Actions
          </h3>
        </div>

        <div className="mt-5 space-y-6">
          {recentActions.length === 0 ? (
            <p className="text-[14px] text-[#8B93A1]">No actions logged yet.</p>
          ) : (
            recentActions.map((action) => (
              <RecentActionItem
                key={action.id}
                title={action.description || action.type.toLowerCase().replace("_", " ")}
                time={relativeTime(action.createdAt)}
                points={`+${Math.round(action.co2OffsetKg)}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function ProgressRing({ value, label }: { value: number; label: string }) {
    return (
      <div className="relative flex items-center justify-center">
        
        {/* Ring */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 144,
            height: 144,
            background: `conic-gradient(#F2C500 ${value}%, #E5E7EB ${value}%)`,
          }}
        >
          {/* Inner circle (creates thickness) */}
          <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-white">
            <span className="text-[24px] font-semibold text-[#0B2B50]">
              {value}%
            </span>
            <span className="mt-2 text-[13px] text-[#6B7280]">
              {label}
            </span>
          </div>
        </div>
  
      </div>
    );
  }
  

  function RecentActionItem({ title, time, points }: RecentActionItemProps) {
    return (
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[14px] text-[#0B2B50]">{title}</p>
          <p className="mt-1 text-[14px] text-[#8B93A1]">{time}</p>
        </div>
  
        <span className="rounded-[4px] bg-[#FFD700] px-3 py-1 text-[14px] font-medium text-[#111827]">
          {points}
        </span>
      </div>
    );
  }

  function MetricCard({ icon, title, value, iconBg }: MetricCardProps) {
    return (
      <div className="flex items-center gap-3 rounded-[12px] bg-[#F9FAFB] px-4 py-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full ${iconBg}`}>
          {icon}
        </div>
  
        <div>
          <p className="text-[14px] text-[#6B7280]">{title}</p>
          <p className="mt-1 text-[17px] font-semibold text-[#0B2B50]">
            {value}
          </p>
        </div>
      </div>
    );
  }
  