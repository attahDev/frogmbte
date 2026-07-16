import React, { type JSX } from "react";
import type { SVGProps } from "react";
import { useApiGet } from "../hooks/useApiGet";

type Metric = { value: string | number; label: string };
type Resource = { id: string; title: string; href: string; kind?: "doc" | "video" | "course" };

interface MentorStats {
  skillsDeveloped: number;
  totalSessions: number;
  networkGrowth: number;
  careerReadinessPercent: number;
}
interface MyMentorEntry {
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "DECLINED";
  nextSessionAt: string | null;
}

const EMPTY_STATS: MentorStats = { skillsDeveloped: 0, totalSessions: 0, networkGrowth: 0, careerReadinessPercent: 0 };

const IconDoc = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0003 1.33325H4.00033C3.6467 1.33325 3.30756 1.47373 3.05752 1.72378C2.80747 1.97382 2.66699 2.31296 2.66699 2.66659V13.3333C2.66699 13.6869 2.80747 14.026 3.05752 14.2761C3.30756 14.5261 3.6467 14.6666 4.00033 14.6666H12.0003C12.3539 14.6666 12.6931 14.5261 12.9431 14.2761C13.1932 14.026 13.3337 13.6869 13.3337 13.3333V4.66659L10.0003 1.33325Z" stroke="#FFB81C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.33301 1.33325V3.99992C9.33301 4.35354 9.47348 4.69268 9.72353 4.94273C9.97358 5.19278 10.3127 5.33325 10.6663 5.33325H13.333" stroke="#FFB81C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.66634 6H5.33301" stroke="#FFB81C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6663 8.66675H5.33301" stroke="#FFB81C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6663 11.3333H5.33301" stroke="#FFB81C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconExternal = (props: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
    <path d="M14 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 21H3V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StatTile: React.FC<{ metric: Metric; loading?: boolean }> = ({ metric, loading }) => (
  <div className="bg-white/90 shadow rounded-xl p-4 sm:p-5 lg:p-6 flex flex-col justify-center min-h-[80px] sm:min-h-[88px]">
    {loading ? (
      <span className="h-6 w-10 animate-pulse rounded bg-gray-200" />
    ) : (
      <div className="text-xl sm:text-2xl font-semibold text-slate-900">{metric.value}</div>
    )}
    <div className="text-xs sm:text-sm text-slate-500 mt-1">{metric.label}</div>
  </div>
);

const ResourceRow: React.FC<{ r: Resource }> = ({ r }) => (
  <li className="flex items-center gap-3 sm:gap-4 lg:gap-5 py-3 sm:py-4 lg:py-5">
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#FFF6D8] flex items-center justify-center shrink-0">
      <IconDoc className="w-5 h-5 sm:w-6 sm:h-6" />
    </div>
    <a
      href={r.href}
      target={r.href.startsWith("/") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full text-sm sm:text-base font-medium text-[#0A1F44] hover:text-[#1E3A8A] transition-colors gap-2"
    >
      <span className="truncate pr-2">{r.title}</span>
      <IconExternal className="w-4 h-4 text-[#94A3B8] flex-shrink-0" />
    </a>
  </li>
);

// Real, in-app destinations — replaces the old links that all pointed to "#".
const RESOURCES: Resource[] = [
  { id: "r1", title: "Chat with Mentor AI for guidance", href: "/dashboard/mentors-ai", kind: "doc" },
  { id: "r2", title: "Browse mentor directory", href: "/dashboard/community/find", kind: "doc" },
  { id: "r3", title: "Explore training courses", href: "/dashboard/academy", kind: "doc" },
];

export default function MentorshipProgress(): JSX.Element {
  const { data: stats, loading: statsLoading } = useApiGet<MentorStats>("/mentors/stats", EMPTY_STATS);
  const { data: mentors, loading: mentorsLoading } = useApiGet<MyMentorEntry[]>("/mentors/my-mentors", []);
  const s = stats ?? EMPTY_STATS;
  const myMentors = mentors ?? [];
  const loading = statsLoading || mentorsLoading;

  const upcoming = myMentors.filter((m) => m.nextSessionAt && new Date(m.nextSessionAt) > new Date()).length;
  const pendingRequests = myMentors.filter((m) => m.status === "PENDING").length;
  const percentForBar = s.careerReadinessPercent;

  const metrics: Metric[] = [
    { value: s.totalSessions, label: "Sessions Attended" },
    { value: upcoming, label: "Upcoming" },
    { value: pendingRequests, label: "Pending Requests" },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: Large Progress Card (spans 8/12 on large screens) */}
        <article
          aria-labelledby="mentorship-progress-title"
          className="lg:col-span-8 bg-[#FFF9E6] border border-[#FFD70033] rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm"
        >
          <header className="flex items-start justify-between mb-5 sm:mb-6">
            <div>
              <h2 id="mentorship-progress-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                Your Mentorship Progress
              </h2>
              <p className="sr-only">Overview of your mentorship completion and metrics</p>
            </div>
          </header>

          {/* Progress Labels */}
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm sm:text-base text-[#364153]">Overall Progress</div>
            <div className="text-sm sm:text-base font-medium text-[#364153]">
              {loading ? "…" : `${percentForBar}% Complete`}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-5 sm:mb-6">
            <div
              className="w-full rounded-full bg-slate-200 h-2.5 sm:h-3 overflow-hidden"
              role="progressbar"
              aria-valuenow={percentForBar}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall mentorship progress"
            >
              <div
                className="h-full bg-slate-900 transition-all duration-500"
                style={{ width: `${percentForBar}%` }}
              />
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
            {metrics.map((m) => (
              <StatTile key={m.label} metric={m} loading={loading} />
            ))}
          </div>

          {!loading && myMentors.length === 0 && (
            <p className="text-sm text-slate-600 mb-4">
              You haven't started a mentorship yet — connect with a mentor to start tracking real progress here.
            </p>
          )}

          {/* Quote */}
          <blockquote className="mt-4 text-slate-600 italic text-base sm:text-lg">
            &quot;Every great career begins with great guidance.&quot;
          </blockquote>
        </article>

        {/* Right: Resource Library (spans 4/12 on large screens) */}
        <aside
          aria-labelledby="resource-library-title"
          className="lg:col-span-4 bg-[#FFFBF2] rounded-xl sm:rounded-[20px] border border-[#E6E1D3] p-5 sm:p-6 lg:p-7"
        >
          <h3 id="resource-library-title" className="text-lg sm:text-xl font-semibold text-[#002147] mb-3 sm:mb-4">
            Resource Library
          </h3>

          <ul className="space-y-1 sm:space-y-2">
            {RESOURCES.map((r) => (
              <ResourceRow key={r.id} r={r} />
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
