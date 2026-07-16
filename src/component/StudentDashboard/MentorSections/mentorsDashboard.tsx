import type { JSX } from "react";
import { Users } from "lucide-react";
import { useApiGet } from "../hooks/useApiGet";
import CardSkeleton from "../shared/CardSkeleton";
import EmptyState from "../../MarketResearchDashboard/ui/EmptyState";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "danger";
}

// ------------------------------------------------------------
// UI COMPONENTS (Card + Button)
// ------------------------------------------------------------

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`rounded-2xl border bg-[#FFFDF7] shadow-sm ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }: CardProps) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export const Button = ({ children, className = "", variant = "default", ...props }: ButtonProps) => {
  const base =
    "px-3 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  } as const;

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// ------------------------------------------------------------
// REAL DATA — replaces the old hardcoded MOCK DATA arrays
// ------------------------------------------------------------

interface MentorStats {
  skillsDeveloped: number;
  totalSessions: number;
  networkGrowth: number;
  careerReadinessPercent: number;
}

interface MyMentorEntry {
  connectionId: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "DECLINED";
  sessionsCompleted: number;
  nextSessionAt: string | null;
  mentor: {
    id: string;
    name: string;
    role: string;
    company: string | null;
    avatarUrl: string | null;
    skills: string[];
  };
}

const EMPTY_STATS: MentorStats = {
  skillsDeveloped: 0,
  totalSessions: 0,
  networkGrowth: 0,
  careerReadinessPercent: 0,
};

const statIconMeta = [
  { key: "skillsDeveloped", label: "Skills Developed", iconBg: "bg-green-100", format: (v: number) => `${v}` },
  { key: "totalSessions", label: "Total Sessions", iconBg: "bg-blue-100", format: (v: number) => `${v}` },
  { key: "networkGrowth", label: "Network Growth", iconBg: "bg-gray-200", format: (v: number) => `+${v}` },
  { key: "careerReadinessPercent", label: "Career Readiness", iconBg: "bg-yellow-100", format: (v: number) => `${v}%` },
] as const;

// ------------------------------------------------------------
// MAIN COMPONENT — Mentors Dashboard (RESPONSIVE)
// ------------------------------------------------------------

export default function MentorsDashboard(): JSX.Element {
  const { data: stats, loading: statsLoading } = useApiGet<MentorStats>("/mentors/stats", EMPTY_STATS);
  const { data: mentors, loading: mentorsLoading } = useApiGet<MyMentorEntry[]>("/mentors/my-mentors", []);
  const s = stats ?? EMPTY_STATS;
  const myMentors = mentors ?? [];

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F] mb-2 sm:mb-4">My Mentors</h1>
      <p className="text-[#6B7280] text-base sm:text-lg mb-6 sm:mb-8 lg:mb-10">
        Connect, learn, and grow through mentorship that matches your goals.
      </p>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mb-14 lg:grid-cols-4 lg:gap-6">
        {statIconMeta.map((meta) => (
          <Card
            key={meta.key}
            className="rounded-xl sm:rounded-2xl border border-[#FFD700] shadow-sm bg-yellow-50/30"
          >
            <CardContent className="p-3 sm:p-4 lg:p-6 relative flex flex-col justify-center h-full min-h-[110px] sm:min-h-[130px]">
              <div>
                <p className="text-[#6B7280] text-xs sm:text-sm mb-1 sm:mb-2">{meta.label}</p>
                {statsLoading ? (
                  <span className="inline-block h-8 w-16 animate-pulse rounded bg-gray-200" />
                ) : (
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001F3F]">
                    {meta.format(s[meta.key])}
                  </span>
                )}
              </div>
              <div
                className={`absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-lg sm:rounded-xl ${meta.iconBg}`}
              >
                <Users className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#001F3F]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mentors Section */}
      <h2 className="text-xl sm:text-2xl font-bold text-[#001F3F] mb-1 sm:mb-2">Your Mentors Activity</h2>
      <p className="text-[#6B7280] text-sm sm:text-base mb-6 sm:mb-8">Stay connected with mentors guiding your journey.</p>

      {mentorsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[0, 1, 2].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : myMentors.length === 0 ? (
        <EmptyState
          title="No mentors yet"
          description="You haven't connected with a mentor yet. Head to Find a Mentor to browse the directory and send a connection request."
          buttonText="Find a Mentor"
          buttonHref="/dashboard/community/find"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {myMentors.map((m) => (
            <Card key={m.connectionId} className="rounded-xl sm:rounded-2xl border-[#0000001A] shadow-md">
              <CardContent className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src={m.mentor.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(m.mentor.name)}`}
                    alt={m.mentor.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg text-[#001F3F] truncate">{m.mentor.name}</h3>
                    <p className="text-[#4A5565] text-xs sm:text-sm truncate">
                      {m.mentor.role}{m.mentor.company ? `, ${m.mentor.company}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  {m.mentor.skills.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-1 text-xs bg-yellow-50 border border-yellow-200 rounded-lg sm:rounded-xl text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-700 text-xs sm:text-sm mb-1">Sessions completed</p>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  {m.sessionsCompleted} session{m.sessionsCompleted === 1 ? "" : "s"} · Status: {m.status.toLowerCase()}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <button className="bg-[#D7263D] px-3 sm:px-4 py-2 text-white rounded-xl text-xs sm:text-sm font-medium transition flex items-center justify-center gap-2 flex-1 sm:flex-initial">
                    <span className="truncate">Schedule Session</span>
                  </button>
                  <Button variant="outline" className="flex-1 sm:flex-initial justify-center">
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
