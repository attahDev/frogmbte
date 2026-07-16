import EmptyState from '../ui/EmptyState';

export default function IGEmpty() {
  return (
    <div className="mt-20">
      <EmptyState
        title="No ideas generated yet"
        description='Head back to the Dashboard, describe your business idea,
        and hit "Generate Ideas for Me" to see your results here.'
        icon={
          <img
            src="../../../../public/ai-dashboard/EmptyDashboard.svg"
            alt="Empty state illustration"
            className="h-50 w-50 object-contain"
          />
        }
        buttonText='Go to dashboard'
      />
    </div>
  );
}