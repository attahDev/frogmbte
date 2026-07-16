import { Bookmark, Clock3, Eye, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { JobCardData } from "./types/jobs";

type JobCardProps = {
  job: JobCardData;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="min-w-0 overflow-hidden rounded-[16px] border border-[#EFD97A] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:rounded-[18px] sm:px-6 sm:py-6 lg:px-7 lg:py-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-tight text-[#001F3F] sm:text-[20px]">
            {job.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-[#4A5565] sm:mt-3 sm:text-[14px]">
            {job.company}
          </p>
        </div>

        <div className="inline-flex w-fit shrink-0 items-center gap-1 self-start rounded-full bg-[#F8F0D2] px-3 py-1.5 text-xs font-medium text-[#8A6A00] sm:py-2 sm:text-[14px]">
          <Star size={14} className="fill-[#8A6A00] text-[#8A6A00]" />
          {job.match}% match
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] text-[#6A7282]">
        <div className="flex items-center gap-1.5">
          <MapPin size={14} />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock3 size={14} />
          <span>{job.postedAt}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#A7B2C2] px-2.5 py-1 text-[12px] text-[#001F3F]"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="mt-4 text-base font-semibold text-[#001F3F] sm:mt-5 sm:text-[18px]">{job.salary}</p>

      <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-stretch">
        <Link
          to={`/dashboard/opportunities/${job.id}`}
          state={{ job }}
          className="flex min-h-[48px] min-w-0 flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#D7263D] px-4 text-sm font-medium text-white transition hover:opacity-95 sm:min-h-[46px] sm:text-[15px]"
        >
          <Eye size={16} className="shrink-0" />
          View Details
        </Link>

        <button
          type="button"
          aria-label="Save job"
          className="flex min-h-[48px] w-full shrink-0 items-center justify-center rounded-[10px] border border-[#D9DEE8] bg-[#FFFDF7] text-[#001F3F] transition hover:bg-[#F9FAFB] sm:min-h-[46px] sm:w-[52px]"
        >
          <Bookmark size={16} />
        </button>
      </div>
    </article>
  );
}