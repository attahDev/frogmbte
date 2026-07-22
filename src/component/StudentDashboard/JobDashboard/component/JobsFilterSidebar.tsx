type JobsFilterSidebarProps = {
  total: number;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (value: string) => void;
  jobTypes: string[];
  selectedJobTypes: string[];
  onToggleJobType: (value: string) => void;
};

export default function JobsFilterSidebar({
  total,
  categories,
  selectedCategory,
  onSelectCategory,
  jobTypes,
  selectedJobTypes,
  onToggleJobType,
}: JobsFilterSidebarProps) {
  return (
    <aside className="h-auto rounded-[18px] border border-[#EFD97A] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <p className="mb-5 text-sm text-[#6A7282] sm:mb-7 sm:text-[14px]">Showing {total} opportunities</p>

      <h3 className="text-lg font-semibold text-[#001F3F] sm:text-[20px]">Filters</h3>

      <div className="mt-8">
        <p className="text-[14px] font-semibold text-[#001F3F]">Category</p>
        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={() => onSelectCategory("")}
            className={`block w-full rounded-[8px] px-3 py-2 text-left text-[14px] ${
              selectedCategory === ""
                ? "bg-[#001F3F] text-white"
                : "bg-[#F5F7FB] text-[#4A5565] hover:bg-[#EEF1F6]"
            }`}
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`block w-full rounded-[8px] px-3 py-2 text-left text-[14px] ${
                selectedCategory === category
                  ? "bg-[#001F3F] text-white"
                  : "bg-[#F5F7FB] text-[#4A5565] hover:bg-[#EEF1F6]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {jobTypes.length > 0 && (
        <div className="mt-8">
          <p className="text-[14px] font-semibold text-[#001F3F]">Type</p>
          <div className="mt-4 space-y-3">
            {jobTypes.map((option) => (
              <label key={option} className="flex items-center gap-2.5 text-[14px] text-[#333]">
                <input
                  type="checkbox"
                  checked={selectedJobTypes.includes(option)}
                  onChange={() => onToggleJobType(option)}
                  className="h-4 w-4 rounded border-[#D1D5DB]"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
