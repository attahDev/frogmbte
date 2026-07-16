"use client";

import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, FileText, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AIDashboardButton from "../ui/AIDashboardButton";
import AIDashboardCard from "../ui/AIDashboardCard";
import ActivityCard from "./ActivityCard";
import {
  type BusinessPlanHistoryItem,
  getBusinessPlanHistory,
} from "../lib/businessPlannerApi";

export default function DashboardActivity() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<BusinessPlanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      setLoading(true);

      const response = await getBusinessPlanHistory();

      const plans = response?.data || [];

      const recent = [...plans]
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt).getTime() -
            new Date(a.updatedAt || a.createdAt).getTime()
        )
        .slice(0, 3);

      setActivities(recent);
    } catch (error) {
      console.error("Failed to load recent activity:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const goToPlans = () => navigate("/dashboard/business-plan");

  return (
    <AIDashboardCard variant="smpanel" padding="md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#001F3F]">
            Recent Activity
          </h3>
        </div>

        <AIDashboardButton
          variant="text"
          className="text-xs text-[#D7263D] hover:underline"
          onClick={goToPlans}
        >
          View All
        </AIDashboardButton>
      </div>

      <div className="space-y-3">
        {loading ? (
          <>
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
          </>
        ) : activities.length ? (
          activities.map((plan, index) => {
            const data = plan.aiResponse?.data;
            const title =
              data?.summary_card?.title || plan.businessIdea || "Business plan";

            const icon =
              index === 0 ? FileText : index === 1 ? BarChart3 : Sparkles;

            return (
              <ActivityCard
                key={plan.id}
                icon={icon}
                title={`${title} generated`}
                time={timeAgo(plan.updatedAt || plan.createdAt)}
              />
            );
          })
        ) : (
          <div className="rounded-2xl bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
            No recent activity yet.
          </div>
        )}
      </div>

      <AIDashboardButton
        variant="outline"
        className="mt-5 w-full !border-[#E5E7EB] !bg-white !text-[#001F3F] hover:!bg-[#F8FAFC]"
        icon={ArrowRight}
        iconPosition="right"
        onClick={goToPlans}
      >
        View all Activity
      </AIDashboardButton>
    </AIDashboardCard>
  );
}

function ActivitySkeleton() {
  return <div className="h-[62px] animate-pulse rounded-2xl bg-slate-100" />;
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
