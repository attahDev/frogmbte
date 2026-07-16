import EmptyState from '../ui/EmptyState';

export default function DashboardEmpty() {
  return (
    <div className="mt-6">
      <EmptyState
        title="Your ideas will live here"
        description="Fill in the form above and click 'Generate ideas for me' to get started. Your projects and metrics will appear here."
        icon={
          <img
            src="../../../../public/ai-dashboard/EmptyDashboard.svg"
            alt="Empty state illustration"
            className="h-28 w-28 object-contain"
          />
        }
      />
    </div>
  );
}