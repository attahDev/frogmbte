import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, SlidersHorizontal } from "lucide-react";

import DashboardBreadcrumb from "../../ui/DashboardBreadcrumb";
import { CourseCard } from "../../ClimateDashboard/Component/CourseCard";
import { fetchCourses } from "../../../../lib/coursesApi";
import type { SustainabilityCourse } from "../../ClimateDashboard/types/sustainability";

const ACADEMY_BASE_PATH = "/dashboard/academy/courses";

export default function AcademyAllCourses() {
  const [courses, setCourses] = useState<SustainabilityCourse[] | null>(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    fetchCourses("education")
      .then((data) => {
        if (!cancelled) setCourses(data);
      })
      .catch(() => {
        if (!cancelled) setCourses([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    if (!courses) return ["All"];
    const tagSet = new Set<string>();
    courses.forEach((course) => course.tags.forEach((tag) => tagSet.add(tag)));
    return ["All", ...Array.from(tagSet).sort()];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (!courses) return null;
    const q = query.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All" || course.tags.includes(activeCategory);

      const matchesQuery =
        q.length === 0 ||
        course.title.toLowerCase().includes(q) ||
        course.shortDescription.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [courses, activeCategory, query]);

  const inProgressCourses = useMemo(
    () => (courses ?? []).filter((c) => c.progress > 0 && c.progress < 100),
    [courses],
  );

  return (
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* Header */}
      <div className="bg-[#FFD700] px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 border-b-4 border-[#001F3F]">
        <DashboardBreadcrumb
          items={[
            { label: "Dashboard", to: "/dashboard" },
            { label: "Academy", to: "/dashboard/academy" },
            { label: "All Courses" },
          ]}
        />

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#001F3F] flex items-center justify-center flex-shrink-0">
            <BookOpen className="text-[#FFD700]" size={26} />
          </div>

          <div>
            <p className="text-[#001F3F] text-sm sm:text-base mb-1 sm:mb-2 font-medium">
              eLearning Portal
            </p>
            <h1 className="text-[#001F3F] text-lg sm:text-xl md:text-2xl font-bold leading-tight">
              All Courses &amp; Learning Materials
            </h1>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 max-w-[1400px] mx-auto">
        {/* Search + categories */}
        <div className="flex flex-col gap-4 mb-8 sm:mb-10">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 sm:py-3 pl-10 pr-4 text-sm sm:text-base text-[#001F3F] outline-none transition placeholder:text-[#94A3B8] focus:border-[#001F3F] focus:ring-2 focus:ring-[#001F3F]/10"
            />
          </div>

          <div className="flex items-start gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            <div className="hidden sm:flex items-center gap-1.5 text-[#64748B] text-sm mr-1 shrink-0 pt-2">
              <SlidersHorizontal size={15} />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-[#001F3F] text-[#FFD700]"
                    : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Continue learning */}
        {inProgressCourses.length > 0 && (
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#001F3F] mb-4 sm:mb-6">
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {inProgressCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  slug={course.slug}
                  title={course.title}
                  image={course.image}
                  duration={course.duration}
                  progress={course.progress}
                  certificateAvailable={course.certificateAvailable}
                  basePath={ACADEMY_BASE_PATH}
                />
              ))}
            </div>
          </section>
        )}

        {/* All courses */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#001F3F] mb-4 sm:mb-6">
            {activeCategory === "All" ? "All Courses" : activeCategory}
          </h2>

          {filteredCourses === null ? (
            <p className="text-sm text-[#6B7280]">Loading courses…</p>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white py-16 text-center">
              <BookOpen className="mx-auto mb-3 text-[#CBD5E1]" size={32} />
              <p className="text-sm text-[#6B7280]">
                {courses && courses.length === 0
                  ? "No education courses have been published yet — check back soon."
                  : "No courses match your search."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  slug={course.slug}
                  title={course.title}
                  image={course.image}
                  duration={course.duration}
                  progress={course.progress}
                  certificateAvailable={course.certificateAvailable}
                  basePath={ACADEMY_BASE_PATH}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
