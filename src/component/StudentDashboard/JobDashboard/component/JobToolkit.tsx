import DashboardBreadcrumb from "../../ui/DashboardBreadcrumb";

export default function JobToolkit() {

  

  return (
    <div className="bg-[#FFFDF7]">
      {/* Header */}
      <div className="bg-[#FFD700] px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-6 md:py-8 border-b-4 border-[#001F3F]">
        <DashboardBreadcrumb
          items={[
            { label: "Dashboard", to: "/dashboard" },
            { label: "Opportunities" },
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
            Job Opportunities & Career Hub
            </p>
            <h1 className="text-[#001F3F] font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-tight">
            Job Opportunities & Career Hub
            </h1>
          </div>
        </div>
      </div>

    </div>
  );
}