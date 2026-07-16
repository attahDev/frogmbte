const STORAGE_KEY = "sustainability-course-progress";
const PROGRESS_EVENT = "sustainability-progress-change";

export type CourseProgressStore = Record<string, string[]>;

function readProgressStore(): CourseProgressStore {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return {};
    }

    return JSON.parse(savedValue) as CourseProgressStore;
  } catch {
    return {};
  }
}

function writeProgressStore(store: CourseProgressStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));

  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

export function subscribeToCourseProgress(
  callback: () => void,
) {
  window.addEventListener(PROGRESS_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(PROGRESS_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getCompletedLessons(
  courseSlug: string,
): string[] {
  return readProgressStore()[courseSlug] ?? [];
}

export function isLessonCompleted(
  courseSlug: string,
  lessonSlug: string,
) {
  return getCompletedLessons(courseSlug).includes(
    lessonSlug,
  );
}

export function toggleLessonCompletion(
  courseSlug: string,
  lessonSlug: string,
) {
  const store = readProgressStore();
  const completedLessons = store[courseSlug] ?? [];

  const alreadyCompleted =
    completedLessons.includes(lessonSlug);

  store[courseSlug] = alreadyCompleted
    ? completedLessons.filter(
        (slug) => slug !== lessonSlug,
      )
    : [...completedLessons, lessonSlug];

  writeProgressStore(store);

  return !alreadyCompleted;
}

export function calculateCourseProgress(
  courseSlug: string,
  lessonSlugs: string[],
) {
  if (lessonSlugs.length === 0) {
    return 0;
  }

  const completedLessons =
    getCompletedLessons(courseSlug).filter((slug) =>
      lessonSlugs.includes(slug),
    );

  return Math.round(
    (completedLessons.length / lessonSlugs.length) * 100,
  );
}