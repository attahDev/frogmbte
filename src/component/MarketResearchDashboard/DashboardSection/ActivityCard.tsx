import type { LucideIcon } from "lucide-react";
import AIDashboardCard from "../ui/AIDashboardCard";


export default function ActivityCard({
  icon: Icon,
  title,
  time,
}: {
  icon: LucideIcon;
  title: string;
  time: string;
}) {
  return (
    <AIDashboardCard variant="activity" padding="sm">
     <div className="flex items-start gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1D8] text-[#D7263D]">
    <Icon className="h-4 w-4" />
  </div>

  <div className="flex w-full items-start justify-between gap-5">
    <p className="text-sm leading-6 text-[#001F3F]">
      {title}
    </p>

    <p className="mt-1 whitespace-nowrap text-xs text-[#8C96A3]">
      {time}
    </p>
  </div>
</div>
    </AIDashboardCard>
  );
}