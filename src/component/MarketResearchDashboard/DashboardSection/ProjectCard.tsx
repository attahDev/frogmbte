import { MoreHorizontal } from "lucide-react";

type ProjectCardProps = {
  title: string;
  status: string;
  updatedAt: string;
  score: number;
  accent?: "green" | "rose" | "purple";
  onClick?: () => void;
};

const statusStyles = {
  green: {
    pillBg: "bg-[#EDF7EE]",
    pillText: "text-[#63A75A]",
    bar: "bg-[#5AA34A]",
    scoreText: "text-[#5AA34A]",
  },
  rose: {
    pillBg: "bg-[#FBEFF0]",
    pillText: "text-[#D75A67]",
    bar: "bg-[#D7263D]",
    scoreText: "text-[#D7263D]",
  },
  purple: {
    pillBg: "bg-[#F3ECF8]",
    pillText: "text-[#9A63B0]",
    bar: "bg-[#9A63B0]",
    scoreText: "text-[#9A63B0]",
  },
};

export default function ProjectCard({
  title,
  status,
  updatedAt,
  score,
  accent = "green",
  onClick,
}: ProjectCardProps) {
  const styles = statusStyles[accent];

  return (
    <button
      onClick={onClick}
      className="min-h-[224px] rounded-[22px] border border-[#E8E8E0] bg-[#FFFDF7] p-4 text-left shadow-[0_2px_10px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.12)]"
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-[13px] font-semibold ${styles.pillBg} ${styles.pillText}`}
        >
          {status}
        </span>

        <MoreHorizontal className="h-5 w-5 text-[#9AA3B2]" />
      </div>

      <h4 className="max-w-[190px] text-[20px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#001F3F]">
        {title}
      </h4>

      <p className="mt-3 text-[14px] text-[#9AA3B2]">Updated {updatedAt}</p>

      <div className="mt-4">
        <p className="mb-2 text-[14px] font-semibold text-[#5B6472]">
          Market Score
        </p>

        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#D9DEE7]">
            <div
              className={`h-full rounded-full ${styles.bar}`}
              style={{ width: `${score}%` }}
            />
          </div>

          <span className={`text-[16px] font-bold ${styles.scoreText}`}>
            {score}/100
          </span>
        </div>
      </div>
    </button>
  );
}