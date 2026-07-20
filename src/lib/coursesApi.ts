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
  metadata: Record<string, any> | null;
  totalModules: number;
  completedModules?: number;
  progressPercent?: number;
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
  };
}

/** category: 'climate' for Green Impact, 'education' for Academy. */
export async function fetchCourses(category: "climate" | "education"): Promise<SustainabilityCourse[]> {
  const { data } = await api.get(`/courses`, { params: { category } });
  const courses: BackendCourse[] = data?.data ?? data;

  // Modules aren't included in the list endpoint — fetch each course's
  // modules in parallel so cards can show real lesson counts if needed.
  const withModules = await Promise.all(
    courses.map(async (course) => {
      try {
        const modsRes = await api.get(`/courses/${course.id}/modules`);
        const modules: BackendModule[] = modsRes.data?.data ?? modsRes.data;
        return toCourse(course, modules);
      } catch {
        return toCourse(course, []);
      }
    }),
  );

  return withModules;
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
 *  lesson out of the whole-course fetch (which has no progress data). */
export async function fetchLessonBySlug(
  courseSlug: string,
  lessonSlug: string,
): Promise<{ course: SustainabilityCourse; lesson: CourseLesson } | null> {
  try {
    const { data } = await api.get(`/courses/by-slug/${courseSlug}/modules/${lessonSlug}`);
    const payload: { course: BackendCourse; module: BackendModuleWithProgress } = data?.data ?? data;

    const course = toCourse(payload.course, []);
    const lesson = toLesson(payload.module);
    const completedIds = new Set(payload.module.completedSectionIds);

    return {
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
