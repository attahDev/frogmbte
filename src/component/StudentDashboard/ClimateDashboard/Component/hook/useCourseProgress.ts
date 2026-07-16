import { useCallback, useEffect, useState } from "react";

import type { SustainabilityCourse } from "../../types/sustainability";
import {
  calculateCourseProgress,
  getCompletedLessons,
  subscribeToCourseProgress,
} from "../courseProgress";

export function useCourseProgress(
  course: SustainabilityCourse,
) {
  const lessonSlugs = course.lessons.map(
    (lesson) => lesson.slug,
  );

  const readCurrentProgress = useCallback(() => {
    const completedLessons =
      getCompletedLessons(course.slug).filter((slug) =>
        lessonSlugs.includes(slug),
      );

    return {
      completedLessons,
      percentage: calculateCourseProgress(
        course.slug,
        lessonSlugs,
      ),
    };
  }, [course.slug, lessonSlugs.join("|")]);

  const [progressState, setProgressState] = useState(
    readCurrentProgress,
  );

  useEffect(() => {
    const updateProgress = () => {
      setProgressState(readCurrentProgress());
    };

    updateProgress();

    return subscribeToCourseProgress(updateProgress);
  }, [readCurrentProgress]);

  return progressState;
}