"use client";

import { useEffect, useState } from "react";
import { ArrowRight, FileText, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AIDashboardButton from "../ui/AIDashboardButton";
import AIDashboardCard from "../ui/AIDashboardCard";
import ActivityCard from "./ActivityCard";
import {
  type BusinessPlanHistoryItem,
  getBusinessPlanHistory,
} from "../lib/businessPlannerApi";
import { type IdeaListItem, listIdeas } from "../lib/ideaEngineApi";

type ActivityItem = {
  id: string;
  title: string;
  time: string;
  icon: typeof FileText;
};

export default function DashboardActivity() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      setLoading(true);

      const [plansResult, ideasResult] = await Promise.allSettled([
        getBusinessPlanHistory(),
        listIdeas(),
      ]);

      const plans: BusinessPlanHistoryItem[] =
        plansResult.status === "fulfilled" ? plansResult.value?.data || [] : [];
      const ideas: IdeaListItem[] =
        ideasResult.status === "fulfilled" ? ideasResult.value || [] : [];

      if (plansResult.status === "rejected") {
        console.error("Failed to fetch business plans:", plansResult.reason);
      }
      if (ideasResult.status === "rejected") {
        console.error("Failed to fetch ideas:", ideasResult.reason);
      }

      const planItems: ActivityItem[] = plans.map((plan) => {
        const data = plan.aiResponse?.data;
        const title =
          data?.summary_card?.title || plan.businessIdea || "Business plan";
        return {
          id: `plan-${plan.id}`,
          title: `${title} plan created`,
          time: plan.updatedAt || plan.createdAt,
          icon: FileText,
        };
      });

      const ideaItems: ActivityItem[] = ideas.map((idea) => ({
        id: `idea-${idea.id}`,
        title: `${idea.business_idea} idea generated`,
        time: idea.created_at,
        icon: Lightbulb,
      }));

      const recent = [...planItems, ...ideaItems]
        .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
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
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              icon={activity.icon}
              title={activity.title}
              time={timeAgo(activity.time)}
            />
          ))
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
