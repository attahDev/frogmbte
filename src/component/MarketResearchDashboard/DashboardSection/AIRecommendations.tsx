import { useNavigate } from "react-router-dom";
import AIDashboardCard from "../ui/AIDashboardCard";
import RecommendationItem from "./RecommendationItemCard";

export default function DashboardRecommendations() {
  const navigate = useNavigate();

  return (
    <AIDashboardCard variant="smpanel" padding="md">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#001F3F]">AI Recommendations</h3>
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/opportunity-insights")}
          className="text-xs text-[#D7263D] hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        <RecommendationItem text="Your AI Fitness Coaching App has high market potential. Consider launching an MVP within 60 days." />
        <RecommendationItem text="Add a subscription model to your E-commerce Store to increase lifetime value." />
        <RecommendationItem text="Focus on digital marketing for initial customer acquisition of your Learning Platform." />
      </div>
    </AIDashboardCard>
  );
}
