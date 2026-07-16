import AIDashboardButton from "../ui/AIDashboardButton";
import AIDashboardCard from "../ui/AIDashboardCard";

export default function ProjectsEmpty({
  onNewProject,
}: {
  onNewProject?: () => void;
}) {
  return (
    <AIDashboardCard variant="empty" padding="lg" className="text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD23F] text-2xl font-bold text-[#001F3F]">
        +
      </div>

      <h3 className="text-xl font-semibold text-white">No projects yet</h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
        Start planning your first idea to see projects, recommendations, and
        activity here.
      </p>

      <div className="mt-6">
        <AIDashboardButton variant="primary" onClick={onNewProject}>
          Create New Project
        </AIDashboardButton>
      </div>
    </AIDashboardCard>
  );
}