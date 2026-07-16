"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectsEmpty from "./ProjectEmpty";
import {
  type BusinessPlanHistoryItem,
  getBusinessPlanHistory,
} from "../lib/businessPlannerApi";

type Project = {
  id: string;
  title: string;
  status: string;
  updatedAt: string;
  score: number;
  accent: "green" | "rose" | "purple";
  raw: BusinessPlanHistoryItem;
};

export default function DashboardProjects({
  onNewProject,
}: {
  onNewProject?: () => void;
}) {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<BusinessPlanHistoryItem[]>([]);
  const [selectedPlan, setSelectedPlan] =
    useState<BusinessPlanHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
  try {
    setLoading(true);

    const response = await getBusinessPlanHistory();

    if (response.success && Array.isArray(response.data)) {
      setPlans(response.data);
    } else {
      setPlans([]);
    }
  } catch (error) {
    console.error("Failed to fetch business plans:", error);
    setPlans([]);
  } finally {
    setLoading(false);
  }
};

  const projects: Project[] = useMemo(() => {
    return plans.map((plan, index) => {
      const data = plan.aiResponse?.data;
      const title =
        data?.summary_card?.title || plan.businessIdea || "Untitled Project";

      const marketScore = data?.score_breakdown?.market
        ? data.score_breakdown.market * 10
        : data?.summary_card?.confidence_score || 0;

      return {
        id: plan.id,
        title,
        status: plan.industry,
        updatedAt: formatDate(plan.updatedAt),
        score: marketScore,
        accent: index % 3 === 0 ? "green" : index % 3 === 1 ? "rose" : "purple",
        raw: plan,
      };
    });
  }, [plans]);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="h-8 w-40 animate-pulse rounded-full bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="min-h-[224px] animate-pulse rounded-[22px] bg-slate-100"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return <ProjectsEmpty onNewProject={onNewProject} />;
  }

  return (
    <>
      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[25px] font-bold leading-none tracking-[-0.04em] text-[#001F3F]">
              Your Projects
            </h2>
            <p className="mt-2 text-sm text-[#7B8494]">
              {projects.length} saved business plan
              {projects.length > 1 ? "s" : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/business-plan")}
            className="text-[12px] font-bold text-[#E63946] transition hover:opacity-80"
          >
            View All
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              status={project.status}
              updatedAt={project.updatedAt}
              score={project.score}
              accent={project.accent}
              onClick={() => setSelectedPlan(project.raw)}
            />
          ))}

          <DashboardCardCreate
            onNewProject={onNewProject ?? (() => navigate("/dashboard/business-plan"))}
          />
        </div>
      </section>

      {selectedPlan && (
        <ProjectDetailsModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </>
  );
}

function DashboardCardCreate({ onNewProject }: { onNewProject?: () => void }) {
  return (
    <button
      onClick={onNewProject}
      className="flex min-h-[224px] items-center justify-center rounded-[22px] border border-dashed border-[#8C96A3] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFD400]">
          <Plus className="h-7 w-7 text-[#001F3F]" />
        </div>

        <h4 className="mt-5 text-[22px] font-bold tracking-[-0.02em] text-[#5B6472]">
          New Project
        </h4>

        <p className="mt-2 text-[15px] text-[#A0A9B8]">
          Start planning a new idea
        </p>
      </div>
    </button>
  );
}

function ProjectDetailsModal({
  plan,
  onClose,
}: {
  plan: BusinessPlanHistoryItem;
  onClose: () => void;
}) {
  const data = plan.aiResponse?.data;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-[#FFFDF7] p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#E63946]">
              {plan.industry}
            </p>
            <h3 className="text-[28px] font-extrabold leading-tight text-[#001F3F]">
              {data?.summary_card?.title || plan.businessIdea}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B7280]">
              {data?.summary_card?.description || plan.goal}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-[#F1F2F4] p-2 text-[#001F3F] transition hover:bg-[#E5E7EB]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard
            label="Confidence"
            value={`${data?.summary_card?.confidence_score || 0}%`}
          />
          <InfoCard
            label="Market Demand"
            value={data?.market_insights?.demand?.label || "N/A"}
          />
          <InfoCard
            label="Fit Score"
            value={`${data?.feasibility_card?.fit_score || 0}%`}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Panel title="Strengths" items={data?.feasibility_card?.strengths} />
          <Panel title="Risks" items={data?.feasibility_card?.risks} />
        </div>

        <div className="mt-6 rounded-[22px] border border-[#E8E8E0] bg-white p-5">
          <h4 className="text-lg font-bold text-[#001F3F]">Opportunity</h4>
          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            {data?.market_insights?.opportunity}
          </p>
        </div>

        <div className="mt-6 rounded-[22px] border border-[#E8E8E0] bg-white p-5">
          <h4 className="text-lg font-bold text-[#001F3F]">Next Steps</h4>
          <div className="mt-4 space-y-3">
            {data?.next_steps?.map((step: string, index: number) => (
              <div key={index} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFD400] text-sm font-bold text-[#001F3F]">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-[#5B6472]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-[#E8E8E0] bg-white p-5">
      <p className="text-sm font-medium text-[#8C96A3]">{label}</p>
      <h4 className="mt-2 text-2xl font-extrabold text-[#001F3F]">{value}</h4>
    </div>
  );
}

function Panel({ title, items }: { title: string; items?: string[] }) {
  return (
    <div className="rounded-[22px] border border-[#E8E8E0] bg-white p-5">
      <h4 className="text-lg font-bold text-[#001F3F]">{title}</h4>
      <ul className="mt-4 space-y-3">
        {items?.map((item, index) => (
          <li key={index} className="text-sm leading-6 text-[#5B6472]">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}