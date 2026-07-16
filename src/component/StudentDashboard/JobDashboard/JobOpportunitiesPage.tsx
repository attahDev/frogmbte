import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import JobCard from "./component/JobCard";
import JobsFilterSidebar from "./component/JobsFilterSidebar";
import { dummyJobs } from "./component/lib/dummyJobs";
import { fetchJobs } from "./component/lib/jobs";
import type { JobCardData } from "./component/types/jobs";

type Filters = {
  jobTypes: string[];
  level: string;
  industry: string;
  salaryRange: string;
};

const initialFilters: Filters = {
  jobTypes: [],
  level: "",
  industry: "",
  salaryRange: "",
};

export default function JobOpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<JobCardData[]>(dummyJobs);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;

    try {
      setLoading(true);
      const liveJobs = await fetchJobs(search.trim());
      setJobs(liveJobs);
      setHasSearched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function toggleJobType(value: string) {
    setFilters((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(value)
        ? prev.jobTypes.filter((item) => item !== value)
        : [...prev.jobTypes, value],
    }));
  }

  function updateSelect(key: "level" | "industry" | "salaryRange", value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const text = `${job.title} ${job.description} ${job.company}`.toLowerCase();

      const matchType =
        filters.jobTypes.length === 0 ||
        filters.jobTypes.some((type) =>
          `${job.jobType} ${job.tags.join(" ")}`.toLowerCase().includes(type.toLowerCase())
        );

      const matchLevel = !filters.level || text.includes(filters.level);

      const matchIndustry = !filters.industry || text.includes(filters.industry);

      const matchSalary =
        !filters.salaryRange ||
        (filters.salaryRange === "low" && (job.salaryMax || 0) < 40000) ||
        (filters.salaryRange === "mid" &&
          (job.salaryMax || 0) >= 40000 &&
          (job.salaryMax || 0) <= 70000) ||
        (filters.salaryRange === "high" && (job.salaryMax || 0) > 70000);

      return matchType && matchLevel && matchIndustry && matchSalary;
    });
  }, [jobs, filters]);

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-[16px] border border-[#D9DEE8] bg-[#FFFDF7] px-4 pb-5 pt-4 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:rounded-[20px] sm:px-6 sm:pb-6 sm:pt-5">
      <div className="mb-5 space-y-3 sm:mb-6 lg:mb-8 lg:flex lg:items-start lg:justify-between lg:gap-8 lg:space-y-0">
        <h2 className="shrink-0 text-left text-lg font-semibold text-[#001F3F] sm:text-xl lg:pt-2 lg:text-[22px]">
          Job Opportunities
        </h2>

        <form
          onSubmit={handleSearch}
          className="w-full space-y-3 lg:max-w-[520px] lg:flex-none"
        >
          <div className="flex items-stretch gap-2 sm:gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="box-border min-h-[48px] min-w-0 flex-1 rounded-[10px] border border-[#D9DEE8] bg-white px-3 py-3 text-base text-[#001F3F] outline-none placeholder:text-[#9CA3AF] focus:border-[#001F3F]/30 sm:min-h-[46px] sm:px-4 sm:text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="box-border flex min-h-[48px] shrink-0 items-center justify-center rounded-[10px] bg-[#D7263D] px-4 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-[46px] sm:px-6"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#D9DEE8] bg-white text-sm font-medium text-[#001F3F] transition hover:bg-[#F9FAFB] sm:min-h-[46px] lg:hidden"
          >
            <SlidersHorizontal size={16} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-7">
        <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
          <JobsFilterSidebar
            total={filteredJobs.length}
            filters={filters}
            onToggleJobType={toggleJobType}
            onSelect={updateSelect}
          />
        </div>

        <div className="min-w-0 space-y-5 sm:space-y-7">
          {!hasSearched && (
            <p className="text-sm text-[#6A7282] sm:text-[14px]">
              Showing demo jobs. Search to load live jobs from Adzuna.
            </p>
          )}

          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {filteredJobs.length === 0 && (
            <div className="rounded-[16px] border border-[#E5E7EB] bg-[#F9FAFB] p-6 text-center text-sm text-[#6A7282] sm:p-8 sm:text-[14px]">
              No jobs found for this filter combination.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
