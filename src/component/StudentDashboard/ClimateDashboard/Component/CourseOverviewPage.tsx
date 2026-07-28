import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

import { CourseOverview } from "../Component/CourseOverview"
import { CourseSidebar } from "../Component/CourseSidebar";
import { fetchCourseBySlug } from "../../../../lib/coursesApi";

type CourseOverviewPageProps = {
  /** Root path for this course family — Green Impact and Academy share this
   *  page but live at different URLs. */
  basePath?: string;
};

export default function CourseOverviewPage({ basePath = "/dashboard/green-impact" }: CourseOverviewPageProps) {
  const { courseSlug } = useParams<{
    courseSlug: string;
  }>();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseSlug],
    queryFn: () => fetchCourseBySlug(courseSlug as string),
    enabled: !!courseSlug,
  });

  if (!courseSlug) {
    return <Navigate to={basePath} replace />;
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-[#6B7280]">Loading course…</p>
      </main>
    );
  }

  if (!course) {
    return <Navigate to={basePath} replace />;
  }

  return (
    <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:flex-row">
        <CourseSidebar course={course} basePath={basePath} />

        <CourseOverview course={course} basePath={basePath} />
      </div>
    </main>
  );
}
