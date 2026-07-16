import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { SustainabilityCourse } from "../types/sustainability";
import {
  isLessonCompleted,
  toggleLessonCompletion,
} from "./courseProgress";

type LessonNavigationProps = {
  course: SustainabilityCourse;
  lessonSlug: string;
};

export function LessonNavigation({
  course,
  lessonSlug,
}: LessonNavigationProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(
      isLessonCompleted(course.slug, lessonSlug),
    );
  }, [course.slug, lessonSlug]);

  const currentIndex = course.lessons.findIndex(
    (lesson) => lesson.slug === lessonSlug,
  );

  const previousLesson =
    currentIndex > 0
      ? course.lessons[currentIndex - 1]
      : null;

  const nextLesson =
    currentIndex >= 0 &&
    currentIndex < course.lessons.length - 1
      ? course.lessons[currentIndex + 1]
      : null;

  const courseBasePath =
    `/dashboard/green-impact/${course.slug}`;

  function handleCompletionToggle() {
    const newCompletedState =
      toggleLessonCompletion(
        course.slug,
        lessonSlug,
      );

    setCompleted(newCompletedState);
  }

  return (
    <div className="mt-6 rounded-[18px] border border-[#E2E5E9] bg-[#FFFDF7] p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {previousLesson ? (
          <Link
            to={`${courseBasePath}/${previousLesson.slug}`}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] border border-[#D7DCE2] px-5 text-[14px] font-medium text-[#001F3F]"
          >
            <ArrowLeft size={17} />
            Previous
          </Link>
        ) : (
          <Link
            to={courseBasePath}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] border border-[#D7DCE2] px-5 text-[14px] font-medium text-[#001F3F]"
          >
            <ArrowLeft size={17} />
            Course Overview
          </Link>
        )}

        <button
          type="button"
          onClick={handleCompletionToggle}
          className={`flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] px-5 text-[14px] font-semibold transition ${
            completed
              ? "bg-[#001F3F] text-white"
              : "bg-[#FFF3C4] text-[#001F3F]"
          }`}
        >
          {completed ? (
            <CheckCircle2 size={18} />
          ) : (
            <Circle size={18} />
          )}

          {completed
            ? "Completed"
            : "Mark as Complete"}
        </button>

        {nextLesson ? (
          <Link
            to={`${courseBasePath}/${nextLesson.slug}`}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] bg-[#D7263D] px-5 text-[14px] font-semibold text-white"
          >
            Next Lesson
            <ArrowRight size={17} />
          </Link>
        ) : (
          <Link
            to={courseBasePath}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-[12px] bg-[#001F3F] px-5 text-[14px] font-semibold text-white"
          >
            Finish Module
            <ArrowRight size={17} />
          </Link>
        )}
      </div>
    </div>
  );
}