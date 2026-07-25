import { useEffect, useState } from 'react';
import { BarChart3, FileText, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsCard from './StatsCard';
import { listIdeas } from '../lib/ideaEngineApi';
import { getBusinessPlanHistory } from '../lib/businessPlannerApi';
import { getRecentSearches } from '../../MarketResearchTool/api';

export default function DashboardStats() {
  const navigate = useNavigate();
  const [ideasCount, setIdeasCount] = useState<number | null>(null);
  const [plansCount, setPlansCount] = useState<number | null>(null);
  const [analysesCount, setAnalysesCount] = useState<number | null>(null);

  useEffect(() => {
    listIdeas()
      .then((ideas) => setIdeasCount(ideas.length))
      .catch((err) => {
        console.error('Failed to load ideas count:', err);
        setIdeasCount(0);
      });

    getBusinessPlanHistory()
      .then((plans) => setPlansCount((plans || []).length))
      .catch((err) => {
        console.error('Failed to load plans count:', err);
        setPlansCount(0);
      });

    // Market Research has no server-side history endpoint yet, so this is
    // only recent searches stored locally in this browser, not a true count.
    try {
      setAnalysesCount(getRecentSearches().length);
    } catch {
      setAnalysesCount(0);
    }
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatsCard
        title="Ideas Generated"
        value={ideasCount ?? '—'}
        icon={Lightbulb}
        onClick={() => navigate('/dashboard/idea-generator')}
        onViewAll={() => navigate('/dashboard/idea-generator')}
      />
      <StatsCard
        title="Plans Created"
        value={plansCount ?? '—'}
        icon={FileText}
        onClick={() => navigate('/dashboard/business-plan')}
        onViewAll={() => navigate('/dashboard/business-plan')}
      />
      <StatsCard
        title="Market Analyses"
        value={analysesCount ?? '—'}
        icon={BarChart3}
        onClick={() => navigate('/dashboard/market-research')}
        onViewAll={() => navigate('/dashboard/market-research')}
      />
    </div>
  );
}
