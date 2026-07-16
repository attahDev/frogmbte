type Filters = {
    jobTypes: string[];
    level: string;
    industry: string;
    salaryRange: string;
  };
  
  type JobsFilterSidebarProps = {
    total: number;
    filters: Filters;
    onToggleJobType: (value: string) => void;
    onSelect: (key: "level" | "industry" | "salaryRange", value: string) => void;
  };
  
  const jobTypeOptions = ["Full-time", "Part-time", "Remote", "Internship", "Hybrid"];
  
  export default function JobsFilterSidebar({
    total,
    filters,
    onToggleJobType,
    onSelect,
  }: JobsFilterSidebarProps) {
    return (
      <aside className="h-auto rounded-[18px] border border-[#EFD97A] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <p className="mb-5 text-sm text-[#6A7282] sm:mb-7 sm:text-[14px]">Showing {total} jobs</p>
  
        <h3 className="text-lg font-semibold text-[#001F3F] sm:text-[20px]">Filters</h3>
  
        <div className="mt-8">
          <p className="text-[14px] font-semibold text-[#001F3F]">Job Type</p>
  
          <div className="mt-4 space-y-3">
            {jobTypeOptions.map((option) => (
              <label key={option} className="flex items-center gap-2.5 text-[14px] text-[#333]">
                <input
                  type="checkbox"
                  checked={filters.jobTypes.includes(option)}
                  onChange={() => onToggleJobType(option)}
                  className="h-4 w-4 rounded border-[#D1D5DB]"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
  
        <div className="mt-8">
          <p className="mb-3 text-[14px] font-semibold text-[#001F3F]">Experience Level</p>
          <select
            value={filters.level}
            onChange={(e) => onSelect("level", e.target.value)}
            className="h-[42px] w-full min-w-0 rounded-[10px] bg-[#F5F7FB] px-3 text-sm text-[#6A7282] outline-none sm:text-[14px]"
          >
            <option value="">Select level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>
  
        <div className="mt-6">
          <p className="mb-3 text-[14px] font-semibold text-[#001F3F]">Industry</p>
          <select
            value={filters.industry}
            onChange={(e) => onSelect("industry", e.target.value)}
            className="h-[42px] w-full min-w-0 rounded-[10px] bg-[#F5F7FB] px-3 text-sm text-[#6A7282] outline-none sm:text-[14px]"
          >
            <option value="">Select industry</option>
            <option value="design">Design</option>
            <option value="frontend">Frontend</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
  
        <div className="mt-6">
          <p className="mb-3 text-[14px] font-semibold text-[#001F3F]">Salary Range</p>
          <select
            value={filters.salaryRange}
            onChange={(e) => onSelect("salaryRange", e.target.value)}
            className="h-[42px] w-full min-w-0 rounded-[10px] bg-[#F5F7FB] px-3 text-sm text-[#6A7282] outline-none sm:text-[14px]"
          >
            <option value="">Select range</option>
            <option value="low">Below £40k</option>
            <option value="mid">£40k - £70k</option>
            <option value="high">Above £70k</option>
          </select>
        </div>
      </aside>
    );
  }