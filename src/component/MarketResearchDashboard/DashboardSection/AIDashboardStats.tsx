import { BarChart3, FileText, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from './StatsCard';

export default function DashboardStats() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatsCard
        title="Ideas Generated"
        value={12}
        icon={Lightbulb}
        onClick={() => navigate('/dashboard/idea-generator')}
        onViewAll={() => navigate('/dashboard/idea-generator')}
      />
      <StatsCard
        title="Plans Created"
        value={8}
        icon={FileText}
        onClick={() => navigate('/dashboard/business-plan')}
        onViewAll={() => navigate('/dashboard/business-plan')}
      />
      <StatsCard
        title="Market Analyses"
        value={6}
        icon={BarChart3}
        onClick={() => navigate('/dashboard/market-research')}
        onViewAll={() => navigate('/dashboard/market-research')}
      />
    </div>
  );
}
