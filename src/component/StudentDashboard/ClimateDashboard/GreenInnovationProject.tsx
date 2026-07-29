import { useEffect, useState } from "react";
import { Heart, Users, Loader2 } from "lucide-react";
import { api } from "../../../lib/api";

type BackendProject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  goalAmountMinor: number;
  raisedAmountMinor: number;
  isSupportedByMe: boolean;
  _count: { supporters: number };
};

function formatGbp(minor: number): string {
  return `£${(minor / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=1200&auto=format&fit=crop";

function ProjectCard({
  project,
  onSupported,
}: {
  project: BackendProject;
  onSupported: () => void;
}) {
  const [supporting, setSupporting] = useState(false);
  const progress =
    project.goalAmountMinor > 0
      ? Math.min(100, Math.round((project.raisedAmountMinor / project.goalAmountMinor) * 100))
      : 0;

  const handleSupport = async () => {
    if (project.isSupportedByMe || supporting) return;
    setSupporting(true);
    try {
      await api.post(`/green-projects/${project.id}/support`);
      onSupported();
    } finally {
      setSupporting(false);
    }
  };

  return (
    <article className="rounded-[18px] border border-[#D9DEE8] bg-[#FFFDF7] p-4 sm:p-[18px] lg:rounded-[20px]">
      <div className="flex flex-col gap-5 lg:flex-row">
        <img
          src={project.imageUrl || FALLBACK_IMAGE}
          alt={project.title}
          className="h-[180px] w-full rounded-[16px] object-cover sm:h-[210px] lg:h-[236px] lg:w-[224px] lg:shrink-0 lg:rounded-[18px]"
        />

        <div className="min-w-0 flex-1 lg:pt-[6px]">
          <div className="flex items-start justify-between gap-4">
            <h3 className="min-w-0 text-[17px] font-semibold leading-[1.25] tracking-[-0.03em] text-[#001F3F] sm:text-[19px] md:text-[20px]">
              {project.title}
            </h3>

            <div className="flex shrink-0 items-center gap-2 pt-1 text-[12px] text-[#4A5565] sm:text-[14px]">
              <Users size={18} strokeWidth={2.1} />
              <span>{project._count.supporters}</span>
            </div>
          </div>

          <p className="mt-3 text-[13px] leading-[1.45] text-[#5F6C80] sm:mt-4 sm:text-[14px]">
            {project.description}
          </p>

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-[15px] font-semibold leading-none text-[#001F3F] sm:text-[16px]">
              {formatGbp(project.raisedAmountMinor)} raised
            </p>

            <p className="text-[12px] leading-none text-[#5F6C80] sm:text-[14px]">
              of {formatGbp(project.goalAmountMinor)} goal
            </p>
          </div>

          <div className="mt-3 h-[14px] w-full rounded-full bg-[#E9EDF3] p-[2px] sm:h-[16px]">
            <div
              className="h-full rounded-full bg-[#FFD700]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-[13px] leading-none text-[#6A7282] sm:text-[14px]">
            {progress}% funded
          </p>

          {/* No payment processor exists anywhere in this codebase (checked)
              — "Support" registers real interest without moving money,
              instead of an "Invest" button that would silently do nothing
              with a card number. */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleSupport}
              disabled={project.isSupportedByMe || supporting}
              className="flex h-[46px] w-full items-center justify-center gap-2.5 rounded-[14px] border border-[#D7263D] bg-transparent px-5 text-[14px] font-medium text-[#001F3F] transition hover:bg-[#fff7f8] disabled:opacity-60 sm:rounded-[16px] sm:border-[1.5px]"
            >
              {supporting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Heart
                  size={20}
                  strokeWidth={2.1}
                  className={project.isSupportedByMe ? "fill-[#D7263D] text-[#D7263D]" : ""}
                />
              )}
              {project.isSupportedByMe ? "Supporting" : "Support"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function GreenInnovationProjects() {
  const [projects, setProjects] = useState<BackendProject[] | null>(null);

  const load = () => {
    api
      .get("/green-projects")
      .then(({ data }) => setProjects(data?.data ?? data ?? []))
      .catch(() => setProjects([]));
  };

  useEffect(load, []);

  return (
    <section className="w-full rounded-[20px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 lg:rounded-[24px] lg:px-[34px] lg:pb-[34px] lg:pt-[30px]">
      <h2 className="text-[21px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#001F3F] md:text-[25px]">
        Green Innovation Projects
      </h2>

      <p className="mt-3 max-w-2xl text-[14px] leading-[1.45] text-[#6B7280] sm:mt-4 sm:text-base">
        Support eco-startups and community sustainability initiatives
      </p>

      {projects === null ? (
        <div className="mt-8 flex justify-center py-8 text-gray-400">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <p className="mt-8 text-[14px] text-[#6B7280]">
          No projects have been added yet — check back soon.
        </p>
      ) : (
        <div className="mt-6 space-y-5 sm:space-y-6 lg:mt-[34px] lg:space-y-[28px]">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onSupported={load} />
          ))}
        </div>
      )}
    </section>
  );
}
