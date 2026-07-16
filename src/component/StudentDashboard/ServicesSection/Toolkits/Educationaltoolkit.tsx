import { BookOpen, Calendar, Users } from "lucide-react";
import DashboardBreadcrumb from "../../ui/DashboardBreadcrumb";

export default function EducationToolkit() {
  return (
    <div className="bg-[#FFFDF7]">
      <div className="bg-[#FFD700] px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 border-b-4 border-[#001F3F]">
        <DashboardBreadcrumb
          items={[
            { label: "Dashboard", to: "/dashboard" },
            { label: "Academy" },
          ]}
        />

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#001F3F] flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-7 sm:h-7 md:w-8 md:h-8">
              <path d="M28.5597 14.5627C28.7984 14.4574 29.001 14.2844 29.1423 14.0651C29.2836 13.8459 29.3575 13.5899 29.3548 13.3291C29.3521 13.0682 29.273 12.8138 29.1271 12.5975C28.9813 12.3812 28.7752 12.2124 28.5344 12.1121L17.1064 6.90674C16.759 6.74827 16.3816 6.66626 15.9997 6.66626C15.6179 6.66626 15.2405 6.74827 14.8931 6.90674L3.4664 12.1067C3.22902 12.2107 3.02709 12.3816 2.88529 12.5985C2.74349 12.8154 2.66797 13.0689 2.66797 13.3281C2.66797 13.5872 2.74349 13.8407 2.88529 14.0576C3.02709 14.2746 3.22902 14.4454 3.4664 14.5494L14.8931 19.7601C15.2405 19.9185 15.6179 20.0005 15.9997 20.0005C16.3816 20.0005 16.759 19.9185 17.1064 19.7601L28.5597 14.5627Z" stroke="#FFD700" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M29.333 13.3333V21.3333" stroke="#FFD700" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 16.6667V21.3334C8 22.3943 8.84286 23.4117 10.3431 24.1618C11.8434 24.912 13.8783 25.3334 16 25.3334C18.1217 25.3334 20.1566 24.912 21.6569 24.1618C23.1571 23.4117 24 22.3943 24 21.3334V16.6667" stroke="#FFD700" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div>
            <p className="text-[#001F3F] text-sm sm:text-base mb-1 sm:mb-2 font-medium">
              Education Toolkit
            </p>
            <h1 className="text-[#001F3F] text-lg sm:text-xl md:text-2xl font-bold leading-tight">
              Education & Empowerment Service
            </h1>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {/* Available Resources */}
        <div className="rounded-xl sm:rounded-2xl border border-[#FFD700] p-6 sm:p-8 bg-[#FFFEF5] relative">
          <span className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 bg-[#FFD700] text-[#001F3F] text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full font-semibold">
            Active
          </span>

          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFD700] rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
            <BookOpen className="text-[#001F3F]" size={22} />
          </div>

          <h3 className="text-[#001F3F] text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Available Resources
          </h3>

          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <p className="text-[#E11D48] text-3xl sm:text-4xl font-bold">12</p>

            <span className="inline-block bg-[#EEF2F7] text-[#001F3FB2] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs whitespace-nowrap">
              Courses & Tutorials
            </span>
          </div>
        </div>

        {/* Active Mentors */}
        <div className="rounded-xl sm:rounded-2xl border border-[#001F3F] p-6 sm:p-8 bg-[#FFFCF2] relative">
          <span className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 bg-[#001F3F] text-[#FFD700] text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full font-semibold">
            Online
          </span>

          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#001F3F] rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
            <Users className="text-[#FFD700]" size={22} />
          </div>

          <h3 className="text-[#001F3F] text-lg sm:text-xl font-semibold mb-3 sm:mb-5">
            Active Mentors
          </h3>

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-[#E11D48] text-3xl sm:text-4xl font-bold">12</p>

            <span className="inline-block bg-[#EEF2F7] text-[#001F3FB2] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs whitespace-nowrap">
              Available Now
            </span>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-xl sm:rounded-2xl border border-[#E11D48] p-6 sm:p-8 bg-[#FFFCF2] relative md:col-span-2 lg:col-span-1">
          <span className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 bg-[#E11D48] text-white text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full font-semibold">
            Active
          </span>

          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#E11D48] rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6">
            <Calendar className="text-white" size={22} />
          </div>

          <h3 className="text-[#001F3F] text-lg sm:text-xl font-semibold mb-3 sm:mb-5">
            Upcoming Events
          </h3>

          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-[#E11D48] text-3xl sm:text-4xl font-bold">12</p>

            <span className="inline-block bg-[#EEF2F7] text-[#001F3FB2] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs whitespace-nowrap">
              Workshops This Month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}