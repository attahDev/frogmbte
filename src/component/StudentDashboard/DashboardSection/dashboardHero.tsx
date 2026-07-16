import { ArrowRight, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../../contexts/mainuseAuth";
import { useApiGet } from '../hooks/useApiGet';
import { useCountdown } from '../hooks/useCountdown';
import { InlineSkeleton } from '../shared/CardSkeleton';

const cardClass =
  "block bg-[#FFFDF7] rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#001F3F]";

interface RecentActivityItem {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}

interface MentorshipSummary {
  mentorName: string;
  mentorRole: string;
  mentorAvatar: string | null;
  sessionsCompleted: number;
  nextSessionAt: string | null;
}

interface DashboardSummary {
  badgesThisMonth: number;
  activeMentors: number;
  newOpportunities: number;
  coursesCompleted: number;
  eventsThisMonth: number;
  recentActivity: RecentActivityItem[];
  mentorship: MentorshipSummary | null;
}

const EMPTY_SUMMARY: DashboardSummary = {
  badgesThisMonth: 0,
  activeMentors: 0,
  newOpportunities: 0,
  coursesCompleted: 0,
  eventsThisMonth: 0,
  recentActivity: [],
  mentorship: null,
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function CountdownBlock({ nextSessionAt }: { nextSessionAt: string | null }) {
  const countdown = useCountdown(nextSessionAt);

  if (!nextSessionAt || !countdown) {
    return <p className="text-xs sm:text-sm text-gray-500">No session scheduled yet.</p>;
  }

  if (countdown.isPast) {
    return <p className="text-xs sm:text-sm text-gray-500">Your session time has passed — check your messages for updates.</p>;
  }

  return (
    <div className="flex gap-3 sm:gap-4">
      {[
        { label: "Days", value: countdown.days },
        { label: "Hrs", value: countdown.hours },
        { label: "Mins", value: countdown.minutes },
        { label: "Sec", value: countdown.seconds },
      ].map((unit, i) => (
        <div className="flex items-center gap-3 sm:gap-4" key={unit.label}>
          {i > 0 && <div className="text-gray-400">:</div>}
          <div className="text-center">
            <div className="text-xs font-bold text-[#AF1B2E]">{unit.value}</div>
            <div className="text-xs text-gray-500">{unit.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardHero() {
  const { user } = useAuth();
  const { data: summary, loading } = useApiGet<DashboardSummary>('/dashboard/summary', EMPTY_SUMMARY);
  const s = summary ?? EMPTY_SUMMARY;

  return (
    <div className="bg-[#FFFDF7] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto mt-6 grid max-w-[1400px] grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:mt-12">
        {/* Main Content - Left 2 columns */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Welcome Banner */}
          <div className="relative min-h-[180px] overflow-hidden rounded-2xl bg-gradient-to-r from-[#001F3F] via-slate-700 to-[#FFD700] p-5 text-white sm:min-h-[200px] sm:rounded-3xl sm:p-8">
            <div className="relative z-10 pr-20 sm:pr-28">
              <h1 className="text-xl sm:text-2xl font-bold mb-2 text-[#FFFFFF]">Welcome back, {user?.firstname ?? "Student"}!</h1>
              <p className="text-sm sm:text-base text-[#DBEAFE] mb-4 sm:mb-6">Ready to take the next step in your tech journey?</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="inline-flex items-center px-3 py-1.5 bg-slate-700/50 text-xs sm:text-sm rounded-full max-w-fit">
                  <span className="mr-2 sm:mr-4 shrink-0 flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 690 690" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M264.646 551.702L423.247 551.318C421.152 579.157 365.352 631.38 342.408 641.077C337.27 634.923 326.805 627.845 319.943 622.405C300.323 606.849 269.289 577.286 264.646 551.702ZM440.186 492.986L253.397 492.211C239.814 488.058 244.96 468.742 246.791 445.769L441.687 446.091C444.104 461.717 443.329 479.667 440.186 492.986ZM257.166 386.74C261.809 363.332 280.794 345.912 293.734 335.571C340.808 297.947 355.307 300.689 399.924 337.503C413.54 348.742 430.125 362.391 434.999 386.722L257.166 386.74ZM428.822 306.504C469.381 283.906 491.838 261.09 543.663 242.478C566.26 234.356 597.409 229.568 619.965 238.848C687.18 266.496 637.672 363.009 544.38 367.971C522.212 369.155 479.888 369.225 467.872 355.74L428.83 306.504H428.822ZM263.928 310.5C222.074 339.262 249.422 374.857 142.943 367.806C51.1441 361.73 0.820202 260.968 74.2114 237.412C138.96 216.633 254.271 293.516 263.928 310.5ZM376.865 190.987C402.794 225.442 390.497 205.011 403.874 220.019C386.687 278.57 297.33 270.7 285.157 220.019L304.059 203.47C311.259 178.278 318.706 174.831 307.548 146.913C335.827 133.203 346.218 132.402 376.625 144.667C377.458 163.549 371.314 166.099 376.865 190.987ZM274.963 124.985C260.168 134.961 247.715 155.871 243.327 180.732C237.117 215.901 248.366 231.805 257.933 254.395C201.506 222.517 109.501 161.399 36.7695 212.402C-21.7686 253.455 -8.28438 333.638 62.1049 380.768C100.182 406.265 138.795 408.354 189.762 405.76C181.119 427.532 135.628 460.655 101.666 464.294C85.543 466.017 70.7312 464.615 71.1353 483.923C71.795 514.957 123.571 501.482 143.586 493.517C173.26 481.712 184.294 465.547 203.947 452.028C204.261 578.34 270.881 647.275 343.629 690C371.908 678.213 421.878 631.876 441.72 602.122C470.915 558.335 481.777 519.615 484.102 452.263C491.937 456.598 501.066 466.592 510.279 473.547C542.888 498.156 609.252 519.632 615.965 489.39C620.831 467.471 606.341 466.113 590.944 464.616C575.225 463.084 565.04 459.906 552.026 452.768C531.647 441.582 506.567 421.551 497.619 404.968C590.878 415.075 689.959 371 690 278.064C690.025 224.284 634.456 187.514 572.066 194.356C535.416 198.378 495.772 219.105 464.045 236.837C452.219 243.444 443.188 251.061 430.611 255.161C455.773 206.395 452.342 157.298 414.768 125.533C418.81 101.063 449.876 70.3861 463.22 58.8954C476.276 47.6396 482.519 45.8813 498.362 38.0553C516.134 29.2719 518.097 10.4949 502.889 2.3643C481.216 -9.22223 441.333 25.9729 430.842 36.3755C420.096 47.0306 413.837 54.4299 404.212 66.3908C395 77.838 386.539 93.594 379.364 101.333C341.122 94.0119 344.948 96.6934 307.795 100.994C299.647 78.813 216.722 -17.3094 181.795 2.72985C175.734 6.2119 163.289 24.6408 186.405 37.6898C201.184 46.0206 210.223 48.2231 223.773 59.3047C239.707 72.3363 269.1 101.847 274.955 125.011L274.963 124.985Z" fill="#040404" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M257.143 386.73L434.976 386.713C430.102 362.391 413.517 348.732 399.901 337.494C355.284 300.68 340.785 297.938 293.711 335.561C280.771 345.903 261.786 363.322 257.143 386.73Z" fill="#FAD315" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M440.176 492.981C443.318 479.663 444.093 461.721 441.677 446.087L246.781 445.765C244.95 468.737 239.803 488.054 253.386 492.207L440.176 492.981Z" fill="#FAD315" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M304.059 203.461L285.157 220.01C297.338 270.691 386.687 278.561 403.874 220.01C390.497 205.002 402.802 225.433 376.865 190.978C365.055 183.144 371.793 169.311 370.91 150.369C361.393 142.282 356.428 139.792 343.678 141.916C337.947 142.865 334.812 143.509 328.916 144.293C299.333 148.219 330.739 196.158 304.059 203.461Z" fill="#FAD315" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M264.632 551.702C269.275 577.287 300.309 606.849 319.929 622.405C326.782 627.846 337.256 634.923 342.394 641.078C365.338 631.372 421.138 579.149 423.232 551.319L264.632 551.702Z" fill="#FAD315" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M304.051 203.463C330.73 196.16 299.325 148.221 328.907 144.295C334.804 143.511 337.938 142.867 343.67 141.918C356.42 139.794 361.385 142.284 370.902 150.371C371.785 169.313 365.046 183.146 376.856 190.98C371.306 166.092 377.45 163.542 376.617 144.66C346.202 132.395 335.81 133.196 307.539 146.906C318.698 174.824 311.251 178.271 304.051 203.463Z" fill="#F8EA51" />
                    </svg>
                  </span>
                  <span className="text-xs sm:text-sm text-[#FFFFFF] leading-tight">
                    {loading ? (
                      <InlineSkeleton className="bg-white/30" />
                    ) : s.badgesThisMonth > 0 ? (
                      `You've earned ${s.badgesThisMonth} new badge${s.badgesThisMonth === 1 ? "" : "s"} this month`
                    ) : (
                      "No badges earned yet — keep going!"
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex flex-col items-center sm:top-8 sm:right-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FFD700] rounded-full flex items-center justify-center mb-1.5 sm:mb-2 shadow-lg">
                <svg width="28" height="28" className="sm:w-8 sm:h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3669 3.05994C15.4254 2.94189 15.5156 2.84252 15.6276 2.77304C15.7395 2.70356 15.8686 2.66675 16.0003 2.66675C16.132 2.66675 16.2611 2.70356 16.373 2.77304C16.4849 2.84252 16.5752 2.94189 16.6336 3.05994L19.7136 9.29861C19.9165 9.70923 20.216 10.0645 20.5864 10.3339C20.9569 10.6033 21.3871 10.7788 21.8403 10.8453L28.7283 11.8533C28.8588 11.8722 28.9814 11.9272 29.0823 12.0122C29.1831 12.0972 29.2582 12.2087 29.299 12.3341C29.3398 12.4595 29.3446 12.5938 29.3131 12.7219C29.2815 12.8499 29.2147 12.9665 29.1203 13.0586L24.139 17.9093C23.8104 18.2294 23.5646 18.6246 23.4227 19.0608C23.2808 19.497 23.247 19.9611 23.3243 20.4133L24.5003 27.2666C24.5233 27.3971 24.5092 27.5314 24.4596 27.6542C24.41 27.777 24.3269 27.8834 24.2197 27.9613C24.1125 28.0391 23.9856 28.0853 23.8534 28.0945C23.7213 28.1037 23.5892 28.0755 23.4723 28.0133L17.3149 24.7759C16.9092 24.5629 16.4579 24.4516 15.9996 24.4516C15.5414 24.4516 15.09 24.5629 14.6843 24.7759L8.52828 28.0133C8.41139 28.0752 8.27948 28.103 8.14755 28.0936C8.01562 28.0842 7.88897 28.038 7.78201 27.9602C7.67505 27.8824 7.59206 27.7762 7.54249 27.6536C7.49292 27.5309 7.47876 27.3969 7.50162 27.2666L8.67628 20.4146C8.75388 19.9622 8.72026 19.4978 8.57833 19.0613C8.43641 18.6249 8.19043 18.2295 7.86162 17.9093L2.88028 13.0599C2.78508 12.968 2.71761 12.8511 2.68557 12.7227C2.65353 12.5943 2.6582 12.4594 2.69906 12.3335C2.73991 12.2076 2.81531 12.0957 2.91665 12.0106C3.018 11.9254 3.14122 11.8705 3.27228 11.8519L10.1589 10.8453C10.6126 10.7793 11.0435 10.604 11.4144 10.3346C11.7853 10.0652 12.0852 9.70963 12.2883 9.29861L15.3669 3.05994Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-center text-[#FFFFFF] text-[10px] sm:text-xs leading-tight max-w-[80px] sm:max-w-none">
                <div>Top Learner</div>
                <div>This Month</div>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Mentors Connected Card */}
            <Link to="/dashboard/community" className={cardClass}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 3.12793C16.8578 3.3503 17.6174 3.85119 18.1597 4.55199C18.702 5.25279 18.9962 6.11382 18.9962 6.99993C18.9962 7.88604 18.702 8.74707 18.1597 9.44787C17.6174 10.1487 16.8578 10.6496 16 10.8719" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 20.9999V18.9999C21.9993 18.1136 21.7044 17.2527 21.1614 16.5522C20.6184 15.8517 19.8581 15.3515 19 15.1299" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B7280]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Mentors Connected</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">Your network of industry mentors.</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {s.activeMentors > 0 && (
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(s.activeMentors, 3) }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white ${
                            ["bg-blue-500", "bg-green-500", "bg-purple-500"][i % 3]
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">
                    {loading ? (
                      <InlineSkeleton />
                    ) : s.activeMentors > 0 ? (
                      `${s.activeMentors} active mentor${s.activeMentors === 1 ? "" : "s"}`
                    ) : (
                      "No mentors yet"
                    )}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Browse Mentors</span>
              </div>
            </Link>

            {/* New Opportunities Card */}
            <Link to="/dashboard/opportunities" className={cardClass}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 20V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V20" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 6H4C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#001F3F] mb-2">New Opportunities</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">Opportunities matched to you</p>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-gray-900">
                  {loading ? <InlineSkeleton /> : s.newOpportunities > 0 ? `${s.newOpportunities} New Openings` : "No new openings"}
                </span>
                <span className="text-xs sm:text-sm text-gray-600">View Jobs</span>
              </div>
            </Link>

            {/* Training Courses Card */}
            <Link to="/dashboard/academy" className={cardClass}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B7280]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#001F3F] mb-2">Training Courses</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">Your active learning programs</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold text-gray-900">
                  {loading ? <InlineSkeleton /> : s.coursesCompleted > 0 ? `Completed ${s.coursesCompleted} Course${s.coursesCompleted === 1 ? "" : "s"}` : "No courses completed yet"}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Continue Learning</span>
              </div>
            </Link>

            {/* Events Joined Card */}
            <Link to="/dashboard/events" className={cardClass}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 2V6" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 2V6" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 10H21" stroke="#D7263D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#6B7280]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#001F3F] mb-2">Events Joined</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">Recent event and programs participation</p>
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-gray-900">
                  {loading ? <InlineSkeleton /> : s.eventsThisMonth > 0 ? `${s.eventsThisMonth} This Month` : "None this month"}
                </span>
                <span className="text-xs sm:text-sm text-gray-600">View Events</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Recent Activity Card */}
          <div className="bg-[#FFFDF7] rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-[#001F3F]">Recent Activity</h3>
              <button className="text-gray-[#001F3F] hover:text-[#001F3F]">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] mb-4 sm:mb-6">Your latest actions and updates</p>

            <div className="space-y-4 sm:space-y-6">
              {loading ? (
                <div className="space-y-3" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  ))}
                </div>
              ) : s.recentActivity.length === 0 ? (
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  Nothing here yet — apply to a job, complete a course, or connect with a mentor to see it show up here.
                </p>
              ) : (
                s.recentActivity.map((item) => (
                  <div className="flex gap-3" key={item.id}>
                    <div className="w-2 h-2 bg-[#D7263D] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-xs sm:text-sm text-[#6B7280]">{item.message}</p>
                      <p className="text-xs text-[#6B7280] mt-1">{timeAgo(item.createdAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link
              to="/dashboard/opportunities"
              className="w-full mt-4 sm:mt-6 p-3 sm:p-5 border rounded-full border-[#001F3F1A] text-xs sm:text-sm font-medium text-gray-900 hover:text-gray-700 flex items-center justify-center gap-2"
            >
              View all Activity <ArrowRight className="w-4 h-4" />
            </Link>

            {/* My Mentorship Activity Card */}
            <div className="block bg-[#FFD7000D] rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm border mt-6 sm:mt-10 border-yellow-100">
              <h3 className="text-lg sm:text-xl font-semibold text-[#001F3F] mb-4 sm:mb-6">My Mentorship Activity</h3>

              {loading ? (
                <div className="space-y-3" aria-hidden="true">
                  <div className="h-12 w-12 rounded-full bg-gray-100 animate-pulse" />
                  <div className="h-4 w-1/2 rounded bg-gray-100 animate-pulse" />
                </div>
              ) : !s.mentorship ? (
                <div className="text-center">
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    You haven't connected with a mentor yet. Find one who matches your goals to get started.
                  </p>
                  <Link
                    to="/dashboard/community"
                    className="inline-flex items-center gap-2 rounded-full bg-[#D7263D] px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-[#b91f33]"
                  >
                    Find a Mentor <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <img
                      src={s.mentorship.mentorAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(s.mentorship.mentorName)}`}
                      alt={s.mentorship.mentorName}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#001F3F]">{s.mentorship.mentorName}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{s.mentorship.mentorRole}</p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Sessions completed</span>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">{s.mentorship.sessionsCompleted}</span>
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm text-gray-600 mb-2">Next session</div>
                      {s.mentorship.nextSessionAt ? (
                        <div className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                          {new Date(s.mentorship.nextSessionAt).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </div>
                      ) : null}
                      <CountdownBlock nextSessionAt={s.mentorship.nextSessionAt} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
