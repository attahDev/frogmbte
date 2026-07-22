import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import JobCard from "./component/JobCard";
import JobsFilterSidebar from "./component/JobsFilterSidebar";
import { dummyJobs } from "./component/lib/dummyJobs";
import { fetchOpportunities, fetchOpportunityCategories } from "./component/lib/jobs";
import type { JobCardData } from "./component/types/jobs";

export default function JobOpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [jobs, setJobs] = useState<JobCardData[]>(dummyJobs);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Category list is independent of the current search/filter — always the
  // full set of categories that exist, not just the ones in the current
  // result page.
  useEffect(() => {
    fetchOpportunityCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);

    fetchOpportunities({ search, category: selectedCategory })
      .then((results) => {
        if (cancelled) return;
        // Real data (even an empty result set for a specific search) always
        // wins over the placeholder — dummy jobs only show up before the
        // very first fetch resolves.
        setJobs(results);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search, selectedCategory]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput.trim());
  }

  function toggleJobType(value: string) {
    setSelectedJobTypes((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  }

  const jobTypeOptions = useMemo(() => {
    const types = new Set<string>();
    jobs.forEach((job) => {
      if (job.jobType && job.jobType !== "Not specified") types.add(job.jobType);
    });
    return Array.from(types).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (selectedJobTypes.length === 0) return jobs;
    return jobs.filter((job) => selectedJobTypes.includes(job.jobType));
  }, [jobs, selectedJobTypes]);

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-[16px] border border-[#D9DEE8] bg-[#FFFDF7] px-4 pb-5 pt-4 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:rounded-[20px] sm:px-6 sm:pb-6 sm:pt-5">
      <div className="mb-5 space-y-3 sm:mb-6 lg:mb-8 lg:flex lg:items-start lg:justify-between lg:gap-8 lg:space-y-0">
        <h2 className="shrink-0 text-left text-lg font-semibold text-[#001F3F] sm:text-xl lg:pt-2 lg:text-[22px]">
          Opportunities
        </h2>

        <form
          onSubmit={handleSearch}
          className="w-full space-y-3 lg:max-w-[520px] lg:flex-none"
        >
          <div className="flex items-stretch gap-2 sm:gap-3">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search opportunities..."
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
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            jobTypes={jobTypeOptions}
            selectedJobTypes={selectedJobTypes}
            onToggleJobType={toggleJobType}
          />
        </div>

        <div className="min-w-0 space-y-5 sm:space-y-7">
          {loadError && (
            <div className="rounded-[16px] border border-[#F3C6C6] bg-[#FDF0F0] p-4 text-sm text-[#8A1F1F]">
              Couldn't load live opportunities right now — showing recent picks instead.
            </div>
          )}

          {loading && jobs === dummyJobs && (
            <p className="text-sm text-[#6A7282] sm:text-[14px]">Loading opportunities…</p>
          )}

          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}

          {!loading && filteredJobs.length === 0 && (
            <div className="rounded-[16px] border border-[#E5E7EB] bg-[#F9FAFB] p-6 text-center text-sm text-[#6A7282] sm:p-8 sm:text-[14px]">
              No opportunities found for this filter combination.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
