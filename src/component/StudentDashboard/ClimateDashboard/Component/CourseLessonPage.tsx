import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";

import { CourseSidebar } from "../Component/CourseSidebar";
import { LessonContent } from "../Component/LessonContent";
import { LessonNavigation } from "../Component/LessonNavigation";
import { fetchLessonBySlug, toggleSectionComplete } from "../../../../lib/coursesApi";

export default function CourseLessonPage() {
  const { courseSlug, lessonSlug } = useParams<{
    courseSlug: string;
    lessonSlug: string;
  }>();

  const queryClient = useQueryClient();

  const queryKey = ["lesson", courseSlug, lessonSlug];

  const { data, isLoading } = useQuery({
    queryKey,
    // Per-user progress (checked sections) only exists on this endpoint —
    // the whole-course fetch used before this doesn't include it.
    queryFn: () => fetchLessonBySlug(courseSlug as string, lessonSlug as string),
    enabled: !!courseSlug && !!lessonSlug,
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

  if (!data) {
    return <Navigate to="/sustainability" replace />;
  }

  const { course, lesson } = data;

  const handleToggleSection = async (sectionId: string) => {
    // Optimistic flip so the checkbox feels instant, then reconcile with
    // whatever the server actually computed (source of truth).
    queryClient.setQueryData(queryKey, (prev: typeof data | undefined) => {
      if (!prev) return prev;
      return {
        ...prev,
        lesson: {
          ...prev.lesson,
          sections: prev.lesson.sections.map((s) =>
            s.id === sectionId ? { ...s, completed: !s.completed } : s,
          ),
        },
      };
    });

    try {
      await toggleSectionComplete(courseSlug, lessonSlug, sectionId);
    } finally {
      queryClient.invalidateQueries({ queryKey });
    }
  };

  return (
    <main className="min-h-screen bg-[#F6F4EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 lg:flex-row">
        <CourseSidebar
          course={course}
          activeLessonSlug={lesson.slug}
        />

        <div className="min-w-0 flex-1">
          <LessonContent
            course={course}
            lesson={lesson}
            onToggleSection={handleToggleSection}
          />

          <LessonNavigation
            course={course}
            lessonSlug={lesson.slug}
          />
        </div>
      </div>
    </main>
  );
}
