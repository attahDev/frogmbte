import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

import { CourseSidebar } from "../Component/CourseSidebar";
import { LessonContent } from "../Component/LessonContent";
import { LessonNavigation } from "../Component/LessonNavigation";
import { fetchCourseBySlug } from "../../../../lib/coursesApi";

export default function CourseLessonPage() {
  const { courseSlug, lessonSlug } = useParams<{
    courseSlug: string;
    lessonSlug: string;
  }>();

  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseSlug],
    queryFn: () => fetchCourseBySlug(courseSlug as string),
    enabled: !!courseSlug,
  });

  if (!courseSlug || !lessonSlug) {
    return <Navigate to="/sustainability" replace />;
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-[#6B7280]">Loading lesson…</p>
      </main>
    );
  }

  const lesson = course?.lessons.find((l) => l.slug === lessonSlug);

  if (!course || !lesson) {
    return <Navigate to="/sustainability" replace />;
  }

  return (
    <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:flex-row">
        <CourseSidebar
          course={course}
          activeLessonSlug={lesson.slug}
        />

        <div className="min-w-0 flex-1">
          <LessonContent course={course} lesson={lesson} />

          <LessonNavigation
            course={course}
            lessonSlug={lesson.slug}
          />
        </div>
      </div>
    </main>
  );
}
