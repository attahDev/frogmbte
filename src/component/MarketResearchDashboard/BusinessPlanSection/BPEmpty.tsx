import EmptyState from '../ui/EmptyState';

export default function BPEmpty() {
  return (
    <div className="mt-20">
      <EmptyState
        title="No business plan built yet"
        description='Go back to the Dashboard, enter your business idea and
click "Build Plan" to see your full roadmap, financials, and
execution plan here.'
        icon={
          <img
            src="../../../../public/ai-dashboard/EmptyBP.svg"
            alt="Empty state illustration"
            className="h-50 w-50 object-contain"
          />
        }
        buttonText='Go to dashboard'
      />
    </div>
  );
}