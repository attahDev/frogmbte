import { api } from "./api";
import type {
  CourseLesson,
  SustainabilityCourse,
} from "../component/StudentDashboard/ClimateDashboard/types/sustainability";

/** Raw shapes coming back from the NestJS backend. */
type BackendCourse = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  tags: string[];
  isFeatured: boolean;
  metadata: Record<string, any> | null;
  totalModules: number;
  completedModules?: number;
  progressPercent?: number;
  creditCost?: number;
  isEnrolled?: boolean;
};

type BackendModule = {
  id: string;
  slug: string;
  title: string;
  content: Record<string, any>;
  order: number;
};

function toLesson(mod: BackendModule): CourseLesson {
  const c = mod.content ?? {};
  return {
    slug: mod.slug,
    shortTitle: c.shortTitle ?? `Session ${mod.order + 1}`,
    title: mod.title,
    description: c.description ?? "",
    duration: c.duration ?? "",
    learningOutcomes: c.learningOutcomes ?? [],
    sections: c.sections ?? [],
  };
}

function toCourse(course: BackendCourse, modules: BackendModule[] = []): SustainabilityCourse {
  const m = course.metadata ?? {};
  return {
    slug: course.slug,
    title: course.title,
    shortDescription: m.shortDescription ?? course.description ?? "",
    fullDescription: m.fullDescription ?? course.description ?? "",
    image: m.image ?? "",
    duration: m.duration ?? "",
    contactHours: m.contactHours ?? "",
    mode: m.mode ?? "",
    level: m.level ?? "",
    progress: course.progressPercent ?? 0,
    certificateAvailable: m.certificateAvailable ?? false,
    learningOutcomes: m.learningOutcomes ?? [],
    lessons: modules.sort((a, b) => a.order - b.order).map(toLesson),
    finalProject: m.finalProject,
    tags: course.tags ?? [],
    isFeatured: course.isFeatured ?? false,
    creditCost: course.creditCost ?? 0,
    isEnrolled: course.isEnrolled ?? (course.creditCost ?? 0) === 0,
  };
}

/** category: 'climate' for Green Impact, 'education' for Academy. */
export async function fetchCourses(category: "climate" | "education"): Promise<SustainabilityCourse[]> {
  const { data } = await api.get(`/courses`, { params: { category } });
  const courses: BackendCourse[] = data?.data ?? data;

  if (courses.length === 0) return [];

  // One batched request instead of one GET .../modules per course — the
  // old Promise.all fan-out was firing N simultaneous requests on every
  // dashboard load, which was enough to trip the API's rate limit.
  let modulesByCourse: Record<string, BackendModule[]> = {};
  try {
    const ids = courses.map((c) => c.id).join(",");
    const modsRes = await api.get(`/courses/modules`, { params: { ids } });
    modulesByCourse = modsRes.data?.data ?? modsRes.data ?? {};
  } catch {
    // fall through — courses still render, just without lesson counts
  }

  return courses.map((course) => toCourse(course, modulesByCourse[course.id] ?? []));
}

export async function fetchCourseBySlug(courseSlug: string): Promise<SustainabilityCourse | null> {
  try {
    const [courseRes, modulesRes] = await Promise.all([
      api.get(`/courses/by-slug/${courseSlug}`),
      api.get(`/courses/by-slug/${courseSlug}/modules`),
    ]);
    const course: BackendCourse = courseRes.data?.data ?? courseRes.data;
    const modulesPayload = modulesRes.data?.data ?? modulesRes.data;
    const modules: BackendModule[] = modulesPayload?.modules ?? modulesPayload;
    return toCourse(course, modules);
  } catch {
    return null;
  }
}

type BackendModuleWithProgress = BackendModule & {
  completedSectionIds: string[];
  isCompleted: boolean;
};

/** A single lesson merged with the current user's checkbox progress —
 *  what CourseLessonPage should actually render instead of pulling the
 *  lesson out of the whole-course fetch (which has no progress data).
 *  Returns { locked: true, course } instead of a lesson when the course is
 *  paid and the user hasn't enrolled — the backend withholds lesson content
 *  entirely in that case, it isn't just hidden client-side. */
export async function fetchLessonBySlug(
  courseSlug: string,
  lessonSlug: string,
): Promise<
  | { locked: false; course: SustainabilityCourse; lesson: CourseLesson }
  | { locked: true; course: SustainabilityCourse }
  | null
> {
  try {
    const { data } = await api.get(`/courses/by-slug/${courseSlug}/modules/${lessonSlug}`);
    const payload: {
      course: BackendCourse;
      locked: boolean;
      module?: BackendModuleWithProgress;
    } = data?.data ?? data;

    const course = toCourse(payload.course, []);

    if (payload.locked || !payload.module) {
      return { locked: true, course };
    }

    const lesson = toLesson(payload.module);
    const completedIds = new Set(payload.module.completedSectionIds);

    return {
      locked: false,
      course,
      lesson: {
        ...lesson,
        completed: payload.module.isCompleted,
        sections: lesson.sections.map((s) => ({ ...s, completed: completedIds.has(s.id) })),
      },
    };
  } catch {
    return null;
  }
}

/** Enroll in a course — free courses (creditCost 0) still call this once
 *  (it just skips the credit charge server-side) so a CourseProgress row
 *  exists either way and lesson pages can tell "enrolled" from "not". */
export async function enrollInCourse(courseSlug: string) {
  const { data } = await api.post(`/courses/by-slug/${courseSlug}/enroll`);
  return data?.data ?? data;
}

/** The "mark this section done" checkbox. Toggles on the server (which
 *  recomputes real completion from real data — see courses.service.ts) and
 *  returns the fresh state. */
export async function toggleSectionComplete(
  courseSlug: string,
  lessonSlug: string,
  sectionId: string,
) {
  const { data } = await api.patch(
    `/courses/by-slug/${courseSlug}/modules/${lessonSlug}/sections/${sectionId}/toggle`,
  );
  return data;
}
