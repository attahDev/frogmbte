import EmptyState from '../ui/EmptyState';

export default function IGEmpty() {
  return (
    <div className="mt-20">
      <EmptyState
        title="No market analysis yet"
        description='Go back to the Dashboard, enter your business idea and
click "Validate Idea" to see your full market analysis here.'
        icon={
          <img
            src="../../../../public/ai-dashboard/EmptyMR.svg"
            alt="Empty state illustration"
            className="h-50 w-50 object-contain"
          />
        }
        buttonText='Go to dashboard'
      />
    </div>
  );
}