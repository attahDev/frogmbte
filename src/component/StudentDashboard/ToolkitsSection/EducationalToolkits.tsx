import { BookOpen, Users, Target } from "lucide-react";
import DashboardBreadcrumb from "../ui/DashboardBreadcrumb";

export default function EducationlToolkit() {
  const stats = [
    {
      title: "Business Modules",
      value: "6",
      icon: <BookOpen size={24} className="text-[#D7263D]" strokeWidth={2.2} />,
    },
    {
      title: "Active Projects",
      value: "4",
      icon: <Target size={24} className="text-[#D7263D]" strokeWidth={2.2} />,
    },
    {
      title: "Assigned Mentor",
      value: "3",
      icon: <Users size={24} className="text-[#D7263D]" strokeWidth={2.2} />,
    },
  ];

  return (
    <div className="bg-[#FFFDF7]">
      {/* Header */}
      <div className="bg-[#FFD700] px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 border-b-4 border-[#001F3F]">
        <DashboardBreadcrumb
          items={[
            { label: "Dashboard", to: "/dashboard" },
            { label: "Business Growth" },
          ]}
        />

        {/* Title */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#001F3F] flex items-center justify-center shrink-0">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            >
              <path
                d="M8 29.3333V5.33334C8 4.62609 8.28095 3.94782 8.78105 3.44772C9.28115 2.94762 9.95942 2.66667 10.6667 2.66667H21.3333C22.0406 2.66667 22.7189 2.94762 23.219 3.44772C23.719 3.94782 24 4.62609 24 5.33334V29.3333H8Z"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.99996 16H5.33329C4.62605 16 3.94777 16.281 3.44767 16.781C2.94758 17.2811 2.66663 17.9594 2.66663 18.6667V26.6667C2.66663 27.3739 2.94758 28.0522 3.44767 28.5523C3.94777 29.0524 4.62605 29.3333 5.33329 29.3333H7.99996"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 12H26.6667C27.3739 12 28.0522 12.281 28.5523 12.781C29.0524 13.2811 29.3333 13.9594 29.3333 14.6667V26.6667C29.3333 27.3739 29.0524 28.0522 28.5523 28.5523C28.0522 29.0524 27.3739 29.3333 26.6667 29.3333H24"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3334 8H18.6667"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3334 13.3333H18.6667"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3334 18.6667H18.6667"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.3334 24H18.6667"
                stroke="#FFD700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <p className="text-[#001F3F] text-xs sm:text-sm md:text-base mb-1 sm:mb-2 font-medium">
              Business & Entrepreneurship Toolkit
            </p>
            <h1 className="text-[#001F3F] font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-tight">
              Business & Entrepreneurship Toolkit
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-[18px] sm:rounded-[20px] border border-[#001F3F] bg-[#FFFDF7] px-5 sm:px-6 py-5 min-h-[130px] sm:min-h-[150px] flex items-center justify-between"
            >
              <div className="flex flex-col justify-between h-full min-w-0">
                <h3 className="text-sm font-medium text-[#6B7280] leading-snug">
                  {item.title}
                </h3>

                <p className="text-[32px] sm:text-[40px] md:text-[45px] font-extrabold leading-none text-[#001F3F] mt-3">
                  {item.value}
                </p>
              </div>

              <div className="ml-4 flex p-4 sm:p-5 items-center justify-center rounded-[18px] sm:rounded-[22px] bg-[#FFD700] shrink-0">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <button className="h-[56px] sm:h-[60px] px-5 sm:px-6 rounded-[16px] sm:rounded-[18px] bg-[#D7263D] text-white border border-[#D7263D] flex items-center justify-center gap-3 text-sm sm:text-base font-medium w-full transition hover:opacity-95">
            <BookOpen size={22} />
            <span>Start Learning</span>
          </button>

          <button className="h-[56px] sm:h-[60px] px-5 sm:px-6 rounded-[16px] sm:rounded-[18px] bg-[#001F3F] text-[#FFD700] border border-[#001F3F] flex items-center justify-center gap-3 text-sm sm:text-base font-medium w-full transition hover:opacity-95">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 14.6667V2.66668C4 2.31305 4.14048 1.97392 4.39052 1.72387C4.64057 1.47382 4.97971 1.33334 5.33333 1.33334H10.6667C11.0203 1.33334 11.3594 1.47382 11.6095 1.72387C11.8595 1.97392 12 2.31305 12 2.66668V14.6667H4Z"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.00004 8H2.66671C2.31309 8 1.97395 8.14048 1.7239 8.39052C1.47385 8.64057 1.33337 8.97971 1.33337 9.33333V13.3333C1.33337 13.687 1.47385 14.0261 1.7239 14.2761C1.97395 14.5262 2.31309 14.6667 2.66671 14.6667H4.00004"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6H13.3333C13.687 6 14.0261 6.14048 14.2761 6.39052C14.5262 6.64057 14.6667 6.97971 14.6667 7.33333V13.3333C14.6667 13.687 14.5262 14.0261 14.2761 14.2761C14.0261 14.5262 13.687 14.6667 13.3333 14.6667H12"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66663 4H9.33329"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66663 6.66666H9.33329"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66663 9.33334H9.33329"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66663 12H9.33329"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Submit Business Idea</span>
          </button>

          <button className="h-[56px] sm:h-[60px] px-5 sm:px-6 rounded-[16px] sm:rounded-[18px] bg-transparent text-[#001F3F] border-2 border-[#001F3F] flex items-center justify-center gap-3 text-sm sm:text-base font-medium w-full transition hover:bg-[#001F3F] hover:text-white group">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M10.6666 4.66666H14.6666V8.66666"
                stroke="currentColor"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6667 4.66666L9.00004 10.3333L5.66671 6.99999L1.33337 11.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Join Live Session</span>
          </button>
        </div>
      </section>
    </div>
  );
}