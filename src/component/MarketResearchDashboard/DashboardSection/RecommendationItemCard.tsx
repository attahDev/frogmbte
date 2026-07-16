import AIDashboardCard from "../ui/AIDashboardCard";


export default function RecommendationItem({ text }: { text: string }) {
  return (
    <AIDashboardCard variant="recommendation" padding="sm" className="bg-[#FFF8E9]">
      <p className="text-sm leading-6 text-[#8A5B2D]">{text}</p>
    </AIDashboardCard>
  );
}