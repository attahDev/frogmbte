import { ArrowLeft, Clock3, ExternalLink, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { JobCardData } from "./component/types/jobs";

export default function JobDetailsPage() {
  const location = useLocation();
  const job = location.state?.job as JobCardData | undefined;

  if (!job) {
    return (
      <section className="mx-auto w-full max-w-[1400px] rounded-[16px] border border-[#D9DEE8] bg-[#FFFDF7] p-6 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:rounded-[20px] sm:p-8">
        <h2 className="text-xl font-semibold text-[#001F3F] sm:text-2xl">Job Details</h2>
        <p className="mt-4 text-sm text-[#6A7282] sm:text-base">
          No job selected yet. Search for a job first, then open its details.
        </p>
        <Link
          to="/dashboard/opportunities"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-[10px] bg-[#D7263D] px-5 text-sm text-white sm:h-[44px]"
        >
          Back to Jobs
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1400px] rounded-[16px] border border-[#D9DEE8] bg-[#FFFDF7] p-4 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:rounded-[20px] sm:p-6 lg:p-8">
      <Link
        to="/dashboard/opportunities"
        className="mb-5 inline-flex items-center gap-2 text-sm text-[#001F3F] sm:mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <h1 className="text-2xl font-semibold leading-tight text-[#001F3F] sm:text-[28px] lg:text-[30px]">
        {job.title}
      </h1>
      <p className="mt-2 text-base text-[#4A5565] sm:mt-3 sm:text-lg">{job.company}</p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#6A7282] sm:gap-5 sm:text-[14px]">
        <div className="flex items-center gap-2">
          <MapPin size={15} />
          {job.location}
        </div>
        <div className="flex items-center gap-2">
          <Clock3 size={15} />
          {job.postedAt}
        </div>
      </div>

      <p className="mt-5 text-lg font-semibold text-[#001F3F] sm:mt-6 sm:text-xl">{job.salary}</p>

      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#A7B2C2] px-2.5 py-1 text-xs text-[#001F3F] sm:px-3 sm:text-[12px]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 rounded-[14px] bg-[#F9FAFB] p-4 sm:mt-8 sm:rounded-[16px] sm:p-6">
        <h3 className="text-base font-semibold text-[#001F3F] sm:text-lg">Role Overview</h3>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#4A5565] sm:mt-4 sm:text-[15px]">
          {job.description}
        </p>
      </div>

      <a
        href={job.applyUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#D7263D] px-6 text-sm text-white sm:mt-8 sm:inline-flex sm:h-12 sm:w-auto sm:text-base"
      >
        Apply Now
        <ExternalLink size={16} />
      </a>
    </section>
  );
}
