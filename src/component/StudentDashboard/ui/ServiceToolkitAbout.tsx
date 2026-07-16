import { BookOpen, Calendar, Video } from "lucide-react";

type ServiceToolkitAboutProps = {
  title?: string;
  description: string;
  primaryLabel?: string;
  secondaryLabel?: string;
};

export default function ServiceToolkitAbout({
  title = "About This Toolkit",
  description,
  primaryLabel = "View Resources",
  secondaryLabel = "Join Event",
}: ServiceToolkitAboutProps) {
  return (
    <div className="bg-[#FFFDF7] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12">
      <div className="rounded-xl border border-[#001F3F] bg-[#FFFCF7] p-5 sm:rounded-2xl sm:p-8 md:p-10">
        <h2 className="mb-3 text-xl font-semibold text-[#001F3F] sm:mb-4 sm:text-2xl md:text-[26px]">
          {title}
        </h2>

        <p className="mb-6 max-w-4xl text-sm leading-relaxed text-[#6B7280] sm:mb-8 sm:text-base">
          {description}
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-[#D7263D] px-4 py-2.5 text-sm font-medium text-white sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
          >
            <BookOpen size={16} className="sm:h-[18px] sm:w-[18px]" />
            {primaryLabel}
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-[#001F3F] px-4 py-2.5 text-sm font-medium text-[#FFD700] sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
          >
            <Calendar size={16} className="sm:h-[18px] sm:w-[18px]" />
            {secondaryLabel}
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border-2 border-[#FFD700] px-4 py-2.5 text-sm font-medium text-[#001F3F] sm:gap-3 sm:px-6 sm:py-3 sm:text-base"
          >
            <Video size={16} className="sm:h-[18px] sm:w-[18px]" />
            Launch GMBTE Connect
          </button>
        </div>
      </div>
    </div>
  );
}
