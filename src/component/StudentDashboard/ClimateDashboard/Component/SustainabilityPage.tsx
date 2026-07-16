import { useQuery } from "@tanstack/react-query";
import { CourseCard } from "./CourseCard";
import { fetchCourses } from "../../../../lib/coursesApi";

export default function SustainabilityPage() {
  const { data: sustainabilityCourses = [], isLoading } = useQuery({
    queryKey: ["courses", "climate"],
    queryFn: () => fetchCourses("climate"),
  });

  return (
    <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-[1440px] rounded-[18px] border-[0.3px] border-[#001F3F73] bg-[#FFFDF7] px-4 py-5 shadow-[0px_2px_4px_-1px_rgba(0,31,63,0.06),0px_4px_6px_-1px_rgba(0,31,63,0.10)] sm:px-5 sm:py-6 lg:rounded-[20px] lg:px-7 lg:pb-8 lg:pt-[26px]">
        <div className="max-w-[720px]">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#D7263D]">
            Sustainability Learning
          </p>

          <h1 className="text-[25px] font-semibold leading-tight tracking-[-0.03em] text-[#0B2B50] sm:text-[30px] lg:text-[34px]">
            Learn Sustainability
          </h1>

          <p className="mt-3 text-[15px] leading-7 text-[#6B7280] sm:text-[17px]">
            Build your climate knowledge, green skills and ability to create
            practical solutions for your community.
          </p>
        </div>

        {isLoading ? (
          <p className="mt-7 text-sm text-[#6B7280]">Loading courses…</p>
        ) : sustainabilityCourses.length === 0 ? (
          <p className="mt-7 text-sm text-[#6B7280]">
            No courses have been uploaded yet. Check back soon.
          </p>
        ) : (
          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sustainabilityCourses.map((course) => (
              <CourseCard
                key={course.slug}
                title={course.title}
                image={course.image}
                duration={course.duration}
                progress={course.progress}
                slug={course.slug}
                certificateAvailable={course.certificateAvailable}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}