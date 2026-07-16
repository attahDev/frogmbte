import { BookOpen, Calendar, Video, ExternalLink } from "lucide-react";

export default function EducationToolkitContent() {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-12 bg-[#FFFDF7]">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-10">
        {/* LEFT SECTION */}
        <div className="xl:col-span-2 border border-[#001F3F] rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 bg-[#FFFCF7]">
          {/* About */}
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#001F3F] mb-3 sm:mb-4">
            About This Toolkit
          </h2>

          <p className="text-[#6B7280] leading-relaxed text-sm sm:text-base md:text-[16px] mb-6 sm:mb-8 max-w-3xl">
            The Education and Empowerment Toolkit connects students with mentors
            and learning resources to develop technical & soft skills needed in
            Greater Manchester&apos;s tech ecosystem. Access curated courses,
            top notch certification programs, and personalized mentorship to
            accelerate your career growth. Whether you&apos;re building
            foundational skills or advancing to expert level, this toolkit
            provides structured pathways and real world learning opportunities.
            Connecting students and schools with mentors & professionals and
            unlock career pathways.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
            <button className="flex items-center gap-2 sm:gap-3 bg-[#D7263D] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base">
              <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
              View Resources
            </button>

            <button className="flex items-center gap-2 sm:gap-3 bg-[#001F3F] text-[#FFD700] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base">
              <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
              Join Event
            </button>

            {/* FLEX LINE BREAK */}
            <div className="w-full" />

            <button className="flex items-center gap-2 sm:gap-3 border-2 border-[#FFD700] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-[#001F3F] text-sm sm:text-base">
              <Video size={16} className="sm:w-[18px] sm:h-[18px]" />
              Launch GMBTE Connect
            </button>

            <button className="flex items-center gap-2 sm:gap-3 border-2 border-[#001F3F] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-[#001F3F] text-sm sm:text-base">
              <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
              Access Guides
            </button>
          </div>

          <hr className="border-[#E2E8F0] mb-6 sm:mb-10" />

          {/* Featured Paths */}
          <h3 className="text-xl sm:text-2xl md:text-[24px] font-semibold text-[#001F3F] mb-6 sm:mb-8">
            Featured Learning Paths
          </h3>

          <div className="space-y-4 sm:space-y-6">
            <LearningPath
              title="Web Development Fundamentals"
              modules={8}
              progress={65}
            />
            <LearningPath
              title="Data Science & AI Basics"
              modules={12}
              progress={40}
            />
            <LearningPath
              title="Digital Marketing Essentials"
              modules={6}
              progress={85}
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6 sm:space-y-10">
          <h1 className="text-[#001F3F] text-2xl sm:text-[30px] font-bold">Quick Tools</h1>
          
          <QuickTool
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 5.83325V17.4999" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2.5 15C2.28 15 2.07 14.91 1.91 14.76C1.75 14.6 1.67 14.39 1.67 14.17V3.33C1.67 3.11 1.75 2.9 1.91 2.74C2.07 2.59 2.28 2.5 2.5 2.5H6.67C7.55 2.5 8.4 2.85 9.02 3.48C9.65 4.1 10 4.95 10 5.83C10 4.95 10.35 4.1 10.98 3.48C11.6 2.85 12.45 2.5 13.33 2.5H17.5C17.72 2.5 17.93 2.59 18.09 2.74C18.25 2.9 18.33 3.11 18.33 3.33V14.17C18.33 14.39 18.25 14.6 18.09 14.76C17.93 14.91 17.72 15 17.5 15H12.5C11.84 15 11.2 15.26 10.73 15.73C10.26 16.2 10 16.84 10 17.5C10 16.84 9.74 16.2 9.27 15.73C8.8 15.26 8.16 15 7.5 15H2.5Z" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            title="eLearning Portal"
            desc="Access all courses and learning materials"
            iconBg="bg-[#FFD700]"
          />

          <QuickTool
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.9 10.74L14.16 17.85C14.17 17.93 14.16 18.02 14.13 18.09C14.09 18.17 14.03 18.23 13.96 18.28C13.88 18.32 13.8 18.34 13.72 18.33C13.63 18.32 13.55 18.29 13.48 18.24L10.5 16C10.36 15.89 10.18 15.83 10 15.83C9.82 15.83 9.65 15.89 9.5 16L6.52 18.24C6.45 18.29 6.37 18.32 6.29 18.33C6.2 18.34 6.12 18.32 6.04 18.28C5.97 18.23 5.91 18.17 5.87 18.09C5.84 18.02 5.83 17.93 5.84 17.85L7.1 10.74" stroke="#FFFDF7" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 11.67C12.76 11.67 15 9.43 15 6.67C15 3.91 12.76 1.67 10 1.67C7.24 1.67 5 3.91 5 6.67C5 9.43 7.24 11.67 10 11.67Z" stroke="#FFFDF7" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            title="Certifications"
            desc="Browse certification programs and requirements"
            iconBg="bg-[#D7263D]"
          />

          <QuickTool
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.33 10.83L17.69 13.74C17.75 13.78 17.82 13.8 17.9 13.8C17.97 13.81 18.05 13.79 18.11 13.76C18.18 13.72 18.24 13.67 18.27 13.6C18.31 13.54 18.33 13.46 18.33 13.39V6.56C18.33 6.49 18.31 6.41 18.28 6.35C18.24 6.29 18.19 6.23 18.12 6.2C18.06 6.16 17.99 6.14 17.91 6.14C17.84 6.14 17.77 6.16 17.71 6.2L13.33 8.75" stroke="#FFD700" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.67 5H3.33C2.41 5 1.67 5.75 1.67 6.67V13.33C1.67 14.25 2.41 15 3.33 15H11.67C12.59 15 13.33 14.25 13.33 13.33V6.67C13.33 5.75 12.59 5 11.67 5Z" stroke="#FFD700" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            title="GMBTE Connect"
            desc="Join video sessions with mentors"
            iconBg="bg-[#001F3F]"
          />

          <QuickTool
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13.33 17.5V15.83C13.33 14.95 12.98 14.1 12.36 13.48C11.73 12.85 10.88 12.5 10 12.5H5C4.12 12.5 3.27 12.85 2.64 13.48C2.02 14.1 1.67 14.95 1.67 15.83V17.5" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.33 2.61C14.05 2.79 14.68 3.21 15.13 3.79C15.58 4.38 15.83 5.09 15.83 5.83C15.83 6.57 15.58 7.29 15.13 7.87C14.68 8.46 14.05 8.87 13.33 9.06" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18.33 17.5V15.83C18.33 15.09 18.09 14.38 17.63 13.79C17.18 13.21 16.55 12.79 15.83 12.61" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 9.17C9.34 9.17 10.83 7.67 10.83 5.83C10.83 3.99 9.34 2.5 7.5 2.5C5.66 2.5 4.17 3.99 4.17 5.83C4.17 7.67 5.66 9.17 7.5 9.17Z" stroke="#001F3F" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            title="Mentorship Hub"
            desc="Connect with industry professionals"
            iconBg="bg-[#FFD700]"
          />
        </div>
      </div>
    </div>
  );
}

function LearningPath({ title, modules, progress }: {title:string, modules:number, progress: number }) {
  return (
    <div className="border border-[#FFD700] rounded-xl p-4 sm:p-6 bg-[#FFF8E1]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-1 sm:gap-0">
        <p className="font-medium text-[#001F3F] text-sm sm:text-base">{title}</p>
        <span className="text-[#64748B] text-xs sm:text-sm">{modules} modules</span>
      </div>

      <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div className="h-full bg-black" style={{ width: `${progress}%` }} />
      </div>

      <p className="text-right text-[#D7263D] text-xs sm:text-sm mt-2">
        {progress}%
      </p>
    </div>
  );
}

function QuickTool({ icon, title, desc, iconBg = "bg-[#FFD700]" }: {icon: React.ReactNode, title:string, desc: string, iconBg: string}) {
  return (
    <div className="border border-[#001F3F] rounded-xl sm:rounded-2xl p-5 sm:p-8 bg-[#FFFCF7]">
      <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBg} rounded-xl flex items-center justify-center text-[#001F3F] flex-shrink-0`}>
          {icon}
        </div>

        <div>
          <h4 className="text-lg sm:text-[20px] font-semibold mb-1 sm:mb-2 text-[#001F3F]">
            {title}
          </h4>
          <p className="text-[#64748B] text-xs sm:text-sm mt-1 mb-2">{desc}</p>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-[#001F3F] text-[#FFD700] py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base">
        Open Tool
        <ExternalLink size={14} className="sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}